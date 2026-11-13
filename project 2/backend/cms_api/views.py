from rest_framework import status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import SiteConfig, Reservation
from .serializers import SiteConfigSerializer, ReservationSerializer, UserSerializer


class AdminLoginView(APIView):
    """
    Authenticate site admin and return token for headless API client.
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
                {'error': 'Access denied: Only site administrators can manage the Zen CMS.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data,
            'message': f'Welcome back, {user.username}. Admin session active.',
        })


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
        except Exception:
            pass
        return Response({'message': 'Logged out successfully.'})


class AdminMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not (request.user.is_staff or request.user.is_superuser):
            return Response({'error': 'Not an admin'}, status=status.HTTP_403_FORBIDDEN)
        return Response(UserSerializer(request.user).data)


class PublicContentView(APIView):
    """
    GET: Public endpoint for visitors to fetch active Japanese Zen configuration.
    POST: Admin-only endpoint to save and publish website updates.
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
                'message': 'No custom CMS configuration published yet.',
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

        restaurant_name = data.get('name', 'ENSO 圓相')

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
            'message': 'Japanese Zen website content successfully saved and published.',
            'updated_at': config_obj.updated_at,
            'updated_by': request.user.username,
        })


class ReservationViewSet(viewsets.ModelViewSet):
    """
    Public visitors can POST a reservation inquiry.
    Only authenticated site admin can list, inspect, and update inquiries.
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
            'inquiry_id': f'ZEN-{reservation.id:04d}',
            'reservation': serializer.data,
            'message': 'Thank you for your inquiry. Our concierge will contact you to confirm your table arrangement.',
        }, status=status.HTTP_201_CREATED)
