import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const se = content?.seasonal_experiences || {};
  const experiences = se.experiences || [
    {
      title: 'Botanical Coffee Sensory Tasting',
      time: 'Every Saturday • 10:30 AM',
      desc: 'A guided 90-minute flight of four rare micro-lots paired with botanical flavor extracts and terroir storytelling.',
      price: '$45 per guest',
    },
    {
      title: 'Glasshouse Terrarium Workshop',
      time: 'Bi-Weekly Sunday • 3:00 PM',
      desc: 'Build your own enclosed tropical miniature ecosystem guided by our head horticulturist, accompanied by matcha and pastries.',
      price: '$65 per guest',
    },
    {
      title: 'Twilight Glasshouse Jazz Soirée',
      time: 'Thursday Evenings • 7:30 PM',
      desc: 'Live acoustic jazz guitar and upright bass as the sun sets through the glass roof, featuring botanical mocktails and light bites.',
      price: '$35 per guest',
    },
    {
      title: 'Private Orangerie Salon Buyout',
      time: 'By Prior Reservation',
      desc: 'Exclusive hire of our elevated mezzanine garden for intimate celebrations, editorial shoots, or corporate retreats.',
      price: 'Custom Inquiry',
    },
  ];

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.5) 0%, #1A2B24 100%)',
          padding: '4.5rem 1.5rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#A87958',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {se.subtitle || 'CURATED WORKSHOPS & EVENINGS'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F4F0E6',
              margin: '0.6rem 0 1rem',
            }}
          >
            {se.title || 'Signature Botanical Experiences'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1rem' }}>
            Immerse yourself in our sensory community gatherings — from origin cuppings and terrarium masterclasses to twilight jazz under the stars.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 90px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '70px',
          }}
        >
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#263F35',
                borderRadius: '4px',
                border: '1px solid rgba(166, 181, 160, 0.25)',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#A87958', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {exp.time}
                  </span>
                  <span style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 700 }}>
                    {exp.price}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display, "Cormorant Garamond")',
                    fontSize: '1.65rem',
                    color: '#FFFFFF',
                    margin: '8px 0 16px',
                    lineHeight: 1.3,
                  }}
                >
                  {exp.title}
                </h3>

                <p style={{ color: '#D8D2C5', fontSize: '0.98rem', lineHeight: 1.7, margin: 0 }}>
                  {exp.desc}
                </p>
              </div>

              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(166, 181, 160, 0.2)' }}>
                <button
                  onClick={() => openReservation()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'rgba(168, 121, 88, 0.2)',
                    color: '#FAF7F0',
                    border: '1px solid #A87958',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#A87958';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(168, 121, 88, 0.2)';
                    e.currentTarget.style.color = '#FAF7F0';
                  }}
                >
                  Reserve Experience
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Inquiries Banner */}
        <div
          style={{
            backgroundColor: '#1E332B',
            padding: '45px 35px',
            borderRadius: '4px',
            border: '1px solid rgba(166, 181, 160, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#A87958', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
            PRIVATE CELEBRATIONS & EDITORIAL PRODUCTIONS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.2rem', color: '#FFFFFF', margin: '0 0 14px' }}>
            Looking for a Private Conservatory Buyout?
          </h2>
          <p style={{ color: '#D8D2C5', fontSize: '1.05rem', maxWidth: '700px', lineHeight: 1.7, margin: '0 0 28px' }}>
            From wedding morning bridal gatherings to private coffee tastings and editorial brand launches, our glasshouse events team orchestrates bespoke catering, florals, and specialized barista service.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('/contact')}
            style={{
              padding: '14px 34px',
              backgroundColor: '#A87958',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '3px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Contact Events Concierge
          </button>
        </div>
      </div>
    </div>
  );
}
