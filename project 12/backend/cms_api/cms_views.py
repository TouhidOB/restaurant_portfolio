import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.text import slugify
from .models import (
    SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost,
    MenuCategory, MenuItem, TourViewpoint, DiningExperience,
    GalleryImage, TeamMember, Testimonial
)

def is_staff_or_superuser(user):
    return user.is_authenticated and (user.is_staff or user.is_superuser)


def get_site_config(user=None):
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            site_title="VILLA RIVIERA",
            tagline="Coastal Villa Architecture Meets Contemporary Fine Dining",
            raw_content_json={}
        )
    return config


def cms_login_view(request):
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect('cms_overview')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        user = authenticate(request, username=username, password=password)

        if user and (user.is_staff or user.is_superuser):
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}. Access to Villa Riviera CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_overview'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of Villa Riviera CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_overview_view(request):
    config = get_site_config(request.user)
    content = config.raw_content_json or {}

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
        'page_title': 'Overview & Key Metrics',
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
    config = get_site_config(request.user)
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
    config = get_site_config(request.user)
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
            messages.success(request, f"Page '{page_obj.title}' updated successfully.")
        else:
            page_obj = CustomPage.objects.create(
                title=title,
                slug=slug,
                meta_description=meta_description,
                is_published=is_published,
                blocks=blocks
            )
            messages.success(request, f"New page '{page_obj.title}' created.")

        return redirect('cms_pages')

    context = {
        'page_title': f"Visual Page Builder: {page_obj.title if page_obj else 'New Page'}",
        'config': config,
        'page_obj': page_obj,
        'blocks_json': json.dumps(page_obj.blocks if page_obj else []),
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
    config = get_site_config(request.user)

    if request.method == 'POST':
        config.site_title = request.POST.get('site_title', config.site_title)
        config.tagline = request.POST.get('tagline', config.tagline)
        config.hero_subtitle = request.POST.get('hero_subtitle', config.hero_subtitle)
        config.philosophy_quote = request.POST.get('philosophy_quote', config.philosophy_quote)
        config.chef_quote = request.POST.get('chef_quote', config.chef_quote)
        config.contact_email = request.POST.get('contact_email', config.contact_email)
        config.contact_phone = request.POST.get('contact_phone', config.contact_phone)
        config.address = request.POST.get('address', config.address)
        config.opening_hours = request.POST.get('opening_hours', config.opening_hours)
        config.save()
        messages.success(request, "Villa Riviera identity and logistics saved.")
        return redirect('cms_identity')

    context = {
        'page_title': 'Villa Riviera Identity & Logistics',
        'config': config,
    }
    return render(request, 'cms/identity.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservations_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        res_id = request.POST.get('reservation_id')
        action = request.POST.get('action')
        res_obj = get_object_or_404(Reservation, id=res_id)

        if action == 'confirm':
            res_obj.status = 'confirmed'
            res_obj.save()
            messages.success(request, f"Reservation {res_obj.reference_code} ({res_obj.full_name}) confirmed.")
        elif action == 'seat':
            res_obj.status = 'seated'
            res_obj.save()
            messages.success(request, f"Guest {res_obj.full_name} marked as seated at table {res_obj.table_number or 'unassigned'}.")
        elif action == 'cancel':
            res_obj.status = 'cancelled'
            res_obj.save()
            messages.warning(request, f"Reservation {res_obj.reference_code} cancelled.")
        elif action == 'update_table':
            res_obj.table_number = request.POST.get('table_number', '').strip()
            res_obj.status = request.POST.get('status', res_obj.status)
            res_obj.save()
            messages.success(request, f"Table assignment updated for {res_obj.reference_code}.")
        elif action == 'delete':
            res_obj.delete()
            messages.info(request, "Reservation removed.")

        return redirect('cms_reservations')

    shift_filter = request.GET.get('shift', 'all').lower()
    status_filter = request.GET.get('status', 'all').lower()
    search_q = request.GET.get('q', '').strip()

    reservations = Reservation.objects.all()
    if shift_filter in ['lunch', 'dinner']:
        reservations = reservations.filter(shift=shift_filter)
    if status_filter in ['pending', 'confirmed', 'seated', 'cancelled']:
        reservations = reservations.filter(status__iexact=status_filter)
    if search_q:
        reservations = reservations.filter(
            reference_code__icontains=search_q
        ) | reservations.filter(
            full_name__icontains=search_q
        ) | reservations.filter(
            email__icontains=search_q
        ) | reservations.filter(
            phone__icontains=search_q
        )

    context = {
        'page_title': "Maitre D' Table Reservation & Host Desk",
        'config': config,
        'reservations': reservations,
        'shift_filter': shift_filter,
        'status_filter': status_filter,
        'search_q': search_q,
        'pending_count': Reservation.objects.filter(status__iexact='pending').count(),
        'confirmed_count': Reservation.objects.filter(status__iexact='confirmed').count(),
        'seated_count': Reservation.objects.filter(status__iexact='seated').count(),
        'lunch_count': Reservation.objects.filter(shift='lunch').count(),
        'dinner_count': Reservation.objects.filter(shift='dinner').count(),
    }
    return render(request, 'cms/reservations.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_menu_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_category':
            name = request.POST.get('name', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(name)
            desc = request.POST.get('description', '').strip()
            MenuCategory.objects.create(name=name, slug=slug, description=desc)
            messages.success(request, f"Menu category '{name}' added.")
        elif action == 'add_item':
            cat_id = request.POST.get('category_id')
            cat = get_object_or_404(MenuCategory, id=cat_id)
            name = request.POST.get('name', '').strip()
            subtitle = request.POST.get('subtitle', '').strip()
            desc = request.POST.get('description', '').strip()
            price = request.POST.get('price', '').strip()
            image = request.POST.get('image', '').strip()
            is_sig = request.POST.get('is_signature') == 'on'
            tags = request.POST.get('dietary_tags', '').strip()
            pairing = request.POST.get('pairing_notes', '').strip()
            MenuItem.objects.create(
                category=cat, name=name, subtitle=subtitle,
                description=desc, price=price, image=image,
                is_signature=is_sig, dietary_tags=tags, pairing_notes=pairing
            )
            messages.success(request, f"Menu item '{name}' added.")
        elif action == 'edit_item':
            item_id = request.POST.get('item_id')
            item = get_object_or_404(MenuItem, id=item_id)
            item.name = request.POST.get('name', item.name).strip()
            item.subtitle = request.POST.get('subtitle', item.subtitle).strip()
            item.description = request.POST.get('description', item.description).strip()
            item.price = request.POST.get('price', item.price).strip()
            item.image = request.POST.get('image', item.image).strip()
            item.is_signature = request.POST.get('is_signature') == 'on'
            item.dietary_tags = request.POST.get('dietary_tags', item.dietary_tags).strip()
            item.pairing_notes = request.POST.get('pairing_notes', item.pairing_notes).strip()
            item.save()
            messages.success(request, f"Item '{item.name}' updated.")
        elif action == 'delete_item':
            item_id = request.POST.get('item_id')
            item = get_object_or_404(MenuItem, id=item_id)
            item.delete()
            messages.info(request, "Menu item removed.")

        return redirect('cms_menu')

    categories = MenuCategory.objects.prefetch_related('items').all()
    context = {
        'page_title': 'A La Carte & Gastronomic Repertoire',
        'config': config,
        'categories': categories,
    }
    return render(request, 'cms/menu.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_tour_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_viewpoint':
            title = request.POST.get('title', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(title)
            desc = request.POST.get('description', '').strip()
            atmos = request.POST.get('atmosphere', '').strip()
            TourViewpoint.objects.create(title=title, slug=slug, description=desc, atmosphere=atmos)
            messages.success(request, f"Viewpoint '{title}' added.")
        elif action == 'delete_viewpoint':
            vp_id = request.POST.get('viewpoint_id')
            vp = get_object_or_404(TourViewpoint, id=vp_id)
            vp.delete()
            messages.info(request, "Viewpoint removed.")

        return redirect('cms_tour')

    viewpoints = TourViewpoint.objects.all()
    context = {
        'page_title': '3D Spatial Viewpoints & Virtual Tour',
        'config': config,
        'viewpoints': viewpoints,
    }
    return render(request, 'cms/tour.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_sections_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        raw_json = request.POST.get('raw_content_json', '{}')
        try:
            config.raw_content_json = json.loads(raw_json)
            config.save()
            messages.success(request, "Section JSON structure updated successfully.")
        except Exception as e:
            messages.error(request, f"Invalid JSON payload: {e}")

        return redirect('cms_sections')

    context = {
        'page_title': '15-Section Content & Copywriting',
        'config': config,
        'sections_json_formatted': json.dumps(config.raw_content_json, indent=2),
    }
    return render(request, 'cms/sections.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_gallery_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_image':
            title = request.POST.get('title', '').strip()
            category = request.POST.get('category', 'Architecture').strip()
            url = request.POST.get('image_url', '').strip()
            caption = request.POST.get('caption', '').strip()
            GalleryImage.objects.create(title=title, category=category, image_url=url, caption=caption)
            messages.success(request, f"Gallery photo '{title}' added.")
        elif action == 'delete_image':
            img_id = request.POST.get('image_id')
            img = get_object_or_404(GalleryImage, id=img_id)
            img.delete()
            messages.info(request, "Gallery photo removed.")

        return redirect('cms_gallery')

    images = GalleryImage.objects.all()
    context = {
        'page_title': 'Visual Retrospective & Photo Archives',
        'config': config,
        'images': images,
    }
    return render(request, 'cms/gallery.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reviews_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_review':
            author = request.POST.get('author', '').strip()
            source = request.POST.get('source_title', '').strip()
            quote = request.POST.get('quote', '').strip()
            rating = int(request.POST.get('rating', 5))
            Testimonial.objects.create(author=author, source_title=source, quote=quote, rating=rating)
            messages.success(request, f"Review from '{author}' added.")
        elif action == 'delete_review':
            r_id = request.POST.get('review_id')
            r = get_object_or_404(Testimonial, id=r_id)
            r.delete()
            messages.info(request, "Review removed.")

        return redirect('cms_reviews')

    reviews = Testimonial.objects.all()
    context = {
        'page_title': 'Critical Recognition & Guest Praise',
        'config': config,
        'reviews': reviews,
    }
    return render(request, 'cms/reviews.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_faqs_view(request):
    config = get_site_config(request.user)
    context = {
        'page_title': 'FAQ & Visit Concierge',
        'config': config,
    }
    return render(request, 'cms/faqs.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_schema_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        raw_json = request.POST.get('schema_json', '{}')
        try:
            config.raw_content_json = json.loads(raw_json)
            config.save()
            messages.success(request, "Master JSON schema updated.")
        except Exception as e:
            messages.error(request, f"JSON Error: {e}")
        return redirect('cms_schema')

    context = {
        'page_title': 'Master JSON Schema',
        'config': config,
        'schema_json_formatted': json.dumps(config.raw_content_json, indent=2),
    }
    return render(request, 'cms/schema.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_view(request):
    config = get_site_config(request.user)
    posts = BlogPost.objects.select_related('category').all()
    categories = BlogCategory.objects.all()
    context = {
        'page_title': 'Riviera Gazette & Editorial Chronicles',
        'config': config,
        'posts': posts,
        'categories': categories,
    }
    return render(request, 'cms/blog.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_edit_view(request, post_id=None):
    config = get_site_config(request.user)
    post_obj = None
    if post_id:
        post_obj = get_object_or_404(BlogPost, id=post_id)

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip() or slugify(title)
        cat_id = request.POST.get('category_id')
        category = get_object_or_404(BlogCategory, id=cat_id)
        excerpt = request.POST.get('excerpt', '').strip()
        content = request.POST.get('content', '').strip()
        image = request.POST.get('featured_image', '').strip()
        author = request.POST.get('author_name', 'Chef Antoine Laurent').strip()
        reading_time = request.POST.get('reading_time', '5 min read').strip()
        is_published = request.POST.get('is_published') == 'on'

        if post_obj:
            post_obj.title = title
            post_obj.slug = slug
            post_obj.category = category
            post_obj.excerpt = excerpt
            post_obj.content = content
            post_obj.featured_image = image
            post_obj.author_name = author
            post_obj.reading_time = reading_time
            post_obj.is_published = is_published
            post_obj.save()
            messages.success(request, f"Article '{post_obj.title}' updated.")
        else:
            post_obj = BlogPost.objects.create(
                title=title, slug=slug, category=category,
                excerpt=excerpt, content=content, featured_image=image,
                author_name=author, reading_time=reading_time,
                is_published=is_published
            )
            messages.success(request, f"Article '{post_obj.title}' published.")

        return redirect('cms_blog')

    categories = BlogCategory.objects.all()
    context = {
        'page_title': f"Edit Article: {post_obj.title if post_obj else 'New Article'}",
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
