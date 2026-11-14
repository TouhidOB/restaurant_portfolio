import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function S09_CulinaryTeam() {
  const { data } = useCMS();
  const team = data.team || [];

  return (
    <section
      id="team"
      style={{
        backgroundColor: '#171717',
        color: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #F04438',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#FFD928',
              color: '#171717',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #FFF',
              boxShadow: '3px 3px 0 #F04438',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 07 // THE CREW
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#FFF',
              margin: '0 0 16px 0',
              textShadow: '4px 4px 0 #2455D6'
            }}
          >
            THE PEOPLE BEHIND THE PLATE.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#CCC',
              margin: 0
            }}
          >
            A collective of rebel chefs, visual artists, and cocktail scientists who refuse to play by conventional restaurant rules.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {team.map((member) => (
            <div
              key={member.id}
              style={{
                backgroundColor: '#242730',
                border: '3px solid #FFF',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '8px 8px 0 #FFD928',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              {/* Photo */}
              <div style={{ height: '320px', position: 'relative', borderBottom: '3px solid #FFF' }}>
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
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: '#F04438',
                    color: '#FFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #FFF'
                  }}
                >
                  {member.role}
                </div>
              </div>

              {/* Bio & Details */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      color: '#FFD928',
                      margin: '0 0 8px 0',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {member.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: '#DDD',
                      margin: '0 0 16px 0'
                    }}
                  >
                    {member.bio}
                  </p>
                </div>

                {member.favorite_dish && (
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Heart size={16} color="#F04438" fill="#F04438" />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#AAA', textTransform: 'uppercase' }}>
                        Favorite Studio Creation
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: '#FFF' }}>
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
