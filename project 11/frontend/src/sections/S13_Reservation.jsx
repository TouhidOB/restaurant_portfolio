import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { submitReservation } from '../services/api';

export default function S13_Reservation() {
  const { content } = useCMS();
  const resConfig = content?.reservation || {};

  const times = resConfig.times || [
    '8:00 AM', '9:30 AM', '11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'
  ];

  const seatingOptions = resConfig.seating_options || [
    { value: 'atrium', label: 'Greenhouse Palm Atrium' },
    { value: 'terrace', label: 'Sunlit Garden Terrace' },
    { value: 'mezzanine', label: 'Orangerie Mezzanine Nook' },
    { value: 'bar', label: 'Botanical Brew Counter' },
    { value: 'any', label: 'Best Available Sunlit Table' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: times[2] || '11:00 AM',
    guests: 2,
    seating_preference: 'atrium',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitReservation(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Reservation submission error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="reservation"
      aria-label="Table & Visit Reservations"
      style={{
        padding: '120px 0',
        backgroundColor: '#263F35',
        color: '#FAF7F0',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-sage)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {resConfig.subtitle || 'VISIT & TABLE INQUIRIES'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {resConfig.title || 'Reserve a Table in the Glasshouse'}
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(250, 247, 240, 0.82)', margin: '0 auto' }}>
            {resConfig.description || 'Walk-ins are warmly welcomed for coffee and pastries. Table reservations are recommended for weekend brunch and parties of 4 or more.'}
          </p>
        </div>

        {/* Card Form */}
        <div
          style={{
            backgroundColor: '#1A2B24',
            borderRadius: '4px',
            border: '1px solid rgba(166, 181, 160, 0.35)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
            padding: '40px 36px',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(166, 181, 160, 0.2)',
                  border: '2px solid var(--color-sage)',
                  color: 'var(--color-sage)',
                  fontSize: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                }}
              >
                ✓
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#FFFFFF', marginBottom: '12px' }}>
                Thank You! Your Table Inquiry Has Been Received
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(250, 247, 240, 0.85)', maxWidth: '560px', margin: '0 auto 24px auto' }}>
                Our hospitality concierge will confirm your reservation in the {formData.seating_preference} via telephone or WhatsApp at {formData.phone} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  padding: '10px 24px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-copper)',
                  color: 'var(--color-copper-light)',
                  borderRadius: '2px',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                    Preferred Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none' }}
                  >
                    {times.map((tVal, i) => (
                      <option key={i} value={tVal}>{tVal}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                    Seating Area
                  </label>
                  <select
                    value={formData.seating_preference}
                    onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none' }}
                  >
                    {seatingOptions.map((opt, i) => (
                      <option key={i} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 600, marginBottom: '6px' }}>
                  Special Requests / Dietary Needs
                </label>
                <textarea
                  rows={3}
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="E.g. Table near living plant wall, birthday toast, high chair..."
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(166, 181, 160, 0.35)', borderRadius: '2px', color: '#FAF7F0', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {resConfig.policy && (
                <div style={{ fontSize: '12px', lineHeight: 1.5, color: 'rgba(250, 247, 240, 0.65)', marginBottom: '24px', fontStyle: 'italic' }}>
                  ⓘ {resConfig.policy}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  backgroundColor: 'var(--color-copper, #A87958)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '13px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: submitting ? 'wait' : 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => !submitting && (e.currentTarget.style.backgroundColor = '#8c5f42')}
                onMouseLeave={(e) => !submitting && (e.currentTarget.style.backgroundColor = 'var(--color-copper, #A87958)')}
              >
                {submitting ? 'Transmitting Request...' : 'Confirm Table Reservation Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
