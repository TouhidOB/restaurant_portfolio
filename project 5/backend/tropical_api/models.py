from django.db import models
from django.utils import timezone
import uuid

class Restaurant(models.Model):
    name = models.CharField(max_length=200, default="VERDANT // TROPICAL MODERN DINING")
    slug = models.SlugField(default="verdant-tropical-modern")
    tagline = models.CharField(max_length=300, default="NATURE IN FORM. FLAVOR IN EVERY DETAIL.")
    short_description = models.TextField(
        default="A contemporary dining destination immersed in lush botanical landscapes, open-air timber architecture, and nature-inspired gastronomy."
    )
    long_description = models.TextField(
        default="Where architecture dissolves into nature. Savor seasonally harvested tropical produce, wood-fired hearth delicacies, and botanical elixirs under the canopy of broad-leaf palms and warm afternoon sun."
    )
    
    # Contact & Coordinates
    phone = models.CharField(max_length=50, default="+1 (305) 555-0428")
    email = models.EmailField(default="concierge@verdant-dining.com")
    address = models.CharField(max_length=255, default="840 Palm Grove Way, Tropical Corridor")
    city = models.CharField(max_length=100, default="Miami, FL 33139")
    country = models.CharField(max_length=100, default="United States")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=25.7617)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=-80.1918)
    coordinates_display = models.CharField(max_length=100, default="25.7617° N, 80.1918° W — PALM GROVE")
    opening_hours_summary = models.CharField(max_length=255, default="TUE — SUN / 12:00 — 23:30 (CLOSED MON)")
    
    # Hero content
    hero_eyebrow = models.CharField(max_length=150, default="A CONTEMPORARY DINING EXPERIENCE")
    hero_heading_line1 = models.CharField(max_length=100, default="WHERE")
    hero_heading_line2 = models.CharField(max_length=100, default="NATURE MEETS")
    hero_heading_line3 = models.CharField(max_length=100, default="THE TABLE.")
    hero_supporting_text = models.TextField(
        default="Discover a thoughtful approach to food, atmosphere, and hospitality inspired by the beauty of natural spaces."
    )
    hero_cta_primary = models.CharField(max_length=100, default="EXPLORE OUR MENU")
    hero_cta_secondary = models.CharField(max_length=100, default="DISCOVER THE SPACE")
    
    # Color Tokens
    primary_color = models.CharField(max_length=20, default="#243F32")  # Deep Forest Green
    secondary_color = models.CharField(max_length=20, default="#52745A")  # Botanical Green
    accent_color = models.CharField(max_length=20, default="#BC7153")  # Terracotta
    light_color = models.CharField(max_length=20, default="#F6F2E9")  # Warm Ivory
    
    tables_capacity = models.IntegerField(default=72)
    daily_menu_courses = models.IntegerField(default=10)
    botanical_varietals = models.IntegerField(default=180)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class WebsiteSection(models.Model):
    section_key = models.CharField(max_length=50, unique=True)
    eyebrow = models.CharField(max_length=150, blank=True)
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True)
    custom_content = models.JSONField(default=dict, blank=True)
    display_order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.display_order:02d}. {self.title} ({self.section_key})"


class MenuCategory(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
        verbose_name_plural = "Menu Categories"

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=255)
    full_description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    currency_symbol = models.CharField(max_length=10, default="$")
    image = models.ImageField(upload_to='menu/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    dietary_information = models.JSONField(default=list, blank=True)
    allergens = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return f"{self.name} (${self.price})"


class VirtualTourViewpoint(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    space_name = models.CharField(max_length=150)
    description = models.TextField()
    materials_spec = models.CharField(max_length=255, default="Teak timber, limestone tiles, lush monstera canopy")
    image_url = models.CharField(max_length=500, blank=True)
    camera_position = models.JSONField(default=list)
    camera_target = models.JSONField(default=list)
    hotspot_title = models.CharField(max_length=150, blank=True)
    hotspot_detail = models.CharField(max_length=300, blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.display_order:02d}. {self.title}"


class PhilosophyPillar(models.Model):
    number = models.CharField(max_length=10, default="01")
    title = models.CharField(max_length=100)
    statement = models.CharField(max_length=255)
    description = models.TextField()
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.number} — {self.title}"


class CulinaryStoryStage(models.Model):
    stage_number = models.CharField(max_length=10, default="01")
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.stage_number} — {self.title}"


class DiningExperiencePanel(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    subtitle = models.CharField(max_length=200)
    description = models.TextField()
    spec_badge = models.CharField(max_length=100, default="TROPICAL MODERNISM")
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('food', 'Tropical Cuisine'),
        ('interior', 'Botanical Interior'),
        ('exterior', 'Timber Architecture'),
        ('dining', 'Open-Air Dining'),
        ('details', 'Natural Textures'),
    ]
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='food')
    caption = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=200, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.title} [{self.category}]"


class Testimonial(models.Model):
    guest_name = models.CharField(max_length=150)
    source = models.CharField(max_length=150, default="Tropical Architectural Digest")
    review_text = models.TextField()
    rating = models.IntegerField(default=5)
    review_date = models.CharField(max_length=50, default="November 2025")
    is_featured = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.guest_name} ({self.source})"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Inquiry'),
        ('contacted', 'Contacted Guest'),
        ('confirmed', 'Confirmed Table'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    reference_code = models.CharField(max_length=50, unique=True, editable=False)
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    reservation_date = models.DateField()
    reservation_time = models.CharField(max_length=20, default="19:30")
    guest_count = models.IntegerField(default=2)
    seating_area = models.CharField(max_length=100, default="Botanical Glasshouse")
    message = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.reference_code:
            self.reference_code = f"TROP-{timezone.now().strftime('%y%m%d')}-{uuid.uuid4().hex[:4].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference_code} — {self.full_name} ({self.guest_count} guests)"


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.question
