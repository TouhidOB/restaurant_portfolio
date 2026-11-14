from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import SiteConfig, MenuCategory, MenuItem, Reservation
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer,
    MenuItemSerializer, ReservationSerializer, UserSerializer
)


class PublicContentView(APIView):
    """
    Public endpoint returning the active Botanical Glasshouse Café configuration JSON.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.first()
        if not config:
            return Response({"detail": "Configuration not initialized"}, status=status.HTTP_404_NOT_FOUND)
        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)


class MenuCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuCategory.objects.filter(is_active=True).prefetch_related('items')
    serializer_class = MenuCategorySerializer
    permission_classes = [permissions.AllowAny]


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.filter(is_available=True).select_related('category')
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        cat_slug = self.request.query_params.get('category')
        if cat_slug:
            qs = qs.filter(category__slug=cat_slug)
        featured = self.request.query_params.get('featured')
        if featured in ['true', '1', 'True']:
            qs = qs.filter(is_signature=True)
        return qs


class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all().order_by('-created_at')
    serializer_class = ReservationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user and user.is_staff:
            login(request, user)
            return Response({"success": True, "user": UserSerializer(user).data})
        return Response({"detail": "Invalid credentials or unauthorized staff account"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"success": True, "message": "Logged out successfully"})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
