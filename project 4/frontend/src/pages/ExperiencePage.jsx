import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage({ onNavigateHome, onOpenReservation }) {
  const { content } = useCMS();
  const diningPanels = content.dining_panels || [];
  const testimonials = content.testimonials || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>09. DINING EXPERIENCE</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span className="section-tag">THE SENSORY ARC &bull; 150 MINUTES</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            THE EXPERIENCE.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            An unhurried progression of twelve courses. Structured to challenge, comfort, and anchor the senses.
          </p>
        </div>

        {/* Experience Panels Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {diningPanels.map((panel, idx) => (
            <div key={panel.id || idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', background: '#000', overflow: 'hidden' }}>
                <img
                  src={panel.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'}
                  alt={panel.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    {panel.spec_badge || `MOVEMENT 0${idx + 1}`}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    {panel.title}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {panel.subtitle}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {panel.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Critic Acclaim */}
        <div style={{ borderTop: '1px solid var(--border-steel)', paddingTop: '3.5rem', marginBottom: '4rem' }}>
          <span className="section-tag">CRITICAL ACCLAIM &bull; PRESS</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0 2rem', textTransform: 'uppercase' }}>
            WHAT CRITICS DECLARE
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, idx) => (
              <div key={t.id || idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', borderLeft: '4px solid var(--accent-orange)', padding: '2rem' }}>
                <p style={{ fontSize: '0.95rem', color: '#fff', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  "{t.quote_text || t.review_text}"
                </p>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700 }}>
                  {t.critic_name || t.guest_name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)' }}>
                  {t.publication || t.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-orange)', padding: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            SECURE YOUR RESERVATION
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Lunch and Dinner shifts open 30 days in advance.
          </p>
          <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2.5rem' }}>
            BOOK A TABLE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
