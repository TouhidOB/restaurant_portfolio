from django.contrib import admin
from .models import (
    Restaurant,
    BrandSettings,
    WebsiteSection,
    MenuCategory,
    MenuItem,
    VirtualTourViewpoint,
    PhilosophyPillar,
    DinerStoryStage,
    DinerExperiencePanel,
    GalleryImage,
    Testimonial,
    Reservation,
    FAQ,
    ContactInquiry,
    CustomPage,
    BlogCategory,
    BlogPost,
)

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'read_time_minutes', 'is_featured', 'is_published', 'published_at')
    list_filter = ('is_published', 'is_featured', 'category')
    search_fields = ('title', 'excerpt', 'content')
    list_editable = ('is_published', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'theme_style', 'is_published', 'show_in_navigation', 'nav_order', 'updated_at')
    list_filter = ('is_published', 'show_in_navigation', 'theme_style')
    search_fields = ('title', 'slug', 'meta_description')
    list_editable = ('is_published', 'show_in_navigation', 'nav_order')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'phone', 'email')

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_featured', 'is_available', 'display_order')
    list_filter = ('category', 'is_featured', 'is_available')
    search_fields = ('name', 'short_description')
    list_editable = ('price', 'is_available', 'is_featured')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(WebsiteSection)
class WebsiteSectionAdmin(admin.ModelAdmin):
    list_display = ('section_key', 'title', 'is_visible', 'display_order')
    list_editable = ('is_visible', 'display_order')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'reservation_date', 'reservation_time', 'guest_count', 'seating_area', 'status')
    list_filter = ('status', 'reservation_date', 'seating_area')
    search_fields = ('reference_code', 'full_name', 'email', 'phone')
    list_editable = ('status',)

@admin.register(VirtualTourViewpoint)
class VirtualTourViewpointAdmin(admin.ModelAdmin):
    list_display = ('title', 'space_name', 'hotspot_title', 'is_active')

admin.site.register(BrandSettings)
admin.site.register(PhilosophyPillar)
admin.site.register(DinerStoryStage)
admin.site.register(DinerExperiencePanel)
admin.site.register(GalleryImage)
admin.site.register(Testimonial)
admin.site.register(FAQ)
admin.site.register(ContactInquiry)
