import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Clock, Check, ArrowUpRight } from 'lucide-react';

export default function S10_EventsExperiences() {
  const { data, setIsReservationModalOpen } = useCMS();
  const experiences = data.experiences || [];

  return (
    <section
      id="experiences"
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
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#00F0FF', borderColor: 'rgba(0, 240, 255, 0.25)' }}>
            CHAPTER 08 // CURATED HAPPENINGS
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
            LET'S MAKE IT AN OCCASION.
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
            From multi-course kitchen table tastings to VIP lounge takeovers and weekend cartoon brunches, explore our signature bookings.
          </p>
        </div>

        {/* 3 Experiences Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}
        >
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              style={{
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(204, 255, 0, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div>
                {/* Price and Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#CCFF00',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    EXPERIENCE 0{idx + 1}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#FFF'
                    }}
                  >
                    {exp.price}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#FFF',
                    margin: '0 0 6px 0',
                    lineHeight: 1.25
                  }}
                >
                  {exp.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#00F0FF',
                    fontWeight: 600,
                    marginBottom: '14px'
                  }}
                >
                  // {exp.tagline}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: '#9FA5B7',
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
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      marginBottom: '20px'
                    }}
                  >
                    <Clock size={14} color="#FF6B8B" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FFF' }}>
                      {exp.timing}
                    </span>
                  </div>
                )}

                {/* Features Checklist */}
                {exp.features && exp.features.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                    {exp.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(204, 255, 0, 0.15)',
                            color: '#CCFF00',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D4D4D8' }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsReservationModalOpen(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: '#FFF',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#CCFF00';
                  e.currentTarget.style.color = '#0A0B0E';
                  e.currentTarget.style.borderColor = '#CCFF00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.color = '#FFF';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <span>BOOK THIS OCCASION</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
