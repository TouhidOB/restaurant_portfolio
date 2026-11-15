from django.contrib import admin
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'is_published', 'updated_at', 'updated_by')
    list_filter = ('is_published', 'updated_at')
    search_fields = ('restaurant_name',)

    def save_model(self, request, obj, form, change):
        if not obj.updated_by:
            obj.updated_by = request.user
        super().save_model(request, obj, form, change)


@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'theme_style', 'is_published', 'show_in_navigation', 'nav_order', 'updated_at')
    list_filter = ('is_published', 'show_in_navigation', 'theme_style')
    search_fields = ('title', 'slug', 'meta_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_published', 'show_in_navigation', 'nav_order')


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'read_time_minutes', 'is_featured', 'is_published', 'published_at', 'views_count')
    list_filter = ('is_published', 'is_featured', 'category', 'published_at')
    search_fields = ('title', 'slug', 'excerpt', 'content', 'author_name')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_published', 'is_featured')


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'phone', 'date', 'time', 'guests', 'seating_area', 'table_number', 'status', 'created_at')
    list_filter = ('status', 'date', 'seating_area', 'occasion')
    search_fields = ('reference_code', 'full_name', 'phone', 'email', 'table_number')
    list_editable = ('status', 'table_number')
    date_hierarchy = 'date'
