from rest_framework import serializers
from .models import (
    RestaurantSettings, HomepageSection, MenuCategory, MenuItem,
    TourViewpoint, DiningSpace, CulinaryPillar, TeamMember,
    PrivateEventOffering, GalleryItem, Testimonial, ReservationInquiry, OpeningHour
)

class RestaurantSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantSettings
        fields = '__all__'


class HomepageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageSection
        fields = '__all__'


class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    resolved_image = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            'id', 'category', 'category_name', 'category_slug',
            'name', 'english_name', 'slug', 'description', 'price',
            'currency_symbol', 'origin', 'wine_pairing', 'dietary_tags',
            'is_signature', 'is_chef_recommendation', 'is_available',
            'image', 'image_url', 'resolved_image', 'sort_order'
        ]

    def get_resolved_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or ''


class MenuCategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = MenuCategory
        fields = ['id', 'name', 'slug', 'tagline', 'description', 'sort_order', 'is_active', 'items']


class TourViewpointSerializer(serializers.ModelSerializer):
    resolved_image = serializers.SerializerMethodField()

    class Meta:
        model = TourViewpoint
        fields = [
            'id', 'title', 'slug', 'space_name', 'subtitle', 'description',
            'architectural_details', 'camera_position', 'camera_target',
            'hotspot_title', 'hotspot_description', 'lighting_modes',
            'image', 'image_url', 'resolved_image', 'sort_order'
        ]

    def get_resolved_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or ''


class DiningSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiningSpace
        fields = '__all__'


class CulinaryPillarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CulinaryPillar
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class PrivateEventOfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivateEventOffering
        fields = '__all__'


class GalleryItemSerializer(serializers.ModelSerializer):
    resolved_image = serializers.SerializerMethodField()

    class Meta:
        model = GalleryItem
        fields = ['id', 'title', 'category', 'caption', 'image', 'image_url', 'resolved_image', 'sort_order']

    def get_resolved_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or ''


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class ReservationInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservationInquiry
        fields = [
            'id', 'reference_code', 'guest_name', 'email', 'phone',
            'party_size', 'reservation_date', 'reservation_time',
            'seating_preference', 'occasion', 'special_requests',
            'dietary_notes', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'status', 'created_at']


class OpeningHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHour
        fields = '__all__'
