import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage({ onNavigate }) {
  const { content, openReservationModal, openReservation, openDishModal, setSelectedDish } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const triggerDishModal = setSelectedDish || openDishModal;

  const menuSection = content?.editorial_sections?.s07_menu || {};
  const categories = content?.menu_categories || [];

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spicyFilter, setSpicyFilter] = useState('all');

  const allDishes = useMemo(() => {
    let items = [];
    categories.forEach((cat) => {
      if (cat.items && cat.items.length > 0) {
        cat.items.forEach((item) => {
          items.push({
            ...item,
            category_slug: cat.slug,
            category_name: cat.name,
          });
        });
      }
    });
    return items;
  }, [categories]);

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      const matchesCategory = activeTab === 'all' || dish.category_slug === activeTab;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        (dish.korean_name && dish.korean_name.includes(q)) ||
        (dish.description && dish.description.toLowerCase().includes(q)) ||
        (dish.short_description && dish.short_description.toLowerCase().includes(q)) ||
        (dish.dietary_tags && dish.dietary_tags.toLowerCase().includes(q));

      let matchesSpicy = true;
      if (spicyFilter === 'mild') matchesSpicy = (dish.spicy_level || 0) <= 1;
      if (spicyFilter === 'spicy') matchesSpicy = (dish.spicy_level || 0) >= 2;

      return matchesCategory && matchesSearch && matchesSpicy;
    });
  }, [allDishes, activeTab, searchQuery, spicyFilter]);

  return (
    <div style={{ backgroundColor: '#111316', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(27, 29, 34, 0.9) 0%, #111316 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 46, 136, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#FF2E88',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-condensed)',
            }}
          >
            {menuSection.badge || 'FULL POCHA MENU'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#FFFFFF',
              margin: '0.6rem 0 0.5rem',
              fontWeight: 800,
            }}
          >
            {menuSection.title || 'The Complete Street Food Repertoire'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#FF2E88', margin: '1rem auto' }} />
          <p style={{ color: '#B6BAC2', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {menuSection.description || 'Browse our complete street food repertoire. Sizzling woks, crispy chicken, handmade kimbap, and iced soju cocktails.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', margin: '3.5rem auto 5rem', padding: '0 1.5rem' }}>
        {/* Filters Toolbar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginBottom: '3.5rem' }}>
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              backgroundColor: '#1B1D22',
              padding: '6px',
              borderRadius: '30px',
              border: '1px solid rgba(246, 244, 240, 0.1)',
            }}
          >
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 20px',
                borderRadius: '24px',
                border: 'none',
                backgroundColor: activeTab === 'all' ? '#FF2E88' : 'transparent',
                color: activeTab === 'all' ? '#FFFFFF' : '#B6BAC2',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              All Items ({allDishes.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => setActiveTab(cat.slug)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '24px',
                  border: 'none',
                  backgroundColor: activeTab === cat.slug ? '#FF2E88' : 'transparent',
                  color: activeTab === cat.slug ? '#FFFFFF' : '#B6BAC2',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Spicy filter */}
          <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '600px' }}>
            <input
              type="text"
              placeholder="Search dishes by name, ingredients, or Korean title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                backgroundColor: '#1B1D22',
                border: '1px solid rgba(246, 244, 240, 0.15)',
                borderRadius: '4px',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
            <select
              value={spicyFilter}
              onChange={(e) => setSpicyFilter(e.target.value)}
              style={{
                padding: '12px 18px',
                backgroundColor: '#1B1D22',
                border: '1px solid rgba(246, 244, 240, 0.15)',
                borderRadius: '4px',
                color: '#21D4E8',
                fontSize: '0.85rem',
                fontWeight: 700,
                outline: 'none',
              }}
            >
              <option value="all">All Spice Levels</option>
              <option value="mild">Mild (Level 0-1)</option>
              <option value="spicy">Hot &amp; Fire (Level 2-3)</option>
            </select>
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#B6BAC2' }}>
            <p style={{ fontSize: '1.2rem' }}>No dishes match your current filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {filteredDishes.map((dish) => {
              const photo = dish.image || dish.image_url || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85';
              return (
                <div
                  key={dish.id}
                  onClick={() => triggerDishModal && triggerDishModal(dish)}
                  style={{
                    backgroundColor: '#1B1D22',
                    borderRadius: '8px',
                    border: '1px solid rgba(246, 244, 240, 0.12)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.borderColor = '#21D4E8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(246, 244, 240, 0.12)';
                  }}
                >
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={photo}
                      alt={dish.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        backgroundColor: 'rgba(17, 19, 22, 0.92)',
                        border: '1px solid #FF2E88',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        color: '#FFB347',
                        fontSize: '1rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {dish.price}
                    </div>
                    {dish.is_featured && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          backgroundColor: '#FF2E88',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-condensed)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        ★ Street Icon
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {dish.korean_name && (
                      <span style={{ fontSize: '0.85rem', color: '#21D4E8', fontFamily: 'var(--font-korean)', fontWeight: 700, marginBottom: '0.25rem' }}>
                        {dish.korean_name}
                      </span>
                    )}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.45rem',
                        color: '#FFFFFF',
                        marginBottom: '0.65rem',
                        lineHeight: 1.25,
                      }}
                    >
                      {dish.name}
                    </h3>
                    <p style={{ color: '#B6BAC2', fontSize: '0.9rem', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                      {dish.short_description || dish.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(246, 244, 240, 0.1)',
                        paddingTop: '0.85rem',
                        fontSize: '0.82rem',
                      }}
                    >
                      <span style={{ color: '#777B83' }}>{dish.category_name}</span>
                      <span style={{ color: '#FF2E88', fontWeight: 700 }}>Explore Details →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Reservation Bar */}
        <div
          style={{
            marginTop: '5rem',
            padding: '3rem 2rem',
            backgroundColor: '#1B1D22',
            border: '1px solid rgba(255, 46, 136, 0.4)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Join Us at the Hongdae Pocha Tables
          </h2>
          <p style={{ color: '#B6BAC2', maxWidth: '600px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            Seating runs until 04:00 AM every night. Both Daylight Lunch and Twilight Pocha services feature sizzling wok specialties.
          </p>
          <button
            onClick={triggerReservation}
            style={{
              backgroundColor: '#FF2E88',
              color: '#FFFFFF',
              padding: '14px 36px',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(255, 46, 136, 0.4)',
            }}
          >
            Reserve Your Pocha Table
          </button>
        </div>
      </div>
    </div>
  );
}
