import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cafe_backend.settings')
django.setup()

from django.contrib.auth.models import User
from cms_api.models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost, MenuCategory, MenuItem

def seed_project_11():
    print("==================================================")
    print("SEEDING PROJECT 11: VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ")
    print("==================================================")

    # 1. Superuser
    user, created = User.objects.get_or_create(username='admin')
    if created or not user.check_password('adminpassword123'):
        user.set_password('adminpassword123')
        user.is_superuser = True
        user.is_staff = True
        user.email = 'admin@verdant-atrium.com'
        user.save()
        print("  ✓ Superuser 'admin' created/updated with password 'adminpassword123'")
    else:
        print("  ✓ Superuser 'admin' already valid")

    # 2. SiteConfig
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            cafe_name="VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ",
            content_json={}
        )
        print("  ✓ Created SiteConfig")
    else:
        print("  ✓ Found existing SiteConfig")

    # 3. Blog Categories
    cat_roast, _ = BlogCategory.objects.get_or_create(
        slug="botanical-roastery",
        defaults={
            "name": "Micro-Lot Coffee & Terroir",
            "description": "Chronicles on ethical direct-trade origins, washing processes, and roasting profiles."
        }
    )
    cat_arch, _ = BlogCategory.objects.get_or_create(
        slug="biophilic-architecture",
        defaults={
            "name": "Biophilic Architecture & Living Walls",
            "description": "Explorations of passive daylighting, thermal glass design, and indoor microclimates."
        }
    )
    cat_flora, _ = BlogCategory.objects.get_or_create(
        slug="plant-care",
        defaults={
            "name": "Rare Conservatory Flora",
            "description": "Botanical guides on caring for tropical monsteras, staghorn ferns, and hanging orchids."
        }
    )
    print("  ✓ Seeded 3 Blog Categories")

    # 4. Blog Posts
    post1, _ = BlogPost.objects.get_or_create(
        slug="sunlight-terroir-micro-lot-coffee-glasshouse",
        defaults={
            "title": "Sunlight, Terroir & Specialty Micro-Lots in the Glasshouse",
            "category": cat_roast,
            "excerpt": "How natural atmospheric daylight alters sensory perception and elevates Ethiopian and Colombian micro-lot coffee rituals.",
            "content": """Coffee tasting is fundamentally sensory, yet traditional cafés frequently bury patrons under dark brick, neon signage, and hurried fluorescent glare. At Verdant Atrium, we designed our cupping bar around an 18-meter vaulted glass prism that tracks the shifting daylight from dawn to dusk.\n\nUnder natural diffuse morning sunlight, the delicate bergamot and jasmine notes of our washed Ethiopian Yirgacheffe blossom on the palate with startling clarity. Natural light sharpens olfactory acuity, allowing subtle enzymatic aromatics—peach skin, wild honey, and citrus blossom—to shine without artificial interference.\n\nPaired with our living vertical fern walls that release calibrated humidity, every pour-over becomes an unhurried communion with botanical terroir.""",
            "featured_image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85",
            "author_name": "Elena Vance",
            "reading_time": "5 min read",
            "is_published": True,
        }
    )

    post2, _ = BlogPost.objects.get_or_create(
        slug="biophilic-conservatory-architecture-portland",
        defaults={
            "title": "19th-Century Conservatory Elegance Meets Modern Biophilic Design",
            "category": cat_arch,
            "excerpt": "A deep dive into our restoration of vintage steel trusses, double-glazed structural glass, and natural air purification.",
            "content": """Biophilia is the innate human affinity for the living world. In an era marked by rapid urban densification and screen fatigue, Verdant Atrium was conceived as a structural sanctuary that actively lowers cortisol levels through biophilic immersion.\n\nOur architectural brigade salvaged century-old industrial steel arches and paired them with cutting-edge thermal low-E double glazing. Over 140 varieties of tropical palms, fiddle-leaf figs, and rare climbing monsteras were strategically positioned along air-current circulation paths.\n\nThe result is an indoor microclimate that self-purifies, modulates relative humidity to a tranquil 55%, and provides restorative acoustic dampening through living foliage rather than synthetic foam.""",
            "featured_image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85",
            "author_name": "Julian Moreau",
            "reading_time": "6 min read",
            "is_published": True,
        }
    )
    print("  ✓ Seeded 2 Editorial Blog Posts")

    # 5. Custom Page
    custom_page, _ = CustomPage.objects.get_or_create(
        slug="glasshouse-private-dining-conservatory",
        defaults={
            "title": "Glasshouse Private Dining & Botanical Conservatory",
            "meta_description": "Exclusive buyouts, bespoke botanical tea tastings, and twilight dinners surrounded by 140+ living species.",
            "is_published": True,
            "blocks": [
                {
                    "type": "hero",
                    "title": "Glasshouse Private Dining & Conservatory Buyouts",
                    "subtitle": "SANCTUARY FOR UNHURRIED CELEBRATIONS",
                    "lead": "Double-height structural glass, living ficus trees, and custom botanical menus curated for intimate parties.",
                    "cta_text": "Request Private Conservatory Buyout"
                },
                {
                    "type": "split",
                    "title": "An Architectural Oasis for Private Occasions",
                    "lead": "Suspended between living flora and celestial daylight.",
                    "body": "Whether hosting a daylight bridal brunch, an executive symposium, or an unhurried twilight dinner, our conservatory wing provides complete spatial exclusivity. Guests dine under vaulted glass ceilings amidst blooming jasmine and orchids.",
                    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
                    "image_alt": "Private Glasshouse Conservatory"
                },
                {
                    "type": "features",
                    "title": "Conservatory Buyout Inclusions",
                    "items": [
                        {
                            "title": "Dedicated Master Barista & Sommelier",
                            "desc": "Bespoke single-origin coffee tastings, botanical tea pairings, and organic biodynamic wines."
                        },
                        {
                            "title": "Full Spatial Climate Control",
                            "desc": "Automated solar shading, ambient acoustic tuning, and purified botanical airflow."
                        },
                        {
                            "title": "Tailored Chef's Botanical Menu",
                            "desc": "Multi-course daylight brunch or evening sharing plates featuring seasonal organic terroir."
                        }
                    ]
                },
                {
                    "type": "cta",
                    "title": "Reserve Your Glasshouse Gathering",
                    "subtitle": "Private buyouts accepted up to 60 days in advance for parties of 10 to 45 guests.",
                    "button_text": "Inquire with Concierge"
                },
                {
                    "type": "reservation",
                    "title": "Private Booking Inquiry",
                    "subtitle": "Our event coordinator will curate your floral arrangements and culinary pairings."
                },
                {
                    "type": "faq",
                    "title": "Private Conservatory Guidelines",
                    "items": [
                        {
                            "q": "What is the guest capacity for the private conservatory?",
                            "a": "Seated banquets accommodate up to 36 guests; standing botanical cocktail receptions accommodate up to 50 guests."
                        },
                        {
                            "q": "Can custom floral decor be incorporated?",
                            "a": "Our in-house resident botanist collaborates with your party to integrate sustainable living greenery and botanical accents."
                        }
                    ]
                }
            ]
        }
    )
    print("  ✓ Seeded Custom Page (/page/glasshouse-private-dining-conservatory)")

    # 6. Backfill existing reservations & Seed test reservations
    existing_res = Reservation.objects.all()
    for idx, r in enumerate(existing_res):
        updated = False
        if not r.reference_code:
            r.reference_code = f"VER-261114-RES{idx+1:02d}"
            updated = True
        if not r.shift:
            r.shift = "lunch" if idx % 2 == 0 else "dinner"
            updated = True
        if not r.table_number:
            r.table_number = f"T-0{idx+1}"
            updated = True
        if updated:
            r.save()

    # Seed explicit test reservations
    test_lunch, _ = Reservation.objects.get_or_create(
        reference_code="VER-261116-LUN1",
        defaults={
            "full_name": "Dr. Julian Croft",
            "phone": "+1 (503) 555-8392",
            "email": "julian.croft@botanical-research.edu",
            "reservation_date": "2026-11-20",
            "reservation_time": "11:30 AM",
            "shift": "lunch",
            "guests": 4,
            "seating_zone": "Atrium Pavilion Table",
            "occasion": "Botanical Brunch",
            "dietary_notes": "Vegan & oat milk preference",
            "special_requests": "Playwright end-to-end verification reservation",
            "table_number": "T-02",
            "status": "confirmed"
        }
    )
    test_dinner, _ = Reservation.objects.get_or_create(
        reference_code="VER-261116-DIN1",
        defaults={
            "full_name": "Clara Beauchamp",
            "phone": "+1 (503) 555-4721",
            "email": "clara.b@design-consortium.org",
            "reservation_date": "2026-11-21",
            "reservation_time": "07:30 PM",
            "shift": "dinner",
            "guests": 2,
            "seating_zone": "Living Wall Alcove",
            "occasion": "Anniversary Dinner",
            "dietary_notes": "Gluten-free",
            "special_requests": "Quiet table near the orchid wall",
            "table_number": "T-07",
            "status": "pending"
        }
    )
    print("  ✓ Seeded test reservations: VER-261116-LUN1 (Lunch) & VER-261116-DIN1 (Dinner)")

    # 7. Sync custom pages and blogs into SiteConfig content_json
    c_json = config.content_json or {}
    c_json["custom_pages"] = [
        {
            "id": custom_page.id,
            "title": custom_page.title,
            "slug": custom_page.slug,
            "meta_description": custom_page.meta_description,
            "blocks": custom_page.blocks,
            "is_published": custom_page.is_published,
        }
    ]
    c_json["blog_categories"] = [
        {"id": c.id, "name": c.name, "slug": c.slug, "description": c.description}
        for c in BlogCategory.objects.all()
    ]
    c_json["blog_posts"] = [
        {
            "id": p.id,
            "title": p.title,
            "slug": p.slug,
            "category_name": p.category.name if p.category else "General",
            "category_slug": p.category.slug if p.category else "general",
            "excerpt": p.excerpt,
            "content": p.content,
            "featured_image": p.featured_image,
            "author_name": p.author_name,
            "reading_time": p.reading_time,
            "published_at": str(p.published_at),
        }
        for p in BlogPost.objects.all()
    ]
    config.content_json = c_json
    config.save()
    print("  ✓ Synced custom_pages and blog_posts into SiteConfig content_json")

    print("\n==================================================")
    print("PROJECT 11 SEEDING COMPLETE!")
    print("==================================================")

if __name__ == '__main__':
    seed_project_11()
