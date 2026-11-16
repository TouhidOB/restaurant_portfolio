import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage({ onNavigate }) {
  const { content, openReservationModal } = useCMS();
  const kitData = content?.editorial_sections?.s08_kitchen || {
    badge: "BEHIND THE COUNTER",
    title: "MADE FRESH. SERVED HOT.",
    korean_title: "불꽃 위에서 완성되는 길거리 요리",
    description: "Our open kitchen is an unfiltered theater of heat, smoke, and speed. Searing wok flames, bubbling red cauldrons, and double-fried perfection in real time.",
    process_steps: [
      { step: "01", name: "Buldak & Gochujang Reduction", desc: "Simmered with Korean radish, kelp, and 3 types of chili flakes" },
      { step: "02", name: "12-Hour Marinade", desc: "Fresh chicken steeped in ginger, Korean pear, and sea salt" },
      { step: "03", name: "High-Heat Flash Wok", desc: "Locking in natural moisture with intense wok hei" }
    ]
  };

  const teamMembers = content.team_members || [];

  return (
    <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Banner */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 46, 136, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px' }}>
          <span className="text-eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>
            {kitData.badge || "STREET MASTERS & OPEN FLAME"}
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
            Culinary Brigade & Wok Fire
          </h1>
          {kitData.korean_title && (
            <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: '1.3rem', color: 'var(--color-coral)', fontWeight: 700, marginBottom: '20px' }}>
              {kitData.korean_title}
            </div>
          )}
          <p style={{ color: 'var(--color-silver)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            {kitData.description}
          </p>
        </div>
      </section>

      {/* Culinary Philosophy & Process */}
      <section style={{ padding: '80px 0', backgroundColor: '#0A0C0E' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px auto' }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>THE FLAME CRAFT</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', color: '#F6F4F0' }}>
              3-Stage Street Alchemy
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {kitData.process_steps && kitData.process_steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '12px',
                  padding: '40px 32px',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.8rem', fontWeight: 800, color: 'var(--color-coral)', marginBottom: '14px', lineHeight: 1 }}>
                  {step.step}
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '12px' }}>
                  {step.name}
                </h3>
                <p style={{ color: 'var(--color-silver)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen Brigade Cards */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--color-midnight)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
            <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>MEET THE ARTISANS</span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', color: '#F6F4F0' }}>
              The Masters Behind Every Sizzle
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '12px',
                  padding: '36px 30px',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-midnight)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      marginBottom: '20px',
                      border: '1px solid var(--color-magenta)',
                      boxShadow: '0 0 16px rgba(255, 46, 136, 0.3)',
                    }}
                  >
                    {member.role?.includes('Chef') ? '👨‍🍳' : member.role?.includes('Fry') ? '🔥' : '🍶'}
                  </div>

                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.65rem', color: '#FFFFFF', marginBottom: '4px' }}>
                    {member.name}
                    {member.korean_name && (
                      <span style={{ fontSize: '1.1rem', color: 'var(--color-cyan)', fontFamily: "'Noto Sans KR', sans-serif", marginLeft: '10px' }}>
                        {member.korean_name}
                      </span>
                    )}
                  </h3>

                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.9rem', letterSpacing: '0.12em', color: 'var(--color-magenta)', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 700 }}>
                    {member.role}
                  </div>

                  <p style={{ color: 'var(--color-silver)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
                    {member.bio}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {member.specialty || 'Signature Craft'}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                    {member.experience || '10+ Yrs Craft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#0A0C0E', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', color: '#F6F4F0', marginBottom: '16px' }}>
            Experience the Flame Counter Live
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
            Book counter seating directly in front of the open wok stations for front-row views of Hongdae's late-night fire.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openReservationModal && openReservationModal('Chef Wok Counter')}
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
            >
              Reserve Counter Table
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/menu')}
              className="btn btn-secondary"
              style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 600, borderRadius: '8px' }}
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
