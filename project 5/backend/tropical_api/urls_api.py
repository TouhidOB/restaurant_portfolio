from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FullTropicalContentView,
    ReservationCreateView,
    MenuItemViewSet,
    VirtualTourViewpointViewSet
)

router = DefaultRouter()
router.register(r'menu-items', MenuItemViewSet, basename='menu-item')
router.register(r'viewpoints', VirtualTourViewpointViewSet, basename='viewpoint')

urlpatterns = [
    path('content/', FullTropicalContentView.as_view(), name='api_content'),
    path('homepage/', FullTropicalContentView.as_view(), name='api_homepage'),
    path('reservations/', ReservationCreateView.as_view(), name='api_reservations'),
    path('', include(router.urls)),
]
