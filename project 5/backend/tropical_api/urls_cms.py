from django.urls import path
from .views import (
    cms_login_view,
    cms_logout_view,
    cms_dashboard_view,
    cms_update_settings,
    cms_update_reservation_status,
    cms_toggle_menu_item,
    cms_update_section,
    cms_save_master_json
)

urlpatterns = [
    path('', cms_dashboard_view, name='cms_dashboard'),
    path('login/', cms_login_view, name='cms_login'),
    path('logout/', cms_logout_view, name='cms_logout'),
    path('settings/update/', cms_update_settings, name='cms_update_settings'),
    path('reservations/<int:pk>/status/', cms_update_reservation_status, name='cms_update_reservation_status'),
    path('menu/<int:pk>/toggle/', cms_toggle_menu_item, name='cms_toggle_menu_item'),
    path('sections/<int:pk>/update/', cms_update_section, name='cms_update_section'),
    path('master-json/save/', cms_save_master_json, name='cms_save_master_json'),
]
