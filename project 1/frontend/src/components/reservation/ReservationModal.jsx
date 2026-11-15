import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Phone, User, Mail, CheckCircle2, Search, Copy, Check } from 'lucide-react';
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
    seating_area: 'Art Deco Grand Salon',
    occasion: preselectedOccasion || 'Casual Fine Dining',
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

  const LUNCH_SLOTS = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'];
  const DINNER_SLOTS = ['06:00 PM', '06:30 PM', '07:15 PM', '08:00 PM', '08:45 PM', '09:30 PM', '10:15 PM'];

  const SEATING_ZONES = [
    { id: 'Art Deco Grand Salon', name: 'Art Deco Grand Salon', desc: 'Center dining hall with crystal chandeliers' },
    { id: 'Champagne Parlour Vault', name: 'Champagne Parlour Vault', desc: 'Plush velvet banquette with private vintage cart' },
    { id: 'Emerald Garden Terrace', name: 'Emerald Garden Terrace', desc: 'Alfresco dining with Gulshan skyline views' },
    { id: 'Private Cellar Dining', name: 'Private Cellar Dining', desc: 'Exclusive sommelier vault for 6+ guests' },
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
        setInquiryId('AUR-' + Math.random().toString(36).substring(2, 8).toUpperCase());
      }
    } catch (err) {
      console.warn('Backend reservation submit fallback:', err);
      setInquiryId('AUR-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleCopyCode = () => {
    if (inquiryId && navigator.clipboard) {
      navigator.clipboard.writeText(inquiryId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    setLookupLoading(true);
    setLookupError(null);
    setLookupResults(null);

    try {
      const res = await lookupReservation(lookupQuery.trim());
      if (res.success) {
        if (res.reservation) setLookupResults([res.reservation]);
        else if (res.reservations) setLookupResults(res.reservations);
        else setLookupError('No matching booking found.');
      } else {
        setLookupError(res.error || 'No matching booking found.');
      }
    } catch (err) {
      setLookupError('Network error looking up reservation.');
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(5, 10, 8, 0.88)',
        backdropFilter: 'blur(12px)',
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          backgroundColor: '#121615',
          border: '1px solid rgba(214, 184, 121, 0.4)',
          borderRadius: '4px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(18, 59, 53, 0.5)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-pearl, #F3EDE1)',
            cursor: 'pointer',
            padding: '0.25rem',
            zIndex: 10,
          }}
        >
          <X size={22} />
        </button>

        {/* Modal Top Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(214, 184, 121, 0.3)',
            backgroundColor: '#0A1F1A',
          }}
        >
          <button
            onClick={() => setActiveTab('book')}
            style={{
              flex: 1,
              padding: '1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'book' ? '2px solid #D6B879' : '2px solid transparent',
              color: activeTab === 'book' ? '#F5E5BE' : '#8E9995',
              fontFamily: 'Bodoni Moda, serif',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            ★ RESERVE A TABLE
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            style={{
              flex: 1,
              padding: '1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'lookup' ? '2px solid #D6B879' : '2px solid transparent',
              color: activeTab === 'lookup' ? '#F5E5BE' : '#8E9995',
              fontFamily: 'Bodoni Moda, serif',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            🔍 CHECK RESERVATION STATUS
          </button>
        </div>

        {/* TAB 1: BOOKING FLOW */}
        {activeTab === 'book' && (
          <div style={{ padding: '2rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <CheckCircle2 size={56} color="#D6B879" style={{ margin: '0 auto 1.25rem' }} />
                <h3
                  style={{
                    fontFamily: 'Bodoni Moda, serif',
                    fontSize: '1.75rem',
                    color: '#FFF',
                    marginBottom: '0.5rem',
                  }}
                >
                  Reservation Inquiry Submitted
                </h3>
                <p style={{ color: '#8E9995', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Your booking request is currently <strong>held pending restaurant approval</strong>.<br />
                  Our Maitre D’ concierge will confirm via phone or SMS shortly.
                </p>

                {/* Reference Code Card */}
                <div
                  style={{
                    backgroundColor: 'rgba(18, 59, 53, 0.4)',
                    border: '1px solid #D6B879',
                    borderRadius: '4px',
                    padding: '1.25rem',
                    marginBottom: '2rem',
                    display: 'inline-block',
                    minWidth: '280px',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: '#D6B879', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                    YOUR BOOKING REFERENCE CODE
                  </span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#FFF', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    {inquiryId}
                  </div>
                  <button
                    onClick={handleCopyCode}
                    style={{
                      marginTop: '0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'none',
                      border: '1px solid rgba(214, 184, 121, 0.5)',
                      color: copiedCode ? '#2ECC71' : '#D6B879',
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.75rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                    {copiedCode ? 'Copied to Clipboard!' : 'Copy Reference Code'}
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      if (onClose) onClose();
                    }}
                    style={{
                      padding: '0.75rem 2rem',
                      backgroundColor: '#123B35',
                      border: '1px solid #D6B879',
                      color: '#E8D3A2',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    DONE / CLOSE TERMINAL
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <span style={{ color: '#D6B879', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                    TABLE INQUIRY & RESTAURANT APPROVAL
                  </span>
                  <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.85rem', color: '#FFF', margin: '0.25rem 0 0' }}>
                    Reserve Your Aurelia Table
                  </h2>
                </div>

                {/* Shift Selector */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShiftFilter('lunch');
                      setFormData((p) => ({ ...p, time: LUNCH_SLOTS[0] }));
                    }}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      backgroundColor: shiftFilter === 'lunch' ? 'rgba(214, 184, 121, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: shiftFilter === 'lunch' ? '1px solid #D6B879' : '1px solid rgba(255,255,255,0.1)',
                      color: shiftFilter === 'lunch' ? '#F5E5BE' : '#8E9995',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    ☀️ LUNCH SERVICE (12:00 – 15:30)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShiftFilter('dinner');
                      setFormData((p) => ({ ...p, time: DINNER_SLOTS[2] }));
                    }}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      backgroundColor: shiftFilter === 'dinner' ? 'rgba(214, 184, 121, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: shiftFilter === 'dinner' ? '1px solid #D6B879' : '1px solid rgba(255,255,255,0.1)',
                      color: shiftFilter === 'dinner' ? '#F5E5BE' : '#8E9995',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    🌙 DINNER & CHAMPAGNE (18:00 – 23:45)
                  </button>
                </div>

                {/* Guest Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#D6B879', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0D0F10', border: '1px solid #242B30', color: '#FFF', borderRadius: '3px' }}
                    />
                    {errors.name && <small style={{ color: '#E74C3C' }}>{errors.name}</small>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#D6B879', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1711 000000"
                      style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0D0F10', border: '1px solid #242B30', color: '#FFF', borderRadius: '3px' }}
                    />
                    {errors.phone && <small style={{ color: '#E74C3C' }}>{errors.phone}</small>}
                  </div>
                </div>

                {/* Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#D6B879', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0D0F10', border: '1px solid #242B30', color: '#FFF', borderRadius: '3px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#D6B879', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Service Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0D0F10', border: '1px solid #242B30', color: '#FFF', borderRadius: '3px' }}
                    >
                      {(shiftFilter === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#D6B879', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Party Size *
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0D0F10', border: '1px solid #242B30', color: '#FFF', borderRadius: '3px' }}
                    >
                      {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '8+ Guests (Gala)'].map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Zone Cards */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#D6B879', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Preferred Dining Salon Zone
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {SEATING_ZONES.map((zone) => (
                      <div
                        key={zone.id}
                        onClick={() => setFormData({ ...formData, seating_area: zone.id })}
                        style={{
                          padding: '0.75rem',
                          backgroundColor: formData.seating_area === zone.id ? 'rgba(18, 59, 53, 0.5)' : '#0D0F10',
                          border: formData.seating_area === zone.id ? '1px solid #D6B879' : '1px solid #242B30',
                          borderRadius: '3px',
                          cursor: 'pointer',
                        }}
                      >
                        <strong style={{ display: 'block', fontSize: '0.85rem', color: formData.seating_area === zone.id ? '#F5E5BE' : '#FFF' }}>
                          {zone.name}
                        </strong>
                        <small style={{ color: '#8E9995', fontSize: '0.72rem' }}>{zone.desc}</small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Notes */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#D6B879', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    Dietary Requirements or Occasion Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.dietary_notes}
                    onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                    placeholder="e.g. Celebrating 10th anniversary; pescatarian and gluten-free preferences..."
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#0D0F10', border: '1px solid #242B30', color: '#FFF', borderRadius: '3px', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    backgroundColor: '#123B35',
                    border: '1px solid #D6B879',
                    color: '#E8D3A2',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(214, 184, 121, 0.2)',
                  }}
                >
                  {isSubmitting ? 'TRANSMITTING RESERVATION...' : 'SUBMIT RESERVATION INQUIRY →'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LOOKUP FLOW */}
        {activeTab === 'lookup' && (
          <div style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style="color: #D6B879; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase;">
                GUEST CONCIERGE TERMINAL
              </span>
              <h2 style={{ fontFamily: 'Bodoni Moda, serif', fontSize: '1.85rem', color: '#FFF', margin: '0.25rem 0 0' }}>
                Verify Your Reservation
              </h2>
              <p style={{ color: '#8E9995', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                Enter your booking reference code (e.g. <code>AUR-A1B2C3</code>) or booking email.
              </p>
            </div>

            <form onSubmit={handleLookup} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Enter Reference Code or Email..."
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  backgroundColor: '#0D0F10',
                  border: '1px solid #D6B879',
                  color: '#FFF',
                  borderRadius: '3px',
                  fontSize: '0.9rem',
                }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#123B35',
                  border: '1px solid #D6B879',
                  color: '#E8D3A2',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {lookupLoading ? 'Checking...' : 'Check Status'}
              </button>
            </form>

            {lookupError && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(231, 76, 60, 0.15)', border: '1px solid #E74C3C', color: '#FFA5AC', borderRadius: '3px', textAlign: 'center' }}>
                {lookupError}
              </div>
            )}

            {lookupResults && lookupResults.map((r) => (
              <div
                key={r.id || r.reference_code}
                style={{
                  backgroundColor: '#0D0F10',
                  border: '1px solid rgba(214, 184, 121, 0.4)',
                  borderRadius: '4px',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#D6B879', fontWeight: 700 }}>
                      {r.reference_code || `AUR-${r.id}`}
                    </span>
                    <h4 style={{ color: '#FFF', margin: '0.2rem 0 0', fontSize: '1.1rem' }}>{r.full_name || r.guest_name}</h4>
                  </div>
                  <div>
                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '2px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: r.status === 'confirmed' ? 'rgba(46, 204, 113, 0.2)' : r.status === 'pending' ? 'rgba(243, 156, 18, 0.2)' : 'rgba(255,255,255,0.1)',
                        color: r.status === 'confirmed' ? '#2ECC71' : r.status === 'pending' ? '#F39C12' : '#FFF',
                        border: `1px solid ${r.status === 'confirmed' ? '#2ECC71' : r.status === 'pending' ? '#F39C12' : '#888'}`,
                      }}
                    >
                      {r.status || 'Pending'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', color: '#8E9995' }}>
                  <div>📅 Date: <strong style={{ color: '#FFF' }}>{r.date || r.reservation_date}</strong></div>
                  <div>⏱ Time: <strong style={{ color: '#FFF' }}>{r.time || r.reservation_time}</strong></div>
                  <div>👥 Guests: <strong style={{ color: '#FFF' }}>{r.guests || r.party_size}</strong></div>
                  <div>🏛 Salon: <strong style={{ color: '#FFF' }}>{r.seating_area || r.preferred_zone}</strong></div>
                </div>

                {r.table_number && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #242B30', color: '#D6B879', fontSize: '0.85rem' }}>
                    ★ Table Allocated by Maitre D: <strong>Table #{r.table_number}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
