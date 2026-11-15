import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils import timezone
from .models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost

def is_staff_or_superuser(user):
    return user.is_authenticated and (user.is_staff or user.is_superuser)

def cms_login_view(request):
    if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
        return redirect('cms_overview')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        user = authenticate(request, username=username, password=password)

        if user and (user.is_staff or user.is_superuser):
            login(request, user)
            messages.success(request, f"Bienvenue, {user.username}. Access to Parisian CMS Studio granted.")
            next_url = request.GET.get('next', reverse('cms_overview'))
            return HttpResponseRedirect(next_url)
        else:
            messages.error(request, "Accès Refusé: Invalid administrator credentials or insufficient staff permissions.")

    return render(request, 'cms/login.html')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_logout_view(request):
    logout(request)
    messages.info(request, "You have been securely signed out of the Parisian CMS Studio.")
    return redirect('cms_login')

def get_site_config(request):
    config = SiteConfig.objects.filter(is_published=True).order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.order_by('-updated_at').first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="L'ÉTOILE ROYALE",
            content_json={},
            is_published=True,
            updated_by=request.user if request.user.is_authenticated else None
        )
    return config

# 1. Overview & KPIs
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_overview_view(request):
    config = get_site_config(request)
    reservations = Reservation.objects.all()
    pending_count = reservations.filter(status='pending').count()
    confirmed_count = reservations.filter(status='confirmed').count()
    seated_count = reservations.filter(status='seated').count()
    
    custom_pages_count = CustomPage.objects.count()
    blog_posts_count = BlogPost.objects.count()

    context = {
        'config': config,
        'content': config.content_json,
        'reservations': reservations[:8],
        'pending_count': pending_count,
        'confirmed_count': confirmed_count,
        'seated_count': seated_count,
        'total_reservations': reservations.count(),
        'custom_pages_count': custom_pages_count,
        'blog_posts_count': blog_posts_count,
        'active_tab': 'overview',
    }
    return render(request, 'cms/overview.html', context)

