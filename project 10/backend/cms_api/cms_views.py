import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.text import slugify
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost, MenuCategory, MenuItem

def is_staff_or_superuser(user):
    return user.is_authenticated and (user.is_staff or user.is_superuser)


def get_site_config(user=None):
    config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="BENGAL HERITAGE DINING",
            content_json={},
            theme_json={},
            is_published=True,
            updated_by=user if user and user.is_authenticated else None
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
            messages.success(request, f"Welcome, {user.username}. Access to Bengal Heritage CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_overview'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of Bengal Heritage CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_overview_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    total_reservations = Reservation.objects.count()
    pending_reservations = Reservation.objects.filter(status='pending').count()
    confirmed_reservations = Reservation.objects.filter(status='confirmed').count()
    seated_reservations = Reservation.objects.filter(status='seated').count()
    lunch_covers = Reservation.objects.filter(shift='lunch', status__in=['pending', 'confirmed', 'seated']).count()
    dinner_covers = Reservation.objects.filter(shift='dinner', status__in=['pending', 'confirmed', 'seated']).count()

    total_pages = CustomPage.objects.count()
    total_articles = BlogPost.objects.count()
    menu_categories = MenuCategory.objects.count() or len(content.get('menu', {}).get('categories', []))

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
        'recent_reservations': Reservation.objects.all().order_by('-created_at')[:6],
    }
    return render(request, 'cms/overview.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_pages_view(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create_page':
            title = request.POST.get('title', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(title)
            meta_desc = request.POST.get('meta_description', '').strip()

            if title and slug:
                CustomPage.objects.create(
                    title=title,
                    slug=slug,
                    meta_description=meta_desc,
                    blocks=[],
                    is_published=True
                )
                messages.success(request, f"Created new custom page '{title}' (/{slug})")
                return redirect('cms_pages')
        elif action == 'delete_page':
            page_id = request.POST.get('page_id')
            page_obj = get_object_or_404(CustomPage, id=page_id)
            title = page_obj.title
            page_obj.delete()
            messages.warning(request, f"Deleted page '{title}'")
            return redirect('cms_pages')

    pages = CustomPage.objects.all().order_by('-updated_at')
    return render(request, 'cms/pages.html', {
        'page_title': 'Elementor-Style Standalone Pages',
        'pages': pages,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_builder_view(request, pk=None):
    page_obj = None
    if pk:
        page_obj = get_object_or_404(CustomPage, pk=pk)

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'save_page':
            title = request.POST.get('title', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(title)
            meta_description = request.POST.get('meta_description', '').strip()
            is_published = request.POST.get('is_published') == 'on'
            blocks_json_str = request.POST.get('blocks_json', '[]')

            try:
                blocks = json.loads(blocks_json_str)
            except json.JSONDecodeError:
                blocks = []
                messages.error(request, "Blocks JSON invalid. Falling back to previous layout.")

            if not page_obj:
                page_obj = CustomPage.objects.create(
                    title=title,
                    slug=slug,
                    meta_description=meta_description,
                    blocks=blocks,
                    is_published=is_published
                )
                messages.success(request, f"Created page '{title}' with {len(blocks)} blocks!")
                return redirect('cms_page_builder_edit', pk=page_obj.pk)
            else:
                page_obj.title = title
                page_obj.slug = slug
                page_obj.meta_description = meta_description
                page_obj.blocks = blocks
                page_obj.is_published = is_published
                page_obj.save()
                messages.success(request, f"Page '{page_obj.title}' saved successfully!")
                return redirect('cms_page_builder_edit', pk=page_obj.pk)

    blocks_json = json.dumps(page_obj.blocks if page_obj else [], indent=2)
    return render(request, 'cms/page_builder.html', {
        'page_title': f"Visual Page Builder — {page_obj.title if page_obj else 'New Page'}",
        'page_obj': page_obj,
        'blocks_json': blocks_json,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_identity_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        name_en = request.POST.get('restaurant_name_en', 'BENGAL HERITAGE DINING').strip()
        tagline_en = request.POST.get('tagline_en', '').strip()
        address_en = request.POST.get('address_en', '').strip()
        phone = request.POST.get('phone', '').strip()
        email = request.POST.get('email', '').strip()
        hours_en = request.POST.get('hours_en', '').strip()

        hero = content.get('hero', {})
        hero['restaurant_name'] = {'en': name_en, 'bn': request.POST.get('restaurant_name_bn', 'বাংলার ঐতিহ্য ডাইনিং')}
        hero['tagline'] = {'en': tagline_en, 'bn': request.POST.get('tagline_bn', '')}
        content['hero'] = hero

        loc = content.get('location', {})
        loc['address'] = {'en': address_en, 'bn': request.POST.get('address_bn', '')}
        loc['phone'] = phone
        loc['email'] = email
        loc['hours'] = {'en': hours_en, 'bn': request.POST.get('hours_bn', '')}
        content['location'] = loc

        config.restaurant_name = name_en
        config.content_json = content
        config.save()
        messages.success(request, "Bengal Heritage identity & logistics updated successfully!")
        return redirect('cms_identity')

    return render(request, 'cms/identity.html', {
        'page_title': 'Identity & Brand Coordinates',
        'config': config,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservations_view(request):
    shift_filter = request.GET.get('shift', '')
    status_filter = request.GET.get('status', '')
    search_query = request.GET.get('search', '').strip()

    qs = Reservation.objects.all().order_by('-created_at')
    if shift_filter in ['lunch', 'dinner']:
        qs = qs.filter(shift=shift_filter)
    if status_filter:
        qs = qs.filter(status=status_filter)
    if search_query:
        qs = qs.filter(
            models.Q(full_name__icontains=search_query) |
            models.Q(reference_code__icontains=search_query) |
            models.Q(phone__icontains=search_query) |
            models.Q(table_number__icontains=search_query)
        )

    counts = {
        'all': Reservation.objects.count(),
        'pending': Reservation.objects.filter(status='pending').count(),
        'confirmed': Reservation.objects.filter(status='confirmed').count(),
        'seated': Reservation.objects.filter(status='seated').count(),
        'lunch': Reservation.objects.filter(shift='lunch').count(),
        'dinner': Reservation.objects.filter(shift='dinner').count(),
    }

    return render(request, 'cms/reservations.html', {
        'page_title': 'Maitre D’ Table Reservations & Host Desk',
        'reservations': qs,
        'counts': counts,
        'current_shift': shift_filter,
        'current_status': status_filter,
        'search_query': search_query,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_status_view(request, res_id):
    if request.method == 'POST':
        reservation = get_object_or_404(Reservation, id=res_id)
        new_status = request.POST.get('status')
        table_num = request.POST.get('table_number')
        admin_notes = request.POST.get('admin_notes')

        if new_status:
            reservation.status = new_status
        if table_num is not None:
            reservation.table_number = table_num
        if admin_notes is not None:
            reservation.admin_notes = admin_notes
        reservation.save()

        messages.success(request, f"Updated reservation [{reservation.reference_code}] for {reservation.full_name}.")
    return redirect(request.META.get('HTTP_REFERER', 'cms_reservations'))


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_delete_view(request, res_id):
    if request.method == 'POST':
        reservation = get_object_or_404(Reservation, id=res_id)
        ref = reservation.reference_code
        reservation.delete()
        messages.warning(request, f"Reservation inquiry [{ref}] removed.")
    return redirect(request.META.get('HTTP_REFERER', 'cms_reservations'))


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_menu_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'save_menu_raw':
            raw_str = request.POST.get('menu_json', '{}')
            try:
                parsed = json.loads(raw_str)
                content['menu'] = parsed
                config.content_json = content
                config.save()
                messages.success(request, "Bengal Heritage menu repertoire saved successfully!")
            except json.JSONDecodeError as e:
                messages.error(request, f"Invalid JSON format: {e}")
            return redirect('cms_menu')

    categories = MenuCategory.objects.all().order_by('sort_order')
    menu_items = MenuItem.objects.all().order_by('sort_order')
    menu_json = json.dumps(content.get('menu', {}), indent=2, ensure_ascii=False)

    return render(request, 'cms/menu.html', {
        'page_title': 'Heritage Menu & Seasonal Offerings',
        'menu_json': menu_json,
        'categories': categories,
        'menu_items': menu_items,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_tour_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        tour_str = request.POST.get('tour_json', '{}')
        try:
            content['virtualTour'] = json.loads(tour_str)
            config.content_json = content
            config.save()
            messages.success(request, "Virtual tour viewpoints saved successfully!")
        except Exception as e:
            messages.error(request, f"Error saving viewpoints: {e}")
        return redirect('cms_tour')

    tour_json = json.dumps(content.get('virtualTour', {}), indent=2, ensure_ascii=False)
    return render(request, 'cms/tour.html', {
        'page_title': '3D Courtyard Virtual Tour',
        'tour_json': tour_json,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_sections_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        sections_str = request.POST.get('sections_json', '{}')
        try:
            parsed = json.loads(sections_str)
            config.content_json = parsed
            config.save()
            messages.success(request, "All 15 Bengal Heritage sections updated & published successfully!")
        except Exception as e:
            messages.error(request, f"Invalid JSON format: {e}")
        return redirect('cms_sections')

    sections_json = json.dumps(content, indent=2, ensure_ascii=False)
    return render(request, 'cms/sections.html', {
        'page_title': '15-Section Master Editor',
        'sections_json': sections_json,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_gallery_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}
    gallery = content.get('gallery', {})

    if request.method == 'POST':
        gallery_str = request.POST.get('gallery_json', '{}')
        try:
            content['gallery'] = json.loads(gallery_str)
            config.content_json = content
            config.save()
            messages.success(request, "Heritage visual gallery updated!")
        except Exception as e:
            messages.error(request, f"Error: {e}")
        return redirect('cms_gallery')

    gallery_json = json.dumps(gallery, indent=2, ensure_ascii=False)
    return render(request, 'cms/gallery.html', {
        'page_title': 'Heritage Visual Archive & Gallery',
        'gallery_json': gallery_json,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reviews_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}
    test = content.get('testimonials', {})

    if request.method == 'POST':
        rev_str = request.POST.get('reviews_json', '{}')
        try:
            content['testimonials'] = json.loads(rev_str)
            config.content_json = content
            config.save()
            messages.success(request, "Guest accolades & critical honors saved!")
        except Exception as e:
            messages.error(request, f"Error: {e}")
        return redirect('cms_reviews')

    reviews_json = json.dumps(test, indent=2, ensure_ascii=False)
    return render(request, 'cms/reviews.html', {
        'page_title': 'Guest Reviews & Distinctions',
        'reviews_json': reviews_json,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_faqs_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        faqs_str = request.POST.get('faqs_json', '[]')
        try:
            content['faqs'] = json.loads(faqs_str)
            config.content_json = content
            config.save()
            messages.success(request, "Frequently Asked Questions updated!")
        except Exception as e:
            messages.error(request, f"Error: {e}")
        return redirect('cms_faqs')

    faqs_json = json.dumps(content.get('faqs', []), indent=2, ensure_ascii=False)
    return render(request, 'cms/faqs.html', {
        'page_title': 'Frequently Asked Questions',
        'faqs_json': faqs_json,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_schema_view(request):
    config = get_site_config(request.user)
    schema_json = json.dumps(config.content_json, indent=2, ensure_ascii=False)
    return render(request, 'cms/schema.html', {
        'page_title': 'Master Schema & JSON Architecture',
        'schema_json': schema_json,
        'config': config,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_view(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create_post':
            title = request.POST.get('title', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(title)
            category_id = request.POST.get('category_id')
            excerpt = request.POST.get('excerpt', '').strip()
            content_html = request.POST.get('content', '').strip()
            featured_image = request.POST.get('featured_image', '').strip()
            author_name = request.POST.get('author_name', 'Chef Subrata Roy').strip()
            reading_time = request.POST.get('reading_time', '5 min read').strip()

            cat = None
            if category_id:
                cat = BlogCategory.objects.filter(id=category_id).first()

            BlogPost.objects.create(
                title=title,
                slug=slug,
                category=cat,
                excerpt=excerpt,
                content=content_html,
                featured_image=featured_image,
                author_name=author_name,
                reading_time=reading_time,
                is_published=True
            )
            messages.success(request, f"Created new chronicle '{title}'!")
            return redirect('cms_blog')

    posts = BlogPost.objects.all().order_by('-published_at', '-created_at')
    categories = BlogCategory.objects.all().order_by('name')

    return render(request, 'cms/blog.html', {
        'page_title': 'The Bengal Heritage Gazette & Culinary Journal',
        'posts': posts,
        'categories': categories,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_edit_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all().order_by('name')

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'delete_post':
            title = post.title
            post.delete()
            messages.warning(request, f"Chronicle '{title}' deleted.")
            return redirect('cms_blog')

        post.title = request.POST.get('title', post.title).strip()
        post.slug = request.POST.get('slug', post.slug).strip() or slugify(post.title)
        cat_id = request.POST.get('category_id')
        post.category = BlogCategory.objects.filter(id=cat_id).first() if cat_id else None
        post.excerpt = request.POST.get('excerpt', post.excerpt).strip()
        post.content = request.POST.get('content', post.content).strip()
        post.featured_image = request.POST.get('featured_image', post.featured_image).strip()
        post.author_name = request.POST.get('author_name', post.author_name).strip()
        post.reading_time = request.POST.get('reading_time', post.reading_time).strip()
        post.is_published = request.POST.get('is_published') == 'on'
        post.save()

        messages.success(request, f"Chronicle '{post.title}' updated successfully!")
        return redirect('cms_blog')

    return render(request, 'cms/blog_edit.html', {
        'page_title': f"Edit Chronicle — {post.title}",
        'post': post,
        'categories': categories,
    })
