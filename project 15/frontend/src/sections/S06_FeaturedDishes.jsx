import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Flame, Eye, ArrowRight } from 'lucide-react';

export default function S06_FeaturedDishes() {
  const { data, setSelectedDish } = useCMS();
  const menuItems = data.menu_items || [];
  const featured = menuItems.filter((i) => i.is_featured);

  return (
    <section
      id="featured"
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
          gap: '48px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#FFD928',
              color: '#171717',
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
            CHAPTER 04 // HALL OF FAME
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #F04438'
            }}
          >
            THE CROWD PLEASERS.
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
            Our most ordered, most photographed, and most celebrated culinary inventions. Click any plate to inspect the recipe details.
          </p>
        </div>

        {/* Featured Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {featured.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDish(item)}
              style={{
                backgroundColor: '#FFF',
                border: '4px solid #171717',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '8px 8px 0 #171717',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = '12px 12px 0 #F04438';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '8px 8px 0 #171717';
              }}
            >
              {/* Dish Image */}
              <div
                style={{
                  height: '240px',
                  position: 'relative',
                  borderBottom: '3px solid #171717',
                  overflow: 'hidden'
                }}
              >
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

                {/* Price Sticker */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#FFD928',
                    color: '#171717',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: '2px solid #171717',
                    boxShadow: '3px 3px 0 #171717',
                    transform: 'rotate(2deg)'
                  }}
                >
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                </div>

                {/* Category Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: '#171717',
                    color: '#FFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontWeight: 700
                  }}
                >
                  {item.category}
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: '#171717',
                      margin: '0 0 10px 0',
                      lineHeight: 1.2
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      color: '#555',
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
                    borderTop: '2px dashed #EEE',
                    paddingTop: '16px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: '#2455D6',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye size={14} /> VIEW SPECIFICATIONS
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#FFD928',
                      border: '2px solid #171717',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ArrowRight size={16} />
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
