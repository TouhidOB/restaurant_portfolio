from django.contrib import admin
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
)

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'is_published', 'updated_at')

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'sort_order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_featured', 'is_available', 'sort_order')
    list_filter = ('category', 'is_featured', 'is_available')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(TourViewpoint)
class TourViewpointAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'sort_order', 'is_active')

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'sort_order', 'is_active')
    list_filter = ('category', 'is_active')

@admin.register(DiningExperience)
class DiningExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'capacity', 'price_guide', 'sort_order', 'is_active')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'specialty', 'sort_order', 'is_active')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'source', 'rating', 'sort_order', 'is_active')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'customer_name', 'phone', 'preferred_date', 'shift', 'guest_count', 'status', 'created_at')
    list_filter = ('status', 'shift', 'preferred_date')
    search_fields = ('reference_code', 'customer_name', 'phone', 'email')

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'sort_order')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'is_published', 'published_at')
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'content', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
