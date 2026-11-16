export const fallbackData = {
  config: {
    site_name: "POP! FOOD STUDIO",
    tagline: "EAT OUTSIDE THE LINES",
    hero_headline: "GOOD FOOD. BIG PERSONALITY.",
    hero_subheadline: "A vibrant dining playground where oversized pop-art aesthetics meet culinary craftsmanship. Bold flavors, neon nights, and unapologetic plates.",
    brand_story_title: "WE MAKE FOOD A LITTLE MORE INTERESTING.",
    brand_story_body: "Founded at the intersection of modern graphic art and street gastronomy, POP! Food Studio was created to shatter the beige boredom of conventional dining. We believe food should be electric, joyful, and visually shocking — without ever compromising on serious culinary technique.\n\nEvery sauce is made from scratch, every bun is baked daily in our laboratory kitchen, and every plate is composed like a frame from an iconic comic strip.",
    phone: "+1 (555) 767-3663",
    email: "hello@popfoodstudio.com",
    address: "742 Evergreen Pop Boulevard, Arts District, Studio City, CA 90210",
    opening_hours: {
      "Monday - Thursday": "11:30 AM – 10:30 PM",
      "Friday": "11:30 AM – 12:00 Midnight",
      "Saturday": "10:30 AM – 12:00 Midnight",
      "Sunday": "10:30 AM – 10:00 PM"
    },
    instagram_url: "https://instagram.com/popfoodstudio",
    facebook_url: "https://facebook.com/popfoodstudio",
    tiktok_url: "https://tiktok.com/@popfoodstudio",
    stats: {
      daily_craft_buns: "1,200+",
      signature_sauces: "18",
      neon_fixtures: "45",
      happy_foodies: "50,000+"
    }
  },

  categories: [
    { id: 1, name: "Burgers & Buns", slug: "burgers-buns", display_order: 1 },
    { id: 2, name: "Street Eats & Crispy Bites", slug: "street-eats", display_order: 2 },
    { id: 3, name: "Pop Bowls & Greens", slug: "pop-bowls", display_order: 3 },
    { id: 4, name: "Sweet Endings & Over-The-Top Shakes", slug: "sweets-shakes", display_order: 4 },
    { id: 5, name: "Fizz & Studio Cocktails", slug: "drinks", display_order: 5 }
  ],

  menu_items: [
    {
      id: 1,
      name: "The Atomic Smash Burger",
      category: "Burgers & Buns",
      price: 18.50,
      description: "Double 45-day dry-aged smash patties, melted vintage cheddar, charred scallion pop-mayo, bread & butter pickles on a glossy toasted brioche bun stamped with our iconic comic boom icon.",
      dietary_tags: ["Chef Special", "Signature"],
      is_featured: true,
      image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      spice_level: 2,
      prep_time: "12 mins",
      pairing: "Electric Cherry Cola or Electric Fizz"
    },
    {
      id: 2,
      name: "Neon Truffle Melt",
      category: "Burgers & Buns",
      price: 21.00,
      description: "Truffled wild mushroom blend, smoked gouda fondue, crispy shallots, rocket leaves, and black garlic glaze on toasted artisanal sourdough.",
      dietary_tags: ["Vegetarian"],
      is_featured: true,
      image_url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
      spice_level: 0,
      prep_time: "14 mins",
      pairing: "Smoked Honey Bourbon Shake"
    },
    {
      id: 3,
      name: "Pop-Art Nashville Hot Chicken",
      category: "Burgers & Buns",
      price: 19.50,
      description: "Buttermilk double-dredged crisp chicken thigh dipped in ghost-pepper hot honey oil, vinegar slaw, sweet pickles, and comeback sauce on a sesame milk bun.",
      dietary_tags: ["Spicy", "Popular"],
      is_featured: false,
      image_url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
      spice_level: 3,
      prep_time: "15 mins",
      pairing: "Crispy Citrus Seltzer"
    },
    {
      id: 4,
      name: "Comic Strip Loaded Tater Tots",
      category: "Street Eats & Crispy Bites",
      price: 14.00,
      description: "Extra-crispy golden tots buried under house beer queso, crispy bacon lardons, pickled jalapeños, scallions, and a swirl of tangy Sriracha crema.",
      dietary_tags: ["Crowd Favorite", "Gluten-Free Friendly"],
      is_featured: true,
      image_url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
      spice_level: 1,
      prep_time: "8 mins",
      pairing: "Cold Pop Craft Lager"
    },
    {
      id: 5,
      name: "Dynamite Crispy Cauliflower",
      category: "Street Eats & Crispy Bites",
      price: 13.50,
      description: "Tempura florets tossed in sweet gochujang chili glaze, toasted sesame seeds, lime zest, and micro cilantro with vegan garlic aioli.",
      dietary_tags: ["Vegan", "Gluten-Free"],
      is_featured: false,
      image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
      spice_level: 2,
      prep_time: "10 mins",
      pairing: "Yuzu Paloma Pop"
    },
    {
      id: 6,
      name: "Electric Rainbow Noodle Bowl",
      category: "Pop Bowls & Greens",
      price: 17.50,
      description: "Chilled soba noodles, butterfly-pea flower purple cabbage, julienne carrots, edamame, avocado fan, and sesame ginger dressing with crispy lotus chips.",
      dietary_tags: ["Vegan", "Nutritious"],
      is_featured: true,
      image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      spice_level: 1,
      prep_time: "10 mins",
      pairing: "Matcha Lime Fizz"
    },
    {
      id: 7,
      name: "Spicy Ahi Poke Pop Bowl",
      category: "Pop Bowls & Greens",
      price: 22.00,
      description: "Sashimi-grade yellowfin tuna, furikake sushi rice, mango cubes, pickled cucumber, wakame salad, wasabi tobiko, and spicy sriracha ponzu drizzle.",
      dietary_tags: ["Pescatarian", "High Protein"],
      is_featured: false,
      image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      spice_level: 2,
      prep_time: "10 mins",
      pairing: "Sparkling Sake Tonic"
    },
    {
      id: 8,
      name: "The Giant Polka-Dot Donut Stack",
      category: "Sweet Endings & Over-The-Top Shakes",
      price: 15.00,
      description: "Three warm house-glazed brioche donuts layered with strawberry mascarpone cream, popping candy crunch, and bright pink ruby chocolate ganache.",
      dietary_tags: ["Sweet", "Instagram Star"],
      is_featured: true,
      image_url: "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=800&q=80",
      spice_level: 0,
      prep_time: "8 mins",
      pairing: "Nitro Cold Brew"
    },
    {
      id: 9,
      name: "Cosmic Birthday Cake Milkshake",
      category: "Sweet Endings & Over-The-Top Shakes",
      price: 14.50,
      description: "Vanilla bean custard shake blended with funfetti cake batter, rimmed with rainbow sprinkles, crowned with a mini vanilla frosted cupcake and cotton candy cloud.",
      dietary_tags: ["Over the Top"],
      is_featured: true,
      image_url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      spice_level: 0,
      prep_time: "6 mins",
      pairing: "Sweet tooth indulgence"
    },
    {
      id: 10,
      name: "Neon Blue Bubblegum Fizz",
      category: "Fizz & Studio Cocktails",
      price: 13.00,
      description: "Artisanal bubblegum syrup, clarified lemon juice, blue curacao float, edible disco glitter, and popping boba pearls topped with botanical soda.",
      dietary_tags: ["Signature Mocktail", "Glitter Effect"],
      is_featured: false,
      image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      spice_level: 0,
      prep_time: "4 mins",
      pairing: "The Atomic Smash Burger"
    },
    {
      id: 11,
      name: "Smoked Pop Paloma Cocktail",
      category: "Fizz & Studio Cocktails",
      price: 16.00,
      description: "Blanco tequila, mezcal mist, fresh pink grapefruit reduction, lime oleo-saccharum, agave, and sea salt chili rim served with an aromatic smoke bubble that pops at the table.",
      dietary_tags: ["21+ Cocktail", "Theatrical"],
      is_featured: true,
      image_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      spice_level: 1,
      prep_time: "5 mins",
      pairing: "Comic Strip Loaded Tater Tots"
    }
  ],

  viewpoints: [
    {
      id: 1,
      name: "The Neon Entry & Merch Wall",
      slug: "neon-entry",
      camera_x: 0.0,
      camera_y: 2.5,
      camera_z: 7.5,
      target_x: 0.0,
      target_y: 1.2,
      target_z: 0.0,
      description: "The street-level portal. A pulsating yellow-and-red neon archway greets guests, flanked by limited-edition comic art prints, studio collectibles, and vinyl figurines.",
      hotspots: [
        { title: "Neon Marquee Arch", description: "Handcrafted 12-foot glowing pop typography sign", x: 0, y: 3.2, z: 1.5 },
        { title: "Pop Art Gallery Wall", description: "Rotating monthly comic installations by local artists", x: -2.8, y: 1.8, z: 3.0 }
      ],
      image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      name: "The Main Dining Floor & Comic Booths",
      slug: "dining-floor",
      camera_x: 5.5,
      camera_y: 3.0,
      camera_z: 4.5,
      target_x: 0.0,
      target_y: 1.0,
      target_z: 0.0,
      description: "Custom crimson vinyl circular booths with oversized half-tone pop murals, retro checkerboard flooring, and suspended cartoon speech-bubble acoustic baffles.",
      hotspots: [
        { title: "Comic Booth #4", description: "Our most requested 6-person booth with dedicated polaroid camera", x: 2.5, y: 1.2, z: 0.8 },
        { title: "Halftone Skylight", description: "Sunlight diffused through Roy Lichtenstein dot patterns", x: 0.0, y: 4.5, z: 0.0 }
      ],
      image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      name: "The Open Kitchen & Pass Counter",
      slug: "kitchen-pass",
      camera_x: -4.5,
      camera_y: 2.2,
      camera_z: 2.0,
      target_x: -1.0,
      target_y: 1.2,
      target_z: -3.0,
      description: "Direct view into the open culinary laboratory where smash burgers sizzle on mirror-finish chrome griddles and chefs plate beneath warm heat lamps.",
      hotspots: [
        { title: "The Chrome Smash Station", description: "Custom 650°F flat-top griddle for maximum patty lacing", x: -2.5, y: 1.1, z: -2.5 },
        { title: "The Sauce Chemistry Bar", description: "18 artisanal condiments dispensed in squeeze-gun syringes", x: -1.0, y: 1.4, z: -3.2 }
      ],
      image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      name: "The Cocktail Lab & Fizz Bar",
      slug: "fizz-bar",
      camera_x: 3.8,
      camera_y: 2.0,
      camera_z: -3.5,
      target_x: 0.5,
      target_y: 1.5,
      target_z: -1.0,
      description: "An electric blue quartz bar counter with illuminated bottle racks, liquid nitrogen smoking stations, and custom craft soda taps.",
      hotspots: [
        { title: "Smoke Bubble Generator", description: "Citrus vapor bubbles blown directly onto cocktail glasses", x: 2.0, y: 1.4, z: -2.0 },
        { title: "The Soda Fountain Font", description: "8 house-brewed botanical syrups on draft", x: 1.2, y: 1.6, z: -1.8 }
      ],
      image_url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      name: "The VIP Pop Studio Lounge",
      slug: "vip-studio",
      camera_x: 0.0,
      camera_y: 3.2,
      camera_z: -6.0,
      target_x: 0.0,
      target_y: 1.0,
      target_z: -1.0,
      description: "An intimate private dining salon wrapped in floor-to-ceiling pop art murals, velvet seating, private music controls, and dedicated culinary service.",
      hotspots: [
        { title: "Private Pop Chef Table", description: "Interactive 7-course tasting menu hosted by Head Chef", x: 0.0, y: 1.2, z: -2.0 },
        { title: "Vinyl Jukebox", description: "Curated vintage funk, soul, and pop records for guests", x: -2.0, y: 1.5, z: -4.0 }
      ],
      image_url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
    }
  ],

  experiences: [
    {
      id: 1,
      title: "Chef's 5-Course Pop Art Tasting Flight",
      tagline: "A Gastronomic Cartoon In 5 Acts",
      description: "Sit at our kitchen pass for an uninhibited culinary journey featuring off-menu smash experiments, liquid nitrogen palate cleansers, and custom cocktail pairings.",
      price: "$85 per guest",
      timing: "Thursday & Friday at 7:30 PM",
      features: ["Welcome Smoke Bubble Cocktail", "Exclusive Off-Menu Dishes", "Meet & Greet with Chef Jax", "Commemorative Comic Print"]
    },
    {
      id: 2,
      title: "The VIP Studio Lounge Takeover",
      tagline: "Private Parties With Maximum Volume",
      description: "Host up to 24 guests in our vibrant private gallery lounge. Includes personalized family-style platters, dedicated bartender, and private vinyl sound system.",
      price: "$1,200 food & beverage minimum",
      timing: "Available Daily with Advance Booking",
      features: ["Full Private Salon Access", "Custom Menu Printing", "Dedicated Service Team", "Custom Polaroid Photo Booth"]
    },
    {
      id: 3,
      title: "Saturday Cartoon & Shake Brunch",
      tagline: "Weekend Fuel For Creative Minds",
      description: "Bright upbeat brunch featuring red velvet pancake stacks, loaded tots, bottomless mimosa floats, and live DJ spinning retro pop hits.",
      price: "$45 per person (includes shake)",
      timing: "Saturdays & Sundays 10:30 AM – 3:00 PM",
      features: ["Bottomless Specialty Spritzes", "Over-the-Top Shake Station", "Live Retro DJ Vinyl Set", "Kid & Dog Friendly Patio"]
    }
  ],

  team: [
    {
      id: 1,
      name: "Chef Jax 'Boom' Sterling",
      role: "Executive Culinary Director & Co-Founder",
      bio: "Trained in Michelin-starred Parisian bistros before fleeing fine-dining formality to open the world's first pop-art culinary studio. Famous for obsessive crust formulation.",
      favorite_dish: "The Atomic Smash Burger",
      image_url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Mila Vance",
      role: "Creative Director & Experience Architect",
      bio: "Visual artist and interior designer behind POP!'s explosive comic murals, custom tableware, and neon kinetic installations.",
      favorite_dish: "Cosmic Birthday Cake Milkshake",
      image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Leo 'Fizz' Thorne",
      role: "Master Beverage Alchemist",
      bio: "Liquid scientist combining molecular gastronomy techniques with nostalgic soda fountain lore to engineer theatrical cocktails that fizz, smoke, and glow.",
      favorite_dish: "Smoked Pop Paloma Cocktail",
      image_url: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80"
    }
  ],

  testimonials: [
    {
      id: 1,
      author: "Samantha Ray",
      publication: "Food & Wine Chronicles",
      quote: "POP! Food Studio is the most joyous, visually uninhibited dining experience of the decade. The smash burger has a crust so crispy it belongs in a museum.",
      rating: 5,
      city: "Los Angeles, CA"
    },
    {
      id: 2,
      author: "Marcus Chen",
      publication: "Culinary Underground",
      quote: "Do not let the playful comic exterior fool you: the culinary execution here is world-class. The truffle melt and rainbow noodle bowl are masterclasses in flavor balance.",
      rating: 5,
      city: "San Francisco, CA"
    },
    {
      id: 3,
      author: "Elena Rostova",
      publication: "Design & Dine Digest",
      quote: "From the 3D interactive studio tour to the smoky paloma that pops at your table, POP! proves high art and street food belong in the very same sentence.",
      rating: 5,
      city: "New York, NY"
    },
    {
      id: 4,
      author: "David & Tyler",
      publication: "Studio Regulars",
      quote: "Our weekend ritual. Incredible energy, the soundtrack is always unbeatable, and the loaded tots are honestly addictive. A total triumph!",
      rating: 5,
      city: "Studio City, CA"
    }
  ],

  gallery: [
    { id: 1, title: "The Atomic Smash Crust", category: "Food", image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Giant Donut Stack In Action", category: "Desserts", image_url: "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "The Neon Dining Room", category: "Atmosphere", image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Smoked Paloma Pop Moment", category: "Drinks", image_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Cosmic Birthday Milkshake", category: "Desserts", image_url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "The Culinary Lab Pass", category: "Kitchen", image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Comic Strip Loaded Tots", category: "Food", image_url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "VIP Pop Studio Lounge", category: "Atmosphere", image_url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" }
  ],

  philosophy: [
    {
      number: "01",
      title: "UNAPOLOGETIC FLAVOR",
      description: "We don't do delicate whispers of taste. Every recipe is dialed to 11 with punchy acid, deep umami, balanced heat, and textural crunch.",
      color: "#F04438"
    },
    {
      number: "02",
      title: "ARTISANAL DISCIPLINE",
      description: "Pop art without precision is just noise. We grind our own custom beef blends, bake brioche at dawn, and craft 18 sauces from scratch daily.",
      color: "#FFD928"
    },
    {
      number: "03",
      title: "IMMERSIVE OPTIMISM",
      description: "Dining should release dopamine. From graphic comic plates to interactive 3D spaces, every detail is engineered to make you smile.",
      color: "#2455D6"
    },
    {
      number: "04",
      title: "ZERO PRETENSE",
      description: "Fine-dining quality without the velvet ropes and hushed whispers. Come as you are, bring your crew, and eat outside the lines.",
      color: "#00C389"
    }
  ],

  custom_pages: [
    {
      id: 1,
      title: "Pop-Art VIP Neon Loft Party & Private Dining",
      slug: "pop-art-vip-neon-loft-party",
      meta_title: "VIP Neon Loft Private Experiences | POP! Food Studio",
      meta_description: "Host an unforgettable pop-art private dining celebration with customized comic menus and neon cocktail fountains.",
      is_published: true,
      layout_data: {
        blocks: [
          {
            type: "hero",
            headline: "THE PRIVATE NEON LOFT",
            subheadline: "An exclusive pop-art playground for up to 50 guests, complete with private bar, vinyl DJ booth, and bespoke tasting menus.",
            background_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
            cta_text: "Book The Neon Loft",
            cta_link: "#reservation"
          },
          {
            type: "split",
            headline: "IMMERSIVE CULINARY ENTERTAINMENT",
            content: "Step inside our highest floor studio overlooking the Arts District. Guests enjoy live plancha stations, custom cocktail towers with aromatic smoke bubbles, and a dedicated culinary brigade preparing personalized burger flights.",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
            image_position: "right"
          },
          {
            type: "features",
            headline: "WHAT'S INCLUDED IN THE VIP PACKAGE",
            items: [
              { title: "Custom Comic Menus", description: "Personalized pop-art illustration menus created by our resident graphic artists." },
              { title: "Liquid Nitrogen Dessert Show", description: "Theatrical frozen sweet treats and smoking donut stacks crafted tableside." },
              { title: "Private Mixology Station", description: "Unlimited handcrafted neon cocktails, botanical fizzes, and craft micro-brews." },
              { title: "Dedicated Studio Concierge", description: "Full-service host and service brigade attending to every detail of your event." }
            ]
          },
          {
            type: "cta",
            headline: "READY TO MAKE YOUR CELEBRATION UNFORGETTABLE?",
            subheadline: "Contact our VIP event team now to reserve your date and customize your menu.",
            button_text: "Inquire for Private Events",
            button_link: "#reservation"
          }
        ]
      }
    }
  ],

  blog_categories: [
    { id: 1, name: "Culinary Pop-Art Innovations", slug: "culinary-pop-art" },
    { id: 2, name: "Neon Fizz & Mixology Lab", slug: "neon-cocktails-lab" },
    { id: 3, name: "Modern Street Gastronomy", slug: "street-gastronomy" }
  ],

  blog_posts: [
    {
      id: 1,
      title: "The Pop-Art Food Philosophy: Why We Eat Outside the Lines",
      slug: "the-pop-art-food-philosophy-eating-outside-the-lines",
      category_name: "Culinary Pop-Art Innovations",
      category_slug: "culinary-pop-art",
      author_name: "Chef Roy Lichtenstein & Studio Team",
      read_time: "5 min read",
      published_at: "2026-11-16T12:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      display_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Dining should never be mundane. Explore how our graphic color palette, tactile food textures, and comic-book aesthetics turn every meal into a high-energy gallery event.",
      content: "In a world filled with muted beige dining rooms and whisper-quiet minimalist tables, POP! Food Studio was conceived with a radically joyful premise: food should be loud, electric, and impossible to ignore.\n\nInspired by the radical 1960s pop-art movement led by Andy Warhol, Roy Lichtenstein, and Keith Haring, our culinary studio treats each plate as a canvas of saturated primary pigments, high-contrast textures, and playful graphic forms.\n\nJust as pop-art stripped fine art of its academic pretension by elevating comic strips and everyday consumer icons, we elevate street classics with serious culinary discipline."
    },
    {
      id: 2,
      title: "Crafting The Atomic Smash Burger in Our Kitchen Lab",
      slug: "crafting-the-atomic-smash-burger-in-our-kitchen-lab",
      category_name: "Modern Street Gastronomy",
      category_slug: "street-gastronomy",
      author_name: "Head of Culinary Development",
      read_time: "4 min read",
      published_at: "2026-11-15T18:00:00Z",
      featured_image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      display_image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
      excerpt: "A deep dive into our 45-day dry-aged custom beef blend, high-heat chrome plancha caramelization, and our secret 18-ingredient comic-strip sauce.",
      content: "The burger is the undisputed pop icon of modern gastronomy. But creating an unforgettable smash burger requires rigorous thermodynamic precision and butcher craftsmanship.\n\nWe source heritage beef from family-owned pastures: 40% 45-Day Dry-Aged Chuck, 30% Rich Marbled Brisket, and 30% Short Rib for decadent collagen melt.\n\nOur heavy custom iron presses generate 40 pounds of downward force, locking the beef directly onto the mirror-finish plancha. This creates an ultra-lacy, crispy Maillard crust that traps every ounce of juices."
    }
  ]
};
