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
    seating_zone = models.CharField(max_length=100, blank=True, default="Greenhouse Atrium")
    occasion = models.CharField(max_length=100, blank=True, default="Botanical Brunch & Coffee")
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Table Reservation Inquiry"
        verbose_name_plural = "Table Reservation Inquiries"

    def __str__(self):
        return f"{self.full_name} - {self.reservation_date} at {self.reservation_time} ({self.guests} guests) [{self.status}]"
