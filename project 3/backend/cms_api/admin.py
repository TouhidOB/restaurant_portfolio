from django.contrib import admin
from .models import (
    RestaurantSettings,
    HomepageSection,
    MenuCategory,
    MenuItem,
    TourViewpoint,
    DiningSpace,
    CulinaryPillar,
    TeamMember,
    PrivateEventOffering,
    GalleryItem,
    Testimonial,
    ReservationInquiry,
    OpeningHour,
    CustomPage,
    BlogCategory,
    BlogPost,
)

@admin.register(RestaurantSettings)
class RestaurantSettingsAdmin(admin.ModelAdmin):
    list_display = ('brand_name', 'tagline', 'phone', 'email', 'updated_at')

@admin.register(HomepageSection)
class HomepageSectionAdmin(admin.ModelAdmin):
    list_display = ('section_key', 'title', 'sort_order', 'is_enabled')
    list_filter = ('is_enabled',)

@admin.register(MenuCategory)
class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'sort_order', 'is_active')

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_signature', 'is_available')
    list_filter = ('category', 'is_signature', 'is_available')

@admin.register(DiningSpace)
class DiningSpaceAdmin(admin.ModelAdmin):
    list_display = ('name', 'capacity', 'sort_order')

@admin.register(ReservationInquiry)
class ReservationInquiryAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'guest_name', 'reservation_date', 'reservation_time', 'party_size', 'status', 'table_number')
    list_filter = ('status', 'reservation_date')
    search_fields = ('reference_code', 'guest_name', 'email', 'phone')

@admin.register(CustomPage)
class CustomPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'theme_style', 'is_published', 'show_in_navigation', 'created_at')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author_name', 'is_featured', 'is_published', 'published_at')
    list_filter = ('is_published', 'is_featured', 'category')
    search_fields = ('title', 'content', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(CulinaryPillar)
admin.site.register(TourViewpoint)
admin.site.register(TeamMember)
admin.site.register(PrivateEventOffering)
admin.site.register(GalleryItem)
admin.site.register(Testimonial)
admin.site.register(OpeningHour)
