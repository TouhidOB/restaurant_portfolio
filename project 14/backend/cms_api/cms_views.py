import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib import messages
from django.utils.text import slugify

from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial, Reservation
)


def cms_login(request):
    if request.user.is_authenticated:
        return redirect('cms_dashboard')
    
    error = None
    if request.method == 'POST':
        user = authenticate(request, username=request.POST.get('username'), password=request.POST.get('password'))
        if user:
            login(request, user)
            return redirect('cms_dashboard')
        error = "Invalid username or password"
    
    return render(request, 'cms/login.html', {'error': error})


def cms_logout(request):
    logout(request)
    return redirect('cms_login')


@login_required(login_url='cms_login')
def cms_dashboard(request):
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(restaurant_name="CHARRED & PRIME")
    
    categories = MenuCategory.objects.all().order_by('sort_order')
    menu_items = MenuItem.objects.select_related('category').all().order_by('sort_order')
    viewpoints = TourViewpoint.objects.all().order_by('sort_order')
    gallery_items = GalleryItem.objects.all().order_by('sort_order')
    experiences = DiningExperience.objects.all().order_by('sort_order')
    team_members = TeamMember.objects.all().order_by('sort_order')
    testimonials = Testimonial.objects.all().order_by('sort_order')
    reservations = Reservation.objects.all().order_by('-created_at')

    # Metrics
    metrics = {
        'total_reservations': reservations.count(),
        'pending_reservations': reservations.filter(status='pending').count(),
        'confirmed_reservations': reservations.filter(status='confirmed').count(),
        'total_menu_items': menu_items.count(),
        'active_categories': categories.filter(is_active=True).count(),
        'active_viewpoints': viewpoints.filter(is_active=True).count(),
        'gallery_count': gallery_items.count(),
    }

    content_str = json.dumps(config.content_json, indent=2)

    context = {
        'config': config,
        'categories': categories,
        'menu_items': menu_items,
        'viewpoints': viewpoints,
        'gallery_items': gallery_items,
        'experiences': experiences,
        'team_members': team_members,
        'testimonials': testimonials,
        'reservations': reservations,
        'metrics': metrics,
        'content_str': content_str,
    }
    return render(request, 'cms/dashboard.html', context)


@login_required(login_url='cms_login')
def update_general_config(request):
    if request.method == 'POST':
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(restaurant_name="CHARRED & PRIME")

        config.restaurant_name = request.POST.get('restaurant_name', config.restaurant_name)
        
        c = config.content_json or {}
        
        # Site details
        c.setdefault('site', {})
        c['site']['phone'] = request.POST.get('phone', c['site'].get('phone', ''))
        c['site']['email'] = request.POST.get('email', c['site'].get('email', ''))
        c['site']['address'] = request.POST.get('address', c['site'].get('address', ''))
        c['site']['hours'] = request.POST.get('hours', c['site'].get('hours', ''))

        # Hero
        c.setdefault('hero', {})
        c['hero']['eyebrow'] = request.POST.get('hero_eyebrow', c['hero'].get('eyebrow', ''))
        c['hero']['title'] = request.POST.get('hero_title', c['hero'].get('title', ''))
        c['hero']['description'] = request.POST.get('hero_description', c['hero'].get('description', ''))
        c['hero']['primaryCta'] = request.POST.get('hero_primaryCta', c['hero'].get('primaryCta', ''))
        c['hero']['secondaryCta'] = request.POST.get('hero_secondaryCta', c['hero'].get('secondaryCta', ''))

        # Brand Story
        c.setdefault('brand_story', {})
        c['brand_story']['eyebrow'] = request.POST.get('story_eyebrow', c['brand_story'].get('eyebrow', ''))
        c['brand_story']['heading'] = request.POST.get('story_heading', c['brand_story'].get('heading', ''))
        c['brand_story']['main_text'] = request.POST.get('story_main_text', c['brand_story'].get('main_text', ''))
        c['brand_story']['quote'] = request.POST.get('story_quote', c['brand_story'].get('quote', ''))

        # Open Fire Kitchen
        c.setdefault('open_fire_kitchen', {})
        c['open_fire_kitchen']['heading'] = request.POST.get('fire_heading', c['open_fire_kitchen'].get('heading', ''))
        c['open_fire_kitchen']['description'] = request.POST.get('fire_description', c['open_fire_kitchen'].get('description', ''))

        config.content_json = c
        config.save()
        messages.success(request, "Website configuration saved successfully!")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def update_json_config(request):
    if request.method == 'POST':
        raw_json = request.POST.get('raw_json', '')
        try:
            parsed = json.loads(raw_json)
            config = SiteConfig.objects.first()
            if not config:
                config = SiteConfig.objects.create(restaurant_name="CHARRED & PRIME")
            config.content_json = parsed
            config.save()
            messages.success(request, "JSON configuration published successfully!")
        except Exception as e:
            messages.error(request, f"Invalid JSON syntax: {str(e)}")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def add_menu_item(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        category_id = request.POST.get('category_id')
        price = request.POST.get('price', 0)
        currency = request.POST.get('currency', '$')
        cut_type = request.POST.get('cut_type', '')
        serving_size = request.POST.get('serving_size', '')
        description = request.POST.get('description', '')
        image_url = request.POST.get('image_url', '')
        is_featured = 'is_featured' in request.POST

        category = get_object_or_404(MenuCategory, id=category_id)
        slug = slugify(name) + f"-{MenuItem.objects.count() + 1}"

        MenuItem.objects.create(
            category=category,
            name=name,
            slug=slug,
            price=price,
            currency=currency,
            cut_type=cut_type,
            serving_size=serving_size,
            description=description,
            image_url=image_url,
            is_featured=is_featured,
            is_available=True
        )
        messages.success(request, f"Dish '{name}' created successfully!")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def delete_menu_item(request, item_id):
    item = get_object_or_404(MenuItem, id=item_id)
    name = item.name
    item.delete()
    messages.success(request, f"Dish '{name}' deleted.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def add_viewpoint(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        subtitle = request.POST.get('subtitle', '')
        description = request.POST.get('description', '')
        image_url = request.POST.get('image_url', '')
        sort_order = request.POST.get('sort_order', 0)

        TourViewpoint.objects.create(
            title=title,
            subtitle=subtitle,
            description=description,
            image_url=image_url,
            sort_order=sort_order,
            is_active=True
        )
        messages.success(request, f"Viewpoint '{title}' added.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def delete_viewpoint(request, vp_id):
    vp = get_object_or_404(TourViewpoint, id=vp_id)
    title = vp.title
    vp.delete()
    messages.success(request, f"Viewpoint '{title}' deleted.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def update_reservation_status(request, res_id):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, id=res_id)
        status = request.POST.get('status')
        if status in ['pending', 'confirmed', 'cancelled']:
            res.status = status
            res.save()
            messages.success(request, f"Reservation #{res.id} marked as {status}.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def delete_reservation(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    res.delete()
    messages.success(request, f"Reservation #{res_id} removed.")
    return redirect('cms_dashboard')
