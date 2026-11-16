import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchMenuItems } from '../services/api';
import { Search } from 'lucide-react';

export default function MenuPage({ onNavigate }) {
  const { data, setSelectedDish, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const categories = data?.categories || [];
  const [activeCat, setActiveCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const res = await fetchMenuItems(activeCat, searchTerm);
      if (res && res.length > 0) {
        setItems(res);
      } else {
        let allDishes = [];
        if (categories && categories.length > 0) {
          categories.forEach((c) => {
            if (c.items && c.items.length > 0) {
              c.items.forEach((it) => {
                allDishes.push({
                  ...it,
                  category_name: c.name,
                  category_slug: c.slug
                });
              });
            }
          });
        }
        if (allDishes.length === 0 && data.featured_steaks) {
          allDishes = [...data.featured_steaks];
        }

        let combined = allDishes;
        if (activeCat !== 'all') {
          combined = combined.filter((i) => i.category_slug === activeCat || i.category === activeCat);
        }
        if (searchTerm) {
          const q = searchTerm.toLowerCase();
          combined = combined.filter((i) => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
        }
        setItems(combined.length > 0 ? combined : (data.featured_steaks || []));
      }
      setLoading(false);
    };

    loadItems();
  }, [activeCat, searchTerm, categories, data]);

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 50px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(148, 115, 79, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '840px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            MANHATTAN CULINARY REPERTOIRE
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '18px', color: 'var(--color-ivory)' }}>
            The Complete Steakhouse Menu
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            From 60-day Himalayan salt dry-aged prime loins to live-fire hearth starters and rare vintage wines.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ padding: '30px 0', backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: '70px', zIndex: 40, backdropFilter: 'blur(10px)' }}>
        <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            <button
              onClick={() => setActiveCat('all')}
              style={{
                background: activeCat === 'all' ? 'var(--color-bronze)' : 'transparent',
                color: activeCat === 'all' ? '#101010' : 'var(--color-taupe)',
                border: activeCat === 'all' ? '1px solid var(--color-bronze)' : '1px solid var(--border-subtle)',
                padding: '8px 18px',
                borderRadius: '2px',
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              All Selections
            </button>
            {categories.map((c) => (
              <button
                key={c.id || c.slug}
                onClick={() => setActiveCat(c.slug)}
                style={{
                  background: activeCat === c.slug ? 'var(--color-bronze)' : 'transparent',
                  color: activeCat === c.slug ? '#101010' : 'var(--color-taupe)',
                  border: activeCat === c.slug ? '1px solid var(--color-bronze)' : '1px solid var(--border-subtle)',
                  padding: '8px 18px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-taupe)' }} />
            <input
              type="text"
              placeholder="Search dishes, cuts, caviar, oysters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 14px 10px 38px', background: 'var(--color-graphite)', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', outline: 'none', fontSize: '13px', fontFamily: 'var(--font-heading)' }}
            />
          </div>

        </div>
      </section>

      {/* Menu Cards Grid */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="section-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-taupe)' }}>
              No dishes found matching your criteria.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedDish(item)}
                  style={{
                    background: 'var(--color-charcoal)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transition: 'transform 0.25s ease, border-color 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-champagne)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Meal Photo */}
                  <div style={{ width: '100px', height: '100px', borderRadius: '3px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)', background: '#000' }}>
                    <img
                      src={item.image || item.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-ivory)', margin: 0 }}>
                        {item.name}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 800, color: 'var(--color-champagne)', marginLeft: '12px' }}>
                        ${item.price}
                      </span>
                    </div>

                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '6px' }}>
                      {item.cut_type || item.category_name || 'Artisan Dish'}
                    </div>

                    <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      {item.short_description || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Footer Callout */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Reserve Your Table at Charred & Prime
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
            Join us in Manhattan Midtown East. All signature steaks are seared to order over live white oak coals.
          </p>
          <button
            onClick={() => triggerReservation('Menu Explorer Booking')}
            style={{ padding: '14px 34px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table Now
          </button>
        </div>
      </section>

    </div>
  );
}
