from rest_framework import serializers
from .models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryStoryStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ,
    CustomPage, BlogCategory, BlogPost
)

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class WebsiteSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteSection
        fields = '__all__'


class MenuItemSerializer(serializers.ModelSerializer):
    resolved_image = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            'id', 'category', 'name', 'slug', 'short_description', 'full_description',
            'price', 'currency_symbol', 'image', 'image_url', 'resolved_image',
            'dietary_information', 'allergens', 'calories_estimate', 'origin_notes',
            'is_featured', 'is_available', 'display_order'
        ]

    def get_resolved_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80"


class MenuCategorySerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = MenuCategory
        fields = ['id', 'name', 'slug', 'description', 'image_url', 'display_order', 'is_active', 'items']

    def get_items(self, obj):
        items = obj.items.filter(is_available=True)
        return MenuItemSerializer(items, many=True, context=self.context).data


class VirtualTourViewpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = VirtualTourViewpoint
        fields = '__all__'


class PhilosophyPillarSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhilosophyPillar
        fields = '__all__'


class CulinaryStoryStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CulinaryStoryStage
        fields = '__all__'


class DiningExperiencePanelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiningExperiencePanel
        fields = '__all__'


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    guest_name = serializers.CharField(source='full_name', required=False)
    party_size = serializers.IntegerField(source='guest_count', required=False)
    time_slot = serializers.CharField(source='reservation_time', required=False)
    preferred_zone = serializers.CharField(source='seating_area', required=False)
    special_requests = serializers.CharField(source='message', required=False, allow_blank=True)

    class Meta:
        model = Reservation
        fields = [
            'id', 'reference_code', 'full_name', 'guest_name',
            'email', 'phone', 'reservation_date', 'reservation_time', 'time_slot',
            'shift', 'guest_count', 'party_size', 'seating_area', 'preferred_zone',
            'dietary_notes', 'occasion', 'table_number',
            'message', 'special_requests', 'status', 'admin_notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['reference_code', 'created_at', 'updated_at']

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'guest_name' in data and 'full_name' not in data:
            data['full_name'] = data['guest_name']
        if 'party_size' in data and 'guest_count' not in data:
            data['guest_count'] = data['party_size']
        if 'time_slot' in data and 'reservation_time' not in data:
            data['reservation_time'] = data['time_slot']
        if 'preferred_zone' in data and 'seating_area' not in data:
            data['seating_area'] = data['preferred_zone']
        if 'special_requests' in data and 'message' not in data:
            data['message'] = data['special_requests']
        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['guest_name'] = instance.full_name
        ret['party_size'] = instance.guest_count
        ret['time_slot'] = instance.reservation_time
        ret['preferred_zone'] = instance.seating_area
        ret['special_requests'] = instance.message
        return ret


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


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
        fields = [
            'id', 'title', 'slug', 'category', 'cover_image',
            'excerpt', 'author_name', 'read_time', 'is_published',
            'views_count', 'published_at'
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'cover_image',
            'excerpt', 'content', 'author_name', 'read_time', 'is_published',
            'views_count', 'published_at', 'created_at', 'updated_at'
        ]
