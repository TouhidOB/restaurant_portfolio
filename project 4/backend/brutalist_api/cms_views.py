import json
import uuid
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from django.db.models import Q

from .models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryProcessStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ,
    CustomPage, BlogCategory, BlogPost
)
from .serializers import (
    RestaurantSerializer, WebsiteSectionSerializer, MenuCategorySerializer,
    MenuItemSerializer, VirtualTourViewpointSerializer, PhilosophyPillarSerializer,
    CulinaryProcessStageSerializer, DiningExperiencePanelSerializer,
    GalleryImageSerializer, TestimonialSerializer, ReservationSerializer, FAQSerializer
)


# ==========================================
# AUTHENTICATION
# ==========================================

def cms_login_view(request):
    if request.user.is_authenticated:
        return redirect('cms_overview')

    error_message = None
    if request.method == 'POST':
        u = request.POST.get('username', '').strip()
        p = request.POST.get('password', '').strip()
        user = authenticate(request, username=u, password=p)
        if user is not None and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome to Monolith Brutalist Studio, {user.username}.")
            return redirect('cms_overview')
        else:
            error_message = "Invalid architectural credentials. Access restricted."

    return render(request, 'cms/login.html', {'error_message': error_message})


def cms_logout_view(request):
    logout(request)
    messages.info(request, "Monolithic session closed safely.")
    return redirect('cms_login')


# ==========================================
# OVERVIEW & METRICS
# ==========================================

@login_required(login_url='cms_login')
def cms_overview_view(request):
    restaurant = Restaurant.objects.first()
    if not restaurant:
        restaurant = Restaurant.objects.create(name="MONOLITH // BRUTALIST DINING")

    total_reservations = Reservation.objects.count()
    pending_reservations = Reservation.objects.filter(status='pending').count()
    confirmed_reservations = Reservation.objects.filter(status='confirmed').count()
    seated_reservations = Reservation.objects.filter(status='seated').count()

    today_str = timezone.now().strftime('%Y-%m-%d')
    today_reservations = Reservation.objects.filter(reservation_date=today_str).count()

    total_menu_items = MenuItem.objects.count()
    available_menu_items = MenuItem.objects.filter(is_available=True).count()

    total_pages = CustomPage.objects.count()
    published_pages = CustomPage.objects.filter(is_published=True).count()

    total_posts = BlogPost.objects.count()
    published_posts = BlogPost.objects.filter(is_published=True).count()

    recent_reservations = Reservation.objects.all().order_by('-created_at')[:8]
    menu_sample = MenuItem.objects.select_related('category').all()[:6]

    context = {
        'active_tab': 'overview',
        'restaurant': restaurant,
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
        'menu_sample': menu_sample,
    }
    return render(request, 'cms/overview.html', context)


# ==========================================
# VISUAL PAGE BUILDER & CUSTOM PAGES
# ==========================================

@login_required(login_url='cms_login')
def cms_pages_view(request):
    pages = CustomPage.objects.all().order_by('-updated_at')
    return render(request, 'cms/pages.html', {
        'active_tab': 'pages',
        'pages': pages,
    })


@login_required(login_url='cms_login')
@require_POST
def cms_page_create_view(request):
    title = request.POST.get('title', '').strip()
    slug = request.POST.get('slug', '').strip()
    meta_desc = request.POST.get('meta_description', '').strip()

    if not title:
        messages.error(request, "A page title is required.")
        return redirect('cms_pages')

    if not slug:
        slug = title.lower().replace(' ', '-').replace('/', '-').replace("'", '')

    # Ensure unique slug
    base_slug = slug
    counter = 1
    while CustomPage.objects.filter(slug=slug).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1

    default_blocks = [
        {
            "id": f"block-{uuid.uuid4().hex[:8]}",
            "type": "hero",
            "headline": title.upper(),
            "subheadline": "Raw Architectural Dining Experience",
            "tag": "ARCHITECTURAL MONOLITH",
            "button_text": "RESERVE VAULT",
            "button_link": "/contact",
            "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85"
        },
        {
            "id": f"block-{uuid.uuid4().hex[:8]}",
            "type": "features",
            "title": "SPATIAL PARAMETERS",
            "columns": 3,
            "items": [
                {"title": "RAW BASALT", "description": "Formed through intense geothermal pressure and sculpted to monolithic precision."},
                {"title": "BOARD-FORMED CONCRETE", "description": "Structural honesty exposed with cast-timber striations and deep shadows."},
                {"title": "ELEMENTAL FIRE", "description": "Ancestral charring over white oak and Japanese binchotan charcoal."}
            ]
        }
    ]

    page = CustomPage.objects.create(
        title=title,
        slug=slug,
        meta_description=meta_desc,
        blocks=default_blocks,
        is_published=True
    )
    messages.success(request, f"New architectural page '{page.title}' created. Opening visual block builder.")
    return redirect('cms_page_builder', pk=page.pk)


