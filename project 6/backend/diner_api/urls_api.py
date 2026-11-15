from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FullDinerContentView,
    ReservationCreateView,
    ReservationLookupView,
    ReservationAvailabilityView,
    ContactCreateView,
    MenuItemViewSet,
    VirtualTourViewpointViewSet,
    CustomPageListView,
    CustomPageDetailView,
    BlogPostListView,
    BlogPostDetailView,
)

router = DefaultRouter()
router.register(r'menu/items', MenuItemViewSet, basename='menu-item')
router.register(r'virtual-tour/viewpoints', VirtualTourViewpointViewSet, basename='tour-viewpoint')

urlpatterns = [
    path('content/', FullDinerContentView.as_view(), name='api_full_content'),
    path('homepage/', FullDinerContentView.as_view(), name='api_homepage'),
    path('blog/', BlogPostListView.as_view(), name='api_blog_list'),
    path('blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_blog_detail'),
    path('pages/', CustomPageListView.as_view(), name='api_custom_pages_list'),
    path('pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_custom_page_detail'),
    path('reservations/', ReservationCreateView.as_view(), name='api_reservation_create'),
    path('reservations/lookup/', ReservationLookupView.as_view(), name='api_reservation_lookup'),
    path('reservations/availability/', ReservationAvailabilityView.as_view(), name='api_reservation_availability'),
    path('contact/', ContactCreateView.as_view(), name='api_contact_create'),
    path('', include(router.urls)),
]
