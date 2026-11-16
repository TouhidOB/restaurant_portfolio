import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, Search, Filter } from 'lucide-react';

export default function MenuPage({ onNavigate }) {
  const { data, setSelectedDish, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const categories = data.categories || [];
  const menuItems = data.menu_items || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (item.category && item.category.toLowerCase().includes(activeCategory.toLowerCase()));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Navigation back */}
        <div style={{ marginBottom: '32px' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/'); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFDD00',
              textDecoration: 'none',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <ArrowLeft size={16} /> Back to Studio Home
          </a>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 221, 0, 0.12)', border: '1px solid rgba(255, 221, 0, 0.3)', color: '#FFDD00', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <Sparkles size={13} /> CHAPTER 05 // MENU DIRECTORY
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            THE FULL POP STUDIO MENU.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            Explore every burger, crispy bite, vibrant bowl, and theatrical drink created in our open food lab. Every dish is accompanied by its high-fashion photography and pairing notes.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                border: activeCategory === 'all' ? '1px solid #FFDD00' : '1px solid rgba(255, 255, 255, 0.08)',
                background: activeCategory === 'all' ? '#FFDD00' : '#141418',
                color: activeCategory === 'all' ? '#000' : '#8E8EA0',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer'
              }}
            >
              All Items ({menuItems.length})
            </button>
            {categories.map((cat) => {
              const isCatActive = activeCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: isCatActive ? '1px solid #FFDD00' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isCatActive ? '#FFDD00' : '#141418',
                    color: isCatActive ? '#000' : '#8E8EA0',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search dishes, sauces, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 42px',
                background: '#141418',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                color: '#FFF',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <Search size={16} color="#8E8EA0" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Dish Grid with Meal Photography on EVERY Item */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDish(item)}
              style={{
                background: '#141418',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFDD00';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Dish Photo */}
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={item.image_url || item.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#FFDD00', color: '#000', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px' }}>
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                </div>
              </div>

              {/* Dish Info */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#FF007F', fontWeight: 800, marginBottom: '6px' }}>
                  {item.category || 'Pop Specialty'}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, color: '#FFF', marginBottom: '8px' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.5, flex: 1, marginBottom: '14px' }}>
                  {item.description}
                </p>

                {item.pairing && (
                  <div style={{ fontSize: '11px', color: '#00E5FF', marginBottom: '12px', fontStyle: 'italic' }}>
                    Pair with: {item.pairing}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '11px', color: '#FFDD00', fontWeight: 700 }}>Inspect Dish &rarr;</span>
                  <span style={{ fontSize: '11px', color: '#8E8EA0' }}>{item.prep_time || '10 mins'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', padding: '48px', background: 'rgba(255, 221, 0, 0.05)', border: '1px dashed #FFDD00', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', marginBottom: '10px' }}>Join Us at the Food Lab</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '22px' }}>Reservations recommended for peak evening service.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '14px 32px', background: '#FFDD00', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table Now &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
