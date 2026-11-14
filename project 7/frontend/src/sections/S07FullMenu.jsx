import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07FullMenu() {
  const { content, openReservation } = useCMS();
  const menu = content?.menu || {};
  const tastingMenus = menu.tasting_menus || [];
  const categories = menu.categories || [];

  const [activeCat, setActiveCat] = useState(categories[0]?.id || 'entrees');

  const currentCategory = categories.find((c) => c.id === activeCat) || categories[0];

  return (
    <section id="carte" className="py-section" style={{ backgroundColor: '#202124', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{menu.subtitle || 'Dégustation Gastronomique'}</span>
          <h2 className="section-title">{menu.title || 'La Carte & Les Menus'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Une expérience rythmée par les saisons de nos maraîchers partenaires et les arrivages quotidiens des criées de Bretagne et de Vendée.
          </p>
        </div>

        {/* Tasting Menus Highlight Cards */}
        {tastingMenus.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '5rem',
            }}
          >
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
                    <span
                      style={{
                        color: 'var(--color-gold)',
                        fontFamily: 'var(--font-editorial)',
                        fontSize: '0.85rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.2rem',
                      }}
                    >
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
                  <div
                    style={{
                      background: 'rgba(84, 37, 47, 0.3)',
                      border: '1px solid rgba(197, 164, 109, 0.2)',
                      padding: '0.65rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      color: 'var(--color-gold-light)',
                      marginBottom: '1.75rem',
                    }}
                  >
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
        )}

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginBottom: '3rem',
                borderBottom: '1px solid rgba(197, 164, 109, 0.2)',
                paddingBottom: '1.25rem',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  style={{
                    background: activeCat === cat.id ? 'var(--color-burgundy)' : 'transparent',
                    color: activeCat === cat.id ? 'var(--color-ivory)' : 'var(--color-taupe)',
                    border: activeCat === cat.id ? '1px solid var(--color-gold)' : '1px solid transparent',
                    borderRadius: '4px',
                    padding: '0.65rem 1.4rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: activeCat === cat.id ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Dishes in Selected Category */}
            {currentCategory && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '2.5rem',
                  maxWidth: '1000px',
                  margin: '0 auto',
                }}
              >
                {currentCategory.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: '1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-ivory)', fontWeight: 500 }}>
                        {item.name}
                      </h4>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-gold)', fontWeight: 600, marginLeft: '1rem' }}>
                        {item.price}
                      </span>
                    </div>
                    <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
