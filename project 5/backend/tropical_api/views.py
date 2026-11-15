import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib import messages
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryStoryStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ,
    CustomPage, BlogCategory, BlogPost
)
from .serializers import (
    RestaurantSerializer, WebsiteSectionSerializer, MenuCategorySerializer,
    MenuItemSerializer, VirtualTourViewpointSerializer, PhilosophyPillarSerializer,
    CulinaryStoryStageSerializer, DiningExperiencePanelSerializer,
    GalleryImageSerializer, TestimonialSerializer, ReservationSerializer, FAQSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer
)

# ==========================================
# REST API VIEWS
# ==========================================

class FullTropicalContentView(APIView):
    """
    Consolidated API delivering all structured content for the 15 editorial sections
    of the VERDANT Tropical Contemporary Restaurant platform, plus custom pages and journal articles.
    """
    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.filter(is_active=True).first()
        if not restaurant:
            restaurant = Restaurant.objects.first()

        restaurant_data = RestaurantSerializer(restaurant, context={'request': request}).data if restaurant else {}

        # Section configurations
        sections = {}
        for s in WebsiteSection.objects.filter(is_visible=True):
            sections[s.section_key] = WebsiteSectionSerializer(s).data

        categories = MenuCategorySerializer(
            MenuCategory.objects.filter(is_active=True), many=True, context={'request': request}
        ).data

        featured_dishes = MenuItemSerializer(
            MenuItem.objects.filter(is_featured=True, is_available=True), many=True, context={'request': request}
        ).data

        viewpoints = VirtualTourViewpointSerializer(
            VirtualTourViewpoint.objects.filter(is_active=True), many=True, context={'request': request}
        ).data

        pillars = PhilosophyPillarSerializer(
            PhilosophyPillar.objects.all(), many=True
        ).data

        story_stages = CulinaryStoryStageSerializer(
            CulinaryStoryStage.objects.all(), many=True
        ).data

        dining_panels = DiningExperiencePanelSerializer(
            DiningExperiencePanel.objects.all(), many=True
        ).data

        gallery = GalleryImageSerializer(
            GalleryImage.objects.filter(is_active=True), many=True, context={'request': request}
        ).data

        testimonials = TestimonialSerializer(
            Testimonial.objects.filter(is_approved=True), many=True
        ).data

        faqs = FAQSerializer(
            FAQ.objects.filter(is_active=True), many=True
        ).data

        custom_pages = CustomPageSerializer(
            CustomPage.objects.filter(is_published=True), many=True
        ).data

        blog_posts = BlogPostListSerializer(
            BlogPost.objects.filter(is_published=True), many=True, context={'request': request}
        ).data

        blog_categories = BlogCategorySerializer(
            BlogCategory.objects.all(), many=True
        ).data

        return Response({
            "status": "success",
            "concept": "Tropical Modernism | Nature-Inspired Luxury | Immersive Dining",
            "restaurant": restaurant_data,
            "sections": sections,
            "categories": categories,
            "featured_dishes": featured_dishes,
            "viewpoints": viewpoints,
            "pillars": pillars,
            "story_stages": story_stages,
            "dining_panels": dining_panels,
            "gallery": gallery,
            "testimonials": testimonials,
            "faqs": faqs,
            "custom_pages": custom_pages,
            "blog_posts": blog_posts,
            "blog_categories": blog_categories,
        })


class CustomPageDetailView(APIView):
    """Retrieves a single published custom page by slug"""
    def get(self, request, slug, *args, **kwargs):
        page = get_object_or_404(CustomPage, slug=slug, is_published=True)
        serializer = CustomPageSerializer(page)
        return Response({
            "status": "success",
            "page": serializer.data
        })


class BlogPostListView(APIView):
    """Returns published blog journal posts with category filter"""
    def get(self, request, *args, **kwargs):
        category_slug = request.query_params.get('category', None)
        posts = BlogPost.objects.filter(is_published=True)
        if category_slug:
            posts = posts.filter(category__slug=category_slug)
        serializer = BlogPostListSerializer(posts, many=True, context={'request': request})
        return Response({
            "status": "success",
            "posts": serializer.data
        })


class BlogPostDetailView(APIView):
    """Retrieves a single published blog article and increments view count"""
    def get(self, request, slug, *args, **kwargs):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        post.views_count += 1
        post.save(update_fields=['views_count'])
        serializer = BlogPostDetailSerializer(post, context={'request': request})
        return Response({
            "status": "success",
            "post": serializer.data
        })


class ReservationCreateView(APIView):
    """Handles reservation bookings with validation and reference code generation"""
    def post(self, request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            reservation = serializer.save()
            return Response({
                "status": "success",
                "message": "Your reservation inquiry has been registered in the Verdant botanical registry.",
                "reference_code": reservation.reference_code,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        reservations = Reservation.objects.all()[:20]
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)


class ReservationLookupView(APIView):
    """Lookup reservation status and details by reference code"""
    def get(self, request, *args, **kwargs):
        ref_code = request.query_params.get('ref', '').strip().upper()
        if not ref_code:
            return Response({"status": "error", "message": "Reference code required."}, status=status.HTTP_400_BAD_REQUEST)

        reservation = Reservation.objects.filter(reference_code=ref_code).first()
        if not reservation:
            return Response({"status": "error", "message": f"No reservation record found for reference {ref_code}."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReservationSerializer(reservation)
        return Response({
            "status": "success",
            "reservation": serializer.data
        })


class ReservationAvailabilityView(APIView):
    """Check seat availability by date and shift"""
    def get(self, request, *args, **kwargs):
        date_str = request.query_params.get('date', timezone.now().strftime('%Y-%m-%d'))
        shift = request.query_params.get('shift', 'dinner').lower()

        # Capacity per shift: Lunch 45 covers, Dinner 72 covers
        max_covers = 45 if shift == 'lunch' else 72
        existing = Reservation.objects.filter(
            reservation_date=date_str,
            shift=shift,
            status__in=['pending', 'confirmed', 'seated']
        )
        booked_guests = sum(r.guest_count for r in existing)
        available_seats = max(0, max_covers - booked_guests)

        return Response({
            "status": "success",
            "date": date_str,
            "shift": shift,
            "booked_covers": booked_guests,
            "remaining_seats": available_seats,
            "is_available": available_seats >= 2
        })


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer


class VirtualTourViewpointViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VirtualTourViewpoint.objects.filter(is_active=True)
    serializer_class = VirtualTourViewpointSerializer
