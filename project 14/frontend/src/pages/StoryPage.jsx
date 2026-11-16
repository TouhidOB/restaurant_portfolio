import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage({ onNavigate }) {
  const { data, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const story = data?.content?.brand_story || {};

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Banner */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(148, 115, 79, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '840px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            {story.eyebrow || "HERITAGE & CRAFT"}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '20px', color: 'var(--color-ivory)' }}>
            {story.heading || "Beyond the Ordinary Dining Experience"}
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 28px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8, fontStyle: 'italic' }}>
            "{story.quote || "In fine beef, perfection is not an accident of flame; it is the patient intersection of heritage breeding, bespoke dry-aging, and exact thermal mastery."}"
          </p>
        </div>
      </section>

      {/* Main Narrative Split */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '50px', alignItems: 'center' }}>
            
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '12px' }}>
                ARCHITECTURAL SANCTUARY
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1.25, color: 'var(--color-ivory)', marginBottom: '20px' }}>
                The Genesis of Charred & Prime
              </h2>
              <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
                {story.main_text || "Charred & Prime was conceived as an architectural sanctuary for carnivorous connoisseurs. Combining bespoke 45-day Himalayan salt dry-aging with custom white-oak Argentine parrillaworks, we celebrate the purity of heritage cattle and prime cuts in an environment of quiet, commanding luxury."}
              </p>
              <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
                {story.secondary_text || "Every element—from hand-chiseled basalt stone counters and smoked fluted glass partitions to custom hand-forged steak knives—has been meticulously curated to elevate steak dining into a multisensory ceremony."}
              </p>
              <button
                onClick={() => triggerReservation('Brand Story Reservation')}
                className="btn-prime"
                style={{ padding: '14px 32px', fontSize: '12px', background: 'var(--color-bronze)', color: '#101010', border: 'none', borderRadius: '2px', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}
              >
                Experience Our Space
              </button>
            </div>

            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)', height: '480px' }}>
              <img
                src={story.featured_image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"}
                alt="Charred & Prime Interior Architecture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
              THE THREE TENETS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)' }}>
              Provenance, Chamber & Flame
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            <div style={{ background: 'var(--color-charcoal)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '36px 30px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-bronze)', marginBottom: '14px', fontWeight: 700 }}>01</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-ivory)', marginBottom: '12px', letterSpacing: '0.5px' }}>Single-Origin Ranches</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                100% USDA Prime Black Angus from single-source Nebraska pasturelands alongside certified A5 Miyazaki Wagyu directly imported from Japan.
              </p>
            </div>

            <div style={{ background: 'var(--color-charcoal)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '36px 30px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-champagne)', marginBottom: '14px', fontWeight: 700 }}>02</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-ivory)', marginBottom: '12px', letterSpacing: '0.5px' }}>Himalayan Salt Chamber</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Our in-house salt-brick vault ages primal loins for 35 to 65 days under precision microclimates, concentrating natural umami and achieving velvet tenderness.
              </p>
            </div>

            <div style={{ background: 'var(--color-charcoal)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '36px 30px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-amber)', marginBottom: '14px', fontWeight: 700 }}>03</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-ivory)', marginBottom: '12px', letterSpacing: '0.5px' }}>Dual-Flame Argentine Hearth</h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Seared over kiln-dried Pennsylvania white oak and embers reaching 1,200°F on dual Argentine cast-iron wheels to achieve an immaculate caramel crust.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Booking Prompt */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)', textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="section-container" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Dine in Midtown East
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '32px' }}>
            Book your evening at Charred & Prime. Select between executive daylight lunch service or twilight prime dinner shifts.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => triggerReservation('Story Page Table')}
              style={{ padding: '14px 34px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Reserve Table
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/menu')}
              style={{ padding: '14px 34px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '2px', color: 'var(--color-ivory)', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
