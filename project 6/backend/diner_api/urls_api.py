from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FullDinerContentView,
    ReservationCreateView,
    ContactCreateView,
    MenuItemViewSet,
    VirtualTourViewpointViewSet,
)

router = DefaultRouter()
router.register(r'menu/items', MenuItemViewSet, basename='menu-item')
router.register(r'virtual-tour/viewpoints', VirtualTourViewpointViewSet, basename='tour-viewpoint')

urlpatterns = [
    path('content/', FullDinerContentView.as_view(), name='api_full_content'),
    path('homepage/', FullDinerContentView.as_view(), name='api_homepage'),
    path('reservations/', ReservationCreateView.as_view(), name='api_reservation_create'),
    path('contact/', ContactCreateView.as_view(), name='api_contact_create'),
    path('', include(router.urls)),
]
