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
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', backgroundColor: '#0D0F10' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(214, 184, 121, 0.2)', borderTopColor: '#D6B879', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#D6B879', fontSize: '15px' }}>
          Consulting Aurelia Salon Architecture...
        </p>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: '#0D0F10' }}>
        <div style={{ background: '#123B35', border: '1px solid #D6B879', padding: '3rem 2rem', borderRadius: '4px', maxWidth: '550px', textAlign: 'center', color: '#F3EDE1' }}>
          <h2 style={{ color: '#D6B879', fontFamily: 'var(--font-display, Bodoni Moda)', marginBottom: '1rem' }}>Page Not Found</h2>
          <p style={{ color: 'rgba(243, 237, 225, 0.8)', marginBottom: '2rem', fontSize: '14px' }}>{error}</p>
          <button
            onClick={onNavigateHome}
            style={{
              padding: '12px 24px',
              backgroundColor: '#D6B879',
              color: '#123B35',
              border: 'none',
              fontFamily: 'var(--font-display, Bodoni Moda)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ← Return to Aurelia Homepage
          </button>
        </div>
      </div>
    );
  }

  const blocks = pageData.blocks || [];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ background: 'rgba(18, 59, 53, 0.95)', borderBottom: '1px solid rgba(214, 184, 121, 0.25)', padding: '0.85rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <button
              onClick={onNavigateHome}
              style={{ background: 'none', border: 'none', color: '#D6B879', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
            >
              ← Back to Aurelia
            </button>
            <span style={{ color: 'rgba(214, 184, 121, 0.4)' }}>/</span>
            <span style={{ color: '#E8D3A2' }}>{pageData.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '11px', background: 'rgba(214, 184, 121, 0.15)', color: '#D6B879', padding: '3px 8px', borderRadius: '2px', border: '1px solid rgba(214, 184, 121, 0.3)' }}>
              DYNAMIC PAGE BUILDER
            </span>
          </div>
        </div>
      </div>

      {/* Render Dynamic Blocks */}
      <div>
        {blocks.map((block, idx) => {
          switch (block.type) {
            case 'hero_banner':
              return (
                <section
                  key={idx}
                  style={{
                    position: 'relative',
                    padding: 'clamp(5rem, 8vw, 8rem) 1.5rem',
                    textAlign: 'center',
                    background: block.bg_image
                      ? `linear-gradient(rgba(13, 15, 16, 0.78), rgba(18, 59, 53, 0.9)), url(${block.bg_image}) center/cover no-repeat`
                      : 'linear-gradient(180deg, #123B35 0%, #0D0F10 100%)',
                    borderBottom: '1px solid rgba(214, 184, 121, 0.3)',
                  }}
                >
                  <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                    {block.eyebrow && (
                      <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
                        ★ {block.eyebrow}
                      </div>
                    )}
                    <h1 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#D6B879', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                      {block.title || pageData.title}
                    </h1>
                    {block.subtitle && (
                      <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(243, 237, 225, 0.9)', maxWidth: '680px', margin: '0 auto 2rem' }}>
                        {block.subtitle}
                      </p>
                    )}
                    {block.button_text && (
                      <button
                        onClick={() => openReservation(block.title || pageData.title)}
                        style={{
                          padding: '14px 32px',
                          backgroundColor: '#123B35',
                          border: '1px solid #D6B879',
                          color: '#D6B879',
                          fontFamily: 'var(--font-display, Bodoni Moda)',
                          fontSize: '13px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {block.button_text}
                      </button>
                    )}
                  </div>
                </section>
              );

            case 'split_content':
              const isReverse = block.layout === 'image_left';
              return (
                <section key={idx} style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                    {isReverse && (
                      <div style={{ height: '400px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D6B879' }}>
                        <img src={block.image} alt={block.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div>
                      {block.badge && (
                        <span style={{ fontSize: '11px', color: '#D6B879', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                          {block.badge}
                        </span>
                      )}
                      <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#D6B879', margin: '0.75rem 0 1.25rem' }}>
                        {block.title}
                      </h2>
                      <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(243, 237, 225, 0.85)', marginBottom: '1.5rem' }}>
                        {block.content}
                      </p>
                      {block.cta_text && (
                        <button
                          onClick={() => openReservation(block.title)}
                          style={{
                            padding: '12px 24px',
                            backgroundColor: '#123B35',
                            border: '1px solid #D6B879',
                            color: '#D6B879',
                            fontSize: '12px',
                            letterSpacing: '0.12em',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {block.cta_text}
                        </button>
                      )}
                    </div>
                    {!isReverse && (
                      <div style={{ height: '400px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D6B879' }}>
                        <img src={block.image} alt={block.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </section>
              );

            case 'features_grid':
              const items = block.features || [];
              return (
                <section key={idx} style={{ padding: '5rem 1.5rem', backgroundColor: 'rgba(18, 59, 53, 0.25)', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#D6B879', marginBottom: '1rem' }}>
                      {block.title}
                    </h2>
                    {block.subtitle && (
                      <p style={{ fontSize: '15px', color: 'rgba(243, 237, 225, 0.8)', maxWidth: '650px', margin: '0 auto 3rem' }}>
                        {block.subtitle}
                      </p>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                      {items.map((it, fIdx) => (
                        <div
                          key={fIdx}
                          style={{
                            backgroundColor: '#0D0F10',
                            border: '1px solid rgba(214, 184, 121, 0.25)',
                            padding: '2rem',
                            borderRadius: '4px',
                            textAlign: 'left',
                          }}
                        >
                          <div style={{ color: '#D6B879', fontSize: '24px', marginBottom: '1rem' }}>
                            {it.icon || '✦'}
                          </div>
                          <h4 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                            {it.title}
                          </h4>
                          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(243, 237, 225, 0.75)' }}>
                            {it.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'image_gallery':
              const galleryImages = block.images || [];
              return (
                <section key={idx} style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '2.5rem', color: '#D6B879', textAlign: 'center', marginBottom: '2.5rem' }}>
                      {block.title || 'Salon Architecture & Atmosphere'}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      {galleryImages.map((imgUrl, gIdx) => (
                        <div key={gIdx} style={{ height: '240px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(214, 184, 121, 0.25)' }}>
                          <img src={imgUrl} alt={`Gallery ${gIdx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                    padding: '5rem 1.5rem',
                    textAlign: 'center',
                    background: 'linear-gradient(180deg, rgba(18, 59, 53, 0.8) 0%, rgba(13, 15, 16, 0.95) 100%)',
                    borderBottom: '1px solid rgba(214, 184, 121, 0.3)',
                  }}
                >
                  <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: '#D6B879', marginBottom: '1rem' }}>
                      {block.title}
                    </h2>
                    <p style={{ fontSize: '15px', color: 'rgba(243, 237, 225, 0.85)', lineHeight: 1.7, marginBottom: '2rem' }}>
                      {block.description}
                    </p>
                    <button
                      onClick={() => openReservation(block.title)}
                      style={{
                        padding: '14px 32px',
                        backgroundColor: '#123B35',
                        border: '1px solid #D6B879',
                        color: '#D6B879',
                        fontFamily: 'var(--font-display, Bodoni Moda)',
                        fontSize: '13px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {block.button_text || 'RESERVE A TABLE'}
                    </button>
                  </div>
                </section>
              );

            case 'faq_accordion':
              const faqs = block.items || [];
              return (
                <section key={idx} style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
                  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '2.5rem', color: '#D6B879', textAlign: 'center', marginBottom: '2.5rem' }}>
                      {block.title || 'Frequently Inquired Details'}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {faqs.map((faq, fIdx) => {
                        const isOpen = activeFaq === fIdx;
                        return (
                          <div
                            key={fIdx}
                            style={{
                              backgroundColor: 'rgba(18, 59, 53, 0.35)',
                              border: '1px solid rgba(214, 184, 121, 0.25)',
                              borderRadius: '4px',
                              overflow: 'hidden',
                            }}
                          >
                            <button
                              onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                              style={{
                                width: '100%',
                                padding: '1.25rem 1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'none',
                                border: 'none',
                                color: '#FFFFFF',
                                fontFamily: 'var(--font-display, Bodoni Moda)',
                                fontSize: '1.1rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                              }}
                            >
                              <span>{faq.question}</span>
                              <ChevronDown size={18} color="#D6B879" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                            </button>
                            {isOpen && (
                              <div style={{ padding: '0 1.5rem 1.25rem', fontSize: '14px', lineHeight: 1.7, color: 'rgba(243, 237, 225, 0.8)' }}>
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );

            case 'table_reservation':
              return (
                <section key={idx} style={{ padding: '5rem 1.5rem', backgroundColor: '#0D0F10', borderBottom: '1px solid rgba(214, 184, 121, 0.25)' }}>
                  <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '2.5rem', color: '#D6B879', marginBottom: '1rem' }}>
                      {block.title || 'Maitre d’ Table Reservation'}
                    </h2>
                    <p style={{ fontSize: '14px', color: 'rgba(243, 237, 225, 0.8)', marginBottom: '2rem' }}>
                      {block.description || 'Secure your reservation with two-way approval from our host desk.'}
                    </p>
                    <button
                      onClick={() => openReservation(block.title || 'Table Reservation')}
                      style={{
                        padding: '14px 32px',
                        backgroundColor: '#123B35',
                        border: '1px solid #D6B879',
                        color: '#D6B879',
                        fontFamily: 'var(--font-display, Bodoni Moda)',
                        fontSize: '13px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      OPEN RESERVATION DESK
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
