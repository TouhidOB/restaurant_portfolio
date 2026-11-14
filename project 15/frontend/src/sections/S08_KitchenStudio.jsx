import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Flame, Clock, Sparkles, ChefHat } from 'lucide-react';

export default function S08_KitchenStudio() {
  const { data } = useCMS();

  const stations = [
    {
      title: "650°F Chrome Smash Griddle",
      subtitle: "The Lacing Engine",
      description: "Mirror-finish heavy steel heated to blistering temperatures. We smash our custom 45-day dry-aged beef to create an ultra-lacy, caramelized crust that traps every drop of juice.",
      stat: "650°F",
      tag: "THE MEAT LAB"
    },
    {
      title: "The 18-Sauce Chemistry Lab",
      subtitle: "Scratch Alchemy",
      description: "From fermented bird's eye chilies to smoked black garlic and truffle mayo, our sauces are engineered like molecular experiments and dispensed fresh per plate.",
      stat: "18 SAUCES",
      tag: "FLAVOR SCIENCE"
    },
    {
      title: "5:00 AM Brioche Bakery",
      subtitle: "Daily Craft Buns",
      description: "Japanese milk-bread technique meets golden French brioche. Baked twice daily so no burger is ever served on bread older than a few hours.",
      stat: "1,200+ BUNS",
      tag: "BAKERY DEPT"
    },
    {
      title: "Liquid Nitrogen & Smoke Bubble Rig",
      subtitle: "Theatrical Finishes",
      description: "Citrus aromatic smoke bubbles that burst table-side and instant-frozen fruit pearls. Presentation that is as dramatic as the taste.",
      stat: "-320°F",
      tag: "SPECIAL EFFECTS"
    }
  ];

  return (
    <section
      id="kitchen"
      style={{
        backgroundColor: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #171717',
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
              backgroundColor: '#00C389',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #171717',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 06 // THE CULINARY LABORATORY
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            THE OPEN KITCHEN THEATER.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#444',
              margin: 0
            }}
          >
            There are no back rooms or hidden secrets at POP! You can watch every smash, sear, sizzle, and sauce swirl from your table or directly at the pass.
          </p>
        </div>

        {/* 4 Stations Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {stations.map((station, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FFF',
                border: '4px solid #171717',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '6px 6px 0 #2455D6',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    style={{
                      backgroundColor: '#FFD928',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid #171717'
                    }}
                  >
                    {station.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      color: '#F04438'
                    }}
                  >
                    {station.stat}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: '#171717',
                    margin: '0 0 6px 0',
                    lineHeight: 1.2
                  }}
                >
                  {station.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: '#2455D6',
                    fontWeight: 700,
                    marginBottom: '12px'
                  }}
                >
                  // {station.subtitle}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    lineHeight: 1.55,
                    color: '#555',
                    margin: 0
                  }}
                >
                  {station.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '20px',
                  borderTop: '2px dashed #EEE',
                  paddingTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#888'
                }}
              >
                <ChefHat size={14} color="#171717" />
                <span>EXECUTIVE CULINARY SPECIFICATION</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
