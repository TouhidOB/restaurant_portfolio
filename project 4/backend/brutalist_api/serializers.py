from rest_framework import serializers
from .models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryProcessStage,
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
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    resolved_image = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            'id', 'category', 'category_name', 'category_slug',
            'name', 'slug', 'short_description', 'full_description',
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
    is_dinner_shift = serializers.BooleanField(read_only=True)
    guest_name = serializers.CharField(source='full_name', required=False)
    party_size = serializers.IntegerField(source='guest_count', required=False)
    date = serializers.DateField(source='reservation_date', required=False)
    time = serializers.CharField(source='reservation_time', required=False)
    seatingArea = serializers.CharField(source='seating_area', required=False, allow_blank=True)
    dietaryNotes = serializers.CharField(source='dietary_notes', required=False, allow_blank=True)
    special_requests = serializers.CharField(source='message', required=False, allow_blank=True)

    class Meta:
        model = Reservation
        fields = [
            'id', 'reference_code', 'full_name', 'guest_name', 'email', 'phone',
            'reservation_date', 'date', 'reservation_time', 'time', 'guest_count', 'party_size',
            'seating_area', 'seatingArea', 'occasion', 'shift', 'is_dinner_shift',
            'dietary_notes', 'dietaryNotes', 'table_number', 'message', 'special_requests',
            'status', 'admin_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['reference_code', 'is_dinner_shift', 'created_at', 'updated_at']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = [
            'id', 'title', 'slug', 'meta_description', 'theme_style',
            'is_published', 'show_in_navigation', 'nav_order', 'blocks',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.IntegerField(source='posts.count', read_only=True)

    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'post_count', 'created_at']


class BlogPostListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    resolved_cover = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug',
            'author_name', 'author_role', 'cover_image_url', 'resolved_cover',
            'excerpt', 'read_time_minutes', 'is_featured', 'is_published', 'published_at'
        ]

    def get_resolved_cover(self, obj):
        return obj.cover_image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    resolved_cover = serializers.SerializerMethodField()
    related_posts = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug',
            'author_name', 'author_role', 'cover_image_url', 'resolved_cover',
            'excerpt', 'content', 'read_time_minutes', 'is_featured',
            'is_published', 'published_at', 'created_at', 'updated_at', 'related_posts'
        ]

    def get_resolved_cover(self, obj):
        return obj.cover_image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"

    def get_related_posts(self, obj):
        related = BlogPost.objects.filter(is_published=True).exclude(id=obj.id)
        if obj.category:
            cat_posts = related.filter(category=obj.category)[:3]
            if cat_posts.count() >= 2:
                return BlogPostListSerializer(cat_posts, many=True).data
        return BlogPostListSerializer(related[:3], many=True).data
