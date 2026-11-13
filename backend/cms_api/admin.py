from django.contrib import admin
from .models import SiteConfig, Reservation

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'is_published', 'updated_at', 'updated_by')
    list_filter = ('is_published', 'updated_at')
    search_fields = ('restaurant_name',)

    def save_model(self, request, obj, form, change):
        if not obj.updated_by:
            obj.updated_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'date', 'time', 'guests', 'occasion', 'status', 'created_at')
    list_filter = ('status', 'date', 'occasion')
    search_fields = ('full_name', 'phone', 'email')
    list_editable = ('status',)
    date_hierarchy = 'date'
