from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date, timedelta
from tropical_api.models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryStoryStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ
)

class Command(BaseCommand):
    help = 'Seeds complete Tropical Contemporary data for VERDANT restaurant'

    def handle(self, *args, **options):
        self.stdout.write("Initializing Verdant Tropical Seed Process...")

        # 1. Superuser
        admin_user, created = User.objects.get_or_create(username='admin')
        admin_user.set_password('adminpassword123')
        admin_user.is_superuser = True
        admin_user.is_staff = True
        admin_user.save()
        self.stdout.write(self.style.SUCCESS("Superuser verified: admin / adminpassword123"))

        # 2. Restaurant
        restaurant, _ = Restaurant.objects.update_or_create(
            id=1,
            defaults={
                'name': "VERDANT // TROPICAL MODERN DINING",
                'slug': "verdant-tropical-modern",
                'tagline': "NATURE IN FORM. FLAVOR IN EVERY DETAIL.",
                'short_description': "A contemporary dining destination immersed in lush botanical landscapes, open-air timber architecture, and nature-inspired gastronomy.",
                'long_description': "Where architecture dissolves into nature. Savor seasonally harvested tropical produce, wood-fired hearth delicacies, and botanical elixirs under the canopy of broad-leaf palms and warm afternoon sun.",
                'phone': "+1 (305) 555-0428",
                'email': "concierge@verdant-dining.com",
                'address': "840 Palm Grove Way, Tropical Corridor",
                'city': "Miami, FL 33139",
                'country': "United States",
                'latitude': 25.7617,
                'longitude': -80.1918,
                'coordinates_display': "25.7617° N, 80.1918° W — PALM GROVE",
                'opening_hours_summary': "TUE — SUN / 12:00 — 23:30 (CLOSED MON)",
                'hero_eyebrow': "A CONTEMPORARY DINING EXPERIENCE",
                'hero_heading_line1': "WHERE",
                'hero_heading_line2': "NATURE MEETS",
                'hero_heading_line3': "THE TABLE.",
                'hero_supporting_text': "Discover a thoughtful approach to food, atmosphere, and hospitality inspired by the beauty of natural spaces. Open-air pavilions framed by broad-leaf palms and warm sunlight.",
                'hero_cta_primary': "EXPLORE OUR MENU",
                'hero_cta_secondary': "DISCOVER THE SPACE",
                'primary_color': "#243F32",
                'secondary_color': "#52745A",
                'accent_color': "#BC7153",
                'light_color': "#F6F2E9",
                'tables_capacity': 72,
                'daily_menu_courses': 10,
                'botanical_varietals': 180,
                'is_active': True,
            }
        )

        # 3. 15 Website Sections
        sections_data = [
            {
                'key': 'hero',
                'order': 1,
                'eyebrow': "A CONTEMPORARY DINING EXPERIENCE",
                'title': "WHERE NATURE MEETS THE TABLE.",
                'subtitle': "Discover a thoughtful approach to food, atmosphere, and hospitality inspired by the beauty of natural spaces.",
                'custom': {
                    'cta_primary': "EXPLORE OUR MENU",
                    'cta_secondary': "DISCOVER THE SPACE",
                    'cta_target_primary': "#menu",
                    'cta_target_secondary': "#tour",
                    'coordinates': "25.7617° N, 80.1918° W — PALM GROVE",
                    'status_indicator': "CANOPY PAVILION OPEN // SEATING AVAILABLE"
                }
            },
            {
                'key': 'intro',
                'order': 2,
                'eyebrow': "EDITORIAL INTRODUCTION",
                'title': "A NATURAL WAY TO DINE.",
                'subtitle': "Rooted in the pleasure of good food and meaningful hospitality, our restaurant brings together contemporary dining and an atmosphere inspired by nature.",
                'custom': {
                    'paragraph_1': "Verdant was conceived as an organic oasis where the barrier between indoor architecture and lush tropical landscape gently dissolves. Floor-to-ceiling glass and reclaimed teak pavilions open directly to the warm coastal air.",
                    'paragraph_2': "Every plate is a tribute to botanical vitality: vibrant heirloom citrus, ember-roasted wild sea bass, and cold-pressed botanical infusions, shared in the dappled afternoon light of living palm groves.",
                    'badge': "TROPICAL MODERNISM // BOTANICAL 01"
                }
            },
            {
                'key': 'philosophy',
                'order': 3,
                'eyebrow': "OUR PHILOSOPHY",
                'title': "GOOD FOOD GROWS FROM GOOD THINKING.",
                'subtitle': "Three guiding pillars form the bedrock of our culinary and architectural approach.",
                'custom': {}
            },
            {
                'key': 'signatures',
                'order': 4,
                'eyebrow': "CURATED HIGHLIGHTS",
                'title': "FRESH FROM OUR KITCHEN.",
                'subtitle': "Explore a selection of dishes that express our approach to flavor, creativity, and presentation.",
                'custom': {
                    'view_all_cta': "BROWSE COMPLETE REPERTOIRE"
                }
            },
            {
                'key': 'menu_explorer',
                'order': 5,
                'eyebrow': "MENU EXPLORER",
                'title': "A MENU INSPIRED BY THE MOMENT.",
                'subtitle': "Seasonally harvested botanicals, wood-fired hearth proteins, and coastal delicacies.",
                'custom': {
                    'tasting_menu_price': "$145 TASTING EXPERIENCE",
                    'pairing_price': "$85 BOTANICAL PAIRINGS"
                }
            },
            {
                'key': 'culinary_story',
                'order': 6,
                'eyebrow': "CULINARY STORY",
                'title': "FROM THE NATURAL WORLD TO YOUR TABLE.",
                'subtitle': "An authentic four-stage narrative tracing soil, sun, hearth, and palate.",
                'custom': {}
            },
            {
                'key': 'tropical_architecture',
                'order': 7,
                'eyebrow': "TROPICAL ARCHITECTURE",
                'title': "DESIGNED TO FEEL NATURAL.",
                'subtitle': "Explore the materials, natural light, and architectural details that shape the atmosphere of our restaurant.",
                'custom': {
                    'architect_credit': "ATELIER VERDANT &amp; PALM DESIGN GROUP // 2022",
                    'materials': ["Reclaimed Teak Wood", "Limestone & Travertine", "Floor-to-Ceiling Glass", "Living Tropical Garden"]
                }
            },
            {
                'key': 'virtual_tour',
                'order': 8,
                'eyebrow': "VIRTUAL EXPLORATION",
                'title': "TAKE A MOMENT. STEP INSIDE.",
                'subtitle': "Explore our restaurant's spaces and discover the details that make the dining experience unique.",
                'custom': {}
            },
            {
                'key': 'dining_experience',
                'order': 9,
                'eyebrow': "THE EXPERIENCE",
                'title': "SLOW DOWN. SIT BACK. ENJOY.",
                'subtitle': "Three immersive dimensions framing every visit to our botanical haven.",
                'custom': {}
            },
            {
                'key': 'gallery',
                'order': 10,
                'eyebrow': "VISUAL RECORD",
                'title': "BOTANICAL ARCHIVE.",
                'subtitle': "A visual collection of food, architecture, palm gardens, and warm light.",
                'custom': {}
            },
            {
                'key': 'testimonials',
                'order': 11,
                'eyebrow': "GUEST EXPERIENCES",
                'title': "MOMENTS WORTH SHARING.",
                'subtitle': "Reflections from food enthusiasts, architectural critics, and discerning travelers.",
                'custom': {}
            },
            {
                'key': 'reservation',
                'order': 12,
                'eyebrow': "RESERVATIONS",
                'title': "LET'S MAKE ROOM FOR GOOD MOMENTS.",
                'subtitle': "Planning a visit? Send us your reservation request and our team will help you arrange your dining experience.",
                'custom': {
                    'notice': "For private canopy dining or parties larger than 8, please contact concierge directly."
                }
            },
            {
                'key': 'location_contact',
                'order': 13,
                'eyebrow': "LOCATION & HOURS",
                'title': "FIND YOUR PLACE HERE.",
                'subtitle': "Nestled in the lush Palm Grove corridor, surrounded by protected sub-tropical flora.",
                'custom': {}
            },
            {
                'key': 'faq',
                'order': 14,
                'eyebrow': "INFORMATION",
                'title': "FREQUENTLY ASKED QUESTIONS.",
                'subtitle': "Essential details regarding reservations, outdoor seating, parking, and dining policies.",
                'custom': {}
            },
            {
                'key': 'footer',
                'order': 15,
                'eyebrow': "COLOPHON",
                'title': "GOOD FOOD. NATURAL SPACES. BETTER MOMENTS.",
                'subtitle': "Verdant is committed to regenerative agriculture, low-waste kitchen practices, and local mangrove preservation.",
                'custom': {
                    'copyright': "© 2026 VERDANT RESTAURANT GROUP. ALL RIGHTS RESERVED.",
                    'coordinates': "25.7617° N, 80.1918° W — PALM GROVE"
                }
            }
        ]

        for sec in sections_data:
            WebsiteSection.objects.update_or_create(
                section_key=sec['key'],
                defaults={
                    'display_order': sec['order'],
                    'eyebrow': sec['eyebrow'],
                    'title': sec['title'],
                    'subtitle': sec['subtitle'],
                    'custom_content': sec['custom'],
                    'is_visible': True
                }
            )
        self.stdout.write(self.style.SUCCESS("All 15 WebsiteSections seeded."))

        # 4. Philosophy Pillars (3 items)
        pillars_data = [
            {
                'num': '01',
                'title': 'NATURE',
                'statement': 'Finding inspiration in natural ingredients, seasonal character, and thoughtful presentation.',
                'desc': 'We partner directly with sustainable sub-tropical groves and regenerative coastal growers. We celebrate unblemished purity, sun-ripened citrus, and wild coastal herbs without artificial intervention.',
                'order': 1
            },
            {
                'num': '02',
                'title': 'CRAFT',
                'statement': 'Bringing care and intention to preparation, technique, and every detail.',
                'desc': 'Our open-air kitchen marries ancestral wood-fire hearth technique with delicate cold extractions, balancing smoke, acidity, and aromatic leaf wraps.',
                'order': 2
            },
            {
                'num': '03',
                'title': 'HOSPITALITY',
                'statement': 'Creating an atmosphere where people can slow down, connect, and enjoy.',
                'desc': 'Warm, unhurried, and grounded in natural beauty. From acoustic water reflections to breathable open-air pavilions, every element fosters relaxation and joy.',
                'order': 3
            }
        ]
        PhilosophyPillar.objects.all().delete()
        for p in pillars_data:
            PhilosophyPillar.objects.create(
                number=p['num'],
                title=p['title'],
                statement=p['statement'],
                description=p['desc'],
                display_order=p['order']
            )
        self.stdout.write(self.style.SUCCESS("PhilosophyPillars seeded."))

        # 5. Menu Categories (7 categories matching PRD)
        categories_data = [
            {'name': 'Starters', 'slug': 'starters', 'desc': 'Chilled coastal crudos, plantain crisps, and tropical fruit ceviches.', 'order': 1},
            {'name': 'Salads & Botanicals', 'slug': 'salads', 'desc': 'Living greens, hearts of palm, roasted seeds, and citrus emulsions.', 'order': 2},
            {'name': 'Hearth & Embers', 'slug': 'hearth', 'desc': 'Charred over coconut husks and hardwood embers at 700°F.', 'order': 3},
            {'name': 'Coastal Seafood', 'slug': 'seafood', 'desc': 'Line-caught local snapper, wild prawns, and charred banana-leaf fish.', 'order': 4},
            {'name': 'Main Courses', 'slug': 'mains', 'desc': 'Wood-roasted cuts, tamarind glazed ribs, and cassava purées.', 'order': 5},
            {'name': 'Tropical Desserts', 'slug': 'desserts', 'desc': 'Roasted mango, passionfruit granita, and toasted coconut sorbets.', 'order': 6},
            {'name': 'Botanical Elixirs', 'slug': 'beverages', 'desc': 'Cold-pressed hibiscus, wild lemongrass ferments, and cane spirits.', 'order': 7},
        ]
        cat_objs = {}
        for c in categories_data:
            obj, _ = MenuCategory.objects.update_or_create(
                slug=c['slug'],
                defaults={'name': c['name'], 'description': c['desc'], 'display_order': c['order'], 'is_active': True}
            )
            cat_objs[c['slug']] = obj
        self.stdout.write(self.style.SUCCESS("MenuCategories seeded."))

        # 6. Menu Items (14 items with high-res tropical food imagery)
        menu_items_data = [
            # Starters
            {
                'cat': 'starters',
                'name': 'Wild Snapper Ceviche in Coconut Water',
                'slug': 'snapper-ceviche-coconut',
                'price': 24.00,
                'short': 'Day-boat snapper, fresh coconut leche de tigre, charred habanero, pickled gooseberry.',
                'desc': 'Fresh Atlantic snapper sliced razor-thin and cured in young coconut water and lime, dressed with compressed tropical gooseberry and avocado purée.',
                'dietary': ['GF', 'DF'],
                'allergens': 'Fish',
                'featured': True,
                'order': 1,
                'img': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'starters',
                'name': 'Crispy Plantain Tostones & Guava Glaze',
                'slug': 'tostones-guava-glaze',
                'price': 16.00,
                'short': 'Twice-fried green plantains, spiced wild guava reduction, sea salt, cotija crumble.',
                'desc': 'Golden crisp green plantains crushed and fried in avocado oil, glazed with slow-simmered Florida wild guava and dusted with sea salt flakes.',
                'dietary': ['GF', 'V'],
                'allergens': 'Dairy',
                'featured': False,
                'order': 2,
                'img': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
            },
            # Salads
            {
                'cat': 'salads',
                'name': 'Charred Hearts of Palm & Passionfruit',
                'slug': 'hearts-of-palm-passionfruit',
                'price': 22.00,
                'short': 'Fresh Hawaiian peach palm hearts, wild arugula, passionfruit vinaigrette, toasted macadamia.',
                'desc': 'Sustainably cultivated peach palm blasted briefly over wood embers, sliced over crisp wild watercress and dressed with sharp golden passionfruit oil.',
                'dietary': ['VG', 'GF', 'DF'],
                'allergens': 'Tree Nuts',
                'featured': True,
                'order': 3,
                'img': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'salads',
                'name': 'Papaya, Lime & Toasted Coconut Slaw',
                'slug': 'papaya-coconut-slaw',
                'price': 18.00,
                'short': 'Shaved green mountain papaya, cilantro leaf, lime dressing, crispy shallots, shaved coconut.',
                'desc': 'Crisp and refreshing green papaya strands tossed with kaffir lime zest, fresh mint leaves, and roasted sweet coconut chips.',
                'dietary': ['VG', 'GF', 'DF'],
                'allergens': 'None',
                'featured': False,
                'order': 4,
                'img': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'
            },
            # Hearth & Embers
            {
                'cat': 'hearth',
                'name': 'Ember-Charred Maitake & Plantain Mash',
                'slug': 'ember-maitake-plantain',
                'price': 29.00,
                'short': 'Binchotan roasted wild maitake, savory garlic-herb plantain mash, chimichurri.',
                'desc': 'Clustered wild mushrooms cooked directly in oak and coconut embers until smoky and deeply caramelized, plated over silky plantain purée.',
                'dietary': ['VG', 'GF', 'DF'],
                'allergens': 'None',
                'featured': False,
                'order': 5,
                'img': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'hearth',
                'name': 'Wood-Fired Wild Prawns & Citrus Garlic',
                'slug': 'wood-fired-wild-prawns',
                'price': 36.00,
                'short': 'Key West pink prawns, scorched key lime butter, charred scallion, grilled sourdough.',
                'desc': 'Large head-on wild prawns seared on cast iron over glowing hardwood coals, basted with key lime butter and fresh garden chilies.',
                'dietary': ['GF'],
                'allergens': 'Shellfish, Dairy',
                'featured': True,
                'order': 6,
                'img': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80'
            },
            # Seafood
            {
                'cat': 'seafood',
                'name': 'Banana-Leaf Baked Black Grouper',
                'slug': 'banana-leaf-grouper',
                'price': 44.00,
                'short': 'Gulf grouper fillet wrapped in scorched banana leaf, lemongrass annatto paste, coconut rice.',
                'desc': 'Steamed inside aromatic banana leaf packages over hot stones, infusing the delicate fish with herbal lemongrass, allspice, and wild achiote.',
                'dietary': ['GF', 'DF'],
                'allergens': 'Fish',
                'featured': True,
                'order': 7,
                'img': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'seafood',
                'name': 'Grilled Octopus & Smoked Cassava',
                'slug': 'grilled-octopus-cassava',
                'price': 38.00,
                'short': 'Charred tender Spanish octopus, smoked yucca crema, pickled red onion, cilantro mojo.',
                'desc': 'Slow-poached then flash-seared over glowing embers for a crackling crust, paired with smooth velvety cassava purée and tart orange mojo.',
                'dietary': ['GF'],
                'allergens': 'Mollusks',
                'featured': False,
                'order': 8,
                'img': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80'
            },
            # Mains
            {
                'cat': 'mains',
                'name': 'Dry-Aged Ribeye & Chimichurri Verde',
                'slug': 'dry-aged-ribeye-chimichurri',
                'price': 68.00,
                'short': '14oz pasture-raised prime beef, charred scallion chimichurri, ember roasted sweet potatoes.',
                'desc': 'Aged 45 days, seared over white oak coals to medium rare and brushed with marrow oil, accompanied by garden herb chimichurri.',
                'dietary': ['GF', 'DF'],
                'allergens': 'None',
                'featured': False,
                'order': 9,
                'img': 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'mains',
                'name': 'Tamarind Braised Short Rib Monolith',
                'slug': 'tamarind-short-rib',
                'price': 48.00,
                'short': '12-hour slow-cooked beef rib, dark tamarind glaze, roasted chayote squash, coconut grits.',
                'desc': 'Fall-apart tender beef ribs lacquered with tangy roasted tamarind reduction, served on stoneground coconut grits.',
                'dietary': ['GF'],
                'allergens': 'Dairy',
                'featured': False,
                'order': 10,
                'img': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
            },
            # Desserts
            {
                'cat': 'desserts',
                'name': 'Caramelized Mango & Coconut Sorbet',
                'slug': 'caramelized-mango-coconut-sorbet',
                'price': 16.00,
                'short': 'Wood-fired Florida mango, wild lime granita, housemade coconut milk sorbet, ginger crisp.',
                'desc': 'Sun-ripened mango halves caramelized with raw cane sugar over coals, served with vibrant frozen lime snow and velvety coconut sorbet.',
                'dietary': ['VG', 'GF', 'DF'],
                'allergens': 'None',
                'featured': True,
                'order': 11,
                'img': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'desserts',
                'name': 'Warm Cocoa Fondant & Passionfruit Curd',
                'slug': 'cocoa-fondant-passionfruit',
                'price': 18.00,
                'short': 'Single-origin 72% dark chocolate cake, molten center, tart passionfruit curd, cocoa nibs.',
                'desc': 'Baked to order with a luscious liquid center, balanced by the bright natural acidity of freshly squeezed passionfruit.',
                'dietary': ['V'],
                'allergens': 'Dairy, Gluten, Eggs',
                'featured': False,
                'order': 12,
                'img': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80'
            },
            # Beverages
            {
                'cat': 'beverages',
                'name': 'Verdant Botanical Palm Fizz',
                'slug': 'verdant-palm-fizz',
                'price': 18.00,
                'short': 'Artisanal sugarcane rum, clarified lime, lemongrass cordial, sparkling coconut soda, mint.',
                'desc': 'Our signature tropical cocktail served tall over hand-carved ice, perfumed with bruised garden lemongrass and garden mint.',
                'dietary': ['VG', 'GF'],
                'allergens': 'None',
                'featured': False,
                'order': 13,
                'img': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'beverages',
                'name': 'Wild Hibiscus & Ginger Shrub (Zero-Proof)',
                'slug': 'hibiscus-ginger-shrub',
                'price': 14.00,
                'short': 'Steeped red hibiscus calyces, cold-pressed raw ginger, apple cider vinegar, club soda.',
                'desc': 'Non-alcoholic botanical refresher with deep ruby color, invigorating spice, and crisp fruit acids.',
                'dietary': ['VG', 'GF'],
                'allergens': 'None',
                'featured': False,
                'order': 14,
                'img': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80'
            }
        ]

        MenuItem.objects.all().delete()
        for item in menu_items_data:
            MenuItem.objects.create(
                category=cat_objs[item['cat']],
                name=item['name'],
                slug=item['slug'],
                price=item['price'],
                short_description=item['short'],
                full_description=item['desc'],
                dietary_information=item['dietary'],
                allergens=item['allergens'],
                is_featured=item['featured'],
                is_available=True,
                display_order=item['order'],
                image_url=item['img']
            )
        self.stdout.write(self.style.SUCCESS(f"{len(menu_items_data)} MenuItems seeded."))

        # 7. Virtual Tour Viewpoints (5 Viewpoints matching PRD)
        viewpoints_data = [
            {
                'title': 'Exterior Architecture & Canopy',
                'slug': 'exterior-canopy',
                'space': 'Tropical Entrance Elevation',
                'desc': 'Soaring teak timber eaves surrounded by broad-leaf royal palms, bamboo screens, and natural limestone paving stones.',
                'materials': 'Reclaimed teak beams, natural coral stone, living tropical ferns',
                'camera_pos': [0, 2.2, 8.5],
                'camera_target': [0, 1.2, 0],
                'hotspot_title': 'Teak Canopy Eaves',
                'hotspot_detail': 'Expansive overhanging rafters designed for natural shade and rainwater catchment.',
                'order': 1,
                'img': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Botanical Entrance & Pond',
                'slug': 'botanical-entrance',
                'space': 'Acoustic Water Court',
                'desc': 'A transition threshold flanked by acoustic reflection pools, natural river stones, and cascading monstera leaves.',
                'materials': 'Honed basalt stone, natural limestone, water reflection court',
                'camera_pos': [-2.5, 1.8, 5.0],
                'camera_target': [0, 1.4, 0],
                'hotspot_title': 'Reflection Pools',
                'hotspot_detail': 'Circulating water features that cool ambient air and create peaceful white noise.',
                'order': 2,
                'img': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Main Open-Air Dining Pavilion',
                'slug': 'main-dining-pavilion',
                'space': 'Central Palm Sanctuary',
                'desc': 'High-ceilinged open timber structure with woven rattan luminaires, living palm trunks, and custom sand-toned linen seating.',
                'materials': 'Solid teak tables, woven rattan fixtures, polished limestone flooring',
                'camera_pos': [0, 1.9, 4.2],
                'camera_target': [0, 1.1, -1.0],
                'hotspot_title': 'Hand-Woven Rattan Lights',
                'hotspot_detail': 'Sculptural lighting custom-crafted by indigenous coastal artisans.',
                'order': 3,
                'img': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Garden Terrace & Palm Oasis',
                'slug': 'garden-terrace',
                'space': 'The Open-Air Glade',
                'desc': 'Outdoor dining garden nestled directly under a lush canopy of coconut palms, night-blooming jasmine, and low warm lighting.',
                'materials': 'Weathered teak decking, lush garden planters, linen drapery',
                'camera_pos': [3.5, 1.6, 3.8],
                'camera_target': [0, 1.0, 0],
                'hotspot_title': 'Living Botanical Canopy',
                'hotspot_detail': 'Mature coconut palms and silver bismarck trees providing gentle sea-breeze circulation.',
                'order': 4,
                'img': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Teak Wood Hearth & Botanical Bar',
                'slug': 'hearth-botanical-bar',
                'space': 'The Culinary Epicenter',
                'desc': 'A 32-foot curved teak bar facing our wood-fired hearth and botanical infusion laboratory filled with live herbs and terracotta jars.',
                'materials': 'Curved solid teak, handmade glazed terracotta tiles, cast iron fire rig',
                'camera_pos': [0, 1.8, 2.5],
                'camera_target': [0, 1.2, -2.5],
                'hotspot_title': 'Coconut Husk Hearth',
                'hotspot_detail': 'Open wood fire rig infusing seafood and skewers with fragrant tropical embers.',
                'order': 5,
                'img': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80'
            }
        ]

        VirtualTourViewpoint.objects.all().delete()
        for vp in viewpoints_data:
            VirtualTourViewpoint.objects.create(
                title=vp['title'],
                slug=vp['slug'],
                space_name=vp['space'],
                description=vp['desc'],
                materials_spec=vp['materials'],
                camera_position=vp['camera_pos'],
                camera_target=vp['camera_target'],
                hotspot_title=vp['hotspot_title'],
                hotspot_detail=vp['hotspot_detail'],
                display_order=vp['order'],
                image_url=vp['img'],
                is_active=True
            )
        self.stdout.write(self.style.SUCCESS("VirtualTourViewpoints seeded (5 viewpoints)."))

        # 8. Culinary Story Stages (4 stages matching PRD)
        story_stages_data = [
            {
                'num': '01',
                'title': 'INSPIRATION',
                'subtitle': 'Sub-tropical biodiversity & coastal traditions',
                'desc': 'Our journey begins in the native sub-tropical orchards of South Florida and the Caribbean basin, honoring the heritage of wood-fire smoke and wild sea salt.',
                'img': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
                'order': 1
            },
            {
                'num': '02',
                'title': 'INGREDIENTS',
                'subtitle': 'Direct partnership with sustainable growers',
                'desc': 'We harvest wild passionfruit, peach palm hearts, and day-boat coastal catch directly from certified local families who respect organic soil cycles.',
                'img': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
                'order': 2
            },
            {
                'num': '03',
                'title': 'PREPARATION',
                'subtitle': 'The balance of wood fire and delicate cold acids',
                'desc': 'No gas cooking. Everything is prepared over dried coconut husks and oak embers, harmonized with chilled cold-pressed citrus marinades.',
                'img': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                'order': 3
            },
            {
                'num': '04',
                'title': 'PRESENTATION',
                'subtitle': 'Plated on terracotta and hand-carved teak',
                'desc': 'Dishes are presented on custom terracotta tableware under warm dappled sunlight, letting the vibrant natural hues of tropical produce shine.',
                'img': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
                'order': 4
            }
        ]
        CulinaryStoryStage.objects.all().delete()
        for s in story_stages_data:
            CulinaryStoryStage.objects.create(
                stage_number=s['num'],
                title=s['title'],
                subtitle=s['subtitle'],
                description=s['desc'],
                image_url=s['img'],
                display_order=s['order']
            )
        self.stdout.write(self.style.SUCCESS("CulinaryStoryStages seeded (4 stages)."))

        # 9. Dining Experience Panels (3 panels matching PRD)
        panels_data = [
            {
                'title': 'THE ATMOSPHERE',
                'slug': 'the-atmosphere',
                'subtitle': 'Open-air pavilions framed by broad-leaf palms and warm sun',
                'desc': 'Designed to dissolve the boundary between guest and tropical garden. Gentle cross-breezes, warm natural teak beams, and acoustic water gardens create effortless relaxation.',
                'badge': 'BOTANICAL ARCHITECTURE',
                'img': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
                'order': 1
            },
            {
                'title': 'THE PEOPLE',
                'slug': 'the-people',
                'subtitle': 'Warm, unpretentious, nature-grounded hospitality',
                'desc': 'Our service team embodies tropical ease and precision care: attentive without intrusion, deeply passionate about indigenous botanicals, and welcoming to every traveler.',
                'badge': 'INTENTIONAL SERVICE',
                'img': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
                'order': 2
            },
            {
                'title': 'THE MOMENT',
                'slug': 'the-moment',
                'subtitle': 'An unhurried progression that invites you to slow down',
                'desc': 'Dining at Verdant is never rushed. Savor an afternoon cocktail beneath coconut fronds or settle in for an intimate three-hour dinner as the evening stars emerge.',
                'badge': 'TIMELESS LEISURE',
                'img': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
                'order': 3
            }
        ]
        DiningExperiencePanel.objects.all().delete()
        for p in panels_data:
            DiningExperiencePanel.objects.create(
                title=p['title'],
                slug=p['slug'],
                subtitle=p['subtitle'],
                description=p['desc'],
                spec_badge=p['badge'],
                image_url=p['img'],
                display_order=p['order']
            )
        self.stdout.write(self.style.SUCCESS("DiningExperiencePanels seeded."))

        # 10. Gallery Images (8 items)
        gallery_data = [
            {'title': 'Open Timber Pavilion at Dusk', 'cat': 'exterior', 'caption': 'Main entrance illuminated by low warm lanterns', 'img': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', 'order': 1, 'featured': True},
            {'title': 'Wild Snapper Ceviche', 'cat': 'food', 'caption': 'Cured in fresh young coconut water and wild lime', 'img': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80', 'order': 2, 'featured': True},
            {'title': 'Lush Monstera & Reflection Pond', 'cat': 'details', 'caption': 'Acoustic water court with native tropical broad-leaves', 'img': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'order': 3, 'featured': False},
            {'title': 'Charred Hearts of Palm Salad', 'cat': 'food', 'caption': 'Hawaiian peach palm hearts with passionfruit oil', 'img': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80', 'order': 4, 'featured': True},
            {'title': 'Central Palm Dining Hall', 'cat': 'interior', 'caption': 'Woven rattan luminaires suspended between palm trunks', 'img': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80', 'order': 5, 'featured': True},
            {'title': 'Wood Fire Coconut Hearth', 'cat': 'details', 'caption': 'Glowing embers preparing Key West wild prawns', 'img': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', 'order': 6, 'featured': False},
            {'title': 'Caramelized Florida Mango', 'cat': 'food', 'caption': 'Served with coconut sorbet and wild lime granita', 'img': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80', 'order': 7, 'featured': False},
            {'title': 'Garden Terrace Seating', 'cat': 'dining', 'caption': 'Afternoon dining beneath coconut fronds and ocean breeze', 'img': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80', 'order': 8, 'featured': False},
        ]
        GalleryImage.objects.all().delete()
        for g in gallery_data:
            GalleryImage.objects.create(
                title=g['title'],
                category=g['cat'],
                caption=g['caption'],
                alt_text=g['title'],
                image_url=g['img'],
                display_order=g['order'],
                is_featured=g['featured'],
                is_active=True
            )
        self.stdout.write(self.style.SUCCESS("GalleryImages seeded."))

        # 11. Testimonials (3 reviews)
        testimonials_data = [
            {
                'name': 'Isabella Santos',
                'src': 'Architectural & Landscape Review',
                'review': 'Verdant achieves what few restaurants can: modern tropical architecture that feels completely at one with nature. The banana-leaf grouper and palm fizz are sublime.',
                'rating': 5,
                'date': 'December 2025',
                'order': 1
            },
            {
                'name': 'David K. Lawson',
                'src': 'Epicurean Traveler International',
                'review': 'Sitting on the garden terrace with the scent of night-blooming jasmine and coconut wood smoke is pure magic. Dining of the highest order.',
                'rating': 5,
                'date': 'January 2026',
                'order': 2
            },
            {
                'name': 'Camila Morales',
                'src': 'Contemporary Hospitality Journal',
                'review': 'The hearts of palm salad and wild snapper ceviche demonstrate masterclass technique. A sensory sanctuary in the heart of the tropical corridor.',
                'rating': 5,
                'date': 'February 2026',
                'order': 3
            }
        ]
        Testimonial.objects.all().delete()
        for t in testimonials_data:
            Testimonial.objects.create(
                guest_name=t['name'],
                source=t['src'],
                review_text=t['review'],
                rating=t['rating'],
                review_date=t['date'],
                is_featured=True,
                is_approved=True,
                display_order=t['order']
            )
        self.stdout.write(self.style.SUCCESS("Testimonials seeded."))

        # 12. FAQs (8 questions matching PRD Section 5.14)
        faqs_data = [
            {
                'q': 'Do I need to reserve a table in advance?',
                'a': 'We highly recommend reservations for evening dinner service, especially for terrace and glasshouse seating. Reservations open 30 days in advance on a rolling daily basis.',
                'order': 1
            },
            {
                'q': 'Can I visit without a reservation?',
                'a': 'Yes! Our 32-foot curved teak bar and garden lounge welcome walk-in guests for craft botanical cocktails and our à la carte hearth menu throughout the day.',
                'order': 2
            },
            {
                'q': 'Do you have outdoor seating?',
                'a': 'Yes. More than half of our dining space consists of open-air garden terraces and open-sided teak pavilions sheltered by tropical canopies.',
                'order': 3
            },
            {
                'q': 'Are vegetarian and vegan options available?',
                'a': 'Absolutely. Our menu celebrates botanical diversity with dedicated plant-based offerings including charred hearts of palm, ember maitake, and roasted tropical fruits.',
                'order': 4
            },
            {
                'q': 'Do you accommodate large groups?',
                'a': 'We accommodate group tables up to 10 guests in the Main Pavilion. For larger parties of 12 or more, we recommend our private Canopy Glade.',
                'order': 5
            },
            {
                'q': 'Can I arrange a private event?',
                'a': 'Yes. We offer partial or full buyouts for private botanical weddings, anniversaries, and corporate retreats. Contact concierge@verdant-dining.com for packages.',
                'order': 6
            },
            {
                'q': 'Is parking available at Verdant?',
                'a': 'Complimentary valet parking is available at our North Bamboo Gate. Self-parking is also provided in the shaded Palm Grove lot.',
                'order': 7
            },
            {
                'q': 'What payment methods do you accept?',
                'a': 'We accept all major credit cards, Apple Pay, Google Pay, and contactless payments. We do not accept personal checks.',
                'order': 8
            }
        ]
        FAQ.objects.all().delete()
        for f in faqs_data:
            FAQ.objects.create(
                question=f['q'],
                answer=f['a'],
                display_order=f['order'],
                is_active=True
            )
        self.stdout.write(self.style.SUCCESS("FAQs seeded (8 items)."))

        # 13. Sample Reservations (2 sample bookings)
        Reservation.objects.all().delete()
        Reservation.objects.create(
            full_name="Sofia Alverez",
            email="sofia.alverez@botanical-design.org",
            phone="+1 (305) 555-8291",
            reservation_date=date.today() + timedelta(days=4),
            reservation_time="19:30",
            guest_count=4,
            seating_area="Botanical Glasshouse",
            message="Celebrating an anniversary. Requesting a table with view of the reflection pond.",
            status="confirmed"
        )
        Reservation.objects.create(
            full_name="Liam Gallagher",
            email="liam.g@contemporary-travel.com",
            phone="+1 (415) 555-9012",
            reservation_date=date.today() + timedelta(days=2),
            reservation_time="20:00",
            guest_count=2,
            seating_area="Open-Air Garden Terrace",
            message="Visiting Miami. Excited to experience the coconut husk hearth cooking.",
            status="pending"
        )
        self.stdout.write(self.style.SUCCESS("Sample Reservations seeded."))

        self.stdout.write(self.style.SUCCESS("🌴 Verdant Tropical Seed Process Finished Successfully! 🌴"))
