from rest_framework import serializers
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial, Reservation,
    CustomPage, BlogCategory, BlogPost
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
            'price', 'currency', 'image', 'image_url', 'cut_type', 'serving_size',
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
            'id', 'title', 'subtitle', 'description', 'image', 'image_url',
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
        fields = ['id', 'title', 'image', 'image_url', 'category', 'alt_text', 'sort_order', 'is_active']

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
    # Aliased read fields for versatile frontend clients
    reference_code = serializers.CharField(required=False, allow_blank=True)
    shift = serializers.CharField(required=False, default='dinner')
    table_number = serializers.CharField(required=False, allow_blank=True)
    dietary_notes = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Reservation
        fields = [
            'id', 'reference_code', 'full_name', 'phone', 'email',
            'preferred_date', 'preferred_time', 'shift', 'guests',
            'occasion', 'selected_experience', 'table_number',
            'dietary_notes', 'special_requests', 'status', 'created_at', 'updated_at'
        ]
        extra_kwargs = {
            'reference_code': {'read_only': True},
            'status': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True}
        }

    def to_internal_value(self, data):
        normalized = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized['name']
        if 'guest_name' in normalized and 'full_name' not in normalized:
            normalized['full_name'] = normalized['guest_name']
        if 'date' in normalized and 'preferred_date' not in normalized:
            normalized['preferred_date'] = normalized['date']
        if 'reservation_date' in normalized and 'preferred_date' not in normalized:
            normalized['preferred_date'] = normalized['reservation_date']
        if 'time' in normalized and 'preferred_time' not in normalized:
            normalized['preferred_time'] = normalized['time']
        if 'time_slot' in normalized and 'preferred_time' not in normalized:
            normalized['preferred_time'] = normalized['time_slot']
        if 'party_size' in normalized and 'guests' not in normalized:
            normalized['guests'] = normalized['party_size']
        if 'pax' in normalized and 'guests' not in normalized:
            normalized['guests'] = normalized['pax']
        if 'notes' in normalized and 'special_requests' not in normalized:
            normalized['special_requests'] = normalized['notes']
        if 'dietary' in normalized and 'dietary_notes' not in normalized:
            normalized['dietary_notes'] = normalized['dietary']
        if 'experience' in normalized and 'selected_experience' not in normalized:
            normalized['selected_experience'] = normalized['experience']
        if 'seating_area' in normalized and 'selected_experience' not in normalized:
            normalized['selected_experience'] = normalized['seating_area']
        if 'preferred_zone' in normalized and 'selected_experience' not in normalized:
            normalized['selected_experience'] = normalized['preferred_zone']
        return super().to_internal_value(normalized)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Provide dual aliases for frontend convenience
        ret['guest_name'] = instance.full_name
        ret['party_size'] = instance.guests
        ret['time_slot'] = instance.preferred_time
        ret['reservation_date'] = str(instance.preferred_date)
        ret['preferred_zone'] = instance.selected_experience
        ret['dietary'] = instance.dietary_notes
        return ret


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = [
            'id', 'title', 'slug', 'meta_title', 'meta_description',
            'blocks', 'is_published', 'created_at', 'updated_at'
        ]


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'created_at', 'post_count']

    def get_post_count(self, obj):
        return obj.posts.filter(is_published=True).count()


class BlogPostSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug',
            'excerpt', 'content', 'featured_image', 'reading_time', 'author',
            'is_published', 'published_at', 'meta_title', 'meta_description',
            'created_at', 'updated_at'
        ]
