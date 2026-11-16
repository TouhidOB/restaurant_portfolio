from django.contrib import admin
from .models import SiteConfig, MenuCategory, MenuItem, Reservation, CustomPage, BlogCategory, BlogPost

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ["cafe_name", "updated_at"]

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "sort_order", "is_active"]
    prepopulated_fields = {"slug": ("name",)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "price", "currency", "is_signature", "is_available"]
    list_filter = ["category", "is_signature", "is_available"]

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ["reference_code", "full_name", "reservation_date", "reservation_time", "shift", "guests", "status"]
    list_filter = ["status", "shift", "reservation_date"]
    search_fields = ["reference_code", "full_name", "phone", "email"]

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "is_published", "updated_at"]
    prepopulated_fields = {"slug": ("title",)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "author_name", "is_published", "published_at"]
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ["is_published", "category"]
