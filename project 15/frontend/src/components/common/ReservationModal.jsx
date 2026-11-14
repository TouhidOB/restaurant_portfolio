import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, CheckCircle2, AlertCircle, Calendar, Clock, Users, MapPin, Sparkles } from 'lucide-react';

export default function ReservationModal() {
  const { isReservationModalOpen, setIsReservationModalOpen, handleBookingSubmit } = useCMS();

  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '19:00',
    guest_count: 2,
    seating_area: 'Main Comic Dining Floor',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationNumber, setConfirmationNumber] = useState('');

  if (!isReservationModalOpen) return null;

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
      setConfirmationNumber(`POP-${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Could not process reservation.');
    }
  };

  const handleClose = () => {
    setIsReservationModalOpen(false);
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 23, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#FFF5E6',
          border: '4px solid #171717',
          borderRadius: '24px',
          boxShadow: '12px 12px 0px #171717',
          width: '100%',
          maxWidth: '680px',
          overflow: 'hidden',
          position: 'relative',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: '#F04438',
            color: '#FFF',
            borderBottom: '4px solid #171717',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                backgroundColor: '#FFD928',
                color: '#171717',
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '2px solid #171717',
                transform: 'rotate(-2deg)'
              }}
            >
              VIP PASS
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                letterSpacing: '1px'
              }}
            >
              RESERVE YOUR TABLE
            </span>
          </div>

          <button
            onClick={handleClose}
            style={{
              backgroundColor: '#FFF',
              color: '#171717',
              border: '2px solid #171717',
              borderRadius: '8px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 #171717'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ overflowY: 'auto', padding: '28px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#00C389',
                  color: '#FFF',
                  border: '3px solid #171717',
                  boxShadow: '4px 4px 0 #171717',
                  marginBottom: '16px'
                }}
              >
                <CheckCircle2 size={40} />
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  color: '#171717',
                  margin: '0 0 10px 0'
                }}
              >
                YOU'RE ON THE LIST!
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  lineHeight: 1.5,
                  color: '#444',
                  maxWidth: '480px',
                  margin: '0 auto 20px auto'
                }}
              >
                Your reservation inquiry has been received. Our studio host will lock in your booth and send confirmation.
              </p>

              <div
                style={{
                  backgroundColor: '#FFD928',
                  border: '3px solid #171717',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  display: 'inline-block',
                  boxShadow: '4px 4px 0 #171717',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#171717', fontWeight: 700 }}>
                  BOOKING REFERENCE
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#F04438' }}>
                  {confirmationNumber}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#171717', marginTop: '4px' }}>
                  {formData.customer_name} • {formData.guest_count} Guests • {formData.preferred_date} @ {formData.preferred_time}
                </div>
              </div>

              <div>
                <button
                  onClick={handleClose}
                  style={{
                    backgroundColor: '#171717',
                    color: '#FFF',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 #F04438'
                  }}
                >
                  AWESOME, BACK TO THE STUDIO
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {status === 'error' && (
                <div
                  style={{
                    backgroundColor: '#FEE4E2',
                    border: '2px solid #F04438',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#B42318',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem'
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Guest Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      backgroundColor: '#FFF',
                      boxShadow: '2px 2px 0 #171717'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. (555) 019-2834"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      backgroundColor: '#FFF',
                      boxShadow: '2px 2px 0 #171717'
                    }}
                  />
                </div>
              </div>

              {/* Email & Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      backgroundColor: '#FFF',
                      boxShadow: '2px 2px 0 #171717'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Guests *
                  </label>
                  <select
                    name="guest_count"
                    value={formData.guest_count}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      backgroundColor: '#FFF',
                      boxShadow: '2px 2px 0 #171717'
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                      <option key={num} value={typeof num === 'number' ? num : 10}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Desired Date *
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    required
                    value={formData.preferred_date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      backgroundColor: '#FFF',
                      boxShadow: '2px 2px 0 #171717'
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Preferred Time *
                  </label>
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '2px solid #171717',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      backgroundColor: '#FFF',
                      boxShadow: '2px 2px 0 #171717'
                    }}
                  >
                    {['12:00', '12:30', '13:00', '13:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    marginBottom: '6px',
                    textTransform: 'uppercase'
                  }}
                >
                  Preferred Vibe / Seating
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
                  {['Main Comic Dining Floor', 'The Cocktail Fizz Bar', 'VIP Pop Studio Lounge'].map((area) => (
                    <label
                      key={area}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '2px solid #171717',
                        backgroundColor: formData.seating_area === area ? '#FFD928' : '#FFF',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        boxShadow: '2px 2px 0 #171717'
                      }}
                    >
                      <input
                        type="radio"
                        name="seating_area"
                        value={area}
                        checked={formData.seating_area === area}
                        onChange={handleChange}
                      />
                      <span>{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message / Notes */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    marginBottom: '6px',
                    textTransform: 'uppercase'
                  }}
                >
                  Special Notes or Celebrations
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Dietary preferences, birthdays, anniversaries, or favorite dishes..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '2px solid #171717',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    backgroundColor: '#FFF',
                    boxShadow: '2px 2px 0 #171717',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  marginTop: '8px',
                  backgroundColor: '#F04438',
                  color: '#FFF',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '3px solid #171717',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  letterSpacing: '1px',
                  cursor: status === 'submitting' ? 'wait' : 'pointer',
                  boxShadow: '4px 4px 0 #171717',
                  transition: 'all 0.15s ease'
                }}
              >
                {status === 'submitting' ? 'LOCKING IN BOOTH...' : 'CONFIRM POP RESERVATION!'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
