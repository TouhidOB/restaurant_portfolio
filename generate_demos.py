#!/usr/bin/env python3
"""
Generate 15 high-fidelity standalone demo HTML landing pages for GitHub Pages hosting.
Each demo represents its respective restaurant project with distinct typography,
color palettes, imagery, menu items, philosophy, and interactive modals.
"""

import os
import json

DEMO_CONFIGS = [
    {
        "id": 1,
        "name": "AURELIA",
        "subtitle": "Grand Art Deco Dining & Culinary Salon",
        "tagline": "Where Elegance Meets Exceptional Taste",
        "concept": "Grand Art Deco Dining",
        "font_heading": "Cormorant Garamond, serif",
        "font_body": "Montserrat, sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap",
        "primary": "#D4AF37",
        "accent": "#F4D06F",
        "bg": "#0A0D14",
        "surface": "#131822",
        "surface_light": "#1C2433",
        "text": "#F7F5F0",
        "text_muted": "#A5ADBB",
        "hero_img": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Born from the grandeur of 1920s Parisian salons and Manhattan high society, Aurelia is a culinary sanctuary crafted in black obsidian marble, polished brass, and hand-gilded geometric arches. We celebrate classical French technique re-envisioned through contemporary culinary brilliance.",
        "pillars": [
            {"title": "Gilded Symmetry", "desc": "Authentic Roaring Twenties architectural lines, fluted pilasters, and smoked glass chandeliers."},
            {"title": "Haute Gastronomy", "desc": "Michelin-caliber French-American culinary precision led by award-winning Executive Chef Laurent."},
            {"title": "Caviar & Champagne", "desc": "Exclusive Grand Cru reserve pairings and rare Ossetra selections curated by master sommeliers."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Royal Ossetra Caviar Tartlet", "price": "$48", "desc": "Cured egg yolk, crème fraîche, 24k edible gold leaf, chive oil", "diet": "House Signature"},
                {"name": "Dry-Aged Wagyu Rossini", "price": "$115", "desc": "Seared Hudson Valley foie gras, black truffle madeira reduction, pomme purée", "diet": "Chef's Selection"},
                {"name": "Gilded Valrhona Chocolate Sphere", "price": "$28", "desc": "Warm espresso caramel pour, smoked hazelnut praline, gold dust", "diet": "Dessert Classic"}
            ],
            "Chef Specialties": [
                {"name": "Butter-Poached Brittany Lobster", "price": "$92", "desc": "Chanterelle mushrooms, baby leeks, lobster coral emulsion", "diet": "Seafood"},
                {"name": "Roasted Squab en Croûte", "price": "$78", "desc": "Savoy cabbage parcel, black garlic jus, glazed morels", "diet": "Gluten-Free Available"}
            ],
            "Drinks & Wine": [
                {"name": "The Gilded Boulevardier", "price": "$26", "desc": "WhistlePig 10 Rye, Campari, Antica Formula, edible gold leaf, smoked orange", "diet": "Cocktail"},
                {"name": "Dom Pérignon Vintage 2013", "price": "$75", "desc": "Served by the fluted glass tableside from our temperature-controlled cellar", "diet": "Champagne"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 2,
        "name": "ENSO 圓相",
        "subtitle": "Japanese Zen Dining & Tea Sanctuary",
        "tagline": "An Experience of Mindful Dining",
        "concept": "Minimalist Zen & Wabi-Sabi",
        "font_heading": "'Noto Serif JP', serif",
        "font_body": "'DM Sans', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Noto+Serif+JP:wght@300;400;600;700&display=swap",
        "primary": "#C2A682",
        "accent": "#8C7A6B",
        "bg": "#141517",
        "surface": "#1E2024",
        "surface_light": "#2A2D33",
        "text": "#EAE7E1",
        "text_muted": "#9A9E9F",
        "hero_img": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Enso embraces the Buddhist circle of enlightenment and the Japanese aesthetic of wabi-sabi — finding profound beauty in natural simplicity, raw hinoki wood, river stone, and seasonal mindfulness.",
        "pillars": [
            {"title": "Wabi-Sabi Materiality", "desc": "Unlacquered 200-year-old Hinoki cypress counter, raked river gravel, and handmade washi lanterns."},
            {"title": "Kaiseki Mindfulness", "desc": "A 14-course micro-seasonal culinary procession honoring Shun (the exact pinnacle of each ingredient)."},
            {"title": "Chado Tea Rituals", "desc": "Single-harvest ceremonial grade Uji matcha whisked tableside following ancient Zen practices."}
        ],
        "menu": {
            "Signatures": [
                {"name": "A5 Miyazaki Wagyu Sukiyaki", "price": "$95", "desc": "Onsen quail yolk, charred Tokyo negi, shaved winter black truffle", "diet": "Wagyu Reserve"},
                {"name": "Wild Turbot in Kombu Dashi", "price": "$68", "desc": "Matsutake mushroom broth, yuzu zest oil, young mitsuba", "diet": "Wild Seafood"},
                {"name": "Ceremonial Uji Matcha Monaka", "price": "$22", "desc": "Crisp toasted rice wafer, Kyoto adzuki bean, smoked sea salt gelato", "diet": "Matcha Dessert"}
            ],
            "Chef Specialties": [
                {"name": "Hokkaido Sea Urchin & Caviar Nigiri", "price": "$45", "desc": "Red vinegar seasoned Koshihikari sushi rice, nikiri glaze, fresh wasabi", "diet": "Omakase Cut"},
                {"name": "Charcoal-Grilled Kinmedai", "price": "$58", "desc": "Golden eye snapper seared over Kishu binchotan, grated daikon ponzu", "diet": "Binchotan"}
            ],
            "Drinks & Wine": [
                {"name": "Dassai 23 Junmai Daiginjo", "price": "$38", "desc": "Polished to 23%, notes of white peach, melon, and delicate mountain water", "diet": "Sake"},
                {"name": "Kyoto Cedar Smoked Highball", "price": "$24", "desc": "Suntory Toki whisky, artisanal soda, scorched cedar aromatic mist", "diet": "Cocktail"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 3,
        "name": "AURA MARINA",
        "subtitle": "Coastal Mediterranean Dining & 3D Sanctuary",
        "tagline": "Where the Coast Meets the Table",
        "concept": "Coastal Mediterranean Luxury",
        "font_heading": "'Playfair Display', serif",
        "font_body": "'Plus Jakarta Sans', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
        "primary": "#2A7B9B",
        "accent": "#E89B6C",
        "bg": "#F8F5F0",
        "surface": "#FFFFFF",
        "surface_light": "#EDE6DC",
        "text": "#1F2937",
        "text_muted": "#6B7280",
        "hero_img": "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Perched above the azure waters of the Mediterranean, Aura Marina brings together whitewashed cliffside stone, centuries-old olive wood, organic sea salt breezes, and the freshest catch brought directly from local fishing boats every sunrise.",
        "pillars": [
            {"title": "Sun-Bleached Stone", "desc": "Hand-carved limestone terraces, terracotta pavers, and shade sails echoing yacht canopies."},
            {"title": "Seafood Purity", "desc": "Wild-caught Mazara red prawns, sea bass crudo, and cold-pressed single-estate olive oils."},
            {"title": "Handcrafted Primi", "desc": "Daily hand-rolled extruded semolina pasta prepared with Amalfi lemons and summer truffles."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Carpaccio di Ricciola e Agrumi", "price": "$34", "desc": "Yellowtail amberjack, blood orange carpaccio, sea fennel, cold-pressed olive oil", "diet": "Crudo"},
                {"name": "Tagliolini al Tartufo Estivo e Gamberi", "price": "$46", "desc": "Handmade tagliolini, sweet Mazara red prawns, shaved summer black truffle", "diet": "Primi"},
                {"name": "Salt-Crusted Mediterranean Branzino", "price": "$62", "desc": "Crusted in sea salt and wild rosemary, carved tableside with herb salmoriglio", "diet": "Whole Catch"}
            ],
            "Chef Specialties": [
                {"name": "Polpo alla Brace con Patate", "price": "$38", "desc": "Charred Mediterranean octopus, smoked potato foam, Taggiasca olives, crispy capers", "diet": "Wood-Fired"},
                {"name": "Risotto all'Acqua di Pomodoro", "price": "$42", "desc": "Acquerello aged rice, clarified heirloom tomato water, burrata di bufala", "diet": "Vegetarian"}
            ],
            "Drinks & Wine": [
                {"name": "Amalfi Spritz Royale", "price": "$22", "desc": "House-infused Limoncello, Prosecco Superiore di Valdobbiadene, sparkling soda, fresh basil", "diet": "Aperitivo"},
                {"name": "Vermentino di Sardegna DOCG", "price": "$18", "desc": "Crisp mineral notes, sea salt finish, wild herb aromas", "diet": "White Wine"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 4,
        "name": "MONOLITH",
        "subtitle": "Architectural Brutalism | Contemporary Dining Experience",
        "tagline": "Raw Architecture. Bold Cuisine. Uncompromising Experience.",
        "concept": "Architectural Brutalism",
        "font_heading": "'Syne', sans-serif",
        "font_body": "'Space Grotesk', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap",
        "primary": "#E53E3E",
        "accent": "#94A3B8",
        "bg": "#0F1115",
        "surface": "#181B22",
        "surface_light": "#252A35",
        "text": "#F1F5F9",
        "text_muted": "#8A94A6",
        "hero_img": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Monolith discards conventional softness in favor of raw concrete architecture, heavy board-formed geometries, open charcoal hearth embers, and uncompromising culinary power driven by fire, smoke, and fermentation.",
        "pillars": [
            {"title": "Raw Concrete Monoliths", "desc": "Imposing board-marked concrete, blackened steel lintels, and acoustic isolation design."},
            {"title": "The Hearth Lab", "desc": "Ancient whole-wood combustion, charred marrow, and 60-day dry-aged whole animal butchery."},
            {"title": "Wild Fermentation", "desc": "House-fermented garums, koji inoculations, and wild-harvested coastal botanicals."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Charred Bone Marrow & Fermented Plum", "price": "$32", "desc": "Scorched sourdough, fermented black garlic paste, coarse mineral ash", "diet": "Hearth Fire"},
                {"name": "60-Day Dry-Aged Tomahawk", "price": "$160", "desc": "Grilled directly over oak coals, aged beef tallow crust, charred wild alliums", "diet": "40oz Shareable"},
                {"name": "Smoked Birch Ash Sorbet", "price": "$20", "desc": "Foraged pine tip syrup, sea buckthorn gel, frozen birch bark wafer", "diet": "Experimental"}
            ],
            "Chef Specialties": [
                {"name": "Ember-Baked Celeriac & Koji Butter", "price": "$28", "desc": "Slow roasted in ash for 6 hours, cultured brown butter koji, hazelnut crumb", "diet": "Vegan Available"},
                {"name": "Cold-Smoked Venison Tartare", "price": "$36", "desc": "Egg yolk cured in spruce salt, pickled juniper, rye crisps", "diet": "Game Reserve"}
            ],
            "Drinks & Wine": [
                {"name": "The Concrete Negroni", "price": "$24", "desc": "Charcoal-filtered gin, bitter gentian liqueur, smoked vermouth, black ice cube", "diet": "Smoked Cocktail"},
                {"name": "Natural Syrah Domaine Balthazar", "price": "$26", "desc": "Unfiltered, organic biodynamic fermentation, volcanic pepper profile", "diet": "Natural Red"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 5,
        "name": "VERDANT",
        "subtitle": "Tropical Modernism | Nature-Inspired Contemporary Dining",
        "tagline": "NATURE IN FORM. FLAVOR IN EVERY DETAIL.",
        "concept": "Tropical Modernism",
        "font_heading": "'Cormorant Garamond', serif",
        "font_body": "'Manrope', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,400&family=Manrope:wght@300;400;500;600;700&display=swap",
        "primary": "#52745A",
        "accent": "#BC7153",
        "bg": "#14231B",
        "surface": "#1F3529",
        "surface_light": "#2A4738",
        "text": "#F4F1EA",
        "text_muted": "#A2B5A8",
        "hero_img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Verdant weaves open-air tropical architecture, sustainably sourced teak, lush sub-tropical landscaping, and botanical gastronomy into a sensory sanctuary where the jungle canopy embraces fine dining.",
        "pillars": [
            {"title": "Open-Air Architecture", "desc": "Deep timber overhangs, slatted louvers, and natural cooling breezes through botanical gardens."},
            {"title": "Botanical Gastronomy", "desc": "Wild hearts of palm, passionfruit dashi, and fire-roasted indigenous produce."},
            {"title": "Forest Mixology", "desc": "Artisan spirits infused with wild lemongrass, guava leaves, and cold-pressed tropical nectars."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Charred Wild Heart of Palm", "price": "$28", "desc": "Smoked cashew crema, fermented bird's eye chili glaze, sea salt", "diet": "Plant-Based"},
                {"name": "Passionfruit Cured Hamachi", "price": "$38", "desc": "Coconut dashi, avocado mousse, sea grapes, cold-pressed lime leaf oil", "diet": "Crudo"},
                {"name": "Smoked Duck Breast in Banana Leaf", "price": "$56", "desc": "Guava demi-glace, toasted cassava purée, charred scallion oil", "diet": "Chef's Cut"}
            ],
            "Chef Specialties": [
                {"name": "Wood-Roasted Red Snapper", "price": "$52", "desc": "Wrapped in aromatic leaves, green mango salsa, warm coconut milk broth", "diet": "Whole Fish"},
                {"name": "Pandan & Coconut Mille-Feuille", "price": "$22", "desc": "Crisp caramelized pastry, fresh pandan custard, toasted coconut flakes", "diet": "Tropical Dessert"}
            ],
            "Drinks & Wine": [
                {"name": "Canopy Mist Elixir", "price": "$22", "desc": "Aged agricultural rum, clarified pineapple, lemongrass tincture, kaffir lime leaf", "diet": "Botanical Cocktail"},
                {"name": "Piedra Negra Torrontés", "price": "$17", "desc": "High altitude white wine, floral jasmine aromas, crisp tropical acidity", "diet": "White Wine"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 6,
        "name": "STARDUST",
        "subtitle": "Retro-Futuristic Diner & Neon Repertoire",
        "tagline": "CLASSIC TASTE. FUTURE ENERGY.",
        "concept": "Retro-Futurism & Neon Diner",
        "font_heading": "'Righteous', cursive",
        "font_body": "'Space Grotesk', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Righteous&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono&display=swap",
        "primary": "#43D9E8",
        "accent": "#D83A45",
        "bg": "#111A2B",
        "surface": "#1A253C",
        "surface_light": "#253454",
        "text": "#F6E9D5",
        "text_muted": "#8EA0BE",
        "hero_img": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Welcome to 1955 through a sci-fi wormhole. Stardust fuses chrome airstream curved architecture, cherry red vinyl, glowing neon signs, and an iconic analog jukebox with gourmet culinary firepower.",
        "pillars": [
            {"title": "Atomic Age Chrome", "desc": "Streamlined aluminum curves, checkerboard terrazzo tiles, and glowing cobalt neon tubes."},
            {"title": "Artisan Smash Craft", "desc": "Custom chuck-short rib-brisket patty blends smashed ultra-thin on 500° flat tops."},
            {"title": "Futuristic Soda Fountain", "desc": "Hand-spun milkshakes, house-crafted root beer floats, and cosmic boozy sodas."}
        ],
        "menu": {
            "Signatures": [
                {"name": "The Atomic Smash Deluxe", "price": "$22", "desc": "Double dry-aged beef smash patty, melted sharp cheddar, smoked brisket jam, neon pickles", "diet": "Diner Icon"},
                {"name": "Smoked Bacon BBQ Melt", "price": "$24", "desc": "Thick-cut applewood bacon, crispy tobacco onions, smoked gouda, dark molasses BBQ", "diet": "Crowd Favorite"},
                {"name": "Electric Neon Cherry Shake", "price": "$14", "desc": "Madagascar vanilla gelato, maraschino cherry reduction, popping candy starburst", "diet": "Hand-Spun"}
            ],
            "Chef Specialties": [
                {"name": "Cosmic Hot Pastrami on Rye", "price": "$26", "desc": "House-cured 14-day beef brisket, spicy brown mustard, Swiss cheese, sauerkraut", "diet": "Specialty Cut"},
                {"name": "Stardust Loaded Truffle Tots", "price": "$16", "desc": "Crispy golden tots, parmesan dust, black truffle aioli, fresh scallions", "diet": "Sides"}
            ],
            "Drinks & Wine": [
                {"name": "Retro Cherry Phosphate", "price": "$12", "desc": "Old-fashioned acid phosphate, tart black cherry syrup, sparkling fountain soda", "diet": "Craft Soda"},
                {"name": "Neon Blue Spiked Float", "price": "$18", "desc": "Bourbon whiskey, cream soda, blue curaçao gelato, maraschino cherry", "diet": "Boozy Float"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 7,
        "name": "L'ÉTOILE ROYALE",
        "subtitle": "Salon Gastronomique & Bar à Champagne Paris",
        "tagline": "The Art of Dining, Beautifully Reimagined",
        "concept": "French Haute Cuisine & Salon Gastronomique",
        "font_heading": "'Cinzel', serif",
        "font_body": "'Montserrat', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Montserrat:wght@300;400;500;600;700&display=swap",
        "primary": "#9A1F38",
        "accent": "#E2C374",
        "bg": "#1A0E13",
        "surface": "#281720",
        "surface_light": "#3A212F",
        "text": "#FAF6F0",
        "text_muted": "#BFADB7",
        "hero_img": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Occupying a restored 19th-century Parisian hôtel particulier, L'Étoile Royale delivers imperial gastronomy with hand-carved gilded boiserie, Venetian crystal, and tableside silver cloche service.",
        "pillars": [
            {"title": "Haussmannian Splendor", "desc": "Original decorative ceiling frescoes, velvet banquettes, and marble fireplaces."},
            {"title": "Michelin Symphony", "desc": "A 7-course seasonal ode to classical French culinary foundations and contemporary poetry."},
            {"title": "Champagne Concierge", "desc": "A vaulted private cellar harboring 500+ rare grower and grand marque vintages."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Foie Gras Poêlé au Sauternes", "price": "$44", "desc": "Pan-seared duck liver, toasted brioche feuilletée, caramelized fig chutney", "diet": "Entrée"},
                {"name": "Homard Bleu Rôti au Beurre Demi-Sel", "price": "$88", "desc": "Brittany blue lobster roasted in demi-sel butter, coral bisque, winter chanterelles", "diet": "Plat Principal"},
                {"name": "Pigeon Royal de Bresse en Croûte", "price": "$76", "desc": "Savoy cabbage parcel, Périgord black truffle jus, potato mousseline", "diet": "Gibier"}
            ],
            "Chef Specialties": [
                {"name": "Turbot Cuit sur l'Arête", "price": "$82", "desc": "Steamed sea turbot, caviar emulsion, glazed salsify, sea purslane", "diet": "Poisson Noble"},
                {"name": "Soufflé Chaud au Chocolat Grand Cru", "price": "$28", "desc": "Valrhona Guanaja 70%, Bourbon vanilla bean ice cream", "diet": "Dessert"}
            ],
            "Drinks & Wine": [
                {"name": "Krug Grande Cuvée 171ème Édition", "price": "$90", "desc": "Served in bespoke crystal stemware, rich aromas of hazelnut and brioche", "diet": "Champagne"},
                {"name": "Le Royale Cognac Sazerac", "price": "$32", "desc": "Tesseron Lot 29 XO Cognac, Peychaud bitters, absinthe rinse, lemon peel", "diet": "Digestif"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 8,
        "name": "URBAN TABLE",
        "subtitle": "Urban Kitchen • Craft Smokehouse • Open Fire",
        "tagline": "Urban Kitchen • Craft Smokehouse • Open Fire",
        "concept": "Industrial Smokehouse & Hearth",
        "font_heading": "'Oswald', sans-serif",
        "font_body": "'Inter', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@500;600;700&display=swap",
        "primary": "#D97706",
        "accent": "#F59E0B",
        "bg": "#181512",
        "surface": "#25211B",
        "surface_light": "#362F27",
        "text": "#F3EDE4",
        "text_muted": "#A89D8F",
        "hero_img": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Set inside an expansive converted warehouse with exposed brick and steel trusses, Urban Table celebrates the raw power of post oak wood fires, 14-hour smokehouse patience, and lively communal craft dining.",
        "pillars": [
            {"title": "Custom Offset Pits", "desc": "Hand-welded 1,000-gallon steel smokers fed exclusively with seasoned Texas post oak."},
            {"title": "Craft Butchery", "desc": "Whole-packer USDA Prime briskets, heritage breed pork, and house-ground sausage links."},
            {"title": "24 Tap Microbrew Wall", "desc": "Rotating regional independent IPAs, barrel-aged stouts, and crisp lagers on draft."}
        ],
        "menu": {
            "Signatures": [
                {"name": "14-Hour Smoked Prime Texas Brisket", "price": "$38", "desc": "Coarse black pepper crust, tender fat cap, house pickles, sweet onion, warm potato bread", "diet": "Smokehouse Gold"},
                {"name": "Coffee-Rubbed Beef Short Rib", "price": "$52", "desc": "Massive single bone, post oak smoked, espresso bourbon glaze", "diet": "Pitmaster Cut"},
                {"name": "Cast Iron Skillet Cornbread", "price": "$16", "desc": "Whipped honey butter, charred jalapeño crumble, Maldon flake salt", "diet": "House Side"}
            ],
            "Chef Specialties": [
                {"name": "Carolina Pulled Pork Shoulder", "price": "$28", "desc": "Vinegar mop sauce, creamy apple cider slaw, brioche slider buns", "diet": "Pork Classic"},
                {"name": "Nashville Hot Fried Quail", "price": "$34", "desc": "Cayenne dipped crispy quail, buttermilk ranch, pickled cucumber", "diet": "Spicy"}
            ],
            "Drinks & Wine": [
                {"name": "Smoked Hickory Bourbon Old Fashioned", "price": "$20", "desc": "Buffalo Trace Bourbon, demerara, aromatic bitters, trapped hickory smoke", "diet": "Cocktail"},
                {"name": "Lone Star State IPA (Draft)", "price": "$10", "desc": "Double dry-hopped, citrus and pine notes, brewed locally", "diet": "Craft Beer"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 9,
        "name": "SKYLINE",
        "subtitle": "Elevated Rooftop Dining & Horizon Lounge • Level 54",
        "tagline": "Elevated Urban Dining • Panoramic Rooftop Terrace",
        "concept": "Skyline Rooftop Luxury",
        "font_heading": "'Outfit', sans-serif",
        "font_body": "'Space Grotesk', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap",
        "primary": "#3B82F6",
        "accent": "#F59E0B",
        "bg": "#090D16",
        "surface": "#121A2C",
        "surface_light": "#1B2742",
        "text": "#F8FAFC",
        "text_muted": "#8A99B5",
        "hero_img": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Floating 54 stories above the city lights, Skyline redefines elevated luxury with full-perimeter acoustic glass, a glass-floored cantilevered terrace, backlit onyx cocktail bars, and progressive Pan-Asian gastronomy.",
        "pillars": [
            {"title": "Panoramic Floor-to-Ceiling Glass", "desc": "360-degree vistas of the city skyline, ocean horizon, and glowing sunset reflections."},
            {"title": "Modern Pan-Asian Hearth", "desc": "Robata charcoal grilling, wild sushi omakase, and Japanese toothfish cooked over binchotan."},
            {"title": "Level 54 Horizon Bar", "desc": "Illuminated white onyx counter, high-altitude mixology, and world-class live DJ acoustics."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Glacier 51 Toothfish in Saikyo Miso", "price": "$64", "desc": "Marinated 72 hours in Kyoto sweet miso, charred baby leek, pickled ginger bud", "diet": "Robata Hearth"},
                {"name": "Truffle Wagyu Carpaccio on Himalayan Salt", "price": "$42", "desc": "Shaved black truffle, yuzu ponzu pearls, micro shiso, cold-pressed sesame", "diet": "Raw Bar"},
                {"name": "Level 54 Smoked Old Fashioned", "price": "$24", "desc": "Japanese Yamazaki 12 Whisky, umeshu, applewood smoke infusion, 24k gold leaf", "diet": "Signature Cocktail"}
            ],
            "Chef Specialties": [
                {"name": "Otoro Bluefin Tuna Sashimi", "price": "$48", "desc": "Fatty tuna belly, freshly grated Shizuoka wasabi, aged barrel nikiri soy", "diet": "Sashimi"},
                {"name": "Yuzu White Chocolate Cloud", "price": "$22", "desc": "Deconstructed meringue, yuzu curd, matcha crumble, nitrogen mist", "diet": "Dessert"}
            ],
            "Drinks & Wine": [
                {"name": "Electric Horizon Lychee Martini", "price": "$22", "desc": "Grey Goose vodka, fresh lychee reduction, blue pea flower float, lime zest", "diet": "Lounge Favorite"},
                {"name": "Kistler Russian River Chardonnay", "price": "$34", "desc": "Oak aged, rich toasted brioche, lemon cream, mineral precision", "diet": "White Wine"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 10,
        "name": "BENGAL HERITAGE DINING",
        "subtitle": "বাংলার ঐতিহ্য • Contemporary Cultural Luxury",
        "tagline": "Preserving Centuries of Culinary Wisdom with Modern Refinement",
        "concept": "Cultural Heritage & Regal Gastronomy",
        "font_heading": "'Rozha One', serif",
        "font_body": "'Plus Jakarta Sans', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Rozha+One&display=swap",
        "primary": "#C25E00",
        "accent": "#E09F3E",
        "bg": "#1A0F0A",
        "surface": "#281710",
        "surface_light": "#3B2218",
        "text": "#FFF8F0",
        "text_muted": "#C2ADA1",
        "hero_img": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Inspired by the aristocratic Rajbari palaces of 19th-century Bengal, this sanctuary pays homage to centuries of royal feasts, hand-hammered brass vessels, hand-pressed mustard oils, and the poetry of slow-braised dum culinary traditions.",
        "pillars": [
            {"title": "Zamindari Architecture", "desc": "Hand-carved terracotta friezes, Belgian crystal glass lanterns, and teak colonnades."},
            {"title": "Royal Dum Traditions", "desc": "Clay handi slow-cooking, sealed with whole wheat dough over simmering charcoal fires."},
            {"title": "Heirloom Mustard & Spices", "desc": "Shorshe and Radhuni stone-ground freshly every morning to preserve delicate essential oils."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Daab Chingri Royale", "price": "$42", "desc": "Jumbo Bay of Bengal tiger prawns baked inside tender green coconut with freshly ground mustard", "diet": "Royal Classic"},
                {"name": "Kancha Lonka Kosha Mangsho", "price": "$48", "desc": "Slow-roasted baby goat with green chilies in iron kadhai, rich caramelized onion gravy", "diet": "Chef's Pride"},
                {"name": "Baked Rosogolla Royale in Clay Pot", "price": "$18", "desc": "Caramelized saffron kheer reduction, crushed green cardamom, pistachio slivers", "diet": "Heritage Sweet"}
            ],
            "Chef Specialties": [
                {"name": "Gondhoraj Bhetki Paturi", "price": "$38", "desc": "Wild Kolkata Bhetki fillet wrapped in banana leaf with mustard and Gondhoraj lime juice", "diet": "Banana Leaf Steamed"},
                {"name": "Chhanar Kofta Curry", "price": "$30", "desc": "Delicate fresh artisanal cottage cheese dumplings in rich cashew-saffron gravy", "diet": "Vegetarian"}
            ],
            "Drinks & Wine": [
                {"name": "Gondhoraj Lebu Sharbat", "price": "$14", "desc": "Fresh royal lime zest, rock salt, roasted cumin, sparkling spring water", "diet": "Mocktail"},
                {"name": "Saffron Cardamom Smoked Toddy", "price": "$22", "desc": "Spiced Indian single malt whisky, Kashmiri saffron, wild raw honey", "diet": "Cocktail"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 11,
        "name": "VERDANT ATRIUM",
        "subtitle": "Botanical Glasshouse Café & Specialty Coffee",
        "tagline": "Where Contemporary Glass Architecture Meets Living Botany",
        "concept": "Botanical Glasshouse & Café",
        "font_heading": "'Playfair Display', serif",
        "font_body": "'DM Sans', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,500;0,700;1,400&display=swap",
        "primary": "#2E6B56",
        "accent": "#84A98C",
        "bg": "#F4F7F4",
        "surface": "#FFFFFF",
        "surface_light": "#E5EFE7",
        "text": "#1C2D24",
        "text_muted": "#5C7367",
        "hero_img": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Housed within an arched steel and glass conservatory, Verdant Atrium is a sun-drenched sanctuary of rare exotic palms, third-wave micro-lot coffee roasting, French-laminated viennoiserie, and restorative daylight brunch dining.",
        "pillars": [
            {"title": "Victorian Iron & Glass", "desc": "Soring curved conservatory arches, natural sunlight illumination, and indoor rain gardens."},
            {"title": "Micro-Lot Coffee Alchemy", "desc": "Single-origin Geisha beans roasted in small batches on vintage cast iron German roasters."},
            {"title": "Artisan Viennoiserie", "desc": "Pure Normandy butter, 72-hour cold fermented laminated doughs, and botanical glazes."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Panama Geisha Natural Pour-Over", "price": "$18", "desc": "Notes of blooming jasmine, bergamot citrus, white peach, brewed tableside via Hario V60", "diet": "Reserve Lot"},
                {"name": "Truffle Sourdough Croque Madame", "price": "$26", "desc": "House-baked sourdough, aged Gruyère béchamel, heritage ham, sunny-side duck egg", "diet": "Brunch Favorite"},
                {"name": "Pistachio Rose Brioche Feuilletée", "price": "$12", "desc": "Crushed Bronte pistachios, organic Ispahan rose glaze, light flaky layers", "diet": "Pastry Atelier"}
            ],
            "Chef Specialties": [
                {"name": "Avocado & Chilled Burrata Tartine", "price": "$22", "desc": "Pugliese bread, Hass avocado, heirloom tomato confit, basil oil, za'atar", "diet": "Vegetarian"},
                {"name": "Elderflower Tonic Cold Brew", "price": "$14", "desc": "24-hour slow drip Ethiopian Yirgacheffe, artisanal elderflower tonic, rosemary sprig", "diet": "Cold Craft"}
            ],
            "Drinks & Wine": [
                {"name": "Matcha Lavender Oat Cloud", "price": "$11", "desc": "Ceremonial Uji matcha, cold-frothed lavender oat milk, raw wildflower honey", "diet": "Botanical Drink"},
                {"name": "Mimosa Botanique", "price": "$18", "desc": "Freshly squeezed Valencia orange juice, Grand Marnier, organic crémant", "diet": "Brunch Cocktail"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 12,
        "name": "VILLA RIVIERA",
        "subtitle": "Mediterranean Riviera Fine Dining | Saint-Jean-Cap-Ferrat",
        "tagline": "Coastal Villa Architecture Meets Contemporary Fine Dining",
        "concept": "French Riviera Villa & Harbor Dining",
        "font_heading": "'Cormorant Garamond', serif",
        "font_body": "'Outfit', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap",
        "primary": "#1B4965",
        "accent": "#62B6CB",
        "bg": "#F9F6F0",
        "surface": "#FFFFFF",
        "surface_light": "#E9F1F5",
        "text": "#13293D",
        "text_muted": "#5B7083",
        "hero_img": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Situated on the exclusive cliffs of Saint-Jean-Cap-Ferrat, Villa Riviera captures the golden age of Côte d'Azur glamour. Shaded by ancient pines and olive trees, guests savor Michelin-starred Provençal seafood dining overlooking superyachts anchored in the bay.",
        "pillars": [
            {"title": "Côte d'Azur Villa", "desc": "Limestone arcades, terracotta tiled terraces, and white canvas pergolas framing the sea."},
            {"title": "Provençal Raw Bar", "desc": "Wild amberjack, red mullet, langoustines, and sea urchins harvested directly from the Mediterranean."},
            {"title": "Riviera Rosé & Champagne", "desc": "Curated cellar specializing in vintage Côtes de Provence crus and boutique grower champagnes."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Crudo di Ricciola al Bergamotto", "price": "$36", "desc": "Amberjack crudo, preserved Menton bergamot, Riviera olive oil, Fleur de Sel de Guérande", "diet": "Raw Bar"},
                {"name": "Bouillabaisse Royale aux Crustacés", "price": "$78", "desc": "Red mullet, Brittany blue lobster, saffron rouille, garlic croutons, rich fish reduction", "diet": "Riviera Classic"},
                {"name": "Soufflé Chaud au Grand Marnier", "price": "$24", "desc": "Tahitian vanilla bean crème anglaise poured tableside", "diet": "Dessert Icon"}
            ],
            "Chef Specialties": [
                {"name": "Côte de Veau Rôtie à la Sauge", "price": "$64", "desc": "Pan-roasted milk-fed veal chop, crispy sage butter, morel mushroom fricassee", "diet": "Viande"},
                {"name": "Fleurs de Courgette Farcies", "price": "$28", "desc": "Zucchini blossoms stuffed with fresh ricotta and mint, light tempura crisp", "diet": "Antipasti"}
            ],
            "Drinks & Wine": [
                {"name": "Château d'Esclans Garrus Rosé", "price": "$45", "desc": "Oak-aged Grenache and Rolle, creamy peach and toasted almond notes", "diet": "Prestigious Rosé"},
                {"name": "Cap Ferrat Sunset Spritz", "price": "$24", "desc": "Aperol, blood orange reduction, rosemary sprig, vintage champagne float", "diet": "Sunset Cocktail"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 13,
        "name": "SEOUL STREET",
        "subtitle": "Contemporary Korean Street Food & Pocha (서울포차)",
        "tagline": "Contemporary Korean Street Culture Meets Cinematic Gastronomy",
        "concept": "Korean Street Food & Cyber-Pocha",
        "font_heading": "'Black Han Sans', sans-serif",
        "font_body": "'Noto Sans KR', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@300;400;500;700&display=swap",
        "primary": "#FF2A6D",
        "accent": "#05D9E8",
        "bg": "#0D0C1D",
        "surface": "#1A1934",
        "surface_light": "#28264D",
        "text": "#F1F2F6",
        "text_muted": "#9697B4",
        "hero_img": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Stepping into Seoul Street is an electric immersion into Hongdae's neon night market culture. Sizzling tabletop grills, glowing neon hangul signs, corrugated metal walls, and irresistible street food transformed into culinary art.",
        "pillars": [
            {"title": "Cyber-Pocha Aesthetics", "desc": "Glowing hot pink and electric cyan neon, stainless steel street tables, and vinyl tent covers."},
            {"title": "High-Heat Flame & Wok", "desc": "Charred bulgogi, spicy tteokbokki reductions, and ultra-crispy double-fried chicken."},
            {"title": "Soju Mixology Lab", "desc": "Artisanal small-batch Korean soju infused with fresh white peach, yuzu, and sparkling plum wine."}
        ],
        "menu": {
            "Signatures": [
                {"name": "Spicy Rose Tteokbokki Royale", "price": "$24", "desc": "Chewy rice cakes, rich gochujang cream, crispy pork belly, melted mozzarella crown", "diet": "Street Legend"},
                {"name": "Crispy Korean Soy-Garlic Fried Chicken", "price": "$32", "desc": "Double-fried crunchy whole chicken, honey garlic glaze, pickled daikon radish", "diet": "Hongdae Classic"},
                {"name": "Wagyu Beef Bulgogi Ssam Platter", "price": "$46", "desc": "Charred thinly sliced Wagyu, house ssamjang, fresh perilla leaves, aged kimchi", "diet": "Sizzle Platter"}
            ],
            "Chef Specialties": [
                {"name": "Crispy Kimchi & Pork Mandu", "price": "$18", "desc": "Pan-fried handmade dumplings with aged 3-year kimchi, scallion soy dipping sauce", "diet": "Street Bite"},
                {"name": "Seafood Pajeon Scallion Pancake", "price": "$22", "desc": "Crispy golden batter, squid tentacles, shrimp, whole charred spring onions", "diet": "Crispy Savory"}
            ],
            "Drinks & Wine": [
                {"name": "Chilled Peach Soju Slush", "price": "$18", "desc": "Premium distilled soju, white peach purée, frozen slush texture, popping boba pearls", "diet": "Pocha Drink"},
                {"name": "Seoul Night Market Highball", "price": "$16", "desc": "Korean rice whisky, yuzu shrub, sparkling club soda, fresh shiso leaf", "diet": "Craft Highball"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 14,
        "name": "CHARRED & PRIME",
        "subtitle": "Dark Luxury Steakhouse",
        "tagline": "The Art of the Steakhouse",
        "concept": "Dark Luxury Steakhouse",
        "font_heading": "'Cinzel Decorative', serif",
        "font_body": "'Syne', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Syne:wght@400;500;600;700&display=swap",
        "primary": "#B45309",
        "accent": "#F59E0B",
        "bg": "#0C0A09",
        "surface": "#191512",
        "surface_light": "#28221D",
        "text": "#F5F5F4",
        "text_muted": "#A8A29E",
        "hero_img": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80",
        "about_p": "Charred & Prime is an unapologetic temple to carnivorous luxury. Smoked black oak, flamed stone, amber illumination, glass-walled dry-aging lockers, and the primal theater of Argentine wood-fired grills create an unforgettable night.",
        "pillars": [
            {"title": "Himalayan Salt Dry-Aging", "desc": "Custom glass lockers lined with pink salt bricks, aging prime beef from 35 to 90 days."},
            {"title": "Parilla Fire Theater", "desc": "Hardwood coals and white oak embers searing prime cuts at 1,200°F for perfect caramelization."},
            {"title": "Rare Whiskey Vault", "desc": "300+ single malt scotches, rare Japanese reserves, and pre-prohibition bourbon rarities."}
        ],
        "menu": {
            "Signatures": [
                {"name": "45-Day Dry-Aged Bone-In Ribeye", "price": "$98", "desc": "24oz USDA Prime, finished with bone marrow butter over white oak coals, smoked flake salt", "diet": "Prime Cut"},
                {"name": "A5 Kagoshima Wagyu Strip Loin", "price": "$145", "desc": "6oz Japanese Wagyu, seared tableside on hot volcanic salt rock, freshly grated wasabi", "diet": "A5 Wagyu"},
                {"name": "Truffle Lobster Mac & Cheese", "price": "$32", "desc": "Maine lobster claw meat, five-cheese mornay sauce, shaved Perigord winter truffle", "diet": "Decadent Side"}
            ],
            "Chef Specialties": [
                {"name": "Roasted Bone Marrow Canoes", "price": "$28", "desc": "Oxtail marmalade, pickled shallots, charred country levain bread", "diet": "Starter"},
                {"name": "Smoked Dark Chocolate Ganache", "price": "$22", "desc": "Bourbon caramel, sea salt flakes, charred marshmallow fluff", "diet": "Dessert"}
            ],
            "Drinks & Wine": [
                {"name": "The Smoked Prime Manhattan", "price": "$26", "desc": "Woodford Reserve Bourbon, Carpano Antica, cherry smoke, brandied Luxardo cherry", "diet": "House Manhattan"},
                {"name": "Caymus Napa Valley Cabernet Sauvignon", "price": "$42", "desc": "Rich blackberry, cassis, French oak vanilla, plush velvet tannins", "diet": "Red Wine"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        "id": 15,
        "name": "POP! FOOD STUDIO",
        "subtitle": "Contemporary Pop-Art Dining Experience",
        "tagline": "Eat Outside The Lines",
        "concept": "Playful Pop-Art & Whimsical Dining",
        "font_heading": "'Bangers', cursive",
        "font_body": "'Poppins', sans-serif",
        "font_import": "https://fonts.googleapis.com/css2?family=Bangers&family=Poppins:wght@300;400;500;600;700;800&display=swap",
        "primary": "#FF007F",
        "accent": "#FFE600",
        "bg": "#161329",
        "surface": "#231E3D",
        "surface_light": "#362F5E",
        "text": "#FFFFFF",
        "text_muted": "#AEA4D3",
        "hero_img": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80",
        "about_p": "POP! Food Studio breaks all the rules of conventional dining. Inspired by Warhol, Lichtenstein, and kinetic street art, we combine playful graphic menus, explosion colors, and high-energy chef wizardry into an edible pop-art exhibition.",
        "pillars": [
            {"title": "Pop-Art Installations", "desc": "Life-sized sculptural burgers, comic halftone dot wallpapers, and vibrant chromatic lighting."},
            {"title": "Playful Flavors", "desc": "Smash burgers with electric cheddar drizzles, sourdough pizzas with hot honey, and crazy milkshakes."},
            {"title": "Interactive Gastronomy", "desc": "Cotton candy clouds melted by espresso pours, glowing neon mocktails, and pop-rocks candy surprises."}
        ],
        "menu": {
            "Signatures": [
                {"name": "The Andy Smash Burger", "price": "$24", "desc": "Double smash beef, neon cheddar drizzle, bacon confetti, pop-art secret burger sauce, brioche bun", "diet": "Pop Hero"},
                {"name": "Boom! Sourdough Pepperoni Pizza", "price": "$28", "desc": "Naturally leavened sourdough, hot honey drizzle, fresh stracciatella, crispy cup pepperoni", "diet": "Artisan Pizza"},
                {"name": "Comic Cloud Crazy Shake", "price": "$16", "desc": "Wild strawberry gelato, cotton candy mushroom cloud, popping candy, rainbow sprinkles", "diet": "Crazy Shake"}
            ],
            "Chef Specialties": [
                {"name": "Disco Truffle Parmesan Fries", "price": "$16", "desc": "Skin-on fries tossed in white truffle oil, 24-month parmesan snow, pink garlic aioli", "diet": "Crispy Bite"},
                {"name": "Pop Corn Chicken Explosions", "price": "$20", "desc": "Crunchy bite-sized chicken, sweet chili sriracha glaze, crushed wasabi peas", "diet": "Street Pop"}
            ],
            "Drinks & Wine": [
                {"name": "Electric Pop Rocks Mocktail", "price": "$12", "desc": "Blue curaçao syrup, lemon juice, sparkling soda, rimmed with strawberry popping candy", "diet": "Fun Mocktail"},
                {"name": "Neon Pink Gin Fizz", "price": "$18", "desc": "Empress 1908 Gin, dragonfruit cordial, egg white foam, edible silver sparkle dust", "diet": "Glamour Cocktail"}
            ]
        },
        "gallery": [
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
        ]
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{name} — {subtitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="{font_import}" rel="stylesheet">
  <style>
    :root {{
      --primary: {primary};
      --accent: {accent};
      --bg: {bg};
      --surface: {surface};
      --surface-light: {surface_light};
      --text: {text};
      --text-muted: {text_muted};
      --font-heading: {font_heading};
      --font-body: {font_body};
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }}

    /* Global Typography */
    h1, h2, h3, h4 {{
      font-family: var(--font-heading);
      letter-spacing: -0.01em;
      line-height: 1.2;
    }}

    a {{
      color: inherit;
      text-decoration: none;
      transition: all 0.25s ease;
    }}

    button {{
      font-family: inherit;
      cursor: pointer;
      border: none;
      outline: none;
      transition: all 0.25s ease;
    }}

    .container {{
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }}

    /* Floating Portfolio Return Pill */
    .portfolio-pill {{
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
      background: rgba(15, 17, 23, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }}
    .portfolio-pill:hover {{
      background: var(--primary);
      color: #000;
      transform: translateY(-2px);
    }}

    /* Navbar */
    .navbar {{
      position: sticky;
      top: 0;
      z-index: 900;
      background: rgba(10, 13, 20, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1rem 0;
    }}
    .nav-inner {{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .brand-logo {{
      display: flex;
      flex-direction: column;
    }}
    .brand-name {{
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 0.05em;
    }}
    .brand-sub {{
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--text-muted);
    }}
    .nav-links {{
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
    }}
    .nav-links a {{
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 500;
      color: var(--text-muted);
    }}
    .nav-links a:hover {{
      color: var(--primary);
    }}
    .btn-nav {{
      background: var(--primary);
      color: #000;
      font-weight: 700;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.6rem 1.4rem;
      border-radius: 4px;
      display: inline-block;
    }}
    .btn-nav:hover {{
      filter: brightness(1.15);
      transform: translateY(-1px);
    }}
    .mobile-toggle {{
      display: none;
      background: transparent;
      color: var(--text);
      font-size: 1.5rem;
    }}

    /* Hero Section */
    .hero {{
      position: relative;
      min-height: 85vh;
      display: flex;
      align-items: center;
      background: linear-gradient(to right, rgba(10, 13, 20, 0.95) 0%, rgba(10, 13, 20, 0.8) 50%, rgba(10, 13, 20, 0.4) 100%), url('{hero_img}') center/cover no-repeat;
      padding: 6rem 0;
    }}
    .hero-content {{
      max-width: 680px;
    }}
    .hero-badge {{
      display: inline-block;
      padding: 0.35rem 0.9rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--primary);
      color: var(--primary);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      border-radius: 4px;
      margin-bottom: 1.25rem;
    }}
    .hero-title {{
      font-size: clamp(2.5rem, 5vw, 4.2rem);
      margin-bottom: 1.2rem;
      color: var(--text);
    }}
    .hero-tagline {{
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      color: var(--text-muted);
      margin-bottom: 2rem;
      font-weight: 300;
    }}
    .hero-actions {{
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }}
    .btn-primary {{
      background: var(--primary);
      color: #000;
      font-weight: 700;
      padding: 0.9rem 2rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.85rem;
    }}
    .btn-primary:hover {{
      filter: brightness(1.15);
      transform: translateY(-2px);
    }}
    .btn-outline {{
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: var(--text);
      font-weight: 600;
      padding: 0.9rem 2rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.85rem;
    }}
    .btn-outline:hover {{
      border-color: var(--primary);
      color: var(--primary);
    }}

    /* Section Common */
    .section {{
      padding: 6rem 0;
    }}
    .section-header {{
      text-align: center;
      max-width: 650px;
      margin: 0 auto 3.5rem auto;
    }}
    .section-subtitle {{
      color: var(--primary);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 0.75rem;
    }}
    .section-title {{
      font-size: clamp(1.8rem, 3.5vw, 2.75rem);
      margin-bottom: 1rem;
    }}

    /* About / Pillars */
    .about-lead {{
      font-size: 1.15rem;
      text-align: center;
      color: var(--text-muted);
      max-width: 800px;
      margin: 0 auto 3rem auto;
      line-height: 1.8;
    }}
    .pillars-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }}
    .pillar-card {{
      background: var(--surface);
      border: 1px solid rgba(255, 255, 255, 0.06);
      padding: 2.5rem 2rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }}
    .pillar-card:hover {{
      border-color: var(--primary);
      transform: translateY(-4px);
    }}
    .pillar-number {{
      font-family: var(--font-heading);
      font-size: 2.2rem;
      color: var(--primary);
      margin-bottom: 1rem;
      opacity: 0.8;
    }}
    .pillar-title {{
      font-size: 1.35rem;
      margin-bottom: 0.75rem;
    }}
    .pillar-desc {{
      color: var(--text-muted);
      font-size: 0.95rem;
    }}

    /* Menu Explorer */
    .menu-section {{
      background: var(--surface);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }}
    .menu-tabs {{
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }}
    .menu-tab-btn {{
      padding: 0.6rem 1.5rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}
    .menu-tab-btn.active, .menu-tab-btn:hover {{
      background: var(--primary);
      color: #000;
      border-color: var(--primary);
    }}
    .menu-items-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }}
    .menu-card {{
      background: var(--bg);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 8px;
      padding: 1.8rem;
      transition: all 0.25s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .menu-card:hover {{
      border-color: var(--primary);
    }}
    .menu-card-top {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.6rem;
    }}
    .dish-name {{
      font-size: 1.2rem;
      font-weight: 600;
    }}
    .dish-price {{
      font-family: var(--font-heading);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--primary);
      margin-left: 1rem;
    }}
    .dish-desc {{
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.5;
    }}
    .dish-diet {{
      display: inline-block;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--primary);
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: fit-content;
    }}

    /* Gallery */
    .gallery-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }}
    .gallery-item {{
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 4/3;
    }}
    .gallery-item img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }}
    .gallery-item:hover img {{
      transform: scale(1.08);
    }}

    /* Reservation Banner */
    .res-banner {{
      background: linear-gradient(135deg, var(--surface) 0%, var(--surface-light) 100%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 4rem 2rem;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
    }}
    .res-banner h2 {{
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }}
    .res-banner p {{
      color: var(--text-muted);
      max-width: 550px;
      margin: 0 auto 2rem auto;
    }}

    /* Footer */
    .footer {{
      background: #07090E;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding: 4rem 0 2rem 0;
      color: var(--text-muted);
      font-size: 0.85rem;
    }}
    .footer-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem;
      margin-bottom: 3rem;
    }}
    .footer-col h4 {{
      color: var(--text);
      font-size: 1rem;
      margin-bottom: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }}
    .footer-col ul {{
      list-style: none;
    }}
    .footer-col li {{
      margin-bottom: 0.6rem;
    }}
    .footer-bottom {{
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }}

    /* Modal */
    .modal-backdrop {{
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }}
    .modal-backdrop.open {{
      display: flex;
    }}
    .modal-box {{
      background: var(--surface);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      width: 100%;
      max-width: 620px;
      max-height: 92vh;
      overflow-y: auto;
      padding: 2.25rem;
      position: relative;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6);
    }}
    .res-nav-tabs {{
      display: flex;
      gap: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.75rem;
      margin-bottom: 1.5rem;
    }}
    .res-tab-btn {{
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      border-radius: 4px;
      padding: 0.45rem 0.9rem;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      cursor: pointer;
    }}
    .res-tab-btn.active {{
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--primary);
      color: var(--primary);
    }}
    .time-slot-pill {{
      padding: 0.4rem 0.75rem;
      background: var(--bg);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 4px;
      color: var(--text);
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .time-slot-pill.active {{
      background: rgba(255, 255, 255, 0.15);
      border-color: var(--primary);
      color: var(--primary);
      font-weight: 700;
    }}
    .shift-toggle-btn {{
      padding: 0.25rem 0.55rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      color: var(--text-muted);
      font-size: 0.68rem;
      cursor: pointer;
    }}
    .shift-toggle-btn.active {{
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--primary);
      color: var(--primary);
    }}
    .modal-close {{
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      background: transparent;
      color: var(--text-muted);
      font-size: 1.5rem;
      cursor: pointer;
      border: none;
    }}
    .modal-close:hover {{
      color: var(--text);
    }}
    .form-group {{
      margin-bottom: 1.15rem;
    }}
    .form-group label {{
      display: block;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.35rem;
      color: var(--text-muted);
    }}
    .form-group input, .form-group select, .form-group textarea {{
      width: 100%;
      padding: 0.75rem 0.9rem;
      background: var(--bg);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      color: var(--text);
      font-family: inherit;
      font-size: 0.85rem;
    }}
    .form-group input:focus, .form-group select:focus {{
      outline: none;
      border-color: var(--primary);
    }}
    .modal-success {{
      display: none;
      text-align: center;
      padding: 1rem 0;
    }}

    @media (max-width: 768px) {{
      .nav-links {{
        display: none;
      }}
      .mobile-toggle {{
        display: block;
      }}
      .hero {{
        min-height: 75vh;
        padding: 4rem 0;
      }}
      .section {{
        padding: 4rem 0;
      }}
    }}
  </style>
</head>
<body>

  <!-- Floating Navigation to Main Showcase -->
  <a href="../index.html" class="portfolio-pill" title="Return to 15 Projects Showcase">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
    <span>All 15 Projects</span>
  </a>

  <!-- Header -->
  <header class="navbar">
    <div class="container nav-inner">
      <div class="brand-logo">
        <a href="#hero" class="brand-name">{name}</a>
        <span class="brand-sub">{concept}</span>
      </div>
      <ul class="nav-links">
        <li><a href="#about">Story</a></li>
        <li><a href="#pillars">Philosophy</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#gallery">Atmosphere</a></li>
        <li><a href="#reserve" class="btn-nav open-modal-btn">Reserve Table</a></li>
      </ul>
      <button class="mobile-toggle open-modal-btn" aria-label="Book Table">
        <span class="btn-nav" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;">Book</span>
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero" id="hero">
    <div class="container">
      <div class="hero-content">
        <span class="hero-badge">{concept}</span>
        <h1 class="hero-title">{name}</h1>
        <p class="hero-tagline">{tagline}</p>
        <div class="hero-actions">
          <button class="btn-primary open-modal-btn">Reserve Experience</button>
          <a href="#menu" class="btn-outline">Explore Menu</a>
        </div>
      </div>
    </div>
  </section>

  <!-- About / Story -->
  <section class="section" id="about">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Our Heritage</span>
        <h2 class="section-title">The Culinary Vision</h2>
      </div>
      <p class="about-lead">{about_p}</p>

      <!-- Pillars -->
      <div class="pillars-grid" id="pillars">
        {pillars_html}
      </div>
    </div>
  </section>

  <!-- Menu Explorer -->
  <section class="section menu-section" id="menu">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Gastronomy</span>
        <h2 class="section-title">Curated Repertoire</h2>
      </div>

      <!-- Menu Category Tabs -->
      <div class="menu-tabs">
        {menu_tabs_html}
      </div>

      <!-- Dish Cards Container -->
      <div class="menu-items-grid" id="menuGrid">
        {menu_cards_html}
      </div>
    </div>
  </section>

  <!-- Atmosphere Gallery -->
  <section class="section" id="gallery">
    <div class="container">
      <div class="section-header">
        <span class="section-subtitle">Architectural Spatial Experience</span>
        <h2 class="section-title">Atmosphere & Materials</h2>
      </div>
      <div class="gallery-grid">
        {gallery_html}
      </div>
    </div>
  </section>

  <!-- Reservation Banner -->
  <section class="section" id="reserve">
    <div class="container">
      <div class="res-banner">
        <span class="section-subtitle">Private Dining & Reservations</span>
        <h2>Reserve Your Table at {name}</h2>
        <p>Experience an unforgettable dining journey. Tables are released 30 days in advance. Special requests and private dining salons available upon request.</p>
        <button class="btn-primary open-modal-btn">Request Reservation</button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3 style="color: var(--primary); margin-bottom: 0.5rem; font-family: var(--font-heading);">{name}</h3>
          <p style="margin-bottom: 1rem; color: var(--text-muted);">{subtitle}</p>
          <p>© 2026 {name}. All rights reserved.</p>
        </div>
        <div class="footer-col">
          <h4>Operating Hours</h4>
          <ul>
            <li>Tuesday – Friday: 5:30 PM – 11:00 PM</li>
            <li>Saturday & Sunday: 12:00 PM – 11:30 PM</li>
            <li>Monday: Closed for Culinary Prep</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Location & Contact</h4>
          <ul>
            <li>VIP Reservation Concierge</li>
            <li>reservations@{demo_domain}</li>
            <li>+1 (555) 789-2026</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Part of the 15 Luxury Restaurant Concepts Showcase • <a href="../index.html" style="color: var(--primary); text-decoration: underline;">Return to Master Portal</a></p>
      </div>
    </div>
  </footer>

  <!-- Reservation Modal -->
  <div class="modal-backdrop" id="resModal">
    <div class="modal-box">
      <button class="modal-close" id="closeModalBtn" aria-label="Close Modal">&times;</button>
      
      <!-- Tabs Header -->
      <div class="res-nav-tabs">
        <button type="button" class="res-tab-btn active" id="tabBookBtn">★ 1. Request a Table</button>
        <button type="button" class="res-tab-btn" id="tabDeskBtn">🛎️ 2. Host Desk & Approvals</button>
      </div>

      <!-- Tab 1: Booking Form -->
      <div id="modalFormContent">
        <h3 style="font-size: 1.5rem; margin-bottom: 0.35rem; color: var(--primary); font-family: var(--font-heading);">Request Table Reservation</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">Submit your arrival shift and party details for {name}. The restaurant host desk reviews each request and confirms table seating.</p>
        
        <form id="bookingForm">
          <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
            <div>
              <label>Full Name *</label>
              <input type="text" id="guestName" required placeholder="Alexander Vance">
            </div>
            <div>
              <label>Phone Number *</label>
              <input type="tel" id="guestPhone" required placeholder="+1 (555) 789-2026">
            </div>
          </div>

          <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
            <div>
              <label>Email Address *</label>
              <input type="email" id="guestEmail" required placeholder="alexander@luxurydining.com">
            </div>
            <div>
              <label>Party Size *</label>
              <select id="guestParty">
                <option value="2">2 Guests (Intimate Table)</option>
                <option value="4">4 Guests (Center Salon)</option>
                <option value="6">6 Guests (Chef's Counter)</option>
                <option value="8">8 Guests (Private Room)</option>
                <option value="12">12+ Guests (VIP Gala)</option>
              </select>
            </div>
          </div>

          <!-- Date & Shift Time Slots -->
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <label style="margin: 0;">Arrival Date & Shift *</label>
              <div style="display: flex; gap: 0.25rem;">
                <button type="button" class="shift-toggle-btn" id="shiftLunchBtn">☀️ LUNCH</button>
                <button type="button" class="shift-toggle-btn active" id="shiftDinnerBtn">🌙 DINNER</button>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1.1fr 1.9fr; gap: 0.65rem; align-items: center;">
              <input type="date" id="resDate" required value="2026-11-20" style="padding: 0.65rem 0.8rem;">
              <div id="slotButtonsContainer" style="display: flex; gap: 0.3rem; flex-wrap: wrap;"></div>
            </div>
            <input type="hidden" id="selectedTimeSlot" value="19:15">
          </div>

          <div class="form-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
            <div>
              <label>Seating Preference</label>
              <select id="seatingPref">
                <option>Main Dining Salon</option>
                <option>Window / Panoramic View</option>
                <option>Chef's Counter / Omakase</option>
                <option>Private Dining Alcove</option>
              </select>
            </div>
            <div>
              <label>Dining Occasion</label>
              <select id="resOccasion">
                <option value="Casual Dining">Casual Dining</option>
                <option value="Birthday Celebration">Birthday Celebration 🎉</option>
                <option value="Anniversary">Anniversary 🥂</option>
                <option value="Romantic Date">Romantic Date ❤️</option>
                <option value="Business Dinner">Business Dinner 💼</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Dietary Restrictions / Chef Allergy Alert</label>
            <input type="text" id="dietaryNotes" placeholder="e.g. Gluten-free, shellfish allergy, champagne welcome">
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; padding: 0.85rem; margin-top: 0.25rem;">Submit Reservation Request</button>
        </form>
      </div>

      <!-- Tab 1 Confirmation Success Ticket -->
      <div class="modal-success" id="modalSuccess">
        <div style="font-size: 2.5rem; color: #FFD700; margin-bottom: 0.25rem;">⏳</div>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem; font-family: var(--font-heading);">Reservation Request Submitted!</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">Your booking request at {name} has been received and is awaiting host approval.</p>
        
        <!-- Digital Boarding Pass -->
        <div style="background: rgba(255,255,255,0.04); border: 1px dashed #FFD700; border-radius: 8px; padding: 1.25rem; text-align: left; margin-bottom: 1.25rem; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
            <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">REQUEST REFERENCE CODE</span>
            <span id="confirmCode" style="font-weight: 700; color: #FFD700; letter-spacing: 0.08em; font-size: 1.1rem;">LUX-2026-PENDING</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; color: var(--text);">
            <div>Guest: <strong id="ticketGuest" style="color: #FFF;">—</strong></div>
            <div>Party: <strong id="ticketParty" style="color: var(--primary);">—</strong></div>
            <div>Date: <strong id="ticketDate" style="color: #FFF;">—</strong></div>
            <div>Time: <strong id="ticketTime" style="color: #FFF;">—</strong></div>
            <div>Zone: <strong id="ticketZone" style="color: var(--primary);">—</strong></div>
            <div>Status: <span id="ticketStatus" style="color: #FFD700; font-weight: 700;">● Pending Restaurant Approval</span></div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn-primary" id="btnGoToDesk" style="padding: 0.65rem 1.25rem; font-size: 0.8rem;">🛎️ Open Host Desk (Approve Request)</button>
          <button type="button" class="btn-outline" id="doneModalBtn" style="padding: 0.65rem 1.25rem; font-size: 0.8rem;">Close Window</button>
        </div>
      </div>

      <!-- Tab 2: Host Desk / My Bookings View -->
      <div id="modalDeskContent" style="display: none;">
        <h3 style="font-size: 1.4rem; margin-bottom: 0.35rem; color: var(--primary); font-family: var(--font-heading);">Host Concierge & Approvals Desk</h3>
        <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 1rem;">Live view of reservation requests. Filter by Lunch or Dinner, approve and allocate tables, or decline bookings.</p>

        <!-- Service Shift Filter Bar -->
        <div style="display: flex; gap: 0.4rem; margin-bottom: 0.85rem; align-items: center; flex-wrap: wrap;">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-family: monospace;">FILTER SHIFT:</span>
          <button type="button" class="desk-shift-pill active" data-shift="all" style="background: var(--primary); color: #000; border: none; padding: 0.25rem 0.65rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; cursor: pointer;">🍽️ All Shifts</button>
          <button type="button" class="desk-shift-pill" data-shift="lunch" style="background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid rgba(255,255,255,0.15); padding: 0.25rem 0.65rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; cursor: pointer;">☀️ Lunch Shift</button>
          <button type="button" class="desk-shift-pill" data-shift="dinner" style="background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid rgba(255,255,255,0.15); padding: 0.25rem 0.65rem; border-radius: 4px; font-size: 0.72rem; font-weight: 700; cursor: pointer;">🌙 Dinner Shift</button>
        </div>

        <div id="deskListContainer" style="max-height: 280px; overflow-y: auto; margin-bottom: 1rem;">
          <!-- Populated from localStorage -->
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.75rem;">
          <button type="button" id="btnClearBookings" style="background: transparent; border: none; color: #FFA5AC; font-size: 0.75rem; cursor: pointer;">✕ Reset Test Bookings</button>
          <button type="button" class="btn-primary" id="btnDeskBackToBook" style="padding: 0.45rem 1rem; font-size: 0.75rem;">+ New Request</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Tab filtering
    const menuData = {menu_json};
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const menuGrid = document.getElementById('menuGrid');

    tabButtons.forEach(btn => {{
      btn.addEventListener('click', () => {{
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        renderMenuCategory(cat);
      }});
    }});

    function renderMenuCategory(cat) {{
      const items = menuData[cat] || [];
      menuGrid.innerHTML = items.map(dish => `
        <div class="menu-card">
          <div>
            <div class="menu-card-top">
              <span class="dish-name">${{dish.name}}</span>
              <span class="dish-price">${{dish.price}}</span>
            </div>
            <p class="dish-desc">${{dish.desc}}</p>
          </div>
          <span class="dish-diet">${{dish.diet}}</span>
        </div>
      `).join('');
    }}

    // Reservation Engine with Shift Management & LocalStorage Persistence
    const modal = document.getElementById('resModal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.getElementById('closeModalBtn');
    const doneBtn = document.getElementById('doneModalBtn');
    const bookingForm = document.getElementById('bookingForm');
    const formContent = document.getElementById('modalFormContent');
    const successContent = document.getElementById('modalSuccess');
    const deskContent = document.getElementById('modalDeskContent');
    const tabBookBtn = document.getElementById('tabBookBtn');
    const tabDeskBtn = document.getElementById('tabDeskBtn');

    const LUNCH_SLOTS = ['12:00', '12:30', '13:00', '13:30'];
    const DINNER_SLOTS = ['18:00', '18:45', '19:15', '20:00', '20:45', '21:30'];
    let currentShift = 'dinner';
    let latestBooking = null;

    function renderTimeSlots() {{
      const container = document.getElementById('slotButtonsContainer');
      const slots = currentShift === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS;
      const currentSelected = document.getElementById('selectedTimeSlot').value || slots[0];
      
      container.innerHTML = slots.map(s => `
        <button type="button" class="time-slot-pill ${{s === currentSelected ? 'active' : ''}}" data-slot="${{s}}">${{s}}</button>
      `).join('');

      container.querySelectorAll('.time-slot-pill').forEach(btn => {{
        btn.addEventListener('click', () => {{
          container.querySelectorAll('.time-slot-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          document.getElementById('selectedTimeSlot').value = btn.getAttribute('data-slot');
        }});
      }});
    }}

    document.getElementById('shiftLunchBtn').addEventListener('click', () => {{
      currentShift = 'lunch';
      document.getElementById('shiftLunchBtn').classList.add('active');
      document.getElementById('shiftDinnerBtn').classList.remove('active');
      document.getElementById('selectedTimeSlot').value = LUNCH_SLOTS[0];
      renderTimeSlots();
    }});

    document.getElementById('shiftDinnerBtn').addEventListener('click', () => {{
      currentShift = 'dinner';
      document.getElementById('shiftDinnerBtn').classList.add('active');
      document.getElementById('shiftLunchBtn').classList.remove('active');
      document.getElementById('selectedTimeSlot').value = DINNER_SLOTS[0];
      renderTimeSlots();
    }});

    renderTimeSlots();

    // Tab Switching
    function showTab(tab) {{
      if (tab === 'book') {{
        tabBookBtn.classList.add('active');
        tabDeskBtn.classList.remove('active');
        formContent.style.display = 'block';
        successContent.style.display = 'none';
        deskContent.style.display = 'none';
      }} else {{
        tabDeskBtn.classList.add('active');
        tabBookBtn.classList.remove('active');
        formContent.style.display = 'none';
        successContent.style.display = 'none';
        deskContent.style.display = 'block';
        renderDeskList();
      }}
    }}

    tabBookBtn.addEventListener('click', () => showTab('book'));
    tabDeskBtn.addEventListener('click', () => showTab('desk'));
    document.getElementById('btnDeskBackToBook').addEventListener('click', () => showTab('book'));

    // LocalStorage Key for this restaurant concept
    const STORAGE_KEY = 'lux_res_{id}';

    function getSavedBookings() {{
      try {{
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      }} catch (e) {{
        return [];
      }}
    }}

    function saveBookingList(list) {{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }}

    function saveBooking(b) {{
      const list = getSavedBookings();
      list.unshift(b);
      saveBookingList(list);
    }}

    let activeDeskShift = 'all';

    function isBookingLunch(b) {{
      try {{
        const raw = (b.time || '19:15').trim();
        const hour = parseInt(raw.split(':')[0], 10);
        return hour < 16;
      }} catch (e) {{
        return false;
      }}
    }}

    function renderDeskList() {{
      const container = document.getElementById('deskListContainer');
      let list = getSavedBookings();

      if (activeDeskShift === 'lunch') {{
        list = list.filter(b => isBookingLunch(b));
      }} else if (activeDeskShift === 'dinner') {{
        list = list.filter(b => !isBookingLunch(b));
      }}

      if (!list.length) {{
        const shiftLabel = activeDeskShift === 'all' ? '' : activeDeskShift + ' ';
        container.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.85rem; border: 1px dashed rgba(255,255,255,0.1); border-radius: 6px;">
            No ${{shiftLabel}}reservation requests found. Click "New Request" to create a test booking.
          </div>
        `;
        return;
      }}
      container.innerHTML = list.map(b => {{
        const isPending = b.status === 'Pending Approval';
        const isApproved = b.status === 'Approved & Confirmed';
        const isLunch = isBookingLunch(b);

        let badge = '';
        let actionButtons = '';

        if (isPending) {{
          badge = '<span style="font-size: 0.72rem; color: #FFD700; font-weight: 700; background: rgba(255,215,0,0.15); padding: 0.15rem 0.5rem; border-radius: 4px; border: 1px solid #FFD700;">⏳ PENDING APPROVAL</span>';
          actionButtons = `
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem;">
              <button type="button" class="btn-approve-req" data-code="${{b.code}}" style="background: #10B981; color: #FFF; border: none; padding: 0.35rem 0.75rem; border-radius: 4px; font-weight: 700; font-size: 0.75rem; cursor: pointer;">✓ Approve Request</button>
              <button type="button" class="btn-decline-req" data-code="${{b.code}}" style="background: rgba(239, 68, 68, 0.2); color: #FFA5AC; border: 1px solid #EF4444; padding: 0.35rem 0.75rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">✕ Decline</button>
            </div>
          `;
        }} else if (isApproved) {{
          badge = `<span style="font-size: 0.72rem; color: #10B981; font-weight: 700; background: rgba(16,185,129,0.15); padding: 0.15rem 0.5rem; border-radius: 4px; border: 1px solid #10B981;">✓ APPROVED (${{b.table || 'Table 4'}})</span>`;
          actionButtons = `
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem;">
              <button type="button" class="btn-desk-ics" data-code="${{b.code}}" style="background: transparent; border: 1px solid var(--primary); color: var(--primary); padding: 0.3rem 0.65rem; border-radius: 4px; font-size: 0.72rem; cursor: pointer;">📅 Calendar (.ICS)</button>
            </div>
          `;
        }} else {{
          badge = '<span style="font-size: 0.72rem; color: #EF4444; font-weight: 700; background: rgba(239,68,68,0.15); padding: 0.15rem 0.5rem; border-radius: 4px; border: 1px solid #EF4444;">✕ DECLINED</span>';
        }}

        return `
          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 0.85rem 1rem; margin-bottom: 0.5rem; font-size: 0.82rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <strong style="color: var(--primary); font-family: monospace;">#${{b.code}}</strong>
              ${{badge}}
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem; color: var(--text-muted);">
              <div>Guest: <span style="color: #FFF; font-weight: 600;">${{b.name}}</span></div>
              <div>Party: <span style="color: var(--primary); font-weight: 600;">${{b.party}} Guests</span></div>
              <div>Shift: <span style="color: ${{isLunch ? '#FFD700' : 'var(--primary)'}}; font-weight: 600;">${{isLunch ? '☀️ LUNCH' : '🌙 DINNER'}} @ ${{b.time}}</span></div>
              <div>Zone: <span style="color: #FFF;">${{b.zone}}</span></div>
              ${{b.table ? `<div>Assigned: <span style="color: #10B981; font-weight: 600;">${{b.table}}</span></div>` : ''}}
            </div>
            ${{actionButtons}}
          </div>
        `;
      }}).join('');

      // Wire approve handlers
      container.querySelectorAll('.btn-approve-req').forEach(btn => {{
        btn.addEventListener('click', () => {{
          const code = btn.getAttribute('data-code');
          const list = getSavedBookings();
          const target = list.find(item => item.code === code);
          if (target) {{
            target.status = 'Approved & Confirmed';
            target.table = 'Booth ' + Math.floor(1 + Math.random() * 8);
            saveBookingList(list);
            renderDeskList();
          }}
        }});
      }});

      // Wire decline handlers
      container.querySelectorAll('.btn-decline-req').forEach(btn => {{
        btn.addEventListener('click', () => {{
          const code = btn.getAttribute('data-code');
          const list = getSavedBookings();
          const target = list.find(item => item.code === code);
          if (target) {{
            target.status = 'Declined';
            saveBookingList(list);
            renderDeskList();
          }}
        }});
      }});

      // Wire download ICS from desk
      container.querySelectorAll('.btn-desk-ics').forEach(btn => {{
        btn.addEventListener('click', () => {{
          const code = btn.getAttribute('data-code');
          const list = getSavedBookings();
          const target = list.find(item => item.code === code);
          if (target) {{
            downloadIcsForBooking(target);
          }}
        }});
      }});
    }}

    document.getElementById('btnClearBookings').addEventListener('click', () => {{
      localStorage.removeItem(STORAGE_KEY);
      renderDeskList();
    }});

    document.querySelectorAll('.desk-shift-pill').forEach(btn => {{
      btn.addEventListener('click', () => {{
        document.querySelectorAll('.desk-shift-pill').forEach(b => {{
          b.style.background = 'rgba(255,255,255,0.06)';
          b.style.color = 'var(--text)';
          b.style.border = '1px solid rgba(255,255,255,0.15)';
          b.classList.remove('active');
        }});
        btn.classList.add('active');
        btn.style.background = 'var(--primary)';
        btn.style.color = '#000';
        btn.style.border = 'none';
        activeDeskShift = btn.getAttribute('data-shift');
        renderDeskList();
      }});
    }});

    const btnGoToDesk = document.getElementById('btnGoToDesk');
    if (btnGoToDesk) {{
      btnGoToDesk.addEventListener('click', () => showTab('desk'));
    }}

    openBtns.forEach(b => b.addEventListener('click', (e) => {{
      e.preventDefault();
      modal.classList.add('open');
      showTab('book');
    }}));

    [closeBtn, doneBtn].forEach(b => b && b.addEventListener('click', () => {{
      modal.classList.remove('open');
    }}));

    modal.addEventListener('click', (e) => {{
      if (e.target === modal) modal.classList.remove('open');
    }});

    document.addEventListener('keydown', (e) => {{
      if (e.key === 'Escape' && modal.classList.contains('open')) {{
        modal.classList.remove('open');
      }}
    }});

    bookingForm.addEventListener('submit', (e) => {{
      e.preventDefault();
      const code = 'RES-{id}-' + Math.floor(1000 + Math.random() * 9000);
      const name = document.getElementById('guestName').value;
      const phone = document.getElementById('guestPhone').value;
      const email = document.getElementById('guestEmail').value;
      const party = document.getElementById('guestParty').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('selectedTimeSlot').value || '19:15';
      const zone = document.getElementById('seatingPref').value;
      const occasion = document.getElementById('resOccasion').value;

      latestBooking = {{ code, name, phone, email, party, date, time, zone, occasion, status: 'Pending Approval', table: null }};
      saveBooking(latestBooking);

      document.getElementById('confirmCode').textContent = code;
      document.getElementById('ticketGuest').textContent = name;
      document.getElementById('ticketParty').textContent = party + ' Guests';
      document.getElementById('ticketDate').textContent = date;
      document.getElementById('ticketTime').textContent = time;
      document.getElementById('ticketZone').textContent = zone;

      formContent.style.display = 'none';
      deskContent.style.display = 'none';
      successContent.style.display = 'block';
    }});

    function downloadIcsForBooking(b) {{
      if (!b) return;
      const d = b.date.replace(/-/g, '');
      const t = (b.time || '19:15').replace(':', '') + '00';
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//{name}//Table Reservation//EN',
        'BEGIN:VEVENT',
        `SUMMARY:Table at {name} (${{b.code}})`,
        `DESCRIPTION:Reservation for ${{b.party}} guests. Seating: ${{b.zone}}. Allocated: ${{b.table || 'Pending'}}`,
        `DTSTART:${{d}}T${{t}}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\\r\\n');

      const blob = new Blob([ics], {{ type: 'text/calendar;charset=utf-8;' }});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reservation-${{b.code}}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }}
  </script>
</body>
</html>
"""

def generate_all():
    os.makedirs("demos", exist_ok=True)
    for conf in DEMO_CONFIGS:
        # Generate pillars HTML
        pillars_html = ""
        for idx, pil in enumerate(conf["pillars"], 1):
            pillars_html += f"""
            <div class="pillar-card">
              <div class="pillar-number">0{idx}</div>
              <h3 class="pillar-title">{pil['title']}</h3>
              <p class="pillar-desc">{pil['desc']}</p>
            </div>
            """

        # Generate tabs & first active items
        categories = list(conf["menu"].keys())
        first_cat = categories[0]
        menu_tabs_html = ""
        for cat in categories:
            active_cls = "active" if cat == first_cat else ""
            menu_tabs_html += f'<button class="menu-tab-btn {active_cls}" data-cat="{cat}">{cat}</button>\n'

        # Generate menu cards for first category
        menu_cards_html = ""
        for dish in conf["menu"][first_cat]:
            menu_cards_html += f"""
            <div class="menu-card">
              <div>
                <div class="menu-card-top">
                  <span class="dish-name">{dish['name']}</span>
                  <span class="dish-price">{dish['price']}</span>
                </div>
                <p class="dish-desc">{dish['desc']}</p>
              </div>
              <span class="dish-diet">{dish['diet']}</span>
            </div>
            """

        # Gallery HTML
        gallery_html = ""
        for img_url in conf["gallery"]:
            gallery_html += f"""
            <div class="gallery-item">
              <img src="{img_url}" alt="{conf['name']} interior atmosphere" loading="lazy">
            </div>
            """

        clean_slug = conf["name"].lower().replace(" ", "").replace("!", "").replace("'", "")[:12]
        demo_domain = f"{clean_slug}-dining.com"

        full_html = HTML_TEMPLATE.format(
            name=conf["name"],
            subtitle=conf["subtitle"],
            tagline=conf["tagline"],
            concept=conf["concept"],
            font_heading=conf["font_heading"],
            font_body=conf["font_body"],
            font_import=conf["font_import"],
            primary=conf["primary"],
            accent=conf["accent"],
            bg=conf["bg"],
            surface=conf["surface"],
            surface_light=conf["surface_light"],
            text=conf["text"],
            text_muted=conf["text_muted"],
            hero_img=conf["hero_img"],
            about_p=conf["about_p"],
            pillars_html=pillars_html,
            menu_tabs_html=menu_tabs_html,
            menu_cards_html=menu_cards_html,
            menu_json=json.dumps(conf["menu"]),
            gallery_html=gallery_html,
            demo_domain=demo_domain,
            id=conf["id"]
        )

        out_path = f"demos/project-{conf['id']}.html"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(full_html)
        print(f"Generated {out_path} for {conf['name']}")

if __name__ == "__main__":
    generate_all()
