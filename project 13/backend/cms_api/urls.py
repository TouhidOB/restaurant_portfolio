from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicContentView, MenuCategoryViewSet, MenuItemViewSet,
    TourViewSet, GalleryViewSet, ReservationViewSet,
    AdminLoginView, AdminLogoutView, AdminMeView,
    CustomPageDetailView, BlogPostListView, BlogPostDetailView,
    ReservationLookupView, ReservationAvailabilityView
)

router = DefaultRouter()
router.register(r'menu/categories', MenuCategoryViewSet, basename='menu-categories')
router.register(r'menu/items', MenuItemViewSet, basename='menu-items')
router.register(r'tour', TourViewSet, basename='tour-viewpoints')
router.register(r'gallery', GalleryViewSet, basename='gallery-items')
router.register(r'reservations', ReservationViewSet, basename='reservations')

urlpatterns = [
    path('content/', PublicContentView.as_view(), name='api-public-content'),
    path('pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api-custom-page-detail'),
    path('blog/', BlogPostListView.as_view(), name='api-blog-list'),
    path('blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api-blog-detail'),
    path('reservations/lookup/', ReservationLookupView.as_view(), name='api-reservation-lookup'),
    path('reservations/availability/', ReservationAvailabilityView.as_view(), name='api-reservation-availability'),
    path('auth/login/', AdminLoginView.as_view(), name='api-admin-login'),
    path('auth/logout/', AdminLogoutView.as_view(), name='api-admin-logout'),
    path('auth/me/', AdminMeView.as_view(), name='api-admin-me'),
    path('', include(router.urls)),
]
