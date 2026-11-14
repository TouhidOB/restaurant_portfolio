import React, { useState } from 'react';
import { X, Calendar, CheckCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { isReservationModalOpen, setIsReservationModalOpen } = useCMS();

  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    party_size: 2,
    reservation_date: '2026-06-25',
    reservation_time: '20:00',
    seating_preference: 'The Belvedere Sea Terrace',
    occasion: 'Romantic Dinner',
    special_requests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  if (!isReservationModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitReservation(formData);
    setSubmitting(false);
    setResult(res);
  };

  const resetAndClose = () => {
    setResult(null);
    setIsReservationModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        {/* Header */}
        <div style={{ padding: '26px 32px', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAF8F4' }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', color: '#081721', margin: 0 }}>
              Reserve a Table
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C5A059', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
              Aura Marina • Amalfi Coast
            </span>
          </div>
          <button
            onClick={resetAndClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#7A7E80',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {result ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', boxShadow: '0 8px 25px rgba(197, 160, 89, 0.3)' }}>
                <CheckCircle size={34} color="#DFBA73" />
              </div>
              <h4 style={{ fontSize: '1.9rem', color: '#081721', marginBottom: '8px' }}>
                Reservation Requested
              </h4>
              <p style={{ color: '#4A5255', fontSize: '0.98rem', marginBottom: '22px' }}>
                {result.message || "Thank you. Your inquiry has been forwarded to our Head Concierge."}
              </p>
              <div style={{ background: '#FAF8F4', border: '1px dashed #C5A059', padding: '16px', borderRadius: '10px', maxWidth: '340px', margin: '0 auto 26px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#7A7E80', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>
                  Confirmation Reference
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 600, color: '#C5A059' }}>
                  {result.reference_code}
                </span>
              </div>
              <button onClick={resetAndClose} className="btn-gold" style={{ padding: '13px 30px' }}>
                Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guest_name}
                    onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                    placeholder="e.g. Lord Alistair Vance"
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@luxurymail.com"
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+39 089 ..."
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Party Size *
                  </label>
                  <select
                    value={formData.party_size}
                    onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+ (Villa Buyout)'].map((p, i) => (
                      <option key={i} value={typeof p === 'number' ? p : 10}>
                        {p} {typeof p === 'number' ? (p === 1 ? 'Guest' : 'Guests') : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.reservation_date}
                    onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Seating Space
                  </label>
                  <select
                    value={formData.seating_preference}
                    onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                  >
                    <option value="The Belvedere Sea Terrace">The Belvedere Sea Terrace</option>
                    <option value="The Olive Pergola Courtyard">The Olive Pergola Courtyard</option>
                    <option value="The Travertine Sala (Indoor)">The Travertine Sala (Indoor)</option>
                    <option value="Private Cliffside Alcove">Private Cliffside Alcove</option>
                    <option value="The Raw Bar Counter">The Raw Bar Counter</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                    Seating Time
                  </label>
                  <select
                    value={formData.reservation_time}
                    onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                  >
                    <option value="12:30">12:30 — Lunch</option>
                    <option value="13:30">13:30 — Lunch</option>
                    <option value="19:00">19:00 — Sunset Seating</option>
                    <option value="20:00">20:00 — Evening Seating</option>
                    <option value="21:15">21:15 — Twilight Seating</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#081721', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Special Requests / Yacht Tender Assistance / Dietary Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="e.g. Arriving via tender from yacht; celebrating our anniversary..."
                  style={{ width: '100%', padding: '11px 14px', border: '1px solid #E5DDCF', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#FAF8F4' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold"
                style={{ width: '100%', padding: '16px', fontSize: '0.9rem' }}
              >
                {submitting ? 'Confirming with Concierge...' : 'Submit Reservation Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
