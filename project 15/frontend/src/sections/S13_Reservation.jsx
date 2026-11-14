import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CheckCircle2, AlertCircle, Calendar, Clock, Users, Send } from 'lucide-react';

export default function S13_Reservation() {
  const { handleBookingSubmit } = useCMS();

  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '19:30',
    guest_count: 2,
    seating_area: 'Main Comic Dining Floor',
    message: ''
  });

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const res = await handleBookingSubmit({
      ...formData,
      guest_count: parseInt(formData.guest_count, 10)
    });

    if (res.success) {
      setStatus('success');
      setConfirmationCode(`POP-${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Failed to submit reservation.');
    }
  };

  return (
    <section
      id="reservation"
      style={{
        backgroundColor: '#090A0E',
        padding: '110px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#FF3366', borderColor: 'rgba(255, 51, 102, 0.25)' }}>
            CHAPTER 11 // SECURE YOUR SEAT
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            YOUR TABLE IS CALLING.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            Whether it's a Friday night smash burger rally or an intimate lounge celebration, book in advance to avoid the queue.
          </p>
        </div>

        {/* Card Form */}
        <div
          style={{
            backgroundColor: '#12141D',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(204, 255, 0, 0.15)',
                  color: '#CCFF00',
                  border: '1px solid #CCFF00',
                  boxShadow: '0 0 25px rgba(204, 255, 0, 0.3)',
                  marginBottom: '20px'
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#FFF',
                  margin: '0 0 12px 0'
                }}
              >
                YOU'RE BOOKED AT POP!
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: '#9FA5B7',
                  maxWidth: '520px',
                  margin: '0 auto 24px auto',
                  lineHeight: 1.6
                }}
              >
                We've routed your booking inquiry to the host desk. A confirmation code has been generated and sent to {formData.email}.
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '20px 32px',
                  display: 'inline-block',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646A7E', textTransform: 'uppercase' }}>
                  BOOKING REFERENCE
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#CCFF00', margin: '4px 0' }}>
                  {confirmationCode}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#FFF' }}>
                  {formData.customer_name} &bull; Party of {formData.guest_count} &bull; {formData.preferred_date} @ {formData.preferred_time}
                </div>
              </div>

              <div>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFF',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  MAKE ANOTHER RESERVATION
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {status === 'error' && (
                <div
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#FCA5A5',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px'
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Party Size */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#646A7E',
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}
                >
                  Select Party Size
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData((prev) => ({ ...prev, guest_count: num }))}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '999px',
                        border: formData.guest_count === num ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: formData.guest_count === num ? '#CCFF00' : 'rgba(255, 255, 255, 0.04)',
                        color: formData.guest_count === num ? '#0A0B0E' : '#9FA5B7',
                        fontFamily: 'var(--font-display)',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#646A7E',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    required
                    value={formData.preferred_date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#646A7E',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}
                  >
                    Time *
                  </label>
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  >
                    {['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#646A7E',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    placeholder="Jordan Miller"
                    value={formData.customer_name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#646A7E',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jordan@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#646A7E',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 767-3663"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#646A7E',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Anniversary celebration, vegan guests, quiet booth request..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    backgroundColor: '#191C28',
                    color: '#FFF',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  backgroundColor: '#CCFF00',
                  color: '#0A0B0E',
                  padding: '15px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  cursor: status === 'submitting' ? 'wait' : 'pointer',
                  boxShadow: '0 0 25px rgba(204, 255, 0, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                {status === 'submitting' ? 'TRANSMITTING INQUIRY...' : 'CONFIRM POP RESERVATION NOW &rarr;'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
