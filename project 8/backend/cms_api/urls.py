from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicContentView, ReservationViewSet, AdminLoginView, AdminLogoutView, AdminMeView,
    CustomPageDetailView, BlogPostListView, BlogPostDetailView,
    ReservationLookupView, ReservationAvailabilityView
)

router = DefaultRouter()
router.register(r'reservations', ReservationViewSet, basename='api_reservation')

urlpatterns = [
    # Public REST API for React Frontend (both /api/ and /api/v1/)
    path('api/content/', PublicContentView.as_view(), name='api_public_content'),
    path('api/v1/content/', PublicContentView.as_view(), name='api_v1_public_content'),

    # Standalone Custom Pages
    path('api/pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_custom_page'),
    path('api/v1/pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_v1_custom_page'),

    # Smokehouse Journal & Editorial Dispatches
    path('api/blog/', BlogPostListView.as_view(), name='api_blog_list'),
    path('api/v1/blog/', BlogPostListView.as_view(), name='api_v1_blog_list'),
    path('api/blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_blog_detail'),
    path('api/v1/blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_v1_blog_detail'),

    # Shift Availability & Reference Lookup
    path('api/reservations/availability/', ReservationAvailabilityView.as_view(), name='api_reservation_availability'),
    path('api/v1/reservations/availability/', ReservationAvailabilityView.as_view(), name='api_v1_reservation_availability'),
    path('api/reservations/lookup/', ReservationLookupView.as_view(), name='api_reservation_lookup'),
    path('api/v1/reservations/lookup/', ReservationLookupView.as_view(), name='api_v1_reservation_lookup'),

    # Authentication
    path('api/auth/login/', AdminLoginView.as_view(), name='api_admin_login'),
    path('api/auth/logout/', AdminLogoutView.as_view(), name='api_admin_logout'),
    path('api/auth/me/', AdminMeView.as_view(), name='api_admin_me'),

    # Router URLs
    path('api/', include(router.urls)),
    path('api/v1/', include(router.urls)),

    # CMS views included from cms_urls
    path('', include('cms_api.urls_cms')),
]
