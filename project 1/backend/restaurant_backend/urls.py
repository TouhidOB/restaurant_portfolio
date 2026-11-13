from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from cms_api.cms_views import (
    cms_login_view,
    cms_logout_view,
    cms_dashboard_view,
    cms_reservation_status_view,
    cms_reservation_delete_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cms_api.urls')),

    # Dedicated Site Admin CMS Studio Web UI
    path('cms/', cms_dashboard_view, name='cms_dashboard'),
    path('cms/login/', cms_login_view, name='cms_login'),
    path('cms/logout/', cms_logout_view, name='cms_logout'),
    path('cms/reservations/<int:reservation_id>/status/<str:new_status>/', cms_reservation_status_view, name='cms_reservation_status'),
    path('cms/reservations/<int:reservation_id>/delete/', cms_reservation_delete_view, name='cms_reservation_delete'),

    # Root redirect to CMS
    path('', lambda request: redirect('/cms/')),
]
