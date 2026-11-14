from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import SiteConfig, Reservation

INITIAL_SKYLINE_DATA = {
    "restaurant_name": "SKYLINE",
    "theme": {
        "colors": {
            "midnight": "#101C2C",
            "skyline_blue": "#263F5A",
            "champagne": "#D8C3A0",
            "cloud_ivory": "#F3F0E9",
            "sunset_copper": "#C47A56",
            "twilight_slate": "#64788A",
            "deep_charcoal": "#171C22",
            "warm_amber": "#E7A75B"
        },
        "typography": {
            "fontDisplay": "Cormorant Garamond",
            "fontBody": "Manrope",
            "fontAccent": "DM Sans"
        }
    },
    "hero": {
        "restaurant_name": "SKYLINE",
        "eyebrow": "ELEVATED ROOFTOP DINING & HORIZON LOUNGE",
        "elevation_badge": "Level 54 • 220m Above The City",
        "title": "WHERE THE CITY TOUCHES THE SKY",
        "tagline": "Elevated Urban Dining • Panoramic Rooftop Terrace • Sunset Cocktails",
        "lead_description": "Suspended 220 meters above the metropolis, SKYLINE unites architectural boldness, 360-degree panoramic vistas, and progressive fine dining above the clouds.",
        "cta_primary_text": "Reserve A Table",
        "cta_secondary_text": "Explore Virtual Tour",
        "stats": [
            {"number": "220m", "label": "Elevation Above City"},
            {"number": "360°", "label": "Panoramic Horizon"},
            {"number": "1,200", "label": "Rare Cellar Bottles"},
            {"number": "54th", "label": "Tower Crown Level"}
        ]
    },
    "brandStory": {
        "title": "Culinary Artistry Above the Horizon",
        "subtitle": "Our Story & Vision",
        "badge": "Est. 2021 • Crown of Horizon Tower",
        "body_paragraph_1": "Conceived as an architectural sanctuary above the urban frenzy, SKYLINE transforms the traditional dining experience into an elevated sensory journey. Here, the boundary between interior luxury and the endless atmospheric sky dissolves through frameless glass facades and open-air cantilevered decks.",
        "body_paragraph_2": "Our culinary philosophy celebrates the drama of twilight. As the sun dips beneath the metropolitan skyline, our kitchen presents visionary dishes that harmonize seasonal organic harvest, pristine oceanic catches, and the world's most sought-after vintage reserves.",
        "quote": "Dining at this altitude is not merely about the view; it is about feeling liberated from the world below while savoring culinary perfection.",
        "quote_author": "Chef Julian Moreau",
        "pillars": [
            {
                "title": "Panoramic Horizon Perspective",
                "desc": "Unobstructed 360-degree views spanning the urban landscape, waterfront bays, and distant mountain silhouettes."
            },
            {
                "title": "Architectural Fluidity & Glasswork",
                "desc": "Seamless transition from climate-sheltered glasshouse pavilions to open-air cantilevered terraces."
            },
            {
                "title": "Twilight Culinary Craftsmanship",
                "desc": "A refined gastronomy fusing modern French technique with vibrant global botanical infusions."
            }
        ],
        "image_main": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
        "image_detail": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
    },
    "virtualTour": {
        "title": "Skyline Rooftop Virtual Tour",
        "subtitle": "Ascend Through 5 Architectural Viewpoints",
        "description": "Experience our rooftop architecture in immersive 3D, from the high-speed elevator arrival to the cantilevered sunset terrace.",
        "viewpoints": [
            {
                "id": "skyline_exterior",
                "number": "01",
                "name": "Level 54 Cantilevered Terrace Exterior",
                "cameraPos": [0, 4.2, 11.5],
                "target": [0, 1.8, 0],
                "description": "Dramatic glass-and-steel facade cantilevered over the city boulevard with illuminated bronze fins and panoramic sunset skies.",
                "details": ["Cantilevered Glass Deck", "Architectural Bronze Brise-Soleil", "Twilight Sky Horizon"]
            },
            {
                "id": "arrival",
                "number": "02",
                "name": "Rooftop Arrival & Concierge Vestibule",
                "cameraPos": [-3.5, 2.2, 6.0],
                "target": [-0.5, 1.5, 0],
                "description": "High-speed private elevator entrance lined with backlit champagne onyx, sculptural bronze lighting, and host concierge.",
                "details": ["Backlit Champagne Onyx Portal", "High-Speed Sky Elevators", "Sculptural Bronze Chandeliers"]
            },
            {
                "id": "open_terrace",
                "number": "03",
                "name": "Open-Air Sunset Dining Terrace",
                "cameraPos": [0, 2.0, 5.5],
                "target": [0, 1.2, -1.0],
                "description": "Open-air teak dining terrace with frameless acoustic glass windbreaks, linear glowing fire pits, and west-facing sunset tables.",
                "details": ["Frameless Windbreak Glass", "Acoustic Teak Planking", "Linear Bronze Fire Pits"]
            },
            {
                "id": "indoor_lounge",
                "number": "04",
                "name": "Indoor Glasshouse Dining Lounge",
                "cameraPos": [3.2, 2.2, 4.8],
                "target": [0.8, 1.4, -0.5],
                "description": "Climate-controlled double-height glasshouse featuring curved velvet banquettes, champagne acoustic ceiling vaults, and table-side service.",
                "details": ["Double-Height Low-Iron Glazing", "Curved Velvet Banquettes", "Champagne Gold Ceiling Vaults"]
            },
            {
                "id": "cocktail_bar",
                "number": "05",
                "name": "Horizon Onyx Bar & Sunset Alcove",
                "cameraPos": [-3.8, 2.0, 4.0],
                "target": [-1.2, 1.3, 0],
                "description": "A 12-meter illuminated golden onyx bar surrounded by high-top leather seating, rare spirits display, and prime skyline views.",
                "details": ["12-Meter Backlit Onyx Counter", "Rare Spirit & Mezcal Vault", "Starlight Acoustic Atmosphere"]
            }
        ]
    },
    "diningExperience": {
        "title": "Distinct Rooftop Dining Dimensions",
        "subtitle": "Atmosphere & Architecture",
        "spaces": [
            {
                "id": "terrace",
                "name": "Open-Air Sunset Terrace",
                "tag": "Alfresco Dining",
                "desc": "Dine under open skies with unobstructed horizon views, heated teak deck floors, and glowing linear fire pits.",
                "features": ["Heated Teak Decking", "Frameless Glass Parapet", "Sunset View Guarantee"],
                "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "glasshouse",
                "name": "Glasshouse Sky Lounge",
                "tag": "All-Weather Elegance",
                "desc": "Double-height floor-to-ceiling glass pavilions offering panoramic city lights in temperature-controlled luxury.",
                "features": ["Curved Velvet Booths", "Acoustic Champagne Ceiling", "Centerpiece Floral Installation"],
                "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "private_suite",
                "name": "Private Horizon Suite",
                "tag": "Exclusive Dinners",
                "desc": "An intimate private dining salon with its own cantilevered balcony, dedicated sommelier, and private kitchen access.",
                "features": ["Seats up to 18 Guests", "Private Skyline Balcony", "Custom Tasting Menus"],
                "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "onyx_bar",
                "name": "Twilight Cocktail Terrace",
                "tag": "Mixology & Sunset",
                "desc": "A vibrant high-altitude cocktail destination featuring artisanal spirits, botanical infusions, and live twilight lounge sounds.",
                "features": ["Illuminated Onyx Bar", "Handcrafted Ice Program", "Curated Vinyl DJ Sessions"],
                "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=85"
            }
        ]
    },
    "signatureDishes": {
        "title": "Signature Skyline Culinary Creations",
        "subtitle": "Crafted By Master Chefs at 220 Meters",
        "dishes": [
            {
                "id": "wagyu_ribeye",
                "name": "Miyazaki A5 Wagyu Ribeye",
                "category": "Main Courses",
                "price": "$125",
                "badge": "Signature",
                "description": "Charred over Japanese Binchotan coals, finished with smoked bone marrow jus, caramelized sunchoke purée, and shaved Périgord black truffle.",
                "ingredients": ["A5 Miyazaki Wagyu", "Périgord Black Truffle", "Bone Marrow Emulsion", "Sunchoke"],
                "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "chilean_seabass",
                "name": "Glazed Chilean Glacier Seabass",
                "category": "Seafood",
                "price": "$78",
                "badge": "Guest Favorite",
                "description": "Pan-seared Patagonian toothfish in aged saikyo sweet miso glaze, accompanied by lemongrass dashi broth and ginger-charred baby bok choy.",
                "ingredients": ["Patagonian Toothfish", "Saikyo White Miso", "Lemongrass Dashi", "Baby Bok Choy"],
                "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "caviar_scallop",
                "name": "Oscietra Caviar & Hokkaido Scallop",
                "category": "Cold Starters",
                "price": "$64",
                "badge": "Culinary Art",
                "description": "Hand-dived Hokkaido scallop carpaccio crowned with Royal Oscietra Caviar, finger lime pearls, and sea buckthorn vinaigrette.",
                "ingredients": ["Royal Oscietra Caviar", "Hokkaido Sea Scallop", "Australian Finger Lime", "Dill Oil"],
                "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "duck_breast",
                "name": "Dry-Aged Duck Breast & Blood Orange",
                "category": "Poultry",
                "price": "$72",
                "badge": "Seasonal",
                "description": "14-day dry-aged duck breast with honey-lavender crust, parsnip velvet, charred endive, and Sicilian blood orange reduction.",
                "ingredients": ["Dry-Aged Duck", "Sicilian Blood Orange", "Lavender Honey", "Parsnip Velvet"],
                "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "skyline_chocolate",
                "name": "Skyline Golden Chocolate Orb",
                "category": "Desserts",
                "price": "$32",
                "badge": "Showstopper",
                "description": "Dark Valrhona chocolate sphere adorned with 24k edible gold, cracked table-side with hot smoked hazelnut praline ganache.",
                "ingredients": ["Valrhona 72% Dark Chocolate", "24K Gold Leaf", "Smoked Hazelnut Praline", "Tonka Bean Gelato"],
                "image": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=85"
            }
        ]
    },
    "menu": {
        "title": "Curated Seasonal Menus",
        "subtitle": "Tasting Menus, À La Carte & Rare Reserve Cellar",
        "categories": [
            {
                "id": "tasting",
                "name": "Twilight Tasting (7 Courses)",
                "price": "$195 per guest",
                "pairing": "+$110 Grand Reserve Wine Pairing",
                "items": [
                    {"name": "Oscietra Caviar & Sea Scallop", "desc": "Finger lime, dashi jelly, sea herbs"},
                    {"name": "Caramelized Foie Gras Tartlet", "desc": "Mission fig, spiced brioche, port reduction"},
                    {"name": "Glazed Chilean Seabass", "desc": "Saikyo miso, lemongrass broth, sea succulents"},
                    {"name": "Kobe A5 Wagyu Tenderloin", "desc": "Morel mushrooms, charred shallot, black truffle jus"},
                    {"name": "Pre-Dessert Yuzu Sorbet", "desc": "Champagne granite, shiso blossom"},
                    {"name": "Skyline Golden Chocolate Orb", "desc": "Valrhona 72%, smoked praline, gold leaf"}
                ]
            },
            {
                "id": "alacarte",
                "name": "Skyline À La Carte",
                "items": [
                    {"name": "Charred Octopus & Romesco", "price": "$38", "desc": "Spanish octopus, smoked almond romesco, fingerling chips"},
                    {"name": "Black Truffle Tagliolini", "price": "$52", "desc": "Handmade pasta, 36-month Parmigiano Reggiano, fresh black truffle"},
                    {"name": "Roasted Rack of Colorado Lamb", "price": "$84", "desc": "Herb crust, ratatouille tarte tatin, rosemary jus"},
                    {"name": "Prime Dry-Aged Bone-In Ribeye (32oz)", "price": "$175", "desc": "Serves two, roasted garlic head, bordelaise sauce"}
                ]
            },
            {
                "id": "cocktails",
                "name": "Artisan Horizon Cocktails",
                "items": [
                    {"name": "The Cloud 54", "price": "$26", "desc": "Japanese Roku gin, lychee cordial, violet liqueur, sparkling champagne cloud foam"},
                    {"name": "Sunset Solstice", "price": "$28", "desc": "Smoked mezcal, blood orange nectar, aperitivo bitter, rosemary smoke bubble"},
                    {"name": "Twilight Sazerac", "price": "$30", "desc": "WhistlePig 10yr Rye, Peychaud bitters, absinthe rinse, gold dust atomizer"},
                    {"name": "Horizon Highball", "price": "$24", "desc": "Hibiki Harmony whisky, hand-carved ice pillar, clarified grapefruit soda"}
                ]
            },
            {
                "id": "cellar",
                "name": "Grand Reserve Sommelier Cellar",
                "items": [
                    {"name": "Dom Pérignon Vintage Champagne 2013", "price": "$480", "desc": "Épernay, France • Crisp brioche, white peach, toasted almond"},
                    {"name": "Château Margaux Premier Grand Cru 2010", "price": "$1,450", "desc": "Bordeaux, France • Velvety cassis, graphite, violet aromatics"},
                    {"name": "Opus One Proprietary Red 2018", "price": "$780", "desc": "Napa Valley, USA • Black plum, dark cocoa, supple fine tannins"},
                    {"name": "Sassicaia Tenuta San Guido 2016", "price": "$620", "desc": "Bolgheri, Italy • Wild blackberry, Mediterranean herbs, crushed stone"}
                ]
            }
        ]
    },
    "architecture": {
        "title": "Architectural Design & Engineering",
        "subtitle": "Cantilevered Glass & Panoramic Vistas",
        "quote": "We did not build another rooftop restaurant; we designed a floating observatory where architecture steps back and lets the skyline become the living wall.",
        "quote_author": "Lead Architect Elena Rostova",
        "features": [
            {
                "title": "Cantilevered Glass Skydeck",
                "desc": "A 15-meter cantilever structured from high-strength structural steel and triple-laminated optical glass, providing dramatic downward city views."
            },
            {
                "title": "Aerodynamic Windbreaks",
                "desc": "Custom-engineered aerodynamic glass balustrades that deflect high-altitude winds upward, preserving a serene candlelit dining climate."
            },
            {
                "title": "Climate-Smart Louvered Pergolas",
                "desc": "Automated bioclimatic motorized roofs and concealed infrared heating arrays that adapt in real time to weather shifts."
            },
            {
                "title": "Sunset Acoustic Engineering",
                "desc": "Perforated bronze sound-absorbing ceiling geometries engineered to balance lively ambient music with intimate conversational privacy."
            }
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
    },
    "chef": {
        "name": "Chef Julian Moreau",
        "title": "Executive Chef & Culinary Director",
        "bio": "Trained across three-Michelin-starred kitchens in Paris, Tokyo, and San Francisco, Chef Julian Moreau brings over two decades of uncompromising mastery to SKYLINE. His cuisine pairs classical French technical rigor with the vibrant, umami-rich philosophies of modern Pacific culinary cultures.",
        "quote": "At 220 meters, dining is both celebratory and transcendent. Every dish we plate reflects the beauty of the skyline outside our windows.",
        "accolades": [
            "Michelin Star Laureate (2019, 2022, 2024)",
            "World's 50 Best Discovery Award",
            "Culinary Director of the Year • Gastronomy Review"
        ],
        "image": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
    },
    "specialExperiences": {
        "title": "Curated Horizon Celebrations",
        "subtitle": "From Sunset Aperitivo to Stargazing Buyouts",
        "experiences": [
            {
                "title": "Sunset Golden Hour Aperitivo",
                "time": "Daily • 5:00 PM - 7:00 PM",
                "desc": "Celebrate the golden transition of light with artisan cocktail flights, champagne flutes, and Chef's crudo selection on the western terrace.",
                "price": "From $85 per guest"
            },
            {
                "title": "Level 54 Exclusive Buyout",
                "time": "Available by Inquiry",
                "desc": "Command the entire 54th floor for weddings, global product launches, or private gala celebrations accommodating up to 180 guests.",
                "price": "Custom Bespoke Proposals"
            },
            {
                "title": "Midnight Stargazing & Reserve Wine Tasting",
                "time": "Fridays & Saturdays • 10:30 PM - 1:00 AM",
                "desc": "An intimate late-night tasting hosted by our Master Sommelier featuring rare vintage reserves paired with artisanal charcuterie and cheeses.",
                "price": "$160 per guest"
            },
            {
                "title": "Skyline Chef's Table Horizon Experience",
                "time": "Tuesday - Sunday • 7:30 PM Seating",
                "desc": "A front-row 8-seat exclusive culinary counter experience directly adjacent to the finishing kitchen with Chef Julian Moreau.",
                "price": "$285 per guest"
            }
        ]
    },
    "gallery": {
        "title": "Panoramic Visual Gallery",
        "subtitle": "Moments Captured in the Clouds",
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
                "title": "Twilight Over Open-Air Terrace",
                "category": "Architecture"
            },
            {
                "url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
                "title": "Miyazaki Wagyu Ribeye Plating",
                "category": "Culinary"
            },
            {
                "url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85",
                "title": "Glasshouse Sky Lounge Dining",
                "category": "Interior"
            },
            {
                "url": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1000&q=85",
                "title": "Backlit Onyx Sunset Bar",
                "category": "Cocktails"
            },
            {
                "url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
                "title": "Oscietra Caviar & Scallop Crudo",
                "category": "Culinary"
            },
            {
                "url": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=85",
                "title": "24k Golden Chocolate Sphere",
                "category": "Desserts"
            }
        ]
    },
    "testimonials": {
        "title": "Critical Acclaim & Guest Honors",
        "subtitle": "Global Hospitality Recognition",
        "reviews": [
            {
                "quote": "SKYLINE redefines high-altitude luxury. The interplay between panoramic sunset vistas and Chef Moreau's uncompromising technique makes this one of the world's truly breathtaking dining destinations.",
                "author": "Michelin Guide Review",
                "role": "Inspector's Choice Award",
                "rating": 5
            },
            {
                "quote": "A masterclass in contemporary rooftop architecture. The cantilevered glass deck and acoustic wind protection allow guests to feel completely embraced by the sky.",
                "author": "Architectural Digest",
                "role": "Global Design Feature",
                "rating": 5
            },
            {
                "quote": "Sitting by the fire pits as the city lights illuminate below while savoring the Miyazaki Wagyu is an unforgettable dining memory.",
                "author": "Condé Nast Traveler",
                "role": "World's Best Rooftop Restaurants",
                "rating": 5
            }
        ]
    },
    "reservation": {
        "title": "Table Reservations",
        "subtitle": "Secure Your Place Above the City",
        "description": "Reservations open 30 days in advance. For parties of 7 or more or private Horizon Suite buyouts, please contact our VIP Guest Relations desk directly.",
        "policy": "Smart elegant attire requested. We uphold a 48-hour cancellation policy for all elevated tasting experiences.",
        "times": ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"],
        "seating_options": [
            {"value": "outdoor_terrace", "label": "Open-Air Sunset Terrace"},
            {"value": "indoor_lounge", "label": "Indoor Sky Lounge"},
            {"value": "window_side", "label": "Horizon Window Table"},
            {"value": "private_room", "label": "Private Horizon Suite"},
            {"value": "any", "label": "Best Available Seating"}
        ]
    },
    "location": {
        "title": "Location, Arrival & Skyline Coordinates",
        "subtitle": "Crown of Horizon Tower",
        "address": "Level 54, Horizon Tower, 800 Skyline Boulevard, Metropolitan Center",
        "phone": "+1 (555) 890-7599",
        "email": "concierge@skyline-rooftop.com",
        "hours": "Tuesday - Sunday: 5:00 PM - 1:00 AM • Sunset Seating from 5:30 PM (Closed Mondays)",
        "coordinates": "40.7580° N, 73.9855° W • Elevation: 220 Meters",
        "arrival_notes": "Complimentary VIP Valet at Horizon Tower South Porte-Cochère. Dedicated express high-speed elevators transport guests directly to Level 54 in 38 seconds."
    },
    "footer": {
        "copyright": "© 2026 SKYLINE Rooftop Restaurant & Horizon Lounge. All rights reserved.",
        "social": {
            "instagram": "https://instagram.com",
            "facebook": "https://facebook.com",
            "twitter": "https://twitter.com"
        }
    }
}

