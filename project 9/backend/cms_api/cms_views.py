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
            messages.success(request, f"Welcome, {user.username}. Access to Skyline CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_dashboard'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of the Skyline CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_dashboard_view(request):
    config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="SKYLINE",
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
                messages.success(request, "Skyline CMS configuration saved & published to public API successfully!")
            except json.JSONDecodeError as e:
                messages.error(request, f"Invalid JSON format: {str(e)}")

        elif action == 'save_form_sections':
            data = config.content_json if isinstance(config.content_json, dict) else {}

            # S01 & S02: Brand / Hero
            hero = data.get('hero', {})
            hero['restaurant_name'] = request.POST.get('hero_name', hero.get('restaurant_name', "SKYLINE"))
            hero['elevation_badge'] = request.POST.get('hero_elevation', hero.get('elevation_badge', 'Level 54 • 220m Above The City'))
            hero['title'] = request.POST.get('hero_title', hero.get('title', 'WHERE THE CITY TOUCHES THE SKY'))
            hero['tagline'] = request.POST.get('hero_tagline', hero.get('tagline', 'Elevated Urban Dining • Panoramic Rooftop Terrace • Sunset Cocktails'))
            hero['lead_description'] = request.POST.get('hero_desc', hero.get('lead_description', ''))
            hero['cta_primary_text'] = request.POST.get('hero_cta_primary', hero.get('cta_primary_text', 'Reserve A Table'))
            hero['cta_secondary_text'] = request.POST.get('hero_cta_secondary', hero.get('cta_secondary_text', 'Explore Virtual Tour'))
            data['hero'] = hero

            # S03: Brand Story
            story = data.get('brandStory', {})
            story['title'] = request.POST.get('story_title', story.get('title', 'Culinary Artistry Above the Horizon'))
            story['subtitle'] = request.POST.get('story_subtitle', story.get('subtitle', 'Our Story & Vision'))
            story['body_paragraph_1'] = request.POST.get('story_p1', story.get('body_paragraph_1', ''))
            story['body_paragraph_2'] = request.POST.get('story_p2', story.get('body_paragraph_2', ''))
            story['quote'] = request.POST.get('story_quote', story.get('quote', ''))
            story['quote_author'] = request.POST.get('story_quote_author', story.get('quote_author', ''))
            data['brandStory'] = story

            # S04: 3D Tour
            tour = data.get('virtualTour', {})
            tour['title'] = request.POST.get('tour_title', tour.get('title', 'Skyline Rooftop Virtual Tour'))
            tour['subtitle'] = request.POST.get('tour_subtitle', tour.get('subtitle', 'Ascend Through 5 Architectural Viewpoints'))
            tour['description'] = request.POST.get('tour_desc', tour.get('description', ''))
            data['virtualTour'] = tour

            # S05: Dining Experience
            exp = data.get('diningExperience', {})
            exp['title'] = request.POST.get('exp_title', exp.get('title', 'Distinct Rooftop Dining Dimensions'))
            exp['subtitle'] = request.POST.get('exp_subtitle', exp.get('subtitle', 'Atmosphere & Architecture'))
            data['diningExperience'] = exp

            # S06: Signature Dishes
            sig = data.get('signatureDishes', {})
            sig['title'] = request.POST.get('sig_title', sig.get('title', 'Signature Skyline Culinary Creations'))
            sig['subtitle'] = request.POST.get('sig_subtitle', sig.get('subtitle', 'Crafted By Master Chefs at 220 Meters'))
            data['signatureDishes'] = sig

            # S07: Menu
            menu = data.get('menu', {})
            menu['title'] = request.POST.get('menu_title', menu.get('title', 'Curated Seasonal Menus'))
            menu['subtitle'] = request.POST.get('menu_subtitle', menu.get('subtitle', 'Tasting Menus, À La Carte & Rare Reserve Cellar'))
            data['menu'] = menu

            # S08: Architecture
            arch = data.get('architecture', {})
            arch['title'] = request.POST.get('arch_title', arch.get('title', 'Architectural Design & Engineering'))
            arch['subtitle'] = request.POST.get('arch_subtitle', arch.get('subtitle', 'Cantilevered Glass & Panoramic Vistas'))
            arch['quote'] = request.POST.get('arch_quote', arch.get('quote', ''))
            data['architecture'] = arch

            # S09: Chef
            chef = data.get('chef', {})
            chef['name'] = request.POST.get('chef_name', chef.get('name', 'Chef Julian Moreau'))
            chef['title'] = request.POST.get('chef_title', chef.get('title', 'Executive Chef & Culinary Director'))
            chef['bio'] = request.POST.get('chef_bio', chef.get('bio', ''))
            chef['quote'] = request.POST.get('chef_quote', chef.get('quote', ''))
            data['chef'] = chef

            # S10: Special Experiences
            spec = data.get('specialExperiences', {})
            spec['title'] = request.POST.get('spec_title', spec.get('title', 'Curated Horizon Celebrations'))
            spec['subtitle'] = request.POST.get('spec_subtitle', spec.get('subtitle', 'From Sunset Aperitivo to Stargazing Buyouts'))
            data['specialExperiences'] = spec

            # S11: Gallery
            gallery = data.get('gallery', {})
            gallery['title'] = request.POST.get('gal_title', gallery.get('title', 'Panoramic Visual Gallery'))
            gallery['subtitle'] = request.POST.get('gal_subtitle', gallery.get('subtitle', 'Moments Captured in the Clouds'))
            data['gallery'] = gallery

            # S12: Testimonials
            testimonials = data.get('testimonials', {})
            testimonials['title'] = request.POST.get('test_title', testimonials.get('title', 'Critical Acclaim & Guest Honors'))
            testimonials['subtitle'] = request.POST.get('test_subtitle', testimonials.get('subtitle', 'Global Hospitality Recognition'))
            data['testimonials'] = testimonials

            # S13: Reservation Info
            reservation_cfg = data.get('reservation', {})
            reservation_cfg['title'] = request.POST.get('res_title', reservation_cfg.get('title', 'Table Reservations'))
            reservation_cfg['subtitle'] = request.POST.get('res_subtitle', reservation_cfg.get('subtitle', 'Secure Your Place Above the City'))
            reservation_cfg['description'] = request.POST.get('res_desc', reservation_cfg.get('description', ''))
            reservation_cfg['policy'] = request.POST.get('res_policy', reservation_cfg.get('policy', ''))
            data['reservation'] = reservation_cfg

            # S14: Location & Arrival
            loc = data.get('location', {})
            loc['title'] = request.POST.get('loc_title', loc.get('title', 'Location, Arrival & Skyline Coordinates'))
            loc['subtitle'] = request.POST.get('loc_subtitle', loc.get('subtitle', 'Crown of Horizon Tower'))
            loc['address'] = request.POST.get('loc_address', loc.get('address', 'Level 54, Horizon Tower, 800 Skyline Boulevard'))
            loc['phone'] = request.POST.get('loc_phone', loc.get('phone', '+1 (555) 890-7599'))
            loc['email'] = request.POST.get('loc_email', loc.get('email', 'concierge@skyline-rooftop.com'))
            loc['hours'] = request.POST.get('loc_hours', loc.get('hours', 'Tue - Sun: 5:00 PM - 1:00 AM • Sunset Seating from 5:30 PM'))
            data['location'] = loc

            # Theme Settings
            theme = data.get('theme', {})
            colors = theme.get('colors', {})
            colors['midnight'] = request.POST.get('theme_midnight', colors.get('midnight', '#101C2C'))
            colors['skyline_blue'] = request.POST.get('theme_skyline_blue', colors.get('skyline_blue', '#263F5A'))
            colors['champagne'] = request.POST.get('theme_champagne', colors.get('champagne', '#D8C3A0'))
            colors['cloud_ivory'] = request.POST.get('theme_cloud_ivory', colors.get('cloud_ivory', '#F3F0E9'))
            colors['sunset_copper'] = request.POST.get('theme_sunset_copper', colors.get('sunset_copper', '#C47A56'))
            colors['twilight_slate'] = request.POST.get('theme_twilight_slate', colors.get('twilight_slate', '#64788A'))
            colors['deep_charcoal'] = request.POST.get('theme_deep_charcoal', colors.get('deep_charcoal', '#171C22'))
            colors['warm_amber'] = request.POST.get('theme_warm_amber', colors.get('warm_amber', '#E7A75B'))
            theme['colors'] = colors
            data['theme'] = theme

            config.content_json = data
            config.restaurant_name = hero['restaurant_name']
            config.updated_by = request.user
            config.save()
            messages.success(request, "Skyline sections updated and published instantly to public site!")

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
