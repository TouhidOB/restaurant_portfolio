from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser']


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = [
            'id', 'title', 'slug', 'meta_description', 'theme_style',
            'is_published', 'show_in_navigation', 'nav_order', 'blocks',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.IntegerField(source='posts.count', read_only=True)

    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'display_order', 'post_count']


class BlogPostListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    resolved_cover = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug',
            'author_name', 'author_role', 'author_avatar',
            'cover_image', 'resolved_cover', 'excerpt',
            'read_time_minutes', 'is_featured', 'is_published', 'published_at'
        ]

    def get_resolved_cover(self, obj):
        return obj.cover_image or 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop'


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    resolved_cover = serializers.SerializerMethodField()
    related_posts = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug',
            'author_name', 'author_role', 'author_avatar',
            'cover_image', 'resolved_cover', 'excerpt', 'content',
            'read_time_minutes', 'is_featured', 'is_published', 'published_at',
            'created_at', 'updated_at', 'related_posts'
        ]

    def get_resolved_cover(self, obj):
        return obj.cover_image or 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop'

    def get_related_posts(self, obj):
        related = BlogPost.objects.filter(is_published=True).exclude(id=obj.id)
        if obj.category:
            cat_posts = related.filter(category=obj.category)[:3]
            if cat_posts.count() >= 2:
                return BlogPostListSerializer(cat_posts, many=True).data
        return BlogPostListSerializer(related[:3], many=True).data


class ReservationSerializer(serializers.ModelSerializer):
    is_dinner_shift = serializers.BooleanField(read_only=True)
    # Support camelCase aliases
    specialRequests = serializers.CharField(source='special_requests', required=False, allow_blank=True, write_only=True)
    dietaryNotes = serializers.CharField(source='dietary_notes', required=False, allow_blank=True, write_only=True)
    seatingArea = serializers.CharField(source='seating_area', required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Reservation
        fields = [
            'id',
            'reference_code',
            'full_name',
            'phone',
            'email',
            'date',
            'time',
            'shift',
            'is_dinner_shift',
            'guests',
            'occasion',
            'experience',
            'seating_area',
            'table_assigned',
            'dietary_notes',
            'special_requests',
            'status',
            'internal_notes',
            'created_at',
            'updated_at',
            # aliases
            'specialRequests',
            'dietaryNotes',
            'seatingArea',
        ]
        read_only_fields = ['id', 'reference_code', 'is_dinner_shift', 'created_at', 'updated_at']


class SiteConfigSerializer(serializers.ModelSerializer):
    updated_by_username = serializers.ReadOnlyField(source='updated_by.username')

    class Meta:
        model = SiteConfig
        fields = [
            'id',
            'restaurant_name',
            'content_json',
            'is_published',
            'created_at',
            'updated_at',
            'updated_by_username',
        ]
