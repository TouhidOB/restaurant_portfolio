import React from 'react';
import { Users, Wind, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function DiningSpacesSection() {
  const { data, setIsReservationModalOpen } = useCMS();
  const spaces = data.dining_spaces || [];
  const section = data.sections?.dining_spaces || {};

  return (
    <section id="spaces" className="section-wrapper" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'THE SPACES'}
          </div>
          <h2 className="section-title">
            {section.title || 'FOUR ATMOSPHERIC SEATING SPACES'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'From panoramic cliff terraces to private limestone alcoves, each setting provides a distinct perspective of the Tyrrhenian horizon.'}
          </p>
        </div>

        {/* Spaces Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '30px',
          }}
        >
          {spaces.map((space) => (
            <div
              key={space.slug || space.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Space Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={space.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
                  alt={space.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(23, 74, 99, 0.88)',
                    color: '#FAF9F5',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {space.tag}
                </span>
              </div>

              {/* Space Info */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.6rem', color: '#174A63', marginBottom: '8px' }}>
                  {space.name}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#367E94',
                    marginBottom: '14px',
                  }}
                >
                  <Users size={14} />
                  <span>{space.capacity}</span>
                </div>

                <p style={{ fontSize: '0.92rem', color: '#4A4E4D', lineHeight: 1.5, marginBottom: '16px' }}>
                  {space.description}
                </p>

                {/* Features List */}
                <div style={{ marginTop: 'auto', marginBottom: '20px', borderTop: '1px solid #EFEAE0', paddingTop: '14px' }}>
                  {space.features && space.features.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11px',
                        color: '#68765A',
                        marginBottom: '4px',
                      }}
                    >
                      <CheckCircle2 size={12} color="#68765A" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsReservationModalOpen(true)}
                  className="btn-outline-gold"
                  style={{ width: '100%', textAlign: 'center', fontSize: '0.8rem' }}
                >
                  Request Seating Here →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
