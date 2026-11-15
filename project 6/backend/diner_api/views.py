import json
import datetime
from django.utils import timezone
from django.db.models import Q
from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.utils.text import slugify
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Restaurant,
    BrandSettings,
    WebsiteSection,
    MenuCategory,
    MenuItem,
    VirtualTourViewpoint,
    PhilosophyPillar,
    DinerStoryStage,
    DinerExperiencePanel,
    GalleryImage,
    Testimonial,
    Reservation,
    FAQ,
    ContactInquiry,
    CustomPage,
    BlogCategory,
    BlogPost,
)
from .serializers import (
    RestaurantSerializer,
    BrandSettingsSerializer,
    WebsiteSectionSerializer,
    MenuCategorySerializer,
    MenuItemSerializer,
    VirtualTourViewpointSerializer,
    PhilosophyPillarSerializer,
    DinerStoryStageSerializer,
    DinerExperiencePanelSerializer,
    GalleryImageSerializer,
    TestimonialSerializer,
    ReservationSerializer,
    FAQSerializer,
    ContactInquirySerializer,
    CustomPageSerializer,
    CustomPageNavSerializer,
    BlogCategorySerializer,
    BlogPostSerializer,
)

# ==============================================================================
# REST API ENDPOINTS
# ==============================================================================

class FullDinerContentView(APIView):
    """
    Returns the comprehensive aggregated content required by the React frontend.
    """
    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.first()
        brand_settings = BrandSettings.objects.first()
        sections = WebsiteSection.objects.filter(is_visible=True)
        categories = MenuCategory.objects.filter(is_active=True).prefetch_related('items')
        featured_dishes = MenuItem.objects.filter(is_featured=True, is_available=True)
        viewpoints = VirtualTourViewpoint.objects.filter(is_active=True)
        pillars = PhilosophyPillar.objects.all()
        story_stages = DinerStoryStage.objects.all()
        dining_panels = DinerExperiencePanel.objects.all()
        gallery = GalleryImage.objects.filter(is_active=True)
        testimonials = Testimonial.objects.filter(is_approved=True)
        faqs = FAQ.objects.filter(is_active=True)
        custom_pages = CustomPage.objects.filter(is_published=True)
        blog_posts = BlogPost.objects.filter(is_published=True)
        blog_categories = BlogCategory.objects.all()

        sections_dict = {}
        for s in sections:
            sections_dict[s.section_key] = {
                'eyebrow': s.eyebrow,
                'title': s.title,
                'subtitle': s.subtitle,
                'custom_content': s.custom_content,
            }

        data = {
            'restaurant': RestaurantSerializer(restaurant, context={'request': request}).data if restaurant else None,
            'brand_settings': BrandSettingsSerializer(brand_settings).data if brand_settings else None,
            'sections': sections_dict,
            'categories': MenuCategorySerializer(categories, many=True, context={'request': request}).data,
            'featured_dishes': MenuItemSerializer(featured_dishes, many=True, context={'request': request}).data,
            'signature_dishes': MenuItemSerializer(featured_dishes, many=True, context={'request': request}).data,
            'viewpoints': VirtualTourViewpointSerializer(viewpoints, many=True).data,
            'pillars': PhilosophyPillarSerializer(pillars, many=True).data,
            'story_stages': DinerStoryStageSerializer(story_stages, many=True).data,
            'dining_panels': DinerExperiencePanelSerializer(dining_panels, many=True).data,
            'gallery': GalleryImageSerializer(gallery, many=True, context={'request': request}).data,
            'testimonials': TestimonialSerializer(testimonials, many=True).data,
            'faqs': FAQSerializer(faqs, many=True).data,
            'custom_pages': CustomPageSerializer(custom_pages, many=True).data,
            'blog_posts': BlogPostSerializer(blog_posts, many=True, context={'request': request}).data,
            'blog_categories': BlogCategorySerializer(blog_categories, many=True).data,
        }
        return Response(data)


class CustomPageListView(generics.ListAPIView):
    """
    Returns published custom pages created via the Elementor-style CMS Page Builder.
    """
    queryset = CustomPage.objects.filter(is_published=True)
    serializer_class = CustomPageSerializer


class CustomPageDetailView(generics.RetrieveAPIView):
    """
    Returns full block data for a specific standalone custom page by slug.
    """
    queryset = CustomPage.objects.filter(is_published=True)
    serializer_class = CustomPageSerializer
    lookup_field = 'slug'


