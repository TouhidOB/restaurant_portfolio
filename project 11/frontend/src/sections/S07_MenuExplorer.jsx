import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07_MenuExplorer() {
  const { content, categories, menuItems, setSelectedDish, openReservation } = useCMS();
  const me = content?.menu_explorer || {};

  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback dishes if API hasn't loaded yet
  const allItems = useMemo(() => {
    if (menuItems && menuItems.length > 0) return menuItems;
    // Map signature drinks as default fallback items
    return (content?.signature_drinks?.drinks || []).map((d, idx) => ({
      ...d,
      id: idx + 1,
      category_name: d.category,
      category_slug: d.category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      dietary_tags: ['Botanical', 'House Craft'],
    }));
  }, [menuItems, content]);

  const catList = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    return [
      { id: 'all', slug: 'all', name: 'All Offerings' },
      { id: 'coffee', slug: 'specialty-coffee', name: 'Specialty Coffee' },
      { id: 'cold-brew', slug: 'cold-brew-infusions', name: 'Cold Brew & Infusions' },
      { id: 'matcha', slug: 'matcha-herbal-teas', name: 'Artisanal Teas' },
      { id: 'brunch', slug: 'greenhouse-brunch', name: 'Greenhouse Brunch' },
      { id: 'pastries', slug: 'botanical-pastries', name: 'Fresh Pastries' },
    ];
  }, [categories]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (selectedCat !== 'all') {
        const itemCatSlug = String(item.category_slug || item.category || '').toLowerCase();
        const itemCatName = String(item.category_name || item.category || '').toLowerCase();
        const target = selectedCat.toLowerCase();
        const match = itemCatSlug.includes(target) || itemCatName.includes(target);
        if (!match) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = String(item.name || '').toLowerCase();
        const desc = String(item.description || '').toLowerCase();
        const notes = String(item.botanical_notes || '').toLowerCase();
        return name.includes(q) || desc.includes(q) || notes.includes(q);
      }
      return true;
    });
  }, [allItems, selectedCat, searchQuery]);

  return (
    <section
      id="menu"
      aria-label="Botanical Glasshouse Menu Explorer"
      style={{
        padding: '120px 0',
        backgroundColor: '#263F35',
        color: '#FAF7F0',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-sage, #A6B5A0)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {me.subtitle || 'CURATED CAFÉ MENU'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}
          >
            {me.title || 'Seasonal Botanical Offerings'}
          </h2>
          <p style={{ fontSize: '14.5px', color: 'rgba(250, 247, 240, 0.78)', margin: '0 auto' }}>
            {me.description || 'All dairy is locally sourced or house-made organic plant milks. Pastries baked fresh daily at dawn.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
            <input
              type="text"
              placeholder="Search coffee, matcha, brunch or herbs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 42px',
                backgroundColor: 'rgba(26, 43, 36, 0.85)',
                border: '1px solid rgba(166, 181, 160, 0.35)',
                borderRadius: '2px',
                color: '#FAF7F0',
                fontSize: '13.5px',
                outline: 'none',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-sage)',
                fontSize: '15px',
              }}
            >
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(250, 247, 240, 0.6)',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '8px 18px',
                backgroundColor: selectedCat === 'all' ? 'var(--color-copper, #A87958)' : 'rgba(26, 43, 36, 0.6)',
                color: '#FFFFFF',
                border: '1px solid rgba(166, 181, 160, 0.3)',
                borderRadius: '2px',
                fontSize: '12px',
                letterSpacing: '0.08em',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              All Offerings
            </button>
            {catList.filter((c) => c.slug !== 'all').map((cat) => {
              const isActive = selectedCat === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCat(cat.slug)}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: isActive ? 'var(--color-copper, #A87958)' : 'rgba(26, 43, 36, 0.6)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(166, 181, 160, 0.3)',
                    borderRadius: '2px',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'rgba(26, 43, 36, 0.5)', borderRadius: '3px' }}>
            <p style={{ color: 'rgba(250, 247, 240, 0.7)' }}>No items match your search. Please adjust your criteria.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredItems.map((item, idx) => {
              const priceText = item.price ? `${item.currency || '$'}${item.price}` : '';
              return (
                <div
                  key={item.id || idx}
                  onClick={() => setSelectedDish(item)}
                  style={{
                    backgroundColor: 'rgba(26, 43, 36, 0.85)',
                    borderRadius: '2px',
                    border: '1px solid rgba(166, 181, 160, 0.25)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-copper)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(166, 181, 160, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {item.image && (
                    <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {item.is_signature && (
                        <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'var(--color-copper)', color: '#fff', padding: '3px 8px', fontSize: '9.5px', fontWeight: 700, borderRadius: '2px' }}>
                          Signature
                        </span>
                      )}
                    </div>
                  )}

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#FAF7F0', margin: 0 }}>
                        {item.name}
                      </h3>
                      {priceText && (
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--color-sage)', whiteSpace: 'nowrap' }}>
                          {priceText}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '12.5px', lineHeight: 1.6, color: 'rgba(250, 247, 240, 0.75)', margin: '0 0 14px 0', flex: 1 }}>
                      {item.description}
                    </p>

                    {item.botanical_notes && (
                      <div style={{ fontSize: '11px', color: 'var(--color-sage)', marginBottom: '14px', fontStyle: 'italic' }}>
                        🌱 {item.botanical_notes}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(166, 181, 160, 0.2)', paddingTop: '10px', fontSize: '11px', color: 'var(--color-copper)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                      <span>View Profile</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA Bottom */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button
            onClick={() => openReservation()}
            style={{
              padding: '14px 32px',
              backgroundColor: 'var(--color-copper, #A87958)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8c5f42')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-copper, #A87958)')}
          >
            Reserve a Table to Experience Our Menu
          </button>
        </div>
      </div>
    </section>
  );
}
