import os
import sys
import django

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, Reservation,
    CustomPage, BlogCategory, BlogPost
)

User = get_user_model()

def seed_project_13():
    print("=== SEEDING PROJECT 13: SEOUL STREET (서울포차) ===")

    # 1. Admin Superuser
    admin_user, created = User.objects.get_or_create(username='admin')
    admin_user.set_password('adminpassword123')
    admin_user.is_staff = True
    admin_user.is_superuser = True
    admin_user.save()
    print("✓ Superuser 'admin' with password 'adminpassword123' ready.")

    # 2. SiteConfig check
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="SEOUL STREET (서울포차)",
            tagline="Contemporary Korean Street Culture Meets Cinematic Digital Dining",
            hero_subtitle="Discover sizzling spicy tteokbokki, golden crispy Korean fried chicken, and late-night street pocha energy under glowing Seoul neons.",
            contact_email="hello@seoulstreetfood.com",
            contact_phone="+82 2 312 9988",
            address="28 Wausan-ro 21-gil, Mapo-gu, Seoul, South Korea (Hongdae Night Market)",
            opening_hours="Monday – Sunday: 17:00 – 04:00 (Late Night Street Pocha)"
        )
    print("✓ SiteConfig verified.")

    # 3. Backfill existing reservations with reference codes
    for res in Reservation.objects.all():
        if not res.reference_code:
            res.save()
    print("✓ Existing reservations backfilled with SEO- codes.")

    # 4. Seed Verified Test Reservations
    res_lunch, _ = Reservation.objects.update_or_create(
        reference_code="SEO-261116-LUN1",
        defaults={
            "full_name": "Min-jun Kim",
            "phone": "+82 10 9876 5432",
            "email": "minjun.kim@seoul-tech.kr",
            "preferred_date": "2026-11-20",
            "preferred_time": "12:30",
            "shift": "lunch",
            "guests": 2,
            "occasion": "Casual Lunch",
            "selected_experience": "Street Pocha Table",
            "table_number": "P-04",
            "dietary_notes": "Gluten-free preference",
            "special_requests": "Window pocha view if possible",
            "status": "confirmed",
        }
    )
    print(f"✓ Seeded Lunch Reservation: {res_lunch.reference_code} (Guest: {res_lunch.full_name})")

    res_dinner, _ = Reservation.objects.update_or_create(
        reference_code="SEO-261116-DIN1",
        defaults={
            "full_name": "Soo-jin Park",
            "phone": "+82 10 3344 5566",
            "email": "soojin.park@k-wave.org",
            "preferred_date": "2026-11-20",
            "preferred_time": "20:00",
            "shift": "dinner",
            "guests": 4,
            "occasion": "Birthday Celebration",
            "selected_experience": "Hongdae Neon Pocha Tent",
            "table_number": "TENT-01",
            "dietary_notes": "Extra spicy gochujang sauce",
            "special_requests": "Celebration soju bucket",
            "status": "confirmed",
        }
    )
    print(f"✓ Seeded Dinner Reservation: {res_dinner.reference_code} (Guest: {res_dinner.full_name})")

    # 5. Seed Blog Categories
    cat_culture, _ = BlogCategory.objects.get_or_create(
        slug="street-food-culture",
        defaults={"name": "Street Food Culture", "description": "The history and living pulse of Korean street food tents."}
    )
    cat_pocha, _ = BlogCategory.objects.get_or_create(
        slug="night-pocha-stories",
        defaults={"name": "Night Pocha Stories", "description": "Late-night conversations, camaraderie, and Hongdae nightlife."}
    )
    cat_craft, _ = BlogCategory.objects.get_or_create(
        slug="fermentation-craft",
        defaults={"name": "Fermentation & Sauces", "description": "The secret depth of Sunchang gochujang, doendjang, and kimchi."}
    )
    print("✓ Blog categories created.")

    # 6. Seed Blog Posts
    BlogPost.objects.update_or_create(
        slug="the-secret-of-double-fried-korean-chicken",
        defaults={
            "title": "The Science & Soul of Double-Fried Korean Chicken",
            "category": cat_culture,
            "author_name": "Chef Park Jin-woo",
            "read_time": "5 min read",
            "image": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85",
            "excerpt": "Why does Korean fried chicken retain its audible glass-like crunch even when drenched in sticky sweet-spicy garlic glaze?",
            "content": """
<p>Walk down any alleyway in Hongdae after sunset, and the hypnotic symphony begins: sizzling peanut oil, the rhythmic toss of heavy carbon steel woks, and the crackle of double-fried chicken hitting cooling racks.</p>
<h3>The Double-Fry Technique</h3>
<p>Unlike Western buttermilk-battered fried chicken, Korean fried chicken relies on a whisper-thin batter composed primarily of potato starch, cornstarch, and cold sparkling water. The initial fry cooks the chicken through gently at 160°C. After resting, the pieces are plunged into a screaming-hot 190°C bath for ninety seconds.</p>
<p>This second flash-fry obliterates surface moisture, rendering the skin paper-thin and permanently crisp—a culinary canvas ready to drink in our house gochujang glaze without softening.</p>
""",
            "is_published": True,
        }
    )

    BlogPost.objects.update_or_create(
        slug="late-night-pocha-culture-hongdae-neon-nights",
        defaults={
            "title": "Late-Night Pocha Culture: Where Seoul Never Sleeps",
            "category": cat_pocha,
            "author_name": "Kim Min-seo",
            "read_time": "6 min read",
            "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=85",
            "excerpt": "A love letter to orange plastic tarp tents, steaming metal bowls of odeng broth, and strangers clinking soju glasses at 3 AM.",
            "content": """
<p>In Seoul, the boundary between stranger and confidant dissolves inside the pojangmacha. Under the glow of magenta neons and warm halogen bulbs, high-powered executives, university students, and musicians share cramped plastic tables.</p>
<p>Here at Seoul Street, we honor this egalitarian spirit: steaming bowls of spicy tteokbokki, ice-cold Chamisul soju, and sizzling army stew brought straight from the wok to your table.</p>
""",
            "is_published": True,
        }
    )
    print("✓ Blog posts created.")

    # 7. Seed Custom Page
    CustomPage.objects.update_or_create(
        slug="hongdae-private-pocha-experience",
        defaults={
            "title": "Hongdae Private Pocha Experience",
            "meta_description": "Exclusive late-night Korean street food dining room for group gatherings, team celebrations, and soju tasting flights.",
            "is_published": True,
            "blocks": [
                {
                    "type": "hero",
                    "subtitle": "PRIVATE STREET DINING",
                    "title": "Hongdae Neon Pocha Private Room",
                    "content": "Step off the vibrant street into your private neon haven. Sizzling custom wok courses, dedicated craft soju service, and late-night party vibes until 04:00 AM.",
                    "cta_text": "Reserve Private Room"
                },
                {
                    "type": "split",
                    "title": "Sizzling Woks & Artisanal Fermentations",
                    "content": "Every course is prepared fresh in front of your crew using age-old fermentation traditions and flash wok heat.",
                    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=85"
                },
                {
                    "type": "features",
                    "title": "Exclusive Pocha Amenities",
                    "items": [
                        { "title": "Custom Anju Platters", "desc": "Crispy fried chicken towers, spicy braised octopus, and kimchi pancakes." },
                        { "title": "Soju & Makgeolli Sommelier", "desc": "Curated tasting flights of artisanal Korean fruit sojus and cloudy rice wines." },
                        { "title": "Late Night Until 4 AM", "desc": "No rush dining cadence with private sound system and neon lighting controls." }
                    ]
                },
                {
                    "type": "reservation",
                    "title": "Book Your Group at Seoul Street",
                    "content": "Advance reservations for private pocha rooms are released 30 days in advance."
                }
            ]
        }
    )
    print("✓ Custom page 'hongdae-private-pocha-experience' created.")

    # 8. Ensure food photos on all menu items
    food_photos = [
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85",
    ]

    for i, item in enumerate(MenuItem.objects.all()):
        if not item.image and not item.image_url:
            photo = food_photos[i % len(food_photos)]
            item.image = photo
            item.image_url = photo
            item.save()
        elif not item.image:
            item.image = item.image_url
            item.save()

    print(f"✓ Checked {MenuItem.objects.count()} menu items for meal photos.")
    print("=== SEEDING COMPLETE FOR PROJECT 13 ===")

if __name__ == "__main__":
    seed_project_13()
