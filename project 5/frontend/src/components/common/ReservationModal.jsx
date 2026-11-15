import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useCMS();

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time_slot: '19:30',
    shift: 'dinner', // 'lunch' | 'dinner'
    party_size: 2,
    preferred_zone: 'Main Pavilion',
    dietary_notes: '',
    special_requests: '',
    occasion: 'Botanical Tasting',
  });

  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Lookup State
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  if (!isReservationOpen) return null;

  const handleShiftSelect = (shift) => {
    setFormData((prev) => ({
      ...prev,
      shift,
      time_slot: shift === 'lunch' ? '12:30' : '19:30',
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingError('');

    try {
      const res = await submitReservation({
        ...formData,
        reservation_time: formData.time_slot,
        guest_count: parseInt(formData.party_size, 10),
      });
      if (res.success && res.data) {
        setBookingResult(res.data);
      } else if (res.reference_code) {
        setBookingResult(res);
      } else {
        throw new Error(res.error || 'Failed to submit reservation.');
      }
    } catch (err) {
      setBookingError(err.message || 'Error registering reservation inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) {
      setLookupError('Enter your Verdant reference code (e.g. TROP-123456).');
      return;
    }
    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    const res = await lookupReservation(lookupCode);
    setLookupLoading(false);
    if (res.success && res.reservation) {
      setLookupResult(res.reservation);
    } else {
      setLookupError(res.message || `No record found for ${lookupCode.trim().toUpperCase()}`);
    }
  };

  const handleClose = () => {
    setBookingResult(null);
    setLookupResult(null);
    setLookupError('');
    setBookingError('');
    closeReservation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(15, 28, 22, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#1A2F25',
          border: '1px solid rgba(170, 185, 160, 0.3)',
          borderRadius: '8px',
          position: 'relative',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.85)',
          color: '#F6F2E9',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#BC7153' }} />

        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>
              VERDANT &bull; MAÎTRE D' DESK
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', fontWeight: 700, margin: 0, color: '#F6F2E9' }}>
              TABLE RESERVATION PORTAL
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#AAB9A0',
              fontSize: '1.75rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(170, 185, 160, 0.2)', paddingBottom: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono, monospace)',
              background: activeTab === 'book' ? '#BC7153' : 'transparent',
              color: activeTab === 'book' ? '#fff' : '#AAB9A0',
              border: '1px solid ' + (activeTab === 'book' ? '#BC7153' : 'rgba(170, 185, 160, 0.3)'),
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            01. RESERVE A TABLE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono, monospace)',
              background: activeTab === 'lookup' ? '#BC7153' : 'transparent',
              color: activeTab === 'lookup' ? '#fff' : '#AAB9A0',
              border: '1px solid ' + (activeTab === 'lookup' ? '#BC7153' : 'rgba(170, 185, 160, 0.3)'),
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            02. LOOKUP BY REF CODE
          </button>
        </div>

        {/* TAB 1: BOOKING FLOW */}
        {activeTab === 'book' && (
          <div>
            {bookingResult ? (
              <div style={{ padding: '2rem 1.5rem', background: '#243F32', border: '1px solid #4ade80', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ color: '#4ade80', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  ✓ INQUIRY REGISTERED SUCCESSFULLY
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', color: '#F6F2E9', marginBottom: '0.5rem' }}>
                  Your Botanical Seating Inquiry Is Received
                </h3>
                <div style={{ background: '#1A2F25', border: '1px dashed #BC7153', borderRadius: '6px', padding: '1.25rem', margin: '1.25rem 0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#AAB9A0', fontFamily: 'var(--font-mono, monospace)' }}>
                    OFFICIAL REFERENCE CODE:
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#D9B84E', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.08em', marginTop: '0.25rem' }}>
                    {bookingResult.reference_code || 'TROP-PENDING'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#C8B99F', fontFamily: 'var(--font-mono, monospace)', marginTop: '0.5rem' }}>
                    Status: <strong style={{ color: '#F6F2E9' }}>{bookingResult.status || 'PENDING APPROVAL'}</strong>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#AAB9A0', margin: '0.5rem 0 0' }}>
                    Keep this reference code to check your table assignment or modify your reservation.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    padding: '0.75rem 2rem',
                    background: '#BC7153',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  CLOSE DESK
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                {bookingError && (
                  <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', marginBottom: '1rem', borderRadius: '4px' }}>
                    {bookingError}
                  </div>
                )}

                {/* Shift Selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    SELECT GASTRONOMIC SHIFT
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('lunch')}
                      style={{
                        padding: '0.85rem',
                        background: formData.shift === 'lunch' ? '#243F32' : '#14251D',
                        border: '1px solid ' + (formData.shift === 'lunch' ? '#D9B84E' : 'rgba(170, 185, 160, 0.25)'),
                        borderRadius: '6px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: '#F6F2E9',
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D9B84E', fontFamily: 'var(--font-mono, monospace)' }}>
                        ☀ LUNCH SERVICE
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#C8B99F', marginTop: '0.2rem' }}>
                        12:00 — 15:30 &bull; Dappled Sun
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('dinner')}
                      style={{
                        padding: '0.85rem',
                        background: formData.shift === 'dinner' ? '#243F32' : '#14251D',
                        border: '1px solid ' + (formData.shift === 'dinner' ? '#BC7153' : 'rgba(170, 185, 160, 0.25)'),
                        borderRadius: '6px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: '#F6F2E9',
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#BC7153', fontFamily: 'var(--font-mono, monospace)' }}>
                        ☾ DINNER SERVICE
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#C8B99F', marginTop: '0.2rem' }}>
                        17:30 — 23:00 &bull; Lantern Glow
                      </div>
                    </button>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      DATE *
                    </label>
                    <input
                      type="date"
                      name="reservation_date"
                      required
                      value={formData.reservation_date}
                      onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      TIME SLOT *
                    </label>
                    <select
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    >
                      {formData.shift === 'lunch' ? (
                        <>
                          <option value="12:00">12:00 PM</option>
                          <option value="12:30">12:30 PM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="13:30">01:30 PM</option>
                          <option value="14:00">02:00 PM</option>
                        </>
                      ) : (
                        <>
                          <option value="17:30">05:30 PM</option>
                          <option value="18:00">06:00 PM</option>
                          <option value="18:30">06:30 PM</option>
                          <option value="19:00">07:00 PM</option>
                          <option value="19:30">07:30 PM</option>
                          <option value="20:00">08:00 PM</option>
                          <option value="20:30">08:30 PM</option>
                          <option value="21:00">09:00 PM</option>
                          <option value="21:30">09:30 PM</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Party Size & Seating Zone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      GUEST COUNT *
                    </label>
                    <select
                      name="party_size"
                      value={formData.party_size}
                      onChange={(e) => setFormData({ ...formData, party_size: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests (PAX)'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      SEATING ZONE
                    </label>
                    <select
                      name="preferred_zone"
                      value={formData.preferred_zone}
                      onChange={(e) => setFormData({ ...formData, preferred_zone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="Main Pavilion">Main Pavilion (Teak Hall)</option>
                      <option value="Glasshouse Canopy">Glasshouse Canopy (Garden Room)</option>
                      <option value="Palm Grove Terrace">Palm Grove Terrace (Open-Air)</option>
                      <option value="Bar Hearth">Bar Hearth & Botanical Counter</option>
                    </select>
                  </div>
                </div>

                {/* Guest Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="guest_name"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      CONTACT EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. elena@verdant-dining.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      MOBILE NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (305) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                      DINING OCCASION
                    </label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        background: '#14251D',
                        border: '1px solid rgba(170, 185, 160, 0.3)',
                        borderRadius: '4px',
                        color: '#F6F2E9',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.85rem',
                        boxSizing: 'border-box',
                      }}
                    >
                      <option value="Botanical Tasting">Botanical Tasting Repertoire</option>
                      <option value="Anniversary">Anniversary Celebration</option>
                      <option value="Business Entertaining">Business Entertaining</option>
                      <option value="Casual Gathering">Casual Lunch / Dinner</option>
                    </select>
                  </div>
                </div>

                {/* Dietary Notes */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                    DIETARY PREFERENCES / ALLERGIES
                  </label>
                  <input
                    type="text"
                    name="dietary_notes"
                    placeholder="e.g. Pescatarian, strictly gluten-free, shellfish allergy"
                    value={formData.dietary_notes}
                    onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: '#14251D',
                      border: '1px solid rgba(170, 185, 160, 0.3)',
                      borderRadius: '4px',
                      color: '#F6F2E9',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.3rem' }}>
                    SPECIAL REQUESTS
                  </label>
                  <textarea
                    name="special_requests"
                    rows="2"
                    placeholder="Quiet corner table, floral arrangement, private wine pairing..."
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: '#14251D',
                      border: '1px solid rgba(170, 185, 160, 0.3)',
                      borderRadius: '4px',
                      color: '#F6F2E9',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.85rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    background: '#BC7153',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    cursor: submitting ? 'wait' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'COMMUNICATING WITH CONCIERGE...' : 'TRANSMIT RESERVATION REQUEST →'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LOOKUP FLOW */}
        {activeTab === 'lookup' && (
          <div>
            <form onSubmit={handleLookupSubmit} style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0', marginBottom: '0.4rem' }}>
                ENTER REFERENCE CODE
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="e.g. TROP-261116-LUN1"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    background: '#14251D',
                    border: '1px solid rgba(170, 185, 160, 0.3)',
                    borderRadius: '4px',
                    color: '#F6F2E9',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                  }}
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#BC7153',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: lookupLoading ? 'wait' : 'pointer',
                  }}
                >
                  {lookupLoading ? 'SEARCHING...' : 'QUERY DESK'}
                </button>
              </div>
            </form>

            {lookupError && (
              <div style={{ padding: '0.85rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', borderRadius: '4px', marginBottom: '1rem' }}>
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.4)', borderRadius: '6px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(170, 185, 160, 0.2)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#AAB9A0', fontFamily: 'var(--font-mono, monospace)' }}>REFERENCE CODE</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#D9B84E', fontFamily: 'var(--font-mono, monospace)' }}>
                      {lookupResult.reference_code}
                    </div>
                  </div>
                  <div style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: lookupResult.status === 'CONFIRMED' ? 'rgba(74, 222, 128, 0.2)' : lookupResult.status === 'SEATED' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(250, 204, 21, 0.2)',
                    color: lookupResult.status === 'CONFIRMED' ? '#4ade80' : lookupResult.status === 'SEATED' ? '#60a5fa' : '#facc15',
                    border: '1px solid currentColor',
                  }}>
                    {lookupResult.status}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono, monospace)', color: '#C8B99F' }}>
                  <div>
                    <span style={{ color: '#AAB9A0', display: 'block', fontSize: '0.7rem' }}>GUEST NAME</span>
                    <strong style={{ color: '#F6F2E9' }}>{lookupResult.guest_name || lookupResult.full_name}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#AAB9A0', display: 'block', fontSize: '0.7rem' }}>DATE &amp; TIME</span>
                    <strong style={{ color: '#F6F2E9' }}>{lookupResult.reservation_date} @ {lookupResult.reservation_time || lookupResult.time_slot}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#AAB9A0', display: 'block', fontSize: '0.7rem' }}>SHIFT &amp; PARTY</span>
                    <strong style={{ color: '#F6F2E9' }}>{(lookupResult.shift || 'DINNER').toUpperCase()} &bull; {lookupResult.party_size || lookupResult.guest_count} PAX</strong>
                  </div>
                  <div>
                    <span style={{ color: '#AAB9A0', display: 'block', fontSize: '0.7rem' }}>ASSIGNED TABLE / ZONE</span>
                    <strong style={{ color: '#F6F2E9' }}>{lookupResult.table_number ? `Table #${lookupResult.table_number}` : (lookupResult.preferred_zone || lookupResult.seating_area || 'Pending Assignment')}</strong>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(170, 185, 160, 0.2)', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)' }}>
                    <span style={{ color: '#AAB9A0' }}>DIETARY SPECIFICATIONS:</span>
                    <div style={{ color: '#F6F2E9', marginTop: '0.2rem' }}>{lookupResult.dietary_notes}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