# 2. Standalone Pages
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_pages_view(request):
    pages = CustomPage.objects.all().order_by('-created_at')
    context = {
        'pages': pages,
        'total_pages': pages.count(),
        'active_tab': 'pages',
    }
    return render(request, 'cms/pages.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_create_view(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip().lower()
        meta_desc = request.POST.get('meta_description', '').strip()
        if title and slug:
            page = CustomPage.objects.create(
                title=title,
                slug=slug,
                meta_description=meta_desc,
                blocks=[],
                is_published=True
            )
            messages.success(request, f"Page '{page.title}' created.")
            return redirect('cms_page_builder', pk=page.pk)
    return redirect('cms_pages')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_builder_view(request, pk):
    page_obj = get_object_or_404(CustomPage, pk=pk)
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        slug = request.POST.get('slug', '').strip().lower()
        meta_desc = request.POST.get('meta_description', '').strip()
        is_published = request.POST.get('is_published') == 'on'
        blocks_raw = request.POST.get('blocks_json', '[]')
        
        try:
            blocks_data = json.loads(blocks_raw)
            page_obj.title = title or page_obj.title
            page_obj.slug = slug or page_obj.slug
            page_obj.meta_description = meta_desc
            page_obj.is_published = is_published
            page_obj.blocks = blocks_data
            page_obj.save()
            messages.success(request, f"Page '{page_obj.title}' updated successfully.")
        except json.JSONDecodeError:
            messages.error(request, "Invalid JSON structure in blocks payload.")
        return redirect('cms_page_builder', pk=page_obj.pk)

    context = {
        'page': page_obj,
        'blocks_json_pretty': json.dumps(page_obj.blocks, indent=2),
        'active_tab': 'pages',
    }
    return render(request, 'cms/page_builder.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_page_delete_view(request, pk):
    page_obj = get_object_or_404(CustomPage, pk=pk)
    title = page_obj.title
    page_obj.delete()
    messages.success(request, f"Custom page '{title}' deleted.")
    return redirect('cms_pages')

# 3. Identity & Logistics
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_identity_view(request):
    config = get_site_config(request)
    content = config.content_json or {}

    if request.method == 'POST':
        config.restaurant_name = request.POST.get('restaurant_name', config.restaurant_name)
        content['name'] = config.restaurant_name
        content['tagline'] = request.POST.get('tagline', content.get('tagline', ''))
        content['contact'] = content.get('contact', {})
        content['contact']['phone'] = request.POST.get('phone', content['contact'].get('phone', ''))
        content['contact']['email'] = request.POST.get('email', content['contact'].get('email', ''))
        content['contact']['address'] = request.POST.get('address', content['contact'].get('address', ''))
        content['hours'] = content.get('hours', {})
        content['hours']['summary'] = request.POST.get('hours_summary', content['hours'].get('summary', ''))
        
        config.content_json = content
        config.save()
        messages.success(request, "Royal Maison identity & logistics updated.")
        return redirect('cms_identity')

    context = {
        'config': config,
        'content': content,
        'active_tab': 'identity',
    }
    return render(request, 'cms/identity.html', context)

# 4. Table Reservation Desk
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservations_view(request):
    shift_filter = request.GET.get('shift', 'all')
    status_filter = request.GET.get('status', 'all')
    search_q = request.GET.get('q', '').strip()

    qs = Reservation.objects.all()
    if shift_filter in ['lunch', 'dinner']:
        qs = qs.filter(shift=shift_filter)
    if status_filter != 'all':
        qs = qs.filter(status=status_filter)
    if search_q:
        qs = qs.filter(
            models.Q(reference_code__icontains=search_q) |
            models.Q(full_name__icontains=search_q) |
            models.Q(phone__icontains=search_q) |
            models.Q(email__icontains=search_q)
        )

    all_res = Reservation.objects.all()
    context = {
        'reservations': qs.order_by('-date', '-created_at'),
        'shift_filter': shift_filter,
        'status_filter': status_filter,
        'search_q': search_q,
        'total_count': all_res.count(),
        'pending_count': all_res.filter(status='pending').count(),
        'confirmed_count': all_res.filter(status='confirmed').count(),
        'seated_count': all_res.filter(status='seated').count(),
        'lunch_count': all_res.filter(shift='lunch').count(),
        'dinner_count': all_res.filter(shift='dinner').count(),
        'active_tab': 'reservations',
    }
    return render(request, 'cms/reservations.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_status_view(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        if new_status in dict(Reservation.STATUS_CHOICES):
            res.status = new_status
            res.save()
            messages.success(request, f"Status for #{res.reference_code} updated to {res.get_status_display()}.")
    return redirect('cms_reservations')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_table_view(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    if request.method == 'POST':
        table_num = request.POST.get('table_number', '').strip()
        admin_notes = request.POST.get('admin_notes', '').strip()
        res.table_number = table_num or None
        if admin_notes:
            res.admin_notes = admin_notes
        res.save()
        messages.success(request, f"Table #{table_num or 'Unassigned'} set for #{res.reference_code}.")
    return redirect('cms_reservations')

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reservation_delete_view(request, res_id):
    res = get_object_or_404(Reservation, id=res_id)
    ref = res.reference_code
    res.delete()
    messages.info(request, f"Reservation inquiry #{ref} removed.")
    return redirect('cms_reservations')

# 5. Haute Cuisine Menu & Meal Photography
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_menu_view(request):
    config = get_site_config(request)
    content = config.content_json or {}
    categories = content.get('menuCategories', [])

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'save_menu_json':
            raw_json = request.POST.get('menu_categories_json', '')
            try:
                parsed = json.loads(raw_json)
                content['menuCategories'] = parsed
                config.content_json = content
                config.save()
                messages.success(request, "Menu repertoire and meal photography updated.")
            except json.JSONDecodeError:
                messages.error(request, "Invalid JSON structure in menu categories.")
            return redirect('cms_menu')

    context = {
        'config': config,
        'categories': categories,
        'categories_json': json.dumps(categories, indent=2),
        'active_tab': 'menu',
    }
    return render(request, 'cms/menu.html', context)

# 6. 3D Tour
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_tour_view(request):
    config = get_site_config(request)
    content = config.content_json or {}
    viewpoints = content.get('tourViewpoints', [])

    if request.method == 'POST':
        raw_json = request.POST.get('tour_json', '')
        try:
            content['tourViewpoints'] = json.loads(raw_json)
            config.content_json = content
            config.save()
            messages.success(request, "3D tour viewpoints updated.")
        except json.JSONDecodeError:
            messages.error(request, "Invalid JSON structure in viewpoints.")
        return redirect('cms_tour')

    context = {
        'config': config,
        'viewpoints': viewpoints,
        'viewpoints_json': json.dumps(viewpoints, indent=2),
        'active_tab': 'tour',
    }
    return render(request, 'cms/tour.html', context)

# 7. Sections Editor
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_sections_view(request):
    config = get_site_config(request)
    content = config.content_json or {}

    if request.method == 'POST':
        hero_tagline = request.POST.get('hero_tagline')
        lead_desc = request.POST.get('lead_description')
        if 'hero' not in content:
            content['hero'] = {}
        content['hero']['tagline'] = hero_tagline or content['hero'].get('tagline', '')
        content['hero']['lead_description'] = lead_desc or content['hero'].get('lead_description', '')
        config.content_json = content
        config.save()
        messages.success(request, "Section copy updated.")
        return redirect('cms_sections')

    context = {
        'config': config,
        'content': content,
        'active_tab': 'sections',
    }
    return render(request, 'cms/sections.html', context)

# 8. Gallery
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_gallery_view(request):
    config = get_site_config(request)
    content = config.content_json or {}
    gallery = content.get('gallery', [])

    if request.method == 'POST':
        raw_json = request.POST.get('gallery_json', '')
        try:
            content['gallery'] = json.loads(raw_json)
            config.content_json = content
            config.save()
            messages.success(request, "Gallery images updated.")
        except json.JSONDecodeError:
            messages.error(request, "Invalid JSON.")
        return redirect('cms_gallery')

    context = {
        'gallery': gallery,
        'gallery_json': json.dumps(gallery, indent=2),
        'active_tab': 'gallery',
    }
    return render(request, 'cms/gallery.html', context)

# 9. Reviews
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_reviews_view(request):
    config = get_site_config(request)
    content = config.content_json or {}
    testimonials = content.get('testimonials', [])

    if request.method == 'POST':
        raw_json = request.POST.get('testimonials_json', '')
        try:
            content['testimonials'] = json.loads(raw_json)
            config.content_json = content
            config.save()
            messages.success(request, "Acclaim & reviews updated.")
        except json.JSONDecodeError:
            messages.error(request, "Invalid JSON.")
        return redirect('cms_reviews')

    context = {
        'testimonials': testimonials,
        'testimonials_json': json.dumps(testimonials, indent=2),
        'active_tab': 'reviews',
    }
    return render(request, 'cms/reviews.html', context)

# 10. FAQs
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_faqs_view(request):
    config = get_site_config(request)
    content = config.content_json or {}
    faqs = content.get('faqs', [])

    if request.method == 'POST':
        raw_json = request.POST.get('faqs_json', '')
        try:
            content['faqs'] = json.loads(raw_json)
            config.content_json = content
            config.save()
            messages.success(request, "FAQs updated.")
        except json.JSONDecodeError:
            messages.error(request, "Invalid JSON.")
        return redirect('cms_faqs')

    context = {
        'faqs': faqs,
        'faqs_json': json.dumps(faqs, indent=2),
        'active_tab': 'faqs',
    }
    return render(request, 'cms/faqs.html', context)

# 11. Master Schema
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_schema_view(request):
    config = get_site_config(request)

    if request.method == 'POST':
        raw_json = request.POST.get('raw_json', '')
        try:
            parsed = json.loads(raw_json)
            config.content_json = parsed
            config.save()
            messages.success(request, "Master JSON schema saved.")
        except json.JSONDecodeError as e:
            messages.error(request, f"JSON Error: {e}")
        return redirect('cms_schema')

    context = {
        'config': config,
        'raw_json': json.dumps(config.content_json, indent=2),
        'active_tab': 'schema',
    }
    return render(request, 'cms/schema.html', context)

# 12. Editorial Blog & Gazette
@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_view(request):
    categories = BlogCategory.objects.all()
    posts = BlogPost.objects.all().order_by('-published_at')

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'create_post':
            title = request.POST.get('title', '').strip()
            slug = request.POST.get('slug', '').strip().lower()
            category_id = request.POST.get('category')
            cover_image = request.POST.get('cover_image', '').strip()
            excerpt = request.POST.get('excerpt', '').strip()
            content_text = request.POST.get('content', '').strip()
            author_name = request.POST.get('author_name', 'Alexandre de Morbihan').strip()
            read_time = request.POST.get('read_time', '5 min read').strip()
            is_published = request.POST.get('is_published') == 'on'

            category = BlogCategory.objects.filter(pk=category_id).first() if category_id else None

            if title and slug and content_text:
                post = BlogPost.objects.create(
                    title=title,
                    slug=slug,
                    category=category,
                    cover_image=cover_image,
                    excerpt=excerpt,
                    content=content_text,
                    author_name=author_name,
                    read_time=read_time,
                    is_published=is_published
                )
                messages.success(request, f"Article '{post.title}' publié.")
                return redirect('cms_blog')
            else:
                messages.error(request, "Please provide title, slug, and content.")

        elif action == 'create_category':
            cat_name = request.POST.get('name', '').strip()
            cat_slug = request.POST.get('slug', '').strip().lower()
            cat_desc = request.POST.get('description', '').strip()
            if cat_name and cat_slug:
                BlogCategory.objects.create(name=cat_name, slug=cat_slug, description=cat_desc)
                messages.success(request, f"Catégorie '{cat_name}' ajoutée.")
                return redirect('cms_blog')

    context = {
        'categories': categories,
        'posts': posts,
        'total_posts': posts.count(),
        'published_posts': posts.filter(is_published=True).count(),
        'active_tab': 'blog',
    }
    return render(request, 'cms/blog.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_edit_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    categories = BlogCategory.objects.all()

    if request.method == 'POST':
        post.title = request.POST.get('title', post.title).strip()
        post.slug = request.POST.get('slug', post.slug).strip().lower()
        cat_id = request.POST.get('category')
        if cat_id:
            post.category = BlogCategory.objects.filter(pk=cat_id).first()
        post.cover_image = request.POST.get('cover_image', post.cover_image).strip()
        post.excerpt = request.POST.get('excerpt', post.excerpt).strip()
        post.content = request.POST.get('content', post.content).strip()
        post.author_name = request.POST.get('author_name', post.author_name).strip()
        post.read_time = request.POST.get('read_time', post.read_time).strip()
        post.is_published = request.POST.get('is_published') == 'on'
        post.save()
        messages.success(request, f"Article '{post.title}' mis à jour.")
        return redirect('cms_blog')

    context = {
        'post': post,
        'categories': categories,
        'active_tab': 'blog',
    }
    return render(request, 'cms/blog_edit.html', context)

@login_required(login_url='/cms/login/')
@user_passes_test(is_staff_or_superuser, login_url='/cms/login/')
def cms_blog_delete_view(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    title = post.title
    post.delete()
    messages.success(request, f"Article '{title}' supprimé.")
    return redirect('cms_blog')
