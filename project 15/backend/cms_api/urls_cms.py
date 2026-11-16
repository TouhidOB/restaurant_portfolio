from django.urls import path
from .cms_views import (
    cms_login, cms_logout,
    cms_overview, cms_pages, cms_page_builder, cms_save_page,
    cms_identity, cms_reservations, cms_reservation_status_update,
    cms_menu, cms_tour, cms_sections, cms_gallery, cms_reviews,
    cms_faqs, cms_schema, cms_blog, cms_blog_edit, cms_save_blog
)

urlpatterns = [
    path('', cms_overview, name='cms_dashboard'),
    path('login/', cms_login, name='cms_login'),
    path('logout/', cms_logout, name='cms_logout'),
    path('overview/', cms_overview, name='cms_overview'),
    path('pages/', cms_pages, name='cms_pages'),
    path('pages/builder/', cms_page_builder, name='cms_page_builder_new'),
    path('pages/builder/<int:page_id>/', cms_page_builder, name='cms_page_builder_edit'),
    path('pages/save/', cms_save_page, name='cms_save_page'),
    path('identity/', cms_identity, name='cms_identity'),
    path('reservations/', cms_reservations, name='cms_reservations'),
    path('reservations/<int:res_id>/status/', cms_reservation_status_update, name='cms_reservation_status_update'),
    path('menu/', cms_menu, name='cms_menu'),
    path('tour/', cms_tour, name='cms_tour'),
    path('sections/', cms_sections, name='cms_sections'),
    path('gallery/', cms_gallery, name='cms_gallery'),
    path('reviews/', cms_reviews, name='cms_reviews'),
    path('faqs/', cms_faqs, name='cms_faqs'),
    path('schema/', cms_schema, name='cms_schema'),
    path('blog/', cms_blog, name='cms_blog'),
    path('blog/new/', cms_blog_edit, name='cms_blog_new'),
    path('blog/<int:post_id>/edit/', cms_blog_edit, name='cms_blog_edit'),
    path('blog/save/', cms_save_blog, name='cms_save_blog'),
]
