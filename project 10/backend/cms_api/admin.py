from django.contrib import admin
from .models import SiteConfig, MenuCategory, MenuItem, Reservation, CustomPage, BlogCategory, BlogPost

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("restaurant_name", "default_language", "is_published", "updated_at")

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ("name_en", "name_bn", "slug", "sort_order", "is_active")
    prepopulated_fields = {"slug": ("name_en",)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name_en", "name_bn", "category", "price", "currency", "spice_level", "is_available", "is_featured")
    list_filter = ("category", "is_available", "is_featured", "spice_level")
    search_fields = ("name_en", "name_bn", "description_en")

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ("reference_code", "full_name", "reservation_date", "reservation_time", "shift", "guests", "table_number", "status")
    list_filter = ("status", "shift", "reservation_date")
    search_fields = ("reference_code", "full_name", "phone", "email")

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_published", "updated_at")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "author_name", "published_at", "is_published")
    list_filter = ("category", "is_published", "published_at")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "content", "author_name")
