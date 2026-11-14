import json
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import SiteConfig, MenuCategory, MenuItem, Reservation


BOTANICAL_INITIAL_CONTENT = {
    "cafe_name": "VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ",
    "tagline": "Where Contemporary Glass Architecture Meets Living Botanical Nature",
    "theme": {
        "colors": {
            "forest_green": "#263F35",
            "botanical_sage": "#A6B5A0",
            "warm_cream": "#F4F0E6",
            "soft_stone": "#D8D2C5",
            "olive_leaf": "#727C52",
            "muted_copper": "#A87958",
            "charcoal": "#292D29",
            "glass_mist": "#E7EDE7",
            "pure_white": "#FFFFFF"
        },
        "typography": {
            "font_display": "Cormorant Garamond",
            "font_body": "Manrope"
        }
    },
    "preloader": {
        "symbol": "🌿",
        "title": "VERDANT ATRIUM",
        "subtitle": "Botanical Glasshouse Sanctuary • Est. 2024"
    },
    "hero": {
        "eyebrow": "ARCHITECTURAL BOTANICAL CAFÉ",
        "title": "Sunlight, Living Flora & Artisanal Coffee.",
        "tagline": "Immerse in a tranquil glasshouse sanctuary designed for unhurried connection and sensory coffee rituals.",
        "description": "Step into a breathtaking pavilion where double-height structural glass, soaring fiddle-leaf figs, and warm natural timber frame the finest micro-lot coffees and botanical culinary creations.",
        "cta_primary": "Explore Menu",
        "cta_secondary": "Virtual Glasshouse Tour",
        "stats": [
            {"number": "140+", "label": "Living Botanical Species"},
            {"number": "100%", "label": "Ethical Single-Origin Beans"},
            {"number": "5", "label": "Architectural Seating Zones"},
            {"number": "18m", "label": "Vaulted Glass Ceiling Height"}
        ]
    },
    "story": {
        "subtitle": "THE GREENHOUSE ETHOS",
        "title": "A Sanctuary Where Architecture Meets Living Nature",
        "badge": "Vaulted Glasshouse Architecture • Biophilic Design",
        "body_1": "Conceived as an antidote to frantic urban density, Verdant Atrium redefines the specialty café experience. Designed around a restored 19th-century glass conservatory aesthetic infused with modern Nordic minimalism, sunlight washes across lush foliage, raw limestone, and oiled oak.",
        "body_2": "Here, time slows down. Every cup of coffee is ground to order, botanical infusions are distilled in-house with herbs from our living walls, and our seasonal brunch plates celebrate local organic terroir.",
        "quote": "A glasshouse is not merely a structure of glass and steel; it is a lens that concentrates natural light, breathes with living plants, and restores human serenity.",
        "quote_author": "Elena Vance, Lead Biophilic Architect",
        "pillars": [
            {
                "title": "Natural Daylight Architecture",
                "desc": "Double-glazed thermal panels diffuse daylight, casting gentle leaf shadows and creating an ever-changing celestial ambiance throughout the day."
            },
            {
                "title": "Living Botanical Microclimate",
                "desc": "Over 140 varieties of tropical palms, rare monsteras, and hanging orchids actively purify the indoor air and moderate interior humidity."
            },
            {
                "title": "Artisanal Terroir Sourcing",
                "desc": "Direct-trade micro-lot coffee beans roasted weekly, cold-pressed botanical tonics, and organic sourdough baked at dawn."
            }
        ],
        "image_main": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85",
        "image_detail": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=85"
    },
    "virtual_tour": {
        "subtitle": "EXPLORE OUR SPACES",
        "title": "Interactive Glasshouse Virtual Exploration",
        "description": "Navigate five distinct architectural zones of Verdant Atrium in full cinematic 3D.",
        "viewpoints": [
            {
                "id": "exterior",
                "number": "01",
                "name": "Exterior Approach & Glass Portal",
                "cameraPos": [0, 2.8, 9.5],
                "target": [0, 1.8, 0],
                "description": "Cathedral-pitch steel and glass framework surrounded by weeping fig trees and welcoming stone water troughs.",
                "details": ["Structural Black Steel Trusses", "Solar-Control Low-E Glass", "Native Fern Pathways"]
            },
            {
                "id": "reception",
                "number": "02",
                "name": "Botanical Brew Bar & Reception",
                "cameraPos": [-3.5, 2.0, 5.5],
                "target": [-0.6, 1.5, 0],
                "description": "Fluted travertine stone coffee bar with bespoke copper espresso machines, botanical brew drippers, and pastry cloches.",
                "details": ["Honed Travertine Countertop", "Custom Synesso Espresso Setup", "Living Herb Apothecary"]
            },
            {
                "id": "atrium",
                "number": "03",
                "name": "Central Palm Atrium Dining",
                "cameraPos": [0, 2.2, 5.0],
                "target": [0, 1.4, -1.0],
                "description": "Expansive communal seating beneath 12-meter royal palms, natural daylight skylights, and custom oak banquettes.",
                "details": ["Mature Tropical Royal Palms", "White Oak Communal Tables", "Linen Cushioned Banquettes"]
            },
            {
                "id": "mezzanine",
                "number": "04",
                "name": "The Orangerie Mezzanine",
                "cameraPos": [3.2, 2.4, 4.5],
                "target": [0.8, 1.4, -0.5],
                "description": "Elevated quiet nook overlooking the entire glasshouse canopy, ideal for focused reading and private conversations.",
                "details": ["Canopy Tree-Level Perspective", "Acoustic Cork Wall Inlays", "Seats up to 18 Guests"]
            },
            {
                "id": "terrace",
                "number": "05",
                "name": "Sunlit Garden Terrace",
                "cameraPos": [-3.2, 2.0, 3.8],
                "target": [-1.0, 1.4, 0],
                "description": "Seamless transition to our outdoor botanical patio framed by fragrant jasmine vines, olive trees, and stone fire bowls.",
                "details": ["Open-Air Courtyard Flow", "Olive Trees in Terracotta Urns", "Heated Limestone Paving"]
            }
        ]
    },
    "atmosphere": {
        "subtitle": "LIGHT, SHADOW & FOLIAGE",
        "title": "The Botanical Daylight Experience",
        "description": "How natural solar cycles, thermal glass, and biophilic acoustics shape your café ritual.",
        "features": [
            {
                "number": "01",
                "title": "Dynamic Solar Illumination",
                "desc": "Morning golden beams illuminate steam rising from pour-overs; afternoon sun filters gently through translucent ceiling sails."
            },
            {
                "number": "02",
                "title": "Acoustic Living Walls",
                "desc": "Dense vertical wall plantings of ferns, moss, and ivy naturally absorb reverberation, keeping conversation soft and intimate."
            },
            {
                "number": "03",
                "title": "Natural Aeration & Oxygenation",
                "desc": "Automated ridge vents draw fresh outside breezes upward through the canopy, filling the café with oxygen-rich fresh air."
            }
        ]
    },
    "signature_drinks": {
        "subtitle": "BOTANICAL CRAFT",
        "title": "Signature Beverages & Coffee Creations",
        "drinks": [
            {
                "id": "elderflower_tonic_espresso",
                "name": "Elderflower Tonic Espresso",
                "category": "Cold Brew & Infusions",
                "price": "$7.50",
                "badge": "Signature Ritual",
                "description": "Chilled double-shot Ethiopian Yirgacheffe poured over artisanal elderflower tonic, botanical citrus ice sphere, and fresh rosemary sprig.",
                "ingredients": ["Ethiopian Yirgacheffe", "Hand-Distilled Elderflower", "Sparkling Quinine", "Garden Rosemary"],
                "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "lavender_smoked_latte",
                "name": "Wild Lavender Honey Latte",
                "category": "Specialty Coffee",
                "price": "$6.75",
                "badge": "Guest Favorite",
                "description": "Velvety steamed oat milk, rich Colombian Huila espresso, organic Provence lavender essence, and raw wildflower honey.",
                "ingredients": ["Colombian Huila Espresso", "Organic Oat Milk", "Provence Lavender", "Raw Wildflower Honey"],
                "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "ceremonial_matcha_rose",
                "name": "Ceremonial Uji Matcha Rose",
                "category": "Artisanal Teas",
                "price": "$7.00",
                "badge": "Antioxidant Craft",
                "description": "First-harvest stone-ground Uji matcha whisked with warm almond milk, organic Damask rose hydrosol, and edible rose petals.",
                "ingredients": ["Uji Kyoto Matcha", "Silk Almond Milk", "Damask Rose Hydrosol", "Dried Organic Petals"],
                "image": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "fig_cardamom_cold_brew",
                "name": "Sun-Dried Fig & Cardamom Cold Brew",
                "category": "Cold Brew & Infusions",
                "price": "$7.25",
                "badge": "Slow Macerated",
                "description": "24-hour slow cold steep infused with dried Smyrna figs, green cardamom pods, and a float of vanilla coconut cream.",
                "ingredients": ["Single-Origin Kenyan Coffee", "Smyrna Fig Maceration", "Green Cardamom", "Vanilla Coconut Cream"],
                "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85"
            }
        ]
    },
    "menu_explorer": {
        "subtitle": "CURATED CAFÉ MENU",
        "title": "Seasonal Botanical Offerings",
        "description": "All dairy is locally sourced or house-made organic plant milks. Pastries baked fresh daily at dawn."
    },
    "architecture": {
        "subtitle": "DESIGN & SUSTAINABILITY",
        "title": "The Architecture of the Glass Conservatory",
        "quote": "We wanted to craft a temple of light where every steel truss and potted ficus tree speaks to harmony between mankind and nature.",
        "quote_author": "Marcus Sterling, Structural Glasshouse Engineer",
        "features": [
            {
                "title": "High-Efficiency Solar Glazing",
                "desc": "Double-layered thermally isolated glass units maximize visible daylight while maintaining comfortable year-round temperature."
            },
            {
                "title": "Reclaimed European Oak Timber",
                "desc": "Salvaged century-old oak beams repurposed into hand-planed tables, coffee counters, and ceiling rafters."
            },
            {
                "title": "Rainwater Harvesting Cistern",
                "desc": "Runoff from our 800m² glass roof is naturally filtered into underground storage to hydrate all café plants without municipal water."
            },
            {
                "title": "Low-Carbon Travertine Stone",
                "desc": "Locally quarried honed stone flooring that absorbs solar warmth during the day and gently radiates it in the evening."
            }
        ],
        "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85"
    },
    "barista": {
        "name": "Julian Moore & Chef Saffron Lin",
        "title": "Head of Coffee & Botanical Culinary Director",
        "bio": "Julian brings a decade of specialty coffee competition mastery, focusing on single-origin extraction and water mineral chemistry. Chef Saffron marries foraging traditions with contemporary greenhouse brunch, utilizing microgreens and botanicals harvested right from our atrium walls.",
        "quote": "When you extract a light-roasted Gesha beneath a canopy of sunlit monstera leaves, the experience transcends taste—it becomes restorative.",
        "accolades": [
            "National Cup Tasters Champion Finalist (2023)",
            "Sustainable Café Architecture Recognition",
            "Farm-to-Glass Beverage Innovation Award"
        ],
        "image": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
    },
    "seasonal_experiences": {
        "subtitle": "CURATED WORKSHOPS & EVENINGS",
        "title": "Signature Botanical Experiences",
        "experiences": [
            {
                "title": "Botanical Coffee Sensory Tasting",
                "time": "Every Saturday • 10:30 AM",
                "desc": "A guided 90-minute flight of four rare micro-lots paired with botanical flavor extracts and terroir storytelling.",
                "price": "$45 per guest"
            },
            {
                "title": "Glasshouse Terrarium Workshop",
                "time": "Bi-Weekly Sunday • 3:00 PM",
                "desc": "Build your own enclosed tropical miniature ecosystem guided by our head horticulturist, accompanied by matcha and pastries.",
                "price": "$65 per guest"
            },
            {
                "title": "Twilight Glasshouse Jazz Soirée",
                "time": "Thursday Evenings • 7:30 PM",
                "desc": "Live acoustic jazz guitar and upright bass as the sun sets through the glass roof, featuring botanical mocktails and light bites.",
                "price": "$35 per guest"
            },
            {
                "title": "Private Orangerie Salon Buyout",
                "time": "By Prior Reservation",
                "desc": "Exclusive hire of our elevated mezzanine garden for intimate celebrations, editorial shoots, or corporate retreats.",
                "price": "Custom Inquiry"
            }
        ]
    },
    "gallery": {
        "subtitle": "VISUAL CHRONICLES",
        "title": "Light, Foliage & Atmosphere",
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=85",
                "title": "Sunlit Glasshouse Atrium Seating",
                "category": "Architecture"
            },
            {
                "url": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=85",
                "title": "Handcrafted Cold Brew Extraction",
                "category": "Coffee"
            },
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85",
                "title": "Artisanal Lavender Honey Latte",
                "category": "Coffee"
            },
            {
                "url": "https://images.unsplash.com/photo-1445116572660-238413b477be?auto=format&fit=crop&w=1000&q=85",
                "title": "Greenhouse Wall Botanicals & Ferns",
                "category": "Botanicals"
            },
            {
                "url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
                "title": "Avocado & Wild Herb Tartine",
                "category": "Food"
            },
            {
                "url": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=85",
                "title": "Fresh Pistachio Cardamom Brioche",
                "category": "Food"
            }
        ]
    },
    "testimonials": {
        "subtitle": "GUEST REFLECTIONS",
        "title": "Words From Our Community",
        "reviews": [
            {
                "quote": "Sitting beneath the palm canopy with their Elderflower Tonic Espresso is like stepping into another world. The architecture alone is worth the visit.",
                "author": "Dr. Sarah Thornton",
                "role": "Architectural Columnist & Patron",
                "rating": 5
            },
            {
                "quote": "The light quality in the morning is extraordinary. The coffee is dialed in with laboratory precision, yet the vibe is effortlessly calm and welcoming.",
                "author": "Liam Vance",
                "role": "Specialty Coffee Enthusiast",
                "rating": 5
            },
            {
                "quote": "Our private brunch in the Orangerie Mezzanine exceeded all expectations. The living acoustic walls make conversation remarkably peaceful.",
                "author": "Claire & Matthew Evans",
                "role": "Private Event Hosts",
                "rating": 5
            }
        ]
    },
    "reservation": {
        "subtitle": "VISIT & TABLE INQUIRIES",
        "title": "Reserve a Table in the Glasshouse",
        "description": "Walk-ins are warmly welcomed for coffee and pastries. Table reservations are recommended for weekend brunch and parties of 4 or more.",
        "policy": "Reservations held for 15 minutes. Please notify us of severe botanical or dietary allergies.",
        "times": ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"],
        "seating_options": [
            {"value": "atrium", "label": "Greenhouse Palm Atrium"},
            {"value": "terrace", "label": "Sunlit Garden Terrace"},
            {"value": "mezzanine", "label": "Orangerie Mezzanine Nook"},
            {"value": "bar", "label": "Botanical Brew Counter"},
            {"value": "any", "label": "Best Available Sunlit Table"}
        ]
    },
    "location": {
        "subtitle": "FIND OUR SANCTUARY",
        "title": "Hours, Location & Transportation",
        "address": "42 Conservatory Lane, Botanical Arts District, CA 94107",
        "phone": "+1 (415) 890-4321",
        "email": "hello@verdantatrium.com",
        "hours": "Monday – Sunday: 7:30 AM – 8:00 PM (Kitchen closes at 6:30 PM)",
        "coordinates": "37.7749° N, 122.4194° W • Botanical Arts District",
        "arrival_notes": "Complimentary bicycle parking and EV charging stations available beside the glasshouse entrance."
    },
    "footer": {
        "copyright": "© 2026 VERDANT ATRIUM BOTANICAL GLASSHOUSE CAFÉ. All rights reserved.",
        "social": {
            "instagram": "https://instagram.com",
            "facebook": "https://facebook.com",
            "pinterest": "https://pinterest.com"
        }
    }
}


