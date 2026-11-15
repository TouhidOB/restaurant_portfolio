import React, { useState, useEffect } from 'react';
import { fetchCustomPage } from '../services/api';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, ArrowRight, ChevronDown, Check, Send, ArrowLeft } from 'lucide-react';

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
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', backgroundColor: '#FCFBF8' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #E2DAD0', borderTopColor: '#C5A059', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontFamily: 'var(--font-serif, serif)', color: '#081721', fontSize: '16px' }}>
          Consulting AURA MARINA Architecture...
        </p>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', backgroundColor: '#FCFBF8' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', padding: '40px', borderRadius: '12px', maxWidth: '540px', textAlign: 'center', color: '#1C2022' }}>
          <h2 style={{ color: '#081721', fontFamily: 'var(--font-serif, serif)', marginBottom: '12px' }}>Page Not Found</h2>
          <p style={{ color: '#7A7E80', marginBottom: '24px', fontSize: '14px' }}>{error}</p>
          <button
            onClick={onNavigateHome}
            className="btn-gold"
            style={{ padding: '12px 26px', cursor: 'pointer' }}
          >
            ← Return to Sanctuary
          </button>
        </div>
      </div>
    );
  }

  const blocks = pageData.blocks || [];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', backgroundColor: '#FCFBF8', color: '#1C2022' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2DAD0', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={onNavigateHome}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#2A6F85',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={15} /> Return to Home
          </button>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#9E7B36', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            CUSTOM PAGE: /page/{pageData.slug}
          </span>
        </div>
      </div>

      {/* Render Dynamic Blocks */}
      <div>
        {blocks.map((block, index) => {
          // Block 1: Hero
          if (block.type === 'hero') {
            return (
              <section
                key={block.id || index}
                style={{
                  position: 'relative',
                  padding: '90px 24px 110px',
                  minHeight: '480px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  background: block.backgroundImage
                    ? `linear-gradient(180deg, rgba(8, 23, 33, 0.65) 0%, rgba(8, 23, 33, 0.85) 100%), url(${block.backgroundImage}) center/cover no-repeat`
                    : 'linear-gradient(180deg, #081721 0%, #15384B 100%)',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                  {block.badge && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.25)', border: '1px solid #C5A059', color: '#DFBA73', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '20px' }}>
                      <Sparkles size={13} />
                      <span>{block.badge}</span>
                    </div>
                  )}

                  <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '16px', fontWeight: 600 }}>
                    {block.title}
                  </h1>

                  {block.subtitle && (
                    <p style={{ fontStyle: 'italic', fontSize: '1.25rem', color: '#E0C184', marginBottom: '18px' }}>
                      {block.subtitle}
                    </p>
                  )}

                  {block.description && (
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#D5E5EB', maxWidth: '720px', margin: '0 auto 32px' }}>
                      {block.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {block.primaryCta && (
                      <button
                        onClick={openReservation}
                        className="btn-gold"
                        style={{ padding: '13px 32px', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
                      >
                        {block.primaryCta.text || "Reserve Shift Table"}
                      </button>
                    )}
                    {block.secondaryCta && (
                      <a
                        href={block.secondaryCta.href || "/menu"}
                        style={{
                          padding: '13px 28px',
                          border: '1px solid #C5A059',
                          borderRadius: '4px',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          fontSize: '12.5px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                      >
                        {block.secondaryCta.text || "Explore Menu"}
                      </a>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // Block 2: 50/50 Split Story
          if (block.type === 'split') {
            const isRight = block.imagePosition === 'right';
            return (
              <section key={block.id || index} style={{ padding: '80px 24px', borderBottom: '1px solid #E2DAD0', background: '#FFFFFF' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
                  <div style={{ order: isRight ? 1 : 2 }}>
                    {block.eyebrow && (
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                        {block.eyebrow}
                      </span>
                    )}
                    <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.5rem', color: '#081721', margin: '8px 0 18px', lineHeight: 1.2 }}>
                      {block.title}
                    </h2>
                    <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: '#4A5255', marginBottom: '20px' }}>
                      {block.description}
                    </p>

                    {block.bulletPoints && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {block.bulletPoints.map((pt, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#2A6F85', fontWeight: 600 }}>
                            <Check size={16} color="#C5A059" /> {pt}
                          </li>
                        ))}
                      </ul>
                    )}

                    {block.cta && (
                      <a href={block.cta.href || "/contact"} className="btn-gold" style={{ display: 'inline-block', padding: '10px 24px', textDecoration: 'none', fontSize: '12px', textTransform: 'uppercase' }}>
                        {block.cta.text}
                      </a>
                    )}
                  </div>

                  <div style={{ order: isRight ? 2 : 1 }}>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', height: '420px', boxShadow: '0 15px 40px rgba(8, 23, 33, 0.08)', border: '1px solid #E2DAD0' }}>
                      <img
                        src={block.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'}
                        alt={block.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          // Block 3: Features Grid
          if (block.type === 'features') {
            return (
              <section key={block.id || index} style={{ padding: '80px 24px', background: '#F8F6F0', borderBottom: '1px solid #E2DAD0' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                  {block.eyebrow && (
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                      {block.eyebrow}
                    </span>
                  )}
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.5rem', color: '#081721', margin: '8px 0 12px' }}>
                    {block.title}
                  </h2>
                  {block.description && (
                    <p style={{ fontSize: '1.05rem', color: '#5C6366', maxWidth: '650px', margin: '0 auto 48px' }}>
                      {block.description}
                    </p>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`, gap: '24px', textAlign: 'left' }}>
                    {(block.items || []).map((item, idx) => (
                      <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '10px', padding: '28px', boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(197, 160, 89, 0.15)', color: '#9E7B36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', marginBottom: '14px' }}>
                          0{idx + 1}
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.35rem', color: '#081721', marginBottom: '8px' }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#5C6366', margin: 0 }}>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // Block 4: CTA Banner
          if (block.type === 'cta') {
            return (
              <section
                key={block.id || index}
                style={{
                  padding: '90px 24px',
                  textAlign: 'center',
                  background: block.backgroundImage
                    ? `linear-gradient(180deg, rgba(8, 23, 33, 0.75) 0%, rgba(8, 23, 33, 0.85) 100%), url(${block.backgroundImage}) center/cover no-repeat`
                    : '#081721',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: '#FFFFFF', marginBottom: '16px' }}>
                    {block.title}
                  </h2>
                  <p style={{ fontSize: '1.08rem', lineHeight: 1.7, color: '#D5E5EB', marginBottom: '32px' }}>
                    {block.description}
                  </p>
                  <button onClick={openReservation} className="btn-gold" style={{ padding: '14px 34px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                    {block.primaryCta?.text || "Reserve Shift Seat"}
                  </button>
                </div>
              </section>
            );
          }

          // Block 5: Gallery
          if (block.type === 'gallery') {
            return (
              <section key={block.id || index} style={{ padding: '80px 24px', borderBottom: '1px solid #E2DAD0' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.4rem', color: '#081721', marginBottom: '10px' }}>
                    {block.title}
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#7A7E80', marginBottom: '40px' }}>
                    {block.subtitle}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {(block.images || []).map((img, idx) => (
                      <div key={idx} style={{ borderRadius: '10px', overflow: 'hidden', height: '240px', border: '1px solid #E2DAD0' }}>
                        <img src={img.url} alt={img.caption || "Gallery"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          // Block 6: Table Reservation
          if (block.type === 'reservation') {
            return (
              <section key={block.id || index} style={{ padding: '80px 24px', background: '#F8F6F0', textAlign: 'center' }}>
                <div style={{ maxWidth: '650px', margin: '0 auto', background: '#FFFFFF', border: '1px solid #C5A059', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px rgba(8, 23, 33, 0.05)' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                    Shift Booking Launcher
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#081721', margin: '10px 0 12px' }}>
                    {block.title}
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: '#5C6366', marginBottom: '24px' }}>
                    {block.description}
                  </p>
                  <button onClick={openReservation} className="btn-gold" style={{ padding: '13px 32px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
                    Open Shift Reservation Desk
                  </button>
                </div>
              </section>
            );
          }

          // Block 7: FAQ Accordion
          if (block.type === 'faq') {
            return (
              <section key={block.id || index} style={{ padding: '80px 24px', borderBottom: '1px solid #E2DAD0' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.4rem', color: '#081721', marginBottom: '8px' }}>
                      {block.title}
                    </h2>
                    <p style={{ color: '#7A7E80' }}>{block.subtitle}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(block.items || []).map((item, idx) => {
                      const isOpen = activeFaq === idx;
                      return (
                        <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '8px', overflow: 'hidden' }}>
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : idx)}
                            style={{
                              width: '100%',
                              padding: '18px 20px',
                              textAlign: 'left',
                              background: 'transparent',
                              border: 'none',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              fontWeight: 600,
                              color: '#081721',
                              fontSize: '15px',
                            }}
                          >
                            <span>{item.question}</span>
                            <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                          </button>
                          {isOpen && (
                            <div style={{ padding: '0 20px 20px', color: '#5C6366', fontSize: '14px', lineHeight: 1.6 }}>
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }

          // Default fallback for any custom block
          return (
            <div key={index} style={{ padding: '40px 24px', textAlign: 'center' }}>
              <p style={{ color: '#7A7E80' }}>Block type '{block.type}' rendered.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
