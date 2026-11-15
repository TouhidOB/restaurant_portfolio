import React, { useState, useEffect } from 'react';
import { fetchCustomPage } from '../services/api';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, ArrowRight, ChevronDown, Check, Send } from 'lucide-react';

export default function CustomPageView({ slug, onNavigateHome }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { openReservation, customPages: fallbackPages } = useCMS();

  // Accordion active index state
  const [activeFaq, setActiveFaq] = useState(null);

  // Form submission state for contact block
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCustomPage(slug)
      .then((data) => {
        if (!mounted) return;
        if (data) {
          setPageData(data);
          setError(null);
        } else {
          // Check fallback from context
          const found = (fallbackPages || []).find((p) => p.slug === slug);
          if (found) {
            setPageData(found);
            setError(null);
          } else {
            setError(`Page '/page/${slug}' not found or is currently unpublished.`);
          }
        }
      })
      .catch((err) => {
        if (!mounted) return;
        const found = (fallbackPages || []).find((p) => p.slug === slug);
        if (found) {
          setPageData(found);
          setError(null);
        } else {
          setError(err.message || 'Failed to load page content.');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug, fallbackPages]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', backgroundColor: '#141715' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(182, 161, 123, 0.2)', borderTopColor: '#B6A17B', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', color: '#B6A17B', fontSize: '15px' }}>
          Consulting ENSO Sanctuary Architecture...
        </p>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#141715' }}>
        <div style={{ background: '#1A1E1B', border: '1px solid #B6A17B', padding: '3rem 2rem', borderRadius: '2px', maxWidth: '550px', textAlign: 'center', color: '#F2EFE6' }}>
          <h2 style={{ color: '#B6A17B', fontFamily: 'var(--font-display, Cormorant Garamond)', marginBottom: '1rem' }}>Page Not Found</h2>
          <p style={{ color: 'rgba(242, 239, 230, 0.8)', marginBottom: '2rem', fontSize: '14px' }}>{error}</p>
          <button
            onClick={onNavigateHome}
            style={{
              padding: '12px 24px',
              backgroundColor: '#B6A17B',
              color: '#141715',
              border: 'none',
              fontFamily: 'var(--font-display, Cormorant Garamond)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ← Return to ENSO Homepage
          </button>
        </div>
      </div>
    );
  }

  const blocks = pageData.blocks || [];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', backgroundColor: '#141715', color: '#F2EFE6' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ background: 'rgba(26, 30, 27, 0.98)', borderBottom: '1px solid rgba(182, 161, 123, 0.25)', padding: '0.85rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', letterSpacing: '0.1em' }}>
            <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#B6A17B', cursor: 'pointer', padding: 0 }}>
              HOME
            </button>
            <span style={{ color: '#8E968F' }}>/</span>
            <span style={{ color: 'rgba(242, 239, 230, 0.7)' }}>PAGES</span>
            <span style={{ color: '#8E968F' }}>/</span>
            <span style={{ color: '#F2EFE6', textTransform: 'uppercase' }}>{pageData.title}</span>
          </div>
          <span style={{ fontSize: '11px', color: '#B6A17B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {pageData.theme_style || 'ZEN SANCTUARY'}
          </span>
        </div>
      </div>

      {/* Render Dynamic Visual Blocks */}
      <div>
        {blocks.map((block, idx) => {
          const d = block.data || block;
          switch (block.type) {
            case 'hero_banner':
              return (
                <section
                  key={idx}
                  style={{
                    position: 'relative',
                    minHeight: '65vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '5rem 1.5rem',
                    background: `linear-gradient(rgba(20, 23, 21, 0.75), rgba(20, 23, 21, 0.9)), url(${d.bg_image || d.image || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1920&auto=format&fit=crop'}) center/cover no-repeat`,
                    borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
                  }}
                >
                  <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                    {(d.eyebrow || d.subtitle) && (
                      <span style={{ display: 'inline-block', color: '#B6A17B', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                        {d.eyebrow || d.subtitle}
                      </span>
                    )}
                    <h1 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F2EFE6', lineHeight: 1.15, marginBottom: '1.5rem' }}>
                      {d.headline || d.title || pageData.title}
                    </h1>
                    {(d.lead || d.description || d.content) && (
                      <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.9)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        {d.lead || d.description || d.content}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={openReservation}
                        style={{
                          padding: '14px 32px',
                          backgroundColor: '#B6A17B',
                          color: '#141715',
                          border: 'none',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        {d.cta_text || d.button_text || 'Reserve Sanctuary Seating'}
                      </button>
                    </div>
                  </div>
                </section>
              );

            case 'split_content':
              const isReverse = d.image_position === 'left' || d.layout === 'image_left';
              return (
                <section key={idx} style={{ padding: '6rem 1.5rem', borderBottom: '1px solid rgba(182, 161, 123, 0.2)' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    {isReverse && (
                      <div style={{ height: '420px', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(182, 161, 123, 0.3)' }}>
                        <img src={d.image_url || d.image} alt={d.headline || d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div>
                      {(d.eyebrow || d.badge) && (
                        <span style={{ fontSize: '11px', color: '#B6A17B', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                          {d.eyebrow || d.badge}
                        </span>
                      )}
                      <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F2EFE6', margin: '0.75rem 0 1.25rem' }}>
                        {d.headline || d.title}
                      </h2>
                      <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', marginBottom: '1.5rem' }}>
                        {d.content || d.description}
                      </p>
                      <button
                        onClick={openReservation}
                        style={{
                          padding: '12px 24px',
                          backgroundColor: '#B6A17B',
                          color: '#141715',
                          border: 'none',
                          fontSize: '11px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Inquire For Table →
                      </button>
                    </div>
                    {!isReverse && (
                      <div style={{ height: '420px', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(182, 161, 123, 0.3)' }}>
                        <img src={d.image_url || d.image} alt={d.headline || d.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </section>
              );

            case 'features_grid':
              const items = d.items || d.features || [];
              return (
                <section key={idx} style={{ padding: '6rem 1.5rem', backgroundColor: '#1A1E1B', borderBottom: '1px solid rgba(182, 161, 123, 0.2)' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    {d.eyebrow && (
                      <span style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                        {d.eyebrow}
                      </span>
                    )}
                    <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2EFE6', margin: '0.5rem 0 1rem' }}>
                      {d.headline || d.title}
                    </h2>
                    {d.subtitle && (
                      <p style={{ fontSize: '15px', color: 'rgba(242, 239, 230, 0.8)', maxWidth: '650px', margin: '0 auto 3rem' }}>
                        {d.subtitle}
                      </p>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                      {items.map((it, fIdx) => (
                        <div
                          key={fIdx}
                          style={{
                            backgroundColor: '#202422',
                            border: '1px solid rgba(182, 161, 123, 0.25)',
                            padding: '2rem',
                            borderRadius: '2px',
                            textAlign: 'left',
                          }}
                        >
                          <div style={{ color: '#B6A17B', fontSize: '24px', marginBottom: '1rem' }}>
                            {it.icon || '円'}
                          </div>
                          <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.4rem', color: '#F2EFE6', marginBottom: '0.5rem' }}>
                            {it.title}
                          </h3>
                          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(242, 239, 230, 0.75)' }}>
                            {it.desc || it.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'call_to_action':
              return (
                <section
                  key={idx}
                  style={{
                    padding: '6rem 1.5rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(182, 161, 123, 0.1) 0%, rgba(20, 23, 21, 0.95) 100%)',
                    borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
                  }}
                >
                  <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                    {d.eyebrow && (
                      <span style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                        {d.eyebrow}
                      </span>
                    )}
                    <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#F2EFE6', margin: '0.75rem 0 1rem' }}>
                      {d.headline || d.title}
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', marginBottom: '2.5rem' }}>
                      {d.lead || d.description || d.content}
                    </p>
                    <button
                      onClick={openReservation}
                      style={{
                        padding: '14px 32px',
                        backgroundColor: '#B6A17B',
                        color: '#141715',
                        border: 'none',
                        borderRadius: '2px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      {d.button_text || 'Reserve Sanctuary Seating →'}
                    </button>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
