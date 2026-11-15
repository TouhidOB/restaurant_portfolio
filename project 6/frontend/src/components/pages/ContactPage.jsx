import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import LocationContactSection from '../sections/LocationContactSection';
import ReservationSection from '../sections/ReservationSection';
import FAQSection from '../sections/FAQSection';

export default function ContactPage({ onNavigateHome, onNavigatePage }) {
  const { content } = useCMS();
  const restaurant = content?.restaurant || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Dedicated Page Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 0 4rem',
          borderBottom: '1px solid var(--border-diner)',
          background: 'linear-gradient(180deg, rgba(17, 26, 43, 0.8) 0%, rgba(9, 15, 27, 0.98) 100%)',
        }}
      >
        <div className="container-diner">
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--neon-cyan)',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: 'var(--atomic-yellow)' }}>CONTACT & LOCATION</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ VENUE LOCATION, SHIFTS & RESERVATIONS
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(67, 217, 232, 0.25)',
              }}
            >
              PLAN YOUR VISIT TO STARDUST.
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2rem',
              }}
            >
              Located at {restaurant.address || '550 Neon Boulevard'} in Chicago. Serving lunchtime comfort and midnight cosmic cravings 7 days a week.
            </p>

            {/* Quick Contact Specs */}
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                marginBottom: '2.5rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--neon-cyan)', display: 'block', fontSize: '0.7rem' }}>PHONE CONCIERGE</span>
                <span style={{ color: '#FFF' }}>{restaurant.phone || '+1 (312) 555-0195'}</span>
              </div>
              <div>
                <span style={{ color: 'var(--neon-cyan)', display: 'block', fontSize: '0.7rem' }}>EMAIL INQUIRIES</span>
                <span style={{ color: '#FFF' }}>{restaurant.email || 'concierge@stardust-diner.com'}</span>
              </div>
              <div>
                <span style={{ color: 'var(--atomic-yellow)', display: 'block', fontSize: '0.7rem' }}>OPERATING SHIFTS</span>
                <span style={{ color: '#FFF' }}>Lunch (12PM - 3:30PM) / Dinner (5PM - 2AM)</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a href="#reservation" className="btn-cherry">
                <span>RESERVE TABLE INQUIRY</span>
                <span>↓</span>
              </a>
              <button onClick={() => onNavigatePage('tour')} className="btn-cyan">
                <span>VIEW 3D SPACE FIRST</span>
              </button>
              <button
                onClick={onNavigateHome}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-diner)',
                  color: 'var(--text-cream)',
                  padding: '0.95rem 1.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                ← BACK TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location, Hours & Map Section */}
      <LocationContactSection />

      {/* Embedded Table Reservation Section */}
      <div id="reservation">
        <ReservationSection />
      </div>

      {/* FAQ & Policies Section */}
      <FAQSection />
    </div>
  );
}
