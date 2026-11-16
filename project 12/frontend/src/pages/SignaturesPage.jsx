import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage({ onNavigate }) {
  const { content, openReservationModal, openReservation, setSelectedDish } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const sigSection = content?.editorial_sections?.s06_signatures || {};
  const dishes = content?.signature_dishes || [
    {
      id: 1,
      name: "Crudo di Ricciola al Bergamotto",
      subtitle: "Yellowtail Amberjack Crudo",
      description: "Thinly shaved wild amberjack dressed with fermented bergamot citrus, coastal sea purslane, and single-estate Riviera olive oil.",
      price: "€38",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85",
      is_signature: true,
      dietary_tags: "Wild Caught, Gluten-Free",
      pairing_notes: "Bellet Blanc 2022"
    },
    {
      id: 2,
      name: "Tagliolini al Tartufo Estivo della Riviera",
      subtitle: "Summer Black Truffle Tagliolini",
      description: "36-egg-yolk pasta emulsified with Alpine mountain butter, 30-month Parmigiano Vacche Rosse, and shaved black summer truffle.",
      price: "€48",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=85",
      is_signature: true,
      dietary_tags: "Vegetarian",
      pairing_notes: "Chardonnay Langhe DOC"
    },
    {
      id: 3,
      name: "Branzino Selvaggio in Crosta di Sale Marino",
      subtitle: "Wild Sea Bass Baked in Salt Crust",
      description: "Line-caught Cap-Ferrat sea bass baked in Camargue sea salt and wild rosemary, filleted tableside with braised baby artichokes.",
      price: "€58",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85",
      is_signature: true,
      dietary_tags: "Wild Catch",
      pairing_notes: "Meursault Premier Cru"
    }
  ];

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.6) 0%, #18252E 100%)',
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
            {sigSection.badge || 'CULINARY MASTERPIECES'}
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
            {sigSection.title || 'Signature Compositions of the Riviera'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {sigSection.description || 'A curated preview of our brigade’s most celebrated creations, where coastal sea harvests meet Provençal botanical precision.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {dishes.map((dish, idx) => {
            const price = dish.price || '€45';
            const img = dish.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85';

            return (
              <div
                key={dish.id || idx}
                onClick={() => setSelectedDish && setSelectedDish(dish)}
                style={{
                  backgroundColor: '#263A48',
                  borderRadius: '6px',
                  border: '1px solid rgba(233, 223, 207, 0.2)',
                  overflow: 'hidden',
                  cursor: 'pointer',
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
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <img
                    src={img}
                    alt={dish.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(24, 37, 46, 0.9)',
                      border: '1px solid #B96F4F',
                      padding: '4px 12px',
                      borderRadius: '3px',
                      color: '#F7F3EA',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                    }}
                  >
                    {price}
                  </div>
                  {dish.dietary_tags && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        backgroundColor: 'rgba(24, 37, 46, 0.85)',
                        backdropFilter: 'blur(4px)',
                        padding: '3px 10px',
                        borderRadius: '3px',
                        fontSize: '0.72rem',
                        color: '#A9BDB5',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {dish.dietary_tags}
                    </div>
                  )}
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      textTransform: 'uppercase',
                      color: '#B96F4F',
                      letterSpacing: '0.1em',
                      marginBottom: '0.35rem',
                      fontWeight: 600,
                    }}
                  >
                    {dish.subtitle || 'Villa Riviera Specialità'}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, "Cormorant Garamond")',
                      fontSize: '1.6rem',
                      color: '#F7F3EA',
                      marginBottom: '0.75rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {dish.name}
                  </h3>
                  <p
                    style={{
                      color: '#E9DFCF',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      flex: 1,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {dish.description}
                  </p>

                  {dish.pairing_notes && (
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(24, 37, 46, 0.6)',
                        borderLeft: '2px solid #596448',
                        borderRadius: '2px',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#A9BDB5', letterSpacing: '0.05em', display: 'block', marginBottom: '2px' }}>
                        Sommelier Pairing
                      </span>
                      <span style={{ fontSize: '0.86rem', color: '#E9DFCF', fontStyle: 'italic' }}>
                        {dish.pairing_notes}
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(233, 223, 207, 0.12)',
                      paddingTop: '1rem',
                      fontSize: '0.85rem',
                      color: '#B96F4F',
                      fontWeight: 600,
                    }}
                  >
                    <span>View Culinary Notes</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking CTA */}
        <div
          style={{
            margin: '5rem auto 2rem',
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, #263A48 0%, #18252E 100%)',
            border: '1px solid rgba(185, 111, 79, 0.4)',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '2.4rem',
              color: '#F7F3EA',
              marginBottom: '1rem',
            }}
          >
            Taste the Flavours of Saint-Jean-Cap-Ferrat
          </h2>
          <p
            style={{
              color: '#E9DFCF',
              maxWidth: '650px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
              fontSize: '1.05rem',
            }}
          >
            Each dish is prepared in limited daily quantities depending upon morning marine landings and mountain herb foraging.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={triggerReservation}
              style={{
                backgroundColor: '#B96F4F',
                color: '#FFFFFF',
                padding: '14px 34px',
                border: 'none',
                borderRadius: '3px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Reserve a Table
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/menu')}
              style={{
                backgroundColor: 'transparent',
                color: '#E9DFCF',
                border: '1px solid rgba(233, 223, 207, 0.35)',
                padding: '14px 28px',
                borderRadius: '3px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Full Gastronomic Menu →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
