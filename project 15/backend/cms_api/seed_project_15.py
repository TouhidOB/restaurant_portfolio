import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_backend.settings')
import django
django.setup()

import datetime
from django.contrib.auth.models import User
from django.utils import timezone
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial,
    Reservation, CustomPage, BlogCategory, BlogPost
)

def seed():
    print("=== SEEDING PROJECT 15: POP! FOOD STUDIO ===")

    # 1. Superuser
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@popfoodstudio.com", "adminpassword123")
        print("✓ Created superuser 'admin' / 'adminpassword123'")
    else:
        u = User.objects.get(username="admin")
        u.set_password("adminpassword123")
        u.is_staff = True
        u.is_superuser = True
        u.save()
        print("✓ Updated superuser 'admin' password")

    # 2. SiteConfig
    config = SiteConfig.objects.first()
    if not config:
        config = SiteConfig.objects.create(
            restaurant_name="POP! FOOD STUDIO",
            content_json={
                "tagline": "EAT OUTSIDE THE LINES",
                "headline": "GOOD FOOD. BIG PERSONALITY.",
                "subheadline": "A vibrant dining playground where oversized pop-art aesthetics meet culinary craftsmanship. Bold flavors, neon nights, and unapologetic plates.",
                "brand_story_title": "WE MAKE FOOD A LITTLE MORE INTERESTING.",
                "brand_story_body": "Founded at the intersection of modern graphic art and street gastronomy, POP! Food Studio was created to shatter the beige boredom of conventional dining. We believe food should be electric, joyful, and visually shocking — without ever compromising on serious culinary technique.\n\nEvery sauce is made from scratch, every bun is baked daily in our laboratory kitchen, and every plate is composed like a frame from an iconic comic strip.",
                "site": {
                    "address": "742 Evergreen Pop Boulevard, Arts District, Studio City, CA 90210",
                    "phone": "+1 (555) 767-3663",
                    "email": "hello@popfoodstudio.com",
                    "operating_hours": "MON-THU: 11:30 - 22:30 | FRI: 11:30 - 00:00 | SAT: 10:30 - 00:00 | SUN: 10:30 - 22:00",
                    "coordinates": "34.1483° N, 118.3965° W — ARTS DISTRICT"
                }
            }
        )
        print("✓ Created SiteConfig")
    else:
        if not config.content_json:
            config.content_json = {}
        if "site" not in config.content_json:
            config.content_json["site"] = {
                "address": "742 Evergreen Pop Boulevard, Arts District, Studio City, CA 90210",
                "phone": "+1 (555) 767-3663",
                "email": "hello@popfoodstudio.com",
                "operating_hours": "MON-THU: 11:30 - 22:30 | FRI: 11:30 - 00:00 | SAT: 10:30 - 00:00 | SUN: 10:30 - 22:00",
                "coordinates": "34.1483° N, 118.3965° W — ARTS DISTRICT"
            }
            config.save()
            print("✓ Updated SiteConfig site data")

    # 3. Backfill existing reservations
    counter = 100
    for r in Reservation.objects.all():
        if not r.reference_code or not r.reference_code.startswith("POP-"):
            r.reference_code = f"POP-261116-{counter}"
            counter += 1
            if not r.shift:
                r.shift = "lunch" if counter % 2 == 0 else "dinner"
            r.save()
    print("✓ Backfilled reference codes on existing reservations")

    # Seed verified test reservations
    ref_lunch = "POP-261116-LUN1"
    res_lunch, created = Reservation.objects.update_or_create(
        reference_code=ref_lunch,
        defaults={
            "customer_name": "Andy Warhol Jr",
            "phone": "+1 (555) 839-2041",
            "email": "andy.jr@popfoodstudio-test.com",
            "preferred_date": datetime.date.today(),
            "preferred_time": "12:30 PM",
            "shift": "lunch",
            "guest_count": 4,
            "inquiry_type": "Table Reservation",
            "selected_experience": "Pop-Art Comic Booth",
            "table_number": "Booth #07 (Electric Yellow)",
            "dietary_notes": "Allergies: Shellfish. Loves extra comic-strip pop sauce.",
            "status": "confirmed",
            "admin_notes": "VIP Pop-Art collector. Table set with custom Warhol screen prints."
        }
    )
    print(f"✓ Seeded verified lunch reservation: {ref_lunch}")

    ref_dinner = "POP-261116-DIN1"
    res_dinner, created = Reservation.objects.update_or_create(
        reference_code=ref_dinner,
        defaults={
            "customer_name": "Chloe Lichtenstein",
            "phone": "+1 (555) 948-1234",
            "email": "chloe.l@popfoodstudio-test.com",
            "preferred_date": datetime.date.today(),
            "preferred_time": "7:45 PM",
            "shift": "dinner",
            "guest_count": 2,
            "inquiry_type": "Table Reservation",
            "selected_experience": "The Food Lab Counter",
            "table_number": "Lab Bar #03 (Neon Cyan)",
            "dietary_notes": "Vegetarian. Requesting Truffle Mushroom Melt pairing.",
            "status": "confirmed",
            "admin_notes": "Anniversary dining experience. Champagne smoke bubble surprise."
        }
    )
    print(f"✓ Seeded verified dinner reservation: {ref_dinner}")

    # 4. Blog Categories
    cat_art, _ = BlogCategory.objects.get_or_create(
        slug="culinary-pop-art",
        defaults={"name": "Culinary Pop-Art Innovations", "description": "Where contemporary pop-art visual principles collide with modern gastronomy.", "sort_order": 1}
    )
    cat_cocktails, _ = BlogCategory.objects.get_or_create(
        slug="neon-cocktails-lab",
        defaults={"name": "Neon Fizz & Mixology Lab", "description": "Molecular mixology, edible disco glitter, aromatic smoke spheres, and vibrant fizzy elixirs.", "sort_order": 2}
    )
    cat_street, _ = BlogCategory.objects.get_or_create(
        slug="street-gastronomy",
        defaults={"name": "Modern Street Gastronomy", "description": "Smash burgers, artisan brioche buns, and high-energy comfort food crafted with fine-dining precision.", "sort_order": 3}
    )
    print("✓ Seeded Blog Categories")

    # 5. Blog Posts
    post1_slug = "the-pop-art-food-philosophy-eating-outside-the-lines"
    BlogPost.objects.update_or_create(
        slug=post1_slug,
        defaults={
            "title": "The Pop-Art Food Philosophy: Why We Eat Outside the Lines",
            "category": cat_art,
            "author_name": "Chef Roy Lichtenstein & Studio Team",
            "read_time": "5 min read",
            "featured_image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
            "excerpt": "Dining should never be mundane. Explore how our graphic color palette, tactile food textures, and comic-book aesthetics turn every meal into a high-energy gallery event.",
            "content": """
### Eating Outside the Lines: The Birth of POP! Food Studio

In a world filled with muted beige dining rooms and whisper-quiet minimalist tables, POP! Food Studio was conceived with a radically joyful premise: **food should be loud, electric, and impossible to ignore.**

Inspired by the radical 1960s pop-art movement led by Andy Warhol, Roy Lichtenstein, and Keith Haring, our culinary studio treats each plate as a canvas of saturated primary pigments, high-contrast textures, and playful graphic forms.

### Saturated Primary Flavors

Just as pop-art stripped fine art of its academic pretension by elevating comic strips and everyday consumer icons, we elevate street classics with serious culinary discipline:
* **The Electric Red Pop Mayo:** Infused with smoked paprika, charred scallion oil, and lacto-fermented chilis.
* **The Comic Boom Brioche:** Stamped in-house with food-grade charcoal ink, toasted in clarified butter.
* **The Fluorescent Fizz Bar:** Botanical cordials made with butterfly pea flowers, yuzu reductions, and shimmering mica pearls.

> "Art is what you can get away with — but flavor is what brings you back tomorrow."

Join us nightly under the electric glow of 45 custom neon fixtures as our brigade cooks live in the center stage Food Lab.
            """,
            "is_published": True,
            "published_at": timezone.now()
        }
    )
    print(f"✓ Seeded Blog Post: {post1_slug}")

    post2_slug = "crafting-the-atomic-smash-burger-in-our-kitchen-lab"
    BlogPost.objects.update_or_create(
        slug=post2_slug,
        defaults={
            "title": "Crafting The Atomic Smash Burger in Our Kitchen Lab",
            "category": cat_street,
            "author_name": "Head of Culinary Development",
            "read_time": "4 min read",
            "featured_image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
            "excerpt": "A deep dive into our 45-day dry-aged custom beef blend, high-heat chrome plancha caramelization, and our secret 18-ingredient comic-strip sauce.",
            "content": """
### The Science of The Atomic Smash

The burger is the undisputed pop icon of modern gastronomy. But creating an unforgettable smash burger requires rigorous thermodynamic precision and butcher craftsmanship.

#### 1. The Custom 70/30 Beef Blend
We source heritage beef from family-owned pastures:
* 40% 45-Day Dry-Aged Chuck
* 30% Rich Marbled Brisket
* 30% Short Rib for decadent collagen melt

#### 2. The 650°F Chrome Plancha Sear
Our heavy custom iron presses generate 40 pounds of downward force, locking the beef directly onto the mirror-finish plancha. This creates an ultra-lacy, crispy Maillard crust that traps every ounce of juices.

#### 3. The Comic-Strip Sauce
18 balanced ingredients including fermented pickle relish, Dijon emulsion, caramelized shallots, and smoked chipotle. Topped with vintage American cheddar that melts into pure velvet.
            """,
            "is_published": True,
            "published_at": timezone.now()
        }
    )
    print(f"✓ Seeded Blog Post: {post2_slug}")

    # 6. Custom Page (Elementor Builder)
    custom_slug = "pop-art-vip-neon-loft-party"
    CustomPage.objects.update_or_create(
        slug=custom_slug,
        defaults={
            "title": "Pop-Art VIP Neon Loft Party & Private Dining",
            "meta_title": "VIP Neon Loft Private Experiences | POP! Food Studio",
            "meta_description": "Host an unforgettable pop-art private dining celebration with customized comic menus, live food lab presentations, and neon cocktail fountains.",
            "layout_data": {
                "blocks": [
                    {
                        "type": "hero",
                        "headline": "THE PRIVATE NEON LOFT",
                        "subheadline": "An exclusive pop-art playground for up to 50 guests, complete with private bar, vinyl DJ booth, and bespoke tasting menus.",
                        "background_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                        "cta_text": "Book The Neon Loft",
                        "cta_link": "#reservation"
                    },
                    {
                        "type": "split",
                        "headline": "IMMERSIVE CULINARY ENTERTAINMENT",
                        "content": "Step inside our highest floor studio overlooking the Arts District. Guests enjoy live plancha stations, custom cocktail towers with aromatic smoke bubbles, and a dedicated culinary brigade preparing personalized burger flights and liquid nitrogen desserts before your eyes.",
                        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                        "image_position": "right"
                    },
                    {
                        "type": "features",
                        "headline": "WHAT'S INCLUDED IN THE VIP PACKAGE",
                        "items": [
                            {"title": "Custom Comic Menus", "description": "Personalized pop-art illustration menus created by our resident graphic artists."},
                            {"title": "Liquid Nitrogen Dessert Show", "description": "Theatrical frozen sweet treats and smoking donut stacks crafted tableside."},
                            {"title": "Private Mixology Station", "description": "Unlimited handcrafted neon cocktails, botanical fizzes, and craft micro-brews."},
                            {"title": "Dedicated Studio Concierge", "description": "Full-service host and service brigade attending to every detail of your event."}
                        ]
                    },
                    {
                        "type": "cta",
                        "headline": "READY TO MAKE YOUR CELEBRATION UNFORGETTABLE?",
                        "subheadline": "Contact our VIP event team now to reserve your date and customize your menu.",
                        "button_text": "Inquire for Private Events",
                        "button_link": "#reservation"
                    }
                ]
            },
            "is_published": True
        }
    )
    print(f"✓ Seeded Custom Page: {custom_slug}")

    print("=== SEEDING COMPLETED FOR PROJECT 15 ===")

if __name__ == "__main__":
    seed()
