from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryImage, TeamMember, Testimonial, Reservation
)
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer, MenuItemSerializer,
    TourViewpointSerializer, DiningExperienceSerializer,
    GalleryImageSerializer, TeamMemberSerializer,
    TestimonialSerializer, ReservationSerializer
)

class PublicContentView(APIView):
    def get(self, request):
        config = SiteConfig.objects.first()
        categories = MenuCategory.objects.prefetch_related('items').all()
        signature_items = MenuItem.objects.filter(is_signature=True)
        viewpoints = TourViewpoint.objects.all()
        experiences = DiningExperience.objects.all()
        gallery = GalleryImage.objects.all()
        team = TeamMember.objects.all()
        testimonials = Testimonial.objects.all()

        config_data = SiteConfigSerializer(config).data if config else {}
        sections_data = config.raw_content_json if config and config.raw_content_json else {}

        return Response({
            "status": "success",
            "site_config": config_data,
            "editorial_sections": sections_data,
            "menu_categories": MenuCategorySerializer(categories, many=True).data,
            "signature_dishes": MenuItemSerializer(signature_items, many=True).data,
            "tour_viewpoints": TourViewpointSerializer(viewpoints, many=True).data,
            "dining_experiences": DiningExperienceSerializer(experiences, many=True).data,
            "gallery_images": GalleryImageSerializer(gallery, many=True).data,
            "team_members": TeamMemberSerializer(team, many=True).data,
            "testimonials": TestimonialSerializer(testimonials, many=True).data,
        })


class MenuCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuCategory.objects.prefetch_related('items').all()
    serializer_class = MenuCategorySerializer


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.select_related('category').all()
    serializer_class = MenuItemSerializer


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response({
                "status": "success",
                "message": "Your reservation inquiry has been received. Our concierge will confirm shortly.",
                "reservation": ReservationSerializer(instance).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": "error",
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
