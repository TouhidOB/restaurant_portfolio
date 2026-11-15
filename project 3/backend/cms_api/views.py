import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
from django.utils import timezone
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    RestaurantSettings, HomepageSection, MenuCategory, MenuItem,
    TourViewpoint, DiningSpace, CulinaryPillar, TeamMember,
    PrivateEventOffering, GalleryItem, Testimonial, ReservationInquiry, OpeningHour,
    CustomPage, BlogCategory, BlogPost
)
from .serializers import (
    RestaurantSettingsSerializer, HomepageSectionSerializer, MenuCategorySerializer,
    MenuItemSerializer, TourViewpointSerializer, DiningSpaceSerializer,
    CulinaryPillarSerializer, TeamMemberSerializer, PrivateEventOfferingSerializer,
    GalleryItemSerializer, TestimonialSerializer, ReservationInquirySerializer, OpeningHourSerializer,
    CustomPageSerializer, BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer
)


# ==========================================
# PUBLIC REST API ENDPOINTS
# ==========================================

class FullRestaurantContentView(APIView):
    """
    Returns the complete aggregated restaurant data payload for the React frontend.
    Powers all 15 editorial sections S01 to S15, plus custom pages and journal articles.
    """
    def get(self, request):
        settings = RestaurantSettings.objects.first()
        settings_data = RestaurantSettingsSerializer(settings).data if settings else {}

        sections = HomepageSection.objects.filter(is_enabled=True)
        sections_data = {s.section_key: HomepageSectionSerializer(s).data for s in sections}

        categories = MenuCategory.objects.filter(is_active=True).prefetch_related('items')
        categories_data = MenuCategorySerializer(categories, many=True, context={'request': request}).data

        viewpoints = TourViewpoint.objects.all()
        viewpoints_data = TourViewpointSerializer(viewpoints, many=True, context={'request': request}).data

        spaces = DiningSpace.objects.all()
        spaces_data = DiningSpaceSerializer(spaces, many=True).data

        pillars = CulinaryPillar.objects.all()
        pillars_data = CulinaryPillarSerializer(pillars, many=True).data

        team = TeamMember.objects.all()
        team_data = TeamMemberSerializer(team, many=True).data

        events = PrivateEventOffering.objects.all()
        events_data = PrivateEventOfferingSerializer(events, many=True).data

        gallery = GalleryItem.objects.all()
        gallery_data = GalleryItemSerializer(gallery, many=True, context={'request': request}).data

        testimonials = Testimonial.objects.filter(is_featured=True)
        testimonials_data = TestimonialSerializer(testimonials, many=True).data

        hours = OpeningHour.objects.all()
        hours_data = OpeningHourSerializer(hours, many=True).data

        custom_pages = CustomPage.objects.filter(is_published=True)
        custom_pages_data = CustomPageSerializer(custom_pages, many=True).data

        blog_posts = BlogPost.objects.filter(is_published=True)
        blog_posts_data = BlogPostListSerializer(blog_posts, many=True).data

        blog_categories = BlogCategory.objects.all()
        blog_categories_data = BlogCategorySerializer(blog_categories, many=True).data

        return Response({
            "status": "success",
            "settings": settings_data,
            "sections": sections_data,
            "menu_categories": categories_data,
            "tour_viewpoints": viewpoints_data,
            "dining_spaces": spaces_data,
            "culinary_pillars": pillars_data,
            "team_members": team_data,
            "private_events": events_data,
            "gallery_items": gallery_data,
            "testimonials": testimonials_data,
            "opening_hours": hours_data,
            "custom_pages": custom_pages_data,
            "blog_posts": blog_posts_data,
            "blog_categories": blog_categories_data,
        })


class CustomPageDetailView(APIView):
    """
    Returns custom page payload by slug for standalone Elementor-style pages.
    """
    def get(self, request, slug):
        page = get_object_or_404(CustomPage, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "page": CustomPageSerializer(page).data
        })


class BlogPostListView(APIView):
    """
    Returns published Mediterranean Journal posts with optional category filtering & search.
    """
    def get(self, request):
        posts = BlogPost.objects.filter(is_published=True)
        category_slug = request.GET.get('category')
        if category_slug:
            posts = posts.filter(category__slug=category_slug)
        search = request.GET.get('search')
        if search:
            posts = posts.filter(Q(title__icontains=search) | Q(excerpt__icontains=search) | Q(content__icontains=search))

        categories = BlogCategory.objects.all()
        return Response({
            "status": "success",
            "count": posts.count(),
            "posts": BlogPostListSerializer(posts, many=True).data,
            "categories": BlogCategorySerializer(categories, many=True).data
        })


class BlogPostDetailView(APIView):
    """
    Returns a single published blog article with related posts.
    """
    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        return Response({
            "status": "success",
            "post": BlogPostDetailSerializer(post).data
        })


class ReservationInquiryCreateView(APIView):
    """
    Receives and validates reservation inquiries.
    """
    def post(self, request):
        serializer = ReservationInquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            return Response({
                "status": "success",
                "message": "Your reservation inquiry has been received. Our concierge will contact you within 2 hours.",
                "reference_code": inquiry.reference_code,
                "inquiry": ReservationInquirySerializer(inquiry).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": "error",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ReservationLookupView(APIView):
    """
    Allows guests to lookup their reservation inquiry status by reference code, phone or email.
    """
    def get(self, request):
        code = request.GET.get('code', '').strip().upper()
        phone = request.GET.get('phone', '').strip()
        email = request.GET.get('email', '').strip().lower()

        if not code and not phone and not email:
            return Response({
                "status": "error",
                "message": "Please provide a reference code, phone number, or email."
            }, status=status.HTTP_400_BAD_REQUEST)

        query = Q()
        if code:
            query |= Q(reference_code__iexact=code)
        if phone:
            query |= Q(phone__icontains=phone)
        if email:
            query |= Q(email__iexact=email)

        inquiries = ReservationInquiry.objects.filter(query)
        if not inquiries.exists():
            return Response({
                "status": "error",
                "message": "No reservation found matching the provided details."
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "status": "success",
            "count": inquiries.count(),
            "reservations": ReservationInquirySerializer(inquiries, many=True).data
        })


class ReservationAvailabilityView(APIView):
    """
    Returns available seating shifts and table capacity for a requested date.
    """
    def get(self, request):
        req_date = request.GET.get('date', timezone.now().strftime('%Y-%m-%d'))
        settings = RestaurantSettings.objects.first()
        max_tables = settings.tables_available_today if settings else 12

        booked_lunch = ReservationInquiry.objects.filter(
            reservation_date=req_date,
            status__in=['pending', 'confirmed', 'seated']
        ).exclude(reservation_time__gte="17:00").count()

        booked_dinner = ReservationInquiry.objects.filter(
            reservation_date=req_date,
            status__in=['pending', 'confirmed', 'seated'],
            reservation_time__gte="17:00"
        ).count()

        return Response({
            "status": "success",
            "date": req_date,
            "max_tables": max_tables,
            "shifts": {
                "lunch": {
                    "time_range": "12:00 - 15:30",
                    "available_tables": max(0, max_tables - booked_lunch),
                    "is_full": booked_lunch >= max_tables
                },
                "dinner": {
                    "time_range": "19:00 - 23:30",
                    "available_tables": max(0, max_tables - booked_dinner),
                    "is_full": booked_dinner >= max_tables
                }
            }
        })


class TourViewpointViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TourViewpoint.objects.all()
    serializer_class = TourViewpointSerializer


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer
