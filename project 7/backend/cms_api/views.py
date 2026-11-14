from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .models import SiteConfig, Reservation
from .serializers import SiteConfigSerializer, ReservationSerializer, UserSerializer

class PublicContentView(APIView):
    """
    Public read-only endpoint consumed by the React 18 frontend on load.
    Returns the complete 15-section Parisian configuration and design tokens.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
        if not config:
            # Fallback to any config
            config = SiteConfig.objects.order_by('-updated_at').first()

        if not config:
            return Response({"error": "No configuration published yet"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)


class ReservationViewSet(viewsets.ModelViewSet):
    """
    Handles reservations.
    - POST is open to all visitors to submit reservations from S13 / Reservation Modal.
    - GET, PUT, PATCH, DELETE are restricted to authenticated admin/staff users.
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
        return Response({"error": "Invalid administrative credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Successfully logged out"})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
