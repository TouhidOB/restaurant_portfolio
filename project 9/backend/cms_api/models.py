from django.db import models
from django.contrib.auth.models import User
import random
import string
from datetime import datetime

class SiteConfig(models.Model):
    """
    Stores complete structured content for all 15 Skyline Rooftop Restaurant sections,
    theme variables (Midnight Navy #101C2C, Skyline Blue #263F5A, Champagne Gold #D8C3A0, Cloud Ivory #F3F0E9, Sunset Copper #C47A56, Twilight Slate #64788A, Warm Amber #E7A75B),
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


class CustomPage(models.Model):
    """
    Visual Page Builder model for creating brand new standalone pages (like Elementor / WordPress CMS).
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    meta_description = models.TextField(blank=True, default='')
    blocks = models.JSONField(
        default=list,
        help_text="Ordered list of visual layout blocks (hero, split, features, cta, gallery, reservation, faq)"
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Custom Standalone Page"
        verbose_name_plural = "Custom Standalone Pages"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} (/{self.slug})"


class BlogCategory(models.Model):
    """
    Taxonomy category for the Skyline Editorial Horizon Gazette & Journal.
    """
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField(blank=True, default='')

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    """
    Editorial article entries for the Skyline Rooftop Gazette.
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.ForeignKey(BlogCategory, related_name='posts', on_delete=models.CASCADE)
    cover_image = models.URLField(max_length=1000, blank=True, default='')
    excerpt = models.TextField(help_text="Summary shown on article cards and search results")
    content = models.TextField(help_text="Full markdown / rich text content of the article")
    author_name = models.CharField(max_length=150, default="Chef Christian Laurent")
    read_time = models.CharField(max_length=50, default="5 min read")
    views_count = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Gazette Article"
        verbose_name_plural = "Gazette Articles"
        ordering = ['-published_at']

    def __str__(self):
        return self.title


def generate_skyline_ref():
    date_str = datetime.now().strftime('%y%m%d')
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"SKY-{date_str}-{suffix}"


class Reservation(models.Model):
    """
    Stores customer table reservation inquiries with shift management,
    branded reference code (SKY-XXXXXX), and seating assignments.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('confirmed', 'Confirmed'),
        ('seated', 'Seated & Welcomed'),
        ('cancelled', 'Cancelled'),
    ]

    SHIFT_CHOICES = [
        ('lunch', 'Lunch Shift (12:00 – 14:30)'),
        ('dinner', 'Sunset & Dinner Shift (17:30 – 23:30)'),
    ]

    SEATING_CHOICES = [
        ('outdoor_terrace', 'Open-Air Sunset Terrace (Level 54)'),
        ('indoor_lounge', 'Indoor Horizon Sky Lounge'),
        ('window_side', '360° Window Table (Perimeter Glass)'),
        ('private_room', 'Private Horizon Dining Suite (VIP)'),
        ('any', 'Best Available Rooftop Seating'),
    ]

    reference_code = models.CharField(
        max_length=40,
        unique=True,
        null=True,
        blank=True,
        help_text="Auto-generated unique code e.g. SKY-261116-A1B2"
    )
    full_name = models.CharField(max_length=200)
    guest_name = models.CharField(max_length=200, blank=True, default='')
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    date = models.DateField()
    reservation_date = models.DateField(null=True, blank=True)
    time = models.CharField(max_length=50)
    time_slot = models.CharField(max_length=50, blank=True, default='')
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES, default='dinner')
    guests = models.CharField(max_length=50)
    party_size = models.CharField(max_length=50, blank=True, default='')
    seating_preference = models.CharField(max_length=50, choices=SEATING_CHOICES, default='outdoor_terrace')
    seating_area = models.CharField(max_length=150, blank=True, default='')
    preferred_zone = models.CharField(max_length=150, blank=True, default='')
    experience = models.CharField(max_length=150, blank=True, default='')
    table_number = models.CharField(max_length=30, blank=True, default='', help_text="e.g. Terrace T-04, Window W-01")
    occasion = models.CharField(max_length=100, blank=True, default='Elevated Dining')
    dietary_notes = models.TextField(blank=True, default='')
    special_requests = models.TextField(blank=True, null=True)
    admin_notes = models.TextField(blank=True, default='', help_text="Internal notes for maitre d' and host team")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Skyline Table Reservation"
        verbose_name_plural = "Skyline Table Reservations"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.reference_code:
            self.reference_code = generate_skyline_ref()
        if not self.guest_name:
            self.guest_name = self.full_name
        if not self.party_size:
            self.party_size = self.guests
        if not self.reservation_date:
            self.reservation_date = self.date
        if not self.time_slot:
            self.time_slot = self.time
        if not self.seating_area and self.seating_preference:
            self.seating_area = dict(self.SEATING_CHOICES).get(self.seating_preference, self.seating_preference)
        if not self.preferred_zone:
            self.preferred_zone = self.seating_area
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference_code or 'NO-REF'} - {self.full_name} ({self.date} {self.time}) [{self.status}]"
