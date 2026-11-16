from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryImage, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
)
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer, MenuItemSerializer,
    TourViewpointSerializer, DiningExperienceSerializer,
    GalleryImageSerializer, TeamMemberSerializer,
    TestimonialSerializer, ReservationSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostSerializer
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
        custom_pages = CustomPage.objects.filter(is_published=True)
        blog_posts = BlogPost.objects.filter(is_published=True).select_related('category')
        blog_categories = BlogCategory.objects.all()

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
            "custom_pages": CustomPageSerializer(custom_pages, many=True).data,
            "blog_posts": BlogPostSerializer(blog_posts, many=True).data,
            "blog_categories": BlogCategorySerializer(blog_categories, many=True).data,
        })


class CustomPageDetailView(APIView):
    def get(self, request, slug):
        page = get_object_or_404(CustomPage, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "page": CustomPageSerializer(page).data
        })


class BlogPostListView(APIView):
    def get(self, request):
        category_slug = request.GET.get('category')
        queryset = BlogPost.objects.filter(is_published=True).select_related('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        categories = BlogCategory.objects.all()
        return Response({
            "status": "success",
            "posts": BlogPostSerializer(queryset, many=True).data,
            "categories": BlogCategorySerializer(categories, many=True).data
        })


class BlogPostDetailView(APIView):
    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "post": BlogPostSerializer(post).data
        })


class ReservationLookupView(APIView):
    def get(self, request):
        code = request.GET.get('code', '').strip().upper()
        if not code:
            return Response({"error": "Reference code is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            res = Reservation.objects.get(reference_code__iexact=code)
            return Response({
                "status": "success",
                "reservation": ReservationSerializer(res).data
            })
        except Reservation.DoesNotExist:
            return Response({
                "status": "error",
                "error": f"No reservation found with reference code {code}."
            }, status=status.HTTP_404_NOT_FOUND)


class ReservationAvailabilityView(APIView):
    def get(self, request):
        date = request.GET.get('date', '')
        shift = request.GET.get('shift', 'lunch').lower()

        # Maximum capacity per shift
        max_covers = 40
        existing = Reservation.objects.filter(date=date, shift=shift).exclude(status__iexact='cancelled')
        current_guests = sum(r.guests for r in existing)
        remaining = max(0, max_covers - current_guests)

        return Response({
            "status": "success",
            "date": date,
            "shift": shift,
            "is_available": remaining > 0,
            "remaining_covers": remaining,
            "max_covers": max_covers
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
