import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class SiteConfig(models.Model):
    """
    Stores complete structured content for all 15 Parisian Fine Dining sections,
    theme variables (Burgundy, Champagne Gold, Ivory, Charcoal), menus, and 3D viewpoints.
    """
    restaurant_name = models.CharField(max_length=200, default="L'ÉTOILE ROYALE")
    content_json = models.JSONField(
        default=dict,
        help_text="Complete structured content for all website sections and Parisian theme"
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Parisian Website CMS Configuration"
        verbose_name_plural = "Parisian Website CMS Configurations"
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.restaurant_name} (Updated {self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class CustomPage(models.Model):
    """Elementor-Style Modular Page Builder Pages"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    meta_description = models.TextField(blank=True, default="")
    blocks = models.JSONField(default=list, help_text="Modular block structure (hero, split, features, cta, etc.)")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Custom Page"
        verbose_name_plural = "Custom Pages"

    def __str__(self):
        return self.title


class BlogCategory(models.Model):
    """Categories for L'Étoile Royale Gastronomic Journal"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    """Parisian Gazette & Gastronomic Dispatches"""
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, related_name="posts")
    cover_image = models.URLField(max_length=500, blank=True, default="")
    excerpt = models.TextField(blank=True, default="")
    content = models.TextField(help_text="Full article dispatch")
    author_name = models.CharField(max_length=120, default="Alexandre de Morbihan")
    read_time = models.CharField(max_length=50, default="5 min read")
    is_published = models.BooleanField(default=True)
    views_count = models.PositiveIntegerField(default=0)
    published_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"

    def __str__(self):
        return self.title


class Reservation(models.Model):
    """
    Two-way table reservation system with shift filters (Lunch vs Dinner),
    Parisian reference codes (ROYAL-XXXXXX), and seating assignments.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Inquiry'),
        ('confirmed', 'Confirmed'),
        ('seated', 'Seated & Served'),
        ('cancelled', 'Cancelled'),
    ]

    SHIFT_CHOICES = [
        ('lunch', 'Service Déjeuner (Lunch)'),
        ('dinner', 'Service Dîner (Dinner)'),
    ]

    reference_code = models.CharField(max_length=32, unique=True, null=True, blank=True, db_index=True)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    date = models.DateField()
    time = models.CharField(max_length=50)
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES, default='dinner')
    guests = models.CharField(max_length=50, default='2')
    occasion = models.CharField(max_length=100, blank=True, default='Haute Gastronomie')
    experience = models.CharField(max_length=150, blank=True, default="Grand Salon d'Honneur")
    seating_area = models.CharField(max_length=150, blank=True, default="Grand Salon d'Honneur")
    table_number = models.CharField(max_length=20, blank=True, null=True)
    dietary_notes = models.TextField(blank=True, default='')
    special_requests = models.TextField(blank=True, null=True)
    admin_notes = models.TextField(blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Table Reservation"
        verbose_name_plural = "Table Reservations"
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.reference_code:
            hex_suffix = uuid.uuid4().hex[:6].upper()
            date_str = self.date.strftime('%y%m%d') if self.date else timezone.now().strftime('%y%m%d')
            shift_tag = "LUN" if self.shift == "lunch" else "DIN"
            self.reference_code = f"ROYAL-{date_str}-{shift_tag}{hex_suffix[:2]}"
        if not self.seating_area and self.experience:
            self.seating_area = self.experience
        elif not self.experience and self.seating_area:
            self.experience = self.seating_area
        super().save(*args, **kwargs)

    @property
    def guest_name(self):
        return self.full_name

    @property
    def party_size(self):
        try:
            return int(''.join(filter(str.isdigit, str(self.guests))) or 2)
        except Exception:
            return 2

    @property
    def time_slot(self):
        return self.time

    @property
    def preferred_zone(self):
        return self.seating_area or self.experience

    def __str__(self):
        return f"{self.reference_code} - {self.full_name} ({self.date} @ {self.time}) [{self.status}]"
