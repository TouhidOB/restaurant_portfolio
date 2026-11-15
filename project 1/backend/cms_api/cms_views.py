import json
import datetime
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_protect
from django.utils import timezone
from django.utils.text import slugify

from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost
from .management.commands.init_cms import INITIAL_DATA


def staff_or_superuser_required(view_func):
    """Decorator ensuring only staff or superusers can access CMS routes."""
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect(f'/cms/login/?next={request.path}')
        if not (request.user.is_staff or request.user.is_superuser):
            messages.error(request, "Access restricted: Only site administrators can access the Aurelia CMS.")
            logout(request)
            return redirect('/cms/login/')
        return view_func(request, *args, **kwargs)
    return _wrapped_view


def get_active_config():
    cfg = SiteConfig.objects.filter(is_published=True).first()
    if not cfg:
        cfg = SiteConfig.objects.create(
            restaurant_name=INITIAL_DATA.get('name', 'AURELIA'),
            content_json=INITIAL_DATA,
            is_published=True,
        )
    return cfg


def get_cms_kpis(content_data):
    all_res = Reservation.objects.all()
    all_res_list = list(all_res)
    today = timezone.localdate()
    today_res = all_res.filter(date=today)
    today_covers = sum(r.guest_count for r in today_res.filter(status__in=['confirmed', 'seated', 'completed']))
    dishes = content_data.get('signatureDishes', [])
    cats = content_data.get('menuCategories', [])
    viewpoints = content_data.get('tourViewpoints', [])
    gallery = content_data.get('galleryImages', [])
    reviews = content_data.get('testimonials', [])
    faqs = content_data.get('faqs', [])

    return {
        'total_reservations': all_res.count(),
        'pending_reservations': all_res.filter(status='pending').count(),
        'confirmed_reservations': all_res.filter(status='confirmed').count(),
        'seated_reservations': all_res.filter(status='seated').count(),
        'lunch_reservations': sum(1 for r in all_res_list if not r.is_dinner_shift),
        'dinner_reservations': sum(1 for r in all_res_list if r.is_dinner_shift),
        'today_reservations_count': today_res.count(),
        'today_covers': today_covers,
        'total_menu_items': len(dishes),
        'active_menu_items': len(dishes),
        'total_categories': len(cats),
        'total_viewpoints': len(viewpoints),
        'gallery_count': len(gallery),
        'testimonials_count': len(reviews),
        'total_custom_pages': CustomPage.objects.count(),
        'published_custom_pages': CustomPage.objects.filter(is_published=True).count(),
        'total_blog_posts': BlogPost.objects.count(),
        'published_blog_posts': BlogPost.objects.filter(is_published=True).count(),
        'blog_categories_count': BlogCategory.objects.count(),
    }


# ==============================================================================
# AUTHENTICATION VIEWS
# ==============================================================================

@csrf_protect
def cms_login_view(request):
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect('/cms/overview/')

    next_url = request.GET.get('next', '/cms/overview/')
    error_msg = None

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')

        if not username or not password:
            error_msg = "Please enter both username and password."
        else:
            user = authenticate(request, username=username, password=password)
            if user is not None:
                if user.is_staff or user.is_superuser:
                    login(request, user)
                    messages.success(request, f"Welcome back, {user.get_full_name() or user.username}. Admin session active.")
                    return redirect(next_url)
                else:
                    error_msg = "Access restricted: Only site administrators have permission to access the CMS."
            else:
                error_msg = "Invalid username or password. Please try again."

    return render(request, 'cms/login.html', {
        'error_msg': error_msg,
        'next_url': next_url,
    })


def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out of the CMS portal.")
    return redirect('/cms/login/')


# ==============================================================================
# 01. OVERVIEW & KPIS
# ==============================================================================

