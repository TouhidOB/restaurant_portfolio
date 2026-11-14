import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Star, MessageSquare } from 'lucide-react';

export default function S12_Testimonials() {
  const { data } = useCMS();
  const testimonials = data.testimonials || [];

  return (
    <section
      id="reviews"
      style={{
        backgroundColor: '#FFD928',
        backgroundImage: 'radial-gradient(#171717 12%, transparent 13%)',
        backgroundSize: '24px 24px',
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
              backgroundColor: '#171717',
              color: '#FFD928',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #FFF',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 10 // CRITIC & GUEST BUZZ
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFF'
            }}
          >
            LOVE FROM THE TABLE.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: '#171717',
              fontWeight: 600,
              margin: 0
            }}
          >
            What food journalists, design aficionados, and our neighborhood regulars are saying.
          </p>
        </div>

        {/* Testimonials Speech Bubbles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '28px'
          }}
        >
          {testimonials.map((review, idx) => (
            <div
              key={review.id || idx}
              style={{
                backgroundColor: '#FFF',
                border: '4px solid #171717',
                borderRadius: '24px',
                padding: '28px',
                boxShadow: '8px 8px 0 #171717',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', color: '#F04438' }}>
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={18} fill="#F04438" />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    color: '#222',
                    fontStyle: 'italic',
                    margin: '0 0 20px 0'
                  }}
                >
                  "{review.quote}"
                </p>
              </div>

              {/* Author & Source */}
              <div
                style={{
                  borderTop: '2px dashed #E0E0E0',
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      color: '#171717',
                      lineHeight: 1.2
                    }}
                  >
                    {review.author}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#2455D6',
                      fontWeight: 700
                    }}
                  >
                    {review.publication}
                  </div>
                </div>

                {review.city && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      backgroundColor: '#FFF5E6',
                      border: '1px solid #171717',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      color: '#555'
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
