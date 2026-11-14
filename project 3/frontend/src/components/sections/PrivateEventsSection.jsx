import React from 'react';
import { Users, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function PrivateEventsSection() {
  const { data, setIsReservationModalOpen } = useCMS();
  const events = data.private_events || [];
  const section = data.sections?.events || {};

  return (
    <section id="events" className="section-wrapper" style={{ backgroundColor: '#F6F4EE' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'EXCLUSIVE GATHERINGS'}
          </div>
          <h2 className="section-title">
            Private Celebrations & <em>Villa Buyouts</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Host unforgettable coastal weddings, intimate anniversaries, and bespoke sommelier dinners perched above the waves.'}
          </p>
        </div>

        {/* Offerings Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '36px',
          }}
        >
          {events.map((ev) => (
            <div
              key={ev.slug || ev.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '270px', overflow: 'hidden' }}>
                <img
                  src={ev.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                  alt={ev.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    background: 'rgba(8, 23, 33, 0.92)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    color: '#DFBA73',
                    padding: '5px 14px',
                    borderRadius: '30px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {ev.capacity}
                </span>
              </div>

              <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#081721', marginBottom: '12px' }}>
                  {ev.title}
                </h3>
                <p style={{ fontSize: '0.96rem', color: '#4A5255', lineHeight: 1.65, marginBottom: '22px' }}>
                  {ev.description}
                </p>

                <div style={{ marginTop: 'auto', marginBottom: '26px', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '18px' }}>
                  {(ev.features || []).map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12.5px',
                        color: '#253B2F',
                        marginBottom: '8px',
                      }}
                    >
                      <CheckCircle2 size={13} color="#C5A059" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsReservationModalOpen(true)}
                  className="btn-outline-gold"
                  style={{ width: '100%', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  Inquire For Private Event →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
