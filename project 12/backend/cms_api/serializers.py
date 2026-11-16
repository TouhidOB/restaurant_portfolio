from rest_framework import serializers
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryImage, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
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
        read_only_fields = ['id', 'created_at']

    def to_internal_value(self, data):
        mutable_data = data.copy() if hasattr(data, 'copy') else dict(data)

        # Name mapping
        if 'name' in mutable_data and 'full_name' not in mutable_data:
            mutable_data['full_name'] = mutable_data.pop('name')
        if 'guest_name' in mutable_data and 'full_name' not in mutable_data:
            mutable_data['full_name'] = mutable_data.pop('guest_name')

        # Date & time mapping
        if 'reservation_date' in mutable_data and 'date' not in mutable_data:
            mutable_data['date'] = mutable_data.pop('reservation_date')
        if 'time_slot' in mutable_data and 'time' not in mutable_data:
            mutable_data['time'] = mutable_data.pop('time_slot')

        # Party size mapping
        if 'party_size' in mutable_data and 'guests' not in mutable_data:
            mutable_data['guests'] = mutable_data.pop('party_size')

        # Seating mapping
        if 'seating' in mutable_data and 'seating_area' not in mutable_data:
            mutable_data['seating_area'] = mutable_data.pop('seating')
        if 'seating_preference' in mutable_data and 'seating_area' not in mutable_data:
            mutable_data['seating_area'] = mutable_data.pop('seating_preference')
        if 'preferred_zone' in mutable_data and 'seating_area' not in mutable_data:
            mutable_data['seating_area'] = mutable_data.pop('preferred_zone')

        # Notes mapping
        if 'notes' in mutable_data and 'special_requests' not in mutable_data:
            mutable_data['special_requests'] = mutable_data.pop('notes')
        if 'message' in mutable_data and 'special_requests' not in mutable_data:
            mutable_data['special_requests'] = mutable_data.pop('message')
        if 'dietary' in mutable_data and 'dietary_notes' not in mutable_data:
            mutable_data['dietary_notes'] = mutable_data.pop('dietary')

        # Normalize shift
        if 'shift' in mutable_data:
            raw_shift = str(mutable_data['shift']).lower()
            mutable_data['shift'] = 'lunch' if 'lunch' in raw_shift or 'day' in raw_shift else 'dinner'

        return super().to_internal_value(mutable_data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Convenience aliases
        ret['guest_name'] = ret.get('full_name', '')
        ret['party_size'] = ret.get('guests', 2)
        ret['reservation_date'] = ret.get('date', '')
        ret['time_slot'] = ret.get('time', '')
        ret['preferred_zone'] = ret.get('seating_area', '')
        return ret


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = '__all__'


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'
