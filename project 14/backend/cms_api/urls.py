from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PublicContentView, CustomPageDetailView, BlogPostListView, BlogPostDetailView,
    ReservationLookupView, ReservationAvailabilityView,
    MenuCategoryViewSet, MenuItemViewSet, TourViewSet, GalleryViewSet, ReservationViewSet,
    AuthLoginView, AuthLogoutView, AuthMeView
)

router = DefaultRouter()
router.register(r'menu/categories', MenuCategoryViewSet, basename='menu-categories')
router.register(r'menu/items', MenuItemViewSet, basename='menu-items')
router.register(r'tour', TourViewSet, basename='tour')
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'reservations', ReservationViewSet, basename='reservations')

urlpatterns = [
    # REST API endpoints
    path('api/content/', PublicContentView.as_view(), name='api-content'),
    path('api/pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api-custom-page-detail'),
    path('api/blog/', BlogPostListView.as_view(), name='api-blog-list'),
    path('api/blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api-blog-detail'),
    path('api/reservations/lookup/', ReservationLookupView.as_view(), name='api-reservation-lookup'),
    path('api/reservations/availability/', ReservationAvailabilityView.as_view(), name='api-reservation-availability'),
    path('api/auth/login/', AuthLoginView.as_view(), name='api-auth-login'),
    path('api/auth/logout/', AuthLogoutView.as_view(), name='api-auth-logout'),
    path('api/auth/me/', AuthMeView.as_view(), name='api-auth-me'),
    path('api/', include(router.urls)),

    # Dedicated CMS Studio
    path('cms/', include('cms_api.urls_cms')),
]
