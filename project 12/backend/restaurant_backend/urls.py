from django.contrib import admin
from django.urls import path, include
from cms_api.cms_views import cms_login_view, cms_logout_view, cms_dashboard_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cms_api.urls')),
    path('cms/login/', cms_login_view, name='cms_login'),
    path('cms/logout/', cms_logout_view, name='cms_logout'),
    path('cms/', cms_dashboard_view, name='cms_dashboard'),
]
