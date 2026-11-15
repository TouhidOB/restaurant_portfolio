import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage() {
  const { content, openReservation, setSelectedDish } = useCMS();
  const menu = content?.menu || {};
  const tastingMenus = menu.tasting_menus || [];
  const categories = menu.categories || [];

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'entrees');

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {menu.subtitle || 'Dégustation Gastronomique'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {menu.title || 'La Carte & Les Menus'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            Une cuisine d'auteur guidée par la fraîcheur des arrivages marins, le gibier noble et les maraîchages rares d'Île-de-France.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Tasting Menus */}
        {tastingMenus.length > 0 && (
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
                Formules d'Exception
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-ivory)', marginTop: '0.4rem' }}>
                Les Grands Menus Dégustation
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {tastingMenus.map((tm, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(145deg, #28292D 0%, #1F1B1F 100%)',
                    border: '1px solid rgba(197, 164, 109, 0.45)',
                    borderRadius: '10px',
                    padding: '2.5rem',
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-editorial)', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                        {tm.courses}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-ivory)' }}>
                        {tm.name}
                      </h3>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                      {tm.price}
                    </div>
                  </div>

                  <p style={{ color: 'var(--color-ivory-dim)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                    {tm.description}
                  </p>

                  {tm.wine_pairing_price && (
                    <div style={{ background: 'rgba(84, 37, 47, 0.3)', border: '1px solid rgba(197, 164, 109, 0.2)', padding: '0.65rem 1rem', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--color-gold-light)', marginBottom: '1.75rem' }}>
                      ✦ {tm.wine_pairing_price}
                    </div>
                  )}

                  <button
                    onClick={() => openReservation(tm.name)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.8rem', fontSize: '0.85rem' }}
                  >
                    Réserver Ce Menu
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Navigation Tabs */}
        {categories.length > 0 && (
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
                La Carte à la Ligne
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-ivory)', marginTop: '0.4rem' }}>
                Répertoire Photographique des Plats
              </h2>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.8rem',
                flexWrap: 'wrap',
                marginBottom: '3rem',
                borderBottom: '1px solid rgba(197, 164, 109, 0.2)',
                paddingBottom: '1.5rem',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    background: activeCategory === cat.id ? 'var(--color-burgundy)' : 'transparent',
                    color: activeCategory === cat.id ? 'var(--color-ivory)' : 'var(--color-taupe)',
                    border: activeCategory === cat.id ? '1px solid var(--color-gold)' : '1px solid transparent',
                    borderRadius: '4px',
                    padding: '0.7rem 1.5rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    fontWeight: activeCategory === cat.id ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Dishes with Meal Photography Cards */}
            {currentCategory && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2.5rem',
                }}
              >
                {currentCategory.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedDish(item)}
                    style={{
                      backgroundColor: '#25262A',
                      border: '1px solid rgba(197, 164, 109, 0.25)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.6)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.25)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
                    }}
                  >
                    <div style={{ height: '210px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85'}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(84, 37, 47, 0.9)',
                          color: 'var(--color-gold-light)',
                          border: '1px solid var(--color-gold)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '1.05rem',
                        }}
                      >
                        {item.price}
                      </span>
                    </div>

                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                          color: 'var(--color-ivory)',
                          fontWeight: 500,
                          marginBottom: '0.6rem',
                          lineHeight: '1.35',
                        }}
                      >
                        {item.name}
                      </h4>
                      <p
                        style={{
                          color: 'var(--color-taupe)',
                          fontSize: '0.88rem',
                          lineHeight: '1.6',
                          flexGrow: 1,
                          marginBottom: '1rem',
                        }}
                      >
                        {item.desc}
                      </p>

                      {item.wine_pairing && (
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-gold)',
                            background: 'rgba(197, 164, 109, 0.08)',
                            padding: '0.45rem 0.8rem',
                            borderRadius: '4px',
                            border: '1px solid rgba(197, 164, 109, 0.15)',
                            marginBottom: '1rem',
                          }}
                        >
                          🍷 {item.wine_pairing}
                        </div>
                      )}

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          paddingTop: '0.85rem',
                          marginTop: 'auto',
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Haute Gastronomie
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-gold-light)', fontWeight: 500 }}>
                          Inspecter le plat →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dietary / Allergens Note */}
        <div style={{ backgroundColor: '#18191B', borderRadius: '8px', padding: '1.75rem', border: '1px solid rgba(197, 164, 109, 0.2)', textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', margin: 0 }}>
            ✦ Tous nos plats peuvent être adaptés selon vos contraintes allergiques ou alimentaires. Prière de le signaler lors de votre réservation au Maître d'Hôtel. Prix nets en euros, taxes et service compris.
          </p>
        </div>
      </div>
    </div>
  );
}
