from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SiteConfig, Reservation

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
    class Meta:
        model = Reservation
        fields = (
            'id',
            'full_name',
            'phone',
            'email',
            'date',
            'time',
            'guests',
            'occasion',
            'special_requests',
            'status',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')
