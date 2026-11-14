from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import SiteConfig, MenuCategory, MenuItem, Reservation

INITIAL_BENGALI_DATA = {
    "restaurant_name": "BENGAL HERITAGE DINING",
    "default_language": "en",
    "supported_languages": ["en", "bn"],
    "theme": {
        "colors": {
            "terracotta": "#A6533B",
            "indigo": "#26344A",
            "ivory": "#F4EBDD",
            "brass": "#B18A54",
            "jute": "#C8B18D",
            "leaf": "#536B50",
            "charcoal": "#242321",
            "river_mist": "#AEBCC0"
        },
        "typography": {
            "fontDisplayEn": "Cormorant Garamond",
            "fontBodyEn": "Manrope",
            "fontDisplayBn": "Noto Serif Bengali",
            "fontBodyBn": "Noto Sans Bengali"
        }
    },
    "hero": {
        "restaurant_name": {
            "en": "BENGAL HERITAGE DINING",
            "bn": "বাংলার ঐতিহ্য ডাইনিং"
        },
        "eyebrow": {
            "en": "A TASTE OF BENGAL",
            "bn": "বাংলার স্বাদের গল্প"
        },
        "title": {
            "en": "Where Heritage Meets the Art of Dining.",
            "bn": "ঐতিহ্যের ছোঁয়ায় আধুনিক ভোজনের অভিজ্ঞতা।"
        },
        "tagline": {
            "en": "Traditional Bengal Reinterpreted Through Contemporary Luxury",
            "bn": "ঐতিহ্যবাহী বাংলার স্বাদ ও সমকালীন আভিজাত্য"
        },
        "lead_description": {
            "en": "Discover the flavors, stories, and warmth of Bengali hospitality in a contemporary dining experience. Crafted with ancestral clay hearths, cold-pressed mustard, and Bengal's riverine harvest.",
            "bn": "বাঙালির সমৃদ্ধ স্বাদ, লোকগাঁথা ও আন্তরিক আতিথেয়তার এক অনন্য অভিজ্ঞতা। মাটির চুলার ধীমে আঁচ, খাঁটি সরিষার তেল এবং নদীমাতৃক বাংলার তাজা উপাদানে তৈরি।"
        },
        "cta_primary_text": {
            "en": "Explore Our Menu",
            "bn": "মেনু দেখুন"
        },
        "cta_secondary_text": {
            "en": "Discover Our Story",
            "bn": "আমাদের গল্প"
        },
        "stats": [
            {
                "number": "400+",
                "label": {"en": "Years Culinary Heritage", "bn": "বছরের রন্ধন ঐতিহ্য"}
            },
            {
                "number": "100%",
                "label": {"en": "Cold-Pressed Mustard Oil", "bn": "খাঁটি ঘানিভাঙা সরিষার তেল"}
            },
            {
                "number": "5",
                "label": {"en": "Architectural Dining Zones", "bn": "নান্দনিক ভোজন স্পেস"}
            },
            {
                "number": "28",
                "label": {"en": "Ancestral Regional Recipes", "bn": "ঐতিহ্যবাহী পদ"}
            }
        ]
    },
    "brandStory": {
        "subtitle": {
            "en": "Our Heritage, Our Story",
            "bn": "আমাদের ঐতিহ্য ও গল্প"
        },
        "title": {
            "en": "Centuries of Culinary Artistry in Every Dish",
            "bn": "প্রতিটি পদে শতবর্ষের ঐতিহ্যবাহী রন্ধনশিল্প"
        },
        "badge": {
            "en": "Bengal Courtyard Architecture • Terracotta & Brass",
            "bn": "বাংলার উঠোন স্থাপত্য • টেরাকোটা ও পিতলের ছোঁয়া"
        },
        "body_paragraph_1": {
            "en": "Born from deep reverence for the culinary heritage of Bengal, our restaurant reinterprets ancestral flavors through contemporary luxury hospitality. From terracotta relief craftsmanship to bell-metal dinnerware, every detail reflects the timeless culture of riverine Bengal.",
            "bn": "বাংলার সমৃদ্ধ খাদ্য সংস্কৃতির প্রতি গভীর শ্রদ্ধা থেকে আমাদের এই আয়োজন। টেরাকোটার নান্দনিক কারুকাজ থেকে ঐতিহ্যবাহী কাঁসার পাত্র—প্রতিটি উপাদানে ফুটে উঠেছে নদীমাতৃক বাংলার চিরন্তন ঐতিহ্য ও আভিজাত্য।"
        },
        "body_paragraph_2": {
            "en": "Our culinary philosophy centers on patience and pristine terroir: hilsa harvested from the Padma, gold-hued mustard seeds ground fresh daily on stone shil-nora, and slow-braised meats infused with hand-pounded Bengali garam masala.",
            "bn": "আমাদের রন্ধন দর্শনের মূল ভিত্তি খাঁটি দেশজ উপকরণ ও নিষ্ঠা: পদ্মার তাজা ইলিশ, শীল-নোড়ায় বাটা দেশি সরিষা এবং ধীমে আঁচে মাটির পাত্রে রান্না করা সুস্বাদু কালা ভুনা।"
        },
        "quote": {
            "en": "Food in Bengal is not merely sustenance; it is a sacred ritual of love, memory, and gracious hospitality.",
            "bn": "বাঙালির কাছে ভোজন কেবল ক্ষুধা নিবারণ নয়; এটি মমতা, স্মৃতি ও আন্তরিক আতিথেয়তার এক পুণ্য উৎসব।"
        },
        "quote_author": {
            "en": "Master Chef Ananya Sen",
            "bn": "মাস্টার শেফ অনন্যা সেন"
        },
        "pillars": [
            {
                "title": {"en": "Flavors of Bengal's Terroir", "bn": "বাংলার মাটির খাঁটি স্বাদ"},
                "desc": {
                    "en": "Pristine seasonal produce, Padma river hilsa, Sundarbans wild honey, and cold-pressed mustard oil.",
                    "bn": "পদ্মার রুপালি ইলিশ, সুন্দরবনের মধু ও যশোরের খাঁটি নলেন গুড়ের মেলবন্ধন।"
                }
            },
            {
                "title": {"en": "Artisanal Slow-Cooking Craft", "bn": "ধীমে আঁচে ঐতিহ্যবাহী রান্না"},
                "desc": {
                    "en": "Slow dum cooking in earthen clay pots and spices hand-ground on ancestral stone shil-nora.",
                    "bn": "মাটির হাঁড়িতে ধীমে আঁচে দমে রান্না এবং শীল-নোড়ায় বাটা সুগন্ধি মশলা।"
                }
            },
            {
                "title": {"en": "Gracious Cultural Hospitality", "bn": "আন্তরিক বাঙালি আতিথেয়তা"},
                "desc": {
                    "en": "Bell-metal kansa utensils, handwoven Jamdani aesthetics, and warm, unhurried dining rituals.",
                    "bn": "ঐতিহ্যবাহী কাঁসার বাসন, জামদানির বুনন এবং অপার্থিব আন্তরিক আপ্যায়ন।"
                }
            }
        ],
        "image_main": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85",
        "image_detail": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85"
    },
    "virtualTour": {
        "subtitle": {
            "en": "Explore The Five Spaces",
            "bn": "পাঁচটি নান্দনিক স্পেস অন্বেষণ করুন"
        },
        "title": {
            "en": "Interactive Heritage Virtual Tour",
            "bn": "ইন্টারেক্টিভ রেস্তোরাঁ ভার্চুয়াল ট্যুর"
        },
        "description": {
            "en": "Navigate our contemporary Bengali dining house across 5 distinct architectural viewpoints in full 3D.",
            "bn": "সম্পূর্ণ ৩ডি পরিবেশে আমাদের রেস্তোরাঁর ৫টি নান্দনিক স্থাপত্য স্পেস ঘুরে দেখুন।"
        },
        "viewpoints": [
            {
                "id": "exterior",
                "number": "01",
                "name": {
                    "en": "Heritage Courtyard Exterior",
                    "bn": "ঐতিহাসিক প্রাঙ্গণ ও প্রবেশপথ"
                },
                "cameraPos": [0, 2.5, 9.5],
                "target": [0, 1.8, 0],
                "description": {
                    "en": "Terracotta brick masonry, traditional wooden entrance portals, and water reflection features.",
                    "bn": "টেরাকোটার লাল ইটের দেয়াল, খোদাই করা কাঠের তোরণ ও শান্ত জলাধারের প্রতিফলন।"
                },
                "details": [
                    {"en": "Handcrafted Terracotta Tiles", "bn": "হাতে তৈরি টেরাকোটা টালি"},
                    {"en": "Carved Teakwood Door", "bn": "খোদাই করা সেগুন কাঠের দরজা"},
                    {"en": "Brass Hanging Lanterns", "bn": "ঝুলন্ত পিতলের প্রদীপ"}
                ]
            },
            {
                "id": "reception",
                "number": "02",
                "name": {
                    "en": "Grand Reception & Brass Vestibule",
                    "bn": "অভ্যর্থনা ও কাঁসা-পিতলের লাউঞ্জ"
                },
                "cameraPos": [-3.2, 2.0, 5.5],
                "target": [-0.5, 1.5, 0],
                "description": {
                    "en": "Antique bell-metal brass urns, carved palanquin motifs, and warm welcoming ambient lights.",
                    "bn": "প্রাচীন কাঁসা-পিতলের কলস, পালকির নকশা ও স্নিগ্ধ অভ্যর্থনা লাউঞ্জ।"
                },
                "details": [
                    {"en": "Antique Bell-Metal Urns", "bn": "প্রাচীন কাঁসার পাত্র"},
                    {"en": "Nakshi Kantha Wall Tapestry", "bn": "নকশী কাঁথার দেয়ালচিত্র"},
                    {"en": "Aged Brass Host Desk", "bn": "পিতলমণ্ডিত রিসেপশন ডেস্ক"}
                ]
            },
            {
                "id": "main_dining",
                "number": "03",
                "name": {
                    "en": "Terracotta Central Dining Hall",
                    "bn": "টেরাকোটা কেন্দ্রীয় ভোজনশালা"
                },
                "cameraPos": [0, 2.2, 5.0],
                "target": [0, 1.4, -1.0],
                "description": {
                    "en": "High ceilings with terracotta relief murals, reclaimed Burma teak tables, and woven cane chairs.",
                    "bn": "উঁচু ছাদ, টেরাকোটার দেয়ালচিত্র, বার্মা সেগুন কাঠের টেবিল ও বেতের আরামদায়ক চেয়ার।"
                },
                "details": [
                    {"en": "Relief Terracotta Murals", "bn": "টেরাকোটা দেয়াল ভাস্কর্য"},
                    {"en": "Burma Teak Dining Tables", "bn": "সেগুন কাঠের ভোজন টেবিল"},
                    {"en": "Bell-Metal Plate Settings", "bn": "কাঁসার থালাবাসন"}
                ]
            },
            {
                "id": "zamindar_suite",
                "number": "04",
                "name": {
                    "en": "Zamindar Private Dining Salon",
                    "bn": "জমিন্দারি ব্যক্তিগত ভোজনকক্ষ"
                },
                "cameraPos": [3.0, 2.0, 4.5],
                "target": [0.8, 1.3, -0.5],
                "description": {
                    "en": "Exclusive private room with Jamdani textile acoustic wall panels and bespoke royal thali service.",
                    "bn": "জামদানির নকশা করা দেয়াল, রাজকীয় থালি পরিবেশনা ও ব্যক্তিগত আড্ডা ঘর।"
                },
                "details": [
                    {"en": "Jamdani Fabric Panels", "bn": "আভিজাত্যময় জামদানি প্যানেল"},
                    {"en": "Private Butler Service", "bn": "ব্যক্তিগত বাটলার সার্ভিস"},
                    {"en": "Seats up to 14 Guests", "bn": "১৪ জনের ভোজন ব্যবস্থা"}
                ]
            },
            {
                "id": "culinary_hearth",
                "number": "05",
                "name": {
                    "en": "Open Kitchen & Spice Hearth",
                    "bn": "উন্মুক্ত রন্ধনশালা ও মশলাঘর"
                },
                "cameraPos": [-3.5, 2.0, 4.0],
                "target": [-1.0, 1.4, 0],
                "description": {
                    "en": "View of the earthen dum cooking pots, live Binchotan tandoor, and master chefs grinding heirloom spices.",
                    "bn": "মাটির হাঁড়ির দমে রান্না, লাইভ তন্দুর ও ঐতিহ্যবাহী শীল-নোড়ায় মশলা বাটার দৃশ্য।"
                },
                "details": [
                    {"en": "Earthen Clay Dum Ovens", "bn": "মাটির চুলার দম ওভেন"},
                    {"en": "Live Tawa Roasting", "bn": "সরাসরি তাওয়ায় ভাজা"},
                    {"en": "Spice Stone Grinding Bar", "bn": "শীল-নোড়ায় মশলা বাটার বার"}
                ]
            }
        ]
    },
    "diningPhilosophy": {
        "subtitle": {
            "en": "The Bengali Dining Philosophy",
            "bn": "বাঙালি ভোজন দর্শন"
        },
        "title": {
            "en": "Respect for Terroir, Patience & Warmth",
            "bn": "মাটি, মমতা ও আতিথেয়তার মেলবন্ধন"
        },
        "pillars": [
            {
                "number": "01",
                "title": {"en": "Flavors & Regional Terroir", "bn": "মাটির সুবাস ও ঋতুবৈচিত্র্য"},
                "desc": {
                    "en": "We source indigenous Gobindobhog rice from Dinajpur, sweet water hilsa from Chandpur, and heritage dates molasses from Jessore.",
                    "bn": "দিনাজপুরের সুগন্ধি গোবিন্দভোগ চাল, চাঁদপুরের তাজা রুপালি ইলিশ এবং যশোরের খাঁটি খেজুরের নলেন গুড় সরাসরি সংগ্রহ করা হয়।"
                }
            },
            {
                "number": "02",
                "title": {"en": "Ancestral Slow-Cooking Craft", "bn": "ধীমে আঁচে নিখুঁত রন্ধনশৈলী"},
                "desc": {
                    "en": "Our signature dishes simmer for hours in unglazed clay handis over gentle embers, allowing spices to blossom without hurry.",
                    "bn": "মাটির পাত্রে ধীমে আঁচে কয়লার মৃদু তাপে ঘণ্টার পর ঘণ্টা ধরে রান্না করা হয়, যাতে প্রতিটি মশলার স্বাদ মিশে একাকার হয়ে যায়।"
                }
            },
            {
                "number": "03",
                "title": {"en": "Heartfelt Bengali Hospitality", "bn": "বাঙালির চিরায়ত আপ্যায়ন"},
                "desc": {
                    "en": "Dining served in pure bell-metal kansa plates believed to enhance digestion, accompanied by personal care and culinary stories.",
                    "bn": "খাঁটি কাঁসার থালায় পরিবেশন এবং পরিবারের সদস্যদের মতো আন্তরিক মমতা দিয়ে অতিথিদের প্রতিটি মুহূর্তকে স্মরণীয় করে তোলা হয়।"
                }
            }
        ]
    },
    "signatureDishes": {
        "subtitle": {
            "en": "Artisan Recipes of Bengal",
            "bn": "বাংলার স্বাক্ষর রন্ধনশিল্প"
        },
        "title": {
            "en": "Signature Bengali Culinary Offerings",
            "bn": "স্বাক্ষর বাঙালি খাবারের সমাহার"
        },
        "dishes": [
            {
                "id": "kacchi_biryani",
                "name": {"en": "Old Dhaka Heritage Kacchi Biryani", "bn": "পুরান ঢাকার ঐতিহ্যবাহী কাচ্চি বিরিয়ানি"},
                "category": {"en": "Rice & Biryani", "bn": "ভাত ও বিরিয়ানি"},
                "price": "850 BDT",
                "badge": {"en": "Chef's Signature", "bn": "শেফের সেরা"},
                "description": {
                    "en": "Tender young mutton marinated in raw papaya and secret aromatic spices, layered with fragrant basmati and golden potatoes, slow dum-cooked in sealed clay handis.",
                    "bn": "কচি খাসির মাংস, জাফরান ও সুগন্ধি বাসমতী চালের সাথে আলুর নিখুঁত যুগলবন্দী—মাটির হাঁড়িতে কয়লার আঁচে দমে রান্না করা।"
                },
                "ingredients": [
                    {"en": "Tender Mutton", "bn": "কচি খাসির মাংস"},
                    {"en": "Aged Basmati", "bn": "বাসমতী চাল"},
                    {"en": "Saffron & Pure Ghee", "bn": "জাফরান ও খাঁটি গাওয়া ঘি"},
                    {"en": "Mawa & Prunes", "bn": "মাওয়া ও আলুবোখারা"}
                ],
                "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "shorshe_ilish",
                "name": {"en": "Padma Shorshe Ilish", "bn": "পদ্মার সর্ষে ইলিশ"},
                "category": {"en": "Fish & Seafood", "bn": "মাছ ও সামুদ্রিক"},
                "price": "980 BDT",
                "badge": {"en": "Iconic Bengal", "bn": "বাংলার গর্ব"},
                "description": {
                    "en": "Prime cuts of fresh Padma river hilsa gently poached in stone-ground yellow mustard paste, pungent cold-pressed mustard oil, and slit green chillies.",
                    "bn": "পদ্মার তাজা ইলিশের টুকরো শীল-নোড়ায় বাটা দেশি হলুদ সরিষা, খাঁটি ঝাঁঝালো সরিষার তেল ও কাঁচা মরিচে রান্না।"
                },
                "ingredients": [
                    {"en": "Padma Hilsa", "bn": "পদ্মার তাজা ইলিশ"},
                    {"en": "Stone-ground Mustard", "bn": "বাটা হলুদ সরিষা"},
                    {"en": "Cold-pressed Mustard Oil", "bn": "ঘানিভাঙা সরিষার তেল"},
                    {"en": "Green Chillies", "bn": "কাঁচা মরিচ"}
                ],
                "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "chingri_malai",
                "name": {"en": "Chingri Malai Curry", "bn": "সোনারগাঁও চিংড়ি মালাইকারি"},
                "category": {"en": "Fish & Seafood", "bn": "মাছ ও সামুদ্রিক"},
                "price": "920 BDT",
                "badge": {"en": "Royal Classic", "bn": "রাজকীয় পদ"},
                "description": {
                    "en": "Jumbo freshwater king prawns simmered in velvety fresh coconut cream, scented with green cardamom, cloves, and a hint of organic turmeric.",
                    "bn": "নদীর বড় গলদা চিংড়ি তাজা নারকেলের দুধ, এলাচ, দারুচিনি ও ঘি দিয়ে তৈরি ক্রিমি ও সুস্বাদু গ্রেভি।"
                },
                "ingredients": [
                    {"en": "Freshwater King Prawns", "bn": "গলদা চিংড়ি"},
                    {"en": "Fresh Coconut Cream", "bn": "তাজা নারকেলের দুধ"},
                    {"en": "Cardamom & Cinnamon", "bn": "এলাচ ও দারুচিনি"},
                    {"en": "Desi Ghee", "bn": "দেশি গাওয়া ঘি"}
                ],
                "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "kala_bhuna",
                "name": {"en": "Chittagong Beef Kala Bhuna", "bn": "চট্টগ্রামের মেজবানি কালা ভুনা"},
                "category": {"en": "Meat & Poultry", "bn": "মাংসের পদ"},
                "price": "780 BDT",
                "badge": {"en": "Heritage Tradition", "bn": "মেজবানি ঐতিহ্য"},
                "description": {
                    "en": "Prime cuts of beef slow-braised with 18 roasted spices, mustard oil, and fried shallots until the meat reaches a deep caramelized black exterior while staying succulent inside.",
                    "bn": "১৮ পদের বিশেষ ভাজা মশলা ও খাঁটি সরিষার তেলে ঘণ্টার পর ঘণ্টা কষিয়ে রান্না করা কালো রঙের নরম ও রসালো গরুর মাংস।"
                },
                "ingredients": [
                    {"en": "Prime Beef Cuts", "bn": "গরুর মাংস"},
                    {"en": "Caramelized Shallots", "bn": "পেঁয়াজের বেরেস্তা"},
                    {"en": "Roasted Spice Melange", "bn": "১৮ পদের বিশেষ মশলা"},
                    {"en": "Mustard Oil", "bn": "সরিষার তেল"}
                ],
                "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
            },
            {
                "id": "mishti_doi",
                "name": {"en": "Nolen Gurer Baked Mishti Doi", "bn": "নলেন গুড়ের মাটির হাঁড়ির মিষ্টি দই"},
                "category": {"en": "Desserts", "bn": "মিষ্টান্ন"},
                "price": "280 BDT",
                "badge": {"en": "Sweet Finale", "bn": "মধুর সমাপ্তি"},
                "description": {
                    "en": "Caramelized cow's milk infused with aromatic winter date palm jaggery, naturally fermented inside porous clay pots for an earthy, silky delicacy.",
                    "bn": "যশোরের খেজুরের নলেন গুড় ও গাভির খাঁটি দুধে তৈরি, মাটির পাত্রে পাতা ঐতিহ্যবাহী সুস্বাদু মিষ্টি দই।"
                },
                "ingredients": [
                    {"en": "Fresh Full-Cream Milk", "bn": "গাভির খাঁটি দুধ"},
                    {"en": "Jessore Date Molasses", "bn": "যশোরের নলেন গুড়"},
                    {"en": "Wild Cardamom", "bn": "ছোট এলাচ"},
                    {"en": "Porous Clay Pot", "bn": "মাটির পাত্র"}
                ],
                "image": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=85"
            }
        ]
    },
    "menuExplorer": {
        "subtitle": {
            "en": "Complete Bilingual Menu Explorer",
            "bn": "দ্বিভাষিক মেনু এক্সপ্লোরার"
        },
        "title": {
            "en": "Flavors of Bengal",
            "bn": "বাংলার খাঁটি স্বাদ"
        }
    },
    "architecture": {
        "subtitle": {
            "en": "Terracotta, Teak & Jamdani",
            "bn": "টেরাকোটা, সেগুন ও জামদানির বুনন"
        },
        "title": {
            "en": "Architecture, Materials & Craftsmanship",
            "bn": "স্থাপত্যশৈলী ও ঐতিহ্যবাহী কারুকাজ"
        },
        "quote": {
            "en": "We wanted a sanctuary where Bengal's river breeze, red brick heritage, and bell-metal tableware harmonize into an architectural embrace.",
            "bn": "আমরা এমন এক পরিসর গড়তে চেয়েছি যেখানে বাংলার নদীর হাওয়া, পোড়ামাটির ঘ্রাণ এবং কাঁসার ঝংকার মিলেমিশে এক পরম প্রশান্তি তৈরি করে।"
        },
        "quote_author": {
            "en": "Architect Tariq Mahmud",
            "bn": "স্থপতি তারিক মাহমুদ"
        },
        "features": [
            {
                "title": {"en": "Terracotta Relief Masonry", "bn": "পোড়ামাটির টেরাকোটা ভাস্কর্য"},
                "desc": {
                    "en": "Wall compositions inspired by historic Kantajew and Sonargaon terracotta motifs, handcrafted by rural artisans.",
                    "bn": "কান্তজীউ ও সোনারগাঁর ঐতিহ্যে অনুপ্রাণিত পোড়ামাটির দেয়াল ভাস্কর্য।"
                }
            },
            {
                "title": {"en": "Reclaimed Burma Teak Timber", "bn": "প্রাচীন বার্মা সেগুন কাঠ"},
                "desc": {
                    "en": "Century-old salvaged timber repurposed into massive communal dining tables and carved door panels.",
                    "bn": "শতবর্ষী পুরনো কাঠ দিয়ে তৈরি বিশাল ভোজন টেবিল ও খোদাই করা দরজার কাঠামো।"
                }
            },
            {
                "title": {"en": "Jamdani Textile Acoustics", "bn": "জামদানির বুনন ও অ্যাকোস্টিক"},
                "desc": {
                    "en": "Handwoven geometric Jamdani fabric panels acting as acoustic sound absorbers for intimate conversation.",
                    "bn": "হাতে বোনা জামদানির জ্যামিতিক নকশার দেয়াল প্যানেল যা কথোপকথনে এনে দেয় মাধুর্য।"
                }
            },
            {
                "title": {"en": "Bell-Metal Kansa Tableware", "bn": "খাঁটি কাঁসার থালাবাসন"},
                "desc": {
                    "en": "Every feast is served on hand-beaten bronze and copper tableware crafted by generational artisans of Islampur.",
                    "bn": "ইসলামপুরের ঐতিহ্যবাহী কাঁসারুদের হাতে পেটা খাঁটি কাঁসার পাত্রে পরিবেশন।"
                }
            }
        ],
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85"
    },
    "chef": {
        "name": {
            "en": "Master Chef Ananya Sen",
            "bn": "মাস্টার শেফ অনন্যা সেন"
        },
        "title": {
            "en": "Culinary Director & Heritage Archivist",
            "bn": "রন্ধন পরিচালক ও খাদ্য ঐতিহ্যবিদ"
        },
        "bio": {
            "en": "With three decades devoted to researching lost royal recipes of Bengal and regional folk traditions, Chef Ananya Sen leads our kitchen brigade with uncompromising fidelity to ancestral techniques.",
            "bn": "তিন দশক ধরে বাংলার রাজকীয় হারিয়ে যাওয়া রেসিপি ও গ্রামীণ লোকজ রান্নার ওপর গবেষণার পর, শেফ অনন্যা সেন আমাদের রন্ধনশালা পরিচালনা করছেন ঐতিহ্যের গভীর মমত্ববোধে।"
        },
        "quote": {
            "en": "When you temper mustard seeds in pure ghee over an earthen stove, you are not merely cooking—you are whispering to centuries of Bengal's ancestors.",
            "bn": "মাটির চুলায় যখন খাঁটি সরিষার তেলে ফোড়ন দেওয়া হয়, তখন কেবল রান্না হয় না—শতবর্ষের বাংলার আত্মাকে স্পর্শ করা হয়।"
        },
        "accolades": [
            {"en": "Heritage Gastronomy Laureate (2022, 2024)", "bn": "হেরিটেজ গ্যাস্ট্রোনমি লরিয়েট (২০২২, ২০২৪)"},
            {"en": "Author of 'Rivers of Bengal's Kitchen'", "bn": "'নদী ও হেঁশেল' গ্রন্থের রচয়িতা"},
            {"en": "Preservation of Ancestral Recipes Award", "bn": "ঐতিহ্যবাহী রেসিপি সংরক্ষণ পদক"}
        ],
        "image": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
    },
    "culturalExperiences": {
        "subtitle": {
            "en": "Special Dining Occasions",
            "bn": "বিশেষ ভোজন ও সাংস্কৃতিক উৎসব"
        },
        "title": {
            "en": "Cultural Dining & Special Experiences",
            "bn": "ঐতিহ্যবাহী ভোজন ও উৎসবের আয়োজন"
        },
        "experiences": [
            {
                "title": {"en": "Zamindar Royal Thali Feast", "bn": "জমিন্দারি রাজকীয় থালি ভোজ"},
                "time": {"en": "Daily • Lunch & Dinner", "bn": "প্রতিদিন • দুপুর ও রাত"},
                "desc": {
                    "en": "A 12-course culinary odyssey served on a 24-inch bell-metal kansa plate including 3 preparations of hilsa, chingri, and slow-cooked mutton.",
                    "bn": "২৪ ইঞ্চির রাজকীয় কাঁসার থালায় ১২ পদের জমকালো ভোজ, যার মধ্যে রয়েছে তিন পদের ইলিশ, চিংড়ি ও খাসির মাংস।"
                },
                "price": "2,400 BDT per guest"
            },
            {
                "title": {"en": "Baithak Musical Dinner Soirée", "bn": "বৈঠকি সান্ধ্যভোজ ও শাস্ত্রীয় সঙ্গীত"},
                "time": {"en": "Thursday & Friday • 8:00 PM", "bn": "বৃহস্পতি ও শুক্রবার • রাত ৮:০০"},
                "desc": {
                    "en": "Intimate dining accompanied by live sarod and sitar recitals in our terracotta courtyard.",
                    "bn": "টেরাকোটা প্রাঙ্গণে লাইভ সরোদ ও সেতারের স্নিগ্ধ সুরে বিশেষ সান্ধ্য ভোজন।"
                },
                "price": "3,200 BDT per guest"
            },
            {
                "title": {"en": "Pohela Boishakh Seasonal Celebration", "bn": "পহেলা বৈশাখ ঐতিহ্যবাহী মহোৎসব"},
                "time": {"en": "Seasonal Bengali New Year", "bn": "শুভ নববর্ষ উৎসব"},
                "desc": {
                    "en": "A seasonal feast featuring panta ilish, 14 heritage bhortas, and festival sweets.",
                    "bn": "পান্তা-ইলিশ, ১৪ পদের ঐতিহ্যবাহী ভর্তা ও রকমারি পিঠা-পায়েসের অনন্য উৎসব।"
                },
                "price": "1,950 BDT per guest"
            },
            {
                "title": {"en": "Private Family Suite Buyout", "bn": "পারিবারিক আনন্দ আয়োজন ও ব্যক্তিগত হল"},
                "time": {"en": "By Prior Reservation", "bn": "অগ্রিম বুকিং সাপেক্ষে"},
                "desc": {
                    "en": "Exclusive use of the Zamindar Private Suite for up to 25 guests with tailored heirloom menus.",
                    "bn": "২৫ জন পর্যন্ত অতিথিদের জন্য সম্পূর্ণ ব্যক্তিগত জমিদার লাউঞ্জ ও পছন্দের কাস্টম মেনু।"
                },
                "price": "Custom Inquiries"
            }
        ]
    },
    "gallery": {
        "subtitle": {
            "en": "Visual Archives",
            "bn": "দৃশ্যপট ও পরিবেশ"
        },
        "title": {
            "en": "Food, Craft & Atmosphere Gallery",
            "bn": "খাবার, কারুকাজ ও রূপময় আবহ"
        },
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=85",
                "title": {"en": "Heritage Dum Biryani Handi", "bn": "মাটির হাঁড়ির কাচ্চি দম"},
                "category": "Food"
            },
            {
                "url": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=85",
                "title": {"en": "Shorshe Ilish Bell-Metal Platter", "bn": "কাঁসার থালায় সর্ষে ইলিশ"},
                "category": "Food"
            },
            {
                "url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
                "title": {"en": "Terracotta Courtyard Evening", "bn": "টেরাকোটা প্রাঙ্গণের স্নিগ্ধ সন্ধ্যা"},
                "category": "Architecture"
            },
            {
                "url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
                "title": {"en": "Chingri Malai Curry Serving", "bn": "চিংড়ি মালাইকারি পরিবেশনা"},
                "category": "Food"
            },
            {
                "url": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85",
                "title": {"en": "Zamindar Private Dining Suite", "bn": "জমিন্দারি ভোজন লাউঞ্জ"},
                "category": "Architecture"
            },
            {
                "url": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=85",
                "title": {"en": "Clay Pot Mishti Doi & Sandesh", "bn": "মাটির হাঁড়ির মিষ্টি দই ও সন্দেশ"},
                "category": "Desserts"
            }
        ]
    },
    "testimonials": {
        "subtitle": {
            "en": "Guest Stories & Reviews",
            "bn": "অতিথিদের অভিজ্ঞতা ও সম্মাননা"
        },
        "title": {
            "en": "What Our Diners Say",
            "bn": "অতিথিদের মূল্যায়ন"
        },
        "reviews": [
            {
                "quote": {
                    "en": "The Kacchi Biryani and Padma Shorshe Ilish transported me back to the cherished family gatherings of my childhood. The terracotta ambiance is breathtaking.",
                    "bn": "কাচ্চি বিরিয়ানি আর সর্ষে ইলিশের স্বাদ আমাকে শৈশবের পারিবারিক আনন্দের দিনে ফিরিয়ে নিয়ে গেছে। টেরাকোটার পরিবেশনা সত্যিই অপূর্ব।"
                },
                "author": "Dr. Syed Shamsul Haque",
                "role": {"en": "Culinary Historian & Cultural Critic", "bn": "খাদ্য ইতিহাসবিদ ও সাহিত্যিক"},
                "rating": 5
            },
            {
                "quote": {
                    "en": "A rare masterpiece in Dhaka dining. Serving food on pure bell-metal kansa plates elevates the entire experience to regal elegance.",
                    "bn": "ঢাকার রন্ধনজগতে এক বিরল সৃষ্টি। খাঁটি কাঁসার বাসনে এমন আন্তরিক পরিবেশনা সত্যিই রাজকীয় অনুভূতির জন্ম দেয়।"
                },
                "author": "Farzana Chowdhury",
                "role": {"en": "Heritage Architecture Enthusiast", "bn": "ঐতিহ্য স্থাপত্য অনুরাগী"},
                "rating": 5
            },
            {
                "quote": {
                    "en": "The tenderness of the Kala Bhuna and the subtle sweetness of the Nolen Gurer Mishti Doi prove the kitchen's uncompromising dedication to authentic craft.",
                    "bn": "কালা ভুনার অপূর্ব মশলা আর নলেন গুড়ের মিষ্টি দইয়ের রেশ অনেকদিন মুখে লেগে থাকবে।"
                },
                "author": "Kamal Ahmed",
                "role": {"en": "Food Writer & Guest", "bn": "খাদ্য রসিক ও নিয়মিত অতিথি"},
                "rating": 5
            }
        ]
    },
    "reservation": {
        "subtitle": {
            "en": "Reserve Your Table",
            "bn": "টেবিল বুকিং করুন"
        },
        "title": {
            "en": "Table Reservation Inquiry",
            "bn": "টেবিল সংরক্ষণ ও অনুসন্ধান"
        },
        "description": {
            "en": "Reservations open 14 days in advance. For parties of 8 or more or private Zamindar Suite buyouts, our hospitality concierge is at your service.",
            "bn": "১৪ দিন আগে থেকে টেবিল বুকিং গ্রহণ করা হয়। ৮ জনের বেশি অতিথি বা ব্যক্তিগত স্যুইটের জন্য আমাদের কনসিয়ার্জের সাথে যোগাযোগ করুন।"
        },
        "policy": {
            "en": "Traditional or smart casual attire recommended. Please inform us of any dietary needs.",
            "bn": "মার্জিত ও স্বাচ্ছন্দ্যময় পোশাক বাঞ্ছনীয়। বিশেষ খাদ্য সচেতনতা থাকলে দয়া করে আমাদের জানান।"
        },
        "times": ["12:30 PM", "1:30 PM", "2:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"],
        "seating_options": [
            {"value": "courtyard", "label": {"en": "Heritage Courtyard Table", "bn": "ঐতিহাসিক প্রাঙ্গণ টেবিল"}},
            {"value": "main_dining", "label": {"en": "Terracotta Dining Hall", "bn": "টেরাকোটা কেন্দ্রীয় ভোজনশালা"}},
            {"value": "zamindar_suite", "label": {"en": "Zamindar Private Salon", "bn": "জমিন্দারি ব্যক্তিগত স্যুইট"}},
            {"value": "any", "label": {"en": "Best Available Seating", "bn": "উপলব্ধ যে কোনো সুন্দর টেবিল"}}
        ]
    },
    "location": {
        "subtitle": {
            "en": "Heritage Quarter & Coordinates",
            "bn": "ঐতিহাসিক প্রান্ত ও অবস্থান"
        },
        "title": {
            "en": "Location, Hours & Directions",
            "bn": "ঠিকানা, সময়সূচি ও পথনির্দেশ"
        },
        "address": {
            "en": "House 14, Road 71, Gulshan Heritage Enclave, Dhaka 1212, Bangladesh",
            "bn": "বাড়ি ১৪, রোড ৭১, গুলশান হেরিটেজ এনক্লেভ, ঢাকা ১২১২, বাংলাদেশ"
        },
        "phone": "+880 1711-234567",
        "whatsapp": "+880 1711-234567",
        "email": "hospitality@bengalheritage.com",
        "hours": {
            "en": "Daily: 12:00 PM – 11:30 PM (Lunch: 12:00 PM - 4:00 PM • Dinner: 6:30 PM - 11:30 PM)",
            "bn": "প্রতিদিন: দুপুর ১২:০০ – রাত ১১:৩০ (দুপুরের খাবার: ১২:০০ - ৪:০০ • রাতের খাবার: ৬:৩০ - ১১:৩০)"
        },
        "coordinates": "23.7925° N, 90.4078° E • Gulshan Lakefront",
        "arrival_notes": {
            "en": "Complimentary valet parking available at the entrance courtyard porte-cochère.",
            "bn": "প্রবেশদ্বারে অতিথিদের জন্য সার্বক্ষণিক ফ্রি ভ্যালেট পার্কিং সুবিধা রয়েছে।"
        }
    },
    "footer": {
        "copyright": "© 2026 BENGAL HERITAGE DINING. All rights reserved.",
        "social": {
            "facebook": "https://facebook.com",
            "instagram": "https://instagram.com",
            "youtube": "https://youtube.com"
        }
    }
}

