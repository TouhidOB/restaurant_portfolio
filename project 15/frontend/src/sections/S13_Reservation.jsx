import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CheckCircle2, AlertCircle, Calendar, Clock, Users, Sparkles, Send } from 'lucide-react';

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
        backgroundColor: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #171717',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#F04438',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #171717',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 11 // SECURE YOUR SEAT
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            YOUR TABLE IS CALLING.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#444',
              margin: 0
            }}
          >
            Whether it's a Friday night smash burger rally or a private VIP studio celebration, book in advance to avoid the queue.
          </p>
        </div>

        {/* Card Form */}
        <div
          style={{
            backgroundColor: '#FFF',
            border: '4px solid #171717',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '10px 10px 0 #FFD928'
          }}
        >
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#00C389',
                  color: '#FFF',
                  border: '3px solid #171717',
                  boxShadow: '4px 4px 0 #171717',
                  marginBottom: '20px'
                }}
              >
                <CheckCircle2 size={44} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  color: '#171717',
                  margin: '0 0 12px 0'
                }}
              >
                YOU'RE BOOKED AT POP!
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  color: '#555',
                  maxWidth: '520px',
                  margin: '0 auto 24px auto',
                  lineHeight: 1.6
                }}
              >
                We've routed your booking request to the host desk. A confirmation code has been generated and sent to {formData.email}.
              </p>

              <div
                style={{
                  backgroundColor: '#FFD928',
                  border: '3px solid #171717',
                  borderRadius: '16px',
                  padding: '20px 32px',
                  display: 'inline-block',
                  boxShadow: '4px 4px 0 #171717',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>PASS NUMBER</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#F04438' }}>
                  {confirmationCode}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', marginTop: '6px' }}>
                  {formData.customer_name} • Party of {formData.guest_count} • {formData.preferred_date} @ {formData.preferred_time}
                </div>
              </div>

              <div>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    backgroundColor: '#171717',
                    color: '#FFF',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 #F04438'
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
                    backgroundColor: '#FEE4E2',
                    border: '2px solid #F04438',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#B42318',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem'
                  }}
                >
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step 1: Party Size & Area */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}
                >
                  Select Party Size
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData((prev) => ({ ...prev, guest_count: num }))}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: '2px solid #171717',
                        backgroundColor: formData.guest_count === num ? '#F04438' : '#FFF5E6',
                        color: formData.guest_count === num ? '#FFF' : '#171717',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: formData.guest_count === num ? '3px 3px 0 #FFD928' : '2px 2px 0 #171717',
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
                      fontSize: '0.85rem',
                      fontWeight: 800,
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
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      backgroundColor: '#FFF5E6',
                      boxShadow: '3px 3px 0 #171717'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
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
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      backgroundColor: '#FFF5E6',
                      boxShadow: '3px 3px 0 #171717'
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
                      fontSize: '0.85rem',
                      fontWeight: 800,
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
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      backgroundColor: '#FFF5E6',
                      boxShadow: '3px 3px 0 #171717'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
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
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      backgroundColor: '#FFF5E6',
                      boxShadow: '3px 3px 0 #171717'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
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
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      backgroundColor: '#FFF5E6',
                      boxShadow: '3px 3px 0 #171717'
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
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Anniversary celebration, vegetarian guest, quiet booth request..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '2px solid #171717',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    backgroundColor: '#FFF5E6',
                    boxShadow: '3px 3px 0 #171717',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  backgroundColor: '#F04438',
                  color: '#FFF',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '3px solid #171717',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  letterSpacing: '1px',
                  cursor: status === 'submitting' ? 'wait' : 'pointer',
                  boxShadow: '5px 5px 0 #171717',
                  transition: 'all 0.15s ease'
                }}
              >
                {status === 'submitting' ? 'TRANSMITTING BOOKING...' : 'RESERVE MY POP TABLE NOW!'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
