import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09_ChefTeam() {
  const { data } = useCMS();
  const team = data?.team || [];
  const execChef = team[0] || {
    name: "Marcus Sterling",
    role: "Executive Chef & Hearth Master",
    bio: "With over two decades leading Michelin-acclaimed steakhouse kitchens in New York and Chicago, Marcus has dedicated his career to the alchemy of heritage dry-aging and live hardwood embers.",
    quote: "Beef speaks with honest eloquence when respected with precise aging, honest fire, and mineral salt.",
    specialization: "Primal Cut Sourcing & Open Hearth Engineering",
    image_url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
  };

  const supportingTeam = team.slice(1);

  return (
    <section id="chef-team" style={{ backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
          <div className="section-eyebrow">
            MASTERY & CRAFTSMANSHIP
          </div>
          <h2 className="section-title">
            The Culinary Team
          </h2>
          <p className="section-desc">
            Led by passionate artisans who treat butchery, cellar aging, hearth mastery, and sommelier pairing as interconnected disciplines.
          </p>
        </div>

        {/* Executive Chef Spotlight Feature */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          background: 'var(--color-graphite)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '40px',
          marginBottom: '40px',
          alignItems: 'center'
        }}>
          <div style={{ maxWidth: '380px', height: '420px', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <img
              src={execChef.image_url}
              alt={execChef.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '8px'
            }}>
              {execChef.role}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '38px',
              color: 'var(--color-ivory)',
              marginBottom: '16px'
            }}>
              {execChef.name}
            </h3>

            <p style={{
              fontSize: '15px',
              color: 'var(--color-taupe)',
              lineHeight: '1.8',
              marginBottom: '24px'
            }}>
              {execChef.bio}
            </p>

            {execChef.quote && (
              <div style={{
                borderLeft: '2px solid var(--color-bronze)',
                paddingLeft: '16px',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '18px',
                color: 'var(--color-ivory)',
                marginBottom: '20px'
              }}>
                "{execChef.quote}"
              </div>
            )}

            <div style={{
              display: 'inline-block',
              background: 'rgba(16, 16, 16, 0.6)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 14px',
              borderRadius: '2px',
              fontSize: '12px',
              color: 'var(--color-champagne)'
            }}>
              Specialty: {execChef.specialization}
            </div>
          </div>
        </div>

        {/* Supporting Team Cards */}
        {supportingTeam.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}>
            {supportingTeam.map((member) => (
              <div
                key={member.id}
                style={{
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  padding: '24px',
                  display: 'flex',
                  gap: '18px',
                  alignItems: 'center'
                }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--color-bronze)' }}>
                  <img
                    src={member.image_url}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: 'var(--color-ivory)',
                    marginBottom: '4px'
                  }}>
                    {member.name}
                  </h4>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '11px',
                    color: 'var(--color-champagne)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '6px'
                  }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-taupe)', lineHeight: '1.5' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
