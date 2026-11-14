import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import user_passes_test
from django.contrib import messages
from django.views.decorators.http import require_POST
from .models import SiteConfig, MenuCategory, MenuItem, Reservation


def staff_check(user):
    return user.is_authenticated and user.is_staff


def cms_login_view(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('cms_dashboard')

    if request.method == 'POST':
        u = request.POST.get('username', '').strip()
        p = request.POST.get('password', '').strip()
        user = authenticate(request, username=u, password=p)
        if user and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}. Botanical CMS Studio active.")
            return redirect('cms_dashboard')
        else:
            messages.error(request, "Invalid administrator credentials.")

    return render(request, 'cms/login.html')


def cms_logout_view(request):
    logout(request)
    messages.info(request, "Signed out of Botanical CMS Studio.")
    return redirect('cms_login')


@user_passes_test(staff_check, login_url='cms_login')
def cms_dashboard_view(request):
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            cafe_name="VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ",
            content_json={}
        )

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'save_raw_json':
            raw_text = request.POST.get('raw_json', '')
            try:
                parsed = json.loads(raw_text)
                config.content_json = parsed
                if 'cafe_name' in parsed:
                    config.cafe_name = parsed['cafe_name']
                config.save()
                messages.success(request, "Master botanical JSON configuration saved successfully.")
            except Exception as e:
                messages.error(request, f"JSON Syntax Error: {e}")

        elif action == 'save_general':
            cafe_name = request.POST.get('cafe_name', '').strip()
            eyebrow = request.POST.get('hero_eyebrow', '').strip()
            headline = request.POST.get('hero_title', '').strip()
            lead_desc = request.POST.get('hero_description', '').strip()

            cjson = config.content_json
            if 'hero' not in cjson:
                cjson['hero'] = {}

            if cafe_name:
                config.cafe_name = cafe_name
                cjson['cafe_name'] = cafe_name
            if eyebrow:
                cjson['hero']['eyebrow'] = eyebrow
            if headline:
                cjson['hero']['title'] = headline
            if lead_desc:
                cjson['hero']['description'] = lead_desc

            config.content_json = cjson
            config.save()
            messages.success(request, "Hero & general botanical branding updated successfully.")

        elif action == 'save_section':
            section_key = request.POST.get('section_key', '').strip()
            field_name = request.POST.get('field_name', '').strip()
            field_value = request.POST.get('field_value', '').strip()

            if section_key and field_name:
                cjson = config.content_json
                if section_key not in cjson:
                    cjson[section_key] = {}
                cjson[section_key][field_name] = field_value
                config.content_json = cjson
                config.save()
                messages.success(request, f"Updated [{section_key}.{field_name}] successfully.")

        return redirect('cms_dashboard')

    categories = MenuCategory.objects.all().prefetch_related('items')
    menu_items = MenuItem.objects.all().select_related('category')
    reservations = Reservation.objects.all().order_by('-created_at')

    context = {
        'config': config,
        'content_json_pretty': json.dumps(config.content_json, indent=2, ensure_ascii=False),
        'categories': categories,
        'menu_items': menu_items,
        'reservations': reservations,
        'stats': {
            'total_reservations': reservations.count(),
            'pending_reservations': reservations.filter(status='pending').count(),
            'menu_count': menu_items.count(),
            'categories_count': categories.count(),
        }
    }
    return render(request, 'cms/dashboard.html', context)


@require_POST
@user_passes_test(staff_check, login_url='cms_login')
def cms_reservation_status_view(request, res_id):
    reservation = get_object_or_404(Reservation, id=res_id)
    new_status = request.POST.get('status')
    if new_status in dict(Reservation.STATUS_CHOICES):
        reservation.status = new_status
        reservation.save()
        messages.success(request, f"Reservation #{reservation.id} status changed to {reservation.get_status_display()}.")
    return redirect('cms_dashboard')


@require_POST
@user_passes_test(staff_check, login_url='cms_login')
def cms_reservation_delete_view(request, res_id):
    reservation = get_object_or_404(Reservation, id=res_id)
    reservation.delete()
    messages.success(request, f"Reservation inquiry #{res_id} deleted successfully.")
    return redirect('cms_dashboard')
