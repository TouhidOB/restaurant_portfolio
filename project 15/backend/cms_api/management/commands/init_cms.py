import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    GalleryItem, DiningExperience, TeamMember, Testimonial, Reservation
)

class Command(BaseCommand):
    help = "Initializes Playful Pop-Art Food Studio CMS data and superuser"

    def handle(self, *args, **options):
        self.stdout.write("Initializing Playful Pop-Art Food Studio CMS...")

        # 1. Admin Superuser
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "studio@popfoodstudio.com", "adminpassword123")
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created (adminpassword123)."))
        else:
            self.stdout.write("Superuser 'admin' already exists.")

        # 2. SiteConfig
        site_content = {
            "site": {
                "name": "POP! FOOD STUDIO",
                "tagline": "Eat Outside The Lines",
                "phone": "+1 (212) 555-7677",
                "email": "hello@popfoodstudio.com",
                "address": "742 Pop Art Boulevard, SoHo, NY 10013",
                "hours": "Monday – Thursday: 11:30 AM – 10:00 PM | Friday – Sunday: 11:00 AM – 11:30 PM",
                "currency": "$",
            },
            "theme": {
                "colors": {
                    "tomato": "#F04438",
                    "yellow": "#FFD928",
                    "cobalt": "#2455D6",
                    "pink": "#F45AA5",
                    "cream": "#FFF5E6",
                    "ink": "#171717",
                    "coral": "#FF784F",
                    "mint": "#9EE6C0",
                    "lime": "#C6F36B"
                },
                "typography": {
                    "fontDisplay": "Archivo Black",
                    "fontHeading": "Anton",
                    "fontBody": "Inter",
                    "fontMono": "Space Mono"
                }
            },
            "hero": {
                "eyebrow": "A PLAYFUL POP-ART FOOD STUDIO",
                "title": "GOOD FOOD. BIG PERSONALITY.",
                "description": "Discover a creative food experience where bold flavors meet unexpected ideas. Step into our contemporary food studio where culinary craft and visual pop-art collide.",
                "primaryCta": "EXPLORE OUR MENU",
                "secondaryCta": "DISCOVER THE EXPERIENCE",
                "badge": "NOW OPEN IN SOHO"
            },
            "brand_story": {
                "eyebrow": "FOOD MEETS ART",
                "heading": "WE MAKE FOOD A LITTLE MORE INTERESTING.",
                "main_text": "POP! Food Studio was created to smash together contemporary pop-art, bold graphic color-blocking, and unapologetically delicious food. We believe dining should be an energetic sensory adventure, not a quiet museum.",
                "secondary_text": "From double-smashed grass-fed chuck patties and 72-hour cold-fermented sourdough pizzas to whimsical candy-topped shakes, every creation is hand-crafted with joyful irreverence.",
                "quote": "Why eat in black and white when you can dine in technicolor?",
                "featured_image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
            },
            "food_philosophy": {
                "eyebrow": "CRAFTED WITH CREATIVITY",
                "heading": "OUR CREATIVE FOOD PHILOSOPHY",
                "description": "Every single plate is designed like an art piece—bursting with color, contrasting textures, and uncompromised flavor.",
                "pillars": [
                    {
                        "number": "01",
                        "title": "Bold Flavors",
                        "description": "No timid seasoning. High-voltage sauces, smoky house rubs, and zesty citrus glazes that make your tastebuds dance.",
                        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                        "color": "#F04438"
                    },
                    {
                        "number": "02",
                        "title": "Fresh Ingredients",
                        "description": "100% pasture-raised meats, daily baked milk brioche, organic vine tomatoes, and artisan cheeses from local farms.",
                        "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
                        "color": "#FFD928"
                    },
                    {
                        "number": "03",
                        "title": "Creative Presentation",
                        "description": "Oversized graphic plates, edible color dusts, neon drizzles, and eye-popping visual arrangements made for memorable moments.",
                        "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
                        "color": "#F45AA5"
                    },
                    {
                        "number": "04",
                        "title": "Memorable Experiences",
                        "description": "Friendly energetic hospitality, upbeat retro-funk soundtracks, and a dining vibe that puts an instant smile on your face.",
                        "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
                        "color": "#2455D6"
                    }
                ]
            },
            "kitchen_studio": {
                "eyebrow": "BEHIND THE FOOD",
                "heading": "MADE WITH PASSION. SERVED WITH PERSONALITY.",
                "description": "Our open food studio is part kitchen, part art lab. Watch our team sear, smash, fire, and drizzle every masterpiece behind colorful glass screens.",
                "image": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
            },
            "reservation": {
                "eyebrow": "PLAN YOUR VISIT",
                "heading": "YOUR TABLE IS CALLING.",
                "description": "Whether you are stopping by for a casual lunch, planning a birthday bash, or organizing a creative group dinner, send us your request and our team will get back to you with confirmed availability.",
                "note": "Submitting this form sends an inquiry to our team. Availability is confirmed promptly via SMS or email."
            },
            "location": {
                "eyebrow": "SOHO NEW YORK",
                "heading": "COME FIND US.",
                "address": "742 Pop Art Boulevard, SoHo, NY 10013",
                "phone": "+1 (212) 555-7677",
                "email": "hello@popfoodstudio.com",
                "hours": "Mon – Thu: 11:30 AM – 10:00 PM | Fri – Sun: 11:00 AM – 11:30 PM",
                "transit_note": "Subway: N, Q, R, W at Prince St or C, E at Spring St (2 min walk)."
            },
            "footer": {
                "tagline": "POP! FOOD STUDIO | NEW YORK",
                "description": "A creative food sanctuary where bold burgers, sourdough pizzas, crazy shakes, and graphic pop-art live together in harmony.",
                "copyright": "© 2026 POP! Food Studio. All rights reserved."
            }
        }

        config, created = SiteConfig.objects.get_or_create(id=1)
        config.restaurant_name = "POP! FOOD STUDIO"
        config.content_json = site_content
        config.is_published = True
        config.save()
        self.stdout.write(self.style.SUCCESS("SiteConfig initialized."))

        # 3. Menu Categories
        categories_data = [
            {"name": "Artisan Smash Burgers", "slug": "burgers", "description": "Crispy lacy edges, toasted potato buns, and top-secret neon pop sauce.", "badge_color": "#F04438", "order": 1},
            {"name": "Sourdough Pop Pizzas", "slug": "pizzas", "description": "72-hour fermented sourdough crusts with bubbling artisan mozzarella and creative toppings.", "badge_color": "#FF784F", "order": 2},
            {"name": "Pop Starters & Street Bites", "slug": "starters", "description": "Double-fried chicken poppers, disco fries, and loaded nacho towers.", "badge_color": "#FFD928", "order": 3},
            {"name": "Crazy Shakes & Desserts", "slug": "desserts", "description": "Towering ice cream creations topped with baked treats, sprinkles, and cotton candy.", "badge_color": "#F45AA5", "order": 4},
            {"name": "Electric Sodas & Cocktails", "slug": "drinks", "description": "House-fermented craft sodas, neon mocktails, and pop-art inspired libations.", "badge_color": "#2455D6", "order": 5},
        ]

        cat_objs = {}
        for cdata in categories_data:
            cat, _ = MenuCategory.objects.get_or_create(
                slug=cdata["slug"],
                defaults={
                    "name": cdata["name"],
                    "description": cdata["description"],
                    "badge_color": cdata["badge_color"],
                    "sort_order": cdata["order"],
                    "is_active": True
                }
            )
            cat_objs[cdata["slug"]] = cat

        # 4. Menu Items
        dishes = [
            # Featured in S06
            {
                "category": "burgers",
                "name": "The Double Pop Smash",
                "slug": "double-pop-smash",
                "price": 17.50,
                "badge_text": "CROWD FAVORITE",
                "short_description": "Two 100% Angus smash patties, double yellow cheddar, house pickles, and neon pop burger sauce on a toasted brioche.",
                "description": "Our signature burger. Double lacy-edged patties seared at 500°F on our chrome flat-top grill, layered with molten American cheddar, sweet caramelized shallots, tangy dill chips, and our secret recipe electric pink pop sauce.",
                "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Signature", "Angus Beef"],
                "is_featured": True,
                "sort_order": 1
            },
            {
                "category": "pizzas",
                "name": "Neon Hot Honey Pepperoni",
                "slug": "neon-hot-honey-pepperoni",
                "price": 22.00,
                "badge_text": "BEST SELLER",
                "short_description": "Crispy cupped pepperoni, san marzano tomato base, fresh mozzarella, and habanero hot honey drizzle.",
                "description": "Baked blistered and airy in our 800°F pizza oven. Loaded with artisanal cup-and-char pepperoni that holds pockets of savory oil, finished with fresh basil and our infused orange blossom hot honey.",
                "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Spicy", "Sourdough"],
                "is_featured": True,
                "sort_order": 2
            },
            {
                "category": "desserts",
                "name": "Electric Pop Monster Shake",
                "slug": "electric-pop-monster-shake",
                "price": 15.00,
                "badge_text": "SHOWSTOPPER",
                "short_description": "Madagascar vanilla bean milkshake rimmed with rainbow sprinkles, topped with a whole glazed donut and cotton candy.",
                "description": "A magnificent visual spectacle. Rich churned vanilla bean gelato blended with strawberry coulis, served in a mason mug rimmed with chocolate frosting and fruity pebbles, topped with a warm donut, whipped cream, and sparkler.",
                "image_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Dessert", "Vegetarian"],
                "is_featured": True,
                "sort_order": 3
            },
            {
                "category": "starters",
                "name": "Crispy Pop Chicken Poppers",
                "slug": "crispy-pop-chicken-poppers",
                "price": 14.50,
                "badge_text": "POP PICK",
                "short_description": "Double-dredged buttermilk fried chicken thigh bites tossed in Korean sweet chili glaze with toasted sesame.",
                "description": "Extra crunchy bites brined in buttermilk and secret spices, fried to golden crispness, and tossed in our sticky sweet garlic-chili glaze. Served with pickled daikon radish cubes and ranch dip.",
                "image_url": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Crispy", "Popular"],
                "is_featured": True,
                "sort_order": 4
            },
            # Additional menu items
            {
                "category": "burgers",
                "name": "Truffle & Golden Mushroom Smash",
                "slug": "truffle-golden-mushroom-smash",
                "price": 19.00,
                "badge_text": "CHEF'S CUT",
                "short_description": "Angus smash patty with roasted cremini mushrooms, fontina cheese, black truffle aioli, and crispy shallots.",
                "description": "Earthy, rich, and intensely savory. Basted with truffle butter and melted Italian fontina on a warm toasted sesame bun.",
                "image_url": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Truffle", "Gourmet"],
                "is_featured": False,
                "sort_order": 5
            },
            {
                "category": "pizzas",
                "name": "The Green Studio Margherita",
                "slug": "green-studio-margherita",
                "price": 19.50,
                "badge_text": "CLASSIC",
                "short_description": "Slow-cooked San Marzano sauce, fior di latte mozzarella, green basil pesto swirls, and Maldon sea salt.",
                "description": "Simple perfection. Hand-stretched sourdough crust blistered to bubbly perfection with fresh fragrant basil oil.",
                "image_url": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Vegetarian"],
                "is_featured": False,
                "sort_order": 6
            },
            {
                "category": "starters",
                "name": "Disco Truffle Fries",
                "slug": "disco-truffle-fries",
                "price": 11.00,
                "badge_text": "SHARABLE",
                "short_description": "Skin-on shoestring fries tossed in white truffle oil, shaved parmesan, chives, and garlic herb aioli.",
                "description": "Piled high in a graphic metal basket with generous shavings of aged pecorino and roasted garlic dip.",
                "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Vegetarian", "Crispy"],
                "is_featured": False,
                "sort_order": 7
            },
            {
                "category": "starters",
                "name": "Nacho Volcano Tower",
                "slug": "nacho-volcano-tower",
                "price": 16.50,
                "badge_text": "EPIC",
                "short_description": "House tri-color corn chips layered with queso blanco, black beans, guacamole, pico de gallo, and cilantro crema.",
                "description": "A vertical mountain of crunchy goodness built for sharing, topped with pickled jalapeños and cotija cheese.",
                "image_url": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Sharable", "Vegetarian"],
                "is_featured": False,
                "sort_order": 8
            },
            {
                "category": "desserts",
                "name": "Warm Pop Skillet Cookie",
                "slug": "warm-pop-skillet-cookie",
                "price": 13.00,
                "badge_text": "FRESH BAKED",
                "short_description": "Baked to order gooey chocolate chip cookie served in a mini cast iron with vanilla bean gelato and salted caramel.",
                "description": "Crisp around the edges with a molten liquid chocolate center. Topped with sea salt and crunchy waffle crisp.",
                "image_url": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Vegetarian", "Hot & Cold"],
                "is_featured": False,
                "sort_order": 9
            },
            {
                "category": "drinks",
                "name": "Electric Yuzu Blue Soda",
                "slug": "electric-yuzu-blue-soda",
                "price": 8.50,
                "badge_text": "REFRESHING",
                "short_description": "Japanese yuzu citrus, blue butterfly pea flower tea, sparkling spring water, and lemon pop candy.",
                "description": "Changes from vivid blue to purple when stirred! Tangy, zesty, and delightfully bubbly.",
                "image_url": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Non-Alcoholic", "Craft Soda"],
                "is_featured": False,
                "sort_order": 10
            },
            {
                "category": "drinks",
                "name": "Pop-Art Paloma Fizz",
                "slug": "pop-art-paloma-fizz",
                "price": 14.00,
                "badge_text": "COCKTAIL",
                "short_description": "Blanco tequila, pink grapefruit cordial, lime juice, sparkling soda, and chili-salt rim.",
                "description": "Served in a custom geometric tumbler with dehydrated blood orange wheel and edible glitter dust.",
                "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
                "dietary_tags": ["Cocktail", "21+"],
                "is_featured": False,
                "sort_order": 11
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
                    "badge_text": d["badge_text"],
                    "short_description": d["short_description"],
                    "description": d["description"],
                    "image_url": d["image_url"],
                    "dietary_tags": d["dietary_tags"],
                    "is_featured": d["is_featured"],
                    "is_available": True,
                    "sort_order": d["sort_order"]
                }
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(dishes)} pop-art food creations."))

        # 5. Tour Viewpoints (5 Viewpoints per PRD Section 4.5)
        viewpoints_data = [
            {
                "title": "Exterior / Pop-Art Storefront",
                "subtitle": "Arrival Experience on SoHo Boulevard",
                "description": "Electric yellow entrance frame, glowing red pop logo, colorful graphic awnings, and large glass windows showcasing the lively studio inside.",
                "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [0, 3.8, 14],
                "camera_target": [0, 2, 0],
                "scene_mood": {"bg": "#FFF5E6", "accent": "#F04438"},
                "sort_order": 1
            },
            {
                "title": "Entrance / Welcome & Merch Counter",
                "subtitle": "Comic Art Lobby & Candy Sprinkles Desk",
                "description": "Vibrant comic halftone wallpaper, custom neon signage, playful collectible merchandise shelves, and friendly greeting host desk.",
                "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [-3, 2.5, 9],
                "camera_target": [0, 1.8, 0],
                "scene_mood": {"bg": "#FFD928", "accent": "#2455D6"},
                "sort_order": 2
            },
            {
                "title": "Main Dining Area & Pop Booths",
                "subtitle": "Color-Blocked Banquettes & Graphic Murals",
                "description": "Retro-futuristic curved leather booths in tomato red and cobalt blue, geometric pendant lighting, and oversized comic food wall art.",
                "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [0, 2.5, 7],
                "camera_target": [0, 1.5, -2],
                "scene_mood": {"bg": "#FFF5E6", "accent": "#F45AA5"},
                "sort_order": 3
            },
            {
                "title": "Counter / Shake & Soda Bar",
                "subtitle": "Electric Yellow Service Deck & Tap Station",
                "description": "High-energy stainless steel counter with yellow tile accents, craft soda taps, ice cream churners, and transparent shake assembly station.",
                "image_url": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [4, 2.6, 6],
                "camera_target": [2, 1.5, 0],
                "scene_mood": {"bg": "#2455D6", "accent": "#FFD928"},
                "sort_order": 4
            },
            {
                "title": "Kitchen / The Pop Food Lab",
                "subtitle": "Open-View Grill & Glaze Art Station",
                "description": "Watch smash patties sizzling on the flat-top and pizzas sliding into high-heat stone ovens behind colorful acoustic glass partitions.",
                "image_url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
                "camera_position": [-4, 2.8, 5],
                "camera_target": [0, 2, -1],
                "scene_mood": {"bg": "#F04438", "accent": "#C6F36B"},
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
                "title": "Birthday Pop Bash",
                "tagline": "The Ultimate Technicolor Party for up to 20 Guests",
                "description": "Dedicated pop-art booth area with custom monster shake tower, photo props, personalized menu headers, and unlimited craft sodas.",
                "capacity": "Up to 20 Guests",
                "price_guide": "$45 per guest package",
                "image_url": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
                "sort_order": 1
            },
            {
                "title": "Studio Private Takeover",
                "tagline": "Full Venue Buyout for up to 60 Guests",
                "description": "Exclusive access to the full restaurant studio, open kitchen demo, custom DJ playlist, curated pizza & burger stations, and signature cocktail bar.",
                "capacity": "Up to 60 Guests",
                "price_guide": "Inquire for buyout pricing",
                "image_url": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
                "sort_order": 2
            },
            {
                "title": "DIY Shake & Burger Masterclass",
                "tagline": "Interactive Food Art Workshop for Groups of 8–15",
                "description": "Join our chefs in the Food Lab to smash your own custom burger blend, mix secret sauces, and build a gravity-defying dessert shake.",
                "capacity": "8–15 Guests",
                "price_guide": "$65 per participant",
                "image_url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
                "sort_order": 3
            }
        ]

        for exp in experiences_data:
            DiningExperience.objects.update_or_create(
                title=exp["title"],
                defaults=exp
            )
        self.stdout.write(self.style.SUCCESS("Seeded 3 Pop-Art Dining Experiences."))

        # 7. Team Members (Section 09)
        team_data = [
            {
                "name": "Leo Rossi",
                "role": "Executive Chef & Food Architect",
                "bio": "Culinary innovator who trained in Naples and NYC before founding POP! Studio to transform burgers and sourdough pizza into bold graphic art.",
                "quote": "Cooking is the only art form that engages all five human senses simultaneously.",
                "specialty": "Smash Patties & Sourdough Fermentation",
                "image_url": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
                "sort_order": 1
            },
            {
                "name": "Mia Chen",
                "role": "Pastry Artist & Shake Alchemist",
                "bio": "Pastry chef and food stylist known for playful colorful textures, gravity-defying monster shakes, and golden skillet cookies.",
                "quote": "If dessert isn't fun, you are doing it wrong!",
                "specialty": "Crazy Shakes, Edible Art & Glazes",
                "image_url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
                "sort_order": 2
            },
            {
                "name": "Sam K",
                "role": "Beverage Director & Soda Chemist",
                "bio": "Expert in natural fruit cordials, color-changing botanical infusions, and craft sodas with zero artificial preservatives.",
                "quote": "Every drink should feel like a celebration in a glass.",
                "specialty": "Craft Sodas & Technicolor Mocktails",
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

        # 8. Testimonials (Section 12)
        reviews_data = [
            {
                "customer_name": "Eater NY Dining Guide",
                "source": "NYC Best Casual Eats",
                "review_text": "POP! Food Studio is a shot of pure adrenaline. The double smash burger has the crispiest lacy skirt in Manhattan, and the retro pop aesthetics are genuinely delightful.",
                "rating": 5,
                "review_date": "October 2026",
                "sort_order": 1
            },
            {
                "customer_name": "Timeout New York",
                "source": "Critic's Pick",
                "review_text": "The hot honey pepperoni pizza is an instant classic. Outstanding 72-hour sourdough crust and a room that feels like living inside a modern pop-art gallery.",
                "rating": 5,
                "review_date": "September 2026",
                "sort_order": 2
            },
            {
                "customer_name": "Chloe & Liam D.",
                "source": "Google Verified Review",
                "review_text": "Celebrated our anniversary with their burger & shake flight! The energy of the staff is infectious, the food is top tier, and our photos look like magazine covers.",
                "rating": 5,
                "review_date": "August 2026",
                "sort_order": 3
            },
            {
                "customer_name": "Food & Fun Magazine",
                "source": "Featured Restaurant Review",
                "review_text": "A brilliant demonstration that fine culinary technique and joyful playful design don't have to be mutually exclusive. A must-visit SoHo destination.",
                "rating": 5,
                "review_date": "July 2026",
                "sort_order": 4
            }
        ]

        for r in reviews_data:
            Testimonial.objects.update_or_create(
                customer_name=r["customer_name"],
                defaults=r
            )
        self.stdout.write(self.style.SUCCESS("Seeded 4 Reviews & Testimonials."))

        # 9. Gallery Items (Section 11)
        gallery_data = [
            {"title": "The Signature Double Smash", "category": "food", "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", "alt_text": "Smash burger with melted cheese", "sort_order": 1},
            {"title": "SoHo Storefront in Color", "category": "exterior", "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", "alt_text": "Exterior storefront facade", "sort_order": 2},
            {"title": "Pop Art Dining Booths", "category": "interior", "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", "alt_text": "Interior dining booths", "sort_order": 3},
            {"title": "Hot Honey Pepperoni Sourdough", "category": "food", "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", "alt_text": "Pepperoni pizza with basil", "sort_order": 4},
            {"title": "Behind the Open Kitchen", "category": "kitchen", "image_url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80", "alt_text": "Chefs preparing food", "sort_order": 5},
            {"title": "Monster Shake with Donut", "category": "food", "image_url": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", "alt_text": "Monster dessert milkshake", "sort_order": 6},
            {"title": "Birthday Party Pop Event", "category": "events", "image_url": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80", "alt_text": "Celebration dining event", "sort_order": 7},
            {"title": "Color-Changing Yuzu Soda", "category": "food", "image_url": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80", "alt_text": "Electric blue soda", "sort_order": 8},
        ]

        for g in gallery_data:
            GalleryItem.objects.update_or_create(
                title=g["title"],
                defaults=g
            )
        self.stdout.write(self.style.SUCCESS("Seeded 8 Pop-Art Gallery Items."))

        # 10. Sample Reservation Inquiries (Section 13)
        if not Reservation.objects.exists():
            Reservation.objects.create(
                customer_name="Taylor Swift",
                phone="+1 (212) 555-1989",
                email="taylor@republicrecords.com",
                preferred_date="2026-12-05",
                preferred_time="7:00 PM",
                guest_count=6,
                inquiry_type="Table Reservation",
                message="Celebrating album release! Would love the booth facing the pop mural.",
                status="new"
            )
            Reservation.objects.create(
                customer_name="Andy Warhol Fan Club",
                phone="+1 (917) 555-0420",
                email="contact@warholartsociety.org",
                preferred_date="2026-12-10",
                preferred_time="6:30 PM",
                guest_count=16,
                inquiry_type="Group Dining",
                message="Annual art society dinner. Requesting burger and shake tasting menu.",
                status="reviewing"
            )
            self.stdout.write(self.style.SUCCESS("Seeded 2 initial reservation inquiries."))

        self.stdout.write(self.style.SUCCESS("POP! Food Studio CMS initialization completed successfully!"))
