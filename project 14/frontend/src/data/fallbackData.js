export const fallbackData = {
  restaurant_name: "CHARRED & PRIME",
  content: {
    site: {
      name: "CHARRED & PRIME",
      tagline: "The Art of the Steakhouse",
      phone: "+1 (212) 840-7832",
      email: "concierge@charredandprime.com",
      address: "482 Lexington Avenue, Manhattan, NY 10017",
      hours: "Tuesday – Sunday: 5:00 PM – 11:30 PM (Grill till 11:00 PM)",
      currency: "$",
    },
    hero: {
      eyebrow: "A REFINED CONTEMPORARY STEAKHOUSE",
      title: "THE ART OF THE STEAKHOUSE.",
      description: "An intimate dining destination where exceptional prime beef, custom wood-fired embers, sculptural dark architecture, and refined hospitality converge.",
      primaryCta: "EXPLORE THE MENU",
      secondaryCta: "DISCOVER OUR SPACE",
      locationLabel: "MANHATTAN, NEW YORK"
    },
    brand_story: {
      eyebrow: "A TRADITION OF EXCEPTIONAL DINING",
      heading: "BEYOND THE ORDINARY DINING EXPERIENCE.",
      main_text: "Charred & Prime was conceived as an architectural sanctuary for carnivorous connoisseurs. Combining bespoke 45-day Himalayan salt dry-aging with custom white-oak Argentine parrillaworks, we celebrate the purity of heritage cattle and prime cuts in an environment of quiet, commanding luxury.",
      secondary_text: "Every element—from hand-chiseled basalt stone counters and smoked fluted glass partitions to custom hand-forged steak knives—has been meticulously curated to elevate steak dining into a multisensory ceremony.",
      quote: "In fine beef, perfection is not an accident of flame; it is the patient intersection of heritage breeding, bespoke dry-aging, and exact thermal mastery.",
      featured_image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
    },
    culinary_philosophy: {
      eyebrow: "UNCOMPROMISING PURSUIT OF QUALITY",
      heading: "CULINARY CRAFT & PROVENANCE",
      description: "True luxury requires radical transparency and devotion to technique. We work exclusively with family-owned ranches, artisanal fisheries, and heritage growers.",
      pillars: [
        {
          number: "01",
          title: "Heritage Sourcing",
          description: "100% USDA Prime Black Angus from single-source Nebraska pasturelands alongside certified A5 Miyazaki Wagyu directly imported from Japan.",
          image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
        },
        {
          number: "02",
          title: "Sub-Zero Salt Dry-Aging",
          description: "Our in-house Himalayan salt-brick vault ages primal loins for 35 to 65 days under precision microclimates, concentrating natural umami and achieving velvet tenderness.",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
        },
        {
          number: "03",
          title: "The Dual-Flame Hearth",
          description: "Seared over kiln-dried post oak and embers reaching 1,200°F on dual Argentine cast-iron wheels to achieve an immaculate caramel crust and buttery pink center.",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    open_fire_kitchen: {
      eyebrow: "THE SACRED FLAME",
      heading: "CRAFTED OVER FIRE. SERVED WITH PURPOSE.",
      description: "Our open hearth is the beating heart of the dining room. Live embers, wood smoke aromas, and the hypnotic sizzle of cast iron form an elemental backdrop to an evening of culinary drama.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    },
    reservation: {
      eyebrow: "TABLE RESERVATION & INQUIRY",
      heading: "RESERVE YOUR EVENING",
      description: "We welcome table reservations up to 30 days in advance. For parties of six or more, or private dining salons, our sommelier concierge will coordinate tailored wine pairings and tasting menus.",
      policy_note: "A submitted reservation inquiry is promptly reviewed by our dining concierge and confirmed via SMS and email."
    },
    location: {
      eyebrow: "MANHATTAN MIDTOWN EAST",
      heading: "LOCATION & HOURS",
      address: "482 Lexington Avenue, Manhattan, NY 10017",
      phone: "+1 (212) 840-7832",
      email: "concierge@charredandprime.com",
      hours: "Tuesday – Sunday: 5:00 PM – 11:30 PM",
      transit_note: "Subway: 4, 5, 6, 7, S at Grand Central Terminal (3 minute walk). Valet parking available on Lexington Ave."
    },
    footer: {
      tagline: "CHARRED & PRIME | NEW YORK",
      description: "An architectural sanctuary celebrating heritage dry-aged beef, open-fire cooking, and fine hospitality.",
      copyright: "© 2026 Charred & Prime Steakhouse. All rights reserved."
    }
  },
  categories: [
    {
      id: 1,
      name: "Steaks & Signature Cuts",
      slug: "steaks",
      items: [
        {
          id: 101,
          name: "Dry-Aged Bone-In Ribeye",
          price: "115.00",
          currency: "$",
          cut_type: "45-Day Himalayan Salt Dry-Aged USDA Prime",
          serving_size: "24 oz / 680g | Serves 1–2",
          short_description: "Supreme marbling, intense nutty hazelnut notes, charred over kiln-dried white oak.",
          description: "Our hallmark cut. Sourced from single-family Nebraska pastures, dry-aged for 45 days in our salt-brick cellar, and seared over 1,200°F live embers.",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Gluten-Free", "Signature", "Prime"],
          is_available: true,
          is_featured: true
        },
        {
          id: 102,
          name: "The Long-Bone Tomahawk",
          price: "195.00",
          currency: "$",
          cut_type: "Heritage Black Angus Tomahawk Ribeye",
          serving_size: "42 oz / 1.2kg | Serves 2–3",
          short_description: "Showstopping tableside presentation, carved on roasted rosemary and garlic embers.",
          description: "The definitive steakhouse spectacle. A full 42 ounces of bone-in prime ribeye seared over embers and carved tableside with three house sauces.",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Signature Tableside", "Shareable"],
          is_available: true,
          is_featured: true
        },
        {
          id: 103,
          name: "Prime Filet Mignon",
          price: "78.00",
          currency: "$",
          cut_type: "Center-Cut Barrel Tenderloin",
          serving_size: "10 oz / 285g",
          short_description: "Silky, fork-tender texture with herb-basted brown butter and red wine reduction.",
          description: "The pinnacle of tenderness. Wet-aged for 28 days, finished with thyme-infused grass-fed butter, and accompanied by roasted shallot confit.",
          image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Gluten-Free", "Chef's Cut"],
          is_available: true,
          is_featured: true
        },
        {
          id: 104,
          name: "Wagyu New York Strip",
          price: "98.00",
          currency: "$",
          cut_type: "Snake River Farms American Wagyu (Gold Grade)",
          serving_size: "16 oz / 450g",
          short_description: "Bold, robust beef flavor balanced by luxurious Wagyu melt-in-the-mouth tenderness.",
          description: "An exceptional hybrid of Japanese Wagyu genetics and American grain feeding. Seared to a deep caramelized mahogany crust.",
          image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Gluten-Free", "Gold Grade"],
          is_available: true,
          is_featured: true
        }
      ]
    },
    {
      id: 2,
      name: "Starters & Caviar",
      slug: "starters",
      items: [
        {
          id: 105,
          name: "Prime Beef Tartare & Bone Marrow",
          price: "34.00",
          currency: "$",
          cut_type: "Hand-Cut Tenderloin & Roasted Canoe Marrow",
          serving_size: "Appetizer | Serves 1–2",
          short_description: "Dijon emulsion, pickled shallots, cured egg yolk, and toasted sourdough brioche.",
          description: "Hand-cut Prime beef tenderloin folded with capers, shallots, and house-churned tallow emulsion, topped with warm roasted bone marrow.",
          image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Chef's Starter"],
          is_available: true
        },
        {
          id: 106,
          name: "Wood-Fired Oysters Rockefeller",
          price: "32.00",
          currency: "$",
          cut_type: "Six East Coast Oysters",
          serving_size: "6 Pieces",
          short_description: "Wilted watercress, pernod cream, panko crumb, charred directly over embers.",
          description: "Fresh East Coast oysters broiled over live hardwood coals with an herbaceous pernod compound butter and golden crust.",
          image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Wood-Fired", "Seafood"],
          is_available: true
        }
      ]
    },
    {
      id: 3,
      name: "Seafood & Shellfish",
      slug: "seafood",
      items: [
        {
          id: 107,
          name: "Charred Maine Lobster Tail",
          price: "68.00",
          currency: "$",
          cut_type: "12 oz Cold Water Maine Tail",
          serving_size: "1 Tail",
          short_description: "Brushed with smoked paprika butter and finished with charred Meyer lemon.",
          description: "Succulent jumbo cold-water lobster tail split and grilled over white oak embers with brown butter baste.",
          image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Gluten-Free", "Shellfish"],
          is_available: true
        }
      ]
    },
    {
      id: 4,
      name: "Artisan Sides",
      slug: "sides",
      items: [
        {
          id: 108,
          name: "Black Truffle Potato Mousseline",
          price: "24.00",
          currency: "$",
          cut_type: "Yukon Gold & Perigord Truffle",
          serving_size: "Sharable Side",
          short_description: "Triple-whipped with cultured butter, shaved fresh black truffles, and chives.",
          description: "Silky Yukon gold potatoes passed through drum sieves and folded with European butter and seasonal truffle carpaccio.",
          image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Vegetarian", "Truffle"],
          is_available: true
        },
        {
          id: 109,
          name: "Charred Broccolini & Calabrian Chili",
          price: "18.00",
          currency: "$",
          cut_type: "Farm Fresh Broccolini",
          serving_size: "Sharable Side",
          short_description: "Blistered over coals with garlic confit, toasted pine nuts, and aged parmesan.",
          description: "Tender crisp broccolini stalks kissed by the grill and tossed in spicy Calabrian chili paste and garlic chips.",
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
          dietary_tags: ["Vegetarian", "Gluten-Free"],
          is_available: true
        }
      ]
    }
  ],
  featured_steaks: [
    {
      id: 1,
      name: "Dry-Aged Bone-In Ribeye",
      price: "115.00",
      currency: "$",
      cut_type: "45-Day Himalayan Salt Dry-Aged USDA Prime",
      serving_size: "24 oz / 680g | Serves 1–2",
      short_description: "Supreme marbling, intense nutty hazelnut notes, charred over kiln-dried white oak.",
      description: "Our hallmark cut. Sourced from single-family Nebraska pastures, dry-aged for 45 days in our salt-brick cellar, and seared over 1,200°F live embers.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      dietary_tags: ["Gluten-Free", "High Protein", "Signature"],
      is_featured: true
    },
    {
      id: 2,
      name: "Prime Filet Mignon",
      price: "78.00",
      currency: "$",
      cut_type: "Center-Cut Barrel Tenderloin",
      serving_size: "10 oz / 285g",
      short_description: "Silky, fork-tender texture with herb-basted brown butter and red wine reduction.",
      description: "The pinnacle of tenderness. Wet-aged for 28 days, finished with thyme-infused grass-fed butter, and accompanied by roasted shallot confit.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
      dietary_tags: ["Gluten-Free", "Chef's Cut"],
      is_featured: true
    },
    {
      id: 3,
      name: "Wagyu New York Strip",
      price: "98.00",
      currency: "$",
      cut_type: "Snake River Farms American Wagyu (Gold Grade)",
      serving_size: "16 oz / 450g",
      short_description: "Bold, robust beef flavor balanced by luxurious Wagyu melt-in-the-mouth tenderness.",
      description: "An exceptional hybrid of Japanese Wagyu genetics and American grain feeding. Seared to a deep caramelized mahogany crust.",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      dietary_tags: ["Gluten-Free", "Gold Grade"],
      is_featured: true
    },
    {
      id: 4,
      name: "The Long-Bone Tomahawk",
      price: "195.00",
      currency: "$",
      cut_type: "Heritage Black Angus Tomahawk Ribeye",
      serving_size: "42 oz / 1.2kg | Serves 2–3",
      short_description: "Showstopping tableside presentation, carved on roasted rosemary and garlic embers.",
      description: "The definitive steakhouse spectacle. A full 42 ounces of bone-in prime ribeye seared over embers and carved tableside with three house sauces.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      dietary_tags: ["Signature Tableside", "Shareable"],
      is_featured: true
    }
  ],
  viewpoints: [
    {
      id: 1,
      title: "Architectural Façade & Entrance",
      subtitle: "Arrival Experience on Lexington Avenue",
      description: "Monolithic dark basalt stone panels, brushed bronze portals, and warm architectural uplighting welcome guests into an exclusive sanctuary.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      camera_position: [0, 4.2, 15],
      camera_target: [0, 2.4, 0]
    },
    {
      id: 2,
      title: "Grand Reception & Concierge",
      subtitle: "Smoked Fluted Glass & Black Marble",
      description: "A monolithic Nero Marquina reception counter with warm brass accents and discreet private coat check.",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      camera_position: [-3, 3, 10],
      camera_target: [0, 2, 0]
    },
    {
      id: 3,
      title: "Main Dining Room",
      subtitle: "Bespoke Leather Banquettes & Sculptural Chandelier",
      description: "Intimate dining partitions crafted from dark smoked oak, supple saddle leather banquettes, and hand-blown smoked crystal chandeliers.",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
      camera_position: [0, 2.5, 7],
      camera_target: [0, 1.8, -2]
    },
    {
      id: 4,
      title: "The Hearth & Grill Station",
      subtitle: "Custom Dual Argentine Parrilla & Wood Embers",
      description: "The dramatic open kitchen where post oak and binchotan embers sear prime steaks at 1,200 degrees behind architectural safety glass.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      camera_position: [4, 2.8, 6],
      camera_target: [2, 1.5, 0]
    },
    {
      id: 5,
      title: "The Reserve Wine Cellar",
      subtitle: "2,400 Bottles of Old World Grands Crus",
      description: "Climate-controlled architectural glass vault showcasing rare Bordeaux, Super Tuscans, Napa Cult Cabernets, and vintage Champagne.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      camera_position: [-4, 2.5, 5],
      camera_target: [0, 2, -1]
    }
  ],
  experiences: [
    {
      id: 1,
      title: "The Sommelier's Reserve Room",
      tagline: "Private Dining Salon for up to 14 Guests",
      description: "Enclosed within acoustic smoked glass and walnut cabinetry, this secluded salon features dedicated sommelier service and bespoke 7-course pairing menus.",
      capacity: "Up to 14 Guests",
      price_guide: "$250 per guest tasting menu",
      image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Chef's Hearth Table",
      tagline: "Front-Row Culinary Immersion for 8 Guests",
      description: "Directly facing the Argentine parrillawork hearth. Executive Chef Marcus Sterling guides guests through primal cut selections and custom wood-smoke infusions.",
      capacity: "8 Guests Maximum",
      price_guide: "$320 per guest with reserve pairings",
      image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "The Grand Mezzanine Salon",
      tagline: "Exclusive Cocktail Receptions & Corporate Dinners",
      description: "Overlooking the main architectural dining hall, the Mezzanine offers private bar service, dedicated restrooms, and customized steak carving stations.",
      capacity: "25–50 Guests",
      price_guide: "Inquire for buyout packages",
      image_url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
    }
  ],
  team: [
    {
      id: 1,
      name: "Marcus Sterling",
      role: "Executive Chef & Hearth Master",
      bio: "With over two decades leading Michelin-acclaimed steakhouse kitchens in New York and Chicago, Marcus has dedicated his career to the alchemy of heritage dry-aging and live hardwood embers.",
      quote: "Beef speaks with honest eloquence when respected with precise aging, honest fire, and mineral salt.",
      specialization: "Primal Cut Sourcing & Open Hearth Engineering",
      image_url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Elena Rostov",
      role: "Master Butcher & Cellar Director",
      bio: "Trained under celebrated European charcutiers, Elena oversees our proprietary 45-day Himalayan salt dry-aging vault, monitoring daily humidity, airflow, and enzyme concentration.",
      quote: "Dry-aging is sculpting with time—allowing moisture to yield to concentrated umami.",
      specialization: "Himalayan Salt Microclimates & Charcuterie",
      image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Julian Vance",
      role: "Head Sommelier & Beverage Director",
      bio: "Advanced Court of Master Sommeliers certified, Julian has curated our 2,400-bottle cellar with a sharp focus on bold Left Bank Bordeaux, Napa Cabernet pioneers, and vintage Champagne.",
      quote: "A robust steak requires a wine of equal spine, structured tannins, and lingering mineral length.",
      specialization: "Old World Vintages & Barrel-Aging Programs",
      image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
    }
  ],
  testimonials: [
    {
      id: 1,
      guest_name: "Michelin Guide Review",
      source: "Michelin Inspector's Notebook",
      review_text: "A triumph of architectural restraint and culinary potency. The 45-day Himalayan salt dry-aged bone-in ribeye achieved a sublime sear over oak embers, followed by velvety truffle mousseline.",
      rating: 5,
      review_date: "October 2026"
    },
    {
      id: 2,
      guest_name: "The New York Times",
      source: "Pete Wells, Restaurant Critic",
      review_text: "Charred & Prime brings majestic theatricality back to steakhouse dining. No cheap gimmicks—just immaculate wood smoke, uncompromising beef provenance, and a cellar that commands reverence.",
      rating: 5,
      review_date: "August 2026"
    },
    {
      id: 3,
      guest_name: "Food & Wine Magazine",
      source: "Best New Luxury Dining Destinations",
      review_text: "The long-bone tomahawk carved tableside over smoldering rosemary branches is worth the reservation alone. An instant Midtown landmark.",
      rating: 5,
      review_date: "September 2026"
    },
    {
      id: 4,
      guest_name: "Forbes Luxury Travel",
      source: "Private Dining Spotlight",
      review_text: "The Sommelier's Reserve Room sets the gold standard for executive entertaining in Manhattan. Flawless hospitality and peerless wine pairings.",
      rating: 5,
      review_date: "July 2026"
    }
  ],
  gallery: [
    { id: 1, title: "Bone-In Prime Ribeye Searing", category: "food", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", alt_text: "Charred prime ribeye steak" },
    { id: 2, title: "Monolithic Basalt Façade", category: "exterior", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", alt_text: "Exterior architectural entrance" },
    { id: 3, title: "Smoked Glass & Leather Banquettes", category: "interior", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", alt_text: "Interior dining room design" },
    { id: 4, title: "Argentine Parrilla Hearth Fire", category: "kitchen", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", alt_text: "Open kitchen hearth flame" },
    { id: 5, title: "Private Sommelier Tasting Salon", category: "events", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", alt_text: "Private dining room setting" },
    { id: 6, title: "Hand-Cut Prime Beef Tartare", category: "food", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80", alt_text: "Beef tartare presentation" },
    { id: 7, title: "Grand Central Reserve Cellar", category: "interior", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80", alt_text: "Architectural wine room" },
    { id: 8, title: "Wood-Roasted Oysters in Embers", category: "kitchen", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80", alt_text: "Oysters over live coals" }
  ],
  custom_pages: [
    {
      id: 1,
      title: "Private Wine Vault & Dry-Aging Tasting",
      slug: "private-wine-vault-and-dry-aging-tasting",
      meta_title: "Private Wine Vault & Dry-Aging Tasting | Charred & Prime",
      meta_description: "An exclusive private dining experience in our subterranean wine cellar surrounded by 3,000 library vintages and bespoke cut tastings.",
      blocks: [
        {
          type: "hero",
          title: "The Subterranean Wine Vault",
          subtitle: "CURATED EXCLUSIVITY & PRIVATE CELLAR DINING",
          content: "Descend beneath the Manhattan pavement into our private temperature-controlled vault. Dine surrounded by 3,000 bottles of Grand Cru Bordeaux and library Napa Cabernets with a dedicated steak sommelier.",
          button_text: "Request Vault Reservation"
        },
        {
          type: "split",
          title: "Rare Cuts Curated at Tableside",
          subtitle: "BESPOKE CARVING EXPERIENCE",
          content: "Your private party of up to 14 guests enjoys an interactive steak demonstration: inspecting dry-aging stages from 30 to 90 days, selecting custom cut thicknesses, and watching our master butcher carve tableside on end-grain walnut blocks.",
          image_url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80",
          button_text: "Explore Vault Menu"
        },
        {
          type: "features",
          title: "Vault Dining Amenities",
          subtitle: "TAILORED HOSPITALITY",
          items: [
            { icon: "🍷", title: "Head Sommelier Pairing", text: "Five-course wine progression featuring rare library vintages from our private reserve cellars." },
            { icon: "🥩", title: "Custom Primal Selection", text: "Hand-select whole primal loins dry-aged with Himalayan pink salt to your exact specifications." },
            { icon: "🔥", title: "Dedicated Hearth Chef", text: "Personal grillmaster preparing each guest's selection over custom white oak embers." },
            { icon: "🗝️", title: "Private Cellar Entrance", text: "Discreet VIP arrival via private bronze elevator with direct sommelier reception." }
          ]
        },
        {
          type: "cta",
          title: "Host Your Next Private Soirée",
          content: "Ideal for board dinners, milestone celebrations, and intimate celebrations. Minimum party 6 guests, maximum 16 guests.",
          button_text: "Inquire for Private Dates"
        },
        {
          type: "reservation",
          title: "Check Vault Availability",
          content: "Vault reservations open 60 days in advance. Select lunch or dinner seating."
        }
      ]
    }
  ],
  blog_categories: [
    { id: 1, name: "The Dry-Aging Cave", slug: "dry-aging-craft" },
    { id: 2, name: "Wood-Fire & Live Charcoal", slug: "wood-fire-ember" },
    { id: 3, name: "The Sommelier's Vault", slug: "wine-sommelier-vault" }
  ],
  blog_posts: [
    {
      id: 1,
      title: "The Chemistry of 60-Day Himalayan Salt Dry-Aging",
      slug: "the-chemistry-of-60-day-himalayan-salt-dry-aging",
      category: "dry-aging-craft",
      category_name: "The Dry-Aging Cave",
      excerpt: "Inside our subterranean aging chamber lined with two tons of sub-surface Himalayan pink salt bricks, natural enzymatic tenderization transforms prime beef into extraordinary gastronomic art.",
      content: "Dry-aging is not simply a process of preservation; it is the deliberate culinary acceleration of enzymatic breakdown and moisture reduction. Inside our custom-engineered subterranean aging cave, humidity is maintained at precisely 82% with temperatures locked at 1.5°C.\n\nTwo tons of backlit Himalayan salt bricks regulate ambient humidity while contributing micro-trace minerals to the air current. Over sixty full days, natural calpain and cathepsin enzymes break down rigid collagen fibers in the primal cuts, while natural moisture evaporates by approximately 18%.\n\nThe consequence is profound: an exponential concentration of glutamates, producing umami notes reminiscent of roasted hazelnuts, blue cheese rind, and concentrated white truffle. When seared over 900-degree white oak coals, the outer crust forms a caramelized Maillard crust that yields to a silken, melting center.",
      featured_image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
      author: "Marcus Sterling — Master Butcher & Cave Curator",
      reading_time: "6 min read",
      published_date: "November 2026"
    },
    {
      id: 2,
      title: "Hardwood Embers: White Oak and Hickory in the Open-Flame Grill",
      slug: "hardwood-embers-white-oak-and-hickory-steakhouse-flame",
      category: "wood-fire-ember",
      category_name: "Wood-Fire & Live Charcoal",
      excerpt: "Why charcoal briquettes will never match the clean radiant heat and aromatic smoke of aged Pennsylvania white oak and kiln-dried shagbark hickory.",
      content: "At Charred & Prime, no gas jets or electric heating elements touch our signature steaks. Every steak is kissed exclusively by genuine live hardwood embers generated in our dual hearth ovens.\n\nWe source kiln-dried Pennsylvania white oak aged for nine months, blended with twenty percent hickory hearts. White oak provides sustained, intense thermal radiation exceeding 1,000°F at bed depth without producing volatile bitter creosote, while hickory delivers a sweet, aromatic whispering smoke that permeates the fat caps.\n\nOur custom hand-cranked V-channel steel grills allow our grillmasters to regulate height to within half an inch. Juices render and sizzle along the angled channels, atomizing back into the rising thermal plume and imparting an inimitable wood-fired complexity that fine steak lovers recognize instantly.",
      featured_image: "https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80",
      author: "Chef Alexander Cross — Executive Pitmaster",
      reading_time: "5 min read",
      published_date: "November 2026"
    }
  ]
};
