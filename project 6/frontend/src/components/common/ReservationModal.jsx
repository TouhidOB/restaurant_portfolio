import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { createReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useCMS();

  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'lookup'

  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    reservation_time: '19:15',
    party_size: 2,
    preferred_zone: 'Retro Leather Booth',
    occasion: 'casual',
    dietary_notes: '',
    special_requests: '',
  });

  const [shiftFilter, setShiftFilter] = useState('dinner'); // 'lunch' or 'dinner'
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResults, setLookupResults] = useState(null);
  const [lookupError, setLookupError] = useState(null);

  const LUNCH_SLOTS = ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
  const DINNER_SLOTS = ['17:30', '18:00', '18:45', '19:15', '20:00', '20:45', '21:30', '22:15'];

  const SEATING_ZONES = [
    { id: 'Retro Leather Booth', name: 'Red Leather Booth', desc: 'Cozy vinyl booth with private table jukebox' },
    { id: 'Starlight Dining Table', name: 'Starlight Dining Table', desc: 'Center dining room with chrome mid-century fixtures' },
    { id: 'Chrome Counter Stools', name: 'Stainless Counter', desc: 'Front-row view of the sizzling flat-top grill' },
    { id: 'VIP Galactic Salon', name: 'VIP Galactic Salon', desc: 'Semi-private retro-futuristic vault for 6+ guests' },
  ];

  const OCCASIONS = [
    { id: 'casual', name: 'Casual Dining' },
    { id: 'birthday', name: 'Birthday Celebration 🎉' },
    { id: 'anniversary', name: 'Anniversary 🥂' },
    { id: 'date', name: 'Romantic Date ❤️' },
    { id: 'business', name: 'Business Dinner 💼' },
    { id: 'celebration', name: 'Special Celebration ✨' },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeReservation();
    };
    if (isReservationOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isReservationOpen, closeReservation]);

  if (!isReservationOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (timeStr) => {
    setFormData((prev) => ({ ...prev, reservation_time: timeStr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const payload = {
      ...formData,
      party_size: parseInt(formData.party_size, 10),
    };

    const res = await createReservation(payload);
    setLoading(false);

    if (res.success) {
      setSuccessResult(res.data);
    } else {
      setErrorMsg(res.error || 'Failed to submit reservation. Please check your connection.');
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    setLookupResults(null);
    setErrorMsg(null);
    closeReservation();
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const downloadICS = (res) => {
    const dateStr = (res.reservation_date || '').replace(/-/g, '');
    const [hours, mins] = (res.reservation_time || '19:15').split(':');
    const startHour = hours ? hours.padStart(2, '0') : '19';
    const startMin = mins ? mins.padStart(2, '0') : '15';
    const endHour = String((parseInt(startHour, 10) + 2) % 24).padStart(2, '0');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Stardust Diner//Table Reservation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Table at Stardust Diner (${res.reference_code})`,
      `DESCRIPTION:Table reserved for ${res.party_size || res.guest_count} guests at ${res.seating_area}. Reference: ${res.reference_code}.`,
      'LOCATION:88 Observatory Way, Neon Heights, CA 90210',
      `DTSTART:${dateStr}T${startHour}${startMin}00`,
      `DTEND:${dateStr}T${endHour}${startMin}00`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `stardust-reservation-${res.reference_code}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    setLookupLoading(true);
    setLookupError(null);
    setLookupResults(null);

    const res = await lookupReservation(lookupQuery.trim());
    setLookupLoading(false);
    if (res.success && res.reservations && res.reservations.length > 0) {
      setLookupResults(res.reservations);
    } else {
      setLookupError(res.error || `No active bookings found for "${lookupQuery}".`);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backgroundColor: 'rgba(9, 15, 27, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={handleReset}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(67, 217, 232, 0.15)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          aria-label="Close reservation dialog"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(9, 15, 27, 0.85)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1rem',
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Tab Switcher */}
        {!successResult && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid var(--border-diner)',
              paddingBottom: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('book')}
              style={{
                background: activeTab === 'book' ? 'rgba(67, 217, 232, 0.15)' : 'transparent',
                border: activeTab === 'book' ? '1px solid var(--neon-cyan)' : '1px solid transparent',
                color: activeTab === 'book' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.45rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              ★ 1. RESERVE A TABLE
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lookup')}
              style={{
                background: activeTab === 'lookup' ? 'rgba(242, 201, 76, 0.15)' : 'transparent',
                border: activeTab === 'lookup' ? '1px solid var(--atomic-yellow)' : '1px solid transparent',
                color: activeTab === 'lookup' ? 'var(--atomic-yellow)' : 'var(--text-muted)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.45rem 1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              🔍 2. LOOKUP EXISTING BOOKING
            </button>
          </div>
        )}

        {/* TAB 1: SUCCESS RESULT CONFIRMATION TICKET */}
        {successResult ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(67, 217, 232, 0.2)',
                border: '2px solid var(--neon-cyan)',
                color: 'var(--neon-cyan)',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 0 24px rgba(67, 217, 232, 0.4)',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                color: '#FFFFFF',
                marginBottom: '0.25rem',
              }}
            >
              Table Reserved!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Your reservation request has been registered in the Maitre D' Concierge system.
            </p>

            {/* Futuristic Boarding Pass Voucher */}
            <div
              style={{
                backgroundColor: 'var(--bg-midnight-deep)',
                border: '1px dashed var(--neon-cyan)',
                borderRadius: '8px',
                padding: '1.5rem',
                maxWidth: '520px',
                margin: '0 auto 1.75rem',
                textAlign: 'left',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-diner)', paddingBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>BOOKING PASS CODE</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--neon-cyan)', letterSpacing: '0.08em' }}>
                    #{successResult.reference_code}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(successResult.reference_code)}
                  style={{
                    background: 'rgba(67, 217, 232, 0.15)',
                    border: '1px solid var(--neon-cyan)',
                    color: 'var(--neon-cyan)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                  }}
                >
                  {copiedCode ? '✓ COPIED' : '📋 COPY CODE'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', fontSize: '0.82rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>GUEST NAME</span>
                  <strong style={{ color: '#FFF' }}>{successResult.guest_name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>DATE & TIME</span>
                  <strong style={{ color: '#FFF' }}>{successResult.reservation_date} @ {successResult.reservation_time}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>PARTY SIZE</span>
                  <strong style={{ color: 'var(--atomic-yellow)' }}>{successResult.party_size} Guests</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>SEATING ZONE</span>
                  <strong style={{ color: 'var(--neon-cyan)' }}>{successResult.seating_area}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>OCCASION</span>
                  <strong style={{ color: '#FFF' }}>{successResult.occasion_display || successResult.occasion || 'Casual Dining'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>STATUS</span>
                  <span style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>
                    ● {successResult.booking_status_display || 'PENDING REVIEW'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => downloadICS(successResult)}
                className="btn-cyan"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}
              >
                📅 ADD TO CALENDAR (.ICS)
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-cherry"
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.85rem' }}
              >
                <span>RETURN TO DINER</span>
              </button>
            </div>
          </div>
        ) : activeTab === 'lookup' ? (
          /* TAB 2: LOOKUP EXISTING BOOKING */
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag" style={{ marginBottom: '0.5rem' }}>
                MAITRE D' LOOKUP
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFF', marginBottom: '0.5rem' }}>
                Find Your Reservation
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Enter your booking confirmation code (e.g. <code>RETRO-261115-468A</code>) or registered email address.
              </p>
            </div>

            <form onSubmit={handleLookupSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                required
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Reference Code or Email Address..."
                style={{
                  flex: 1,
                  padding: '0.8rem 1rem',
                  backgroundColor: 'var(--bg-midnight-deep)',
                  border: '1px solid var(--border-diner)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-ivory)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="btn-cyan"
                style={{ padding: '0.8rem 1.5rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                {lookupLoading ? 'SEARCHING...' : 'LOOKUP'}
              </button>
            </form>

            {lookupError && (
              <div
                style={{
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem',
                  backgroundColor: 'rgba(216, 58, 69, 0.15)',
                  border: '1px solid var(--cherry-red)',
                  color: '#FFA5AC',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.85rem',
                }}
              >
                {lookupError}
              </div>
            )}

            {lookupResults && lookupResults.map((b) => (
              <div
                key={b.id || b.reference_code}
                style={{
                  backgroundColor: 'var(--bg-midnight-deep)',
                  border: '1px solid var(--border-diner)',
                  borderRadius: '6px',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>REFERENCE</span>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--neon-cyan)' }}>
                      #{b.reference_code}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      backgroundColor: b.status === 'confirmed' ? 'rgba(67, 217, 232, 0.2)' : b.status === 'seated' ? 'rgba(94, 234, 212, 0.2)' : 'rgba(242, 201, 76, 0.2)',
                      color: b.status === 'confirmed' ? 'var(--neon-cyan)' : b.status === 'seated' ? '#5EEAD4' : 'var(--atomic-yellow)',
                      border: '1px solid currentColor',
                    }}
                  >
                    ● {b.status_display || b.status.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-cream)' }}>
                  <div>Guest: <strong style={{ color: '#FFF' }}>{b.guest_name}</strong></div>
                  <div>Date: <strong style={{ color: '#FFF' }}>{b.reservation_date} @ {b.reservation_time}</strong></div>
                  <div>Party: <strong style={{ color: 'var(--atomic-yellow)' }}>{b.party_size} Guests</strong></div>
                  <div>Assigned Table: <strong style={{ color: '#5EEAD4' }}>{b.table_number || 'Pending Host Table Allocation'}</strong></div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadICS(b)}
                  style={{
                    marginTop: '0.75rem',
                    background: 'transparent',
                    border: '1px solid var(--border-diner)',
                    color: 'var(--neon-cyan)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                  }}
                >
                  📅 Download Calendar Event (.ICS)
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* TAB 1: BOOKING FORM */
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag" style={{ marginBottom: '0.5rem' }}>
                TABLE INQUIRY & INSTANT ALLOCATION
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                Reserve Your Table
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'var(--text-cream)' }}>
                Select your preferred dining shift, seating zone, and party size.
              </p>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                  backgroundColor: 'rgba(216, 58, 69, 0.2)',
                  border: '1px solid var(--cherry-red)',
                  color: '#FFA5AC',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.85rem',
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Date & Guests Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    1. Date of Arrival *
                  </label>
                  <input
                    type="date"
                    name="reservation_date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.reservation_date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    2. Party Size *
                  </label>
                  <select
                    name="party_size"
                    value={formData.party_size}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  >
                    <option value="1">1 Guest (Single Counter)</option>
                    <option value="2">2 Guests (Cozy Booth)</option>
                    <option value="3">3 Guests (Leather Booth)</option>
                    <option value="4">4 Guests (Mid-Century Table)</option>
                    <option value="5">5 Guests (Corner Booth)</option>
                    <option value="6">6 Guests (Starlight Table)</option>
                    <option value="8">8 Guests (VIP Vault)</option>
                    <option value="12">12+ Guests (Private Banquet)</option>
                  </select>
                </div>
              </div>

              {/* Shift & Time Slots Selector */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      textTransform: 'uppercase',
                    }}
                  >
                    3. Select Seating Shift & Time *
                  </label>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                      type="button"
                      onClick={() => setShiftFilter('lunch')}
                      style={{
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: '3px',
                        border: shiftFilter === 'lunch' ? '1px solid var(--atomic-yellow)' : '1px solid var(--border-diner)',
                        background: shiftFilter === 'lunch' ? 'rgba(242, 201, 76, 0.2)' : 'transparent',
                        color: shiftFilter === 'lunch' ? 'var(--atomic-yellow)' : 'var(--text-muted)',
                        cursor: 'pointer',
                      }}
                    >
                      ☀️ LUNCH SHIFT
                    </button>
                    <button
                      type="button"
                      onClick={() => setShiftFilter('dinner')}
                      style={{
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: '3px',
                        border: shiftFilter === 'dinner' ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                        background: shiftFilter === 'dinner' ? 'rgba(67, 217, 232, 0.2)' : 'transparent',
                        color: shiftFilter === 'dinner' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                        cursor: 'pointer',
                      }}
                    >
                      🌙 DINNER SHIFT
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {(shiftFilter === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS).map((t) => {
                    const isSelected = formData.reservation_time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTimeSelect(t)}
                        style={{
                          padding: '0.5rem 0.85rem',
                          borderRadius: '4px',
                          border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                          backgroundColor: isSelected ? 'rgba(67, 217, 232, 0.2)' : 'var(--bg-midnight-deep)',
                          color: isSelected ? 'var(--neon-cyan)' : 'var(--text-ivory)',
                          boxShadow: isSelected ? '0 0 12px rgba(67, 217, 232, 0.4)' : 'none',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? 700 : 400,
                          cursor: 'pointer',
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--neon-cyan)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                  }}
                >
                  4. Preferred Dining Zone
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.6rem' }}>
                  {SEATING_ZONES.map((zone) => {
                    const isSelected = formData.preferred_zone === zone.id;
                    return (
                      <div
                        key={zone.id}
                        onClick={() => setFormData((prev) => ({ ...prev, preferred_zone: zone.id }))}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '6px',
                          border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                          backgroundColor: isSelected ? 'rgba(67, 217, 232, 0.12)' : 'var(--bg-midnight-deep)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: isSelected ? 'var(--neon-cyan)' : '#FFF', marginBottom: '2px' }}>
                          {zone.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                          {zone.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Occasion & Contact Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Dining Occasion
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ.id} value={occ.id}>{occ.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    name="guest_name"
                    required
                    value={formData.guest_name}
                    onChange={handleChange}
                    placeholder="e.g. Eleanor Vance"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
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
                    placeholder="eleanor@retrofuture.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'var(--neon-cyan)',
                      marginBottom: '0.4rem',
                      textTransform: 'uppercase',
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
                    placeholder="+1 (555) 789-2026"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      backgroundColor: 'var(--bg-midnight-deep)',
                      border: '1px solid var(--border-diner)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-ivory)',
                      outline: 'none',
                      fontSize: '0.88rem',
                    }}
                  />
                </div>
              </div>

              {/* Dietary Notes */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--neon-cyan)',
                    marginBottom: '0.4rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Dietary Restrictions / Chef Allergies Alert
                </label>
                <input
                  type="text"
                  name="dietary_notes"
                  value={formData.dietary_notes}
                  onChange={handleChange}
                  placeholder="e.g. Gluten-free, shellfish allergy, vegan options preferred"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    backgroundColor: 'var(--bg-midnight-deep)',
                    border: '1px solid var(--border-diner)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-ivory)',
                    outline: 'none',
                    fontSize: '0.82rem',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-cherry"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.95rem',
                  marginTop: '0.5rem',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <span>{loading ? 'SECURING DINER TABLE...' : 'CONFIRM TABLE RESERVATION'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
