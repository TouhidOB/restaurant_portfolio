import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryItem, TeamMember, Testimonial, Reservation
)

def cms_login_view(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('cms_dashboard')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome to Seoul Street CMS Studio, {user.username}!")
            return redirect('cms_dashboard')
        else:
            messages.error(request, "Invalid administrator credentials.")

    return render(request, 'cms/login.html')


def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out of the CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='cms_login')
def cms_dashboard_view(request):
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create()

    if request.method == 'POST':
        action = request.POST.get('action')

        # 1. Update Core Site Config
        if action == 'update_config':
            config.restaurant_name = request.POST.get('restaurant_name', config.restaurant_name)
            config.tagline = request.POST.get('tagline', config.tagline)
            config.hero_subtitle = request.POST.get('hero_subtitle', config.hero_subtitle)
            config.contact_email = request.POST.get('contact_email', config.contact_email)
            config.contact_phone = request.POST.get('contact_phone', config.contact_phone)
            config.address = request.POST.get('address', config.address)
            config.opening_hours = request.POST.get('opening_hours', config.opening_hours)
            config.save()
            messages.success(request, "General restaurant configuration saved.")
            return redirect('cms_dashboard')

        # 2. Master JSON Power Editor
        elif action == 'update_raw_json':
            raw_json_str = request.POST.get('content_json', '{}')
            try:
                parsed = json.loads(raw_json_str)
                config.content_json = parsed
                config.save()
                messages.success(request, "Master JSON Editorial Content successfully updated.")
            except Exception as e:
                messages.error(request, f"Invalid JSON format: {str(e)}")
            return redirect('cms_dashboard')

        # 3. Add Menu Item
        elif action == 'add_menu_item':
            cat_id = request.POST.get('category_id')
            category = get_object_or_404(MenuCategory, id=cat_id)
            name = request.POST.get('name')
            slug = request.POST.get('slug') or name.lower().replace(' ', '-')
            MenuItem.objects.create(
                category=category,
                name=name,
                korean_name=request.POST.get('korean_name', ''),
                slug=slug,
                short_description=request.POST.get('short_description', ''),
                description=request.POST.get('description', ''),
                price=request.POST.get('price', '₩14,000'),
                currency=request.POST.get('currency', 'KRW'),
                dietary_tags=request.POST.get('dietary_tags', ''),
                spicy_level=int(request.POST.get('spicy_level', 1) or 1),
                is_featured=request.POST.get('is_featured') == 'on',
                is_available=True,
                sort_order=int(request.POST.get('sort_order', 0) or 0)
            )
            messages.success(request, "New Korean street dish added.")
            return redirect('cms_dashboard')

        # 4. Delete Menu Item
        elif action == 'delete_menu_item':
            item_id = request.POST.get('item_id')
            MenuItem.objects.filter(id=item_id).delete()
            messages.info(request, "Menu item removed.")
            return redirect('cms_dashboard')

        # 5. Add Viewpoint
        elif action == 'add_viewpoint':
            TourViewpoint.objects.create(
                title=request.POST.get('title'),
                subtitle=request.POST.get('subtitle', ''),
                slug=request.POST.get('slug'),
                description=request.POST.get('description', ''),
                camera_position=request.POST.get('camera_position', '[0, 2.5, 7.0]'),
                camera_target=request.POST.get('camera_target', '[0, 1.2, 0]'),
                atmosphere=request.POST.get('atmosphere', ''),
                sort_order=int(request.POST.get('sort_order', 0) or 0)
            )
            messages.success(request, "New 3D virtual tour viewpoint created.")
            return redirect('cms_dashboard')

        # 6. Delete Viewpoint
        elif action == 'delete_viewpoint':
            vp_id = request.POST.get('viewpoint_id')
            TourViewpoint.objects.filter(id=vp_id).delete()
            messages.info(request, "Viewpoint deleted.")
            return redirect('cms_dashboard')

        # 7. Update Reservation Status
        elif action == 'update_reservation_status':
            res_id = request.POST.get('reservation_id')
            new_status = request.POST.get('new_status')
            res = get_object_or_404(Reservation, id=res_id)
            res.status = new_status
            res.save()
            messages.success(request, f"Reservation inquiry for {res.full_name} updated to {new_status}.")
            return redirect('cms_dashboard')

        # 8. Delete Reservation
        elif action == 'delete_reservation':
            res_id = request.POST.get('reservation_id')
            Reservation.objects.filter(id=res_id).delete()
            messages.info(request, "Reservation removed from inbox.")
            return redirect('cms_dashboard')

    # Template Data
    categories = MenuCategory.objects.prefetch_related('items').all()
    viewpoints = TourViewpoint.objects.all()
    experiences = DiningExperience.objects.all()
    gallery_items = GalleryItem.objects.all()
    team_members = TeamMember.objects.all()
    testimonials = Testimonial.objects.all()
    reservations = Reservation.objects.all()

    formatted_json = json.dumps(config.content_json or {}, indent=2)

    context = {
        'config': config,
        'formatted_json': formatted_json,
        'categories': categories,
        'viewpoints': viewpoints,
        'experiences': experiences,
        'gallery_items': gallery_items,
        'team_members': team_members,
        'testimonials': testimonials,
        'reservations': reservations,
        'total_reservations': reservations.count(),
        'pending_reservations': reservations.filter(status='pending').count(),
    }
    return render(request, 'cms/dashboard.html', context)
