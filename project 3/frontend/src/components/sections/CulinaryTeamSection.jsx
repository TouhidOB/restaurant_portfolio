import React from 'react';
import { Award, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function CulinaryTeamSection() {
  const { data } = useCMS();
  const team = data.team_members || [];
  const section = data.sections?.team || {};

  return (
    <section id="team" className="section-wrapper" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'THE MASTERS'}
          </div>
          <h2 className="section-title">
            {section.title || 'CULINARY LEADERSHIP & SOMMELIERS'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Guided by generations of culinary dedication and international Michelin-pedigreed experience.'}
          </p>
        </div>

        {/* 3 Team Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
          }}
        >
          {team.map((member) => (
            <div
              key={member.id || member.name}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
                <img
                  src={member.image_url || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    background: 'rgba(23, 74, 99, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#FAF9F5',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {member.role}
                </span>
              </div>

              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#174A63', marginBottom: '4px' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#8C8981', marginBottom: '14px' }}>
                  {member.title}
                </p>
                <p style={{ fontSize: '0.95rem', color: '#4A4E4D', lineHeight: 1.6, marginBottom: '20px' }}>
                  {member.bio}
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid #EFEAE0', paddingTop: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#174A63', marginBottom: '6px' }}>
                    <strong>Signature Focus:</strong> {member.signature_focus}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#68765A', fontFamily: 'var(--font-mono)' }}>
                    <Award size={14} color="#D6A854" />
                    <span>{member.accolades}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
