import React from 'react';
import { Anchor, Droplet, Sun, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function PhilosophySection() {
  const { data } = useCMS();
  const pillars = data.culinary_pillars || [];
  const section = data.sections?.philosophy || {};

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Anchor': return <Anchor size={24} color="#C5A059" />;
      case 'Droplet': return <Droplet size={24} color="#C5A059" />;
      case 'Sun': return <Sun size={24} color="#C5A059" />;
      default: return <Sparkles size={24} color="#C5A059" />;
    }
  };

  return (
    <section id="philosophy" className="section-wrapper" style={{ backgroundColor: '#F6F4EE' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'PROVENANCE & CRAFT'}
          </div>
          <h2 className="section-title">
            Four Cornerstones of <em>Our Cuisine</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'We honor the fisherman, the orchard keeper, and the coastal soil with zero-compromise ingredient traceability.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '30px',
          }}
        >
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="luxury-card"
              style={{
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #C5A059',
                    boxShadow: '0 4px 15px rgba(197, 160, 89, 0.2)',
                  }}
                >
                  {getIcon(p.icon_name)}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#081721',
                    background: 'var(--grad-gold)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  {p.metric_label}
                </span>
              </div>

              <h3 style={{ fontSize: '1.7rem', color: '#081721', marginBottom: '8px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.92rem', fontStyle: 'italic', color: '#7A7E80', marginBottom: '16px' }}>
                {p.subtitle}
              </p>
              <p style={{ fontSize: '0.96rem', color: '#4A5255', lineHeight: 1.65 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
