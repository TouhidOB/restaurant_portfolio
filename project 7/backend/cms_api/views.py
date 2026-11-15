from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost
from .serializers import (
    SiteConfigSerializer, ReservationSerializer, UserSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer
)

class PublicContentView(APIView):
    """
    Public endpoint returning the complete 15-section Parisian configuration,
    plus custom pages and gastronomic journal dispatches.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
        if not config:
            config = SiteConfig.objects.order_by('-updated_at').first()

        if not config:
            return Response({"error": "No configuration published yet"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SiteConfigSerializer(config)
        data = serializer.data
        data["status"] = "success"
        data["restaurant"] = {
            "name": config.restaurant_name,
            "tagline": config.content_json.get("tagline", "Salon Gastronomique & Bar à Champagne"),
            "city": config.content_json.get("city", "Paris"),
            "country": config.content_json.get("country", "France"),
            "phone": config.content_json.get("contact", {}).get("phone", "+33 1 42 68 55 00"),
            "email": config.content_json.get("contact", {}).get("email", "concierge@letoile-royale.paris"),
            "address": config.content_json.get("contact", {}).get("address", "18 Place Vendôme, 75001 Paris"),
        }
        data["categories"] = config.content_json.get("menuCategories", [])
        data["signature_dishes"] = config.content_json.get("signatureDishes", [])
        data["custom_pages"] = CustomPageSerializer(CustomPage.objects.filter(is_published=True), many=True).data
        data["blog_posts"] = BlogPostListSerializer(BlogPost.objects.filter(is_published=True), many=True).data
        data["blog_categories"] = BlogCategorySerializer(BlogCategory.objects.all(), many=True).data
        return Response(data)


class CustomPageDetailView(APIView):
    """Retrieves a published custom page by its URL slug"""
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        page = get_object_or_404(CustomPage, slug=slug, is_published=True)
        return Response({"status": "success", "page": CustomPageSerializer(page).data})


class BlogPostListView(APIView):
    """Lists published journal dispatches with category filtering"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        qs = BlogPost.objects.filter(is_published=True)
        cat_slug = request.query_params.get('category')
        if cat_slug:
            qs = qs.filter(category__slug=cat_slug)
        return Response({
            "status": "success",
            "count": qs.count(),
            "posts": BlogPostListSerializer(qs, many=True).data,
            "categories": BlogCategorySerializer(BlogCategory.objects.all(), many=True).data
        })


class BlogPostDetailView(APIView):
    """Retrieves a published journal dispatch and increments reads"""
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        BlogPost.objects.filter(pk=post.pk).update(views_count=post.views_count + 1)
        post.refresh_from_db()
        return Response({
            "status": "success",
            "post": BlogPostDetailSerializer(post).data
        })


class ReservationLookupView(APIView):
    """Lookup reservation status and table assignment by reference code (e.g. ROYAL-XXXXXX)"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        ref_code = (request.query_params.get('code') or request.query_params.get('ref', '')).strip().upper()
        if not ref_code:
            return Response({"status": "error", "message": "Reference code required."}, status=status.HTTP_400_BAD_REQUEST)

        reservation = Reservation.objects.filter(reference_code=ref_code).first()
        if not reservation:
            return Response({"status": "error", "message": f"No reservation record found for reference {ref_code}."}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "status": "success",
            "reservation": ReservationSerializer(reservation).data
        })


class ReservationAvailabilityView(APIView):
    """Check table and seat availability by date and shift"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        date_str = request.query_params.get('date')
        shift = request.query_params.get('shift', 'dinner').lower()
        
        qs = Reservation.objects.filter(status__in=['confirmed', 'seated'])
        if date_str:
            qs = qs.filter(date=date_str)
        if shift:
            qs = qs.filter(shift=shift)
            
        booked_count = qs.count()
        max_tables = 18
        remaining = max(0, max_tables - booked_count)
        
        return Response({
            "status": "success",
            "date": date_str,
            "shift": shift,
            "is_available": remaining > 0,
            "tables_capacity": max_tables,
            "remaining_tables": remaining,
            "remaining_seats": remaining * 2
        })


class ReservationViewSet(viewsets.ModelViewSet):
    """
    Handles reservations.
    - POST is open to all visitors to submit reservations.
    - GET, PUT, PATCH, DELETE are restricted to authenticated admin/staff users.
    """
    queryset = Reservation.objects.all().order_by('-created_at')
    serializer_class = ReservationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            "status": "success",
            "message": "Votre demande de réservation a été enregistrée avec succès.",
            "data": serializer.data,
            "reference_code": serializer.data.get("reference_code")
        }, status=status.HTTP_201_CREATED, headers=headers)


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
        return Response({"error": "Invalid administrative credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Successfully logged out"})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
