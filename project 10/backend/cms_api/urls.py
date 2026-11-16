from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicContentView, MenuCategoryViewSet, MenuItemViewSet,
    ReservationViewSet, AdminLoginView, AdminLogoutView, AdminMeView,
    CustomPageDetailView, BlogPostListView, BlogPostDetailView,
    ReservationLookupView, ReservationAvailabilityView, ReservationCreateView
)

router = DefaultRouter()
router.register(r'menu/categories', MenuCategoryViewSet, basename='api_menu_category')
router.register(r'menu/items', MenuItemViewSet, basename='api_menu_item')
router.register(r'reservations', ReservationViewSet, basename='api_reservation')

urlpatterns = [
    # Public REST APIs for Decoupled React Frontend
    path('api/content/', PublicContentView.as_view(), name='api_public_content'),
    path('api/public-content/', PublicContentView.as_view(), name='api_public_content_alias'),
    path('api/pages/<slug:slug>/', CustomPageDetailView.as_view(), name='api_custom_page_detail'),
    path('api/blog/', BlogPostListView.as_view(), name='api_blog_list'),
    path('api/blog/<slug:slug>/', BlogPostDetailView.as_view(), name='api_blog_detail'),
    path('api/reservations/lookup/', ReservationLookupView.as_view(), name='api_reservation_lookup'),
    path('api/reservations/availability/', ReservationAvailabilityView.as_view(), name='api_reservation_availability'),
    path('api/reservations/create/', ReservationCreateView.as_view(), name='api_reservation_create_custom'),

    # Admin Auth APIs
    path('api/auth/login/', AdminLoginView.as_view(), name='api_admin_login'),
    path('api/auth/logout/', AdminLogoutView.as_view(), name='api_admin_logout'),
    path('api/auth/me/', AdminMeView.as_view(), name='api_admin_me'),
    path('api/', include(router.urls)),

    # Bengali Heritage Dedicated CMS Studio Multi-Page Routes
    path('cms/', include('cms_api.urls_cms')),
]
