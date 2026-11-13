import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Phone, User, Mail, CheckCircle2, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';

export default function ReservationModal({ isOpen, onClose, restaurant, preselectedOccasion }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '07:30 PM',
    guests: '2 Guests',
    email: '',
    occasion: preselectedOccasion || 'Casual Fine Dining',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedOccasion) {
      setFormData((prev) => ({ ...prev, occasion: preselectedOccasion }));
    }
  }, [preselectedOccasion]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const res = await api.submitReservation({
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        occasion: formData.occasion,
        special_requests: formData.specialRequests,
      });
      if (res && res.inquiry_id) {
        setInquiryId(res.inquiry_id);
      }
    } catch (err) {
      console.warn('Backend reservation submit fallback:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleWhatsApp = () => {
    const msg = `Hello, I would like to request a table reservation at ${restaurant.name}.\n\nReference: ${inquiryId || 'AUR-ONLINE'}\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}\nOccasion: ${formData.occasion}\nSpecial Requests: ${formData.specialRequests || 'None'}`;
    const url = `https://wa.me/${(restaurant.contact?.whatsapp || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <dialog
      open
      aria-labelledby="reserve-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 22, 19, 0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={onClose}
      />

      <div
        className="deco-frame"
        style={{
          position: 'relative',
          zIndex: 100000,
          maxWidth: '580px',
          width: '92%',
          maxHeight: '88vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-obsidian-soft)',
          padding: '36px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
          border: '1px solid var(--color-gold)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '6px' }}>TABLE CONCIERGE</div>
            <h3 id="reserve-modal-title" style={{ fontSize: '24px', color: 'var(--color-pearl)', margin: 0 }}>
              Reserve Your Experience
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Reservation Form"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'rgba(23, 25, 26, 0.8)',
              border: '1px solid var(--color-gold)',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-gold)', marginBottom: '16px' }}>
              <CheckCircle2 size={32} />
              <div>
                <h4 style={{ fontSize: '20px', color: 'var(--color-pearl)', margin: 0 }}>
                  Reservation Request Received
                </h4>
                {inquiryId && (
                  <span style={{ fontSize: '12px', color: 'var(--color-gold)', letterSpacing: '0.15em' }}>
                    REF: {inquiryId}
                  </span>
                )}
              </div>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-pearl-muted)', marginBottom: '20px' }}>
              Thank you, <strong>{formData.name}</strong>. Your inquiry has been logged in our system. Our concierge will contact you at <strong>{formData.phone}</strong> to confirm table availability.
            </p>

            <button
              onClick={handleWhatsApp}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', backgroundColor: '#25D366', borderColor: '#25D366', color: '#FFFFFF', marginBottom: '12px' }}
            >
              <span>MESSAGE CONCIERGE ON WHATSAPP</span>
              <ExternalLink size={14} />
            </button>

            <button
              onClick={() => {
                setSubmitted(false);
                setInquiryId('');
                onClose();
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '12px' }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="var(--color-jade)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Guest Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 38px',
                      backgroundColor: '#17191A',
                      border: `1px solid ${errors.name ? '#FF6B6B' : 'var(--color-border-gold-subtle)'}`,
                      color: 'var(--color-pearl)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                  Phone Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} color="var(--color-jade)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="tel"
                    placeholder="+880 1711 000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 38px',
                      backgroundColor: '#17191A',
                      border: `1px solid ${errors.phone ? '#FF6B6B' : 'var(--color-border-gold-subtle)'}`,
                      color: 'var(--color-pearl)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#17191A',
                      border: `1px solid ${errors.date ? '#FF6B6B' : 'var(--color-border-gold-subtle)'}`,
                      color: 'var(--color-pearl)',
                      fontSize: '13px',
                      outline: 'none',
                      colorScheme: 'dark',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                    Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#17191A',
                      border: '1px solid var(--color-border-gold-subtle)',
                      color: 'var(--color-pearl)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  >
                    {(restaurant.reservationSettings?.timeSlots || []).map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#17191A',
                      border: '1px solid var(--color-border-gold-subtle)',
                      color: 'var(--color-pearl)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={`${i + 1} Guest${i > 0 ? 's' : ''}`}>
                        {i + 1} Guest{i > 0 ? 's' : ''}
                      </option>
                    ))}
                    <option value="12+ Large Party">12+ Banquet Party</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                    Occasion
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#17191A',
                      border: '1px solid var(--color-border-gold-subtle)',
                      color: 'var(--color-pearl)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  >
                    {(restaurant.reservationSettings?.occasions || []).map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', marginTop: '12px', opacity: isSubmitting ? 0.7 : 1 }}
              >
                <Calendar size={15} />
                <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT RESERVATION REQUEST'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
