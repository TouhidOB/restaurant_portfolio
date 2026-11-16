from django.contrib import admin
from .models import (
    SiteConfig,
    MenuCategory,
    MenuItem,
    TourViewpoint,
    GalleryItem,
    DiningExperience,
    TeamMember,
    Testimonial,
    Reservation,
    CustomPage,
    BlogCategory,
    BlogPost,
)

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("restaurant_name", "is_published", "updated_at")

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "sort_order", "is_active")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "is_available", "is_featured", "sort_order")
    list_filter = ("category", "is_available", "is_featured")
    search_fields = ("name", "description")

@admin.register(TourViewpoint)
class TourViewpointAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "sort_order", "is_active")

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "sort_order", "is_active")
    list_filter = ("category", "is_active")

@admin.register(DiningExperience)
class DiningExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "capacity", "price_guide", "sort_order", "is_active")

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "sort_order", "is_active")

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("guest_name", "source", "rating", "is_active")

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ("reference_code", "full_name", "preferred_date", "preferred_time", "shift", "guests", "status")
    list_filter = ("status", "shift", "preferred_date")
    search_fields = ("reference_code", "full_name", "phone", "email")

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_published", "updated_at")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "author", "published_at", "is_published")
    list_filter = ("category", "is_published", "published_at")
    search_fields = ("title", "excerpt", "content")
    prepopulated_fields = {"slug": ("title",)}
