from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FullTropicalContentView,
    ReservationCreateView,
    ReservationLookupView,
    ReservationAvailabilityView,
    CustomPageDetailView,
    BlogPostListView,
    BlogPostDetailView,
    MenuItemViewSet,
    VirtualTourViewpointViewSet
)

router = DefaultRouter()
router.register(r'menu-items', MenuItemViewSet, basename='menu-item')
router.register(r'viewpoints', VirtualTourViewpointViewSet, basename='viewpoint')

urlpatterns = [
    path('content/', FullTropicalContentView.as_view(), name='api_content'),
    path('homepage/', FullTropicalContentView.as_view(), name='api_homepage'),
    path('pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_page_detail'),
    path('blog/', BlogPostListView.as_view(), name='api_blog_list'),
    path('blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_blog_detail'),
    path('reservations/', ReservationCreateView.as_view(), name='api_reservations'),
    path('reservations/lookup/', ReservationLookupView.as_view(), name='api_reservation_lookup'),
    path('reservations/availability/', ReservationAvailabilityView.as_view(), name='api_reservation_availability'),
    path('', include(router.urls)),
]
