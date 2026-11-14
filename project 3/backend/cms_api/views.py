import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    RestaurantSettings, HomepageSection, MenuCategory, MenuItem,
    TourViewpoint, DiningSpace, CulinaryPillar, TeamMember,
    PrivateEventOffering, GalleryItem, Testimonial, ReservationInquiry, OpeningHour
)
from .serializers import (
    RestaurantSettingsSerializer, HomepageSectionSerializer, MenuCategorySerializer,
    MenuItemSerializer, TourViewpointSerializer, DiningSpaceSerializer,
    CulinaryPillarSerializer, TeamMemberSerializer, PrivateEventOfferingSerializer,
    GalleryItemSerializer, TestimonialSerializer, ReservationInquirySerializer, OpeningHourSerializer
)


# ==========================================
# PUBLIC REST API ENDPOINTS
# ==========================================

class FullRestaurantContentView(APIView):
    """
    Returns the complete aggregated restaurant data payload for the React frontend.
    Powers all 15 editorial sections S01 to S15.
    """
    def get(self, request):
        settings = RestaurantSettings.objects.first()
        settings_data = RestaurantSettingsSerializer(settings).data if settings else {}

        sections = HomepageSection.objects.filter(is_enabled=True)
        sections_data = {s.section_key: HomepageSectionSerializer(s).data for s in sections}

        categories = MenuCategory.objects.filter(is_active=True).prefetch_related('items')
        categories_data = MenuCategorySerializer(categories, many=True, context={'request': request}).data

        viewpoints = TourViewpoint.objects.all()
        viewpoints_data = TourViewpointSerializer(viewpoints, many=True, context={'request': request}).data

        spaces = DiningSpace.objects.all()
        spaces_data = DiningSpaceSerializer(spaces, many=True).data

        pillars = CulinaryPillar.objects.all()
        pillars_data = CulinaryPillarSerializer(pillars, many=True).data

        team = TeamMember.objects.all()
        team_data = TeamMemberSerializer(team, many=True).data

        events = PrivateEventOffering.objects.all()
        events_data = PrivateEventOfferingSerializer(events, many=True).data

        gallery = GalleryItem.objects.all()
        gallery_data = GalleryItemSerializer(gallery, many=True, context={'request': request}).data

        testimonials = Testimonial.objects.filter(is_featured=True)
        testimonials_data = TestimonialSerializer(testimonials, many=True).data

        hours = OpeningHour.objects.all()
        hours_data = OpeningHourSerializer(hours, many=True).data

        return Response({
            "status": "success",
            "settings": settings_data,
            "sections": sections_data,
            "menu_categories": categories_data,
            "tour_viewpoints": viewpoints_data,
            "dining_spaces": spaces_data,
            "culinary_pillars": pillars_data,
            "team_members": team_data,
            "private_events": events_data,
            "gallery_items": gallery_data,
            "testimonials": testimonials_data,
            "opening_hours": hours_data,
        })


