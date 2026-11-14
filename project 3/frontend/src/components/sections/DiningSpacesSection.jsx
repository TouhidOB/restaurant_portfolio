import React from 'react';
import { Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function DiningSpacesSection() {
  const { data, setIsReservationModalOpen } = useCMS();
  const spaces = data.dining_spaces || [];
  const section = data.sections?.dining_spaces || {};

  return (
    <section id="spaces" className="section-wrapper" style={{ backgroundColor: '#FCFBF8' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'THE SPACES'}
          </div>
          <h2 className="section-title">
            Four Atmospheric <em>Seating Environments</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'From panoramic cliff terraces to private limestone alcoves, each setting provides a distinct perspective of the Tyrrhenian horizon.'}
          </p>
        </div>

        {/* Spaces Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '32px',
          }}
        >
          {spaces.map((space) => (
            <div
              key={space.slug || space.id}
              className="luxury-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Space Image with Arch Silhouette */}
              <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                <img
                  src={space.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
                  alt={space.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(8, 23, 33, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: '#DFBA73',
                    padding: '5px 12px',
                    borderRadius: '30px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    fontWeight: 600,
                  }}
                >
                  {space.tag}
                </span>
              </div>

              {/* Space Info */}
              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.75rem', color: '#081721', marginBottom: '8px' }}>
                  {space.name}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#C5A059',
                    marginBottom: '16px',
                    fontWeight: 600,
                  }}
                >
                  <Users size={14} />
                  <span>{space.capacity}</span>
                </div>

                <p style={{ fontSize: '0.96rem', color: '#4A5255', lineHeight: 1.6, marginBottom: '20px' }}>
                  {space.description}
                </p>

                {/* Features List */}
                <div style={{ marginTop: 'auto', marginBottom: '24px', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '16px' }}>
                  {space.features && space.features.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: '#253B2F',
                        marginBottom: '6px',
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
                  Reserve Table Here →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
