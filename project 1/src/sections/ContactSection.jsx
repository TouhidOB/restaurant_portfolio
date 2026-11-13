import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';

export default function ContactSection({ restaurant, sectionData = {} }) {
  const eyebrow = sectionData.eyebrow || 'FIND & CONNECT';
  const title = sectionData.title || 'We Look Forward to Welcoming You.';
  const description =
    sectionData.description ||
    'Located at the prestigious Grand Promenade in Gulshan 2. Complimentary valet parking is available for all reserved patrons.';

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            {eyebrow}
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--color-pearl)',
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              maxWidth: '580px',
              margin: '0 auto',
              fontSize: '15px',
              color: 'var(--color-pearl-muted)',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
          <div className="gold-divider">
            <span className="deco-diamond" />
          </div>
        </div>

        {/* 2-Column Grid: Contact Details Left, Map Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Contact Info Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Address Block */}
            <div
              className="deco-frame"
              style={{
                backgroundColor: 'var(--color-obsidian-soft)',
                padding: '28px',
                display: 'flex',
                gap: '18px',
              }}
            >
              <div style={{ padding: '10px', background: 'rgba(214, 184, 121, 0.1)', border: '1px solid var(--color-gold)', height: 'fit-content' }}>
                <MapPin size={22} color="var(--color-gold)" />
              </div>
              <div>
                <h4 style={{ fontSize: '18px', color: 'var(--color-pearl)', marginBottom: '8px' }}>
                  Visit Our Salon
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--color-pearl-muted)', lineHeight: 1.6 }}>
                  {restaurant.contact?.fullAddress}
                </p>
                {restaurant.contact?.googleMapsDirectionsUrl && (
                  <a
                    href={restaurant.contact.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                      marginTop: '12px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>GET DIRECTIONS IN GOOGLE MAPS</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Opening Hours Block */}
            <div
              className="deco-frame"
              style={{
                backgroundColor: 'var(--color-obsidian-soft)',
                padding: '28px',
                display: 'flex',
                gap: '18px',
              }}
            >
              <div style={{ padding: '10px', background: 'rgba(214, 184, 121, 0.1)', border: '1px solid var(--color-gold)', height: 'fit-content' }}>
                <Clock size={22} color="var(--color-gold)" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '18px', color: 'var(--color-pearl)', marginBottom: '12px' }}>
                  Salon Hours
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  {(restaurant.hours || []).map((h, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-gold-subtle)', paddingBottom: '6px' }}>
                      <span style={{ color: 'var(--color-pearl-muted)' }}>{h.days}:</span>
                      <span style={{ color: 'var(--color-gold)', fontWeight: 500 }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Inquiries & Concierge */}
            <div
              className="deco-frame"
              style={{
                backgroundColor: 'var(--color-obsidian-soft)',
                padding: '28px',
                display: 'flex',
                gap: '18px',
              }}
            >
              <div style={{ padding: '10px', background: 'rgba(214, 184, 121, 0.1)', border: '1px solid var(--color-gold)', height: 'fit-content' }}>
                <Phone size={22} color="var(--color-gold)" />
              </div>
              <div>
                <h4 style={{ fontSize: '18px', color: 'var(--color-pearl)', marginBottom: '10px' }}>
                  Direct Concierge
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <a
                    href={`tel:${restaurant.contact?.phone || ''}`}
                    style={{ color: 'var(--color-pearl)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span style={{ color: 'var(--color-gold)' }}>Telephone:</span> {restaurant.contact?.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${restaurant.contact?.email || ''}`}
                    style={{ color: 'var(--color-pearl)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span style={{ color: 'var(--color-gold)' }}>Email:</span> {restaurant.contact?.email}
                  </a>
                  {restaurant.contact?.whatsapp && (
                    <a
                      href={`https://wa.me/${restaurant.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#25D366', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <MessageSquare size={14} /> WhatsApp: {restaurant.contact?.whatsappDisplay}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Google Map */}
          <div className="deco-frame" style={{ minHeight: '440px', overflow: 'hidden', position: 'relative' }}>
            {restaurant.contact?.googleMapsEmbedUrl && (
              <iframe
                title="Aurelia Restaurant Location Map"
                src={restaurant.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '440px', filter: 'invert(90%) hue-rotate(180deg) contrast(1.15) brightness(0.85)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
            {/* Map Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(18, 59, 53, 0.92)',
                border: '1px solid var(--color-gold)',
                padding: '12px 18px',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="deco-diamond" />
                <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
                  AURELIA VALET CONCIERGE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
