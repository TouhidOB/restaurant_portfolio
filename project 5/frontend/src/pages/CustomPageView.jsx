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
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: '#1A2F25', textAlign: 'center', color: '#AAB9A0', fontFamily: 'var(--font-mono, monospace)' }}>
        RENDERING BOTANICAL PAGE...
      </div>
    );
  }

  if (!pageData) {
    return (
      <div style={{ paddingTop: '10rem', minHeight: '100vh', backgroundColor: '#1A2F25', textAlign: 'center', color: '#F6F2E9' }}>
        <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', marginBottom: '1rem' }}>PAGE NOT FOUND</h1>
        <p style={{ color: '#AAB9A0', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)' }}>
          The requested custom page could not be located or is unpublished.
        </p>
        <button
          onClick={onNavigateHome}
          style={{
            padding: '0.75rem 2rem',
            background: '#BC7153',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          RETURN TO VERDANT INDEX &rarr;
        </button>
      </div>
    );
  }

  const blocks = pageData.blocks || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 2rem)', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      {/* Breadcrumb Bar */}
      <div className="container-tropical" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>{pageData.title}</span>
        </div>
      </div>

      {/* Render Dynamic Blocks */}
      <div>
        {blocks.map((block, idx) => {
          if (block.type === 'hero') {
            return (
              <div
                key={block.id || idx}
                style={{
                  position: 'relative',
                  minHeight: '460px',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#14251D',
                  borderBottom: '1px solid rgba(170, 185, 160, 0.3)',
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
                <div className="container-tropical" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem' }}>
                  {block.tag && (
                    <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                      {block.tag}
                    </span>
                  )}
                  <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
                    {block.headline}
                  </h1>
                  {block.subheadline && (
                    <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#D9B84E', maxWidth: '750px', marginBottom: '2rem' }}>
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
                      style={{
                        padding: '0.85rem 2.2rem',
                        background: '#BC7153',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
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
              <div key={block.id || idx} className="container-tropical" style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '8px', padding: '2.5rem' }}>
                  <div>
                    <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      SPATIAL OVERVIEW
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 1rem', color: '#F6F2E9' }}>
                      {block.title}
                    </h2>
                    <p style={{ color: '#E5D7C2', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      {block.description}
                    </p>
                  </div>
                  {block.image && (
                    <div style={{ height: '300px', background: '#14251D', overflow: 'hidden', borderRadius: '6px', border: '1px solid rgba(170, 185, 160, 0.25)' }}>
                      <img src={block.image} alt={block.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (block.type === 'features') {
            return (
              <div key={block.id || idx} className="container-tropical" style={{ marginBottom: '4rem' }}>
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  AMENITIES &amp; CAPACITIES
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 2rem' }}>
                  {block.title || 'SPECIFICATIONS'}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {(block.items || []).map((item, itemIdx) => (
                    <div key={itemIdx} style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '6px', padding: '2rem', borderTop: '3px solid #BC7153' }}>
                      <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#AAB9A0', marginBottom: '0.5rem' }}>
                        FEATURE 0{itemIdx + 1}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: '#D9B84E' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: '#E5D7C2', fontSize: '0.88rem', lineHeight: 1.6 }}>
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
              <div key={block.id || idx} className="container-tropical" style={{ marginBottom: '4rem' }}>
                <div style={{ background: '#243F32', border: '1px solid #BC7153', borderRadius: '8px', padding: '3.5rem 2rem', textAlign: 'center' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {block.title}
                  </h2>
                  {block.subtitle && (
                    <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.95rem', color: '#AAB9A0', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
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
                    style={{
                      padding: '0.85rem 2.5rem',
                      background: '#BC7153',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {block.button_text || 'COMMISSION RESERVATION'} &rarr;
                  </button>
                </div>
              </div>
            );
          }

          if (block.type === 'reservation') {
            return (
              <div key={block.id || idx} className="container-tropical" style={{ marginBottom: '4rem' }}>
                <div style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.3)', borderRadius: '8px', padding: '3rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    TABLE DESK
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 1rem' }}>
                    {block.title || 'RESERVE THIS EXPERIENCE'}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.9rem', color: '#AAB9A0', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                    Available for Lunch and Dinner shifts with bespoke host allocations.
                  </p>
                  <button
                    onClick={openReservation}
                    style={{
                      padding: '0.75rem 2rem',
                      background: '#BC7153',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    OPEN RESERVATION DESK &rarr;
                  </button>
                </div>
              </div>
            );
          }

          if (block.type === 'faq') {
            return (
              <div key={block.id || idx} className="container-tropical" style={{ marginBottom: '4rem' }}>
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  FREQUENT QUESTIONS
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 2rem' }}>
                  {block.title || 'FREQUENT INQUIRIES'}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(block.faqs || []).map((faq, fIdx) => (
                    <div key={fIdx} style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '6px', padding: '1.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.2rem', fontWeight: 700, color: '#D9B84E', marginBottom: '0.5rem' }}>
                        {faq.question}
                      </h3>
                      <p style={{ color: '#E5D7C2', fontSize: '0.88rem', lineHeight: 1.6 }}>
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
      <div className="container-tropical" style={{ paddingBottom: '4rem', textAlign: 'center', borderTop: '1px solid rgba(170, 185, 160, 0.25)', paddingTop: '2.5rem' }}>
        <button
          onClick={onNavigateHome}
          style={{
            padding: '0.75rem 2rem',
            background: 'transparent',
            border: '1px solid rgba(170, 185, 160, 0.4)',
            borderRadius: '4px',
            color: '#F6F2E9',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          &larr; RETURN TO VERDANT INDEX
        </button>
      </div>
    </div>
  );
}
