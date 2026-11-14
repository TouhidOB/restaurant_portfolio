from django.db import models
from django.contrib.auth.models import User

class SiteConfig(models.Model):
    """
    Stores complete structured content for all 15 Urban Industrial Kitchen sections,
    theme variables (Graphite, Brick, Concrete, Off-White, Copper, Charcoal, Amber),
    menus, 3D viewpoints, and spatial specs.
    """
    restaurant_name = models.CharField(max_length=200, default="URBAN TABLE")
    content_json = models.JSONField(
        default=dict,
        help_text="Complete structured content for all website sections and industrial theme"
    )
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Urban Industrial CMS Configuration"
        verbose_name_plural = "Urban Industrial CMS Configurations"
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.restaurant_name} (Updated {self.updated_at.strftime('%Y-%m-%d %H:%M')})"


class Reservation(models.Model):
    """
    Stores customer table reservation inquiries submitted through the website.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending Inquiry'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    date = models.DateField()
    time = models.CharField(max_length=50)
    guests = models.CharField(max_length=50)
    occasion = models.CharField(max_length=100, blank=True, default='Casual Dining')
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Table Reservation"
        verbose_name_plural = "Table Reservations"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.date} at {self.time} ({self.guests}) [{self.status}]"
