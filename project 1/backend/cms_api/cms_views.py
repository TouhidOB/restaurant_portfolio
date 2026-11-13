import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_protect
from .models import SiteConfig, Reservation
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


@csrf_protect
def cms_login_view(request):
    """
    Login view for site administrators.
    """
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect('/cms/')

    next_url = request.GET.get('next', '/cms/')
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
    """
    Logout view for site administrators.
    """
    logout(request)
    messages.info(request, "You have been logged out of the CMS portal.")
    return redirect('/cms/login/')


@staff_or_superuser_required
@csrf_protect
def cms_dashboard_view(request):
    """
    Main CMS Dashboard where site administrators edit website sections,
    appearance, typography, colors, dishes, and manage reservations.
    """
    # Ensure active SiteConfig exists
    site_config = SiteConfig.objects.filter(is_published=True).first()
    if not site_config:
        site_config = SiteConfig.objects.create(
            restaurant_name=INITIAL_DATA.get('name', 'AURELIA'),
            content_json=INITIAL_DATA,
            is_published=True,
            updated_by=request.user,
        )

    content_data = site_config.content_json or INITIAL_DATA

    # Handle updates via POST
    if request.method == 'POST':
        # Check if this is an AJAX JSON request
        if request.content_type == 'application/json':
            try:
                body = json.loads(request.body.decode('utf-8'))
                updated_content = body.get('content', body)
                restaurant_name = updated_content.get('name', site_config.restaurant_name)

                site_config.restaurant_name = restaurant_name
                site_config.content_json = updated_content
                site_config.updated_by = request.user
                site_config.save()

                return JsonResponse({
                    'success': True,
                    'message': 'Changes saved and published to live website successfully.',
                    'updated_at': site_config.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
                })
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=400)

        # Standard HTML Form POST (e.g., Raw JSON or form submission)
        raw_json_str = request.POST.get('raw_content_json')
        if raw_json_str:
            try:
                parsed_json = json.loads(raw_json_str)
                restaurant_name = parsed_json.get('name', site_config.restaurant_name)
                site_config.restaurant_name = restaurant_name
                site_config.content_json = parsed_json
                site_config.updated_by = request.user
                site_config.save()
                messages.success(request, "CMS configuration updated and published successfully via Direct JSON editor!")
                return redirect('/cms/?tab=rawjson')
            except json.JSONDecodeError as err:
                messages.error(request, f"Invalid JSON format: {err}")
                return redirect('/cms/?tab=rawjson')

        # Form based section update
        try:
            # Deep clone existing config
            updated = json.loads(json.dumps(content_data))

            # General Info
            if 'restaurant_name' in request.POST:
                updated['name'] = request.POST.get('restaurant_name', updated.get('name'))
                site_config.restaurant_name = updated['name']
            if 'restaurant_subname' in request.POST:
                updated['subname'] = request.POST.get('restaurant_subname')
            if 'restaurant_tagline' in request.POST:
                updated['tagline'] = request.POST.get('restaurant_tagline')
            if 'restaurant_story' in request.POST:
                updated['shortStory'] = request.POST.get('restaurant_story')
            if 'city' in request.POST:
                updated['city'] = request.POST.get('city')
            if 'country' in request.POST:
                updated['country'] = request.POST.get('country')
            if 'currency' in request.POST:
                updated['currency'] = request.POST.get('currency')

            # Theme Colors
            if 'color_emerald' in request.POST:
                theme_colors = updated.setdefault('theme', {}).setdefault('colors', {})
                theme_colors['emerald'] = request.POST.get('color_emerald')
                theme_colors['gold'] = request.POST.get('color_gold')
                theme_colors['obsidian'] = request.POST.get('color_obsidian')
                theme_colors['pearl'] = request.POST.get('color_pearl')
                theme_colors['jade'] = request.POST.get('color_jade')
                theme_colors['bronze'] = request.POST.get('color_bronze')
                theme_colors['primaryButtonBg'] = request.POST.get('color_btn_bg')
                theme_colors['primaryButtonText'] = request.POST.get('color_btn_text')
                theme_colors['primaryButtonBorder'] = request.POST.get('color_btn_border')

            # Typography
            if 'font_display' in request.POST:
                theme_typo = updated.setdefault('theme', {}).setdefault('typography', {})
                theme_typo['fontDisplay'] = request.POST.get('font_display')
                theme_typo['fontBody'] = request.POST.get('font_body')
                theme_typo['fontAccent'] = request.POST.get('font_accent')
                try:
                    theme_typo['heroHeadingSize'] = int(request.POST.get('hero_heading_size', 84))
                    theme_typo['sectionHeadingSize'] = int(request.POST.get('section_heading_size', 56))
                    theme_typo['bodySize'] = int(request.POST.get('body_size', 16))
                except ValueError:
                    pass

            # Contact & Hours
            if 'contact_phone' in request.POST:
                contact = updated.setdefault('contact', {})
                contact['phone'] = request.POST.get('contact_phone')
                contact['phoneDisplay'] = request.POST.get('contact_phone')
                contact['email'] = request.POST.get('contact_email')
                contact['address'] = request.POST.get('contact_address')
                contact['fullAddress'] = request.POST.get('contact_full_address')
                contact['whatsapp'] = request.POST.get('contact_whatsapp')
                contact['googleMapsEmbedUrl'] = request.POST.get('google_maps_embed')

            # Section 02 Hero
            if 'hero_title' in request.POST:
                hero = updated.setdefault('hero', {})
                hero['eyebrow'] = request.POST.get('hero_eyebrow')
                hero['title'] = request.POST.get('hero_title')
                hero['description'] = request.POST.get('hero_description')
                hero['primaryCta'] = request.POST.get('hero_primary_cta')
                hero['secondaryCta'] = request.POST.get('hero_secondary_cta')
                hero['locationBadge'] = request.POST.get('hero_location_badge')
                hero['fallbackImage'] = request.POST.get('hero_fallback_image')

            # Section 03 Brand Intro
            if 'intro_title' in request.POST:
                intro = updated.setdefault('brandIntro', {})
                intro['eyebrow'] = request.POST.get('intro_eyebrow')
                intro['title'] = request.POST.get('intro_title')
                intro['lead'] = request.POST.get('intro_lead')
                intro['description'] = request.POST.get('intro_description')
                intro['secondaryStatement'] = request.POST.get('intro_secondary')
                intro['cta'] = request.POST.get('intro_cta')
                intro['image'] = request.POST.get('intro_image')

            # Section 08 Architecture
            if 'arch_title' in request.POST:
                arch = updated.setdefault('architecture', {})
                arch['eyebrow'] = request.POST.get('arch_eyebrow')
                arch['title'] = request.POST.get('arch_title')
                arch['description'] = request.POST.get('arch_description')

            # Section 09 Meet The Chef
            if 'chef_name' in request.POST:
                chef = updated.setdefault('chef', {})
                chef['eyebrow'] = request.POST.get('chef_eyebrow')
                chef['name'] = request.POST.get('chef_name')
                chef['title'] = request.POST.get('chef_title')
                chef['quote'] = request.POST.get('chef_quote')
                chef['bio1'] = request.POST.get('chef_bio1')
                chef['bio2'] = request.POST.get('chef_bio2')
                chef['image'] = request.POST.get('chef_image')

            # Section 13 Reservation
            if 'res_title' in request.POST:
                res_sec = updated.setdefault('reservationSection', {})
                res_sec['eyebrow'] = request.POST.get('res_eyebrow')
                res_sec['title'] = request.POST.get('res_title')
                res_sec['note'] = request.POST.get('res_note')

            # Section 15 Footer
            if 'footer_copyright' in request.POST:
                footer = updated.setdefault('footer', {})
                footer['copyright'] = request.POST.get('footer_copyright')
                footer['tagline'] = request.POST.get('footer_tagline')

            site_config.content_json = updated
            site_config.updated_by = request.user
            site_config.save()

            messages.success(request, "Section settings updated and published successfully!")
            current_tab = request.POST.get('active_tab', 'overview')
            return redirect(f'/cms/?tab={current_tab}')

        except Exception as e:
            messages.error(request, f"Error saving section configuration: {str(e)}")
            return redirect('/cms/')

    # Fetch Reservations and compute stats
    reservations = Reservation.objects.all().order_by('-created_at')
    stats = {
        'total_reservations': reservations.count(),
        'pending_reservations': reservations.filter(status='pending').count(),
        'confirmed_reservations': reservations.filter(status='confirmed').count(),
        'cancelled_reservations': reservations.filter(status='cancelled').count(),
    }

    # Format JSON string for direct code editor
    pretty_json = json.dumps(content_data, indent=2, ensure_ascii=False)

    return render(request, 'cms/dashboard.html', {
        'site_config': site_config,
        'content': content_data,
        'content_json_str': pretty_json,
        'reservations': reservations,
        'stats': stats,
        'active_tab': request.GET.get('tab', 'overview'),
    })


@staff_or_superuser_required
def cms_reservation_status_view(request, reservation_id, new_status):
    """
    Toggle reservation status (confirmed, pending, cancelled) from the CMS UI.
    """
    reservation = get_object_or_404(Reservation, id=reservation_id)
    if new_status in ['pending', 'confirmed', 'cancelled']:
        reservation.status = new_status
        reservation.save()
        messages.success(request, f"Reservation for {reservation.full_name} updated to '{new_status.title()}'.")
    else:
        messages.error(request, f"Invalid reservation status: {new_status}")

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({'success': True, 'id': reservation.id, 'status': reservation.status})

    return redirect('/cms/?tab=reservations')


@staff_or_superuser_required
def cms_reservation_delete_view(request, reservation_id):
    """
    Delete a reservation inquiry from the database.
    """
    reservation = get_object_or_404(Reservation, id=reservation_id)
    guest_name = reservation.full_name
    reservation.delete()
    messages.info(request, f"Reservation inquiry for {guest_name} has been removed.")

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({'success': True, 'message': 'Reservation deleted'})

    return redirect('/cms/?tab=reservations')
