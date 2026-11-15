from django.urls import path
from .cms_views import (
    cms_login_view, cms_logout_view,
    cms_overview_view,
    cms_pages_view, cms_page_create_view, cms_page_builder_view, cms_page_delete_view,
    cms_identity_view,
    cms_reservations_view, cms_reservation_status_view, cms_reservation_table_view, cms_reservation_delete_view,
    cms_menu_view,
    cms_tour_view,
    cms_sections_view,
    cms_gallery_view,
    cms_reviews_view,
    cms_faqs_view,
    cms_schema_view,
    cms_blog_view, cms_blog_edit_view, cms_blog_delete_view,
)

urlpatterns = [
    # Auth
    path('cms/login/', cms_login_view, name='cms_login'),
    path('cms/logout/', cms_logout_view, name='cms_logout'),

    # Default / Overview
    path('cms/', cms_overview_view, name='cms_dashboard'),
    path('cms/overview/', cms_overview_view, name='cms_overview'),

    # Standalone Pages & Elementor Builder
    path('cms/pages/', cms_pages_view, name='cms_pages'),
    path('cms/pages/create/', cms_page_create_view, name='cms_page_create'),
    path('cms/pages/<int:pk>/builder/', cms_page_builder_view, name='cms_page_builder'),
    path('cms/pages/<int:pk>/delete/', cms_page_delete_view, name='cms_page_delete'),

    # Brand Identity & Logistics
    path('cms/identity/', cms_identity_view, name='cms_identity'),

    # Table Reservations & Host Desk
    path('cms/reservations/', cms_reservations_view, name='cms_reservations'),
    path('cms/reservations/<int:res_id>/status/', cms_reservation_status_view, name='cms_reservation_status'),
    path('cms/reservations/<int:res_id>/table/', cms_reservation_table_view, name='cms_reservation_table'),
    path('cms/reservations/<int:res_id>/delete/', cms_reservation_delete_view, name='cms_reservation_delete'),

    # Menu & Meal Photography
    path('cms/menu/', cms_menu_view, name='cms_menu'),

    # 3D Spatial Tour
    path('cms/tour/', cms_tour_view, name='cms_tour'),

    # Section Content Editor
    path('cms/sections/', cms_sections_view, name='cms_sections'),

    # Visual Gallery
    path('cms/gallery/', cms_gallery_view, name='cms_gallery'),

    # Guest Reviews & Critical Acclaim
    path('cms/reviews/', cms_reviews_view, name='cms_reviews'),

    # FAQs
    path('cms/faqs/', cms_faqs_view, name='cms_faqs'),

    # Master JSON Schema
    path('cms/schema/', cms_schema_view, name='cms_schema'),

    # Editorial Gazette & Journal
    path('cms/blog/', cms_blog_view, name='cms_blog'),
    path('cms/blog/<int:pk>/edit/', cms_blog_edit_view, name='cms_blog_edit'),
    path('cms/blog/<int:pk>/delete/', cms_blog_delete_view, name='cms_blog_delete'),
]
