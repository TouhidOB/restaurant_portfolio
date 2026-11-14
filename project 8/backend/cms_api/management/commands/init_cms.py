from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import SiteConfig, Reservation

INITIAL_URBAN_DATA = {
    "restaurant_name": "URBAN TABLE",
    "theme": {
        "colors": {
            "graphite": "#252729",
            "brick": "#914D37",
            "concrete": "#B7B4AC",
            "offwhite": "#F1EEE7",
            "copper": "#B87345",
            "black": "#111314",
            "steel": "#737A7D",
            "amber": "#E9A24B"
        },
        "typography": {
            "fontDisplay": "Oswald",
            "fontBody": "Manrope",
            "fontEditorial": "DM Serif Display"
        }
    },
    "hero": {
        "restaurant_name": "URBAN TABLE",
        "eyebrow": "AN URBAN DINING EXPERIENCE",
        "title": "BOLD FLAVORS. RAW CHARACTER.",
        "tagline": "Urban Kitchen • Craft Smokehouse • Open Fire",
        "badge_text": "Open Fire & Wood Hearth • 1924 Warehouse",
        "lead_description": "A contemporary dining destination built around open flame, honest ingredients, and the raw energy of an industrial open kitchen.",
        "cta_primary_text": "Explore The Menu",
        "cta_secondary_text": "Discover Our Space",
        "stats": [
            {"number": "1924", "label": "Converted Warehouse"},
            {"number": "850°", "label": "Wood-Fired Hearth"},
            {"number": "45-Day", "label": "Dry-Aged Steaks"},
            {"number": "180", "label": "Warehouse Seats"}
        ]
    },
    "brandStory": {
        "title": "Made With Fire & Craft",
        "subtitle": "Our Story",
        "badge": "Est. 2018 • Industrial District",
        "body_paragraph_1": "Housed inside a preserved 1920s locomotive foundry, URBAN TABLE was born from a refusal of culinary pretension. We stripped away white tablecloths and velvet ropes to expose what matters: raw red brick, heavy black steel, roaring hickory coals, and intensely honest flavors.",
        "body_paragraph_2": "Our culinary philosophy centers on primordial heat. Whether smoking prime brisket for fourteen hours over aged post oak or charring dry-aged ribeyes on our cast-iron open hearth, our kitchen celebrates the elemental alchemy of smoke, fire, and uncompromised produce.",
        "quote": "Good food does not require disguise. It demands fierce heat, seasoned steel, and the patience to let smoke do its work.",
        "quote_author": "Chef Marcus Vance",
        "pillars": [
            {
                "title": "Uncompromised Terroir",
                "desc": "Pasture-raised regional beef, heritage Berkshire pork, and heirloom produce sourced directly from independent growers."
            },
            {
                "title": "Elemental Fire Cooking",
                "desc": "Custom-built 14-foot open wood hearth fueled by kiln-dried white oak, hickory logs, and lump charcoal."
            },
            {
                "title": "Industrial Craft Hospitality",
                "desc": "Vibrant communal energy, craft microbrews on tap, unpretentious service, and an unobstructed view of the kitchen brigade."
            }
        ],
        "image_main": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
        "image_detail": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
    },
    "virtualTour": {
        "title": "Restaurant Virtual Tour",
        "subtitle": "Explore The Five Spaces",
        "description": "Navigate our converted industrial warehouse in full 3D from the street-level entrance to the roaring open kitchen.",
        "viewpoints": [
            {
                "id": "exterior",
                "number": "01",
                "name": "Street-Level Warehouse Exterior",
                "cameraPos": [0, 2.5, 9.5],
                "target": [0, 2.0, 0],
                "description": "Exposed red brick masonry, steel warehouse casement windows, illuminated copper marquee signage, and loading dock entry.",
                "details": ["1920s Restored Brick Facade", "Black Steel Casement Windows", "Copper Neon Marquee"]
            },
            {
                "id": "reception",
                "number": "02",
                "name": "Entrance & Host Station",
                "cameraPos": [-2.2, 2.0, 5.5],
                "target": [-0.5, 1.4, 0],
                "description": "Raw concrete reception desk, reclaimed timber benches, and industrial filament pendant chandeliers.",
                "details": ["Monolithic Poured Concrete Counter", "Reclaimed Factory Beams", "Industrial Filament Lighting"]
            },
            {
                "id": "dining",
                "number": "03",
                "name": "Main Warehouse Dining Hall",
                "cameraPos": [0, 2.2, 5.0],
                "target": [0, 1.6, -1],
                "description": "High-volume open floor plan with black steel I-beams, communal white oak tables, and leather booth banquettes.",
                "details": ["24-Foot Vaulted Ceilings", "Heavy Steel Trusswork", "Aged Leather Banquettes"]
            },
            {
                "id": "kitchen",
                "number": "04",
                "name": "Open Hearth & Smokehouse Kitchen",
                "cameraPos": [2.5, 2.0, 4.5],
                "target": [1.0, 1.5, -0.5],
                "description": "Direct view of the 14-foot open wood fire pit, heavy iron rotisseries, and the bustling chef assembly line.",
                "details": ["Custom Oak Wood Hearth", "Live Fire Iron Rotisserie", "Stainless Chef Line"]
            },
            {
                "id": "bar",
                "number": "05",
                "name": "Copper Bar & High-Top Lounge",
                "cameraPos": [-3.2, 2.0, 4.2],
                "target": [-1.0, 1.5, 0],
                "description": "Heavy hammered copper bar top, 20 craft microbrew tap handles, and backlit industrial spirit shelving.",
                "details": ["Hand-Hammered Copper Bar", "20 Regional Draft Taps", "Craft Whiskey & Mezcal Vault"]
            }
        ]
    },
    "experience": {
        "title": "The Industrial Dining Experience",
        "subtitle": "Raw Architecture Meets Contemporary Culinary Culture",
        "pillars": [
            {
                "step": "01",
                "title": "The Craft",
                "desc": "Every cut is butchered in-house, dry-aged in our glass curing chamber, and smoked low-and-slow over seasoned hardwoods."
            },
            {
                "step": "02",
                "title": "The Atmosphere",
                "desc": "Soaring industrial heights, polished concrete floors, incandescent factory lighting, and an infectious playlist of blues and indie rock."
            },
            {
                "step": "03",
                "title": "The Hospitality",
                "desc": "Energetic, knowledgeable, and genuinely welcoming. We treat every guest like an insider seated at the chef's personal table."
            }
        ]
    },
    "signatureDishes": {
        "title": "Signature Dishes Showcase",
        "subtitle": "Raw Flavor • Open Flame",
        "dishes": [
            {
                "id": "brisket",
                "name": "14-Hour Smoked Prime Texas Brisket",
                "category": "Smokehouse Pit",
                "description": "Black pepper and sea salt coarse bark, juicy mahogany smoke ring, smoked over post oak for fourteen hours. Served with charred jalapeno relish and house pickles.",
                "price": "$38",
                "dietary": "Gluten-Free",
                "pairing": "Hazy Double IPA / Bourbon Old Fashioned",
                "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "ribeye",
                "name": "45-Day Dry-Aged Bone-In Cowboy Ribeye",
                "category": "Wood Hearth",
                "description": "28 oz prime bone-in cut seared over screaming white oak coals, basted with bone marrow herb butter and smoked Maldon flake salt.",
                "price": "$78",
                "dietary": "High Protein",
                "pairing": "Cabernet Sauvignon / Rye Manhattan",
                "image": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "pizza",
                "name": "Wood-Fired Hot Honey & Nduja Artisan Pizza",
                "category": "Brick Oven",
                "description": "72-hour fermented sourdough crust blistered at 850°F, San Marzano sauce, fresh mozzarella, spicy Calabrian nduja, and wildflower hot honey drizzle.",
                "price": "$26",
                "dietary": "Artisan Craft",
                "pairing": "Crisp Italian Pilsner",
                "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "skillet",
                "name": "Cast-Iron Skillet Bourbon Toffee Cookie",
                "category": "Dessert Hearth",
                "description": "Baked to order in hot cast iron, dark chocolate chunks, bourbon smoked sea salt, and a melting scoop of brown butter vanilla ice cream.",
                "price": "$16",
                "dietary": "Vegetarian",
                "pairing": "Smoked Porter / Espresso",
                "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85"
            }
        ]
    },
    "menu": {
        "title": "Full Menu Explorer",
        "subtitle": "Crafted Daily In Our Open Kitchen",
        "categories": [
            {
                "id": "starters",
                "name": "Starters & Small Plates",
                "items": [
                    {"name": "Wood-Roasted Bone Marrow", "price": "$22", "desc": "Grilled sourdough bread, shallot parsley salad, smoked salt, tomato jam.", "dietary": "Signature"},
                    {"name": "Crispy Pork Belly Burnt Ends", "price": "$19", "desc": "Bourbon barbecue glaze, pickled mustard seeds, scallions.", "dietary": "Gluten-Free"},
                    {"name": "Cast-Iron Blistered Shishito Peppers", "price": "$15", "desc": "Smoked sea salt, lime zest, garlic aioli.", "dietary": "Vegan Option"}
                ]
            },
            {
                "id": "burgers",
                "name": "Burgers & Sandwiches",
                "items": [
                    {"name": "The Urban Foundry Smash Burger", "price": "$21", "desc": "Double dry-aged brisket blend patties, smoked cheddar, bacon jam, garlic pickles, toasted brioche bun.", "dietary": "Crowd Favorite"},
                    {"name": "Smoked Pulled Pork Sandwich", "price": "$19", "desc": "Hickory smoked shoulder, tangy Carolina gold vinegar sauce, crispy slaw, potato bun.", "dietary": "Smokehouse"},
                    {"name": "Crispy Buttermilk Hot Chicken", "price": "$20", "desc": "Nashville spiced chicken breast, hot honey, shredded lettuce, remoulade.", "dietary": "Spicy"}
                ]
            },
            {
                "id": "hearth",
                "name": "Wood Hearth & Grills",
                "items": [
                    {"name": "14-Hour Smoked Prime Brisket Platter", "price": "$38", "desc": "Half-pound sliced brisket, house pickles, jalapeno cheddar cornbread, pit beans.", "dietary": "Gluten-Free"},
                    {"name": "St. Louis Cut Smoked Pork Ribs", "price": "$34", "desc": "Full rack dry-rubbed and applewood smoked, chipotle mop sauce.", "dietary": "Gluten-Free"},
                    {"name": "Oak-Roasted Half Amish Chicken", "price": "$29", "desc": "Herb brine, charred lemon, roasted baby potatoes, natural poultry jus.", "dietary": "Farm Fresh"}
                ]
            },
            {
                "id": "sides",
                "name": "Iron Skillet Sides",
                "items": [
                    {"name": "Cast-Iron Truffle Mac & Cheese", "price": "$14", "desc": "Aged white cheddar, gruyere, smoked gouda, toasted panko crust.", "dietary": "Vegetarian"},
                    {"name": "Charred Broccolini With Chili Garlic", "price": "$13", "desc": "Wood-grilled tender broccolini, lemon juice, toasted sesame oil.", "dietary": "Vegan"},
                    {"name": "Duck Fat Wedge Fries", "price": "$12", "desc": "Crispy triple-cooked potato wedges, rosemary salt, smoked paprika aioli.", "dietary": "House Cut"}
                ]
            }
        ]
    },
    "interior": {
        "title": "Interior Architecture & Atmosphere",
        "subtitle": "Converted 1920s Industrial Warehouse",
        "details": [
            {
                "title": "Exposed Red Brick & Concrete",
                "desc": "Original century-old load-bearing brickwork, structural concrete lintels, and factory patina preserved intact."
            },
            {
                "title": "Black Steel I-Beam Framing",
                "desc": "Heavy structural industrial steel trusses, matte-black ducting, and factory-style multi-pane casement windows."
            },
            {
                "title": "Copper Accents & Edison Filament Warmth",
                "desc": "Custom hammered copper counters, brass rivets, and dimmable 2200K amber incandescent pendants."
            }
        ],
        "quote": "We did not conceal the building's industrial bones; we turned the kitchen into its beating heart.",
        "stats": [
            {"value": "1924", "label": "Original Construction"},
            {"value": "6,500 sq ft", "label": "Warehouse Footprint"},
            {"value": "24 ft", "label": "Ceiling Clearance"},
            {"value": "180", "label": "Seating Capacity"}
        ]
    },
    "chef": {
        "name": "Marcus Vance",
        "title": "Executive Chef & Pitmaster",
        "experience": "20+ Years Open-Fire Mastery • Culinary Institute Graduate",
        "bio": "Raised on the smokehouse traditions of the American South and honed in metropolitan wood-fired kitchens from Brooklyn to Austin, Chef Marcus Vance brings an uncompromising reverence for honest meat, prime firewood, and deep culinary technique.",
        "quote": "If you respect the wood, the animal, and the fire, the plate will speak for itself with overwhelming authority.",
        "philosophy_tags": ["Open Fire Cooking", "In-House Whole Animal Butchery", "Oak & Hickory Wood", "Zero Shortcuts"],
        "image": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
    },
    "experiences": {
        "title": "Special Dining Experiences",
        "subtitle": "From Warehouse Feasts To Private Tastings",
        "cards": [
            {
                "id": "loft",
                "title": "The Foundry Private Loft",
                "desc": "Elevated mezzanine dining room overlooking the entire warehouse floor. Dedicated service team and custom family-style feasts.",
                "badge": "Private Dining",
                "capacity": "15 to 40 Guests"
            },
            {
                "id": "chef_counter",
                "title": "The Pitmaster Fire Counter",
                "desc": "An intimate 8-seat front-row counter directly facing the open wood hearth. Multi-course flame tasting menu led by Chef Marcus.",
                "badge": "Front Row Fire",
                "capacity": "Up to 8 Guests"
            },
            {
                "id": "warehouse_takeover",
                "title": "Full Warehouse Buyout",
                "desc": "Complete private access to the main floor, bar lounge, outdoor covered patio, and live smokehouse stations.",
                "badge": "Grand Event",
                "capacity": "Up to 200 Guests"
            }
        ]
    },
    "gallery": {
        "title": "Food, People & Atmosphere Gallery",
        "subtitle": "Raw Visual Moments",
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85",
                "caption": "The main warehouse hall under evening incandescent amber lighting",
                "category": "Interior"
            },
            {
                "url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
                "caption": "14-Hour smoked prime brisket with coarse pepper bark",
                "category": "Food"
            },
            {
                "url": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85",
                "caption": "Dry-aged bone-in cowboy ribeye seared on white oak coals",
                "category": "Kitchen"
            },
            {
                "url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
                "caption": "Wood-fired artisanal pizza fresh from the 850° oven",
                "category": "Food"
            },
            {
                "url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
                "caption": "Craft beers on tap and bespoke smoked cocktails at the copper bar",
                "category": "Bar"
            },
            {
                "url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
                "caption": "Communal industrial tables and heavy steel warehouse framework",
                "category": "Interior"
            }
        ]
    },
    "testimonials": {
        "title": "Guest Reviews & Social Proof",
        "subtitle": "Honest Feedback From Our Community",
        "items": [
            {
                "source": "Eater Urban Guide",
                "quote": "URBAN TABLE captures everything electric about modern dining: roaring open flames, uncompromising smoked meats, and an atmosphere that buzzes with raw city energy.",
                "rating": "Editor's Top Pick 2026",
                "author": "Dining Critic, Eater"
            },
            {
                "source": "Food & Wine Magazine",
                "quote": "Marcus Vance has turned a 1920s locomotive foundry into the city's premier temple of wood-fired craft. The brisket alone commands pilgrimage.",
                "rating": "Best New Smokehouse",
                "author": "Senior Food Editor"
            },
            {
                "source": "Urban Gastronomy Journal",
                "quote": "No pretense, no velvet ropes. Just blistering oak fires, incredible craft beer, and steaks that redefine flavor depth.",
                "rating": "★★★★★ 5-Star Experience",
                "author": "Community Reviewer"
            }
        ]
    },
    "reservation": {
        "title": "Table Reservation",
        "subtitle": "Reserve An Industrial Dining Experience",
        "description": "Due to high demand and prime smokehouse cuts, advance table reservations are strongly encouraged for parties of all sizes.",
        "policy": "Walk-ins are welcomed at our 30-seat copper bar and outdoor patio on a first-come, first-served basis. Reservations held for 15 minutes.",
        "experiences_list": [
            "Main Warehouse Dining Table",
            "Pitmaster Counter (Front Row Fire)",
            "The Foundry Private Loft (Parties 12+)",
            "Bar & High-Top Lounge"
        ],
        "time_slots": ["12:00 PM", "1:30 PM", "5:00 PM", "6:30 PM", "7:30 PM", "8:30 PM", "9:45 PM"]
    },
    "location": {
        "title": "Location, Hours & Map",
        "subtitle": "Heart of the Industrial Arts District",
        "address": "420 Ironworks Avenue, Warehouse District",
        "transit": "Foundry Station (Subway Lines B & D) • Free On-Site Parking Lot",
        "phone": "+1 (555) 789-2044",
        "email": "table@urbankitchen.com",
        "hours": [
            {"days": "Tuesday to Thursday", "hours": "4:00 PM – 11:00 PM"},
            {"days": "Friday & Saturday", "hours": "12:00 PM – Midnight (Late Night Bar)"},
            {"days": "Sunday", "hours": "12:00 PM – 10:00 PM (Sunday Smoke Roast)"},
            {"days": "Monday", "hours": "Closed for Kitchen Cure & Prep"}
        ]
    }
}


