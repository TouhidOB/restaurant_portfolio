import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { getCustomPage } from '../services/api';

export default function CustomPageView({ slug, onNavigate }) {
  const { customPages = [], openReservation } = useCMS();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check context first
    const found = customPages.find(p => p.slug === slug);
    if (found) {
      setPage(found);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    getCustomPage(slug)
      .then(res => {
        if (res && res.data) {
          setPage(res.data);
        }
      })
      .catch(err => {
        console.warn('Custom page fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, customPages]);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '160px', textAlign: 'center' }}>
        <p style={{ color: '#A6B5A0', fontSize: '18px' }}>Loading glasshouse presentation...</p>
      </div>
    );
  }

  const currentPage = page || customPages[0];

  if (!currentPage) {
    return (
      <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '160px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '3rem' }}>Page Not Found</h1>
        <p style={{ color: '#A6B5A0', marginTop: '1rem' }}>The requested glasshouse page does not exist or has been archived.</p>
        <button
          onClick={() => onNavigate && onNavigate('/')}
          style={{
            marginTop: '2rem',
            padding: '12px 28px',
            backgroundColor: '#A87958',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Return Home
        </button>
      </div>
    );
  }

  const blocks = currentPage.blocks || [];

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'hero':
            return (
              <section
                key={idx}
                style={{
                  background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.5) 0%, #1A2B24 100%)',
                  padding: '5rem 1.5rem',
                  textAlign: 'center',
                  borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
                }}
              >
                <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
                  {block.subtitle && (
                    <span
                      style={{
                        color: '#A87958',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        display: 'inline-block',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {block.subtitle}
                    </span>
                  )}
                  <h1
                    style={{
                      fontFamily: 'var(--font-display, "Cormorant Garamond")',
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      letterSpacing: '0.03em',
                      color: '#F4F0E6',
                      margin: '0.6rem 0 1.25rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {block.title || currentPage.title}
                  </h1>
                  <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
                  {block.lead && (
                    <p style={{ color: '#D8D2C5', fontSize: '1.2rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
                      {block.lead}
                    </p>
                  )}
                  {block.cta_text && (
                    <button
                      onClick={() => openReservation()}
                      style={{
                        marginTop: '2rem',
                        padding: '14px 36px',
                        backgroundColor: '#A87958',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '3px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      {block.cta_text}
                    </button>
                  )}
                </div>
              </section>
            );

          case 'split':
            return (
              <section key={idx} style={{ padding: '70px 24px', backgroundColor: idx % 2 === 0 ? '#1E332B' : '#1A2B24' }}>
                <div
                  className="container"
                  style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '50px',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    {block.subtitle && (
                      <span style={{ color: '#A87958', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {block.subtitle}
                      </span>
                    )}
                    <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.5rem', color: '#FFFFFF', margin: '10px 0 20px' }}>
                      {block.title}
                    </h2>
                    <div style={{ color: '#D8D2C5', fontSize: '1.05rem', lineHeight: 1.8 }}>
                      {block.body_left && <p style={{ marginBottom: '16px' }}>{block.body_left}</p>}
                      {block.body_right && <p>{block.body_right}</p>}
                      {block.body && <p>{block.body}</p>}
                    </div>
                  </div>

                  {block.image && (
                    <div style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.4)', border: '1px solid rgba(166, 181, 160, 0.3)' }}>
                      <img src={block.image} alt={block.title || 'Atrium Detail'} style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>
              </section>
            );

          case 'features':
            return (
              <section key={idx} style={{ padding: '80px 24px', backgroundColor: '#263F35' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.6rem', color: '#FFFFFF' }}>
                      {block.title || 'Distinguishing Highlights'}
                    </h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    {(block.items || []).map((item, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: '#1A2B24',
                          padding: '35px 28px',
                          borderRadius: '4px',
                          border: '1px solid rgba(166, 181, 160, 0.25)',
                        }}
                      >
                        <span style={{ fontSize: '11px', color: '#A87958', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          SPECIFICATION 0{i + 1}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.5rem', color: '#FFFFFF', margin: '12px 0 10px' }}>
                          {item.title}
                        </h3>
                        <p style={{ color: '#D8D2C5', fontSize: '0.98rem', lineHeight: 1.7, margin: 0 }}>
                          {item.description || item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'reservation':
          case 'cta':
            return (
              <section key={idx} style={{ padding: '80px 24px', backgroundColor: '#1E332B', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '750px', margin: '0 auto' }}>
                  <span style={{ color: '#A87958', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                    {block.subtitle || 'CONSERVATORY HOST DESK'}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.5rem', color: '#FFFFFF', margin: '10px 0 18px' }}>
                    {block.title || 'Inquire or Reserve'}
                  </h2>
                  <p style={{ color: '#D8D2C5', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '28px' }}>
                    {block.lead || block.body || 'Contact our botanical hospitality team or book online for live seating approval.'}
                  </p>
                  <button
                    onClick={() => openReservation()}
                    style={{
                      padding: '14px 36px',
                      backgroundColor: '#A87958',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '3px',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    {block.button_text || block.cta_text || 'Reserve A Table'}
                  </button>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
