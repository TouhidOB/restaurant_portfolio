import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage({ onNavigate }) {
  const { content, openReservationModal, openReservation, setSelectedDish } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const menuSection = content?.editorial_sections?.s07_menu || {};
  const categories = content?.menu_categories || [];

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all dishes
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

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      const matchesCategory = activeTab === 'all' || dish.category_slug === activeTab;
      const matchesSearch =
        !searchQuery ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dish.description && dish.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (dish.subtitle && dish.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allDishes, activeTab, searchQuery]);

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#B96F4F',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {menuSection.badge || 'A LA CARTE & TASTING'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F7F3EA',
              margin: '0.6rem 0 1.25rem',
            }}
          >
            {menuSection.title || 'The Riviera Gastronomic Repertoire'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {menuSection.description || 'An evolving seasonal dialogue between the Mediterranean Sea, Provençal mountain herbs, and traditional handmade pasta.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1180px', margin: '3.5rem auto 5rem', padding: '0 1.5rem' }}>
        {/* Category Tabs & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem',
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              backgroundColor: '#263A48',
              padding: '6px',
              borderRadius: '30px',
              border: '1px solid rgba(233, 223, 207, 0.2)',
            }}
          >
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 20px',
                borderRadius: '24px',
                border: 'none',
                backgroundColor: activeTab === 'all' ? '#B96F4F' : 'transparent',
                color: activeTab === 'all' ? '#FFFFFF' : '#E9DFCF',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              All Repertoire ({allDishes.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => setActiveTab(cat.slug)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '24px',
                  border: 'none',
                  backgroundColor: activeTab === cat.slug ? '#B96F4F' : 'transparent',
                  color: activeTab === cat.slug ? '#FFFFFF' : '#E9DFCF',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div style={{ maxWidth: '450px', width: '100%', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search dishes by name, ingredients, or pairings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px',
                backgroundColor: '#263A48',
                border: '1px solid rgba(233, 223, 207, 0.25)',
                borderRadius: '4px',
                color: '#F7F3EA',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#E9DFCF' }}>
            <p style={{ fontSize: '1.2rem' }}>No culinary creations match your search.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {filteredDishes.map((dish) => {
              const img = dish.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85';
              return (
                <div
                  key={dish.id}
                  onClick={() => setSelectedDish && setSelectedDish(dish)}
                  style={{
                    backgroundColor: '#263A48',
                    borderRadius: '6px',
                    border: '1px solid rgba(233, 223, 207, 0.2)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.borderColor = '#B96F4F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(233, 223, 207, 0.2)';
                  }}
                >
                  {/* Photo container */}
                  <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                    <img
                      src={img}
                      alt={dish.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        backgroundColor: 'rgba(24, 37, 46, 0.92)',
                        border: '1px solid #B96F4F',
                        padding: '4px 12px',
                        borderRadius: '3px',
                        color: '#F7F3EA',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                      }}
                    >
                      {dish.price}
                    </div>
                    {dish.is_signature && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          backgroundColor: '#B96F4F',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Signature
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        color: '#B96F4F',
                        letterSpacing: '0.08em',
                        marginBottom: '0.3rem',
                        fontWeight: 600,
                      }}
                    >
                      {dish.subtitle || dish.category_name}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, "Cormorant Garamond")',
                        fontSize: '1.45rem',
                        color: '#F7F3EA',
                        marginBottom: '0.65rem',
                        lineHeight: 1.25,
                      }}
                    >
                      {dish.name}
                    </h3>
                    <p
                      style={{
                        color: '#E9DFCF',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: '1rem',
                      }}
                    >
                      {dish.description}
                    </p>

                    {dish.dietary_tags && (
                      <div style={{ marginBottom: '0.85rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: '#A9BDB5',
                            backgroundColor: 'rgba(24, 37, 46, 0.6)',
                            padding: '3px 8px',
                            borderRadius: '3px',
                            display: 'inline-block',
                          }}
                        >
                          {dish.dietary_tags}
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(233, 223, 207, 0.1)',
                        paddingTop: '0.85rem',
                        fontSize: '0.85rem',
                        color: '#B96F4F',
                        fontWeight: 600,
                      }}
                    >
                      <span>Explore Dish Details</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating / Sticky Reservation Bar */}
        <div
          style={{
            marginTop: '5rem',
            padding: '3rem 2rem',
            backgroundColor: '#263A48',
            border: '1px solid rgba(185, 111, 79, 0.4)',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '2.2rem',
              color: '#F7F3EA',
              marginBottom: '0.75rem',
            }}
          >
            Experience Our Gastronomic Journey in Person
          </h2>
          <p
            style={{
              color: '#E9DFCF',
              maxWidth: '600px',
              margin: '0 auto 1.75rem',
              lineHeight: 1.6,
            }}
          >
            Reservations are released 30 days in advance. Both Daylight Lunch and Twilight Dinner services feature bespoke tasting menus.
          </p>
          <button
            onClick={triggerReservation}
            style={{
              backgroundColor: '#B96F4F',
              color: '#FFFFFF',
              padding: '14px 36px',
              border: 'none',
              borderRadius: '3px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Reserve Your Villa Table
          </button>
        </div>
      </div>
    </div>
  );
}
