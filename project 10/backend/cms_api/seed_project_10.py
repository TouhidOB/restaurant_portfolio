import os
import sys
import django

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "restaurant_backend.settings")
django.setup()

from django.contrib.auth.models import User
from cms_api.models import SiteConfig, Reservation, CustomPage, BlogCategory, BlogPost, MenuCategory, MenuItem

def seed_project_10():
    print("=== Seeding Project 10 (BENGAL HERITAGE DINING) ===")

    # 1. Admin User
    admin_user, created = User.objects.get_or_create(username="admin")
    if created or not admin_user.check_password("adminpassword123"):
        admin_user.set_password("adminpassword123")
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()
        print("✓ Created/Updated admin superuser (admin / adminpassword123)")

    # 2. Backfill Existing Reservations
    existing_res = Reservation.objects.all()
    print(f"Checking {existing_res.count()} existing reservations...")
    for i, r in enumerate(existing_res):
        changed = False
        if not r.reference_code:
            r.reference_code = f"BEN-261114-RES{i+1:02d}"
            changed = True
        if not r.shift:
            r.shift = "lunch" if i % 2 == 0 else "dinner"
            changed = True
        if changed:
            r.save()
            print(f"  ✓ Assigned {r.reference_code} ({r.shift}) to {r.full_name}")

    # 3. Create Specific Test Reservations for Verification
    test_lun_ref = "BEN-261116-LUN1"
    lun_res, created = Reservation.objects.get_or_create(
        reference_code=test_lun_ref,
        defaults={
            "full_name": "Ananya Mukherjee",
            "phone": "+880 1711-234567",
            "email": "ananya.mukherjee@heritage-dhaka.com",
            "reservation_date": "2026-11-20",
            "reservation_time": "1:00 PM",
            "shift": "lunch",
            "table_number": "Courtyard B-04",
            "guests": 4,
            "occasion": "Family Heritage Thali Lunch",
            "seating_preference": "Open-Air Terracotta Courtyard",
            "dietary_notes": "Mustard Hilsa tasting, mild spice preference, raw coconut water pairing",
            "status": "confirmed",
            "admin_notes": "Assigned prime courtyard fountain-side table. Welcome with daab shorbot."
        }
    )
    if created:
        print(f"✓ Created test lunch reservation: {test_lun_ref} (Ananya Mukherjee)")

    test_din_ref = "BEN-261116-DIN1"
    din_res, created = Reservation.objects.get_or_create(
        reference_code=test_din_ref,
        defaults={
            "full_name": "Devendra Choudhury",
            "phone": "+91 98300-54321",
            "email": "devendra@choudhury-estates.in",
            "reservation_date": "2026-11-21",
            "reservation_time": "8:00 PM",
            "shift": "dinner",
            "table_number": "Zamindari Suite Z-01",
            "guests": 6,
            "occasion": "Zamindari Grand Feast & Sitar Recital",
            "seating_preference": "Brass & Teak Private Saloon",
            "dietary_notes": "Chingri Malai Curry, Kacha Lonka Mangsho, Nolen Gur ice cream",
            "status": "pending",
            "admin_notes": "Requires traditional kansa bell-metal silverware service."
        }
    )
    if created:
        print(f"✓ Created test dinner reservation: {test_din_ref} (Devendra Choudhury)")

    # 4. Seed Blog Categories
    cat_zam, _ = BlogCategory.objects.get_or_create(
        slug="zamindari-gastronomy",
        defaults={
            "name": "Zamindari Gastronomy",
            "description": "Historical banquets, aristocratic Thakurbari recipes, and grand feast traditions of Bengal."
        }
    )
    cat_river, _ = BlogCategory.objects.get_or_create(
        slug="river-delta-culinary",
        defaults={
            "name": "River Delta Culinary",
            "description": "Padma river hilsa, Sundarbans mangrove honey, and coastal bay seafood chronicles."
        }
    )
    cat_spice, _ = BlogCategory.objects.get_or_create(
        slug="spice-chronicles",
        defaults={
            "name": "Spice & Terroir Chronicles",
            "description": "Cold-pressed mustard oil, radhuni seeds, five-spice blends, and artisanal heritage preparations."
        }
    )
    print("✓ Blog categories seeded")

    # 5. Seed Blog Articles
    post1, created = BlogPost.objects.get_or_create(
        slug="secrets-of-shorshe-ilish-padma-delta",
        defaults={
            "title": "The Sacred Geometry of Shorshe Ilish: Sourcing Hilsa from the Padma Delta",
            "category": cat_river,
            "author_name": "Chef Subrata Roy",
            "reading_time": "5 min read",
            "excerpt": "Why autumn silver hilsa caught at the confluence of the Padma and Meghna rivers produces the legendary silken texture and rich delta flavor that defines Bengali haute cuisine.",
            "content": """<p>For centuries across Bengal, the arrival of autumn rains heralded the sacred culinary ascent of the silver queen: the Tenualosa ilisha, revered simply as Ilish. At BENGAL HERITAGE DINING, our sourcing philosophy is unbending: we procure exclusively silver-bellied wild hilsa harvested at the exact tidal confluence of the Padma and Meghna deltas.</p>
<h3>The Terroir of the Cold-Pressed Mustard Paste</h3>
<p>True Shorshe Ilish relies on a delicate balance between yellow and brown mustard seeds, grounded on a traditional black granite shil-nora with rock salt and green chilies. The heat must come not from dried cayenne, but from cold-pressed virgin mustard oil and whole slit kacha lonka, allowing the sweet fat of the river fish to emulsify into golden harmony.</p>
<p>Served on hand-beaten kansa (bell metal) plates alongside steaming aromatic Gobindobhog rice, it is not merely dinner; it is an ancestral rite of passage.</p>""",
            "featured_image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
            "is_published": True,
        }
    )
    if created:
        print(f"✓ Seeded blog article: {post1.slug}")

    post2, created = BlogPost.objects.get_or_create(
        slug="zamindari-royal-feasts-kolkata-dhaka",
        defaults={
            "title": "Echoes of the Thakurbari Kitchens: Feasting Across Old Bengal",
            "category": cat_zam,
            "author_name": "Maitreyi Sen",
            "reading_time": "6 min read",
            "excerpt": "Exploring the 19th-century aristocratic manor banquets where Awadhi Mughlai subtlety blended seamlessly with Bengal's rural freshwater bounty and Portuguese cheese crafts.",
            "content": """<p>The culinary renaissance of the Bengali Renaissance was birthed in the legendary andhar-mahal (inner courtyard kitchens) of aristocratic estates stretching from Jorasanko in Kolkata to the riverine palaces of Bikrampur. It was an era of unprecedented gastronomic synthesis.</p>
<h3>The Multi-Course Sequence of Atithi Bhojan</h3>
<p>Unlike Western synchronous dining, an authentic Bengali Zamindari meal is strictly linear and Ayurvedic in progression: commencing with the bitter shukto to cleanse the palate, progressing through rich lentils and crisp fritters, culminating in the crescendo of mustard fish, slow-simmered kosha mangsho, and concluded with cooling plastic chutney and nolen gurer sandesh.</p>
<p>Each course is served in its own consecrated brass bowl, paired with herbal digestifs and freshly pressed betel leaves.</p>""",
            "featured_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
            "is_published": True,
        }
    )
    if created:
        print(f"✓ Seeded blog article: {post2.slug}")

    # 6. Seed Custom Standalone Page
    page1, created = CustomPage.objects.get_or_create(
        slug="zamindari-royal-banquet-private-dining",
        defaults={
            "title": "Zamindari Royal Banquet & Courtyard Buyouts",
            "meta_description": "Host your landmark weddings, aristocratic family celebrations, and diplomatic banquets in our restored heritage courtyard and private brass salons.",
            "blocks": [
                {
                    "type": "hero",
                    "title": "Aristocratic Hospitality in the Royal Courtyard",
                    "subtitle": "ZAMINDARI ATITHI BHOJAN • LEVEL OF HERITAGE",
                    "lead": "Step into a sanctuary of antique Burma teak columns, hand-carved terracotta friezes, and private sitar recitals tailored for distinguished family celebrations and diplomatic feasts.",
                    "cta_text": "Request Royal Banquet Inquiry",
                    "bg_image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85"
                },
                {
                    "type": "split",
                    "title": "Consecrated Bell-Metal Dining & 14-Course Feasts",
                    "lead": "Dining as sacred ritual: heavy kansa tableware, slow clay-pot simmered curries, and antique silver rosewater sprinklers.",
                    "body": "Our private dining rooms accommodate from 12 to 85 guests under hand-loomed indigo ceilings. Every course is introduced by our cultural food historian, paired with estate Darjeeling first-flush teas and artisanal sugarcane digestifs.",
                    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
                    "image_alt": "Zamindari Private Feast Table"
                },
                {
                    "type": "features",
                    "title": "Bespoke Royal Banquet Amenities",
                    "items": [
                        {
                            "title": "Bespoke 14-Course Menu",
                            "desc": "Customized seasonal degustion featuring Smoked Hilsa, Gold-Leaf Mutton Kosha, and seasonal date palm jaggery creations."
                        },
                        {
                            "title": "Live Classical Sitar & Sarod",
                            "desc": "Acoustic accompaniment by master instrumentalists performing evening ragas throughout service."
                        },
                        {
                            "title": "Handcrafted Kansa Service",
                            "desc": "Bespoke bell-metal plateware consecrated to retain heat and honor traditional Ayurvedic hospitality."
                        },
                        {
                            "title": "Dedicated Concierge Host",
                            "desc": "Personal majordomo assigned to your party to coordinate arrivals, valet, and dietary requirements."
                        }
                    ]
                },
                {
                    "type": "cta",
                    "title": "Reserve the Royal Courtyard for Your Milestone",
                    "subtitle": "Dates for festive banquets and private buyouts are secured by advance consultation with our Maître D'.",
                    "button_text": "Inquire for Royal Buyout"
                },
                {
                    "type": "reservation",
                    "title": "Check Banquet Availability",
                    "subtitle": "Our concierge desk will respond within 4 hours with personalized menu proposals."
                }
            ],
            "is_published": True,
        }
    )
    if created:
        print(f"✓ Seeded custom page: {page1.slug}")

    print("=== Project 10 Database Seeding Complete! ===")

if __name__ == "__main__":
    seed_project_10()
