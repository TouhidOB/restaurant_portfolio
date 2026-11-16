from django.db import models
from django.contrib.auth.models import User
import uuid
import datetime

class SiteConfig(models.Model):
    """
    Stores global configuration, structured bilingual content for all 15 sections,
    design tokens (Terracotta, Deep Indigo, Warm Ivory, Muted Brass, Jute Sand, Leaf Green, Charcoal Ink, River Mist),
    virtual tour viewpoints, and publishing state.
    """
    restaurant_name = models.CharField(max_length=200, default="BENGAL HERITAGE DINING")
    content_json = models.JSONField(
        default=dict,
        help_text="Structured bilingual content for all 15 sections"
    )
    theme_json = models.JSONField(
        default=dict,
        help_text="Design tokens: colors, typography, layout geometry"
    )
    default_language = models.CharField(max_length=5, default="en")
    supported_languages = models.JSONField(default=list)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Bengali Heritage Site Configuration"
        verbose_name_plural = "Bengali Heritage Site Configurations"
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.restaurant_name} (Updated {self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class MenuCategory(models.Model):
    """
    Bilingual Menu Categories (Starters, Traditional Bengali, Rice & Biryani, Fish & Seafood, etc.)
    """
    name_en = models.CharField(max_length=150)
    name_bn = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    description_en = models.TextField(blank=True)
    description_bn = models.TextField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Menu Category"
        verbose_name_plural = "Menu Categories"

    def __str__(self):
        return f"{self.name_en} / {self.name_bn}"


class MenuItem(models.Model):
    """
    Bilingual Menu Items with ingredients, dietary tags, spice level, and price.
    """
    category = models.ForeignKey(MenuCategory, related_name="items", on_delete=models.CASCADE)
    name_en = models.CharField(max_length=200)
    name_bn = models.CharField(max_length=200)
    description_en = models.TextField(blank=True)
    description_bn = models.TextField(blank=True)
    ingredients_en = models.TextField(blank=True)
    ingredients_bn = models.TextField(blank=True)
    allergens = models.JSONField(default=list, blank=True)
    dietary_tags = models.JSONField(default=list, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, default="BDT")
    image = models.CharField(max_length=500, blank=True, null=True)
    spice_level = models.CharField(max_length=50, blank=True, default="Medium")
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"

    def __str__(self):
        return f"{self.name_en} / {self.name_bn} ({self.price} {self.currency})"


class Reservation(models.Model):
    """
    Customer table reservation inquiries submitted through the website or modal.
    """
    STATUS_CHOICES = [
        ("pending", "Pending Inquiry"),
        ("contacted", "Guest Contacted"),
        ("confirmed", "Confirmed"),
        ("seated", "Seated"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    SHIFT_CHOICES = [
        ("lunch", "Lunch Shift (12:00 - 15:30)"),
        ("dinner", "Dinner Shift (18:30 - 23:00)"),
    ]

    reference_code = models.CharField(max_length=60, unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    reservation_date = models.DateField()
    reservation_time = models.CharField(max_length=50)
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES, default="dinner")
    table_number = models.CharField(max_length=30, blank=True, null=True)
    guests = models.PositiveIntegerField(default=2)
    occasion = models.CharField(max_length=100, blank=True, default="Cultural Dining")
    seating_preference = models.CharField(max_length=100, blank=True, default="Courtyard Heritage Table")
    dietary_notes = models.TextField(blank=True, null=True)
    special_requests = models.TextField(blank=True)
    preferred_language = models.CharField(max_length=10, default="bn")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Table Reservation"
        verbose_name_plural = "Table Reservations"

    def save(self, *args, **kwargs):
        if not self.reference_code:
            today_str = datetime.date.today().strftime("%y%m%d")
            rand_code = uuid.uuid4().hex[:4].upper()
            self.reference_code = f"BEN-{today_str}-{rand_code}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.reference_code}] {self.full_name} - {self.reservation_date} ({self.shift}) [{self.status}]"


class CustomPage(models.Model):
    """
    Elementor-style visual page builder storage for standalone frontend pages.
    """
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    meta_description = models.TextField(blank=True)
    blocks = models.JSONField(
        default=list,
        help_text="Ordered list of visual blocks: hero, split, features, cta, gallery, reservation, faq"
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]
        verbose_name = "Custom Standalone Page"
        verbose_name_plural = "Custom Standalone Pages"

    def __str__(self):
        return f"{self.title} (/page/{self.slug})"


class BlogCategory(models.Model):
    """
    Editorial category for Bengal Heritage culinary journal & cultural gazette.
    """
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    """
    Editorial journal articles on Zamindari culinary traditions, river delta spices, and heritage gastronomy.
    """
    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, unique=True)
    category = models.ForeignKey(BlogCategory, related_name="posts", on_delete=models.SET_NULL, null=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(help_text="Full article body / HTML")
    featured_image = models.CharField(max_length=500, blank=True)
    author_name = models.CharField(max_length=150, default="Chef Subrata Roy")
    reading_time = models.CharField(max_length=50, default="5 min read")
    is_published = models.BooleanField(default=True)
    published_at = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"

    def __str__(self):
        return f"{self.title} ({self.published_at})"
