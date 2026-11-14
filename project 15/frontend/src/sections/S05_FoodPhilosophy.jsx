import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05_FoodPhilosophy() {
  const { data } = useCMS();
  const philosophy = data.philosophy || [];

  return (
    <section
      id="philosophy"
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
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 60px auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#00F0FF', borderColor: 'rgba(0, 240, 255, 0.25)' }}>
            CHAPTER 03 // CULINARY CODE
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            THE 4 POP PRINCIPLES.
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
            How we translate graphic energy into gastronomic perfection every single day.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px'
          }}
        >
          {philosophy.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px ${item.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      fontWeight: 800,
                      color: item.color,
                      lineHeight: 1
                    }}
                  >
                    {item.number}
                  </span>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}`
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFF',
                    letterSpacing: '-0.3px',
                    margin: '0 0 14px 0'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: '#9FA5B7',
                    margin: 0
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '32px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: item.color,
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                PRINCIPLE NO. {item.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
