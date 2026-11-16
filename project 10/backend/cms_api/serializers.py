from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, MenuCategory, MenuItem, Reservation, CustomPage, BlogCategory, BlogPost

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
    guest_name = serializers.CharField(source='full_name', required=False)
    party_size = serializers.CharField(source='guests', required=False)
    time_slot = serializers.CharField(source='reservation_time', required=False)
    date = serializers.CharField(source='reservation_date', required=False)
    preferred_zone = serializers.CharField(source='seating_preference', required=False)

    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['id', 'reference_code', 'created_at', 'updated_at']

    def to_internal_value(self, data):
        normalized = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'guest_name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized.pop('guest_name')
        elif 'name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized.pop('name')

        if 'date' in normalized and 'reservation_date' not in normalized:
            normalized['reservation_date'] = normalized.pop('date')

        if 'time_slot' in normalized and 'reservation_time' not in normalized:
            normalized['reservation_time'] = normalized.pop('time_slot')
        elif 'time' in normalized and 'reservation_time' not in normalized:
            normalized['reservation_time'] = normalized.pop('time')

        if 'party_size' in normalized and 'guests' not in normalized:
            raw_p = normalized.pop('party_size')
            try:
                normalized['guests'] = int(str(raw_p).split()[0])
            except Exception:
                normalized['guests'] = 2

        if 'preferred_zone' in normalized and 'seating_preference' not in normalized:
            normalized['seating_preference'] = normalized.pop('preferred_zone')
        elif 'seating_area' in normalized and 'seating_preference' not in normalized:
            normalized['seating_preference'] = normalized.pop('seating_area')

        if 'dietary_requirements' in normalized and 'dietary_notes' not in normalized:
            normalized['dietary_notes'] = normalized.pop('dietary_requirements')

        return super().to_internal_value(normalized)


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = '__all__'


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')

    class Meta:
        model = BlogPost
        fields = '__all__'
