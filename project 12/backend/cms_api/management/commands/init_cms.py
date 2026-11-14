from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import (
    SiteConfig, MenuCategory, MenuItem, TourViewpoint,
    DiningExperience, GalleryImage, TeamMember, Testimonial, Reservation
)

class Command(BaseCommand):
    help = "Initializes Villa Riviera Mediterranean platform seed content and admin account"

    def handle(self, *args, **options):
        self.stdout.write("Initializing Villa Riviera database...")

        # 1. Superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@villariviera.com', 'adminpassword123')
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created."))
        else:
            self.stdout.write("Superuser 'admin' already exists.")

        # 2. Master Editorial Sections JSON
        editorial_json = {
            "s01_preloader": {
                "monogram": "VR",
                "title": "VILLA RIVIERA",
                "subtitle": "Cap-Ferrat, Côte d'Azur",
                "established": "1928"
            },
            "s02_hero": {
                "badge": "MEDITERRANEAN COASTAL FINE DINING",
                "headline": "Where Warm Limestone Meets the Azure Horizon",
                "subheadline": "An architectural sanctuary perched on the cliffs of Saint-Jean-Cap-Ferrat. Experience centuries of Mediterranean hospitality, wild sea harvest, and timeless coastal beauty.",
                "primary_cta": "Reserve a Table",
                "secondary_cta": "Explore 3D Villa Tour",
                "stats": [
                    {"value": "3", "label": "Michelin Stars"},
                    {"value": "1928", "label": "Estate Founded"},
                    {"value": "480+", "label": "Riviera Cellar Vintages"},
                    {"value": "100%", "label": "Dawn Catch & Coastal Terroir"}
                ]
            },
            "s03_story": {
                "chapter": "CHAPTER I — HERITAGE & ARCHITECTURE",
                "title": "A Coastal Sanctuary Built from Stone & Light",
                "quote": "The spirit of the Riviera is not merely a geography; it is the patient art of slow living, salt-washed stone, and sun-drenched honesty.",
                "paragraphs": [
                    "Carved into the limestone cliffs of Saint-Jean-Cap-Ferrat in 1928, Villa Riviera was envisioned as a private retreat where classical Mediterranean arches frame the shifting blues of the sea. Over nearly a century, the villa has remained an ode to genuine craftsmanship.",
                    "Today, Villa Riviera stands as a living celebration of coastal culture. Here, culinary art and architectural purity intertwine: hand-chiseled stones collect the morning sun, gentle sea breezes move through arched colonnades, and every dish honors the fishermen and olive groves of the coastline."
                ],
                "pillars_highlight": [
                    {"label": "Architectural Limestone", "desc": "Sourced from historic Provençal quarries"},
                    {"label": "Estate Olive Trees", "desc": "Centuries-old trees producing cold-pressed nectar"},
                    {"label": "Private Sea Pier", "desc": "Direct tender access for arriving patrons"}
                ]
            },
            "s04_tour": {
                "badge": "3D INTERACTIVE WEBGL VIRTUAL TOUR",
                "title": "Step Inside the Villa",
                "description": "Experience our architectural estate from anywhere in the world. Traverse the sunlit courtyard, the grand dining salon, and the panoramic cliffside terrace."
            },
            "s05_philosophy": {
                "badge": "OUR CULINARY MANIFESTO",
                "title": "Three Pillars of Mediterranean Harmony",
                "description": "True luxury on the Riviera is born from respect for natural rhythm and uncompromised ingredient integrity.",
                "pillars": [
                    {
                        "number": "01",
                        "title": "Dawn Catch & Coastal Terroir",
                        "desc": "Every morning at 05:30, our brigade meets artisanal skiffs arriving at Villefranche and Sanremo. Only wild, sustainably line-caught fish and shellfish enter our kitchen."
                    },
                    {
                        "number": "02",
                        "title": "The Art of Leisurely Dining",
                        "desc": "A meal at Villa Riviera cannot be hurried. We invite guests into the Mediterranean cadence of slow dining, where conversations linger beneath scented pine branches."
                    },
                    {
                        "number": "03",
                        "title": "Pure Architectural Balance",
                        "desc": "Food and atmosphere must resonate with identical grace. From custom hand-turned terracotta plates to linen woven in Lombardy, each detail mirrors our limestone architecture."
                    }
                ]
            },
            "s06_signature": {
                "badge": "CHEF'S MASTERPIECES",
                "title": "Signature Culinary Creations",
                "description": "Iconic dishes conceived by Executive Chef Marco Valenti, embodying the raw essence and modern refinement of the Mediterranean."
            },
            "s07_menu": {
                "badge": "A LA CARTE & TASTING",
                "title": "The Riviera Gastronomic Repertoire",
                "description": "An evolving seasonal dialogue between the Mediterranean Sea, Provençal mountain herbs, and traditional handmade pasta."
            },
            "s08_architecture": {
                "badge": "MATERIALITY & CRAFT",
                "title": "The Physical Soul of the Villa",
                "description": "Every surface at Villa Riviera has been selected for tactile warmth, organic longevity, and historical resonance.",
                "materials": [
                    {
                        "name": "Provençal Limestone Arches",
                        "details": "Chiseled by third-generation stonemasons, these soaring arches create a rhythmic transition between indoor salons and open sea horizon."
                    },
                    {
                        "name": "Handmade Terracotta Tiles",
                        "details": "Kiln-fired in Tuscany, our terracotta courtyard tiles retain daytime sun warmth and release a soothing earthy aroma into the evening air."
                    },
                    {
                        "name": "Centuries-Old Olive Wood",
                        "details": "Reclaimed timber from estate trees that have ended their fruiting cycle, crafted into dining tables and sommelier stations."
                    },
                    {
                        "name": "Sea Glass & Patinated Bronze",
                        "details": "Hand-blown lighting fixtures inspired by sea-tumbled glass, framed in muted architectural bronze."
                    }
                ]
            },
            "s09_team": {
                "badge": "THE ARTISANS",
                "title": "Custodians of Taste & Hospitality",
                "description": "A team united by an uncompromising pursuit of Mediterranean dining elegance."
            },
            "s10_experiences": {
                "badge": "PRIVATE & EXCLUSIVE",
                "title": "Curated Riviera Dining Encounters",
                "description": "Bespoke moments designed for intimate celebrations, sunset toasts, and private sommelier journeys."
            },
            "s11_gallery": {
                "badge": "VISUAL RETROSPECTIVE",
                "title": "Moments of Light & Architecture",
                "description": "Explore the atmospheric nuances of Villa Riviera across daylight, golden hour, and twilight."
            },
            "s12_testimonials": {
                "badge": "CRITICAL RECOGNITION",
                "title": "Words from Critics & Patrons",
                "description": "Honoring the artistry and tranquility experienced at our Cap-Ferrat estate."
            },
            "s13_reservation": {
                "badge": "CONCIERGE DESK",
                "title": "Reserve Your Riviera Experience",
                "description": "Table reservations open 60 days in advance. For parties exceeding 8 guests or private villa buyouts, our concierge is at your service.",
                "notice": "Smart elegant attire requested. Children welcome from age 8."
            },
            "s14_location": {
                "badge": "HOW TO REACH US",
                "title": "Arrival at Saint-Jean-Cap-Ferrat",
                "address": "14 Chemin des Calanques, 06230 Saint-Jean-Cap-Ferrat, Côte d'Azur, France",
                "phone": "+33 4 93 01 88 00",
                "email": "concierge@villariviera.com",
                "tender_access": "Private tender dock coordinates: 43°41'22.4\"N 7°20'08.2\"E (VHF Channel 72)",
                "valet": "Complimentary valet parking & secure vehicle storage on arrival.",
                "helicopter": "Private helipad transfers available via Monaco Heliport (12 min flight)."
            },
            "s15_footer": {
                "copyright": "© 2026 Villa Riviera SAS. All rights reserved.",
                "heritage": "Historic Estate Established 1928 — Saint-Jean-Cap-Ferrat",
                "tagline": "Coastal Villa Architecture Meets Contemporary Fine Dining"
            }
        }

        # 3. Site Config Instance
        config, created = SiteConfig.objects.get_or_create(
            id=1,
            defaults={
                "site_title": "VILLA RIVIERA",
                "tagline": "Coastal Villa Architecture Meets Contemporary Fine Dining",
                "hero_subtitle": "An architectural sanctuary overlooking the Mediterranean waters of Cap-Ferrat, where ancient limestone arches meet master culinary artistry.",
                "philosophy_quote": "The spirit of the Riviera is not merely a geography; it is the patient art of slow living, salt-washed stone, and sun-drenched honesty.",
                "chef_quote": "We cook as the Mediterranean dictates: pristine seafood drawn at dawn, wild herbs from the limestone crags, and centuries of coastal memory refined into contemporary elegance.",
                "contact_email": "reservations@villariviera.com",
                "contact_phone": "+33 4 93 01 88 00",
                "address": "14 Chemin des Calanques, 06230 Saint-Jean-Cap-Ferrat, Côte d'Azur, France",
                "opening_hours": "Lunch: 12:00 – 15:00 | Dinner: 19:30 – 23:30 (Closed Tuesdays)",
                "raw_content_json": editorial_json
            }
        )
        if not created:
            config.raw_content_json = editorial_json
            config.save()
        self.stdout.write(self.style.SUCCESS("SiteConfig initialized."))

        # 4. Tour Viewpoints (5 Scenes)
        TourViewpoint.objects.all().delete()
        viewpoints_data = [
            {
                "title": "Riviera Exterior Villa",
                "slug": "exterior",
                "subtitle": "Arched limestone façade overlooking the Cap-Ferrat coastline",
                "description": "A 1928 coastal villa constructed from hand-chiseled limestone with panoramic vistas over the Mediterranean horizon.",
                "camera_position": "[0, 2.8, 7.5]",
                "camera_target": "[0, 1.2, 0]",
                "atmosphere": "Golden afternoon sunlight, warm sea breeze, horizon reflections",
                "highlights": ["Limestone Archway", "Aged Terracotta Cornices", "Ocean Overlook"],
                "order": 1
            },
            {
                "title": "Courtyard & Arrival",
                "slug": "courtyard",
                "subtitle": "Warm terracotta pavers, ancient clay urns, and scented olive trees",
                "description": "Guests enter through an intimate cloistered courtyard where water gently trickles into a carved marble basin.",
                "camera_position": "[-2.8, 2.2, 4.8]",
                "camera_target": "[0, 1.0, 0]",
                "atmosphere": "Dappled shadows under olive canopies, soothing fountain acoustics",
                "highlights": ["Tuscan Clay Amphorae", "Centuries-Old Olive Grove", "Handmade Pavers"],
                "order": 2
            },
            {
                "title": "Main Dining Salon",
                "slug": "salon",
                "subtitle": "Double-height limestone vaults and hand-loomed linen tables",
                "description": "The central salon frames the sea through soaring glazed arches, illuminated by custom sculpted bronze pendants.",
                "camera_position": "[0.2, 1.8, 3.6]",
                "camera_target": "[0, 1.3, -2]",
                "atmosphere": "Intimate luxury, soft bronze luminescence, crisp acoustic serenity",
                "highlights": ["Double-Height Arches", "Lombardy Linen Linens", "Bronze Chandeliers"],
                "order": 3
            },
            {
                "title": "Terrace & Outdoor Dining",
                "slug": "terrace",
                "subtitle": "Cliffside open-air tables suspended above the turquoise sea",
                "description": "Dine under coastal twilight with panoramic sea views from Monaco to the Esterel mountains.",
                "camera_position": "[2.6, 2.0, 4.5]",
                "camera_target": "[0.5, 1.0, 0]",
                "atmosphere": "Sunset amber glow, gentle wave rhythm, candlelight glow",
                "highlights": ["Cliffside Pergola", "Unobstructed Sea Vistas", "Candlelit Marble Tables"],
                "order": 4
            },
            {
                "title": "Culinary & Wine Cellar",
                "slug": "cellar",
                "subtitle": "Vaulted subterranean cellar housing 480+ coastal vintages",
                "description": "Carved straight into the cliff rock, maintaining natural humidity and ideal conditions for rare Mediterranean vintages.",
                "camera_position": "[0, 1.5, 3.2]",
                "camera_target": "[0, 1.2, -1]",
                "atmosphere": "Cool limestone tranquility, sommelier tasting station",
                "highlights": ["Chalk Cave Humidity", "Rare Provençal & Ligurian Vintages", "Olive Wood Tasting Table"],
                "order": 5
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
                "name": "Antipasti & Crudo di Mare",
                "slug": "antipasti",
                "description": "Raw seafood, light marine delicacies, and vibrant coastal garden harvest.",
                "order": 1,
                "items": [
                    {
                        "name": "Crudo di Ricciola al Bergamotto",
                        "subtitle": "Yellowtail Amberjack Crudo",
                        "description": "Thinly shaved wild yellowtail amberjack dressed with fermented bergamot citrus, coastal sea purslane, and single-estate Riviera olive oil.",
                        "price": "€38",
                        "is_signature": True,
                        "dietary_tags": "Wild Caught, Gluten-Free",
                        "pairing_notes": "Bellet Blanc, Château de Crémat 2022",
                        "order": 1
                    },
                    {
                        "name": "Carpaccio di Gamberi Rossi di Sanremo",
                        "subtitle": "Sanremo Red Prawn Carpaccio",
                        "description": "Pounded sweet red prawns from the Ligurian trench, crisp fennel pollen, finger lime pearls, and sea salt crystals.",
                        "price": "€42",
                        "is_signature": True,
                        "dietary_tags": "Raw Specialty, Gluten-Free",
                        "pairing_notes": "Vermentino Colli di Luni DOC 2023",
                        "order": 2
                    },
                    {
                        "name": "Fiori di Zucca con Burrata & Acciughe",
                        "subtitle": "Crispy Zucchini Blossoms",
                        "description": "Organic zucchini flowers filled with creamy Pugliese burrata and Cantabrian anchovies, fried in tempura of coastal herbs.",
                        "price": "€32",
                        "is_signature": False,
                        "dietary_tags": "Artisanal Dairy, Pescatarian",
                        "pairing_notes": "Cassis Blanc, Domaine du Paternel 2023",
                        "order": 3
                    }
                ]
            },
            {
                "name": "Primi & Pasta Fatta a Mano",
                "slug": "primi",
                "description": "Handmade extruded and rolled pasta reflecting Ligurian and Provençal craft.",
                "order": 2,
                "items": [
                    {
                        "name": "Tagliolini al Tartufo Estivo della Riviera",
                        "subtitle": "Summer Black Truffle Tagliolini",
                        "description": "36-egg-yolk pasta emulsified with Alpine mountain butter, 30-month Parmigiano Vacche Rosse, and shaved black summer truffle.",
                        "price": "€48",
                        "is_signature": True,
                        "dietary_tags": "Vegetarian, Hand-Rolled Daily",
                        "pairing_notes": "Chardonnay Langhe DOC, Aldo Conterno",
                        "order": 1
                    },
                    {
                        "name": "Risotto Acquerello ai Frutti di Mare & Zafferano",
                        "subtitle": "Carnaroli Seafood & Saffron Risotto",
                        "description": "7-year aged Acquerello rice simmered in concentrated rockfish broth, roasted langoustines, baby squid, and Sardinian saffron.",
                        "price": "€46",
                        "is_signature": True,
                        "dietary_tags": "Gluten-Free, Shellfish",
                        "pairing_notes": "Bandol Rosé, Domaine Tempier 2022",
                        "order": 2
                    },
                    {
                        "name": "Ravioli di Branzino alle Erbe di Macchia",
                        "subtitle": "Sea Bass Stuffed Ravioli",
                        "description": "Delicate handmade ravioli stuffed with wild sea bass and lemon thyme, served in an emulsion of sea water, datterini tomatoes, and capers.",
                        "price": "€39",
                        "is_signature": False,
                        "dietary_tags": "Pescatarian",
                        "pairing_notes": "Gavi dei Gavi La Scolca Black Label",
                        "order": 3
                    }
                ]
            },
            {
                "name": "Pesce & Carni della Costa",
                "slug": "pesce-carni",
                "description": "Wood-fired coastal fish, Mediterranean crustaceans, and Provençal meats.",
                "order": 3,
                "items": [
                    {
                        "name": "Branzino Selvaggio in Crosta di Sale Marino",
                        "subtitle": "Wild Sea Bass Baked in Salt Crust",
                        "description": "Line-caught Cap-Ferrat sea bass baked in Camargue sea salt and wild rosemary, filleted tableside with braised baby artichokes and salsa verde.",
                        "price": "€58",
                        "is_signature": True,
                        "dietary_tags": "Wild Catch, Tableside Service",
                        "pairing_notes": "Meursault Premier Cru, Domaine Bouchard",
                        "order": 1
                    },
                    {
                        "name": "Triglia di Scoglio con Bouillabaisse Ridotta",
                        "subtitle": "Red Mullet with Bouillabaisse Glaze",
                        "description": "Pan-roasted rock red mullet served over crisp saffron potato scales and a velvet reduction of rockfish bouillabaisse and rouille.",
                        "price": "€52",
                        "is_signature": False,
                        "dietary_tags": "Gluten-Free, Pescatarian",
                        "pairing_notes": "Palette Blanc, Château Simone 2020",
                        "order": 2
                    },
                    {
                        "name": "Carré d'Agnello di Sisteron alle Erbe Provenzali",
                        "subtitle": "Roasted Provençal Lamb Rack",
                        "description": "Heritage Sisteron lamb crusted with wild marjoram, roasted garlic purée, confit shallots, and lamb jus scented with lavender honey.",
                        "price": "€54",
                        "is_signature": False,
                        "dietary_tags": "Pasture-Raised Provençal",
                        "pairing_notes": "Châteauneuf-du-Pape, Château de Beaucastel",
                        "order": 3
                    }
                ]
            },
            {
                "name": "Dolci & Formaggi della Riviera",
                "slug": "dolci",
                "description": "Sun-ripened citrus creations, delicate pastry, and affineur cheeses.",
                "order": 4,
                "items": [
                    {
                        "name": "Soufflé ai Limoni di Mentone",
                        "subtitle": "Warm Menton Lemon Soufflé",
                        "description": "Light-as-air soufflé made with fragrant Menton IGP lemons, molten center of white chocolate and limoncello, served with rosemary ice cream.",
                        "price": "€24",
                        "is_signature": True,
                        "dietary_tags": "Signature Dessert, Vegetarian",
                        "pairing_notes": "Moscato d'Asti DOCG, Vietti 2023",
                        "order": 1
                    },
                    {
                        "name": "Millefoglie al Pistacchio di Bronte & Fichi",
                        "subtitle": "Bronte Pistachio & Caramelized Fig Millefeuille",
                        "description": "Caramelized puff pastry layers filled with Sicilian pistachio mousseline, roasted coastal black figs, and aged balsamic droplets.",
                        "price": "€22",
                        "is_signature": False,
                        "dietary_tags": "Vegetarian",
                        "pairing_notes": "Sauternes, Château d'Yquem 2017",
                        "order": 2
                    },
                    {
                        "name": "Torta all'Olio d'Oliva e Gelato al Timo",
                        "subtitle": "Estate Olive Oil Cake",
                        "description": "Warm moist olive oil sponge with thyme infused gelato and candied Sorrento lemon peel.",
                        "price": "€20",
                        "is_signature": False,
                        "dietary_tags": "Vegetarian, Estate Harvest",
                        "pairing_notes": "Vin Santo del Chianti Classico",
                        "order": 3
                    }
                ]
            }
        ]

        for cat_data in categories_data:
            items_data = cat_data.pop('items')
            category = MenuCategory.objects.create(**cat_data)
            for itm in items_data:
                MenuItem.objects.create(category=category, **itm)

        self.stdout.write(self.style.SUCCESS("Menu Categories and Items seeded."))

        # 6. Dining Experiences
        DiningExperience.objects.all().delete()
        experiences_data = [
            {
                "title": "Sunset Terrace Cliffside Dining",
                "subtitle": "Unobstructed views over Cap-Ferrat twilight",
                "description": "A 7-course seasonal tasting menu served at the edge of the Mediterranean cliff as the sun turns the limestone gold and twilight descends.",
                "capacity": "2 to 6 Guests",
                "timing": "Daily | 19:30 seating",
                "price": "€240 per guest",
                "features": ["7-Course Tasting Menu", "Champagne Welcome on Arrival", "Prime Cliffside Table"],
                "order": 1
            },
            {
                "title": "The Olive Grove Pergola",
                "subtitle": "Private shaded dining in century-old olive gardens",
                "description": "Surrounded by centuries-old olive trees and wild lavender bushes, an intimate sanctuary ideal for celebrations and family gatherings.",
                "capacity": "6 to 12 Guests",
                "timing": "Lunch & Dinner",
                "price": "€280 per guest",
                "features": ["Dedicated Waitstaff & Chef Tableside", "Custom Menu Curation", "Acoustic Privacy"],
                "order": 2
            },
            {
                "title": "Sommelier Vault & Wine Cellar Journey",
                "subtitle": "Private cave tasting accompanied by rare coastal pairings",
                "description": "Head Sommelier Eléonore Mercier guides you through historic vintages followed by a 5-course tailored pairing dinner.",
                "capacity": "Up to 8 Guests",
                "timing": "Evening by advance reservation",
                "price": "€320 per guest",
                "features": ["Cellar Tour & Rare Bottle Degustation", "Private Vault Seating", "Sommelier Masterclass"],
                "order": 3
            }
        ]
        for exp in experiences_data:
            DiningExperience.objects.create(**exp)
        self.stdout.write(self.style.SUCCESS(f"Created {len(experiences_data)} Dining Experiences."))

        # 7. Team Members
        TeamMember.objects.all().delete()
        team_data = [
            {
                "name": "Marco Valenti",
                "role": "Executive Chef",
                "bio": "Raised between the Ligurian coast and Nice, Chef Marco brings 22 years of fine dining mastery, having trained under Alain Ducasse before joining Villa Riviera in 2018.",
                "credentials": "3 Michelin Stars, Meilleur Ouvrier de France Guest Master",
                "order": 1
            },
            {
                "name": "Eléonore Mercier",
                "role": "Head Sommelier",
                "bio": "Guardian of our 480-label subterranean cellar. Eléonore focuses passionately on biodynamic coastal vineyards from Bandol to Santorini.",
                "credentials": "Best Sommelier Côte d'Azur 2021",
                "order": 2
            },
            {
                "name": "Giancarlo Rossi",
                "role": "Maître de Maison",
                "bio": "With three decades orchestrating luxury hospitality on the Riviera, Giancarlo delivers warm, aristocratic yet unpretentious warmth to every guest.",
                "credentials": "Grand Table de France Distinction",
                "order": 3
            }
        ]
        for member in team_data:
            TeamMember.objects.create(**member)
        self.stdout.write(self.style.SUCCESS("Team members created."))

        # 8. Testimonials & Accolades
        Testimonial.objects.all().delete()
        testimonials_data = [
            {
                "quote": "A breathtaking tribute to Mediterranean light and sea-harvest purity. The villa's stone terraces and Valenti's amberjack crudo are unforgettable.",
                "author": "Michelin Guide France 2025",
                "source_title": "Three Stars & Sommelier Special Prize",
                "rating": 5,
                "order": 1
            },
            {
                "quote": "Riviera dining elevated to architectural poetry. Remarkable harmony between coastal landscape and culinary precision.",
                "author": "Le Figaro Gastronomie",
                "source_title": "Coastal Restaurant of the Year",
                "rating": 5,
                "order": 2
            },
            {
                "quote": "An essential Mediterranean pilgrimage where time gently suspends over Cap-Ferrat. Hospitality in its most noble, natural form.",
                "author": "The World's 50 Best Discovery",
                "source_title": "Global Luxury Distinction",
                "rating": 5,
                "order": 3
            }
        ]
        for t in testimonials_data:
            Testimonial.objects.create(**t)
        self.stdout.write(self.style.SUCCESS("Testimonials created."))

        # 9. Gallery Images
        GalleryImage.objects.all().delete()
        gallery_data = [
            {"title": "Villa Riviera Limestone Arches", "category": "Architecture", "image_url": "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80", "caption": "Hand-chiseled Provençal limestone framing the Mediterranean", "order": 1},
            {"title": "Sunset Table Setting on Cliffside Terrace", "category": "Terrace", "image_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", "caption": "Draped linen and ambient candlelight overlooking the waves", "order": 2},
            {"title": "Crudo di Ricciola al Bergamotto", "category": "Culinary", "image_url": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80", "caption": "Wild yellowtail amberjack with coastal citrus pearls", "order": 3},
            {"title": "Main Dining Salon Vaults", "category": "Salon", "image_url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80", "caption": "Double-height stone arches and custom bronze lighting", "order": 4},
            {"title": "Subterranean Wine Cellar Tasting", "category": "Cellar", "image_url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80", "caption": "Over 480 rare vintages aging in natural limestone vault", "order": 5},
            {"title": "Sanremo Red Prawn Carpaccio", "category": "Culinary", "image_url": "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80", "caption": "Delicately pounded prawns with wild fennel pollen", "order": 6}
        ]
        for img in gallery_data:
            GalleryImage.objects.create(**img)
        self.stdout.write(self.style.SUCCESS("Gallery items created."))

        # 10. Sample Inquiries
        Reservation.objects.all().delete()
        sample_res = [
            {
                "full_name": "Lord Julian Hastings",
                "email": "hastings@monacoyacht.com",
                "phone": "+377 98 06 20 00",
                "date": "2026-06-18",
                "time": "20:00",
                "guests": 4,
                "seating_area": "Sunset Terrace & Sea View",
                "special_requests": "Arriving by private yacht tender. Requesting tableside salt-crusted sea bass.",
                "status": "Confirmed"
            },
            {
                "full_name": "Camilla von Berg",
                "email": "c.vonberg@zurich-arts.ch",
                "phone": "+41 44 211 40 50",
                "date": "2026-06-20",
                "time": "19:30",
                "guests": 2,
                "seating_area": "Olive Grove Pergola",
                "special_requests": "Celebrating 20th wedding anniversary. Wine pairing requested.",
                "status": "Pending"
            }
        ]
        for r in sample_res:
            Reservation.objects.create(**r)
        self.stdout.write(self.style.SUCCESS("Sample reservations created."))

        self.stdout.write(self.style.SUCCESS("Villa Riviera database successfully initialized!"))
