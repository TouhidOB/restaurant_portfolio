import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import SiteConfig, Reservation

def is_staff_or_superuser(user):
    return user.is_authenticated and (user.is_staff or user.is_superuser)

def cms_login_view(request):
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect('cms_dashboard')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        user = authenticate(request, username=username, password=password)

        if user and (user.is_staff or user.is_superuser):
            login(request, user)
            messages.success(request, f"Welcome, {user.username}. Access to Urban Industrial CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_dashboard'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of the Urban Industrial CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_dashboard_view(request):
    config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="URBAN TABLE",
            content_json={},
            is_published=True,
            updated_by=request.user
        )

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'save_raw_json':
            raw_json_str = request.POST.get('raw_json', '')
            try:
                parsed_json = json.loads(raw_json_str)
                config.content_json = parsed_json
                if 'hero' in parsed_json and 'restaurant_name' in parsed_json['hero']:
                    config.restaurant_name = parsed_json['hero']['restaurant_name']
                config.updated_by = request.user
                config.save()
                messages.success(request, "Urban Industrial CMS configuration saved & published to public API successfully!")
            except json.JSONDecodeError as e:
                messages.error(request, f"Invalid JSON format: {str(e)}")

        elif action == 'save_form_sections':
            data = config.content_json if isinstance(config.content_json, dict) else {}

            # S01 & S02: Brand / Hero
            hero = data.get('hero', {})
            hero['restaurant_name'] = request.POST.get('hero_name', hero.get('restaurant_name', "URBAN TABLE"))
            hero['tagline'] = request.POST.get('hero_tagline', hero.get('tagline', 'Urban Kitchen • Craft Smokehouse • Open Fire'))
            hero['lead_description'] = request.POST.get('hero_desc', hero.get('lead_description', ''))
            hero['cta_primary_text'] = request.POST.get('hero_cta_primary', hero.get('cta_primary_text', 'Explore The Menu'))
            hero['cta_secondary_text'] = request.POST.get('hero_cta_secondary', hero.get('cta_secondary_text', 'Discover Our Space'))
            hero['badge_text'] = request.POST.get('hero_badge', hero.get('badge_text', 'Craft Smoke & Open Fire • Warehouse District'))
            data['hero'] = hero

            # S03: Brand Story
            story = data.get('brandStory', {})
            story['title'] = request.POST.get('story_title', story.get('title', 'Made With Fire & Craft'))
            story['subtitle'] = request.POST.get('story_subtitle', story.get('subtitle', 'Our Story'))
            story['body_paragraph_1'] = request.POST.get('story_p1', story.get('body_paragraph_1', ''))
            story['body_paragraph_2'] = request.POST.get('story_p2', story.get('body_paragraph_2', ''))
            story['quote'] = request.POST.get('story_quote', story.get('quote', ''))
            story['quote_author'] = request.POST.get('story_quote_author', story.get('quote_author', ''))
            data['brandStory'] = story

            # S04: 3D Tour
            tour = data.get('virtualTour', {})
            tour['title'] = request.POST.get('tour_title', tour.get('title', 'Restaurant Virtual Tour'))
            tour['subtitle'] = request.POST.get('tour_subtitle', tour.get('subtitle', 'Explore The Five Spaces'))
            tour['description'] = request.POST.get('tour_desc', tour.get('description', ''))
            data['virtualTour'] = tour

            # S06: Signature Dishes
            sig = data.get('signatureDishes', {})
            sig['title'] = request.POST.get('sig_title', sig.get('title', 'Signature Dishes Showcase'))
            sig['subtitle'] = request.POST.get('sig_subtitle', sig.get('subtitle', 'Raw Flavor • Open Flame'))
            data['signatureDishes'] = sig

            # S07: Menu
            menu = data.get('menu', {})
            menu['title'] = request.POST.get('menu_title', menu.get('title', 'Full Menu Explorer'))
            menu['subtitle'] = request.POST.get('menu_subtitle', menu.get('subtitle', 'Crafted Daily In Our Open Kitchen'))
            data['menu'] = menu

            # S08: Interior Architecture
            interior = data.get('interior', {})
            interior['title'] = request.POST.get('int_title', interior.get('title', 'Interior Architecture & Atmosphere'))
            interior['subtitle'] = request.POST.get('int_subtitle', interior.get('subtitle', 'Converted 1920s Industrial Warehouse'))
            interior['quote'] = request.POST.get('int_quote', interior.get('quote', ''))
            data['interior'] = interior

            # S09: Chef & Kitchen Team
            chef = data.get('chef', {})
            chef['name'] = request.POST.get('chef_name', chef.get('name', 'Chef Marcus Vance'))
            chef['title'] = request.POST.get('chef_title', chef.get('title', 'Executive Chef & Pitmaster'))
            chef['bio'] = request.POST.get('chef_bio', chef.get('bio', ''))
            chef['quote'] = request.POST.get('chef_quote', chef.get('quote', ''))
            data['chef'] = chef

            # S10: Experiences
            exp = data.get('experiences', {})
            exp['title'] = request.POST.get('exp_title', exp.get('title', 'Special Dining Experiences'))
            exp['subtitle'] = request.POST.get('exp_subtitle', exp.get('subtitle', 'From Warehouse Feasts To Private Tastings'))
            data['experiences'] = exp

            # S11: Gallery
            gallery = data.get('gallery', {})
            gallery['title'] = request.POST.get('gal_title', gallery.get('title', 'Food, People & Atmosphere Gallery'))
            gallery['subtitle'] = request.POST.get('gal_subtitle', gallery.get('subtitle', 'Raw Visual Moments'))
            data['gallery'] = gallery

            # S12: Testimonials
            testimonials = data.get('testimonials', {})
            testimonials['title'] = request.POST.get('test_title', testimonials.get('title', 'Guest Reviews & Social Proof'))
            testimonials['subtitle'] = request.POST.get('test_subtitle', testimonials.get('subtitle', 'Honest Feedback From Our Community'))
            data['testimonials'] = testimonials

            # S13: Reservation Info
            reservation_cfg = data.get('reservation', {})
            reservation_cfg['title'] = request.POST.get('res_title', reservation_cfg.get('title', 'Table Reservation'))
            reservation_cfg['subtitle'] = request.POST.get('res_subtitle', reservation_cfg.get('subtitle', 'Reserve An Industrial Dining Experience'))
            reservation_cfg['description'] = request.POST.get('res_desc', reservation_cfg.get('description', ''))
            reservation_cfg['policy'] = request.POST.get('res_policy', reservation_cfg.get('policy', ''))
            data['reservation'] = reservation_cfg

            # S14: Location & Contact
            loc = data.get('location', {})
            loc['title'] = request.POST.get('loc_title', loc.get('title', 'Location, Hours & Map'))
            loc['subtitle'] = request.POST.get('loc_subtitle', loc.get('subtitle', 'Heart of the Industrial Arts District'))
            loc['address'] = request.POST.get('loc_address', loc.get('address', '420 Ironworks Avenue, Warehouse District'))
            loc['phone'] = request.POST.get('loc_phone', loc.get('phone', '+1 (555) 789-2044'))
            loc['email'] = request.POST.get('loc_email', loc.get('email', 'table@urbankitchen.com'))
            loc['hours'] = request.POST.get('loc_hours', loc.get('hours', 'Tue - Sun: 12:00 PM - 11:30 PM'))
            data['location'] = loc

            # Theme Settings
            theme = data.get('theme', {})
            colors = theme.get('colors', {})
            colors['graphite'] = request.POST.get('theme_graphite', colors.get('graphite', '#252729'))
            colors['brick'] = request.POST.get('theme_brick', colors.get('brick', '#914D37'))
            colors['copper'] = request.POST.get('theme_copper', colors.get('copper', '#B87345'))
            colors['concrete'] = request.POST.get('theme_concrete', colors.get('concrete', '#B7B4AC'))
            colors['offwhite'] = request.POST.get('theme_offwhite', colors.get('offwhite', '#F1EEE7'))
            colors['black'] = request.POST.get('theme_black', colors.get('black', '#111314'))
            theme['colors'] = colors
            data['theme'] = theme

            config.content_json = data
            config.restaurant_name = hero['restaurant_name']
            config.updated_by = request.user
            config.save()
            messages.success(request, "Section fields updated and published instantly to public site!")

        return redirect('cms_dashboard')

    reservations = Reservation.objects.all().order_by('-created_at')
    pretty_json = json.dumps(config.content_json, indent=2, ensure_ascii=False)

    return render(request, 'cms/dashboard.html', {
        'config': config,
        'pretty_json': pretty_json,
        'reservations': reservations,
        'content': config.content_json or {}
    })


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_status_view(request, res_id):
    if request.method == 'POST':
        reservation = get_object_or_404(Reservation, id=res_id)
        new_status = request.POST.get('status')
        if new_status in dict(Reservation.STATUS_CHOICES):
            reservation.status = new_status
            reservation.save()
            messages.success(request, f"Reservation for {reservation.full_name} updated to {new_status.title()}.")
    return redirect('cms_dashboard')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_delete_view(request, res_id):
    if request.method == 'POST':
        reservation = get_object_or_404(Reservation, id=res_id)
        name = reservation.full_name
        reservation.delete()
        messages.success(request, f"Reservation inquiry for {name} has been removed.")
    return redirect('cms_dashboard')
