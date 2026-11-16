from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404

from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial, Reservation,
    CustomPage, BlogCategory, BlogPost
)
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer, MenuItemSerializer,
    TourViewpointSerializer, GalleryItemSerializer, DiningExperienceSerializer,
    TeamMemberSerializer, TestimonialSerializer, ReservationSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostSerializer
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

        custom_pages = CustomPage.objects.filter(is_published=True).order_by('-created_at')
        blog_posts = BlogPost.objects.filter(is_published=True).order_by('-published_at')
        blog_categories = BlogCategory.objects.all().order_by('name')

        content_json = config.content_json if config else {}
        site_config_data = SiteConfigSerializer(config).data if config else {
            "restaurant_name": "CHARRED & PRIME",
            "content_json": content_json,
            "is_published": True
        }

        return Response({
            "exists": True,
            "restaurant_name": config.restaurant_name if config else "CHARRED & PRIME",
            "site_config": site_config_data,
            "content": content_json,
            "content_json": content_json,
            "categories": MenuCategorySerializer(categories, many=True).data,
            "menu_categories": MenuCategorySerializer(categories, many=True).data,
            "featured_steaks": MenuItemSerializer(featured_steaks, many=True).data,
            "viewpoints": TourViewpointSerializer(viewpoints, many=True).data,
            "gallery": GalleryItemSerializer(gallery, many=True).data,
            "experiences": DiningExperienceSerializer(experiences, many=True).data,
            "team": TeamMemberSerializer(team, many=True).data,
            "testimonials": TestimonialSerializer(testimonials, many=True).data,
            "custom_pages": CustomPageSerializer(custom_pages, many=True).data,
            "blog_posts": BlogPostSerializer(blog_posts, many=True).data,
            "blog_categories": BlogCategorySerializer(blog_categories, many=True).data,
            "updated_at": config.updated_at.isoformat() if config and config.updated_at else None,
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


class CustomPageDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        page = get_object_or_404(CustomPage, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "page": CustomPageSerializer(page).data,
            "data": CustomPageSerializer(page).data
        })


class BlogPostListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category_slug = request.query_params.get('category')
        qs = BlogPost.objects.filter(is_published=True).order_by('-published_at')
        if category_slug and category_slug != 'all':
            qs = qs.filter(category__slug=category_slug)
        categories = BlogCategory.objects.all().order_by('name')
        return Response({
            "posts": BlogPostSerializer(qs, many=True).data,
            "results": BlogPostSerializer(qs, many=True).data,
            "categories": BlogCategorySerializer(categories, many=True).data
        })


class BlogPostDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        return Response(BlogPostSerializer(post).data)


class ReservationLookupView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        code = request.query_params.get('code', '').strip().upper()
        if not code:
            return Response({"error": "Reference code is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        res = Reservation.objects.filter(reference_code__iexact=code).first()
        if not res:
            return Response({"error": f"No reservation found with reference code {code}"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ReservationSerializer(res)
        return Response({
            "status": "success",
            "reservation": serializer.data,
            "data": serializer.data,
            **serializer.data
        })


class ReservationAvailabilityView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        shift = request.query_params.get('shift', 'dinner').lower()
        date_str = request.query_params.get('date', '')

        lunch_slots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"]
        dinner_slots = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]

        available_slots = lunch_slots if shift == 'lunch' else dinner_slots
        max_covers = 40 if shift == 'lunch' else 90

        return Response({
            "status": "available",
            "shift": shift,
            "date": date_str,
            "max_covers": max_covers,
            "available_slots": available_slots,
            "seating_zones": [
                {"id": "main_hearth", "name": "Main Hearth & Grill Room", "min_party": 1, "max_party": 6},
                {"id": "dry_aging_view", "name": "Dry-Aging Cave View Booth", "min_party": 2, "max_party": 4},
                {"id": "wine_vault", "name": "Subterranean Wine Vault", "min_party": 4, "max_party": 14},
                {"id": "bar_counter", "name": "Craft Bourbon & Cut Counter", "min_party": 1, "max_party": 2}
            ]
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
        return [AllowAny()]

    def get_queryset(self):
        qs = super().get_queryset()
        shift = self.request.query_params.get('shift')
        if shift:
            qs = qs.filter(shift=shift)
        status_param = self.request.query_params.get('status')
        if status_param:
            qs = qs.filter(status=status_param)
        return qs

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.save()
        return Response({
            "success": True,
            "message": "Your reservation inquiry has been received. Our concierge team will contact you.",
            "reservation_id": reservation.id,
            "reference_code": reservation.reference_code,
            "status": reservation.status,
            "data": ReservationSerializer(reservation).data
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
