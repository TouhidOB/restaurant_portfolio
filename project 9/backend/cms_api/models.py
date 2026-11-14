from django.db import models
from django.contrib.auth.models import User

class SiteConfig(models.Model):
    """
    Stores complete structured content for all 15 Skyline Rooftop Restaurant sections,
    theme variables (Midnight Navy, Skyline Blue, Champagne Sand, Cloud Ivory, Sunset Copper, Twilight Slate, Deep Charcoal, Warm Amber),
    menus, 3D viewpoints, and spatial specs.
    """
    restaurant_name = models.CharField(max_length=200, default="SKYLINE")
    content_json = models.JSONField(
        default=dict,
        help_text="Complete structured content for all website sections and rooftop theme"
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Skyline CMS Configuration"
        verbose_name_plural = "Skyline CMS Configurations"
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.restaurant_name} (Updated {self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class Reservation(models.Model):
    """
    Stores customer table reservation inquiries submitted through the website or modal.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Inquiry'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    SEATING_CHOICES = [
        ('outdoor_terrace', 'Open-Air Sunset Terrace'),
        ('indoor_lounge', 'Indoor Sky Lounge'),
        ('window_side', 'Horizon Window Table'),
        ('private_room', 'Private Horizon Suite'),
        ('any', 'Best Available Seating'),
    ]

    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    date = models.DateField()
    time = models.CharField(max_length=50)
    guests = models.CharField(max_length=50)
    seating_preference = models.CharField(max_length=50, choices=SEATING_CHOICES, default='outdoor_terrace')
    occasion = models.CharField(max_length=100, blank=True, default='Elevated Dining')
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Skyline Table Reservation"
        verbose_name_plural = "Skyline Table Reservations"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.date} at {self.time} ({self.guests}) [{self.status}]"
