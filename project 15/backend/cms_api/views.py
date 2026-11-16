import datetime
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
    GalleryItem, DiningExperience, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
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
        all_dishes = MenuItem.objects.filter(is_available=True).order_by('sort_order')
        featured_dishes = all_dishes.filter(is_featured=True)[:6]
        viewpoints = TourViewpoint.objects.filter(is_active=True).order_by('sort_order')
        gallery = GalleryItem.objects.filter(is_active=True).order_by('sort_order')
        experiences = DiningExperience.objects.filter(is_active=True).order_by('sort_order')
        team = TeamMember.objects.filter(is_active=True).order_by('sort_order')
        testimonials = Testimonial.objects.filter(is_active=True).order_by('sort_order')
        custom_pages = CustomPage.objects.filter(is_published=True).order_by('-updated_at')
        blog_categories = BlogCategory.objects.all().order_by('sort_order')
        blog_posts = BlogPost.objects.filter(is_published=True).order_by('-published_at')

        content_json = config.content_json if config else {}
        config_dict = {
            "site_name": config.restaurant_name if config else "POP! FOOD STUDIO",
            **content_json
        }

        return Response({
            "exists": True,
            "restaurant_name": config.restaurant_name if config else "POP! FOOD STUDIO",
            "config": config_dict,
            "content": content_json,
            "site_config": {
                "name": config.restaurant_name if config else "POP! FOOD STUDIO",
                **(content_json.get("site", {}))
            },
            "categories": MenuCategorySerializer(categories, many=True).data,
            "menu_categories": MenuCategorySerializer(categories, many=True).data,
            "menu_items": MenuItemSerializer(all_dishes, many=True).data,
            "featured_dishes": MenuItemSerializer(featured_dishes, many=True).data,
            "viewpoints": TourViewpointSerializer(viewpoints, many=True).data,
            "gallery": GalleryItemSerializer(gallery, many=True).data,
            "experiences": DiningExperienceSerializer(experiences, many=True).data,
            "team": TeamMemberSerializer(team, many=True).data,
            "testimonials": TestimonialSerializer(testimonials, many=True).data,
            "custom_pages": CustomPageSerializer(custom_pages, many=True).data,
            "blog_categories": BlogCategorySerializer(blog_categories, many=True).data,
            "blog_posts": BlogPostSerializer(blog_posts, many=True).data,
            "updated_at": config.updated_at.isoformat() if config else None,
        })

    def post(self, request):
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(restaurant_name="POP! FOOD STUDIO")

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
            "page": CustomPageSerializer(page).data
        })


class BlogPostListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = BlogPost.objects.filter(is_published=True).order_by('-published_at')
        cat_slug = request.query_params.get('category')
        if cat_slug and cat_slug != 'all':
            qs = qs.filter(category__slug=cat_slug)
        return Response({
            "status": "success",
            "posts": BlogPostSerializer(qs, many=True).data
        })


class BlogPostDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "post": BlogPostSerializer(post).data
        })


class ReservationLookupView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        code = request.query_params.get('code', '').strip()
        if not code:
            return Response({"error": "Missing reservation reference code"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            res = Reservation.objects.get(reference_code__iexact=code)
            return Response({
                "status": "success",
                "reference_code": res.reference_code,
                "reservation": ReservationSerializer(res).data
            })
        except Reservation.DoesNotExist:
            return Response({
                "error": f"No booking found for reference code: {code}"
            }, status=status.HTTP_404_NOT_FOUND)


class ReservationAvailabilityView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        shift = request.query_params.get('shift', 'dinner').lower()
        date_str = request.query_params.get('date', datetime.date.today().isoformat())

        if shift == 'lunch':
            slots = ["11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"]
            label = "Daylight Pop Lunch"
        else:
            slots = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
            label = "Twilight Neon Dinner"

        return Response({
            "status": "available",
            "shift": shift,
            "shift_label": label,
            "date": date_str,
            "available_slots": slots,
            "max_party_size": 12,
            "zones_available": ["Main Comic Booth", "The Food Lab Counter", "Neon Loft Lounge", "Pop Patio"]
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
        if category and category != 'all':
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.save()
        return Response({
            "success": True,
            "message": "Thank you! Your table request has been received by the POP! Food Studio host desk.",
            "reference_code": reservation.reference_code,
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
