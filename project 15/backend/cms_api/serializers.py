from rest_framework import serializers
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial, Reservation
)

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = ['id', 'restaurant_name', 'content_json', 'is_published', 'updated_at']


class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    category_color = serializers.CharField(source='category.badge_color', read_only=True)
    image = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            'id', 'category', 'category_name', 'category_slug', 'category_color',
            'name', 'slug', 'short_description', 'description',
            'price', 'currency', 'image', 'image_url', 'badge_text', 'dietary_tags',
            'is_available', 'is_featured', 'sort_order'
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url or ''

    def get_image_url(self, obj):
        return self.get_image(obj)


class MenuCategorySerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = MenuCategory
        fields = ['id', 'name', 'slug', 'description', 'badge_color', 'sort_order', 'is_active', 'items']

    def get_items(self, obj):
        active_items = obj.items.filter(is_available=True)
        return MenuItemSerializer(active_items, many=True).data


class TourViewpointSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    name = serializers.CharField(source='title', read_only=True)

    class Meta:
        model = TourViewpoint
        fields = [
            'id', 'name', 'title', 'subtitle', 'description', 'image', 'image_url',
            'camera_position', 'camera_target', 'scene_mood',
            'sort_order', 'is_active'
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url or ''

    def get_image_url(self, obj):
        return self.get_image(obj)


class GalleryItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GalleryItem
        fields = ['id', 'title', 'image', 'image_url', 'category', 'alt_text', 'sort_order', 'is_active']

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url or ''

    def get_image_url(self, obj):
        return self.get_image(obj)


class DiningExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiningExperience
        fields = ['id', 'title', 'tagline', 'description', 'capacity', 'price_guide', 'image_url', 'sort_order', 'is_active']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'bio', 'quote', 'specialty', 'image_url', 'sort_order', 'is_active']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'customer_name', 'source', 'review_text', 'rating', 'review_date', 'sort_order', 'is_active']


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'id', 'customer_name', 'phone', 'email',
            'preferred_date', 'preferred_time', 'guest_count',
            'inquiry_type', 'message', 'status', 'created_at'
        ]
        extra_kwargs = {
            'status': {'read_only': True},
            'created_at': {'read_only': True}
        }

    def to_internal_value(self, data):
        normalized = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'name' in normalized and 'customer_name' not in normalized:
            normalized['customer_name'] = normalized['name']
        if 'full_name' in normalized and 'customer_name' not in normalized:
            normalized['customer_name'] = normalized['full_name']
        if 'date' in normalized and 'preferred_date' not in normalized:
            normalized['preferred_date'] = normalized['date']
        if 'time' in normalized and 'preferred_time' not in normalized:
            normalized['preferred_time'] = normalized['time']
        if 'guests' in normalized and 'guest_count' not in normalized:
            normalized['guest_count'] = normalized['guests']
        if 'notes' in normalized and 'message' not in normalized:
            normalized['message'] = normalized['notes']
        if 'special_requests' in normalized and 'message' not in normalized:
            normalized['message'] = normalized['special_requests']
        return super().to_internal_value(normalized)
