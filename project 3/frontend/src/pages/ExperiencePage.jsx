import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, Anchor, Wine, Compass } from 'lucide-react';

export default function ExperiencePage() {
  const { data, openReservation } = useCMS();
  const events = data.private_events || [];

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 70px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '16px' }}>
            <Anchor size={13} />
            <span>Private Celebrations & Yacht Buyouts</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '18px', fontWeight: 600 }}>
            Curated Mediterranean Experiences
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '700px', margin: '0 auto 28px' }}>
            From sunset crudo tastings paired with pre-phylloxera volcanic whites to full-estate buyout celebrations accommodating superyacht tender arrivals.
          </p>

          <button onClick={openReservation} className="btn-gold" style={{ padding: '12px 28px', fontSize: '12.5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Calendar size={15} style={{ marginRight: '8px', display: 'inline' }} />
            Inquire Exclusive Experience
          </button>
        </div>
      </section>

      {/* Offerings Grid */}
      <section style={{ padding: '70px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)' }}>
                  <div style={{ height: '240px', overflow: 'hidden' }}>
                    <img
                      src={event.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                      alt={event.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', fontWeight: 700 }}>
                      {event.ideal_for || 'Private Celebration'}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', color: '#081721', margin: '6px 0 10px' }}>
                      {event.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#5C6366', marginBottom: '18px' }}>
                      {event.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0ECE4', paddingTop: '14px' }}>
                      <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono, monospace)', color: '#9E7B36', fontWeight: 600 }}>
                        Capacity: {event.max_guests} Guests
                      </span>
                      <button onClick={openReservation} className="btn-gold" style={{ padding: '6px 14px', fontSize: '11px', cursor: 'pointer' }}>
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#081721' }}>Private Gala & Yacht Buyouts</h3>
                <p style={{ color: '#5C6366', maxWidth: '600px', margin: '12px auto' }}>Exclusive hire of all four dining terraces, private boat shuttle service, and bespoke multi-course menus.</p>
                <button onClick={openReservation} className="btn-gold" style={{ padding: '10px 24px' }}>Contact Concierge</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
