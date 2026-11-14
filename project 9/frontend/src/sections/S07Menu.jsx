import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07Menu() {
  const { content, openReservation } = useCMS();
  const menu = content?.menu || {};
  const categories = menu.categories || [];
  const [activeTab, setActiveTab] = useState(0);

  const currentCat = categories[activeTab] || categories[0] || {};

  return (
    <section id="menu" className="section-pad" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{menu.subtitle || 'Tasting Menus, À La Carte & Rare Reserve Cellar'}</span>
          <h2 className="section-title">{menu.title || 'Curated Seasonal Menus'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            Artfully composed courses crafted from rare seasonal harvests, certified Miyazaki A5 Wagyu, and global coastal treasures.
          </p>
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

        {/* Active Category Display */}
        {currentCat && (
          <div
            style={{
              maxWidth: '880px',
              margin: '0 auto',
              background: 'var(--color-midnight-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '3rem 2.5rem',
              boxShadow: '0 20px 45px rgba(0,0,0,0.4)',
            }}
          >
            {/* Category Header */}
            <div style={{ textAlign: 'center', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-champagne)', marginBottom: '0.35rem' }}>
                {currentCat.name}
              </h3>
              {currentCat.price && (
                <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-accent)', color: 'var(--color-cloud-ivory)', fontWeight: 600 }}>
                  {currentCat.price}
                </div>
              )}
              {currentCat.pairing && (
                <div style={{ fontSize: '0.84rem', color: 'var(--color-sunset-copper)', fontFamily: 'var(--font-accent)', marginTop: '0.25rem' }}>
                  {currentCat.pairing}
                </div>
              )}
            </div>

            {/* Dish / Drink Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {currentCat.items &&
                currentCat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      paddingBottom: itemIdx < currentCat.items.length - 1 ? '1.5rem' : '0',
                      borderBottom: itemIdx < currentCat.items.length - 1 ? '1px dashed var(--color-border-subtle)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-cloud-ivory)' }}>
                        {item.name}
                      </h4>
                      {item.price && (
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.15rem', color: 'var(--color-champagne)', fontWeight: 700 }}>
                          {item.price}
                        </span>
                      )}
                    </div>
                    <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.75rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              <button
                onClick={() => openReservation()}
                className="btn-skyline-primary"
                style={{ padding: '0.85rem 2.2rem' }}
              >
                Reserve For {currentCat.name.split('(')[0]}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
