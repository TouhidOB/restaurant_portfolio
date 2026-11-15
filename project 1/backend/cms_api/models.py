import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify


class SiteConfig(models.Model):
    """
    Stores the full website dynamic configuration, themes, typography,
    and all 15 sections' data for the Art Deco restaurant CMS.
    """
    restaurant_name = models.CharField(max_length=200, default='AURELIA')
    content_json = models.JSONField(default=dict, help_text="Complete structured content for all sections and theme")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Website CMS Configuration"
        verbose_name_plural = "Website CMS Configurations"
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.restaurant_name} Config (Updated: {self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class CustomPage(models.Model):
    """
    Elementor-like Dynamic Standalone Custom Pages.
    Allows administrators to build dedicated landings, VIP event rooms,
    seasonal tasting menus, and corporate buyout pages.
    """
    THEME_CHOICES = [
        ('art-deco-gold', 'Art Deco Classic Gold & Emerald'),
        ('midnight-emerald', 'Midnight Emerald & Noir Velvet'),
        ('champagne-luxe', 'Champagne Minimalist Elegance'),
    ]

    title = models.CharField(max_length=200, help_text="Public page headline / title")
    slug = models.SlugField(max_length=220, unique=True, blank=True, help_text="URL slug e.g. /page/private-dining")
    meta_description = models.CharField(max_length=300, blank=True, default='', help_text="SEO & social snippet summary")
    theme_style = models.CharField(max_length=50, choices=THEME_CHOICES, default='art-deco-gold')
    is_published = models.BooleanField(default=True, help_text="Controls if page is publicly accessible")
    show_in_navigation = models.BooleanField(default=False, help_text="Display in top navbar and footer exploration")
    nav_order = models.PositiveIntegerField(default=1, help_text="Sort order in navigation menu")
    blocks = models.JSONField(default=list, blank=True, help_text="Ordered array of structured page content blocks")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Custom Standalone Page"
        verbose_name_plural = "Custom Standalone Pages"
        ordering = ['nav_order', '-created_at']

    def __str__(self):
        status = "Published" if self.is_published else "Draft"
        return f"{self.title} (/page/{self.slug}) [{status}]"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "custom-page"
            slug = base_slug
            counter = 1
            while CustomPage.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class BlogCategory(models.Model):
    """
    Categories for the Aurelia Editorial Journal.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Journal Category"
        verbose_name_plural = "Journal Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(models.Model):
    """
    Editorial Journal Articles & Culinary Dispatches.
    """
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    author_name = models.CharField(max_length=120, default='Aurelia Culinary Council')
    author_role = models.CharField(max_length=120, default='Master Sommelier & Chef de Cuisine')
    cover_image = models.ImageField(upload_to='blog_covers/', blank=True, null=True)
    cover_image_url = models.URLField(max_length=500, blank=True, default='', help_text="External CDN image URL")
    excerpt = models.TextField(help_text="Compelling 1-2 sentence hook for cards and previews")
    content = models.TextField(help_text="Full article copy (Supports HTML tags like <h3>, <p>, <blockquote>)")
    read_time_minutes = models.PositiveIntegerField(default=5)
    is_featured = models.BooleanField(default=False, help_text="Feature as lead hero dispatch")
    is_published = models.BooleanField(default=True)
    views_count = models.PositiveIntegerField(default=0)
    published_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Journal Article"
        verbose_name_plural = "Journal Articles"
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return f"{self.title} ({'Published' if self.is_published else 'Draft'})"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "journal-dispatch"
            slug = base_slug
            counter = 1
            while BlogPost.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Reservation(models.Model):
    """
    Stores customer reservation inquiries submitted via the website.
    Features 2-way approval workflow, lunch vs dinner shift filtering,
    table assignment, and customer reference code lookup.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('confirmed', 'Confirmed'),
        ('seated', 'Seated & Dining'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed Service'),
    ]

    SEATING_ZONE_CHOICES = [
        ('Art Deco Grand Salon', 'Art Deco Grand Salon (Center dining hall with crystal chandeliers)'),
        ('Champagne Parlour Vault', 'Champagne Parlour Vault (Plush velvet banquette with private vintage cart)'),
        ('Emerald Garden Terrace', 'Emerald Garden Terrace (Alfresco botanical dining with Gulshan skyline views)'),
        ('Private Cellar Dining', 'Private Cellar Dining (Exclusive sommelier vault for 6+ guests)'),
    ]

    reference_code = models.CharField(max_length=24, unique=True, blank=True, help_text="Unique customer lookup code e.g. AUR-A1B2C3")
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    date = models.DateField()
    time = models.CharField(max_length=50)
    guests = models.CharField(max_length=50, default='2')
    seating_area = models.CharField(max_length=100, default='Art Deco Grand Salon')
    occasion = models.CharField(max_length=100, default='Casual Fine Dining')
    dietary_notes = models.TextField(blank=True, null=True)
    special_requests = models.TextField(blank=True, null=True)
    table_number = models.CharField(max_length=30, blank=True, null=True, help_text="Table # assigned by Maitre D'")
    admin_notes = models.TextField(blank=True, null=True, help_text="Internal staff notes")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Table Reservation"
        verbose_name_plural = "Table Reservations"
        ordering = ['-date', 'time', '-created_at']

    def __str__(self):
        return f"[{self.reference_code}] {self.full_name} - {self.date} at {self.time} ({self.guests} guests) [{self.status}]"

    def save(self, *args, **kwargs):
        if not self.reference_code:
            code = f"AUR-{uuid.uuid4().hex[:6].upper()}"
            while Reservation.objects.filter(reference_code=code).exists():
                code = f"AUR-{uuid.uuid4().hex[:6].upper()}"
            self.reference_code = code
        super().save(*args, **kwargs)

    @property
    def guest_count(self):
        try:
            return int(''.join(filter(str.isdigit, str(self.guests)))) or 2
        except Exception:
            return 2

    @property
    def is_dinner_shift(self):
        """Returns True if booking is after 16:30 or contains PM after 4:00."""
        t = str(self.time).strip().lower()
        if 'pm' in t:
            try:
                hour = int(t.split(':')[0].replace('pm', '').strip())
                return hour >= 5 or hour == 12  # 5 PM onwards is dinner
            except Exception:
                return True
        if ':' in t:
            try:
                hour = int(t.split(':')[0])
                return hour >= 17
            except Exception:
                return True
        return True
