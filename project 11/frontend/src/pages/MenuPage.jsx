import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage({ onNavigate }) {
  const { content, categories, menuItems, openReservation, setSelectedDish } = useCMS();
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allItems = useMemo(() => {
    if (menuItems && menuItems.length > 0) return menuItems;
    const sigDrinks = content?.signature_drinks?.drinks || [];
    if (sigDrinks.length > 0) {
      return sigDrinks.map((d, i) => ({
        id: d.id || `dish-${i}`,
        name: d.name,
        price: d.price ? String(d.price).replace(/[^0-9.]/g, '') : '7.50',
        currency: '$',
        description: d.description,
        category_name: d.category || 'Specialty Coffee',
        category_slug: d.category ? d.category.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'specialty-coffee',
        image: d.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
        dietary_tags: d.ingredients || ['Botanical', 'House Craft'],
      }));
    }
    return [
      {
        id: 'elderflower-tonic',
        name: 'Elderflower Tonic Espresso',
        price: '7.50',
        currency: '$',
        description: 'Chilled double-shot Ethiopian Yirgacheffe poured over artisanal elderflower tonic and fresh rosemary.',
        category_name: 'Cold Brew & Infusions',
        category_slug: 'cold-brew-infusions',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'rosemary-latte',
        name: 'Smoked Rosemary Sea Salt Latte',
        price: '6.75',
        currency: '$',
        description: 'Espresso with steamed oat milk infused with torch-smoked organic garden rosemary and flaky Maldon sea salt.',
        category_name: 'Specialty Coffee',
        category_slug: 'specialty-coffee',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'matcha-cloud',
        name: 'Ceremonial Uji Matcha Cloud',
        price: '7.00',
        currency: '$',
        description: 'First-harvest stone-ground matcha whisked with warm almond milk, capped with salted vanilla cold foam.',
        category_name: 'Artisanal Teas',
        category_slug: 'matcha-herbal-teas',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'cascara-cold-brew',
        name: 'Cascara & Heirloom Rose Cold Brew',
        price: '6.50',
        currency: '$',
        description: '24-hour slow immersion cold brew steeped with dried organic coffee cherries and Damascus rose petals.',
        category_name: 'Cold Brew & Infusions',
        category_slug: 'cold-brew-infusions',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=85',
        is_signature: false,
      },
      {
        id: 'greenhouse-avocado',
        name: 'Glasshouse Tartine with Poached Organic Egg',
        price: '14.50',
        currency: '$',
        description: 'Crushed Hass avocado on toasted country sourdough, garden microgreens, Persian feta, and za’atar oil.',
        category_name: 'Greenhouse Brunch',
        category_slug: 'greenhouse-brunch',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'cardamom-bun',
        name: 'Swedish Braided Cardamom Brioche',
        price: '5.50',
        currency: '$',
        description: 'Slow-fermented braided sweet brioche baked fresh at sunrise, scented with freshly ground green cardamom and pearl sugar.',
        category_name: 'Fresh Pastries',
        category_slug: 'botanical-pastries',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
        is_signature: false,
      }
    ];
  }, [menuItems, content]);

  const catList = useMemo(() => {
    if (categories && categories.length > 0) {
      return [{ id: 'all', slug: 'all', name: 'All Offerings' }, ...categories];
    }
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
      if (selectedCatId !== 'all') {
        const itemCatSlug = String(item.category_slug || item.category || '').toLowerCase();
        const itemCatName = String(item.category_name || item.category || '').toLowerCase();
        const selected = String(selectedCatId).toLowerCase();
        const match = itemCatSlug.includes(selected) || itemCatName.includes(selected);
        if (!match) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const n = String(item.name || '').toLowerCase();
        const d = String(item.description || item.botanical_notes || '').toLowerCase();
        return n.includes(q) || d.includes(q);
      }
      return true;
    });
  }, [allItems, selectedCatId, searchQuery]);

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.45) 0%, #1A2B24 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#A87958',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            CURATED BOTANICAL REPERTOIRE
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '3.5rem',
              letterSpacing: '0.04em',
              color: '#F4F0E6',
              margin: '0.8rem 0 1.25rem',
            }}
          >
            Seasonal Glasshouse Café Menu
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            Single-origin coffees, living herb infusions, wild elderflower tonics, and organic sourdough brunch plates.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '3.5rem auto', padding: '0 1.5rem' }}>
        {/* Search Bar */}
        <div style={{ maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search coffee, botanical tonics, brunch plates..."
            style={{
              width: '100%',
              padding: '0.9rem 1.25rem',
              backgroundColor: '#1E332B',
              border: '1px solid rgba(166, 181, 160, 0.3)',
              borderRadius: '3px',
              color: '#F4F0E6',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#A87958')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(166, 181, 160, 0.3)')}
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
          {catList.map((cat) => {
            const active = selectedCatId === (cat.slug || cat.id);
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => setSelectedCatId(cat.slug || cat.id)}
                style={{
                  padding: '0.65rem 1.4rem',
                  backgroundColor: active ? '#263F35' : '#1E332B',
                  color: active ? '#F4F0E6' : '#A6B5A0',
                  border: active ? '1px solid #A87958' : '1px solid rgba(166, 181, 160, 0.2)',
                  borderRadius: '2px',
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Dish Grid with Meal Photography */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#1E332B', borderRadius: '4px', border: '1px solid rgba(166, 181, 160, 0.2)' }}>
            <p style={{ color: '#D8D2C5', fontSize: '1.1rem' }}>
              No botanical offerings matched your search criteria.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredItems.map((dish, idx) => {
              const name = dish.name;
              const desc = dish.description || dish.botanical_notes;
              const img = dish.image || dish.image_url || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85';
              const priceText = dish.price ? (String(dish.price).includes('$') ? dish.price : `$${Number(String(dish.price).replace(/[^0-9.]/g, '')).toFixed(2)}`) : '$7.50';

              return (
                <div
                  key={dish.id || idx}
                  onClick={() => setSelectedDish(dish)}
                  style={{
                    backgroundColor: '#1E332B',
                    borderRadius: '4px',
                    border: '1px solid rgba(166, 181, 160, 0.25)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#A87958';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(166, 181, 160, 0.25)';
                  }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={img}
                      alt={name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {dish.is_signature && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: '#A87958',
                          color: '#F4F0E6',
                          padding: '3px 8px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          borderRadius: '2px',
                        }}
                      >
                        Signature
                      </span>
                    )}
                    {priceText && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(26, 43, 36, 0.92)',
                          color: '#A6B5A0',
                          padding: '3px 10px',
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          borderRadius: '2px',
                          border: '1px solid rgba(166, 181, 160, 0.3)',
                        }}
                      >
                        {priceText}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, "Cormorant Garamond")',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: '#F4F0E6',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {name}
                    </h3>
                    <p style={{ color: '#D8D2C5', fontSize: '0.88rem', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                      {desc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(166, 181, 160, 0.15)' }}>
                      <span style={{ fontSize: '0.78rem', color: '#A87958', fontWeight: 600 }}>
                        View Notes &rarr;
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openReservation();
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#A87958',
                          border: '1px solid #A87958',
                          padding: '3px 10px',
                          borderRadius: '2px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#A87958';
                          e.target.style.color = '#F4F0E6';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#A87958';
                        }}
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
