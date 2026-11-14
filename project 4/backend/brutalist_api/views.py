import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib import messages
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryProcessStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ
)
from .serializers import (
    RestaurantSerializer, WebsiteSectionSerializer, MenuCategorySerializer,
    MenuItemSerializer, VirtualTourViewpointSerializer, PhilosophyPillarSerializer,
    CulinaryProcessStageSerializer, DiningExperiencePanelSerializer,
    GalleryImageSerializer, TestimonialSerializer, ReservationSerializer, FAQSerializer
)

# ==========================================
# REST API VIEWS
# ==========================================

class FullBrutalistContentView(APIView):
    """
    Consolidated API delivering all structured content for the 15 editorial sections
    of the MONOLITH Brutalist Contemporary Restaurant website.
    """
    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.filter(is_active=True).first()
        if not restaurant:
            restaurant = Restaurant.objects.first()

        restaurant_data = RestaurantSerializer(restaurant, context={'request': request}).data if restaurant else {}

        # Section configurations
        sections = {}
        for s in WebsiteSection.objects.filter(is_visible=True):
            sections[s.section_key] = WebsiteSectionSerializer(s).data

        categories = MenuCategorySerializer(
            MenuCategory.objects.filter(is_active=True), many=True, context={'request': request}
        ).data

        featured_dishes = MenuItemSerializer(
            MenuItem.objects.filter(is_featured=True, is_available=True), many=True, context={'request': request}
        ).data

        viewpoints = VirtualTourViewpointSerializer(
            VirtualTourViewpoint.objects.filter(is_active=True), many=True, context={'request': request}
        ).data

        pillars = PhilosophyPillarSerializer(
            PhilosophyPillar.objects.all(), many=True
        ).data

        process_stages = CulinaryProcessStageSerializer(
            CulinaryProcessStage.objects.all(), many=True
        ).data

        dining_panels = DiningExperiencePanelSerializer(
            DiningExperiencePanel.objects.all(), many=True
        ).data

        gallery = GalleryImageSerializer(
            GalleryImage.objects.filter(is_active=True), many=True
        ).data

        testimonials = TestimonialSerializer(
            Testimonial.objects.filter(is_approved=True), many=True
        ).data

        faqs = FAQSerializer(
            FAQ.objects.filter(is_active=True), many=True
        ).data

        return Response({
            "status": "success",
            "concept": "Architectural Brutalism | Raw Materials | Experimental Digital Dining",
            "restaurant": restaurant_data,
            "sections": sections,
            "categories": categories,
            "featured_dishes": featured_dishes,
            "viewpoints": viewpoints,
            "pillars": pillars,
            "process_stages": process_stages,
            "dining_panels": dining_panels,
            "gallery": gallery,
            "testimonials": testimonials,
            "faqs": faqs,
        })


