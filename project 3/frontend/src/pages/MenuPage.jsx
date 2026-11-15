import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Utensils, Wine, Sparkles, Calendar, Search } from 'lucide-react';

export default function MenuPage() {
  const { data, setSelectedDish, openReservation } = useCMS();
  const categories = data.menu_categories || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all menu items
  const allItems = [];
  categories.forEach((cat) => {
    (cat.items || []).forEach((item) => {
      allItems.push({ ...item, categoryName: cat.name, categorySlug: cat.slug });
    });
  });

  const filteredItems = allItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.categorySlug === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.english_name && item.english_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 60px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '16px' }}>
            <Utensils size={13} />
            <span>Seasonal Coastal Gastronomy</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '18px', fontWeight: 600 }}>
            The Culinary Repertoire
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '680px', margin: '0 auto 26px' }}>
            Wild seafood harvested at dawn by local Amalfi fishermen, handmade artisanal pasta, and volcanic terroir pairings.
          </p>

          <button onClick={openReservation} className="btn-gold" style={{ padding: '12px 28px', fontSize: '12.5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Calendar size={15} style={{ marginRight: '8px', display: 'inline' }} />
            Reserve Shift Table
          </button>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ padding: '24px 0', borderBottom: '1px solid #E2DAD0', background: '#FFFFFF', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: activeCategory === 'all' ? '1px solid #C5A059' : '1px solid #E2DAD0',
                background: activeCategory === 'all' ? '#081721' : '#FAF8F4',
                color: activeCategory === 'all' ? '#E0C184' : '#5C6366',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              All Courses ({allItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: activeCategory === cat.slug ? '1px solid #C5A059' : '1px solid #E2DAD0',
                  background: activeCategory === cat.slug ? '#081721' : '#FAF8F4',
                  color: activeCategory === cat.slug ? '#E0C184' : '#5C6366',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {cat.name} ({cat.items?.length || 0})
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} color="#7A7E80" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search dish or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #E2DAD0', borderRadius: '20px', fontSize: '13px', outline: 'none' }}
            />
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section style={{ padding: '60px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDish(item)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2DAD0',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)',
                }}
              >
                {/* Photo Header */}
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {item.is_signature && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(8, 23, 33, 0.88)', color: '#DFBA73', padding: '3px 10px', borderRadius: '15px', fontSize: '10px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
                      ★ SIGNATURE
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(255, 255, 255, 0.95)', padding: '4px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', color: '#081721', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    €{item.price}
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    {item.categoryName}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.35rem', color: '#081721', margin: '4px 0 6px' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontStyle: 'italic', color: '#7A7E80', fontSize: '0.88rem', marginBottom: '10px' }}>
                    {item.english_name}
                  </p>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.55, color: '#5C6366', margin: '0 0 14px' }}>
                    {item.description}
                  </p>

                  {item.wine_pairing && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9E7B36', borderTop: '1px solid #F0ECE4', paddingTop: '10px' }}>
                      <Wine size={13} />
                      <span>{item.wine_pairing}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#7A7E80' }}>
              <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif, serif)' }}>No dishes found matching your selection.</p>
              <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className="btn-outline" style={{ marginTop: '12px', padding: '8px 20px' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