@login_required(login_url='cms_login')
def cms_page_builder_view(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)

    if request.method == 'POST':
        raw_blocks = request.POST.get('blocks_json', '[]')
        page_title = request.POST.get('title', page.title).strip()
        page_slug = request.POST.get('slug', page.slug).strip()
        meta_description = request.POST.get('meta_description', page.meta_description).strip()
        is_published = 'is_published' in request.POST

        try:
            parsed_blocks = json.loads(raw_blocks)
            page.blocks = parsed_blocks
            page.title = page_title
            page.slug = page_slug
            page.meta_description = meta_description
            page.is_published = is_published
            page.save()
            messages.success(request, f"Architectural layout for '{page.title}' updated successfully.")
            return redirect('cms_page_builder', pk=page.pk)
        except Exception as e:
            messages.error(request, f"Error saving blocks: {str(e)}")

    return render(request, 'cms/page_builder.html', {
        'active_tab': 'pages',
        'page': page,
        'blocks_json': json.dumps(page.blocks, indent=2)
    })


@login_required(login_url='cms_login')
@require_POST
def cms_page_toggle_view(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    page.is_published = not page.is_published
    page.save()
    status_str = "PUBLISHED" if page.is_published else "DRAFT"
    messages.success(request, f"Page '{page.title}' state altered to {status_str}.")
    return redirect('cms_pages')


@login_required(login_url='cms_login')
@require_POST
def cms_page_delete_view(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    title = page.title
    page.delete()
    messages.success(request, f"Page '{title}' decommissioned and removed.")
    return redirect('cms_pages')


# ==========================================
# RESTAURANT IDENTITY & LOGISTICS
# ==========================================

@login_required(login_url='cms_login')
def cms_identity_view(request):
    restaurant = Restaurant.objects.first()
    if not restaurant:
        restaurant = Restaurant.objects.create(name="MONOLITH // BRUTALIST DINING")

    return render(request, 'cms/identity.html', {
        'active_tab': 'identity',
        'restaurant': restaurant,
    })


@login_required(login_url='cms_login')
@require_POST
def cms_identity_update_view(request):
    restaurant = Restaurant.objects.first()
    if not restaurant:
        restaurant = Restaurant.objects.create()

    restaurant.name = request.POST.get('name', restaurant.name)
    restaurant.tagline = request.POST.get('tagline', restaurant.tagline)
    restaurant.short_description = request.POST.get('short_description', restaurant.short_description)
    restaurant.phone = request.POST.get('phone', restaurant.phone)
    restaurant.email = request.POST.get('email', restaurant.email)
    restaurant.address = request.POST.get('address', restaurant.address)
    restaurant.city = request.POST.get('city', restaurant.city)
    restaurant.coordinates_display = request.POST.get('coordinates_display', restaurant.coordinates_display)
    restaurant.opening_hours_summary = request.POST.get('opening_hours_summary', restaurant.opening_hours_summary)

    restaurant.hero_heading_line1 = request.POST.get('hero_heading_line1', restaurant.hero_heading_line1)
    restaurant.hero_heading_line2 = request.POST.get('hero_heading_line2', restaurant.hero_heading_line2)
    restaurant.hero_heading_line3 = request.POST.get('hero_heading_line3', restaurant.hero_heading_line3)
    restaurant.hero_supporting_text = request.POST.get('hero_supporting_text', restaurant.hero_supporting_text)

    restaurant.brand_manifesto_title = request.POST.get('brand_manifesto_title', restaurant.brand_manifesto_title)
    restaurant.brand_manifesto_p1 = request.POST.get('brand_manifesto_p1', restaurant.brand_manifesto_p1)
    restaurant.brand_manifesto_p2 = request.POST.get('brand_manifesto_p2', restaurant.brand_manifesto_p2)

    restaurant.save()
    messages.success(request, "Monolith architectural parameters and identity updated.")
    return redirect('cms_identity')


# ==========================================
# RESERVATIONS & MAÎTRE D' DESK
# ==========================================

@login_required(login_url='cms_login')
def cms_reservations_view(request):
    status_filter = request.GET.get('status', 'all')
    shift_filter = request.GET.get('shift', 'all')
    date_filter = request.GET.get('date', '')
    search_query = request.GET.get('q', '').strip()

    qs = Reservation.objects.all().order_by('-created_at')

    if status_filter and status_filter != 'all':
        qs = qs.filter(status=status_filter)

    if shift_filter and shift_filter != 'all':
        qs = qs.filter(shift=shift_filter)

    if date_filter:
        qs = qs.filter(reservation_date=date_filter)

    if search_query:
        qs = qs.filter(
            Q(reference_code__icontains=search_query) |
            Q(full_name__icontains=search_query) |
            Q(email__icontains=search_query) |
            Q(phone__icontains=search_query)
        )

    counts = {
        'total': Reservation.objects.count(),
        'pending': Reservation.objects.filter(status='pending').count(),
        'confirmed': Reservation.objects.filter(status='confirmed').count(),
        'seated': Reservation.objects.filter(status='seated').count(),
        'cancelled': Reservation.objects.filter(status='cancelled').count(),
        'lunch': Reservation.objects.filter(shift='lunch').count(),
        'dinner': Reservation.objects.filter(shift='dinner').count(),
    }

    return render(request, 'cms/reservations.html', {
        'active_tab': 'reservations',
        'reservations': qs,
        'counts': counts,
        'status_filter': status_filter,
        'shift_filter': shift_filter,
        'date_filter': date_filter,
        'search_query': search_query,
    })


@login_required(login_url='cms_login')
@require_POST
def cms_update_reservation_status(request, pk):
    reservation = get_object_or_404(Reservation, pk=pk)
    new_status = request.POST.get('status')
    if new_status in dict(Reservation.STATUS_CHOICES):
        reservation.status = new_status
        reservation.save()
        messages.success(request, f"Reservation {reservation.reference_code} status updated to {new_status.upper()}.")
    else:
        messages.error(request, "Invalid status choice.")
    return redirect('cms_reservations')


@login_required(login_url='cms_login')
@require_POST
def cms_assign_table_view(request, pk):
    reservation = get_object_or_404(Reservation, pk=pk)
    table_num = request.POST.get('table_number', '').strip()
    reservation.table_number = table_num
    reservation.save(update_fields=['table_number'])
    messages.success(request, f"Table assignment for {reservation.reference_code} set to '{table_num}'.")
    return redirect('cms_reservations')


# ==========================================
# MENU & MEAL PHOTOGRAPHY REPERTOIRE
# ==========================================

@login_required(login_url='cms_login')
def cms_menu_view(request):
    categories = MenuCategory.objects.prefetch_related('items').all().order_by('display_order')
    items = MenuItem.objects.select_related('category').all().order_by('category__display_order', 'display_order')

    return render(request, 'cms/menu.html', {
        'active_tab': 'menu',
        'categories': categories,
        'items': items,
        'total_items': items.count(),
        'available_items': items.filter(is_available=True).count(),
    })


@login_required(login_url='cms_login')
@require_POST
def cms_toggle_menu_item(request, pk):
    item = get_object_or_404(MenuItem, pk=pk)
    item.is_available = not item.is_available
    item.save(update_fields=['is_available'])
    state = "AVAILABLE" if item.is_available else "OFF-MENU"
    messages.success(request, f"Menu item '{item.name}' toggled to {state}.")
    return redirect('cms_menu')


@login_required(login_url='cms_login')
@require_POST
def cms_menu_item_create_view(request):
    name = request.POST.get('name', '').strip()
    category_id = request.POST.get('category')
    price = request.POST.get('price', 0)
    subtitle = request.POST.get('subtitle', '').strip()
    description = request.POST.get('description', '').strip()
    dietary_tags = request.POST.get('dietary_tags', '').strip()
    image_url = request.POST.get('image_url', '').strip()
    origin_notes = request.POST.get('origin_notes', '').strip()
    calories_estimate = request.POST.get('calories_estimate', 0)
    is_featured = 'is_featured' in request.POST
    is_available = 'is_available' in request.POST

    if not name or not category_id:
        messages.error(request, "Name and Category are required.")
        return redirect('cms_menu')

    category = get_object_or_404(MenuCategory, pk=category_id)
    MenuItem.objects.create(
        name=name,
        category=category,
        price=price,
        subtitle=subtitle,
        description=description,
        dietary_tags=dietary_tags,
        image_url=image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        origin_notes=origin_notes,
        calories_estimate=calories_estimate or 0,
        is_featured=is_featured,
        is_available=is_available,
        display_order=MenuItem.objects.filter(category=category).count() + 1
    )
    messages.success(request, f"New dish '{name}' inducted into the Brutalist repertoire.")
    return redirect('cms_menu')


@login_required(login_url='cms_login')
@require_POST
def cms_menu_item_edit_view(request, pk):
    item = get_object_or_404(MenuItem, pk=pk)
    item.name = request.POST.get('name', item.name).strip()
    category_id = request.POST.get('category')
    if category_id:
        item.category = get_object_or_404(MenuCategory, pk=category_id)
    item.price = request.POST.get('price', item.price)
    item.subtitle = request.POST.get('subtitle', item.subtitle).strip()
    item.description = request.POST.get('description', item.description).strip()
    item.dietary_tags = request.POST.get('dietary_tags', item.dietary_tags).strip()
    item.image_url = request.POST.get('image_url', item.image_url).strip()
    item.origin_notes = request.POST.get('origin_notes', item.origin_notes).strip()
    item.calories_estimate = request.POST.get('calories_estimate', item.calories_estimate) or 0
    item.is_featured = 'is_featured' in request.POST
    item.is_available = 'is_available' in request.POST
    item.save()
    messages.success(request, f"Dish '{item.name}' specifications updated.")
    return redirect('cms_menu')


@login_required(login_url='cms_login')
@require_POST
def cms_menu_item_delete_view(request, pk):
    item = get_object_or_404(MenuItem, pk=pk)
    name = item.name
    item.delete()
    messages.success(request, f"Dish '{name}' removed from menu.")
    return redirect('cms_menu')


# ==========================================
# VIRTUAL TOUR VIEWPOINTS
# ==========================================

@login_required(login_url='cms_login')
def cms_tour_view(request):
    viewpoints = VirtualTourViewpoint.objects.all().order_by('display_order')
    return render(request, 'cms/tour.html', {
        'active_tab': 'tour',
        'viewpoints': viewpoints,
    })


# ==========================================
# 15 EDITORIAL HOMEPAGE SECTIONS
# ==========================================

@login_required(login_url='cms_login')
def cms_sections_view(request):
    sections = WebsiteSection.objects.all().order_by('display_order')
    return render(request, 'cms/sections.html', {
        'active_tab': 'sections',
        'sections': sections,
    })


@login_required(login_url='cms_login')
@require_POST
def cms_update_section(request, pk):
    section = get_object_or_404(WebsiteSection, pk=pk)
    section.eyebrow = request.POST.get('eyebrow', section.eyebrow)
    section.title = request.POST.get('title', section.title)
    section.subtitle = request.POST.get('subtitle', section.subtitle)
    section.is_visible = 'is_visible' in request.POST
    section.save()
    messages.success(request, f"Section '{section.title}' (S{section.display_order:02d}) parameters updated.")
    return redirect('cms_sections')


# ==========================================
# GALLERY ARCHIVE
# ==========================================

@login_required(login_url='cms_login')
def cms_gallery_view(request):
    gallery = GalleryImage.objects.all().order_by('display_order')
    return render(request, 'cms/gallery.html', {
        'active_tab': 'gallery',
        'gallery': gallery,
    })


# ==========================================
# CRITIC REVIEWS & TESTIMONIALS
# ==========================================

@login_required(login_url='cms_login')
def cms_reviews_view(request):
    reviews = Testimonial.objects.all().order_by('display_order')
    return render(request, 'cms/reviews.html', {
        'active_tab': 'reviews',
        'reviews': reviews,
    })


# ==========================================
# FAQS KNOWLEDGE BASE
# ==========================================

@login_required(login_url='cms_login')
def cms_faqs_view(request):
    faqs = FAQ.objects.all().order_by('display_order')
    return render(request, 'cms/faqs.html', {
        'active_tab': 'faqs',
        'faqs': faqs,
    })


# ==========================================
# MASTER JSON SCHEMA
# ==========================================

@login_required(login_url='cms_login')
def cms_schema_view(request):
    restaurant = Restaurant.objects.first()
    sections = WebsiteSection.objects.all()
    viewpoints = VirtualTourViewpoint.objects.all()
    pillars = PhilosophyPillar.objects.all()
    faqs = FAQ.objects.all()

    full_content = {
        "restaurant": RestaurantSerializer(restaurant).data if restaurant else {},
        "sections": {s.section_key: WebsiteSectionSerializer(s).data for s in sections},
        "viewpoints": VirtualTourViewpointSerializer(viewpoints, many=True).data,
        "pillars": PhilosophyPillarSerializer(pillars, many=True).data,
        "faqs": FAQSerializer(faqs, many=True).data,
    }

    return render(request, 'cms/schema.html', {
        'active_tab': 'schema',
        'master_json_str': json.dumps(full_content, indent=2)
    })


@login_required(login_url='cms_login')
@require_POST
def cms_save_master_json(request):
    raw_json = request.POST.get('master_json', '')
    try:
        data = json.loads(raw_json)
        if "restaurant" in data:
            r_data = data["restaurant"]
            restaurant = Restaurant.objects.first()
            if restaurant:
                for k, v in r_data.items():
                    if hasattr(restaurant, k) and k not in ['id', 'created_at', 'updated_at']:
                        setattr(restaurant, k, v)
                restaurant.save()

        if "sections" in data:
            for s_key, s_data in data["sections"].items():
                section = WebsiteSection.objects.filter(section_key=s_key).first()
                if section:
                    if 'eyebrow' in s_data: section.eyebrow = s_data['eyebrow']
                    if 'title' in s_data: section.title = s_data['title']
                    if 'subtitle' in s_data: section.subtitle = s_data['subtitle']
                    section.save()

        messages.success(request, "Master architectural configuration successfully compiled and saved.")
    except Exception as e:
        messages.error(request, f"JSON parse error: {str(e)}")

    return redirect('cms_schema')


# ==========================================
# EDITORIAL JOURNAL & BLOG
# ==========================================

@login_required(login_url='cms_login')
def cms_blog_view(request):
    posts = BlogPost.objects.select_related('category').all().order_by('-published_at')
    categories = BlogCategory.objects.all()

    return render(request, 'cms/blog.html', {
        'active_tab': 'blog',
        'posts': posts,
        'categories': categories,
        'total_posts': posts.count(),
        'published_posts': posts.filter(is_published=True).count(),
    })


@login_required(login_url='cms_login')
@require_POST
def cms_blog_create_view(request):
    title = request.POST.get('title', '').strip()
    slug = request.POST.get('slug', '').strip()
    category_id = request.POST.get('category')
    cover_image = request.POST.get('cover_image', '').strip()
    excerpt = request.POST.get('excerpt', '').strip()
    content = request.POST.get('content', '').strip()
    author_name = request.POST.get('author_name', 'Monolith Editorial Board').strip()
    read_time = request.POST.get('read_time', '5 min read').strip()
    is_published = 'is_published' in request.POST

    if not title:
        messages.error(request, "Article title is required.")
        return redirect('cms_blog')

    if not slug:
        slug = title.lower().replace(' ', '-').replace("'", '').replace('/', '-')

    base_slug = slug
    counter = 1
    while BlogPost.objects.filter(slug=slug).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1

    category = None
    if category_id:
        category = get_object_or_404(BlogCategory, pk=category_id)

    post = BlogPost.objects.create(
        title=title,
        slug=slug,
        category=category,
        cover_image=cover_image or "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        excerpt=excerpt,
        content=content,
        author_name=author_name,
        read_time=read_time,
        is_published=is_published
    )
    messages.success(request, f"Journal entry '{post.title}' recorded.")
    return redirect('cms_blog_edit', pk=post.pk)


@login_required(login_url='cms_login')
def cms_blog_edit_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        post.title = request.POST.get('title', post.title).strip()
        post.slug = request.POST.get('slug', post.slug).strip()
        category_id = request.POST.get('category')
        if category_id:
            post.category = get_object_or_404(BlogCategory, pk=category_id)
        else:
            post.category = None
        post.cover_image = request.POST.get('cover_image', post.cover_image).strip()
        post.excerpt = request.POST.get('excerpt', post.excerpt).strip()
        post.content = request.POST.get('content', post.content).strip()
        post.author_name = request.POST.get('author_name', post.author_name).strip()
        post.read_time = request.POST.get('read_time', post.read_time).strip()
        post.is_published = 'is_published' in request.POST
        post.save()
        messages.success(request, f"Journal entry '{post.title}' updated successfully.")
        return redirect('cms_blog_edit', pk=post.pk)

    return render(request, 'cms/blog_edit.html', {
        'active_tab': 'blog',
        'post': post,
        'categories': categories,
    })


@login_required(login_url='cms_login')
@require_POST
def cms_blog_delete_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    title = post.title
    post.delete()
    messages.success(request, f"Journal entry '{title}' deleted.")
    return redirect('cms_blog')
