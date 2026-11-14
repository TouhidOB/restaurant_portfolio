import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09_ChefTeam() {
  const { content } = useCMS();
  const teamData = content?.editorial_sections?.s09_team || {
    badge: "THE ARTISANS",
    title: "Custodians of Taste & Hospitality",
    description: "A team united by an uncompromising pursuit of Mediterranean dining elegance."
  };

  const teamMembers = content.team_members || [];

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--c-ivory)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {teamData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {teamData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
            {teamData.description}
          </p>
        </div>

        {/* Team Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '36px 30px',
                border: '1px solid var(--c-border)',
                boxShadow: '0 8px 25px rgba(38, 58, 72, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: 'var(--c-limestone)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    marginBottom: '18px',
                    border: '1px solid var(--c-travertine)',
                  }}
                >
                  {member.role.includes('Chef') ? '👨‍🍳' : member.role.includes('Sommelier') ? '🍷' : '🛎️'}
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.65rem',
                    color: 'var(--c-navy)',
                    marginBottom: '4px',
                  }}
                >
                  {member.name}
                </h3>

                <div
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--c-terracotta)',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  {member.role}
                </div>

                <p style={{ color: '#595752', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {member.bio}
                </p>
              </div>

              {member.credentials && (
                <div
                  style={{
                    borderTop: '1px solid var(--c-border-light)',
                    paddingTop: '14px',
                    fontSize: '0.8rem',
                    color: '#596448',
                    fontWeight: 600,
                  }}
                >
                  🏅 {member.credentials}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
