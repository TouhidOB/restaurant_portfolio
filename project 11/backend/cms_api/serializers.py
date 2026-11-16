from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, MenuCategory, MenuItem, Reservation, CustomPage, BlogCategory, BlogPost


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = ['id', 'cafe_name', 'content_json', 'created_at', 'updated_at']


class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = MenuItem
        fields = [
            'id', 'category', 'category_name', 'category_slug',
            'name', 'description', 'price', 'currency', 'image',
            'botanical_notes', 'dietary_tags', 'temperature',
            'is_signature', 'is_seasonal', 'is_available', 'sort_order'
        ]


class MenuCategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = MenuCategory
        fields = ['id', 'name', 'slug', 'description', 'sort_order', 'is_active', 'items']


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

    def to_internal_value(self, data):
        normalized = data.copy() if hasattr(data, 'copy') else dict(data)
        # Handle guest name aliases
        if 'name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized.pop('name')
        if 'guest_name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized.pop('guest_name')

        # Handle date aliases
        if 'date' in normalized and 'reservation_date' not in normalized:
            normalized['reservation_date'] = normalized.pop('date')

        # Handle time aliases
        if 'time' in normalized and 'reservation_time' not in normalized:
            normalized['reservation_time'] = normalized.pop('time')
        if 'time_slot' in normalized and 'reservation_time' not in normalized:
            normalized['reservation_time'] = normalized.pop('time_slot')

        # Handle guests aliases
        if 'party_size' in normalized and 'guests' not in normalized:
            normalized['guests'] = normalized.pop('party_size')

        # Handle seating zone aliases
        if 'seating_preference' in normalized and 'seating_zone' not in normalized:
            normalized['seating_zone'] = normalized.pop('seating_preference')
        if 'preferred_zone' in normalized and 'seating_zone' not in normalized:
            normalized['seating_zone'] = normalized.pop('preferred_zone')

        # Handle dietary notes aliases
        if 'dietary' in normalized and 'dietary_notes' not in normalized:
            normalized['dietary_notes'] = normalized.pop('dietary')

        return super().to_internal_value(normalized)


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = ['id', 'title', 'slug', 'meta_description', 'blocks', 'is_published', 'created_at', 'updated_at']


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.IntegerField(source='posts.count', read_only=True)

    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'post_count']


class BlogPostSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug',
            'excerpt', 'content', 'featured_image', 'author_name', 'reading_time',
            'is_published', 'published_at', 'created_at', 'updated_at'
        ]
