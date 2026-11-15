import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify


class SiteConfig(models.Model):
    """
    Stores complete structured content for all 15 Japanese Zen sections,
    theme variables (colors, typography), menu, and 3D tour viewpoints.
    """
    restaurant_name = models.CharField(max_length=200, default='ENSO 圓相')
    content_json = models.JSONField(
        default=dict,
        help_text="Complete structured content for all website sections and Zen theme"
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Zen Website CMS Configuration"
        verbose_name_plural = "Zen Website CMS Configurations"
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.restaurant_name} (Updated {self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class CustomPage(models.Model):
    """
    Elementor-like Dynamic Standalone Custom Pages.
    Allows administrators to build dedicated landings, VIP tea ceremonies,
    seasonal Kaiseki tasting menus, and corporate buyout pages.
    """
    THEME_CHOICES = [
        ('zen-charcoal', 'Zen Charcoal & Bamboo Minimalist'),
        ('wabi-sabi-paper', 'Wabi-Sabi Rice Paper & Cedar'),
        ('bamboo-tea-luxe', 'Kyoto Tea Pavilion & Moss Green'),
    ]

    title = models.CharField(max_length=200, help_text="Public page headline / title")
    slug = models.SlugField(max_length=220, unique=True, blank=True, help_text="URL slug e.g. /page/private-kaiseki")
    meta_description = models.CharField(max_length=300, blank=True, default='', help_text="SEO & social snippet summary")
    theme_style = models.CharField(max_length=50, choices=THEME_CHOICES, default='zen-charcoal')
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
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class BlogCategory(models.Model):
    """
    Topic categories for the ENSO Zen Journal & Culinary Chronicles.
    """
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    description = models.TextField(blank=True, default='')
    display_order = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = "Journal Category"
        verbose_name_plural = "Journal Categories"
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(models.Model):
    """
    Editorial blog articles, culinary stories, tea ceremonies, and ingredient spotlights.
    """
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=260, unique=True, blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, related_name='posts')
    author_name = models.CharField(max_length=120, default='Master Kenji Sato')
    author_role = models.CharField(max_length=120, default='Executive Itamae & Tea Master')
    author_avatar = models.URLField(
        blank=True,
        default='https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=300&auto=format&fit=crop'
    )
    cover_image = models.URLField(
        default='https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop',
        help_text="Primary feature photography URL"
    )
    excerpt = models.TextField(help_text="Short teaser paragraph for cards and social metadata")
    content = models.TextField(help_text="Full markdown or HTML formatted editorial article body")
    read_time_minutes = models.PositiveIntegerField(default=5)
    is_featured = models.BooleanField(default=False, help_text="Promote to top dispatch hero spot")
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Zen Journal Dispatch"
        verbose_name_plural = "Zen Journal Dispatches"
        ordering = ['-is_featured', '-published_at', '-created_at']

    def __str__(self):
        return f"{self.title} [{self.category.name if self.category else 'Uncategorized'}]"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Reservation(models.Model):
    """
    Table reservations with reference code, two-way approval workflow,
    lunch vs dinner shift filtering, seating zone allocation, and dietary requirements.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('confirmed', 'Confirmed & Held'),
        ('seated', 'Currently Seated'),
        ('completed', 'Completed Visit'),
        ('cancelled', 'Cancelled / Released'),
    ]

    SHIFT_CHOICES = [
        ('lunch', 'Lunch Shift (12:30 – 15:30)'),
        ('dinner', 'Dinner & Tea Shift (18:00 – 23:30)'),
    ]

    reference_code = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        help_text="Unique booking locator e.g. ENS-4B9F2A"
    )
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    date = models.DateField()
    time = models.CharField(max_length=50)
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES, default='dinner')
    guests = models.CharField(max_length=50, default='2 Guests')
    occasion = models.CharField(max_length=100, blank=True, default='Omakase Dining')
    experience = models.CharField(max_length=150, blank=True, default='Kaiseki Experience')
    seating_area = models.CharField(
        max_length=120,
        blank=True,
        default='Cedar Omakase Counter',
        help_text="Designated zone (Cedar Counter, Tatami Room, Garden Terrace, Main Pavilion)"
    )
    table_assigned = models.CharField(
        max_length=50,
        blank=True,
        default='',
        help_text="Assigned physical table identifier (e.g. Counter-01, Tatami-03)"
    )
    dietary_notes = models.TextField(
        blank=True,
        default='',
        help_text="Customer dietary requirements (e.g. no shellfish, gluten-free, halal)"
    )
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    internal_notes = models.TextField(
        blank=True,
        default='',
        help_text="Staff-only operational notes, VIP preferences, sommelier pairing tags"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Table Reservation"
        verbose_name_plural = "Table Reservations"
        ordering = ['-date', '-time', '-created_at']

    def __str__(self):
        return f"[{self.reference_code}] {self.full_name} — {self.date} {self.time} ({self.guests}) [{self.status}]"

    @property
    def is_dinner_shift(self):
        t = str(self.time).upper()
        if 'PM' in t:
            try:
                hour = int(t.split(':')[0].strip())
                if hour == 12 or hour < 5:
                    return False
                return True
            except (ValueError, IndexError):
                pass
        return self.shift == 'dinner'

    def save(self, *args, **kwargs):
        if not self.reference_code:
            short_uuid = uuid.uuid4().hex[:6].upper()
            self.reference_code = f"ENS-{short_uuid}"

        t = str(self.time).upper()
        if '12:' in t or '01:' in t or '02:' in t or '03:' in t:
            self.shift = 'lunch'
        else:
            self.shift = 'dinner'

        super().save(*args, **kwargs)
