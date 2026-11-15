from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'is_superuser')


class SiteConfigSerializer(serializers.ModelSerializer):
    updated_by_username = serializers.ReadOnlyField(source='updated_by.username')

    class Meta:
        model = SiteConfig
        fields = ('id', 'restaurant_name', 'content_json', 'is_published', 'updated_at', 'updated_by_username')


class ReservationSerializer(serializers.ModelSerializer):
    is_dinner_shift = serializers.BooleanField(read_only=True)

    class Meta:
        model = Reservation
        fields = [
            'id',
            'reference_code',
            'full_name',
            'phone',
            'email',
            'date',
            'time',
            'guests',
            'seating_area',
            'occasion',
            'dietary_notes',
            'special_requests',
            'table_number',
            'admin_notes',
            'status',
            'is_dinner_shift',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ('id', 'reference_code', 'is_dinner_shift', 'created_at', 'updated_at')

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        if 'guest_name' in data and 'full_name' not in data:
            data['full_name'] = data['guest_name']
        if 'party_size' in data and 'guests' not in data:
            data['guests'] = str(data['party_size'])
        if 'preferred_zone' in data and 'seating_area' not in data:
            data['seating_area'] = data['preferred_zone']
        if 'reservation_date' in data and 'date' not in data:
            data['date'] = data['reservation_date']
        if 'reservation_time' in data and 'time' not in data:
            data['time'] = data['reservation_time']
        return super().to_internal_value(data)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['guest_name'] = instance.full_name
        ret['party_size'] = instance.guests
        ret['preferred_zone'] = instance.seating_area
        ret['reservation_date'] = str(instance.date)
        ret['reservation_time'] = instance.time
        return ret


class CustomPageNavSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = ['id', 'title', 'slug', 'show_in_navigation', 'nav_order']


class CustomPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomPage
        fields = [
            'id',
            'title',
            'slug',
            'meta_description',
            'theme_style',
            'is_published',
            'show_in_navigation',
            'nav_order',
            'blocks',
            'created_at',
            'updated_at',
        ]


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description']


class BlogPostSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    resolved_cover = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = '__all__'

    def get_resolved_cover(self, obj):
        if obj.cover_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
            return obj.cover_image.url
        return obj.cover_image_url or "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
