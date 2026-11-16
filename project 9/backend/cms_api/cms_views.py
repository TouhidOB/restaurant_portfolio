import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.text import slugify
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost

def is_staff_or_superuser(user):
    return user.is_authenticated and (user.is_staff or user.is_superuser)


def get_site_config(user=None):
    config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="SKYLINE",
            content_json={},
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
            messages.success(request, f"Welcome, {user.username}. Access to Skyline CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_overview'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of Skyline CMS Studio.")
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
    menu_categories = len(content.get('menu', {}).get('categories', []))

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
                    is_published=True,
                    created_by=request.user
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

    pages = CustomPage.objects.all().order_by('-created_at')
    return render(request, 'cms/pages.html', {
        'page_title': 'Custom Standalone Pages',
        'pages': pages,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_builder_view(request, pk=None):
    page_obj = get_object_or_404(CustomPage, id=pk) if pk else None

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip() or slugify(title)
        meta_desc = request.POST.get('meta_description', '').strip()
        blocks_json_str = request.POST.get('blocks_json', '[]')
        is_published = request.POST.get('is_published') == 'on'

        try:
            blocks = json.loads(blocks_json_str)
        except Exception:
            blocks = []

        if page_obj:
            page_obj.title = title
            page_obj.slug = slug
            page_obj.meta_description = meta_desc
            page_obj.blocks = blocks
            page_obj.is_published = is_published
            page_obj.save()
            messages.success(request, f"Saved changes to '{page_obj.title}'")
        else:
            page_obj = CustomPage.objects.create(
                title=title,
                slug=slug,
                meta_description=meta_desc,
                blocks=blocks,
                is_published=is_published,
                created_by=request.user
            )
            messages.success(request, f"Created new page '{page_obj.title}'")

        return redirect('cms_page_builder_edit', pk=page_obj.id)

    return render(request, 'cms/page_builder.html', {
        'page_title': f"Visual Page Builder: {page_obj.title if page_obj else 'New Page'}",
        'custom_page': page_obj,
        'blocks_json': json.dumps(page_obj.blocks if page_obj else [], indent=2),
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_identity_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        restaurant_name = request.POST.get('restaurant_name', '').strip()
        if restaurant_name:
            config.restaurant_name = restaurant_name
            content['restaurant_name'] = restaurant_name
            if 'hero' in content:
                content['hero']['restaurant_name'] = restaurant_name

        # Brand / Hero
        if 'hero' not in content: content['hero'] = {}
        content['hero']['eyebrow'] = request.POST.get('eyebrow', '')
        content['hero']['title'] = request.POST.get('title', '')
        content['hero']['tagline'] = request.POST.get('tagline', '')
        content['hero']['elevation_badge'] = request.POST.get('elevation_badge', '')

        # Location & Hours
        if 'location' not in content: content['location'] = {}
        content['location']['address'] = request.POST.get('address', '')
        content['location']['phone'] = request.POST.get('phone', '')
        content['location']['email'] = request.POST.get('email', '')
        content['location']['transit'] = request.POST.get('transit', '')

        config.content_json = content
        config.save()
        messages.success(request, "Saved rooftop identity, elevation, and contact settings.")
        return redirect('cms_identity')

    return render(request, 'cms/identity.html', {
        'page_title': 'Rooftop Identity & Elevation',
        'config': config,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservations_view(request):
    shift_filter = request.GET.get('shift', '').lower()
    status_filter = request.GET.get('status', '').lower()
    search_q = request.GET.get('q', '').strip()

    qs = Reservation.objects.all().order_by('-date', '-created_at')

    if shift_filter in ['lunch', 'dinner']:
        qs = qs.filter(shift=shift_filter)
    if status_filter:
        qs = qs.filter(status=status_filter)
    if search_q:
        qs = qs.filter(
            models.Q(reference_code__icontains=search_q) |
            models.Q(full_name__icontains=search_q) |
            models.Q(phone__icontains=search_q) |
            models.Q(email__icontains=search_q) |
            models.Q(table_number__icontains=search_q)
        )

    context = {
        'page_title': "Maitre D' Table Reservation & Host Desk",
        'reservations': qs,
        'shift_filter': shift_filter,
        'status_filter': status_filter,
        'search_q': search_q,
        'total_count': Reservation.objects.count(),
        'lunch_count': Reservation.objects.filter(shift='lunch').count(),
        'dinner_count': Reservation.objects.filter(shift='dinner').count(),
        'pending_count': Reservation.objects.filter(status='pending').count(),
        'confirmed_count': Reservation.objects.filter(status='confirmed').count(),
    }
    return render(request, 'cms/reservations.html', context)


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_status_view(request, res_id):
    reservation = get_object_or_404(Reservation, id=res_id)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        table_num = request.POST.get('table_number', '').strip()
        admin_notes = request.POST.get('admin_notes', '').strip()

        if new_status in dict(Reservation.STATUS_CHOICES):
            reservation.status = new_status
        if table_num:
            reservation.table_number = table_num
        if admin_notes:
            reservation.admin_notes = admin_notes
        reservation.save()

        messages.success(request, f"Updated reservation {reservation.reference_code} for {reservation.full_name}.")
    return redirect('cms_reservations')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_delete_view(request, res_id):
    reservation = get_object_or_404(Reservation, id=res_id)
    code = reservation.reference_code
    reservation.delete()
    messages.warning(request, f"Removed reservation record {code}.")
    return redirect('cms_reservations')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_menu_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        menu_json_str = request.POST.get('menu_json', '')
        try:
            menu_data = json.loads(menu_json_str)
            content['menu'] = menu_data
            config.content_json = content
            config.save()
            messages.success(request, "Updated rooftop menu categories, meal photography, and tasting repertoires.")
        except Exception as e:
            messages.error(request, f"Invalid JSON format for menu: {str(e)}")
        return redirect('cms_menu')

    menu_data = content.get('menu', {})
    return render(request, 'cms/menu.html', {
        'page_title': 'Rooftop Menu & Photography Repertoire',
        'menu': menu_data,
        'menu_json': json.dumps(menu_data, indent=2),
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_tour_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        tour_json_str = request.POST.get('tour_json', '')
        try:
            tour_data = json.loads(tour_json_str)
            content['virtualTour'] = tour_data
            config.content_json = content
            config.save()
            messages.success(request, "Updated 3D Level 54 viewpoints and atmospheric spatial coordinates.")
        except Exception as e:
            messages.error(request, f"Invalid 3D Tour JSON: {str(e)}")
        return redirect('cms_tour')

    tour_data = content.get('virtualTour', {})
    return render(request, 'cms/tour.html', {
        'page_title': '3D Virtual Rooftop Tour & Viewpoints',
        'tour': tour_data,
        'tour_json': json.dumps(tour_data, indent=2),
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_sections_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    return render(request, 'cms/sections.html', {
        'page_title': '15-Section Rooftop Architect',
        'config': config,
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_gallery_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        gallery_json_str = request.POST.get('gallery_json', '')
        try:
            gallery_data = json.loads(gallery_json_str)
            content['gallery'] = gallery_data
            config.content_json = content
            config.save()
            messages.success(request, "Updated rooftop atmosphere and culinary photo gallery.")
        except Exception as e:
            messages.error(request, f"Invalid Gallery JSON: {str(e)}")
        return redirect('cms_gallery')

    gallery_data = content.get('gallery', {})
    return render(request, 'cms/gallery.html', {
        'page_title': 'Rooftop Photo Gallery',
        'gallery': gallery_data,
        'gallery_json': json.dumps(gallery_data, indent=2),
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reviews_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    if request.method == 'POST':
        testimonials_json_str = request.POST.get('testimonials_json', '')
        try:
            testimonials_data = json.loads(testimonials_json_str)
            content['testimonials'] = testimonials_data
            config.content_json = content
            config.save()
            messages.success(request, "Updated critic reviews and guest testimonials.")
        except Exception as e:
            messages.error(request, f"Invalid Testimonials JSON: {str(e)}")
        return redirect('cms_reviews')

    testimonials_data = content.get('testimonials', {})
    return render(request, 'cms/reviews.html', {
        'page_title': 'Guest Reviews & Social Proof',
        'testimonials': testimonials_data,
        'testimonials_json': json.dumps(testimonials_data, indent=2),
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_faqs_view(request):
    config = get_site_config(request.user)
    content = config.content_json or {}

    return render(request, 'cms/faqs.html', {
        'page_title': 'Rooftop FAQs & Policies',
        'content': content,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_schema_view(request):
    config = get_site_config(request.user)

    if request.method == 'POST':
        schema_json_str = request.POST.get('schema_json', '')
        try:
            schema_data = json.loads(schema_json_str)
            config.content_json = schema_data
            config.save()
            messages.success(request, "Master JSON Schema saved and validated.")
        except Exception as e:
            messages.error(request, f"JSON Syntax Error: {str(e)}")
        return redirect('cms_schema')

    return render(request, 'cms/schema.html', {
        'page_title': 'Master JSON Schema Architect',
        'config': config,
        'schema_json': json.dumps(config.content_json, indent=2),
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_view(request):
    posts = BlogPost.objects.all().order_by('-published_at')
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create_post':
            title = request.POST.get('title', '').strip()
            slug = request.POST.get('slug', '').strip() or slugify(title)
            category_id = request.POST.get('category')
            excerpt = request.POST.get('excerpt', '').strip()
            content = request.POST.get('content', '').strip()
            cover_image = request.POST.get('cover_image', '').strip()
            author_name = request.POST.get('author_name', 'Christian Laurent').strip()
            read_time = request.POST.get('read_time', '5 min read').strip()

            category = get_object_or_404(BlogCategory, id=category_id)
            BlogPost.objects.create(
                title=title,
                slug=slug,
                category=category,
                excerpt=excerpt,
                content=content,
                cover_image=cover_image,
                author_name=author_name,
                read_time=read_time,
                is_published=True
            )
            messages.success(request, f"Published new gazette chronicle '{title}'")
            return redirect('cms_blog')
        elif action == 'delete_post':
            post_id = request.POST.get('post_id')
            post_obj = get_object_or_404(BlogPost, id=post_id)
            t = post_obj.title
            post_obj.delete()
            messages.warning(request, f"Archived article '{t}'")
            return redirect('cms_blog')

    return render(request, 'cms/blog.html', {
        'page_title': 'Skyline Gazette & Horizon Journal',
        'posts': posts,
        'categories': categories,
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_edit_view(request, pk):
    post_obj = get_object_or_404(BlogPost, id=pk)
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        post_obj.title = request.POST.get('title', '').strip()
        post_obj.slug = request.POST.get('slug', '').strip() or slugify(post_obj.title)
        post_obj.category_id = request.POST.get('category')
        post_obj.excerpt = request.POST.get('excerpt', '').strip()
        post_obj.content = request.POST.get('content', '').strip()
        post_obj.cover_image = request.POST.get('cover_image', '').strip()
        post_obj.author_name = request.POST.get('author_name', '').strip()
        post_obj.read_time = request.POST.get('read_time', '').strip()
        post_obj.is_published = request.POST.get('is_published') == 'on'
        post_obj.save()

        messages.success(request, f"Updated gazette article '{post_obj.title}'")
        return redirect('cms_blog')

    return render(request, 'cms/blog_edit.html', {
        'page_title': f"Edit Chronicle: {post_obj.title}",
        'post': post_obj,
        'categories': categories,
    })
