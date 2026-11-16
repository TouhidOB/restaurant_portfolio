import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, CheckCircle2, AlertCircle, Search, Calendar, Clock, Users, Sparkles } from 'lucide-react';
import { lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const {
    isReservationModalOpen,
    setIsReservationModalOpen,
    closeReservation,
    selectedExperience,
    handleBookingSubmit
  } = useCMS();

  const [activeTab, setActiveTab] = useState('request'); // 'request' or 'lookup'

  // Request form state
  const [shift, setShift] = useState('dinner'); // 'lunch' or 'dinner'
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    preferred_date: new Date().toISOString().split('T')[0],
    preferred_time: '7:30 PM',
    guest_count: 2,
    seating_area: 'Main Comic Dining Floor',
    dietary_notes: '',
    message: ''
  });

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // Lookup state
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState(null);

  useEffect(() => {
    if (selectedExperience) {
      setFormData((prev) => ({ ...prev, seating_area: selectedExperience }));
    }
  }, [selectedExperience]);

  useEffect(() => {
    if (shift === 'lunch') {
      setFormData((prev) => ({ ...prev, preferred_time: '12:30 PM' }));
    } else {
      setFormData((prev) => ({ ...prev, preferred_time: '7:30 PM' }));
    }
  }, [shift]);

  if (!isReservationModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const payload = {
        customer_name: formData.customer_name,
        phone: formData.phone,
        email: formData.email,
        preferred_date: formData.preferred_date || new Date().toISOString().split('T')[0],
        preferred_time: formData.preferred_time,
        shift: shift,
        guest_count: parseInt(formData.guest_count, 10) || 2,
        selected_experience: formData.seating_area,
        dietary_notes: formData.dietary_notes,
        message: formData.message
      };

      const res = await handleBookingSubmit(payload);
      if (res && (res.success || res.reference_code || res.data)) {
        setStatus('success');
        setConfirmationNumber(res.reference_code || res.data?.reference_code || `POP-CONFIRMED`);
      } else {
        setStatus('error');
        setErrorMessage(res?.error || 'Could not process reservation.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Could not process reservation. Please contact concierge at +1 (555) 767-3663.');
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;
    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);

    try {
      const res = await lookupReservation(lookupCode.trim());
      if (res.success && res.data) {
        setLookupResult(res.data);
      } else {
        setLookupError(res.error || `No booking found for reference code: ${lookupCode.trim()}`);
      }
    } catch (err) {
      setLookupError('Network error while searching reservation code.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleClose = () => {
    if (closeReservation) {
      closeReservation();
    } else {
      setIsReservationModalOpen(false);
    }
    setStatus('idle');
    setErrorMessage('');
    setLookupResult(null);
    setLookupError(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#141418',
          border: '1px solid rgba(255, 221, 0, 0.3)',
          borderRadius: '8px',
          padding: '36px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 221, 0, 0.1)',
          position: 'relative',
          color: '#FFFFFF'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#8E8EA0',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#FFDD00', fontWeight: 800 }}>
            <Sparkles size={13} /> POP! FOOD STUDIO • CONCIERGE DESK
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', color: '#FFFFFF', marginTop: '6px', letterSpacing: '0.5px' }}>
            Table Reservation & Dining Inquiry
          </h2>
          <div style={{ width: '40px', height: '3px', background: '#FFDD00', margin: '12px auto 0', borderRadius: '2px' }} />
        </div>

        {/* Dual Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '24px', background: '#0A0A0C', padding: '4px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('request')}
            style={{
              padding: '11px',
              border: 'none',
              background: activeTab === 'request' ? '#1E1E24' : 'transparent',
              color: activeTab === 'request' ? '#FFDD00' : '#8E8EA0',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s',
              borderLeft: activeTab === 'request' ? '2px solid #FFDD00' : 'none'
            }}
          >
            Request Reservation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            style={{
              padding: '11px',
              border: 'none',
              background: activeTab === 'lookup' ? '#1E1E24' : 'transparent',
              color: activeTab === 'lookup' ? '#FFDD00' : '#8E8EA0',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s',
              borderLeft: activeTab === 'lookup' ? '2px solid #FFDD00' : 'none'
            }}
          >
            Lookup Reservation
          </button>
        </div>

        {activeTab === 'request' ? (
          <div>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '32px 20px', background: 'rgba(72, 187, 120, 0.08)', border: '1px solid #48bb78', borderRadius: '6px' }}>
                <CheckCircle2 size={46} style={{ color: '#48bb78', margin: '0 auto 14px' }} />
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', color: '#FFF', marginBottom: '8px' }}>
                  Reservation Request Logged!
                </h3>
                <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                  Your request has been routed to the POP! Food Studio host desk. Our team will review table assignments shortly.
                </p>
                <div style={{ background: '#0A0A0C', border: '1px dashed #FFDD00', padding: '16px', borderRadius: '4px', maxWidth: '320px', margin: '0 auto 20px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#8E8EA0', letterSpacing: '1.5px', fontWeight: 700 }}>Your Booking Reference Code</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 800, color: '#FFDD00', marginTop: '6px', letterSpacing: '2px' }}>
                    {confirmationNumber}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{ padding: '12px 30px', background: '#FFDD00', border: 'none', borderRadius: '4px', color: '#000', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}
                >
                  Close Desk
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Dining Shift Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '8px', fontWeight: 700 }}>
                    Select Dining Shift *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setShift('lunch')}
                      style={{
                        padding: '12px',
                        borderRadius: '4px',
                        border: shift === 'lunch' ? '1px solid #FFDD00' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: shift === 'lunch' ? 'rgba(255, 221, 0, 0.15)' : '#1E1E24',
                        color: shift === 'lunch' ? '#FFDD00' : '#8E8EA0',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      ☀️ Daylight Lunch
                      <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '2px' }}>11:30 AM – 2:30 PM</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShift('dinner')}
                      style={{
                        padding: '12px',
                        borderRadius: '4px',
                        border: shift === 'dinner' ? '1px solid #FF007F' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: shift === 'dinner' ? 'rgba(255, 0, 127, 0.15)' : '#1E1E24',
                        color: shift === 'dinner' ? '#FF007F' : '#8E8EA0',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      🌙 Twilight Dinner
                      <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '2px' }}>5:00 PM – 11:30 PM</div>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Guest Name *</label>
                    <input
                      type="text"
                      name="customer_name"
                      required
                      placeholder="e.g. Andy Warhol Jr"
                      value={formData.customer_name}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 767-3663"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Party Size (PAX) *</label>
                    <select
                      name="guest_count"
                      value={formData.guest_count}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                    >
                      <option value="1">1 Person (Solo Foodie)</option>
                      <option value="2">2 Persons (Pop Table)</option>
                      <option value="4">4 Persons (Comic Booth)</option>
                      <option value="6">6 Persons (Lab Gathering)</option>
                      <option value="8">8 Persons (Studio Party)</option>
                      <option value="12">12+ Persons (VIP Neon Loft)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Preferred Date *</label>
                    <input
                      type="date"
                      name="preferred_date"
                      required
                      value={formData.preferred_date}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Preferred Time Slot *</label>
                    <input
                      type="text"
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      placeholder={shift === 'lunch' ? '12:30 PM' : '7:30 PM'}
                      style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Seating Zone / Experience</label>
                  <select
                    name="seating_area"
                    value={formData.seating_area}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                  >
                    <option value="Main Comic Dining Floor">Main Comic Dining Floor</option>
                    <option value="The Food Lab Counter">The Food Lab Counter (Plancha Front)</option>
                    <option value="Pop-Art Comic Booth">Pop-Art Comic Booth</option>
                    <option value="VIP Neon Loft Lounge">VIP Neon Loft Lounge</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Dietary Preferences & Allergies</label>
                  <input
                    type="text"
                    name="dietary_notes"
                    placeholder="e.g. Vegetarian, Gluten-Free buns, Shellfish allergy..."
                    value={formData.dietary_notes}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}
                  />
                </div>

                {errorMessage && (
                  <div style={{ padding: '10px 14px', background: 'rgba(245, 101, 101, 0.15)', border: '1px solid #f56565', color: '#feb2b2', borderRadius: '4px', fontSize: '12px' }}>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    padding: '14px',
                    background: '#FFDD00',
                    color: '#000',
                    border: 'none',
                    borderRadius: '4px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 800,
                    fontSize: '13px',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {status === 'submitting' ? 'Submitting Request...' : 'Submit Table Reservation Request →'}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Lookup Reservation Tab */
          <div>
            <form onSubmit={handleLookup} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="text"
                required
                placeholder="Enter Reference (e.g. POP-261116-LUN1)"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                style={{ flex: 1, padding: '12px 14px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', textTransform: 'uppercase', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="btn-submit-lookup"
                style={{
                  padding: '12px 22px',
                  background: '#FFDD00',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                {lookupLoading ? 'Searching...' : 'Search Code'}
              </button>
            </form>

            {lookupError && (
              <div style={{ padding: '12px', background: 'rgba(245, 101, 101, 0.12)', border: '1px solid #f56565', color: '#feb2b2', borderRadius: '4px', fontSize: '12px', marginBottom: '16px' }}>
                <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div style={{ background: '#0A0A0C', border: '1px solid rgba(255, 221, 0, 0.3)', borderRadius: '6px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8E8EA0', fontWeight: 700 }}>Booking Code</span>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 800, color: '#FFDD00' }}>
                      {lookupResult.reference_code}
                    </div>
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      background: lookupResult.status === 'confirmed' ? 'rgba(72, 187, 120, 0.2)' : 'rgba(237, 137, 54, 0.2)',
                      color: lookupResult.status === 'confirmed' ? '#48bb78' : '#ed8936',
                      border: `1px solid ${lookupResult.status === 'confirmed' ? '#48bb78' : '#ed8936'}`
                    }}>
                      {lookupResult.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
                  <div>
                    <div style={{ color: '#8E8EA0', fontSize: '11px', textTransform: 'uppercase' }}>Guest Name</div>
                    <div style={{ fontWeight: 700, color: '#FFF', marginTop: '2px' }}>{lookupResult.customer_name || lookupResult.guest_name || lookupResult.full_name}</div>
                  </div>
                  <div>
                    <div style={{ color: '#8E8EA0', fontSize: '11px', textTransform: 'uppercase' }}>Shift & Time</div>
                    <div style={{ fontWeight: 700, color: '#FFDD00', marginTop: '2px' }}>
                      {lookupResult.shift === 'lunch' ? '☀️ Daylight Lunch' : '🌙 Twilight Dinner'} • {lookupResult.preferred_time || lookupResult.time_slot}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#8E8EA0', fontSize: '11px', textTransform: 'uppercase' }}>Party Size</div>
                    <div style={{ fontWeight: 700, color: '#FFF', marginTop: '2px' }}>{lookupResult.guest_count || lookupResult.party_size} Guests</div>
                  </div>
                  <div>
                    <div style={{ color: '#8E8EA0', fontSize: '11px', textTransform: 'uppercase' }}>Assigned Table</div>
                    <div style={{ fontWeight: 700, color: '#00E5FF', marginTop: '2px' }}>{lookupResult.table_number || 'Host Desk Assignment Pending'}</div>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '12px' }}>
                    <span style={{ color: '#8E8EA0' }}>Dietary Notes:</span> <span style={{ color: '#FFF' }}>{lookupResult.dietary_notes}</span>
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