SEED_CATEGORIES = [
    {
        "slug": "starters",
        "name_en": "Starters & Appetizers",
        "name_bn": "শুরুয়াত ও নাস্তা",
        "desc_en": "Traditional crispy fritters and heritage teasers",
        "desc_bn": "মুচমুচে ভাজাভুজি ও সুস্বাদু বাঙালি শুরুয়াত",
        "sort_order": 1
    },
    {
        "slug": "traditional-bengali",
        "name_en": "Traditional Bengali Curries",
        "name_bn": "ঐতিহ্যবাহী বাঙালি পদ",
        "desc_en": "Classic gravies and bhortas slow-cooked with heirloom spices",
        "desc_bn": "ঝোল, কষা ও ভর্তার খাঁটি পদ",
        "sort_order": 2
    },
    {
        "slug": "rice-biryani",
        "name_en": "Rice & Biryani",
        "name_bn": "ভাত ও বিরিয়ানি",
        "desc_en": "Fragrant basmati and Gobindobhog clay pot specialties",
        "desc_bn": "সুগন্ধি বাসমতী ও গোবিন্দভোগ চালের কাচ্চি ও পোলাও",
        "sort_order": 3
    },
    {
        "slug": "fish-seafood",
        "name_en": "Fish & Seafood",
        "name_bn": "মাছ ও সামুদ্রিক",
        "desc_en": "Fresh river hilsa, king prawns, and bhetki delights",
        "desc_bn": "নদীর তাজা ইলিশ, গলদা চিংড়ি ও ভেটকি",
        "sort_order": 4
    },
    {
        "slug": "meat-poultry",
        "name_en": "Meat & Poultry",
        "name_bn": "মাংস ও পোলট্রি",
        "desc_en": "Slow-cooked beef kala bhuna and heritage mutton curries",
        "desc_bn": "কালা ভুনা, মেজবানি মাংস ও হাঁসের পদ",
        "sort_order": 5
    },
    {
        "slug": "desserts",
        "name_en": "Desserts & Sweets",
        "name_bn": "মিষ্টান্ন ও পায়েস",
        "desc_en": "Handcrafted clay pot mishti doi and royal sandesh",
        "desc_bn": "মাটির পাত্রের মিষ্টি দই ও নলেন গুড়ের মিষ্টান্ন",
        "sort_order": 6
    }
]

