import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage({ onNavigate }) {
  const { content, openReservationModal } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });

  const locData = content?.editorial_sections?.s14_location || {
    badge: "FIND US IN SEOUL",
    title: "Location & Night Arrival",
    address: "28 Wausan-ro 21-gil, Mapo-gu, Seoul, South Korea (Hongdae Night Market)",
    subway: "Subway: Line 2 Hongik Univ. Station, Exit 9 (5 min walk through pedestrian street)",
    phone: "+82 2 312 9988",
    email: "hello@seoulstreetfood.com",
    hours: "Daily: 17:00 – 04:00 (Kitchen closes at 03:15)"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Banner */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '15%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 46, 136, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '780px' }}>
          <span className="text-eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>
            {locData.badge || "HONGDAE NIGHT MARKET"}
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
            Location & Inquiries
          </h1>
          <p style={{ color: 'var(--color-silver)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Join us in the neon-lit heart of Hongdae or reach out for private dining, catering, and event reservations.
          </p>
        </div>
      </section>

      {/* Info Cards Grid */}
      <section style={{ padding: '70px 0 50px 0', backgroundColor: '#0B0D0F' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            
            <div style={{ backgroundColor: 'var(--color-charcoal)', borderRadius: '12px', padding: '32px 26px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>📍</div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>Address</h4>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6 }}>{locData.address}</p>
            </div>

            <div style={{ backgroundColor: 'var(--color-charcoal)', borderRadius: '12px', padding: '32px 26px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>🚇</div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>Subway Access</h4>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6 }}>{locData.subway}</p>
            </div>

            <div style={{ backgroundColor: 'var(--color-charcoal)', borderRadius: '12px', padding: '32px 26px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>⏰</div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>Service Hours</h4>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6 }}>{locData.hours}</p>
            </div>

            <div style={{ backgroundColor: 'var(--color-charcoal)', borderRadius: '12px', padding: '32px 26px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>📞</div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '8px' }}>Direct Contact</h4>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '6px' }}>Phone: {locData.phone}</p>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6 }}>Email: {locData.email}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section style={{ padding: '70px 0 90px 0', backgroundColor: 'var(--color-midnight)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start' }}>
            
            {/* Form */}
            <div style={{ backgroundColor: 'var(--color-charcoal)', borderRadius: '16px', padding: '40px 36px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Send a Direct Inquiry
              </h3>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.95rem', marginBottom: '28px' }}>
                For group bookings, private events, or press inquiries, send us a note and our team will respond within 24 hours.
              </p>

              {submitted ? (
                <div style={{ backgroundColor: 'rgba(33, 212, 232, 0.1)', border: '1px solid var(--color-cyan)', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>✓</div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '6px' }}>Thank You!</h4>
                  <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem' }}>Your message has been dispatched to our Hongdae front desk concierge.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-silver)', marginBottom: '6px', fontWeight: 600 }}>Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Min-jun Kim"
                      style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--color-midnight)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#F6F4F0', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-silver)', marginBottom: '6px', fontWeight: 600 }}>Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@email.com"
                        style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--color-midnight)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#F6F4F0', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-silver)', marginBottom: '6px', fontWeight: 600 }}>Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+82 10..."
                        style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--color-midnight)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#F6F4F0', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-silver)', marginBottom: '6px', fontWeight: 600 }}>Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--color-midnight)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#F6F4F0', outline: 'none' }}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="group">Large Group Table (6+ Guests)</option>
                      <option value="buyout">Private Pocha Buyout</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-silver)', marginBottom: '6px', fontWeight: 600 }}>Message</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your party, preferred date, or questions..."
                      style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--color-midnight)', border: '1px solid var(--color-border)', borderRadius: '8px', color: '#F6F4F0', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '14px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Map & Directions Card */}
            <div>
              <div style={{ backgroundColor: 'var(--color-charcoal)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
                <div style={{ height: '320px', backgroundColor: '#13161c', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#FFF', marginBottom: '16px', boxShadow: '0 0 25px rgba(255, 46, 136, 0.6)' }}>
                    📍
                  </div>
                  <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
                    Hongdae Night Market
                  </h4>
                  <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', maxWidth: '380px', lineHeight: 1.6 }}>
                    28 Wausan-ro 21-gil, Mapo-gu, Seoul. Walk through Hongik Univ. Station Exit 9 into the main pedestrian alley.
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ marginTop: '20px', padding: '10px 24px', fontSize: '0.88rem', borderRadius: '6px' }}
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>

              {/* Fast Reservation Trigger */}
              <div style={{ backgroundColor: 'rgba(255, 46, 136, 0.08)', border: '1px solid var(--color-magenta)', borderRadius: '16px', padding: '32px 28px', textAlign: 'center' }}>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '8px' }}>
                  Need Immediate Table Seating?
                </h4>
                <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', marginBottom: '20px', lineHeight: 1.6 }}>
                  Skip the line during peak late-night hours by booking your pocha table in advance.
                </p>
                <button
                  onClick={() => openReservationModal && openReservationModal('Standard Table')}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.95rem', fontWeight: 700, borderRadius: '8px' }}
                >
                  Book Table Reservation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
