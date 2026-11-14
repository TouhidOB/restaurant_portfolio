import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
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
            'viewpoints': VirtualTourViewpointSerializer(viewpoints, many=True).data,
            'pillars': PhilosophyPillarSerializer(pillars, many=True).data,
            'story_stages': DinerStoryStageSerializer(story_stages, many=True).data,
            'dining_panels': DinerExperiencePanelSerializer(dining_panels, many=True).data,
            'gallery': GalleryImageSerializer(gallery, many=True, context={'request': request}).data,
            'testimonials': TestimonialSerializer(testimonials, many=True).data,
            'faqs': FAQSerializer(faqs, many=True).data,
        }
        return Response(data)


class ReservationCreateView(generics.CreateAPIView):
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
                'message': 'Your retro diner reservation inquiry has been received.',
                'reference_code': reservation.reference_code,
                'guest_name': reservation.full_name,
                'reservation_date': str(reservation.reservation_date),
                'reservation_time': reservation.reservation_time,
                'party_size': reservation.guest_count,
                'email': reservation.email,
                'seating_area': reservation.seating_area,
            },
            status=status.HTTP_201_CREATED
        )


class ContactCreateView(generics.CreateAPIView):
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


@login_required(login_url='/cms/login/')
def cms_dashboard_view(request):
    if not request.user.is_staff:
        return redirect('cms_login')

    restaurant = Restaurant.objects.first()
    brand_settings = BrandSettings.objects.first()
    sections = WebsiteSection.objects.all()
    categories = MenuCategory.objects.all().prefetch_related('items')
    reservations = Reservation.objects.all().order_by('-created_at')
    viewpoints = VirtualTourViewpoint.objects.all()
    gallery_images = GalleryImage.objects.all()
    testimonials = Testimonial.objects.all()
    faqs = FAQ.objects.all()
    contact_inquiries = ContactInquiry.objects.all().order_by('-created_at')

    # Telemetry KPIs
    kpis = {
        'total_reservations': reservations.count(),
        'pending_reservations': reservations.filter(status='pending').count(),
        'confirmed_reservations': reservations.filter(status='confirmed').count(),
        'total_menu_items': MenuItem.objects.count(),
        'active_menu_items': MenuItem.objects.filter(is_available=True).count(),
        'total_categories': categories.count(),
        'total_viewpoints': viewpoints.count(),
        'gallery_count': gallery_images.count(),
        'testimonials_count': testimonials.count(),
        'inquiries_count': contact_inquiries.count(),
    }

    # Full Master JSON representation for editor
    full_content_data = {
        'restaurant': RestaurantSerializer(restaurant).data if restaurant else {},
        'brand_settings': BrandSettingsSerializer(brand_settings).data if brand_settings else {},
        'sections': {s.section_key: {'eyebrow': s.eyebrow, 'title': s.title, 'subtitle': s.subtitle, 'custom_content': s.custom_content} for s in sections},
        'categories': MenuCategorySerializer(categories, many=True).data,
        'viewpoints': VirtualTourViewpointSerializer(viewpoints, many=True).data,
    }

    context = {
        'restaurant': restaurant,
        'brand_settings': brand_settings,
        'sections': sections,
        'categories': categories,
        'reservations': reservations,
        'viewpoints': viewpoints,
        'gallery_images': gallery_images,
        'testimonials': testimonials,
        'faqs': faqs,
        'contact_inquiries': contact_inquiries,
        'kpis': kpis,
        'master_json_str': json.dumps(full_content_data, indent=2),
    }
    return render(request, 'cms/dashboard.html', context)


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
    return redirect('cms_dashboard')


@login_required(login_url='/cms/login/')
def cms_update_reservation_status(request, pk):
    if request.method == 'POST':
        res = get_object_or_404(Reservation, pk=pk)
        new_status = request.POST.get('status')
        if new_status in dict(Reservation.STATUS_CHOICES):
            res.status = new_status
            res.admin_notes = request.POST.get('admin_notes', res.admin_notes)
            res.save()
            messages.success(request, f"Reservation {res.reference_code} updated to '{res.get_status_display()}'.")
    return redirect('cms_dashboard')


@login_required(login_url='/cms/login/')
def cms_toggle_menu_item(request, pk):
    item = get_object_or_404(MenuItem, pk=pk)
    item.is_available = not item.is_available
    item.save()
    messages.success(request, f"'{item.name}' availability toggled to {item.is_available}.")
    return redirect('cms_dashboard')


@login_required(login_url='/cms/login/')
def cms_update_section(request, pk):
    if request.method == 'POST':
        section = get_object_or_404(WebsiteSection, pk=pk)
        section.eyebrow = request.POST.get('eyebrow', section.eyebrow)
        section.title = request.POST.get('title', section.title)
        section.subtitle = request.POST.get('subtitle', section.subtitle)
        section.save()
        messages.success(request, f"Section '{section.title}' updated successfully.")
    return redirect('cms_dashboard')


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
    return redirect('cms_dashboard')
