import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from .models import SiteConfig, Reservation
from .management.commands.init_cms import INITIAL_ZEN_DATA


def staff_or_superuser_required(view_func):
    """Ensures only authenticated staff or superusers can access the Zen CMS Studio."""
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect(f'/cms/login/?next={request.path}')
        if not (request.user.is_staff or request.user.is_superuser):
            messages.error(request, "Access restricted: Only site administrators can access the Zen CMS Studio.")
            logout(request)
            return redirect('/cms/login/')
        return view_func(request, *args, **kwargs)
    return _wrapped_view


@csrf_protect
def cms_login_view(request):
    """
    Zen-inspired Login View for Site Administrators.
    """
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect('/cms/')

    next_url = request.GET.get('next', '/cms/')
    error_msg = None

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')

        if not username or not password:
            error_msg = "Please enter administrator username and password."
        else:
            user = authenticate(request, username=username, password=password)
            if user is not None:
                if user.is_staff or user.is_superuser:
                    login(request, user)
                    messages.success(request, f"Welcome back, {user.get_full_name() or user.username}. Zen Studio active.")
                    return redirect(next_url)
                else:
                    error_msg = "Access restricted: Only site administrators have permission to access the Zen CMS."
            else:
                error_msg = "Invalid username or password. Please verify credentials."

    return render(request, 'cms/login.html', {
        'error_msg': error_msg,
        'next_url': next_url,
    })


def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been safely signed out of the Zen CMS Studio.")
    return redirect('/cms/login/')


@staff_or_superuser_required
@csrf_protect
def cms_dashboard_view(request):
    """
    Main Japanese Zen CMS Dashboard for comprehensive content, visual styling,
    and reservation management.
    """
    site_config = SiteConfig.objects.filter(is_published=True).first()
    if not site_config:
        site_config = SiteConfig.objects.create(
            restaurant_name=INITIAL_ZEN_DATA.get('name', 'ENSO 圓相'),
            content_json=INITIAL_ZEN_DATA,
            is_published=True,
            updated_by=request.user,
        )

    content_data = site_config.content_json or INITIAL_ZEN_DATA

    # Handle POST updates
    if request.method == 'POST':
        # AJAX JSON POST
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
                    'message': 'Japanese Zen website content saved and published.',
                    'updated_at': site_config.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
                })
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=400)

        # Raw JSON Editor Submission
        raw_json_str = request.POST.get('raw_content_json')
        if raw_json_str:
            try:
                parsed_json = json.loads(raw_json_str)
                restaurant_name = parsed_json.get('name', site_config.restaurant_name)
                site_config.restaurant_name = restaurant_name
                site_config.content_json = parsed_json
                site_config.updated_by = request.user
                site_config.save()
                messages.success(request, "Zen configuration saved and published successfully via Direct JSON Editor.")
                return redirect('/cms/?tab=rawjson')
            except json.JSONDecodeError as err:
                messages.error(request, f"Invalid JSON syntax: {err}")
                return redirect('/cms/?tab=rawjson')

        # Form based section updates
        try:
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
            if 'color_charcoal' in request.POST:
                colors = updated.setdefault('theme', {}).setdefault('colors', {})
                colors['charcoal'] = request.POST.get('color_charcoal')
                colors['ricePaper'] = request.POST.get('color_rice_paper')
                colors['bamboo'] = request.POST.get('color_bamboo')
                colors['moss'] = request.POST.get('color_moss')
                colors['vermilion'] = request.POST.get('color_vermilion')
                colors['stone'] = request.POST.get('color_stone')
                colors['primaryButtonBg'] = request.POST.get('color_btn_bg')
                colors['primaryButtonText'] = request.POST.get('color_btn_text')
                colors['primaryButtonBorder'] = request.POST.get('color_btn_border')

            # Typography
            if 'font_display' in request.POST:
                typo = updated.setdefault('theme', {}).setdefault('typography', {})
                typo['fontDisplay'] = request.POST.get('font_display')
                typo['fontBody'] = request.POST.get('font_body')
                typo['fontJapanese'] = request.POST.get('font_japanese')
                try:
                    typo['heroHeadingSize'] = int(request.POST.get('hero_heading_size', 96))
                    typo['sectionHeadingSize'] = int(request.POST.get('section_heading_size', 64))
                    typo['bodySize'] = int(request.POST.get('body_size', 16))
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
                hero['japaneseSubtitle'] = request.POST.get('hero_japanese')
                hero['description'] = request.POST.get('hero_description')
                hero['primaryCta'] = request.POST.get('hero_primary_cta')
                hero['secondaryCta'] = request.POST.get('hero_secondary_cta')
                hero['locationBadge'] = request.POST.get('hero_location_badge')
                hero['fallbackImage'] = request.POST.get('hero_fallback_image')

            # Section 03 Philosophy
            if 'philo_title' in request.POST:
                philo = updated.setdefault('philosophy', {})
                philo['eyebrow'] = request.POST.get('philo_eyebrow')
                philo['title'] = request.POST.get('philo_title')
                philo['lead'] = request.POST.get('philo_lead')
                philo['description'] = request.POST.get('philo_description')
                philo['secondaryStatement'] = request.POST.get('philo_secondary')
                philo['image'] = request.POST.get('philo_image')

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
                chef['japaneseName'] = request.POST.get('chef_japanese')
                chef['position'] = request.POST.get('chef_position')
                chef['quote'] = request.POST.get('chef_quote')
                chef['bio1'] = request.POST.get('chef_bio1')
                chef['bio2'] = request.POST.get('chef_bio2')
                chef['image'] = request.POST.get('chef_image')

            # Section 13 Reservation
            if 'res_title' in request.POST:
                res_sec = updated.setdefault('reservationSection', {})
                res_sec['eyebrow'] = request.POST.get('res_eyebrow')
                res_sec['title'] = request.POST.get('res_title')
                res_sec['description'] = request.POST.get('res_description')
                res_sec['note'] = request.POST.get('res_note')

            # Section 15 Footer
            if 'footer_closing' in request.POST:
                footer = updated.setdefault('footer', {})
                footer['closingStatement'] = request.POST.get('footer_closing')
                footer['copyright'] = request.POST.get('footer_copyright')
                footer['tagline'] = request.POST.get('footer_tagline')

            site_config.content_json = updated
            site_config.updated_by = request.user
            site_config.save()

            messages.success(request, "Japanese Zen section settings successfully saved and published!")
            current_tab = request.POST.get('active_tab', 'overview')
            return redirect(f'/cms/?tab={current_tab}')

        except Exception as e:
            messages.error(request, f"Error saving configuration: {str(e)}")
            return redirect('/cms/')

    # Fetch Reservations and compute stats
    reservations = Reservation.objects.all().order_by('-created_at')
    stats = {
        'total_reservations': reservations.count(),
        'pending_reservations': reservations.filter(status='pending').count(),
        'confirmed_reservations': reservations.filter(status='confirmed').count(),
        'cancelled_reservations': reservations.filter(status='cancelled').count(),
    }

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
    reservation = get_object_or_404(Reservation, id=reservation_id)
    guest_name = reservation.full_name
    reservation.delete()
    messages.info(request, f"Inquiry for {guest_name} removed.")

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({'success': True, 'message': 'Reservation removed'})

    return redirect('/cms/?tab=reservations')
