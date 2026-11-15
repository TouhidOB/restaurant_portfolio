import uuid
from django.db import models
from django.utils import timezone

class Restaurant(models.Model):
    name = models.CharField(max_length=200, default="STARDUST // RETRO-FUTURISTIC DINER")
    slug = models.SlugField(unique=True, default="stardust-diner")
    tagline = models.CharField(max_length=255, default="CLASSIC TASTE. FUTURE ENERGY.")
    short_description = models.TextField(
        default="A neon-infused destination where classic 1950s American diner culture converges with atomic-age science fiction and modern comfort gastronomy."
    )
    long_description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='restaurant/logos/', blank=True, null=True)
    favicon = models.ImageField(upload_to='restaurant/favicons/', blank=True, null=True)

    phone = models.CharField(max_length=50, default="+1 (312) 555-1955")
    email = models.EmailField(default="concierge@stardustdiner.com")
    address = models.CharField(max_length=255, default="550 Neon Boulevard, Atomic District")
    city = models.CharField(max_length=100, default="Chicago, IL 60611")
    country = models.CharField(max_length=100, default="USA")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=41.8781)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=-87.6298)
    coordinates_display = models.CharField(max_length=100, default="41.8781° N, 87.6298° W — ATOMIC DISTRICT")

    opening_hours_summary = models.CharField(max_length=255, default="MON — SUN / 08:00 — 02:00 (MIDNIGHT SERVICE)")
    social_links = models.JSONField(default=dict, blank=True)

    # Hero Customization Fields
    hero_eyebrow = models.CharField(max_length=150, default="EST. 1955 // A NEW KIND OF DINER")
    hero_heading_line1 = models.CharField(max_length=50, default="GOOD TIMES.")
    hero_heading_line2 = models.CharField(max_length=50, default="GREAT TASTE.")
    hero_heading_line3 = models.CharField(max_length=50, default="NEXT LEVEL.")
    hero_supporting_text = models.TextField(
        default="Step into a dining experience where classic American diner culture meets contemporary flavor, chrome aesthetics, and glowing neon energy."
    )
    hero_cta_primary = models.CharField(max_length=80, default="EXPLORE THE MENU")
    hero_cta_secondary = models.CharField(max_length=80, default="ENTER THE DINER")

    # Metrics
    established_year = models.IntegerField(default=1955)
    counter_stools = models.IntegerField(default=24)
    atomic_booths = models.IntegerField(default=18)
    jukebox_tracks = models.IntegerField(default=120)

    # Styling colors
    primary_color = models.CharField(max_length=30, default="#111A2B") # Midnight Navy
    secondary_color = models.CharField(max_length=30, default="#D83A45") # Cherry Red
    accent_color = models.CharField(max_length=30, default="#43D9E8") # Neon Cyan
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class BrandSettings(models.Model):
    brand_tagline = models.CharField(max_length=255, default="CLASSIC TASTE. FUTURE ENERGY.")
    hero_headline = models.CharField(max_length=255, default="GOOD TIMES. GREAT TASTE. NEXT LEVEL.")
    hero_subtitle = models.TextField(default="Where 1950s atomic roadside dreams meet cyber-future flavor.")
    primary_color = models.CharField(max_length=30, default="#111A2B")
    secondary_color = models.CharField(max_length=30, default="#D83A45")
    accent_color = models.CharField(max_length=30, default="#43D9E8")
    neon_effect_enabled = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Brand Settings ({self.brand_tagline})"


class WebsiteSection(models.Model):
    SECTION_CHOICES = [
        ('hero', '01 - Cinematic Retro-Futuristic Hero'),
        ('intro', '02 - Editorial Introduction'),
        ('philosophy', '03 - Restaurant Philosophy'),
        ('signatures', '04 - Signature Dishes'),
        ('menu_explorer', '05 - Interactive Menu Explorer'),
        ('diner_story', '06 - Diner Story & Heritage'),
        ('diner_architecture', '07 - Diner Architecture & Interior'),
        ('virtual_tour', '08 - Virtual Restaurant Tour'),
        ('diner_experience', '09 - The Diner Experience'),
        ('gallery', '10 - Restaurant Gallery Archive'),
        ('testimonials', '11 - Guest Testimonials'),
        ('reservation', '12 - Table Reservation Inquiry'),
        ('location_contact', '13 - Location & Hours'),
        ('faq', '14 - Frequently Asked Questions'),
        ('footer', '15 - Footer & Colophon'),
    ]

    section_key = models.CharField(max_length=60, choices=SECTION_CHOICES, unique=True)
    eyebrow = models.CharField(max_length=150, blank=True)
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True)
    is_visible = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    custom_content = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.get_section_key_display()}"


class MenuCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Menu Categories"
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=255)
    full_description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    currency_symbol = models.CharField(max_length=10, default="$")
    image = models.ImageField(upload_to='menu/items/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    dietary_information = models.JSONField(default=list, blank=True)
    allergens = models.CharField(max_length=255, blank=True)
    is_featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class VirtualTourViewpoint(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    space_name = models.CharField(max_length=150, default="Main Diner Pavilion")
    description = models.TextField()
    materials_spec = models.CharField(max_length=255, default="Polished chrome, red vinyl, stainless steel")
    camera_position = models.JSONField(default=list) # [x, y, z]
    camera_target = models.JSONField(default=list) # [x, y, z]
    hotspot_title = models.CharField(max_length=100, blank=True)
    hotspot_detail = models.CharField(max_length=255, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    panorama_image = models.ImageField(upload_to='tour/panoramas/', blank=True, null=True)
    model_file = models.CharField(max_length=255, blank=True)
    viewpoint_type = models.CharField(max_length=50, default="3d_model")
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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


class DinerStoryStage(models.Model):
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


class DinerExperiencePanel(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    subtitle = models.CharField(max_length=200)
    description = models.TextField()
    spec_badge = models.CharField(max_length=100, default="RETRO-FUTURISM")
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('food', 'Food'),
        ('interior', 'Interior'),
        ('exterior', 'Exterior'),
        ('drinks', 'Drinks'),
        ('dining', 'Dining Experience'),
        ('details', 'Chrome Details'),
    ]

    title = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='food')
    caption = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.title} [{self.category}]"


class Testimonial(models.Model):
    guest_name = models.CharField(max_length=150)
    source = models.CharField(max_length=150, default="Atomic Age Chronicle")
    review_text = models.TextField()
    rating = models.IntegerField(default=5)
    review_date = models.CharField(max_length=50, default="December 2025")
    is_featured = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.guest_name} ({self.source})"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('confirmed', 'Approved & Confirmed'),
        ('declined', 'Declined'),
        ('seated', 'Seated at Table'),
        ('completed', 'Dining Completed'),
        ('cancelled', 'Cancelled by Guest'),
        ('no_show', 'No-Show'),
    ]
    OCCASION_CHOICES = [
        ('casual', 'Casual Dining'),
        ('birthday', 'Birthday Celebration'),
        ('anniversary', 'Anniversary'),
        ('business', 'Business Dinner'),
        ('date', 'Romantic Date'),
        ('celebration', 'Special Celebration'),
    ]
    reference_code = models.CharField(max_length=50, unique=True, editable=False)
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    reservation_date = models.DateField()
    reservation_time = models.CharField(max_length=20, default="19:30")
    guest_count = models.IntegerField(default=2)
    seating_area = models.CharField(max_length=100, default="Retro Leather Booth")
    occasion = models.CharField(max_length=50, choices=OCCASION_CHOICES, default='casual')
    dietary_notes = models.TextField(blank=True)
    table_number = models.CharField(max_length=50, blank=True, help_text="e.g. Booth 4, Table 12, Counter 2")
    message = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-reservation_date', '-reservation_time', '-created_at']

    def save(self, *args, **kwargs):
        if not self.reference_code:
            self.reference_code = f"RETRO-{timezone.now().strftime('%y%m%d')}-{uuid.uuid4().hex[:4].upper()}"
        super().save(*args, **kwargs)

    @property
    def is_dinner_shift(self):
        try:
            hour = int(self.reservation_time.split(':')[0])
            return hour >= 16
        except Exception:
            return True

    def __str__(self):
        return f"{self.reference_code} — {self.full_name} ({self.guest_count} guests) [{self.status}]"


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.question


class ContactInquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=200, default="General Inquiry")
    message = models.TextField()
    status = models.CharField(max_length=30, default="new")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.subject}"


class CustomPage(models.Model):
    """
    Dynamic Standalone Page with Elementor-like modular block schema.
    """
    THEME_CHOICES = [
        ('retro-neon', 'Retro Neon (Midnight & Cyan)'),
        ('cream-editorial', 'Cream Editorial (Cherry & Cream)'),
        ('midnight-luxury', 'Deep Midnight Charcoal'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    meta_description = models.TextField(blank=True)
    theme_style = models.CharField(max_length=40, choices=THEME_CHOICES, default='retro-neon')
    is_published = models.BooleanField(default=True)
    show_in_navigation = models.BooleanField(default=True)
    nav_order = models.IntegerField(default=0)
    blocks = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nav_order', '-created_at']

    def __str__(self):
        return f"{self.title} (/{self.slug}) [Published: {self.is_published}]"