class ReservationInquiryCreateView(APIView):
    """
    Receives and validates reservation inquiries from S13 and header modal.
    """
    def post(self, request):
        serializer = ReservationInquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            return Response({
                "status": "success",
                "message": "Your reservation inquiry has been received. Our concierge will contact you within 2 hours.",
                "reference_code": inquiry.reference_code,
                "inquiry": ReservationInquirySerializer(inquiry).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class TourViewpointViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TourViewpoint.objects.all()
    serializer_class = TourViewpointSerializer


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer


# ==========================================
# CMS STUDIO VIEWS (Custom Django Studio UI)
# ==========================================

def cms_login_view(request):
    if request.user.is_authenticated:
        return redirect('cms_dashboard')
    
    error_message = None
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome to Coastal Restaurant CMS Studio, {user.username}.")
            return redirect('cms_dashboard')
        else:
            error_message = "Invalid credentials or insufficient administrative access."

    return render(request, 'cms/login.html', {
        'error_message': error_message,
    })


def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out of Coastal Restaurant CMS Studio.")
    return redirect('cms_login')


@login_required(login_url='cms_login')
def cms_dashboard_view(request):
    settings = RestaurantSettings.objects.first()
    sections = HomepageSection.objects.all()
    categories = MenuCategory.objects.all().prefetch_related('items')
    menu_items = MenuItem.objects.all().select_related('category')
    viewpoints = TourViewpoint.objects.all()
    spaces = DiningSpace.objects.all()
    gallery = GalleryItem.objects.all()
    reservations = ReservationInquiry.objects.all()[:20]
    all_reservations_count = ReservationInquiry.objects.count()
    pending_reservations_count = ReservationInquiry.objects.filter(status='pending').count()
    hours = OpeningHour.objects.all()

    # Pre-render master JSON representation for the power editor
    master_dict = {
        "brand_name": settings.brand_name if settings else "AURA MARINA",
        "tagline": settings.tagline if settings else "",
        "hero_headline": settings.hero_headline if settings else "",
        "hero_subheadline": settings.hero_subheadline if settings else "",
        "phone": settings.phone if settings else "",
        "email": settings.email if settings else "",
        "dress_code": settings.dress_code if settings else "",
        "boat_access_notes": settings.boat_access_notes if settings else "",
        "tables_available_today": settings.tables_available_today if settings else 6,
    }
    master_json_str = json.dumps(master_dict, indent=2)

    context = {
        'settings': settings,
        'sections': sections,
        'categories': categories,
        'menu_items': menu_items,
        'viewpoints': viewpoints,
        'spaces': spaces,
        'gallery': gallery,
        'reservations': reservations,
        'all_reservations_count': all_reservations_count,
        'pending_reservations_count': pending_reservations_count,
        'hours': hours,
        'master_json_str': master_json_str,
    }
    return render(request, 'cms/dashboard.html', context)


@login_required(login_url='cms_login')
def cms_update_settings(request):
    if request.method == 'POST':
        settings = RestaurantSettings.objects.first()
        if not settings:
            settings = RestaurantSettings()
        
        settings.brand_name = request.POST.get('brand_name', settings.brand_name)
        settings.tagline = request.POST.get('tagline', settings.tagline)
        settings.hero_headline = request.POST.get('hero_headline', settings.hero_headline)
        settings.hero_subheadline = request.POST.get('hero_subheadline', settings.hero_subheadline)
        settings.address_line1 = request.POST.get('address_line1', settings.address_line1)
        settings.city_region = request.POST.get('city_region', settings.city_region)
        settings.coordinates_display = request.POST.get('coordinates_display', settings.coordinates_display)
        settings.phone = request.POST.get('phone', settings.phone)
        settings.email = request.POST.get('email', settings.email)
        settings.dress_code = request.POST.get('dress_code', settings.dress_code)
        settings.boat_access_notes = request.POST.get('boat_access_notes', settings.boat_access_notes)
        settings.michelin_distinction = request.POST.get('michelin_distinction', settings.michelin_distinction)
        
        try:
            settings.tables_available_today = int(request.POST.get('tables_available_today', settings.tables_available_today))
        except ValueError:
            pass

        settings.save()
        messages.success(request, "Restaurant settings updated successfully.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def cms_update_reservation_status(request, inquiry_id):
    if request.method == 'POST':
        inquiry = get_object_or_404(ReservationInquiry, id=inquiry_id)
        new_status = request.POST.get('status')
        staff_notes = request.POST.get('staff_notes')
        
        if new_status in dict(ReservationInquiry.STATUS_CHOICES):
            inquiry.status = new_status
        if staff_notes is not None:
            inquiry.staff_notes = staff_notes
            
        inquiry.save()
        messages.success(request, f"Reservation {inquiry.reference_code} updated to '{inquiry.get_status_display()}'.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def cms_toggle_menu_item(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(MenuItem, id=item_id)
        item.is_available = not item.is_available
        item.save()
        status_label = "Available" if item.is_available else "Sold Out"
        messages.success(request, f"Dish '{item.name}' marked as {status_label}.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
def cms_save_master_json(request):
    if request.method == 'POST':
        payload_raw = request.POST.get('master_json_text', '')
        try:
            data = json.loads(payload_raw)
            settings = RestaurantSettings.objects.first()
            if settings:
                if 'brand_name' in data: settings.brand_name = data['brand_name']
                if 'tagline' in data: settings.tagline = data['tagline']
                if 'hero_headline' in data: settings.hero_headline = data['hero_headline']
                if 'hero_subheadline' in data: settings.hero_subheadline = data['hero_subheadline']
                if 'phone' in data: settings.phone = data['phone']
                if 'email' in data: settings.email = data['email']
                if 'dress_code' in data: settings.dress_code = data['dress_code']
                if 'boat_access_notes' in data: settings.boat_access_notes = data['boat_access_notes']
                if 'tables_available_today' in data: settings.tables_available_today = int(data['tables_available_today'])
                settings.save()
            messages.success(request, "Master JSON configuration saved and applied.")
        except Exception as e:
            messages.error(request, f"JSON parsing or validation error: {str(e)}")
    return redirect('cms_dashboard')
