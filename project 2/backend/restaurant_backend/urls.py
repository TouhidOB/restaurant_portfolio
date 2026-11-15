from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('admin/', admin.site.urls),

    # REST APIs (support both /api/ and /api/v1/)
    path('api/v1/', include('cms_api.urls')),
    path('api/', include('cms_api.urls')),

    # Dedicated Japanese Zen CMS Studio Web UI
    path('cms/', include('cms_api.urls_cms')),

    # Root redirect to CMS
    path('', lambda request: redirect('/cms/')),
]
