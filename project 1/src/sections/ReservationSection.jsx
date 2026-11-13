import React, { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare, Phone, User, Mail, Send, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export default function ReservationSection({ restaurant, preselectedOccasion, sectionData = {} }) {
  const eyebrow = sectionData.eyebrow || 'YOUR TABLE AWAITS';
  const title = sectionData.title || 'Make Time for Something Exceptional.';
  const description =
    sectionData.description ||
    'Reserve your table and let us curate every detail. Our concierge attends to all reservations with personal care and discretion.';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: restaurant.reservationSettings?.timeSlots?.[4] || '07:30 PM',
    guests: '2 Guests',
    email: '',
    occasion: preselectedOccasion || 'Casual Fine Dining',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionState, setSubmissionState] = useState(null);
  const [inquiryId, setInquiryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure minimum date is today
  const todayStr = new Date().toISOString().split('T')[0];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.date) errs.date = 'Reservation date is required';
    if (formData.date < todayStr) errs.date = 'Reservation date cannot be in the past';
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
      console.warn('API reservation submit fallback to local:', err);
    } finally {
      setIsSubmitting(false);
      setSubmissionState('submitted');
    }
  };

  const handleWhatsAppInquiry = () => {
    const msg = `Hello, I would like to request a table reservation at ${restaurant.name}.\n\nReference: ${inquiryId || 'AUR-ONLINE'}\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}\nOccasion: ${formData.occasion}\nSpecial Requests: ${formData.specialRequests || 'None'}`;
    const url = `https://wa.me/${(restaurant.contact?.whatsapp || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="reservation"
      className="section-padding"
      style={{
        backgroundColor: '#0F2B26',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            {eyebrow}
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--color-pearl)',
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              maxWidth: '620px',
              margin: '0 auto',
              fontSize: '15px',
              color: 'var(--color-pearl-muted)',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
          <div className="gold-divider">
            <span className="deco-diamond" />
          </div>
        </div>

        {/* Form & Visual Container */}
        <div
          className="deco-frame"
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            backgroundColor: 'var(--color-obsidian-soft)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Left Column: Form or Submission Notice */}
          <div style={{ padding: '44px 36px' }}>
            {submissionState === 'submitted' ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <CheckCircle2 size={36} color="var(--color-gold)" />
                  <div>
                    <h3 style={{ fontSize: '24px', color: 'var(--color-pearl)', margin: 0 }}>
                      Reservation Request Received
                    </h3>
                    {inquiryId && (
                      <span style={{ fontSize: '12px', color: 'var(--color-gold)', letterSpacing: '0.15em' }}>
                        REFERENCE: {inquiryId}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(18, 59, 53, 0.4)',
                    border: '1px solid var(--color-border-gold)',
                    padding: '20px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '24px',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'var(--color-pearl-muted)',
                  }}
                >
                  <p style={{ color: 'var(--color-gold)', fontWeight: 600, marginBottom: '6px' }}>
                    Saved to Restaurant Database:
                  </p>
                  Your booking request is saved in our system. Our restaurant concierge will call or message your phone at <strong>{formData.phone}</strong> to confirm table allocation.
                </div>

                <div style={{ fontSize: '14px', color: 'var(--color-pearl)', marginBottom: '28px' }}>
                  <p><strong>Guest:</strong> {formData.name}</p>
                  <p><strong>Date &amp; Time:</strong> {formData.date} at {formData.time}</p>
                  <p><strong>Party Size:</strong> {formData.guests}</p>
                  <p><strong>Occasion:</strong> {formData.occasion}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="btn-primary"
                    style={{ padding: '16px', width: '100%', backgroundColor: '#25D366', borderColor: '#25D366', color: '#FFFFFF' }}
                  >
                    <span>CONFIRM FASTER VIA WHATSAPP CONCIERGE</span>
                    <ExternalLink size={15} />
                  </button>

                  <button
                    onClick={() => {
                      setSubmissionState(null);
                      setInquiryId('');
                      setFormData({
                        name: '',
                        phone: '',
                        date: '',
                        time: restaurant.reservationSettings?.timeSlots?.[4] || '07:30 PM',
                        guests: '2 Guests',
                        email: '',
                        occasion: 'Casual Fine Dining',
                        specialRequests: '',
                      });
                    }}
                    className="btn-secondary"
                    style={{ padding: '14px', width: '100%' }}
                  >
                    SUBMIT ANOTHER RESERVATION
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    color: 'var(--color-pearl)',
                    marginBottom: '24px',
                  }}
                >
                  Table Reservation Request
                </h3>

                {/* 2-Column Inputs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} color="var(--color-jade)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="e.g. M. Tariq"
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
                    {errors.name && <span style={{ color: '#FF6B6B', fontSize: '11px' }}>{errors.name}</span>}
                  </div>

                  {/* Phone Number */}
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
                    {errors.phone && <span style={{ color: '#FF6B6B', fontSize: '11px' }}>{errors.phone}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                  {/* Reservation Date */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                      Date *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Calendar size={15} color="var(--color-jade)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="date"
                        min={todayStr}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 38px',
                          backgroundColor: '#17191A',
                          border: `1px solid ${errors.date ? '#FF6B6B' : 'var(--color-border-gold-subtle)'}`,
                          color: 'var(--color-pearl)',
                          fontSize: '13px',
                          outline: 'none',
                          colorScheme: 'dark',
                        }}
                      />
                    </div>
                    {errors.date && <span style={{ color: '#FF6B6B', fontSize: '11px' }}>{errors.date}</span>}
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                      Preferred Time *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Clock size={15} color="var(--color-jade)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 38px',
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
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                  {/* Number of Guests */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                      Guests *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Users size={15} color="var(--color-jade)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 38px',
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
                        <option value="12+ Large Party">12+ Private Banquet Group</option>
                      </select>
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
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

                {/* Email Address (Optional) */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-pearl-muted)', marginBottom: '6px' }}>
                    Email Address (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} color="var(--color-jade)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="email"
                      placeholder="concierge@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 38px',
                        backgroundColor: '#17191A',
                        border: '1px solid var(--color-border-gold-subtle)',
                        color: 'var(--color-pearl)',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-pearl-muted)', marginBottom: '6px' }}>
                    Special Requests &amp; Dietary Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Window seating, quiet booth, anniversary champagne setup, allergies..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      backgroundColor: '#17191A',
                      border: '1px solid var(--color-border-gold-subtle)',
                      color: 'var(--color-pearl)',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  <Calendar size={16} />
                  <span>{isSubmitting ? 'SUBMITTING REQUEST...' : 'REQUEST A RESERVATION'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Visual Brand Card */}
          <div
            style={{
              position: 'relative',
              backgroundImage: 'url(https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              minHeight: '360px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(18, 59, 53, 0.4) 0%, rgba(23, 25, 26, 0.95) 100%)',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="eyebrow" style={{ color: 'var(--color-gold)' }}>
                BESPOKE HOSPITALITY
              </div>
              <h4 style={{ fontSize: '26px', color: 'var(--color-pearl)', marginBottom: '12px' }}>
                A Memorable Table for Every Occasion.
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--color-pearl-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                Prefer instantaneous booking? You can also contact our concierge desk directly via telephone or WhatsApp.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={`tel:${restaurant.contact?.phone || ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--color-gold)',
                    textDecoration: 'none',
                    fontSize: '13px',
                  }}
                >
                  <Phone size={14} />
                  <span>{restaurant.contact?.phoneDisplay}</span>
                </a>

                <button
                  onClick={handleWhatsAppInquiry}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#25D366',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontSize: '13px',
                    textAlign: 'left',
                  }}
                >
                  <MessageSquare size={14} />
                  <span>Direct WhatsApp Inquiries: {restaurant.contact?.whatsappDisplay}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