class Command(BaseCommand):
    help = 'Seeds initial Bengali Heritage CMS configuration, menu categories, dishes, and ensures admin user exists.'

    def handle(self, *args, **kwargs):
        # 1. Admin user
        admin_user, created = User.objects.get_or_create(username='admin')
        if created or not admin_user.check_password('adminpassword123'):
            admin_user.set_password('adminpassword123')
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.email = 'admin@bengalheritage.com'
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("Admin user created/updated: username='admin', password='adminpassword123'"))
        else:
            self.stdout.write(self.style.SUCCESS("Admin user already verified."))

        # 2. SiteConfig
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(
                restaurant_name="BENGAL HERITAGE DINING",
                content_json=INITIAL_BENGALI_DATA,
                theme_json=INITIAL_BENGALI_DATA["theme"],
                default_language="en",
                supported_languages=["en", "bn"],
                is_published=True,
                updated_by=admin_user
            )
            self.stdout.write(self.style.SUCCESS("Created new SiteConfig for BENGAL HERITAGE DINING."))
        else:
            config.restaurant_name = "BENGAL HERITAGE DINING"
            config.content_json = INITIAL_BENGALI_DATA
            config.theme_json = INITIAL_BENGALI_DATA["theme"]
            config.default_language = "en"
            config.supported_languages = ["en", "bn"]
            config.is_published = True
            config.updated_by = admin_user
            config.save()
            self.stdout.write(self.style.SUCCESS("Updated existing SiteConfig with latest Bengali Heritage data."))

        # 3. Menu Categories
        for cat_data in SEED_CATEGORIES:
            cat, _ = MenuCategory.objects.get_or_create(
                slug=cat_data["slug"],
                defaults={
                    "name_en": cat_data["name_en"],
                    "name_bn": cat_data["name_bn"],
                    "description_en": cat_data["desc_en"],
                    "description_bn": cat_data["desc_bn"],
                    "sort_order": cat_data["sort_order"],
                    "is_active": True
                }
            )

        # 4. Menu Items
        if MenuItem.objects.count() == 0:
            cat_rice = MenuCategory.objects.get(slug="rice-biryani")
            cat_fish = MenuCategory.objects.get(slug="fish-seafood")
            cat_meat = MenuCategory.objects.get(slug="meat-poultry")
            cat_sweet = MenuCategory.objects.get(slug="desserts")
            cat_start = MenuCategory.objects.get(slug="starters")

            MenuItem.objects.create(
                category=cat_rice,
                name_en="Old Dhaka Heritage Kacchi Biryani",
                name_bn="পুরান ঢাকার ঐতিহ্যবাহী কাচ্চি বিরিয়ানি",
                description_en="Tender mutton marinated in raw papaya and secret aromatic spices, layered with fragrant basmati and golden potatoes.",
                description_bn="কচি খাসির মাংস, জাফরান ও সুগন্ধি বাসমতী চালের সাথে আলুর নিখুঁত যুগলবন্দী—মাটির হাঁড়িতে কয়লার আঁচে দমে রান্না করা।",
                ingredients_en="Tender Mutton, Aged Basmati, Saffron, Desi Ghee",
                ingredients_bn="কচি খাসির মাংস, বাসমতী চাল, জাফরান, গাওয়া ঘি",
                price=850.00,
                currency="BDT",
                image="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85",
                spice_level="Medium",
                is_available=True,
                is_featured=True,
                sort_order=1
            )

            MenuItem.objects.create(
                category=cat_fish,
                name_en="Padma Shorshe Ilish",
                name_bn="পদ্মার সর্ষে ইলিশ",
                description_en="Fresh Padma river hilsa gently poached in stone-ground yellow mustard paste, cold-pressed mustard oil, and slit green chillies.",
                description_bn="পদ্মার তাজা ইলিশের টুকরো শীল-নোড়ায় বাটা দেশি হলুদ সরিষা, খাঁটি ঝাঁঝালো সরিষার তেল ও কাঁচা মরিচে রান্না।",
                ingredients_en="Padma Hilsa, Stone-ground Mustard, Cold-pressed Mustard Oil",
                ingredients_bn="পদ্মার তাজা ইলিশ, বাটা সরিষা, সরিষার তেল",
                price=980.00,
                currency="BDT",
                image="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85",
                spice_level="Fiery",
                is_available=True,
                is_featured=True,
                sort_order=2
            )

            MenuItem.objects.create(
                category=cat_fish,
                name_en="Chingri Malai Curry",
                name_bn="সোনারগাঁও চিংড়ি মালাইকারি",
                description_en="Jumbo freshwater king prawns simmered in velvety fresh coconut cream, scented with green cardamom and cloves.",
                description_bn="নদীর বড় গলদা চিংড়ি তাজা নারকেলের দুধ, এলাচ, দারুচিনি ও ঘি দিয়ে তৈরি ক্রিমি গ্রেভি।",
                ingredients_en="King Prawns, Coconut Milk, Cardamom, Ghee",
                ingredients_bn="গলদা চিংড়ি, নারকেলের দুধ, এলাচ, ঘি",
                price=920.00,
                currency="BDT",
                image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85",
                spice_level="Mild",
                is_available=True,
                is_featured=True,
                sort_order=3
            )

            MenuItem.objects.create(
                category=cat_meat,
                name_en="Chittagong Beef Kala Bhuna",
                name_bn="চট্টগ্রামের মেজবানি কালা ভুনা",
                description_en="Prime beef slow-braised with 18 roasted spices, mustard oil, and shallots until deep caramelized black.",
                description_bn="১৮ পদের বিশেষ ভাজা মশলা ও খাঁটি সরিষার তেলে ঘণ্টার পর ঘণ্টা কষিয়ে রান্না করা কালো রঙের গরুর মাংস।",
                ingredients_en="Prime Beef, Fried Shallots, Roasted Spices, Mustard Oil",
                ingredients_bn="গরুর মাংস, পেঁয়াজের বেরেস্তা, বিশেষ মশলা, সরিষার তেল",
                price=780.00,
                currency="BDT",
                image="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
                spice_level="Medium",
                is_available=True,
                is_featured=True,
                sort_order=4
            )

            MenuItem.objects.create(
                category=cat_sweet,
                name_en="Nolen Gurer Baked Mishti Doi",
                name_bn="নলেন গুড়ের মাটির হাঁড়ির মিষ্টি দই",
                description_en="Caramelized milk infused with winter date palm jaggery, naturally set inside porous clay pots.",
                description_bn="যশোরের খেজুরের নলেন গুড় ও গাভির খাঁটি দুধে তৈরি, মাটির পাত্রে পাতা সুস্বাদু মিষ্টি দই।",
                ingredients_en="Full-Cream Milk, Jessore Date Molasses, Clay Handi",
                ingredients_bn="গাভির দুধ, নলেন গুড়, মাটির পাত্র",
                price=280.00,
                currency="BDT",
                image="https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=85",
                spice_level="Sweet",
                is_available=True,
                is_featured=True,
                sort_order=5
            )

            MenuItem.objects.create(
                category=cat_start,
                name_en="Mochar Ghonto Croquettes",
                name_bn="মোচার ঘণ্ট ক্রকেট",
                description_en="Crispy banana flower croquettes with coconut shavings and roasted cumin.",
                description_bn="কলা গাছের মোচা, কুরানো নারকেল ও ভাজা জিরার মুচমুচে কাটলেট।",
                ingredients_en="Banana Flower, Grated Coconut, Roasted Cumin",
                ingredients_bn="কলার মোচা, কুরানো নারকেল, ভাজা জিরা",
                price=340.00,
                currency="BDT",
                image="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
                spice_level="Mild",
                is_available=True,
                is_featured=False,
                sort_order=6
            )
            self.stdout.write(self.style.SUCCESS("Seeded sample bilingual menu items."))

        # 5. Sample Reservations
        if Reservation.objects.count() == 0:
            Reservation.objects.create(
                full_name="Mahmudur Rahman",
                phone="+880 1711-987654",
                email="mahmud.rahman@heritage-invest.com",
                reservation_date="2026-11-25",
                reservation_time="7:30 PM",
                guests=4,
                occasion="Family Heritage Dinner",
                seating_preference="Terracotta Dining Hall",
                special_requests="Requesting bell-metal thali service and pre-order of Kacchi Biryani & Shorshe Ilish.",
                preferred_language="bn",
                status="confirmed"
            )
            Reservation.objects.create(
                full_name="Sabrina Islam",
                phone="+880 1819-456789",
                email="sabrina.islam@artfoundation.org",
                reservation_date="2026-11-28",
                reservation_time="8:00 PM",
                guests=2,
                occasion="Anniversary Soirée",
                seating_preference="Courtyard Heritage Table",
                special_requests="Prefers courtyard table near the water feature during the Sarod recital.",
                preferred_language="en",
                status="pending"
            )
            self.stdout.write(self.style.SUCCESS("Created sample seed reservations."))

        self.stdout.write(self.style.SUCCESS("Bengali Heritage CMS initialization complete!"))
