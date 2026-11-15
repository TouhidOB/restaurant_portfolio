import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Calendar, Filter, Star, Clock } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function MenuSection({ categories, menuItems, currency = '৳', onOpenReservation, sectionData = {} }) {
  const { openDish } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const eyebrow = sectionData.eyebrow || 'CULINARY REPERTOIRE';
  const title = sectionData.title || 'A Menu Worth Discovering.';
  const description =
    sectionData.description ||
    'Explore our curated culinary collection, balancing classical gastronomic traditions, rare ingredients, and signature wood-fired mastery.';
  const ctaText = sectionData.ctaText || 'RESERVE A TABLE TO EXPERIENCE OUR MENU';

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <section
      id="menu"
      className="section-padding"
      style={{
        backgroundColor: '#F3EDE1',
        color: '#123B35',
        position: 'relative',
        borderBottom: '1px solid #D6B879',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            className="eyebrow"
            style={{
              color: '#99764B',
              justifyContent: 'center',
            }}
          >
            {eyebrow}
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: '#123B35',
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              fontSize: '15px',
              color: '#536A5D',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>

          <div className="gold-divider" style={{ maxWidth: '200px' }}>
            <span className="deco-diamond" style={{ backgroundColor: '#99764B' }} />
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
            }}
          >
            <Search
              size={18}
              color="#99764B"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <input
              type="text"
              placeholder="Search dishes, flavours, or dietary tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search menu items"
              style={{
                width: '100%',
                padding: '14px 16px 14px 46px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(153, 118, 75, 0.35)',
                color: '#123B35',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#99764B',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              maxWidth: '1000px',
            }}
          >
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: isActive ? '#123B35' : 'transparent',
                    color: isActive ? '#F3EDE1' : '#123B35',
                    border: `1px solid ${isActive ? '#123B35' : 'rgba(18, 59, 53, 0.25)'}`,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '56px',
          }}
        >
          {filteredItems.map((item) => {
            const itemImg = item.image || item.resolved_image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop';
            return (
              <div
                key={item.id}
                onClick={() => openDish(item)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(153, 118, 75, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                className="menu-item-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(18, 59, 53, 0.12)';
                  e.currentTarget.style.borderColor = '#99764B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(153, 118, 75, 0.25)';
                }}
              >
                {/* Meal Photo Header */}
                <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#123B35' }}>
                  <img
                    src={itemImg}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(18, 59, 53, 0.9)',
                      border: '1px solid #D6B879',
                      color: '#D6B879',
                      padding: '3px 8px',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.tag || item.category}
                  </div>
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

                {/* Dish Details */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '8px',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '18px',
                          color: '#123B35',
                          fontWeight: 600,
                        }}
                      >
                        {item.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#99764B',
                          whiteSpace: 'nowrap',
                          marginLeft: '12px',
                        }}
                      >
                        {currency}{Number(item.price).toLocaleString()}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: '#536A5D',
                        marginBottom: '16px',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px dashed rgba(153, 118, 75, 0.2)',
                      paddingTop: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#99764B',
                        fontWeight: 600,
                      }}
                    >
                      {item.category}
                    </span>

                    <span
                      style={{
                        fontSize: '11px',
                        color: '#718C7D',
                        backgroundColor: 'rgba(113, 140, 125, 0.12)',
                        padding: '3px 8px',
                        borderRadius: '2px',
                      }}
                    >
                      {item.dietary}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* If no items match search */}
        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#536A5D' }}>
            <p style={{ fontSize: '16px', marginBottom: '12px' }}>
              No culinary items matched "{searchQuery}" in category "{activeCategory}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              style={{
                background: 'none',
                border: '1px solid #99764B',
                color: '#99764B',
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Menu Action */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={onOpenReservation}
            className="btn-primary"
            style={{
              backgroundColor: '#123B35',
              borderColor: '#99764B',
              color: '#D6B879',
              padding: '18px 40px',
            }}
          >
            <Calendar size={16} />
            <span>{ctaText}</span>
          </button>
        </div>
      </div>

      <style>{`
        .menu-item-card:hover {
          border-color: #99764B;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
