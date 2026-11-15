from django.contrib import admin
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'is_published', 'updated_at', 'updated_by')
    list_filter = ('is_published', 'updated_at')
    search_fields = ('restaurant_name',)


@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'theme_style', 'is_published', 'show_in_navigation', 'nav_order', 'updated_at')
    list_filter = ('is_published', 'show_in_navigation', 'theme_style')
    search_fields = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'read_time_minutes', 'is_featured', 'is_published', 'published_at')
    list_filter = ('category', 'is_featured', 'is_published', 'published_at')
    search_fields = ('title', 'slug', 'content', 'author_name')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'phone', 'date', 'time', 'shift', 'guests', 'seating_area', 'table_assigned', 'status', 'created_at')
    list_filter = ('status', 'shift', 'date', 'seating_area')
    search_fields = ('reference_code', 'full_name', 'phone', 'email', 'special_requests', 'dietary_notes')
    ordering = ('-date', '-time')
