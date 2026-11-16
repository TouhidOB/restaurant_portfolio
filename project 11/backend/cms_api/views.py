from rest_framework import viewsets, permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from .models import SiteConfig, MenuCategory, MenuItem, Reservation, CustomPage, BlogCategory, BlogPost
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer,
    MenuItemSerializer, ReservationSerializer, UserSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostSerializer
)


class PublicContentView(APIView):
    """
    Public read-only endpoint returning the active Botanical Glasshouse Café configuration,
    theme tokens, menu categories, custom pages, and editorial journal posts.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.first()
        content_data = config.content_json if config else {}
        cafe_name = config.cafe_name if config else "VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ"

        custom_pages = CustomPage.objects.filter(is_published=True).order_by('-created_at')
        blog_categories = BlogCategory.objects.all().order_by('name')
        blog_posts = BlogPost.objects.filter(is_published=True).order_by('-published_at')

        return Response({
            "status": "success",
            "cafe_name": cafe_name,
            "restaurant_name": cafe_name,
            "restaurant": {"name": cafe_name, "slug": "verdant-atrium"},
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
            "message": "Your table reservation inquiry has been submitted for glasshouse host desk confirmation.",
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
        shift = request.query_params.get('shift', 'lunch').lower()
        capacity = 120 if shift == 'lunch' else 140
        booked = Reservation.objects.filter(reservation_date=date, shift=shift, status__in=['pending', 'confirmed', 'seated']).count() if date else 8
        remaining = max(0, capacity - booked)

        return Response({
            "date": date,
            "shift": shift,
            "capacity": capacity,
            "booked_covers": booked,
            "remaining_covers": remaining,
            "is_available": remaining > 0,
        })


class MenuCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuCategory.objects.filter(is_active=True).prefetch_related('items')
    serializer_class = MenuCategorySerializer
    permission_classes = [permissions.AllowAny]


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True).select_related('category')
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        cat_slug = self.request.query_params.get('category')
        if cat_slug:
            qs = qs.filter(category__slug=cat_slug)
        featured = self.request.query_params.get('featured')
        if featured in ['true', '1', 'True']:
            qs = qs.filter(is_signature=True)
        return qs


class ReservationViewSet(viewsets.ModelViewSet):
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
        if user and user.is_staff:
            login(request, user)
            return Response({"success": True, "user": UserSerializer(user).data})
        return Response({"detail": "Invalid credentials or unauthorized staff account"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"success": True, "message": "Logged out successfully"})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
