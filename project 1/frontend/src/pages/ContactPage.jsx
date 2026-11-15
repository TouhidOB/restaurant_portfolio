import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Calendar, MessageSquare } from 'lucide-react';

export default function ContactPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const contact = config?.contact || {};
  const hours = config?.hours || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Hero Header */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(214, 184, 121, 0.25)',
          background: 'linear-gradient(180deg, rgba(18, 59, 53, 0.95) 0%, rgba(13, 15, 16, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#D6B879',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(243, 237, 225, 0.7)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
              }}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: '#E8D3A2' }}>MAITRE D' & LOCATION</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ CONCIERGE & ACCESS
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#D6B879',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Visit Aurelia Grand Salon.
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              Located in the diplomatic quarter of Gulshan-2, Dhaka. Complimentary valet parking and anticipatory concierge desk awaiting your arrival.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section style={{ padding: '5rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
            {/* Contact Details */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '2.2rem', color: '#D6B879', marginBottom: '2rem' }}>
                Maitre d’ Concierge Desk
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <MapPin size={22} color="#D6B879" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#D6B879', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                      PHYSICAL ADDRESS
                    </div>
                    <div style={{ fontSize: '15px', color: '#FFFFFF', marginTop: '4px' }}>
                      {contact.fullAddress || 'Grand Promenade, Road 71, Gulshan 2, Dhaka 1212'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Phone size={22} color="#D6B879" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#D6B879', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                      TELEPHONE INQUIRIES
                    </div>
                    <div style={{ fontSize: '15px', color: '#FFFFFF', marginTop: '4px' }}>
                      <a href={`tel:${contact.phone}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                        {contact.phoneDisplay || '+880 1711 889900'}
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Mail size={22} color="#D6B879" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#D6B879', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                      ELECTRONIC MAIL
                    </div>
                    <div style={{ fontSize: '15px', color: '#FFFFFF', marginTop: '4px' }}>
                      <a href={`mailto:${contact.email}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                        {contact.email || 'concierge@aurelia-dining.com'}
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Clock size={22} color="#D6B879" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#D6B879', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                      SERVICE HOURS & SHIFTS
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(243, 237, 225, 0.85)', marginTop: '4px', lineHeight: 1.6 }}>
                      Lunch Shift: 12:00 PM – 3:30 PM (Daily)<br />
                      Dinner Shift: 6:30 PM – 11:30 PM (Daily)
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openReservation('Contact')}
                  style={{
                    padding: '14px 28px',
                    backgroundColor: '#123B35',
                    border: '1px solid #D6B879',
                    color: '#D6B879',
                    fontFamily: 'var(--font-display, Bodoni Moda)',
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  RESERVE A TABLE
                </button>

                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '14px 24px',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(214, 184, 121, 0.4)',
                      color: '#F3EDE1',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <MessageSquare size={16} color="#D6B879" /> WHATSAPP HOST DESK
                  </a>
                )}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div>
              <div
                style={{
                  height: '420px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid #D6B879',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
                }}
              >
                <iframe
                  title="Aurelia Restaurant Location Map"
                  src={contact.googleMapsEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700319760742!2d90.4072!3d23.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15ea1de1%3A0xf6b567546e90a53!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd'}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              {/* Guest Logistics Note */}
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: 'rgba(18, 59, 53, 0.3)', border: '1px solid rgba(214, 184, 121, 0.2)', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', color: '#D6B879', fontWeight: 600, marginBottom: '4px' }}>
                  ✦ GUEST DRESS CODE & VALET ETIQUETTE
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(243, 237, 225, 0.8)', lineHeight: 1.6 }}>
                  Smart Elegant attire requested. Athletic sportswear and flip-flops are politely discouraged in the Grand Dining Salon and Champagne Parlour.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
