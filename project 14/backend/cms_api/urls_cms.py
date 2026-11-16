from django.urls import path
from . import cms_views

urlpatterns = [
    # Auth
    path('login/', cms_views.cms_login_view, name='cms_login'),
    path('logout/', cms_views.cms_logout_view, name='cms_logout'),

    # Studio views
    path('', cms_views.cms_overview_view, name='cms_root'),
    path('overview/', cms_views.cms_overview_view, name='cms_overview'),
    
    path('pages/', cms_views.cms_pages_view, name='cms_pages'),
    path('pages/builder/', cms_views.cms_page_builder_view, name='cms_page_builder_new'),
    path('pages/builder/<int:page_id>/', cms_views.cms_page_builder_view, name='cms_page_builder_edit'),
    path('pages/save/', cms_views.cms_save_page, name='cms_save_page'),
    path('pages/<int:page_id>/delete/', cms_views.cms_delete_page, name='cms_delete_page'),

    path('identity/', cms_views.cms_identity_view, name='cms_identity'),
    path('identity/save/', cms_views.cms_save_identity, name='cms_save_identity'),

    path('reservations/', cms_views.cms_reservations_view, name='cms_reservations'),
    path('reservations/<int:res_id>/status/', cms_views.cms_reservation_status, name='cms_res_status'),
    path('reservations/<int:res_id>/assign/', cms_views.cms_assign_table, name='cms_assign_table'),
    path('reservations/<int:res_id>/delete/', cms_views.cms_delete_reservation, name='cms_del_res'),

    path('menu/', cms_views.cms_menu_view, name='cms_menu'),
    path('menu/save/', cms_views.cms_save_menu_item, name='cms_save_menu_item'),
    path('menu/<int:item_id>/delete/', cms_views.cms_delete_menu_item, name='cms_del_menu'),

    path('tour/', cms_views.cms_tour_view, name='cms_tour'),
    path('tour/save/', cms_views.cms_save_tour, name='cms_save_tour'),
    path('tour/<int:vp_id>/delete/', cms_views.cms_delete_tour, name='cms_del_tour'),

    path('sections/', cms_views.cms_sections_view, name='cms_sections'),
    path('sections/save/', cms_views.cms_save_sections, name='cms_save_sections'),

    path('gallery/', cms_views.cms_gallery_view, name='cms_gallery'),
    path('gallery/save/', cms_views.cms_save_gallery, name='cms_save_gallery'),
    path('gallery/<int:item_id>/delete/', cms_views.cms_delete_gallery, name='cms_del_gallery'),

    path('reviews/', cms_views.cms_reviews_view, name='cms_reviews'),
    path('reviews/save/', cms_views.cms_save_review, name='cms_save_review'),
    path('reviews/<int:item_id>/delete/', cms_views.cms_delete_review, name='cms_del_review'),

    path('faqs/', cms_views.cms_faqs_view, name='cms_faqs'),
    path('faqs/save/', cms_views.cms_save_faqs, name='cms_save_faqs'),

    path('schema/', cms_views.cms_schema_view, name='cms_schema'),
    path('schema/save/', cms_views.cms_save_schema, name='cms_save_schema'),

    path('blog/', cms_views.cms_blog_view, name='cms_blog'),
    path('blog/new/', cms_views.cms_blog_edit_view, name='cms_blog_new'),
    path('blog/<int:post_id>/edit/', cms_views.cms_blog_edit_view, name='cms_blog_edit'),
    path('blog/save/', cms_views.cms_save_blog_post, name='cms_save_blog_post'),
    path('blog/<int:post_id>/delete/', cms_views.cms_delete_blog_post, name='cms_del_blog_post'),
]
