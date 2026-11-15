import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage() {
  const { content, openReservation, setSelectedDish } = useCMS();
  const menu = content?.menu || {};
  const categories = menu.categories || [];

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'starters');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  const displayedItems = (currentCategory?.items || []).filter((item) => {
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
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.4) 0%, #111314 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{menu.subtitle || 'Crafted Daily In Our Open Kitchen'}</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            {menu.title || 'Full Menu Explorer'}
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Prime dry-aged beef, fourteen-hour smoked brisket, artisanal hot honey pizza, and blazing iron skillet sides.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1150px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Search Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search dishes, smoked meats, craft pairings..."
            style={{
              width: '100%',
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--color-graphite, #252729)',
              border: '1px solid var(--color-border, #3a3d40)',
              borderRadius: '2px',
              color: 'var(--color-offwhite, #F1EEE7)',
              fontFamily: 'var(--font-body, Manrope)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-copper, #B87345)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border, #3a3d40)')}
          />
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '3.5rem',
              borderBottom: '2px solid var(--color-brick, #914D37)',
              paddingBottom: '1.25rem',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? 'var(--color-copper, #B87345)' : 'transparent',
                  color: activeCategory === cat.id ? 'var(--color-black, #111314)' : 'var(--color-concrete, #B7B4AC)',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '0.65rem 1.4rem',
                  fontFamily: 'var(--font-body, Manrope)',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items Grid with Meal Photography */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '5rem',
          }}
        >
          {displayedItems.length > 0 ? (
            displayedItems.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setSelectedDish(item)}
                style={{
                  backgroundColor: 'var(--color-black-card, #181A1C)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-copper, #B87345)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {item.image && (
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#1c1e20' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        right: '0.85rem',
                        background: 'rgba(17, 19, 20, 0.85)',
                        border: '1px solid var(--color-copper, #B87345)',
                        color: 'var(--color-copper, #B87345)',
                        fontFamily: 'var(--font-display, Oswald)',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '2px',
                      }}
                    >
                      {item.price}
                    </div>
                  </div>
                )}

                <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, Oswald)',
                        fontSize: '1.3rem',
                        color: 'var(--color-offwhite, #F1EEE7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {item.name}
                    </h3>
                    {!item.image && (
                      <span
                        style={{
                          fontFamily: 'var(--font-display, Oswald)',
                          fontSize: '1.3rem',
                          color: 'var(--color-copper, #B87345)',
                          fontWeight: 700,
                        }}
                      >
                        {item.price}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      color: 'var(--color-concrete, #B7B4AC)',
                      fontSize: '0.88rem',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      flex: 1,
                    }}
                  >
                    {item.desc || item.description}
                  </p>

                  {item.pairing && (
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--color-amber, #E9A24B)',
                        marginBottom: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span>🍺</span>
                      <span>Pairing: {item.pairing}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.dietary ? (
                      <span
                        style={{
                          color: 'var(--color-copper, #B87345)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          fontWeight: 800,
                        }}
                      >
                        ✦ {item.dietary}
                      </span>
                    ) : <span />}

                    <span
                      style={{
                        color: 'var(--color-concrete, #B7B4AC)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-concrete, #B7B4AC)', padding: '3rem' }}>
              No dishes found matching "{searchQuery}".
            </div>
          )}
        </div>

        {/* Bottom Reservation CTA */}
        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'var(--color-black-card, #181A1C)',
            border: '2px solid var(--color-brick, #914D37)',
            padding: '3.5rem 2rem',
            borderRadius: '2px',
          }}
        >
          <span className="section-label">Join The Table</span>
          <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.5rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '1rem' }}>
            Reserve Your Smokehouse Experience
          </h2>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', maxWidth: '650px', margin: '0 auto 2rem', fontSize: '1rem' }}>
            Experience our open wood hearth and pitmaster tasting counters in person. Both lunch and dinner shifts available.
          </p>
          <button onClick={() => openReservation()} className="btn-primary" style={{ padding: '0.9rem 2.2rem' }}>
            Book A Table Now
          </button>
        </div>
      </div>
    </div>
  );
}
