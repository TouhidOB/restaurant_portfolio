import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage({ onNavigateHome, onOpenReservation }) {
  const { content } = useCMS();
  const stages = content.process_stages || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>06. CULINARY PROCESS</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span className="section-tag">METHOD &bull; DISCIPLINE &bull; FIRE</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            CULINARY PROCESS.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            The thermal discipline, aging timelines, and elemental techniques behind our kitchen.
          </p>
        </div>

        {/* Process Stages Vertical Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
          {stages.map((stg, idx) => (
            <div
              key={stg.id || idx}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-steel)',
                borderLeft: '4px solid var(--accent-orange)',
                padding: '2rem 2.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  STAGE 0{stg.step_number || idx + 1} // {stg.technique_used || 'THERMAL DISCIPLINE'}
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {stg.title}
                </h2>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {stg.headline}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  {stg.description}
                </p>
              </div>

              <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-steel)', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <div style={{ color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  OPERATIONAL PARAMETERS
                </div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  TEMPERATURE: <strong style={{ color: '#fff' }}>{stg.temperature_notes || '800°C — 900°C'}</strong>
                </div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  FUEL: <strong style={{ color: '#fff' }}>White Oak &amp; Kishu Binchotan</strong>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  MONITORING: <strong style={{ color: '#fff' }}>Infrared Thermal Sensing</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            WITNESS THE KITCHEN IN MOTION
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Book seats directly along our 40-foot blackened steel hearth counter to watch every stage unfold.
          </p>
          <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2rem' }}>
            RESERVE HEARTH COUNTER &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
