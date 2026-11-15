import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Compass, Sparkles, Calendar, Users, Eye } from 'lucide-react';

export default function InteriorPage() {
  const { data, openReservation, setActiveTourIndex } = useCMS();
  const spaces = data.dining_spaces || [];

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 70px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '16px' }}>
            <Compass size={13} />
            <span>Four Architectural Salons</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '18px', fontWeight: 600 }}>
            Dining Spaces & Architectural Havens
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '700px', margin: '0 auto 28px' }}>
            From candlelit travertine vaults carved into sheer cliffside to breezy panoramic pergolas suspended above the sea.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={openReservation} className="btn-gold" style={{ padding: '12px 28px', fontSize: '12.5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Calendar size={15} style={{ marginRight: '8px', display: 'inline' }} />
              Reserve Preferred Space
            </button>
            <a href="/tour" className="btn-outline" style={{ padding: '12px 24px', fontSize: '12.5px', textDecoration: 'none', color: '#081721', border: '1px solid #C5A059', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
              Explore In 3D Virtual Tour
            </a>
          </div>
        </div>
      </section>

      {/* Spaces Listing */}
      <section style={{ padding: '70px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {spaces.map((space, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={space.id || index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    alignItems: 'center',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2DAD0',
                    padding: '36px',
                    boxShadow: '0 6px 25px rgba(8, 23, 33, 0.04)',
                  }}
                >
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div style={{ height: '360px', borderRadius: '10px', overflow: 'hidden' }}>
                      <img
                        src={space.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'}
                        alt={space.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>

                  <div style={{ order: isEven ? 1 : 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                        Salon 0{index + 1}
                      </span>
                      <span style={{ fontSize: '11px', color: '#7A7E80' }}>•</span>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#9E7B36', fontWeight: 600 }}>
                        {space.capacity}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#081721', marginBottom: '12px', lineHeight: 1.2 }}>
                      {space.name}
                    </h2>

                    <p style={{ fontStyle: 'italic', color: '#7A7E80', fontSize: '0.95rem', marginBottom: '16px' }}>
                      {space.atmosphere}
                    </p>

                    <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#5C6366', marginBottom: '24px' }}>
                      {space.description}
                    </p>

                    <button
                      onClick={openReservation}
                      className="btn-gold"
                      style={{ padding: '10px 22px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
                    >
                      Book A Table Here
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
