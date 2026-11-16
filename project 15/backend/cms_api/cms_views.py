import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib import messages
from django.utils.text import slugify
from django.utils import timezone
from django.db import models

from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
)


def cms_login(request):
    if request.user.is_authenticated:
        return redirect('cms_overview')
    
    error = None
    if request.method == 'POST':
        user = authenticate(request, username=request.POST.get('username'), password=request.POST.get('password'))
        if user:
            login(request, user)
            return redirect('cms_overview')
        error = "Invalid credentials. Please verify your POP! Food Studio username and password."
    
    return render(request, 'cms/login.html', {'error': error})


def cms_logout(request):
    logout(request)
    return redirect('cms_login')


@login_required(login_url='cms_login')
def cms_overview(request):
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(restaurant_name="POP! FOOD STUDIO")
    
    total_reservations = Reservation.objects.count()
    pending_reservations = Reservation.objects.filter(status='pending').count()
    confirmed_reservations = Reservation.objects.filter(status='confirmed').count()
    seated_reservations = Reservation.objects.filter(status='seated').count()
    
    menu_count = MenuItem.objects.count()
    pages_count = CustomPage.objects.count()
    blog_count = BlogPost.objects.count()
    gallery_count = GalleryItem.objects.count()
    reviews_count = Testimonial.objects.count()
    
    recent_reservations = Reservation.objects.all().order_by('-created_at')[:8]
    
    context = {
        'active_section': 'overview',
        'config': config,
        'total_reservations': total_reservations,
        'pending_reservations': pending_reservations,
        'confirmed_reservations': confirmed_reservations,
        'seated_reservations': seated_reservations,
        'menu_count': menu_count,
        'pages_count': pages_count,
        'blog_count': blog_count,
        'gallery_count': gallery_count,
        'reviews_count': reviews_count,
        'recent_reservations': recent_reservations,
    }
    return render(request, 'cms/overview.html', context)


@login_required(login_url='cms_login')
def cms_pages(request):
    config = SiteConfig.objects.first()
    pages = CustomPage.objects.all().order_by('-updated_at')
    return render(request, 'cms/pages.html', {
        'active_section': 'pages',
        'config': config,
        'pages': pages,
    })


@login_required(login_url='cms_login')
def cms_page_builder(request, page_id=None):
    config = SiteConfig.objects.first()
    page_obj = None
    if page_id:
        page_obj = get_object_or_404(CustomPage, id=page_id)
    
    return render(request, 'cms/page_builder.html', {
        'active_section': 'pages',
        'config': config,
        'page': page_obj,
        'layout_data_json': json.dumps(page_obj.layout_data) if page_obj and page_obj.layout_data else json.dumps({
            "blocks": [
                {
                    "type": "hero",
                    "headline": "POW! THE NEW POP-ART DINING LAB",
                    "subheadline": "Electric flavors, comic-book aesthetics, and unapologetic comfort food in the Arts District.",
                    "background_image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
                    "cta_text": "Book an Art Table",
                    "cta_link": "#reservation"
                },
                {
                    "type": "split",
                    "headline": "EAT OUTSIDE THE LINES",
                    "content": "Discover how our culinary brigade blends playful 60s pop-art nostalgia with serious 45-day dry-aging smash burgers, molecular smoking cocktails, and handmade brioche.",
                    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                    "image_position": "right"
                },
                {
                    "type": "features",
                    "headline": "THE FOOD STUDIO EXPERIENCE",
                    "items": [
                        {"title": "Open Plancha Theater", "description": "Watch live flame searing on high-heat mirror planchas."},
                        {"title": "Neon Mixology Lab", "description": "Sparkling disco glitter and edible aromatic smoke bubbles."},
                        {"title": "Custom Pop Art", "description": "Original pop-art graphics and custom comic print installations."}
                    ]
                },
                {
                    "type": "cta",
                    "headline": "READY TO EXPERIENCE POP! FOOD STUDIO?",
                    "subheadline": "Reserve your booth under the neon sign today.",
                    "button_text": "Reserve Now",
                    "button_link": "#reservation"
                }
            ]
        })
    })


