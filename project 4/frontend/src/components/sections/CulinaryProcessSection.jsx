import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function CulinaryProcessSection() {
  const { content } = useCMS();
  const s06 = content.sections?.culinary_process || {};
  const stages = content.process_stages || [];

  return (
    <section id="process" className="section-shell">
      <div className="container-brutal">
        <div className="section-header-block">
          <div className="section-tag">
            SECTION 06 // {s06.eyebrow || 'CULINARY PROCESS'}
          </div>
          <h2 className="section-heading">
            {s06.title || 'FROM RAW TO REFINED.'}
          </h2>
          <p className="section-lead">
            {s06.subtitle || 'An uncompromising four-stage methodology tracing origin to palate.'}
          </p>
        </div>

        {/* 4-Step Process Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {stages.map((st) => (
            <div
              key={st.id || st.stage_number}
              className="brutalist-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    color: 'var(--accent-orange)',
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}
                >
                  {st.stage_number}
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                  {st.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--concrete-raw)',
                    marginBottom: '1rem',
                  }}
                >
                  {st.subtitle}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {st.description}
                </p>
              </div>

              {st.image_url && (
                <div style={{ marginTop: 'auto', border: '1px solid var(--border-steel)', overflow: 'hidden', aspectRatio: '16/9' }}>
                  <img
                    src={st.image_url}
                    alt={st.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
