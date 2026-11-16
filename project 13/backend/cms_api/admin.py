from django.contrib import admin
from .models import (
    SiteConfig,
    MenuCategory,
    MenuItem,
    TourViewpoint,
    DiningExperience,
    GalleryItem,
    TeamMember,
    Testimonial,
    Reservation,
    CustomPage,
    BlogCategory,
    BlogPost,
)

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('restaurant_name', 'contact_email', 'contact_phone', 'is_published')

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'korean_name', 'slug', 'sort_order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_featured', 'is_available')
    list_filter = ('category', 'is_featured', 'is_available')
    search_fields = ('name', 'description')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'preferred_date', 'preferred_time', 'shift', 'guests', 'status')
    list_filter = ('status', 'shift', 'preferred_date')
    search_fields = ('reference_code', 'full_name', 'phone', 'email')

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'created_at')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'published_at', 'is_published')
    list_filter = ('category', 'is_published')
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(TourViewpoint)
admin.site.register(DiningExperience)
admin.site.register(GalleryItem)
admin.site.register(TeamMember)
admin.site.register(Testimonial)