class Command(BaseCommand):
    help = 'Seeds initial Skyline Rooftop CMS configuration and ensures admin user exists.'

    def handle(self, *args, **kwargs):
        # 1. Ensure admin user exists
        admin_user, created = User.objects.get_or_create(username='admin')
        if created or not admin_user.check_password('adminpassword123'):
            admin_user.set_password('adminpassword123')
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.email = 'admin@skyline-rooftop.com'
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Admin user created/updated: username='admin', password='adminpassword123'"))
        else:
            self.stdout.write(self.style.SUCCESS("Admin user already verified."))

        # 2. Seed SiteConfig
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(
                restaurant_name="SKYLINE",
                content_json=INITIAL_SKYLINE_DATA,
                is_published=True,
                updated_by=admin_user
            )
            self.stdout.write(self.style.SUCCESS("Initialized new SiteConfig for SKYLINE Rooftop."))
        else:
            config.restaurant_name = "SKYLINE"
            config.content_json = INITIAL_SKYLINE_DATA
            config.is_published = True
            config.updated_by = admin_user
            config.save()
            self.stdout.write(self.style.SUCCESS("Updated existing SiteConfig with latest Skyline Rooftop data."))

        # 3. Seed sample reservation
        if Reservation.objects.count() == 0:
            Reservation.objects.create(
                full_name="Alexander Wright",
                phone="+1 (555) 432-8765",
                email="alex.wright@horizonventures.com",
                date="2026-11-20",
                time="7:30 PM",
                guests="4 Guests",
                seating_preference="outdoor_terrace",
                occasion="Anniversary Dinner",
                special_requests="Prefers sunset view table near the fire pit. Ordering the 7-course Twilight Tasting.",
                status="confirmed"
            )
            Reservation.objects.create(
                full_name="Sophia Chen",
                phone="+1 (555) 678-9123",
                email="sophia.chen@designstudio.org",
                date="2026-11-22",
                time="8:00 PM",
                guests="2 Guests",
                seating_preference="window_side",
                occasion="Birthday Celebration",
                special_requests="Window-side table with skyline lights view. Chocolate Orb dessert with personalized candle.",
                status="pending"
            )
            self.stdout.write(self.style.SUCCESS("Created sample seed reservations."))

        self.stdout.write(self.style.SUCCESS("Skyline Rooftop CMS initialization complete!"))
