from rest_framework import serializers
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryItem, TeamMember, Testimonial, Reservation,
    CustomPage, BlogCategory, BlogPost
)

class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = '__all__'

    def get_image(self, obj):
        return obj.image or obj.image_url or ''


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


class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
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
        read_only_fields = ['id', 'reference_code', 'status', 'created_at']

    def to_internal_value(self, data):
        mutable_data = data.copy() if hasattr(data, 'copy') else dict(data)

        if 'guest_name' in mutable_data and 'full_name' not in mutable_data:
            mutable_data['full_name'] = mutable_data.pop('guest_name')
        elif 'name' in mutable_data and 'full_name' not in mutable_data:
            mutable_data['full_name'] = mutable_data.pop('name')

        if 'party_size' in mutable_data and 'guests' not in mutable_data:
            mutable_data['guests'] = mutable_data.pop('party_size')

        if 'reservation_date' in mutable_data and 'preferred_date' not in mutable_data:
            mutable_data['preferred_date'] = mutable_data.pop('reservation_date')
        elif 'date' in mutable_data and 'preferred_date' not in mutable_data:
            mutable_data['preferred_date'] = mutable_data.pop('date')

        if 'time_slot' in mutable_data and 'preferred_time' not in mutable_data:
            mutable_data['preferred_time'] = mutable_data.pop('time_slot')
        elif 'time' in mutable_data and 'preferred_time' not in mutable_data:
            mutable_data['preferred_time'] = mutable_data.pop('time')

        if 'preferred_zone' in mutable_data and 'selected_experience' not in mutable_data:
            mutable_data['selected_experience'] = mutable_data.pop('preferred_zone')
        elif 'experience' in mutable_data and 'selected_experience' not in mutable_data:
            mutable_data['selected_experience'] = mutable_data.pop('experience')

        if 'dietary' in mutable_data and 'dietary_notes' not in mutable_data:
            mutable_data['dietary_notes'] = mutable_data.pop('dietary')

        if 'notes' in mutable_data and 'special_requests' not in mutable_data:
            mutable_data['special_requests'] = mutable_data.pop('notes')

        return super().to_internal_value(mutable_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['guest_name'] = instance.full_name
        data['party_size'] = instance.guests
        data['reservation_date'] = instance.preferred_date
        data['time_slot'] = instance.preferred_time
        data['preferred_zone'] = instance.selected_experience
        data['dietary'] = instance.dietary_notes
        return data


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = '__all__'


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.IntegerField(source='posts.count', read_only=True)

    class Meta:
        model = BlogCategory
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'
