import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

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

  const [status, setStatus] = useState('idle');
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
        backgroundColor: 'rgba(5, 6, 8, 0.88)',
        backdropFilter: 'blur(16px)',
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
          backgroundColor: '#12141D',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '28px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
          width: '100%',
          maxWidth: '640px',
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
            padding: '20px 28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                backgroundColor: 'rgba(204, 255, 0, 0.15)',
                color: '#CCFF00',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(204, 255, 0, 0.25)'
              }}
            >
              VIP PASS
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                color: '#FFF'
              }}
            >
              RESERVE YOUR TABLE
            </span>
          </div>

          <button
            onClick={handleClose}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#9FA5B7',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ overflowY: 'auto', padding: '28px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '32px 10px' }}>
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

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#FFF',
                  margin: '0 0 10px 0'
                }}
              >
                YOU'RE ON THE LIST!
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#9FA5B7',
                  maxWidth: '460px',
                  margin: '0 auto 20px auto'
                }}
              >
                Your reservation request has been dispatched to the studio host desk. We will confirm your seating shortly.
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '18px 28px',
                  display: 'inline-block',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646A7E', textTransform: 'uppercase' }}>
                  BOOKING REFERENCE
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#CCFF00', margin: '4px 0' }}>
                  {confirmationNumber}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: '#FFF' }}>
                  {formData.customer_name} &bull; {formData.guest_count} Guests &bull; {formData.preferred_date} @ {formData.preferred_time}
                </div>
              </div>

              <div>
                <button
                  onClick={handleClose}
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
                  RETURN TO STUDIO
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {status === 'error' && (
                <div
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FCA5A5',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px'
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Guest Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="Alex Rivera"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 019-2834"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>
              </div>

              {/* Email & Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E', textTransform: 'uppercase', marginBottom: '6px' }}>
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
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Guests *
                  </label>
                  <select
                    name="guest_count"
                    value={formData.guest_count}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E', textTransform: 'uppercase', marginBottom: '6px' }}>
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
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Time *
                  </label>
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      backgroundColor: '#191C28',
                      color: '#FFF'
                    }}
                  >
                    {['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#646A7E', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Special Notes / Celebrations
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Dietary requests, birthday, or preferred seating zone..."
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
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
                  marginTop: '8px',
                  backgroundColor: '#CCFF00',
                  color: '#0A0B0E',
                  padding: '14px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: status === 'submitting' ? 'wait' : 'pointer',
                  boxShadow: '0 0 25px rgba(204, 255, 0, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                {status === 'submitting' ? 'LOCKING IN BOOTH...' : 'CONFIRM POP RESERVATION NOW &rarr;'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
