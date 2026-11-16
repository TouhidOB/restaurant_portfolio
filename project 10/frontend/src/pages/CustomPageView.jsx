import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchCustomPage } from '../services/api';

export default function CustomPageView({ slug, onNavigate }) {
  const { content, lang, t, openReservation, customPages } = useCMS();
  const allPages = customPages || content?.custom_pages || [];
  const [page, setPage] = useState(
    allPages.find((p) => p.slug === slug) || null
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
        console.warn('Error fetching custom page from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPage();
  }, [slug]);

  if (loading && !page) {
    return (
      <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#D4AF37', fontSize: '1.2rem' }}>
          {lang === 'bn' ? 'পৃষ্ঠা লোড হচ্ছে...' : 'Rendering Heritage Canvas...'}
        </p>
      </div>
    );
  }

  if (!page) {
    return (
      <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display-en, "Cormorant Garamond")', color: '#D4AF37', fontSize: '2.5rem' }}>
          {lang === 'bn' ? 'পৃষ্ঠাটি পাওয়া যায়নি' : 'Page Not Found'}
        </h2>
        <p style={{ color: '#C8B18D', marginBottom: '2rem' }}>
          {lang === 'bn' ? 'অনুরোধকৃত পৃষ্ঠাটি পাওয়া যায়নি অথবা এখনও প্রকাশিত হয়নি।' : 'The requested page does not exist or has not been published.'}
        </p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('/');
            else {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          style={{
            backgroundColor: '#A6533B',
            color: '#F4EBDD',
            padding: '0.85rem 1.8rem',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            borderRadius: '2px',
          }}
        >
          {lang === 'bn' ? 'মূলপাতায় ফিরে যান' : 'Return To Home'}
        </a>
      </div>
    );
  }

  const blocks = page.blocks || [];

  return (
    <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '80px' }}>
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
                    ? `linear-gradient(rgba(26, 37, 54, 0.85), rgba(26, 37, 54, 0.95)), url(${block.bg_image}) center/cover no-repeat`
                    : 'linear-gradient(180deg, rgba(166, 83, 59, 0.3) 0%, #1A2536 100%)',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
                  {block.subtitle && (
                    <span
                      style={{
                        color: '#D4AF37',
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
                      fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                      fontSize: '3.5rem',
                      letterSpacing: '0.04em',
                      color: '#F4EBDD',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {block.title || page.title}
                  </h1>
                  {block.lead && (
                    <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                      {block.lead}
                    </p>
                  )}
                  {block.cta_text && (
                    <button
                      onClick={() => openReservation(block.title)}
                      style={{
                        backgroundColor: '#A6533B',
                        color: '#F4EBDD',
                        border: 'none',
                        padding: '0.9rem 2.2rem',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        borderRadius: '2px',
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
              <section key={idx} style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.15)' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                  <div>
                    <h2
                      style={{
                        fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                        fontSize: '2.4rem',
                        color: '#F4EBDD',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {block.title}
                    </h2>
                    {block.lead && (
                      <p style={{ color: '#D4AF37', fontSize: '1.1rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                        {block.lead}
                      </p>
                    )}
                    <p style={{ color: '#C8B18D', fontSize: '0.98rem', lineHeight: '1.8' }}>
                      {block.body}
                    </p>
                  </div>
                  {block.image && (
                    <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                      <img src={block.image} alt={block.image_alt || block.title} style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>
              </section>
            );

          case 'features':
            return (
              <section key={idx} style={{ padding: '5rem 1.5rem', backgroundColor: '#223046' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                  {block.title && (
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                      <h2
                        style={{
                          fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                          fontSize: '2.4rem',
                          color: '#F4EBDD',
                        }}
                      >
                        {block.title}
                      </h2>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {(block.items || []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          backgroundColor: '#1A2536',
                          border: '1px solid rgba(212, 175, 55, 0.25)',
                          borderRadius: '4px',
                          padding: '2.2rem',
                          borderTop: '3px solid #D4AF37',
                        }}
                      >
                        <div style={{ color: '#D4AF37', fontSize: '1.3rem', marginBottom: '0.8rem', fontWeight: 800 }}>✦</div>
                        <h3
                          style={{
                            fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                            fontSize: '1.35rem',
                            color: '#F4EBDD',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {feat.title}
                        </h3>
                        <p style={{ color: '#C8B18D', fontSize: '0.92rem', lineHeight: '1.65' }}>
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
              <section
                key={idx}
                style={{
                  padding: '6rem 1.5rem',
                  textAlign: 'center',
                  background: 'linear-gradient(145deg, rgba(166, 83, 59, 0.25) 0%, #1A2536 100%)',
                  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <div className="container" style={{ maxWidth: '750px', margin: '0 auto' }}>
                  <h2
                    style={{
                      fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                      fontSize: '2.5rem',
                      color: '#F4EBDD',
                      marginBottom: '1rem',
                    }}
                  >
                    {block.title}
                  </h2>
                  {block.subtitle && (
                    <p style={{ color: '#C8B18D', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                      {block.subtitle}
                    </p>
                  )}
                  <button
                    onClick={() => openReservation(block.title)}
                    style={{
                      backgroundColor: '#A6533B',
                      color: '#F4EBDD',
                      border: 'none',
                      padding: '0.95rem 2.4rem',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {block.button_text || (lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Concierge')}
                  </button>
                </div>
              </section>
            );

          case 'reservation':
            return (
              <section key={idx} style={{ padding: '5rem 1.5rem', textAlign: 'center', backgroundColor: '#1A2536' }}>
                <div className="container" style={{ maxWidth: '650px', margin: '0 auto' }}>
                  <h2
                    style={{
                      fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                      fontSize: '2.2rem',
                      color: '#D4AF37',
                      marginBottom: '1rem',
                    }}
                  >
                    {block.title || (lang === 'bn' ? 'টেবিল সংরক্ষণ করুন' : 'Reserve Your Table')}
                  </h2>
                  <p style={{ color: '#C8B18D', marginBottom: '2rem' }}>
                    {block.subtitle || (lang === 'bn' ? 'আমাদের হসপিটালিটি কনসিয়ার্জ সার্বক্ষণিক প্রস্তুত।' : 'Our hospitality concierge is at your service.')}
                  </p>
                  <button
                    onClick={() => openReservation()}
                    style={{
                      backgroundColor: '#A6533B',
                      color: '#F4EBDD',
                      border: 'none',
                      padding: '0.95rem 2.4rem',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {lang === 'bn' ? 'টেবিল বুকিং ফর্ম খুলুন' : 'Open Table Reservations'}
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
