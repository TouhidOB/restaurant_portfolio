import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Heart } from 'lucide-react';

export default function S09_CulinaryTeam() {
  const { data } = useCMS();
  const team = data.team || [];

  return (
    <section
      id="team"
      style={{
        backgroundColor: '#090A0E',
        padding: '110px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '50px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#FF6B8B', borderColor: 'rgba(255, 51, 102, 0.25)' }}>
            CHAPTER 07 // THE CREW
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            THE PEOPLE BEHIND THE PLATE.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            A collective of rebel chefs, visual artists, and beverage alchemists who refuse to play by conventional restaurant rules.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {team.map((member) => (
            <div
              key={member.id}
              style={{
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              {/* Photo Frame */}
              <div style={{ height: '320px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={member.image_url}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(9, 10, 14, 0.85)',
                    backdropFilter: 'blur(12px)',
                    color: '#CCFF00',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(204, 255, 0, 0.25)',
                    letterSpacing: '0.5px'
                  }}
                >
                  {member.role}
                </div>
              </div>

              {/* Bio & Details */}
              <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '19px',
                      fontWeight: 700,
                      color: '#FFF',
                      margin: '0 0 10px 0'
                    }}
                  >
                    {member.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      lineHeight: 1.6,
                      color: '#9FA5B7',
                      margin: '0 0 18px 0'
                    }}
                  >
                    {member.bio}
                  </p>
                </div>

                {member.favorite_dish && (
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <Heart size={14} color="#FF3366" fill="#FF3366" />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#646A7E', textTransform: 'uppercase' }}>
                        Favorite Creation
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: '#FFF' }}>
                        {member.favorite_dish}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