@csrf_exempt
@login_required(login_url='cms_login')
def cms_save_page(request):
    if request.method == 'POST':
        page_id = request.POST.get('page_id')
        title = request.POST.get('title')
        slug = request.POST.get('slug')
        meta_title = request.POST.get('meta_title', '')
        meta_description = request.POST.get('meta_description', '')
        layout_data_raw = request.POST.get('layout_data', '{}')
        is_published = request.POST.get('is_published') == 'on'

        if not slug:
            slug = slugify(title)

        try:
            layout_data = json.loads(layout_data_raw)
        except Exception:
            layout_data = {}

        if page_id:
            page_obj = get_object_or_404(CustomPage, id=page_id)
            page_obj.title = title
            page_obj.slug = slug
            page_obj.meta_title = meta_title
            page_obj.meta_description = meta_description
            page_obj.layout_data = layout_data
            page_obj.is_published = is_published
            page_obj.save()
            messages.success(request, f"Page '{title}' updated successfully.")
        else:
            page_obj = CustomPage.objects.create(
                title=title,
                slug=slug,
                meta_title=meta_title,
                meta_description=meta_description,
                layout_data=layout_data,
                is_published=is_published
            )
            messages.success(request, f"Page '{title}' created successfully.")

        return redirect('cms_pages')
    return redirect('cms_pages')


@login_required(login_url='cms_login')
def cms_identity(request):
    config = SiteConfig.objects.first()
    if request.method == 'POST':
        config.restaurant_name = request.POST.get('restaurant_name', config.restaurant_name)
        
        content = config.content_json or {}
        site_data = content.get('site', {})
        site_data['address'] = request.POST.get('address', site_data.get('address', ''))
        site_data['phone'] = request.POST.get('phone', site_data.get('phone', ''))
        site_data['email'] = request.POST.get('email', site_data.get('email', ''))
        site_data['operating_hours'] = request.POST.get('operating_hours', site_data.get('operating_hours', ''))
        site_data['coordinates'] = request.POST.get('coordinates', site_data.get('coordinates', ''))
        content['site'] = site_data
        
        config.content_json = content
        config.save()
        messages.success(request, "Brand identity and studio location updated successfully.")
        return redirect('cms_identity')

    site_data = (config.content_json or {}).get('site', {})
    return render(request, 'cms/identity.html', {
        'active_section': 'identity',
        'config': config,
        'site': site_data,
    })


@login_required(login_url='cms_login')
def cms_reservations(request):
    config = SiteConfig.objects.first()
    shift_filter = request.GET.get('shift', 'all')
    status_filter = request.GET.get('status', 'all')
    search_query = request.GET.get('q', '').strip()

    qs = Reservation.objects.all().order_by('-created_at')

    if shift_filter in ['lunch', 'dinner']:
        qs = qs.filter(shift=shift_filter)
    if status_filter != 'all':
        qs = qs.filter(status=status_filter)
    if search_query:
        qs = qs.filter(
            models.Q(reference_code__icontains=search_query) |
            models.Q(customer_name__icontains=search_query) |
            models.Q(phone__icontains=search_query) |
            models.Q(email__icontains=search_query)
        )

    pending_count = Reservation.objects.filter(status='pending').count()
    confirmed_count = Reservation.objects.filter(status='confirmed').count()
    seated_count = Reservation.objects.filter(status='seated').count()
    today_covers = sum(r.guest_count for r in Reservation.objects.filter(preferred_date=timezone.now().date()))

    return render(request, 'cms/reservations.html', {
        'active_section': 'reservations',
        'config': config,
        'reservations': qs,
        'shift_filter': shift_filter,
        'status_filter': status_filter,
        'search_query': search_query,
        'pending_count': pending_count,
        'confirmed_count': confirmed_count,
        'seated_count': seated_count,
        'today_covers': today_covers,
    })


