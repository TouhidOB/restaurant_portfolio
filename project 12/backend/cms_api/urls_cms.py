from django.urls import path
from .cms_views import (
    cms_login_view, cms_logout_view,
    cms_overview_view, cms_pages_view, cms_page_builder_view, cms_page_delete_view,
    cms_identity_view, cms_reservations_view, cms_menu_view,
    cms_tour_view, cms_sections_view, cms_gallery_view, cms_reviews_view,
    cms_faqs_view, cms_schema_view, cms_blog_view, cms_blog_edit_view, cms_blog_delete_view
)

urlpatterns = [
    path('', cms_overview_view, name='cms_dashboard'),
    path('login/', cms_login_view, name='cms_login'),
    path('logout/', cms_logout_view, name='cms_logout'),
    path('overview/', cms_overview_view, name='cms_overview'),
    path('pages/', cms_pages_view, name='cms_pages'),
    path('pages/builder/', cms_page_builder_view, name='cms_page_builder_new'),
    path('pages/<int:page_id>/builder/', cms_page_builder_view, name='cms_page_builder_edit'),
    path('pages/<int:page_id>/delete/', cms_page_delete_view, name='cms_page_delete'),
    path('identity/', cms_identity_view, name='cms_identity'),
    path('reservations/', cms_reservations_view, name='cms_reservations'),
    path('menu/', cms_menu_view, name='cms_menu'),
    path('tour/', cms_tour_view, name='cms_tour'),
    path('sections/', cms_sections_view, name='cms_sections'),
    path('gallery/', cms_gallery_view, name='cms_gallery'),
    path('reviews/', cms_reviews_view, name='cms_reviews'),
    path('faqs/', cms_faqs_view, name='cms_faqs'),
    path('schema/', cms_schema_view, name='cms_schema'),
    path('blog/', cms_blog_view, name='cms_blog'),
    path('blog/new/', cms_blog_edit_view, name='cms_blog_new'),
    path('blog/<int:post_id>/edit/', cms_blog_edit_view, name='cms_blog_edit'),
    path('blog/<int:post_id>/delete/', cms_blog_delete_view, name='cms_blog_delete'),
]
