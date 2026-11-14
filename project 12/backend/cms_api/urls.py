from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicContentView, MenuCategoryViewSet, MenuItemViewSet,
    ReservationViewSet, AdminLoginView, AdminLogoutView, AdminMeView
)

router = DefaultRouter()
router.register(r'menu/categories', MenuCategoryViewSet, basename='menu-categories')
router.register(r'menu/items', MenuItemViewSet, basename='menu-items')
router.register(r'reservations', ReservationViewSet, basename='reservations')

urlpatterns = [
    path('content/', PublicContentView.as_view(), name='api-public-content'),
    path('admin/login/', AdminLoginView.as_view(), name='api-admin-login'),
    path('admin/logout/', AdminLogoutView.as_view(), name='api-admin-logout'),
    path('admin/me/', AdminMeView.as_view(), name='api-admin-me'),
    path('', include(router.urls)),
]
