from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from diner_api.models import (
    Restaurant,
    BrandSettings,
    WebsiteSection,
    MenuCategory,
    MenuItem,
    VirtualTourViewpoint,
    PhilosophyPillar,
    DinerStoryStage,
    DinerExperiencePanel,
    GalleryImage,
    Testimonial,
    Reservation,
    FAQ,
)

class Command(BaseCommand):
    help = "Seeds database with comprehensive retro-futuristic diner content, menu, 3D viewpoints, and admin user"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Project 6 (Retro-Futuristic Diner) database...")

        # 1. Superuser
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@stardustdiner.com", "adminpassword123")
            self.stdout.write(self.style.SUCCESS("✓ Created superuser 'admin' with password 'adminpassword123'."))

        # 2. Restaurant
        restaurant, created = Restaurant.objects.get_or_create(
            slug="stardust-diner",
            defaults={
                "name": "STARDUST // RETRO-FUTURISTIC DINER",
                "tagline": "CLASSIC TASTE. FUTURE ENERGY.",
                "short_description": "A neon-infused destination where classic 1950s American diner culture converges with atomic-age science fiction and modern comfort gastronomy.",
                "long_description": "Founded on the belief that great comfort food and imaginative futuristic design belong together. Chrome trim, red leather booths, checkerboard patterns, and glowing neon tubes set the stage for handcrafted smash burgers, malted shakes, and all-night hospitality.",
                "phone": "+1 (312) 555-1955",
                "email": "concierge@stardustdiner.com",
                "address": "550 Neon Boulevard, Atomic District",
                "city": "Chicago, IL 60611",
                "country": "USA",
                "latitude": 41.8781,
                "longitude": -87.6298,
                "coordinates_display": "41.8781° N, 87.6298° W — ATOMIC DISTRICT",
                "opening_hours_summary": "MON — SUN / 08:00 — 02:00 (MIDNIGHT SERVICE)",
                "hero_eyebrow": "EST. 1955 // A NEW KIND OF DINER",
                "hero_heading_line1": "GOOD TIMES.",
                "hero_heading_line2": "GREAT TASTE.",
                "hero_heading_line3": "NEXT LEVEL.",
                "hero_supporting_text": "Step into a dining experience where classic diner culture meets contemporary flavor, chrome aesthetics, and glowing neon energy.",
                "hero_cta_primary": "EXPLORE THE MENU",
                "hero_cta_secondary": "ENTER THE DINER",
                "established_year": 1955,
                "counter_stools": 24,
                "atomic_booths": 18,
                "jukebox_tracks": 120,
                "primary_color": "#111A2B",
                "secondary_color": "#D83A45",
                "accent_color": "#43D9E8",
                "is_active": True,
            }
        )

        # 3. Brand Settings
        BrandSettings.objects.get_or_create(
            id=1,
            defaults={
                "brand_tagline": "CLASSIC TASTE. FUTURE ENERGY.",
                "hero_headline": "GOOD TIMES. GREAT TASTE. NEXT LEVEL.",
                "hero_subtitle": "Where 1950s atomic roadside dreams meet cyber-future flavor.",
                "primary_color": "#111A2B",
                "secondary_color": "#D83A45",
                "accent_color": "#43D9E8",
                "neon_effect_enabled": True,
            }
        )

        # 4. 15 Website Sections
        sections_data = [
            {
                "section_key": "hero",
                "eyebrow": "EST. 1955 // A NEW KIND OF DINER",
                "title": "GOOD TIMES. GREAT TASTE. NEXT LEVEL.",
                "subtitle": "Step into a dining experience where classic diner culture meets contemporary flavor.",
                "display_order": 1,
                "custom_content": {
                    "cta_primary": "EXPLORE THE MENU",
                    "cta_secondary": "ENTER THE DINER",
                    "cta_target_primary": "#menu",
                    "cta_target_secondary": "#tour",
                    "status_indicator": "NEON DINER OPEN // WALK-INS & BOOTHS AVAILABLE",
                    "location_meta": "CHICAGO ATOMIC DISTRICT — MON-SUN 08:00-02:00"
                }
            },
            {
                "section_key": "intro",
                "eyebrow": "EDITORIAL INTRODUCTION",
                "title": "A CLASSIC REIMAGINED.",
                "subtitle": "Inspired by the energy of classic diners and the imagination of tomorrow, we bring together familiar comfort and a fresh approach to dining.",
                "display_order": 2,
                "custom_content": {
                    "paragraph_1": "Stardust Diner reimagines the legendary American roadside eatery through a retro-futuristic lens. Polished chrome counters, curved glass facades, and hand-bent neon glow warmly under the city skyline.",
                    "paragraph_2": "Every plate celebrates the spirit of nostalgic diner cooking elevated with prime dry-aged cuts, house-baked brioche, caramelized onions, and neon milkshakes mixed right before your eyes.",
                    "badge": "ATOMIC AGE RETRO-FUTURISM // 01"
                }
            },
            {
                "section_key": "philosophy",
                "eyebrow": "OUR CORE PILLARS",
                "title": "OLD-SCHOOL SOUL. NEW-SCHOOL ENERGY.",
                "subtitle": "Three guiding principles bringing together classic roadside soul and futuristic innovation.",
                "display_order": 3,
                "custom_content": {}
            },
            {
                "section_key": "signatures",
                "eyebrow": "CURATED HIGHLIGHTS",
                "title": "THE STARS OF THE MENU.",
                "subtitle": "Meet the flavors bringing classic comfort and contemporary creativity together.",
                "display_order": 4,
                "custom_content": {
                    "view_all_cta": "EXPLORE COMPLETE MENU"
                }
            },
            {
                "section_key": "menu_explorer",
                "eyebrow": "MENU EXPLORER",
                "title": "PICK YOUR FAVORITE.",
                "subtitle": "Double-smashed beef patties, atomic spiced sides, and hand-spun malts.",
                "display_order": 5,
                "custom_content": {
                    "combo_badge": "COMBO MEAL SPECIAL: BURGER + SHAKE + TALLOW FRIES $22",
                    "midnight_special": "MIDNIGHT PATTY MELT AVAILABLE DAILY AFTER 22:00"
                }
            },
            {
                "section_key": "diner_story",
                "eyebrow": "THE STORY BEHIND THE EXPERIENCE",
                "title": "A LITTLE NOSTALGIA. A LOT OF IMAGINATION.",
                "subtitle": "A four-stage voyage exploring the crossroads of chrome heritage and tomorrow's flavor.",
                "display_order": 6,
                "custom_content": {}
            },
            {
                "section_key": "diner_architecture",
                "eyebrow": "DINER ARCHITECTURE & INTERIOR",
                "title": "DESIGNED TO STAND OUT.",
                "subtitle": "Explore the colors, materials, lighting, and details that shape the character of our diner.",
                "display_order": 7,
                "custom_content": {
                    "materials": ["Polished Chrome & Trim", "Red Leather & Cream Vinyl", "Checkerboard Ceramic Tile", "Hand-Bent Neon Glass"],
                    "designer_credit": "STUDIO ATOMICA & CHROME INTERIORS // 1955 / 2026"
                }
            },
            {
                "section_key": "virtual_tour",
                "eyebrow": "SPATIAL VIRTUAL TOUR",
                "title": "YOUR SEAT IS WAITING. TAKE A LOOK.",
                "subtitle": "Explore our dining spaces and discover the atmosphere before you arrive.",
                "display_order": 8,
                "custom_content": {
                    "cta_tour": "START THE TOUR"
                }
            },
            {
                "section_key": "diner_experience",
                "eyebrow": "THE EXPERIENCE",
                "title": "GOOD FOOD. GOOD MUSIC. GOOD COMPANY.",
                "subtitle": "Three immersive dimensions framing every visit to our retro-futuristic counter.",
                "display_order": 9,
                "custom_content": {}
            },
            {
                "section_key": "gallery",
                "eyebrow": "VISUAL COLLECTION",
                "title": "RESTAURANT GALLERY.",
                "subtitle": "A visual showcase of sizzling smash burgers, glowing neon signs, and chrome details.",
                "display_order": 10,
                "custom_content": {}
            },
            {
                "section_key": "testimonials",
                "eyebrow": "GUEST REFLECTIONS",
                "title": "THE PEOPLE HAVE SPOKEN.",
                "subtitle": "Feedback from hungry travelers, retro design enthusiasts, and local regulars.",
                "display_order": 11,
                "custom_content": {}
            },
            {
                "section_key": "reservation",
                "eyebrow": "TABLE INQUIRY",
                "title": "COME ON IN. YOUR TABLE IS READY TO REQUEST.",
                "subtitle": "Planning a visit? Send us your reservation request and our team will help arrange your dining experience.",
                "display_order": 12,
                "custom_content": {
                    "notice": "Walk-ins are always welcomed at our 24-seat chrome counter. Booth reservations are held for 15 minutes."
                }
            },
            {
                "section_key": "location_contact",
                "eyebrow": "LOCATION & HOURS",
                "title": "FIND THE DINER.",
                "subtitle": "Located at the corner of 550 Neon Boulevard in the vibrant Atomic District.",
                "display_order": 13,
                "custom_content": {}
            },
            {
                "section_key": "faq",
                "eyebrow": "INFORMATION",
                "title": "FREQUENTLY ASKED QUESTIONS.",
                "subtitle": "Everything you need to know about seating, takeout, group events, and diner policies.",
                "display_order": 14,
                "custom_content": {}
            },
            {
                "section_key": "footer",
                "eyebrow": "FINAL BRAND STATEMENT",
                "title": "GOOD TIMES NEVER GO OUT OF STYLE.",
                "subtitle": "Stardust Diner celebrates timeless roadside hospitality with futuristic energy.",
                "display_order": 15,
                "custom_content": {
                    "copyright": "© 2026 STARDUST DINER HOSPITALITY GROUP. ALL RIGHTS RESERVED."
                }
            }
        ]

        for s_data in sections_data:
            WebsiteSection.objects.update_or_create(
                section_key=s_data["section_key"],
                defaults=s_data
            )

        # 5. Philosophy Pillars
        pillars = [
            {
                "number": "01",
                "title": "THE CLASSICS",
                "statement": "Celebrating familiar flavors and the comfort of classic diner culture.",
                "description": "Double-smashed beef patties seared on flat tops, golden crinkle-cut fries, and malted shakes made with pure whole milk and premium vanilla bean custard.",
                "display_order": 1
            },
            {
                "number": "02",
                "title": "THE TWIST",
                "statement": "Bringing a contemporary perspective to presentation, atmosphere, and dining.",
                "description": "Infusing heritage recipes with smoked habanero honey, house-pickled cucumbers, truffle tallow emulsions, and electric neon presentation.",
                "display_order": 2
            },
            {
                "number": "03",
                "title": "THE EXPERIENCE",
                "statement": "Creating a place where food, music, design, and hospitality come together.",
                "description": "From our illuminated analog jukebox to curved chrome counter stools, every element is designed to make guests feel energetic, welcome, and unhurried.",
                "display_order": 3
            }
        ]
        for p in pillars:
            PhilosophyPillar.objects.update_or_create(number=p["number"], defaults=p)

        # 6. Categories & Menu Items
        cats_items = [
            {
                "name": "Burgers",
                "slug": "burgers",
                "description": "Certified Angus beef smash patties seared on screaming-hot steel with caramelized crusts.",
                "items": [
                    {
                        "name": "The Atomic Smash Deluxe",
                        "slug": "atomic-smash-deluxe",
                        "price": 16.50,
                        "short_description": "Double smash patties, American cheese, grilled sweet onions, atomic sauce, toasted potato bun.",
                        "full_description": "Two 3.5oz dry-aged beef patties smashed paper-thin on cast iron, melted double yellow American cheddar, caramelized Vidalia onions, crisp dill pickles, and our signature neon atomic burger sauce on butter-toasted Martin's potato bun.",
                        "dietary_information": ["HALAL"],
                        "allergens": "Dairy, Gluten, Eggs",
                        "is_featured": True,
                        "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "name": "Smoked Bacon BBQ Melt",
                        "slug": "smoked-bacon-bbq-melt",
                        "price": 18.00,
                        "short_description": "Double beef patties, thick-cut applewood bacon, smoked gouda, crispy shallots, bourbon BBQ glaze.",
                        "full_description": "Charred applewood smoked bacon stacked over smash patties with melted Dutch smoked gouda, crispy fried shallot ribbons, and tangy housemade bourbon molasses BBQ glaze.",
                        "dietary_information": [],
                        "allergens": "Dairy, Gluten",
                        "is_featured": True,
                        "image_url": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
                    }
                ]
            },
            {
                "name": "Sandwiches",
                "slug": "sandwiches",
                "description": "Stacked high on butter-griddled sourdough, rye, and brioche rolls.",
                "items": [
                    {
                        "name": "Cosmic Hot Pastrami on Rye",
                        "slug": "cosmic-hot-pastrami-rye",
                        "price": 19.50,
                        "short_description": "1/2 lb house-cured pepper pastrami, spicy brown mustard, melted Swiss, griddled marble rye.",
                        "full_description": "Cured for 14 days and smoked over hickory, sliced warm and piled high on buttered artisan marble rye with whole grain mustard and aged Gruyère.",
                        "dietary_information": [],
                        "allergens": "Dairy, Gluten",
                        "is_featured": True,
                        "image_url": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "name": "Classic Golden Club",
                        "slug": "classic-golden-club",
                        "price": 15.00,
                        "short_description": "Roasted turkey breast, applewood bacon, crisp lettuce, ripe beefsteak tomato, herb mayo.",
                        "full_description": "Triple-decker toasted sourdough sandwich layered with tender slow-roasted turkey, hickory bacon, crisp romaine, and herb aioli.",
                        "dietary_information": [],
                        "allergens": "Gluten, Eggs",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80"
                    }
                ]
            },
            {
                "name": "Hot Dogs",
                "slug": "hot-dogs",
                "description": "All-beef natural casing franks charred over fire and served in steamed poppy-seed buns.",
                "items": [
                    {
                        "name": "The Chicago Cyber Frank",
                        "slug": "chicago-cyber-frank",
                        "price": 11.50,
                        "short_description": "All-beef frank, neon green relish, sport peppers, tomato wedges, pickle spear, celery salt.",
                        "full_description": "The quintessential Windy City classic dragged through the garden in a warm poppy-seed bun with glowing neon relish, yellow mustard, and spicy pickled peppers.",
                        "dietary_information": [],
                        "allergens": "Gluten",
                        "is_featured": True,
                        "image_url": "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "name": "Chili Cheese Jetliner Dog",
                        "slug": "chili-cheese-jetliner-dog",
                        "price": 13.00,
                        "short_description": "Slow-simmered beef brisket chili, molten cheddar cheese sauce, diced scallions.",
                        "full_description": "Smothered in hearty Texas-style brisket chili, house cheese sauce, and sweet white onion crunch.",
                        "dietary_information": [],
                        "allergens": "Dairy, Gluten",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1627054234553-094191d45167?auto=format&fit=crop&w=1200&q=80"
                    }
                ]
            },
            {
                "name": "Fries & Sides",
                "slug": "fries-sides",
                "description": "Twice-cooked Idaho russet potatoes, beer-battered rings, and loaded diner sides.",
                "items": [
                    {
                        "name": "Tallow Crinkle-Cut Fries",
                        "slug": "tallow-crinkle-fries",
                        "price": 7.50,
                        "short_description": "Twice-cooked in beef tallow, tossed with sea salt and smoked atomic paprika.",
                        "full_description": "Extra crunchy ridged potatoes fried to golden perfection with rosemary-infused sea salt.",
                        "dietary_information": ["GF"],
                        "allergens": "None",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "name": "Chrome Beer-Battered Onion Rings",
                        "slug": "beer-battered-onion-rings",
                        "price": 9.00,
                        "short_description": "Jumbo sweet Spanish onions in crisp lager batter with spicy comeback dip.",
                        "full_description": "Thick-cut golden sweet rings fried in local craft lager batter, served with house dipping sauce.",
                        "dietary_information": ["V"],
                        "allergens": "Gluten, Eggs",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1639024471287-032f6644dd40?auto=format&fit=crop&w=1200&q=80"
                    }
                ]
            },
            {
                "name": "Milkshakes",
                "slug": "milkshakes",
                "description": "Hand-spun malted milkshakes served in tall fluted glasses with the stainless steel tin on the side.",
                "items": [
                    {
                        "name": "Stardust Neon Strawberry Malt",
                        "slug": "stardust-neon-strawberry-malt",
                        "price": 9.50,
                        "short_description": "Fresh macerated strawberries, whole malted milk, vanilla bean custard, whipped cream, maraschino cherry.",
                        "full_description": "Classic soda-fountain malt spun thick with real Oregon strawberries, rich cream custard, malt powder, and topped with a bright candied cherry.",
                        "dietary_information": ["V", "GF"],
                        "allergens": "Dairy",
                        "is_featured": True,
                        "image_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "name": "Double Dark Chocolate Orbit Shake",
                        "slug": "double-chocolate-orbit-shake",
                        "price": 9.50,
                        "short_description": "Dutch cocoa custard, dark chocolate fudge drizzle, shaved chocolate curls, sea salt.",
                        "full_description": "Decadent dark chocolate ice cream whipped with rich fudge syrup and finished with Belgian chocolate shavings.",
                        "dietary_information": ["V", "GF"],
                        "allergens": "Dairy",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1200&q=80"
                    }
                ]
            },
            {
                "name": "Desserts",
                "slug": "desserts",
                "description": "Warm fruit pies baked fresh every morning, banana splits, and hot fudge sundaes.",
                "items": [
                    {
                        "name": "The Great Atomic Banana Split",
                        "slug": "great-atomic-banana-split",
                        "price": 12.00,
                        "short_description": "Brûléed banana, scoops of vanilla, chocolate & strawberry, crushed walnuts, hot fudge, cherries.",
                        "full_description": "Caramelized whole banana split lengthwise, topped with three scoops of artisan ice cream, pineapple compote, warm fudge, and toasted nuts.",
                        "dietary_information": ["V"],
                        "allergens": "Dairy, Tree Nuts",
                        "is_featured": True,
                        "image_url": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "name": "Warm Mile-High Apple Pie à la Mode",
                        "slug": "warm-apple-pie-mode",
                        "price": 8.50,
                        "short_description": "Honeycrisp apples, flaky butter crust, cinnamon sugar, warm vanilla ice cream scoop.",
                        "full_description": "Heaped with caramelized tart apples inside our golden butter pastry crust, warmed and served with melting vanilla cream.",
                        "dietary_information": ["V"],
                        "allergens": "Dairy, Gluten",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=80"
                    }
                ]
            },
            {
                "name": "Beverages",
                "slug": "beverages",
                "description": "Bottomless drip coffee, craft sodas on tap, and fresh squeezed citrus juices.",
                "items": [
                    {
                        "name": "Bottomless Diner Drip Coffee",
                        "slug": "bottomless-drip-coffee",
                        "price": 4.50,
                        "short_description": "Freshly brewed medium roast blend served in heavy vintage ceramic diner mugs.",
                        "full_description": "Rich, aromatic diner coffee roasted locally and refilled whenever our neon pots pass your booth.",
                        "dietary_information": ["VG", "GF"],
                        "allergens": "None",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
                    },
                    {
                        "name": "Neon Cherry Cola Float",
                        "slug": "neon-cherry-cola-float",
                        "price": 6.50,
                        "short_description": "Fountain craft cola, maraschino cherry syrup, scoop of vanilla bean ice cream.",
                        "full_description": "Fizzy artisanal cola topped with a floating scoop of vanilla custard in an icy soda tumbler.",
                        "dietary_information": ["V", "GF"],
                        "allergens": "Dairy",
                        "is_featured": False,
                        "image_url": "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=1200&q=80"
                    }
                ]
            }
        ]

        for c_data in cats_items:
            items_list = c_data.pop("items")
            cat, _ = MenuCategory.objects.update_or_create(slug=c_data["slug"], defaults=c_data)
            for item_data in items_list:
                MenuItem.objects.update_or_create(slug=item_data["slug"], defaults={**item_data, "category": cat})

        # 7. Virtual Tour Viewpoints
        viewpoints = [
            {
                "title": "Exterior Neon Facade & Skyline",
                "slug": "exterior-facade",
                "space_name": "Retro Roadside Elevation",
                "description": "Curved stainless-steel roofline with brilliant hand-bent neon signage glowing against the midnight navy sky.",
                "materials_spec": "Brushed aluminum siding, dual-color neon glass, checkerboard apron",
                "camera_position": [0, 2.5, 9.0],
                "camera_target": [0, 1.2, 0],
                "hotspot_title": "Neon Stardust Signage",
                "hotspot_detail": "Authentic 1950s neon gas tubing flashing in retro-futuristic red and cyan hues.",
                "image_url": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80"
            },
            {
                "title": "Chrome Revolving Entrance",
                "slug": "chrome-entrance",
                "space_name": "Threshold Air-Lock",
                "description": "Double chrome push-doors with porthole windows and floor-to-ceiling glass allowing clear views inside.",
                "materials_spec": "Mirror-polished chrome, tempered glass, brass kickplates",
                "camera_position": [-2.0, 1.8, 5.5],
                "camera_target": [0, 1.4, 0],
                "hotspot_title": "Porthole Glass Doors",
                "hotspot_detail": "Mid-century aerodynamic nautical design inspired by atomic age aviation.",
                "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
            },
            {
                "title": "Main Dining Red Leather Booths",
                "slug": "main-dining-booths",
                "space_name": "Atomic Booth Sanctuary",
                "description": "Deep cherry-red tufted vinyl booths withFormica boomerang-patterned tables and personal table jukeboxes.",
                "materials_spec": "Cherry vinyl, chrome piping, boomerang laminate table tops",
                "camera_position": [0, 1.9, 4.0],
                "camera_target": [0, 1.1, -1.0],
                "hotspot_title": "Mini Tabletop Jukebox",
                "hotspot_detail": "Select from 120 rockabilly and synthwave tracks right from your booth.",
                "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80"
            },
            {
                "title": "Stainless Steel Counter & Swivel Stools",
                "slug": "counter-swivel-stools",
                "space_name": "The Chrome Heartbeat",
                "description": "A 40-foot continuous brushed steel counter lined with 24 cherry-red swivel stools and pie display cases.",
                "materials_spec": "Embossed stainless steel, polished chrome base, rotating cushions",
                "camera_position": [3.2, 1.7, 3.5],
                "camera_target": [0, 1.2, 0],
                "hotspot_title": "Soda Fountain & Malt Rig",
                "hotspot_detail": "Triple-spindle milkshake mixers creating thick velvety malts all day.",
                "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            },
            {
                "title": "Open Sizzle Kitchen & Grill Station",
                "slug": "sizzle-kitchen",
                "space_name": "The Sizzle Deck",
                "description": "View into our open chrome kitchen where heavy flat tops sear dozens of smash burgers every minute.",
                "materials_spec": "Commercial chrome hood, commercial steel plancha, heat lamps",
                "camera_position": [0, 1.8, 2.2],
                "camera_target": [0, 1.1, -2.5],
                "hotspot_title": "700°F Cast Iron Plancha",
                "hotspot_detail": "Cast iron smash presses ensuring lace-thin crispy edges and juicy patties.",
                "image_url": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1600&q=80"
            }
        ]
        for idx, vp in enumerate(viewpoints, 1):
            VirtualTourViewpoint.objects.update_or_create(slug=vp["slug"], defaults={**vp, "display_order": idx})

        # 8. Story Stages
        stages = [
            {
                "stage_number": "01",
                "title": "THE INSPIRATION",
                "subtitle": "Post-war optimism meets futuristic science fiction",
                "description": "Born from the dream of 1950s atomic age road trips, reimagined with neon glow and cybernetic energy for the modern traveler.",
                "image_url": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                "display_order": 1
            },
            {
                "stage_number": "02",
                "title": "THE FOOD",
                "subtitle": "Heritage diner craft made without shortcuts",
                "description": "Fresh whole cuts ground in-house daily, hand-pressed patties, artisan bakery buns, and genuine malted milk custard.",
                "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                "display_order": 2
            },
            {
                "stage_number": "03",
                "title": "THE ATMOSPHERE",
                "subtitle": "A sanctuary of neon, chrome, and vinyl",
                "description": "Sink into deep leather booths or take a seat at the chrome bar while the jukebox plays late into the neon night.",
                "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
                "display_order": 3
            },
            {
                "stage_number": "04",
                "title": "THE EXPERIENCE",
                "subtitle": "Unpretentious warmth for everyone",
                "description": "Whether stopping for midnight pie or family dinner on Sunday, Stardust Diner is built on hospitality that never grows old.",
                "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
                "display_order": 4
            }
        ]
        for st in stages:
            DinerStoryStage.objects.update_or_create(stage_number=st["stage_number"], defaults=st)

        # 9. Dining Experience Panels
        panels = [
            {
                "title": "THE VIBE",
                "slug": "the-vibe",
                "subtitle": "Chrome gleam, neon hum, and retro-futuristic soul",
                "description": "Every surface reflects warm ambient neon and polished chrome. The acoustic hum of shake blenders and sizzle of flat tops create an electric atmosphere.",
                "spec_badge": "RETRO-FUTURISM",
                "image_url": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
                "display_order": 1
            },
            {
                "title": "THE PEOPLE",
                "slug": "the-people",
                "subtitle": "Warm hospitality that treats every guest like a regular",
                "description": "Our soda jerks and grill masters love classic diner culture. Expect warm coffee refills, friendly recommendations, and fast, smiling service.",
                "spec_badge": "MID-CENTURY HOSPITALITY",
                "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
                "display_order": 2
            },
            {
                "title": "THE MOMENT",
                "slug": "the-moment",
                "subtitle": "Late-night conversations over burgers and milkshakes",
                "description": "There is nothing quite like sliding into a red vinyl booth after midnight, listening to the jukebox, and sharing hot fries with good friends.",
                "spec_badge": "ALL-NIGHT DINER",
                "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
                "display_order": 3
            }
        ]
        for p in panels:
            DinerExperiencePanel.objects.update_or_create(slug=p["slug"], defaults=p)

        # 10. Gallery Images
        gallery_data = [
            { "title": "Atomic Smash Burger on Brioche", "category": "food", "caption": "Double patties with molten American cheddar and atomic sauce", "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80" },
            { "title": "Chrome Counter & Red Swivel Stools", "category": "interior", "caption": "40-foot polished steel counter with vintage soda fountain", "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
            { "title": "Stardust Neon Strawberry Malt", "category": "drinks", "caption": "Served with whipped cream and the frosty tin on the side", "image_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80" },
            { "title": "Exterior Neon Glow at Midnight", "category": "exterior", "caption": "Diner facade lit up in cherry red and neon cyan", "image_url": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80" },
            { "title": "Cosmic Pastrami on Marble Rye", "category": "food", "caption": "Half-pound cured pastrami with spicy mustard", "image_url": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80" },
            { "title": "Red Leather Booth Seating", "category": "interior", "caption": "Tufted vinyl booths with tabletop jukebox controls", "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80" },
            { "title": "Crinkle-Cut Tallow Fries", "category": "food", "caption": "Crispy golden ridges seasoned with smoked sea salt", "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=80" },
            { "title": "Polished Chrome Hardware Details", "category": "details", "caption": "Aerodynamic 1950s streamline modern trim", "image_url": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=80" }
        ]
        for idx, g in enumerate(gallery_data, 1):
            GalleryImage.objects.update_or_create(title=g["title"], defaults={**g, "display_order": idx, "is_active": True})

        # 11. Testimonials
        testimonials = [
            {
                "guest_name": "Johnny 'Rocket' Vance",
                "source": "Atomic Age Chronicle",
                "review_text": "The Atomic Smash Deluxe is the best burger in the Midwest. The chrome finishes and glowing neon make you feel like you stepped into a 1955 sci-fi blockbuster.",
                "rating": 5,
                "review_date": "January 2026"
            },
            {
                "guest_name": "Loretta Miller",
                "source": "Modern Nostalgia Magazine",
                "review_text": "The strawberry malt shake is sheer perfection—thick, frosty, with real malt powder and that wonderful stainless steel mixing tin. A Chicago treasure.",
                "rating": 5,
                "review_date": "February 2026"
            },
            {
                "guest_name": "Marcus Sterling",
                "source": "Midwest Dining Dispatch",
                "review_text": "Sitting at the chrome counter watching the grill team work their flat tops is hypnotic. Fast service, incredible comfort food, and unbeatable atmosphere.",
                "rating": 5,
                "review_date": "March 2026"
            }
        ]
        for idx, t in enumerate(testimonials, 1):
            Testimonial.objects.update_or_create(guest_name=t["guest_name"], defaults={**t, "display_order": idx})

        # 12. FAQs
        faqs = [
            {
                "question": "Do I need to reserve a table in advance?",
                "answer": "We encourage reservations for large booths, especially on Friday and Saturday evenings. However, our 24-seat chrome counter is always open for walk-ins without reservations."
            },
            {
                "question": "Can I visit without a reservation?",
                "answer": "Yes! Walk-in guests are welcomed at our main counter and neon cocktail bar throughout all operating hours."
            },
            {
                "question": "Do you accommodate large groups and parties?",
                "answer": "Yes. We have double-length corner booths that seat up to 10 guests. For private diner buyouts or parties over 12, contact our events team in advance."
            },
            {
                "question": "Do you offer vegetarian and vegan options?",
                "answer": "Yes. We offer our Beyond Atomic Patty, griddled portobello melts, beer-battered onion rings, and plant-based oat milk strawberry shakes."
            },
            {
                "question": "Do you have takeaway and delivery service?",
                "answer": "Yes. You can order all burgers, shakes, and sides for takeout through our walk-up window or delivery partners."
            },
            {
                "question": "Are children and families welcome?",
                "answer": "Absolutely! We love families and have highchairs, junior diner combo meals with coloring menus, and mini milkshakes."
            },
            {
                "question": "Is parking available at Stardust Diner?",
                "answer": "Yes, we have dedicated customer parking behind the diner with neon-lit vintage car bays and EV chargers."
            },
            {
                "question": "What payment methods do you accept?",
                "answer": "We accept all major credit cards, Apple Pay, Google Pay, and cash. Contactless payment is supported at every table."
            }
        ]
        for idx, f in enumerate(faqs, 1):
            FAQ.objects.update_or_create(question=f["question"], defaults={**f, "display_order": idx, "is_active": True})

        # 13. Sample Reservations
        Reservation.objects.get_or_create(
            reference_code="RETRO-261115-01A",
            defaults={
                "full_name": "Eleanor Sterling",
                "email": "eleanor@retrostudio.org",
                "phone": "+1 (312) 555-0144",
                "reservation_date": "2026-11-20",
                "reservation_time": "19:30",
                "guest_count": 4,
                "seating_area": "Retro Leather Booth",
                "message": "Celebrating a retro-themed birthday, booth preferred.",
                "status": "confirmed"
            }
        )
        Reservation.objects.get_or_create(
            reference_code="RETRO-261115-02B",
            defaults={
                "full_name": "Dr. Arthur Pendelton",
                "email": "arthur@cyberastro.edu",
                "phone": "+1 (312) 555-0988",
                "reservation_date": "2026-11-21",
                "reservation_time": "20:00",
                "guest_count": 2,
                "seating_area": "Stainless Steel Counter",
                "message": "First time visiting, looking forward to the smash burgers.",
                "status": "pending"
            }
        )

        self.stdout.write(self.style.SUCCESS("✓ Successfully seeded full Retro-Futuristic Diner database!"))