class Command(BaseCommand):
    help = "Initializes Project 8 Urban Industrial Kitchen CMS with complete seed data and admin account"

    def handle(self, *args, **options):
        # 1. Create or get admin user
        admin_user, created = User.objects.get_or_create(username='admin')
        if created:
            admin_user.set_password('adminpassword123')
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.email = 'admin@urbankitchen.com'
            admin_user.first_name = 'Urban'
            admin_user.last_name = 'Admin'
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Created admin user: admin / adminpassword123"))
        else:
            admin_user.set_password('adminpassword123')
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Updated existing admin user password to: adminpassword123"))

        # 2. Create or update initial SiteConfig
        config, created = SiteConfig.objects.get_or_create(
            restaurant_name="URBAN TABLE",
            defaults={
                'content_json': INITIAL_URBAN_DATA,
                'is_published': True,
                'updated_by': admin_user
            }
        )

        if not created:
            config.content_json = INITIAL_URBAN_DATA
            config.is_published = True
            config.updated_by = admin_user
            config.save()
            self.stdout.write(self.style.SUCCESS("Updated existing Urban Industrial SiteConfig."))
        else:
            self.stdout.write(self.style.SUCCESS("Created initial Urban Industrial SiteConfig."))

        # 3. Seed Sample Reservations
        if Reservation.objects.count() == 0:
            Reservation.objects.create(
                full_name="Colton Vance",
                phone="+1 (555) 234-5678",
                email="colton@industrialdesign.com",
                date="2026-11-20",
                time="7:30 PM",
                guests="4 Guests",
                occasion="Birthday Celebration",
                status="confirmed",
                special_requests="Requesting a booth near the open kitchen hearth."
            )
            Reservation.objects.create(
                full_name="Elena Rostova",
                phone="+1 (555) 876-5432",
                email="elena@foundryarch.org",
                date="2026-11-21",
                time="8:00 PM",
                guests="2 Guests",
                occasion="Casual Date Night",
                status="pending",
                special_requests="High-top near the copper bar if available."
            )
            Reservation.objects.create(
                full_name="David Sterling",
                phone="+1 (555) 998-1122",
                email="david@ironworks-tech.io",
                date="2026-11-25",
                time="6:30 PM",
                guests="8 Guests",
                occasion="Corporate Team Dinner",
                status="confirmed",
                special_requests="Family style tasting menu with prime brisket."
            )
            self.stdout.write(self.style.SUCCESS("Seeded sample Urban Industrial reservations."))

        self.stdout.write(self.style.SUCCESS("Successfully initialized Project 8 Urban Industrial Kitchen CMS!"))
