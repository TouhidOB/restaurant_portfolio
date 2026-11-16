from django.db import models

class SiteConfig(models.Model):
    restaurant_name = models.CharField(max_length=200, default="SEOUL STREET (서울포차)")
    tagline = models.CharField(max_length=255, default="Contemporary Korean Street Culture Meets Cinematic Digital Dining")
    hero_subtitle = models.TextField(default="Discover sizzling spicy tteokbokki, golden crispy Korean fried chicken, and late-night street pocha energy under glowing Seoul neons.")
    contact_email = models.EmailField(default="hello@seoulstreetfood.com")
    contact_phone = models.CharField(max_length=50, default="+82 2 312 9988")
    address = models.CharField(max_length=255, default="28 Wausan-ro 21-gil, Mapo-gu, Seoul, South Korea (Hongdae Night Market)")
    opening_hours = models.CharField(max_length=255, default="Monday – Sunday: 17:00 – 04:00 (Late Night Street Pocha)")
    content_json = models.JSONField(default=dict, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.restaurant_name} Configuration"


class MenuCategory(models.Model):
    name = models.CharField(max_length=150)
    korean_name = models.CharField(max_length=100, blank=True)
    slug = models.SlugField(max_length=150, unique=True)
    description = models.TextField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    korean_name = models.CharField(max_length=150, blank=True)
    slug = models.SlugField(max_length=200, unique=True)
    short_description = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    price = models.CharField(max_length=50, default="₩14,000")
    currency = models.CharField(max_length=10, default="KRW")
    image_url = models.CharField(max_length=500, blank=True)
    image = models.CharField(max_length=500, blank=True)
    dietary_tags = models.CharField(max_length=200, blank=True, help_text="e.g. Spicy, Halal Friendly, Vegetarian")
    spicy_level = models.PositiveSmallIntegerField(default=1, help_text="0: Mild, 1: Medium, 2: Hot, 3: Fire")
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"{self.name} ({self.price})"


class TourViewpoint(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=200, blank=True)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    camera_position = models.CharField(max_length=100, default="[0, 2.5, 7.0]")
    camera_target = models.CharField(max_length=100, default="[0, 1.2, 0]")
    atmosphere = models.CharField(max_length=150, blank=True)
    highlights = models.JSONField(default=list, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"{self.sort_order}. {self.title}"


class DiningExperience(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    capacity = models.CharField(max_length=100, default="4 to 10 People")
    timing = models.CharField(max_length=100, default="Evening | 18:00 – Late")
    price = models.CharField(max_length=100, default="₩45,000 per person")
    features = models.JSONField(default=list, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return self.title


class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('food', 'Food'),
        ('interior', 'Interior'),
        ('exterior', 'Exterior'),
        ('kitchen', 'Kitchen'),
        ('events', 'Events'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES, default='food')
    image_url = models.CharField(max_length=500)
    caption = models.TextField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"[{self.category}] {self.title}"


class TeamMember(models.Model):
    name = models.CharField(max_length=120)
    korean_name = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    quote = models.CharField(max_length=300, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"{self.name} - {self.role}"


class Testimonial(models.Model):
    author = models.CharField(max_length=120)
    quote = models.TextField()
    source = models.CharField(max_length=150, default="Verified Night Foodie")
    rating = models.PositiveIntegerField(default=5)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"{self.author} ({self.source})"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('confirmed', 'Confirmed'),
        ('seated', 'Seated'),
        ('cancelled', 'Cancelled'),
    ]
    SHIFT_CHOICES = [
        ('lunch', 'Daylight Lunch Shift'),
        ('dinner', 'Twilight Pocha Shift'),
    ]

    reference_code = models.CharField(max_length=32, unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    preferred_date = models.CharField(max_length=50)
    preferred_time = models.CharField(max_length=50)
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES, default='dinner')
    guests = models.PositiveIntegerField(default=2)
    occasion = models.CharField(max_length=100, blank=True)
    selected_experience = models.CharField(max_length=150, blank=True, default="Street Pocha Table")
    table_number = models.CharField(max_length=50, blank=True, default='')
    dietary_notes = models.TextField(blank=True, default='')
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.reference_code:
            import uuid
            self.reference_code = f"SEO-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.reference_code}] {self.full_name} ({self.guests}p) - {self.preferred_date} {self.preferred_time} [{self.status}]"


class CustomPage(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    meta_description = models.TextField(blank=True)
    is_published = models.BooleanField(default=True)
    blocks = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class BlogCategory(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Blog Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.ForeignKey(BlogCategory, related_name='posts', on_delete=models.SET_NULL, null=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    image = models.CharField(max_length=500, blank=True)
    author_name = models.CharField(max_length=120, default='Seoul Street Team')
    published_at = models.DateField(auto_now_add=True)
    read_time = models.CharField(max_length=50, default='5 min read')
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

