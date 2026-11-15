from rest_framework import serializers
from .models import (
    RestaurantSettings, HomepageSection, MenuCategory, MenuItem,
    TourViewpoint, DiningSpace, CulinaryPillar, TeamMember,
    PrivateEventOffering, GalleryItem, Testimonial, ReservationInquiry, OpeningHour,
    CustomPage, BlogCategory, BlogPost
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
    is_dinner_shift = serializers.BooleanField(read_only=True)
    full_name = serializers.CharField(source='guest_name', required=False)
    guests = serializers.IntegerField(source='party_size', required=False)
    date = serializers.DateField(source='reservation_date', required=False)
    time = serializers.CharField(source='reservation_time', required=False)
    seatingArea = serializers.CharField(source='seating_preference', required=False, allow_blank=True)
    dietaryNotes = serializers.CharField(source='dietary_notes', required=False, allow_blank=True)
    specialRequests = serializers.CharField(source='special_requests', required=False, allow_blank=True)

    class Meta:
        model = ReservationInquiry
        fields = [
            'id', 'reference_code', 'guest_name', 'full_name', 'email', 'phone',
            'party_size', 'guests', 'reservation_date', 'date', 'reservation_time', 'time',
            'seating_preference', 'seatingArea', 'occasion', 'special_requests', 'specialRequests',
            'dietary_notes', 'dietaryNotes', 'table_number', 'status', 'staff_notes',
            'admin_notes', 'is_dinner_shift', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'reference_code', 'status', 'is_dinner_shift', 'created_at', 'updated_at']


class OpeningHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHour
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
        return obj.cover_image_url or 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'


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
        return obj.cover_image_url or 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'

    def get_related_posts(self, obj):
        related = BlogPost.objects.filter(is_published=True).exclude(id=obj.id)
        if obj.category:
            cat_posts = related.filter(category=obj.category)[:3]
            if cat_posts.count() >= 2:
                return BlogPostListSerializer(cat_posts, many=True).data
        return BlogPostListSerializer(related[:3], many=True).data
