import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ChefHat } from 'lucide-react';

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
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#CCFF00', borderColor: 'rgba(204, 255, 0, 0.25)' }}>
            CHAPTER 06 // THE CULINARY LABORATORY
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
            THE OPEN KITCHEN THEATER.
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
            There are no back rooms or hidden doors at POP! Guests can watch every sear, sizzle, and molecular bubble flourish in full open view.
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
                backgroundColor: '#12141D',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#CCFF00',
                      letterSpacing: '0.5px'
                    }}
                  >
                    // {station.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#FF6B8B'
                    }}
                  >
                    {station.stat}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFF',
                    margin: '0 0 6px 0',
                    lineHeight: 1.3
                  }}
                >
                  {station.title}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#00F0FF',
                    fontWeight: 600,
                    marginBottom: '14px'
                  }}
                >
                  {station.subtitle}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: '#9FA5B7',
                    margin: 0
                  }}
                >
                  {station.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '28px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: '#646A7E'
                }}
              >
                <ChefHat size={14} color="#9FA5B7" />
                <span>EXECUTIVE CULINARY SPEC</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
