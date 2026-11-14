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
    image = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            'id', 'category', 'category_name', 'category_slug',
            'name', 'slug', 'short_description', 'description',
            'price', 'currency', 'image', 'cut_type', 'serving_size',
            'dietary_tags', 'is_available', 'is_featured', 'sort_order'
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url or ''


class MenuCategorySerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = MenuCategory
        fields = ['id', 'name', 'slug', 'description', 'sort_order', 'is_active', 'items']

    def get_items(self, obj):
        active_items = obj.items.filter(is_available=True)
        return MenuItemSerializer(active_items, many=True).data


class TourViewpointSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = TourViewpoint
        fields = [
            'id', 'title', 'subtitle', 'description', 'image',
            'camera_position', 'camera_target', 'scene_mood',
            'sort_order', 'is_active'
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url or ''


class GalleryItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = GalleryItem
        fields = ['id', 'title', 'image', 'category', 'alt_text', 'sort_order', 'is_active']

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return obj.image_url or ''


class DiningExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiningExperience
        fields = ['id', 'title', 'tagline', 'description', 'capacity', 'price_guide', 'image_url', 'sort_order', 'is_active']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'bio', 'quote', 'specialization', 'image_url', 'sort_order', 'is_active']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'guest_name', 'source', 'review_text', 'rating', 'review_date', 'sort_order', 'is_active']


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'id', 'full_name', 'phone', 'email',
            'preferred_date', 'preferred_time', 'guests',
            'occasion', 'selected_experience', 'special_requests',
            'status', 'created_at'
        ]
        extra_kwargs = {
            'status': {'read_only': True},
            'created_at': {'read_only': True}
        }

    def to_internal_value(self, data):
        # Support aliases
        normalized = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized['name']
        if 'date' in normalized and 'preferred_date' not in normalized:
            normalized['preferred_date'] = normalized['date']
        if 'time' in normalized and 'preferred_time' not in normalized:
            normalized['preferred_time'] = normalized['time']
        if 'notes' in normalized and 'special_requests' not in normalized:
            normalized['special_requests'] = normalized['notes']
        if 'experience' in normalized and 'selected_experience' not in normalized:
            normalized['selected_experience'] = normalized['experience']
        return super().to_internal_value(normalized)
