import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const teamSection = content?.editorial_sections?.s09_team || {};
  const teamMembers = content?.team_members || [
    {
      id: 1,
      name: "Antoine Laurent",
      role: "Chef Patron & Culinary Director",
      bio: "Trained under French and Italian masters before returning to his native Côte d'Azur. Antoine champions radical ingredient honesty and maritime purity.",
      credentials: "Three Michelin Stars • Grand Chef Relais & Châteaux",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: 2,
      name: "Eléonore de Saint-Roch",
      role: "Head Sommelier",
      bio: "Guardian of our 480-label subterranean cellar. Eléonore focuses passionately on biodynamic coastal vineyards from Bandol to Santorini.",
      credentials: "Best Sommelier Côte d'Azur 2021",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=85"
    },
    {
      id: 3,
      name: "Giancarlo Rossi",
      role: "Maître de Maison",
      bio: "With three decades orchestrating luxury hospitality on the Riviera, Giancarlo delivers warm, aristocratic yet unpretentious warmth to every guest.",
      credentials: "Grand Table de France Distinction",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85"
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
            {teamSection.badge || 'THE ARTISANS'}
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
            {teamSection.title || 'Custodians of Taste & Hospitality'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {teamSection.description || 'A brigade united by an uncompromising pursuit of Mediterranean dining elegance, coastal ingredient purity, and heartfelt French-Italian hospitality.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4.5rem auto 6rem', padding: '0 1.5rem' }}>
        {/* Chef Patron Spotlight */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            backgroundColor: '#263A48',
            borderRadius: '8px',
            border: '1px solid rgba(233, 223, 207, 0.2)',
            padding: '3rem',
            marginBottom: '5rem',
          }}
        >
          <div style={{ borderRadius: '6px', overflow: 'hidden', maxHeight: '450px' }}>
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85"
              alt="Chef Antoine Laurent"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <span
              style={{
                color: '#B96F4F',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Chef Patron & Culinary Director
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: '2.5rem',
                color: '#F7F3EA',
                marginBottom: '1rem',
              }}
            >
              Antoine Laurent
            </h2>
            <p style={{ color: '#A9BDB5', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1rem' }}>
              "To cook on the Riviera is to serve as an humble interpreter between the Mediterranean dawn, the terraced olive groves, and the guest’s memory."
            </p>
            <p style={{ color: '#E9DFCF', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Born in Saint-Jean-Cap-Ferrat, Antoine spent fifteen years refining his craft in Paris and Modena before returning to restore Villa Riviera. His cooking is defined by clean lines, direct flavours, and deep respect for maritime seasons.
            </p>
            <div
              style={{
                display: 'inline-block',
                border: '1px solid #B96F4F',
                padding: '6px 14px',
                borderRadius: '3px',
                fontSize: '0.8rem',
                color: '#E9DFCF',
                backgroundColor: 'rgba(24, 37, 46, 0.7)',
              }}
            >
              Three Michelin Stars • Grand Chef Relais & Châteaux
            </div>
          </div>
        </div>

        {/* Artisans Brigade */}
        <h3
          style={{
            fontFamily: 'var(--font-display, "Cormorant Garamond")',
            fontSize: '2rem',
            color: '#F7F3EA',
            textAlign: 'center',
            marginBottom: '2.5rem',
          }}
        >
          Key Leaders of Service & Cellar
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              style={{
                backgroundColor: '#263A48',
                borderRadius: '6px',
                border: '1px solid rgba(233, 223, 207, 0.2)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-display, "Cormorant Garamond")',
                  fontSize: '1.6rem',
                  color: '#F7F3EA',
                  marginBottom: '0.4rem',
                }}
              >
                {member.name}
              </h4>
              <span
                style={{
                  color: '#B96F4F',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1rem',
                  display: 'block',
                }}
              >
                {member.role}
              </span>
              <p
                style={{
                  color: '#E9DFCF',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: '1.25rem',
                }}
              >
                {member.bio}
              </p>
              {member.credentials && (
                <div
                  style={{
                    borderTop: '1px solid rgba(233, 223, 207, 0.1)',
                    paddingTop: '0.75rem',
                    color: '#A9BDB5',
                    fontSize: '0.78rem',
                  }}
                >
                  {member.credentials}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '5rem',
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: '#263A48',
            borderRadius: '6px',
            border: '1px solid rgba(185, 111, 79, 0.35)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '2rem',
              color: '#F7F3EA',
              marginBottom: '0.75rem',
            }}
          >
            Dine with Chef Antoine Laurent's Brigade
          </h3>
          <p style={{ color: '#E9DFCF', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
            Book your tasting experience for lunch or dinner with our dedicated sommelier pairings.
          </p>
          <button
            onClick={triggerReservation}
            style={{
              backgroundColor: '#B96F4F',
              color: '#FFFFFF',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '3px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Reserve Your Experience
          </button>
        </div>
      </div>
    </div>
  );
}
