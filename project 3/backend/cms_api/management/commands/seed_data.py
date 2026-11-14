from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import (
    RestaurantSettings, HomepageSection, MenuCategory, MenuItem,
    TourViewpoint, DiningSpace, CulinaryPillar, TeamMember,
    PrivateEventOffering, GalleryItem, Testimonial, ReservationInquiry, OpeningHour
)
from datetime import date

class Command(BaseCommand):
    help = 'Seeds initial Coastal Mediterranean luxury content for Aura Marina'

    def handle(self, *args, **options):
        self.stdout.write("Seeding database with Coastal Mediterranean luxury data...")

        # 1. Superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@auramarina.it', 'adminpassword123')
            self.stdout.write(self.style.SUCCESS("Created superuser 'admin' with password 'adminpassword123'"))

        # 2. Restaurant Settings
        settings, created = RestaurantSettings.objects.get_or_create(id=1)
        settings.brand_name = "AURA MARINA"
        settings.tagline = "Where the Coast Meets the Table"
        settings.subtitle = "Coastal Mediterranean Luxury Dining & Architectural Sanctuary"
        settings.description = (
            "Perched along the sun-drenched cliffs of Positano, Aura Marina balances centuries "
            "of coastal culinary wisdom with modern architectural minimalism. A celebration of Adriatic catches, "
            "cold-pressed hillside oils, and panoramic sea breezes."
        )
        settings.address_line1 = "Via Panoramica 48, Cliffside Promenade"
        settings.city_region = "Positano, Amalfi Coast 84017, Italy"
        settings.coordinates_display = "40.6281° N, 14.4850° E — Mooring Berth 04"
        settings.phone = "+39 089 875 219"
        settings.email = "reservations@auramarina.it"
        settings.instagram_handle = "@auramarina.amalfi"
        settings.dress_code = "Coastal Elegant / Smart Casual — Footwear required; no beach attire during evening service"
        settings.boat_access_notes = "Private tender boat shuttle provided for yachts anchoring in Positano bay. VHF Ch 72"
        settings.michelin_distinction = "Michelin Guide Selected 2024–2026"
        settings.hero_badge = "SEASON 2026 • MEDITERRANEAN RIVIERA"
        settings.hero_headline = "WHERE THE COAST MEETS THE TABLE"
        settings.hero_subheadline = "Hand-harvested Adriatic crudo, ancient olive groves, and architectural dining suspended above the azure Mediterranean."
        settings.hero_cta_primary = "Reserve a Table"
        settings.hero_cta_secondary = "Explore 3D Tour"
        settings.tables_available_today = 6
        settings.daily_fresh_catches = 8
        settings.years_of_heritage = 38
        settings.save()

        # 3. Homepage Sections
        sections_data = [
            {
                'key': 'hero', 'badge': 'SEASON 2026 • MEDITERRANEAN RIVIERA',
                'title': 'WHERE THE COAST MEETS THE TABLE',
                'subtitle': 'Hand-harvested Adriatic crudo, ancient olive groves, and architectural dining suspended above the azure Mediterranean.',
                'order': 1
            },
            {
                'key': 'story', 'badge': 'ARCHITECTURAL HERITAGE',
                'title': 'CARVED INTO THE CLIFFSIDE',
                'subtitle': 'Founded in 1988 within a restored seaside villa, Aura Marina unites raw limestone geometry with effortless Mediterranean hospitality.',
                'order': 2
            },
            {
                'key': 'tour', 'badge': 'SPATIAL EXPERIENCE',
                'title': 'INTERACTIVE 3D VIRTUAL TOUR',
                'subtitle': 'Step inside our cliffside sanctuary through real-time 3D navigation across our arrival portal, arches, dining terrace, and hearth.',
                'order': 3
            },
            {
                'key': 'dining_spaces', 'badge': 'THE SPACES',
                'title': 'FOUR ATMOSPHERIC SEATING SPACES',
                'subtitle': 'From panoramic cliff terraces to private limestone alcoves, each setting provides a distinct perspective of the Tyrrhenian horizon.',
                'order': 4
            },
            {
                'key': 'signatures', 'badge': "CHEF'S HIGHLIGHTS",
                'title': 'SEASONAL COASTAL SIGNATURES',
                'subtitle': 'Dishes born from morning fishing boats, cold-pressed olive oils, and sea salt harvested from nearby coastal pans.',
                'order': 5
            },
            {
                'key': 'menu', 'badge': 'CULINARY REPERTOIRE',
                'title': 'THE TASTING & A LA CARTE MENU',
                'subtitle': 'An evolving dialogue between traditional southern Italian coastlines and refined contemporary technique.',
                'order': 6
            },
            {
                'key': 'philosophy', 'badge': 'PROVENANCE & CRAFT',
                'title': 'FOUR CORNERSTONES OF OUR CUISINE',
                'subtitle': 'We honor the fisherman, the orchard keeper, and the coastal soil with zero-compromise ingredient traceability.',
                'order': 7
            },
            {
                'key': 'team', 'badge': 'THE MASTERS',
                'title': 'CULINARY LEADERSHIP & SOMMELIERS',
                'subtitle': 'Guided by generations of culinary dedication and international Michelin-pedigreed experience.',
                'order': 8
            },
            {
                'key': 'events', 'badge': 'EXCLUSIVE GATHERINGS',
                'title': 'PRIVATE CELEBRATIONS & VILLA BUYOUTS',
                'subtitle': 'Host unforgettable coastal weddings, intimate anniversaries, and bespoke sommelier dinners perched above the waves.',
                'order': 9
            },
            {
                'key': 'gallery', 'badge': 'VISUAL ESSENCE',
                'title': 'MEDITERRANEAN MOMENTS & TEXTURES',
                'subtitle': 'Limestone arches, golden sunsets, glistening seafood, and the serene rhythm of the sea.',
                'order': 10
            },
            {
                'key': 'testimonials', 'badge': 'ACCLAIM & RECOGNITION',
                'title': 'WHAT OUR GUESTS & CRITICS SAY',
                'subtitle': 'Reflections from international culinary travelers, yacht captains, and leading gastronomic publications.',
                'order': 11
            },
            {
                'key': 'reservation', 'badge': 'TABLE ENQUIRY',
                'title': 'RESERVE YOUR COASTAL EXPERIENCE',
                'subtitle': 'Advance bookings are recommended 14 to 30 days ahead for cliffside terrace seatings.',
                'order': 12
            },
            {
                'key': 'location', 'badge': 'VISIT & ARRIVAL',
                'title': 'CLIFFSIDE PROMENADE, POSITANO',
                'subtitle': 'Arrive via scenic cliff road or our private sea tender directly from your boat mooring in Positano bay.',
                'order': 13
            },
            {
                'key': 'footer', 'badge': 'AURA MARINA',
                'title': 'SUBSCRIBE TO THE COASTAL JOURNAL',
                'subtitle': 'Seasonal menu reveals, guest chef collaborations, and wine harvest reports delivered quarterly.',
                'order': 14
            },
        ]
        for sec in sections_data:
            HomepageSection.objects.update_or_create(
                section_key=sec['key'],
                defaults={
                    'badge': sec['badge'],
                    'title': sec['title'],
                    'subtitle': sec['subtitle'],
                    'sort_order': sec['order'],
                    'is_enabled': True
                }
            )

        # 4. Tour Viewpoints (5 Viewpoints)
        viewpoints_data = [
            {
                'title': 'Exterior Cliffside Arrival',
                'slug': 'exterior-arrival',
                'space_name': 'Cliffside Portal & Path',
                'subtitle': 'Entrance Gate Overlooking the Tyrrhenian Sea',
                'description': 'A dramatic stone gateway chiseled directly into the limestone rockface. Guests arrive greeted by blooming bougainvillea, wild sea thyme, and panoramic views stretching to Capri.',
                'architectural_details': 'Hand-hewn porous limestone walls, terracotta amphorae, and hand-forged bronze lanterns.',
                'camera_position': [0, 3.2, 11],
                'camera_target': [0, 1.4, 0],
                'hotspot_title': 'Ancient Limestone Portal',
                'hotspot_description': 'Original 19th-century coastal villa masonry preserved and illuminated with warm 2700K recessed fixtures.',
                'lighting_modes': {'day': 'Sunlight 5600K', 'golden': 'Late Amber 3200K', 'dusk': 'Aegean Twilight 2400K'},
                'image_url': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
                'sort_order': 1
            },
            {
                'title': 'Grand Arched Entrance',
                'slug': 'arched-entrance',
                'space_name': 'Colonnade Vestibule',
                'subtitle': 'Whitewashed Arches & Sea Breeze Gallery',
                'description': 'Monumental Mediterranean arches frame natural daylight and cross-ventilating sea breezes, creating a sensory threshold between rugged cliff and refined hospitality.',
                'architectural_details': 'Smooth lime-plaster arches, hand-troweled microcement floors, and minimalist travertine reception plinth.',
                'camera_position': [-3.2, 2.4, 7.5],
                'camera_target': [0, 1.6, 0],
                'hotspot_title': 'Natural Wind Corridors',
                'hotspot_description': 'Architectural colonnades positioned to draw natural thermal ocean breezes, reducing active energy needs.',
                'lighting_modes': {'day': 'Sunlight 5600K', 'golden': 'Late Amber 3200K', 'dusk': 'Aegean Twilight 2400K'},
                'image_url': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                'sort_order': 2
            },
            {
                'title': 'Main Dining Room',
                'slug': 'main-dining',
                'space_name': 'The Travertine Sala',
                'subtitle': 'Intimate Indoor Fine Dining with Full Ocean Panorama',
                'description': 'Floor-to-ceiling minimal framed pivot glass doors provide an uninterrupted view of the horizon while diners enjoy comfortable custom banquettes crafted from sand-toned Italian linen.',
                'architectural_details': 'Light travertine floor tiles, acoustics softened with natural acoustic lime plaster, and low-slung walnut chairs.',
                'camera_position': [0, 2.6, 6.2],
                'camera_target': [0, 1.3, -2.5],
                'hotspot_title': 'Curated Stoneware Setting',
                'hotspot_description': 'Custom artisanal ceramics thrown in Vietri sul Mare exclusively for Aura Marina menus.',
                'lighting_modes': {'day': 'Sunlight 5600K', 'golden': 'Late Amber 3200K', 'dusk': 'Aegean Twilight 2400K'},
                'image_url': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
                'sort_order': 3
            },
            {
                'title': 'Sea-Facing Balcony & Terrace',
                'slug': 'sea-terrace',
                'space_name': 'The Belvedere Pergola',
                'subtitle': 'Open-Air Dining Suspended 60 Meters Above the Sea',
                'description': 'Our flagship dining setting. Sheltered beneath natural chestnut wood pergolas draped in wild jasmine and vine, tables hover directly over the water with views of passing sailboats.',
                'architectural_details': 'Floating cantilevered stone terrace with frameless glass railings and terracotta planters containing 80-year-old bonsai olive trees.',
                'camera_position': [4.0, 2.2, 5.0],
                'camera_target': [1.8, 1.2, -4.0],
                'hotspot_title': 'Sunset Horizon View',
                'hotspot_description': 'Direct unobstructed sunset line over the Faraglioni rocks of Capri during June through September.',
                'lighting_modes': {'day': 'Sunlight 5600K', 'golden': 'Late Amber 3200K', 'dusk': 'Aegean Twilight 2400K'},
                'image_url': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                'sort_order': 4
            },
            {
                'title': 'Open Hearth & Sommelier Bar',
                'slug': 'hearth-bar',
                'space_name': 'The Crudo & Wine Vault',
                'subtitle': 'Wood Fire & Artisanal Wine Cellar',
                'description': 'An interactive culinary theater featuring an open wood-burning grill fueled by pruned olive wood and citrus boughs, flanked by a glass-encased walk-in cellar holding 1,800 Mediterranean vintages.',
                'architectural_details': 'Raw lava stone counter from Mount Vesuvius, brushed brass gantry, and smoked glass temperature-controlled wine displays.',
                'camera_position': [-3.8, 2.5, 4.2],
                'camera_target': [-1.8, 1.5, -3.2],
                'hotspot_title': 'Olive Wood Charcoal Hearth',
                'hotspot_description': 'Reaching 400°C for blistering whole wild fish and infusing delicate herbal smoke into crustacean broths.',
                'lighting_modes': {'day': 'Sunlight 5600K', 'golden': 'Late Amber 3200K', 'dusk': 'Aegean Twilight 2400K'},
                'image_url': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
                'sort_order': 5
            },
        ]
        for vp in viewpoints_data:
            TourViewpoint.objects.update_or_create(
                slug=vp['slug'],
                defaults=vp
            )

        # 5. Menu Categories & Items
        categories_data = [
            {
                'name': 'Crudo & Antipasti',
                'slug': 'crudo-antipasti',
                'tagline': 'Raw coastal delicacies & pristine morning catches',
                'description': 'Lightly cured seafood seasoned exclusively with cold-pressed olive oil, Amalfi lemon peel, and hand-harvested sea salt.',
                'order': 1,
                'items': [
                    {
                        'name': 'Carpaccio di Ricciola e Agrumi',
                        'english_name': 'Yellowtail Amberjack Carpaccio with Amalfi Citron & Bergamot Oil',
                        'slug': 'carpaccio-di-ricciola',
                        'description': 'Thinly sliced wild amberjack, citron supremes, wild sea fennel oil, pickled caper berries, and crisp sea salt flakes.',
                        'price': 28.00,
                        'origin': 'Daily catch from Gulf of Salerno fishers',
                        'wine_pairing': 'Greco di Tufo DOCG 2022, Pietracupa',
                        'dietary_tags': ['Pescatarian', 'Gluten-Free', 'Raw'],
                        'is_signature': True,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': 'Tartare di Gambero Rosso di Mazara',
                        'english_name': 'Mazara Red Prawn Tartare with Stracciatella & Calvisius Caviar',
                        'slug': 'tartare-gambero-rosso',
                        'description': 'Sweet deep-sea red prawns, creamy Pugliese stracciatella, lime zest, and royal Siberian caviar pearls.',
                        'price': 34.00,
                        'origin': 'Wild Mazara del Vallo deep sea trawlers',
                        'wine_pairing': 'Franciacorta Extra Brut Cuvée Prestige, Ca del Bosco',
                        'dietary_tags': ['Pescatarian', 'Gluten-Free'],
                        'is_signature': True,
                        'is_chef_recommendation': False,
                        'image_url': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': 'Ostriche alla Brace con Burro al Timo',
                        'english_name': 'Charred Brittany Oysters with Wild Thyme Butter & Crispy Capers',
                        'slug': 'ostriche-alla-brace',
                        'description': 'Gently touched by olive wood flame, emulsified seaweed butter, sea thyme, and fried Pantelleria capers.',
                        'price': 32.00,
                        'origin': 'Coastal Brittany & Mediterranean oyster reserves',
                        'wine_pairing': 'Etna Bianco Superiore DOC 2021, Barone di Villagrande',
                        'dietary_tags': ['Pescatarian'],
                        'is_signature': False,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1553659971-f01207815844?auto=format&fit=crop&w=800&q=80'
                    }
                ]
            },
            {
                'name': 'Primi & Handcrafted Pasta',
                'slug': 'primi-pasta',
                'tagline': 'Hand-rolled semolina shapes & rich crustacean reductions',
                'description': 'Prepared fresh twice daily using heritage stoneground Gragnano flour and eggs from free-roaming mountain hens.',
                'order': 2,
                'items': [
                    {
                        'name': 'Tagliolini al Tartufo Estivo e Gamberi',
                        'english_name': 'Handmade Tagliolini with Summer Black Truffle & Sweet Langoustine',
                        'slug': 'tagliolini-tartufo-gamberi',
                        'description': 'Silky 30-egg-yolk pasta ribbons tossed in clarified alpine butter, roasted langoustine tail jus, and generous black summer truffle shavings.',
                        'price': 38.00,
                        'origin': 'Norcia Black Truffles & Tyrrhenian Langoustines',
                        'wine_pairing': 'Chardonnay IGT 2020, Planeta Sicilia',
                        'dietary_tags': ['Pescatarian'],
                        'is_signature': True,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': 'Spaghetti ai Ricci di Mare e Bottarga',
                        'english_name': 'Artisanal Spaghetti with Fresh Sea Urchin, Bottarga & Lemon Dust',
                        'slug': 'spaghetti-ai-ricci',
                        'description': 'Extruded bronze-die pasta coated in velvety raw sea urchin emulsion, grated Sardinian mullet bottarga, and Amalfi lemon aromatics.',
                        'price': 36.00,
                        'origin': 'Sardinian Gulf Sea Urchin divers',
                        'wine_pairing': 'Vermentino di Gallura Superiore 2022',
                        'dietary_tags': ['Pescatarian'],
                        'is_signature': True,
                        'is_chef_recommendation': False,
                        'image_url': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': 'Ravioli di Burrata e Limone di Positano',
                        'english_name': 'Burrata Filled Pillow Ravioli with Candied Lemon & Pine Nuts',
                        'slug': 'ravioli-burrata-limone',
                        'description': 'Delicate pasta envelopes filled with creamy burrata, light roasted tomato water reduction, toasted Tuscan pine nuts, and baby basil leaves.',
                        'price': 29.00,
                        'origin': 'Andria Burrata & organic Positano cliff lemon groves',
                        'wine_pairing': 'Fiano di Avellino DOCG 2021, Mastroberardino',
                        'dietary_tags': ['Vegetarian'],
                        'is_signature': False,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=800&q=80'
                    }
                ]
            },
            {
                'name': 'Secondi — Pesce & Brace',
                'slug': 'secondi-pesce',
                'tagline': 'Whole fish baked in sea salt & olive wood charcoal grills',
                'description': 'Cooked with respect for natural textures and sea minerals, served table-side with seasonal garden vegetables.',
                'order': 3,
                'items': [
                    {
                        'name': 'Spigola di Mare in Crosta di Sale Marino',
                        'english_name': 'Whole Wild Sea Bass Baked in Trapani Salt Crust (For Two)',
                        'slug': 'spigola-in-crosta-di-sale',
                        'description': 'Line-caught whole sea bass roasted under a thick crust of sea salt, lemon leaves, and rosemary. Carved table-side with extra virgin olive oil emulsion.',
                        'price': 85.00,
                        'origin': 'Capri Coastal Waters line fishing',
                        'wine_pairing': 'Cervaro della Sala 2021, Antinori',
                        'dietary_tags': ['Pescatarian', 'Gluten-Free', 'For Two'],
                        'is_signature': True,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': 'Polpo Arrostito su Crema di Ceci',
                        'english_name': 'Charred Mediterranean Octopus on Rosemary Chickpea Velouté',
                        'slug': 'polpo-arrostito',
                        'description': 'Tender poached then wood-charred octopus tentacles, smoked paprika emulsion, velvety Cicerale chickpeas, and taggiasca olive dust.',
                        'price': 35.00,
                        'origin': 'Rock reef catches, Cilento Coast',
                        'wine_pairing': 'Aglianico del Vulture DOC 2019, Grifalco',
                        'dietary_tags': ['Pescatarian', 'Gluten-Free'],
                        'is_signature': False,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': "Costolette d'Agnello alle Erbe Costiere",
                        'english_name': 'Grilled Mountain Lamb Chops with Wild Mint & Pistachio Crust',
                        'slug': 'costolette-agnello',
                        'description': 'Herb-fed pasture lamb chops seared over olive wood, Bronte pistachio crust, reduced pomegranate syrup, and roasted baby artichokes.',
                        'price': 42.00,
                        'origin': 'Abruzzo Apennine mountain pastures',
                        'wine_pairing': 'Taurasi Riserva DOCG 2016, Feudi di San Gregorio',
                        'dietary_tags': ['Gluten-Free'],
                        'is_signature': False,
                        'is_chef_recommendation': False,
                        'image_url': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
                    }
                ]
            },
            {
                'name': 'Dolci Artigianali',
                'slug': 'dolci',
                'tagline': 'Sun-ripened Amalfi citrus & traditional pastry artistry',
                'description': 'Pastries celebrating cold-pressed almond milk, dark Italian chocolate, and honey from cliffside apiaries.',
                'order': 4,
                'items': [
                    {
                        'name': 'Delizia al Limone di Sorrento Deconstructa',
                        'english_name': 'Deconstructed Sorrento Lemon Delizia with Limoncello Sorbet',
                        'slug': 'delizia-al-limone',
                        'description': 'Airy sponge drops soaked in artisanal limoncello, whipped lemon mousse, candied zest ribbons, and sharp citrus granita.',
                        'price': 16.00,
                        'origin': 'IGP Sorrento Lemons & organic estate dairy',
                        'wine_pairing': 'Moscato d’Asti DOCG 2023, Saracco',
                        'dietary_tags': ['Vegetarian'],
                        'is_signature': True,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': 'Torta Caprese al Cioccolato con Gelato all’Olio',
                        'english_name': 'Caprese Dark Chocolate Torte with Cold-Pressed Olive Oil Gelato',
                        'slug': 'torta-caprese',
                        'description': 'Flourless 72% dark chocolate and almond cake, Fleur de Sel crunch, and house-churned olive oil gelato.',
                        'price': 18.00,
                        'origin': 'Traditional Capri recipe with Modica chocolate',
                        'wine_pairing': 'Passito di Pantelleria DOC, Donnafugata',
                        'dietary_tags': ['Vegetarian', 'Gluten-Free'],
                        'is_signature': False,
                        'is_chef_recommendation': False,
                        'image_url': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
                    }
                ]
            },
            {
                'name': 'Vini & Signature Cocktails',
                'slug': 'vini-cocktails',
                'tagline': 'Mediterranean terroirs, indigenous grapes & botanical mixology',
                'description': 'Curated by Master Sommelier Elena Costa spanning 1,800 bottles from Campania, Sicily, Greece, and Provence.',
                'order': 5,
                'items': [
                    {
                        'name': 'Amalfi Riviera Spritz',
                        'english_name': 'Signature Apertif: Bergamot Liqueur, Prosecco Superiore & Rosemary Mist',
                        'slug': 'amalfi-riviera-spritz',
                        'description': 'Italicus Rosolio di Bergamotto, artisanal prosecco brut, sparkling mineral water, charred lemon wheel, and fresh rosemary sprig.',
                        'price': 18.00,
                        'origin': 'House Apertif Creation',
                        'wine_pairing': 'Pair with Yellowtail Carpaccio',
                        'dietary_tags': ['Apertif', 'Vegetarian'],
                        'is_signature': True,
                        'is_chef_recommendation': True,
                        'image_url': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        'name': 'Negroni Bianco al Timo Selvatico',
                        'english_name': 'White Mediterranean Negroni with Coastal Wild Thyme Infusion',
                        'slug': 'negroni-bianco',
                        'description': 'Gin infused with Amalfi juniper, Luxardo Bitter Bianco, Carpano Bianco vermouth, and expressed orange oil.',
                        'price': 20.00,
                        'origin': 'Artisanal Botanical Bar',
                        'wine_pairing': 'Digestif / Sunset Drink',
                        'dietary_tags': ['Digestif'],
                        'is_signature': False,
                        'is_chef_recommendation': False,
                        'image_url': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
                    }
                ]
            }
        ]

        for cat_data in categories_data:
            cat, _ = MenuCategory.objects.update_or_create(
                slug=cat_data['slug'],
                defaults={
                    'name': cat_data['name'],
                    'tagline': cat_data['tagline'],
                    'description': cat_data['description'],
                    'sort_order': cat_data['order'],
                    'is_active': True
                }
            )
            for idx, item_data in enumerate(cat_data['items']):
                MenuItem.objects.update_or_create(
                    slug=item_data['slug'],
                    defaults={
                        'category': cat,
                        'name': item_data['name'],
                        'english_name': item_data['english_name'],
                        'description': item_data['description'],
                        'price': item_data['price'],
                        'origin': item_data['origin'],
                        'wine_pairing': item_data['wine_pairing'],
                        'dietary_tags': item_data['dietary_tags'],
                        'is_signature': item_data['is_signature'],
                        'is_chef_recommendation': item_data['is_chef_recommendation'],
                        'is_available': True,
                        'image_url': item_data['image_url'],
                        'sort_order': idx + 1
                    }
                )

        # 6. Dining Spaces (4 Spaces)
        spaces_data = [
            {
                'name': 'The Belvedere Sea Terrace',
                'slug': 'belvedere-terrace',
                'tag': 'OPEN-AIR CLIFFSIDE',
                'description': 'Perched 60 meters directly above the Tyrrhenian waters, shaded by natural chestnut pergolas and century-old grapevine canopies.',
                'capacity': '45 Guests / Sunset & Evening Seatings',
                'vibe': 'Gentle sea breezes, ambient acoustic jazz, panoramic horizon sunsets',
                'features': ['180° Panoramic Sea View', 'Private Sommelier Service', 'Heated Limestone Flooring for Cool Evenings'],
                'image_url': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 1
            },
            {
                'name': 'The Olive Pergola Courtyard',
                'slug': 'olive-pergola',
                'tag': 'SECRET GARDEN',
                'description': 'An intimate garden cloister enclosed by whitewashed stone walls, fragrant lemon trees, and terracotta urns overflowing with rosemary.',
                'capacity': '28 Guests / Lunch & Dinner',
                'vibe': 'Tranquil shade, dappled sunlight, fragrant citrus blossoms',
                'features': ['Protected from high sea winds', 'Surrounded by organic herbs', 'Romantic candlelit ambiance'],
                'image_url': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 2
            },
            {
                'name': 'Private Cliffside Alcove',
                'slug': 'private-alcove',
                'tag': 'EXCLUSIVE DINING',
                'description': 'Carved directly into the cliff edge for single table bookings of two to six guests, offering total seclusion and a dedicated butler.',
                'capacity': '2 to 6 Guests / Strictly By Advance Request',
                'vibe': 'Total privacy, mesmerizing wave acoustics, private champagne cart',
                'features': ['Private dedicated waitstaff', 'Bespoke 7-course tasting menu', 'Private access walkway'],
                'image_url': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 3
            },
            {
                'name': 'The Raw Bar & Wine Vault',
                'slug': 'raw-bar-vault',
                'tag': 'INDOOR INTERACTIVE',
                'description': 'A volcanic lava-stone counter facing the open crudo station and the climate-controlled glass wine cellar housing rare vintages.',
                'capacity': '16 Counter Seats / Walk-ins Welcome',
                'vibe': 'Energetic culinary spectacle, chef interactions, live shucking',
                'features': ['Front-row view of culinary preparation', 'By-the-glass Coravin reserve pours', 'Apertivo & crudo flights'],
                'image_url': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 4
            }
        ]
        for space in spaces_data:
            DiningSpace.objects.update_or_create(
                slug=space['slug'],
                defaults=space
            )

        # 7. Culinary Pillars (4 Pillars)
        pillars_data = [
            {
                'title': 'Zero-Mile Seafood Provenance',
                'subtitle': 'Line-caught wild species from the Gulf of Salerno',
                'description': 'Every morning at 06:30, our chefs meet the local artisan boats at Positano pier. No commercial trawlers, only sustainable small-net catches.',
                'icon_name': 'Anchor',
                'metric_label': '100% Traceable',
                'sort_order': 1
            },
            {
                'title': 'Centuries-Old Olive Groves',
                'subtitle': 'Cold-pressed extra virgin oil from Cilento hillsides',
                'description': 'Produced from hand-harvested Pisciottana and Rotondella olive trees. Picked within 4 hours of pressing for pristine polyphenol content.',
                'icon_name': 'Droplet',
                'metric_label': '< 0.2% Acidity',
                'sort_order': 2
            },
            {
                'title': 'Volcanic Mineral Terroir',
                'subtitle': 'Sun-drenched citrus and tomatoes from Vesuvius soils',
                'description': 'Mineral-dense volcanic soils impart incomparable sweetness and acidity to our Piennolo tomatoes and organic Amalfi lemons.',
                'icon_name': 'Sun',
                'metric_label': 'Organic Certified',
                'sort_order': 3
            },
            {
                'title': 'Artisanal Craft & Terracotta',
                'subtitle': 'Handcrafted tableware from master potters of Vietri',
                'description': 'Every plate, bowl, and water carafe is individually spun and glazed by generational artisans in Vietri sul Mare.',
                'icon_name': 'Sparkles',
                'metric_label': '100% Bespoke',
                'sort_order': 4
            }
        ]
        for p in pillars_data:
            CulinaryPillar.objects.update_or_create(
                title=p['title'],
                defaults=p
            )

        # 8. Team Members (3 Leaders)
        team_data = [
            {
                'name': 'Matteo Bellini',
                'role': 'Executive Chef & Patron',
                'title': 'Maestro of Contemporary Coastal Cuisine',
                'bio': 'Raised in an Amalfi fishing family and trained in 3-star Michelin kitchens across Rome and Paris, Matteo returned home to express pure Mediterranean seaside authenticity.',
                'signature_focus': 'Raw seafood salinity & open olive-wood fire cooking',
                'accolades': 'Michelin Guide Star 2021–2025, Gambero Rosso Chef of the Year',
                'image_url': 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
                'sort_order': 1
            },
            {
                'name': 'Elena Costa',
                'role': 'Head Sommelier & Cellar Master',
                'title': 'Curator of 1,800 Mediterranean Terroirs',
                'bio': 'Elena champions indigenous grape varieties from volcanic soils and coastal islands, pairing unexpected local micro-vintages with Chef Matteo’s seasonal seafood.',
                'signature_focus': 'Volcanic Etna whites, Campania cru, and biodynamic coastal producers',
                'accolades': 'Best Italian Sommelier AIS 2023, Decanter World Wine Judge',
                'image_url': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
                'sort_order': 2
            },
            {
                'name': 'Marco Vani',
                'role': 'Pastry & Bread Artisan',
                'title': 'Alchemist of Amalfi Citrus & Ancient Grains',
                'bio': 'Master of sourdough ferments and traditional Southern Italian confection, Marco transforms wild lemons, mountain honey, and Sicilian almonds into unforgettable desserts.',
                'signature_focus': 'Deconstructed citrus delizia & olive oil gelato',
                'accolades': 'Pastry Master Gambero Rosso 2024',
                'image_url': 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80',
                'sort_order': 3
            }
        ]
        for tm in team_data:
            TeamMember.objects.update_or_create(
                name=tm['name'],
                defaults=tm
            )

        # 9. Private Event Offerings
        events_data = [
            {
                'title': 'Exclusive Cliffside Villa Buyout',
                'slug': 'villa-buyout',
                'capacity': 'Up to 90 Guests',
                'description': 'Full privatized access to all four dining spaces, panoramic sea terraces, private dock tender, and customized gastronomic journeys for unforgettable weddings and milestone celebrations.',
                'features': ['Complete estate privacy', 'Customized menu by Executive Chef Matteo Bellini', 'Dedicated sommelier team', 'Late-night acoustic lounge on the lower deck'],
                'image_url': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 1
            },
            {
                'title': 'Sunset Belvedere Wedding Receptions',
                'slug': 'belvedere-wedding',
                'capacity': '30 to 55 Guests',
                'description': 'Say your vows overlooking the golden Mediterranean sunset, followed by a champagne oyster reception and 5-course coastal dinner beneath the jasmine pergola.',
                'features': ['Golden hour sunset ceremony backdrop', 'Tailored floral styling & local ceramic gifts', 'Live string trio acoustic accompaniment'],
                'image_url': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 2
            },
            {
                'title': 'Private Sommelier Wine Cellar Dinner',
                'slug': 'cellar-dinner',
                'capacity': '8 to 14 Guests',
                'description': 'An intimate culinary journey inside our temperature-controlled limestone vault, surrounded by 1,800 bottles and hosted directly by Master Sommelier Elena Costa.',
                'features': ['Rare vintage Coravin library pours', 'Bespoke 6-course pairing menu', 'Cellar tour and barrel sample tasting'],
                'image_url': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 3
            }
        ]
        for ev in events_data:
            PrivateEventOffering.objects.update_or_create(
                slug=ev['slug'],
                defaults=ev
            )

        # 10. Gallery Items (8 Items across categories)
        gallery_data = [
            {
                'title': 'Whitewashed Colonnade at Dawn',
                'category': 'architecture',
                'caption': 'Natural lime plaster arches framing the morning sun over the Gulf of Salerno.',
                'image_url': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 1
            },
            {
                'title': 'Yellowtail Amberjack Crudo',
                'category': 'cuisine',
                'caption': 'Morning wild catch cured with cold-pressed olive oil, Amalfi citron, and sea salt.',
                'image_url': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 2
            },
            {
                'title': 'Sunset Over The Belvedere Terrace',
                'category': 'atmosphere',
                'caption': 'Golden hour aperitivo overlooking the glistening Tyrrhenian horizon.',
                'image_url': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 3
            },
            {
                'title': 'Volcanic Reserve Wine Cellar',
                'category': 'wine',
                'caption': 'Curated collection of 1,800 bottles honoring volcanic terroirs and coastal vines.',
                'image_url': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 4
            },
            {
                'title': 'Wood-Fired Hearth & Open Kitchen',
                'category': 'cuisine',
                'caption': 'Olive wood charcoal flames searing fresh catches at 400°C.',
                'image_url': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 5
            },
            {
                'title': 'Carved Limestone Cliff Stairs',
                'category': 'architecture',
                'caption': 'Porous stone steps winding down toward the private yacht tender pier.',
                'image_url': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 6
            },
            {
                'title': 'Amalfi Riviera Spritz Apertif',
                'category': 'wine',
                'caption': 'Bergamot rosolio, prosecco brut, and freshly charred lemon peel.',
                'image_url': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 7
            },
            {
                'title': 'Deconstructed Sorrento Delizia',
                'category': 'cuisine',
                'caption': 'Airy sponge drops, candied lemon zest ribbons, and limoncello sorbet.',
                'image_url': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
                'sort_order': 8
            }
        ]
        for g in gallery_data:
            GalleryItem.objects.update_or_create(
                title=g['title'],
                defaults=g
            )

        # 11. Testimonials
        testimonials_data = [
            {
                'guest_name': 'The Michelin Guide Inspector',
                'source_or_title': 'Michelin Guide Southern Italy Selection',
                'quote': 'Aura Marina stands as an authentic triumph of coastal minimalism. Chef Bellini demonstrates absolute mastery over raw seafood salinity, accompanied by one of Italy’s finest selections of volcanic whites.',
                'rating': 5,
                'visit_date': 'September 2025',
                'is_featured': True,
                'sort_order': 1
            },
            {
                'guest_name': 'Lady Vivienne Sterling',
                'source_or_title': 'Private Yacht Guest, M/Y Solaria',
                'quote': 'Dining on the Belvedere Terrace at dusk while our yacht was anchored below was the undisputed highlight of our entire summer in the Mediterranean. Flawless hospitality and peerless crudo.',
                'rating': 5,
                'visit_date': 'July 2025',
                'is_featured': True,
                'sort_order': 2
            },
            {
                'guest_name': 'The World’s 50 Best Discovery',
                'source_or_title': 'Editorial Gastronomy Feature',
                'quote': 'The salt-crusted sea bass alone is worth chartering a boat to Positano. Aura Marina achieves the rare equilibrium between historic villa architecture and boundary-pushing contemporary taste.',
                'rating': 5,
                'visit_date': 'August 2025',
                'is_featured': True,
                'sort_order': 3
            }
        ]
        for t in testimonials_data:
            Testimonial.objects.update_or_create(
                guest_name=t['guest_name'],
                defaults=t
            )

        # 12. Opening Hours
        hours_data = [
            {'day': 'Monday', 'lunch': '12:30 — 15:30', 'dinner': '19:00 — 23:30', 'closed': False, 'note': 'Aperitivo begins at 18:00', 'order': 1},
            {'day': 'Tuesday', 'lunch': '12:30 — 15:30', 'dinner': '19:00 — 23:30', 'closed': False, 'note': 'Aperitivo begins at 18:00', 'order': 2},
            {'day': 'Wednesday', 'lunch': '12:30 — 15:30', 'dinner': '19:00 — 23:30', 'closed': False, 'note': 'Aperitivo begins at 18:00', 'order': 3},
            {'day': 'Thursday', 'lunch': '12:30 — 15:30', 'dinner': '19:00 — 23:30', 'closed': False, 'note': 'Aperitivo begins at 18:00', 'order': 4},
            {'day': 'Friday', 'lunch': '12:30 — 15:30', 'dinner': '19:00 — 00:00', 'closed': False, 'note': 'Sunset acoustic session 18:30', 'order': 5},
            {'day': 'Saturday', 'lunch': '12:00 — 16:00', 'dinner': '19:00 — 00:00', 'closed': False, 'note': 'Sunset acoustic session 18:30', 'order': 6},
            {'day': 'Sunday', 'lunch': '12:00 — 16:30', 'dinner': '19:00 — 23:00', 'closed': False, 'note': 'Extended coastal Sunday lunch', 'order': 7},
        ]
        for h in hours_data:
            OpeningHour.objects.update_or_create(
                day_of_week=h['day'],
                defaults={
                    'lunch_hours': h['lunch'],
                    'dinner_hours': h['dinner'],
                    'is_closed': h['closed'],
                    'note': h['note'],
                    'sort_order': h['order']
                }
            )

        # 13. Sample Reservation Inquiries
        sample_inquiries = [
            {
                'guest_name': 'Countess Allegra Visconti',
                'email': 'allegra.visconti@luxurymail.it',
                'phone': '+39 02 8945 1200',
                'party_size': 4,
                'reservation_date': date(2026, 6, 18),
                'reservation_time': '20:30',
                'seating_preference': 'The Belvedere Sea Terrace',
                'occasion': 'Wedding Anniversary',
                'special_requests': 'We will arrive via private yacht tender at 20:15. Please prepare Chef Matteo’s 7-course tasting pairing.',
                'dietary_notes': 'No shellfish for one guest',
                'status': 'confirmed',
                'staff_notes': 'VIP Table 01 reserved on cliff edge. Tender boat coordinated with captain.'
            },
            {
                'guest_name': 'Julian Sterling & Dr. Clara Vance',
                'email': 'j.sterling@londonadvisors.co.uk',
                'phone': '+44 20 7946 0912',
                'party_size': 2,
                'reservation_date': date(2026, 6, 20),
                'reservation_time': '19:30',
                'seating_preference': 'Private Cliffside Alcove',
                'occasion': 'Romantic Proposal Dinner',
                'special_requests': 'Secret proposal planned at sunset (approx 20:45). Coordinated Dom Pérignon Vintage chilled.',
                'dietary_notes': 'None',
                'status': 'pending',
                'staff_notes': 'Needs confirmation from sommelier regarding reserve vintage.'
            }
        ]
        for sinq in sample_inquiries:
            ReservationInquiry.objects.get_or_create(
                email=sinq['email'],
                reservation_date=sinq['reservation_date'],
                defaults=sinq
            )

        self.stdout.write(self.style.SUCCESS("Coastal Mediterranean database successfully seeded!"))