@csrf_exempt
@login_required(login_url='cms_login')
def cms_reservation_status_update(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        table_number = request.POST.get('table_number')
        if new_status in dict(Reservation.STATUS_CHOICES):
            res.status = new_status
        if table_number is not None:
            res.table_number = table_number
        res.save()
        messages.success(request, f"Reservation {res.reference_code} updated.")
    return redirect('cms_reservations')


@login_required(login_url='cms_login')
def cms_menu(request):
    config = SiteConfig.objects.first()
    categories = MenuCategory.objects.all().order_by('sort_order')
    items = MenuItem.objects.select_related('category').all().order_by('sort_order')
    
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_item':
            cat_id = request.POST.get('category_id')
            category = get_object_or_404(MenuCategory, id=cat_id)
            name = request.POST.get('name')
            slug = request.POST.get('slug') or slugify(name)
            price = request.POST.get('price') or 0
            description = request.POST.get('description', '')
            image_url = request.POST.get('image_url', '')
            badge_text = request.POST.get('badge_text', '')
            is_featured = request.POST.get('is_featured') == 'on'

            MenuItem.objects.create(
                category=category,
                name=name,
                slug=slug,
                price=price,
                description=description,
                image_url=image_url,
                badge_text=badge_text,
                is_featured=is_featured
            )
            messages.success(request, f"Dish '{name}' added successfully.")
            return redirect('cms_menu')

    return render(request, 'cms/menu.html', {
        'active_section': 'menu',
        'config': config,
        'categories': categories,
        'items': items,
    })


@login_required(login_url='cms_login')
def cms_tour(request):
    config = SiteConfig.objects.first()
    viewpoints = TourViewpoint.objects.all().order_by('sort_order')
    return render(request, 'cms/tour.html', {
        'active_section': 'tour',
        'config': config,
        'viewpoints': viewpoints,
    })


@login_required(login_url='cms_login')
def cms_sections(request):
    config = SiteConfig.objects.first()
    return render(request, 'cms/sections.html', {
        'active_section': 'sections',
        'config': config,
    })


@login_required(login_url='cms_login')
def cms_gallery(request):
    config = SiteConfig.objects.first()
    gallery_items = GalleryItem.objects.all().order_by('sort_order')
    return render(request, 'cms/gallery.html', {
        'active_section': 'gallery',
        'config': config,
        'items': gallery_items,
    })


@login_required(login_url='cms_login')
def cms_reviews(request):
    config = SiteConfig.objects.first()
    reviews = Testimonial.objects.all().order_by('sort_order')
    return render(request, 'cms/reviews.html', {
        'active_section': 'reviews',
        'config': config,
        'reviews': reviews,
    })


@login_required(login_url='cms_login')
def cms_faqs(request):
    config = SiteConfig.objects.first()
    faqs = (config.content_json or {}).get('faqs', [
        {"question": "Do I need a reservation for the Pop-Art Bar?", "answer": "Walk-ins are welcomed at the neon plancha bar, but booth dining requires reservations."},
        {"question": "Are vegetarian and vegan smash burgers available?", "answer": "Yes! Our Neon Truffle Melt and Crispy Cauliflower are plant-based perfection."},
        {"question": "Can I book the VIP Neon Loft for private parties?", "answer": "Absolutely. Use our private events inquiry form or concierge desk for groups up to 50 guests."}
    ])
    return render(request, 'cms/faqs.html', {
        'active_section': 'faqs',
        'config': config,
        'faqs': faqs,
    })


@login_required(login_url='cms_login')
def cms_schema(request):
    config = SiteConfig.objects.first()
    schema_json = json.dumps(config.content_json or {}, indent=2)
    return render(request, 'cms/schema.html', {
        'active_section': 'schema',
        'config': config,
        'schema_json': schema_json,
    })


@login_required(login_url='cms_login')
def cms_blog(request):
    config = SiteConfig.objects.first()
    posts = BlogPost.objects.all().order_by('-published_at')
    categories = BlogCategory.objects.all().order_by('sort_order')
    return render(request, 'cms/blog.html', {
        'active_section': 'blog',
        'config': config,
        'posts': posts,
        'categories': categories,
    })


@login_required(login_url='cms_login')
def cms_blog_edit(request, post_id=None):
    config = SiteConfig.objects.first()
    post = None
    if post_id:
        post = get_object_or_404(BlogPost, id=post_id)
    categories = BlogCategory.objects.all().order_by('sort_order')
    return render(request, 'cms/blog_edit.html', {
        'active_section': 'blog',
        'config': config,
        'post': post,
        'categories': categories,
    })


@csrf_exempt
@login_required(login_url='cms_login')
def cms_save_blog(request):
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        title = request.POST.get('title')
        slug = request.POST.get('slug') or slugify(title)
        category_id = request.POST.get('category_id')
        author_name = request.POST.get('author_name', 'POP! Food Lab Team')
        read_time = request.POST.get('read_time', '4 min read')
        excerpt = request.POST.get('excerpt', '')
        content = request.POST.get('content', '')
        featured_image_url = request.POST.get('featured_image_url', '')
        is_published = request.POST.get('is_published') == 'on'

        category = None
        if category_id:
            category = get_object_or_404(BlogCategory, id=category_id)

        if post_id:
            post = get_object_or_404(BlogPost, id=post_id)
            post.title = title
            post.slug = slug
            post.category = category
            post.author_name = author_name
            post.read_time = read_time
            post.excerpt = excerpt
            post.content = content
            post.featured_image_url = featured_image_url
            post.is_published = is_published
            post.save()
            messages.success(request, f"Article '{title}' updated successfully.")
        else:
            post = BlogPost.objects.create(
                title=title,
                slug=slug,
                category=category,
                author_name=author_name,
                read_time=read_time,
                excerpt=excerpt,
                content=content,
                featured_image_url=featured_image_url,
                is_published=is_published,
                published_at=timezone.now()
            )
            messages.success(request, f"Article '{title}' published successfully.")

        return redirect('cms_blog')
    return redirect('cms_blog')
