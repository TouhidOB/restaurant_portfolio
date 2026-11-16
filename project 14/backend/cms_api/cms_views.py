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
            restaurant_name="CHARRED & PRIME",
            content_json={
                "site": {
                    "name": "CHARRED & PRIME",
                    "tagline": "The Art of the Steakhouse",
                    "phone": "+1 (212) 840-7832",
                    "email": "concierge@charredandprime.com",
                    "address": "482 Lexington Avenue, Manhattan, NY 10017",
                    "hours": "Tuesday – Sunday: 5:00 PM – 11:30 PM (Grill till 11:00 PM)",
                    "currency": "$"
                }
            }
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
            messages.success(request, f"Welcome to Charred & Prime CMS Studio, {user.username}!")
            return redirect('cms_overview')
        else:
            messages.error(request, "Invalid administrator credentials.")

    return render(request, 'cms/login.html')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been signed out of Charred & Prime CMS Studio.")
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
        'recent_reservations': Reservation.objects.all().order_by('-created_at')[:8],
    }
    return render(request, 'cms/overview.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_pages_view(request):
    pages = CustomPage.objects.all().order_by('-created_at')
    return render(request, 'cms/pages.html', {'page_title': 'Custom Page Builder', 'pages': pages})

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_builder_view(request, page_id=None):
    custom_page = None
    if page_id:
        custom_page = get_object_or_404(CustomPage, pk=page_id)
    return render(request, 'cms/page_builder.html', {
        'page_title': f"Editor: {custom_page.title}" if custom_page else "Create New Standalone Page",
        'page': custom_page,
        'blocks_json': json.dumps(custom_page.blocks if custom_page else []),
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_page(request):
    if request.method == 'POST':
        page_id = request.POST.get('page_id')
        title = request.POST.get('title')
        slug = request.POST.get('slug') or slugify(title)
        meta_title = request.POST.get('meta_title', '')
        meta_description = request.POST.get('meta_description', '')
        is_published = request.POST.get('is_published') == 'on'
        blocks_str = request.POST.get('blocks_json', '[]')

        try:
            blocks = json.loads(blocks_str)
        except Exception:
            blocks = []

        if page_id:
            cp = get_object_or_404(CustomPage, pk=page_id)
            cp.title = title
            cp.slug = slug
            cp.meta_title = meta_title
            cp.meta_description = meta_description
            cp.is_published = is_published
            cp.blocks = blocks
            cp.save()
            messages.success(request, f"Page '{title}' updated successfully!")
        else:
            CustomPage.objects.create(
                title=title,
                slug=slug,
                meta_title=meta_title,
                meta_description=meta_description,
                is_published=is_published,
                blocks=blocks
            )
            messages.success(request, f"New page '{title}' created successfully!")
    return redirect('cms_pages')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_delete_page(request, page_id):
    if request.method == 'POST':
        page = get_object_or_404(CustomPage, pk=page_id)
        name = page.title
        page.delete()
        messages.success(request, f"Page '{name}' deleted.")
    return redirect('cms_pages')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_identity_view(request):
    config = get_site_config()
    content = config.content_json or {}
    site_info = content.get('site', {})
    return render(request, 'cms/identity.html', {
        'page_title': 'Steakhouse Identity & Hours',
        'config': config,
        'site_info': site_info
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_identity(request):
    if request.method == 'POST':
        config = get_site_config()
        config.restaurant_name = request.POST.get('restaurant_name', config.restaurant_name)
        content = config.content_json or {}
        content.setdefault('site', {})
        content['site']['name'] = config.restaurant_name
        content['site']['tagline'] = request.POST.get('tagline', '')
        content['site']['phone'] = request.POST.get('contact_phone', '')
        content['site']['email'] = request.POST.get('contact_email', '')
        content['site']['address'] = request.POST.get('address', '')
        content['site']['hours'] = request.POST.get('opening_hours', '')
        config.content_json = content
        config.save()
        messages.success(request, "Steakhouse identity settings saved successfully!")
    return redirect('cms_identity')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservations_view(request):
    shift_filter = request.GET.get('shift', 'all')
    status_filter = request.GET.get('status', 'all')

    qs = Reservation.objects.all().order_by('-created_at')
    if shift_filter in ['lunch', 'dinner']:
        qs = qs.filter(shift=shift_filter)
    if status_filter != 'all':
        qs = qs.filter(status=status_filter)

    counts = {
        'pending': Reservation.objects.filter(status__iexact='pending').count(),
        'confirmed': Reservation.objects.filter(status__iexact='confirmed').count(),
        'seated': Reservation.objects.filter(status__iexact='seated').count(),
        'lunch': Reservation.objects.filter(shift='lunch').count(),
        'dinner': Reservation.objects.filter(shift='dinner').count(),
    }

    return render(request, 'cms/reservations.html', {
        'page_title': 'Table Reservation & Host Desk',
        'reservations': qs,
        'shift_filter': shift_filter,
        'status_filter': status_filter,
        'counts': counts,
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_status(request, res_id):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, pk=res_id)
        new_status = request.POST.get('status')
        if new_status in ['pending', 'confirmed', 'seated', 'cancelled']:
            res.status = new_status
            res.save()
            messages.success(request, f"Reservation {res.reference_code} updated to {new_status.upper()}.")
    return redirect(request.META.get('HTTP_REFERER', 'cms_reservations'))

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_assign_table(request, res_id):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, pk=res_id)
        table_num = request.POST.get('table_number', '').strip()
        res.table_number = table_num
        res.save()
        messages.success(request, f"Table assigned for {res.reference_code}: {table_num or 'Unassigned'}")
    return redirect(request.META.get('HTTP_REFERER', 'cms_reservations'))

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_delete_reservation(request, res_id):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, pk=res_id)
        code = res.reference_code
        res.delete()
        messages.success(request, f"Reservation {code} removed.")
    return redirect('cms_reservations')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_menu_view(request):
    categories = MenuCategory.objects.all().order_by('sort_order')
    selected_cat_id = request.GET.get('category')
    items_qs = MenuItem.objects.select_related('category').all().order_by('sort_order')
    if selected_cat_id:
        items_qs = items_qs.filter(category_id=selected_cat_id)
    return render(request, 'cms/menu.html', {
        'page_title': 'Menu & Steak Availability',
        'categories': categories,
        'items': items_qs,
        'selected_cat_id': selected_cat_id,
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_menu_item(request):
    if request.method == 'POST':
        item_id = request.POST.get('item_id')
        name = request.POST.get('name')
        category_id = request.POST.get('category')
        price = request.POST.get('price')
        cut_type = request.POST.get('cut_type', '')
        serving_size = request.POST.get('serving_size', '')
        short_desc = request.POST.get('short_description', '')
        description = request.POST.get('description', '')
        image_url = request.POST.get('image_url', '')
        is_available = request.POST.get('is_available') == 'on'
        is_featured = request.POST.get('is_featured') == 'on'

        cat = get_object_or_404(MenuCategory, pk=category_id)

        if item_id:
            item = get_object_or_404(MenuItem, pk=item_id)
            item.name = name
            item.category = cat
            item.price = price
            item.cut_type = cut_type
            item.serving_size = serving_size
            item.short_description = short_desc
            item.description = description
            if image_url:
                item.image_url = image_url
            if 'image' in request.FILES:
                item.image = request.FILES['image']
            item.is_available = is_available
            item.is_featured = is_featured
            item.save()
            messages.success(request, f"Item '{name}' updated successfully!")
        else:
            item = MenuItem.objects.create(
                name=name,
                slug=slugify(name),
                category=cat,
                price=price,
                cut_type=cut_type,
                serving_size=serving_size,
                short_description=short_desc,
                description=description,
                image_url=image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
                is_available=is_available,
                is_featured=is_featured
            )
            if 'image' in request.FILES:
                item.image = request.FILES['image']
                item.save()
            messages.success(request, f"New dish '{name}' created successfully!")
    return redirect('cms_menu')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_delete_menu_item(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(MenuItem, pk=item_id)
        name = item.name
        item.delete()
        messages.success(request, f"Dish '{name}' removed from menu.")
    return redirect('cms_menu')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_tour_view(request):
    viewpoints = TourViewpoint.objects.all().order_by('sort_order')
    return render(request, 'cms/tour.html', {'page_title': '3D Spatial Tour Management', 'viewpoints': viewpoints})

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_tour(request):
    if request.method == 'POST':
        vp_id = request.POST.get('vp_id')
        title = request.POST.get('title')
        subtitle = request.POST.get('subtitle', '')
        description = request.POST.get('description', '')
        image_url = request.POST.get('image_url', '')

        if vp_id:
            vp = get_object_or_404(TourViewpoint, pk=vp_id)
            vp.title = title
            vp.subtitle = subtitle
            vp.description = description
            if image_url:
                vp.image_url = image_url
            vp.save()
            messages.success(request, f"Viewpoint '{title}' updated.")
        else:
            TourViewpoint.objects.create(
                title=title,
                subtitle=subtitle,
                description=description,
                image_url=image_url or "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
            )
            messages.success(request, f"New viewpoint '{title}' added.")
    return redirect('cms_tour')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_delete_tour(request, vp_id):
    if request.method == 'POST':
        vp = get_object_or_404(TourViewpoint, pk=vp_id)
        name = vp.title
        vp.delete()
        messages.success(request, f"Viewpoint '{name}' removed.")
    return redirect('cms_tour')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_sections_view(request):
    config = get_site_config()
    content = config.content_json or {}
    return render(request, 'cms/sections.html', {
        'page_title': '14-Section Editorial Content Editor',
        'config': config,
        'content': content
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_sections(request):
    if request.method == 'POST':
        config = get_site_config()
        raw_json = request.POST.get('content_json')
        try:
            parsed = json.loads(raw_json)
            config.content_json = parsed
            config.save()
            messages.success(request, "14-section editorial content updated successfully!")
        except Exception as e:
            messages.error(request, f"Invalid JSON format: {e}")
    return redirect('cms_sections')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_gallery_view(request):
    items = GalleryItem.objects.all().order_by('sort_order')
    return render(request, 'cms/gallery.html', {'page_title': 'Steak & Ambience Gallery', 'items': items})

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_gallery(request):
    if request.method == 'POST':
        title = request.POST.get('title', '')
        category = request.POST.get('category', 'food')
        image_url = request.POST.get('image_url', '')
        GalleryItem.objects.create(
            title=title,
            category=category,
            image_url=image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"
        )
        messages.success(request, "Gallery photograph added successfully!")
    return redirect('cms_gallery')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_delete_gallery(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(GalleryItem, pk=item_id)
        item.delete()
        messages.success(request, "Gallery item removed.")
    return redirect('cms_gallery')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reviews_view(request):
    reviews = Testimonial.objects.all().order_by('sort_order')
    return render(request, 'cms/reviews.html', {'page_title': 'Guest Reviews & Praise', 'reviews': reviews})

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_review(request):
    if request.method == 'POST':
        guest_name = request.POST.get('guest_name')
        source = request.POST.get('source', '')
        review_text = request.POST.get('review_text')
        rating = int(request.POST.get('rating', 5))
        review_date = request.POST.get('review_date', 'November 2026')
        Testimonial.objects.create(
            guest_name=guest_name,
            source=source,
            review_text=review_text,
            rating=rating,
            review_date=review_date
        )
        messages.success(request, f"Review from '{guest_name}' saved!")
    return redirect('cms_reviews')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_delete_review(request, item_id):
    if request.method == 'POST':
        review = get_object_or_404(Testimonial, pk=item_id)
        name = review.guest_name
        review.delete()
        messages.success(request, f"Review by '{name}' removed.")
    return redirect('cms_reviews')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_faqs_view(request):
    config = get_site_config()
    content = config.content_json or {}
    faqs = content.get('faqs', [
        {"question": "How long are your signature steaks dry-aged?", "answer": "Our steaks are aged between 45 and 90 days in our Himalayan pink salt chamber."},
        {"question": "What is your dress code?", "answer": "Smart elegant. We kindly ask gentlemen to avoid athletic wear, beach attire, or hats."},
        {"question": "Can I bring my own wine bottle?", "answer": "We permit up to two 750ml bottles per party not represented on our current cellar list, subject to a $65 corkage fee."}
    ])
    return render(request, 'cms/faqs.html', {'page_title': 'FAQ Manager', 'faqs': faqs})

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_faqs(request):
    if request.method == 'POST':
        config = get_site_config()
        content = config.content_json or {}
        faqs_str = request.POST.get('faqs_json', '[]')
        try:
            content['faqs'] = json.loads(faqs_str)
            config.content_json = content
            config.save()
            messages.success(request, "Steakhouse FAQ entries updated!")
        except Exception as e:
            messages.error(request, f"Invalid JSON: {e}")
    return redirect('cms_faqs')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_schema_view(request):
    config = get_site_config()
    return render(request, 'cms/schema.html', {
        'page_title': 'Master JSON Schema & Content Tree',
        'config': config,
        'content_str': json.dumps(config.content_json or {}, indent=2)
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_schema(request):
    if request.method == 'POST':
        config = get_site_config()
        raw = request.POST.get('schema_json')
        try:
            config.content_json = json.loads(raw)
            config.save()
            messages.success(request, "Master JSON schema synced successfully!")
        except Exception as e:
            messages.error(request, f"Failed to save schema: {e}")
    return redirect('cms_schema')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_view(request):
    posts = BlogPost.objects.select_related('category').all().order_by('-published_at')
    categories = BlogCategory.objects.all().order_by('name')
    return render(request, 'cms/blog.html', {
        'page_title': "Steakhouse Gazette & Sommelier Journal",
        'posts': posts,
        'categories': categories,
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_edit_view(request, post_id=None):
    post = None
    if post_id:
        post = get_object_or_404(BlogPost, pk=post_id)
    categories = BlogCategory.objects.all().order_by('name')
    return render(request, 'cms/blog_edit.html', {
        'page_title': f"Edit Story: {post.title}" if post else "Draft New Journal Article",
        'post': post,
        'categories': categories,
    })

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_save_blog_post(request):
    if request.method == 'POST':
        post_id = request.POST.get('post_id')
        title = request.POST.get('title')
        slug = request.POST.get('slug') or slugify(title)
        category_id = request.POST.get('category')
        excerpt = request.POST.get('excerpt', '')
        content = request.POST.get('content', '')
        featured_image = request.POST.get('featured_image', '')
        author = request.POST.get('author', 'Executive Pitmaster & Meat Sommelier')
        reading_time = request.POST.get('reading_time', '5 min read')
        is_published = request.POST.get('is_published') == 'on'

        cat = BlogCategory.objects.filter(pk=category_id).first() if category_id else None

        if post_id:
            post = get_object_or_404(BlogPost, pk=post_id)
            post.title = title
            post.slug = slug
            post.category = cat
            post.excerpt = excerpt
            post.content = content
            post.featured_image = featured_image
            post.author = author
            post.reading_time = reading_time
            post.is_published = is_published
            post.save()
            messages.success(request, f"Article '{title}' updated successfully!")
        else:
            BlogPost.objects.create(
                title=title,
                slug=slug,
                category=cat,
                excerpt=excerpt,
                content=content,
                featured_image=featured_image or "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
                author=author,
                reading_time=reading_time,
                is_published=is_published
            )
            messages.success(request, f"New article '{title}' published!")
    return redirect('cms_blog')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_delete_blog_post(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(BlogPost, pk=post_id)
        title = post.title
        post.delete()
        messages.success(request, f"Article '{title}' removed from Gazette.")
    return redirect('cms_blog')
