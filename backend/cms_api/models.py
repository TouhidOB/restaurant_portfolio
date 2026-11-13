from django.db import models
from django.contrib.auth.models import User

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


class Reservation(models.Model):
    """
    Stores customer reservation inquiries submitted via the website.
    Only site admins can view, confirm, or manage these.
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
    occasion = models.CharField(max_length=100, default='Casual Fine Dining')
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Table Reservation"
        verbose_name_plural = "Table Reservations"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.date} at {self.time} ({self.guests}) [{self.status}]"
