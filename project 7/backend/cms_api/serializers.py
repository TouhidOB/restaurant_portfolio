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


class BlogPostListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'category', 'cover_image', 'excerpt', 'author_name', 'read_time', 'views_count', 'published_at']


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'category', 'cover_image', 'excerpt', 'content', 'author_name', 'read_time', 'views_count', 'published_at', 'updated_at']


class ReservationSerializer(serializers.ModelSerializer):
    guest_name = serializers.CharField(source='full_name', required=False)
    party_size = serializers.CharField(source='guests', required=False)
    time_slot = serializers.CharField(source='time', required=False)
    preferred_zone = serializers.CharField(source='seating_area', required=False)
    reservation_date = serializers.DateField(source='date', required=False)
    reservation_time = serializers.CharField(source='time', required=False)

    class Meta:
        model = Reservation
        fields = [
            'id', 'reference_code', 'full_name', 'guest_name', 'phone', 'email',
            'date', 'reservation_date', 'time', 'reservation_time', 'time_slot',
            'shift', 'guests', 'party_size', 'occasion', 'experience', 'seating_area',
            'preferred_zone', 'table_number', 'dietary_notes', 'special_requests',
            'admin_notes', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'reference_code', 'created_at', 'updated_at']

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'guest_name' in data and 'full_name' not in data:
            data['full_name'] = data['guest_name']
        if 'party_size' in data and 'guests' not in data:
            data['guests'] = str(data['party_size'])
        if 'time_slot' in data and 'time' not in data:
            data['time'] = data['time_slot']
        elif 'reservation_time' in data and 'time' not in data:
            data['time'] = data['reservation_time']
        if 'reservation_date' in data and 'date' not in data:
            data['date'] = data['reservation_date']
        if 'preferred_zone' in data and 'seating_area' not in data:
            data['seating_area'] = data['preferred_zone']
        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['guest_name'] = instance.full_name
        ret['party_size'] = instance.guests
        ret['time_slot'] = instance.time
        ret['reservation_date'] = str(instance.date)
        ret['reservation_time'] = instance.time
        ret['preferred_zone'] = instance.seating_area or instance.experience
        return ret
