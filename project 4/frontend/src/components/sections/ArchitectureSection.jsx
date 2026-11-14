import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function ArchitectureSection() {
  const { content } = useCMS();
  const s07 = content.sections?.architecture || {};

  const materials = [
    {
      name: "BOARD-FORMED CONCRETE",
      spec: "4000 PSI CAST-IN-PLACE",
      desc: "Retains rough Douglas fir timber grain patterns, creating acoustic absorption and thermal mass.",
      hex: "#9C9990"
    },
    {
      name: "BLACKENED COLD STEEL",
      spec: "0.25-INCH ROLLED PLATE",
      desc: "Naturally oxidised and hand-rubbed with natural beeswax, providing seamless industrial edges.",
      hex: "#2B2C2A"
    },
    {
      name: "RAW BASALT STONE",
      spec: "VOLCANIC MONOLITH SLABS",
      desc: "Quarried blocks unpolished on exterior facets, cut flat only for culinary plinths and dining tables.",
      hex: "#1F201E"
    },
    {
      name: "SHOU SUGI BAN CEDAR",
      spec: "HEAVY CHAR JAPANESE OAK",
      desc: "Surface charred over open flame to carbonize the exterior, resistant to moisture and light reflection.",
      hex: "#181917"
    }
  ];

  return (
    <section id="architecture" className="section-shell">
      <div className="container-brutal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '3.5rem' }}>
          <div>
            <div className="section-tag">
              SECTION 07 // {s07.eyebrow || 'ARCHITECTURAL FORM'}
            </div>
            <h2 className="section-heading">
              {s07.title || 'SPACE IS PART OF THE EXPERIENCE.'}
            </h2>
            <p className="section-lead" style={{ marginBottom: '1.5rem' }}>
              {s07.subtitle || 'Raw concrete, charred Japanese cedar, and blackened steel create a sanctuary of acoustic stillness.'}
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-orange)',
                borderLeft: '2px solid var(--accent-orange)',
                paddingLeft: '1rem',
              }}
            >
              {s07.custom_content?.architect_credit || 'DESIGNED IN COLLABORATION WITH ATELIER BRUTAL // 2021'}
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-steel)', padding: '1rem', background: 'var(--bg-surface)' }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Monolith Exterior Brutalist Elevation"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>ELEVATION: WEST CANTILEVER</span>
              <span>40.7128° N, 74.0060° W</span>
            </div>
          </div>
        </div>

        {/* 4 Materials Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {materials.map((m, i) => (
            <div key={m.name} className="brutalist-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: m.hex, border: '1px solid var(--border-steel)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)' }}>
                  MAT 0{i + 1}
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{m.name}</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--concrete-raw)', marginBottom: '0.75rem' }}>
                {m.spec}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
