from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .models import SiteConfig, MenuCategory, MenuItem, Reservation
from .serializers import (
    SiteConfigSerializer, MenuCategorySerializer, MenuItemSerializer,
    ReservationSerializer, UserSerializer
)

class PublicContentView(APIView):
    """
    Public read-only endpoint consumed by the React 18 frontend on load.
    Returns the complete 15-section bilingual Bengali Heritage configuration,
    theme tokens, and default language settings.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
        if not config:
            config = SiteConfig.objects.order_by('-updated_at').first()

        if not config:
            return Response({"error": "No configuration published yet"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)


class MenuCategoryViewSet(viewsets.ModelViewSet):
    """
    Bilingual Menu Categories endpoint.
    - Public: GET active categories
    - Admin: Full CRUD
    """
    queryset = MenuCategory.objects.filter(is_active=True).order_by('sort_order', 'id')
    serializer_class = MenuCategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class MenuItemViewSet(viewsets.ModelViewSet):
    """
    Bilingual Menu Items endpoint.
    - Public: GET available dishes
    - Admin: Full CRUD
    """
    queryset = MenuItem.objects.filter(is_available=True).order_by('sort_order', 'id')
    serializer_class = MenuItemSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class ReservationViewSet(viewsets.ModelViewSet):
    """
    Handles customer table reservation inquiries.
    - Public: POST to submit an inquiry
    - Admin: GET, PATCH, DELETE for staff intake
    """
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
        if user and (user.is_staff or user.is_superuser):
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user": UserSerializer(user).data
            })
        return Response({"error": "Invalid administrator credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Successfully signed out of Bengali Heritage Studio"})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
