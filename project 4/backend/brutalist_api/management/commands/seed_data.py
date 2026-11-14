from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date, timedelta
from brutalist_api.models import (
    Restaurant, WebsiteSection, MenuCategory, MenuItem,
    VirtualTourViewpoint, PhilosophyPillar, CulinaryProcessStage,
    DiningExperiencePanel, GalleryImage, Testimonial, Reservation, FAQ
)

class Command(BaseCommand):
    help = 'Seeds complete architectural brutalist data for MONOLITH restaurant'

    def handle(self, *args, **options):
        self.stdout.write("Initializing Monolith Brutalist Seed Process...")

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
                'name': "MONOLITH // BRUTALIST DINING",
                'slug': "monolith-brutalist",
                'tagline': "Raw Architecture. Bold Cuisine. Uncompromising Experience.",
                'short_description': "An exploration of contemporary cuisine, bold ingredients, and architecture-inspired dining housed inside monolithic board-formed concrete.",
                'long_description': "Space is our canvas. Food is our medium. Monolith strips away superfluous ornament to celebrate elemental purity: raw concrete, blackened steel, open wood embers, and hyper-seasonal terroir.",
                'phone': "+1 (212) 555-0198",
                'email': "concierge@monolith-dining.com",
                'address': "480 Industrial Avenue, District 09",
                'city': "New York, NY 10014",
                'country': "United States",
                'latitude': 40.7128,
                'longitude': -74.0060,
                'coordinates_display': "40.7128° N, 74.0060° W — SECTOR 09",
                'opening_hours_summary': "TUE — SUN / 17:30 — 00:00 (CLOSED MON)",
                'hero_eyebrow': "CONTEMPORARY DINING / EST. 2021",
                'hero_heading_line1': "FOOD.",
                'hero_heading_line2': "FORM.",
                'hero_heading_line3': "EXPRESSION.",
                'hero_supporting_text': "An exploration of contemporary cuisine, bold ingredients, and architecture-inspired dining. Raw materials elevated through discipline and fire.",
                'hero_cta_primary': "EXPLORE THE MENU",
                'hero_cta_secondary': "DISCOVER OUR SPACE",
                'primary_color': "#B8B5AD",
                'accent_color': "#F05A28",
                'dark_color': "#20211F",
                'tables_capacity': 54,
                'daily_menu_courses': 12,
                'curated_vintages': 420,
                'is_active': True,
            }
        )

        # 3. Website Sections (15 Editorial Sections)
        sections_data = [
            {
                'key': 'hero',
                'order': 1,
                'eyebrow': "CONTEMPORARY DINING / EST. 2021",
                'title': "FOOD. FORM. EXPRESSION.",
                'subtitle': "An exploration of contemporary cuisine, bold ingredients, and architecture-inspired dining.",
                'custom': {
                    'cta_primary': "EXPLORE THE MENU",
                    'cta_secondary': "DISCOVER OUR SPACE",
                    'cta_target_primary': "#menu",
                    'cta_target_secondary': "#tour",
                    'coordinates': "40.7128° N, 74.0060° W — SECTOR 09",
                    'status_indicator': "CURRENT STATUS: DINING ROOM OPEN // RESERVATIONS ACTIVE"
                }
            },
            {
                'key': 'intro',
                'order': 2,
                'eyebrow': "EDITORIAL INTRODUCTION",
                'title': "NOT JUST A PLACE TO EAT.",
                'subtitle': "A sensory intersection of architectural weight and culinary levity.",
                'custom': {
                    'paragraph_1': "Monolith was conceived as an antithesis to ephemeral dining trends. We stripped away decorative distraction to reveal the tension between cast-in-place concrete and fire-rendered flavor.",
                    'paragraph_2': "Every plate is treated as a sculptural proposition: stark contrasts in texture, unvarnished natural acids, and charcoal minerality, orchestrated inside an acoustic sanctuary of board-formed concrete.",
                    'badge': "ARCHITECTURAL MANIFESTO // 01"
                }
            },
            {
                'key': 'philosophy',
                'order': 3,
                'eyebrow': "OUR PHILOSOPHY",
                'title': "WE BELIEVE IN THE POWER OF SIMPLICITY.",
                'subtitle': "Three pillars form the structural bedrock of our culinary identity.",
                'custom': {}
            },
            {
                'key': 'signatures',
                'order': 4,
                'eyebrow': "CURATED HIGHLIGHTS",
                'title': "THE SIGNATURES.",
                'subtitle': "Four defining dishes that encapsulate our tension between raw materiality and refined execution.",
                'custom': {
                    'view_all_cta': "BROWSE COMPLETE REPERTOIRE"
                }
            },
            {
                'key': 'menu_explorer',
                'order': 5,
                'eyebrow': "MENU EXPLORER",
                'title': "THE MENU IS AN OPEN EXPERIMENT.",
                'subtitle': "Seasonally shifting compositions categorized by elemental discipline.",
                'custom': {
                    'tasting_menu_price': "$195 PER GUEST",
                    'pairing_price': "$120 CURATED VINTAGES"
                }
            },
            {
                'key': 'culinary_process',
                'order': 6,
                'eyebrow': "CULINARY PROCESS",
                'title': "FROM RAW TO REFINED.",
                'subtitle': "An uncompromising four-stage methodology tracing origin to palate.",
                'custom': {}
            },
            {
                'key': 'architecture',
                'order': 7,
                'eyebrow': "ARCHITECTURAL FORM",
                'title': "SPACE IS PART OF THE EXPERIENCE.",
                'subtitle': "Raw concrete, charred Japanese cedar, and blackened steel create a sanctuary of acoustic stillness.",
                'custom': {
                    'architect_credit': "DESIGNED IN COLLABORATION WITH ATELIER BRUTAL // 2021",
                    'material_tags': ["Board-Formed Concrete", "Blackened Steel", "Raw Basalt", "Charred Cedar"]
                }
            },
            {
                'key': 'virtual_tour',
                'order': 8,
                'eyebrow': "SPATIAL EXPLORATION",
                'title': "STEP INSIDE.",
                'subtitle': "Interact with 5 architectural viewpoints rendered in 3D WebGL and high-resolution spatial capture.",
                'custom': {}
            },
            {
                'key': 'dining_experience',
                'order': 9,
                'eyebrow': "THE EXPERIENCE",
                'title': "MORE THAN A MEAL.",
                'subtitle': "Three immersive dimensions framing every evening at Monolith.",
                'custom': {}
            },
            {
                'key': 'gallery',
                'order': 10,
                'eyebrow': "THE ARCHIVE",
                'title': "VISUAL RECORD.",
                'subtitle': "A stark monochrome and high-chroma record of dishes, spatial geometry, and textures.",
                'custom': {}
            },
            {
                'key': 'testimonials',
                'order': 11,
                'eyebrow': "CRITICAL ACCLAIM",
                'title': "WORDS FROM THE TABLE.",
                'subtitle': "Reflections from architectural theorists, culinary journalists, and discerning patrons.",
                'custom': {}
            },
            {
                'key': 'reservation',
                'order': 12,
                'eyebrow': "RESERVATIONS",
                'title': "YOUR TABLE IS WAITING.",
                'subtitle': "Reservations unlock 30 days in advance at 09:00 EST. Walk-ins accommodated at the steel bar.",
                'custom': {
                    'notice': "For parties of 6 or more, or private atelier bookings, please contact concierge directly."
                }
            },
            {
                'key': 'location_contact',
                'order': 13,
                'eyebrow': "LOCATION & HOURS",
                'title': "FIND YOUR WAY HERE.",
                'subtitle': "Located at the western periphery of District 09 in a repurposed 1968 industrial concrete warehouse.",
                'custom': {}
            },
            {
                'key': 'faq',
                'order': 14,
                'eyebrow': "INFORMATION",
                'title': "FREQUENT INQUIRIES.",
                'subtitle': "Essential answers regarding dress code, dietary accommodations, and our dining philosophy.",
                'custom': {}
            },
            {
                'key': 'footer',
                'order': 15,
                'eyebrow': "COLOPHON",
                'title': "GOOD FOOD. STRONG FORMS. LASTING IMPRESSIONS.",
                'subtitle': "Monolith is committed to carbon-neutral sourcing and architecture-led community initiatives.",
                'custom': {
                    'copyright': "© 2026 MONOLITH RESTAURANT GROUP. ALL RIGHTS RESERVED.",
                    'coordinates': "40.7128° N, 74.0060° W"
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
                'title': 'INGREDIENTS',
                'statement': 'Respect the raw material. Minimal intervention, maximum expression.',
                'desc': 'We partner directly with regenerative farms and sea forages that harvest according to moon cycles. We do not mask blemishes; we celebrate the uncompromising purity of the ingredient.',
                'order': 1
            },
            {
                'num': '02',
                'title': 'TECHNIQUE',
                'statement': 'Discipline over decoration. Pure heat, time, smoke, and salt.',
                'desc': 'Our hearth relies solely on aged oak and binchotan embers. Modern culinary science meets ancient ferments to evoke deep primal umami without artificial artifice.',
                'order': 2
            },
            {
                'num': '03',
                'title': 'EXPERIENCE',
                'statement': 'Total sensory immersion. Architecture, sound, and flavor in brutal harmony.',
                'desc': 'From acoustic dampening concrete to custom-cast stoneware, every dimension of the dining room is calculated to heighten focus on the dish and the present moment.',
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

        # 5. Menu Categories (6 categories)
        categories_data = [
            {'name': 'Raw Elements', 'slug': 'starters', 'desc': 'Unheated wild foraged crudos, cold extractions, and mineral broths.', 'order': 1},
            {'name': 'Hearth & Embers', 'slug': 'hearth', 'desc': 'Dishes forged in the open 800°C wood fire hearth.', 'order': 2},
            {'name': 'Monolithic Cuts', 'slug': 'mains', 'desc': 'Dry-aged heritage proteins carved with architectural precision.', 'order': 3},
            {'name': 'Earth & Soil', 'slug': 'vegetables', 'desc': 'Subterranean tubers, salt-baked roots, and wild fungi.', 'order': 4},
            {'name': 'Minimalist Desserts', 'slug': 'desserts', 'desc': 'Low-sugar expressions exploring temperature, bitter cacao, and smoke.', 'order': 5},
            {'name': 'Ferments & Libations', 'slug': 'beverages', 'desc': 'House botanical ferments, pet-nats, and structural mineral cocktails.', 'order': 6},
        ]
        cat_objs = {}
        for c in categories_data:
            obj, _ = MenuCategory.objects.update_or_create(
                slug=c['slug'],
                defaults={'name': c['name'], 'description': c['desc'], 'display_order': c['order'], 'is_active': True}
            )
            cat_objs[c['slug']] = obj
        self.stdout.write(self.style.SUCCESS("MenuCategories seeded."))

        # 6. Menu Items (Curated dishes with high-quality imagery)
        menu_items_data = [
            # Starters
            {
                'cat': 'starters',
                'name': 'Scallop on Chilled Basalt',
                'slug': 'scallop-chilled-basalt',
                'price': 28.00,
                'short': 'Hokkaido diver scallop, smoked kelp vinegar, fermented white currant, sea grapes.',
                'desc': 'Hand-harvested Hokkaido scallops served sashimi-grade over volcanic basalt stone chilled to -5°C. Dressed in 2-year aged white kelp vinegar and garnished with foraged Maine sea grapes.',
                'dietary': ['GF', 'SF'],
                'allergens': 'Mollusks',
                'featured': True,
                'order': 1,
                'img': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'starters',
                'name': 'Charred Bone Marrow & Rye',
                'slug': 'bone-marrow-rye',
                'price': 24.00,
                'short': 'Split beef femur roasted over oak coals, caperberry dust, 72-hour sourdough crisp.',
                'desc': 'Grass-fed beef marrow blasted over oak embers until molten, served with acidic caperberry salt and razor-thin toasted rye wafers.',
                'dietary': ['DF'],
                'allergens': 'Gluten',
                'featured': False,
                'order': 2,
                'img': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'starters',
                'name': 'Kohlrabi & Smoked Trout Roe',
                'slug': 'kohlrabi-trout-roe',
                'price': 22.00,
                'short': 'Shaved heirloom kohlrabi ribbon, beechwood smoked trout roe, elderflower emulsion.',
                'desc': 'Delicate spiraled ribbons of heirloom kohlrabi cured in pine salt, bathed in light elderflower oil and crowned with cold-smoked steelhead roe.',
                'dietary': ['GF'],
                'allergens': 'Fish',
                'featured': False,
                'order': 3,
                'img': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'
            },
            # Hearth & Embers
            {
                'cat': 'hearth',
                'name': 'Ember-Roasted Maitake',
                'slug': 'ember-roasted-maitake',
                'price': 32.00,
                'short': 'Cluster maitake cooked directly in glowing ash, black garlic tare, toasted buckwheat.',
                'desc': 'Wild maitake mushrooms plunged into glowing binchotan hardwood ash, creating deep caramelized edges. Glazed with fermented black garlic reduction.',
                'dietary': ['VG', 'GF', 'DF'],
                'allergens': 'Soy',
                'featured': True,
                'order': 4,
                'img': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'hearth',
                'name': 'Octopus Tentacle in Ash Embers',
                'slug': 'octopus-ash-embers',
                'price': 38.00,
                'short': 'Galician day-boat octopus, smoked paprika ash glaze, potato emulsion.',
                'desc': 'Slow-braised Spanish octopus finished over roaring oak logs to achieve a glass-like crisp crust with a tender center, accompanied by smoked Yukon emulsion.',
                'dietary': ['GF'],
                'allergens': 'Mollusks',
                'featured': False,
                'order': 5,
                'img': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80'
            },
            # Monolithic Cuts (Mains)
            {
                'cat': 'mains',
                'name': '60-Day Dry-Aged Ribeye Monolith',
                'slug': '60-day-ribeye-monolith',
                'price': 76.00,
                'short': '14oz bone-in prime beef, tallow brushed, smoked Maldon salt, beef jus.',
                'desc': 'Black Angus beef dry-aged in our cellar for 60 days beside blocks of Himalayan salt. Seared at 900°F over binchotan wood to create a brutalist char.',
                'dietary': ['GF', 'DF'],
                'allergens': 'None',
                'featured': True,
                'order': 6,
                'img': 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'mains',
                'name': 'Blackened Duck Breast & Damson',
                'slug': 'duck-breast-damson',
                'price': 52.00,
                'short': 'Dry-hung Liberty duck breast, fermented damson plum glaze, scorched leek ash.',
                'desc': 'Hung for 14 days to concentrate flavor. Crisped until crackling and coated in tart fermented wild plum reduction.',
                'dietary': ['GF', 'DF'],
                'allergens': 'None',
                'featured': False,
                'order': 7,
                'img': 'https://images.unsplash.com/photo-1514944298352-7b243452c9d1?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'mains',
                'name': 'Salt-Crusted Arctic Char',
                'slug': 'salt-crusted-char',
                'price': 46.00,
                'short': 'Icelandic char baked inside grey sea salt dome, spruce tip oil, charred fennel.',
                'desc': 'Whole sustainable char encased in grey Atlantic sea salt and cracked tableside with an architectural mallet, preserving maximum moisture and herbal essence.',
                'dietary': ['GF'],
                'allergens': 'Fish',
                'featured': False,
                'order': 8,
                'img': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80'
            },
            # Earth & Soil
            {
                'cat': 'vegetables',
                'name': 'Salt-Baked Sunchokes & Black Truffle',
                'slug': 'sunchokes-black-truffle',
                'price': 26.00,
                'short': 'Clay-baked Jerusalem artichokes, Périgord black truffle emulsion, hazelnut crisp.',
                'desc': 'Sunchokes baked in red clay shells until velvety, then shattered open and dressed with shaved black truffles from Umbria.',
                'dietary': ['VG', 'GF'],
                'allergens': 'Tree Nuts',
                'featured': False,
                'order': 9,
                'img': 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'vegetables',
                'name': 'Charred Hispi Cabbage & Yeast Broth',
                'slug': 'charred-hispi-cabbage',
                'price': 21.00,
                'short': 'Pointed cabbage blackened over coals, brown butter roasted yeast broth, mustard frill.',
                'desc': 'Sweet hispi cabbage blistered directly on hot coals, served swimming in a nutty toasted yeast and brown butter dashi.',
                'dietary': ['V', 'GF'],
                'allergens': 'Dairy',
                'featured': False,
                'order': 10,
                'img': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
            },
            # Minimalist Desserts
            {
                'cat': 'desserts',
                'name': 'Smoked Chocolate & Sea Salt Concrete',
                'slug': 'smoked-chocolate-concrete',
                'price': 18.00,
                'short': '74% Chuao dark chocolate ganache, smoked birch oil, volcanic black sea salt.',
                'desc': 'Formed into a sharp geometric cuboid mimicking concrete blocks. Intense bitterness tempered by smoke and crunchy pyramid salt.',
                'dietary': ['VG', 'GF'],
                'allergens': 'Soy',
                'featured': True,
                'order': 11,
                'img': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'desserts',
                'name': 'Burnt Hay Ice Cream & Birch Syrup',
                'slug': 'burnt-hay-ice-cream',
                'price': 16.00,
                'short': 'Jersey cream infused with charred prairie grass, reduced birch syrup, rye crumble.',
                'desc': 'Grass hay torched and infused into rich pasture milk, creating notes of toasted tea and warm stone, finished with dark woodsy birch reduction.',
                'dietary': ['V'],
                'allergens': 'Dairy, Gluten',
                'featured': False,
                'order': 12,
                'img': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80'
            },
            # Beverages
            {
                'cat': 'beverages',
                'name': 'Monolith Old Fashioned',
                'slug': 'monolith-old-fashioned',
                'price': 22.00,
                'short': 'Overproof rye whiskey, charred cedar syrup, aromatic wood bitters, large hand-carved ice cube.',
                'desc': 'Crafted in blackened steel mixing vessels. Smoked with cedar shavings tableside for an unforgettable aroma.',
                'dietary': ['VG', 'GF'],
                'allergens': 'None',
                'featured': False,
                'order': 13,
                'img': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
            },
            {
                'cat': 'beverages',
                'name': 'Fermented Pine Needle Pet-Nat',
                'slug': 'pine-needle-pet-nat',
                'price': 16.00,
                'short': 'Wild-harvested pine needles, green apple ferment, natural effervescence (Zero Proof).',
                'desc': 'Naturally carbonated wild ferment with brisk pine resin aromatics and refreshing citrusy acidity.',
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

        # 7. Virtual Tour Viewpoints (5 Viewpoints)
        viewpoints_data = [
            {
                'title': 'Exterior Concrete Facade',
                'slug': 'exterior-facade',
                'space': 'Monolithic West Facade',
                'desc': 'Cast-in-place board-formed concrete slabs with deep shadow reveals, illuminated by low-angle steel light fixtures.',
                'materials': 'Board-formed concrete, blackened steel reveals, crushed basalt gravel',
                'camera_pos': [0, 2.5, 9],
                'camera_target': [0, 1.2, 0],
                'hotspot_title': 'Board-Formed Slabs',
                'hotspot_detail': 'Raw timber grain impressions preserved in structural 4000 PSI concrete.',
                'order': 1,
                'img': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Entrance Portal & Vestibule',
                'slug': 'entrance-portal',
                'space': 'Acoustic Decompression Portal',
                'desc': 'A transition corridor engineered to deaden exterior street acoustics through heavy acoustic felt and dark charcoal stone.',
                'materials': 'Charred oak panels, sound-dampening acoustic felt, blackened steel threshold',
                'camera_pos': [-3, 1.8, 5],
                'camera_target': [0, 1.5, 0],
                'hotspot_title': 'Pivot Steel Door',
                'hotspot_detail': 'Counter-weighted 900-pound solid steel portal opening on custom bronze bearings.',
                'order': 2,
                'img': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Main Concrete Dining Hall',
                'slug': 'main-dining-hall',
                'space': 'Central Monolith Hall',
                'desc': 'The core dining hall featuring high ceilings, monolithic columns, warm downlighting, and custom tables carved from basalt monoliths.',
                'materials': 'Raw concrete columns, honed basalt stone tables, saddle leather benches',
                'camera_pos': [0, 2.0, 4.5],
                'camera_target': [0, 1.0, -1],
                'hotspot_title': 'Basalt Monolith Tables',
                'hotspot_detail': 'Individually quarried stone slabs weighing over 1,200 lbs each.',
                'order': 3,
                'img': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Industrial Blackened Steel Bar',
                'slug': 'industrial-steel-bar',
                'space': 'District 09 Beverage Laboratory',
                'desc': 'A 40-foot seamless bar fabricated from cold-rolled steel, housing our collection of rare botanical distillates and wild ferments.',
                'materials': 'Cold-rolled waxed steel, brushed brass footrail, smoked fluted glass',
                'camera_pos': [4, 1.5, 3],
                'camera_target': [1, 1.2, -1],
                'hotspot_title': 'Continuous Steel Monolith',
                'hotspot_detail': 'Continuous seamless counter surface patinated with natural beeswax.',
                'order': 4,
                'img': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=80'
            },
            {
                'title': 'Open Fire Hearth Kitchen',
                'slug': 'open-fire-kitchen',
                'space': 'The Thermal Epicenter',
                'desc': 'A completely open culinary theatre dominated by a 12-foot wood-fired hearth burning aged white oak at 800°C.',
                'materials': 'Refractory firebrick, stainless steel pass, blackened steel elevation rig',
                'camera_pos': [0, 1.8, 2.8],
                'camera_target': [0, 1.2, -3],
                'hotspot_title': '800°C Ember Rig',
                'hotspot_detail': 'Custom crank-operated grill elevators controlling precise ember distance.',
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

        # 8. Culinary Process Stages (4 stages)
        stages_data = [
            {
                'num': '01',
                'title': 'IDEA & FORM',
                'subtitle': 'Architectural sketching & composition',
                'desc': 'Every course begins as a schematic sketch exploring physical balance, temperature contrast, and the relationship between negative space and dense flavor.',
                'img': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                'order': 1
            },
            {
                'num': '02',
                'title': 'RAW PROVENANCE',
                'subtitle': 'Direct partnership with terroir',
                'desc': 'We bypass conventional wholesale markets. Seafood is hand-harvested by divers; heritage tubers and grains are cultivated in regenerative living soils.',
                'img': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
                'order': 2
            },
            {
                'num': '03',
                'title': 'FIRE & TIME',
                'subtitle': 'Elemental heat and patience',
                'desc': 'No gas burners exist in our kitchen. Cooking is executed exclusively over white oak embers, monitored through thermal instincts honed over decades.',
                'img': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                'order': 3
            },
            {
                'num': '04',
                'title': 'THE PLATING',
                'subtitle': 'Sculptural presentation on basalt',
                'desc': 'Plated with razor discipline onto custom stoneware and basalt shards. Every element serves an absolute purpose; zero garnish is decorative.',
                'img': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
                'order': 4
            }
        ]
        CulinaryProcessStage.objects.all().delete()
        for s in stages_data:
            CulinaryProcessStage.objects.create(
                stage_number=s['num'],
                title=s['title'],
                subtitle=s['subtitle'],
                description=s['desc'],
                image_url=s['img'],
                display_order=s['order']
            )
        self.stdout.write(self.style.SUCCESS("CulinaryProcessStages seeded (4 stages)."))

        # 9. Dining Experience Panels (3 panels)
        panels_data = [
            {
                'title': 'THE ATMOSPHERE',
                'slug': 'the-atmosphere',
                'subtitle': 'Acoustic stillness and monolithic volume',
                'desc': 'Designed to strip away metropolitan sensory fatigue. Thick board-formed concrete absorbs background hum, creating an intimate soundscape where conversations and hearth crackle thrive.',
                'badge': 'SPATIAL PROPORTIONS',
                'img': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
                'order': 1
            },
            {
                'title': 'THE SERVICE',
                'slug': 'the-service',
                'subtitle': 'Choreographed, unpretentious hospitality',
                'desc': 'Our team operates with architectural clarity: attentive without intrusion, deeply knowledgeable regarding micro-producers, and committed to unpretentious warmth.',
                'badge': 'PRECISION STEWARDSHIP',
                'img': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
                'order': 2
            },
            {
                'title': 'THE MOMENT',
                'slug': 'the-moment',
                'subtitle': 'An unhurried progression of twelve courses',
                'desc': 'Dinner at Monolith is structured as a 150-minute unhurried journey. Each course answers the preceding dish, building from bracing mineral acids to deep ember-roasted notes.',
                'badge': '150 MINUTE ARC',
                'img': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
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
            {'title': 'Concrete Cantilever Facade', 'cat': 'exterior', 'caption': 'West entry elevation at dusk', 'img': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'order': 1, 'featured': True},
            {'title': '60-Day Dry-Aged Ribeye', 'cat': 'food', 'caption': 'Carved over basalt slab with marrow glaze', 'img': 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80', 'order': 2, 'featured': True},
            {'title': 'Board-Formed Concrete Grain', 'cat': 'details', 'caption': 'Raw timber grain relief in structural concrete', 'img': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'order': 3, 'featured': False},
            {'title': 'Hokkaido Diver Scallop Crudo', 'cat': 'food', 'caption': 'Smoked kelp vinegar, sea grapes, basalt', 'img': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80', 'order': 4, 'featured': True},
            {'title': 'Main Dining Hall Long View', 'cat': 'interior', 'caption': 'Basalt monolith tables under focused pools of light', 'img': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80', 'order': 5, 'featured': True},
            {'title': '800°C Open Fire Hearth', 'cat': 'details', 'caption': 'White oak logs reduced to radiant coals', 'img': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', 'order': 6, 'featured': False},
            {'title': 'Smoked Chocolate Cuboid', 'cat': 'food', 'caption': 'Brutalist dark chocolate with volcanic salt crystals', 'img': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80', 'order': 7, 'featured': False},
            {'title': 'Blackened Steel Bar Portal', 'cat': 'interior', 'caption': 'District 09 cocktail laboratory', 'img': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80', 'order': 8, 'featured': False},
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
                'name': 'Julian Vance',
                'src': 'Architectural Review International',
                'review': 'Monolith demonstrates that spatial weight and culinary lightness are not mutually exclusive. An extraordinary triumph of brutalist architecture married to peerless wood-fired gastronomy.',
                'rating': 5,
                'date': 'November 2025',
                'order': 1
            },
            {
                'name': 'Elena Rostova',
                'src': 'Global Michelin Guide Chronicle',
                'review': 'The 60-day dry-aged ribeye on basalt and the ember-charred maitake reveal a kitchen of terrifying discipline. Nothing is hidden; everything is amplified.',
                'rating': 5,
                'date': 'January 2026',
                'order': 2
            },
            {
                'name': 'Marcus Sterling',
                'src': 'Design & Gastronomy Quarterly',
                'review': 'Entering through the 900-pound pivot steel door feels like crossing into an acoustic sanctuary. The dining experience of the decade.',
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

        # 12. FAQs (7 questions)
        faqs_data = [
            {
                'q': 'What is the dress code for Monolith?',
                'a': 'We encourage smart, expressive contemporary attire. While formal suits are not required, athletic wear, beachwear, and flip-flops are strictly not permitted in the main dining hall.',
                'order': 1
            },
            {
                'q': 'Can dietary restrictions and allergies be accommodated?',
                'a': 'Yes. We accommodate pescatarian, gluten-free, dairy-free, and nut allergies with 48 hours advance notice. Because of the structure of our wood-fired tasting menu, vegan accommodations require direct coordination with our culinary director.',
                'order': 2
            },
            {
                'q': 'How far in advance can tables be reserved?',
                'a': 'Online reservations open 30 days in advance at 09:00 EST on a rolling daily basis. For larger parties or private dining inquiries, reservations can be scheduled up to 90 days out.',
                'order': 3
            },
            {
                'q': 'Are walk-in guests welcome?',
                'a': 'Our 40-foot blackened steel bar reserves 12 seats exclusively for walk-in guests offering an à la carte selection from our hearth repertoire and bespoke cocktails.',
                'order': 4
            },
            {
                'q': 'What is the cancellation and refund policy?',
                'a': 'Reservations may be modified or cancelled without penalty up to 48 hours prior to seating. Cancellations within 48 hours incur a fee of $75 per guest credited toward a future visit within 90 days.',
                'order': 5
            },
            {
                'q': 'Is private dining available at Monolith?',
                'a': 'Yes. The Concrete Atelier accommodates private parties up to 18 guests with a dedicated wood-fired hearth and private sommeliers. Contact concierge@monolith-dining.com for buyout inquiries.',
                'order': 6
            },
            {
                'q': 'What is your corkage policy?',
                'a': 'Guests may bring up to two 750ml bottles per party of wines not represented on our 420-label cellar list. A corkage fee of $65 per bottle applies.',
                'order': 7
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
        self.stdout.write(self.style.SUCCESS("FAQs seeded (7 items)."))

        # 13. Sample Reservations (2 sample bookings)
        Reservation.objects.all().delete()
        Reservation.objects.create(
            full_name="Alexander Wright",
            email="alexander.wright@arch-studio.com",
            phone="+1 (212) 555-8491",
            reservation_date=date.today() + timedelta(days=5),
            reservation_time="19:30",
            guest_count=4,
            seating_area="Main Concrete Hall",
            message="Celebrating completion of the District 09 architectural pavilion. Requesting table near the columns.",
            status="confirmed"
        )
        Reservation.objects.create(
            full_name="Victoria Chen",
            email="v.chen@modernart.org",
            phone="+1 (415) 555-0922",
            reservation_date=date.today() + timedelta(days=2),
            reservation_time="20:15",
            guest_count=2,
            seating_area="Blackened Steel Bar",
            message="First visit. Excited to experience the ember-roasted maitake.",
            status="pending"
        )
        self.stdout.write(self.style.SUCCESS("Sample Reservations seeded."))

        self.stdout.write(self.style.SUCCESS("✨ Monolith Brutalist Seed Process Finished Successfully! ✨"))
