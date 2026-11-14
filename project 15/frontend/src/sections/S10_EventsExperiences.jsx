import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, Clock, Check, ArrowRight } from 'lucide-react';

export default function S10_EventsExperiences() {
  const { data, setIsReservationModalOpen } = useCMS();
  const experiences = data.experiences || [];

  return (
    <section
      id="experiences"
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
              backgroundColor: '#F04438',
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
            CHAPTER 08 // CURATED HAPPENINGS
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
            LET'S MAKE IT AN OCCASION.
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
            From multi-course kitchen table tastings to VIP lounge takeovers and weekend cartoon brunches, explore our signature bookings.
          </p>
        </div>

        {/* 3 Experiences Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              style={{
                backgroundColor: '#FFF',
                border: '4px solid #171717',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '8px 8px 0 #171717',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = '12px 12px 0 #2455D6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '8px 8px 0 #171717';
              }}
            >
              <div>
                {/* Price Sticker */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span
                    style={{
                      backgroundColor: '#FFD928',
                      color: '#171717',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '2px solid #171717'
                    }}
                  >
                    EXPERIENCE 0{idx + 1}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      color: '#F04438'
                    }}
                  >
                    {exp.price}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: '#171717',
                    margin: '0 0 6px 0',
                    lineHeight: 1.2
                  }}
                >
                  {exp.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: '#2455D6',
                    fontWeight: 700,
                    marginBottom: '14px'
                  }}
                >
                  // {exp.tagline}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: '#555',
                    margin: '0 0 20px 0'
                  }}
                >
                  {exp.description}
                </p>

                {/* Timing */}
                {exp.timing && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#FFF5E6',
                      border: '2px solid #171717',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      marginBottom: '20px'
                    }}
                  >
                    <Clock size={16} color="#F04438" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
                      {exp.timing}
                    </span>
                  </div>
                )}

                {/* Feature Checklist */}
                {exp.features && exp.features.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {exp.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: '#00C389',
                            color: '#FFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#333' }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Book Button */}
              <button
                onClick={() => setIsReservationModalOpen(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#171717',
                  color: '#FFF',
                  border: '2px solid #171717',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0 #FFD928',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>BOOK THIS HAPPENING</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
