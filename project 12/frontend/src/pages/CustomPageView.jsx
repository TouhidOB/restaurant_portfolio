import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { getCustomPage } from '../services/api';

export default function CustomPageView({ slug, onNavigate }) {
  const { customPages = [], openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = customPages.find((p) => p.slug === slug);
    if (found) {
      setPage(found);
      setLoading(false);
      return;
    }

    getCustomPage(slug)
      .then((res) => {
        if (res && (res.page || res.data)) {
          setPage(res.page || res.data);
        }
      })
      .catch((err) => {
        console.warn('Custom page fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, customPages]);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '160px', textAlign: 'center' }}>
        <p style={{ color: '#A9BDB5', fontSize: '18px' }}>Loading custom presentation...</p>
      </div>
    );
  }

  const currentPage =
    page ||
    customPages.find((p) => p.slug === slug) ||
    customPages[0] || {
      title: "Private Cliffside Villa Dining Cap-Ferrat",
      blocks: [
        {
          type: "hero",
          title: "Private Cliffside Villa Dining",
          subtitle: "EXCLUSIVITY & PANORAMIC MEDITERRANEAN GRANDEUR",
          content: "Suspended above the turquoise azure of Saint-Jean-Cap-Ferrat, Villa Riviera offers bespoke private dining with dedicated brigade service."
        }
      ]
    };

  const blocks = currentPage.blocks || [];

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Page Title & Breadcrumb */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.15)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: '#B96F4F', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.5rem' }}>
            VILLA RIVIERA PRESENTATION
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#F7F3EA',
              margin: '0 0 1rem',
            }}
          >
            {currentPage.title}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '0 auto' }} />
        </div>
      </div>

      {/* Blocks Canvas */}
      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto 6rem', padding: '0 1.5rem' }}>
        {blocks.map((block, idx) => {
          if (block.type === 'hero') {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#263A48',
                  borderRadius: '8px',
                  border: '1px solid rgba(233, 223, 207, 0.2)',
                  padding: '4rem 2.5rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                }}
              >
                {block.subtitle && (
                  <span style={{ color: '#B96F4F', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                    {block.subtitle}
                  </span>
                )}
                <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.8rem', color: '#F7F3EA', marginBottom: '1.25rem' }}>
                  {block.title}
                </h2>
                <p style={{ color: '#E9DFCF', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                  {block.content}
                </p>
                {block.cta_text && (
                  <button
                    onClick={triggerReservation}
                    style={{
                      backgroundColor: '#B96F4F',
                      color: '#FFFFFF',
                      padding: '12px 30px',
                      borderRadius: '3px',
                      border: 'none',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    {block.cta_text}
                  </button>
                )}
              </div>
            );
          }

          if (block.type === 'split') {
            return (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '3.5rem',
                  alignItems: 'center',
                  backgroundColor: '#263A48',
                  borderRadius: '8px',
                  border: '1px solid rgba(233, 223, 207, 0.2)',
                  padding: '3rem',
                  marginBottom: '4rem',
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.2rem', color: '#F7F3EA', marginBottom: '1rem' }}>
                    {block.title}
                  </h3>
                  <p style={{ color: '#E9DFCF', lineHeight: 1.7, fontSize: '1.02rem', marginBottom: '1.5rem' }}>
                    {block.content}
                  </p>
                  {block.cta_text && (
                    <button
                      onClick={triggerReservation}
                      style={{
                        backgroundColor: '#B96F4F',
                        color: '#FFFFFF',
                        padding: '10px 24px',
                        borderRadius: '3px',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                      }}
                    >
                      {block.cta_text}
                    </button>
                  )}
                </div>
                {block.image && (
                  <div style={{ borderRadius: '6px', overflow: 'hidden', height: '320px' }}>
                    <img src={block.image} alt={block.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            );
          }

          if (block.type === 'features') {
            return (
              <div key={idx} style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.4rem', color: '#F7F3EA', textAlign: 'center', marginBottom: '2.5rem' }}>
                  {block.title || 'Curated Highlights'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  {(block.items || []).map((item, iIdx) => (
                    <div
                      key={iIdx}
                      style={{
                        backgroundColor: '#263A48',
                        padding: '2rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(233, 223, 207, 0.2)',
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.4rem', color: '#F7F3EA', marginBottom: '0.6rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: '#E9DFCF', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        {item.description || item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (block.type === 'cta') {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#263A48',
                  borderRadius: '8px',
                  border: '1px solid rgba(185, 111, 79, 0.4)',
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.4rem', color: '#F7F3EA', marginBottom: '1rem' }}>
                  {block.title}
                </h3>
                <p style={{ color: '#E9DFCF', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  {block.content}
                </p>
                <button
                  onClick={triggerReservation}
                  style={{
                    backgroundColor: '#B96F4F',
                    color: '#FFFFFF',
                    padding: '12px 32px',
                    borderRadius: '3px',
                    border: 'none',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {block.button_text || 'Book Your Table'}
                </button>
              </div>
            );
          }

          if (block.type === 'reservation') {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#263A48',
                  borderRadius: '8px',
                  border: '1px solid rgba(185, 111, 79, 0.4)',
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.4rem', color: '#F7F3EA', marginBottom: '1rem' }}>
                  {block.title || 'Reserve Your Villa Riviera Seating'}
                </h3>
                <p style={{ color: '#E9DFCF', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  {block.content || 'Select between our Daylight Lunch or Twilight Dinner services.'}
                </p>
                <button
                  onClick={triggerReservation}
                  style={{
                    backgroundColor: '#B96F4F',
                    color: '#FFFFFF',
                    padding: '12px 32px',
                    borderRadius: '3px',
                    border: 'none',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Open Reservation Desk
                </button>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
