import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { content, activeReservationModal, isReservationOpen, closeReservation } = useCMS();
  const isOpen = activeReservationModal || isReservationOpen;

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '11:00 AM',
    shift: 'lunch', // 'lunch' | 'dinner'
    guests: 2,
    occasion: 'Botanical Brunch & Artisanal Coffee',
    seating_zone: 'Greenhouse Palm Atrium',
    dietary_notes: '',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Lookup State
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState('');

  if (!isOpen) return null;

  const handleShiftSelect = (shift) => {
    setFormData((prev) => ({
      ...prev,
      shift,
      time: shift === 'lunch' ? '11:00 AM' : '07:30 PM',
    }));
  };

  const lunchTimeSlots = ['08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM'];
  const dinnerTimeSlots = ['05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM'];
  const currentTimeSlots = formData.shift === 'lunch' ? lunchTimeSlots : dinnerTimeSlots;

  const seatingZones = [
    'Greenhouse Palm Atrium',
    'Sunlit Garden Terrace',
    'Orangerie Mezzanine Nook',
    'Botanical Brew Counter',
    'Best Available Sunlit Table',
  ];

  const occasions = [
    'Botanical Brunch & Artisanal Coffee',
    'Afternoon Tea & Floral Tasting',
    'Intimate Conservatory Dinner',
    'Executive Meeting & Symposium',
    'Celebration & Private Gathering',
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setBookingError('');

    try {
      const payload = {
        ...formData,
        guest_name: formData.full_name,
        party_size: formData.guests,
        time_slot: formData.time,
        reservation_date: formData.date,
        seating_zone: formData.seating_zone,
      };

      const res = await submitReservation(payload);
      if (res && res.data) {
        setBookingResult(res.data);
      } else {
        setBookingResult({
          reference_code: `VER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          full_name: formData.full_name,
          reservation_date: formData.date,
          reservation_time: formData.time,
          shift: formData.shift,
          guests: formData.guests,
          status: 'pending',
        });
      }
    } catch (err) {
      console.error('Reservation booking failed:', err);
      setBookingError(err.message || 'Could not complete your reservation request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await lookupReservation(lookupCode.trim());
      if (res && (res.reservation || res.data)) {
        setLookupResult(res.reservation || res.data);
      } else {
        setLookupError(`No reservation found for reference "${lookupCode}".`);
      }
    } catch (err) {
      setLookupError(err.message || 'Could not locate reservation record. Please verify the code.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleClose = () => {
    setBookingResult(null);
    setLookupResult(null);
    setBookingError('');
    setLookupError('');
    closeReservation();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(26, 43, 36, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#1E332B',
          border: '1px solid #A6B5A0',
          borderRadius: '4px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
          color: '#F4F0E6',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#A6B5A0',
            fontSize: '1.4rem',
            cursor: 'pointer',
            padding: '0.25rem',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
          <span style={{ color: '#A87958', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
            VERDANT ATRIUM &bull; GLASSHOUSE SANCTUARY
          </span>
          <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.2rem', color: '#F4F0E6', margin: 0 }}>
            {activeTab === 'book' ? 'Table Reservation & Visit Inquiry' : 'Reservation Reference Lookup'}
          </h2>
          <p style={{ color: '#D8D2C5', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {activeTab === 'book'
              ? 'Reserve an unhurried table beneath 140+ living botanical species and vaulted structural glass.'
              : 'Enter your booking reference code to check confirmation status and host desk table assignments.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(166, 181, 160, 0.25)', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('book')}
            style={{
              flex: 1,
              padding: '0.85rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'book' ? '3px solid #A87958' : '3px solid transparent',
              color: activeTab === 'book' ? '#F4F0E6' : '#A6B5A0',
              fontWeight: activeTab === 'book' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Request Reservation
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            style={{
              flex: 1,
              padding: '0.85rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'lookup' ? '3px solid #A87958' : '3px solid transparent',
              color: activeTab === 'lookup' ? '#F4F0E6' : '#A6B5A0',
              fontWeight: activeTab === 'lookup' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {/* TAB 1: Booking Form */}
        {activeTab === 'book' && (
          <div>
            {bookingResult ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ fontSize: '3rem', color: '#81c784', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.8rem', color: '#F4F0E6', marginBottom: '0.75rem' }}>
                  Reservation Request Received
                </h3>
                <div style={{ backgroundColor: 'rgba(38, 63, 53, 0.6)', border: '1px solid #A6B5A0', borderRadius: '4px', padding: '1.5rem', margin: '1.5rem 0', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid rgba(166, 181, 160, 0.2)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#A6B5A0', fontSize: '0.82rem' }}>Reference Code:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#F4F0E6', fontSize: '1rem' }}>{bookingResult.reference_code}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#D8D2C5' }}>Guest:</span>
                    <span style={{ fontWeight: 600 }}>{bookingResult.full_name || formData.full_name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#D8D2C5' }}>Date &amp; Shift:</span>
                    <span style={{ fontWeight: 600 }}>{formData.date} &bull; {formData.shift === 'lunch' ? '☀️ Daylight Brunch' : '🌙 Twilight Dinner'} ({formData.time})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#D8D2C5' }}>Party Size:</span>
                    <span style={{ fontWeight: 600 }}>{formData.guests} Guests ({formData.seating_zone})</span>
                  </div>
                </div>
                <p style={{ color: '#D8D2C5', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Please save your reference code <strong>{bookingResult.reference_code}</strong> to track your table confirmation with our maître d'.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    backgroundColor: '#A87958',
                    color: '#F4F0E6',
                    border: 'none',
                    padding: '0.85rem 2rem',
                    borderRadius: '2px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {bookingError && (
                  <div style={{ padding: '0.85rem', backgroundColor: 'rgba(180, 50, 50, 0.25)', border: '1px solid #FF8888', borderRadius: '3px', color: '#FF9999', fontSize: '0.85rem' }}>
                    {bookingError}
                  </div>
                )}

                {/* Shift Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.5rem' }}>
                    Dining Shift
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('lunch')}
                      style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: formData.shift === 'lunch' ? '#263F35' : 'rgba(26, 43, 36, 0.6)',
                        border: formData.shift === 'lunch' ? '2px solid #A87958' : '1px solid rgba(166, 181, 160, 0.25)',
                        borderRadius: '3px',
                        color: formData.shift === 'lunch' ? '#F4F0E6' : '#A6B5A0',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>☀️ Daylight Brunch</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>08:00 AM – 03:30 PM</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('dinner')}
                      style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: formData.shift === 'dinner' ? '#263F35' : 'rgba(26, 43, 36, 0.6)',
                        border: formData.shift === 'dinner' ? '2px solid #A87958' : '1px solid rgba(166, 181, 160, 0.25)',
                        borderRadius: '3px',
                        color: formData.shift === 'dinner' ? '#F4F0E6' : '#A6B5A0',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>🌙 Twilight Dining</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>05:30 PM – 10:30 PM</div>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Julian Croft"
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (503) 555-0192"
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                      Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                    >
                      {currentTimeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                      Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                        <option key={num} value={num}>{num} Guests</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                      Seating Zone
                    </label>
                    <select
                      value={formData.seating_zone}
                      onChange={(e) => setFormData({ ...formData, seating_zone: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                    >
                      {seatingZones.map((z) => (
                        <option key={z} value={z}>{z}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                    >
                      {occasions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A6B5A0', marginBottom: '0.35rem' }}>
                    Dietary Requirements &amp; Special Requests
                  </label>
                  <input
                    type="text"
                    value={formData.dietary_notes}
                    onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                    placeholder="e.g. Vegan, oat milk preference, quiet table near fiddle-leaf fig"
                    style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1A2B24', border: '1px solid rgba(166, 181, 160, 0.3)', borderRadius: '2px', color: '#F4F0E6', outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: '#A87958',
                    color: '#F4F0E6',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '2px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    marginTop: '0.5rem',
                    transition: 'background-color 0.2s',
                  }}
                >
                  {submitting ? 'Transmitting Request...' : 'Confirm Table Reservation Request ➔'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: Lookup Form */}
        {activeTab === 'lookup' && (
          <div>
            <form onSubmit={handleLookupSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                required
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="Enter Reference Code (e.g. VER-261116-LUN1)"
                style={{
                  flex: 1,
                  padding: '0.85rem 1rem',
                  backgroundColor: '#1A2B24',
                  border: '1px solid rgba(166, 181, 160, 0.3)',
                  borderRadius: '2px',
                  color: '#F4F0E6',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="btn-submit-lookup"
                style={{
                  backgroundColor: '#A87958',
                  color: '#F4F0E6',
                  border: 'none',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '2px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: lookupLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {lookupLoading ? 'Searching...' : 'Check Status'}
              </button>
            </form>

            {lookupError && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(180, 50, 50, 0.25)', border: '1px solid #FF8888', borderRadius: '3px', color: '#FF9999', fontSize: '0.88rem', textAlign: 'center' }}>
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div style={{ backgroundColor: 'rgba(38, 63, 53, 0.6)', border: '1px solid #A6B5A0', borderRadius: '4px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(166, 181, 160, 0.25)', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#A6B5A0', textTransform: 'uppercase' }}>Booking Reference</span>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 800, color: '#F4F0E6' }}>
                      {lookupResult.reference_code}
                    </div>
                  </div>
                  <div>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '2px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: lookupResult.status === 'confirmed' ? 'rgba(114, 124, 82, 0.4)' : lookupResult.status === 'pending' ? 'rgba(168, 121, 88, 0.4)' : 'rgba(38, 63, 53, 0.4)',
                        color: lookupResult.status === 'confirmed' ? '#C2D094' : lookupResult.status === 'pending' ? '#E8A87C' : '#A6B5A0',
                        border: '1px solid currentColor',
                      }}
                    >
                      {lookupResult.status}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                  <div>
                    <div style={{ color: '#A6B5A0', fontSize: '0.75rem' }}>Guest Name</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>{lookupResult.full_name}</div>
                  </div>
                  <div>
                    <div style={{ color: '#A6B5A0', fontSize: '0.75rem' }}>Dining Shift &amp; Time</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>
                      {lookupResult.shift === 'lunch' ? '☀️ Daylight Brunch' : '🌙 Twilight Dining'} &bull; {lookupResult.reservation_time}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#A6B5A0', fontSize: '0.75rem' }}>Reservation Date</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>{lookupResult.reservation_date}</div>
                  </div>
                  <div>
                    <div style={{ color: '#A6B5A0', fontSize: '0.75rem' }}>Guests &amp; Zone</div>
                    <div style={{ fontWeight: 700, marginTop: '2px' }}>{lookupResult.guests} Guests &bull; {lookupResult.seating_zone}</div>
                  </div>
                  {lookupResult.table_number && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem', padding: '0.65rem 1rem', backgroundColor: 'rgba(38, 63, 53, 0.8)', border: '1px solid #727C52', borderRadius: '3px' }}>
                      <span style={{ color: '#A6B5A0', fontSize: '0.75rem' }}>Assigned Host Desk Table: </span>
                      <strong style={{ color: '#F4F0E6' }}>{lookupResult.table_number}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
