import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchCustomPage } from '../services/api';

export default function CustomPageView({ slug }) {
  const { content, openReservation } = useCMS();
  const [page, setPage] = useState(
    (content?.custom_pages || []).find((p) => p.slug === slug) || null
  );
  const [loading, setLoading] = useState(!page);

  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);
        const data = await fetchCustomPage(slug);
        if (data) {
          setPage(data.page || data);
        }
      } catch (err) {
        console.warn('Error fetching custom page:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPage();
  }, [slug]);

  if (loading && !page) {
    return (
      <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-copper, #B87345)', fontSize: '1.2rem', fontFamily: 'var(--font-display, Oswald)' }}>
          Loading page...
        </p>
      </div>
    );
  }

  if (!page) {
    return (
      <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Oswald)', color: 'var(--color-copper, #B87345)', fontSize: '2.5rem', textTransform: 'uppercase' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--color-concrete, #B7B4AC)', marginBottom: '2rem' }}>
          The requested page does not exist or has not been published yet.
        </p>
        <a href="/" className="btn-primary">
          Return To Home
        </a>
      </div>
    );
  }

  const blocks = page.blocks || [];

  return (
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '80px' }}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'hero':
            return (
              <section
                key={idx}
                style={{
                  position: 'relative',
                  padding: '7rem 1.5rem',
                  textAlign: 'center',
                  background: block.bg_image
                    ? `linear-gradient(rgba(17, 19, 20, 0.85), rgba(17, 19, 20, 0.95)), url(${block.bg_image}) center/cover no-repeat`
                    : 'linear-gradient(180deg, rgba(145, 77, 55, 0.45) 0%, #111314 100%)',
                  borderBottom: '2px solid var(--color-brick, #914D37)',
                }}
              >
                <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
                  {block.subtitle && (
                    <span className="section-label">
                      {block.subtitle}
                    </span>
                  )}
                  <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '1.25rem' }}>
                    {block.title || page.title}
                  </h1>
                  {block.lead && (
                    <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                      {block.lead}
                    </p>
                  )}
                  {block.cta_text && (
                    <button
                      onClick={() => openReservation(block.title)}
                      className="btn-primary"
                      style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}
                    >
                      {block.cta_text}
                    </button>
                  )}
                </div>
              </section>
            );

          case 'split':
            return (
              <section key={idx} style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.4rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '1.25rem' }}>
                      {block.title}
                    </h2>
                    {block.lead && (
                      <p style={{ color: 'var(--color-amber, #E9A24B)', fontSize: '1.1rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                        {block.lead}
                      </p>
                    )}
                    <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.98rem', lineHeight: '1.8' }}>
                      {block.body}
                    </p>
                  </div>
                  {block.image && (
                    <div style={{ borderRadius: '2px', overflow: 'hidden', border: '2px solid var(--color-brick, #914D37)', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
                      <img src={block.image} alt={block.image_alt || block.title} style={{ width: '100%', height: '380px', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </section>
            );

          case 'features':
            return (
              <section key={idx} style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--color-graphite, #252729)' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                  {block.title && (
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.4rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)' }}>
                        {block.title}
                      </h2>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {(block.items || []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          backgroundColor: 'var(--color-black-card, #181A1C)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '2px',
                          padding: '2.2rem',
                          borderTop: '3px solid var(--color-copper, #B87345)',
                        }}
                      >
                        <div style={{ color: 'var(--color-copper, #B87345)', fontSize: '1.3rem', marginBottom: '0.8rem', fontWeight: 800 }}>✦</div>
                        <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.35rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '0.75rem' }}>
                          {feat.title}
                        </h3>
                        <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                          {feat.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'cta':
            return (
              <section key={idx} style={{ padding: '6rem 1.5rem', textAlign: 'center', background: 'linear-gradient(145deg, rgba(145, 77, 55, 0.45) 0%, #111314 100%)', borderTop: '2px solid var(--color-brick, #914D37)' }}>
                <div className="container" style={{ maxWidth: '750px', margin: '0 auto' }}>
                  <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.5rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '1rem' }}>
                    {block.title}
                  </h2>
                  {block.subtitle && (
                    <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                      {block.subtitle}
                    </p>
                  )}
                  <button
                    onClick={() => openReservation(block.title)}
                    className="btn-primary"
                    style={{ padding: '0.95rem 2.4rem', fontSize: '1rem' }}
                  >
                    {block.button_text || 'Contact Host Desk'}
                  </button>
                </div>
              </section>
            );

          case 'reservation':
            return (
              <section key={idx} style={{ padding: '5rem 1.5rem', textAlign: 'center', backgroundColor: '#181A1C' }}>
                <div className="container" style={{ maxWidth: '650px', margin: '0 auto' }}>
                  <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.2rem', textTransform: 'uppercase', color: 'var(--color-copper, #B87345)', marginBottom: '1rem' }}>
                    {block.title || 'Reserve Your Experience'}
                  </h2>
                  <p style={{ color: 'var(--color-concrete, #B7B4AC)', marginBottom: '2rem' }}>
                    {block.subtitle || 'Our host desk team is at your service.'}
                  </p>
                  <button onClick={() => openReservation()} className="btn-primary">
                    Open Table Reservations
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