class ReservationCreateView(APIView):
    """Handles reservation bookings with validation and reference code generation"""
    def post(self, request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            reservation = serializer.save()
            return Response({
                "status": "success",
                "message": "Your reservation inquiry has been registered in the Monolith registry.",
                "reference_code": reservation.reference_code,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        reservations = Reservation.objects.all()[:20]
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer


class VirtualTourViewpointViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VirtualTourViewpoint.objects.filter(is_active=True)
    serializer_class = VirtualTourViewpointSerializer


# ==========================================
# CMS STUDIO VIEWS
# ==========================================

def cms_login_view(request):
    if request.user.is_authenticated:
        return redirect('cms_dashboard')

    if request.method == 'POST':
        u = request.POST.get('username')
        p = request.POST.get('password')
        user = authenticate(request, username=u, password=p)
        if user is not None and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome to Monolith Brutalist Studio, {user.username}.")
            return redirect('cms_dashboard')
        else:
            messages.error(request, "Invalid architectural credentials. Access restricted.")

    return render(request, 'cms/login.html')


def cms_logout_view(request):
    logout(request)
    messages.info(request, "Session closed safely.")
    return redirect('cms_login')


@login_required(login_url='cms_login')
def cms_dashboard_view(request):
    restaurant = Restaurant.objects.first()
    if not restaurant:
        restaurant = Restaurant.objects.create(name="MONOLITH // BRUTALIST DINING")

    sections = WebsiteSection.objects.all()
    categories = MenuCategory.objects.all()
    menu_items = MenuItem.objects.select_related('category').all()
    viewpoints = VirtualTourViewpoint.objects.all()
    pillars = PhilosophyPillar.objects.all()
    process_stages = CulinaryProcessStage.objects.all()
    reservations = Reservation.objects.all().order_by('-created_at')
    gallery = GalleryImage.objects.all()
    faqs = FAQ.objects.all()

    # Telemetry KPIs
    kpis = {
        'total_menu_items': menu_items.count(),
        'available_menu_items': menu_items.filter(is_available=True).count(),
        'total_reservations': reservations.count(),
        'pending_reservations': reservations.filter(status='pending').count(),
        'confirmed_reservations': reservations.filter(status='confirmed').count(),
        'active_viewpoints': viewpoints.filter(is_active=True).count(),
        'gallery_count': gallery.count(),
    }

    # Pre-render JSON for master JSON editor
    full_content = {
        "restaurant": RestaurantSerializer(restaurant).data,
        "sections": {s.section_key: WebsiteSectionSerializer(s).data for s in sections},
        "viewpoints": VirtualTourViewpointSerializer(viewpoints, many=True).data,
        "pillars": PhilosophyPillarSerializer(pillars, many=True).data,
        "faqs": FAQSerializer(faqs, many=True).data,
    }

    context = {
        'restaurant': restaurant,
        'sections': sections,
        'categories': categories,
        'menu_items': menu_items,
        'viewpoints': viewpoints,
        'pillars': pillars,
        'process_stages': process_stages,
        'reservations': reservations,
        'gallery': gallery,
        'faqs': faqs,
        'kpis': kpis,
        'master_json_str': json.dumps(full_content, indent=2),
    }

    return render(request, 'cms/dashboard.html', context)


@login_required(login_url='cms_login')
@require_POST
def cms_update_settings(request):
    restaurant = Restaurant.objects.first()
    if not restaurant:
        restaurant = Restaurant.objects.create()

    restaurant.name = request.POST.get('name', restaurant.name)
    restaurant.tagline = request.POST.get('tagline', restaurant.tagline)
    restaurant.short_description = request.POST.get('short_description', restaurant.short_description)
    restaurant.phone = request.POST.get('phone', restaurant.phone)
    restaurant.email = request.POST.get('email', restaurant.email)
    restaurant.address = request.POST.get('address', restaurant.address)
    restaurant.city = request.POST.get('city', restaurant.city)
    restaurant.coordinates_display = request.POST.get('coordinates_display', restaurant.coordinates_display)
    restaurant.opening_hours_summary = request.POST.get('opening_hours_summary', restaurant.opening_hours_summary)
    
    restaurant.hero_heading_line1 = request.POST.get('hero_heading_line1', restaurant.hero_heading_line1)
    restaurant.hero_heading_line2 = request.POST.get('hero_heading_line2', restaurant.hero_heading_line2)
    restaurant.hero_heading_line3 = request.POST.get('hero_heading_line3', restaurant.hero_heading_line3)
    restaurant.hero_supporting_text = request.POST.get('hero_supporting_text', restaurant.hero_supporting_text)
    
    restaurant.save()
    messages.success(request, "Monolith restaurant parameters updated successfully.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
@require_POST
def cms_update_reservation_status(request, pk):
    reservation = get_object_or_404(Reservation, pk=pk)
    new_status = request.POST.get('status')
    if new_status in dict(Reservation.STATUS_CHOICES):
        reservation.status = new_status
        reservation.save()
        messages.success(request, f"Reservation {reservation.reference_code} status updated to {new_status.upper()}.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
@require_POST
def cms_toggle_menu_item(request, pk):
    item = get_object_or_404(MenuItem, pk=pk)
    item.is_available = not item.is_available
    item.save()
    messages.success(request, f"Menu item '{item.name}' availability set to {item.is_available}.")
    return redirect('cms_dashboard')


@login_required(login_url='cms_login')
@require_POST
def cms_save_master_json(request):
    raw_json = request.POST.get('master_json')
    try:
        data = json.loads(raw_json)
        # Update restaurant if provided
        if "restaurant" in data:
            r_data = data["restaurant"]
            restaurant = Restaurant.objects.first()
            if restaurant:
                for k, v in r_data.items():
                    if hasattr(restaurant, k) and k not in ['id', 'created_at', 'updated_at']:
                        setattr(restaurant, k, v)
                restaurant.save()

        # Update sections if provided
        if "sections" in data:
            for s_key, s_data in data["sections"].items():
                section = WebsiteSection.objects.filter(section_key=s_key).first()
                if section:
                    if 'eyebrow' in s_data: section.eyebrow = s_data['eyebrow']
                    if 'title' in s_data: section.title = s_data['title']
                    if 'subtitle' in s_data: section.subtitle = s_data['subtitle']
                    if 'custom_content' in s_data: section.custom_content = s_data['custom_content']
                    section.save()

        messages.success(request, "Master architectural configuration successfully compiled and saved.")
    except Exception as e:
        messages.error(request, f"JSON parse error: {str(e)}")

    return redirect('cms_dashboard')
