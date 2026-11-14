import json
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import SiteConfig, Reservation

INITIAL_PARISIAN_DATA = {
    "name": "L'ÉTOILE ROYALE",
    "subname": "Salon Gastronomique & Bar à Champagne",
    "tagline": "The Art of Dining, Beautifully Reimagined",
    "shortStory": "Inspired by the architectural grandeur of 18th-century Parisian townhouses and the timeless discipline of French haute cuisine, L'ÉTOILE ROYALE unites classical European culinary heritage with contemporary luxury hospitality.",
    "city": "Dhaka",
    "country": "Bangladesh",
    "currency": "৳",
    "currencyCode": "BDT",
    "theme": {
        "designDirection": "parisian-fine-dining",
        "colors": {
            "burgundy": "#54252F",
            "gold": "#C5A46D",
            "ivory": "#F5F0E7",
            "charcoal": "#202124",
            "taupe": "#A89B8B",
            "olive": "#73765F",
            "primaryButtonBg": "#54252F",
            "primaryButtonText": "#F5F0E7",
            "primaryButtonBorder": "#C5A46D"
        },
        "typography": {
            "fontDisplay": "Playfair Display",
            "fontBody": "DM Sans",
            "fontEditorial": "Cormorant Garamond",
            "heroHeadingSize": 96,
            "sectionHeadingSize": 64,
            "bodySize": 16
        }
    },
    "contact": {
        "address": "Le Manoir Royale, Avenue 62, Gulshan 2",
        "cityArea": "Gulshan 2, Dhaka 1212",
        "fullAddress": "Le Manoir Royale, Avenue 62, Gulshan 2, Dhaka 1212, Bangladesh",
        "phone": "+880 1711-443322",
        "phoneDisplay": "+880 1711 443322",
        "email": "concierge@letoile-royale.com",
        "whatsapp": "+8801711443322",
        "whatsappDisplay": "+880 1711 443322",
        "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700319760742!2d90.4072!3d23.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0xf6b567546e90a53!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
        "googleMapsDirectionsUrl": "https://maps.google.com/?q=Gulshan+2+Dhaka"
    },
    "hours": [
        { "days": "Tuesday – Sunday (Le Déjeuner)", "time": "12:00 PM – 3:30 PM" },
        { "days": "Tuesday – Sunday (Le Dîner)", "time": "6:30 PM – 11:30 PM" },
        { "days": "Monday", "time": "Closed for Private Events & Market Sourcing" }
    ],
    "social": {
        "instagram": "https://instagram.com/letoile.royale",
        "facebook": "https://facebook.com/letoile.royale",
        "youtube": "https://youtube.com/@letoileroyale"
    },
    "hero": {
        "eyebrow": "AN ADDRESS FOR EXCEPTIONAL DINING",
        "title": "The Art of Dining, Beautifully Reimagined.",
        "frenchSubtitle": "L'Élégance Française Rencontre la Haute Gastronomie",
        "description": "Discover a refined dining experience inspired by French culinary tradition, thoughtful craftsmanship, and the timeless elegance of Parisian hospitality.",
        "primaryCta": "RESERVE YOUR TABLE",
        "secondaryCta": "EXPLORE THE RESTAURANT",
        "locationBadge": "AVENUE 62, GULSHAN 2",
        "fallbackImage": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1600&auto=format&fit=crop"
    },
    "heritage": {
        "eyebrow": "OUR STORY",
        "title": "A Celebration of French Dining & Timeless Elegance.",
        "frenchSubtitle": "Une Histoire d'Art et de Passion",
        "lead": "Inspired by the traditions of French gastronomy and the beauty of thoughtful hospitality, our restaurant brings together carefully selected ingredients, refined preparation, and an atmosphere designed for memorable moments.",
        "description": "From the soaring arched French doors and Carrara marble portals to crystal chandeliers casting amber warmth across burgundy velvet salon chairs, L'ÉTOILE ROYALE reflects the romance of Paris. Every service is conducted with discretion, warmth, and culinary precision.",
        "secondaryStatement": "Every table tells a story. Every detail has a purpose.",
        "cta": "READ OUR COMPLETE STORY",
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
    },
    "tourViewpoints": [
        {
            "id": "exterior-entrance",
            "number": "01",
            "name": "Parisian Townhouse Facade",
            "caption": "An Imposing Welcome",
            "description": "Limestone facade glowing under warm champagne sconces, tall arched French windows, and wrought-iron balconies welcoming patrons into private European seclusion.",
            "cameraPos": [0, 2.2, 12],
            "cameraTarget": [0, 1.6, 0],
            "sceneMood": "golden-hour",
            "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "reception-welcome",
            "number": "02",
            "name": "Grand Entrance & Reception",
            "caption": "Step into French Refinement",
            "description": "Carrara marble chequered flooring, hand-rubbed brass console fixtures, and grand arched mirrors reflecting soft chandelier light.",
            "cameraPos": [-3, 1.8, 6],
            "cameraTarget": [0, 1.5, 0],
            "sceneMood": "warm-amber",
            "image": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "main-dining",
            "number": "03",
            "name": "The Main Dining Salon",
            "caption": "Intimate Parisian Elegance",
            "description": "Bespoke dark walnut dining tables set with crisp cream linens, crystal Riedel stemware, and plush burgundy velvet banquettes.",
            "cameraPos": [0, 2, 7],
            "cameraTarget": [0, 1.2, 0],
            "sceneMood": "crystal-chandelier",
            "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "champagne-lounge",
            "number": "04",
            "name": "Bar & Champagne Lounge",
            "caption": "Sophisticated Evening Hospitality",
            "description": "Curated selection of Grand Cru Champagnes displayed behind illuminated brass etageres with intimate velvet armchair seating.",
            "cameraPos": [2.5, 1.8, 5],
            "cameraTarget": [0, 1.4, 0],
            "sceneMood": "intimate-glow",
            "image": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "kitchen-prep",
            "number": "05",
            "name": "Kitchen & Haute Cuisine Preparation",
            "caption": "The Precision of French Mastery",
            "description": "A state-of-the-art open culinary theatre where sauces are reduced to perfection and plates are finished with artisanal French technique.",
            "cameraPos": [-2, 2.2, 5],
            "cameraTarget": [0, 1.5, 0],
            "sceneMood": "precision-bright",
            "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1400&auto=format&fit=crop"
        }
    ],
    "diningPillars": [
        {
            "number": "01",
            "title": "French Culinary Heritage",
            "frenchSubtitle": "L'Héritage Gastronomique",
            "lead": "Classical Technique & Artisanal Sourcing",
            "description": "A thoughtful appreciation of French culinary traditions, stocks slow-simmered for 48 hours, and wild seasonal ingredients imported directly from Brittany, Normandy, and Périgord.",
            "image": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
        },
        {
            "number": "02",
            "title": "Refined Atmosphere",
            "frenchSubtitle": "Atmosphère & Décor",
            "lead": "Sensory Balance in Stone & Velvet",
            "description": "Carefully composed interiors, warm acoustic velvet drapery, crystal chandeliers, and intimate dining alcoves create an environment of comfort, distinction, and romance.",
            "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop"
        },
        {
            "number": "03",
            "title": "Exceptional Hospitality",
            "frenchSubtitle": "Le Service à la Française",
            "lead": "Attentive, Discreet & Intuitive",
            "description": "Attentive sommelier pairings, tableside carving, and thoughtful hospitality ensuring that every dining occasion becomes an enduring, cherished memory.",
            "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
        }
    ],
    "signatureDishes": [
        {
            "id": "canard-miel",
            "name": "Canard Rôti au Miel et Lavande",
            "frenchName": "Magret de Canard Rôti",
            "category": "Main Course",
            "price": "৳ 4,600",
            "description": "Pan-roasted Challandais duck breast glazed with Provençal lavender honey, spiced parsnip mousseline, and cherry griotte reduction.",
            "tastingNote": "Rich, tender duck breast balanced by aromatic floral honey sweetness and bright cherry acidity.",
            "tags": ["Chef's Signature", "Gluten-Free"],
            "image": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
            "isSignature": True
        },
        {
            "id": "filet-boeuf",
            "name": "Filet de Bœuf Périgourdine",
            "frenchName": "Filet Mignon aux Truffes",
            "category": "Charcoal Grill",
            "price": "৳ 7,800",
            "description": "Prime black Angus tenderloin seared over charcoal, pan-seared Rougié foie gras escalope, Périgord black truffle sauce, and potato mille-feuille.",
            "tastingNote": "Decadent melt-in-mouth richness with deep earthy winter truffle aroma and buttery potato crunch.",
            "tags": ["House Specialty"],
            "image": "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop",
            "isSignature": True
        },
        {
            "id": "coquilles-saint-jacques",
            "name": "Coquilles Saint-Jacques au Beurre Noisette",
            "frenchName": "Saint-Jacques Rôties",
            "category": "Seafood",
            "price": "৳ 3,800",
            "description": "Pan-seared Atlantic sea scallops in brown noisette butter, silky cauliflower purée, crispy capers, and Oscietra caviar pearls.",
            "tastingNote": "Sweet oceanic caramelization lifted by nutty brown butter warmth and briny caviar pop.",
            "tags": ["Signature", "Gluten-Free"],
            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop",
            "isSignature": True
        },
        {
            "id": "souffle-grand-marnier",
            "name": "Soufflé Chaud au Grand Marnier",
            "frenchName": "Soufflé Traditionnel",
            "category": "Dessert",
            "price": "৳ 1,800",
            "description": "Air-light warm orange liqueur soufflé baked to order, served tableside with Madagascar Bourbon vanilla bean crème anglaise.",
            "tastingNote": "Feather-light ethereal rise with warm candied orange blossom perfume and silky cool cream.",
            "tags": ["Vegetarian"],
            "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop",
            "isSignature": True
        }
    ],
    "menuCategories": [
        {
            "id": "entrees",
            "name": "Entrées & French Starters",
            "frenchName": "Pour Commencer",
            "description": "Classic French appetizers, delicate seafood, and house-cured terrines.",
            "items": [
                { "name": "Foie Gras Poêlé aux Figues", "price": "৳ 3,200", "description": "Pan-seared duck liver with caramelized black mission figs and brioche feuilletée.", "tags": ["Signature"] },
                { "name": "Escargots de Bourgogne (6 pcs)", "price": "৳ 2,200", "description": "Burgundy snails baked in garlic parsley herb butter with crisp baguette.", "tags": [] },
                { "name": "Tartare de Bœuf Traditionnel", "price": "৳ 2,600", "description": "Hand-cut beef tenderloin, cornichons, shallots, egg yolk, and pomme allumette.", "tags": ["GF"] },
                { "name": "Carpaccio de Saint-Jacques", "price": "৳ 2,800", "description": "Thinly sliced raw scallops with lime zest, pink peppercorns, and cold-pressed olive oil.", "tags": ["GF"] }
            ]
        },
        {
            "id": "soupes-salades",
            "name": "Soupes & Salades",
            "frenchName": "Potages & Salades",
            "description": "Slow-simmered classical consommés and seasonal French garden salads.",
            "items": [
                { "name": "Soupe à l'Oignon Gratinée", "price": "৳ 1,600", "description": "Caramelized French onion soup, beef stock, sourdough crouton, melted Gruyère.", "tags": ["Classic"] },
                { "name": "Bisque de Homard Breton", "price": "৳ 2,600", "description": "Velvety Brittany blue lobster bisque finished with cognac and tarragon cream.", "tags": ["GF"] },
                { "name": "Salade Lyonnaise au Lardon", "price": "৳ 1,800", "description": "Frisée greens, crispy smoked duck bacon lardons, poached egg, Dijon vinaigrette.", "tags": [] }
            ]
        },
        {
            "id": "poissons",
            "name": "Poissons & Fruits de Mer",
            "frenchName": "De la Mer",
            "description": "Wild Atlantic catches, classical sauces, and delicate poachings.",
            "items": [
                { "name": "Loup de Mer au Beurre Blanc", "price": "৳ 4,400", "description": "Pan-roasted Mediterranean sea bass with chive beurre blanc, baby leeks, and fingerling potatoes.", "tags": ["GF"] },
                { "name": "Sole Meunière Entière", "price": "৳ 5,800", "description": "Whole Dover sole filleted tableside in browned butter, lemon juice, and chopped parsley.", "tags": ["Classic"] },
                { "name": "Homard Rôti à l'Estragon", "price": "৳ 6,800", "description": "Butter-roasted Maine lobster tail with tarragon emulsion and summer truffles.", "tags": ["GF"] }
            ]
        },
        {
            "id": "plats-principaux",
            "name": "Plats Principaux (Mains)",
            "frenchName": "Grandes Viandes",
            "description": "Prime roasted cuts, classical French braisings, and charcoal specialties.",
            "items": [
                { "name": "Filet de Bœuf Périgourdine", "price": "৳ 7,800", "description": "Black Angus tenderloin, foie gras, black truffle sauce, potato mille-feuille.", "tags": ["Signature"] },
                { "name": "Canard Rôti au Miel et Lavande", "price": "৳ 4,600", "description": "Roasted Challandais duck breast, lavender honey, parsnip purée, cherry jus.", "tags": ["GF"] },
                { "name": "Carré d'Agneau en Croûte d'Herbes", "price": "৳ 5,200", "description": "Herb-crusted roasted rack of lamb with ratatouille tartlet and rosemary reduction.", "tags": [] },
                { "name": "Risotto aux Champignons Sauvages", "price": "৳ 2,800", "description": "Carnaroli rice with chanterelles, porcini, aged Comté cheese, and shaved truffles.", "tags": ["V", "GF"] }
            ]
        },
        {
            "id": "desserts",
            "name": "Desserts Pâtissiers & Vins Fins",
            "frenchName": "Douceurs & Digestifs",
            "description": "Bespoke French patisserie and sommelier pairings.",
            "items": [
                { "name": "Soufflé Chaud au Grand Marnier", "price": "৳ 1,800", "description": "Warm orange liqueur soufflé with Bourbon vanilla bean crème anglaise.", "tags": ["V"] },
                { "name": "Mille-Feuille Croustillant Vanille", "price": "৳ 1,600", "description": "Caramelized puff pastry layers with Tahitian vanilla bean mousseline.", "tags": ["V"] },
                { "name": "Tarte Fine aux Pommes Caramélisées", "price": "৳ 1,400", "description": "Warm paper-thin apple tart with Calvados caramel and artisanal vanilla gelato.", "tags": ["V"] },
                { "name": "Assortiment de Fromages Affinés", "price": "৳ 2,400", "description": "Selection of five artisanal French cheeses served with walnut bread and fig compote.", "tags": ["V"] }
            ]
        }
    ],
    "architecture": {
        "eyebrow": "ARCHITECTURAL IDENTITY",
        "title": "An Interior Composed for Memorable Moments.",
        "frenchSubtitle": "Le Charme de l'Hôtel Particulier Parisien",
        "description": "From towering arched French windows and hand-carved limestone pilasters to Carrara marble dining counters and brass-trimmed wall paneling, L'ÉTOILE ROYALE captures the timeless nobility of 18th-century Parisian architecture, reinterpreted with contemporary warmth.",
        "materials": [
            { "name": "Carrara White Marble", "description": "Sourced Italian white stone with delicate grey veining, polished to a soft satin finish." },
            { "name": "Dark Walnut Paneling", "description": "Architectural wall boiserie providing acoustic serenity and rich European intimacy." },
            { "name": "Champagne Brass Fixtures", "description": "Hand-burnished metallic hardware, table sconces, and framing borders." },
            { "name": "Burgundy Velvet & Linen", "description": "Bespoke upholstery ensuring deep comfort during long celebratory dinners." }
        ],
        "statistics": [
            { "label": "Grand Salon Capacity", "value": "84 Guests" },
            { "label": "Private Dining Salons", "value": "2 Salons" },
            { "label": "Champagne & Wine Cellar", "value": "650+ Labels" },
            { "label": "Sommelier Pairing Flights", "value": "4 Flights" }
        ],
        "images": [
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
        ]
    },
    "chef": {
        "eyebrow": "MEET THE EXECUTIVE CULINARY DIRECTOR",
        "name": "Chef Laurent Mercier",
        "frenchName": "Chef de Cuisine Laurent Mercier",
        "position": "Executive Chef & Maître Restaurateur",
        "quote": "Cooking is an expression of patience, respect for ingredients, and the pursuit of balance in every detail.",
        "bio1": "Trained across three-Michelin-starred kitchens in Paris and Lyon, Chef Laurent Mercier brings thirty years of French culinary excellence to L'ÉTOILE ROYALE.",
        "bio2": "His cooking is defined by classical precision, sauces built slowly from rich roasts, and unyielding respect for product integrity. In his salon, every service is an intimate performance designed to stir emotion.",
        "image": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop",
        "awards": ["Maître Cuisinier de France 2017", "Grand Prix de la Gastronomie Paris 2021"]
    },
    "specialExperiences": [
        {
            "id": "chef-tasting-table",
            "title": "The Chef's Tasting Table (Menu Dégustation)",
            "frenchSubtitle": "Table du Chef",
            "tagline": "7-Course Gastronomic Symphony with Sommelier Pairings",
            "description": "An exclusive salon table experience where Chef Laurent curates a seasonal progression of French delicacies, paired with rare vintage Burgundy and Bordeaux crus.",
            "price": "৳ 14,000 / guest",
            "capacity": "Tables of 2 to 6 guests",
            "image": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
        },
        {
            "id": "private-salon-royale",
            "title": "The Private Salon Royale",
            "frenchSubtitle": "Salon Particulier",
            "tagline": "Exclusive Seclusion in a Dedicated Dining Suite",
            "description": "An intimate private salon featuring a dedicated maître d'hôtel, custom crystal chandeliers, and bespoke menus for celebrations and executive dinners.",
            "price": "Custom Tasting Menu",
            "capacity": "Suites for 6 to 14 guests",
            "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop"
        },
        {
            "id": "champagne-pairing",
            "title": "Grand Cru Champagne & Caviar Masterclass",
            "frenchSubtitle": "Caviar & Champagne",
            "tagline": "Guided Tasting of Rare Cuvées & Oscietra Caviar",
            "description": "Led by our Head Sommelier, taste four prestigious French Champagne houses paired with French Oscietra caviar and artisanal canapés.",
            "price": "৳ 8,500 / guest",
            "capacity": "Available 5:00 PM – 7:30 PM",
            "image": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop"
        }
    ],
    "gallery": [
        { "title": "Main Dining Salon Chandelier", "category": "Dining Salon", "url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop" },
        { "title": "Filet de Bœuf Périgourdine", "category": "Culinary Art", "url": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" },
        { "title": "Carrara Marble Reception", "category": "Architecture", "url": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop" },
        { "title": "Bar à Champagne Lounge", "category": "Bar & Lounge", "url": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop" },
        { "title": "Pan-Seared Coquilles Saint-Jacques", "category": "Culinary Art", "url": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop" },
        { "title": "Haute Cuisine Sauce Finishing", "category": "Details", "url": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop" }
    ],
    "testimonials": [
        {
            "name": "Le Figaro Gastronomie",
            "role": "Parisian Food Critique Review",
            "rating": 5.0,
            "quote": "L'ÉTOILE ROYALE performs an extraordinary translation of Parisian grand salon dining. The Canard Rôti and the duck reduction sauce is textbook French perfection."
        },
        {
            "name": "Baroness Éléonore de Saint-Germain",
            "role": "Patron & European Art Conservator",
            "rating": 5.0,
            "quote": "The architectural proportions are sensational. From the walnut paneling to the crystal glassware, you are immediately transported to the finest salons of the 8th arrondissement."
        },
        {
            "name": "Zuhair & Farhana Al-Sabah",
            "role": "Anniversary Dining Guests",
            "rating": 5.0,
            "quote": "Our evening in the Private Salon Royale was unforgettable. Discreet, flawless French hospitality and the Grand Marnier soufflé was pure magic."
        }
    ],
    "reservationSection": {
        "eyebrow": "TABLE INQUIRY & RESERVATION",
        "title": "Your Evening Begins Here.",
        "frenchSubtitle": "Réservez Votre Table de Prestige",
        "description": "Share your preferred dining date and details. Our concierge team will review your request and contact you promptly to confirm availability.",
        "note": "For parties exceeding 6 guests or exclusive Private Salon bookings, we kindly request 48 hours advance notice."
    },
    "footer": {
        "closingStatement": "An Invitation to Experience the Art of Dining.",
        "frenchStatement": "L'Art de Vivre & de Bien Manger.",
        "copyright": "© 2026 L'ÉTOILE ROYALE Salon Gastronomique. All Rights Reserved.",
        "tagline": "Classic French Elegance. Contemporary Luxury Hospitality."
    }
}


class Command(BaseCommand):
    help = 'Seeds initial Parisian Fine Dining restaurant CMS content and admin user'

    def handle(self, *args, **options):
        # 1. Create or update site admin superuser
        admin_user, created = User.objects.get_or_create(username='admin')
        if created:
            admin_user.set_password('adminpassword123')
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Created admin user: admin / adminpassword123"))
        else:
            admin_user.set_password('adminpassword123')
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Updated admin user credentials."))

        # 2. Seed active SiteConfig
        site_config = SiteConfig.objects.filter(is_published=True).first()
        if not site_config:
            site_config = SiteConfig.objects.create(
                restaurant_name=INITIAL_PARISIAN_DATA['name'],
                content_json=INITIAL_PARISIAN_DATA,
                is_published=True,
                updated_by=admin_user,
            )
            self.stdout.write(self.style.SUCCESS("Created initial Parisian Fine Dining SiteConfig."))
        else:
            site_config.restaurant_name = INITIAL_PARISIAN_DATA['name']
            site_config.content_json = INITIAL_PARISIAN_DATA
            site_config.updated_by = admin_user
            site_config.save()
            self.stdout.write(self.style.SUCCESS("Updated existing SiteConfig with Parisian theme data."))

        # 3. Create sample reservation
        if Reservation.objects.count() == 0:
            Reservation.objects.create(
                full_name="Countess Hélène de Valois",
                phone="+880 1711-882299",
                email="helene@devalois.com",
                date="2026-11-28",
                time="8:00 PM",
                guests="4 Guests",
                occasion="Anniversary Celebration",
                experience="The Chef's Tasting Table (Menu Dégustation)",
                special_requests="A window table overlooking the garden courtyard, vintage Champagne pairing.",
                status="pending"
            )
            Reservation.objects.create(
                full_name="Sir Arthur Pendelton",
                phone="+880 1819-334455",
                email="arthur@pendelton.co.uk",
                date="2026-12-02",
                time="7:30 PM",
                guests="8 Guests",
                occasion="Executive Private Dinner",
                experience="The Private Salon Royale",
                special_requests="Full Périgord truffle tasting menu with Grand Cru Bordeaux pairings.",
                status="confirmed"
            )
            self.stdout.write(self.style.SUCCESS("Seeded sample Parisian Fine Dining reservations."))

        self.stdout.write(self.style.SUCCESS("Successfully initialized Project 7 Parisian Fine Dining CMS!"))
