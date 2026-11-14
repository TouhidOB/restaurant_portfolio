from django.db import models
from django.contrib.auth.models import User

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
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    reservation_date = models.DateField()
    reservation_time = models.CharField(max_length=50)
    guests = models.PositiveIntegerField(default=2)
    occasion = models.CharField(max_length=100, blank=True, default="Cultural Dining")
    seating_preference = models.CharField(max_length=100, blank=True, default="Courtyard Heritage Table")
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

    def __str__(self):
        return f"{self.full_name} - {self.reservation_date} at {self.reservation_time} ({self.guests} guests) [{self.status}]"
