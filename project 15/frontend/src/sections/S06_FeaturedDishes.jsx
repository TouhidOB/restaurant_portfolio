import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowUpRight, Flame, Eye } from 'lucide-react';

export default function S06_FeaturedDishes() {
  const { data, setSelectedDish } = useCMS();
  const menuItems = data.menu_items || [];
  const featured = menuItems.filter((i) => i.is_featured);

  return (
    <section
      id="featured"
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
          gap: '50px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#FF6B8B', borderColor: 'rgba(255, 51, 102, 0.25)' }}>
            CHAPTER 04 // HALL OF FAME
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
            THE CROWD PLEASERS.
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
            Our most requested and photographed culinary inventions. Click any plate to inspect recipe specifications and beverage pairings.
          </p>
        </div>

        {/* Featured Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {featured.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDish(item)}
              style={{
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(204, 255, 0, 0.4)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(204, 255, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4)';
              }}
            >
              {/* Dish Image */}
              <div
                style={{
                  height: '240px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={item.image_url || item.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Price Sticker in Cyber Lime */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    backgroundColor: '#CCFF00',
                    color: '#0A0B0E',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '999px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                </div>

                {/* Category Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(9, 10, 14, 0.8)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    padding: '3px 9px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    fontWeight: 600
                  }}
                >
                  {item.category}
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#FFF',
                      margin: '0 0 10px 0',
                      lineHeight: 1.3
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      lineHeight: 1.6,
                      color: '#9FA5B7',
                      margin: '0 0 16px 0'
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '16px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#CCFF00',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={13} /> VIEW RECIPE SPECS
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF'
                    }}
                  >
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
