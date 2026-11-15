import os
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework import status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost
from .serializers import (
    SiteConfigSerializer, ReservationSerializer, UserSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer
)

class PublicContentView(APIView):
    """
    Public endpoint for React frontend to fetch site configuration, menus,
    custom pages, and blog posts.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.filter(is_published=True).first()
        custom_pages = CustomPage.objects.filter(is_published=True)
        blog_posts = BlogPost.objects.filter(is_published=True)
        blog_categories = BlogCategory.objects.all()

        content = config.content_json if config else {}
        menu = content.get('menu', {})
        categories = menu.get('categories', [])

        return Response({
            "status": "success",
            "restaurant": config.restaurant_name if config else "URBAN TABLE",
            "content_json": content,
            "categories": categories,
            "custom_pages": CustomPageSerializer(custom_pages, many=True).data,
            "blog_posts": BlogPostListSerializer(blog_posts, many=True).data,
            "blog_categories": BlogCategorySerializer(blog_categories, many=True).data
        })


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
    """Retrieves full article dispatch by slug and increments views"""
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        post.views_count += 1
        post.save(update_fields=['views_count'])
        return Response({"status": "success", "post": BlogPostDetailSerializer(post).data})


class ReservationLookupView(APIView):
    """Lookup reservation details by URBAN- reference code"""
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
        max_tables = 24
        remaining = max(0, max_tables - booked_count)
        
        return Response({
            "status": "success",
            "date": date_str,
            "shift": shift,
            "is_available": remaining > 0,
            "tables_capacity": max_tables,
            "remaining_tables": remaining,
            "remaining_seats": remaining * 4
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
            "message": "Your reservation inquiry has been registered at Urban Table.",
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
        try:
            request.user.auth_token.delete()
        except Exception:
            pass
        return Response({"message": "Successfully logged out"})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
