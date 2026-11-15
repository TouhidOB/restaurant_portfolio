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
      tag: "Chef Special",
      dietary: "High Protein",
      description: "Charcoal-kissed boneless chicken breast infused with smoked rosemary, served with sautéed greens and garlic velouté.",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=900&auto=format&fit=crop",
      rating: 4.9,
      prepTime: "20 mins",
      calories: "520 kcal",
      available: true
    },
    {
      id: "m-2",
      name: "Truffle Burrata & Heirloom Salad",
      price: 720,
      category: "Starters",
      tag: "Artisan Pick",
      dietary: "Vegetarian",
      description: "Artisanal Italian burrata, heirloom tomatoes, fresh micro-basil, white truffle oil, and aged balsamic glaze.",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?q=80&w=900&auto=format&fit=crop",
      rating: 5.0,
      prepTime: "12 mins",
      calories: "380 kcal",
      available: true
    },
    {
      id: "m-3",
      name: "Crispy Calamari Fritti",
      price: 680,
      category: "Starters",
      tag: "Crispy Catch",
      dietary: "Seafood",
      description: "Golden fried tender squid rings tossed in smoked paprika salt, served with yuzu-garlic aioli and grilled lime.",
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=900&auto=format&fit=crop",
      rating: 4.8,
      prepTime: "15 mins",
      calories: "440 kcal",
      available: true
    },
    {
      id: "m-4",
      name: "Forest Mushroom Cappuccino Soup",
      price: 420,
      category: "Starters",
      tag: "Winter Classic",
      dietary: "Vegetarian",
      description: "Velvety purée of wild morel and portobello mushrooms topped with parmesan foam and crisp thyme croutons.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=900&auto=format&fit=crop",
      rating: 4.9,
      prepTime: "10 mins",
      calories: "290 kcal",
      available: true
    },
    {
      id: "m-5",
      name: "Braised Australian Lamb Shank",
      price: 1580,
      category: "Main Course",
      tag: "Signature",
      dietary: "Signature",
      description: "Slow-braised for six hours in rich rosemary and reduction sauce, served over creamy saffron polenta.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop",
      rating: 5.0,
      prepTime: "25 mins",
      calories: "780 kcal",
      available: true
    },
    {
      id: "m-6",
      name: "Pan-Seared Duck Breast",
      price: 1390,
      category: "Main Course",
      tag: "Chef Signature",
      dietary: "Chef Special",
      description: "Crispy skin duck breast glazed with spiced orange honey, roasted root vegetables, and cherry port wine reduction.",
      image: "https://images.unsplash.com/photo-1514944298352-f584e0c45aa6?q=80&w=900&auto=format&fit=crop",
      rating: 4.9,
      prepTime: "22 mins",
      calories: "640 kcal",
      available: true
    },
    {
      id: "m-7",
      name: "Artisan BBQ Beef Ribs",
      price: 1480,
      category: "Grills",
      tag: "Hearth Smoked",
      dietary: "Meat Lover",
      description: "Glazed in house bourbon-molasses barbecue sauce, smoked over hickory wood for 12 hours, paired with charred corn slaw.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=900&auto=format&fit=crop",
      rating: 4.9,
      prepTime: "20 mins",
      calories: "820 kcal",
      available: true
    },
    {
      id: "m-8",
      name: "Atlantic Seabass Fillet",
      price: 1320,
      category: "Main Course",
      tag: "Ocean Fresh",
      dietary: "Seafood",
      description: "Crispy-skin pan-roasted sea bass resting on asparagus puree, wilted spinach, and Champagne beurre blanc.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=900&auto=format&fit=crop",
      rating: 4.8,
      prepTime: "18 mins",
      calories: "460 kcal",
      available: true
    },
    {
      id: "m-9",
      name: "Aurelia Royal Dum Biryani",
      price: 980,
      category: "Main Course",
      tag: "Heritage Recipe",
      dietary: "Halal",
      description: "Aged basmati rice sealed in earthenware pot with tender mutton, saffron strands, rose water, and brown onion essence.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop",
      rating: 5.0,
      prepTime: "20 mins",
      calories: "710 kcal",
      available: true
    },
    {
      id: "m-10",
      name: "Saffron Wild Prawn Pilaf",
      price: 890,
      category: "Main Course",
      tag: "Bestseller",
      dietary: "Seafood",
      description: "Fragrant Persian saffron rice tossed with butter-poached wild prawns, golden almonds, and barberry compote.",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=900&auto=format&fit=crop",
      rating: 4.9,
      prepTime: "16 mins",
      calories: "590 kcal",
      available: true
    },
    {
      id: "m-11",
      name: "Handmade Truffle Tagliatelle",
      price: 950,
      category: "Main Course",
      tag: "House Made",
      dietary: "Vegetarian",
      description: "Fresh egg pasta ribbons tossed in creamy butter-parmigiano emulsion and showered with shaved black truffles.",
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281729?q=80&w=900&auto=format&fit=crop",
      rating: 4.9,
      prepTime: "14 mins",
      calories: "580 kcal",
      available: true
    },
    {
      id: "m-12",
      name: "Spicy Lobster Linguine",
      price: 1250,
      category: "Main Course",
      tag: "Indulgence",
      dietary: "Seafood",
      description: "Succulent sweet lobster tail chunks, confit cherry tomatoes, fresh chili, white wine, and garlic olive oil.",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=900&auto=format&fit=crop",
      rating: 5.0,
      prepTime: "18 mins",
      calories: "610 kcal",
      available: true
    },
    {
      id: "m-13",
      name: "Classic Crème Brûlée",
      price: 480,
      category: "Desserts",
      tag: "Dessert Master",
      dietary: "Vegetarian",
      description: "Madagascar vanilla bean custard under a fragile torched caramelized sugar crust, served with fresh raspberries.",
      image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=900&auto=format&fit=crop",
      rating: 4.9,
      prepTime: "8 mins",
      calories: "340 kcal",
      available: true
    },
    {
      id: "m-14",
      name: "Emerald Pistachio Paris-Brest",
      price: 520,
      category: "Desserts",
      tag: "French Patisserie",
      dietary: "Vegetarian",
      description: "Crisp choux ring filled with praline mousseline and Sicilian pistachio cream, dusted with powdered gold sugar.",
      image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=900&auto=format&fit=crop",
      rating: 5.0,
      prepTime: "8 mins",
      calories: "410 kcal",
      available: true
    },
    {
      id: "m-15",
      name: "Smoked Rosemary Old Fashioned (Mocktail)",
      price: 380,
      category: "Beverages",
      tag: "Artisan Bar",
      dietary: "Non-Alcoholic",
      description: "Zero-proof charred oak infusion with orange bitters, cane syrup, and aromatic ignited rosemary smoke.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=900&auto=format&fit=crop",
      rating: 4.8,
      prepTime: "5 mins",
      calories: "110 kcal",
      available: true
    },
    {
      id: "m-16",
      name: "Golden Champagne Sparkler (Non-Alcoholic)",
      price: 420,
      category: "Beverages",
      tag: "Celebration",
      dietary: "Non-Alcoholic",
      description: "French effervescent grape nectar infused with elderflower cordial, edible 24k gold leaf flakes, and fresh mint.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=900&auto=format&fit=crop",
      rating: 5.0,
      prepTime: "5 mins",
      calories: "95 kcal",
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
  },

  // Section 14 & 15: Blog & Editorial Journal
  blog_categories: [
    { id: 1, name: "Culinary Mastery", slug: "culinary-mastery", description: "The philosophy of haute cuisine, dry aging, and artisanal charcoal preparation." },
    { id: 2, name: "Art Deco Heritage", slug: "art-deco-heritage", description: "The architectural splendor, geometric motifs, and romance of 1920s grand salons." },
    { id: 3, name: "Cellar & Champagne", slug: "cellar-champagne", description: "Rare vintages, terroir chronicles, and curated sparkling pairings." },
    { id: 4, name: "The Grand Chronicles", slug: "grand-chronicles", description: "Behind-the-scenes dispatches, evening gala logs, and guest reflections." }
  ],

  blog_posts: [
    {
      id: 1,
      title: "The Philosophy of Binchotan Embers: Perfecting the Royal Cut",
      slug: "philosophy-of-binchotan-embers",
      category_name: "Culinary Mastery",
      category_slug: "culinary-mastery",
      author_name: "Chef Julian Vance",
      author_role: "Executive Grill Master",
      resolved_cover: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Why white oak binchotan charcoal creates the purest radiant heat, sealing natural juices inside prime tenderloins without bitter smoke.",
      content: "<h3>Thermodynamic Purity</h3><p>At Aurelia, our charcoal grill stations utilize certified Kishu binchotan white oak embers. Burning at upwards of 1,000°C without flare-ups, this ancient fuel produces intense infrared rays that caramelize proteins swiftly while locking in natural gelatin and marrow richness.</p><blockquote>\"True gastronomy is about subtracting the unnecessary until only pure flavor remains.\" — Chef Julian Vance</blockquote><h3>Artisanal Butchery</h3><p>Each cut is dry-aged for 45 days in our temperature-controlled Himalayan salt brick locker before receiving its kiss of fire.</p>",
      read_time_minutes: 5,
      is_featured: true,
      is_published: true,
      published_at: "2026-11-14T18:00:00Z"
    },
    {
      id: 2,
      title: "Gilded Arches & Emerald Velvet: The Architecture of Aurelia",
      slug: "gilded-arches-emerald-velvet",
      category_name: "Art Deco Heritage",
      category_slug: "art-deco-heritage",
      author_name: "Madeleine Laurent",
      author_role: "Design Curator & Historian",
      resolved_cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Stepping inside Aurelia is a journey into the golden age of European grand salons, geometric symmetry, and intimate atmospheric lighting.",
      content: "<h3>The 1920s Renaissance</h3><p>Inspired by the iconic Parisian expositions of 1925, our dining hall incorporates fluted marble pilasters, custom hand-blown brass chandeliers, and deeply tufted emerald velvet banquettes designed for conversational intimacy.</p><p>Every acoustic boundary is engineered with custom drapery, allowing candlelit conversation to flow effortlessly against soft ambient jazz.</p>",
      read_time_minutes: 6,
      is_featured: false,
      is_published: true,
      published_at: "2026-11-12T14:30:00Z"
    },
    {
      id: 3,
      title: "Curating the Champagne Vault: The Alchemy of Grand Crus",
      slug: "curating-the-champagne-vault",
      category_name: "Cellar & Champagne",
      category_slug: "cellar-champagne",
      author_name: "Antoine Reynaud",
      author_role: "Head Sommelier",
      resolved_cover: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
      excerpt: "How small grower-producers in Montagne de Reims and Côte des Blancs craft the world’s most expressive sparkling wines.",
      content: "<h3>Beyond Commercial Houses</h3><p>While celebrated marques grace our cellar, our greatest pride lies in single-vineyard grower champagnes. Chalky subsoils, zero dosage cuvées, and decade-long lees aging create a minerality that elevates fresh seafood and delicate caviar.</p>",
      read_time_minutes: 4,
      is_featured: false,
      is_published: true,
      published_at: "2026-11-10T12:00:00Z"
    },
    {
      id: 4,
      title: "Midnight in Gulshan: Tales from the Parlour Service",
      slug: "midnight-in-gulshan",
      category_name: "The Grand Chronicles",
      category_slug: "grand-chronicles",
      author_name: "Sarah Al-Mansoor",
      author_role: "Maitre D’ & Guest Concierge",
      resolved_cover: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop",
      excerpt: "When the evening dinner rush softens into ambient midnight service, the Champagne Parlour reveals its most enchanting charm.",
      content: "<h3>The Late Evening Rhythm</h3><p>There is a special cadence to post-dinner celebrations at Aurelia. Delicate crystal coupes clinking, bespoke botanical digestifs prepared tableside, and warm saffron brioche served straight from the oven create memories that linger long after the candles flicker down.</p>",
      read_time_minutes: 5,
      is_featured: false,
      is_published: true,
      published_at: "2026-11-08T02:00:00Z"
    }
  ]
};
