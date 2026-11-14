import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05_FoodPhilosophy() {
  const { data } = useCMS();
  const philosophy = data.philosophy || [];

  return (
    <section
      id="philosophy"
      style={{
        backgroundColor: '#171717',
        color: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #FFD928',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 60px auto' }}>
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
              border: '2px solid #FFF',
              boxShadow: '3px 3px 0 #F04438',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 03 // CULINARY CODE
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.05,
              color: '#FFD928',
              margin: '0 0 16px 0',
              textShadow: '4px 4px 0 #F04438'
            }}
          >
            THE 4 POP PRINCIPLES.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: '#FFF5E6',
              margin: 0
            }}
          >
            How we translate graphic energy into gastronomic perfection every single day.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {philosophy.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#242730',
                border: '3px solid #FFF',
                borderRadius: '20px',
                padding: '32px 24px',
                boxShadow: `6px 6px 0px ${item.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.5rem',
                      color: item.color,
                      lineHeight: 1
                    }}
                  >
                    {item.number}
                  </span>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      border: '2px solid #FFF'
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: '#FFF',
                    margin: '0 0 14px 0',
                    letterSpacing: '0.5px'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: '#DDD',
                    margin: 0
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: item.color,
                  fontWeight: 700
                }}
              >
                RULE NO. {item.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
