import os
import sys
import django

backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_backend.settings')
django.setup()

from django.contrib.auth.models import User
from django.utils import timezone
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryImage, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
)

def run_seed():
    print("Seeding Project 12: VILLA RIVIERA...")

    # 1. Admin Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@villariviera.com', 'adminpassword123')
        print("  ✓ Created superuser: admin / adminpassword123")
    else:
        u = User.objects.get(username='admin')
        u.set_password('adminpassword123')
        u.is_staff = True
        u.is_superuser = True
        u.save()
        print("  ✓ Reset superuser password: admin / adminpassword123")

    # 2. Backfill existing reservations with reference_code if missing
    for idx, res in enumerate(Reservation.objects.filter(reference_code__isnull=True)):
        clean_date = (res.date or "2026-11-14").replace('-', '')[-6:]
        res.reference_code = f"RIV-{clean_date}-RES{idx+1:02d}"
        if not res.shift:
            res.shift = 'lunch' if '12' in (res.time or '') or '13' in (res.time or '') or '14' in (res.time or '') else 'dinner'
        res.save()

    for idx, res in enumerate(Reservation.objects.filter(reference_code='')):
        clean_date = (res.date or "2026-11-14").replace('-', '')[-6:]
        res.reference_code = f"RIV-{clean_date}-RES{idx+1:02d}"
        if not res.shift:
            res.shift = 'lunch' if '12' in (res.time or '') or '13' in (res.time or '') or '14' in (res.time or '') else 'dinner'
        res.save()

    # 3. Seed specific test reservations
    ref_lunch = "RIV-261116-LUN1"
    Reservation.objects.filter(reference_code=ref_lunch).delete()
    Reservation.objects.create(
        reference_code=ref_lunch,
        full_name="Countess Hélène de Valois",
        email="helene.valois@riviera-patrimoine.fr",
        phone="+33 4 93 01 99 22",
        date="2026-11-16",
        time="12:30",
        shift="lunch",
        guests=4,
        seating_area="Cliffside Balcony & Sea Panorama",
        special_requests="Corner table overlooking the bay. Gluten-sensitive dining.",
        dietary_notes="Gluten-sensitive, preference for wild turbot and Mediterranean citrus.",
        table_number="Villa Table 04 (Cliff View)",
        status="confirmed"
    )
    print(f"  ✓ Seeded lunch reservation: {ref_lunch} (Countess Hélène de Valois)")

    ref_dinner = "RIV-261116-DIN1"
    Reservation.objects.filter(reference_code=ref_dinner).delete()
    Reservation.objects.create(
        reference_code=ref_dinner,
        full_name="Lord Marcus Vance",
        email="marcus.vance@monaco-yachting.mc",
        phone="+377 98 06 20 00",
        date="2026-11-16",
        time="20:00",
        shift="dinner",
        guests=2,
        seating_area="Arched Limestone Colonnade",
        special_requests="Anniversary celebration, Grand Cru wine pairing requested.",
        dietary_notes="No shellfish for one guest. Champagne upon arrival.",
        table_number="Villa Table 08 (Colonnade)",
        status="pending"
    )
    print(f"  ✓ Seeded dinner reservation: {ref_dinner} (Lord Marcus Vance)")

    # 4. Blog Categories
    cat_terroir, _ = BlogCategory.objects.get_or_create(
        slug="coastal-terroir",
        defaults={
            "name": "Mediterranean Gastronomy & Wild Sea Harvest",
            "description": "Stories from the dawn catch, crag herb foraging, and single-estate Riviera olive oils."
        }
    )
    cat_heritage, _ = BlogCategory.objects.get_or_create(
        slug="villa-heritage",
        defaults={
            "name": "Limestone Architecture & Riviera Chronicles",
            "description": "The architectural conservation of our 1928 cliffside estate and Mediterranean stonework."
        }
    )
    cat_wine, _ = BlogCategory.objects.get_or_create(
        slug="wine-cellar",
        defaults={
            "name": "Côte d'Azur Cellars & Historic Vintages",
            "description": "Explorations into rare Provençal and Ligurian vintages preserved in our coastal vault."
        }
    )
    print("  ✓ Seeded blog categories: coastal-terroir, villa-heritage, wine-cellar")

    # 5. Blog Posts
    p1, _ = BlogPost.objects.update_or_create(
        slug="wild-mediterranean-turbot-crag-herbs-cap-ferrat",
        defaults={
            "category": cat_terroir,
            "title": "Wild Mediterranean Turbot, Sea Purslane & Crag Thyme",
            "excerpt": "How the rugged limestone cliffs of Cap-Ferrat yield wild botanicals that transform pristine morning sea harvests into refined coastal gastronomy.",
            "content": """Cooking on the Côte d'Azur requires total obedience to the maritime elements. Each dawn at 05:30, our culinary team descends to the fishing harbor where small wooden pointus return with line-caught turbot, red mullet, and Sanremo red prawns still glistening with sea spray.

The secret to our roasted wild turbot lies not in heavy sauces, but in the micro-flora that clings tenaciously to the seaside limestone crags. Wild sea purslane provides a bright saline crunch, while wild winter savory and mountain thyme infuse a delicate resinous perfume into cold-pressed estate olive oil.

When roasted gently over gentle olive-wood embers, the pearlescent flesh retains all its natural gelatin and sweet sea salinity, evoking the very breath of the Mediterranean.""",
            "featured_image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85",
            "author_name": "Chef Antoine Laurent",
            "reading_time": "5 min read",
            "is_published": True,
            "published_at": timezone.now().date(),
        }
    )

    p2, _ = BlogPost.objects.update_or_create(
        slug="restoring-1928-limestone-arches-villa-riviera",
        defaults={
            "category": cat_heritage,
            "title": "Restoring the 1928 Limestone Colonnade Above the Waves",
            "excerpt": "A master architectural chronicle of preserving hand-chiseled Provençal limestone and classical arches against salty coastal breezes.",
            "content": """Erected in 1928 by a visionary Parisian patron of the arts, Villa Riviera's colonnade was sculpted from dense stone extracted from quarries near La Turbie. These porous yet durable stones have absorbed ninety-eight years of maritime sun and mist.

During our recent architectural restoration, master stonemasons utilized traditional lime-based mortars mixed with crushed sea shell to repoint the grand arches without compromising their breathability.

The result is a rhythmic play of shadow and golden light that frames the azure expanse, allowing our diners to experience the villa exactly as intended nearly a century ago.""",
            "featured_image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85",
            "author_name": "Claire de Saint-Amand",
            "reading_time": "6 min read",
            "is_published": True,
            "published_at": timezone.now().date(),
        }
    )
    print("  ✓ Seeded blog posts: wild-mediterranean-turbot-crag-herbs-cap-ferrat, restoring-1928-limestone-arches-villa-riviera")

    # 6. Custom Page
    page_blocks = [
        {
            "type": "hero",
            "title": "Private Cliffside Villa Dining & Colonnade Receptions",
            "subtitle": "EXCLUSIVE CAP-FERRAT SECLUSION",
            "lead": "Command the entire sea terrace, private wine vault, and historic colonnade for monumental celebrations overlooking the Mediterranean.",
            "cta_text": "Inquire for Private Estate Buyout"
        },
        {
            "type": "split",
            "title": "Unrivaled Privacy Above the Azure Mediterranean",
            "subtitle": "CAP-FERRAT PROMONTORY",
            "body_left": "Villa Riviera offers an incomparable setting for intimate private banquets, milestone anniversaries, and discreet diplomatic dinners. With private yacht tender access directly from our stone sea dock, your guests arrive with serene exclusivity.",
            "body_right": "Every gathering features a bespoke tasting menu composed that morning by Chef Antoine Laurent, complemented by rare Grand Cru vintages retrieved from our 1928 subterranean rock cellar.",
            "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
        },
        {
            "type": "features",
            "title": "Bespoke Villa Hospitality Inclusions",
            "items": [
                {
                    "title": "Direct Sea Pier & Tender Service",
                    "desc": "Patrons arriving via private yacht are greeted at our private stone dock with Champagne and transported up our terraced gardens."
                },
                {
                    "title": "Dedicated Master Sommelier",
                    "desc": "Exclusive access to our vault of over 480 historic Riviera, Bordeaux, and Tuscan vintages, paired dish-by-dish."
                },
                {
                    "title": "Private Colonnade & Terrace",
                    "desc": "Uninterrupted 270-degree panorama of the Cap-Ferrat cliffs, illuminated by antique hurricane lanterns and twilight sea glow."
                }
            ]
        },
        {
            "type": "reservation",
            "title": "Request Exclusive Villa Dining Seclusion",
            "subtitle": "CONCIERGE INQUIRY",
            "lead": "Connect with our private events director to tailor menus, yacht arrivals, and private musical accompaniment.",
            "button_text": "Request Private Villa Reservation"
        }
    ]

    CustomPage.objects.update_or_create(
        slug="private-cliffside-villa-dining-cap-ferrat",
        defaults={
            "title": "Private Cliffside Villa Dining & Colonnade Receptions",
            "meta_description": "Exclusive buyouts, yacht tender arrivals, and bespoke Mediterranean tasting banquets at Villa Riviera, Saint-Jean-Cap-Ferrat.",
            "is_published": True,
            "blocks": page_blocks
        }
    )
    print("  ✓ Seeded custom page: private-cliffside-villa-dining-cap-ferrat")

    # 7. Ensure Menu Items have meal photography
    food_images = [
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=85",
    ]

    items = MenuItem.objects.all()
    if items.count() == 0:
        print("  ! No existing menu items found in DB, seeding from fallbackContent categories...")
        # create categories and items if needed
        cats = [
            ("Antipasti & Crudo di Mare", "antipasti", "Raw seafood and coastal garden harvest."),
            ("Primi Piatti & Handcrafted Pasta", "primi", "Handmade pasta, sea urchin, and saffron reductions."),
            ("Secondi di Mare & Dalla Terra", "pesce-carni", "Line-caught wild turbot, Provençal lamb, and sea salt crust."),
            ("Dolci & Riviera Confections", "dolci", "Menton lemons, wild lavender honey, and roasted figs.")
        ]
        img_idx = 0
        for cat_name, cat_slug, cat_desc in cats:
            c, _ = MenuCategory.objects.get_or_create(slug=cat_slug, defaults={"name": cat_name, "description": cat_desc})
            for i in range(3):
                MenuItem.objects.create(
                    category=c,
                    name=f"Riviera Signature {cat_name.split()[0]} {i+1}",
                    subtitle="Artisanal Mediterranean Composition",
                    description="Hand-harvested coastal ingredients with single-estate olive oil and wild botanicals.",
                    price=f"€{32 + i * 8}",
                    image=food_images[img_idx % len(food_images)],
                    is_signature=(i == 0),
                    dietary_tags="Wild Catch, Gluten-Free",
                    pairing_notes="Château de Crémat Bellet Blanc"
                )
                img_idx += 1
    else:
        for idx, item in enumerate(items):
            if not item.image:
                item.image = food_images[idx % len(food_images)]
                item.save()

    print("  ✓ Ensured meal photography on all menu items")
    print("Project 12 seeding complete!")

if __name__ == "__main__":
    run_seed()
