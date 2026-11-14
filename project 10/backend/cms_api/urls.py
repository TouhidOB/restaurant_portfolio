from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicContentView, MenuCategoryViewSet, MenuItemViewSet,
    ReservationViewSet, AdminLoginView, AdminLogoutView, AdminMeView
)
from .cms_views import (
    cms_dashboard_view, cms_login_view, cms_logout_view,
    cms_reservation_status_view, cms_reservation_delete_view
)

router = DefaultRouter()
router.register(r'menu/categories', MenuCategoryViewSet, basename='api_menu_category')
router.register(r'menu/items', MenuItemViewSet, basename='api_menu_item')
router.register(r'reservations', ReservationViewSet, basename='api_reservation')

urlpatterns = [
    # Public REST APIs for Decoupled React Frontend
    path('api/content/', PublicContentView.as_view(), name='api_public_content'),
    path('api/public-content/', PublicContentView.as_view(), name='api_public_content_alias'),
    path('api/auth/login/', AdminLoginView.as_view(), name='api_admin_login'),
    path('api/auth/logout/', AdminLogoutView.as_view(), name='api_admin_logout'),
    path('api/auth/me/', AdminMeView.as_view(), name='api_admin_me'),
    path('api/', include(router.urls)),

    # Bengali Heritage CMS Studio Web UI (Admin Only)
    path('cms/', cms_dashboard_view, name='cms_dashboard'),
    path('cms/login/', cms_login_view, name='cms_login'),
    path('cms/logout/', cms_logout_view, name='cms_logout'),
    path('cms/reservations/<int:res_id>/status/', cms_reservation_status_view, name='cms_reservation_status'),
    path('cms/reservations/<int:res_id>/delete/', cms_reservation_delete_view, name='cms_reservation_delete'),
]
