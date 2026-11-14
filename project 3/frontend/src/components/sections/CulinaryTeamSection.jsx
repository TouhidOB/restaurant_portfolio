import React from 'react';
import { Award, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function CulinaryTeamSection() {
  const { data } = useCMS();
  const team = data.team_members || [];
  const section = data.sections?.team || {};

  return (
    <section id="team" className="section-wrapper" style={{ backgroundColor: '#FCFBF8' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'THE MASTERS'}
          </div>
          <h2 className="section-title">
            Culinary Leadership & <em>Sommeliers</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Guided by generations of culinary dedication and international Michelin-pedigreed experience.'}
          </p>
        </div>

        {/* 3 Team Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '38px',
          }}
        >
          {team.map((member) => (
            <div
              key={member.id || member.name}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                <img
                  src={member.image_url || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '18px',
                    left: '18px',
                    background: 'rgba(8, 23, 33, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: '#DFBA73',
                    border: '1px solid rgba(197, 160, 89, 0.45)',
                    padding: '6px 16px',
                    borderRadius: '30px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {member.role}
                </span>
              </div>

              <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.9rem', color: '#081721', marginBottom: '4px' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '0.92rem', fontStyle: 'italic', color: '#7A7E80', marginBottom: '16px' }}>
                  {member.title}
                </p>
                <p style={{ fontSize: '0.96rem', color: '#4A5255', lineHeight: 1.65, marginBottom: '22px' }}>
                  {member.bio}
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '18px' }}>
                  <div style={{ fontSize: '12.5px', color: '#081721', marginBottom: '8px' }}>
                    <strong>Signature Focus:</strong> {member.signature_focus}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#253B2F', fontFamily: 'var(--font-mono)' }}>
                    <Award size={15} color="#C5A059" />
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
