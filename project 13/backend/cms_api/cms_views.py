import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.utils.text import slugify
from django.http import HttpResponseRedirect
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryItem, TeamMember, Testimonial, Reservation,
    CustomPage, BlogCategory, BlogPost
)

def is_staff_or_superuser(user):
    return user.is_active and (user.is_staff or user.is_superuser)

def get_site_config():
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="SEOUL STREET (서울포차)",
            tagline="Contemporary Korean Street Culture Meets Cinematic Digital Dining",
            hero_subtitle="Discover sizzling spicy tteokbokki, golden crispy Korean fried chicken, and late-night street pocha energy under glowing Seoul neons.",
            contact_email="hello@seoulstreetfood.com",
            contact_phone="+82 2 312 9988",
            address="28 Wausan-ro 21-gil, Mapo-gu, Seoul, South Korea (Hongdae Night Market)",
            opening_hours="Monday – Sunday: 17:00 – 04:00 (Late Night Street Pocha)"
        )
    return config

def cms_login_view(request):
    if request.user.is_authenticated and is_staff_or_superuser(request.user):
        return redirect('cms_overview')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user and is_staff_or_superuser(user):
            login(request, user)
            messages.success(request, f"Welcome to Seoul Street CMS Studio, {user.username}!")
            return redirect('cms_overview')
        else:
            messages.error(request, "Invalid administrator credentials.")

    return render(request, 'cms/login.html')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been signed out of Seoul Street CMS Studio.")
    return redirect('cms_login')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_overview_view(request):
    config = get_site_config()
    content = config.content_json or {}

    total_reservations = Reservation.objects.count()
    pending_reservations = Reservation.objects.filter(status__iexact='pending').count()
    confirmed_reservations = Reservation.objects.filter(status__iexact='confirmed').count()
    seated_reservations = Reservation.objects.filter(status__iexact='seated').count()
    lunch_covers = Reservation.objects.filter(shift='lunch').exclude(status__iexact='cancelled').count()
    dinner_covers = Reservation.objects.filter(shift='dinner').exclude(status__iexact='cancelled').count()

    total_pages = CustomPage.objects.count()
    total_articles = BlogPost.objects.count()
    menu_categories = MenuCategory.objects.count()

    context = {
        'page_title': 'Overview & KPIs',
        'config': config,
        'content': content,
        'total_reservations': total_reservations,
        'pending_reservations': pending_reservations,
        'confirmed_reservations': confirmed_reservations,
        'seated_reservations': seated_reservations,
        'lunch_covers': lunch_covers,
        'dinner_covers': dinner_covers,
        'total_pages': total_pages,
        'total_articles': total_articles,
        'menu_categories': menu_categories,
        'recent_reservations': Reservation.objects.all()[:6],
    }
    return render(request, 'cms/overview.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_pages_view(request):
    config = get_site_config()
    pages = CustomPage.objects.all()
    context = {
        'page_title': 'Standalone Custom Pages',
        'config': config,
        'pages': pages,
    }
    return render(request, 'cms/pages.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_builder_view(request, page_id=None):
    config = get_site_config()
    page_obj = None
    if page_id:
        page_obj = get_object_or_404(CustomPage, id=page_id)

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip() or slugify(title)
        meta_description = request.POST.get('meta_description', '').strip()
        is_published = request.POST.get('is_published') == 'on'
        blocks_raw = request.POST.get('blocks_json', '[]')

        try:
            blocks = json.loads(blocks_raw) if blocks_raw else []
        except Exception:
            blocks = []

        if page_obj:
            page_obj.title = title
            page_obj.slug = slug
            page_obj.meta_description = meta_description
            page_obj.is_published = is_published
            page_obj.blocks = blocks
            page_obj.save()
            messages.success(request, f"Custom page '{page_obj.title}' updated successfully.")
        else:
            page_obj = CustomPage.objects.create(
                title=title,
                slug=slug,
                meta_description=meta_description,
                is_published=is_published,
                blocks=blocks
            )
            messages.success(request, f"New custom page '{page_obj.title}' created successfully.")

        return redirect('cms_pages')

    blocks_json_string = json.dumps(page_obj.blocks if page_obj else [], indent=2)

    context = {
        'page_title': f"Visual Page Builder — {page_obj.title if page_obj else 'New Page'}",
        'config': config,
        'page_obj': page_obj,
        'blocks_json_string': blocks_json_string,
    }
    return render(request, 'cms/page_builder.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_delete_view(request, page_id):
    page_obj = get_object_or_404(CustomPage, id=page_id)
    title = page_obj.title
    page_obj.delete()
    messages.success(request, f"Page '{title}' deleted.")
    return redirect('cms_pages')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_identity_view(request):
    config = get_site_config()
    if request.method == 'POST':
        config.restaurant_name = request.POST.get('restaurant_name', config.restaurant_name)
        config.tagline = request.POST.get('tagline', config.tagline)
        config.hero_subtitle = request.POST.get('hero_subtitle', config.hero_subtitle)
        config.contact_email = request.POST.get('contact_email', config.contact_email)
        config.contact_phone = request.POST.get('contact_phone', config.contact_phone)
        config.address = request.POST.get('address', config.address)
        config.opening_hours = request.POST.get('opening_hours', config.opening_hours)
        config.save()
        messages.success(request, "Brand identity & hours settings updated.")
        return redirect('cms_identity')

    context = {
        'page_title': 'Brand Identity & Pocha Hours',
        'config': config,
    }
    return render(request, 'cms/identity.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservations_view(request):
    config = get_site_config()

    if request.method == 'POST':
        action = request.POST.get('action')
        res_id = request.POST.get('reservation_id')
        if res_id:
            res_obj = get_object_or_404(Reservation, id=res_id)
            if action == 'approve':
                res_obj.status = 'confirmed'
                res_obj.save()
                messages.success(request, f"Reservation {res_obj.reference_code} approved.")
            elif action == 'cancel':
                res_obj.status = 'cancelled'
                res_obj.save()
                messages.info(request, f"Reservation {res_obj.reference_code} cancelled.")
            elif action == 'seat':
                res_obj.status = 'seated'
                res_obj.save()
                messages.success(request, f"Party {res_obj.reference_code} seated.")
            elif action == 'update_status':
                res_obj.status = request.POST.get('status', res_obj.status)
                res_obj.table_number = request.POST.get('table_number', res_obj.table_number)
                res_obj.save()
                messages.success(request, f"Reservation {res_obj.reference_code} updated.")

        return HttpResponseRedirect(request.get_full_path())

    reservations = Reservation.objects.all()
    status_filter = request.GET.get('status')
    shift_filter = request.GET.get('shift')
    q = request.GET.get('q')

    if status_filter:
        reservations = reservations.filter(status__iexact=status_filter)
    if shift_filter:
        reservations = reservations.filter(shift=shift_filter)
    if q:
        reservations = reservations.filter(
            reference_code__icontains=q
        ) | reservations.filter(
            full_name__icontains=q
        ) | reservations.filter(
            phone__icontains=q
        )

    context = {
        'page_title': 'Maitre D’ Table Reservation & Host Desk',
        'config': config,
        'reservations': reservations,
        'current_status': status_filter,
        'current_shift': shift_filter,
        'q': q or '',
        'counts': {
            'total': Reservation.objects.count(),
            'pending': Reservation.objects.filter(status__iexact='pending').count(),
            'confirmed': Reservation.objects.filter(status__iexact='confirmed').count(),
            'seated': Reservation.objects.filter(status__iexact='seated').count(),
            'lunch': Reservation.objects.filter(shift='lunch').exclude(status__iexact='cancelled').count(),
            'dinner': Reservation.objects.filter(shift='dinner').exclude(status__iexact='cancelled').count(),
        }
    }
    return render(request, 'cms/reservations.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_menu_view(request):
    config = get_site_config()
    categories = MenuCategory.objects.all().prefetch_related('items')

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_category':
            name = request.POST.get('name')
            slug = slugify(name)
            desc = request.POST.get('description', '')
            MenuCategory.objects.create(name=name, slug=slug, description=desc)
            messages.success(request, f"Category '{name}' created.")
        elif action == 'add_item':
            cat_id = request.POST.get('category_id')
            cat = get_object_or_404(MenuCategory, id=cat_id)
            name = request.POST.get('name')
            slug = slugify(name)
            price = request.POST.get('price', '₩14,000')
            desc = request.POST.get('description', '')
            img = request.POST.get('image', '')
            is_sig = request.POST.get('is_featured') == 'on'
            MenuItem.objects.create(
                category=cat,
                name=name,
                slug=slug,
                price=price,
                description=desc,
                image=img,
                image_url=img,
                is_featured=is_sig
            )
            messages.success(request, f"Dish '{name}' added.")
        return redirect('cms_menu')

    context = {
        'page_title': 'Menu & Dish Availability',
        'config': config,
        'categories': categories,
    }
    return render(request, 'cms/menu.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_tour_view(request):
    config = get_site_config()
    viewpoints = TourViewpoint.objects.all()
    context = {
        'page_title': '3D WebGL Pocha Viewpoints',
        'config': config,
        'viewpoints': viewpoints,
    }
    return render(request, 'cms/tour.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_sections_view(request):
    config = get_site_config()
    content = config.content_json or {}

    if request.method == 'POST':
        raw_json = request.POST.get('raw_json')
        try:
            parsed = json.loads(raw_json)
            config.content_json = parsed
            config.save()
            messages.success(request, "Section copy & configuration saved successfully.")
        except Exception as e:
            messages.error(request, f"Invalid JSON format: {e}")
        return redirect('cms_sections')

    context = {
        'page_title': '15-Section Landing Page Editor',
        'config': config,
        'content_json_str': json.dumps(content, indent=2),
    }
    return render(request, 'cms/sections.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_gallery_view(request):
    config = get_site_config()
    images = GalleryItem.objects.all()
    context = {
        'page_title': 'Visual Archives & Neon Photography',
        'config': config,
        'images': images,
    }
    return render(request, 'cms/gallery.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reviews_view(request):
    config = get_site_config()
    reviews = Testimonial.objects.all()
    context = {
        'page_title': 'Customer Reviews & Accolades',
        'config': config,
        'reviews': reviews,
    }
    return render(request, 'cms/reviews.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_faqs_view(request):
    config = get_site_config()
    context = {
        'page_title': 'Dining FAQs Manager',
        'config': config,
    }
    return render(request, 'cms/faqs.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_schema_view(request):
    config = get_site_config()
    full_data = {
        'site_config': {
            'restaurant_name': config.restaurant_name,
            'tagline': config.tagline,
            'address': config.address,
            'opening_hours': config.opening_hours,
        },
        'editorial_sections': config.content_json or {},
    }
    context = {
        'page_title': 'Master JSON Schema',
        'config': config,
        'schema_json': json.dumps(full_data, indent=2),
    }
    return render(request, 'cms/schema.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_view(request):
    config = get_site_config()
    posts = BlogPost.objects.all().select_related('category')
    categories = BlogCategory.objects.all()
    context = {
        'page_title': 'Seoul Street Gazette & Pocha Stories',
        'config': config,
        'posts': posts,
        'categories': categories,
    }
    return render(request, 'cms/blog.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_edit_view(request, post_id=None):
    config = get_site_config()
    post_obj = None
    if post_id:
        post_obj = get_object_or_404(BlogPost, id=post_id)

    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip() or slugify(title)
        category_id = request.POST.get('category_id')
        category = BlogCategory.objects.filter(id=category_id).first() if category_id else None
        excerpt = request.POST.get('excerpt', '').strip()
        content = request.POST.get('content', '').strip()
        image = request.POST.get('image', '').strip()
        author_name = request.POST.get('author_name', 'Seoul Street Team').strip()
        read_time = request.POST.get('read_time', '5 min read').strip()
        is_published = request.POST.get('is_published') == 'on'

        if post_obj:
            post_obj.title = title
            post_obj.slug = slug
            post_obj.category = category
            post_obj.excerpt = excerpt
            post_obj.content = content
            post_obj.image = image
            post_obj.author_name = author_name
            post_obj.read_time = read_time
            post_obj.is_published = is_published
            post_obj.save()
            messages.success(request, f"Article '{post_obj.title}' updated successfully.")
        else:
            post_obj = BlogPost.objects.create(
                title=title,
                slug=slug,
                category=category,
                excerpt=excerpt,
                content=content,
                image=image,
                author_name=author_name,
                read_time=read_time,
                is_published=is_published
            )
            messages.success(request, f"New article '{post_obj.title}' published successfully.")

        return redirect('cms_blog')

    context = {
        'page_title': f"Article Studio — {post_obj.title if post_obj else 'New Article'}",
        'config': config,
        'post_obj': post_obj,
        'categories': categories,
    }
    return render(request, 'cms/blog_edit.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_delete_view(request, post_id):
    post_obj = get_object_or_404(BlogPost, id=post_id)
    title = post_obj.title
    post_obj.delete()
    messages.success(request, f"Article '{title}' deleted.")
    return redirect('cms_blog')
