import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07Menu() {
  const { content, openReservation, setSelectedDish } = useCMS();
  const menu = content?.menu || {};
  const categories = menu.categories || [];
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCat = categories[activeTab] || categories[0] || {};

  const displayedItems = (currentCat.items || []).filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.desc && item.desc.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.dietary && item.dietary.toLowerCase().includes(q)) ||
      (item.pairing && item.pairing.toLowerCase().includes(q))
    );
  });

  return (
    <section id="menu" className="section-pad" style={{ backgroundColor: 'var(--color-midnight)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">{menu.subtitle || 'Tasting Menus, À La Carte & Rare Reserve Cellar'}</span>
          <h2 className="section-title">{menu.title || 'Curated Seasonal Menus'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            Artfully composed courses crafted from rare seasonal harvests, certified Miyazaki A5 Wagyu, and global coastal treasures.
          </p>
        </div>

        {/* Live Search Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search rooftop dishes, Wagyu, celestial cocktails..."
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--color-midnight-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              color: 'var(--color-cloud-ivory)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-champagne)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={cat.id || idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '30px',
                  border: isActive ? '1px solid var(--color-champagne)' : '1px solid var(--color-border)',
                  background: isActive ? 'var(--color-champagne)' : 'rgba(16, 28, 44, 0.7)',
                  color: isActive ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Category Overview Bar */}
        {currentCat && (
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto 2.5rem',
              textAlign: 'center',
              padding: '1.25rem 2rem',
              background: 'rgba(38, 63, 90, 0.2)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: '4px',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-champagne)', marginBottom: '0.25rem' }}>
              {currentCat.name}
            </h3>
            {currentCat.price && (
              <span style={{ fontSize: '1.15rem', fontFamily: 'var(--font-accent)', color: 'var(--color-cloud-ivory)', fontWeight: 600, marginRight: '1rem' }}>
                {currentCat.price}
              </span>
            )}
            {currentCat.pairing && (
              <span style={{ fontSize: '0.88rem', color: 'var(--color-sunset-copper)', fontFamily: 'var(--font-accent)' }}>
                • {currentCat.pairing}
              </span>
            )}
          </div>
        )}

        {/* Menu Items Grid with Haute Meal Photography */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1150px',
            margin: '0 auto',
          }}
        >
          {displayedItems.length > 0 ? (
            displayedItems.map((item, itemIdx) => (
              <div
                key={item.id || itemIdx}
                onClick={() => setSelectedDish && setSelectedDish(item)}
                style={{
                  backgroundColor: 'var(--color-midnight-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-champagne)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Dish Photo */}
                {item.image && (
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#0a121d' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(16, 28, 44, 0.95) 0%, transparent 55%)',
                      }}
                    />
                    {item.dietary && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(16, 28, 44, 0.85)',
                          border: '1px solid var(--color-champagne)',
                          color: 'var(--color-champagne)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '20px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.dietary}
                      </span>
                    )}
                    {item.price && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          backgroundColor: 'var(--color-champagne)',
                          color: 'var(--color-midnight-dark)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '800',
                          fontFamily: 'var(--font-accent)',
                        }}
                      >
                        {item.price}
                      </span>
                    )}
                  </div>
                )}

                {/* Dish Info */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-cloud-ivory)', margin: 0 }}>
                      {item.name}
                    </h3>
                    {!item.image && item.price && (
                      <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.15rem', color: 'var(--color-champagne)', fontWeight: 700 }}>
                        {item.price}
                      </span>
                    )}
                  </div>

                  <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.88rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1rem' }}>
                    {item.desc || item.description}
                  </p>

                  {item.pairing && (
                    <div
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: 'rgba(196, 122, 86, 0.12)',
                        borderLeft: '2px solid var(--color-sunset-copper)',
                        borderRadius: '2px',
                        fontSize: '0.78rem',
                        color: 'var(--color-champagne)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span>🍷</span>
                      <span>Pairing: {item.pairing}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.85rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                      View Details &rarr;
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openReservation();
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-cloud-ivory)',
                        borderRadius: '20px',
                        padding: '0.3rem 0.8rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-champagne)';
                        e.currentTarget.style.color = 'var(--color-champagne)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = 'var(--color-cloud-ivory)';
                      }}
                    >
                      Book Table
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: 'var(--color-twilight-slate)' }}>
              No dishes found matching &quot;{searchQuery}&quot;. Please adjust your search criteria.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => openReservation()}
            className="btn-skyline-primary"
            style={{ padding: '0.9rem 2.5rem' }}
          >
            Reserve Table on Level 54 &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
