import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { Search, Flame, Sparkles, Filter, Eye } from 'lucide-react';

export default function S07_MenuExplorer() {
  const { data, setSelectedDish } = useCMS();
  const categories = data.categories || [];
  const menuItems = data.menu_items || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState('all');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' ||
        (item.category && item.category.toLowerCase().includes(activeCategory.toLowerCase()));

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query));

      // Dietary match
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
        backgroundColor: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #171717',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#2455D6',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #171717',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 05 // MENU DIRECTORY
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            THE FULL STUDIO MENU.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#444',
              margin: 0
            }}
          >
            Filter by category, search by flavor, or drill down into dietary specifications.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            backgroundColor: '#FFF',
            border: '4px solid #171717',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '8px 8px 0 #171717',
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
            <div
              style={{
                position: 'relative',
                flexGrow: 1,
                maxWidth: '420px'
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#666'
                }}
              />
              <input
                type="text"
                placeholder="Search smash burgers, shakes, noodles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '2px solid #171717',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  backgroundColor: '#FFF5E6',
                  boxShadow: '2px 2px 0 #171717'
                }}
              />
            </div>

            {/* Dietary Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: '#666' }}>
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
                    backgroundColor: activeDietary === diet.id ? '#F04438' : '#FFF5E6',
                    color: activeDietary === diet.id ? '#FFF' : '#171717',
                    border: '2px solid #171717',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '2px 2px 0 #171717'
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
              gap: '10px',
              borderTop: '2px dashed #DDD',
              paddingTop: '16px'
            }}
          >
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                backgroundColor: activeCategory === 'all' ? '#FFD928' : '#FFF',
                color: '#171717',
                border: '2px solid #171717',
                borderRadius: '8px',
                padding: '10px 18px',
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: activeCategory === 'all' ? '3px 3px 0 #F04438' : '2px 2px 0 #171717',
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
                    backgroundColor: isCatActive ? '#FFD928' : '#FFF',
                    color: '#171717',
                    border: '2px solid #171717',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: isCatActive ? '3px 3px 0 #F04438' : '2px 2px 0 #171717',
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
              backgroundColor: '#FFF',
              border: '3px solid #171717',
              borderRadius: '16px',
              boxShadow: '6px 6px 0 #171717'
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#F04438' }}>
              NO MATCHING DISHES FOUND!
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', marginTop: '8px' }}>
              Try searching for something else or reset your filter filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setActiveDietary('all');
              }}
              style={{
                marginTop: '12px',
                backgroundColor: '#FFD928',
                border: '2px solid #171717',
                borderRadius: '8px',
                padding: '8px 16px',
                fontFamily: 'var(--font-mono)',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDish(item)}
                style={{
                  backgroundColor: '#FFF',
                  border: '3px solid #171717',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '5px 5px 0 #171717',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-3px, -3px)';
                  e.currentTarget.style.boxShadow = '8px 8px 0 #2455D6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '5px 5px 0 #171717';
                }}
              >
                {/* Image */}
                <div style={{ height: '180px', position: 'relative', borderBottom: '2px solid #171717' }}>
                  <img
                    src={item.image_url}
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
                      top: '10px',
                      right: '10px',
                      backgroundColor: '#FFD928',
                      color: '#171717',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      border: '2px solid #171717',
                      boxShadow: '2px 2px 0 #171717'
                    }}
                  >
                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: '#2455D6',
                          fontWeight: 800,
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.category}
                      </span>
                      {item.spice_level > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F04438' }}>
                          {[...Array(item.spice_level)].map((_, i) => (
                            <Flame key={i} size={12} fill="#F04438" />
                          ))}
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        color: '#171717',
                        margin: '0 0 8px 0',
                        lineHeight: 1.2
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.88rem',
                        lineHeight: 1.45,
                        color: '#555',
                        margin: 0
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: '14px',
                      borderTop: '1px solid #EEE',
                      paddingTop: '10px',
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
                              fontSize: '0.68rem',
                              backgroundColor: '#FFF5E6',
                              border: '1px solid #171717',
                              borderRadius: '4px',
                              padding: '2px 6px'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: '#F04438' }}>
                      DETAILS →
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
