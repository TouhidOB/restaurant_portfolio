from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, MenuCategory, MenuItem, Reservation


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
        if 'name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized.pop('name')
        if 'date' in normalized and 'reservation_date' not in normalized:
            normalized['reservation_date'] = normalized.pop('date')
        if 'time' in normalized and 'reservation_time' not in normalized:
            normalized['reservation_time'] = normalized.pop('time')
        if 'seating_preference' in normalized and 'seating_zone' not in normalized:
            normalized['seating_zone'] = normalized.pop('seating_preference')
        return super().to_internal_value(normalized)
