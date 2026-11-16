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
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            cafe_name="VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ",
            content_json={}
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
            messages.success(request, f"Welcome back, {user.username}. Access to Botanical Glasshouse CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_overview'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of Botanical Glasshouse CMS Studio.")
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
            meta = request.POST.get('meta_description', '').strip()
            if title:
                page, created = CustomPage.objects.get_or_create(
                    slug=slug,
                    defaults={
                        'title': title,
                        'meta_description': meta,
                        'blocks': [
                            {
                                'type': 'hero',
                                'title': title,
                                'subtitle': 'Botanical Glasshouse Custom Page',
                                'lead': meta or 'Curated botanical living experience in our double-height atrium.',
                                'cta_text': 'Book Your Glasshouse Experience'
                            }
                        ]
                    }
                )
                if created:
                    messages.success(request, f"New custom page '{title}' created successfully.")
                    return redirect('cms_page_builder_edit', pk=page.pk)
                else:
                    messages.warning(request, f"A custom page with slug '{slug}' already exists.")

        elif action == 'delete_page':
            page_id = request.POST.get('page_id')
            page = get_object_or_404(CustomPage, pk=page_id)
            title = page.title
            page.delete()
            messages.success(request, f"Page '{title}' deleted.")
            return redirect('cms_pages')

    pages = CustomPage.objects.all().order_by('-updated_at')
    context = {
        'page_title': 'Custom Standalone Pages',
        'pages': pages,
    }
    return render(request, 'cms/pages.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_builder_view(request, pk=None):
    if pk:
        page = get_object_or_404(CustomPage, pk=pk)
    else:
        page = CustomPage.objects.first()
        if not page:
            page = CustomPage.objects.create(
                title="Glasshouse Private Dining & Botanical Conservatory",
                slug="glasshouse-private-dining-conservatory",
                meta_description="Exclusive buyouts and tea tastings surrounded by 140+ living species.",
                blocks=[
                    {
                        "type": "hero",
                        "title": "Glasshouse Private Dining & Botanical Conservatory",
                        "subtitle": "Private Pavilion & Living Wall",
                        "lead": "Double-height thermal glass, living ficus trees, and single-origin coffee rituals.",
                        "cta_text": "Inquire for Conservatory Buyout"
                    }
                ]
            )

    if request.method == 'POST':
        raw_blocks = request.POST.get('blocks_json', '[]')
        page_title = request.POST.get('title', page.title).strip()
        page_slug = request.POST.get('slug', page.slug).strip()
        meta_desc = request.POST.get('meta_description', page.meta_description).strip()
        is_published = request.POST.get('is_published') == 'on'

        try:
            parsed_blocks = json.loads(raw_blocks)
            page.title = page_title
            page.slug = page_slug
            page.meta_description = meta_desc
            page.blocks = parsed_blocks
            page.is_published = is_published
            page.save()
            messages.success(request, f"Canvas layout for '{page.title}' updated successfully.")
            return redirect('cms_page_builder_edit', pk=page.pk)
        except Exception as e:
            messages.error(request, f"Error saving blocks: {e}")

    context = {
        'page_title': f"Visual Page Builder — {page.title}",
        'page': page,
        'blocks_json_pretty': json.dumps(page.blocks, indent=2),
    }
    return render(request, 'cms/page_builder.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_identity_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        cafe_name = request.POST.get('cafe_name', '').strip()
        tagline = request.POST.get('tagline', '').strip()
        address = request.POST.get('address', '').strip()
        phone = request.POST.get('phone', '').strip()
        email = request.POST.get('email', '').strip()
        hours = request.POST.get('hours', '').strip()

        if cafe_name:
            config.cafe_name = cafe_name

        if 'hero' not in content:
            content['hero'] = {}
        content['hero']['restaurant_name'] = cafe_name
        content['hero']['tagline'] = tagline

        if 'location' not in content:
            content['location'] = {}
        content['location']['address'] = address
        content['location']['phone'] = phone
        content['location']['email'] = email
        content['location']['hours'] = hours

        config.content_json = content
        config.save()
        messages.success(request, "Café identity and botanical coordinates updated.")
        return redirect('cms_identity')

    context = {
        'page_title': 'Café Identity, Hours & Coordinates',
        'config': config,
        'content': content,
    }
    return render(request, 'cms/identity.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservations_view(request):
    res_filter = request.GET.get('res_filter', 'all')
    shift_filter = request.GET.get('shift', 'all')
    search_q = request.GET.get('q', '').strip()

    qs = Reservation.objects.all().order_by('-created_at')

    if res_filter != 'all':
        qs = qs.filter(status=res_filter)

    if shift_filter in ['lunch', 'dinner']:
        qs = qs.filter(shift=shift_filter)

    if search_q:
        qs = qs.filter(
            full_name__icontains=search_q
        ) | qs.filter(
            reference_code__icontains=search_q
        ) | qs.filter(
            table_number__icontains=search_q
        )

    context = {
        'page_title': 'Maitre D’ Table Reservation & Host Desk',
        'reservations': qs,
        'current_filter': res_filter,
        'current_shift': shift_filter,
        'search_q': search_q,
        'total_count': Reservation.objects.count(),
        'pending_count': Reservation.objects.filter(status='pending').count(),
        'confirmed_count': Reservation.objects.filter(status='confirmed').count(),
        'seated_count': Reservation.objects.filter(status='seated').count(),
        'lunch_count': Reservation.objects.filter(shift='lunch').count(),
        'dinner_count': Reservation.objects.filter(shift='dinner').count(),
    }
    return render(request, 'cms/reservations.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_status_view(request, res_id):
    reservation = get_object_or_404(Reservation, pk=res_id)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        table_num = request.POST.get('table_number')
        if new_status in dict(Reservation.STATUS_CHOICES):
            reservation.status = new_status
        if table_num is not None:
            reservation.table_number = table_num.strip()
        reservation.save()
        messages.success(request, f"Reservation {reservation.reference_code} updated to '{reservation.get_status_display()}'.")
    return redirect('cms_reservations')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_delete_view(request, res_id):
    reservation = get_object_or_404(Reservation, pk=res_id)
    ref = reservation.reference_code
    if request.method == 'POST':
        reservation.delete()
        messages.success(request, f"Reservation record '{ref}' permanently deleted.")
    return redirect('cms_reservations')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_menu_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}
    categories = MenuCategory.objects.all().prefetch_related('items').order_by('sort_order', 'id')

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'add_category':
            name = request.POST.get('name', '').strip()
            slug = slugify(name)
            desc = request.POST.get('description', '').strip()
            if name:
                MenuCategory.objects.create(name=name, slug=slug, description=desc)
                messages.success(request, f"Menu category '{name}' created.")
                return redirect('cms_menu')

        elif action == 'add_item':
            cat_id = request.POST.get('category_id')
            name = request.POST.get('name', '').strip()
            price = request.POST.get('price', '0')
            desc = request.POST.get('description', '').strip()
            notes = request.POST.get('botanical_notes', '').strip()
            img = request.POST.get('image', '').strip()
            is_sig = request.POST.get('is_signature') == 'on'

            category = get_object_or_404(MenuCategory, pk=cat_id)
            MenuItem.objects.create(
                category=category,
                name=name,
                price=price,
                description=desc,
                botanical_notes=notes,
                image=img,
                is_signature=is_sig
            )
            messages.success(request, f"Menu item '{name}' added.")
            return redirect('cms_menu')

    context = {
        'page_title': 'Botanical Menu & Coffee Offerings',
        'categories': categories,
        'config': config,
        'content': content,
    }
    return render(request, 'cms/menu.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_tour_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'save_tour':
            title = request.POST.get('title', '').strip()
            subtitle = request.POST.get('subtitle', '').strip()
            desc = request.POST.get('description', '').strip()

            if 'virtualTour' not in content:
                content['virtualTour'] = {}
            content['virtualTour']['title'] = title
            content['virtualTour']['subtitle'] = subtitle
            content['virtualTour']['description'] = desc

            config.content_json = content
            config.save()
            messages.success(request, "Virtual tour parameters updated.")
            return redirect('cms_tour')

    context = {
        'page_title': '3D Spatial Tour & Viewpoints',
        'config': config,
        'content': content,
        'tour': content.get('virtualTour', {}),
    }
    return render(request, 'cms/tour.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_sections_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'save_section':
            sec_key = request.POST.get('section_key')
            raw_sec = request.POST.get('section_json')
            try:
                parsed = json.loads(raw_sec)
                content[sec_key] = parsed
                config.content_json = content
                config.save()
                messages.success(request, f"Section '{sec_key}' updated successfully.")
                return redirect('cms_sections')
            except Exception as e:
                messages.error(request, f"Invalid JSON for section {sec_key}: {e}")

    context = {
        'page_title': 'Homepage Section Editor',
        'config': config,
        'content': content,
    }
    return render(request, 'cms/sections.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_gallery_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}
    gallery = content.get('gallery', {})

    if request.method == 'POST':
        title = request.POST.get('title')
        images_json = request.POST.get('images_json', '[]')
        try:
            parsed = json.loads(images_json)
            if 'gallery' not in content:
                content['gallery'] = {}
            content['gallery']['title'] = title
            content['gallery']['images'] = parsed
            config.content_json = content
            config.save()
            messages.success(request, "Visual archives gallery updated.")
            return redirect('cms_gallery')
        except Exception as e:
            messages.error(request, f"Error updating gallery: {e}")

    context = {
        'page_title': 'Visual Archives Gallery',
        'gallery': gallery,
        'images_json': json.dumps(gallery.get('images', []), indent=2),
    }
    return render(request, 'cms/gallery.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reviews_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}
    testimonials = content.get('testimonials', {})

    if request.method == 'POST':
        title = request.POST.get('title')
        reviews_json = request.POST.get('reviews_json', '[]')
        try:
            parsed = json.loads(reviews_json)
            if 'testimonials' not in content:
                content['testimonials'] = {}
            content['testimonials']['title'] = title
            content['testimonials']['reviews'] = parsed
            config.content_json = content
            config.save()
            messages.success(request, "Guest reviews updated.")
            return redirect('cms_reviews')
        except Exception as e:
            messages.error(request, f"Error updating reviews: {e}")

    context = {
        'page_title': 'Guest Reviews & Praise',
        'testimonials': testimonials,
        'reviews_json': json.dumps(testimonials.get('reviews', []), indent=2),
    }
    return render(request, 'cms/reviews.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_faqs_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}
    faqs = content.get('faqs', {})

    if request.method == 'POST':
        title = request.POST.get('title')
        faqs_json = request.POST.get('faqs_json', '[]')
        try:
            parsed = json.loads(faqs_json)
            if 'faqs' not in content:
                content['faqs'] = {}
            content['faqs']['title'] = title
            content['faqs']['items'] = parsed
            config.content_json = content
            config.save()
            messages.success(request, "Botanical FAQs updated.")
            return redirect('cms_faqs')
        except Exception as e:
            messages.error(request, f"Error updating FAQs: {e}")

    context = {
        'page_title': 'Frequently Asked Questions',
        'faqs': faqs,
        'faqs_json': json.dumps(faqs.get('items', []), indent=2),
    }
    return render(request, 'cms/faqs.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_schema_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        raw_text = request.POST.get('raw_json', '')
        try:
            parsed = json.loads(raw_text)
            config.content_json = parsed
            if 'cafe_name' in parsed:
                config.cafe_name = parsed['cafe_name']
            config.save()
            messages.success(request, "Master JSON schema synchronized.")
            return redirect('cms_schema')
        except Exception as e:
            messages.error(request, f"JSON Syntax Error: {e}")

    context = {
        'page_title': 'Master JSON Schema',
        'config': config,
        'raw_json': json.dumps(config.content_json, indent=2),
    }
    return render(request, 'cms/schema.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_view(request):
    posts = BlogPost.objects.all().order_by('-published_at', '-created_at')
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create_post':
            title = request.POST.get('title', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(title)
            excerpt = request.POST.get('excerpt', '').strip()
            content = request.POST.get('content', '').strip()
            cat_id = request.POST.get('category_id')
            img = request.POST.get('featured_image', '').strip()
            author = request.POST.get('author_name', 'Elena Vance').strip()
            read_time = request.POST.get('reading_time', '5 min read').strip()

            category = BlogCategory.objects.filter(pk=cat_id).first() if cat_id else None

            if title:
                post = BlogPost.objects.create(
                    title=title,
                    slug=slug,
                    category=category,
                    excerpt=excerpt,
                    content=content,
                    featured_image=img,
                    author_name=author,
                    reading_time=read_time,
                    is_published=True
                )
                messages.success(request, f"Chronicle '{title}' created successfully.")
                return redirect('cms_blog_edit', pk=post.pk)

        elif action == 'create_category':
            name = request.POST.get('name', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(name)
            desc = request.POST.get('description', '').strip()
            if name:
                BlogCategory.objects.get_or_create(slug=slug, defaults={'name': name, 'description': desc})
                messages.success(request, f"Category '{name}' created.")
                return redirect('cms_blog')

        elif action == 'delete_post':
            post_id = request.POST.get('post_id')
            post = get_object_or_404(BlogPost, pk=post_id)
            title = post.title
            post.delete()
            messages.success(request, f"Chronicle '{title}' deleted.")
            return redirect('cms_blog')

    context = {
        'page_title': 'Botanical Glasshouse Journal Studio',
        'posts': posts,
        'categories': categories,
    }
    return render(request, 'cms/blog.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_edit_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        post.title = request.POST.get('title', post.title).strip()
        post.slug = request.POST.get('slug', post.slug).strip()
        post.excerpt = request.POST.get('excerpt', post.excerpt).strip()
        post.content = request.POST.get('content', post.content).strip()
        post.featured_image = request.POST.get('featured_image', post.featured_image).strip()
        post.author_name = request.POST.get('author_name', post.author_name).strip()
        post.reading_time = request.POST.get('reading_time', post.reading_time).strip()
        post.is_published = request.POST.get('is_published') == 'on'

        cat_id = request.POST.get('category_id')
        post.category = BlogCategory.objects.filter(pk=cat_id).first() if cat_id else None

        post.save()
        messages.success(request, f"Article '{post.title}' updated successfully.")
        return redirect('cms_blog')

    context = {
        'page_title': f"Edit Chronicle — {post.title}",
        'post': post,
        'categories': categories,
    }
    return render(request, 'cms/blog_edit.html', context)
