from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryItem, TeamMember, Testimonial, Reservation
)

class Command(BaseCommand):
    help = "Initializes Seoul Street Neon Food platform seed content and admin account"

    def handle(self, *args, **options):
        self.stdout.write("Initializing Seoul Street database...")

        # 1. Superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@seoulstreetfood.com', 'adminpassword123')
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created."))
        else:
            self.stdout.write("Superuser 'admin' already exists.")

        # 2. Master Editorial Sections JSON
        editorial_json = {
            "s01_preloader": {
                "badge": "SEOUL STREET FOOD",
                "title": "SEOUL STREET",
                "korean_text": "서울포차",
                "subtitle": "Hongdae Night Market — Seoul, Korea",
                "established": "2020"
            },
            "s02_hero": {
                "eyebrow": "CONTEMPORARY KOREAN STREET CULTURE",
                "title": "SEOUL STREET FLAVORS. ALL NIGHT ENERGY.",
                "korean_title": "밤이 깊어질수록 더 뜨거워지는 길거리의 맛",
                "description": "Discover bold Korean street food, sizzling wok-fired dishes, crispy Korean fried chicken, and ice-cold soju under glowing Seoul neons.",
                "primary_cta": "EXPLORE THE MENU",
                "secondary_cta": "3D VILLA TOUR",
                "location_badge": "Hongdae, Seoul",
                "status_badge": "Open Tonight: 17:00 – 04:00",
                "stats": [
                    {"value": "17:00 – 04:00", "label": "Late Night Hours"},
                    {"value": "100%", "label": "Authentic Street Recipe"},
                    {"value": "3x", "label": "Double Crispy Fry Technique"},
                    {"value": "24+", "label": "Korean Soju & Anju Combos"}
                ]
            },
            "s03_story": {
                "chapter": "CHAPTER 01 — STREET CULTURE",
                "title": "The Raw Spirit of Seoul After Dark",
                "korean_subtitle": "골목길 포장마차의 기억과 현대적인 감각의 만남",
                "quote": "Seoul at 2 AM is not asleep; it is sizzling over red-hot charcoal, clinking soju glasses, and laughing amidst aromatic clouds of steam.",
                "paragraphs": [
                    "Born from the neon-soaked backstreets of Hongdae and Euljiro, Seoul Street reimagines the traditional Korean pojangmacha (street food tent) for a new generation. We celebrate the raw, democratic vitality of Korean night markets where strangers sit elbow-to-elbow sharing steaming plates of spicy tteokbokki and crackling crispy chicken.",
                    "Every sauce is fermented according to family traditions, every cut of chicken is double-fried for legendary crunch, and our open woks flash with fire all night long. This isn't fine-dining restraint—it is intense, craveable Korean street comfort."
                ],
                "korean_phrase": "맛있게 드세요! 밤은 아직 끝나지 않았다.",
                "english_translation": "\"Enjoy your meal! The night is far from over.\"",
                "highlights": [
                    {"label": "Direct Gochujang Import", "desc": "Sun-dried red peppers from Sunchang"},
                    {"label": "Double-Fired Crunch", "desc": "Secret cornstarch & potato coating"},
                    {"label": "Late-Night Pocha", "desc": "Open until 4:00 AM every single night"}
                ]
            },
            "s04_tour": {
                "badge": "3D INTERACTIVE WEBGL VIRTUAL TOUR",
                "title": "Traverse the Seoul Street Pocha",
                "description": "Step into our late-night dining world. Walk along the wet neon-lit street alley, pull up a plastic pocha stool, or stand before our roaring open kitchen woks."
            },
            "s05_culture": {
                "badge": "OUR CULINARY MANIFESTO",
                "title": "Three Pillars of Seoul Street Gastronomy",
                "description": "What makes Korean street food a worldwide addiction? High heat, deep fermented depth, and unpretentious togetherness.",
                "pillars": [
                    {
                        "number": "01",
                        "title": "Bold Korean Flavors",
                        "korean": "진하고 매콤한 깊은 맛",
                        "desc": "Rich, multi-layered heat born from artisanal gochujang, toasted sesame oil, minced garlic, and caramelized leeks that awaken the senses."
                    },
                    {
                        "number": "02",
                        "title": "Made Fresh & Sizzling",
                        "korean": "주문 즉시 조리되는 신선함",
                        "desc": "No pre-cooked shortcuts. Rice cakes are braised to order, fried chicken hits the wok twice, and bowls arrive sizzling hot at your table."
                    },
                    {
                        "number": "03",
                        "title": "Night Pocha Atmosphere",
                        "korean": "언제나 활기찬 밤의 에너지",
                        "desc": "A sensory soundtrack of sizzling oil, clinking glasses, glowing magenta neon, and infectious urban camaraderie that runs until 4:00 AM."
                    }
                ]
            },
            "s06_signature": {
                "badge": "CROWD FAVORITES",
                "title": "Seoul Street Food Icons",
                "description": "The quintessential street dishes that define contemporary Korean night culture."
            },
            "s07_menu": {
                "badge": "FULL POCHA MENU",
                "title": "The Late-Night Culinary Explorer",
                "description": "Browse our complete street food repertoire. Filter by category, spice tolerance, or dietary preference."
            },
            "s08_kitchen": {
                "badge": "BEHIND THE COUNTER",
                "title": "MADE FRESH. SERVED HOT.",
                "korean_title": "불꽃 위에서 완성되는 길거리 요리",
                "description": "Our open kitchen is an unfiltered theater of heat, smoke, and speed. Searing wok flames, bubbling red cauldrons, and double-fried perfection in real time.",
                "process_steps": [
                    {"step": "01", "name": "Buldak & Gochujang Reduction", "desc": "Simmered with Korean radish, kelp, and 3 types of chili flakes"},
                    {"step": "02", "name": "12-Hour Marinade", "desc": "Fresh chicken steeped in ginger, Korean pear, and sea salt"},
                    {"step": "03", "name": "High-Heat Flash Wok", "desc": "Locking in natural moisture with intense wok hei"}
                ]
            },
            "s09_team": {
                "badge": "STREET MASTERS",
                "title": "The Kitchen Brigade Behind the Heat",
                "description": "Meet the artisans who turn humble Korean street classics into unforgettable culinary moments."
            },
            "s10_experiences": {
                "badge": "LATE NIGHT SPECIALS",
                "title": "Curated Group Dining & Pocha Tables",
                "description": "Planning a celebration with friends? Reserve our pocha group tables with feast pairings and chilled soju towers."
            },
            "s11_gallery": {
                "badge": "VISUAL CHRONICLE",
                "title": "Seoul Nights & Sizzling Bites",
                "description": "Glimpses of glowing neon signage, bubbling bowls, crispy golden chicken, and vibrant urban energy."
            },
            "s12_testimonials": {
                "badge": "COMMUNITY BUZZ",
                "title": "What Street Foodies Are Saying",
                "description": "Honest reviews from Seoul locals, night owls, and international travelers."
            },
            "s13_reservation": {
                "badge": "BOOK YOUR TABLE",
                "title": "Reserve Your Pocha Spot",
                "description": "Walk-ins are always welcomed, but reservations are recommended for groups of 4 or more during peak night hours (20:00 – 01:00).",
                "notice": "Reservations are held for 15 minutes. Casual street attire warmly welcomed."
            },
            "s14_location": {
                "badge": "FIND US IN SEOUL",
                "title": "Location & Night Arrival",
                "address": "28 Wausan-ro 21-gil, Mapo-gu, Seoul, South Korea (Hongdae Night Market)",
                "subway": "Subway: Line 2 Hongik Univ. Station, Exit 9 (5 min walk through pedestrian street)",
                "phone": "+82 2 312 9988",
                "email": "hello@seoulstreetfood.com",
                "hours": "Daily: 17:00 – 04:00 (Kitchen closes at 03:15)"
            },
            "s15_footer": {
                "copyright": "© 2026 Seoul Street Pocha Inc. All rights reserved.",
                "heritage": "Hongdae Night Market • Seoul, Republic of Korea",
                "tagline": "Contemporary Korean Street Culture Meets Cinematic Digital Experience"
            }
        }

        # 3. SiteConfig Instance
        config, created = SiteConfig.objects.get_or_create(
            id=1,
            defaults={
                "restaurant_name": "SEOUL STREET (서울포차)",
                "tagline": "Contemporary Korean Street Culture Meets Cinematic Digital Dining",
                "hero_subtitle": "Discover sizzling spicy tteokbokki, golden crispy Korean fried chicken, and late-night street pocha energy under glowing Seoul neons.",
                "contact_email": "hello@seoulstreetfood.com",
                "contact_phone": "+82 2 312 9988",
                "address": "28 Wausan-ro 21-gil, Mapo-gu, Seoul, South Korea (Hongdae Night Market)",
                "opening_hours": "Monday – Sunday: 17:00 – 04:00 (Late Night Street Pocha)",
                "content_json": editorial_json,
                "is_published": True
            }
        )
        if not created:
            config.content_json = editorial_json
            config.save()
        self.stdout.write(self.style.SUCCESS("SiteConfig initialized."))

        # 4. Tour Viewpoints (5 Scenes per PRD Section 4.3)
        TourViewpoint.objects.all().delete()
        viewpoints_data = [
            {
                "title": "Seoul Street Exterior",
                "subtitle": "Wet asphalt, neon signboards, and bustling Hongdae alley",
                "slug": "exterior",
                "description": "The dynamic glowing storefront of Seoul Street, with vibrant magenta signage and illuminated Korean menus reflected on night pavement.",
                "camera_position": "[0, 3.2, 8.5]",
                "camera_target": "[0, 1.8, 0]",
                "atmosphere": "Vibrant night rain reflections, magenta & cyan neon glow",
                "highlights": ["Dual-Color Neon Sign", "Wet Asphalt Pavement", "Street Counter Awnings"],
                "sort_order": 1,
                "is_active": True
            },
            {
                "title": "Entrance & Welcome Counter",
                "subtitle": "Warm amber greeting and ordering reception",
                "slug": "welcome",
                "description": "Step under the red pocha canopy to be greeted by our host, where the smell of toasted sesame and sizzling garlic immediately hits you.",
                "camera_position": "[-2.6, 2.2, 5.2]",
                "camera_target": "[0, 1.2, 0]",
                "atmosphere": "Warm amber lantern light, welcoming street bustle",
                "highlights": ["Red Pocha Canopy", "Menu Chalkboard", "Soju Bottle Display"],
                "sort_order": 2,
                "is_active": True
            },
            {
                "title": "Main Dining Area",
                "subtitle": "Classic pocha round metal tables and colorful plastic stools",
                "slug": "dining",
                "description": "The heart of the pocha. Circular stainless steel tables designed for sharing hot pans, clinking glasses, and high-energy dining.",
                "camera_position": "[0.2, 1.8, 4.0]",
                "camera_target": "[0, 1.2, -1.5]",
                "atmosphere": "Lively laughter, clinking soju glasses, glowing neon wall art",
                "highlights": ["Round Pocha Tables", "Fluorescent Hanging Lamps", "K-Pop Soundscape"],
                "sort_order": 3,
                "is_active": True
            },
            {
                "title": "Food Counter & Open Kitchen",
                "subtitle": "Sizzling woks, bubbling cauldrons, and rising aromatic steam",
                "slug": "kitchen",
                "description": "Watch our chefs flash-fry chicken, toss sizzling noodles in roaring woks, and ladle spicy red tteokbokki sauce into wide copper pans.",
                "camera_position": "[2.8, 2.1, 4.8]",
                "camera_target": "[0.5, 1.4, 0]",
                "atmosphere": "Wok flame flashes, steam clouds, sizzling oil sounds",
                "highlights": ["Live Fire Wok Station", "Double-Basket Fryers", "Copper Braising Pans"],
                "sort_order": 4,
                "is_active": True
            },
            {
                "title": "Signature Food Experience",
                "subtitle": "Soju table spread with sizzling anju and fried chicken",
                "slug": "experience",
                "description": "A close-up view of the ultimate late-night feast: bubbly spicy stew, golden garlic chicken, kimbap rolls, and frosted glasses of soju.",
                "camera_position": "[0, 1.5, 3.4]",
                "camera_target": "[0, 1.0, 0]",
                "atmosphere": "Intimate foodie spotlight, steam rising, frosted drinks",
                "highlights": ["Cast-Iron Sizzle Plate", "Crisp Amber Glow", "Condiment Caddy"],
                "sort_order": 5,
                "is_active": True
            }
        ]
        for vp in viewpoints_data:
            TourViewpoint.objects.create(**vp)
        self.stdout.write(self.style.SUCCESS(f"Created {len(viewpoints_data)} 3D Tour Viewpoints."))

        # 5. Menu Categories & Items
        MenuCategory.objects.all().delete()
        MenuItem.objects.all().delete()

        categories_data = [
            {
                "name": "Street Food Classics",
                "korean_name": "길거리 분식",
                "slug": "street-food",
                "description": "The quintessential street snacks that line the midnight alleys of Seoul.",
                "sort_order": 1,
                "items": [
                    {
                        "name": "Spicy Rose Tteokbokki",
                        "korean_name": "로제 떡볶이",
                        "slug": "spicy-rose-tteokbokki",
                        "short_description": "Chewy rice cakes in creamy spicy gochujang cream sauce with fish cakes & mozzarella.",
                        "description": "Traditional chewy cylindrical rice cakes and fish cakes simmered in our signature rich gochujang broth, smoothed with heavy cream, garlic, and melted mozzarella cheese.",
                        "price": "₩15,000",
                        "currency": "KRW",
                        "dietary_tags": "Spicy, Vegetarian Optional",
                        "spicy_level": 2,
                        "is_featured": True,
                        "sort_order": 1
                    },
                    {
                        "name": "Crispy Kimchi & Pork Mandu",
                        "korean_name": "김치 군만두",
                        "slug": "crispy-kimchi-mandu",
                        "short_description": "Pan-fried handmade dumplings stuffed with aged kimchi, minced pork & glass noodles.",
                        "description": "6 large handmade dumplings pan-seared until bottom is golden crisp, filled with 6-month fermented spicy kimchi, minced pork shoulder, scallions, and vermicelli.",
                        "price": "₩11,000",
                        "currency": "KRW",
                        "dietary_tags": "Pan-Fried, Pork",
                        "spicy_level": 1,
                        "is_featured": True,
                        "sort_order": 2
                    },
                    {
                        "name": "Classic Street Kimbap",
                        "korean_name": "원조 길거리 김밥",
                        "slug": "classic-street-kimbap",
                        "short_description": "Seaweed rice roll with seasoned beef, yellow radish, spinach & toasted sesame oil.",
                        "description": "Warm short-grain rice brushed with pure toasted sesame oil, rolled in toasted nori seaweed with bulgogi beef, pickled yellow radish, braised burdock root, and eggs.",
                        "price": "₩8,500",
                        "currency": "KRW",
                        "dietary_tags": "Halal Friendly, Beef",
                        "spicy_level": 0,
                        "is_featured": True,
                        "sort_order": 3
                    }
                ]
            },
            {
                "name": "Korean Fried Chicken",
                "korean_name": "한국식 치킨",
                "slug": "fried-chicken",
                "description": "Double-fried for the loud, impossible crunch that Korea is famous for.",
                "sort_order": 2,
                "items": [
                    {
                        "name": "Seoul Yangnyeom Fried Chicken",
                        "korean_name": "양념치킨",
                        "slug": "yangnyeom-chicken",
                        "short_description": "Crispy double-fried bone-in chicken tossed in sweet, sticky & garlicky red chili glaze.",
                        "description": "Fresh whole chicken marinated in ginger and sea salt, coated in light starch, double-fried to golden shatter, and tossed in house gochujang garlic reduction with crushed peanuts.",
                        "price": "₩21,000",
                        "currency": "KRW",
                        "dietary_tags": "Signature Item, Double-Fried",
                        "spicy_level": 2,
                        "is_featured": True,
                        "sort_order": 1
                    },
                    {
                        "name": "Honey Butter Crunch Chicken",
                        "korean_name": "허니버터 치킨",
                        "slug": "honey-butter-chicken",
                        "short_description": "Boneless crispy tenders dusted with sweet honey, roasted garlic butter & savory parmesan.",
                        "description": "Juicy boneless thigh pieces fried extra crispy and tossed in velvety melted honey butter glaze with toasted garlic chips and fine savory cheese powder.",
                        "price": "₩22,000",
                        "currency": "KRW",
                        "dietary_tags": "Crowd Favorite, Sweet & Savory",
                        "spicy_level": 0,
                        "is_featured": True,
                        "sort_order": 2
                    },
                    {
                        "name": "Volcano Fire Buldak Wings",
                        "korean_name": "불닭 윙",
                        "slug": "volcano-buldak-wings",
                        "short_description": "Extreme spicy glazed wings topped with charred jalapeño and sesame seeds.",
                        "description": "For serious spice lovers. Double-fried chicken wings drenched in fiery ghost pepper and gochujang paste, caramelized over open flame.",
                        "price": "₩20,000",
                        "currency": "KRW",
                        "dietary_tags": "Ultra Spicy Challenge",
                        "spicy_level": 3,
                        "is_featured": False,
                        "sort_order": 3
                    }
                ]
            },
            {
                "name": "Sizzling Rice & Bowls",
                "korean_name": "돌솥 & 덮밥",
                "slug": "rice-bowls",
                "description": "Crispy scorched rice and rich savory meats served in sizzling stone vessels.",
                "sort_order": 3,
                "items": [
                    {
                        "name": "Sizzling Dolsot Bibimbap",
                        "korean_name": "돌솥 비빔밥",
                        "slug": "dolsot-bibimbap",
                        "short_description": "Hot stone pot rice with marinated ribeye beef, 6 mountain vegetables & raw egg yolk.",
                        "description": "Served piping hot in a heavy volcanic stone bowl where the bottom layer crisps into golden nurungji. Topped with seasoned beef, zucchini, shiitake, fernbrake, and spicy chili sauce.",
                        "price": "₩16,000",
                        "currency": "KRW",
                        "dietary_tags": "Vegetarian Optional, Gluten-Free",
                        "spicy_level": 1,
                        "is_featured": True,
                        "sort_order": 1
                    },
                    {
                        "name": "Spicy Pork Kimchi Bokkeumbap",
                        "korean_name": "김치볶음밥",
                        "slug": "kimchi-bokkeumbap",
                        "short_description": "Wok-fried rice with aged sour kimchi, pork belly, melted cheese & fried egg.",
                        "description": "Smoky wok-charred rice tossed with aged kimchi, thick pork belly cubes, scallion oil, and wrapped in a ring of melted mozzarella.",
                        "price": "₩14,000",
                        "currency": "KRW",
                        "dietary_tags": "Pork, Sizzling Plate",
                        "spicy_level": 2,
                        "is_featured": False,
                        "sort_order": 2
                    }
                ]
            },
            {
                "name": "Noodles & Midnight Soups",
                "korean_name": "면 & 찌개",
                "slug": "noodles-soups",
                "description": "Steaming, restorative broths and noodles built to accompany late-night drinks.",
                "sort_order": 4,
                "items": [
                    {
                        "name": "Seoul Army Base Stew (Budae Jjigae)",
                        "korean_name": "부대찌개",
                        "slug": "budae-jjigae",
                        "short_description": "Spicy bubbling stew with ramen noodles, spam, sausage, kimchi & American cheese.",
                        "description": "The legendary post-war fusion stew bubbling tableside. Rich spicy anchovy-beef broth loaded with spam, sausages, rice cakes, enoki mushrooms, ramen noodles, and melted cheddar.",
                        "price": "₩26,000",
                        "currency": "KRW",
                        "dietary_tags": "Sharable for 2-3, Pork",
                        "spicy_level": 2,
                        "is_featured": True,
                        "sort_order": 1
                    },
                    {
                        "name": "Spicy Seafood Jjamppong",
                        "korean_name": "해물 짬뽕",
                        "slug": "seafood-jjamppong",
                        "short_description": "Fiery wok-smoked red soup with fresh squid, mussels, prawns & chewy wheat noodles.",
                        "description": "Deep wok hei red broth infused with chili oil, garlic, and fresh sea harvest from the coast, served over handmade bouncy noodles.",
                        "price": "₩17,000",
                        "currency": "KRW",
                        "dietary_tags": "Seafood, Spicy Wok",
                        "spicy_level": 2,
                        "is_featured": False,
                        "sort_order": 2
                    }
                ]
            },
            {
                "name": "Drinks & Soju Cocktails",
                "korean_name": "소주 & 음료",
                "slug": "drinks",
                "description": "Ice-cold Korean beers, artisanal makgeolli, and refreshing flavored sojus.",
                "sort_order": 5,
                "items": [
                    {
                        "name": "Grapefruit Green Tea Soju Pitcher",
                        "korean_name": "자몽 소주 칵테일",
                        "slug": "grapefruit-soju",
                        "short_description": "Freshly squeezed ruby grapefruit, iced green tea & Chamisul soju.",
                        "description": "Crisp, tart, and refreshing street pocha cocktail served in frosted carafes with mint sprigs.",
                        "price": "₩13,000",
                        "currency": "KRW",
                        "dietary_tags": "Cocktail, 12% ABV",
                        "spicy_level": 0,
                        "is_featured": True,
                        "sort_order": 1
                    },
                    {
                        "name": "Seoul Draft Beer (Terra / Cass)",
                        "korean_name": "생맥주",
                        "slug": "draft-beer",
                        "short_description": "Ice-cold 500ml draft lager with dense white foam collar.",
                        "description": "Ultra-crisp Korean lager poured straight from the frozen tap—the indispensable partner for fried chicken.",
                        "price": "₩6,000",
                        "currency": "KRW",
                        "dietary_tags": "Cold Draft, 4.5% ABV",
                        "spicy_level": 0,
                        "is_featured": False,
                        "sort_order": 2
                    }
                ]
            }
        ]

        for cat_data in categories_data:
            items_data = cat_data.pop('items')
            cat = MenuCategory.objects.create(**cat_data)
            for itm in items_data:
                MenuItem.objects.create(category=cat, **itm)

        self.stdout.write(self.style.SUCCESS("Menu Categories and Dishes seeded."))

        # 6. Dining Experiences
        DiningExperience.objects.all().delete()
        experiences_data = [
            {
                "title": "Midnight Pocha Feast",
                "subtitle": "The ultimate Hongdae street food sharing table",
                "description": "A vibrant feast featuring Yangnyeom fried chicken, Rose tteokbokki, crispy mandu, army stew, and a tower of cold Korean draft beer or fruit soju.",
                "capacity": "4 to 8 Friends",
                "timing": "Daily | 18:00 – Late",
                "price": "₩42,000 / person",
                "features": ["3 Signature Street Dishes", "Double-Fried Chicken Platter", "Soju / Draft Beer Included", "Guaranteed Metal Table"],
                "sort_order": 1
            },
            {
                "title": "Late Night Soju & Anju Tasting",
                "subtitle": "Discover Korean drinking bites & artisanal spirits",
                "description": "Guided tasting of 4 rare Korean spirits including craft unpasteurized makgeolli and small-batch distilled soju paired with spicy street anju snacks.",
                "capacity": "2 to 6 Guests",
                "timing": "Late Night | 21:30 & 23:30",
                "price": "₩55,000 / person",
                "features": ["4 Craft Korean Spirits", "Paired Sizzling Street Anju", "Soju Culture Guide", "Late-Night Priority Seating"],
                "sort_order": 2
            },
            {
                "title": "Chimaek VIP Party (Chicken & Beer)",
                "subtitle": "Endless fried chicken, curly fries, and cold draft",
                "description": "The quintessential Korean chimaek experience. 3 flavors of crispy double-fried chicken with pickled radishes, seasoned fries, and unlimited draft taps.",
                "capacity": "6 to 14 People",
                "timing": "Evening & Midnight",
                "price": "₩38,000 / person",
                "features": ["3 Chicken Flavor Towers", "Pickled Radish & Dips", "Unlimited Tap Beer (90 min)", "Private Neon Booth"],
                "sort_order": 3
            }
        ]
        for exp in experiences_data:
            DiningExperience.objects.create(**exp)
        self.stdout.write(self.style.SUCCESS(f"Created {len(experiences_data)} Dining Experiences."))

        # 7. Team Members
        TeamMember.objects.all().delete()
        team_data = [
            {
                "name": "Min-jun Park",
                "korean_name": "박민준",
                "role": "Executive Street Food Chef",
                "bio": "Born in Gwangjang Market where his grandmother ran a legendary bindaetteok stall, Min-jun spent 15 years mastering Seoul's iconic street recipes before establishing Seoul Street Pocha.",
                "quote": "Real Korean street food doesn't hide behind pretension. It hits you with heat, soul, and honesty.",
                "sort_order": 1
            },
            {
                "name": "Ji-won Kim",
                "korean_name": "김지원",
                "role": "Master Fry & Wok Specialist",
                "bio": "Trained in the bustling late-night kitchens of Euljiro, Ji-won is the master behind our double-fried crunch and searing wok hei noodles.",
                "quote": "If the oil temperature drops by even 5 degrees, the crunch is lost. Precision is our craft.",
                "sort_order": 2
            },
            {
                "name": "Dong-hyun Lee",
                "korean_name": "이동현",
                "role": "Night General Manager & Soju Curator",
                "bio": "A veteran of Hongdae's music and nightlife scene, Dong-hyun curates our spirits, craft brews, and high-energy music vibe every night.",
                "quote": "A pocha is where Seoul comes alive after midnight. Everyone is family at our round tables.",
                "sort_order": 3
            }
        ]
        for mem in team_data:
            TeamMember.objects.create(**mem)
        self.stdout.write(self.style.SUCCESS("Team members created."))

        # 8. Testimonials
        Testimonial.objects.all().delete()
        testimonials_data = [
            {
                "author": "Seoul Food Guide 2025",
                "quote": "The honey butter chicken and rose tteokbokki deliver the most addictive late-night crunch in Hongdae. Unrivaled pocha energy.",
                "source": "Top 10 Late-Night Seoul Destinations",
                "rating": 5,
                "sort_order": 1
            },
            {
                "author": "Marcus Vance",
                "quote": "Felt like stepping directly into an energetic K-drama street scene. The food was searing hot, spicy, and the grapefruit soju was dangerously good.",
                "source": "Travel & Leisure Asia",
                "rating": 5,
                "sort_order": 2
            },
            {
                "author": "So-hee Choi",
                "quote": "Authentic Gwangjang market flavor with a modern Hongdae nightlife pulse. Best army base stew in town after midnight.",
                "source": "Hongik University Student Guild",
                "rating": 5,
                "sort_order": 3
            }
        ]
        for t in testimonials_data:
            Testimonial.objects.create(**t)
        self.stdout.write(self.style.SUCCESS("Testimonials created."))

        # 9. Gallery Items
        GalleryItem.objects.all().delete()
        gallery_data = [
            {"title": "Neon Storefront at Midnight", "category": "exterior", "image_url": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80", "caption": "Glowing magenta and cyan signage in the heart of Hongdae", "sort_order": 1},
            {"title": "Seoul Yangnyeom Fried Chicken", "category": "food", "image_url": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1200&q=80", "caption": "Double-fried crispy chicken tossed in sweet spicy glaze", "sort_order": 2},
            {"title": "Main Pocha Dining Salon", "category": "interior", "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", "caption": "Classic round stainless steel tables and vibrant neon fixtures", "sort_order": 3},
            {"title": "Sizzling Wok Stir Fry", "category": "kitchen", "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80", "caption": "High heat wok hei flames cooking midnight noodles", "sort_order": 4},
            {"title": "Spicy Rose Tteokbokki", "category": "food", "image_url": "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=1200&q=80", "caption": "Chewy rice cakes with spicy gochujang cream & melted cheese", "sort_order": 5},
            {"title": "Late Night Soju Table Spread", "category": "events", "image_url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80", "caption": "Midnight toast with friends over bubbling stews and cold drinks", "sort_order": 6}
        ]
        for g in gallery_data:
            GalleryItem.objects.create(**g)
        self.stdout.write(self.style.SUCCESS("Gallery items created."))

        # 10. Sample Reservation
        Reservation.objects.all().delete()
        sample_res = [
            {
                "full_name": "Chloe Dupont",
                "phone": "+82 10 9876 5432",
                "email": "chloe.dupont@seoulvibes.com",
                "preferred_date": "2026-11-20",
                "preferred_time": "21:00",
                "guests": 6,
                "occasion": "Birthday Celebration",
                "selected_experience": "Midnight Pocha Feast",
                "special_requests": "Requesting a table close to the neon wall art. Extra spicy fried chicken please!",
                "status": "confirmed"
            },
            {
                "full_name": "Tae-hyung Kang",
                "phone": "+82 10 4455 6677",
                "email": "th.kang@mapo-tech.kr",
                "preferred_date": "2026-11-22",
                "preferred_time": "20:00",
                "guests": 4,
                "occasion": "Team Dinner",
                "selected_experience": "Chimaek VIP Party",
                "special_requests": "Non-alcoholic beer options for 1 guest.",
                "status": "pending"
            }
        ]
        for r in sample_res:
            Reservation.objects.create(**r)
        self.stdout.write(self.style.SUCCESS("Sample reservations created."))

        self.stdout.write(self.style.SUCCESS("Seoul Street database successfully initialized!"))
