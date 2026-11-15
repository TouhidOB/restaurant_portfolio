import json
import uuid
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from django.db.models import Q

from .models import (
    RestaurantSettings, HomepageSection, MenuCategory, MenuItem,
    TourViewpoint, DiningSpace, CulinaryPillar, TeamMember,
    PrivateEventOffering, GalleryItem, Testimonial, ReservationInquiry, OpeningHour,
    CustomPage, BlogCategory, BlogPost
)


# ==========================================
# AUTHENTICATION
# ==========================================

def cms_login_view(request):
    if request.user.is_authenticated:
        return redirect('cms_overview')
    
    error_message = None
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome to AURA MARINA CMS Studio, {user.username}.")
            return redirect('cms_overview')
        else:
            error_message = "Invalid credentials or insufficient staff access."

    return render(request, 'cms/login.html', {'error_message': error_message})


def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out of AURA MARINA CMS Studio.")
    return redirect('cms_login')


# ==========================================
# OVERVIEW & KPIS
# ==========================================

@login_required(login_url='cms_login')
def cms_overview_view(request):
    settings = RestaurantSettings.objects.first()
    
    total_reservations = ReservationInquiry.objects.count()
    pending_reservations = ReservationInquiry.objects.filter(status='pending').count()
    confirmed_reservations = ReservationInquiry.objects.filter(status='confirmed').count()
    seated_reservations = ReservationInquiry.objects.filter(status='seated').count()
    
    today_str = timezone.now().strftime('%Y-%m-%d')
    today_reservations = ReservationInquiry.objects.filter(reservation_date=today_str).count()
    
    total_menu_items = MenuItem.objects.count()
    available_menu_items = MenuItem.objects.filter(is_available=True).count()
    
    total_pages = CustomPage.objects.count()
    published_pages = CustomPage.objects.filter(is_published=True).count()
    
    total_posts = BlogPost.objects.count()
    published_posts = BlogPost.objects.filter(is_published=True).count()
    
    recent_reservations = ReservationInquiry.objects.all()[:10]
    
    context = {
        'active_tab': 'overview',
        'settings': settings,
        'total_reservations': total_reservations,
        'pending_reservations': pending_reservations,
        'confirmed_reservations': confirmed_reservations,
        'seated_reservations': seated_reservations,
        'today_reservations': today_reservations,
        'total_menu_items': total_menu_items,
        'available_menu_items': available_menu_items,
        'total_pages': total_pages,
        'published_pages': published_pages,
        'total_posts': total_posts,
        'published_posts': published_posts,
        'recent_reservations': recent_reservations,
    }
    return render(request, 'cms/overview.html', context)


# Alias
cms_dashboard_view = cms_overview_view


# ==========================================
# CUSTOM PAGE BUILDER (ELEMENTOR-STYLE)
# ==========================================

@login_required(login_url='cms_login')
def cms_pages_view(request):
    pages = CustomPage.objects.all().order_by('nav_order', '-created_at')
    context = {
        'active_tab': 'pages',
        'pages': pages,
    }
    return render(request, 'cms/pages.html', context)


