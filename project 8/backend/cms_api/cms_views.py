import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.utils.text import slugify
from django.utils import timezone

from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost


def get_site_config():
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="URBAN TABLE",
            content_json={}
        )
    return config


# -------------------------------------------------------------
# AUTHENTICATION
# -------------------------------------------------------------
def cms_login_view(request):
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect('cms_overview')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        user = authenticate(request, username=username, password=password)

        if user and (user.is_staff or user.is_superuser):
            login(request, user)
            messages.success(request, f"Welcome, {user.username}. Access to Urban Table CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_overview'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid credentials or insufficient permissions.")

    return render(request, 'cms/login.html')


def cms_logout_view(request):
    logout(request)
    messages.info(request, "Signed out of Urban Table CMS Studio.")
    return redirect('cms_login')


# -------------------------------------------------------------
# 1. OVERVIEW & KPIS
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_overview_view(request):
    config = get_site_config()
    total_reservations = Reservation.objects.count()
    pending_reservations = Reservation.objects.filter(status='pending').count()
    confirmed_reservations = Reservation.objects.filter(status='confirmed').count()
    seated_reservations = Reservation.objects.filter(status='seated').count()
    custom_pages_count = CustomPage.objects.count()
    blog_posts_count = BlogPost.objects.count()

    recent_reservations = Reservation.objects.order_by('-created_at')[:6]
    recent_posts = BlogPost.objects.order_by('-published_at')[:4]

    context = {
        'active_tab': 'overview',
        'config': config,
        'total_reservations': total_reservations,
        'pending_reservations': pending_reservations,
        'confirmed_reservations': confirmed_reservations,
        'seated_reservations': seated_reservations,
        'custom_pages_count': custom_pages_count,
        'blog_posts_count': blog_posts_count,
        'recent_reservations': recent_reservations,
        'recent_posts': recent_posts,
    }
    return render(request, 'cms/overview.html', context)


# -------------------------------------------------------------
# 2. STANDALONE CUSTOM PAGES & ELEMENTOR BUILDER
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_pages_view(request):
    pages = CustomPage.objects.all().order_by('-created_at')
    context = {
        'active_tab': 'pages',
        'pages': pages,
    }
    return render(request, 'cms/pages.html', context)


