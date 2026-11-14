from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FullRestaurantContentView, ReservationInquiryCreateView,
    TourViewpointViewSet, MenuItemViewSet
)

router = DefaultRouter()
router.register(r'viewpoints', TourViewpointViewSet, basename='viewpoint')
router.register(r'menu-items', MenuItemViewSet, basename='menuitem')

urlpatterns = [
    path('content/', FullRestaurantContentView.as_view(), name='api_full_content'),
    path('reservations/', ReservationInquiryCreateView.as_view(), name='api_reservations'),
    path('', include(router.urls)),
]
