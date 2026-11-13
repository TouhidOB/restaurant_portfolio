from rest_framework import status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import SiteConfig, Reservation
from .serializers import SiteConfigSerializer, ReservationSerializer, UserSerializer

class AdminLoginView(APIView):
    """
    Authenticate site admin and return token.
    Only staff or superusers can log in to the CMS studio.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '')

        if not username or not password:
            return Response(
                {'error': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(username=username, password=password)

        if not user:
            return Response(
                {'error': 'Invalid credentials. Please verify your admin username and password.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not (user.is_staff or user.is_superuser):
            return Response(
                {'error': 'Access denied. Only site administrators can access the CMS Studio.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data,
            'message': f'Welcome back, {user.username}. Admin session active.',
        })


class AdminLogoutView(APIView):
    """
    Invalidate admin token upon logout.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
        except Exception:
            pass
        return Response({'message': 'Logged out successfully.'})


class AdminMeView(APIView):
    """
    Check if the current user has valid admin session.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not (request.user.is_staff or request.user.is_superuser):
            return Response({'error': 'Not an admin'}, status=status.HTTP_403_FORBIDDEN)
        return Response(UserSerializer(request.user).data)


class PublicContentView(APIView):
    """
    GET: Public endpoint for visitors and customers to fetch the active CMS content.
    POST / PUT: Admin-only endpoint to save and publish website updates.
    """
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get(self, request):
        active_config = SiteConfig.objects.filter(is_published=True).first()
        if not active_config:
            return Response({
                'exists': False,
                'content': None,
                'message': 'No custom CMS configuration published yet; using template defaults.',
            })

        return Response({
            'exists': True,
            'restaurant_name': active_config.restaurant_name,
            'content': active_config.content_json,
            'updated_at': active_config.updated_at,
        })

    def post(self, request):
        data = request.data
        if not data:
            return Response({'error': 'No content provided.'}, status=status.HTTP_400_BAD_REQUEST)

        restaurant_name = data.get('name', 'AURELIA')

        # Update or create the active site configuration
        config_obj = SiteConfig.objects.filter(is_published=True).first()
        if not config_obj:
            config_obj = SiteConfig(
                restaurant_name=restaurant_name,
                content_json=data,
                is_published=True,
                updated_by=request.user,
            )
        else:
            config_obj.restaurant_name = restaurant_name
            config_obj.content_json = data
            config_obj.updated_by = request.user

        config_obj.save()

        return Response({
            'success': True,
            'message': 'Website content successfully updated and published to Django backend.',
            'updated_at': config_obj.updated_at,
            'updated_by': request.user.username,
        })


class ReservationViewSet(viewsets.ModelViewSet):
    """
    Public visitors can POST a reservation inquiry.
    Only authenticated site admin can list, inspect, and update reservations.
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reservation = serializer.save()
        return Response({
            'success': True,
            'inquiry_id': f'AUR-{reservation.id:04d}',
            'reservation': serializer.data,
            'message': 'Reservation request received. Our concierge will contact you to confirm.',
        }, status=status.HTTP_201_CREATED)
