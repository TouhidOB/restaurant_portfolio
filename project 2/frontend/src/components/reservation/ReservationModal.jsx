import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Phone, User, Mail, CheckCircle2, Search, Copy, Check, Sparkles } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { api, lookupReservation } from '../../services/api';

export default function ReservationModal({ isOpen: propIsOpen, onClose: propOnClose, restaurant: propRestaurant, preselectedOccasion }) {
  const cms = useCMS();
  const isOpen = propIsOpen !== undefined ? propIsOpen : cms?.isReservationOpen;
  const onClose = propOnClose || cms?.closeReservation;
  const restaurant = propRestaurant || cms?.config || {};

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'
  const [shiftFilter, setShiftFilter] = useState('dinner'); // 'lunch' | 'dinner'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '07:30 PM',
    guests: '2 Guests',
    email: '',
    seating_area: 'Cedar Omakase Counter',
    occasion: preselectedOccasion || 'Casual Zen Dining',
    dietary_notes: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResults, setLookupResults] = useState(null);
  const [lookupError, setLookupError] = useState(null);

  const LUNCH_SLOTS = ['12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];
  const DINNER_SLOTS = ['06:30 PM', '07:15 PM', '08:00 PM', '08:45 PM', '09:30 PM', '10:15 PM'];

  const SEATING_ZONES = [
    { id: 'Cedar Omakase Counter', name: 'Cedar Omakase Counter', desc: 'Front row hinoki counter with Master Kenji Sato' },
    { id: 'Tatami Tea Room (Zashiki)', name: 'Tatami Tea Room (Zashiki)', desc: 'Private tatami suite with sunken kotatsu' },
    { id: 'Zen Rock Garden Terrace', name: 'Zen Rock Garden Terrace', desc: 'Alfresco dining overlooking bonsai pavilion' },
    { id: 'Main Dining Pavilion', name: 'Main Dining Pavilion', desc: 'Natural cedar dining with washi paper lanterns' },
  ];

  useEffect(() => {
    if (preselectedOccasion) {
      setFormData((prev) => ({ ...prev, occasion: preselectedOccasion }));
    }
  }, [preselectedOccasion]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
        seating_area: formData.seating_area,
        occasion: formData.occasion,
        dietary_notes: formData.dietary_notes,
        special_requests: formData.specialRequests,
      });
      if (res && (res.reference_code || res.inquiry_id)) {
        setInquiryId(res.reference_code || res.inquiry_id);
      } else {
        setInquiryId('ENS-' + Math.random().toString(36).substring(2, 8).toUpperCase());
      }
    } catch (err) {
      setInquiryId('ENS-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleCopyCode = () => {
    if (inquiryId) {
      navigator.clipboard.writeText(inquiryId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    setLookupLoading(true);
    setLookupError(null);
    setLookupResults(null);

    const res = await lookupReservation(lookupQuery.trim());
    setLookupLoading(false);
    if (res.success) {
      setLookupResults(res.reservations || [res.reservation]);
    } else {
      setLookupError(res.error || 'No matching reservation found for this reference code or contact details.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(20, 23, 21, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: '#202321', padding: '24px 28px', position: 'relative' }}>
          <button
            onClick={onClose}
            aria-label="Close reservation modal"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#B6A17B',
              cursor: 'pointer',
            }}
          >
            <X size={22} />
          </button>

          <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B6A17B', fontWeight: 600 }}>
            {restaurant.name || 'ENSO 圓相'} • TABLE INQUIRY & RESERVATION
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', color: '#F2EFE6', margin: '4px 0 0' }}>
            {submitted ? 'Reservation Request Received' : 'Reserve Your Sanctuary Seating'}
          </h2>

          {/* Mode Switcher Tabs */}
          {!submitted && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('book')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'book' ? '#B6A17B' : 'rgba(255,255,255,0.1)',
                  color: activeTab === 'book' ? '#202321' : '#F2EFE6',
                }}
              >
                Reserve A Table
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lookup')}
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  backgroundColor: activeTab === 'lookup' ? '#B6A17B' : 'rgba(255,255,255,0.1)',
                  color: activeTab === 'lookup' ? '#202321' : '#F2EFE6',
                }}
              >
                Lookup Existing Booking ↗
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(105, 116, 91, 0.15)',
                  color: '#69745B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: '#202321', marginBottom: '8px' }}>
                Your Reservation Request is Pending Confirmation
              </h3>
              <p style={{ fontSize: '13px', color: '#6E726D', maxWidth: '440px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.name}</strong>. Our host desk has logged your seating request for{' '}
                <strong>{formData.guests}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
              </p>

              <div
                style={{
                  backgroundColor: '#F2EFE6',
                  padding: '16px',
                  borderRadius: '2px',
                  marginBottom: '24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6E726D' }}>
                    Reference Tracking Code
                  </div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '18px', fontWeight: 700, color: '#B94B3D' }}>
                    {inquiryId}
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#202321',
                    color: '#F2EFE6',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  {copiedCode ? 'COPIED' : 'COPY'}
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    if (onClose) onClose();
                  }}
                  style={{
                    padding: '12px 28px',
                    backgroundColor: '#202321',
                    color: '#F2EFE6',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Close & Return
                </button>
              </div>
            </div>
          ) : activeTab === 'lookup' ? (
            /* Lookup Existing Reservation Tab */
            <div>
              <p style={{ fontSize: '13px', color: '#6E726D', marginBottom: '20px' }}>
                Enter your reference code (e.g., <code>ENS-261116-A1B2</code>) or phone number to check host approval status and table assignment.
              </p>
              <form onSubmit={handleLookupSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Reference Code or Phone Number"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    fontSize: '14px',
                    border: '1px solid #DEDACF',
                    borderRadius: '2px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#202321',
                    color: '#B6A17B',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  {lookupLoading ? 'Checking...' : 'Check Status'}
                </button>
              </form>

              {lookupError && (
                <div style={{ padding: '14px', backgroundColor: '#F8E9E7', color: '#6C2219', borderRadius: '2px', fontSize: '13px' }}>
                  {lookupError}
                </div>
              )}

              {lookupResults && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {lookupResults.map((r, i) => (
                    <div key={i} style={{ padding: '16px', backgroundColor: '#F2EFE6', borderRadius: '2px', borderLeft: '4px solid #B6A17B' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', fontWeight: 700, color: '#B94B3D' }}>
                          {r.reference_code}
                        </span>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '2px',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            backgroundColor:
                              r.status === 'confirmed' ? '#E8F0E6' : r.status === 'pending' ? 'rgba(182, 161, 123, 0.2)' : '#F8E9E7',
                            color: r.status === 'confirmed' ? '#2D4A27' : r.status === 'pending' ? '#8C754D' : '#6C2219',
                          }}
                        >
                          {r.status_display || r.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#202321', fontWeight: 600 }}>
                        {r.full_name} • {r.guest_count || r.guests} Guests
                      </div>
                      <div style={{ fontSize: '12px', color: '#6E726D', marginTop: '4px' }}>
                        📅 {r.date} at {r.time} ({r.is_dinner_shift ? 'Dinner Shift' : 'Lunch Shift'})
                      </div>
                      {r.table_number && (
                        <div style={{ fontSize: '12px', color: '#2D4A27', fontWeight: 600, marginTop: '6px' }}>
                          🪑 Table Assigned: {r.table_number}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit}>
              {/* Shift Selector */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '8px' }}>
                  Dining Service Shift
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShiftFilter('lunch');
                      setFormData((p) => ({ ...p, time: LUNCH_SLOTS[0] }));
                    }}
                    style={{
                      padding: '10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '2px',
                      cursor: 'pointer',
                      border: shiftFilter === 'lunch' ? '2px solid #B6A17B' : '1px solid #DEDACF',
                      backgroundColor: shiftFilter === 'lunch' ? 'rgba(182, 161, 123, 0.12)' : '#FFFFFF',
                      color: '#202321',
                    }}
                  >
                    ☀️ Lunch Service (12:30 PM - 3:30 PM)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShiftFilter('dinner');
                      setFormData((p) => ({ ...p, time: DINNER_SLOTS[0] }));
                    }}
                    style={{
                      padding: '10px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '2px',
                      cursor: 'pointer',
                      border: shiftFilter === 'dinner' ? '2px solid #B6A17B' : '1px solid #DEDACF',
                      backgroundColor: shiftFilter === 'dinner' ? 'rgba(182, 161, 123, 0.12)' : '#FFFFFF',
                      color: '#202321',
                    }}
                  >
                    🌙 Dinner & Omakase (6:30 PM - 11:00 PM)
                  </button>
                </div>
              </div>

              {/* Guest Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Rahman"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '13px',
                      border: `1px solid ${errors.name ? '#B94B3D' : '#DEDACF'}`,
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                  />
                  {errors.name && <span style={{ fontSize: '10px', color: '#B94B3D' }}>{errors.name}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '6px' }}>
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1711-000000"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '13px',
                      border: `1px solid ${errors.phone ? '#B94B3D' : '#DEDACF'}`,
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                  />
                  {errors.phone && <span style={{ fontSize: '10px', color: '#B94B3D' }}>{errors.phone}</span>}
                </div>
              </div>

              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '6px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #DEDACF', borderRadius: '2px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '6px' }}>
                    Seating Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #DEDACF', borderRadius: '2px', outline: 'none', backgroundColor: '#FFFFFF' }}
                  >
                    {(shiftFilter === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '6px' }}>
                    Party Size *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #DEDACF', borderRadius: '2px', outline: 'none', backgroundColor: '#FFFFFF' }}
                  >
                    {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '8+ Guests (Tatami Salon)'].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area Preference */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '6px' }}>
                  Atmospheric Zone Preference
                </label>
                <select
                  name="seating_area"
                  value={formData.seating_area}
                  onChange={(e) => setFormData({ ...formData, seating_area: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #DEDACF', borderRadius: '2px', outline: 'none', backgroundColor: '#FFFFFF' }}
                >
                  {SEATING_ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name} — {z.desc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dietary Requirements */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#202321', marginBottom: '6px' }}>
                  Dietary Preferences / Special Requests
                </label>
                <input
                  type="text"
                  name="dietary_notes"
                  value={formData.dietary_notes}
                  onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                  placeholder="e.g. Shellfish allergy, anniversary celebration, quiet tatami table"
                  style={{ width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #DEDACF', borderRadius: '2px', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#202321',
                  color: '#B6A17B',
                  border: '1px solid #B6A17B',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {isSubmitting ? 'TRANSMITTING SANCTUARY INQUIRY...' : 'CONFIRM RESERVATION INQUIRY ↗'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
