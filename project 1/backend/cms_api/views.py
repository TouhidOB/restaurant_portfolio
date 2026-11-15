from rest_framework import status, permissions, viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost
from .serializers import (
    SiteConfigSerializer,
    ReservationSerializer,
    UserSerializer,
    CustomPageSerializer,
    CustomPageNavSerializer,
    BlogCategorySerializer,
    BlogPostSerializer,
)


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
    Includes custom standalone pages, blog posts, and blog categories.
    """
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get(self, request):
        active_config = SiteConfig.objects.filter(is_published=True).first()
        content_dict = active_config.content_json if active_config else {}

        custom_pages = CustomPage.objects.filter(is_published=True).order_by('nav_order', '-created_at')
        blog_posts = BlogPost.objects.filter(is_published=True).select_related('category')[:8]
        blog_categories = BlogCategory.objects.all()

        return Response({
            'exists': bool(active_config),
            'restaurant_name': active_config.restaurant_name if active_config else 'AURELIA',
            'content': content_dict,
            'custom_pages': CustomPageNavSerializer(custom_pages, many=True).data,
            'blog_posts': BlogPostSerializer(blog_posts, many=True, context={'request': request}).data,
            'blog_categories': BlogCategorySerializer(blog_categories, many=True).data,
            'updated_at': active_config.updated_at if active_config else None,
        })

    def post(self, request):
        data = request.data
        if not data:
            return Response({'error': 'No content provided.'}, status=status.HTTP_400_BAD_REQUEST)

        restaurant_name = data.get('name', 'AURELIA')

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
        if self.action in ['create', 'lookup', 'availability']:
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
            'message': 'Table reservation request received. Your request is pending restaurant approval.',
        }, status=status.HTTP_201_CREATED)


class ReservationLookupView(APIView):
    """
    Allows customers to verify their booking status using their unique reference code or email.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        code = request.query_params.get('code', '').strip().upper()
        email = request.query_params.get('email', '').strip().lower()

        if not code and not email:
            return Response(
                {'error': 'Please provide either a booking reference code or the booking email address.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        qs = Reservation.objects.all()
        if code:
            res = qs.filter(reference_code=code).first()
            if not res and code.isdigit():
                res = qs.filter(pk=int(code)).first()
            if res:
                return Response({'success': True, 'reservation': ReservationSerializer(res).data})
            return Response({'error': f'No reservation found for reference code: {code}'}, status=status.HTTP_404_NOT_FOUND)

        if email:
            results = qs.filter(email__iexact=email).order_by('-date', '-created_at')
            if results.exists():
                return Response({'success': True, 'reservations': ReservationSerializer(results, many=True).data})
            return Response({'error': f'No reservations registered under email: {email}'}, status=status.HTTP_404_NOT_FOUND)


class ReservationAvailabilityView(APIView):
    """
    Returns available seating zones, lunch and dinner slots, and booking shifts.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        date_str = request.query_params.get('date', timezone.now().strftime('%Y-%m-%d'))
        lunch_slots = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM']
        dinner_slots = ['06:00 PM', '06:30 PM', '07:15 PM', '08:00 PM', '08:45 PM', '09:30 PM', '10:15 PM']
        seating_zones = [
            {'id': 'Art Deco Grand Salon', 'name': 'Art Deco Grand Salon (Center dining hall with crystal chandeliers)'},
            {'id': 'Champagne Parlour Vault', 'name': 'Champagne Parlour Vault (Plush velvet banquette with private vintage cart)'},
            {'id': 'Emerald Garden Terrace', 'name': 'Emerald Garden Terrace (Alfresco botanical dining with Gulshan skyline views)'},
            {'id': 'Private Cellar Dining', 'name': 'Private Cellar Dining (Exclusive sommelier vault for 6+ guests)'},
        ]
        occasions = [
            {'id': 'casual', 'name': 'Casual Fine Dining'},
            {'id': 'anniversary', 'name': 'Anniversary Celebration 🥂'},
            {'id': 'birthday', 'name': 'Birthday Gala 🎉'},
            {'id': 'champagne', 'name': 'Champagne Reception 🍾'},
            {'id': 'business', 'name': 'Executive Corporate Dinner 💼'},
        ]

        return Response({
            'success': True,
            'date': date_str,
            'lunch_slots': lunch_slots,
            'dinner_slots': dinner_slots,
            'seating_zones': seating_zones,
            'occasions': occasions,
        })


class CustomPageDetailView(generics.RetrieveAPIView):
    """
    Returns full block data for a dynamic custom page.
    """
    permission_classes = [permissions.AllowAny]
    queryset = CustomPage.objects.filter(is_published=True)
    serializer_class = CustomPageSerializer
    lookup_field = 'slug'


class BlogPostListView(generics.ListAPIView):
    """
    Public listing of published editorial journal posts.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        qs = BlogPost.objects.filter(is_published=True).select_related('category')
        cat = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        featured = self.request.query_params.get('featured')

        if cat and cat.upper() != 'ALL':
            qs = qs.filter(category__slug=cat)
        if search:
            q = search.strip()
            qs = qs.filter(title__icontains=q) | qs.filter(excerpt__icontains=q)
        if featured == 'true':
            qs = qs.filter(is_featured=True)

        return qs.order_by('-published_at', '-created_at')


class BlogPostDetailView(APIView):
    """
    Public detail of an article with view count increment and related posts.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, slug):
        post = get_object_or_404(BlogPost, slug=slug, is_published=True)
        # Increment views
        post.views_count += 1
        post.save(update_fields=['views_count'])

        related_posts = BlogPost.objects.filter(is_published=True).exclude(pk=post.pk)
        if post.category:
            related_posts = related_posts.filter(category=post.category)

        data = BlogPostSerializer(post, context={'request': request}).data
        data['related_posts'] = BlogPostSerializer(related_posts[:3], many=True, context={'request': request}).data
        return Response(data)
