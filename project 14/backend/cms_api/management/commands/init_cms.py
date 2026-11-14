import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial, Reservation
)

class Command(BaseCommand):
    help = "Initializes Dark Luxury Steakhouse CMS data and superuser"

    def handle(self, *args, **options):
        self.stdout.write("Initializing Dark Luxury Steakhouse CMS...")

        # 1. Admin Superuser
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "concierge@charredandprime.com", "adminpassword123")
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created (adminpassword123)."))
        else:
            self.stdout.write("Superuser 'admin' already exists.")

        # 2. SiteConfig
        site_content = {
            "site": {
                "name": "CHARRED & PRIME",
                "tagline": "The Art of the Steakhouse",
                "phone": "+1 (212) 840-7832",
                "email": "concierge@charredandprime.com",
                "address": "482 Lexington Avenue, Manhattan, NY 10017",
                "hours": "Tuesday – Sunday: 5:00 PM – 11:30 PM (Grill till 11:00 PM)",
                "currency": "$",
            },
            "theme": {
                "colors": {
                    "obsidian": "#101010",
                    "charcoal": "#1C1B19",
                    "graphite": "#292724",
                    "ivory": "#EDE5D8",
                    "bronze": "#94734F",
                    "champagne": "#C4A878",
                    "walnut": "#49362B",
                    "burgundy": "#542D32",
                    "taupe": "#A59A8C",
                    "amber": "#D89A4B"
                },
                "typography": {
                    "fontDisplay": "Cormorant Garamond",
                    "fontHeading": "DM Sans",
                    "fontBody": "Manrope"
                }
            },
            "hero": {
                "eyebrow": "A REFINED CONTEMPORARY STEAKHOUSE",
                "title": "THE ART OF THE STEAKHOUSE.",
                "description": "An intimate dining destination where exceptional prime beef, custom wood-fired embers, sculptural dark architecture, and refined hospitality converge.",
                "primaryCta": "EXPLORE THE MENU",
                "secondaryCta": "DISCOVER OUR SPACE",
                "locationLabel": "MANHATTAN, NEW YORK"
            },
            "brand_story": {
                "eyebrow": "A TRADITION OF EXCEPTIONAL DINING",
                "heading": "BEYOND THE ORDINARY DINING EXPERIENCE.",
                "main_text": "Charred & Prime was conceived as an architectural sanctuary for carnivorous connoisseurs. Combining bespoke 45-day Himalayan salt dry-aging with custom white-oak Argentine parrillaworks, we celebrate the purity of heritage cattle and prime cuts in an environment of quiet, commanding luxury.",
                "secondary_text": "Every element—from hand-chiseled basalt stone counters and smoked fluted glass partitions to custom hand-forged steak knives—has been meticulously curated to elevate steak dining into a multisensory ceremony.",
                "quote": "In fine beef, perfection is not an accident of flame; it is the patient intersection of heritage breeding, bespoke dry-aging, and exact thermal mastery.",
                "featured_image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
            },
            "culinary_philosophy": {
                "eyebrow": "UNCOMPROMISING PURSUIT OF QUALITY",
                "heading": "CULINARY CRAFT & PROVENANCE",
                "description": "True luxury requires radical transparency and devotion to technique. We work exclusively with family-owned ranches, artisanal fisheries, and heritage growers.",
                "pillars": [
                    {
                        "number": "01",
                        "title": "Heritage Sourcing",
                        "description": "100% USDA Prime Black Angus from single-source Nebraska pasturelands alongside certified A5 Miyazaki Wagyu directly imported from Japan.",
                        "image": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        "number": "02",
                        "title": "Sub-Zero Salt Dry-Aging",
                        "description": "Our in-house Himalayan salt-brick vault ages primal loins for 35 to 65 days under precision microclimates, concentrating natural umami and achieving velvet tenderness.",
                        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                    },
                    {
                        "number": "03",
                        "title": "The Dual-Flame Hearth",
                        "description": "Seared over kiln-dried post oak and embers reaching 1,200°F on dual Argentine cast-iron wheels to achieve an immaculate caramel crust and buttery pink center.",
                        "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                    }
                ]
            },
            "open_fire_kitchen": {
                "eyebrow": "THE SACRED FLAME",
                "heading": "CRAFTED OVER FIRE. SERVED WITH PURPOSE.",
                "description": "Our open hearth is the beating heart of the dining room. Live embers, wood smoke aromas, and the hypnotic sizzle of cast iron form an elemental backdrop to an evening of culinary drama.",
                "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
            },
            "reservation": {
                "eyebrow": "TABLE RESERVATION & INQUIRY",
                "heading": "RESERVE YOUR EVENING",
                "description": "We welcome table reservations up to 30 days in advance. For parties of six or more, or private dining salons, our sommelier concierge will coordinate tailored wine pairings and tasting menus.",
                "policy_note": "A submitted reservation inquiry is promptly reviewed by our dining concierge and confirmed via SMS and email."
            },
            "location": {
                "eyebrow": "MANHATTAN MIDTOWN EAST",
                "heading": "LOCATION & HOURS",
                "address": "482 Lexington Avenue, Manhattan, NY 10017",
                "phone": "+1 (212) 840-7832",
                "email": "concierge@charredandprime.com",
                "hours": "Tuesday – Sunday: 5:00 PM – 11:30 PM",
                "transit_note": "Subway: 4, 5, 6, 7, S at Grand Central Terminal (3 minute walk). Valet parking available on Lexington Ave."
            },
            "footer": {
                "tagline": "CHARRED & PRIME | NEW YORK",
                "description": "An architectural sanctuary celebrating heritage dry-aged beef, open-fire cooking, and fine hospitality.",
                "copyright": "© 2026 Charred & Prime Steakhouse. All rights reserved."
            }
        }

        config, created = SiteConfig.objects.get_or_create(id=1)
        config.restaurant_name = "CHARRED & PRIME"
        config.content_json = site_content
        config.is_published = True
        config.save()
        self.stdout.write(self.style.SUCCESS("SiteConfig verified and populated."))

        # 3. Menu Categories
        categories_data = [
            {"name": "Steaks & Signature Cuts", "slug": "steaks", "description": "USDA Prime, Wagyu, and custom Himalayan dry-aged cuts seared over open hardwood fire.", "order": 1},
            {"name": "Starters & Caviar", "slug": "starters", "description": "Chilled seafood towers, hand-cut tartare, and artisanal hearth-roasted starters.", "order": 2},
            {"name": "Seafood & Shellfish", "slug": "seafood", "description": "Wild-caught cold water lobsters, King Crab, and pan-roasted Dover sole.", "order": 3},
            {"name": "Artisan Sides", "slug": "sides", "description": "Decadent potatoes, charred seasonal vegetables, and truffle accompaniments.", "order": 4},
            {"name": "Decadent Desserts", "slug": "desserts", "description": "Warm dark chocolate soufflés, smoked vanilla bean gelato, and cheese selections.", "order": 5},
            {"name": "Rare Vintages & Cocktails", "slug": "beverages", "description": "Curated cellar selections and bespoke prohibition-style barrel-aged cocktails.", "order": 6},
        ]

        cat_objs = {}
        for cdata in categories_data:
            cat, _ = MenuCategory.objects.get_or_create(
                slug=cdata["slug"],
                defaults={"name": cdata["name"], "description": cdata["description"], "sort_order": cdata["order"], "is_active": True}
            )
            cat_objs[cdata["slug"]] = cat

        # 4. Menu Items
        dishes = [
            # Signature Steaks (Featured in S06)
            {
                "category": "steaks",
                "name": "Dry-Aged Bone-In Ribeye",
                "slug": "dry-aged-bone-in-ribeye",
                "price": 115.00,
                "cut_type": "45-Day Himalayan Salt Dry-Aged USDA Prime",
                "serving_size": "24 oz / 680g | Serves 1–2",
                "short_description": "Supreme marbling, intense nutty hazelnut notes, charred over kiln-dried white oak.",
                "description": "Our hallmark cut. Sourced from single-family Nebraska pastures, dry-aged for 45 days in our salt-brick cellar, and seared over 1,200°F live embers. Served with smoked bone marrow butter and Maldon sea salt.",
                "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Gluten-Free", "High Protein", "Signature"],
                "is_featured": True,
                "sort_order": 1
            },
            {
                "category": "steaks",
                "name": "Prime Filet Mignon",
                "slug": "prime-filet-mignon",
                "price": 78.00,
                "cut_type": "Center-Cut Barrel Tenderloin",
                "serving_size": "10 oz / 285g",
                "short_description": "Silky, fork-tender texture with herb-basted brown butter and red wine reduction.",
                "description": "The pinnacle of tenderness. Wet-aged for 28 days, finished with thyme-infused grass-fed butter, and accompanied by roasted shallot confit and black truffle jus.",
                "image_url": "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Gluten-Free", "Chef's Cut"],
                "is_featured": True,
                "sort_order": 2
            },
            {
                "category": "steaks",
                "name": "Wagyu New York Strip",
                "slug": "wagyu-new-york-strip",
                "price": 98.00,
                "cut_type": "Snake River Farms American Wagyu (Gold Grade)",
                "serving_size": "16 oz / 450g",
                "short_description": "Bold, robust beef flavor balanced by luxurious Wagyu melt-in-the-mouth tenderness.",
                "description": "An exceptional hybrid of Japanese Wagyu genetics and American grain feeding. Seared to a deep caramelized mahogany crust with smoked beef tallow drizzle.",
                "image_url": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Gluten-Free", "Gold Grade"],
                "is_featured": True,
                "sort_order": 3
            },
            {
                "category": "steaks",
                "name": "The Long-Bone Tomahawk",
                "slug": "the-long-bone-tomahawk",
                "price": 195.00,
                "cut_type": "Heritage Black Angus Tomahawk Ribeye",
                "serving_size": "42 oz / 1.2kg | Serves 2–3",
                "short_description": "Showstopping tableside presentation, carved on roasted rosemary and garlic embers.",
                "description": "The definitive steakhouse spectacle. A full 42 ounces of bone-in prime ribeye seared over embers and carved tableside. Served with three house sauces: Béarnaise, Chimichurri, and Peppercorn Cognac.",
                "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Signature Tableside", "Shareable"],
                "is_featured": True,
                "sort_order": 4
            },
            {
                "category": "steaks",
                "name": "A5 Miyazaki Wagyu Striploin",
                "slug": "a5-miyazaki-wagyu",
                "price": 165.00,
                "cut_type": "100% Fullblood Japanese Black Cattle",
                "serving_size": "6 oz / 170g",
                "short_description": "BMS 11 marbling, flashes of white lace fat that melts at human body temperature.",
                "description": "Directly imported from Miyazaki Prefecture with official certificate of authenticity. Flash-seared on binchotan charcoal and served with fresh wasabi root and smoked shoyu.",
                "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Certified A5", "Ultra Rare"],
                "is_featured": False,
                "sort_order": 5
            },
            # Starters
            {
                "category": "starters",
                "name": "Wood-Fired Oysters Rockefeller",
                "slug": "oysters-rockefeller",
                "price": 28.00,
                "cut_type": "Kushi Bay Oysters (6 pieces)",
                "serving_size": "Half Dozen",
                "short_description": "Spinach cream, Pernod anise liqueur, parmesan sourdough breadcrumbs, smoked paprika.",
                "description": "Fresh cold-water oysters roasted over live oak coals until bubbling and kissed with hardwood smoke.",
                "image_url": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Seafood"],
                "is_featured": False,
                "sort_order": 6
            },
            {
                "category": "starters",
                "name": "Prime Beef Tartare & Bone Marrow",
                "slug": "prime-beef-tartare",
                "price": 34.00,
                "cut_type": "Hand-Cut Tenderloin",
                "serving_size": "Appetizer",
                "short_description": "Cured egg yolk, caperberries, French shallots, roasted canoe-cut bone marrow, toasted brioche.",
                "description": "Hand-diced prime tenderloin seasoned with Dijon emulsion, accompanied by hot roasted marrow to spread over charred sourdough.",
                "image_url": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["House Classic"],
                "is_featured": False,
                "sort_order": 7
            },
            # Seafood
            {
                "category": "seafood",
                "name": "Charred Maine Lobster Tail",
                "slug": "charred-maine-lobster-tail",
                "price": 64.00,
                "cut_type": "Cold Water Maine Lobster (12 oz)",
                "serving_size": "Single Entrée / Pairing",
                "short_description": "Split and grilled over fruitwood embers, brushed with tarragon-garlic butter.",
                "description": "Sweet, succulent lobster meat caramelized over fire, served with charred Meyer lemon and drawn clarified butter.",
                "image_url": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Gluten-Free", "Seafood"],
                "is_featured": False,
                "sort_order": 8
            },
            # Sides
            {
                "category": "sides",
                "name": "Black Truffle Potato Mousseline",
                "slug": "truffle-potato-mousseline",
                "price": 18.00,
                "cut_type": "Yukon Gold & French Butter",
                "serving_size": "Serves 2",
                "short_description": "Whipped to velvet smoothness with cultured Normandy butter and shaved Périgord truffles.",
                "description": "Rich, luxurious mashed potatoes enriched with cream, butter, and generous shavings of fresh black truffle.",
                "image_url": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Vegetarian"],
                "is_featured": False,
                "sort_order": 9
            },
            {
                "category": "sides",
                "name": "Charred Broccolini & Calabrian Chili",
                "slug": "charred-broccolini",
                "price": 16.00,
                "cut_type": "Organic Broccolini",
                "serving_size": "Serves 2",
                "short_description": "Blistered over high flame, finished with lemon zest, aged Pecorino Romano, and toasted garlic.",
                "description": "Tender crisp stalks tossed in warm chili oil, shaved salty cheese, and roasted pine nuts.",
                "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Vegetarian", "Gluten-Free"],
                "is_featured": False,
                "sort_order": 10
            },
            # Desserts
            {
                "category": "desserts",
                "name": "Valrhona Molten Lava Soufflé",
                "slug": "valrhona-molten-souffle",
                "price": 20.00,
                "cut_type": "70% Guanaja Dark Chocolate",
                "serving_size": "Individual",
                "short_description": "Liquid dark chocolate core, Tahitian smoked bourbon vanilla gelato, cocoa nib tuile.",
                "description": "Baked to order with an airy rise and warm cascading chocolate center. A decadent finale to a steakhouse feast.",
                "image_url": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Vegetarian"],
                "is_featured": False,
                "sort_order": 11
            },
            # Beverages
            {
                "category": "beverages",
                "name": "The Charred & Smoked Old Fashioned",
                "slug": "smoked-old-fashioned",
                "price": 24.00,
                "cut_type": "Eagle Rare 10-Yr Bourbon",
                "serving_size": "Single Cocktail",
                "short_description": "Demerara syrup, Angostura & orange bitters, smoked under cloche with charred bourbon cask wood.",
                "description": "Served over hand-cut crystal clear ice sphere with brandied Luxardo cherry and flamed orange peel.",
                "image_url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Signature Cocktail"],
                "is_featured": False,
                "sort_order": 12
            }
        ]

        for d in dishes:
            cat = cat_objs.get(d["category"])
            MenuItem.objects.update_or_create(
                slug=d["slug"],
                defaults={
                    "category": cat,
                    "name": d["name"],
                    "price": d["price"],
                    "currency": "$",
                    "cut_type": d["cut_type"],
                    "serving_size": d["serving_size"],
                    "short_description": d["short_description"],
                    "description": d["description"],
                    "image_url": d["image_url"],
                    "dietary_tags": d["dietary_tags"],
                    "is_featured": d["is_featured"],
                    "is_available": True,
                    "sort_order": d["sort_order"]
                }
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(dishes)} culinary menu creations."))

        # 5. Tour Viewpoints (5 Viewpoints required by PRD)
        viewpoints_data = [
            {
                "title": "Architectural Façade & Entrance",
                "subtitle": "Arrival Experience on Lexington Avenue",
                "description": "Monolithic dark basalt stone panels, brushed bronze portals, and warm architectural uplighting welcome guests into an exclusive sanctuary.",
                "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [0, 4.2, 15],
                "camera_target": [0, 2.4, 0],
                "scene_mood": {"ambient": "#282522", "accent": "#94734F", "warmth": "#D89A4B"},
                "sort_order": 1
            },
            {
                "title": "Grand Reception & Concierge",
                "subtitle": "Smoked Fluted Glass & Black Marble",
                "description": "A monolithic Nero Marquina reception counter with warm brass accents and discreet private coat check.",
                "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [-3, 3, 10],
                "camera_target": [0, 2, 0],
                "scene_mood": {"ambient": "#24201d", "accent": "#C4A878", "warmth": "#D89A4B"},
                "sort_order": 2
            },
            {
                "title": "Main Dining Room",
                "subtitle": "Bespoke Leather Banquettes & Sculptural Chandelier",
                "description": "Intimate dining partitions crafted from dark smoked oak, supple saddle leather banquettes, and hand-blown smoked crystal chandeliers.",
                "image_url": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [0, 2.5, 7],
                "camera_target": [0, 1.8, -2],
                "scene_mood": {"ambient": "#1C1B19", "accent": "#94734F", "warmth": "#e6a15c"},
                "sort_order": 3
            },
            {
                "title": "The Hearth & Grill Station",
                "subtitle": "Custom Dual Argentine Parrilla & Wood Embers",
                "description": "The dramatic open kitchen where post oak and binchotan embers sear prime steaks at 1,200 degrees behind architectural safety glass.",
                "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [4, 2.8, 6],
                "camera_target": [2, 1.5, 0],
                "scene_mood": {"ambient": "#301e14", "accent": "#D89A4B", "warmth": "#f4a261"},
                "sort_order": 4
            },
            {
                "title": "The Reserve Wine Cellar",
                "subtitle": "2,400 Bottles of Old World Grands Crus",
                "description": "Climate-controlled architectural glass vault showcasing rare Bordeaux, Super Tuscans, Napa Cult Cabernets, and vintage Champagne.",
                "image_url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [-4, 2.5, 5],
                "camera_target": [0, 2, -1],
                "scene_mood": {"ambient": "#1b1d22", "accent": "#542D32", "warmth": "#C4A878"},
                "sort_order": 5
            }
        ]

        for vp in viewpoints_data:
            TourViewpoint.objects.update_or_create(
                title=vp["title"],
                defaults={
                    "subtitle": vp["subtitle"],
                    "description": vp["description"],
                    "image_url": vp["image_url"],
                    "camera_position": vp["camera_position"],
                    "camera_target": vp["camera_target"],
                    "scene_mood": vp["scene_mood"],
                    "sort_order": vp["sort_order"],
                    "is_active": True
                }
            )
        self.stdout.write(self.style.SUCCESS("Seeded 5 Virtual Tour Viewpoints."))

        # 6. Dining Experiences (Section 10)
        experiences_data = [
            {
                "title": "The Sommelier's Reserve Room",
                "tagline": "Private Dining Salon for up to 14 Guests",
                "description": "Enclosed within acoustic smoked glass and walnut cabinetry, this secluded salon features dedicated sommelier service and bespoke 7-course pairing menus.",
                "capacity": "Up to 14 Guests",
                "price_guide": "$250 per guest tasting menu",
                "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
                "sort_order": 1
            },
            {
                "title": "The Chef's Hearth Table",
                "tagline": "Front-Row Culinary Immersion for 8 Guests",
                "description": "Directly facing the Argentine parrillawork hearth. Executive Chef Marcus Sterling guides guests through primal cut selections and custom wood-smoke infusions.",
                "capacity": "8 Guests Maximum",
                "price_guide": "$320 per guest with reserve pairings",
                "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                "sort_order": 2
            },
            {
                "title": "The Grand Mezzanine Salon",
                "tagline": "Exclusive Cocktail Receptions & Corporate Dinners",
                "description": "Overlooking the main architectural dining hall, the Mezzanine offers private bar service, dedicated restrooms, and customized steak carving stations.",
                "capacity": "25–50 Guests",
                "price_guide": "Inquire for buyout packages",
                "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
                "sort_order": 3
            }
        ]

        for exp in experiences_data:
            DiningExperience.objects.update_or_create(
                title=exp["title"],
                defaults=exp
            )
        self.stdout.write(self.style.SUCCESS("Seeded 3 Dining Experiences."))

        # 7. Team Members (Section 09)
        team_data = [
            {
                "name": "Marcus Sterling",
                "role": "Executive Chef & Hearth Master",
                "bio": "With over two decades leading Michelin-acclaimed steakhouse kitchens in New York and Chicago, Marcus has dedicated his career to the alchemy of heritage dry-aging and live hardwood embers.",
                "quote": "Beef speaks with honest eloquence when respected with precise aging, honest fire, and mineral salt.",
                "specialization": "Primal Cut Sourcing & Open Hearth Engineering",
                "image_url": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
                "sort_order": 1
            },
            {
                "name": "Elena Rostov",
                "role": "Master Butcher & Cellar Director",
                "bio": "Trained under celebrated European charcutiers, Elena oversees our proprietary 45-day Himalayan salt dry-aging vault, monitoring daily humidity, airflow, and enzyme concentration.",
                "quote": "Dry-aging is sculpting with time—allowing moisture to yield to concentrated umami.",
                "specialization": "Himalayan Salt Microclimates & Charcuterie",
                "image_url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
                "sort_order": 2
            },
            {
                "name": "Julian Vance",
                "role": "Head Sommelier & Beverage Director",
                "bio": "Advanced Court of Master Sommeliers certified, Julian has curated our 2,400-bottle cellar with a sharp focus on bold Left Bank Bordeaux, Napa Cabernet pioneers, and vintage Champagne.",
                "quote": "A robust steak requires a wine of equal spine, structured tannins, and lingering mineral length.",
                "specialization": "Old World Vintages & Barrel-Aging Programs",
                "image_url": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
                "sort_order": 3
            }
        ]

        for member in team_data:
            TeamMember.objects.update_or_create(
                name=member["name"],
                defaults=member
            )
        self.stdout.write(self.style.SUCCESS("Seeded 3 Culinary Team Profiles."))

        # 8. Testimonials & Press (Section 12)
        reviews_data = [
            {
                "guest_name": "Michelin Guide Review",
                "source": "Michelin Inspector's Notebook",
                "review_text": "A triumph of architectural restraint and culinary potency. The 45-day Himalayan salt dry-aged bone-in ribeye achieved a sublime sear over oak embers, followed by velvety truffle mousseline.",
                "rating": 5,
                "review_date": "October 2026",
                "sort_order": 1
            },
            {
                "guest_name": "The New York Times",
                "source": "Pete Wells, Restaurant Critic",
                "review_text": "Charred & Prime brings majestic theatricality back to steakhouse dining. No cheap gimmicks—just immaculate wood smoke, uncompromising beef provenance, and a cellar that commands reverence.",
                "rating": 5,
                "review_date": "August 2026",
                "sort_order": 2
            },
            {
                "guest_name": "Food & Wine Magazine",
                "source": "Best New Luxury Dining Destinations",
                "review_text": "The long-bone tomahawk carved tableside over smoldering rosemary branches is worth the reservation alone. An instant Midtown landmark.",
                "rating": 5,
                "review_date": "September 2026",
                "sort_order": 3
            },
            {
                "guest_name": "Forbes Luxury Travel",
                "source": "Private Dining Spotlight",
                "review_text": "The Sommelier's Reserve Room sets the gold standard for executive entertaining in Manhattan. Flawless hospitality and peerless wine pairings.",
                "rating": 5,
                "review_date": "July 2026",
                "sort_order": 4
            }
        ]

        for r in reviews_data:
            Testimonial.objects.update_or_create(
                guest_name=r["guest_name"],
                defaults=r
            )
        self.stdout.write(self.style.SUCCESS("Seeded 4 Editorial Reviews & Press Features."))

        # 9. Gallery Items (Section 11)
        gallery_data = [
            {"title": "Bone-In Prime Ribeye Searing", "category": "food", "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", "alt_text": "Charred prime ribeye steak", "sort_order": 1},
            {"title": "Monolithic Basalt Façade", "category": "exterior", "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", "alt_text": "Exterior architectural entrance", "sort_order": 2},
            {"title": "Smoked Glass & Leather Banquettes", "category": "interior", "image_url": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", "alt_text": "Interior dining room design", "sort_order": 3},
            {"title": "Argentine Parrilla Hearth Fire", "category": "kitchen", "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", "alt_text": "Open kitchen hearth flame", "sort_order": 4},
            {"title": "Private Sommelier Tasting Salon", "category": "events", "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", "alt_text": "Private dining room setting", "sort_order": 5},
            {"title": "Hand-Cut Prime Beef Tartare", "category": "food", "image_url": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80", "alt_text": "Beef tartare presentation", "sort_order": 6},
            {"title": "Grand Central Reserve Cellar", "category": "interior", "image_url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80", "alt_text": "Architectural wine room", "sort_order": 7},
            {"title": "Wood-Roasted Oysters in Embers", "category": "kitchen", "image_url": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80", "alt_text": "Oysters over live coals", "sort_order": 8},
        ]

        for g in gallery_data:
            GalleryItem.objects.update_or_create(
                title=g["title"],
                defaults=g
            )
        self.stdout.write(self.style.SUCCESS("Seeded 8 Architectural & Food Gallery Items."))

        # 10. Sample Inquiries (Section 13)
        if not Reservation.objects.exists():
            Reservation.objects.create(
                full_name="Alexander Hamilton",
                phone="+1 (917) 555-0192",
                email="a.hamilton@vanderbilt-capital.com",
                preferred_date="2026-11-20",
                preferred_time="7:30 PM",
                guests=4,
                occasion="Executive Celebration",
                selected_experience="The Sommelier's Reserve Room",
                special_requests="Requesting vintage 2010 Bordeaux pairing and booth facing hearth.",
                status="pending"
            )
            Reservation.objects.create(
                full_name="Victoria Sterling-Ross",
                phone="+1 (212) 555-0841",
                email="victoria.ross@condenast.com",
                preferred_date="2026-11-22",
                preferred_time="8:00 PM",
                guests=2,
                occasion="Anniversary",
                selected_experience="Main Dining Room",
                special_requests="Corner booth preferred. Husband loves dry-aged ribeye.",
                status="confirmed"
            )
            self.stdout.write(self.style.SUCCESS("Seeded 2 initial reservation inquiries."))

        self.stdout.write(self.style.SUCCESS("Dark Luxury Steakhouse CMS initialization completed successfully!"))
