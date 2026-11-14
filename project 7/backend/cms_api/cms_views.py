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
            messages.success(request, f"Bienvenue, {user.username}. Access to Parisian CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_dashboard'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Accès Refusé: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of the Parisian CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_dashboard_view(request):
    config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="L'ÉTOILE ROYALE",
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
                messages.success(request, "Parisian CMS configuration saved & published to public API successfully!")
            except json.JSONDecodeError as e:
                messages.error(request, f"Invalid JSON format: {str(e)}")

        elif action == 'save_form_sections':
            data = config.content_json if isinstance(config.content_json, dict) else {}

            # 1. Brand / Hero
            hero = data.get('hero', {})
            hero['restaurant_name'] = request.POST.get('hero_name', hero.get('restaurant_name', "L'ÉTOILE ROYALE"))
            hero['tagline'] = request.POST.get('hero_tagline', hero.get('tagline', 'Salon Gastronomique & Bar à Champagne'))
            hero['lead_description'] = request.POST.get('hero_desc', hero.get('lead_description', ''))
            hero['cta_primary_text'] = request.POST.get('hero_cta_primary', hero.get('cta_primary_text', 'Réserver une Table'))
            hero['cta_secondary_text'] = request.POST.get('hero_cta_secondary', hero.get('cta_secondary_text', 'Explorer la Carte'))
            hero['badge_text'] = request.POST.get('hero_badge', hero.get('badge_text', 'Étoilé Michelin 2026'))
            data['hero'] = hero

            # 2. Heritage
            heritage = data.get('heritage', {})
            heritage['title'] = request.POST.get('heritage_title', heritage.get('title', 'L\'Art de Vivre'))
            heritage['subtitle'] = request.POST.get('heritage_subtitle', heritage.get('subtitle', 'Notre Héritage'))
            heritage['body_paragraph_1'] = request.POST.get('heritage_p1', heritage.get('body_paragraph_1', ''))
            heritage['body_paragraph_2'] = request.POST.get('heritage_p2', heritage.get('body_paragraph_2', ''))
            data['heritage'] = heritage

            # 3. Chef
            chef = data.get('chef', {})
            chef['name'] = request.POST.get('chef_name', chef.get('name', 'Chef Alexandre de Morbihan'))
            chef['title'] = request.POST.get('chef_title', chef.get('title', 'Chef Exécutif & Maître Cuisinier de France'))
            chef['bio'] = request.POST.get('chef_bio', chef.get('bio', ''))
            chef['quote'] = request.POST.get('chef_quote', chef.get('quote', ''))
            data['chef'] = chef

            # 4. Location & Contact
            loc = data.get('location', {})
            loc['address'] = request.POST.get('loc_address', loc.get('address', '18 Place Vendôme, 75001 Paris, France'))
            loc['phone'] = request.POST.get('loc_phone', loc.get('phone', '+33 1 42 68 55 00'))
            loc['email'] = request.POST.get('loc_email', loc.get('email', 'reservations@letoileroyale-paris.fr'))
            loc['hours'] = request.POST.get('loc_hours', loc.get('hours', 'Mardi au Samedi: 19h00 - 23h30'))
            data['location'] = loc

            # 5. Theme Settings
            theme = data.get('theme', {})
            theme['primary_color'] = request.POST.get('theme_primary', theme.get('primary_color', '#54252F'))
            theme['accent_color'] = request.POST.get('theme_accent', theme.get('accent_color', '#C5A46D'))
            theme['bg_color'] = request.POST.get('theme_bg', theme.get('bg_color', '#202124'))
            theme['text_color'] = request.POST.get('theme_text', theme.get('text_color', '#F5F0E7'))
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
