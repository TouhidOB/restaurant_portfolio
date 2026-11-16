import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchCustomPage } from '../services/api';

export default function CustomPageView({ slug, onNavigate }) {
  const { customPages = [], openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const found = customPages.find((p) => p.slug === slug);
    if (found) {
      setPage(found);
      setLoading(false);
      return;
    }

    fetchCustomPage(slug)
      .then((res) => {
        if (res && isMounted) {
          setPage(res.page || res.data || res);
        }
      })
      .catch((err) => {
        console.warn('Custom page fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [slug, customPages]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-champagne)', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
          LOADING BESPOKE CANVAS...
        </p>
      </div>
    );
  }

  const currentPage =
    page ||
    customPages.find((p) => p.slug === slug) ||
    customPages[0] || {
      title: "Private Wine Vault & Dry-Aging Tasting",
      blocks: [
        {
          type: "hero",
          title: "The Subterranean Wine Vault",
          subtitle: "CURATED EXCLUSIVITY & PRIVATE CELLAR DINING",
          content: "Descend beneath the Manhattan pavement into our private temperature-controlled vault. Dine surrounded by 3,000 bottles of Grand Cru Bordeaux and library Napa Cabernets with a dedicated steak sommelier."
        }
      ]
    };

  const blocks = currentPage.blocks || [];

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, var(--color-charcoal) 0%, var(--color-obsidian) 100%)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="section-container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            CHARRED & PRIME PRESENTATION
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--color-ivory)',
              fontWeight: 600,
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            {currentPage.title}
          </h1>
          <div style={{ width: '80px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto' }} />
        </div>
      </div>

      {/* Dynamic Blocks Canvas */}
      <div className="section-container" style={{ maxWidth: '1100px', margin: '4rem auto 6rem', padding: '0 1.5rem' }}>
        {blocks.map((block, idx) => {
          if (block.type === 'hero') {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)',
                  padding: '4rem 2.5rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--color-bronze)' }} />
                {block.subtitle && (
                  <span style={{ color: 'var(--color-champagne)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                    {block.subtitle}
                  </span>
                )}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-ivory)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                  {block.title}
                </h2>
                <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                  {block.content}
                </p>
                {block.button_text && (
                  <button
                    onClick={() => triggerReservation('Private Wine Vault')}
                    style={{ padding: '14px 36px', fontSize: '12px', fontWeight: 700, background: 'var(--color-bronze)', color: '#101010', border: 'none', borderRadius: '2px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer' }}
                  >
                    {block.button_text}
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
                  gap: '3rem',
                  alignItems: 'center',
                  marginBottom: '4rem',
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)',
                  padding: '3rem',
                }}
              >
                <div>
                  {block.subtitle && (
                    <span style={{ color: 'var(--color-champagne)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                      {block.subtitle}
                    </span>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: 1.25 }}>
                    {block.title}
                  </h3>
                  <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                    {block.content}
                  </p>
                  {block.button_text && (
                    <button
                      onClick={() => triggerReservation('Custom Reservation')}
                      style={{ padding: '12px 28px', fontSize: '11px', fontWeight: 700, background: 'var(--color-bronze)', color: '#101010', border: 'none', borderRadius: '2px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
                    >
                      {block.button_text}
                    </button>
                  )}
                </div>
                {block.image_url && (
                  <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)', height: '360px' }}>
                    <img src={block.image_url} alt={block.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            );
          }

          if (block.type === 'features') {
            return (
              <div key={idx} style={{ marginBottom: '4rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
                  {block.subtitle && (
                    <span style={{ color: 'var(--color-bronze)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                      {block.subtitle}
                    </span>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)' }}>
                    {block.title}
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                  {block.items && block.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        backgroundColor: 'var(--color-charcoal)',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle)',
                        padding: '2rem',
                      }}
                    >
                      {item.icon && <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{item.icon}</div>}
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                        {item.text || item.description}
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
                  background: 'var(--color-charcoal)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
                  {block.title}
                </h3>
                <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 2rem' }}>
                  {block.content}
                </p>
                <button
                  onClick={() => triggerReservation('Private Enclosure')}
                  style={{ padding: '14px 36px', fontSize: '12px', fontWeight: 700, background: 'var(--color-bronze)', color: '#101010', border: 'none', borderRadius: '2px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer' }}
                >
                  {block.button_text || 'Inquire Now'}
                </button>
              </div>
            );
          }

          if (block.type === 'reservation') {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)',
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                }}
              >
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                  TABLE AVAILABILITY
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
                  {block.title || 'Reserve Your Private Cellar Table'}
                </h3>
                <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2rem' }}>
                  {block.content || 'Select between daylight executive lunch service or twilight dinner shifts.'}
                </p>
                <button
                  onClick={() => triggerReservation('Private Canvas Table')}
                  style={{ padding: '14px 36px', fontSize: '12px', fontWeight: 700, background: 'var(--color-bronze)', color: '#101010', border: 'none', borderRadius: '2px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer' }}
                >
                  Open Table Reservation
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
