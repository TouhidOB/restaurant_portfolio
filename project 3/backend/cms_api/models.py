from django.db import models
from django.utils import timezone
import uuid

class RestaurantSettings(models.Model):
    brand_name = models.CharField(max_length=200, default="AURA MARINA")
    tagline = models.CharField(max_length=300, default="Where the Coast Meets the Table")
    subtitle = models.CharField(max_length=400, default="Coastal Mediterranean Luxury Dining & Architectural Sanctuary")
    description = models.TextField(default="Perched along the sun-drenched cliffs of the Mediterranean, Aura Marina balances centuries of coastal culinary wisdom with modern architectural minimalism.")
    
    # Location & Contact
    address_line1 = models.CharField(max_length=255, default="Via Panoramica 48, Cliffside Promenade")
    city_region = models.CharField(max_length=255, default="Positano, Amalfi Coast 84017, Italy")
    coordinates_display = models.CharField(max_length=100, default="40.6281° N, 14.4850° E — Mooring Berth 04")
    phone = models.CharField(max_length=50, default="+39 089 875 219")
    email = models.EmailField(default="reservations@auramarina.it")
    instagram_handle = models.CharField(max_length=100, default="@auramarina.amalfi")
    
    # Practical Details
    dress_code = models.CharField(max_length=255, default="Coastal Elegant / Smart Casual — Footwear required; no beach attire in evening service")
    boat_access_notes = models.CharField(max_length=255, default="Private tender boat shuttle provided for yachts anchoring in Positano bay")
    michelin_distinction = models.CharField(max_length=200, default="Michelin Guide Selected 2024–2026")
    
    # Hero Content
    hero_badge = models.CharField(max_length=100, default="SEASON 2026 • MEDITERRANEAN RIVIERA")
    hero_headline = models.CharField(max_length=255, default="WHERE THE COAST MEETS THE TABLE")
    hero_subheadline = models.TextField(default="Hand-harvested Adriatic crudo, ancient olive groves, and architectural dining suspended above the azure Mediterranean.")
    hero_cta_primary = models.CharField(max_length=100, default="Reserve a Table")
    hero_cta_secondary = models.CharField(max_length=100, default="Explore 3D Tour")
    
    # Metrics
    tables_available_today = models.IntegerField(default=6)
    daily_fresh_catches = models.IntegerField(default=8)
    years_of_heritage = models.IntegerField(default=38)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Restaurant Settings"
        verbose_name_plural = "Restaurant Settings"

    def __str__(self):
        return f"{self.brand_name} Settings"


class HomepageSection(models.Model):
    SECTION_CHOICES = [
        ('hero', 'S02: Hero Section'),
        ('story', 'S03: Brand & Architecture Story'),
        ('tour', 'S04: 3D Virtual Tour'),
        ('dining_spaces', 'S05: Coastal Dining Spaces'),
        ('signatures', 'S06: Signature Dishes'),
        ('menu', 'S07: Interactive Menu Explorer'),
        ('philosophy', 'S08: Culinary Philosophy'),
        ('team', 'S09: Culinary Team & Masters'),
        ('events', 'S10: Private Dining & Events'),
        ('gallery', 'S11: Visual Gallery'),
        ('testimonials', 'S12: Accolades & Testimonials'),
        ('reservation', 'S13: Reservation Inquiry'),
        ('location', 'S14: Location & Arrival'),
        ('footer', 'S15: Editorial Footer'),
    ]
    section_key = models.CharField(max_length=50, choices=SECTION_CHOICES, unique=True)
    badge = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True)
    content = models.JSONField(default=dict, blank=True)
    sort_order = models.IntegerField(default=0)
    is_enabled = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Homepage Section"
        verbose_name_plural = "Homepage Sections"

    def __str__(self):
        return f"{self.get_section_key_display()} ({self.title})"


class MenuCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    tagline = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Menu Category"
        verbose_name_plural = "Menu Categories"

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    english_name = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    currency_symbol = models.CharField(max_length=10, default="€")
    origin = models.CharField(max_length=200, blank=True, help_text="e.g. Gulf of Salerno Daily Catch")
    wine_pairing = models.CharField(max_length=255, blank=True, help_text="e.g. Greco di Tufo DOCG 2022")
    dietary_tags = models.JSONField(default=list, blank=True, help_text="List of tags e.g. ['Pescatarian', 'Gluten-Free']")
    is_signature = models.BooleanField(default=False)
    is_chef_recommendation = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='menu_items/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True, default='')
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class TourViewpoint(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    space_name = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    architectural_details = models.TextField(blank=True)
    camera_position = models.JSONField(default=list, help_text="[x, y, z] camera coords")
    camera_target = models.JSONField(default=list, help_text="[x, y, z] lookAt target")
    hotspot_title = models.CharField(max_length=150, blank=True)
    hotspot_description = models.CharField(max_length=300, blank=True)
    lighting_modes = models.JSONField(default=dict, blank=True)
    image = models.ImageField(upload_to='tour_viewpoints/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True, default='')
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Tour Viewpoint"
        verbose_name_plural = "Tour Viewpoints"

    def __str__(self):
        return f"{self.title} ({self.space_name})"


class DiningSpace(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    tag = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    capacity = models.CharField(max_length=100, default="40 Guests")
    vibe = models.CharField(max_length=150, default="Sunlit ocean breeze & panoramic cliff views")
    features = models.JSONField(default=list, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Dining Space"
        verbose_name_plural = "Dining Spaces"

    def __str__(self):
        return self.name


class CulinaryPillar(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, default="Compass")
    metric_label = models.CharField(max_length=100, default="100% Traceable")
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Culinary Pillar"
        verbose_name_plural = "Culinary Pillars"

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    title = models.CharField(max_length=200, blank=True)
    bio = models.TextField()
    signature_focus = models.CharField(max_length=255, blank=True)
    accolades = models.CharField(max_length=255, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self):
        return f"{self.name} - {self.role}"


class PrivateEventOffering(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    capacity = models.CharField(max_length=100)
    description = models.TextField()
    features = models.JSONField(default=list, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Private Event Offering"
        verbose_name_plural = "Private Event Offerings"

    def __str__(self):
        return self.title


class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('architecture', 'Architecture & Arches'),
        ('cuisine', 'Coastal Cuisine & Raw Bar'),
        ('atmosphere', 'Atmosphere & Sunset'),
        ('wine', 'Cellar & Cocktails'),
    ]
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='architecture')
    caption = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Gallery Item"
        verbose_name_plural = "Gallery Items"

    def __str__(self):
        return f"{self.title} [{self.category}]"


class Testimonial(models.Model):
    guest_name = models.CharField(max_length=150)
    source_or_title = models.CharField(max_length=200, default="Private Guest")
    quote = models.TextField()
    rating = models.IntegerField(default=5)
    visit_date = models.CharField(max_length=50, default="August 2025")
    is_featured = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self):
        return f"{self.guest_name} - {self.rating}★"


class ReservationInquiry(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('confirmed', 'Confirmed'),
        ('seated', 'Seated / Completed'),
        ('declined', 'Declined'),
        ('archived', 'Archived'),
    ]
    reference_code = models.CharField(max_length=50, unique=True, editable=False)
    guest_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    party_size = models.IntegerField(default=2)
    reservation_date = models.DateField()
    reservation_time = models.CharField(max_length=20, default="20:00")
    seating_preference = models.CharField(max_length=100, default="Sea Terrace")
    occasion = models.CharField(max_length=100, default="Dinner")
    special_requests = models.TextField(blank=True)
    dietary_notes = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    staff_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Reservation Inquiry"
        verbose_name_plural = "Reservation Inquiries"

    def save(self, *args, **kwargs):
        if not self.reference_code:
            self.reference_code = f"MED-{timezone.now().strftime('%y%m%d')}-{uuid.uuid4().hex[:4].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference_code} - {self.guest_name} ({self.party_size} guests)"


class OpeningHour(models.Model):
    day_of_week = models.CharField(max_length=30)
    lunch_hours = models.CharField(max_length=100, default="12:30 — 15:30")
    dinner_hours = models.CharField(max_length=100, default="19:00 — 23:30")
    is_closed = models.BooleanField(default=False)
    note = models.CharField(max_length=200, blank=True, default="Sunset aperitivo begins at 18:00")
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']
        verbose_name = "Opening Hour"
        verbose_name_plural = "Opening Hours"

    def __str__(self):
        return self.day_of_week
