import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage({ onNavigate }) {
  const { content, openReservationModal } = useCMS();
  const expData = content?.editorial_sections?.s10_experiences || {
    badge: "LATE NIGHT SPECIALS",
    title: "Curated Group Dining & Pocha Tables",
    description: "Planning a celebration with friends? Reserve our pocha group tables with feast pairings and chilled soju towers."
  };

  const experiences = content.dining_experiences || [
    {
      id: "exp-pocha-feast",
      name: "Midnight Pocha Feast",
      korean_name: "자정 포차 한상",
      description: "A sprawling banquet featuring double-fried chicken, fiery buldak skewers, tteokbokki cauldrons, and craft banchan.",
      capacity: "4–8 Guests",
      price_note: "₩48,000 / guest",
      highlights: ["Double-fried Korean fried chicken", "Sizzling Buldak skewers", "Freshly simmered seafood tteokbokki", "Free-flowing artisan barley tea"]
    },
    {
      id: "exp-soju-tasting",
      name: "Craft Soju & Anju Pairing",
      korean_name: "전통주 & 안주 페어링",
      description: "Curated regional single-distilled soju, cloudy makgeolli, and fruit-infused draughts paired with spicy bar snacks.",
      capacity: "2–6 Guests",
      price_note: "₩36,000 / guest",
      highlights: ["4 distinct artisanal soju flights", "House-made scallion jeon & seafood pancakes", "Crispy glazed pork belly bites", "Sommelier-guided flavor notes"]
    },
    {
      id: "exp-neon-vip",
      name: "Hongdae Neon VIP Tent",
      korean_name: "홍대 네온 프라이빗 룸",
      description: "Exclusive retro vinyl tent styled after vintage Mapo pochas with private bluetooth sound, retro arcade games, and personal table attendant.",
      capacity: "6–12 Guests",
      price_note: "₩65,000 / guest",
      highlights: ["Private retro booth space", "Exclusive chef specialty off-menu dishes", "Chilled tower dispenser with signature neon soju cocktail", "Custom music & karaoke access"]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Banner */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', left: '10%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(33, 212, 232, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px' }}>
          <span className="text-eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>
            {expData.badge || "POCHA SPECIAL OCCASIONS"}
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
            Curated Dining Experiences
          </h1>
          <p style={{ color: 'var(--color-silver)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            {expData.description}
          </p>
        </div>
      </section>

      {/* Experience Cards */}
      <section style={{ padding: '90px 0', backgroundColor: '#0B0D0F' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                style={{
                  backgroundColor: 'var(--color-charcoal)',
                  borderRadius: '16px',
                  padding: '40px 32px',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: idx === 0 ? 'var(--color-magenta)' : idx === 1 ? 'var(--color-cyan)' : 'var(--color-amber)' }} />
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-cyan)', fontWeight: 700 }}>
                      {exp.capacity || 'Group Dining'}
                    </span>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.25rem', color: 'var(--color-amber)', fontWeight: 700 }}>
                      {exp.price_note || exp.price}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '4px' }}>
                    {exp.name}
                  </h3>
                  {exp.korean_name && (
                    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: '1.05rem', color: 'var(--color-coral)', marginBottom: '16px', fontWeight: 600 }}>
                      {exp.korean_name}
                    </div>
                  )}

                  <p style={{ color: 'var(--color-silver)', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '24px' }}>
                    {exp.description}
                  </p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', marginBottom: '28px' }}>
                      <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-muted)', marginBottom: '12px', fontWeight: 600 }}>
                        Experience Inclusions
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} style={{ fontSize: '0.9rem', color: '#D8D8D8', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: 'var(--color-cyan)' }}>✦</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => openReservationModal && openReservationModal(exp.name)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 700, borderRadius: '8px', textAlign: 'center' }}
                >
                  Book This Experience
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Events & Catering Callout */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-midnight)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '780px', textAlign: 'center' }}>
          <span className="text-eyebrow" style={{ display: 'inline-block', marginBottom: '8px' }}>LARGE PARTIES & BUYOUTS</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', color: '#F6F4F0', marginBottom: '16px' }}>
            Full Pocha Buyouts & Private Celebrations
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '32px' }}>
            Looking to host a production wrap party, birthday celebration, or corporate event with authentic Korean night market energy? We offer partial tent closures and full restaurant buyouts for up to 80 guests.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate && onNavigate('/contact')}
              className="btn btn-secondary"
              style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 600, borderRadius: '8px' }}
            >
              Contact Event Concierge
            </button>
            <button
              onClick={() => openReservationModal && openReservationModal('Group Table')}
              className="btn btn-primary"
              style={{ padding: '14px 32px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
            >
              Reserve Regular Table
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
