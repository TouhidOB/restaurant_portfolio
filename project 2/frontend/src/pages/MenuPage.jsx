import React, { useState, useMemo, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Search, Sparkles, Calendar, Clock, Star, ArrowRight } from 'lucide-react';

export default function MenuPage({ onNavigateHome, onNavigatePage }) {
  const { config, openDish, openReservation } = useCMS();
  const menuCategories = config?.menuCategories || [];
  const currency = config?.currency || '৳';

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const dietaryOptions = ['ALL', 'GF', 'V', 'VG', 'CHEF PICK', 'SIGNATURE', 'SPICY'];

  // Flatten all items across categories with their category metadata
  const allItems = useMemo(() => {
    const list = [];
    menuCategories.forEach((cat) => {
      (cat.items || []).forEach((item) => {
        list.push({
          ...item,
          categoryName: cat.name,
          categoryJapanese: cat.japaneseName,
        });
      });
    });
    return list;
  }, [menuCategories]);

  const categoryNames = useMemo(() => {
    return ['All', ...menuCategories.map((c) => c.name)];
  }, [menuCategories]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.categoryName === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.categoryName && item.categoryName.toLowerCase().includes(q));

      const matchesDietary =
        activeDietary === 'ALL' ||
        (item.tags && item.tags.some((t) => t.toUpperCase().includes(activeDietary)));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [allItems, activeCategory, searchQuery, activeDietary]);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#141715', color: '#F2EFE6' }}>
      {/* Header */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
          background: 'linear-gradient(180deg, rgba(26, 30, 27, 0.98) 0%, rgba(20, 23, 21, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B6A17B',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(242, 239, 230, 0.7)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
              }}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: '#C9B896' }}>ZEN GASTRONOMY REPERTOIRE</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 THE COMPLETE ENSO REPERTOIRE
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Cormorant Garamond)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#F2EFE6',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Every Dish Captured in Visual Clarity.
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              Explore our complete culinary repertoire. Every meal is individually photographed with source origin, dietary specifications, and preparation time.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ backgroundColor: '#1A1E1B', borderBottom: '1px solid rgba(182, 161, 123, 0.15)', padding: '1.5rem 0', position: 'sticky', top: '70px', zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: activeCategory === cat ? '#B6A17B' : 'rgba(20, 23, 21, 0.6)',
                    color: activeCategory === cat ? '#141715' : '#F2EFE6',
                    border: activeCategory === cat ? '1px solid #B6A17B' : '1px solid rgba(182, 161, 123, 0.25)',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <input
                type="text"
                placeholder="Search dishes, ingredients, ramen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  backgroundColor: '#141715',
                  border: '1px solid rgba(182, 161, 123, 0.3)',
                  borderRadius: '2px',
                  color: '#F2EFE6',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <Search size={15} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#B6A17B' }} />
            </div>
          </div>

          {/* Dietary Filter Chips */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#8E968F', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              DIETARY FILTER:
            </span>
            {dietaryOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveDietary(tag)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: activeDietary === tag ? '#69745B' : 'transparent',
                  color: activeDietary === tag ? '#F2EFE6' : '#8E968F',
                  border: activeDietary === tag ? '1px solid #69745B' : '1px solid rgba(182, 161, 123, 0.2)',
                  borderRadius: '2px',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Disposed Meals Grid */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#8E968F' }}>
              Displaying <strong>{filteredItems.length}</strong> authenticated dishes with meal photography
            </span>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setActiveDietary('ALL');
                }}
                style={{ background: 'none', border: 'none', color: '#B6A17B', fontSize: '12px', cursor: 'pointer' }}
              >
                Clear Filters
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredItems.map((dish, i) => (
              <div
                key={i}
                onClick={() => openDish(dish)}
                style={{
                  backgroundColor: '#1A1E1B',
                  border: '1px solid rgba(182, 161, 123, 0.2)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B6A17B';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(182, 161, 123, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Full Meal Photo */}
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={dish.image || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop'}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(20, 23, 21, 0.88)',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      color: '#B6A17B',
                      fontSize: '13px',
                      fontWeight: 700,
                    }}
                  >
                    {dish.price}
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '10px', color: '#69745B', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                    {dish.categoryName}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.35rem', color: '#F2EFE6', margin: '0 0 8px' }}>
                    {dish.name}
                  </h3>
                  <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(242, 239, 230, 0.7)', flex: 1, marginBottom: '14px' }}>
                    {dish.description}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {(dish.tags || []).map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '9px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: '2px',
                          backgroundColor: 'rgba(182, 161, 123, 0.12)',
                          color: '#B6A17B',
                          border: '1px solid rgba(182, 161, 123, 0.25)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(182, 161, 123, 0.15)', fontSize: '11px', color: '#8E968F' }}>
                    <span>{dish.calories ? `🔥 ${dish.calories}` : 'Pristine Sourcing'}</span>
                    <span style={{ color: '#B6A17B', fontWeight: 600 }}>Inspect Dish ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#8E968F' }}>
              <p style={{ fontSize: '16px', marginBottom: '1rem' }}>No culinary creations found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setActiveDietary('ALL');
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#B6A17B',
                  color: '#141715',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Reset Menu Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
