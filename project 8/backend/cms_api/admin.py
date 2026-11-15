from django.contrib import admin
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ['restaurant_name', 'is_published', 'updated_at', 'updated_by']

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'is_published', 'created_at']
    prepopulated_fields = {'slug': ('title',)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author_name', 'is_published', 'published_at', 'views_count']
    list_filter = ['category', 'is_published']
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['reference_code', 'full_name', 'shift', 'date', 'time', 'guests', 'seating_area', 'table_number', 'status', 'created_at']
    list_filter = ['shift', 'status', 'date']
    search_fields = ['reference_code', 'full_name', 'phone', 'email']
