from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicContentView, ReservationViewSet, AdminLoginView, AdminLogoutView, AdminMeView,
    CustomPageDetailView, BlogPostListView, BlogPostDetailView,
    ReservationLookupView, ReservationAvailabilityView, ReservationCreateView
)

router = DefaultRouter()
router.register(r'reservations', ReservationViewSet, basename='api_reservation')

urlpatterns = [
    # CMS Studio Dedicated Multi-Page Endpoints
    path('cms/', include('cms_api.urls_cms')),

    # Public REST API for React Frontend (both /api/ and /api/v1/)
    path('api/content/', PublicContentView.as_view(), name='api_public_content'),
    path('api/v1/content/', PublicContentView.as_view(), name='api_v1_public_content'),

    path('api/reservations/', ReservationCreateView.as_view(), name='api_reservation_create'),
    path('api/v1/reservations/', ReservationCreateView.as_view(), name='api_v1_reservation_create'),

    path('api/reservations/lookup/', ReservationLookupView.as_view(), name='api_reservation_lookup'),
    path('api/v1/reservations/lookup/', ReservationLookupView.as_view(), name='api_v1_reservation_lookup'),

    path('api/reservations/availability/', ReservationAvailabilityView.as_view(), name='api_reservation_avail'),
    path('api/v1/reservations/availability/', ReservationAvailabilityView.as_view(), name='api_v1_reservation_avail'),

    path('api/pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_custom_page_detail'),
    path('api/v1/pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_v1_custom_page_detail'),

    path('api/blog/', BlogPostListView.as_view(), name='api_blog_list'),
    path('api/v1/blog/', BlogPostListView.as_view(), name='api_v1_blog_list'),

    path('api/blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_blog_detail'),
    path('api/v1/blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_v1_blog_detail'),

    path('api/auth/login/', AdminLoginView.as_view(), name='api_admin_login'),
    path('api/auth/logout/', AdminLogoutView.as_view(), name='api_admin_logout'),
    path('api/auth/me/', AdminMeView.as_view(), name='api_admin_me'),
    path('api/', include(router.urls)),
]
