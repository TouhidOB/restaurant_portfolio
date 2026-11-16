import uuid
import datetime
from django.db import models


class SiteConfig(models.Model):
    """
    Master configuration store for the Botanical Glasshouse Café.
    Holds the complete editorial JSON for all 15 homepage sections,
    botanical atmosphere parameters, hours, contacts, and 3D specifications.
    """
    cafe_name = models.CharField(max_length=200, default="VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ")
    content_json = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configurations"

    def __str__(self):
        return f"{self.cafe_name} Config (Updated: {self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class MenuCategory(models.Model):
    """
    Botanical café menu categories (e.g. Specialty Coffee, Cold Brew & Botanical Infusions, Artisanal Teas, Brunch, Fresh Pastries).
    """
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    description = models.TextField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Menu Category"
        verbose_name_plural = "Menu Categories"

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    """
    Artisanal café items with botanical notes, origins, dietary indicators, and pricing.
    """
    category = models.ForeignKey(MenuCategory, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="$")
    image = models.CharField(max_length=500, blank=True, null=True)
    botanical_notes = models.TextField(blank=True, help_text="e.g. Infused with wild elderflower & bergamot mist")
    dietary_tags = models.JSONField(default=list, blank=True, help_text="e.g. ['Vegan', 'Single-Origin', 'Organic']")
    temperature = models.CharField(max_length=50, blank=True, default="Hot or Iced")
    is_signature = models.BooleanField(default=False)
    is_seasonal = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"

    def __str__(self):
        return f"{self.name} ({self.currency}{self.price})"


class Reservation(models.Model):
    """
    Customer table and visit reservation inquiries for the Botanical Glasshouse Café.
    """
    STATUS_CHOICES = [
        ("pending", "Pending Inquiry"),
        ("confirmed", "Confirmed"),
        ("seated", "Seated"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    SHIFT_CHOICES = [
        ("lunch", "Daylight & Botanical Brunch (09:00 - 15:30)"),
        ("dinner", "Twilight Lantern Dining (17:30 - 22:30)"),
    ]

    reference_code = models.CharField(max_length=60, unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    reservation_date = models.DateField()
    reservation_time = models.CharField(max_length=50)
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES, default="lunch")
    table_number = models.CharField(max_length=30, blank=True, null=True)
    guests = models.PositiveIntegerField(default=2)
    seating_zone = models.CharField(max_length=100, blank=True, default="Greenhouse Atrium")
    occasion = models.CharField(max_length=100, blank=True, default="Botanical Brunch & Coffee")
    dietary_notes = models.TextField(blank=True, null=True)
    special_requests = models.TextField(blank=True)
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
            self.reference_code = f"VER-{today_str}-{rand_code}"
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
    Editorial category for Botanical Glasshouse Journal & Coffee Roastery Gazette.
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
    Editorial journal articles on micro-lot coffee origin, biophilic architecture, and living plant care.
    """
    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=300, unique=True)
    category = models.ForeignKey(BlogCategory, related_name="posts", on_delete=models.SET_NULL, null=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(help_text="Full article body / HTML")
    featured_image = models.CharField(max_length=500, blank=True)
    author_name = models.CharField(max_length=150, default="Elena Vance")
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
