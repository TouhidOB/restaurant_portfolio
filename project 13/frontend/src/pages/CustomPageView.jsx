import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchCustomPage } from '../services/api';

export default function CustomPageView({ slug, onNavigate }) {
  const { customPages = [], openReservationModal } = useCMS();
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
      <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-cyan)', fontSize: '1.2rem', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em' }}>
          LOADING BESPOKE CANVAS...
        </p>
      </div>
    );
  }

  const currentPage =
    page ||
    customPages.find((p) => p.slug === slug) ||
    customPages[0] || {
      title: "Hongdae Private Pocha Experience",
      blocks: [
        {
          type: "hero",
          title: "Hongdae Private Pocha Experience",
          subtitle: "EXCLUSIVE LATE-NIGHT DINING & SOJU TENT",
          content: "Reserve our dedicated neon pocha enclosure for your private celebration, featuring signature street platters, chilled soju towers, and bespoke hospitality."
        }
      ]
    };

  const blocks = currentPage.blocks || [];

  return (
    <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Page Title & Breadcrumb Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, #1B1D22 0%, var(--color-midnight) 100%)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            SEOUL STREET SPECIAL PRESENTATION
          </span>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#FFFFFF',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            {currentPage.title}
          </h1>
          <div style={{ width: '80px', height: '3px', background: 'var(--color-magenta)', margin: '0 auto', boxShadow: '0 0 12px rgba(255, 46, 136, 0.6)' }} />
        </div>
      </div>

      {/* Dynamic Blocks Canvas */}
      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto 6rem', padding: '0 1.5rem' }}>
        {blocks.map((block, idx) => {
          if (block.type === 'hero') {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  padding: '4rem 2.5rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--color-magenta), var(--color-cyan))' }} />
                {block.subtitle && (
                  <span style={{ color: 'var(--color-cyan)', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: '1rem' }}>
                    {block.subtitle}
                  </span>
                )}
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                  {block.title}
                </h2>
                <p style={{ color: 'var(--color-silver)', fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                  {block.content}
                </p>
                {block.button_text && (
                  <button
                    onClick={() => openReservationModal && openReservationModal('Private Pocha')}
                    className="btn btn-primary"
                    style={{ padding: '14px 36px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
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
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  padding: '3rem',
                }}
              >
                <div>
                  {block.subtitle && (
                    <span style={{ color: 'var(--color-coral)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.75rem' }}>
                      {block.subtitle}
                    </span>
                  )}
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.25 }}>
                    {block.title}
                  </h3>
                  <p style={{ color: 'var(--color-silver)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                    {block.content}
                  </p>
                  {block.button_text && (
                    <button
                      onClick={() => openReservationModal && openReservationModal('Custom Reservation')}
                      className="btn btn-primary"
                      style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700, borderRadius: '8px' }}
                    >
                      {block.button_text}
                    </button>
                  )}
                </div>
                {block.image_url && (
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)', height: '360px' }}>
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
                    <span style={{ color: 'var(--color-amber)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.5rem' }}>
                      {block.subtitle}
                    </span>
                  )}
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.2rem', color: '#FFFFFF' }}>
                    {block.title}
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  {block.items && block.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        backgroundColor: 'var(--color-charcoal)',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)',
                        padding: '2rem',
                      }}
                    >
                      {item.icon && <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>}
                      <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: 'var(--color-silver)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
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
                  background: 'linear-gradient(135deg, rgba(255, 46, 136, 0.2), rgba(33, 212, 232, 0.2))',
                  border: '1px solid var(--color-magenta)',
                  borderRadius: '16px',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                }}
              >
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                  {block.title}
                </h3>
                <p style={{ color: 'var(--color-silver)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 2rem' }}>
                  {block.content}
                </p>
                <button
                  onClick={() => openReservationModal && openReservationModal('Private Enclosure')}
                  className="btn btn-primary"
                  style={{ padding: '14px 36px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
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
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  padding: '3.5rem 2rem',
                  textAlign: 'center',
                  marginBottom: '4rem',
                }}
              >
                <span className="text-eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>TABLE AVAILABILITY</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                  {block.title || 'Reserve Your Private Pocha Table'}
                </h3>
                <p style={{ color: 'var(--color-silver)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2rem' }}>
                  {block.content || 'Select from daylight lunch service or twilight pocha shifts.'}
                </p>
                <button
                  onClick={() => openReservationModal && openReservationModal('Private Canvas Table')}
                  className="btn btn-primary"
                  style={{ padding: '14px 36px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
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
