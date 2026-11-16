import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage({ onNavigate }) {
  const { content, openReservationModal, openReservation, openDishModal, setSelectedDish } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const triggerDishModal = setSelectedDish || openDishModal;

  const sigSection = content?.editorial_sections?.s06_signatures || {};
  const dishes = content?.signature_dishes || [
    {
      id: 101,
      name: "Spicy Rose Tteokbokki",
      korean_name: "로제 떡볶이",
      slug: "spicy-rose-tteokbokki",
      price: "₩15,000",
      image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=800&q=85",
      description: "Traditional chewy cylindrical rice cakes and fish cakes simmered in our signature rich gochujang broth, smoothed with heavy cream, garlic, and melted mozzarella cheese.",
      spicy_level: 2,
      dietary_tags: "Spicy, Vegetarian Optional"
    },
    {
      id: 104,
      name: "Seoul Yangnyeom Fried Chicken",
      korean_name: "양념치킨",
      slug: "yangnyeom-chicken",
      price: "₩21,000",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85",
      description: "Fresh whole chicken marinated in ginger and sea salt, coated in light starch, double-fried to golden shatter, and tossed in house gochujang garlic reduction with crushed peanuts.",
      spicy_level: 2,
      dietary_tags: "Signature Item, Double-Fried"
    },
    {
      id: 107,
      name: "Sizzling Dolsot Bibimbap",
      korean_name: "돌솥 비빔밥",
      slug: "dolsot-bibimbap",
      price: "₩16,000",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=85",
      description: "Served piping hot in a heavy volcanic stone bowl where the bottom layer crisps into golden nurungji. Topped with seasoned beef, zucchini, shiitake, fernbrake, and spicy chili sauce.",
      spicy_level: 1,
      dietary_tags: "Vegetarian Optional, Gluten-Free"
    },
    {
      id: 109,
      name: "Seoul Army Base Stew (Budae Jjigae)",
      korean_name: "부대찌개",
      slug: "budae-jjigae",
      price: "₩26,000",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
      description: "The legendary post-war fusion stew bubbling tableside. Rich spicy anchovy-beef broth loaded with spam, sausages, rice cakes, enoki mushrooms, ramen noodles, and melted cheddar.",
      spicy_level: 2,
      dietary_tags: "Sharable for 2-3, Pork"
    }
  ];

  return (
    <div style={{ backgroundColor: '#111316', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(27, 29, 34, 0.9) 0%, #111316 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 46, 136, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#FF2E88',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-condensed)',
            }}
          >
            {sigSection.badge || 'SIGNATURE COMPOSITIONS'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#FFFFFF',
              margin: '0.6rem 0 0.5rem',
              fontWeight: 800,
            }}
          >
            {sigSection.title || 'Signature Street Food Masterpieces'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#FF2E88', margin: '1rem auto' }} />
          <p style={{ color: '#B6BAC2', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {sigSection.description || 'Our most celebrated creations that define late-night Hongdae pocha culture—double-fried chicken, bubbling stews, and rose tteokbokki.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {dishes.map((dish, idx) => {
            const photo = dish.image || dish.image_url || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85';

            return (
              <div
                key={dish.id || idx}
                onClick={() => triggerDishModal && triggerDishModal(dish)}
                style={{
                  backgroundColor: '#1B1D22',
                  borderRadius: '8px',
                  border: '1px solid rgba(246, 244, 240, 0.12)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.borderColor = '#21D4E8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(246, 244, 240, 0.12)';
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={photo}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(17, 19, 22, 0.92)',
                      border: '1px solid #FF2E88',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      color: '#FFB347',
                      fontSize: '1rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {dish.price}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: '#FF2E88',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-condensed)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    ★ Street Icon
                  </div>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {dish.korean_name && (
                    <span style={{ fontSize: '0.85rem', color: '#21D4E8', fontFamily: 'var(--font-korean)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      {dish.korean_name}
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      color: '#FFFFFF',
                      marginBottom: '0.75rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {dish.name}
                  </h3>
                  <p style={{ color: '#B6BAC2', fontSize: '0.9rem', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
                    {dish.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(246, 244, 240, 0.1)',
                      paddingTop: '0.85rem',
                      fontSize: '0.82rem',
                    }}
                  >
                    <span style={{ color: '#777B83' }}>{dish.dietary_tags}</span>
                    <span style={{ color: '#FF2E88', fontWeight: 700 }}>Inspect Dish →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            margin: '5rem auto 2rem',
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, #1B1D22 0%, #111316 100%)',
            border: '1px solid rgba(255, 46, 136, 0.4)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>
            Taste the Flavours of Hongdae Tonight
          </h2>
          <p style={{ color: '#B6BAC2', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Prepared fresh to order in double-basket fryers and roaring woks. Available during both Daylight Lunch and Twilight Pocha services.
          </p>
          <button
            onClick={triggerReservation}
            style={{
              backgroundColor: '#FF2E88',
              color: '#FFFFFF',
              padding: '14px 34px',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(255, 46, 136, 0.4)',
            }}
          >
            Reserve Your Pocha Table
          </button>
        </div>
      </div>
    </div>
  );
}