class BlogPostListView(generics.ListAPIView):
    """
    Public endpoint for published blog articles with category and search filtering.
    """
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        qs = BlogPost.objects.filter(is_published=True).select_related('category')
        category_slug = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        featured = self.request.query_params.get('featured')

        if category_slug and category_slug != 'all':
            qs = qs.filter(category__slug=category_slug)
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(excerpt__icontains=search) |
                Q(content__icontains=search)
            )
        if featured == 'true':
            qs = qs.filter(is_featured=True)
        return qs


class BlogPostDetailView(generics.RetrieveAPIView):
    """
    Public endpoint for individual blog article detail by slug with related posts.
    """
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    queryset = BlogPost.objects.filter(is_published=True).select_related('category')

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = dict(serializer.data)

        # Related posts from the same category or latest
        related = BlogPost.objects.filter(is_published=True).exclude(pk=instance.pk).select_related('category')
        if instance.category:
            cat_related = related.filter(category=instance.category)
            if cat_related.exists():
                related = cat_related
        data['related_posts'] = BlogPostSerializer(related[:3], many=True, context={'request': request}).data
        return Response(data)


class ReservationCreateView(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.save()
        return Response(
            {
                'success': True,
                'status': 'success',
                'message': 'Your table reservation request has been submitted and is currently pending restaurant approval.',
                'reference_code': reservation.reference_code,
                'guest_name': reservation.full_name,
                'reservation_date': str(reservation.reservation_date),
                'reservation_time': reservation.reservation_time,
                'party_size': reservation.guest_count,
                'email': reservation.email,
                'phone': reservation.phone,
                'seating_area': reservation.seating_area,
                'occasion': reservation.occasion,
                'occasion_display': reservation.get_occasion_display(),
                'dietary_notes': reservation.dietary_notes,
                'booking_status': reservation.status,
                'booking_status_display': reservation.get_status_display(),
            },
            status=status.HTTP_201_CREATED
        )


class ReservationLookupView(APIView):
    """
    Guest lookup endpoint to retrieve a reservation by reference code or email.
    """
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        code = request.query_params.get('code', '').strip()
        email = request.query_params.get('email', '').strip()

        if not code and not email:
            return Response(
                {'success': False, 'error': 'Please provide a reservation reference code or email address.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        reservations = Reservation.objects.none()
        if code:
            reservations = Reservation.objects.filter(reference_code__iexact=code)
        elif email:
            reservations = Reservation.objects.filter(email__iexact=email).order_by('-reservation_date')

        if not reservations.exists():
            return Response(
                {'success': False, 'error': f'No reservation found for query "{code or email}".'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ReservationSerializer(reservations, many=True)
        return Response({
            'success': True,
            'count': reservations.count(),
            'reservations': serializer.data
        })


class ReservationAvailabilityView(APIView):
    """
    Returns shift schedules, active dining zones, and time slots for table reservation.
    """
    authentication_classes = []
    permission_classes = []
    def get(self, request):
        date_str = request.query_params.get('date', timezone.now().strftime('%Y-%m-%d'))
        lunch_slots = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30']
        dinner_slots = ['17:30', '18:00', '18:30', '19:15', '20:00', '20:45', '21:30', '22:15']
        seating_zones = [
            {'id': 'Retro Leather Booth', 'name': 'Retro Leather Booth (Cozy vinyl booth with neon ambient lighting)'},
            {'id': 'Starlight Dining Table', 'name': 'Starlight Dining Table (Center dining room with mid-century chrome fixtures)'},
            {'id': 'Chrome Counter Stools', 'name': 'Chrome Counter Stools (Direct view of open griddle and shake counter)'},
            {'id': 'VIP Galactic Salon', 'name': 'VIP Galactic Salon (Semi-private retro-futuristic vault for 6+ guests)'},
        ]
        occasions = [
            {'id': 'casual', 'name': 'Casual Dining'},
            {'id': 'birthday', 'name': 'Birthday Celebration 🎉'},
            {'id': 'anniversary', 'name': 'Anniversary 🥂'},
            {'id': 'date', 'name': 'Romantic Date ❤️'},
            {'id': 'business', 'name': 'Business Dinner 💼'},
            {'id': 'celebration', 'name': 'Special Celebration ✨'},
        ]

        return Response({
            'success': True,
            'date': date_str,
            'lunch_slots': lunch_slots,
            'dinner_slots': dinner_slots,
            'seating_zones': seating_zones,
            'occasions': occasions,
        })


class ContactCreateView(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()
        return Response(
            {
                'success': True,
                'message': 'Your inquiry has been received by Stardust Diner concierge.',
                'id': inquiry.id,
            },
            status=status.HTTP_201_CREATED
        )


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer


class VirtualTourViewpointViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VirtualTourViewpoint.objects.filter(is_active=True)
    serializer_class = VirtualTourViewpointSerializer


# ==============================================================================
# DECOUPLED DJANGO CMS STUDIO VIEWS (/cms/)
# ==============================================================================

def cms_login_view(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('cms_dashboard')
    
    error = None
    if request.method == 'POST':
        u = request.POST.get('username')
        p = request.POST.get('password')
        user = authenticate(request, username=u, password=p)
        if user and user.is_staff:
            login(request, user)
            return redirect('cms_dashboard')
        else:
            error = "Invalid retro studio credentials. Please check username or password."
    return render(request, 'cms/login.html', {'error': error})


def cms_logout_view(request):
    logout(request)
    return redirect('cms_login')


def get_cms_kpis():
    all_reservations = Reservation.objects.all()
    all_res_list = list(all_reservations)
    today = timezone.localdate()
    today_reservations = all_reservations.filter(reservation_date=today)
    today_covers = sum(r.guest_count for r in today_reservations.filter(status__in=['confirmed', 'seated', 'completed']))

    return {
        'total_reservations': all_reservations.count(),
        'pending_reservations': all_reservations.filter(status='pending').count(),
        'confirmed_reservations': all_reservations.filter(status='confirmed').count(),
        'seated_reservations': all_reservations.filter(status='seated').count(),
        'lunch_reservations': sum(1 for r in all_res_list if not r.is_dinner_shift),
        'dinner_reservations': sum(1 for r in all_res_list if r.is_dinner_shift),
        'today_reservations_count': today_reservations.count(),
        'today_covers': today_covers,
        'total_menu_items': MenuItem.objects.count(),
        'active_menu_items': MenuItem.objects.filter(is_available=True).count(),
        'total_categories': MenuCategory.objects.count(),
        'total_viewpoints': VirtualTourViewpoint.objects.count(),
        'gallery_count': GalleryImage.objects.count(),
        'testimonials_count': Testimonial.objects.count(),
        'inquiries_count': ContactInquiry.objects.count(),
        'total_custom_pages': CustomPage.objects.count(),
        'published_custom_pages': CustomPage.objects.filter(is_published=True).count(),
    }


def get_master_json_string():
    restaurant = Restaurant.objects.first()
    brand_settings = BrandSettings.objects.first()
    sections = WebsiteSection.objects.all()
    categories = MenuCategory.objects.all().prefetch_related('items')
    viewpoints = VirtualTourViewpoint.objects.all()
    custom_pages = CustomPage.objects.all().order_by('nav_order', '-created_at')

    full_content_data = {
        'restaurant': RestaurantSerializer(restaurant).data if restaurant else {},
        'brand_settings': BrandSettingsSerializer(brand_settings).data if brand_settings else {},
        'sections': {s.section_key: {'eyebrow': s.eyebrow, 'title': s.title, 'subtitle': s.subtitle, 'custom_content': s.custom_content} for s in sections},
        'categories': MenuCategorySerializer(categories, many=True).data,
        'viewpoints': VirtualTourViewpointSerializer(viewpoints, many=True).data,
        'custom_pages': CustomPageNavSerializer(custom_pages, many=True).data,
    }
    return json.dumps(full_content_data, indent=2)


# =====================================================================
# DEDICATED CMS PAGES (ONE DEDICATED PAGE PER SIDEBAR ITEM)
# =====================================================================

@login_required(login_url='/cms/login/')
def cms_overview_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    kpis = get_cms_kpis()
    recent_reservations = Reservation.objects.all().order_by('-created_at')[:8]
    recent_inquiries = ContactInquiry.objects.all().order_by('-created_at')[:4]
    recent_pages = CustomPage.objects.all().order_by('-created_at')[:4]

    context = {
        'active_page': 'overview',
        'kpis': kpis,
        'recent_reservations': recent_reservations,
        'recent_inquiries': recent_inquiries,
        'recent_pages': recent_pages,
    }
    return render(request, 'cms/overview.html', context)


@login_required(login_url='/cms/login/')
def cms_dashboard_view(request):
    return cms_overview_view(request)


@login_required(login_url='/cms/login/')
def cms_pages_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    custom_pages = CustomPage.objects.all().order_by('nav_order', '-created_at')
    context = {
        'active_page': 'pages',
        'kpis': get_cms_kpis(),
        'custom_pages': custom_pages,
    }
    return render(request, 'cms/pages.html', context)


@login_required(login_url='/cms/login/')
def cms_identity_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    restaurant = Restaurant.objects.first()
    brand_settings = BrandSettings.objects.first()
    context = {
        'active_page': 'identity',
        'kpis': get_cms_kpis(),
        'restaurant': restaurant,
        'brand_settings': brand_settings,
    }
    return render(request, 'cms/identity.html', context)


@login_required(login_url='/cms/login/')
def cms_reservations_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    all_reservations = Reservation.objects.all().order_by('-reservation_date', 'reservation_time', '-created_at')
    today = timezone.localdate()
    tomorrow = today + datetime.timedelta(days=1)
    res_filter = request.GET.get('res_filter', 'all').lower()
    shift_param = request.GET.get('shift', request.GET.get('shift_filter', '')).lower()
    res_search = request.GET.get('res_search', '').strip()

    if res_filter in ['lunch', 'dinner']:
        active_shift = res_filter
        res_filter = 'all'
    elif shift_param in ['lunch', 'dinner']:
        active_shift = shift_param
    else:
        active_shift = 'all'

    filtered_reservations = all_reservations

    # 1. Apply Shift Filter
    if active_shift == 'lunch':
        lunch_ids = [r.id for r in filtered_reservations if not r.is_dinner_shift]
        filtered_reservations = filtered_reservations.filter(id__in=lunch_ids)
    elif active_shift == 'dinner':
        dinner_ids = [r.id for r in filtered_reservations if r.is_dinner_shift]
        filtered_reservations = filtered_reservations.filter(id__in=dinner_ids)

    # 2. Apply Status / Date Filter
    if res_filter == 'today':
        filtered_reservations = filtered_reservations.filter(reservation_date=today)
    elif res_filter == 'tomorrow':
        filtered_reservations = filtered_reservations.filter(reservation_date=tomorrow)
    elif res_filter == 'pending':
        filtered_reservations = filtered_reservations.filter(status='pending')
    elif res_filter == 'confirmed':
        filtered_reservations = filtered_reservations.filter(status='confirmed')
    elif res_filter == 'seated':
        filtered_reservations = filtered_reservations.filter(status='seated')

    # 3. Apply Search Filter
    if res_search:
        search_q = (
            Q(reference_code__icontains=res_search) |
            Q(full_name__icontains=res_search) |
            Q(phone__icontains=res_search) |
            Q(email__icontains=res_search) |
            Q(table_number__icontains=res_search) |
            Q(seating_area__icontains=res_search)
        )
        filtered_reservations = filtered_reservations.filter(search_q)

    context = {
        'active_page': 'reservations',
        'kpis': get_cms_kpis(),
        'reservations': filtered_reservations,
        'all_reservations_count': all_reservations.count(),
        'res_filter': res_filter,
        'active_shift': active_shift,
        'shift_filter': active_shift,
        'res_search': res_search,
    }
    return render(request, 'cms/reservations.html', context)


@login_required(login_url='/cms/login/')
def cms_menu_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    categories = MenuCategory.objects.all().prefetch_related('items')
    context = {
        'active_page': 'menu',
        'kpis': get_cms_kpis(),
        'categories': categories,
    }
    return render(request, 'cms/menu.html', context)


@login_required(login_url='/cms/login/')
def cms_tour_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    viewpoints = VirtualTourViewpoint.objects.all()
    context = {
        'active_page': 'tour',
        'kpis': get_cms_kpis(),
        'viewpoints': viewpoints,
    }
    return render(request, 'cms/tour.html', context)


@login_required(login_url='/cms/login/')
def cms_sections_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    sections = WebsiteSection.objects.all()
    context = {
        'active_page': 'sections',
        'kpis': get_cms_kpis(),
        'sections': sections,
    }
    return render(request, 'cms/sections.html', context)


@login_required(login_url='/cms/login/')
def cms_gallery_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    gallery_images = GalleryImage.objects.all()
    context = {
        'active_page': 'gallery',
        'kpis': get_cms_kpis(),
        'gallery_images': gallery_images,
    }
    return render(request, 'cms/gallery.html', context)


@login_required(login_url='/cms/login/')
def cms_reviews_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    testimonials = Testimonial.objects.all()
    context = {
        'active_page': 'reviews',
        'kpis': get_cms_kpis(),
        'testimonials': testimonials,
    }
    return render(request, 'cms/reviews.html', context)


@login_required(login_url='/cms/login/')
def cms_faqs_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    faqs = FAQ.objects.all()
    context = {
        'active_page': 'faqs',
        'kpis': get_cms_kpis(),
        'faqs': faqs,
    }
    return render(request, 'cms/faqs.html', context)


@login_required(login_url='/cms/login/')
def cms_schema_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    context = {
        'active_page': 'schema',
        'kpis': get_cms_kpis(),
        'master_json_str': get_master_json_string(),
    }
    return render(request, 'cms/schema.html', context)


# =====================================================================
# CMS ACTION HANDLERS (REDIRECT BACK TO DEDICATED PAGES)
# =====================================================================

@login_required(login_url='/cms/login/')
def cms_update_settings(request):
    if request.method == 'POST':
        restaurant = Restaurant.objects.first()
        if restaurant:
            restaurant.name = request.POST.get('name', restaurant.name)
            restaurant.tagline = request.POST.get('tagline', restaurant.tagline)
            restaurant.phone = request.POST.get('phone', restaurant.phone)
            restaurant.email = request.POST.get('email', restaurant.email)
            restaurant.address = request.POST.get('address', restaurant.address)
            restaurant.city = request.POST.get('city', restaurant.city)
            restaurant.opening_hours_summary = request.POST.get('opening_hours_summary', restaurant.opening_hours_summary)
            restaurant.coordinates_display = request.POST.get('coordinates_display', restaurant.coordinates_display)
            restaurant.save()
            messages.success(request, "Diner settings updated successfully!")
    return redirect('cms_identity')


@login_required(login_url='/cms/login/')
def cms_update_reservation_status(request, pk):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, pk=pk)
        new_status = request.POST.get('status')
        if new_status in dict(Reservation.STATUS_CHOICES):
            res.status = new_status
        if 'table_number' in request.POST:
            res.table_number = request.POST.get('table_number', '').strip()
        if 'admin_notes' in request.POST:
            res.admin_notes = request.POST.get('admin_notes', res.admin_notes)
        res.save()
        messages.success(
            request,
            f"Reservation {res.reference_code} updated: [{res.get_status_display()}] Table: '{res.table_number or 'Unassigned'}'."
        )
    return redirect('cms_reservations')


@login_required(login_url='/cms/login/')
def cms_approve_reservation(request, pk):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, pk=pk)
        res.status = 'confirmed'
        assigned_table = request.POST.get('table_number', '').strip()
        if assigned_table:
            res.table_number = assigned_table
        elif not res.table_number:
            res.table_number = 'Booth 4'
        res.save()
        messages.success(
            request,
            f"🎉 APPROVED reservation #{res.reference_code} for {res.full_name}! Allocated table: '{res.table_number}'."
        )
    return redirect('cms_reservations')


@login_required(login_url='/cms/login/')
def cms_decline_reservation(request, pk):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, pk=pk)
        res.status = 'declined'
        reason = request.POST.get('admin_notes', '').strip()
        if reason:
            res.admin_notes = reason
        res.save()
        messages.warning(
            request,
            f"Declined reservation #{res.reference_code} for {res.full_name}."
        )
    return redirect('cms_reservations')


@login_required(login_url='/cms/login/')
def cms_toggle_menu_item(request, pk):
    item = get_object_or_404(MenuItem, pk=pk)
    item.is_available = not item.is_available
    item.save()
    messages.success(request, f"'{item.name}' availability toggled to {item.is_available}.")
    return redirect('cms_menu')


@login_required(login_url='/cms/login/')
def cms_add_menu_item(request):
    if request.method == 'POST':
        category_id = request.POST.get('category_id')
        name = request.POST.get('name', '').strip()
        price = request.POST.get('price', '0.00').strip()
        currency_symbol = request.POST.get('currency_symbol', '$').strip()
        short_desc = request.POST.get('short_description', '').strip()
        full_desc = request.POST.get('full_description', '').strip()
        image_url = request.POST.get('image_url', '').strip()
        allergens = request.POST.get('allergens', '').strip()
        dietary_str = request.POST.get('dietary_information', '').strip()
        is_featured = request.POST.get('is_featured') == 'on'

        dietary_info = [d.strip() for d in dietary_str.split(',') if d.strip()] if dietary_str else []

        category = get_object_or_404(MenuCategory, pk=category_id)
        base_slug = slugify(name)
        slug = base_slug
        count = 1
        while MenuItem.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{count}"
            count += 1

        item = MenuItem.objects.create(
            category=category,
            name=name,
            slug=slug,
            short_description=short_desc,
            full_description=full_desc,
            price=price,
            currency_symbol=currency_symbol,
            image_url=image_url,
            dietary_information=dietary_info,
            allergens=allergens,
            is_featured=is_featured,
            is_available=True,
            display_order=category.items.count() + 1
        )

        # Handle file upload if present
        if 'image' in request.FILES:
            item.image = request.FILES['image']
            item.save()

        messages.success(request, f"Meal item '{item.name}' added successfully to {category.name}!")
    return redirect('cms_menu')


@login_required(login_url='/cms/login/')
def cms_delete_menu_item(request, pk):
    if request.method == 'POST':
        item = get_object_or_404(MenuItem, pk=pk)
        name = item.name
        item.delete()
        messages.success(request, f"Meal item '{name}' deleted successfully.")
    return redirect('cms_menu')


@login_required(login_url='/cms/login/')
def cms_update_section(request, pk):
    if request.method == 'POST':
        section = get_object_or_404(WebsiteSection, pk=pk)
        section.eyebrow = request.POST.get('eyebrow', section.eyebrow)
        section.title = request.POST.get('title', section.title)
        section.subtitle = request.POST.get('subtitle', section.subtitle)
        section.save()
        messages.success(request, f"Section '{section.title}' updated successfully.")
    return redirect('cms_sections')


@login_required(login_url='/cms/login/')
def cms_save_master_json(request):
    if request.method == 'POST':
        raw_json = request.POST.get('master_json', '')
        try:
            parsed = json.loads(raw_json)
            rest_data = parsed.get('restaurant')
            if rest_data:
                rest = Restaurant.objects.first()
                if rest:
                    for k, v in rest_data.items():
                        if hasattr(rest, k):
                            setattr(rest, k, v)
                    rest.save()
            messages.success(request, "Master JSON updated and applied successfully.")
        except Exception as e:
            messages.error(request, f"Failed to parse JSON: {e}")
    return redirect('cms_schema')


# ==============================================================================
# ELEMENTOR-STYLE CUSTOM PAGE BUILDER VIEWS
# ==============================================================================

@login_required(login_url='/cms/login/')
def cms_create_page(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        meta_desc = request.POST.get('meta_description', '').strip()
        theme_style = request.POST.get('theme_style', 'retro-neon')
        show_in_nav = request.POST.get('show_in_navigation') == 'on'

        if not title:
            messages.error(request, "Page title cannot be empty.")
            return redirect('cms_pages')

        if not slug:
            slug = slugify(title)

        base_slug = slug
        count = 1
        while CustomPage.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{count}"
            count += 1

        # Default starter Elementor-like blocks
        starter_blocks = [
            {
                "id": "block_1",
                "type": "hero_banner",
                "title": "Hero Banner Block",
                "data": {
                    "eyebrow": "EXCLUSIVE DINING & VIP RECEPTIONS",
                    "headline": title,
                    "lead": meta_desc or f"Welcome to the dedicated {title} experience at Stardust Retro-Futuristic Diner.",
                    "bg_image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80",
                    "cta_text": "Inquire / Book Now",
                    "cta_link": "#contact-block",
                    "secondary_text": "View Highlights",
                    "secondary_link": "#features-block"
                }
            },
            {
                "id": "block_2",
                "type": "split_content",
                "title": "50/50 Split Showcase",
                "data": {
                    "eyebrow": "BESPOKE ATMOSPHERE",
                    "headline": "Crafted For Memorable Occasions",
                    "content": "Our private spaces combine atomic age chrome, plush red vinyl booths, analog vinyl jukebox acoustics, and private mixology bar service tailored to your guests.",
                    "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                    "image_position": "right",
                    "badge": "Capacity: Up to 50 Guests"
                }
            },
            {
                "id": "block_3",
                "type": "features_grid",
                "title": "Features Grid",
                "data": {
                    "eyebrow": "VIP PRIVILEGES",
                    "headline": "Curated Amenities Included",
                    "items": [
                        {"title": "Custom Smash Menus", "desc": "Artisan smash sliders, prime pastrami melts, and atomic sides tailored to your taste.", "icon": "🍔"},
                        {"title": "Dedicated Mixologist", "desc": "Private bar service with smoking dry-ice cocktails and craft spiked shakes.", "icon": "🍸"},
                        {"title": "Hi-Fi Jukebox Access", "desc": "Curated analog rock-and-roll or futuristic synthwave playlist control.", "icon": "🎵"}
                    ]
                }
            },
            {
                "id": "block_4",
                "type": "call_to_action",
                "title": "Call To Action Banner",
                "data": {
                    "eyebrow": "RESERVE YOUR DATE",
                    "headline": "Ready To Create An Unforgettable Night?",
                    "lead": "Submit an event inquiry and our VIP dining concierge will respond within 4 hours.",
                    "button_text": "Request Event Date",
                    "button_link": "#contact-block"
                }
            }
        ]

        page = CustomPage.objects.create(
            title=title,
            slug=slug,
            meta_description=meta_desc,
            theme_style=theme_style,
            is_published=True,
            show_in_navigation=show_in_nav,
            nav_order=CustomPage.objects.count() + 1,
            blocks=starter_blocks
        )
        messages.success(request, f"Custom Page '{page.title}' created! Opening Elementor-style Visual Builder...")
        return redirect('cms_page_builder', pk=page.pk)
    return redirect('cms_pages')


@login_required(login_url='/cms/login/')
def cms_page_builder(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    context = {
        'page': page,
        'blocks_json': json.dumps(page.blocks, indent=2),
        'frontend_url': f"http://127.0.0.1:3000/page/{page.slug}",
    }
    return render(request, 'cms/page_builder.html', context)


@login_required(login_url='/cms/login/')
def cms_save_page_builder(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                payload = json.loads(request.body.decode('utf-8'))
            else:
                raw = request.POST.get('page_data', '')
                payload = json.loads(raw) if raw else {}

            if 'title' in payload:
                page.title = payload['title'].strip()
            if 'slug' in payload:
                new_slug = slugify(payload['slug'])
                if CustomPage.objects.filter(slug=new_slug).exclude(pk=page.pk).exists():
                    new_slug = f"{new_slug}-{page.pk}"
                page.slug = new_slug
            if 'meta_description' in payload:
                page.meta_description = payload['meta_description']
            if 'theme_style' in payload:
                page.theme_style = payload['theme_style']
            if 'is_published' in payload:
                page.is_published = bool(payload['is_published'])
            if 'show_in_navigation' in payload:
                page.show_in_navigation = bool(payload['show_in_navigation'])
            if 'blocks' in payload:
                page.blocks = payload['blocks']

            page.save()
            return JsonResponse({
                'success': True,
                'message': f"Page '{page.title}' saved successfully!",
                'slug': page.slug,
                'preview_url': f"http://127.0.0.1:3000/page/{page.slug}"
            })
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
    return JsonResponse({'success': False, 'error': 'POST required'}, status=405)


@login_required(login_url='/cms/login/')
def cms_toggle_page_publish(request, pk):
    page = get_object_or_404(CustomPage, pk=pk)
    page.is_published = not page.is_published
    page.save()
    status_str = "Published" if page.is_published else "Draft"
    messages.success(request, f"Page '{page.title}' is now set to {status_str}.")
    return redirect('cms_pages')


@login_required(login_url='/cms/login/')
def cms_delete_page(request, pk):
    if request.method == 'POST':
        page = get_object_or_404(CustomPage, pk=pk)
        title = page.title
        page.delete()
        messages.success(request, f"Custom Page '{title}' deleted successfully.")
    return redirect('cms_pages')


# ==============================================================================
# BLOG & EDITORIAL JOURNAL CMS VIEWS
# ==============================================================================

@login_required(login_url='/cms/login/')
def cms_blog_view(request):
    posts = BlogPost.objects.all().select_related('category')
    categories = BlogCategory.objects.all()
    kpis = {
        'total_posts': posts.count(),
        'published_posts': posts.filter(is_published=True).count(),
        'draft_posts': posts.filter(is_published=False).count(),
        'categories_count': categories.count(),
    }
    context = {
        'active_page': 'blog',
        'posts': posts,
        'categories': categories,
        'kpis': kpis,
        'restaurant': Restaurant.objects.first(),
    }
    return render(request, 'cms/blog.html', context)


@login_required(login_url='/cms/login/')
def cms_create_blog_post(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip()
        category_id = request.POST.get('category_id')
        author_name = request.POST.get('author_name', 'Stardust Culinary Crew').strip()
        author_role = request.POST.get('author_role', 'Executive Chef & Mixologist').strip()
        cover_image_url = request.POST.get('cover_image_url', '').strip()
        excerpt = request.POST.get('excerpt', '').strip()
        content = request.POST.get('content', '').strip()
        read_time = request.POST.get('read_time_minutes', '5').strip()
        is_featured = request.POST.get('is_featured') == 'on'
        is_published = request.POST.get('is_published') == 'on'

        if not title:
            messages.error(request, "Post title cannot be empty.")
            return redirect('cms_blog')

        if not slug:
            slug = slugify(title)

        base_slug = slug
        count = 1
        while BlogPost.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{count}"
            count += 1

        category = BlogCategory.objects.filter(pk=category_id).first() if category_id else None

        post = BlogPost.objects.create(
            title=title,
            slug=slug,
            category=category,
            author_name=author_name or 'Stardust Culinary Crew',
            author_role=author_role or 'Staff Writer',
            cover_image_url=cover_image_url or "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
            excerpt=excerpt,
            content=content,
            read_time_minutes=int(read_time) if read_time.isdigit() else 5,
            is_featured=is_featured,
            is_published=is_published,
        )

        if 'cover_image' in request.FILES:
            post.cover_image = request.FILES['cover_image']
            post.save()

        messages.success(request, f"Article '{post.title}' created successfully!")
    return redirect('cms_blog')


@login_required(login_url='/cms/login/')
def cms_edit_blog_post(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        category_id = request.POST.get('category_id')
        author_name = request.POST.get('author_name', '').strip()
        author_role = request.POST.get('author_role', '').strip()
        cover_image_url = request.POST.get('cover_image_url', '').strip()
        excerpt = request.POST.get('excerpt', '').strip()
        content = request.POST.get('content', '').strip()
        read_time = request.POST.get('read_time_minutes', '5').strip()
        is_featured = request.POST.get('is_featured') == 'on'
        is_published = request.POST.get('is_published') == 'on'

        if title:
            post.title = title
        post.category = BlogCategory.objects.filter(pk=category_id).first() if category_id else None
        if author_name:
            post.author_name = author_name
        if author_role:
            post.author_role = author_role
        if cover_image_url:
            post.cover_image_url = cover_image_url
        if excerpt:
            post.excerpt = excerpt
        if content:
            post.content = content
        if read_time.isdigit():
            post.read_time_minutes = int(read_time)
        post.is_featured = is_featured
        post.is_published = is_published

        if 'cover_image' in request.FILES:
            post.cover_image = request.FILES['cover_image']

        post.save()
        messages.success(request, f"Article '{post.title}' updated successfully!")
        return redirect('cms_blog')

    context = {
        'active_page': 'blog',
        'post': post,
        'categories': categories,
        'restaurant': Restaurant.objects.first(),
    }
    return render(request, 'cms/blog_edit.html', context)


@login_required(login_url='/cms/login/')
def cms_toggle_blog_publish(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    post.is_published = not post.is_published
    post.save()
    status_str = "Published" if post.is_published else "Draft"
    messages.success(request, f"Article '{post.title}' is now set to {status_str}.")
    return redirect('cms_blog')


@login_required(login_url='/cms/login/')
def cms_delete_blog_post(request, pk):
    if request.method == 'POST':
        post = get_object_or_404(BlogPost, pk=pk)
        title = post.title
        post.delete()
        messages.success(request, f"Article '{title}' deleted successfully.")
    return redirect('cms_blog')
