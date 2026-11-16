import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage({ onNavigate }) {
  const { data, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const hearth = data?.content?.open_fire_kitchen || {};
  const team = data?.team || [];

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '20%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(216, 154, 75, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-amber)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            {hearth.eyebrow || "THE SACRED FLAME"}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '20px', color: 'var(--color-ivory)' }}>
            {hearth.heading || "Crafted Over Fire. Served With Purpose."}
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            {hearth.description || "Our open hearth is the beating heart of the dining room. Live embers, wood smoke aromas, and the hypnotic sizzle of cast iron form an elemental backdrop to an evening of culinary drama."}
          </p>
        </div>
      </section>

      {/* Hearth Visual Showcase */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ borderRadius: '4px', overflow: 'hidden', height: '460px', border: '1px solid var(--border-subtle)', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.85)' }}>
            <img
              src={hearth.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"}
              alt="Open Fire Hearth"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16,16,16,0.9) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '32px', left: '32px', maxWidth: '600px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-amber)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                1,200°F LIVE COALS
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginTop: '6px' }}>
                Dual Argentine Cast-Iron Parrillas
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Masters Brigade */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
              CULINARY LEADERSHIP
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)' }}>
              The Masters Behind the Cut & Flame
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {team.map((member) => (
              <div
                key={member.id}
                style={{
                  background: 'var(--color-charcoal)',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)',
                  padding: '36px 30px',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--color-bronze)', marginBottom: '20px' }}>
                    <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-ivory)', marginBottom: '4px' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '14px' }}>
                    {member.role}
                  </div>

                  <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                    {member.bio}
                  </p>

                  {member.quote && (
                    <p style={{ color: 'var(--color-ivory)', fontSize: '0.9rem', fontStyle: 'italic', borderLeft: '2px solid var(--color-bronze)', paddingLeft: '14px', marginBottom: '20px' }}>
                      "{member.quote}"
                    </p>
                  )}
                </div>

                <div style={{ borderTop: '1px solid rgba(148, 115, 79, 0.15)', paddingTop: '16px', fontSize: '11px', color: 'var(--color-bronze)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>
                  Specialization: {member.specialization}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Table Booking Prompt */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Book the Chef's Hearth Table
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '32px' }}>
            Front-row culinary immersion for up to 8 guests directly facing the Argentine parrilla hearth with custom wood-smoke infusions.
          </p>
          <button
            onClick={() => triggerReservation("Chef's Hearth Table")}
            style={{ padding: '14px 34px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Request Chef's Hearth Seating
          </button>
        </div>
      </section>

    </div>
  );
}
