import React from 'react';
import { Anchor, Droplet, Sun, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function PhilosophySection() {
  const { data } = useCMS();
  const pillars = data.culinary_pillars || [];
  const section = data.sections?.philosophy || {};

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Anchor': return <Anchor size={24} color="#174A63" />;
      case 'Droplet': return <Droplet size={24} color="#68765A" />;
      case 'Sun': return <Sun size={24} color="#D6A854" />;
      default: return <Sparkles size={24} color="#B86E50" />;
    }
  };

  return (
    <section id="philosophy" className="section-wrapper" style={{ backgroundColor: '#F8F6F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'PROVENANCE & CRAFT'}
          </div>
          <h2 className="section-title">
            {section.title || 'FOUR CORNERSTONES OF OUR CUISINE'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'We honor the fisherman, the orchard keeper, and the coastal soil with zero-compromise ingredient traceability.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="luxury-card"
              style={{
                padding: '36px 30px',
                background: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: '#F0F6F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #C9DDE0',
                  }}
                >
                  {getIcon(p.icon_name)}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#174A63',
                    background: '#E8D9C2',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontWeight: 600,
                  }}
                >
                  {p.metric_label}
                </span>
              </div>

              <h3 style={{ fontSize: '1.6rem', color: '#174A63', marginBottom: '8px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#8C8981', marginBottom: '14px' }}>
                {p.subtitle}
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4A4E4D', lineHeight: 1.6 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
