from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cms_api.urls')),
    path('cms/', include('cms_api.urls_cms')),
]
