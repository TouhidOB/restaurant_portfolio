import React from 'react';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

export default function S14Location({ restaurant }) {
  const contact = restaurant.contact || {};
  const hours = restaurant.hours || [];

  return (
    <section
      id="contact"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: '#EBE7DD',
      }}
    >
      <div className="zen-container">
        <div style={{ maxWidth: '640px', marginBottom: '48px' }}>
          <div className="zen-eyebrow">
            FIND OUR PAVILION
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, var(--section-heading-size))', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
            Find Your Way to Us.
          </h2>
          <p className="font-jp" style={{ fontSize: '15px', color: 'var(--color-moss)' }}>
            所在地と営業時間
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Details Column */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              padding: '36px',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontSize: '22px', color: 'var(--color-charcoal)', marginBottom: '24px' }}>
                Sanctuary Address &amp; Lines
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--color-bamboo)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-stone)' }}>
                      Physical Location
                    </div>
                    <div style={{ fontSize: '15px', color: 'var(--color-charcoal)', fontWeight: 500 }}>
                      {contact.fullAddress || contact.address}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Phone size={20} color="var(--color-bamboo)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-stone)' }}>
                      Telephone Concierge
                    </div>
                    <a href={`tel:${contact.phone}`} style={{ fontSize: '15px', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                      {contact.phoneDisplay || contact.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <MessageSquare size={20} color="var(--color-moss)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-stone)' }}>
                      WhatsApp Direct
                    </div>
                    <a
                      href={`https://wa.me/${contact.whatsapp?.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '15px', color: 'var(--color-moss)', fontWeight: 600 }}
                    >
                      {contact.whatsappDisplay || contact.whatsapp}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Mail size={20} color="var(--color-bamboo)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-stone)' }}>
                      Inquiry Mail
                    </div>
                    <a href={`mailto:${contact.email}`} style={{ fontSize: '15px', color: 'var(--color-charcoal)', fontWeight: 500 }}>
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Block */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
              <div style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '12px' }}>
                Pavilion Service Hours
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {hours.map((h, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-charcoal)', fontWeight: 500 }}>{h.days}</span>
                    <span style={{ color: 'var(--color-stone)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Map Column */}
          <div
            style={{
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              height: '100%',
              minHeight: '420px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            }}
          >
            {contact.googleMapsEmbedUrl ? (
              <iframe
                title="Google Maps Location"
                src={contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#DDD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Google Maps Embed
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
