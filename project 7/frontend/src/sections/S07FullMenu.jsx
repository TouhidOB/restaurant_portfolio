import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07FullMenu() {
  const { content, openReservation, setSelectedDish } = useCMS();
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

            {/* Dishes in Selected Category with Haute Cuisine Meal Photography */}
            {currentCategory && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                  gap: '2rem',
                  maxWidth: '1100px',
                  margin: '0 auto',
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
                    <div style={{ height: '190px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85'}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(84, 37, 47, 0.9)',
                          color: 'var(--color-gold-light)',
                          border: '1px solid var(--color-gold)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '1rem',
                        }}
                      >
                        {item.price}
                      </span>
                    </div>

                    <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.2rem',
                          color: 'var(--color-ivory)',
                          fontWeight: 500,
                          marginBottom: '0.5rem',
                          lineHeight: '1.35',
                        }}
                      >
                        {item.name}
                      </h4>
                      <p
                        style={{
                          color: 'var(--color-taupe)',
                          fontSize: '0.86rem',
                          lineHeight: '1.55',
                          flexGrow: 1,
                          marginBottom: '1rem',
                        }}
                      >
                        {item.desc}
                      </p>

                      {item.wine_pairing && (
                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: 'var(--color-gold)',
                            background: 'rgba(197, 164, 109, 0.08)',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '4px',
                            border: '1px solid rgba(197, 164, 109, 0.15)',
                            marginBottom: '0.9rem',
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
                          paddingTop: '0.75rem',
                          marginTop: 'auto',
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Haute Gastronomie
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-light)', fontWeight: 500 }}>
                          Voir le plat →
                        </span>
                      </div>
                    </div>
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
