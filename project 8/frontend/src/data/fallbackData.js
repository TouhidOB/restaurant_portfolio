export const FALLBACK_DATA = {
  restaurant_name: "URBAN TABLE",
  theme: {
    colors: {
      graphite: "#252729",
      brick: "#914D37",
      concrete: "#B7B4AC",
      offwhite: "#F1EEE7",
      copper: "#B87345",
      black: "#111314",
      steel: "#737A7D",
      amber: "#E9A24B"
    },
    typography: {
      fontDisplay: "Oswald",
      fontBody: "Manrope",
      fontEditorial: "DM Serif Display"
    }
  },
  hero: {
    restaurant_name: "URBAN TABLE",
    eyebrow: "AN URBAN DINING EXPERIENCE",
    title: "BOLD FLAVORS. RAW CHARACTER.",
    tagline: "Urban Kitchen • Craft Smokehouse • Open Fire",
    badge_text: "Open Fire & Wood Hearth • 1924 Warehouse",
    lead_description: "A contemporary dining destination built around open flame, honest ingredients, and the raw energy of an industrial open kitchen.",
    cta_primary_text: "Explore The Menu",
    cta_secondary_text: "Discover Our Space",
    stats: [
      { number: "1924", label: "Converted Warehouse" },
      { number: "850°", label: "Wood-Fired Hearth" },
      { number: "45-Day", label: "Dry-Aged Steaks" },
      { number: "180", label: "Warehouse Seats" }
    ]
  },
  brandStory: {
    title: "Made With Fire & Craft",
    subtitle: "Our Story",
    badge: "Est. 2018 • Industrial District",
    body_paragraph_1: "Housed inside a preserved 1920s locomotive foundry, URBAN TABLE was born from a refusal of culinary pretension. We stripped away white tablecloths and velvet ropes to expose what matters: raw red brick, heavy black steel, roaring hickory coals, and intensely honest flavors.",
    body_paragraph_2: "Our culinary philosophy centers on primordial heat. Whether smoking prime brisket for fourteen hours over aged post oak or charring dry-aged ribeyes on our cast-iron open hearth, our kitchen celebrates the elemental alchemy of smoke, fire, and uncompromised produce.",
    quote: "Good food does not require disguise. It demands fierce heat, seasoned steel, and the patience to let smoke do its work.",
    quote_author: "Chef Marcus Vance",
    pillars: [
      {
        title: "Uncompromised Terroir",
        desc: "Pasture-raised regional beef, heritage Berkshire pork, and heirloom produce sourced directly from independent growers."
      },
      {
        title: "Elemental Fire Cooking",
        desc: "Custom-built 14-foot open wood hearth fueled by kiln-dried white oak, hickory logs, and lump charcoal."
      },
      {
        title: "Industrial Craft Hospitality",
        desc: "Vibrant communal energy, craft microbrews on tap, unpretentious service, and an unobstructed view of the kitchen brigade."
      }
    ],
    image_main: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
    image_detail: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
  },
  virtualTour: {
    title: "Restaurant Virtual Tour",
    subtitle: "Explore The Five Spaces",
    description: "Navigate our converted industrial warehouse in full 3D from the street-level entrance to the roaring open kitchen.",
    viewpoints: [
      {
        id: "exterior",
        number: "01",
        name: "Street-Level Warehouse Exterior",
        cameraPos: [0, 2.5, 9.5],
        target: [0, 2.0, 0],
        description: "Exposed red brick masonry, steel warehouse casement windows, illuminated copper marquee signage, and loading dock entry.",
        details: ["1920s Restored Brick Facade", "Black Steel Casement Windows", "Copper Neon Marquee"]
      },
      {
        id: "reception",
        number: "02",
        name: "Entrance & Host Station",
        cameraPos: [-2.2, 2.0, 5.5],
        target: [-0.5, 1.4, 0],
        description: "Raw concrete reception desk, reclaimed timber benches, and industrial filament pendant chandeliers.",
        details: ["Monolithic Poured Concrete Counter", "Reclaimed Factory Beams", "Industrial Filament Lighting"]
      },
      {
        id: "dining",
        number: "03",
        name: "Main Warehouse Dining Hall",
        cameraPos: [0, 2.2, 5.0],
        target: [0, 1.6, -1],
        description: "High-volume open floor plan with black steel I-beams, communal white oak tables, and leather booth banquettes.",
        details: ["24-Foot Vaulted Ceilings", "Heavy Steel Trusswork", "Aged Leather Banquettes"]
      },
      {
        id: "kitchen",
        number: "04",
        name: "Open Hearth & Smokehouse Kitchen",
        cameraPos: [2.5, 2.0, 4.5],
        target: [1.0, 1.5, -0.5],
        description: "Direct view of the 14-foot open wood fire pit, heavy iron rotisseries, and the bustling chef assembly line.",
        details: ["Custom Oak Wood Hearth", "Live Fire Iron Rotisserie", "Stainless Chef Line"]
      },
      {
        id: "bar",
        number: "05",
        name: "Copper Bar & High-Top Lounge",
        cameraPos: [-3.2, 2.0, 4.2],
        target: [-1.0, 1.5, 0],
        description: "Heavy hammered copper bar top, 20 craft microbrew tap handles, and backlit industrial spirit shelving.",
        details: ["Hand-Hammered Copper Bar", "20 Regional Draft Taps", "Craft Whiskey & Mezcal Vault"]
      }
    ]
  },
  experience: {
    title: "The Industrial Dining Experience",
    subtitle: "Raw Architecture Meets Contemporary Culinary Culture",
    pillars: [
      {
        step: "01",
        title: "The Craft",
        desc: "Every cut is butchered in-house, dry-aged in our glass curing chamber, and smoked low-and-slow over seasoned hardwoods."
      },
      {
        step: "02",
        title: "The Atmosphere",
        desc: "Soaring industrial heights, polished concrete floors, incandescent factory lighting, and an infectious playlist of blues and indie rock."
      },
      {
        step: "03",
        title: "The Hospitality",
        desc: "Energetic, knowledgeable, and genuinely welcoming. We treat every guest like an insider seated at the chef's personal table."
      }
    ]
  },
  signatureDishes: {
    title: "Signature Dishes Showcase",
    subtitle: "Raw Flavor • Open Flame",
    dishes: [
      {
        id: "brisket",
        name: "14-Hour Smoked Prime Texas Brisket",
        category: "Smokehouse Pit",
        description: "Black pepper and sea salt coarse bark, juicy mahogany smoke ring, smoked over post oak for fourteen hours. Served with charred jalapeno relish and house pickles.",
        price: "$38",
        dietary: "Gluten-Free",
        pairing: "Hazy Double IPA / Bourbon Old Fashioned",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
      },
      {
        id: "ribeye",
        name: "45-Day Dry-Aged Bone-In Cowboy Ribeye",
        category: "Wood Hearth",
        description: "28 oz prime bone-in cut seared over screaming white oak coals, basted with bone marrow herb butter and smoked Maldon flake salt.",
        price: "$78",
        dietary: "High Protein",
        pairing: "Cabernet Sauvignon / Rye Manhattan",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85"
      },
      {
        id: "pizza",
        name: "Wood-Fired Hot Honey & Nduja Artisan Pizza",
        category: "Brick Oven",
        description: "72-hour fermented sourdough crust blistered at 850°F, San Marzano sauce, fresh mozzarella, spicy Calabrian nduja, and wildflower hot honey drizzle.",
        price: "$26",
        dietary: "Artisan Craft",
        pairing: "Crisp Italian Pilsner",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85"
      },
      {
        id: "skillet",
        name: "Cast-Iron Skillet Bourbon Toffee Cookie",
        category: "Dessert Hearth",
        description: "Baked to order in hot cast iron, dark chocolate chunks, bourbon smoked sea salt, and a melting scoop of brown butter vanilla ice cream.",
        price: "$16",
        dietary: "Vegetarian",
        pairing: "Smoked Porter / Espresso",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85"
      }
    ]
  },
  menu: {
    title: "Full Menu Explorer",
    subtitle: "Crafted Daily In Our Open Kitchen",
    categories: [
      {
        id: "starters",
        name: "Starters & Small Plates",
        items: [
          {
            id: "bone-marrow",
            name: "Wood-Roasted Bone Marrow",
            price: "$22",
            desc: "Grilled country sourdough bread, shallot parsley salad, smoked salt, charred tomato jam.",
            description: "Grilled country sourdough bread, shallot parsley salad, smoked salt, charred tomato jam.",
            dietary: "Signature",
            pairing: "Aged Rye Old Fashioned / Dry Stout",
            category: "Starters & Small Plates",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "pork-burnt-ends",
            name: "Crispy Pork Belly Burnt Ends",
            price: "$19",
            desc: "Bourbon barbecue glaze, pickled mustard seeds, scallions, smoked Maldon salt.",
            description: "Bourbon barbecue glaze, pickled mustard seeds, scallions, smoked Maldon salt.",
            dietary: "Gluten-Free",
            pairing: "Smoked Amber Ale / Bourbon Neat",
            category: "Starters & Small Plates",
            image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "shishito-peppers",
            name: "Cast-Iron Blistered Shishito Peppers",
            price: "$15",
            desc: "Smoked sea salt, lime zest, roasted garlic aioli, charred lemon cheek.",
            description: "Smoked sea salt, lime zest, roasted garlic aioli, charred lemon cheek.",
            dietary: "Vegan Option",
            pairing: "Hazy Session IPA / Mezcal Paloma",
            category: "Starters & Small Plates",
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=85"
          }
        ]
      },
      {
        id: "burgers",
        name: "Burgers & Sandwiches",
        items: [
          {
            id: "smash-burger",
            name: "The Urban Foundry Smash Burger",
            price: "$21",
            desc: "Double dry-aged brisket blend patties, smoked cheddar, bacon jam, garlic pickles, toasted brioche bun.",
            description: "Double dry-aged brisket blend patties, smoked cheddar, bacon jam, garlic pickles, toasted brioche bun.",
            dietary: "Crowd Favorite",
            pairing: "West Coast IPA / Pilsner",
            category: "Burgers & Sandwiches",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "pulled-pork",
            name: "Smoked Pulled Pork Sandwich",
            price: "$19",
            desc: "Hickory smoked pork shoulder, tangy Carolina gold vinegar sauce, crispy cider slaw, potato bun.",
            description: "Hickory smoked pork shoulder, tangy Carolina gold vinegar sauce, crispy cider slaw, potato bun.",
            dietary: "Smokehouse",
            pairing: "Dry Apple Cider / Golden Ale",
            category: "Burgers & Sandwiches",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "hot-chicken",
            name: "Crispy Buttermilk Hot Chicken",
            price: "$20",
            desc: "Nashville spiced chicken breast, hot honey glaze, shredded lettuce, dill remoulade, toasted bun.",
            description: "Nashville spiced chicken breast, hot honey glaze, shredded lettuce, dill remoulade, toasted bun.",
            dietary: "Spicy",
            pairing: "Kellerbier / Crisp Lager",
            category: "Burgers & Sandwiches",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85"
          }
        ]
      },
      {
        id: "hearth",
        name: "Wood Hearth & Grills",
        items: [
          {
            id: "brisket-platter",
            name: "14-Hour Smoked Prime Texas Brisket",
            price: "$38",
            desc: "Half-pound sliced brisket, coarse pepper bark, house pickles, jalapeno cheddar cornbread, pit beans.",
            description: "Half-pound sliced brisket, coarse pepper bark, house pickles, jalapeno cheddar cornbread, pit beans.",
            dietary: "Gluten-Free",
            pairing: "Hazy Double IPA / Bourbon Old Fashioned",
            category: "Wood Hearth & Grills",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "ribeye-steak",
            name: "45-Day Dry-Aged Bone-In Cowboy Ribeye",
            price: "$78",
            desc: "28 oz prime bone-in cut seared over screaming white oak coals, basted with bone marrow herb butter and smoked Maldon flake salt.",
            description: "28 oz prime bone-in cut seared over screaming white oak coals, basted with bone marrow herb butter and smoked Maldon flake salt.",
            dietary: "High Protein",
            pairing: "Cabernet Sauvignon / Rye Manhattan",
            category: "Wood Hearth & Grills",
            image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "pork-ribs",
            name: "St. Louis Cut Smoked Pork Ribs",
            price: "$34",
            desc: "Full rack dry-rubbed and applewood smoked, chipotle mop sauce, charred scallions.",
            description: "Full rack dry-rubbed and applewood smoked, chipotle mop sauce, charred scallions.",
            dietary: "Gluten-Free",
            pairing: "Smoked Porter / Bourbon Sour",
            category: "Wood Hearth & Grills",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "amish-chicken",
            name: "Oak-Roasted Half Amish Chicken",
            price: "$29",
            desc: "Wild herb brine, charred lemon, roasted fingerling potatoes, natural poultry roasting jus.",
            description: "Wild herb brine, charred lemon, roasted fingerling potatoes, natural poultry roasting jus.",
            dietary: "Farm Fresh",
            pairing: "Oaked Chardonnay / Saison",
            category: "Wood Hearth & Grills",
            image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=85"
          }
        ]
      },
      {
        id: "sides",
        name: "Iron Skillet Sides",
        items: [
          {
            id: "truffle-mac",
            name: "Cast-Iron Truffle Mac & Cheese",
            price: "$14",
            desc: "Aged white cheddar, gruyere, smoked gouda, toasted herb panko crust.",
            description: "Aged white cheddar, gruyere, smoked gouda, toasted herb panko crust.",
            dietary: "Vegetarian",
            pairing: "Belgian Tripel / Brown Ale",
            category: "Iron Skillet Sides",
            image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "charred-broccolini",
            name: "Charred Broccolini With Chili Garlic",
            price: "$13",
            desc: "Wood-grilled tender broccolini, fresh lemon juice, toasted sesame oil, garlic crunch.",
            description: "Wood-grilled tender broccolini, fresh lemon juice, toasted sesame oil, garlic crunch.",
            dietary: "Vegan",
            pairing: "Sauvignon Blanc",
            category: "Iron Skillet Sides",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85"
          },
          {
            id: "duck-fat-fries",
            name: "Duck Fat Wedge Fries",
            price: "$12",
            desc: "Crispy triple-cooked potato wedges, rosemary salt, smoked paprika aioli.",
            description: "Crispy triple-cooked potato wedges, rosemary salt, smoked paprika aioli.",
            dietary: "House Cut",
            pairing: "Draft Pilsner",
            category: "Iron Skillet Sides",
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85"
          }
        ]
      },
      {
        id: "desserts",
        name: "Cast-Iron Sweets & Hearth Desserts",
        items: [
          {
            id: "skillet-cookie",
            name: "Cast-Iron Skillet Bourbon Toffee Cookie",
            price: "$16",
            desc: "Baked to order in hot cast iron, dark chocolate chunks, bourbon smoked sea salt, brown butter vanilla ice cream.",
            description: "Baked to order in hot cast iron, dark chocolate chunks, bourbon smoked sea salt, brown butter vanilla ice cream.",
            dietary: "Vegetarian",
            pairing: "Smoked Porter / Double Espresso",
            category: "Cast-Iron Sweets & Hearth Desserts",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85"
          }
        ]
      }
    ]
  },
  interior: {
    title: "Interior Architecture & Atmosphere",
    subtitle: "Converted 1920s Industrial Warehouse",
    details: [
      {
        title: "Exposed Red Brick & Concrete",
        desc: "Original century-old load-bearing brickwork, structural concrete lintels, and factory patina preserved intact."
      },
      {
        title: "Black Steel I-Beam Framing",
        desc: "Heavy structural industrial steel trusses, matte-black ducting, and factory-style multi-pane casement windows."
      },
      {
        title: "Copper Accents & Edison Filament Warmth",
        desc: "Custom hammered copper counters, brass rivets, and dimmable 2200K amber incandescent pendants."
      }
    ],
    quote: "We did not conceal the building's industrial bones; we turned the kitchen into its beating heart.",
    stats: [
      { value: "1924", label: "Original Construction" },
      { value: "6,500 sq ft", label: "Warehouse Footprint" },
      { value: "24 ft", label: "Ceiling Clearance" },
      { value: "180", label: "Seating Capacity" }
    ]
  },
  chef: {
    name: "Marcus Vance",
    title: "Executive Chef & Pitmaster",
    experience: "20+ Years Open-Fire Mastery • Culinary Institute Graduate",
    bio: "Raised on the smokehouse traditions of the American South and honed in metropolitan wood-fired kitchens from Brooklyn to Austin, Chef Marcus Vance brings an uncompromising reverence for honest meat, prime firewood, and deep culinary technique.",
    quote: "If you respect the wood, the animal, and the fire, the plate will speak for itself with overwhelming authority.",
    philosophy_tags: ["Open Fire Cooking", "In-House Whole Animal Butchery", "Oak & Hickory Wood", "Zero Shortcuts"],
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
  },
  experiences: {
    title: "Special Dining Experiences",
    subtitle: "From Warehouse Feasts To Private Tastings",
    cards: [
      {
        id: "loft",
        title: "The Foundry Private Loft",
        desc: "Elevated mezzanine dining room overlooking the entire warehouse floor. Dedicated service team and custom family-style feasts.",
        badge: "Private Dining",
        capacity: "15 to 40 Guests"
      },
      {
        id: "chef_counter",
        title: "The Pitmaster Fire Counter",
        desc: "An intimate 8-seat front-row counter directly facing the open wood hearth. Multi-course flame tasting menu led by Chef Marcus.",
        badge: "Front Row Fire",
        capacity: "Up to 8 Guests"
      },
      {
        id: "warehouse_takeover",
        title: "Full Warehouse Buyout",
        desc: "Complete private access to the main floor, bar lounge, outdoor covered patio, and live smokehouse stations.",
        badge: "Grand Event",
        capacity: "Up to 200 Guests"
      }
    ]
  },
  gallery: {
    title: "Food, People & Atmosphere Gallery",
    subtitle: "Raw Visual Moments",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85",
        caption: "The main warehouse hall under evening incandescent amber lighting",
        category: "Interior"
      },
      {
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
        caption: "14-Hour smoked prime brisket with coarse pepper bark",
        category: "Food"
      },
      {
        url: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85",
        caption: "Dry-aged bone-in cowboy ribeye seared on white oak coals",
        category: "Kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
        caption: "Wood-fired artisanal pizza fresh from the 850° oven",
        category: "Food"
      },
      {
        url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
        caption: "Craft beers on tap and bespoke smoked cocktails at the copper bar",
        category: "Bar"
      },
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
        caption: "Communal industrial tables and heavy steel warehouse framework",
        category: "Interior"
      }
    ]
  },
  testimonials: {
    title: "Guest Reviews & Social Proof",
    subtitle: "Honest Feedback From Our Community",
    items: [
      {
        source: "Eater Urban Guide",
        quote: "URBAN TABLE captures everything electric about modern dining: roaring open flames, uncompromising smoked meats, and an atmosphere that buzzes with raw city energy.",
        rating: "Editor's Top Pick 2026",
        author: "Dining Critic, Eater"
      },
      {
        source: "Food & Wine Magazine",
        quote: "Marcus Vance has turned a 1920s locomotive foundry into the city's premier temple of wood-fired craft. The brisket alone commands pilgrimage.",
        rating: "Best New Smokehouse",
        author: "Senior Food Editor"
      },
      {
        source: "Urban Gastronomy Journal",
        quote: "No pretense, no velvet ropes. Just blistering oak fires, incredible craft beer, and steaks that redefine flavor depth.",
        rating: "★★★★★ 5-Star Experience",
        author: "Community Reviewer"
      }
    ]
  },
  reservation: {
    title: "Table Reservation",
    subtitle: "Reserve An Industrial Dining Experience",
    description: "Due to high demand and prime smokehouse cuts, advance table reservations are strongly encouraged for parties of all sizes.",
    policy: "Walk-ins are welcomed at our 30-seat copper bar and outdoor patio on a first-come, first-served basis. Reservations held for 15 minutes.",
    experiences_list: [
      "Main Warehouse Dining Table",
      "Pitmaster Counter (Front Row Fire)",
      "The Foundry Private Loft (Parties 12+)",
      "Bar & High-Top Lounge"
    ],
    time_slots: ["12:00 PM", "1:30 PM", "5:00 PM", "6:30 PM", "7:30 PM", "8:30 PM", "9:45 PM"]
  },
  location: {
    title: "Location, Hours & Map",
    subtitle: "Heart of the Industrial Arts District",
    address: "420 Ironworks Avenue, Warehouse District",
    transit: "Foundry Station (Subway Lines B & D) • Free On-Site Parking Lot",
    phone: "+1 (555) 789-2044",
    email: "table@urbankitchen.com",
    hours: [
      { days: "Tuesday to Thursday", hours: "4:00 PM – 11:00 PM" },
      { days: "Friday & Saturday", hours: "12:00 PM – Midnight (Late Night Bar)" },
      { days: "Sunday", hours: "12:00 PM – 10:00 PM (Sunday Smoke Roast)" },
      { days: "Monday", hours: "Closed for Kitchen Cure & Prep" }
    ]
  },
  custom_pages: [
    {
      id: 1,
      slug: "industrial-warehouse-buyouts",
      title: "Industrial Warehouse Buyouts & Private Forge Events",
      meta_description: "Host monumental private dining experiences, corporate gatherings, and craft smokehouse feasts inside our converted 1924 locomotive foundry.",
      blocks: [
        {
          type: "hero",
          title: "Monumental Gatherings Under Historic Steel Trusses",
          subtitle: "Exclusive Warehouse Buyouts & Forge Feasts",
          bg_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
          cta_text: "Inquire About Full Warehouse Buyout",
          cta_link: "#contact"
        },
        {
          type: "split",
          title: "The Raw Energy of 1920s Industrial Architecture",
          lead: "Soaring 24-foot vaulted ceilings, century-old red brick masonry, and the roaring warmth of our 14-foot open wood hearth.",
          body: "Accommodating up to 200 guests with complete private access to the main dining hall, 30-seat hammered copper bar, covered outdoor patio, and front-row pitmaster stations.",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
          image_alt: "Urban Table Main Warehouse Space"
        },
        {
          type: "features",
          title: "Curated Event Capabilities",
          items: [
            { title: "Live Pitmaster Fire Stations", desc: "Whole-animal carving, 14-hour smoked briskets, and screaming cast-iron skillet sides served hot from the coals." },
            { title: "Craft Microbrew & Whiskey Tap Vault", desc: "20 rotating regional craft taps, small-batch bourbon pairings, and bespoke smoked cocktails." },
            { title: "Turnkey AV & Sound Integration", desc: "High-fidelity industrial sound system, wireless microphones, and dedicated event coordination staff." }
          ]
        },
        {
          type: "cta",
          title: "Plan Your Warehouse Event",
          subtitle: "Our private events team is ready to tailor a custom feast for your company or celebration.",
          button_text: "Contact Event Pitmaster",
          button_link: "/contact"
        }
      ]
    }
  ],
  blog_categories: [
    { id: 1, name: "Open-Fire Craft", slug: "open-fire-craft", description: "Deep dives into live fire cookery, hardwood selection, and hearth maintenance." },
    { id: 2, name: "Smokehouse Cuts", slug: "smokehouse-cuts", description: "In-depth butchery guides, dry-aging chronicles, and pitmaster trade secrets." },
    { id: 3, name: "Warehouse Chronicles", slug: "warehouse-chronicles", description: "The architecture, neighborhood history, and community culture of our 1924 foundry." }
  ],
  blog_posts: [
    {
      id: 1,
      slug: "anatomy-850-wood-hearth-oak-smoke",
      title: "Anatomy of an 850° Wood Hearth: The Science of Kiln-Dried Oak Smoke",
      category: { id: 1, name: "Open-Fire Craft", slug: "open-fire-craft" },
      cover_image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
      excerpt: "Why post oak, radiant embers, and air-flow geometry determine the boundary between burnt carbon and deep caramelization.",
      content: "At URBAN TABLE, our 14-foot open wood hearth is not merely a cooking apparatus; it is a living thermal ecosystem. Firing at 850°F requires meticulous split-log staging and an obsessive understanding of wood moisture content. We burn exclusively kiln-dried Texas post oak and white oak aged twelve months in open-air drying ricks. The result is a clean, thin blue smoke rich in sweet phenolic compounds that envelop prime cuts without the acrid bitterness of unseasoned firewood. In this chronicle, Chef Marcus Vance explains how our brigade controls hearth draft zones to sear 28 oz cowboy ribeyes to caramelized perfection in under nine minutes.",
      author_name: "Marcus Vance",
      read_time: "6 min read",
      views_count: 480,
      published_at: "2026-11-12T14:00:00Z"
    },
    {
      id: 2,
      slug: "dry-aging-45-days-bone-in-ribeye",
      title: "The 45-Day Cure: Transforming Bone-In Ribeyes in our Himalayan Salt Vault",
      category: { id: 2, name: "Smokehouse Cuts", slug: "smokehouse-cuts" },
      cover_image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85",
      excerpt: "Behind the heavy glass doors of our dry-aging room: moisture loss, enzymatic concentration, and the birth of unforgettable umami.",
      content: "Walking into the URBAN TABLE curing chamber reveals walls constructed of 400 hand-carved Himalayan pink salt bricks illuminated with warm tungsten light. At a strictly maintained 34°F and 82% relative humidity, whole beef subprimals rest on stainless wire racks for forty-five full days. During this curing cycle, natural proteolytic enzymes break down connective muscle fibers while ambient moisture evaporates by 18 percent. This concentration magnifies the beef flavor into deep notes of toasted hazelnut, blue cheese, and roasted porcini mushrooms. When finished on our cast-iron grates over screaming oak coals, the crust shatters delicately beneath the blade.",
      author_name: "Tyler Sterling",
      read_time: "5 min read",
      views_count: 365,
      published_at: "2026-11-08T11:30:00Z"
    }
  ]
};
