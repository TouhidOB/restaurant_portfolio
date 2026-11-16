from django.contrib import admin
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'is_published', 'updated_at', 'updated_by')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'date', 'shift', 'time', 'guests', 'table_number', 'status', 'created_at')
    list_filter = ('shift', 'status', 'date')
    search_fields = ('reference_code', 'full_name', 'phone', 'email', 'table_number')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_published',)
    search_fields = ('title', 'slug')

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'is_published', 'published_at', 'views_count')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'excerpt', 'content', 'author_name')
