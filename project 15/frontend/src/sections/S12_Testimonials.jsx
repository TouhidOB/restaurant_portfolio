import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Star } from 'lucide-react';

export default function S12_Testimonials() {
  const { data } = useCMS();
  const testimonials = data.testimonials || [];

  return (
    <section
      id="reviews"
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
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#CCFF00', borderColor: 'rgba(204, 255, 0, 0.25)' }}>
            CHAPTER 10 // CRITIC & GUEST BUZZ
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
            LOVE FROM THE TABLE.
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
            What food journalists, design aficionados, and neighborhood regulars are saying.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {testimonials.map((review, idx) => (
            <div
              key={review.id || idx}
              style={{
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '3px', marginBottom: '18px', color: '#FFB800' }}>
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#FFB800" strokeWidth={0} />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    lineHeight: 1.65,
                    color: '#D4D4D8',
                    fontStyle: 'italic',
                    margin: '0 0 24px 0'
                  }}
                >
                  "{review.quote}"
                </p>
              </div>

              {/* Author & Source */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#FFF'
                    }}
                  >
                    {review.author}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#CCFF00',
                      fontWeight: 600
                    }}
                  >
                    {review.publication}
                  </div>
                </div>

                {review.city && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: '#646A7E'
                    }}
                  >
                    {review.city}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
