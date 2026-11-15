from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FullRestaurantContentView,
    ReservationInquiryCreateView,
    ReservationLookupView,
    ReservationAvailabilityView,
    CustomPageDetailView,
    BlogPostListView,
    BlogPostDetailView,
    TourViewpointViewSet,
    MenuItemViewSet
)

router = DefaultRouter()
router.register(r'viewpoints', TourViewpointViewSet, basename='viewpoint')
router.register(r'menu-items', MenuItemViewSet, basename='menuitem')

urlpatterns = [
    path('content/', FullRestaurantContentView.as_view(), name='api_full_content'),
    path('pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_custom_page_detail'),
    path('blog/', BlogPostListView.as_view(), name='api_blog_list'),
    path('blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_blog_detail'),
    path('reservations/', ReservationInquiryCreateView.as_view(), name='api_reservations'),
    path('reservations/lookup/', ReservationLookupView.as_view(), name='api_reservations_lookup'),
    path('reservations/availability/', ReservationAvailabilityView.as_view(), name='api_reservations_availability'),
    path('', include(router.urls)),
]
