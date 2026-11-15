import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function BrandPage({ onNavigateHome, onOpenReservation }) {
  const { content } = useCMS();
  const restaurant = content.restaurant || {};
  const pillars = content.pillars || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>01. BRAND MANIFESTO</span>
        </div>

        {/* Hero Banner */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span className="section-tag">ARCHITECTURAL MANIFESTO &bull; SECTOR 09</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            NOT JUST A PLACE TO EAT.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            {restaurant.tagline || 'A sensory intersection of architectural weight and culinary levity.'}
          </p>
        </div>

        {/* Story Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ width: '40px', height: '4px', background: 'var(--accent-orange)', marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
              RAW MATERIALS. UNVARNISHED INTENT.
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Monolith was conceived as an antithesis to ephemeral dining trends. We stripped away decorative distraction to reveal the tension between cast-in-place concrete and fire-rendered flavor.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Every plate is treated as a sculptural proposition: stark contrasts in texture, unvarnished natural acids, and charcoal minerality, orchestrated inside an acoustic sanctuary of board-formed concrete.
            </p>
          </div>

          <div style={{ position: 'relative', minHeight: '360px', background: 'var(--bg-surface)', border: '1px solid var(--border-steel)' }}>
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
              alt="Monolith Concrete Sanctuary"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(32,33,31,0.9)', border: '1px solid var(--border-steel)', padding: '0.5rem 0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)' }}>
              DISTRICT 09 NYC &bull; WEST ELEVATION
            </div>
          </div>
        </div>

        {/* Philosophy Pillars */}
        <div style={{ borderTop: '1px solid var(--border-steel)', paddingTop: '3.5rem', marginBottom: '4rem' }}>
          <span className="section-tag">THREE PILLARS OF FORM</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0 2.5rem', textTransform: 'uppercase' }}>
            THE STRUCTURAL BEDROCK
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {pillars.map((pillar, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2rem', position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--border-steel)', marginBottom: '0.75rem' }}>
                  0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  {pillar.summary || pillar.body_text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-orange)', padding: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            EXPERIENCE THE ARCHITECTURE
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Reserve your seat at our basalt monolith counters or explore the 12-course wood-fired tasting menu.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2rem' }}>
              RESERVE A TABLE &rarr;
            </button>
            <button onClick={onNavigateHome} className="btn-brutal-secondary" style={{ padding: '0.75rem 2rem' }}>
              RETURN TO INDEX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
