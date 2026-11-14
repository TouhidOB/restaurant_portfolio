from django.db import models

class SiteConfig(models.Model):
    site_title = models.CharField(max_length=150, default="VILLA RIVIERA")
    tagline = models.CharField(max_length=255, default="Coastal Villa Architecture Meets Contemporary Fine Dining")
    hero_subtitle = models.TextField(default="An architectural sanctuary overlooking the Mediterranean waters of Cap-Ferrat, where ancient limestone arches meet master culinary artistry.")
    philosophy_quote = models.TextField(default="The spirit of the Riviera is not merely a geography; it is the patient art of slow living, salt-washed stone, and sun-drenched honesty.")
    chef_quote = models.TextField(default="We cook as the Mediterranean dictates: pristine seafood drawn at dawn, wild herbs from the limestone crags, and centuries of coastal memory refined into contemporary elegance.")
    contact_email = models.EmailField(default="reservations@villariviera.com")
    contact_phone = models.CharField(max_length=50, default="+33 4 93 01 88 00")
    address = models.CharField(max_length=255, default="14 Chemin des Calanques, 06230 Saint-Jean-Cap-Ferrat, Côte d'Azur, France")
    opening_hours = models.CharField(max_length=255, default="Lunch: 12:00 – 15:00 | Dinner: 19:30 – 23:30 (Closed Tuesdays)")
    raw_content_json = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.site_title} Configuration"


class MenuCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(MenuCategory, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=150, blank=True)
    description = models.TextField()
    price = models.CharField(max_length=50)
    is_signature = models.BooleanField(default=False)
    dietary_tags = models.CharField(max_length=150, blank=True, help_text="e.g. Gluten-Free, Wild Catch, Pescatarian")
    pairing_notes = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.name} ({self.price})"


class TourViewpoint(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=100, unique=True)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    camera_position = models.CharField(max_length=100, default="[0, 2.5, 7.0]")
    camera_target = models.CharField(max_length=100, default="[0, 1.2, 0]")
    atmosphere = models.CharField(max_length=150, blank=True)
    highlights = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.order}. {self.title}"


class DiningExperience(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    capacity = models.CharField(max_length=100, default="2 to 12 Guests")
    timing = models.CharField(max_length=100, default="Evening | 19:30")
    price = models.CharField(max_length=100, default="€240 per guest")
    features = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=80, default="Architecture")
    image_url = models.CharField(max_length=500)
    caption = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"[{self.category}] {self.title}"


class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=120)
    bio = models.TextField()
    credentials = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.name} - {self.role}"


class Testimonial(models.Model):
    quote = models.TextField()
    author = models.CharField(max_length=120)
    source_title = models.CharField(max_length=150)
    rating = models.PositiveIntegerField(default=5)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.author} ({self.source_title})"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    date = models.CharField(max_length=50)
    time = models.CharField(max_length=30)
    guests = models.PositiveIntegerField(default=2)
    seating_area = models.CharField(max_length=100, default="Terrace & Sea View")
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.date} {self.time} ({self.guests}p) [{self.status}]"
