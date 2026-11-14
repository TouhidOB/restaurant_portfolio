from rest_framework import serializers
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryImage, TeamMember, Testimonial, Reservation
)

class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = MenuItem
        fields = '__all__'


class MenuCategorySerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = MenuCategory
        fields = '__all__'


class TourViewpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourViewpoint
        fields = '__all__'


class DiningExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiningExperience
        fields = '__all__'


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['id', 'status', 'created_at']

    def to_internal_value(self, data):
        # Map frontend aliases gracefully
        mutable_data = data.copy() if hasattr(data, 'copy') else dict(data)

        if 'name' in mutable_data and 'full_name' not in mutable_data:
            mutable_data['full_name'] = mutable_data.pop('name')
        if 'reservation_date' in mutable_data and 'date' not in mutable_data:
            mutable_data['date'] = mutable_data.pop('reservation_date')
        if 'seating' in mutable_data and 'seating_area' not in mutable_data:
            mutable_data['seating_area'] = mutable_data.pop('seating')
        if 'seating_preference' in mutable_data and 'seating_area' not in mutable_data:
            mutable_data['seating_area'] = mutable_data.pop('seating_preference')
        if 'notes' in mutable_data and 'special_requests' not in mutable_data:
            mutable_data['special_requests'] = mutable_data.pop('notes')
        if 'message' in mutable_data and 'special_requests' not in mutable_data:
            mutable_data['special_requests'] = mutable_data.pop('message')

        return super().to_internal_value(mutable_data)


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'
