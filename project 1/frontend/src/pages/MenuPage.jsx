import React, { useState, useMemo, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Search, Sparkles, Calendar, Clock, Star, ArrowRight } from 'lucide-react';

export default function MenuPage({ onNavigateHome, onNavigatePage }) {
  const { config, openDish, openReservation } = useCMS();
  const menuCategories = config?.menuCategories || ['All', 'Starters', 'Main Course', 'Grills', 'Seafood', 'Desserts', 'Beverages'];
  const menuItems = config?.menuItems || [];
  const currency = config?.currency || '৳';

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState('ALL');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const dietaryOptions = ['ALL', 'HIGH PROTEIN', 'VEGETARIAN', 'SEAFOOD', 'SIGNATURE', 'HALAL'];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));

      const matchesDietary =
        activeDietary === 'ALL' ||
        (item.dietary && item.dietary.toUpperCase().includes(activeDietary));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [menuItems, activeCategory, searchQuery, activeDietary]);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Page Header */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(214, 184, 121, 0.25)',
          background: 'linear-gradient(180deg, rgba(18, 59, 53, 0.95) 0%, rgba(13, 15, 16, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#D6B879',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(243, 237, 225, 0.7)',
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
            <span style={{ color: '#E8D3A2' }}>CULINARY REPERTOIRE</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ THE COMPLETE AURELIA MENU
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#D6B879',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              A Culinary Collection Worth Savoring.
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              Explore our complete gastronomic repertoire. Each dish is individually photographed, with dietary specifications and preparation details.
            </p>
          </div>
        </div>
      </section>

      {/* Main Menu Explorer */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 24px 6rem' }}>
        {/* Search & Filters */}
        <div
          style={{
            backgroundColor: 'rgba(18, 59, 53, 0.4)',
            border: '1px solid rgba(214, 184, 121, 0.3)',
            borderRadius: '4px',
            padding: '1.5rem 2rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(214, 184, 121, 0.2)',
            }}
          >
            {menuCategories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: 'var(--font-display, Bodoni Moda)',
                    fontSize: '12px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '8px 18px',
                    borderRadius: '2px',
                    border: `1px solid ${isActive ? '#D6B879' : 'rgba(214, 184, 121, 0.3)'}`,
                    backgroundColor: isActive ? '#D6B879' : 'transparent',
                    color: isActive ? '#123B35' : '#F3EDE1',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box & Dietary Pills */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ position: 'relative', flex: '1 1 300px' }}>
              <Search
                size={17}
                color="#D6B879"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search dishes, ingredients, sauces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 46px',
                  backgroundColor: 'rgba(13, 15, 16, 0.85)',
                  border: '1px solid rgba(214, 184, 121, 0.35)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  borderRadius: '2px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', color: '#D6B879', letterSpacing: '0.1em' }}>DIETARY:</span>
              {dietaryOptions.map((opt) => {
                const isSelected = activeDietary === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setActiveDietary(opt)}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      border: `1px solid ${isSelected ? '#D6B879' : 'rgba(214, 184, 121, 0.25)'}`,
                      backgroundColor: isSelected ? 'rgba(214, 184, 121, 0.2)' : 'transparent',
                      color: isSelected ? '#D6B879' : 'rgba(243, 237, 225, 0.7)',
                      cursor: 'pointer',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dish Grid with High-Resolution Photography */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredItems.map((item) => {
            const itemImg = item.image || item.resolved_image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop';
            return (
              <div
                key={item.id}
                className="menu-item-card"
                onClick={() => openDish(item)}
                style={{
                  backgroundColor: 'rgba(18, 59, 53, 0.3)',
                  border: '1px solid rgba(214, 184, 121, 0.25)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#D6B879';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(214, 184, 121, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(214, 184, 121, 0.25)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Photo */}
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: '#123B35' }}>
                  <img
                    src={itemImg}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {item.tag && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#123B35',
                        border: '1px solid #D6B879',
                        color: '#D6B879',
                        padding: '3px 8px',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      ★ {item.tag}
                    </div>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(13, 15, 16, 0.85)',
                      color: '#F3EDE1',
                      padding: '3px 8px',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      borderRadius: '2px',
                    }}
                  >
                    <Clock size={11} /> {item.prepTime || '15-20 min'}
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '1.25rem', color: '#FFFFFF' }}>
                        {item.name}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '1.25rem', fontWeight: 700, color: '#D6B879', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                        {currency}{Number(item.price).toLocaleString()}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(243, 237, 225, 0.75)', marginBottom: '14px' }}>
                      {item.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(214, 184, 121, 0.15)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#D6B879', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#E8D3A2', backgroundColor: 'rgba(214, 184, 121, 0.12)', padding: '2px 8px', borderRadius: '2px' }}>
                      {item.dietary}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search */}
        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(243, 237, 225, 0.7)' }}>
            <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#D6B879', marginBottom: '12px' }}>
              No culinary items found matching your filters.
            </h3>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setActiveDietary('ALL');
              }}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #D6B879',
                color: '#D6B879',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Reservation CTA */}
        <div
          style={{
            marginTop: '5rem',
            padding: '3rem',
            backgroundColor: 'rgba(18, 59, 53, 0.5)',
            border: '1px solid #D6B879',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '2.5rem', color: '#D6B879', marginBottom: '1rem' }}>
            Ready to Dine with Us?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(243, 237, 225, 0.8)', maxWidth: '650px', margin: '0 auto 2rem' }}>
            Book your table for lunch or dinner service and let our culinary team craft an unforgettable feast.
          </p>
          <button
            onClick={() => openReservation('Menu Explorer')}
            style={{
              padding: '14px 32px',
              backgroundColor: '#123B35',
              border: '1px solid #D6B879',
              color: '#D6B879',
              fontFamily: 'var(--font-display, Bodoni Moda)',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            RESERVE A TABLE
          </button>
        </div>
      </div>
    </div>
  );
}
