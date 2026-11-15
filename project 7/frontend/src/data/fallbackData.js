export const FALLBACK_DATA = {
  restaurant_name: "L'ÉTOILE ROYALE",
  theme: {
    primary_color: "#54252F",
    accent_color: "#C5A46D",
    bg_color: "#202124",
    text_color: "#F5F0E7",
    taupe_color: "#A89B8B"
  },
  hero: {
    restaurant_name: "L'ÉTOILE ROYALE",
    tagline: "Salon Gastronomique & Bar à Champagne",
    badge_text: "Étoilé Michelin 2026 • Place Vendôme",
    lead_description: "L'art culinaire français sublimé au cœur d'un hôtel particulier du XVIIIe siècle. Une symphonie de haute gastronomie, de flacons d'exception et de haute discrétion parisienne.",
    cta_primary_text: "Réserver une Table",
    cta_secondary_text: "Découvrir la Carte",
    stats: [
      { number: "2", label: "Étoiles Michelin" },
      { number: "1788", label: "Hôtel Particulier" },
      { number: "3 200", label: "Flacons Rares" },
      { number: "18", label: "Tables Exclusives" }
    ]
  },
  heritage: {
    title: "L'Art de Vivre Parisien",
    subtitle: "Notre Héritage",
    badge: "Depuis 1788",
    body_paragraph_1: "Né dans le faste architectural des salons du Siècle des Lumières, L'Étoile Royale perpétue avec vénération l'héritage de la grande table bourgeoise et aristocratique de Paris. Chaque boiserie en chêne sculpté, chaque dorure à la feuille et chaque cristal de Baccarat racontent plus de deux siècles de banquets mémorables.",
    body_paragraph_2: "Aujourd'hui réinventé sous la direction du Chef Alexandre de Morbihan, notre salon concilie le respect scrupuleux des fonds de sauce classiques et la légèreté vivifiante des récoltes maraîchères d'Île-de-France et des côtes bretonnes.",
    quote: "La cuisine française n'est pas un monument figé dans le marbre, mais une flamme vive que chaque génération se doit de nourrir avec panache.",
    quote_author: "Chef Alexandre de Morbihan",
    pillars: [
      {
        title: "Savoir-Faire Séculaire",
        desc: "Précision des découpes, sauces montées minute au beurre demi-sel, cuisson sur braise et rôtisserie traditionnelle."
      },
      {
        title: "Terroirs d'Exception",
        desc: "Homards bleus de casier, truffes noires du Périgord, pigeonneaux de Vendée et caviar osciètre d'Aquitaine."
      },
      {
        title: "Haute Sommellerie",
        desc: "Accords millimétrés conduits par notre Chef Sommelier parmi les plus illustres maisons et vignerons indépendants."
      }
    ],
    image_main: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    image_detail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85"
  },
  tour: {
    title: "Visite Virtuelle Immersive",
    subtitle: "Explorer les Salons Particuliers",
    description: "Parcourez en trois dimensions l'architecture néoclassique et les ambiances tamisées de notre maison.",
    viewpoints: [
      {
        id: "facade",
        number: "01",
        name: "Façade & Entrée Royale",
        cameraPos: [0, 2.5, 7.5],
        target: [0, 1.8, 0],
        description: "Pierre de taille blonde parisienne, perron monumental et ferronneries ouvragées éclairées à la lanterne dorée.",
        details: ["Perron en pierre de Saint-Leu", "Lanternes en bronze patiné", "Accueil par le Maître d'Hôtel"]
      },
      {
        id: "salon",
        number: "02",
        name: "Grand Salon d'Honneur",
        cameraPos: [-2.8, 2.2, 5.0],
        target: [-0.5, 1.5, 0],
        description: "Tables drapées de lin d'Ypres, fauteuils de velours pourpre bordeaux et lustre magistral en pampilles de cristal.",
        details: ["Lustre cristal 120 feux", "Nappage double fil d'Arras", "Argenterie Christofle"]
      },
      {
        id: "champagne_bar",
        number: "03",
        name: "Bar à Champagne & Verrière",
        cameraPos: [3.2, 2.1, 4.8],
        target: [0.8, 1.4, 0],
        description: "Comptoir monolithique en marbre marron emperador sous une verrière zénithale baignée d'étoiles.",
        details: ["Sélection de 80 Champagnes de vignerons", "Comptoir marbre noir poli", "Mixologie haute couture"]
      },
      {
        id: "wine_cellar",
        number: "04",
        name: "Cave Historique des Grands Crus",
        cameraPos: [0, 1.2, 4.2],
        target: [0, 1.0, -1],
        description: "Cryptes voûtées du sous-sol préservant les plus vénérables millésimes de Bourgogne, Bordeaux et Champagne.",
        details: ["Température stabilisée à 12°C", "Plus de 3 200 références", "Dégustation privée sur fût"]
      },
      {
        id: "chef_table",
        number: "05",
        name: "La Table Privée du Chef",
        cameraPos: [-1.5, 2.8, 3.8],
        target: [0.5, 1.8, -0.5],
        description: "Salon confidentiel de 8 convives avec perspective panoramique sur le passe de dressage et la brigade.",
        details: ["Menu dégustation sur mesure", "Présence du Chef Alexandre", "Accords verres rares"]
      }
    ]
  },
  signature_dishes: {
    title: "Créations Emblématiques",
    subtitle: "Les Joyaux de la Carte",
    dishes: [
      {
        id: "homard",
        name: "Homard Bleu de Roscoff en Carapace de Braise",
        french_name: "Homard Bleu Flambé au Vieux Marc de Bourgogne",
        description: "Pinces confites au beurre noisette, queue juste saisie sur galets ardents, émulsion coraillée aux agrumes confits et mousseline de céleri truffée.",
        price: "135 €",
        tag: "Plat Signature",
        wine_pairing: "Meursault 1er Cru Les Charmes 2020",
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=85"
      },
      {
        id: "pigeon",
        name: "Pigeonneau Impérial de Vendée Rôti au Sang",
        french_name: "Pigeonneau en Croûte de Cacao & Baies Sauvages",
        description: "Suprêmes rosés à cœur, cuisses en pastilla croustillante au foie gras poêlé, jus perlé aux airelles sauvages et racines d'hiver glacées.",
        price: "115 €",
        tag: "Classique Réinventé",
        wine_pairing: "Côte-Rôtie Domaine Jamet 2018",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
      },
      {
        id: "turbot",
        name: "Turbot Sauvage de Ligne Grillé à l'Arête",
        french_name: "Turbot Façon 'Grand Duc' & Caviar Osciètre",
        description: "Chair nacrée parfumée aux lauriers de Provence, sabayon au Champagne blanc de blancs et quenelle de caviar osciètre Impérial.",
        price: "140 €",
        tag: "Pêche Responsable",
        wine_pairing: "Chablis Grand Cru Les Clos 2019",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=85"
      },
      {
        id: "souffle",
        name: "Soufflé Chaud Pur Chocolat Guanaja & Vanille Bourbon",
        french_name: "Soufflé Minute Flambé au Grand Marnier Cuvée du Centenaire",
        description: "Cœur coulant 70% cacao de la manufacture de Paris, glace onctueuse turbinée à la gousse de vanille givrée de Madagascar.",
        price: "42 €",
        tag: "Dessert Mythique",
        wine_pairing: "Rivesaltes Ambré Domaine Parcé 1999",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85"
      }
    ]
  },
  menu: {
    title: "La Carte & Les Menus",
    subtitle: "Dégustation Gastronomique",
    tasting_menus: [
      {
        name: "Menu Découverte Vendôme",
        courses: "5 Séquences",
        price: "195 €",
        description: "Une initiation raffinée aux créations printanières du Chef Alexandre de Morbihan.",
        wine_pairing_price: "+ 110 € Accords Mets & Vins (4 Verres)"
      },
      {
        name: "Menu Symphonie Royale",
        courses: "8 Séquences d'Auteur",
        price: "285 €",
        description: "Le grand voyage gastronomique honorant les joyaux terrestres et marins de nos terroirs.",
        wine_pairing_price: "+ 175 € Accords Prestige Sommelier (6 Verres)"
      }
    ],
    categories: [
      {
        id: "entrees",
        name: "Les Entrées Délicates",
        items: [
          {
            name: "Foie Gras de Canard des Landes Mi-Cuit",
            price: "48 €",
            desc: "Chutney de figues de Solliès au porto vintage, brioche feuilletée tiède au sel de Guérande.",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Sauternes Château Guiraud 2016"
          },
          {
            name: "Carpaccio de Saint-Jacques de la Baie de Saint-Brieuc",
            price: "52 €",
            desc: "Huile de combawa, gelée d'eau de mer iodée, copeaux de truffe noire Melanosporum.",
            image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Chablis Premier Cru Montmains 2021"
          },
          {
            name: "Velouté d'Artichauts Épineux & Truffe Noire",
            price: "44 €",
            desc: "Copeaux de vieux parmesan Reggiano 36 mois, tartine campagnarde au beurre de noisette.",
            image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Meursault Domaine des Comtes Lafon 2020"
          }
        ]
      },
      {
        id: "poissons",
        name: "Les Poissons & Crustacés",
        items: [
          {
            name: "Sole de Petit Bateau Meunière Farcie aux Écrevisses",
            price: "105 €",
            desc: "Pommes rattes du Touquet écrasées à la fourchette, beurre mousseux au citron de Menton.",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Puligny-Montrachet 1er Cru Les Folatières 2019"
          },
          {
            name: "Noix de Saint-Jacques Dorées au Sautoir",
            price: "92 €",
            desc: "Risotto d'épeautre crémeux au safran du Quercy et émulsion de corail au vin jaune.",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Château-Chalon Vin Jaune Domaine Macle 2014"
          },
          {
            name: "Bar de Ligne Cuit à Basse Température",
            price: "98 €",
            desc: "Fenouil braisé à l'anis étoilé, jus d'arêtes réduit aux coquillages et salicornes fraîches.",
            image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Corton-Charlemagne Grand Cru Louis Latour 2018"
          }
        ]
      },
      {
        id: "viandes",
        name: "Les Viandes & Gibiers Nobles",
        items: [
          {
            name: "Filet de Bœuf Simmental Affiné 45 Jours",
            price: "110 €",
            desc: "Moelle rôtie aux herbes fraîches, jus perlé à la truffe noire et purée Robuchon.",
            image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Pauillac Château Pichon Baron 2015"
          },
          {
            name: "Carré d'Agneau de Prés-Salés en Croûte d'Herbes",
            price: "96 €",
            desc: "Ail confit de Lautrec, jus d'agneau réduit au romarin et tian de légumes confits.",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Hermitage Domaine Jean-Louis Chave 2017"
          },
          {
            name: "Ris de Veau de Lait Croustillant au Beurre Noisette",
            price: "102 €",
            desc: "Champignons morilles étuvées au vin de Madère et asperges vertes glacées.",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Volnay 1er Cru Champans Marquis d'Angerville 2018"
          }
        ]
      },
      {
        id: "desserts",
        name: "La Pâtisserie de Haute Voltige",
        items: [
          {
            name: "Millefeuille Traditionnel à la Vanille de Tahiti",
            price: "36 €",
            desc: "Feuilletage inversé caramélisé croustillant, crème diplomate légère et caramel beurre salé.",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Champagne Krug Grande Cuvée 170ème Édition"
          },
          {
            name: "Tartelette Sablée aux Fraises des Bois & Verveine",
            price: "38 €",
            desc: "Crème d'amandes douces de Provence, sorbet vivifiant à la verveine du potager.",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Muscat de Beaumes-de-Venise Domaine Perrin 2020"
          },
          {
            name: "Chariot de Fromages Affinés par Maître Cantin",
            price: "35 €",
            desc: "Sélection d'exception de terroirs français accompagnés de confitures artisanales et pain aux noix.",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=85",
            wine_pairing: "Châteauneuf-du-Pape Blanc Château de Beaucastel 2021"
          }
        ]
      }
    ]
  },
  architecture: {
    title: "Architecture & Salons",
    subtitle: "L'Écrin d'un Siècle",
    details: [
      {
        title: "Bâtiment Historique 1788",
        desc: "Façade néoclassique classée au titre des Monuments Historiques français, ornée de mascarons et de balcons en fer forgé doré."
      },
      {
        title: "Lustres de Cristal & Pampilles",
        desc: "Œuvre de maîtres verriers parisiens, diffusant une clarté dorée et chaleureuse pour magnifier la beauté des visages."
      },
      {
        title: "Boiseries sculptées & Marbre Noir",
        desc: "Panneaux muraux patinés à l'ancienne et cheminées d'époque surmontées de trumeaux aux miroirs biseautés."
      }
    ],
    quote: "Entrer chez nous, c'est franchir le seuil d'une demeure privée où le temps suspend son vol pour honorer les sens.",
    stats: [
      { value: "480 m²", label: "Superficie de Salons" },
      { value: "18", label: "Tables Espacées" },
      { value: "4.8 m", label: "Hauteur sous Plafond" },
      { value: "3", label: "Salons Privatisables" }
    ]
  },
  chef: {
    name: "Alexandre de Morbihan",
    title: "Chef Exécutif & Maître Cuisinier de France",
    experience: "Deux Étoiles Michelin • Ancien Second de Joël Robuchon & Alain Ducasse",
    bio: "Formé auprès des plus éminentes légendes de la cuisine française avant de prendre les rênes de L'Étoile Royale, le Chef Alexandre défend une gastronomie d'émotion pure, où la précision des découpes et la rigueur des réductions célèbrent la richesse inaltérable de nos terroirs.",
    quote: "La perfection ne réside pas dans la complexité excessive, mais dans l'accord absolu entre un produit irréprochable et un geste d'une justesse infaillible.",
    philosophy_tags: ["Cuisine d'Auteur", "Terroirs Préservés", "Saisonnalité Stricte", "Sauces Nobles"],
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
  },
  experiences: {
    title: "Expériences Singulières",
    subtitle: "Des Instants Conçus pour Marquer les Esprits",
    cards: [
      {
        id: "diner",
        title: "Le Grand Dîner d'Honneur",
        desc: "Le service à la française dans toute sa pompe : découpe en salle sur guéridon, flambage et conseils personnalisés de sommellerie.",
        badge: "Chaque Soir",
        capacity: "De 2 à 6 convives"
      },
      {
        id: "champagne",
        title: "Le Bar à Champagne Clandestin",
        desc: "Une enclave confidentielle au sous-sol pour déguster des flacons rares de vignerons accompagnés de caviar osciètre et canapés chauds.",
        badge: "Accès Réservé",
        capacity: "Jusqu'à 15 convives"
      },
      {
        id: "privatisation",
        title: "Salons Particuliers & Réceptions",
        desc: "Le Salon Rohan et le Salon Mansart sont à votre entière disposition pour vos banquets privés, déjeuners d'affaires ou mariages intimistes.",
        badge: "Sur Demande",
        capacity: "De 8 à 35 convives"
      }
    ]
  },
  gallery: {
    title: "Galerie Photographique",
    subtitle: "Atmosphère & Détails Gastronomiques",
    images: [
      {
        url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=85",
        caption: "Ambiance feutrée du Grand Salon d'Honneur",
        category: "Atmosphère"
      },
      {
        url: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=85",
        caption: "Homard bleu de Roscoff et sabayon coraillé",
        category: "Cuisine"
      },
      {
        url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
        caption: "Sommellerie et dégustation de grands crus classés",
        category: "Vins"
      },
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
        caption: "Dressage méticuleux des tables en lin d'Ypres",
        category: "Art de la Table"
      },
      {
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
        caption: "Pigeonneau en croûte de cacao et baies sauvages",
        category: "Cuisine"
      },
      {
        url: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=900&q=85",
        caption: "Le Bar à Champagne sous sa verrière haussmannienne",
        category: "Atmosphère"
      }
    ]
  },
  testimonials: {
    title: "Éloges & Critiques",
    subtitle: "Ce que disent les Guides & Épicuriens",
    items: [
      {
        source: "Guide Michelin France 2026",
        quote: "Dans cet hôtel particulier préservé des outrages du temps, Alexandre de Morbihan signe une partition d'une pureté magistrale. Les sauces y atteignent une intensité d'anthologie.",
        rating: "★★ Deux Étoiles d'Excellence",
        author: "Inspecteur en Chef Michelin"
      },
      {
        source: "Le Figaro Économie & Gastronomie",
        quote: "L'Étoile Royale réussit le tour de force de faire revivre le grand style parisien sans la moindre poussière académique. Le service y est un ballet d'une grâce absolue.",
        rating: "Coup de Cœur de la Rédaction",
        author: "François-Régis Gaudry"
      },
      {
        source: "The Financial Times — How to Spend It",
        quote: "An exquisite triumph of neoclassical Parisian beauty, champagne reverence, and peerless sauce-making right behind Place Vendôme.",
        rating: "Ranked Top 5 in Paris",
        author: "Restaurant Critic, London"
      }
    ]
  },
  reservation: {
    title: "Réservations & Conciergerie",
    subtitle: "Réserver Votre Table Gastronomique",
    description: "En raison du nombre délibérément limité de tables (18 couverts par service), nous vous invitons à réserver au moins deux semaines à l'avance.",
    policy: "Tenue correcte exigée (veste souhaitée pour les messieurs). Les réservations sont garanties jusqu'à 20 minutes après l'heure convenue.",
    experiences_list: [
      "Grand Salon d'Honneur (Dîner à la Carte ou Dégustation)",
      "Table Privée du Chef (8 personnes max)",
      "Salon Particulier Mansart (Privatisation)",
      "Dégustation Champagne & Caviar (Bar à Champagne)"
    ],
    time_slots: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
  },
  location: {
    title: "Situation & Accès",
    subtitle: "Au Cœur du Paris Historique",
    address: "18 Place Vendôme, 75001 Paris, France",
    metro: "Station Tuileries (Ligne 1) ou Madeleine (Lignes 8, 12, 14)",
    valet: "Service Voiturier Privé disponible tous les soirs dès 18h30",
    phone: "+33 1 42 68 55 00",
    email: "concierge@letoileroyale-paris.fr",
    hours: [
      { days: "Mardi au Samedi", hours: "19h00 – 23h30 (Dîner uniquement)" },
      { days: "Dimanche & Lundi", hours: "Fermeture hebdomadaire (Ouverture sur privatisation)" }
    ]
  },
  custom_pages: [
    {
      id: 1,
      slug: "privatisation-salons-vendome",
      title: "Privatisation & Salons Particuliers Vendôme",
      meta_description: "Organisez vos réceptions privées, déjeuners d'affaires d'exception et soirées de gala au sein de nos salons historiques de 1788.",
      blocks: [
        {
          type: "hero",
          title: "Les Salons d'Exception de la Place Vendôme",
          subtitle: "Privatisations & Haute Réception Privée",
          bg_image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
          cta_text: "Demander une Brochure de Privatisation",
          cta_link: "#contact"
        },
        {
          type: "split",
          title: "L'Écrin Historique du Salon Rohan",
          lead: "Moulures d'époque, lustres d'époque et service de majordome dédié pour réunir jusqu'à 24 convives dans une discrétion absolue.",
          body: "Bénéficiant d'une entrée privée directe depuis la cour d'honneur, le Salon Rohan offre un confort diplomatique sans équivalent à Paris.",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
          image_alt: "Salon Rohan L'Étoile Royale"
        },
        {
          type: "features",
          title: "Prestations Sur Mesure",
          items: [
            { title: "Menu Dégustation Personnalisé", desc: "Création exclusive par le Chef Alexandre de Morbihan accordée à vos souhaits." },
            { title: "Accords Sommellerie Rares", desc: "Sélection de flacons de notre cave du XVIIIe siècle guidée par notre Chef Sommelier." },
            { title: "Service Majordome & Voiturier", desc: "Accueil sur tapis pourpre, conciergerie privée et voiturier dédié tout au long de l'événement." }
          ]
        },
        {
          type: "cta",
          title: "Concevoir Votre Événement Privé",
          subtitle: "Notre directrice des réceptions se tient à votre disposition pour imaginer un moment inoubliable.",
          button_text: "Contacter le Maître de Réception",
          button_link: "/contact"
        }
      ]
    }
  ],
  blog_categories: [
    { id: 1, name: "Haute Gastronomie", slug: "haute-gastronomie", description: "Les coulisses des créations d'exception et techniques de brigade." },
    { id: 2, name: "Art de la Cave", slug: "art-de-la-cave", description: "Les grands millésimes et trésors oenologiques sous la Place Vendôme." },
    { id: 3, name: "Héritage & Salons", slug: "heritage-salons", description: "L'histoire illustre de l'hôtel particulier et l'art de recevoir parisien." }
  ],
  blog_posts: [
    {
      id: 1,
      slug: "art-des-sauces-nobles-secret-alexandre",
      title: "L'Art des Sauces Nobles : Le Secret du Chef Alexandre de Morbihan",
      category: { id: 1, name: "Haute Gastronomie", slug: "haute-gastronomie" },
      cover_image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
      excerpt: "Découvrez comment notre brigade perpétue les réductions lentes de 72 heures pour sublimer le homard bleu et le pigeonneau.",
      content: "Dans les cuisines de L'Étoile Royale, la saucière est le cœur battant du piano. Le Chef Alexandre de Morbihan insiste sur la patience infinie que requiert un fond parfait. Chaque réduction s'opère à feu très doux, écumée avec recueillement, avant d'être montée au beurre cru demi-sel juste avant l'envoi. 'Une sauce n'est pas un artifice, elle est le trait d'union spirituel qui rassemble l'ensemble des éléments de l'assiette,' rappelle Alexandre. Ainsi le jus perlé aux airelles sauvages qui escorte le pigeonneau impérial exige-t-il trois jours d'infusion et de concentration pour atteindre son éclat d'ambre sombre.",
      author_name: "Alexandre de Morbihan",
      read_time: "5 min de lecture",
      views_count: 342,
      published_at: "2026-11-12T10:00:00Z"
    },
    {
      id: 2,
      slug: "tresors-caves-voutees-millesimes-oublies",
      title: "Trésors des Caves Voûtées : À la Recherche des Millésimes Oubliés",
      category: { id: 2, name: "Art de la Cave", slug: "art-de-la-cave" },
      cover_image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
      excerpt: "Plongée dans la pénombre de nos cryptes du XVIIIe siècle où reposent 3 200 flacons rares et magnums mythiques.",
      content: "Six mètres sous les pavés de la Place Vendôme s'étendent les galeries voûtées de nos caves historiques. À température constante de 12 degrés Celsius et 75% d'hygrométrie naturelle, des trésors inestimables continuent leur lente maturation : Romanée-Conti 1990, Château d'Yquem 1983, champagnes confidentiels dégorgés à la commande. Notre Chef Sommelier vous convie à une odyssée œnologique rare, où chaque bouteille débouchée devient une page vivante de l'histoire viticole française.",
      author_name: "Jean-Baptiste La Tour",
      read_time: "7 min de lecture",
      views_count: 518,
      published_at: "2026-11-08T14:30:00Z"
    }
  ]
};
