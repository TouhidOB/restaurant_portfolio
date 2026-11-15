import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation, fetchReservationAvailability } from '../../services/api';

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useCMS();

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time_slot: '19:30',
    shift: 'dinner', // 'lunch' | 'dinner'
    party_size: 2,
    seating_area: 'Main Concrete Hall',
    dietary_notes: '',
    special_requests: '',
    occasion: 'Architectural Tasting',
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
      });
      setBookingResult(res);
    } catch (err) {
      setBookingError(err.message || 'Error registering reservation inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) {
      setLookupError('Enter your Monolith reference code (e.g. BRUT-123456).');
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
        zIndex: 2000,
        backgroundColor: 'rgba(15, 16, 14, 0.9)',
        backdropFilter: 'blur(8px)',
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
          maxWidth: '620px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-steel)',
          position: 'relative',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-orange)' }} />

        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <span className="section-tag" style={{ marginBottom: '0.25rem' }}>
              SECTOR 09 &bull; MAÎTRE D' DESK
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              RESERVATION PORTAL
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-steel)', paddingBottom: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            className={activeTab === 'book' ? 'btn-orange' : 'btn-brutal-secondary'}
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              background: activeTab === 'book' ? 'var(--accent-orange)' : 'transparent',
              color: activeTab === 'book' ? '#000' : 'var(--text-secondary)',
              border: '1px solid ' + (activeTab === 'book' ? 'var(--accent-orange)' : 'var(--border-steel)'),
              cursor: 'pointer',
            }}
          >
            01. BOOK A TABLE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              background: activeTab === 'lookup' ? 'var(--accent-orange)' : 'transparent',
              color: activeTab === 'lookup' ? '#000' : 'var(--text-secondary)',
              border: '1px solid ' + (activeTab === 'lookup' ? 'var(--accent-orange)' : 'var(--border-steel)'),
              cursor: 'pointer',
            }}
          >
            02. LOOKUP BY REF CODE
          </button>
        </div>

        {/* TAB 1: BOOKING FLOW */}
        {activeTab === 'book' && (
          <div>
            {bookingResult ? (
              <div style={{ padding: '1.5rem', background: 'var(--bg-dark)', border: '1px solid #4ade80', textAlign: 'center' }}>
                <div style={{ color: '#4ade80', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  ✓ INQUIRY REGISTERED SUCCESSFULLY
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{bookingResult.message || 'Your inquiry is pending approval.'}</h3>
                <div style={{ background: 'var(--bg-surface)', border: '1px dashed var(--accent-orange)', padding: '1rem', margin: '1rem 0' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CONFIRMATION REFERENCE CODE:</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginTop: '0.25rem' }}>
                    {bookingResult.reference_code || 'BRUT-PENDING'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '0.4rem' }}>
                    Save this reference code to check your table approval status anytime.
                  </div>
                </div>
                <button type="button" onClick={handleClose} className="btn-orange" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>
                  CLOSE TERMINAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                {bookingError && (
                  <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                    {bookingError}
                  </div>
                )}

                {/* Shift Selector */}
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>SELECT GASTRONOMIC SHIFT</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('lunch')}
                      style={{
                        padding: '0.75rem',
                        background: formData.shift === 'lunch' ? 'var(--bg-card)' : 'var(--bg-dark)',
                        border: '1px solid ' + (formData.shift === 'lunch' ? '#facc15' : 'var(--border-steel)'),
                        color: formData.shift === 'lunch' ? '#facc15' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>☀ LUNCH SHIFT</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>12:00 — 15:30 (Daylight Service)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShiftSelect('dinner')}
                      style={{
                        padding: '0.75rem',
                        background: formData.shift === 'dinner' ? 'var(--bg-card)' : 'var(--bg-dark)',
                        border: '1px solid ' + (formData.shift === 'dinner' ? 'var(--accent-orange)' : 'var(--border-steel)'),
                        color: formData.shift === 'dinner' ? 'var(--accent-orange)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>🌙 DINNER SHIFT</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>17:30 — 00:00 (Hearth Service)</div>
                    </button>
                  </div>
                </div>

                {/* Date, Time Slot & Party Size */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>Date</label>
                    <input
                      type="date"
                      name="reservation_date"
                      value={formData.reservation_date}
                      onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                      className="form-input"
                      required
                      style={{ fontSize: '0.8rem', padding: '0.55rem' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>Time Slot</label>
                    <select
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.8rem', padding: '0.55rem', background: 'var(--bg-dark)', color: '#fff' }}
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
                        </>
                      )}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>Party Size</label>
                    <select
                      name="party_size"
                      value={formData.party_size}
                      onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value, 10) })}
                      className="form-input"
                      style={{ fontSize: '0.8rem', padding: '0.55rem', background: 'var(--bg-dark)', color: '#fff' }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating Area Preference */}
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>Seating Zone Preference</label>
                  <select
                    name="seating_area"
                    value={formData.seating_area}
                    onChange={(e) => setFormData({ ...formData, seating_area: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.8rem', padding: '0.55rem', background: 'var(--bg-dark)', color: '#fff' }}
                  >
                    <option value="Main Concrete Hall">Main Concrete Hall (Acoustic Monoliths)</option>
                    <option value="The Cantilever Vault">The Cantilever Vault (Semi-Private Alcove)</option>
                    <option value="The Hearth Fire Counter">The Hearth Fire Counter (Direct View of Embers)</option>
                    <option value="Basalt Monolith Table">Basalt Monolith Table (Polished Basalt Centerpiece)</option>
                  </select>
                </div>

                {/* Guest Contact Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Johnny Vance"
                      style={{ fontSize: '0.8rem', padding: '0.55rem' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.7rem' }}>Direct Mobile *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                      style={{ fontSize: '0.8rem', padding: '0.55rem' }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="guest@monolith-dining.com"
                    style={{ fontSize: '0.8rem', padding: '0.55rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.7rem' }}>Dietary Requirements &amp; Special Requests</label>
                  <input
                    type="text"
                    name="dietary_notes"
                    value={formData.dietary_notes}
                    onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Shellfish allergy, anniversary celebration..."
                    style={{ fontSize: '0.8rem', padding: '0.55rem' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-orange"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
                >
                  {submitting ? 'COMMITTING TO MONOLITH REGISTRY...' : 'TRANSMIT RESERVATION INQUIRY →'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: LOOKUP FLOW */}
        {activeTab === 'lookup' && (
          <div>
            <form onSubmit={handleLookupSubmit} style={{ marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.7rem' }}>ENTER MONOLITH REFERENCE CODE</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={lookupCode}
                    onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                    placeholder="e.g. BRUT-123456"
                    className="form-input"
                    style={{ flex: 1, fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}
                  />
                  <button type="submit" disabled={lookupLoading} className="btn-orange" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>
                    {lookupLoading ? 'LOOKING UP...' : 'SEARCH'}
                  </button>
                </div>
              </div>
            </form>

            {lookupError && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-steel)', borderLeft: '4px solid var(--accent-orange)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-steel)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)' }}>
                    {lookupResult.reference_code}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    border: '1px solid currentColor',
                    color: lookupResult.status === 'confirmed' ? '#4ade80' : lookupResult.status === 'seated' ? '#60a5fa' : lookupResult.status === 'cancelled' ? '#f87171' : 'var(--accent-orange)'
                  }}>
                    {lookupResult.status ? lookupResult.status.toUpperCase() : 'PENDING'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>GUEST: </span>
                    <strong style={{ color: '#fff' }}>{lookupResult.full_name}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>COVERS: </span>
                    <strong style={{ color: '#fff' }}>{lookupResult.party_size} GUESTS</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>DATE: </span>
                    <strong style={{ color: '#fff' }}>{lookupResult.reservation_date}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>TIME / SHIFT: </span>
                    <strong style={{ color: '#fff' }}>{lookupResult.time_slot} ({lookupResult.shift?.toUpperCase()})</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>SEATING ZONE: </span>
                    <strong style={{ color: '#fff' }}>{lookupResult.seating_area}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>ASSIGNED TABLE: </span>
                    <strong style={{ color: lookupResult.table_number ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                      {lookupResult.table_number || 'Pending Host Assignment'}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
