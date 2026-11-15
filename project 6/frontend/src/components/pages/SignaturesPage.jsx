import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function SignaturesPage({ onNavigateHome, onNavigatePage }) {
  const { content, openDish, openReservation } = useCMS();
  const signaturesSec = content?.sections?.signatures || {};
  
  // Collect signature dishes from signature_dishes or featured_dishes or categories
  let signatureDishes = content?.signature_dishes || content?.featured_dishes || [];
  if (!signatureDishes || signatureDishes.length === 0) {
    const collected = [];
    (content?.categories || []).forEach((cat) => {
      (cat.items || []).forEach((item) => {
        if (item.is_featured) collected.push(item);
      });
    });
    signatureDishes = collected.length > 0 ? collected : ((content?.categories?.[0]?.items || []).slice(0, 4));
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Dedicated Page Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 0 4rem',
          borderBottom: '1px solid var(--border-diner)',
          background: 'linear-gradient(180deg, rgba(17, 26, 43, 0.8) 0%, rgba(9, 15, 27, 0.98) 100%)',
        }}
      >
        <div className="container-diner">
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--neon-cyan)',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: 'var(--atomic-yellow)' }}>SIGNATURE DISHES</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ {signaturesSec.eyebrow || 'CHEF-DRIVEN MASTERPIECES'}
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(216, 58, 69, 0.3)',
              }}
            >
              {signaturesSec.title || 'OUR ICONIC CREATIONS.'}
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2.5rem',
              }}
            >
              {signaturesSec.subtitle ||
                'The crown jewels of our kitchen. Smoked brisket smash blends, hand-spun malt shakes, and atomic spiced sides created with authentic mid-century culinary craft.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={() => onNavigatePage('menu')} className="btn-cherry">
                <span>VIEW FULL MENU REPERTOIRE</span>
                <span>→</span>
              </button>
              <button onClick={openReservation} className="btn-cyan">
                <span>BOOK A TABLE</span>
              </button>
              <button
                onClick={onNavigateHome}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-diner)',
                  color: 'var(--text-cream)',
                  padding: '0.95rem 1.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                ← BACK TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Showcase */}
      <section className="section-shell">
        <div className="container-diner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {signatureDishes.map((dish, idx) => (
              <div
                key={dish.id || idx}
                className="diner-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--border-diner)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onClick={() => openDish(dish)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(67, 217, 232, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-diner)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Dish Photo */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden', backgroundColor: '#090F1B' }}>
                  <img
                    src={dish.resolved_image || dish.image_url || dish.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80'}
                    alt={dish.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'var(--cherry-red)',
                      color: '#FFF',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.15rem',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-xs)',
                      boxShadow: '0 0 12px rgba(216, 58, 69, 0.5)',
                    }}
                  >
                    ${dish.price}
                  </div>
                  {dish.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: 'rgba(9, 15, 27, 0.85)',
                        border: '1px solid var(--neon-cyan)',
                        color: 'var(--neon-cyan)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {dish.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.6rem',
                        color: '#FFFFFF',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {dish.name}
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-cream)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                      }}
                    >
                      {dish.description}
                    </p>
                  </div>

                  <div>
                    {dish.dietary_information && dish.dietary_information.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        {dish.dietary_information.map((d, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              color: 'var(--neon-cyan)',
                              border: '1px solid rgba(67, 217, 232, 0.4)',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '3px',
                            }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(36, 53, 82, 0.6)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--neon-cyan)',
                      }}
                    >
                      <span>VIEW INGREDIENTS & PAIRING</span>
                      <span>↗</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pairing Secrets Banner */}
      <section className="section-shell cream-theme">
        <div className="container-diner">
          <div className="section-header-block" style={{ maxWidth: '800px' }}>
            <span className="section-tag" style={{ borderColor: 'var(--cherry-red)', color: 'var(--cherry-red)' }}>
              CHEF RECOMMENDATIONS
            </span>
            <h2 className="section-heading" style={{ color: 'var(--deep-charcoal)' }}>
              ICONIC PAIRING COMBOS
            </h2>
            <p className="section-lead" style={{ color: '#4A5568' }}>
              Designed by our culinary director to deliver the ultimate dynamic contrast of savory crunch and velvety cold sweetness.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-cream)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cherry-red)', fontSize: '0.75rem', fontWeight: 700 }}>
                COMBO PAIRING 01
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--deep-charcoal)', margin: '0.5rem 0' }}>
                Double Stardust Smash + Neon Electric Malt
              </h3>
              <p style={{ color: '#4A5568', fontSize: '0.92rem', lineHeight: 1.6 }}>
                The rich umami of our 500°F cast-iron crust cut by the tart balance of hand-spun wild berry curd and Madagascar vanilla bean.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-cream)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cherry-red)', fontSize: '0.75rem', fontWeight: 700 }}>
                COMBO PAIRING 02
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--deep-charcoal)', margin: '0.5rem 0' }}>
                Atomic Chili-Glazed Chicken + Chrome Root Beer Float
              </h3>
              <p style={{ color: '#4A5568', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Hot Nashville-style chili crisp and buttermilk crunch soothed instantly with draft house-brewed sarsaparilla and frozen custard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
