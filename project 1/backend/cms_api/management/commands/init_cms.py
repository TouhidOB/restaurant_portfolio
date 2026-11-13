import json
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from cms_api.models import SiteConfig, Reservation

# Default Art Deco Template Data
INITIAL_DATA = {
    "name": "AURELIA",
    "subname": "Grand Dining Salon & Champagne Parlour",
    "tagline": "Where Elegance Meets Exceptional Taste",
    "shortStory": "An extraordinary dining destination where 1920s Art Deco grandeur blends seamlessly with modern haute cuisine, artisanal charcoal grills, and timeless hospitality.",
    "city": "Dhaka",
    "country": "Bangladesh",
    "currency": "৳",
    "currencyCode": "BDT",
    "theme": {
        "colors": {
            "emerald": "#123B35",
            "gold": "#D6B879",
            "obsidian": "#17191A",
            "pearl": "#F3EDE1",
            "jade": "#718C7D",
            "bronze": "#99764B",
            "primaryButtonBg": "#123B35",
            "primaryButtonText": "#E8D3A2",
            "primaryButtonBorder": "#D6B879"
        },
        "typography": {
            "fontDisplay": "Bodoni Moda",
            "fontBody": "Montserrat",
            "fontAccent": "Cormorant Garamond",
            "heroHeadingSize": 84,
            "sectionHeadingSize": 56,
            "bodySize": 16
        }
    },
    "contact": {
        "address": "Grand Promenade, Road 71, Gulshan 2",
        "cityArea": "Gulshan 2, Dhaka 1212",
        "fullAddress": "Grand Promenade, Road 71, Gulshan 2, Dhaka 1212, Bangladesh",
        "phone": "+880 1711-889900",
        "phoneDisplay": "+880 1711 889900",
        "email": "concierge@aurelia-dining.com",
        "whatsapp": "+8801711889900",
        "whatsappDisplay": "+880 1711 889900",
        "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700319760742!2d90.4072!3d23.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0xf6b567546e90a53!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
        "googleMapsDirectionsUrl": "https://maps.google.com/?q=Gulshan+2+Dhaka"
    },
    "hours": [
        { "days": "Monday – Thursday", "time": "12:00 PM – 11:00 PM" },
        { "days": "Friday – Sunday", "time": "12:00 PM – 11:45 PM" },
        { "days": "Special Holidays & Eve", "time": "Special Festive Hours Announced via Concierge" }
    ],
    "social": {
        "facebook": "https://facebook.com/aurelia.dining",
        "instagram": "https://instagram.com/aurelia.dining",
        "youtube": "https://youtube.com/@aureliadining",
        "tiktok": "https://tiktok.com/@aureliadining"
    },
    "hero": {
        "eyebrow": "AN EXTRAORDINARY DINING DESTINATION",
        "title": "Where Elegance Meets Exceptional Taste.",
        "description": "Discover an unforgettable dining experience where exceptional cuisine, timeless architecture and thoughtful hospitality come together in perfect harmony.",
        "primaryCta": "RESERVE YOUR TABLE",
        "secondaryCta": "EXPLORE OUR RESTAURANT",
        "locationBadge": "GULSHAN 2, DHAKA, BANGLADESH",
        "fallbackImage": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop"
    },
    "brandIntro": {
        "eyebrow": "THE ART OF FINE DINING",
        "title": "A Place Where Every Detail Tells a Story.",
        "lead": "At AURELIA, dining is more than a meal. It is an experience shaped by carefully selected ingredients, thoughtful preparation and genuine hospitality.",
        "description": "From the dramatic arches and emerald marble of our dining salon to the final delicate garnish on every plate, we believe that truly transcendent moments are created through an uncompromising dedication to passion, beauty, and consistency.",
        "secondaryStatement": "Crafted with Passion. Served with Distinction.",
        "cta": "DISCOVER OUR STORY",
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
    },
    "tourViewpoints": [
        {
            "id": "exterior",
            "number": "01",
            "name": "Exterior From the Road",
            "caption": "A Grand Welcome",
            "description": "Your experience begins the moment you arrive. Discover an imposing Art Deco facade glowing with amber architectural sconces.",
            "cameraPos": [0, 2.5, 12],
            "cameraTarget": [0, 1.5, 0],
            "sceneMood": "dusk",
            "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "entrance",
            "number": "02",
            "name": "Main Entrance",
            "caption": "Step Into Elegance",
            "description": "A hand-cast bronze portal opens to polished obsidian flooring, soft emerald velvet curtains, and ambient chandelier warmth.",
            "cameraPos": [-3, 1.8, 6],
            "cameraTarget": [0, 1.5, 0],
            "sceneMood": "warm-intimate",
            "image": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "dining",
            "number": "03",
            "name": "Main Dining Area",
            "caption": "An Atmosphere to Remember",
            "description": "Settle into bespoke emerald banquettes nestled beneath crystal cascading fixtures and polished brass geometric screens.",
            "cameraPos": [0, 2, 4],
            "cameraTarget": [0, 1.2, -5],
            "sceneMood": "champagne-glow",
            "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "reception",
            "number": "04",
            "name": "Cash Counter / Reception",
            "caption": "Hospitality in Every Detail",
            "description": "Crafted from hand-cut green Guatemala marble and backlit champagne brass, our concierge desk is staffed by hospitable hosts.",
            "cameraPos": [4, 1.6, 2],
            "cameraTarget": [2, 1.2, -2],
            "sceneMood": "ambient-gold",
            "image": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1400&auto=format&fit=crop"
        },
        {
            "id": "kitchen",
            "number": "05",
            "name": "Open Kitchen",
            "caption": "Behind Every Exceptional Plate",
            "description": "Step behind the glass partition and observe our master culinary brigade orchestrating artisanal charcoal embers.",
            "cameraPos": [-4, 2, 1],
            "cameraTarget": [-1, 1.4, -4],
            "sceneMood": "energetic-warmth",
            "image": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1400&auto=format&fit=crop"
        }
    ],
    "experiencePillars": [
        {
            "number": "01",
            "title": "Exceptional Ingredients",
            "description": "We source certified prime cuts, line-caught seafood, and heirloom produce locally and internationally."
        },
        {
            "number": "02",
            "title": "Crafted with Precision",
            "description": "Every plate reflects meticulous culinary craftsmanship, balancing classical French discipline and charcoal embers."
        },
        {
            "number": "03",
            "title": "An Elegant Atmosphere",
            "description": "Surround yourself with bespoke Art Deco aesthetics, acoustic privacy, and soft ambient illumination."
        },
        {
            "number": "04",
            "title": "Thoughtful Hospitality",
            "description": "Our dedicated concierge and service team ensure anticipatory, personalized attention from arrival until farewell."
        }
    ],
    "signatureDishes": [
        {
            "id": "sig-1",
            "name": "Royal Grilled Platter",
            "price": 1250,
            "category": "Grills",
            "tag": "Bestseller",
            "dietary": "Chef Selection",
            "description": "A masterfully seared medley of tender lamb cutlets, tiger prawns, and spiced smoked chicken skewered over binchotan coals.",
            "image": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop"
        },
        {
            "id": "sig-2",
            "name": "Signature Beef Steak",
            "price": 1450,
            "category": "Main Course",
            "tag": "Signature",
            "dietary": "Gluten-Free",
            "description": "Dry-aged prime tenderloin grilled to your exact preference over hickory charcoal, topped with truffle marrow butter.",
            "image": "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=900&auto=format&fit=crop"
        },
        {
            "id": "sig-3",
            "name": "Golden Seafood Selection",
            "price": 1350,
            "category": "Seafood",
            "tag": "Seasonal Catch",
            "dietary": "Pescatarian",
            "description": "Pan-roasted Norwegian salmon and jumbo Bay of Bengal tiger prawns served on a saffron-scented bisque.",
            "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=900&auto=format&fit=crop"
        },
        {
            "id": "sig-4",
            "name": "Decadent Chocolate Dessert",
            "price": 450,
            "category": "Desserts",
            "tag": "Art Deco Classic",
            "dietary": "Vegetarian",
            "description": "70% single-origin dark chocolate sphere filled with hazelnut praline mousse and gold leaf flake.",
            "image": "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=900&auto=format&fit=crop"
        }
    ],
    "menuCategories": [
        "All", "Starters", "Main Course", "Grills", "Seafood", "Rice & Biryani", "Pasta", "Desserts", "Beverages"
    ],
    "menuItems": [
        {
            "id": "m-1",
            "name": "Smoked Chicken Steak",
            "price": 850,
            "category": "Grills",
            "dietary": "High Protein",
            "description": "Charcoal-kissed boneless chicken breast infused with smoked rosemary, served with sautéed greens.",
            "available": True
        },
        {
            "id": "m-2",
            "name": "Truffle Burrata & Heirloom Salad",
            "price": 720,
            "category": "Starters",
            "dietary": "Vegetarian",
            "description": "Artisanal Italian burrata, heirloom tomatoes, fresh micro-basil, white truffle oil, and aged balsamic glaze.",
            "available": True
        },
        {
            "id": "m-3",
            "name": "Crispy Calamari Fritti",
            "price": 680,
            "category": "Starters",
            "dietary": "Seafood",
            "description": "Golden fried tender squid rings tossed in smoked paprika salt, served with yuzu-garlic aioli and grilled lime.",
            "available": True
        },
        {
            "id": "m-4",
            "name": "Classic Crème Brûlée",
            "price": 390,
            "category": "Desserts",
            "dietary": "Vegetarian",
            "description": "Silky Madagascar vanilla bean custard finished with a crisp caramelized raw cane sugar crust.",
            "available": True
        }
    ],
    "interior": {
        "heading": "Designed for Moments That Matter.",
        "description": "Every corner of our restaurant has been thoughtfully sculpted to evoke the glamour of 1920s grand ballrooms.",
        "highlights": [
            { "label": "Emerald Guatemala Marble", "desc": "Hand-polished green stone slabs creating a majestic foundation." },
            { "label": "Champagne Brass Geometry", "desc": "Custom forged Art Deco screens designed for intimate seclusion." },
            { "label": "Crystal Chandelier Canopy", "desc": "Warm ambient luminescence casting a radiant glow over every table." },
            { "label": "Deep Velvet Upholstery", "desc": "Ergonomically tailored plush seating for relaxed, leisurely dining." }
        ],
        "mainImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
        "subImage1": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
        "subImage2": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop"
    },
    "chef": {
        "eyebrow": "THE CULINARY VISION",
        "heading": "Passion Behind Every Plate.",
        "name": "M. Tariq Al-Hassan",
        "title": "Executive Chef & Culinary Director",
        "description": "Our culinary brigade believes that exceptional food begins with respect for ingredients, thermal mastery, and aesthetic dedication.",
        "quote": "Great food is not only about taste. It is about the care, rhythm, precision and heartfelt passion that orchestrates every single moment at the pass.",
        "image": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=900&auto=format&fit=crop",
        "experienceYears": "22 Years of Culinary Leadership"
    },
    "specialExperiences": [
        {
            "id": "private-dining",
            "title": "The Salon Privé",
            "subtitle": "Exclusive Private Dining",
            "description": "An intimate enclave secluded behind brass filigree doors, seating up to 16 guests.",
            "cta": "EXPLORE PRIVATE DINING",
            "image": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
        },
        {
            "id": "family-gatherings",
            "title": "Family Celebrations",
            "subtitle": "Unforgettable Moments",
            "description": "Generous banquet tables, signature sharing platters, and attentive hospitality.",
            "cta": "PLAN YOUR VISIT",
            "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
        }
    ],
    "galleryCategories": ["All", "Signature Dishes", "Restaurant Interior", "Architecture", "Kitchen"],
    "galleryImages": [
        {
            "id": "g-1",
            "title": "The Grand Chandelier Dining Hall",
            "category": "Restaurant Interior",
            "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
            "aspect": "wide"
        },
        {
            "id": "g-2",
            "title": "Prime Dry-Aged Ribeye & Charcoal Embers",
            "category": "Signature Dishes",
            "image": "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000&auto=format&fit=crop",
            "aspect": "tall"
        }
    ],
    "testimonials": [
        {
            "id": "t-1",
            "quote": "An extraordinary dining revelation in Dhaka. From the moment you walk past the brass portal into the emerald salon, you feel transported to the golden age of hospitality.",
            "author": "Farhan & Nadia Rahman",
            "title": "Private Dinner Guests",
            "rating": 5,
            "date": "October 2026"
        }
    ],
    "reservationSettings": {
        "minNoticeHours": 2,
        "timeSlots": [
            "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
            "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
            "09:00 PM", "09:30 PM", "10:00 PM"
        ],
        "occasions": [
            "Casual Fine Dining",
            "Romantic Dinner / Anniversary",
            "Birthday Celebration",
            "Business Meeting / Corporate",
            "Family Gathering",
            "Special Occasion"
        ]
    }
}

class Command(BaseCommand):
    help = "Initialize default superuser and CMS configuration"

    def handle(self, *args, **options):
        # 1. Create or update default admin superuser
        admin_user, created = User.objects.get_or_create(username='admin')
        admin_user.set_password('adminpassword123')
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.email = 'admin@aurelia-dining.com'
        admin_user.save()

        if created:
            self.stdout.write(self.style.SUCCESS("Created admin user: 'admin' with password: 'adminpassword123'"))
        else:
            self.stdout.write(self.style.SUCCESS("Updated admin user: 'admin' with password: 'adminpassword123'"))

        # 2. Create initial SiteConfig if not present
        if not SiteConfig.objects.exists():
            SiteConfig.objects.create(
                restaurant_name='AURELIA',
                content_json=INITIAL_DATA,
                is_published=True,
                updated_by=admin_user,
            )
            self.stdout.write(self.style.SUCCESS("Seeded initial Art Deco CMS configuration into Django database."))
        else:
            self.stdout.write("SiteConfig already exists in database.")
