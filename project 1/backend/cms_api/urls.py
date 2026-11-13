from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AdminLoginView,
    AdminLogoutView,
    AdminMeView,
    PublicContentView,
    ReservationViewSet,
)

router = DefaultRouter()
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = [
    # Auth endpoints
    path('auth/login/', AdminLoginView.as_view(), name='admin_login'),
    path('auth/logout/', AdminLogoutView.as_view(), name='admin_logout'),
    path('auth/me/', AdminMeView.as_view(), name='admin_me'),

    # CMS Content
    path('content/', PublicContentView.as_view(), name='public_content'),

    # Router (reservations)
    path('', include(router.urls)),
]
