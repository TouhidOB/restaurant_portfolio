from rest_framework import status, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db.models import Q
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost
from .serializers import (
    SiteConfigSerializer,
    ReservationSerializer,
    UserSerializer,
    CustomPageSerializer,
    BlogCategorySerializer,
    BlogPostListSerializer,
    BlogPostDetailSerializer,
)


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
    GET: Public endpoint for visitors to fetch active configuration,
    custom pages, and blog journal articles.
    POST: Admin-only endpoint to save and publish website updates.
    """
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get(self, request):
        active_config = SiteConfig.objects.filter(is_published=True).first()
        custom_pages = CustomPage.objects.filter(is_published=True)
        blog_posts = BlogPost.objects.filter(is_published=True)
        blog_categories = BlogCategory.objects.all()

        resp = {
            'exists': bool(active_config),
            'restaurant_name': active_config.restaurant_name if active_config else 'ENSO 圓相',
            'content': active_config.content_json if active_config else None,
            'updated_at': active_config.updated_at if active_config else None,
            'custom_pages': CustomPageSerializer(custom_pages, many=True).data,
            'blog_posts': BlogPostListSerializer(blog_posts, many=True).data,
            'blog_categories': BlogCategorySerializer(blog_categories, many=True).data,
        }
        return Response(resp)

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
    Public visitors can POST a reservation inquiry with shift & seating preferences.
    Site admin can list, inspect, and update inquiry approvals.
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
            'reference_code': reservation.reference_code,
            'inquiry_id': reservation.reference_code,
            'reservation': serializer.data,
            'message': f'Thank you, {reservation.full_name}. Your reservation [{reservation.reference_code}] is held pending confirmation from the Maitre D’.',
        }, status=status.HTTP_201_CREATED)


class ReservationLookupView(APIView):
    """
    Public endpoint: Look up reservation status by reference code or guest email.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        code = request.GET.get('code', '').strip().upper()
        email = request.GET.get('email', '').strip().lower()

        if not code and not email:
            return Response(
                {'error': 'Please provide either a booking reference code (e.g. ENS-4B9F2A) or guest email.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        q = Q()
        if code:
            q |= Q(reference_code__iexact=code)
        if email:
            q |= Q(email__iexact=email)

        reservations = Reservation.objects.filter(q)
        if not reservations.exists():
            return Response({
                'success': False,
                'error': f'No reservation found for {"code: " + code if code else "email: " + email}.'
            }, status=status.HTTP_404_NOT_FOUND)

        if code and reservations.count() == 1:
            res_obj = reservations.first()
            return Response({
                'success': True,
                'reservation': ReservationSerializer(res_obj).data
            })

        return Response({
            'success': True,
            'count': reservations.count(),
            'reservations': ReservationSerializer(reservations, many=True).data
        })


class ReservationAvailabilityView(APIView):
    """
    Public endpoint: Check covers / capacity for a given date and shift (lunch vs dinner).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        date_str = request.GET.get('date', '').strip()
        shift = request.GET.get('shift', 'dinner').strip().lower()

        if not date_str:
            return Response({'error': 'date parameter required (YYYY-MM-DD)'}, status=status.HTTP_400_BAD_REQUEST)

        existing = Reservation.objects.filter(date=date_str, shift=shift).exclude(status='cancelled')
        active_covers = sum(int(str(r.guests).split()[0]) if str(r.guests).split()[0].isdigit() else 2 for r in existing)

        MAX_COVERS = 40  # Zen pavilion capacity per shift
        available_covers = max(0, MAX_COVERS - active_covers)

        return Response({
            'date': date_str,
            'shift': shift,
            'total_capacity': MAX_COVERS,
            'booked_covers': active_covers,
            'available_covers': available_covers,
            'is_sold_out': available_covers <= 0,
        })


class CustomPageDetailView(APIView):
    """
    Public endpoint: Get standalone dynamic page by slug.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        try:
            page_obj = CustomPage.objects.get(slug=slug, is_published=True)
            return Response(CustomPageSerializer(page_obj).data)
        except CustomPage.DoesNotExist:
            return Response(
                {'error': f"Custom page '{slug}' not found or is currently in draft mode."},
                status=status.HTTP_404_NOT_FOUND
            )


class BlogPostListView(APIView):
    """
    Public endpoint: List published editorial articles with category and search filter.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        queryset = BlogPost.objects.filter(is_published=True)
        cat_slug = request.GET.get('category', '').strip()
        search_query = request.GET.get('search', '').strip()

        if cat_slug and cat_slug.upper() != 'ALL':
            queryset = queryset.filter(category__slug=cat_slug)

        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(excerpt__icontains=search_query) |
                Q(content__icontains=search_query) |
                Q(author_name__icontains=search_query)
            )

        serializer = BlogPostListSerializer(queryset, many=True)
        return Response(serializer.data)


class BlogPostDetailView(APIView):
    """
    Public endpoint: Retrieve article detail and related recommendations by slug.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        try:
            post_obj = BlogPost.objects.get(slug=slug, is_published=True)
            return Response(BlogPostDetailSerializer(post_obj).data)
        except BlogPost.DoesNotExist:
            return Response(
                {'error': f"Dispatch '{slug}' not found in the Zen journal archives."},
                status=status.HTTP_404_NOT_FOUND
            )
