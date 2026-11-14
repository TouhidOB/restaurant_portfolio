import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import SiteConfig, MenuCategory, MenuItem, Reservation

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
            messages.success(request, f"Welcome, {user.username}. Access to Bengali Heritage CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_dashboard'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Access Denied: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of the Bengali Heritage CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_dashboard_view(request):
    config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="BENGAL HERITAGE DINING",
            content_json={},
            theme_json={},
            default_language="en",
            supported_languages=["en", "bn"],
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
                    name_val = parsed_json['hero']['restaurant_name']
                    if isinstance(name_val, dict):
                        config.restaurant_name = name_val.get('en', 'BENGAL HERITAGE DINING')
                    else:
                        config.restaurant_name = str(name_val)
                config.updated_by = request.user
                config.save()
                messages.success(request, "Bengali Heritage JSON configuration saved & published successfully!")
            except json.JSONDecodeError as e:
                messages.error(request, f"Invalid JSON format: {str(e)}")

        elif action == 'save_form_sections':
            data = config.content_json if isinstance(config.content_json, dict) else {}

            # General & Hero
            hero = data.get('hero', {})
            name_en = request.POST.get('hero_name_en', 'BENGAL HERITAGE DINING')
            name_bn = request.POST.get('hero_name_bn', 'বাংলার ঐতিহ্য ডাইনিং')
            hero['restaurant_name'] = {'en': name_en, 'bn': name_bn}

            hero['eyebrow'] = {
                'en': request.POST.get('hero_eyebrow_en', 'A TASTE OF BENGAL'),
                'bn': request.POST.get('hero_eyebrow_bn', 'বাংলার স্বাদের গল্প')
            }
            hero['title'] = {
                'en': request.POST.get('hero_title_en', 'Where Heritage Meets the Art of Dining.'),
                'bn': request.POST.get('hero_title_bn', 'ঐতিহ্যের ছোঁয়ায় আধুনিক ভোজনের অভিজ্ঞতা।')
            }
            hero['tagline'] = {
                'en': request.POST.get('hero_tagline_en', 'Traditional Bengal Reinterpreted Through Contemporary Luxury'),
                'bn': request.POST.get('hero_tagline_bn', 'ঐতিহ্যবাহী বাংলার স্বাদ ও সমকালীন আভিজাত্য')
            }
            hero['lead_description'] = {
                'en': request.POST.get('hero_desc_en', 'Discover the flavors, stories, and warmth of Bengali hospitality in a contemporary dining experience.'),
                'bn': request.POST.get('hero_desc_bn', 'বাঙালির স্বাদ, ঐতিহ্য ও আন্তরিক আতিথেয়তার এক অনন্য অভিজ্ঞতা।')
            }
            hero['cta_primary_text'] = {
                'en': request.POST.get('hero_cta_primary_en', 'Explore Our Menu'),
                'bn': request.POST.get('hero_cta_primary_bn', 'মেনু দেখুন')
            }
            hero['cta_secondary_text'] = {
                'en': request.POST.get('hero_cta_secondary_en', 'Discover Our Story'),
                'bn': request.POST.get('hero_cta_secondary_bn', 'আমাদের গল্প')
            }
            data['hero'] = hero

            # S03: Brand Story
            story = data.get('brandStory', {})
            story['subtitle'] = {
                'en': request.POST.get('story_subtitle_en', 'Our Heritage, Our Story'),
                'bn': request.POST.get('story_subtitle_bn', 'আমাদের ঐতিহ্য ও গল্প')
            }
            story['title'] = {
                'en': request.POST.get('story_title_en', 'Centuries of Culinary Artistry in Every Dish'),
                'bn': request.POST.get('story_title_bn', 'প্রতিটি পদে শতবর্ষের ঐতিহ্যবাহী রন্ধনশিল্প')
            }
            story['body_paragraph_1'] = {
                'en': request.POST.get('story_p1_en', ''),
                'bn': request.POST.get('story_p1_bn', '')
            }
            story['body_paragraph_2'] = {
                'en': request.POST.get('story_p2_en', ''),
                'bn': request.POST.get('story_p2_bn', '')
            }
            story['quote'] = {
                'en': request.POST.get('story_quote_en', ''),
                'bn': request.POST.get('story_quote_bn', '')
            }
            story['quote_author'] = {
                'en': request.POST.get('story_quote_author_en', ''),
                'bn': request.POST.get('story_quote_author_bn', '')
            }
            data['brandStory'] = story

            # S04: 3D Tour
            tour = data.get('virtualTour', {})
            tour['subtitle'] = {
                'en': request.POST.get('tour_subtitle_en', 'Explore The Five Spaces'),
                'bn': request.POST.get('tour_subtitle_bn', 'পাঁচটি নান্দনিক স্পেস অন্বেষণ করুন')
            }
            tour['title'] = {
                'en': request.POST.get('tour_title_en', 'Interactive Heritage Virtual Tour'),
                'bn': request.POST.get('tour_title_bn', 'ইন্টারেক্টিভ রেস্তোরাঁ ভার্চুয়াল ট্যুর')
            }
            tour['description'] = {
                'en': request.POST.get('tour_desc_en', ''),
                'bn': request.POST.get('tour_desc_bn', '')
            }
            data['virtualTour'] = tour

            # S05: Dining Philosophy
            phil = data.get('diningPhilosophy', {})
            phil['subtitle'] = {
                'en': request.POST.get('phil_subtitle_en', 'The Bengali Dining Philosophy'),
                'bn': request.POST.get('phil_subtitle_bn', 'বাঙালি ভোজন দর্শন')
            }
            phil['title'] = {
                'en': request.POST.get('phil_title_en', 'Respect for Terroir, Patience & Warmth'),
                'bn': request.POST.get('phil_title_bn', 'মাটি, মমতা ও আতিথেয়তার মেলবন্ধন')
            }
            data['diningPhilosophy'] = phil

            # S06: Signature Dishes
            sig = data.get('signatureDishes', {})
            sig['subtitle'] = {
                'en': request.POST.get('sig_subtitle_en', 'Artisan Recipes of Bengal'),
                'bn': request.POST.get('sig_subtitle_bn', 'বাংলার স্বাক্ষর রন্ধনশিল্প')
            }
            sig['title'] = {
                'en': request.POST.get('sig_title_en', 'Signature Bengali Culinary Offerings'),
                'bn': request.POST.get('sig_title_bn', 'স্বাক্ষর বাঙালি খাবারের সমাহার')
            }
            data['signatureDishes'] = sig

            # S07: Menu Explorer
            menu = data.get('menuExplorer', {})
            menu['subtitle'] = {
                'en': request.POST.get('menu_subtitle_en', 'Complete Bilingual Menu Explorer'),
                'bn': request.POST.get('menu_subtitle_bn', 'দ্বিভাষিক মেনু এক্সপ্লোরার')
            }
            menu['title'] = {
                'en': request.POST.get('menu_title_en', 'Flavors of Bengal'),
                'bn': request.POST.get('menu_title_bn', 'বাংলার খাঁটি স্বাদ')
            }
            data['menuExplorer'] = menu

            # S08: Architecture
            arch = data.get('architecture', {})
            arch['subtitle'] = {
                'en': request.POST.get('arch_subtitle_en', 'Terracotta, Teak & Jamdani'),
                'bn': request.POST.get('arch_subtitle_bn', 'টেরাকোটা, সেগুন ও জামদানির বুনন')
            }
            arch['title'] = {
                'en': request.POST.get('arch_title_en', 'Architecture, Materials & Craftsmanship'),
                'bn': request.POST.get('arch_title_bn', 'স্থাপত্যশৈলী ও ঐতিহ্যবাহী কারুকাজ')
            }
            arch['quote'] = {
                'en': request.POST.get('arch_quote_en', ''),
                'bn': request.POST.get('arch_quote_bn', '')
            }
            data['architecture'] = arch

            # S09: Chef
            chef = data.get('chef', {})
            chef['name'] = {
                'en': request.POST.get('chef_name_en', 'Master Chef Ananya Sen'),
                'bn': request.POST.get('chef_name_bn', 'মাস্টার শেফ অনন্যা সেন')
            }
            chef['title'] = {
                'en': request.POST.get('chef_title_en', 'Culinary Director & Heritage Archivist'),
                'bn': request.POST.get('chef_title_bn', 'রন্ধন পরিচালক ও খাদ্য ঐতিহ্যবিদ')
            }
            chef['bio'] = {
                'en': request.POST.get('chef_bio_en', ''),
                'bn': request.POST.get('chef_bio_bn', '')
            }
            chef['quote'] = {
                'en': request.POST.get('chef_quote_en', ''),
                'bn': request.POST.get('chef_quote_bn', '')
            }
            data['chef'] = chef

            # S10: Cultural Experiences
            exp = data.get('culturalExperiences', {})
            exp['subtitle'] = {
                'en': request.POST.get('exp_subtitle_en', 'Special Dining Occasions'),
                'bn': request.POST.get('exp_subtitle_bn', 'বিশেষ ভোজন ও সাংস্কৃতিক উৎসব')
            }
            exp['title'] = {
                'en': request.POST.get('exp_title_en', 'Cultural Dining & Special Experiences'),
                'bn': request.POST.get('exp_title_bn', 'ঐতিহ্যবাহী ভোজন ও উৎসবের আয়োজন')
            }
            data['culturalExperiences'] = exp

            # S11: Gallery
            gallery = data.get('gallery', {})
            gallery['subtitle'] = {
                'en': request.POST.get('gal_subtitle_en', 'Visual Archives'),
                'bn': request.POST.get('gal_subtitle_bn', 'দৃশ্যপট ও পরিবেশ')
            }
            gallery['title'] = {
                'en': request.POST.get('gal_title_en', 'Food, Craft & Atmosphere Gallery'),
                'bn': request.POST.get('gal_title_bn', 'খাবার, কারুকাজ ও রূপময় আবহ')
            }
            data['gallery'] = gallery

            # S12: Testimonials
            testimonials = data.get('testimonials', {})
            testimonials['subtitle'] = {
                'en': request.POST.get('test_subtitle_en', 'Guest Stories & Reviews'),
                'bn': request.POST.get('test_subtitle_bn', 'অতিথিদের অভিজ্ঞতা ও সম্মাননা')
            }
            testimonials['title'] = {
                'en': request.POST.get('test_title_en', 'What Our Diners Say'),
                'bn': request.POST.get('test_title_bn', 'অতিথিদের মূল্যায়ন')
            }
            data['testimonials'] = testimonials

            # S13: Reservation Info
            res_cfg = data.get('reservation', {})
            res_cfg['subtitle'] = {
                'en': request.POST.get('res_subtitle_en', 'Reserve Your Table'),
                'bn': request.POST.get('res_subtitle_bn', 'টেবিল বুকিং করুন')
            }
            res_cfg['title'] = {
                'en': request.POST.get('res_title_en', 'Table Reservation Inquiry'),
                'bn': request.POST.get('res_title_bn', 'টেবিল সংরক্ষণ ও অনুসন্ধান')
            }
            res_cfg['description'] = {
                'en': request.POST.get('res_desc_en', ''),
                'bn': request.POST.get('res_desc_bn', '')
            }
            res_cfg['policy'] = {
                'en': request.POST.get('res_policy_en', ''),
                'bn': request.POST.get('res_policy_bn', '')
            }
            data['reservation'] = res_cfg

            # S14: Location
            loc = data.get('location', {})
            loc['subtitle'] = {
                'en': request.POST.get('loc_subtitle_en', 'Heritage Quarter & Coordinates'),
                'bn': request.POST.get('loc_subtitle_bn', 'ঐতিহাসিক প্রান্ত ও অবস্থান')
            }
            loc['title'] = {
                'en': request.POST.get('loc_title_en', 'Location, Hours & Directions'),
                'bn': request.POST.get('loc_title_bn', 'ঠিকানা, সময়সূচি ও পথনির্দেশ')
            }
            loc['address'] = {
                'en': request.POST.get('loc_address_en', 'House 14, Road 71, Gulshan Heritage Enclave, Dhaka'),
                'bn': request.POST.get('loc_address_bn', 'বাড়ি ১৪, রোড ৭১, গুলশান হেরিটেজ এনক্লেভ, ঢাকা')
            }
            loc['phone'] = request.POST.get('loc_phone', '+880 1711-234567')
            loc['whatsapp'] = request.POST.get('loc_whatsapp', '+880 1711-234567')
            loc['email'] = request.POST.get('loc_email', 'hospitality@bengalheritage.com')
            loc['hours'] = {
                'en': request.POST.get('loc_hours_en', 'Daily: 12:00 PM – 11:30 PM (Lunch & Heritage Dinner)'),
                'bn': request.POST.get('loc_hours_bn', 'প্রতিদিন: দুপুর ১২:০০ – রাত ১১:৩০ (মধ্যাহ্নভোজ ও সান্ধ্যভোজ)')
            }
            data['location'] = loc

            # Theme Colors
            theme = data.get('theme', {})
            colors = theme.get('colors', {})
            colors['terracotta'] = request.POST.get('theme_terracotta', '#A6533B')
            colors['indigo'] = request.POST.get('theme_indigo', '#26344A')
            colors['ivory'] = request.POST.get('theme_ivory', '#F4EBDD')
            colors['brass'] = request.POST.get('theme_brass', '#B18A54')
            colors['jute'] = request.POST.get('theme_jute', '#C8B18D')
            colors['leaf'] = request.POST.get('theme_leaf', '#536B50')
            colors['charcoal'] = request.POST.get('theme_charcoal', '#242321')
            colors['river_mist'] = request.POST.get('theme_river_mist', '#AEBCC0')
            theme['colors'] = colors
            data['theme'] = theme

            config.content_json = data
            config.restaurant_name = name_en
            config.default_language = request.POST.get('default_language', 'en')
            config.updated_by = request.user
            config.save()
            messages.success(request, "Bengali Heritage section fields updated and published instantly!")

        return redirect('cms_dashboard')

    reservations = Reservation.objects.all().order_by('-created_at')
    categories = MenuCategory.objects.all().order_by('sort_order')
    menu_items = MenuItem.objects.all().order_by('sort_order')
    pretty_json = json.dumps(config.content_json, indent=2, ensure_ascii=False)

    return render(request, 'cms/dashboard.html', {
        'config': config,
        'pretty_json': pretty_json,
        'reservations': reservations,
        'categories': categories,
        'menu_items': menu_items,
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
