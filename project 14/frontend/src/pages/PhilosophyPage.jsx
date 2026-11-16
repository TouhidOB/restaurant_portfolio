import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function PhilosophyPage({ onNavigate }) {
  const { data, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const phil = data?.content?.culinary_philosophy || {};
  const pillars = phil.pillars || [];

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(148, 115, 79, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            {phil.eyebrow || "UNCOMPROMISING PURSUIT OF QUALITY"}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '20px', color: 'var(--color-ivory)' }}>
            {phil.heading || "Culinary Craft & Provenance"}
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            {phil.description || "True luxury requires radical transparency and devotion to technique. We work exclusively with family-owned ranches, artisanal fisheries, and heritage growers."}
          </p>
        </div>
      </section>

      {/* Pillars Breakdown */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.number || idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  gap: '40px',
                  alignItems: 'center',
                  background: 'var(--color-graphite)',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)',
                  padding: '40px',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ order: idx % 2 === 1 ? 2 : 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: 'var(--color-champagne)', marginBottom: '8px' }}>
                    {pillar.number}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '24px' }}>
                    {pillar.description}
                  </p>
                  <button
                    onClick={() => triggerReservation(pillar.title)}
                    style={{ padding: '10px 24px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Experience This Craft →
                  </button>
                </div>

                <div style={{ order: idx % 2 === 1 ? 1 : 2, borderRadius: '4px', overflow: 'hidden', height: '320px', border: '1px solid var(--border-subtle)' }}>
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Sourcing Callout */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-obsidian)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
            RADICAL TRANSPARENCY
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Zero-Compromise Provenance
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '32px' }}>
            Every primal cut arrives with full DNA traceability, ranch certification, and date of aging chamber induction.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('/menu')}
            style={{ padding: '14px 34px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Explore All Signature Steaks
          </button>
        </div>
      </section>

    </div>
  );
}
