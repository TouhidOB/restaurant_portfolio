import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { Search, Flame, ArrowUpRight } from 'lucide-react';

export default function S07_MenuExplorer() {
  const { data, setSelectedDish } = useCMS();
  const categories = data.categories || [];
  const menuItems = data.menu_items || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState('all');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (item.category && item.category.toLowerCase().includes(activeCategory.toLowerCase()));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query));

      let matchesDietary = true;
      if (activeDietary !== 'all') {
        matchesDietary = item.dietary_tags && item.dietary_tags.some((tag) =>
          tag.toLowerCase().includes(activeDietary.toLowerCase())
        );
      }

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [menuItems, activeCategory, searchQuery, activeDietary]);

  return (
    <section
      id="menu"
      style={{
        backgroundColor: '#090A0E',
        padding: '110px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#0066FF', borderColor: 'rgba(0, 102, 255, 0.3)' }}>
            CHAPTER 05 // MENU DIRECTORY
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            THE FULL STUDIO MENU.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            Filter by craft category, search by flavor notes, or drill down into dietary specifications.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            backgroundColor: '#12141D',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Search Input & Dietary Filters */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flexGrow: 1, maxWidth: '420px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#646A7E'
                }}
              />
              <input
                type="text"
                placeholder="Search burgers, shakes, noodles, tots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  backgroundColor: '#191C28',
                  color: '#FFF'
                }}
              />
            </div>

            {/* Dietary Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#646A7E' }}>
                DIET:
              </span>
              {[
                { id: 'all', label: 'All Diets' },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'gluten', label: 'Gluten-Free' },
                { id: 'spicy', label: 'Spicy' }
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setActiveDietary(diet.id)}
                  style={{
                    backgroundColor: activeDietary === diet.id ? 'rgba(204, 255, 0, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: activeDietary === diet.id ? '#CCFF00' : '#9FA5B7',
                    border: activeDietary === diet.id ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '999px',
                    padding: '6px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: '18px'
            }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                backgroundColor: activeCategory === 'all' ? '#CCFF00' : 'transparent',
                color: activeCategory === 'all' ? '#0A0B0E' : '#9FA5B7',
                border: activeCategory === 'all' ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '999px',
                padding: '8px 18px',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              ALL ITEMS ({menuItems.length})
            </button>

            {categories.map((cat) => {
              const isCatActive = activeCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  style={{
                    backgroundColor: isCatActive ? '#CCFF00' : 'transparent',
                    color: isCatActive ? '#0A0B0E' : '#9FA5B7',
                    border: isCatActive ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '999px',
                    padding: '8px 18px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.name.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#12141D',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px'
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#FF6B8B' }}>
              NO MATCHING DISHES FOUND
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#646A7E', marginTop: '8px' }}>
              Try searching for something else or reset your active filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setActiveDietary('all');
              }}
              style={{
                marginTop: '16px',
                backgroundColor: '#CCFF00',
                color: '#0A0B0E',
                borderRadius: '999px',
                padding: '8px 18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDish(item)}
                style={{
                  backgroundColor: '#12141D',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(204, 255, 0, 0.35)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                }}
              >
                {/* Image */}
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.image_url || item.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#CCFF00',
                      color: '#0A0B0E',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: '999px'
                    }}
                  >
                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: '#00F0FF',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.category}
                      </span>
                      {item.spice_level > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#FF3366' }}>
                          {[...Array(item.spice_level)].map((_, i) => (
                            <Flame key={i} size={11} fill="#FF3366" />
                          ))}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#FFF',
                        margin: '0 0 8px 0',
                        lineHeight: 1.3
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: '#9FA5B7',
                        margin: 0
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {item.dietary_tags &&
                        item.dietary_tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '9.5px',
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '999px',
                              padding: '2px 8px',
                              color: '#9FA5B7'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700, color: '#CCFF00' }}>
                      DETAILS &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
