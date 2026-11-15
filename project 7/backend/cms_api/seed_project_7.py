import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_backend.settings')
import django
django.setup()

from django.contrib.auth.models import User
from django.utils import timezone
from cms_api.models import SiteConfig, CustomPage, BlogCategory, BlogPost, Reservation

def seed():
    # 1. Superuser
    user, created = User.objects.get_or_create(username='admin')
    if created or not user.is_staff:
        user.is_staff = True
        user.is_superuser = True
        user.set_password('adminpassword123')
        user.save()
        print("Superuser 'admin' created/updated.")

    # 2. Backfill existing reservations
    idx = 1
    for res in Reservation.objects.all():
        if not res.reference_code:
            res.reference_code = f"ROYAL-261114-DIN{idx:02d}"
            res.shift = 'dinner'
            res.save()
            idx += 1
            print(f"Backfilled reservation with {res.reference_code}")

    # Add lunch & dinner reservations if needed
    if not Reservation.objects.filter(shift='lunch').exists():
        Reservation.objects.create(
            reference_code="ROYAL-261116-LUN1",
            full_name="Baron Henri de Montmirail",
            email="henri.montmirail@chateau-paris.fr",
            phone="+33 1 42 68 55 00",
            date=timezone.now().date(),
            time="12:30",
            shift="lunch",
            guests="2 Convives",
            occasion="Déjeuner d'Affaires & Prestige",
            seating_area="Grand Salon d'Honneur",
            table_number="07",
            dietary_notes="Accords sans crustacés, préférence Meursault",
            status="confirmed",
            special_requests="Table d'angle discrète vue sur la cour d'honneur."
        )
        print("Created sample lunch reservation ROYAL-261116-LUN1")

    # 3. Blog Categories
    cat_art, _ = BlogCategory.objects.get_or_create(
        slug="haute-gastronomie",
        defaults={"name": "Haute Gastronomie", "description": "Réflexions sur l'art des sauces françaises, rôtisserie et découpes de tradition."}
    )
    cat_cellar, _ = BlogCategory.objects.get_or_create(
        slug="sommellerie-crus",
        defaults={"name": "Sommellerie & Grands Crus", "description": "Voyages au cœur des caves séculaires de Bourgogne, Bordeaux et Champagne."}
    )
    cat_heritage, _ = BlogCategory.objects.get_or_create(
        slug="chroniques-vendome",
        defaults={"name": "Chroniques de Vendôme", "description": "Histoire et secrets de l'hôtel particulier de 1788 et du Siècle des Lumières."}
    )

    # 4. Blog Posts
    BlogPost.objects.get_or_create(
        slug="art-des-sauces-nobles-secret-alexandre",
        defaults={
            "title": "L'Art des Sauces Nobles : Le Secret des Réductions d'Alexandre de Morbihan",
            "category": cat_art,
            "cover_image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
            "excerpt": "Pourquoi la haute cuisine française demeure avant tout une culture du fond, du fumet et de l'émulsion au beurre de baratte.",
            "content": """Dans les cuisines de L'Étoile Royale, aucune sauce ne tolère le moindre raccourci. Pendant que Paris sommeille sous la brume matinale, nos marmites en cuivre martelé frémissent déjà depuis dix-huit heures sur nos feux doux.\n\nLe Chef Alexandre de Morbihan l'affirme sans détours : « Une sauce n'est pas un nappage décoratif. C'est le sang, l'esprit et la signature mémorielle de chaque plat. » Pour notre Homard Bleu de Roscoff, les carapaces torréfiées sur sarments de vigne sont déglacées au vieux Marc de Bourgogne millésimé 1995 avant d'être montées minute au beurre cru d'Isigny.\n\nCe respect scrupuleux des densités aromatiques confère à nos créations cette longueur en bouche incomparable qui a valu à notre maison ses deux étoiles Michelin.""",
            "author_name": "Alexandre de Morbihan",
            "read_time": "6 min de lecture",
            "is_published": True,
            "views_count": 482,
        }
    )

    BlogPost.objects.get_or_create(
        slug="tresors-caves-voutees-millesimes-oublies",
        defaults={
            "title": "Trésors des Cryptes Voûtées : À la Recherche des Millésimes Oubliés",
            "category": cat_cellar,
            "cover_image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
            "excerpt": "Immersion dans les 3 200 références de notre cave historique sous la Place Vendôme, guidée par notre Chef Sommelier.",
            "content": """À six mètres sous le pavé de la Place Vendôme, la température reste immuablement calée à 12°C. Les voûtes en pierre calcaire de Saint-Leu abritent plus de trois mille flacons dont certaines bouteilles ont traversé les révolutions et les empires.\n\nNotre Chef Sommelier veille sur des trésors mythiques : Romanée-Conti 1978, Château Margaux 1945, et de rarissimes flacons de Champagne de vignerons élevés sous liège pendant plus de vingt ans.\n\nChaque soir, nous ouvrons ces joyaux avec une gestuelle de haute liturgie pour créer des accords mets et vins qui subliment la poésie culinaire du Chef Morbihan.""",
            "author_name": "Jean-Baptiste La Tour",
            "read_time": "5 min de lecture",
            "is_published": True,
            "views_count": 319,
        }
    )

    # 5. Custom Page
    CustomPage.objects.get_or_create(
        slug="privatisation-salons-vendome",
        defaults={
            "title": "Privatisation des Salons Vendôme",
            "meta_description": "Salons particuliers d'exception pour déjeuners diplomatiques, dîners de gala et réceptions privées à Paris.",
            "is_published": True,
            "blocks": [
                {
                    "id": "block-hero-01",
                    "type": "hero",
                    "headline": "PRIVATISATION DES SALONS VENDÔME",
                    "subheadline": "L'Exclusivité Absolue d'un Hôtel Particulier de 1788",
                    "tag": "HAUTE RÉCEPTION &bull; PLACE VENDÔME",
                    "button_text": "CONFIER VOTRE RÉCEPTION",
                    "button_link": "/contact",
                    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85"
                },
                {
                    "id": "block-features-01",
                    "type": "features",
                    "title": "PRESTATIONS & CAPACITÉS DES SALONS",
                    "columns": 3,
                    "items": [
                        {"title": "LE GRAND SALON D'HONNEUR", "description": "Jusqu'à 45 convives assis sous les lustres en cristal de Baccarat et les dorures d'époque."},
                        {"title": "LE SALON CONFIDENTIEL DU CHEF", "description": "Table impériale de 8 à 14 invités avec service de haute voltige dédié."},
                        {"title": "LA CAVE AUX GRANDS CRUS", "description": "Cocktails et dégustations privées jusqu'à 60 personnes au milieu des millésimes rares."}
                    ]
                },
                {
                    "id": "block-split-01",
                    "type": "split",
                    "title": "L'ART DE RECEVOIR SUR MESURE",
                    "description": "Menus gastronomiques conçus personnellement par le Chef Alexandre de Morbihan, accords œnologiques rares, majordome attitré et sécurité protocolaire sur demande.",
                    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
                },
                {
                    "id": "block-cta-01",
                    "type": "cta",
                    "title": "ORGANISER VOTRE ÉVÉNEMENT PRIVÉ",
                    "subtitle": "Notre Maître d'Hôtel dédié vous répond avec la plus stricte confidentialité sous 24 heures.",
                    "button_text": "DÉPOSER UNE DEMANDE PRIVÉE",
                    "button_link": "/contact"
                }
            ]
        }
    )
    print("Project 7 seed completed successfully!")

if __name__ == '__main__':
    seed()
