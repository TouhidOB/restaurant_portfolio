from django.contrib import admin
from .models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryImage, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
)

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('site_title', 'contact_email', 'contact_phone', 'updated_at')

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_signature', 'order')
    list_filter = ('category', 'is_signature')
    search_fields = ('name', 'description')

@admin.register(TourViewpoint)
class TourViewpointAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'order')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(DiningExperience)
class DiningExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'capacity', 'timing', 'price', 'order')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'order')
    list_filter = ('category',)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'source_title', 'rating', 'order')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'email', 'date', 'time', 'shift', 'guests', 'status', 'table_number')
    list_filter = ('status', 'shift', 'date')
    search_fields = ('reference_code', 'full_name', 'email', 'phone')

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_published',)
    search_fields = ('title', 'slug')

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'published_at', 'is_published')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('category', 'is_published', 'published_at')
    search_fields = ('title', 'excerpt', 'content')