@staff_or_superuser_required
def cms_overview_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    kpis = get_cms_kpis(content)
    recent_reservations = Reservation.objects.all().order_by('-created_at')[:8]
    recent_pages = CustomPage.objects.all().order_by('-created_at')[:4]
    recent_posts = BlogPost.objects.all().order_by('-created_at')[:4]

    context = {
        'active_page': 'overview',
        'kpis': kpis,
        'site_config': cfg,
        'content': content,
        'recent_reservations': recent_reservations,
        'recent_pages': recent_pages,
        'recent_posts': recent_posts,
    }
    return render(request, 'cms/overview.html', context)


@staff_or_superuser_required
def cms_dashboard_view(request):
    return cms_overview_view(request)


# ==============================================================================
# 02. CUSTOM STANDALONE PAGE BUILDER
# ==============================================================================

@staff_or_superuser_required
def cms_pages_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    custom_pages = CustomPage.objects.all().order_by('nav_order', '-created_at')

    context = {
        'active_page': 'pages',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'custom_pages': custom_pages,
    }
    return render(request, 'cms/pages.html', context)


@staff_or_superuser_required
def cms_create_page(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        meta_desc = request.POST.get('meta_description', '').strip()
        theme_style = request.POST.get('theme_style', 'art-deco-gold')
        show_in_nav = request.POST.get('show_in_navigation') == 'on'

        if not title:
            messages.error(request, "Page title is required.")
            return redirect('cms_pages')

        if not slug:
            slug = slugify(title)

        base_slug = slug
        count = 1
        while CustomPage.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{count}"
            count += 1

        starter_blocks = [
            {
                "id": "block_1",
                "type": "hero_banner",
                "title": "Hero Banner Block",
                "data": {
                    "eyebrow": "EXCLUSIVE VENUE & GALA SOIRÉES",
                    "headline": title,
                    "lead": meta_desc or f"Welcome to the dedicated {title} experience at Aurelia Grand Dining Salon.",
                    "bg_image": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1920&auto=format&fit=crop",
                    "cta_text": "Request Consultation",
                    "cta_link": "#contact-block",
                    "secondary_text": "View Amenities",
                    "secondary_link": "#features-block"
                }
            },
            {
                "id": "block_2",
                "type": "split_content",
                "title": "50/50 Split Showcase",
                "data": {
                    "eyebrow": "BESPOKE GRANDEUR",
                    "headline": "Curated Art Deco Atmosphere",
                    "content": "From private sommelier cellars to dramatic emerald velvet booths and acoustic jazz tuning, every detail is crafted for refined entertaining.",
                    "image_url": "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop",
                    "image_position": "right",
                    "badge": "Capacity: Up to 120 Guests"
                }
            },
            {
                "id": "block_3",
                "type": "features_grid",
                "title": "Features Grid",
                "data": {
                    "eyebrow": "EXCLUSIVE PRIVILEGES",
                    "headline": "Gala Amenities Included",
                    "items": [
                        {"title": "Artisanal Charcoal Grills", "desc": "Prime cuts, fresh Bay of Bengal prawns, and binchotan seared skewers.", "icon": "🥩"},
                        {"title": "Private Vintage Cart", "desc": "Dedicated sommelier cart service with Grand Cru champagne pairings.", "icon": "🍾"},
                        {"title": "Grand Piano & Jazz", "desc": "Live acoustic performances and bespoke musical ambiance.", "icon": "🎷"}
                    ]
                }
            },
            {
                "id": "block_4",
                "type": "call_to_action",
                "title": "Call To Action Banner",
                "data": {
                    "eyebrow": "SECURE YOUR EVENT DATE",
                    "headline": "Plan An Unforgettable Evening",
                    "lead": "Submit your private salon buyout inquiry. Our concierge will respond within 4 business hours.",
                    "button_text": "Inquire For Private Event",
                    "button_link": "#contact-block"
                }
            }
        ]

        page = CustomPage.objects.create(
            title=title,
            slug=slug,
            meta_description=meta_desc,
            theme_style=theme_style,
            is_published=True,
            show_in_navigation=show_in_nav,
            nav_order=CustomPage.objects.count() + 1,
            blocks=starter_blocks
        )
        messages.success(request, f"Custom Page '{page.title}' created! Opening Visual Builder...")
        return redirect('cms_page_builder', pk=page.pk)
    return redirect('cms_pages')


@staff_or_superuser_required
def cms_page_builder(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    context = {
        'page': page,
        'blocks_json': json.dumps(page.blocks, indent=2),
        'frontend_url': f"http://127.0.0.1:3000/page/{page.slug}",
    }
    return render(request, 'cms/page_builder.html', context)


@staff_or_superuser_required
def cms_save_page_builder(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                payload = json.loads(request.body.decode('utf-8'))
            else:
                raw = request.POST.get('page_data', '')
                payload = json.loads(raw) if raw else {}

            if 'title' in payload:
                page.title = payload['title'].strip()
            if 'slug' in payload:
                new_slug = slugify(payload['slug'])
                if CustomPage.objects.filter(slug=new_slug).exclude(pk=page.pk).exists():
                    new_slug = f"{new_slug}-{page.pk}"
                page.slug = new_slug
            if 'meta_description' in payload:
                page.meta_description = payload['meta_description']
            if 'theme_style' in payload:
                page.theme_style = payload['theme_style']
            if 'is_published' in payload:
                page.is_published = bool(payload['is_published'])
            if 'show_in_navigation' in payload:
                page.show_in_navigation = bool(payload['show_in_navigation'])
            if 'blocks' in payload:
                page.blocks = payload['blocks']

            page.save()
            return JsonResponse({
                'success': True,
                'message': f"Page '{page.title}' saved successfully!",
                'slug': page.slug,
                'preview_url': f"http://127.0.0.1:3000/page/{page.slug}"
            })
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
    return JsonResponse({'success': False, 'error': 'POST required'}, status=405)


@staff_or_superuser_required
def cms_toggle_page_publish(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    page.is_published = not page.is_published
    page.save()
    status_str = "Published" if page.is_published else "Draft"
    messages.success(request, f"Page '{page.title}' is now set to {status_str}.")
    return redirect('cms_pages')


@staff_or_superuser_required
def cms_delete_page(request, pk):
    if request.method == 'POST':
        page = get_object_or_404(CustomPage, pk=pk)
        title = page.title
        page.delete()
        messages.success(request, f"Custom Page '{title}' deleted successfully.")
    return redirect('cms_pages')


# ==============================================================================
# 03. IDENTITY & LOGISTICS
# ==============================================================================

@staff_or_superuser_required
def cms_identity_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA

    if request.method == 'POST':
        content['name'] = request.POST.get('name', content.get('name', 'AURELIA'))
        content['subname'] = request.POST.get('subname', content.get('subname', ''))
        content['tagline'] = request.POST.get('tagline', content.get('tagline', ''))
        content['shortStory'] = request.POST.get('shortStory', content.get('shortStory', ''))

        contact = content.get('contact', {})
        contact['phone'] = request.POST.get('phone', contact.get('phone', ''))
        contact['phoneDisplay'] = contact['phone']
        contact['email'] = request.POST.get('email', contact.get('email', ''))
        contact['address'] = request.POST.get('address', contact.get('address', ''))
        contact['cityArea'] = request.POST.get('cityArea', contact.get('cityArea', ''))
        contact['fullAddress'] = request.POST.get('fullAddress', contact.get('fullAddress', ''))
        content['contact'] = contact

        cfg.content_json = content
        cfg.save()
        messages.success(request, "Identity and contact logistics updated successfully!")
        return redirect('cms_identity')

    context = {
        'active_page': 'identity',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'content': content,
    }
    return render(request, 'cms/identity.html', context)


# ==============================================================================
# 04. TABLE RESERVATIONS (MAITRE D' DESK)
# ==============================================================================

@staff_or_superuser_required
def cms_reservations_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    all_res = Reservation.objects.all().order_by('-date', 'time', '-created_at')

    status_filter = request.GET.get('status', 'all')
    shift_filter = request.GET.get('shift', 'all')
    search_query = request.GET.get('search', '').strip()

    filtered_res = all_res
    if status_filter != 'all':
        filtered_res = filtered_res.filter(status=status_filter)

    res_list = list(filtered_res)
    if shift_filter == 'lunch':
        res_list = [r for r in res_list if not r.is_dinner_shift]
    elif shift_filter == 'dinner':
        res_list = [r for r in res_list if r.is_dinner_shift]

    if search_query:
        q = search_query.lower()
        res_list = [r for r in res_list if q in r.full_name.lower() or q in (r.phone or '').lower() or q in (r.reference_code or '').lower() or q in (r.table_number or '').lower()]

    context = {
        'active_page': 'reservations',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'reservations': res_list,
        'status_filter': status_filter,
        'shift_filter': shift_filter,
        'search_query': search_query,
    }
    return render(request, 'cms/reservations.html', context)


@staff_or_superuser_required
def cms_update_reservation_status(request, pk):
    reservation = get_object_or_404(Reservation, pk=pk)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        table_no = request.POST.get('table_number', '').strip()
        admin_notes = request.POST.get('admin_notes', '').strip()

        if new_status in dict(Reservation.STATUS_CHOICES):
            reservation.status = new_status
        if table_no:
            reservation.table_number = table_no
        if admin_notes:
            reservation.admin_notes = admin_notes

        reservation.save()
        messages.success(request, f"Reservation [{reservation.reference_code}] for {reservation.full_name} updated to {reservation.get_status_display()}.")
    return redirect('cms_reservations')


@staff_or_superuser_required
def cms_approve_reservation(request, pk):
    reservation = get_object_or_404(Reservation, pk=pk)
    reservation.status = 'confirmed'
    reservation.save()
    messages.success(request, f"Reservation [{reservation.reference_code}] for {reservation.full_name} APPROVED and CONFIRMED.")
    return redirect('cms_reservations')


@staff_or_superuser_required
def cms_delete_reservation(request, pk):
    if request.method == 'POST':
        reservation = get_object_or_404(Reservation, pk=pk)
        code = reservation.reference_code
        reservation.delete()
        messages.success(request, f"Reservation [{code}] deleted.")
    return redirect('cms_reservations')


# ==============================================================================
# 05. HAUTE CUISINE & MENU
# ==============================================================================

@staff_or_superuser_required
def cms_menu_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    dishes = content.get('signatureDishes', [])
    categories = content.get('menuCategories', [])

    selected_cat = request.GET.get('category', 'All')
    filtered_dishes = dishes
    if selected_cat != 'All':
        filtered_dishes = [d for d in dishes if d.get('category') == selected_cat]

    context = {
        'active_page': 'menu',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'dishes': filtered_dishes,
        'categories': categories,
        'selected_category': selected_cat,
    }
    return render(request, 'cms/menu.html', context)


@staff_or_superuser_required
def cms_add_menu_item(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        price = request.POST.get('price', '1200').strip()
        category = request.POST.get('category', 'Main Course').strip()
        tag = request.POST.get('tag', 'Chef Selection').strip()
        dietary = request.POST.get('dietary', 'Chef Special').strip()
        description = request.POST.get('description', '').strip()
        image = request.POST.get('image', '').strip() or 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop'

        new_dish = {
            'id': f"dish-{int(timezone.now().timestamp())}",
            'name': name,
            'price': int(price) if price.isdigit() else 1200,
            'category': category,
            'tag': tag,
            'dietary': dietary,
            'description': description,
            'image': image,
            'is_available': True,
        }

        dishes = content.get('signatureDishes', [])
        dishes.insert(0, new_dish)
        content['signatureDishes'] = dishes
        cfg.content_json = content
        cfg.save()
        messages.success(request, f"New dish '{name}' added to Aurelia menu repertoire!")
    return redirect('cms_menu')


@staff_or_superuser_required
def cms_toggle_menu_item(request, dish_id):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    dishes = content.get('signatureDishes', [])
    for d in dishes:
        if d.get('id') == dish_id:
            d['is_available'] = not d.get('is_available', True)
            break
    content['signatureDishes'] = dishes
    cfg.content_json = content
    cfg.save()
    messages.success(request, f"Dish availability status toggled.")
    return redirect('cms_menu')


@staff_or_superuser_required
def cms_delete_menu_item(request, dish_id):
    if request.method == 'POST':
        cfg = get_active_config()
        content = cfg.content_json or INITIAL_DATA
        dishes = [d for d in content.get('signatureDishes', []) if d.get('id') != dish_id]
        content['signatureDishes'] = dishes
        cfg.content_json = content
        cfg.save()
        messages.success(request, "Dish removed from menu repertoire.")
    return redirect('cms_menu')


# ==============================================================================
# 06. 3D SPATIAL TOUR
# ==============================================================================

@staff_or_superuser_required
def cms_tour_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    viewpoints = content.get('tourViewpoints', [])
    context = {
        'active_page': 'tour',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'viewpoints': viewpoints,
    }
    return render(request, 'cms/tour.html', context)


# ==============================================================================
# 07. 15-SECTION COPY EDITOR
# ==============================================================================

@staff_or_superuser_required
def cms_sections_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    context = {
        'active_page': 'sections',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'content': content,
    }
    return render(request, 'cms/sections.html', context)


@staff_or_superuser_required
def cms_update_section(request, section_key):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    if request.method == 'POST':
        sec = content.get(section_key, {})
        for k in request.POST:
            if k not in ['csrfmiddlewaretoken']:
                sec[k] = request.POST[k].strip()
        content[section_key] = sec
        cfg.content_json = content
        cfg.save()
        messages.success(request, f"Section '{section_key}' updated successfully!")
    return redirect('cms_sections')


# ==============================================================================
# 08. VISUAL GALLERY ARCHIVE
# ==============================================================================

@staff_or_superuser_required
def cms_gallery_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    gallery = content.get('galleryImages', [])
    context = {
        'active_page': 'gallery',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'gallery': gallery,
    }
    return render(request, 'cms/gallery.html', context)


# ==============================================================================
# 09. GUEST REVIEWS
# ==============================================================================

@staff_or_superuser_required
def cms_reviews_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    reviews = content.get('testimonials', [])
    context = {
        'active_page': 'reviews',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'reviews': reviews,
    }
    return render(request, 'cms/reviews.html', context)


# ==============================================================================
# 10. FAQS & POLICIES
# ==============================================================================

@staff_or_superuser_required
def cms_faqs_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    faqs = content.get('faqs', [])
    context = {
        'active_page': 'faqs',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'faqs': faqs,
    }
    return render(request, 'cms/faqs.html', context)


# ==============================================================================
# 11. MASTER JSON SCHEMA
# ==============================================================================

@staff_or_superuser_required
def cms_schema_view(request):
    cfg = get_active_config()
    schema_json = json.dumps(cfg.content_json, indent=2)
    context = {
        'active_page': 'schema',
        'kpis': get_cms_kpis(cfg.content_json),
        'site_config': cfg,
        'schema_json': schema_json,
    }
    return render(request, 'cms/schema.html', context)


@staff_or_superuser_required
def cms_save_schema(request):
    if request.method == 'POST':
        cfg = get_active_config()
        raw = request.POST.get('schema_json', '').strip()
        try:
            parsed = json.loads(raw)
            cfg.content_json = parsed
            cfg.save()
            messages.success(request, "Master JSON Schema successfully validated and saved!")
        except Exception as e:
            messages.error(request, f"Invalid JSON format: {str(e)}")
    return redirect('cms_schema')


# ==============================================================================
# 12. BLOG & EDITORIAL JOURNAL
# ==============================================================================

@staff_or_superuser_required
def cms_blog_view(request):
    cfg = get_active_config()
    content = cfg.content_json or INITIAL_DATA
    posts = BlogPost.objects.all().select_related('category')
    categories = BlogCategory.objects.all()

    context = {
        'active_page': 'blog',
        'kpis': get_cms_kpis(content),
        'site_config': cfg,
        'posts': posts,
        'categories': categories,
    }
    return render(request, 'cms/blog.html', context)


@staff_or_superuser_required
def cms_create_blog_post(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        category_id = request.POST.get('category_id')
        author_name = request.POST.get('author_name', 'Aurelia Culinary Council').strip()
        author_role = request.POST.get('author_role', 'Chef Sommelier & Executive Chef').strip()
        cover_image_url = request.POST.get('cover_image_url', '').strip()
        excerpt = request.POST.get('excerpt', '').strip()
        content = request.POST.get('content', '').strip()
        read_time = request.POST.get('read_time_minutes', '5').strip()
        is_featured = request.POST.get('is_featured') == 'on'
        is_published = request.POST.get('is_published') == 'on'

        if not title:
            messages.error(request, "Post title cannot be empty.")
            return redirect('cms_blog')

        if not slug:
            slug = slugify(title)

        base_slug = slug
        count = 1
        while BlogPost.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{count}"
            count += 1

        category = BlogCategory.objects.filter(pk=category_id).first() if category_id else None

        post = BlogPost.objects.create(
            title=title,
            slug=slug,
            category=category,
            author_name=author_name or 'Aurelia Culinary Council',
            author_role=author_role or 'Staff Writer',
            cover_image_url=cover_image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
            excerpt=excerpt,
            content=content,
            read_time_minutes=int(read_time) if read_time.isdigit() else 5,
            is_featured=is_featured,
            is_published=is_published,
        )

        if 'cover_image' in request.FILES:
            post.cover_image = request.FILES['cover_image']
            post.save()

        messages.success(request, f"Article '{post.title}' published to Journal!")
    return redirect('cms_blog')


@staff_or_superuser_required
def cms_edit_blog_post(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        category_id = request.POST.get('category_id')
        author_name = request.POST.get('author_name', '').strip()
        author_role = request.POST.get('author_role', '').strip()
        cover_image_url = request.POST.get('cover_image_url', '').strip()
        excerpt = request.POST.get('excerpt', '').strip()
        content = request.POST.get('content', '').strip()
        read_time = request.POST.get('read_time_minutes', '5').strip()
        is_featured = request.POST.get('is_featured') == 'on'
        is_published = request.POST.get('is_published') == 'on'

        if title:
            post.title = title
        post.category = BlogCategory.objects.filter(pk=category_id).first() if category_id else None
        if author_name:
            post.author_name = author_name
        if author_role:
            post.author_role = author_role
        if cover_image_url:
            post.cover_image_url = cover_image_url
        if excerpt:
            post.excerpt = excerpt
        if content:
            post.content = content
        if read_time.isdigit():
            post.read_time_minutes = int(read_time)
        post.is_featured = is_featured
        post.is_published = is_published

        if 'cover_image' in request.FILES:
            post.cover_image = request.FILES['cover_image']

        post.save()
        messages.success(request, f"Article '{post.title}' updated successfully!")
        return redirect('cms_blog')

    context = {
        'active_page': 'blog',
        'post': post,
        'categories': categories,
    }
    return render(request, 'cms/blog_edit.html', context)


@staff_or_superuser_required
def cms_toggle_blog_publish(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    post.is_published = not post.is_published
    post.save()
    status_str = "Published" if post.is_published else "Draft"
    messages.success(request, f"Article '{post.title}' is now set to {status_str}.")
    return redirect('cms_blog')


@staff_or_superuser_required
def cms_delete_blog_post(request, pk):
    if request.method == 'POST':
        post = get_object_or_404(BlogPost, pk=pk)
        title = post.title
        post.delete()
        messages.success(request, f"Article '{title}' deleted from Journal.")
    return redirect('cms_blog')
