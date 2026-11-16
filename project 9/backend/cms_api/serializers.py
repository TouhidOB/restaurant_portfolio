from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser']


class SiteConfigSerializer(serializers.ModelSerializer):
    updated_by_name = serializers.ReadOnlyField(source='updated_by.username')

    class Meta:
        model = SiteConfig
        fields = ['id', 'restaurant_name', 'content_json', 'is_published', 'updated_at', 'updated_by_name']


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = ['id', 'title', 'slug', 'meta_description', 'blocks', 'is_published', 'created_at', 'updated_at']


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description']


class BlogPostSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=BlogCategory.objects.all(), source='category', write_only=True, required=False
    )

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_id', 'cover_image',
            'excerpt', 'content', 'author_name', 'read_time', 'views_count',
            'is_published', 'published_at', 'created_at', 'updated_at'
        ]


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        # Bidirectional Aliasing for seamless frontend compatibility
        if 'full_name' not in data and 'guest_name' in data:
            data['full_name'] = data['guest_name']
        if 'guests' not in data and 'party_size' in data:
            data['guests'] = data['party_size']
        if 'time' not in data and 'time_slot' in data:
            data['time'] = data['time_slot']
        if 'date' not in data and 'reservation_date' in data:
            data['date'] = data['reservation_date']
        if 'seating_area' not in data and 'preferred_zone' in data:
            data['seating_area'] = data['preferred_zone']
        return super().to_internal_value(data)
