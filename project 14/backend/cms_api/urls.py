from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PublicContentView, MenuCategoryViewSet, MenuItemViewSet,
    TourViewSet, GalleryViewSet, ReservationViewSet,
    AuthLoginView, AuthLogoutView, AuthMeView
)
from .cms_views import (
    cms_login, cms_logout, cms_dashboard,
    update_general_config, update_json_config,
    add_menu_item, delete_menu_item,
    add_viewpoint, delete_viewpoint,
    update_reservation_status, delete_reservation
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
    path('api/auth/login/', AuthLoginView.as_view(), name='api-auth-login'),
    path('api/auth/logout/', AuthLogoutView.as_view(), name='api-auth-logout'),
    path('api/auth/me/', AuthMeView.as_view(), name='api-auth-me'),
    path('api/', include(router.urls)),

    # Custom CMS Studio Endpoints
    path('cms/', cms_dashboard, name='cms_dashboard'),
    path('cms/login/', cms_login, name='cms_login'),
    path('cms/logout/', cms_logout, name='cms_logout'),
    
    # CMS Actions
    path('cms/action/update-config/', update_general_config, name='cms_update_config'),
    path('cms/action/update-json/', update_json_config, name='cms_update_json'),
    path('cms/action/add-menu-item/', add_menu_item, name='cms_add_menu_item'),
    path('cms/action/delete-menu-item/<int:item_id>/', delete_menu_item, name='cms_delete_menu_item'),
    path('cms/action/add-viewpoint/', add_viewpoint, name='cms_add_viewpoint'),
    path('cms/action/delete-viewpoint/<int:vp_id>/', delete_viewpoint, name='cms_delete_viewpoint'),
    path('cms/action/reservation-status/<int:res_id>/', update_reservation_status, name='cms_res_status'),
    path('cms/action/delete-reservation/<int:res_id>/', delete_reservation, name='cms_del_res'),
]
