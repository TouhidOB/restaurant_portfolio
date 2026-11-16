import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09_ChefTeam() {
  const { content } = useCMS();
  const teamData = content?.editorial_sections?.s09_team || {
    badge: "STREET MASTERS",
    title: "The Kitchen Brigade Behind the Heat",
    description: "Meet the artisans who turn humble Korean street classics into unforgettable culinary moments."
  };

  const teamMembers = content.team_members || [];

  return (
    <section id="team" className="editorial-section" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {teamData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {teamData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
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
                backgroundColor: 'var(--color-charcoal)',
                borderRadius: '12px',
                padding: '36px 30px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
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
                    backgroundColor: 'var(--color-midnight)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    marginBottom: '18px',
                    border: '1px solid var(--color-magenta)',
                    boxShadow: '0 0 14px rgba(255, 46, 136, 0.25)',
                  }}
                >
                  {member.role.includes('Chef') ? '👨‍🍳' : member.role.includes('Fry') ? '🔥' : '🍶'}
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.65rem',
                    color: '#FFFFFF',
                    marginBottom: '2px',
                  }}
                >
                  {member.name}
                  {member.korean_name && (
                    <span style={{ fontSize: '1.1rem', color: 'var(--color-cyan)', fontFamily: "'Noto Sans KR', sans-serif", marginLeft: '8px' }}>
                      {member.korean_name}
                    </span>
                  )}
                </h3>

                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '0.88rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-magenta)',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  {member.role}
                </div>

                <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {member.bio}
                </p>
              </div>

              {member.quote && (
                <div
                  style={{
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '14px',
                    fontSize: '0.85rem',
                    color: 'var(--color-amber)',
                    fontStyle: 'italic',
                  }}
                >
                  “{member.quote}”
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
