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
          { name: "Foie Gras de Canard des Landes Mi-Cuit", price: "48 €", desc: "Chutney de figues de Solliès au porto vintage, brioche feuilletée tiède au sel de Guérande." },
          { name: "Carpaccio de Saint-Jacques de la Baie de Saint-Brieuc", price: "52 €", desc: "Huile de combawa, gelée d'eau de mer iodée, copeaux de truffe noire Melanosporum." },
          { name: "Velouté d'Artichauts Épineux & Truffe Noire", price: "44 €", desc: "Copeaux de vieux parmesan Reggiano 36 mois, tartine campagnarde au beurre de noisette." }
        ]
      },
      {
        id: "poissons",
        name: "Les Poissons & Crustacés",
        items: [
          { name: "Sole de Petit Bateau Meunière Farcie aux Écrevisses", price: "105 €", desc: "Pommes rattes du Touquet écrasées à la fourchette, beurre mousseux au citron de Menton." },
          { name: "Noix de Saint-Jacques Dorées au Sautoir", price: "92 €", desc: "Risotto d'épeautre crémeux au safran du Quercy et émulsion de corail au vin jaune." },
          { name: "Bar de Ligne Cuit à Basse Température", price: "98 €", desc: "Fenouil braisé à l'anis étoilé, jus d'arêtes réduit aux coquillages et salicornes fraîches." }
        ]
      },
      {
        id: "viandes",
        name: "Les Viandes & Gibiers Nobles",
        items: [
          { name: "Filet de Bœuf Simmental Affiné 45 Jours", price: "110 €", desc: "Moelle rôtie aux herbes fraîches, jus perlé à la truffe noire et purée Robuchon." },
          { name: "Carré d'Agneau de Prés-Salés en Croûte d'Herbes", price: "96 €", desc: "Ail confit de Lautrec, jus d'agneau réduit au romarin et tian de légumes confits." },
          { name: "Ris de Veau de Lait Croustillant au Beurre Noisette", price: "102 €", desc: "Champignons morilles étuvées au vin de Madère et asperges vertes glacées." }
        ]
      },
      {
        id: "desserts",
        name: "La Pâtisserie de Haute Voltige",
        items: [
          { name: "Millefeuille Traditionnel à la Vanille de Tahiti", price: "36 €", desc: "Feuilletage inversé caramélisé croustillant, crème diplomate légère et caramel beurre salé." },
          { name: "Tartelette Sablée aux Fraises des Bois & Verveine", price: "38 €", desc: "Crème d'amandes douces de Provence, sorbet vivifiant à la verveine du potager." },
          { name: "Chariot de Fromages Affinés par Maître Cantin", price: "35 €", desc: "Sélection d'exception de terroirs français accompagnés de confitures artisanales et pain aux noix." }
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
  }
};
