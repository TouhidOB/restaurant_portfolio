from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AdminLoginView,
    AdminLogoutView,
    AdminMeView,
    PublicContentView,
    ReservationViewSet,
    ReservationLookupView,
    ReservationAvailabilityView,
    CustomPageDetailView,
    BlogPostListView,
    BlogPostDetailView,
)

router = DefaultRouter()
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = [
    # Auth endpoints
    path('auth/login/', AdminLoginView.as_view(), name='admin_login'),
    path('auth/logout/', AdminLogoutView.as_view(), name='admin_logout'),
    path('auth/me/', AdminMeView.as_view(), name='admin_me'),

    # CMS Content
    path('content/', PublicContentView.as_view(), name='public_content'),

    # Table Reservations Extra Endpoints
    path('reservations/lookup/', ReservationLookupView.as_view(), name='reservation_lookup'),
    path('reservations/availability/', ReservationAvailabilityView.as_view(), name='reservation_availability'),

    # Custom Standalone Pages
    path('pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_custom_page_detail'),

    # Blog & Editorial Journal
    path('blog/', BlogPostListView.as_view(), name='api_blog_list'),
    path('blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_blog_detail'),

    # Router (reservations CRUD)
    path('', include(router.urls)),
]
