import os
import sys
import django
from datetime import date

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "restaurant_backend.settings")
django.setup()

from django.contrib.auth.models import User
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, Reservation, CustomPage, BlogCategory, BlogPost
)

def run_seed():
    print("--- SEEDING PROJECT 14: CHARRED & PRIME ---")

    # 1. Admin Superuser
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "concierge@charredandprime.com", "adminpassword123")
        print("✓ Created superuser 'admin' ('adminpassword123')")
    else:
        u = User.objects.get(username="admin")
        u.set_password("adminpassword123")
        u.is_staff = True
        u.is_superuser = True
        u.save()
        print("✓ Updated superuser 'admin' ('adminpassword123')")

    # 2. Backfill Existing Reservations with PRIME- Code & Shift
    reservations = Reservation.objects.all()
    count = 0
    for res in reservations:
        if not res.reference_code:
            shift_tag = "LUN" if getattr(res, "shift", "dinner") == "lunch" else "DIN"
            res.reference_code = f"PRIME-261116-{shift_tag}{res.id:02d}"
            res.shift = getattr(res, "shift", "dinner") or "dinner"
            res.save()
            count += 1
    print(f"✓ Backfilled {count} existing reservations with PRIME- codes")

    # Seed Dedicated Test Reservations
    res_lunch, created = Reservation.objects.get_or_create(
        reference_code="PRIME-261116-LUN1",
        defaults={
            "full_name": "Harrison Vance",
            "phone": "+1 (212) 555-0199",
            "email": "h.vance@vanceholdings.com",
            "preferred_date": date(2026, 11, 25),
            "preferred_time": "12:30 PM",
            "shift": "lunch",
            "guests": 2,
            "occasion": "Executive Lunch",
            "selected_experience": "Daylight Prime Cut Tasting",
            "table_number": "Booth 12",
            "dietary_notes": "Dry-aged tasting request, medium rare preference",
            "status": "confirmed",
        }
    )
    if not created:
        res_lunch.full_name = "Harrison Vance"
        res_lunch.shift = "lunch"
        res_lunch.status = "confirmed"
        res_lunch.save()
    print("✓ Seeded test reservation: PRIME-261116-LUN1 (Harrison Vance)")

    res_dinner, created = Reservation.objects.get_or_create(
        reference_code="PRIME-261116-DIN1",
        defaults={
            "full_name": "Victoria Sterling",
            "phone": "+1 (212) 555-0844",
            "email": "victoria.sterling@sterling-arts.org",
            "preferred_date": date(2026, 11, 28),
            "preferred_time": "7:45 PM",
            "shift": "dinner",
            "guests": 4,
            "occasion": "Anniversary Celebration",
            "selected_experience": "Cave Master's Tomahawk & Wine Vault",
            "table_number": "Wine Room Table 4",
            "dietary_notes": "Napa Valley Cabernet reserve pairing, bone marrow butter crust",
            "status": "confirmed",
        }
    )
    if not created:
        res_dinner.full_name = "Victoria Sterling"
        res_dinner.shift = "dinner"
        res_dinner.status = "confirmed"
        res_dinner.save()
    print("✓ Seeded test reservation: PRIME-261116-DIN1 (Victoria Sterling)")

    # 3. Seed Blog Categories
    cat_dryage, _ = BlogCategory.objects.get_or_create(
        slug="dry-aging-craft",
        defaults={"name": "The Dry-Aging Cave", "description": "Atmospheric control, Himalayan pink salt slabs, and flavor concentration archives."}
    )
    cat_woodfire, _ = BlogCategory.objects.get_or_create(
        slug="wood-fire-ember",
        defaults={"name": "Wood-Fire & Live Charcoal", "description": "White oak embers, custom parrilla grids, and artisanal smoke profiles."}
    )
    cat_wine, _ = BlogCategory.objects.get_or_create(
        slug="wine-sommelier-vault",
        defaults={"name": "The Sommelier's Vault", "description": "Rare Bordeaux vintages, library Cabernets, and high-tannin steak pairings."}
    )
    print("✓ Seeded 3 Blog Categories")

    # 4. Seed Blog Posts
    post1, _ = BlogPost.objects.get_or_create(
        slug="the-chemistry-of-60-day-himalayan-salt-dry-aging",
        defaults={
            "title": "The Chemistry of 60-Day Himalayan Salt Dry-Aging",
            "category": cat_dryage,
            "excerpt": "Inside our subterranean aging chamber lined with two tons of sub-surface Himalayan pink salt bricks, natural enzymatic tenderization transforms prime beef into extraordinary gastronomic art.",
            "content": """Dry-aging is not simply a process of preservation; it is the deliberate culinary acceleration of enzymatic breakdown and moisture reduction. Inside our custom-engineered subterranean aging cave, humidity is maintained at precisely 82% with temperatures locked at 1.5°C.\n\nTwo tons of backlit Himalayan salt bricks regulate ambient humidity while contributing micro-trace minerals to the air current. Over sixty full days, natural calpain and cathepsin enzymes break down rigid collagen fibers in the primal cuts, while natural moisture evaporates by approximately 18%.\n\nThe consequence is profound: an exponential concentration of glutamates, producing umami notes reminiscent of roasted hazelnuts, blue cheese rind, and concentrated white truffle. When seared over 900-degree white oak coals, the outer crust forms a caramelized Maillard crust that yields to a silken, melting center.""",
            "featured_image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
            "author": "Marcus Sterling — Master Butcher & Cave Curator",
            "reading_time": "6 min read",
            "is_published": True,
        }
    )

    post2, _ = BlogPost.objects.get_or_create(
        slug="hardwood-embers-white-oak-and-hickory-steakhouse-flame",
        defaults={
            "title": "Hardwood Embers: White Oak and Hickory in the Open-Flame Grill",
            "category": cat_woodfire,
            "excerpt": "Why charcoal briquettes will never match the clean radiant heat and aromatic smoke of aged Pennsylvania white oak and kiln-dried shagbark hickory.",
            "content": """At Charred & Prime, no gas jets or electric heating elements touch our signature steaks. Every steak is kissed exclusively by genuine live hardwood embers generated in our dual hearth ovens.\n\nWe source kiln-dried Pennsylvania white oak aged for nine months, blended with twenty percent hickory hearts. White oak provides sustained, intense thermal radiation exceeding 1,000°F at bed depth without producing volatile bitter creosote, while hickory delivers a sweet, aromatic whispering smoke that permeates the fat caps.\n\nOur custom hand-cranked V-channel steel grills allow our grillmasters to regulate height to within half an inch. Juices render and sizzle along the angled channels, atomizing back into the rising thermal plume and imparting an inimitable wood-fired complexity that fine steak lovers recognize instantly.""",
            "featured_image": "https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80",
            "author": "Chef Alexander Cross — Executive Pitmaster",
            "reading_time": "5 min read",
            "is_published": True,
        }
    )
    print("✓ Seeded 2 Editorial Blog Posts")

    # 5. Seed Custom Page (Elementor Visual Builder Showcase)
    page, _ = CustomPage.objects.get_or_create(
        slug="private-wine-vault-and-dry-aging-tasting",
        defaults={
            "title": "Private Wine Vault & Dry-Aging Tasting",
            "meta_title": "Private Wine Vault & Dry-Aging Tasting | Charred & Prime",
            "meta_description": "An exclusive private dining experience in our subterranean wine cellar surrounded by 3,000 library vintages and bespoke cut tastings.",
            "is_published": True,
            "blocks": [
                {
                    "type": "hero",
                    "title": "The Subterranean Wine Vault",
                    "subtitle": "CURATED EXCLUSIVITY & PRIVATE CELLAR DINING",
                    "content": "Descend beneath the Manhattan pavement into our private temperature-controlled vault. Dine surrounded by 3,000 bottles of Grand Cru Bordeaux and library Napa Cabernets with a dedicated steak sommelier.",
                    "button_text": "Request Vault Reservation"
                },
                {
                    "type": "split",
                    "title": "Rare Cuts Curated at Tableside",
                    "subtitle": "BESPOKE CARVING EXPERIENCE",
                    "content": "Your private party of up to 14 guests enjoys an interactive steak demonstration: inspecting dry-aging stages from 30 to 90 days, selecting custom cut thicknesses, and watching our master butcher carve tableside on end-grain walnut blocks.",
                    "image_url": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80",
                    "button_text": "Explore Vault Menu"
                },
                {
                    "type": "features",
                    "title": "Vault Dining Amenities",
                    "subtitle": "TAILORED HOSPITALITY",
                    "items": [
                        {"icon": "🍷", "title": "Head Sommelier Pairing", "text": "Five-course wine progression featuring rare library vintages from our private reserve cellars."},
                        {"icon": "🥩", "title": "Custom Primal Selection", "text": "Hand-select whole primal loins dry-aged with Himalayan pink salt to your exact specifications."},
                        {"icon": "🔥", "title": "Dedicated Hearth Chef", "text": "Personal grillmaster preparing each guest's selection over custom white oak embers."},
                        {"icon": "🗝️", "title": "Private Cellar Entrance", "text": "Discreet VIP arrival via private bronze elevator with direct sommelier reception."}
                    ]
                },
                {
                    "type": "cta",
                    "title": "Host Your Next Private Soirée",
                    "content": "Ideal for board dinners, milestone celebrations, and intimate celebrations. Minimum party 6 guests, maximum 16 guests.",
                    "button_text": "Inquire for Private Dates"
                },
                {
                    "type": "reservation",
                    "title": "Check Vault Availability",
                    "content": "Vault reservations open 60 days in advance. Select lunch or dinner seating."
                }
            ]
        }
    )
    print("✓ Seeded Custom Page: 'private-wine-vault-and-dry-aging-tasting'")

    # 6. Ensure Menu Items have high-res food photography
    steak_images = [
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    ]
    items = MenuItem.objects.all()
    for idx, item in enumerate(items):
        if not item.image_url:
            item.image_url = steak_images[idx % len(steak_images)]
            item.save()
    print(f"✓ Checked {items.count()} menu items for meal photography")

    print("\n--- PROJECT 14 SEED COMPLETE ---")

if __name__ == "__main__":
    run_seed()
