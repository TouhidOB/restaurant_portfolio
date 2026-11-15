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
      <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-gold)', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
          Chargement de la page...
        </p>
      </div>
    );
  }

  if (!page) {
    return (
      <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)', fontSize: '2.5rem' }}>
          Page Introuvable
        </h2>
        <p style={{ color: 'var(--color-taupe)', marginBottom: '2rem' }}>
          La page demandée n'existe pas ou n'est plus publiée.
        </p>
        <a href="/" className="btn-primary">
          Retour à l'Accueil
        </a>
      </div>
    );
  }

  const blocks = page.blocks || [];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '80px' }}>
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
                    ? `linear-gradient(rgba(32, 33, 36, 0.85), rgba(32, 33, 36, 0.95)), url(${block.bg_image}) center/cover no-repeat`
                    : 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)',
                  borderBottom: '1px solid rgba(197, 164, 109, 0.3)',
                }}
              >
                <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
                  {block.subtitle && (
                    <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                      {block.subtitle}
                    </span>
                  )}
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', color: 'var(--color-ivory)', lineHeight: '1.2', marginBottom: '1.25rem' }}>
                    {block.title || page.title}
                  </h1>
                  {block.lead && (
                    <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2rem' }}>
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
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginBottom: '1.25rem' }}>
                      {block.title}
                    </h2>
                    {block.lead && (
                      <p style={{ color: 'var(--color-gold-light)', fontSize: '1.1rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                        {block.lead}
                      </p>
                    )}
                    <p style={{ color: 'var(--color-taupe)', fontSize: '0.98rem', lineHeight: '1.8' }}>
                      {block.body}
                    </p>
                  </div>
                  {block.image && (
                    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(197, 164, 109, 0.35)', boxShadow: '0 15px 40px rgba(0,0,0,0.5)' }}>
                      <img src={block.image} alt={block.image_alt || block.title} style={{ width: '100%', height: '380px', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </section>
            );

          case 'features':
            return (
              <section key={idx} style={{ padding: '5rem 1.5rem', backgroundColor: '#1A1B1D' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                  {block.title && (
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)' }}>
                        {block.title}
                      </h2>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {(block.items || []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          backgroundColor: '#25262A',
                          border: '1px solid rgba(197, 164, 109, 0.25)',
                          borderRadius: '8px',
                          padding: '2.2rem',
                        }}
                      >
                        <div style={{ color: 'var(--color-gold)', fontSize: '1.5rem', marginBottom: '0.8rem' }}>✦</div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                          {feat.title}
                        </h3>
                        <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: '1.65' }}>
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
              <section key={idx} style={{ padding: '6rem 1.5rem', textAlign: 'center', background: 'linear-gradient(145deg, #3B1A21 0%, #202124 100%)', borderTop: '1px solid rgba(197, 164, 109, 0.3)' }}>
                <div className="container" style={{ maxWidth: '750px', margin: '0 auto' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
                    {block.title}
                  </h2>
                  {block.subtitle && (
                    <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                      {block.subtitle}
                    </p>
                  )}
                  <button
                    onClick={() => openReservation(block.title)}
                    className="btn-primary"
                    style={{ padding: '0.95rem 2.4rem', fontSize: '1rem' }}
                  >
                    {block.button_text || 'Prendre Rendez-Vous'}
                  </button>
                </div>
              </section>
            );

          case 'reservation':
            return (
              <section key={idx} style={{ padding: '5rem 1.5rem', textAlign: 'center', backgroundColor: '#18191B' }}>
                <div className="container" style={{ maxWidth: '650px', margin: '0 auto' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                    {block.title || 'Réservez Votre Expérience'}
                  </h2>
                  <p style={{ color: 'var(--color-taupe)', marginBottom: '2rem' }}>
                    {block.subtitle || 'Notre conciergerie est à votre disposition.'}
                  </p>
                  <button onClick={() => openReservation()} className="btn-primary">
                    Ouvrir la Conciergerie
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
