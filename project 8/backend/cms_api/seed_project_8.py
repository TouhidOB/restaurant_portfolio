import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_backend.settings')
import django
django.setup()

from django.contrib.auth.models import User
from django.utils import timezone
from cms_api.models import SiteConfig, CustomPage, BlogCategory, BlogPost, Reservation

def seed():
    # 1. Superuser
    user, created = User.objects.get_or_create(username='admin')
    if created or not user.is_staff:
        user.is_staff = True
        user.is_superuser = True
        user.set_password('adminpassword123')
        user.save()
        print("Superuser 'admin' created/updated.")

    # 2. Backfill existing reservations
    idx = 1
    for res in Reservation.objects.all():
        if not res.reference_code:
            res.reference_code = f"URBAN-261114-DIN{idx:02d}"
            res.shift = 'dinner'
            res.save()
            idx += 1
            print(f"Backfilled reservation with {res.reference_code}")

    # Add lunch & dinner reservations if needed
    if not Reservation.objects.filter(shift='lunch').exists():
        Reservation.objects.create(
            reference_code="URBAN-261116-LUN1",
            full_name="Tyler Sterling",
            email="tyler.sterling@architectural-craft.com",
            phone="+1 (312) 555-0842",
            date=timezone.now().date(),
            time="12:30",
            shift="lunch",
            guests="4 Guests",
            occasion="Design Team Lunch",
            seating_area="Hearthside Counter",
            table_number="H-04",
            dietary_notes="Two medium-rare ribeyes, one gluten-free coal-roasted cauliflower",
            status="confirmed",
            special_requests="Direct view of the open wood fire pit."
        )
        print("Created sample lunch reservation URBAN-261116-LUN1")

    # 3. Blog Categories
    cat_fire, _ = BlogCategory.objects.get_or_create(
        slug="open-fire-craft",
        defaults={"name": "Open Fire Craft", "description": "Hearth temperatures, live ember management, and wood seasoning."}
    )
    cat_cuts, _ = BlogCategory.objects.get_or_create(
        slug="smokehouse-cuts",
        defaults={"name": "Smokehouse Cuts", "description": "Prime dry-aged beef, heritage pork, and butchery techniques."}
    )
    cat_warehouse, _ = BlogCategory.objects.get_or_create(
        slug="warehouse-chronicles",
        defaults={"name": "Warehouse Chronicles", "description": "History of our 1924 industrial freight depot and neighborhood lore."}
    )

    # 4. Blog Posts
    BlogPost.objects.get_or_create(
        slug="anatomy-850-wood-hearth-oak-smoke",
        defaults={
            "title": "The Anatomy of an 850° Wood Hearth: Hickory, Oak & Smoke",
            "category": cat_fire,
            "cover_image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
            "excerpt": "Why burning aged white oak and local hickory creates the pristine searing coals essential for our bone-in cuts.",
            "content": """At Urban Table, the central hearth is never extinguished. Every morning before dawn, our fire keepers bank the embers and lay down splits of two-year seasoned white oak and shagbark hickory.\n\nWhite oak provides the dense, long-lasting coal bed that radiates at 850 degrees Fahrenheit, while hickory contributes sweet, aromatic smoke that gently seasons the crust of every steak and smoked bone marrow portion.\n\nControlling air flow through our heavy cast-iron draft doors is a constant tactile dialogue between pitmaster and flame—yielding cuts with an unmatched charred crust and tender, succulent core.""",
            "author_name": "Pitmaster Marcus Vance",
            "read_time": "5 min read",
            "is_published": True,
            "views_count": 624,
        }
    )

    BlogPost.objects.get_or_create(
        slug="dry-aging-45-days-bone-in-ribeye",
        defaults={
            "title": "The Art of 45-Day Dry Aging: Deep Marbling & Concentrated Umami",
            "category": cat_cuts,
            "cover_image": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85",
            "excerpt": "Inside our climate-controlled salt-brick aging chamber where prime ribeyes develop deep earthy complexity.",
            "content": """Behind the glass wall of our mezzanine aging room hang dozens of whole primal ribeyes and porterhouse loins. Backed by Himalayan pink salt blocks, temperature is held rigorously at 34°F with 80% humidity.\n\nOver 45 days, natural enzymes break down tough muscle fibers while moisture slowly evaporates, concentrating the natural beef sweetness into notes of hazelnut, blue cheese, and deep mushroom umami.\n\nWhen these steaks touch the red-hot hearth grates, the fat renders with an intoxicating aroma that defines the Urban Table experience.""",
            "author_name": "Executive Butcher Elena Ward",
            "read_time": "6 min read",
            "is_published": True,
            "views_count": 489,
        }
    )

    # 5. Custom Page
    CustomPage.objects.get_or_create(
        slug="industrial-warehouse-buyouts",
        defaults={
            "title": "Industrial Warehouse Buyouts & Private Kitchen Takeovers",
            "meta_description": "Exclusive private dining and warehouse buyouts for up to 180 guests in our historic 1924 space.",
            "blocks": [
                {
                    "type": "hero",
                    "title": "Exclusive Warehouse Buyouts",
                    "subtitle": "Historic 1924 Industrial Dining & Private Gatherings",
                    "bg_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
                    "cta_text": "Request Buyout Deck",
                    "cta_link": "#reservation"
                },
                {
                    "type": "split",
                    "title": "The Raw Energy of an Open Kitchen",
                    "lead": "Commandeer the entire 180-seat converted warehouse with direct sightlines to the roaring wood-fired hearth.",
                    "body": "From high-profile brand launches to milestone celebrations, Urban Table offers complete spatial privacy, custom multi-course pitmaster tastings, and curated craft bar takeovers.",
                    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
                    "image_alt": "Urban Table Warehouse Event"
                },
                {
                    "type": "features",
                    "title": "Private Buyout Inclusions",
                    "items": [
                        { "title": "Full Venue Exclusivity", "desc": "Access to Main Dining Commons, Hearth Counter, Mezzanine Lounge, and Brick Vault." },
                        { "title": "Bespoke Hearth Tasting", "desc": "Customized 5 to 7 course open-fire menus tailored to guest dietary requirements." },
                        { "title": "Craft Cocktail Pairings", "desc": "Smoked bourbon flights, craft cellar selections, and dedicated mixologist stations." }
                    ]
                },
                {
                    "type": "cta",
                    "title": "Plan Your Warehouse Gathering",
                    "subtitle": "Connect with our events team to check availability and reserve dates.",
                    "button_text": "Inquire with Host Desk",
                    "button_link": "/contact"
                }
            ],
            "is_published": True
        }
    )
    print("Seeded custom pages, blog categories, and dispatches for Urban Table.")

if __name__ == '__main__':
    seed()
