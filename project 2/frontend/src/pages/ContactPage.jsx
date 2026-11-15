import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function ContactPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const contact = config?.contact || {};
  const hours = config?.hours || [];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Dining Inquiry',
    message: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#141715', color: '#F2EFE6' }}>
      {/* Header */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
          background: 'linear-gradient(180deg, rgba(26, 30, 27, 0.98) 0%, rgba(20, 23, 21, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B6A17B',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(242, 239, 230, 0.7)',
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
            <span style={{ color: '#C9B896' }}>CONCIERGE & LOCATION</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 HOST DESK & CONCIERGE
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Cormorant Garamond)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#F2EFE6',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Connect with Our Host Concierge Desk.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              Located in the quiet residential enclave of Gulshan 2, Dhaka. Our team is at your disposal for table allocations, private tatami suites, and dietary consultations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Info Grid */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
            {/* Logistics Details */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2rem', color: '#F2EFE6', marginBottom: '2rem' }}>
                Sanctuary Logistics & Shift Hours
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <MapPin size={22} style={{ color: '#B6A17B', marginTop: '3px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#F2EFE6', marginBottom: '4px' }}>Physical Address</strong>
                    <p style={{ fontSize: '14px', color: 'rgba(242, 239, 230, 0.8)', margin: 0, lineHeight: 1.6 }}>
                      {contact.fullAddress || 'Bonsai Pavilion, Road 55, Gulshan 2, Dhaka 1212, Bangladesh'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Phone size={22} style={{ color: '#B6A17B', marginTop: '3px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#F2EFE6', marginBottom: '4px' }}>Concierge Hotline & WhatsApp</strong>
                    <p style={{ fontSize: '14px', color: 'rgba(242, 239, 230, 0.8)', margin: 0 }}>
                      {contact.phoneDisplay || contact.phone || '+880 1711-556677'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Mail size={22} style={{ color: '#B6A17B', marginTop: '3px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#F2EFE6', marginBottom: '4px' }}>Electronic Inquiries</strong>
                    <p style={{ fontSize: '14px', color: 'rgba(242, 239, 230, 0.8)', margin: 0 }}>
                      {contact.email || 'omotenashi@enso-zen.com'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Clock size={22} style={{ color: '#B6A17B', marginTop: '3px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: '#F2EFE6', marginBottom: '6px' }}>Service Shifts</strong>
                    {hours.map((h, i) => (
                      <div key={i} style={{ fontSize: '13px', color: 'rgba(242, 239, 230, 0.75)', marginBottom: '4px' }}>
                        <strong>{h.days}:</strong> {h.time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Table Reserve CTA */}
              <button
                onClick={openReservation}
                style={{
                  padding: '14px 28px',
                  backgroundColor: '#B6A17B',
                  color: '#141715',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Open Table Reservation Modal ↗
              </button>
            </div>

            {/* Direct Message Form */}
            <div style={{ backgroundColor: '#1A1E1B', border: '1px solid rgba(182, 161, 123, 0.25)', borderRadius: '2px', padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.8rem', color: '#F2EFE6', marginBottom: '0.5rem' }}>
                Direct Concierge Inquiry
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(242, 239, 230, 0.7)', marginBottom: '1.5rem' }}>
                For private events, media inquiries, or sommelier consultations, message our leadership team directly.
              </p>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle2 size={42} style={{ color: '#69745B', margin: '0 auto 1rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.4rem', color: '#F2EFE6', marginBottom: '0.5rem' }}>
                    Inquiry Transmitted
                  </h4>
                  <p style={{ fontSize: '13px', color: 'rgba(242, 239, 230, 0.7)' }}>
                    Our Maitre D' will review your message and reply via telephone or email within four hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B6A17B', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asif Chowdhury"
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#141715', border: '1px solid rgba(182, 161, 123, 0.25)', color: '#F2EFE6', fontSize: '13px', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B6A17B', marginBottom: '4px' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1711..."
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#141715', border: '1px solid rgba(182, 161, 123, 0.25)', color: '#F2EFE6', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B6A17B', marginBottom: '4px' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="guest@domain.com"
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#141715', border: '1px solid rgba(182, 161, 123, 0.25)', color: '#F2EFE6', fontSize: '13px', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B6A17B', marginBottom: '4px' }}>
                      Message or Private Buyout Request
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please detail your request, party size, and preferred schedule..."
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#141715', border: '1px solid rgba(182, 161, 123, 0.25)', color: '#F2EFE6', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: '12px',
                      backgroundColor: '#B6A17B',
                      color: '#141715',
                      border: 'none',
                      borderRadius: '2px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                  >
                    Transmit Message to Host Desk
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Map */}
      {contact.googleMapsEmbedUrl && (
        <section style={{ height: '400px', width: '100%', borderTop: '1px solid rgba(182, 161, 123, 0.2)' }}>
          <iframe
            src={contact.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1) invert(0.9)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ENSO Location"
          />
        </section>
      )}
    </div>
  );
}