class Command(BaseCommand):
    help = "Seed database with Botanical Glasshouse Café initial data and admin user"

    def handle(self, *args, **options):
        # 1. Admin Superuser
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@verdantatrium.com", "adminpassword123")
            self.stdout.write(self.style.SUCCESS("Created admin user: admin / adminpassword123"))
        else:
            self.stdout.write(self.style.WARNING("Admin user already exists"))

        # 2. SiteConfig
        config, created = SiteConfig.objects.get_or_create(
            id=1,
            defaults={
                "cafe_name": BOTANICAL_INITIAL_CONTENT["cafe_name"],
                "content_json": BOTANICAL_INITIAL_CONTENT
            }
        )
        if not created:
            config.cafe_name = BOTANICAL_INITIAL_CONTENT["cafe_name"]
            config.content_json = BOTANICAL_INITIAL_CONTENT
            config.save()
            self.stdout.write(self.style.SUCCESS("Updated existing SiteConfig with Botanical Glasshouse content"))
        else:
            self.stdout.write(self.style.SUCCESS("Created SiteConfig with Botanical Glasshouse content"))

        # 3. Menu Categories
        categories_data = [
            {
                "name": "Specialty Coffee & Espresso",
                "slug": "specialty-coffee",
                "description": "Direct-trade single-origin espresso and calibrated milk beverages.",
                "sort_order": 1
            },
            {
                "name": "Cold Brew & Botanical Infusions",
                "slug": "cold-brew-infusions",
                "description": "Slow cold extractions infused with fresh herbs and botanical tonics.",
                "sort_order": 2
            },
            {
                "name": "Artisanal Matcha & Herbal Teas",
                "slug": "matcha-herbal-teas",
                "description": "Ceremonial Japanese matcha and loose-leaf herbal tisanes.",
                "sort_order": 3
            },
            {
                "name": "Greenhouse Brunch & Savory",
                "slug": "greenhouse-brunch",
                "description": "Nutrient-dense savory plates featuring local microgreens and organic sourdough.",
                "sort_order": 4
            },
            {
                "name": "Fresh Botanical Pastries",
                "slug": "botanical-pastries",
                "description": "House-baked Viennoiserie scented with edible flowers, citrus, and cardamom.",
                "sort_order": 5
            }
        ]

        cat_instances = {}
        for cdata in categories_data:
            cat, _ = MenuCategory.objects.update_or_create(
                slug=cdata["slug"],
                defaults={
                    "name": cdata["name"],
                    "description": cdata["description"],
                    "sort_order": cdata["sort_order"],
                    "is_active": True
                }
            )
            cat_instances[cdata["slug"]] = cat

        self.stdout.write(self.style.SUCCESS("Created/Updated 5 Botanical Menu Categories"))

        # 4. Menu Items
        items_data = [
            # Specialty Coffee
            {
                "category": cat_instances["specialty-coffee"],
                "name": "Wild Lavender Honey Latte",
                "description": "Espresso extracted from Colombian Huila micro-lot, silky steamed oat milk, French culinary lavender, and raw wildflower honey.",
                "price": 6.75,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Infused with organic Provence lavender & orange blossom zest",
                "dietary_tags": ["Vegetarian", "Dairy-Free Option", "Single-Origin"],
                "temperature": "Hot or Iced",
                "is_signature": True,
                "sort_order": 1
            },
            {
                "category": cat_instances["specialty-coffee"],
                "name": "Nordic Geisha Hand Pour-Over",
                "description": "Panama Hacienda La Esmeralda Geisha brewed on Kalita Wave. Delicate jasmine aroma, bergamot, and peach notes.",
                "price": 9.50,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Jasmine floral aromatics & white peach sweetness",
                "dietary_tags": ["Vegan", "Organic", "Micro-Lot"],
                "temperature": "Hot Only",
                "is_signature": True,
                "sort_order": 2
            },
            {
                "category": cat_instances["specialty-coffee"],
                "name": "Cardamom Cortado",
                "description": "Equal parts double espresso and textured whole milk infused with freshly crushed green cardamom pods.",
                "price": 5.25,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Warm Kerala green cardamom essence",
                "dietary_tags": ["Vegetarian"],
                "temperature": "Hot Only",
                "is_signature": False,
                "sort_order": 3
            },
            # Cold Brew & Infusions
            {
                "category": cat_instances["cold-brew-infusions"],
                "name": "Elderflower Tonic Espresso",
                "description": "Cold extraction of Ethiopian Yirgacheffe poured over sparkling botanical elderflower tonic with fresh rosemary and citrus zest.",
                "price": 7.50,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Living rosemary sprig & wild elderflower tonic",
                "dietary_tags": ["Vegan", "Gluten-Free"],
                "temperature": "Iced Only",
                "is_signature": True,
                "sort_order": 4
            },
            {
                "category": cat_instances["cold-brew-infusions"],
                "name": "Sun-Dried Fig & Cardamom Cold Brew",
                "description": "24-hour steeped Kenyan coffee macerated with sweet Smyrna figs, hints of clove, and coconut cream float.",
                "price": 7.25,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Macerated Smyrna fig & green cardamom finish",
                "dietary_tags": ["Vegan", "Dairy-Free"],
                "temperature": "Iced Only",
                "is_signature": False,
                "sort_order": 5
            },
            # Matcha & Herbal
            {
                "category": cat_instances["matcha-herbal-teas"],
                "name": "Ceremonial Uji Matcha Rose",
                "description": "First-harvest ceremonial grade Uji matcha whisked with warm almond milk, organic Damask rose hydrosol, and dried petals.",
                "price": 7.00,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Damask rose hydrosol & edible organic flower petals",
                "dietary_tags": ["Vegan", "Organic"],
                "temperature": "Hot or Iced",
                "is_signature": True,
                "sort_order": 6
            },
            # Greenhouse Brunch
            {
                "category": cat_instances["greenhouse-brunch"],
                "name": "Avocado & Atrium Herb Tartine",
                "description": "Seeded artisan sourdough toast, smashed Haas avocado, shaved heirloom radish, lemon oil, and living wall microgreens.",
                "price": 14.50,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Micro-basil & radish sprouts harvested from atrium wall",
                "dietary_tags": ["Vegan", "Organic"],
                "temperature": "Fresh",
                "is_signature": True,
                "sort_order": 7
            },
            {
                "category": cat_instances["greenhouse-brunch"],
                "name": "Wild Mushroom & Truffle Brioche",
                "description": "Roasted chanterelles and king oyster mushrooms with garlic thyme butter on grilled brioche with poached pasture-raised egg.",
                "price": 16.75,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Fresh winter garden thyme & white truffle essence",
                "dietary_tags": ["Vegetarian"],
                "temperature": "Warm",
                "is_signature": False,
                "sort_order": 8
            },
            # Fresh Botanical Pastries
            {
                "category": cat_instances["botanical-pastries"],
                "name": "Pistachio Rose Morning Bun",
                "description": "Flaky laminated croissant dough twisted with bronte pistachio cream and scented with orange blossom water.",
                "price": 5.75,
                "currency": "$",
                "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85",
                "botanical_notes": "Orange blossom water & crushed Iranian pistachios",
                "dietary_tags": ["Vegetarian"],
                "temperature": "Fresh Baked",
                "is_signature": True,
                "sort_order": 9
            }
        ]

        for idata in items_data:
            MenuItem.objects.update_or_create(
                name=idata["name"],
                defaults=idata
            )

        self.stdout.write(self.style.SUCCESS("Created/Updated 9 Artisanal Botanical Menu Items"))

        # 5. Sample Reservations
        sample_res = [
            {
                "full_name": "Audrey Hepburn-Bell",
                "phone": "+1 (415) 321-7890",
                "email": "audrey@greenarchitecture.org",
                "reservation_date": "2026-11-20",
                "reservation_time": "10:30 AM",
                "guests": 3,
                "seating_zone": "Greenhouse Atrium",
                "occasion": "Architectural Discussion & Brunch",
                "special_requests": "Prefer a table next to the central palm trees.",
                "status": "confirmed"
            },
            {
                "full_name": "Marcus Vance",
                "phone": "+1 (415) 555-0192",
                "email": "marcus.v@biophilicdesign.com",
                "reservation_date": "2026-11-22",
                "reservation_time": "3:00 PM",
                "guests": 2,
                "seating_zone": "Orangerie Mezzanine",
                "occasion": "Coffee Cupping & Reading",
                "special_requests": "Window table overlooking the glass roof.",
                "status": "pending"
            }
        ]

        for rdata in sample_res:
            Reservation.objects.update_or_create(
                email=rdata["email"],
                reservation_date=rdata["reservation_date"],
                defaults=rdata
            )

        self.stdout.write(self.style.SUCCESS("Created sample reservation inquiries"))
        self.stdout.write(self.style.SUCCESS("Botanical Glasshouse Café CMS Initialization Completed!"))
