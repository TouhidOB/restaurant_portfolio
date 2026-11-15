from django.contrib import admin
from .models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryStoryStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ,
    CustomPage, BlogCategory, BlogPost
)

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'tables_capacity', 'is_active')

@admin.register(WebsiteSection)
class WebsiteSectionAdmin(admin.ModelAdmin):
    list_display = ('section_key', 'title', 'display_order', 'is_visible')

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_featured', 'is_available', 'display_order')
    list_filter = ('category', 'is_featured', 'is_available')
    search_fields = ('name', 'short_description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(VirtualTourViewpoint)
class VirtualTourViewpointAdmin(admin.ModelAdmin):
    list_display = ('title', 'space_name', 'display_order', 'is_active')

@admin.register(PhilosophyPillar)
class PhilosophyPillarAdmin(admin.ModelAdmin):
    list_display = ('number', 'title', 'display_order')

@admin.register(CulinaryStoryStage)
class CulinaryStoryStageAdmin(admin.ModelAdmin):
    list_display = ('stage_number', 'title', 'display_order')

@admin.register(DiningExperiencePanel)
class DiningExperiencePanelAdmin(admin.ModelAdmin):
    list_display = ('title', 'spec_badge', 'display_order')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'display_order', 'is_active')
    list_filter = ('category', 'is_active')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('guest_name', 'source', 'rating', 'is_approved')
    list_filter = ('is_approved',)

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'reservation_date', 'reservation_time', 'shift', 'guest_count', 'table_number', 'status')
    list_filter = ('status', 'shift', 'reservation_date')
    search_fields = ('reference_code', 'full_name', 'email', 'phone')
    readonly_fields = ('reference_code', 'created_at', 'updated_at')

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'display_order', 'is_active')

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_published', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'is_published', 'views_count', 'published_at')
    list_filter = ('is_published', 'category')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