@login_required(login_url='cms_login')
def cms_page_create_view(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        meta_description = request.POST.get('meta_description', '').strip()
        if not slug:
            slug = slugify(title)

        page = CustomPage.objects.create(
            title=title,
            slug=slug,
            meta_description=meta_description,
            blocks=[
                {
                    "type": "hero",
                    "title": title,
                    "subtitle": "Urban Industrial Space & Warehouse Buyouts",
                    "cta_text": "Inquire Regarding Space",
                    "cta_link": "#reservation"
                }
            ],
            is_published=True
        )
        messages.success(request, f"Custom page '{title}' created. Opening visual builder.")
        return redirect('cms_page_builder', pk=page.pk)
    return redirect('cms_pages')


@login_required(login_url='cms_login')
def cms_page_builder_view(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)

    if request.method == 'POST':
        blocks_raw = request.POST.get('blocks_json', '')
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        meta_desc = request.POST.get('meta_description', '').strip()
        is_published = request.POST.get('is_published') == 'on'

        if title:
            page.title = title
        if slug:
            page.slug = slug
        page.meta_description = meta_desc
        page.is_published = is_published

        if blocks_raw:
            try:
                page.blocks = json.loads(blocks_raw)
            except Exception as e:
                messages.error(request, f"Invalid JSON block structure: {e}")
                return redirect('cms_page_builder', pk=pk)

        page.save()
        messages.success(request, f"Custom Page '{page.title}' updated successfully.")
        return redirect('cms_page_builder', pk=pk)

    context = {
        'active_tab': 'pages',
        'page': page,
        'blocks_json_str': json.dumps(page.blocks, indent=2)
    }
    return render(request, 'cms/page_builder.html', context)


@login_required(login_url='cms_login')
def cms_page_delete_view(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    title = page.title
    page.delete()
    messages.success(request, f"Page '{title}' deleted.")
    return redirect('cms_pages')


# -------------------------------------------------------------
# 3. SMOKEHOUSE JOURNAL & BLOG
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_blog_view(request):
    posts = BlogPost.objects.select_related('category').all().order_by('-published_at')
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip() or slugify(title)
        category_id = request.POST.get('category')
        category = BlogCategory.objects.filter(id=category_id).first() if category_id else None
        excerpt = request.POST.get('excerpt', '').strip()
        content = request.POST.get('content', '').strip()
        cover_image = request.POST.get('cover_image', '').strip()
        author_name = request.POST.get('author_name', 'Pitmaster Marcus Vance').strip()
        read_time = request.POST.get('read_time', '5 min read').strip()

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
        messages.success(request, f"Dispatched '{title}' to the Urban Table Smokehouse Journal.")
        return redirect('cms_blog')

    context = {
        'active_tab': 'blog',
        'posts': posts,
        'categories': categories,
    }
    return render(request, 'cms/blog.html', context)


@login_required(login_url='cms_login')
def cms_blog_edit_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        post.title = request.POST.get('title', post.title).strip()
        post.slug = request.POST.get('slug', post.slug).strip()
        category_id = request.POST.get('category')
        post.category = BlogCategory.objects.filter(id=category_id).first() if category_id else None
        post.excerpt = request.POST.get('excerpt', post.excerpt).strip()
        post.content = request.POST.get('content', post.content).strip()
        post.cover_image = request.POST.get('cover_image', post.cover_image).strip()
        post.author_name = request.POST.get('author_name', post.author_name).strip()
        post.read_time = request.POST.get('read_time', post.read_time).strip()
        post.is_published = request.POST.get('is_published') == 'on'
        post.save()

        messages.success(request, f"Article '{post.title}' updated.")
        return redirect('cms_blog')

    context = {
        'active_tab': 'blog',
        'post': post,
        'categories': categories,
    }
    return render(request, 'cms/blog_edit.html', context)


@login_required(login_url='cms_login')
def cms_blog_delete_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    title = post.title
    post.delete()
    messages.success(request, f"Article '{title}' deleted.")
    return redirect('cms_blog')


# -------------------------------------------------------------
# 4. TABLE RESERVATIONS & HOST DESK
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_reservations_view(request):
    shift_filter = request.GET.get('shift', 'all')
    status_filter = request.GET.get('status', 'all')
    search_q = request.GET.get('q', '').strip()

    qs = Reservation.objects.all().order_by('-date', '-time')

    if shift_filter in ['lunch', 'dinner']:
        qs = qs.filter(shift=shift_filter)
    if status_filter in ['pending', 'confirmed', 'seated', 'cancelled']:
        qs = qs.filter(status=status_filter)
    if search_q:
        qs = qs.filter(
            models.Q(full_name__icontains=search_q) |
            models.Q(reference_code__icontains=search_q) |
            models.Q(phone__icontains=search_q) |
            models.Q(email__icontains=search_q)
        )

    context = {
        'active_tab': 'reservations',
        'reservations': qs,
        'shift_filter': shift_filter,
        'status_filter': status_filter,
        'search_q': search_q,
        'count_pending': Reservation.objects.filter(status='pending').count(),
        'count_confirmed': Reservation.objects.filter(status='confirmed').count(),
        'count_seated': Reservation.objects.filter(status='seated').count(),
        'count_lunch': Reservation.objects.filter(shift='lunch').count(),
        'count_dinner': Reservation.objects.filter(shift='dinner').count(),
    }
    return render(request, 'cms/reservations.html', context)


@login_required(login_url='cms_login')
def cms_reservation_status_view(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    new_status = request.POST.get('status')
    if new_status in ['pending', 'confirmed', 'seated', 'cancelled']:
        res.status = new_status
        res.save()
        messages.success(request, f"Reservation {res.reference_code} updated to {new_status.upper()}.")
    return redirect(request.META.get('HTTP_REFERER', 'cms_reservations'))


@login_required(login_url='cms_login')
def cms_reservation_table_view(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    table_num = request.POST.get('table_number', '').strip()
    admin_notes = request.POST.get('admin_notes', '').strip()
    res.table_number = table_num
    if admin_notes:
        res.admin_notes = admin_notes
    res.save()
    messages.success(request, f"Table {table_num} assigned to {res.full_name} ({res.reference_code}).")
    return redirect(request.META.get('HTTP_REFERER', 'cms_reservations'))


@login_required(login_url='cms_login')
def cms_reservation_delete_view(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    ref = res.reference_code
    res.delete()
    messages.success(request, f"Reservation {ref} removed.")
    return redirect('cms_reservations')


# -------------------------------------------------------------
# 5. BRAND IDENTITY & SERVICE HOURS
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_identity_view(request):
    config = get_site_config()
    content = config.content_json or {}

    if request.method == 'POST':
        config.restaurant_name = request.POST.get('restaurant_name', config.restaurant_name)
        theme = content.get('theme', {})
        colors = theme.get('colors', {})
        colors['brick'] = request.POST.get('color_brick', colors.get('brick', '#914D37'))
        colors['graphite'] = request.POST.get('color_graphite', colors.get('graphite', '#252729'))
        colors['copper'] = request.POST.get('color_copper', colors.get('copper', '#B87345'))
        colors['amber'] = request.POST.get('color_amber', colors.get('amber', '#E9A24B'))
        theme['colors'] = colors
        content['theme'] = theme

        loc = content.get('location', {})
        loc['address'] = request.POST.get('address', loc.get('address', ''))
        loc['phone'] = request.POST.get('phone', loc.get('phone', ''))
        loc['email'] = request.POST.get('email', loc.get('email', ''))
        content['location'] = loc

        config.content_json = content
        config.save()
        messages.success(request, "Brand identity and warehouse specs saved.")
        return redirect('cms_identity')

    context = {
        'active_tab': 'identity',
        'config': config,
        'content': content,
    }
    return render(request, 'cms/identity.html', context)


# -------------------------------------------------------------
# 6. MENU & MEAL PHOTOGRAPHY REPERTOIRE
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_menu_view(request):
    config = get_site_config()
    content = config.content_json or {}
    menu = content.get('menu', {})

    if request.method == 'POST':
        menu_json_raw = request.POST.get('menu_json', '')
        if menu_json_raw:
            try:
                content['menu'] = json.loads(menu_json_raw)
                config.content_json = content
                config.save()
                messages.success(request, "Smokehouse menu & dish photography successfully synchronized.")
            except Exception as e:
                messages.error(request, f"Error parsing menu JSON: {e}")
        return redirect('cms_menu')

    context = {
        'active_tab': 'menu',
        'config': config,
        'menu': menu,
        'menu_json_str': json.dumps(menu, indent=2)
    }
    return render(request, 'cms/menu.html', context)


# -------------------------------------------------------------
# 7. 3D SPATIAL TOUR VIEWPOINTS
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_tour_view(request):
    config = get_site_config()
    content = config.content_json or {}
    tour = content.get('tour', {})

    if request.method == 'POST':
        tour_json_raw = request.POST.get('tour_json', '')
        if tour_json_raw:
            try:
                content['tour'] = json.loads(tour_json_raw)
                config.content_json = content
                config.save()
                messages.success(request, "3D spatial viewpoints updated.")
            except Exception as e:
                messages.error(request, f"Error parsing tour JSON: {e}")
        return redirect('cms_tour')

    context = {
        'active_tab': 'tour',
        'config': config,
        'tour': tour,
        'tour_json_str': json.dumps(tour, indent=2)
    }
    return render(request, 'cms/tour.html', context)


# -------------------------------------------------------------
# 8. SECTION CONTENT EDITOR
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_sections_view(request):
    config = get_site_config()
    content = config.content_json or {}

    if request.method == 'POST':
        section_key = request.POST.get('section_key')
        section_data_raw = request.POST.get('section_data')
        if section_key and section_data_raw:
            try:
                content[section_key] = json.loads(section_data_raw)
                config.content_json = content
                config.save()
                messages.success(request, f"Section '{section_key}' updated successfully.")
            except Exception as e:
                messages.error(request, f"Error saving section: {e}")
        return redirect('cms_sections')

    sections_list = [
        ('hero', 'Hero & Warehouse Facade'),
        ('story', '1924 Warehouse History & Craft'),
        ('signature_dishes', 'Signature Open-Flame Dishes'),
        ('process', 'Wood Hearth & Smokehouse Process'),
        ('architecture', 'Industrial Architecture & Steel Beams'),
        ('chef', 'Pitmaster & Culinary Brigade'),
        ('experiences', 'Warehouse Dining Experiences'),
        ('testimonials', 'Critical Acclaim & Reviews'),
        ('reservation', 'Reservation Policy & Capacity'),
        ('location', 'Location & Industrial District Access'),
    ]

    context = {
        'active_tab': 'sections',
        'config': config,
        'content': content,
        'sections_list': sections_list,
    }
    return render(request, 'cms/sections.html', context)


# -------------------------------------------------------------
# 9. VISUAL GALLERY
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_gallery_view(request):
    config = get_site_config()
    content = config.content_json or {}
    gallery = content.get('gallery', {})

    if request.method == 'POST':
        gallery_json_raw = request.POST.get('gallery_json', '')
        if gallery_json_raw:
            try:
                content['gallery'] = json.loads(gallery_json_raw)
                config.content_json = content
                config.save()
                messages.success(request, "Gallery items updated.")
            except Exception as e:
                messages.error(request, f"Error saving gallery: {e}")
        return redirect('cms_gallery')

    context = {
        'active_tab': 'gallery',
        'config': config,
        'gallery': gallery,
        'gallery_json_str': json.dumps(gallery, indent=2)
    }
    return render(request, 'cms/gallery.html', context)


# -------------------------------------------------------------
# 10. GUEST REVIEWS & CRITICAL ACCLAIM
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_reviews_view(request):
    config = get_site_config()
    content = config.content_json or {}
    testimonials = content.get('testimonials', {})

    if request.method == 'POST':
        testimonials_json_raw = request.POST.get('testimonials_json', '')
        if testimonials_json_raw:
            try:
                content['testimonials'] = json.loads(testimonials_json_raw)
                config.content_json = content
                config.save()
                messages.success(request, "Press reviews and critical acclaim saved.")
            except Exception as e:
                messages.error(request, f"Error saving reviews: {e}")
        return redirect('cms_reviews')

    context = {
        'active_tab': 'reviews',
        'config': config,
        'testimonials': testimonials,
        'testimonials_json_str': json.dumps(testimonials, indent=2)
    }
    return render(request, 'cms/reviews.html', context)


# -------------------------------------------------------------
# 11. FAQ MANAGER
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_faqs_view(request):
    config = get_site_config()
    content = config.content_json or {}
    faqs = content.get('faqs', {})

    if request.method == 'POST':
        faqs_json_raw = request.POST.get('faqs_json', '')
        if faqs_json_raw:
            try:
                content['faqs'] = json.loads(faqs_json_raw)
                config.content_json = content
                config.save()
                messages.success(request, "FAQs updated.")
            except Exception as e:
                messages.error(request, f"Error saving FAQs: {e}")
        return redirect('cms_faqs')

    context = {
        'active_tab': 'faqs',
        'config': config,
        'faqs': faqs,
        'faqs_json_str': json.dumps(faqs, indent=2)
    }
    return render(request, 'cms/faqs.html', context)


# -------------------------------------------------------------
# 12. MASTER JSON SCHEMA
# -------------------------------------------------------------
@login_required(login_url='cms_login')
def cms_schema_view(request):
    config = get_site_config()

    if request.method == 'POST':
        raw_json = request.POST.get('content_json', '')
        try:
            config.content_json = json.loads(raw_json)
            config.save()
            messages.success(request, "Master JSON schema updated.")
        except Exception as e:
            messages.error(request, f"Error: Invalid JSON payload: {e}")
        return redirect('cms_schema')

    context = {
        'active_tab': 'schema',
        'config': config,
        'content_json_str': json.dumps(config.content_json, indent=2),
    }
    return render(request, 'cms/schema.html', context)
