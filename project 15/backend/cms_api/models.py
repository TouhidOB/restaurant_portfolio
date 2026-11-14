from django.db import models
from django.contrib.auth.models import User

class SiteConfig(models.Model):
    restaurant_name = models.CharField(max_length=200, default="POP! FOOD STUDIO")
    content_json = models.JSONField(default=dict)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.restaurant_name} ({'Published' if self.is_published else 'Draft'})"


class MenuCategory(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    badge_color = models.CharField(max_length=20, default="#F04438")
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=10, default="$")
    image = models.ImageField(upload_to="dishes/", blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    badge_text = models.CharField(max_length=50, blank=True)
    dietary_tags = models.JSONField(default=list, blank=True)
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.name} (${self.price})"

    @property
    def display_image(self):
        if self.image:
            return self.image.url
        return self.image_url


class TourViewpoint(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="virtual_tour/", blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    camera_position = models.JSONField(default=list, blank=True)
    camera_target = models.JSONField(default=list, blank=True)
    scene_mood = models.JSONField(default=dict, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title

    @property
    def display_image(self):
        if self.image:
            return self.image.url
        return self.image_url


class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ("food", "Studio Food Art"),
        ("interior", "Pop Dining Spaces"),
        ("exterior", "Pop-Art Storefront"),
        ("kitchen", "The Food Lab"),
        ("events", "Creative Events"),
    ]
    title = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to="gallery/", blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="food")
    alt_text = models.CharField(max_length=250, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title or f"Gallery #{self.id}"

    @property
    def display_image(self):
        if self.image:
            return self.image.url
        return self.image_url


class DiningExperience(models.Model):
    title = models.CharField(max_length=150)
    tagline = models.CharField(max_length=250, blank=True)
    description = models.TextField(blank=True)
    capacity = models.CharField(max_length=100, blank=True)
    price_guide = models.CharField(max_length=100, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    quote = models.TextField(blank=True)
    specialty = models.CharField(max_length=200, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.name} - {self.role}"


class Testimonial(models.Model):
    customer_name = models.CharField(max_length=150)
    source = models.CharField(max_length=150, blank=True)
    review_text = models.TextField()
    rating = models.PositiveIntegerField(default=5)
    review_date = models.CharField(max_length=50, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.customer_name} ({self.source})"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ("new", "New Inquiry"),
        ("reviewing", "Reviewing"),
        ("contacted", "Contacted"),
        ("confirmed", "Confirmed"),
        ("rejected", "Rejected"),
    ]
    INQUIRY_CHOICES = [
        ("Table Reservation", "Table Reservation"),
        ("Group Dining", "Group Dining"),
        ("Event Inquiry", "Event Inquiry"),
        ("General Question", "General Question"),
    ]

    customer_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    preferred_date = models.DateField()
    preferred_time = models.CharField(max_length=50)
    guest_count = models.PositiveIntegerField(default=2)
    inquiry_type = models.CharField(max_length=50, choices=INQUIRY_CHOICES, default="Table Reservation")
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.customer_name} - {self.preferred_date} ({self.guest_count} guests, {self.status})"
