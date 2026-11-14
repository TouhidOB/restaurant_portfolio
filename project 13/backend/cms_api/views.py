from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryItem, TeamMember, Testimonial, Reservation
)
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer, MenuItemSerializer,
    TourViewpointSerializer, DiningExperienceSerializer,
    GalleryItemSerializer, TeamMemberSerializer,
    TestimonialSerializer, ReservationSerializer
)

class PublicContentView(APIView):
    def get(self, request):
        config = SiteConfig.objects.first()
        categories = MenuCategory.objects.filter(is_active=True).prefetch_related('items')
        featured_dishes = MenuItem.objects.filter(is_featured=True, is_available=True)
        viewpoints = TourViewpoint.objects.filter(is_active=True)
        experiences = DiningExperience.objects.all()
        gallery = GalleryItem.objects.filter(is_active=True)
        team = TeamMember.objects.all()
        testimonials = Testimonial.objects.all()

        config_data = SiteConfigSerializer(config).data if config else {}
        sections_data = config.content_json if config and config.content_json else {}

        return Response({
            "status": "success",
            "exists": True,
            "restaurant_name": config.restaurant_name if config else "SEOUL STREET",
            "site_config": config_data,
            "editorial_sections": sections_data,
            "menu_categories": MenuCategorySerializer(categories, many=True).data,
            "signature_dishes": MenuItemSerializer(featured_dishes, many=True).data,
            "tour_viewpoints": TourViewpointSerializer(viewpoints, many=True).data,
            "dining_experiences": DiningExperienceSerializer(experiences, many=True).data,
            "gallery_items": GalleryItemSerializer(gallery, many=True).data,
            "team_members": TeamMemberSerializer(team, many=True).data,
            "testimonials": TestimonialSerializer(testimonials, many=True).data,
        })


class MenuCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuCategory.objects.filter(is_active=True).prefetch_related('items')
    serializer_class = MenuCategorySerializer


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True).select_related('category')
    serializer_class = MenuItemSerializer


class TourViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TourViewpoint.objects.filter(is_active=True)
    serializer_class = TourViewpointSerializer


class GalleryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryItem.objects.filter(is_active=True)
    serializer_class = GalleryItemSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response({
                "success": True,
                "message": "Your inquiry has been received. The restaurant will contact you to confirm availability.",
                "reservation_id": instance.id,
                "status": instance.status,
                "reservation": ReservationSerializer(instance).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user and user.is_staff:
            login(request, user)
            return Response({
                "status": "success",
                "user": {"username": user.username, "is_staff": user.is_staff}
            })
        return Response({"status": "error", "message": "Invalid admin credentials."}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"status": "success", "message": "Logged out successfully."})


class AdminMeView(APIView):
    def get(self, request):
        if request.user.is_authenticated and request.user.is_staff:
            return Response({
                "authenticated": True,
                "user": {"username": request.user.username, "is_staff": request.user.is_staff}
            })
        return Response({"authenticated": False}, status=status.HTTP_401_UNAUTHORIZED)
