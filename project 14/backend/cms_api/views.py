from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial, Reservation
)
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer, MenuItemSerializer,
    TourViewpointSerializer, GalleryItemSerializer, DiningExperienceSerializer,
    TeamMemberSerializer, TestimonialSerializer, ReservationSerializer
)


@method_decorator(csrf_exempt, name='dispatch')
class PublicContentView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        config = SiteConfig.objects.first()
        categories = MenuCategory.objects.filter(is_active=True).order_by('sort_order')
        featured_steaks = MenuItem.objects.filter(is_available=True, is_featured=True).order_by('sort_order')[:4]
        viewpoints = TourViewpoint.objects.filter(is_active=True).order_by('sort_order')
        gallery = GalleryItem.objects.filter(is_active=True).order_by('sort_order')
        experiences = DiningExperience.objects.filter(is_active=True).order_by('sort_order')
        team = TeamMember.objects.filter(is_active=True).order_by('sort_order')
        testimonials = Testimonial.objects.filter(is_active=True).order_by('sort_order')

        content_json = config.content_json if config else {}

        return Response({
            "exists": True,
            "restaurant_name": config.restaurant_name if config else "CHARRED & PRIME",
            "content": content_json,
            "categories": MenuCategorySerializer(categories, many=True).data,
            "featured_steaks": MenuItemSerializer(featured_steaks, many=True).data,
            "viewpoints": TourViewpointSerializer(viewpoints, many=True).data,
            "gallery": GalleryItemSerializer(gallery, many=True).data,
            "experiences": DiningExperienceSerializer(experiences, many=True).data,
            "team": TeamMemberSerializer(team, many=True).data,
            "testimonials": TestimonialSerializer(testimonials, many=True).data,
            "updated_at": config.updated_at.isoformat() if config else None,
        })

    def post(self, request):
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(restaurant_name="CHARRED & PRIME")

        data = request.data
        if "restaurant_name" in data:
            config.restaurant_name = data["restaurant_name"]
        if "content" in data:
            config.content_json = data["content"]
        elif "content_json" in data:
            config.content_json = data["content_json"]

        config.save()
        return Response({
            "success": True,
            "message": "Content updated successfully",
            "restaurant_name": config.restaurant_name,
            "content": config.content_json,
            "updated_at": config.updated_at.isoformat()
        })


class MenuCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuCategory.objects.filter(is_active=True).order_by('sort_order')
    serializer_class = MenuCategorySerializer
    permission_classes = [AllowAny]


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True).order_by('sort_order')
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__slug=category)
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            qs = qs.filter(is_featured=True)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(name__icontains=search) | qs.filter(description__icontains=search)
        return qs


class TourViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TourViewpoint.objects.filter(is_active=True).order_by('sort_order')
    serializer_class = TourViewpointSerializer
    permission_classes = [AllowAny]


class GalleryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryItem.objects.filter(is_active=True).order_by('sort_order')
    serializer_class = GalleryItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        cat = self.request.query_params.get('category')
        if cat and cat != 'all':
            qs = qs.filter(category=cat)
        return qs


@method_decorator(csrf_exempt, name='dispatch')
class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all().order_by('-created_at')
    serializer_class = ReservationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [AllowAny()]  # Permissive for local dev demo convenience

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.save()
        return Response({
            "success": True,
            "message": "Your reservation inquiry has been received. Our team will contact you to confirm table availability.",
            "reservation_id": reservation.id,
            "status": reservation.status
        }, status=status.HTTP_201_CREATED)


class AuthLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response({"success": True, "username": user.username})
        return Response({"success": False, "message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AuthLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"success": True, "message": "Logged out successfully"})


class AuthMeView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "authenticated": True,
                "username": request.user.username,
                "is_staff": request.user.is_staff
            })
        return Response({"authenticated": False})
