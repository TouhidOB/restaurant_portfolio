import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setSelectedDish } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const steaks = data?.featured_steaks || [];

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196, 168, 120, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            HIMALAYAN SALT-AGED EXCLUSIVES
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '20px', color: 'var(--color-ivory)' }}>
            Signature Cuts & Primal Loins
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Hand-selected by our Master Butcher, dry-aged for 45 to 65 days in our salt-brick cellar, and seared over 1,200°F live Pennsylvania white oak embers.
          </p>
        </div>
      </section>

      {/* Steaks Grid */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)' }}>
        <div className="section-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '36px' }}>
            {steaks.map((steak) => (
              <div
                key={steak.id}
                style={{
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--color-champagne)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <div>
                  <div
                    style={{ height: '260px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => setSelectedDish(steak)}
                  >
                    <img
                      src={steak.image || steak.image_url}
                      alt={steak.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(16, 16, 16, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '2px', border: '1px solid var(--color-champagne)', fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 800, color: 'var(--color-champagne)' }}>
                      ${steak.price}
                    </div>
                  </div>

                  <div style={{ padding: '28px 24px 20px' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '6px' }}>
                      {steak.cut_type || "USDA Prime Cut"}
                    </div>
                    <h3
                      onClick={() => setSelectedDish(steak)}
                      style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-ivory)', marginBottom: '8px', cursor: 'pointer' }}
                    >
                      {steak.name}
                    </h3>
                    <div style={{ fontSize: '11px', color: 'var(--color-taupe)', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
                      Weight / Serving: {steak.serving_size || "16 oz / 450g"}
                    </div>
                    <p style={{ color: 'var(--color-taupe)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '20px' }}>
                      {steak.description || steak.short_description}
                    </p>

                    {steak.dietary_tags && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                        {steak.dietary_tags.map((tag, idx) => (
                          <span key={idx} style={{ background: 'var(--color-obsidian)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '2px', fontSize: '10px', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ padding: '0 24px 24px', display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => triggerReservation(steak.name)}
                    style={{ flex: 1, padding: '12px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Reserve Cut
                  </button>
                  <button
                    onClick={() => setSelectedDish(steak)}
                    style={{ padding: '12px 18px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sommelier Wine Pairing Note */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-obsidian)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
            CELLAR HARMONY
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Curated Grand Cru Wine Pairings
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '32px' }}>
            Our Head Sommelier has paired each signature cut with library vintages from Bordeaux Left Bank estates and benchmark Napa Valley Cabernets.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('/menu')}
            style={{ padding: '14px 34px', background: 'transparent', border: '1px solid var(--color-champagne)', borderRadius: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Explore Complete Menu & Cellar
          </button>
        </div>
      </section>

    </div>
  );
}
