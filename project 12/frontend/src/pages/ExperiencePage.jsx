import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const expSection = content?.editorial_sections?.s10_experiences || {};
  const experiences = content?.dining_experiences || [
    {
      id: 1,
      title: "Chef's Sunset Tasting at Cliff's Edge",
      subtitle: "Exclusive Cliffside Balcony Seclusion",
      description: "A nine-course blind culinary odyssey presented as the sunset bathes the Cap in amber and rose light.",
      capacity: "2 to 6 Guests",
      timing: "Twilight | 19:30 Departure",
      price: "€280 per guest",
      features: [
        "Nine blind tasting courses by Chef Antoine Laurent",
        "Exclusive corner balcony reservation",
        "Pairing of rare Provençal and Ligurian Grand Crus"
      ]
    },
    {
      id: 2,
      title: "The Subterranean Vault & Sommelier Table",
      subtitle: "Surrounded by 1928 Coastal Limestone",
      description: "An intimate dinner hosted inside our subterranean rock cellar, surrounded by over 480 historic vintage bottles.",
      capacity: "4 to 10 Guests",
      timing: "Evening | 20:00",
      price: "€340 per guest",
      features: [
        "Seven-course heritage menu featuring aged wild cheeses",
        "Vertical tasting of historic Côte d'Azur vintages",
        "Dedicated head sommelier narration throughout"
      ]
    },
    {
      id: 3,
      title: "Private Sea Pier Sunset Aperitivo",
      subtitle: "Arriving by Private Yacht Tender",
      description: "Private reception on our natural stone pier with vintage Champagne, chilled oysters, and caviar before dinner.",
      capacity: "Up to 12 Guests",
      timing: "Sunset | 18:30",
      price: "€190 per guest",
      features: [
        "Direct yacht tender mooring and concierge reception",
        "Dom Pérignon vintage Champagne service",
        "Fresh Belon oysters and Oscietra caviar service"
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#B96F4F',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {expSection.badge || 'PRIVATE & EXCLUSIVE'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F7F3EA',
              margin: '0.6rem 0 1.25rem',
            }}
          >
            {expSection.title || 'Curated Riviera Dining Encounters'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {expSection.description || 'Bespoke moments designed for intimate celebrations, sunset toasts, and private sommelier journeys above the Mediterranean waves.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4.5rem auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '2.5rem' }}>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              style={{
                backgroundColor: '#263A48',
                borderRadius: '6px',
                border: '1px solid rgba(233, 223, 207, 0.2)',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.borderColor = '#B96F4F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(233, 223, 207, 0.2)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span
                  style={{
                    color: '#B96F4F',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                  }}
                >
                  {exp.subtitle}
                </span>
                <span
                  style={{
                    backgroundColor: 'rgba(24, 37, 46, 0.8)',
                    border: '1px solid #B96F4F',
                    color: '#F7F3EA',
                    padding: '3px 10px',
                    borderRadius: '3px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {exp.price}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display, "Cormorant Garamond")',
                  fontSize: '1.7rem',
                  color: '#F7F3EA',
                  marginBottom: '1rem',
                  lineHeight: 1.25,
                }}
              >
                {exp.title}
              </h3>

              <p style={{ color: '#E9DFCF', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                {exp.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0',
                  borderTop: '1px solid rgba(233, 223, 207, 0.1)',
                  borderBottom: '1px solid rgba(233, 223, 207, 0.1)',
                  fontSize: '0.8rem',
                  color: '#A9BDB5',
                  marginBottom: '1.5rem',
                }}
              >
                <span>👤 {exp.capacity}</span>
                <span>⏱️ {exp.timing}</span>
              </div>

              {exp.features && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', fontSize: '0.85rem', color: '#E9DFCF' }}>
                  {exp.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#B96F4F' }}>•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={triggerReservation}
                style={{
                  backgroundColor: '#B96F4F',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '3px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Inquire for Experience
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
