import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05_CulinaryPhilosophy() {
  const { data } = useCMS();
  const philosophy = data?.content?.culinary_philosophy || {};
  const pillars = philosophy.pillars || [
    {
      number: "01",
      title: "Heritage Sourcing",
      description: "100% USDA Prime Black Angus from single-source Nebraska pasturelands alongside certified A5 Miyazaki Wagyu directly imported from Japan.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "02",
      title: "Sub-Zero Salt Dry-Aging",
      description: "Our in-house Himalayan salt-brick vault ages primal loins for 35 to 65 days under precision microclimates, concentrating natural umami and achieving velvet tenderness.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "03",
      title: "The Dual-Flame Hearth",
      description: "Seared over kiln-dried post oak and embers reaching 1,200°F on dual Argentine cast-iron wheels to achieve an immaculate caramel crust and buttery pink center.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="philosophy" style={{ backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
          <div className="section-eyebrow">
            {philosophy.eyebrow || 'UNCOMPROMISING PURSUIT OF QUALITY'}
          </div>
          <h2 className="section-title">
            {philosophy.heading || 'CULINARY CRAFT & PROVENANCE'}
          </h2>
          <p className="section-desc">
            {philosophy.description ||
              'True luxury requires radical transparency and devotion to technique. We work exclusively with family-owned ranches, artisanal fisheries, and heritage growers.'}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {pillars.map((p, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-graphite)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
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
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(41,39,36,0.95) 0%, transparent 60%)'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'var(--color-champagne)',
                  background: 'rgba(16, 16, 16, 0.75)',
                  padding: '2px 12px',
                  borderRadius: '2px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {p.number || `0${idx + 1}`}
                </div>
              </div>

              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    color: 'var(--color-ivory)',
                    marginBottom: '12px'
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-taupe)',
                    lineHeight: '1.7'
                  }}>
                    {p.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
