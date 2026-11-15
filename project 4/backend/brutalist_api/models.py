from django.db import models
from django.utils import timezone
import uuid

class Restaurant(models.Model):
    name = models.CharField(max_length=200, default="MONOLITH // BRUTALIST DINING")
    slug = models.SlugField(default="monolith-brutalist")
    tagline = models.CharField(max_length=300, default="Raw Architecture. Bold Cuisine. Uncompromising Experience.")
    short_description = models.TextField(default="An exploration of contemporary cuisine, bold ingredients, and architecture-inspired dining housed inside monolithic board-formed concrete.")
    long_description = models.TextField(default="Space is our canvas. Food is our medium. Every dish, detail, and interaction contributes to a dining experience designed to be remembered.")
    
    # Contact & Coordinates
    phone = models.CharField(max_length=50, default="+1 (212) 555-0198")
    email = models.EmailField(default="concierge@monolith-dining.com")
    address = models.CharField(max_length=255, default="480 Industrial Avenue, District 09")
    city = models.CharField(max_length=100, default="New York, NY 10014")
    country = models.CharField(max_length=100, default="United States")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=40.7128)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=-74.0060)
    coordinates_display = models.CharField(max_length=100, default="40.7128° N, 74.0060° W — SECTOR 09")
    opening_hours_summary = models.CharField(max_length=255, default="MON — SUN / 17:30 — 00:00")
    
    # Hero content
    hero_eyebrow = models.CharField(max_length=150, default="CONTEMPORARY DINING / EST. 2021")
    hero_heading_line1 = models.CharField(max_length=100, default="FOOD.")
    hero_heading_line2 = models.CharField(max_length=100, default="FORM.")
    hero_heading_line3 = models.CharField(max_length=100, default="EXPRESSION.")
    hero_supporting_text = models.TextField(default="An exploration of contemporary cuisine, bold ingredients, and architecture-inspired dining.")
    hero_cta_primary = models.CharField(max_length=100, default="EXPLORE THE MENU")
    hero_cta_secondary = models.CharField(max_length=100, default="DISCOVER OUR SPACE")
    
    # Aesthetics & Metrics
    primary_color = models.CharField(max_length=20, default="#B8B5AD")
    accent_color = models.CharField(max_length=20, default="#F05A28")
    dark_color = models.CharField(max_length=20, default="#20211F")
    
    tables_capacity = models.IntegerField(default=54)
    daily_menu_courses = models.IntegerField(default=12)
    curated_vintages = models.IntegerField(default=420)
    
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
    materials_spec = models.CharField(max_length=255, default="Board-formed concrete, blackened steel, raw basalt")
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


class CulinaryProcessStage(models.Model):
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
    spec_badge = models.CharField(max_length=100, default="RAW ARCHITECTURE")
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('food', 'Culinary Creations'),
        ('interior', 'Concrete Interior'),
        ('exterior', 'Brutalist Architecture'),
        ('details', 'Raw Material Details'),
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
    source = models.CharField(max_length=150, default="Architecture & Dining Journal")
    review_text = models.TextField()
    rating = models.IntegerField(default=5)
    review_date = models.CharField(max_length=50, default="October 2025")
    is_featured = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.guest_name} ({self.source})"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('contacted', 'Contacted Guest'),
        ('confirmed', 'Confirmed Table'),
        ('seated', 'Seated / Completed'),
        ('declined', 'Declined'),
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
    seating_area = models.CharField(max_length=100, default="Main Concrete Hall")
    occasion = models.CharField(max_length=100, default="Dinner Service", blank=True)
    dietary_notes = models.TextField(blank=True, default='')
    table_number = models.CharField(max_length=50, blank=True, default='')
    shift = models.CharField(max_length=20, default='dinner', choices=[('lunch', 'Lunch Shift'), ('dinner', 'Dinner Shift')])
    message = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    @property
    def guest_name(self):
        return self.full_name

    @property
    def date(self):
        return self.reservation_date

    @property
    def time(self):
        return self.reservation_time

    @property
    def party_size(self):
        return self.guest_count

    @property
    def is_dinner_shift(self):
        t = str(self.reservation_time or '').strip().lower()
        if 'pm' in t:
            try:
                hour = int(t.replace('pm', '').split(':')[0].strip())
                if hour == 12 or (1 <= hour <= 4):
                    return False
                return True
            except:
                pass
        try:
            hour = int(t.split(':')[0].strip())
            return hour >= 17 or hour < 5
        except:
            return True

    def save(self, *args, **kwargs):
        if not self.reference_code:
            self.reference_code = f"BRUT-{timezone.now().strftime('%y%m%d')}-{uuid.uuid4().hex[:4].upper()}"
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
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


# ==============================================================================
# ELEMENTOR-STYLE STANDALONE CUSTOM PAGES
# ==============================================================================

class CustomPage(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    meta_description = models.TextField(blank=True, default='')
    theme_style = models.CharField(max_length=100, default='brutalist-concrete')
    is_published = models.BooleanField(default=True)
    show_in_navigation = models.BooleanField(default=True)
    nav_order = models.IntegerField(default=0)
    blocks = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nav_order', '-created_at']
        verbose_name = "Custom Standalone Page"
        verbose_name_plural = "Custom Standalone Pages"

    def __str__(self):
        return f"{self.title} (/page/{self.slug})"


# ==============================================================================
# EDITORIAL JOURNAL & BRUTALIST DISPATCH
# ==============================================================================

class BlogCategory(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    author_name = models.CharField(max_length=150, default="Chef Marcus Vance")
    author_role = models.CharField(max_length=150, default="Executive Chef & Spatial Architect")
    cover_image_url = models.URLField(max_length=1000, blank=True, default='')
    excerpt = models.TextField(blank=True, default='')
    content = models.TextField(help_text="Markdown or rich editorial content")
    read_time_minutes = models.IntegerField(default=5)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"

    def __str__(self):
        return self.title
