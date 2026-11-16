from django.urls import path
from . import cms_views

urlpatterns = [
    path('login/', cms_views.cms_login_view, name='cms_login'),
    path('logout/', cms_views.cms_logout_view, name='cms_logout'),
    path('', cms_views.cms_overview_view, name='cms_index'),
    path('overview/', cms_views.cms_overview_view, name='cms_overview'),
    path('pages/', cms_views.cms_pages_view, name='cms_pages'),
    path('pages/builder/', cms_views.cms_page_builder_view, name='cms_page_builder_create'),
    path('pages/<int:pk>/builder/', cms_views.cms_page_builder_view, name='cms_page_builder_edit'),
    path('identity/', cms_views.cms_identity_view, name='cms_identity'),
    path('reservations/', cms_views.cms_reservations_view, name='cms_reservations'),
    path('reservations/<int:res_id>/status/', cms_views.cms_reservation_status_view, name='cms_reservation_status'),
    path('reservations/<int:res_id>/delete/', cms_views.cms_reservation_delete_view, name='cms_reservation_delete'),
    path('menu/', cms_views.cms_menu_view, name='cms_menu'),
    path('tour/', cms_views.cms_tour_view, name='cms_tour'),
    path('sections/', cms_views.cms_sections_view, name='cms_sections'),
    path('gallery/', cms_views.cms_gallery_view, name='cms_gallery'),
    path('reviews/', cms_views.cms_reviews_view, name='cms_reviews'),
    path('faqs/', cms_views.cms_faqs_view, name='cms_faqs'),
    path('schema/', cms_views.cms_schema_view, name='cms_schema'),
    path('blog/', cms_views.cms_blog_view, name='cms_blog'),
    path('blog/<int:pk>/edit/', cms_views.cms_blog_edit_view, name='cms_blog_edit'),
]