@login_required(login_url='cms_login')
def cms_create_page(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        theme_style = request.POST.get('theme_style', 'mediterranean-azure')
        
        if not slug and title:
            from django.utils.text import slugify
            slug = slugify(title)
            
        if not title:
            messages.error(request, "Page title is required.")
            return redirect('cms_pages')
            
        if CustomPage.objects.filter(slug=slug).exists():
            messages.error(request, f"A page with slug '{slug}' already exists.")
            return redirect('cms_pages')
            
        page = CustomPage.objects.create(
            title=title,
            slug=slug,
            theme_style=theme_style,
            is_published=False,
            blocks=[
                {
                    "id": "hero-init",
                    "type": "hero",
                    "title": title,
                    "subtitle": "Bespoke Mediterranean Sanctuary Experience",
                    "badge": "AURA MARINA POSITANO",
                    "description": "Crafted with architectural grandeur overlooking the Amalfi Coast.",
                    "primaryCta": {"text": "Reserve Private Gala", "href": "#reserve"},
                    "secondaryCta": {"text": "Explore Repertoire", "href": "/menu"},
                    "backgroundImage": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop"
                }
            ]
        )
        messages.success(request, f"Page '{page.title}' created. Welcome to the Visual Page Builder.")
        return redirect('cms_page_builder', pk=page.pk)
        
    return redirect('cms_pages')


@login_required(login_url='cms_login')
def cms_page_builder(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    blocks_json_str = json.dumps(page.blocks or [], indent=2)
    context = {
        'active_tab': 'pages',
        'page': page,
        'blocks_json_str': blocks_json_str,
    }
    return render(request, 'cms/page_builder.html', context)


@login_required(login_url='cms_login')
def cms_save_page_builder(request, pk):
    if request.method == 'POST':
        page = get_object_or_404(CustomPage, pk=pk)
        title = request.POST.get('title')
        slug = request.POST.get('slug')
        meta_description = request.POST.get('meta_description', '')
        theme_style = request.POST.get('theme_style', 'mediterranean-azure')
        is_published = request.POST.get('is_published') == 'on'
        show_in_nav = request.POST.get('show_in_navigation') == 'on'
        blocks_raw = request.POST.get('blocks_json', '[]')
        
        if title: page.title = title
        if slug: page.slug = slug
        page.meta_description = meta_description
        page.theme_style = theme_style
        page.is_published = is_published
        page.show_in_navigation = show_in_nav
        
        try:
            parsed_blocks = json.loads(blocks_raw)
            page.blocks = parsed_blocks
            page.save()
            messages.success(request, f"Page '{page.title}' updated successfully with {len(parsed_blocks)} blocks.")
        except json.JSONDecodeError as e:
            messages.error(request, f"JSON syntax error in blocks payload: {str(e)}")
            
    return redirect('cms_page_builder', pk=pk)


@login_required(login_url='cms_login')
def cms_toggle_page_publish(request, pk):
    if request.method == 'POST':
        page = get_object_or_404(CustomPage, pk=pk)
        page.is_published = not page.is_published
        page.save()
        status_label = "Published" if page.is_published else "Draft"
        messages.success(request, f"Page '{page.title}' is now {status_label}.")
    return redirect('cms_pages')


@login_required(login_url='cms_login')
def cms_delete_page(request, pk):
    if request.method == 'POST':
        page = get_object_or_404(CustomPage, pk=pk)
        title = page.title
        page.delete()
        messages.info(request, f"Custom page '{title}' deleted.")
    return redirect('cms_pages')


# ==========================================
# RESTAURANT IDENTITY & LOGISTICS
# ==========================================

@login_required(login_url='cms_login')
def cms_identity_view(request):
    settings = RestaurantSettings.objects.first()
    hours = OpeningHour.objects.all()
    
    if request.method == 'POST':
        if not settings:
            settings = RestaurantSettings()
        settings.brand_name = request.POST.get('brand_name', settings.brand_name)
        settings.tagline = request.POST.get('tagline', settings.tagline)
        settings.hero_headline = request.POST.get('hero_headline', settings.hero_headline)
        settings.hero_subheadline = request.POST.get('hero_subheadline', settings.hero_subheadline)
        settings.address_line1 = request.POST.get('address_line1', settings.address_line1)
        settings.city_region = request.POST.get('city_region', settings.city_region)
        settings.coordinates_display = request.POST.get('coordinates_display', settings.coordinates_display)
        settings.phone = request.POST.get('phone', settings.phone)
        settings.email = request.POST.get('email', settings.email)
        settings.dress_code = request.POST.get('dress_code', settings.dress_code)
        settings.boat_access_notes = request.POST.get('boat_access_notes', settings.boat_access_notes)
        settings.michelin_distinction = request.POST.get('michelin_distinction', settings.michelin_distinction)
        
        try:
            settings.tables_available_today = int(request.POST.get('tables_available_today', settings.tables_available_today))
        except ValueError:
            pass
            
        settings.save()
        messages.success(request, "Restaurant identity & coastal logistics updated.")
        return redirect('cms_identity')
        
    context = {
        'active_tab': 'identity',
        'settings': settings,
        'hours': hours,
    }
    return render(request, 'cms/identity.html', context)


# ==========================================
# TABLE RESERVATION & HOST DESK
# ==========================================

@login_required(login_url='cms_login')
def cms_reservations_view(request):
    res_filter = request.GET.get('res_filter', 'all')
    search_q = request.GET.get('q', '').strip()
    
    reservations = ReservationInquiry.objects.all()
    today_str = timezone.now().strftime('%Y-%m-%d')
    tomorrow_str = (timezone.now() + timezone.timedelta(days=1)).strftime('%Y-%m-%d')
    
    if search_q:
        reservations = reservations.filter(
            Q(reference_code__icontains=search_q) |
            Q(guest_name__icontains=search_q) |
            Q(phone__icontains=search_q) |
            Q(email__icontains=search_q) |
            Q(table_number__icontains=search_q)
        )
        
    if res_filter == 'today':
        reservations = reservations.filter(reservation_date=today_str)
    elif res_filter == 'tomorrow':
        reservations = reservations.filter(reservation_date=tomorrow_str)
    elif res_filter == 'pending':
        reservations = reservations.filter(status='pending')
    elif res_filter == 'confirmed':
        reservations = reservations.filter(status='confirmed')
    elif res_filter == 'seated':
        reservations = reservations.filter(status='seated')
    elif res_filter == 'lunch':
        # Reservation times between 12:00 and 16:00
        reservations = reservations.filter(reservation_time__lt="17:00")
    elif res_filter == 'dinner':
        reservations = reservations.filter(reservation_time__gte="17:00")

    counts = {
        'all': ReservationInquiry.objects.count(),
        'today': ReservationInquiry.objects.filter(reservation_date=today_str).count(),
        'tomorrow': ReservationInquiry.objects.filter(reservation_date=tomorrow_str).count(),
        'pending': ReservationInquiry.objects.filter(status='pending').count(),
        'confirmed': ReservationInquiry.objects.filter(status='confirmed').count(),
        'seated': ReservationInquiry.objects.filter(status='seated').count(),
        'lunch': ReservationInquiry.objects.filter(reservation_time__lt="17:00").count(),
        'dinner': ReservationInquiry.objects.filter(reservation_time__gte="17:00").count(),
    }
    
    context = {
        'active_tab': 'reservations',
        'reservations': reservations,
        'res_filter': res_filter,
        'search_q': search_q,
        'counts': counts,
    }
    return render(request, 'cms/reservations.html', context)


@login_required(login_url='cms_login')
def cms_update_reservation_status(request, pk, new_status=None):
    if request.method == 'POST':
        inquiry = get_object_or_404(ReservationInquiry, pk=pk)
        status_val = new_status or request.POST.get('status')
        table_number = request.POST.get('table_number')
        staff_notes = request.POST.get('staff_notes')
        admin_notes = request.POST.get('admin_notes')
        
        if status_val and status_val in dict(ReservationInquiry.STATUS_CHOICES):
            inquiry.status = status_val
        if table_number is not None:
            inquiry.table_number = table_number.strip()
        if staff_notes is not None:
            inquiry.staff_notes = staff_notes
        if admin_notes is not None:
            inquiry.admin_notes = admin_notes
            
        inquiry.save()
        messages.success(request, f"Reservation {inquiry.reference_code} updated to '{inquiry.get_status_display()}'.")
    return redirect('cms_reservations')


@login_required(login_url='cms_login')
def cms_approve_reservation(request, pk):
    if request.method == 'POST':
        inquiry = get_object_or_404(ReservationInquiry, pk=pk)
        inquiry.status = 'confirmed'
        table_number = request.POST.get('table_number')
        if table_number:
            inquiry.table_number = table_number.strip()
        inquiry.save()
        messages.success(request, f"Reservation {inquiry.reference_code} for {inquiry.guest_name} APPROVED.")
    return redirect('cms_reservations')


@login_required(login_url='cms_login')
def cms_delete_reservation(request, pk):
    if request.method == 'POST':
        inquiry = get_object_or_404(ReservationInquiry, pk=pk)
        code = inquiry.reference_code
        inquiry.delete()
        messages.info(request, f"Reservation {code} deleted.")
    return redirect('cms_reservations')


# ==========================================
# MENU & FOOD PHOTOGRAPHY REPERTOIRE
# ==========================================

@login_required(login_url='cms_login')
def cms_menu_view(request):
    categories = MenuCategory.objects.all().prefetch_related('items')
    items = MenuItem.objects.all().select_related('category')
    
    cat_filter = request.GET.get('category')
    if cat_filter:
        items = items.filter(category__slug=cat_filter)
        
    context = {
        'active_tab': 'menu',
        'categories': categories,
        'items': items,
        'cat_filter': cat_filter,
    }
    return render(request, 'cms/menu.html', context)


@login_required(login_url='cms_login')
def cms_add_menu_item(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        category_id = request.POST.get('category_id')
        price = request.POST.get('price', 0)
        image_url = request.POST.get('image_url', '').strip()
        description = request.POST.get('description', '')
        origin = request.POST.get('origin', '')
        wine_pairing = request.POST.get('wine_pairing', '')
        is_signature = request.POST.get('is_signature') == 'on'
        
        category = get_object_or_404(MenuCategory, id=category_id)
        from django.utils.text import slugify
        slug = slugify(name)
        
        MenuItem.objects.create(
            name=name,
            slug=slug,
            category=category,
            price=price,
            image_url=image_url,
            description=description,
            origin=origin,
            wine_pairing=wine_pairing,
            is_signature=is_signature,
            is_available=True
        )
        messages.success(request, f"Dish '{name}' added to {category.name}.")
    return redirect('cms_menu')


@login_required(login_url='cms_login')
def cms_toggle_menu_item(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(MenuItem, id=item_id)
        item.is_available = not item.is_available
        item.save()
        status_label = "Available" if item.is_available else "Sold Out"
        messages.success(request, f"Dish '{item.name}' marked as {status_label}.")
    return redirect('cms_menu')


@login_required(login_url='cms_login')
def cms_delete_menu_item(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(MenuItem, id=item_id)
        name = item.name
        item.delete()
        messages.info(request, f"Dish '{name}' removed from menu.")
    return redirect('cms_menu')


# ==========================================
# 3D SPATIAL TOUR VIEWPOINTS
# ==========================================

@login_required(login_url='cms_login')
def cms_tour_view(request):
    viewpoints = TourViewpoint.objects.all()
    spaces = DiningSpace.objects.all()
    context = {
        'active_tab': 'tour',
        'viewpoints': viewpoints,
        'spaces': spaces,
    }
    return render(request, 'cms/tour.html', context)


# ==========================================
# 15-SECTION LANDING PAGE EDITOR
# ==========================================

@login_required(login_url='cms_login')
def cms_sections_view(request):
    sections = HomepageSection.objects.all().order_by('sort_order')
    context = {
        'active_tab': 'sections',
        'sections': sections,
    }
    return render(request, 'cms/sections.html', context)


@login_required(login_url='cms_login')
def cms_update_section(request, section_key):
    if request.method == 'POST':
        section = get_object_or_404(HomepageSection, section_key=section_key)
        section.title = request.POST.get('title', section.title)
        section.subtitle = request.POST.get('subtitle', section.subtitle)
        section.badge_text = request.POST.get('badge_text', section.badge_text)
        section.is_enabled = request.POST.get('is_enabled') == 'on'
        section.save()
        messages.success(request, f"Section {section.section_key} ({section.title}) updated.")
    return redirect('cms_sections')


# ==========================================
# GALLERY & ATELIER MEDIA
# ==========================================

@login_required(login_url='cms_login')
def cms_gallery_view(request):
    gallery_items = GalleryItem.objects.all()
    context = {
        'active_tab': 'gallery',
        'gallery_items': gallery_items,
    }
    return render(request, 'cms/gallery.html', context)


# ==========================================
# REVIEWS & TESTIMONIALS
# ==========================================

@login_required(login_url='cms_login')
def cms_reviews_view(request):
    reviews = Testimonial.objects.all()
    context = {
        'active_tab': 'reviews',
        'reviews': reviews,
    }
    return render(request, 'cms/reviews.html', context)


# ==========================================
# FAQS & CONCIERGE KNOWLEDGE
# ==========================================

@login_required(login_url='cms_login')
def cms_faqs_view(request):
    context = {
        'active_tab': 'faqs',
    }
    return render(request, 'cms/faqs.html', context)


# ==========================================
# MASTER JSON SCHEMA POWER EDITOR
# ==========================================

@login_required(login_url='cms_login')
def cms_schema_view(request):
    settings = RestaurantSettings.objects.first()
    master_dict = {
        "brand_name": settings.brand_name if settings else "AURA MARINA",
        "tagline": settings.tagline if settings else "",
        "hero_headline": settings.hero_headline if settings else "",
        "hero_subheadline": settings.hero_subheadline if settings else "",
        "phone": settings.phone if settings else "",
        "email": settings.email if settings else "",
        "dress_code": settings.dress_code if settings else "",
        "boat_access_notes": settings.boat_access_notes if settings else "",
        "tables_available_today": settings.tables_available_today if settings else 12,
    }
    master_json_str = json.dumps(master_dict, indent=2)
    
    context = {
        'active_tab': 'schema',
        'master_json_str': master_json_str,
    }
    return render(request, 'cms/schema.html', context)


@login_required(login_url='cms_login')
def cms_save_schema(request):
    if request.method == 'POST':
        raw_json = request.POST.get('master_json_text', '')
        try:
            data = json.loads(raw_json)
            settings = RestaurantSettings.objects.first()
            if settings:
                if 'brand_name' in data: settings.brand_name = data['brand_name']
                if 'tagline' in data: settings.tagline = data['tagline']
                if 'hero_headline' in data: settings.hero_headline = data['hero_headline']
                if 'hero_subheadline' in data: settings.hero_subheadline = data['hero_subheadline']
                if 'phone' in data: settings.phone = data['phone']
                if 'email' in data: settings.email = data['email']
                if 'dress_code' in data: settings.dress_code = data['dress_code']
                if 'boat_access_notes' in data: settings.boat_access_notes = data['boat_access_notes']
                if 'tables_available_today' in data: settings.tables_available_today = int(data['tables_available_today'])
                settings.save()
            messages.success(request, "Master JSON schema validated and synchronized.")
        except Exception as e:
            messages.error(request, f"JSON validation error: {str(e)}")
    return redirect('cms_schema')


# ==========================================
# EDITORIAL BLOG & MEDITERRANEAN JOURNAL
# ==========================================

@login_required(login_url='cms_login')
def cms_blog_view(request):
    posts = BlogPost.objects.all().select_related('category')
    categories = BlogCategory.objects.all()
    context = {
        'active_tab': 'blog',
        'posts': posts,
        'categories': categories,
    }
    return render(request, 'cms/blog.html', context)


@login_required(login_url='cms_login')
def cms_create_blog_post(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        category_id = request.POST.get('category_id')
        author_name = request.POST.get('author_name', 'Chef Matteo Bellini')
        author_role = request.POST.get('author_role', 'Culinary Director & Executive Chef')
        cover_image_url = request.POST.get('cover_image_url', '')
        excerpt = request.POST.get('excerpt', '')
        content = request.POST.get('content', '')
        read_time = request.POST.get('read_time_minutes', 5)
        is_featured = request.POST.get('is_featured') == 'on'
        is_published = request.POST.get('is_published') == 'on'
        
        if not slug and title:
            from django.utils.text import slugify
            slug = slugify(title)
            
        category = None
        if category_id:
            category = BlogCategory.objects.filter(id=category_id).first()
            
        post = BlogPost.objects.create(
            title=title,
            slug=slug,
            category=category,
            author_name=author_name,
            author_role=author_role,
            cover_image_url=cover_image_url,
            excerpt=excerpt,
            content=content,
            read_time_minutes=read_time,
            is_featured=is_featured,
            is_published=is_published
        )
        messages.success(request, f"Journal article '{post.title}' created.")
        return redirect('cms_edit_blog_post', pk=post.pk)
        
    return redirect('cms_blog')


@login_required(login_url='cms_login')
def cms_edit_blog_post(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all()
    
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        category_id = request.POST.get('category_id')
        author_name = request.POST.get('author_name', post.author_name)
        author_role = request.POST.get('author_role', post.author_role)
        cover_image_url = request.POST.get('cover_image_url', post.cover_image_url)
        excerpt = request.POST.get('excerpt', post.excerpt)
        content = request.POST.get('content', post.content)
        read_time = request.POST.get('read_time_minutes', post.read_time_minutes)
        is_featured = request.POST.get('is_featured') == 'on'
        is_published = request.POST.get('is_published') == 'on'
        
        if title: post.title = title
        if slug: post.slug = slug
        if category_id:
            post.category = BlogCategory.objects.filter(id=category_id).first()
        else:
            post.category = None
            
        post.author_name = author_name
        post.author_role = author_role
        post.cover_image_url = cover_image_url
        post.excerpt = excerpt
        post.content = content
        try:
            post.read_time_minutes = int(read_time)
        except ValueError:
            pass
        post.is_featured = is_featured
        post.is_published = is_published
        post.save()
        messages.success(request, f"Journal article '{post.title}' updated successfully.")
        return redirect('cms_edit_blog_post', pk=post.pk)
        
    context = {
        'active_tab': 'blog',
        'post': post,
        'categories': categories,
    }
    return render(request, 'cms/blog_edit.html', context)


@login_required(login_url='cms_login')
def cms_toggle_blog_publish(request, pk):
    if request.method == 'POST':
        post = get_object_or_404(BlogPost, pk=pk)
        post.is_published = not post.is_published
        post.save()
        status_label = "Published" if post.is_published else "Draft"
        messages.success(request, f"Article '{post.title}' is now {status_label}.")
    return redirect('cms_blog')


@login_required(login_url='cms_login')
def cms_delete_blog_post(request, pk):
    if request.method == 'POST':
        post = get_object_or_404(BlogPost, pk=pk)
        title = post.title
        post.delete()
        messages.info(request, f"Journal article '{title}' deleted.")
    return redirect('cms_blog')
