/**
 * AURELIA RESTAURANT CONFIGURATION
 * All restaurant data, content, menus, contact details, and locations are centralized here.
 * Any restaurant can customize this entire website simply by modifying this file.
 */

export const restaurantConfig = {
  name: "AURELIA",
  subname: "Grand Dining Salon &amp; Champagne Parlour",
  tagline: "Where Elegance Meets Exceptional Taste",
  shortStory: "An extraordinary dining destination where 1920s Art Deco grandeur blends seamlessly with modern haute cuisine, artisanal charcoal grills, and timeless hospitality.",
  city: "Dhaka",
  country: "Bangladesh",
  currency: "৳",
  currencyCode: "BDT",
  
  contact: {
    address: "Grand Promenade, Road 71, Gulshan 2",
    cityArea: "Gulshan 2, Dhaka 1212",
    fullAddress: "Grand Promenade, Road 71, Gulshan 2, Dhaka 1212, Bangladesh",
    phone: "+880 1711-889900",
    phoneDisplay: "+880 1711 889900",
    email: "concierge@aurelia-dining.com",
    whatsapp: "+8801711889900", // Format for WhatsApp API
    whatsappDisplay: "+880 1711 889900",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700319760742!2d90.4072!3d23.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0xf6b567546e90a53!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Gulshan+2+Dhaka"
  },

  hours: [
    { days: "Monday – Thursday", time: "12:00 PM – 11:00 PM" },
    { days: "Friday – Sunday", time: "12:00 PM – 11:45 PM" },
    { days: "Special Holidays &amp; Eve", time: "Special Festive Hours Announced via Concierge" }
  ],

  social: {
    facebook: "https://facebook.com/aurelia.dining",
    instagram: "https://instagram.com/aurelia.dining",
    youtube: "https://youtube.com/@aureliadining",
    tiktok: "https://tiktok.com/@aureliadining"
  },

  // 15 Sections Configuration
  hero: {
    eyebrow: "AN EXTRAORDINARY DINING DESTINATION",
    title: "Where Elegance Meets Exceptional Taste.",
    description: "Discover an unforgettable dining experience where exceptional cuisine, timeless architecture and thoughtful hospitality come together in perfect harmony.",
    primaryCta: "RESERVE YOUR TABLE",
    secondaryCta: "EXPLORE OUR RESTAURANT",
    locationBadge: "GULSHAN 2, DHAKA, BANGLADESH",
    fallbackImage: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop"
  },

  brandIntro: {
    eyebrow: "THE ART OF FINE DINING",
    title: "A Place Where Every Detail Tells a Story.",
    lead: "At AURELIA, dining is more than a meal. It is an experience shaped by carefully selected ingredients, thoughtful preparation and genuine hospitality.",
    description: "From the dramatic arches and emerald marble of our dining salon to the final delicate garnish on every plate, we believe that truly transcendent moments are created through an uncompromising dedication to passion, beauty, and consistency.",
    secondaryStatement: "Crafted with Passion. Served with Distinction.",
    cta: "DISCOVER OUR STORY",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
  },

  // Section 04: Virtual Tour Viewpoints
  tourViewpoints: [
    {
      id: "exterior",
      number: "01",
      name: "Exterior From the Road",
      caption: "A Grand Welcome",
      description: "Your experience begins the moment you arrive. Discover an imposing Art Deco facade glowing with amber architectural sconces, welcoming you from the bustling promenade into a realm of serene opulence.",
      cameraPos: [0, 2.5, 12],
      cameraTarget: [0, 1.5, 0],
      sceneMood: "dusk",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1400&auto=format&fit=crop"
    },
    {
      id: "entrance",
      number: "02",
      name: "Main Entrance",
      caption: "Step Into Elegance",
      description: "A hand-cast bronze portal opens to polished obsidian flooring, soft emerald velvet curtains, and ambient chandelier warmth that immediately removes the hurry of the outside world.",
      cameraPos: [-3, 1.8, 6],
      cameraTarget: [0, 1.5, 0],
      sceneMood: "warm-intimate",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1400&auto=format&fit=crop"
    },
    {
      id: "dining",
      number: "03",
      name: "Main Dining Area",
      caption: "An Atmosphere to Remember",
      description: "Settle into bespoke emerald banquettes nestled beneath crystal cascading fixtures and polished brass geometric screens designed to balance intimacy with grandeur.",
      cameraPos: [0, 2, 4],
      cameraTarget: [0, 1.2, -5],
      sceneMood: "champagne-glow",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop"
    },
    {
      id: "reception",
      number: "04",
      name: "Cash Counter / Reception",
      caption: "Hospitality in Every Detail",
      description: "Crafted from hand-cut green Guatemala marble and backlit champagne brass, our concierge desk is staffed by our hospitable hosts ready to attend to every reservation need.",
      cameraPos: [4, 1.6, 2],
      cameraTarget: [2, 1.2, -2],
      sceneMood: "ambient-gold",
      image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1400&auto=format&fit=crop"
    },
    {
      id: "kitchen",
      number: "05",
      name: "Open Kitchen",
      caption: "Behind Every Exceptional Plate",
      description: "Step behind the glass partition and observe our master culinary brigade orchestrating artisanal charcoal embers, sous-vide precision, and delicate French plating.",
      cameraPos: [-4, 2, 1],
      cameraTarget: [-1, 1.4, -4],
      sceneMood: "energetic-warmth",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1400&auto=format&fit=crop"
    }
  ],

  // Section 05: Signature Dining Experience Pillars
  experiencePillars: [
    {
      number: "01",
      title: "Exceptional Ingredients",
      description: "We source certified prime cuts, line-caught seafood, and heirloom produce locally and internationally to maintain the purity, freshness, and distinct character of every creation."
    },
    {
      number: "02",
      title: "Crafted with Precision",
      description: "Every plate reflects meticulous culinary craftsmanship, balancing classical French discipline, charcoal embers, and modern gastronomy for unforgettable flavour profiles."
    },
    {
      number: "03",
      title: "An Elegant Atmosphere",
      description: "Surround yourself with bespoke Art Deco aesthetics, acoustic privacy, and soft ambient illumination tailored for celebratory dinners and intimate memories."
    },
    {
      number: "04",
      title: "Thoughtful Hospitality",
      description: "Our dedicated concierge and service team ensure anticipatory, personalized attention from the instant your reservation is logged until your farewell."
    }
  ],

  // Section 06: Signature Dishes
  signatureDishes: [
    {
      id: "sig-1",
      name: "Royal Grilled Platter",
      price: 1250,
      category: "Grills",
      tag: "Bestseller",
      dietary: "Chef Selection",
      description: "A masterfully seared medley of tender lamb cutlets, tiger prawns, and spiced smoked chicken skewered over binchotan coals, paired with herb-whipped potato puree and smoked tomato demiglace.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "sig-2",
      name: "Signature Beef Steak",
      price: 1450,
      category: "Main Course",
      tag: "Signature",
      dietary: "Gluten-Free",
      description: "Dry-aged prime tenderloin grilled to your exact preference over hickory charcoal, topped with truffle marrow butter, roasted shallots, and green peppercorn jus.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "sig-3",
      name: "Golden Seafood Selection",
      price: 1350,
      category: "Seafood",
      tag: "Seasonal Catch",
      dietary: "Pescatarian",
      description: "Pan-roasted Norwegian salmon and jumbo Bay of Bengal tiger prawns served on a saffron-scented saffron bisque with charred baby leeks and lemon-caper oil.",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "sig-4",
      name: "Decadent Chocolate Dessert",
      price: 450,
      category: "Desserts",
      tag: "Art Deco Classic",
      dietary: "Vegetarian",
      description: "70% single-origin dark chocolate sphere filled with hazelnut praline mousse, gold leaf flake, and hot espresso caramel poured tableside.",
      image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=900&auto=format&fit=crop"
    }
  ],

  // Section 07: Full Menu Categories and Items
  menuCategories: [
    "All",
    "Starters",
    "Main Course",
    "Grills",
    "Seafood",
    "Rice & Biryani",
    "Pasta",
    "Desserts",
    "Beverages"
  ],

  menuItems: [
    {
      id: "m-1",
      name: "Smoked Chicken Steak",
      price: 850,
      category: "Grills",
      dietary: "High Protein",
      description: "Charcoal-kissed boneless chicken breast infused with smoked rosemary, served with sautéed greens and garlic velouté.",
      available: true
    },
    {
      id: "m-2",
      name: "Truffle Burrata & Heirloom Salad",
      price: 720,
      category: "Starters",
      dietary: "Vegetarian",
      description: "Artisanal Italian burrata, heirloom tomatoes, fresh micro-basil, white truffle oil, and aged balsamic glaze.",
      available: true
    },
    {
      id: "m-3",
      name: "Crispy Calamari Fritti",
      price: 680,
      category: "Starters",
      dietary: "Seafood",
      description: "Golden fried tender squid rings tossed in smoked paprika salt, served with yuzu-garlic aioli and grilled lime.",
      available: true
    },
    {
      id: "m-4",
      name: "Forest Mushroom Cappuccino Soup",
      price: 420,
      category: "Starters",
      dietary: "Vegetarian",
      description: "Velvety purée of wild morel and portobello mushrooms topped with parmesan foam and crisp thyme croutons.",
      available: true
    },
    {
      id: "m-5",
      name: "Braised Australian Lamb Shank",
      price: 1580,
      category: "Main Course",
      dietary: "Signature",
      description: "Slow-braised for six hours in rich rosemary and reduction sauce, served over creamy saffron polenta.",
      available: true
    },
    {
      id: "m-6",
      name: "Pan-Seared Duck Breast",
      price: 1390,
      category: "Main Course",
      dietary: "Chef Special",
      description: "Crispy skin duck breast glazed with spiced orange honey, roasted root vegetables, and cherry port wine reduction.",
      available: true
    },
    {
      id: "m-7",
      name: "Artisan BBQ Beef Ribs",
      price: 1480,
      category: "Grills",
      dietary: "Meat Lover",
      description: "Glazed in house bourbon-molasses BBQ sauce, slow smoked over applewood embers until falling off the bone.",
      available: true
    },
    {
      id: "m-8",
      name: "Atlantic Seabass Fillet",
      price: 1420,
      category: "Seafood",
      dietary: "Gluten-Free",
      description: "Crispy pan-fried skin, pea puree, butter-poached asparagus, and caper beurre blanc.",
      available: true
    },
    {
      id: "m-9",
      name: "Aurelia Royal Dum Biryani",
      price: 980,
      category: "Rice & Biryani",
      dietary: "Heritage Recipe",
      description: "Aged long-grain basmati steamed in sealed dough with tender mutton, saffron, rose water, and caramelized shallots.",
      available: true
    },
    {
      id: "m-10",
      name: "Saffron Wild Prawn Pilaf",
      price: 1150,
      category: "Rice & Biryani",
      dietary: "Seafood",
      description: "Fragrant Kashmiri saffron rice folded with Bay prawns, roasted cashews, golden raisins, and mint raita.",
      available: true
    },
    {
      id: "m-11",
      name: "Handmade Truffle Tagliatelle",
      price: 890,
      category: "Pasta",
      dietary: "Vegetarian",
      description: "Fresh egg pasta ribbons tossed in cultured butter, shaved black winter truffle, and aged 24-month Parmigiano-Reggiano.",
      available: true
    },
    {
      id: "m-12",
      name: "Spicy Lobster Linguine",
      price: 1450,
      category: "Pasta",
      dietary: "Seafood",
      description: "Sweet Maine lobster chunks tossed in chili-garlic olive oil, sun-dried tomatoes, and light shellfish broth.",
      available: true
    },
    {
      id: "m-13",
      name: "Classic Crème Brûlée",
      price: 390,
      category: "Desserts",
      dietary: "Vegetarian",
      description: "Silky Madagascar vanilla bean custard finished with a crisp caramelized raw cane sugar crust and fresh berries.",
      available: true
    },
    {
      id: "m-14",
      name: "Emerald Pistachio Paris-Brest",
      price: 480,
      category: "Desserts",
      dietary: "Nut Special",
      description: "Crispy choux ring filled with roasted Sicilian pistachio praline cream and dusted with powdered gold.",
      available: true
    },
    {
      id: "m-15",
      name: "Smoked Rosemary Old Fashioned (Mocktail)",
      price: 380,
      category: "Beverages",
      dietary: "Signature Mocktail",
      description: "Charred oak infusion, spiced orange reduction, aromatic bitters, and torched fresh rosemary branch.",
      available: true
    },
    {
      id: "m-16",
      name: "Golden Champagne Sparkler (Non-Alcoholic)",
      price: 420,
      category: "Beverages",
      dietary: "Refreshing",
      description: "Sparkling elderflower nectar, cold-pressed white grape, edible 24k gold shimmer, and crystallized mint.",
      available: true
    }
  ],

  // Section 08: Interior & Architecture
  interior: {
    heading: "Designed for Moments That Matter.",
    description: "Every corner of our restaurant has been thoughtfully sculpted to evoke the glamour of 1920s grand ballrooms combined with contemporary acoustic comfort and intimate architectural lighting.",
    highlights: [
      { label: "Emerald Guatemala Marble", desc: "Hand-polished green stone slabs creating a majestic foundation." },
      { label: "Champagne Brass Geometry", desc: "Custom forged Art Deco screens designed for intimate seclusion." },
      { label: "Crystal Chandelier Canopy", desc: "Warm ambient luminescence casting a radiant glow over every table." },
      { label: "Deep Velvet Upholstery", desc: "Ergonomically tailored plush seating for relaxed, leisurely dining." }
    ],
    mainImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
    subImage1: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
    subImage2: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop"
  },

  // Section 09: Meet the Chef
  chef: {
    eyebrow: "THE CULINARY VISION",
    heading: "Passion Behind Every Plate.",
    name: "M. Tariq Al-Hassan",
    title: "Executive Chef &amp; Culinary Director",
    description: "Our culinary brigade believes that exceptional food begins with respect for ingredients, mastery of thermal technique, and an unwavering passion for making every plate an aesthetic celebration.",
    quote: "Great food is not only about taste. It is about the care, rhythm, precision and heartfelt passion that orchestrates every single moment at the pass.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=900&auto=format&fit=crop",
    experienceYears: "22 Years of Culinary Leadership",
    credentials: "Specialist in Modern French Gastronomy &amp; Charcoal Artistry"
  },

  // Section 10: Special Experiences
  specialExperiences: [
    {
      id: "private-dining",
      title: "The Salon Privé",
      subtitle: "Exclusive Private Dining",
      description: "An intimate enclave secluded behind brass filigree doors, seating up to 16 guests with dedicated butler service and customized degustation menus.",
      cta: "EXPLORE PRIVATE DINING",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "family-gatherings",
      title: "Family Celebrations",
      subtitle: "Unforgettable Moments",
      description: "Generous banquet tables, signature sharing platters, and attentive hospitality tailored for birthdays, reunions, and festive milestones.",
      cta: "PLAN YOUR VISIT",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "celebrations-events",
      title: "Milestone Receptions",
      subtitle: "Anniversaries &amp; Soirées",
      description: "Elevate anniversaries, engagements, and commemorative dinners with custom floral arrangements, tableside dessert presentations, and curated mocktails.",
      cta: "DISCUSS YOUR EVENT",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "corporate-dining",
      title: "Executive Entertaining",
      subtitle: "Corporate Dinners &amp; Luncheons",
      description: "A tranquil, acoustically refined environment equipped with discreet power access, making it the premier address for confidential business discussions and investor dinners.",
      cta: "MAKE AN INQUIRY",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop"
    }
  ],

  // Section 11: Food & Atmosphere Gallery
  galleryCategories: ["All", "Signature Dishes", "Restaurant Interior", "Architecture", "Kitchen"],
  galleryImages: [
    {
      id: "g-1",
      title: "The Grand Chandelier Dining Hall",
      category: "Restaurant Interior",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      aspect: "wide"
    },
    {
      id: "g-2",
      title: "Prime Dry-Aged Ribeye &amp; Charcoal Embers",
      category: "Signature Dishes",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1000&auto=format&fit=crop",
      aspect: "tall"
    },
    {
      id: "g-3",
      title: "Art Deco Exterior Promenade",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
      aspect: "square"
    },
    {
      id: "g-4",
      title: "Sous-Vide &amp; Precision Culinary Station",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop",
      aspect: "wide"
    },
    {
      id: "g-5",
      title: "Golden Seafood Bisque &amp; Tiger Prawns",
      category: "Signature Dishes",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop",
      aspect: "tall"
    },
    {
      id: "g-6",
      title: "Emerald Banquettes &amp; Brass Details",
      category: "Restaurant Interior",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop",
      aspect: "square"
    },
    {
      id: "g-7",
      title: "Decadent Gold Flake Chocolate Dome",
      category: "Signature Dishes",
      image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=1000&auto=format&fit=crop",
      aspect: "square"
    },
    {
      id: "g-8",
      title: "The Concierge &amp; Guatemala Marble Bar",
      category: "Restaurant Interior",
      image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1000&auto=format&fit=crop",
      aspect: "wide"
    }
  ],

  // Section 12: Customer Testimonials
  testimonials: [
    {
      id: "t-1",
      quote: "An extraordinary dining revelation in Dhaka. From the moment you walk past the brass portal into the emerald salon, you feel transported to the golden age of hospitality. The Signature Beef Steak is peerless.",
      author: "Farhan &amp; Nadia Rahman",
      title: "Private Dinner Guests",
      rating: 5,
      date: "October 2026"
    },
    {
      id: "t-2",
      quote: "We hosted our 10th anniversary in The Salon Privé. The attention to detail, personalized menu cards, and flawless tableside service made it one of the most unforgettable evenings of our lives.",
      author: "Barrister S. Chowdhury",
      title: "Celebration Host",
      rating: 5,
      date: "November 2026"
    },
    {
      id: "t-3",
      quote: "The virtual tour on their website was what made me reserve, and the real physical restaurant was even more breathtaking. Outstanding architectural atmosphere and exquisite seafood.",
      author: "Elena Rostova",
      title: "International Guest",
      rating: 5,
      date: "September 2026"
    }
  ],

  // Section 13: Reservation System Defaults
  reservationSettings: {
    minNoticeHours: 2,
    maxGuestsPerOnlineBooking: 16,
    timeSlots: [
      "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
      "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
      "09:00 PM", "09:30 PM", "10:00 PM"
    ],
    occasions: [
      "Casual Fine Dining",
      "Romantic Dinner / Anniversary",
      "Birthday Celebration",
      "Business Meeting / Corporate",
      "Family Gathering",
      "Special Occasion"
    ]
  }
};
