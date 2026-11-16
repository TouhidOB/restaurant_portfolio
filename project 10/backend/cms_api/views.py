from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets, generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from .models import SiteConfig, MenuCategory, MenuItem, Reservation, CustomPage, BlogCategory, BlogPost
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer, MenuItemSerializer,
    ReservationSerializer, UserSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostSerializer
)

class PublicContentView(APIView):
    """
    Public read-only endpoint consumed by the React 18 frontend on load.
    Returns the complete 15-section bilingual Bengali Heritage configuration,
    theme tokens, menu categories, custom pages, and editorial journal posts.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
        if not config:
            config = SiteConfig.objects.order_by('-updated_at').first()

        content_data = config.content_json if config else {}
        restaurant_name = config.restaurant_name if config else "BENGAL HERITAGE DINING"

        # Fetch custom pages & blogs
        custom_pages = CustomPage.objects.filter(is_published=True).order_by('-created_at')
        blog_categories = BlogCategory.objects.all().order_by('name')
        blog_posts = BlogPost.objects.filter(is_published=True).order_by('-published_at')

        return Response({
            "status": "success",
            "restaurant_name": restaurant_name,
            "restaurant": {"name": restaurant_name, "slug": "bengal-heritage"},
            "content_json": content_data,
            "custom_pages": CustomPageSerializer(custom_pages, many=True).data,
            "blog_categories": BlogCategorySerializer(blog_categories, many=True).data,
            "blog_posts": BlogPostSerializer(blog_posts, many=True).data,
        })


class CustomPageDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        page = get_object_or_404(CustomPage, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "page": CustomPageSerializer(page).data,
            "title": page.title,
            "blocks": page.blocks,
        })


class BlogPostListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        qs = BlogPost.objects.filter(is_published=True)
        cat_slug = self.request.query_params.get('category')
        if cat_slug:
            qs = qs.filter(category__slug=cat_slug)
        return qs.order_by('-published_at')

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            "status": "success",
            "posts": response.data,
            "results": response.data,
        })


class BlogPostDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "post": BlogPostSerializer(post).data,
        })


class ReservationCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response({
            "status": "success",
            "message": "Your table reservation inquiry has been submitted for host desk confirmation.",
            "data": ReservationSerializer(instance).data,
            "reference_code": instance.reference_code,
        }, status=status.HTTP_201_CREATED)


class ReservationLookupView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        code = request.query_params.get('code') or request.query_params.get('ref')
        if not code:
            return Response({"error": "Reference code query parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        reservation = Reservation.objects.filter(reference_code__iexact=code.strip()).first()
        if not reservation:
            return Response({"error": f"No reservation record found for reference code '{code}'"}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "status": "success",
            "reservation": ReservationSerializer(reservation).data
        })


class ReservationAvailabilityView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        date = request.query_params.get('date')
        shift = request.query_params.get('shift', 'dinner').lower()
        capacity = 100 if shift == 'lunch' else 160
        booked = Reservation.objects.filter(reservation_date=date, shift=shift, status__in=['pending', 'confirmed', 'seated']).count() if date else 6
        remaining = max(0, capacity - booked)

        return Response({
            "date": date,
            "shift": shift,
            "capacity": capacity,
            "booked_covers": booked,
            "remaining_covers": remaining,
            "is_available": remaining > 0,
        })


class MenuCategoryViewSet(viewsets.ModelViewSet):
    """
    Bilingual Menu Categories endpoint.
    - Public: GET active categories
    - Admin: Full CRUD
    """
    queryset = MenuCategory.objects.filter(is_active=True).order_by('sort_order', 'id')
    serializer_class = MenuCategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class MenuItemViewSet(viewsets.ModelViewSet):
    """
    Bilingual Menu Items endpoint.
    - Public: GET available dishes
    - Admin: Full CRUD
    """
    queryset = MenuItem.objects.filter(is_available=True).order_by('sort_order', 'id')
    serializer_class = MenuItemSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class ReservationViewSet(viewsets.ModelViewSet):
    """
    Handles customer table reservation inquiries.
    - Public: POST to submit an inquiry
    - Admin: GET, PATCH, DELETE for staff intake
    """
    queryset = Reservation.objects.all().order_by('-created_at')
    serializer_class = ReservationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user and (user.is_staff or user.is_superuser):
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": UserSerializer(user).data
            })
        return Response({"error": "Invalid administrator credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Successfully signed out of Bengali Heritage Studio"})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
