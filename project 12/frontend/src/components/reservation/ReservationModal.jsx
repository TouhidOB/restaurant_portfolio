import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationModalOpen, closeReservationModal } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: 2,
    seating: 'Sunset Terrace & Sea View',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isReservationModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const res = await submitReservation(formData);
    setIsSubmitting(false);

    if (res.ok) {
      setIsSuccess(true);
    } else {
      setErrorMsg(res.data?.message || 'Unable to submit reservation. Please try again or call concierge.');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    closeReservationModal();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(38, 58, 72, 0.75)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid #DECDB8',
          position: 'relative',
          padding: '36px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: '#8C847B',
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                margin: '0 auto 16px auto',
                border: '2px solid #A7F3D0',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem',
                color: 'var(--c-navy)',
                marginBottom: '8px',
              }}
            >
              Table Reserved
            </h3>
            <p style={{ color: '#595752', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Thank you, <strong>{formData.name}</strong>. Your reservation inquiry for <strong>{formData.guests} guests</strong> on <strong>{formData.date} at {formData.time}</strong> has been received by our Maître de Maison.
            </p>
            <div style={{ background: 'var(--c-ivory)', padding: '16px', borderRadius: '8px', border: '1px solid var(--c-border)', marginBottom: '24px', fontSize: '0.85rem', color: '#6A635B' }}>
              A confirmation email has been dispatched to <strong>{formData.email}</strong>. For private yacht tender transfers, please notify our concierge on VHF 72.
            </div>
            <button onClick={handleClose} className="btn-primary" style={{ width: '100%' }}>
              Return to Website
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <span className="text-eyebrow" style={{ display: 'block', marginBottom: '6px' }}>Concierge Desk</span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.1rem',
                  color: 'var(--c-navy)',
                  lineHeight: 1.1,
                }}
              >
                Reserve a Table
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6A635B', marginTop: '4px' }}>
                Join us for an unforgettable Mediterranean dining experience at Saint-Jean-Cap-Ferrat.
              </p>
            </div>

            {errorMsg && (
              <div style={{ backgroundColor: '#FEF2F2', color: '#991B1B', padding: '10px 14px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '18px', border: '1px solid #FECACA' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Camilla Rossi"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #DECDB8',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="camilla@domain.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #DECDB8',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #DECDB8',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #DECDB8',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #DECDB8',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Service Seating *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #DECDB8',
                      backgroundColor: 'var(--c-ivory)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <optgroup label="Lunch">
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                    </optgroup>
                    <optgroup label="Dinner">
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Seating Ambience Preference
                </label>
                <select
                  name="seating"
                  value={formData.seating}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #DECDB8',
                    backgroundColor: 'var(--c-ivory)',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="Sunset Terrace & Sea View">Sunset Terrace & Panoramic Sea View</option>
                  <option value="Main Dining Salon Vaults">Main Dining Salon (Limestone Vaults)</option>
                  <option value="Olive Grove Pergola">The Olive Grove Pergola (Garden)</option>
                  <option value="Sommelier Vault">Subterranean Sommelier Vault</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-navy)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Special Dietary or Occasion Notes
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Allergies, anniversary celebration, private tender transfer..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #DECDB8',
                    backgroundColor: 'var(--c-ivory)',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: '6px', padding: '12px' }}
              >
                {isSubmitting ? 'Transmitting Request...' : 'Confirm Reservation Inquiry'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
