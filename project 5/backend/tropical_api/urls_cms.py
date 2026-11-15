from django.urls import path
from django.shortcuts import redirect
from .cms_views import (
    cms_login_view,
    cms_logout_view,
    cms_overview_view,
    cms_pages_view,
    cms_page_create_view,
    cms_page_builder_view,
    cms_page_toggle_view,
    cms_page_delete_view,
    cms_identity_view,
    cms_identity_update_view,
    cms_reservations_view,
    cms_update_reservation_status,
    cms_assign_table_view,
    cms_menu_view,
    cms_toggle_menu_item,
    cms_menu_item_create_view,
    cms_menu_item_edit_view,
    cms_menu_item_delete_view,
    cms_tour_view,
    cms_sections_view,
    cms_update_section,
    cms_gallery_view,
    cms_reviews_view,
    cms_faqs_view,
    cms_schema_view,
    cms_save_master_json,
    cms_blog_view,
    cms_blog_create_view,
    cms_blog_edit_view,
    cms_blog_delete_view,
)

urlpatterns = [
    path('', lambda r: redirect('cms_overview'), name='cms_dashboard'),
    path('login/', cms_login_view, name='cms_login'),
    path('logout/', cms_logout_view, name='cms_logout'),

    # Dedicated Sub-Pages
    path('overview/', cms_overview_view, name='cms_overview'),

    path('pages/', cms_pages_view, name='cms_pages'),
    path('pages/create/', cms_page_create_view, name='cms_page_create'),
    path('pages/<int:pk>/builder/', cms_page_builder_view, name='cms_page_builder'),
    path('pages/<int:pk>/toggle/', cms_page_toggle_view, name='cms_page_toggle'),
    path('pages/<int:pk>/delete/', cms_page_delete_view, name='cms_page_delete'),

    path('identity/', cms_identity_view, name='cms_identity'),
    path('identity/update/', cms_identity_update_view, name='cms_identity_update'),

    path('reservations/', cms_reservations_view, name='cms_reservations'),
    path('reservations/<int:pk>/status/', cms_update_reservation_status, name='cms_update_reservation_status'),
    path('reservations/<int:pk>/assign-table/', cms_assign_table_view, name='cms_assign_table'),

    path('menu/', cms_menu_view, name='cms_menu'),
    path('menu/<int:pk>/toggle/', cms_toggle_menu_item, name='cms_toggle_menu_item'),
    path('menu/create/', cms_menu_item_create_view, name='cms_menu_item_create'),
    path('menu/<int:pk>/edit/', cms_menu_item_edit_view, name='cms_menu_item_edit'),
    path('menu/<int:pk>/delete/', cms_menu_item_delete_view, name='cms_menu_item_delete'),

    path('tour/', cms_tour_view, name='cms_tour'),

    path('sections/', cms_sections_view, name='cms_sections'),
    path('sections/<int:pk>/update/', cms_update_section, name='cms_update_section'),

    path('gallery/', cms_gallery_view, name='cms_gallery'),
    path('reviews/', cms_reviews_view, name='cms_reviews'),
    path('faqs/', cms_faqs_view, name='cms_faqs'),

    path('schema/', cms_schema_view, name='cms_schema'),
    path('schema/save/', cms_save_master_json, name='cms_save_master_json'),

    path('blog/', cms_blog_view, name='cms_blog'),
    path('blog/create/', cms_blog_create_view, name='cms_blog_create'),
    path('blog/<int:pk>/edit/', cms_blog_edit_view, name='cms_blog_edit'),
    path('blog/<int:pk>/delete/', cms_blog_delete_view, name='cms_blog_delete'),
]
