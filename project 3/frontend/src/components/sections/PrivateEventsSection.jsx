import React from 'react';
import { Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function PrivateEventsSection() {
  const { data, setIsReservationModalOpen } = useCMS();
  const events = data.private_events || [];
  const section = data.sections?.events || {};

  return (
    <section id="events" className="section-wrapper" style={{ backgroundColor: '#F8F6F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'EXCLUSIVE GATHERINGS'}
          </div>
          <h2 className="section-title">
            {section.title || 'PRIVATE CELEBRATIONS & VILLA BUYOUTS'}
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
            gap: '32px',
          }}
        >
          {events.map((ev) => (
            <div
              key={ev.slug || ev.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                <img
                  src={ev.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                  alt={ev.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#174A63',
                    color: '#FAF9F5',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                  }}
                >
                  {ev.capacity}
                </span>
              </div>

              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.7rem', color: '#174A63', marginBottom: '10px' }}>
                  {ev.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#4A4E4D', lineHeight: 1.6, marginBottom: '20px' }}>
                  {ev.description}
                </p>

                <div style={{ marginTop: 'auto', marginBottom: '24px', borderTop: '1px solid #EFEAE0', paddingTop: '16px' }}>
                  {(ev.features || []).map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: '#68765A',
                        marginBottom: '6px',
                      }}
                    >
                      <CheckCircle2 size={13} color="#68765A" />
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
