from rest_framework import serializers
from .models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryProcessStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ
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
            'dietary_information', 'allergens', 'is_featured', 'is_available', 'display_order'
        ]

    def get_resolved_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"


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


class CulinaryProcessStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CulinaryProcessStage
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
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['reference_code', 'created_at', 'updated_at']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'
