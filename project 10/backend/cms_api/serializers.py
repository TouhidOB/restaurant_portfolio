from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, MenuCategory, MenuItem, Reservation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser']


class SiteConfigSerializer(serializers.ModelSerializer):
    updated_by_name = serializers.ReadOnlyField(source='updated_by.username')

    class Meta:
        model = SiteConfig
        fields = [
            'id', 'restaurant_name', 'content_json', 'theme_json',
            'default_language', 'supported_languages', 'is_published',
            'updated_at', 'updated_by_name'
        ]


class MenuItemSerializer(serializers.ModelSerializer):
    category_name_en = serializers.ReadOnlyField(source='category.name_en')
    category_name_bn = serializers.ReadOnlyField(source='category.name_bn')
    category_slug = serializers.ReadOnlyField(source='category.slug')

    class Meta:
        model = MenuItem
        fields = '__all__'


class MenuCategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = MenuCategory
        fields = '__all__'


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
        return super().to_internal_value(normalized)
