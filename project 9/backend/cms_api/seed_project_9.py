import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_backend.settings')
django.setup()

from django.contrib.auth.models import User
from cms_api.models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost

def seed_project_9():
    print("--- Seeding Project 9: SKYLINE ---")

    # 1. Ensure Superuser
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@skylinedining.com", "adminpassword123")
        print("✓ Created superuser 'admin' / 'adminpassword123'")
    else:
        u = User.objects.get(username="admin")
        u.set_password("adminpassword123")
        u.save()
        print("✓ Updated superuser 'admin' password")

    admin_user = User.objects.get(username="admin")

    # 2. Backfill Existing Reservations with SKY- codes
    existing_res = Reservation.objects.all()
    count = 1
    for r in existing_res:
        if not r.reference_code or not r.reference_code.startswith("SKY-"):
            r.reference_code = f"SKY-261114-DIN0{count}"
            r.shift = "dinner"
            r.table_number = f"T-0{count}"
            r.save()
            count += 1
    print(f"✓ Backfilled {existing_res.count()} existing reservations with SKY- codes")

    # 3. Create Seeded Verification Reservation
    test_ref = "SKY-261116-LUN1"
    Reservation.objects.filter(reference_code=test_ref).delete()
    Reservation.objects.create(
        reference_code=test_ref,
        full_name="Sophia Vance",
        guest_name="Sophia Vance",
        phone="+1 (212) 555-0914",
        email="sophia.vance@metropolitan-sky.com",
        date="2026-11-15",
        reservation_date="2026-11-15",
        time="12:30 PM",
        time_slot="12:30 PM",
        shift="lunch",
        guests="4 Guests",
        party_size="4 Guests",
        seating_preference="window_side",
        seating_area="360° Window Table (Perimeter Glass)",
        preferred_zone="360° Window Table (Perimeter Glass)",
        experience="Horizon Sky Lunch",
        table_number="W-01",
        occasion="Design Studio Executive Lunch",
        dietary_notes="One champagne pairing degustation, one vegetarian wild mushroom tart",
        special_requests="Direct view facing the sunset skyline tower.",
        status="confirmed",
    )
    print(f"✓ Seeded verification reservation {test_ref} for Sophia Vance")

    # 4. Seed Blog Categories
    cat_mix, _ = BlogCategory.objects.get_or_create(
        slug="rooftop-mixology",
        defaults={
            "name": "Rooftop Mixology",
            "description": "Artisanal high-altitude cocktails, aged barrel spirits, and celestial infusions."
        }
    )
    cat_gastro, _ = BlogCategory.objects.get_or_create(
        slug="elevated-gastronomy",
        defaults={
            "name": "Elevated Gastronomy",
            "description": "Progressive tasting menus and culinary mastery above the clouds."
        }
    )
    cat_arch, _ = BlogCategory.objects.get_or_create(
        slug="horizon-chronicles",
        defaults={
            "name": "Horizon Chronicles",
            "description": "Atmospheric essays, architectural engineering, and skyline views from Level 54."
        }
    )
    print("✓ Seeded Blog Categories")

    # 5. Seed Blog Posts
    post1_slug = "celestial-cocktails-level-54"
    if not BlogPost.objects.filter(slug=post1_slug).exists():
        BlogPost.objects.create(
            title="Celestial Mixology: Crafting Smoked Spirits at 220 Meters Elevation",
            slug=post1_slug,
            category=cat_mix,
            cover_image="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85",
            excerpt="How barometric pressure, clarified botanical cordials, and liquid nitrogen redefine cocktails on the 54th floor.",
            content="At 220 meters above the asphalt, the behavior of aromatics transforms subtly under the ambient pressure of our cantilevered glass lounge. Our beverage laboratory at SKYLINE approaches each sunset concoction as both chemistry and poetry. Using cold-vacuum distillation, we extract ethereal terpenes from alpine juniper, smoked bergamot, and saffron threads without heat degradation. When the Golden Hour strikes the perimeter glass at 6:45 PM, our signature 'Aura 54'—featuring clarified Japanese whisky, smoked champagne syrup, and gold flake mist—captures the dying amber light with breathtaking precision.",
            author_name="Christian Laurent",
            read_time="6 min read",
            views_count=520,
            is_published=True,
        )

    post2_slug = "architectural-vision-glass-atrium"
    if not BlogPost.objects.filter(slug=post2_slug).exists():
        BlogPost.objects.create(
            title="The Glass Crown: Engineering a 360° Horizon Over the Metropolis",
            slug=post2_slug,
            category=cat_arch,
            cover_image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
            excerpt="The structural audacity behind Level 54's column-free perimeter and floor-to-ceiling ultra-clear glass curtain.",
            content="Constructing a world-class dining sanctuary suspended 54 stories in the sky presented engineering challenges rarely contemplated in traditional hospitality design. The perimeter envelope utilizes triple-laminated low-iron crystal panels that eliminate color distortion, allowing the sprawling city grid to appear as an unobstructed living canvas. Acoustic baffles hidden within our champagne-gold metallic ceiling absorb the hum of conversation, creating an intimate, almost weightless atmosphere where guests feel both suspended above the world and wrapped in serene luxury.",
            author_name="Elena Sterling",
            read_time="5 min read",
            views_count=410,
            is_published=True,
        )
    print("✓ Seeded Editorial Blog Posts")

    # 6. Seed Custom Page (Elementor Visual Page Builder)
    page_slug = "private-horizon-terrace-buyouts"
    if not CustomPage.objects.filter(slug=page_slug).exists():
        CustomPage.objects.create(
            title="Exclusive Sky Terrace & Penthouse Lounge Buyouts",
            slug=page_slug,
            meta_description="Host breathtaking private galas, milestone celebrations, and high-altitude corporate events 220 meters above the skyline.",
            blocks=[
                {
                    "type": "hero",
                    "title": "Unrivaled Horizons for Monumental Celebrations",
                    "subtitle": "Exclusive Penthouse Buyouts • Level 54",
                    "bg_image": "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=85",
                    "cta_text": "Inquire About Full Buyout",
                    "cta_link": "#contact"
                },
                {
                    "type": "split",
                    "title": "360 Degrees of Unobstructed Metropolis",
                    "lead": "Suspended above the clouds, our entire 54th floor offers 8,000 square feet of column-free architectural splendor.",
                    "body": "Accommodating up to 250 guests with exclusive access to the open-air sunset terrace, private VIP horizon suites, 360° perimeter window tables, and twin bespoke cocktail bars.",
                    "image": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=900&q=85",
                    "image_alt": "Skyline Level 54 Horizon Terrace"
                },
                {
                    "type": "features",
                    "title": "Dedicated Penthouse Hospitality",
                    "items": [
                        { "title": "Bespoke Multi-Course Tasting", "desc": "Curated tasting menus crafted specifically for your gathering by Executive Chef Christian Laurent." },
                        { "title": "Master Sommelier Wine Pairings", "desc": "Exclusive pours from our 1,200-bottle temperature-controlled cellar vault." },
                        { "title": "Private High-Altitude Access", "desc": "Dedicated express tower elevators with private security and priority valet service." }
                    ]
                },
                {
                    "type": "cta",
                    "title": "Design Your Rooftop Event",
                    "subtitle": "Our private events director is standing by to coordinate every detail.",
                    "button_text": "Contact Private Events Concierge",
                    "button_link": "/contact"
                }
            ],
            is_published=True,
            created_by=admin_user,
        )
        print("✓ Seeded Custom Standalone Page")

    print("--- Project 9 Seeding Complete ---")

if __name__ == "__main__":
    seed_project_9()
