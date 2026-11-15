import React, { useState, useEffect } from 'react';
import { fetchCustomPage } from '../services/api';
import { useCMS } from '../context/CMSContext';

export default function CustomPageView({ slug, onNavigateHome, onNavigateTo }) {
  const { openReservation } = useCMS();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCustomPage(slug).then((data) => {
      if (mounted) {
        setPageData(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        RENDERING ARCHITECTURAL PAGE...
      </div>
    );
  }

  if (!pageData) {
    return (
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>PAGE NOT FOUND</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
          The requested custom page could not be located or is unpublished.
        </p>
        <button onClick={onNavigateHome} className="btn-orange">
          RETURN TO MONOLITH INDEX &rarr;
        </button>
      </div>
    );
  }

  const blocks = pageData.blocks || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      {/* Breadcrumb Bar */}
      <div className="container-brutal" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>{pageData.title}</span>
        </div>
      </div>

      {/* Render Dynamic Modular Blocks */}
      <div>
        {blocks.map((block, idx) => {
          if (block.type === 'hero') {
            return (
              <div
                key={block.id || idx}
                style={{
                  position: 'relative',
                  minHeight: '440px',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#000',
                  borderBottom: '2px solid var(--border-steel)',
                  marginBottom: '4rem',
                  overflow: 'hidden',
                }}
              >
                {block.image && (
                  <img
                    src={block.image}
                    alt={block.headline}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
                  />
                )}
                <div className="container-brutal" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem' }}>
                  {block.tag && <span className="section-tag">{block.tag}</span>}
                  <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.05, margin: '0.75rem 0 1rem' }}>
                    {block.headline}
                  </h1>
                  {block.subheadline && (
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: 'var(--accent-orange)', maxWidth: '750px', marginBottom: '2rem' }}>
                      {block.subheadline}
                    </p>
                  )}
                  {block.button_text && (
                    <button
                      onClick={() => {
                        if (block.button_link === '/contact' || block.button_link === '#reservation') {
                          openReservation();
                        } else if (block.button_link && onNavigateTo) {
                          onNavigateTo(block.button_link);
                        }
                      }}
                      className="btn-orange"
                      style={{ padding: '0.85rem 2rem' }}
                    >
                      {block.button_text} &rarr;
                    </button>
                  )}
                </div>
              </div>
            );
          }

          if (block.type === 'split') {
            return (
              <div key={block.id || idx} className="container-brutal" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2.5rem' }}>
                  <div>
                    <span className="section-tag">SPATIAL SPLIT</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0 1rem', textTransform: 'uppercase' }}>
                      {block.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      {block.description}
                    </p>
                  </div>
                  {block.image && (
                    <div style={{ height: '300px', background: '#000', overflow: 'hidden', border: '1px solid var(--border-steel)' }}>
                      <img src={block.image} alt={block.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (block.type === 'features') {
            return (
              <div key={block.id || idx} className="container-brutal" style={{ marginBottom: '4rem' }}>
                <span className="section-tag">SPATIAL PARAMETERS</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 2rem', textTransform: 'uppercase' }}>
                  {block.title || 'SPECIFICATIONS'}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`, gap: '1.5rem' }}>
                  {(block.items || []).map((item, itemIdx) => (
                    <div key={itemIdx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2rem', borderTop: '3px solid var(--accent-orange)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        FEATURE 0{itemIdx + 1}
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem', color: '#fff' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (block.type === 'cta') {
            return (
              <div key={block.id || idx} className="container-brutal" style={{ marginBottom: '4rem' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-orange)', padding: '3.5rem 2rem', textAlign: 'center' }}>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    {block.title}
                  </h2>
                  {block.subtitle && (
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
                      {block.subtitle}
                    </p>
                  )}
                  <button
                    onClick={() => {
                      if (block.button_link === '/contact' || block.button_link === '#reservation') {
                        openReservation();
                      } else if (block.button_link && onNavigateTo) {
                        onNavigateTo(block.button_link);
                      } else {
                        openReservation();
                      }
                    }}
                    className="btn-orange"
                    style={{ padding: '0.85rem 2.5rem' }}
                  >
                    {block.button_text || 'COMMISSION RESERVATION'} &rarr;
                  </button>
                </div>
              </div>
            );
          }

          if (block.type === 'reservation') {
            return (
              <div key={block.id || idx} className="container-brutal" style={{ marginBottom: '4rem' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '3rem', textAlign: 'center' }}>
                  <span className="section-tag">RESERVATION PORTAL</span>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, textTransform: 'uppercase', margin: '0.5rem 0 1rem' }}>
                    {block.title || 'RESERVE THIS EXPERIENCE'}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                    Available for Lunch and Dinner shifts with bespoke host allocations.
                  </p>
                  <button onClick={openReservation} className="btn-orange" style={{ padding: '0.75rem 2rem' }}>
                    OPEN RESERVATION DESK &rarr;
                  </button>
                </div>
              </div>
            );
          }

          if (block.type === 'faq') {
            return (
              <div key={block.id || idx} className="container-brutal" style={{ marginBottom: '4rem' }}>
                <span className="section-tag">INQUIRIES</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, textTransform: 'uppercase', margin: '0.5rem 0 2rem' }}>
                  {block.title || 'FREQUENT INQUIRIES'}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(block.faqs || []).map((faq, fIdx) => (
                    <div key={fIdx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                        {faq.question}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Return to Index Footer Link */}
      <div className="container-brutal" style={{ paddingBottom: '4rem', textAlign: 'center', borderTop: '1px solid var(--border-steel)', paddingTop: '2.5rem' }}>
        <button onClick={onNavigateHome} className="btn-brutal-secondary" style={{ padding: '0.75rem 2rem' }}>
          &larr; RETURN TO MONOLITH INDEX
        </button>
      </div>
    </div>
  );
}
