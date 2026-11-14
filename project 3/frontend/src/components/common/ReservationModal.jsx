import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #D8CCB8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8F6F0' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', color: '#174A63', margin: 0 }}>
              Reserve a Table
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#367E94', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Aura Marina • Amalfi Coast
            </span>
          </div>
          <button
            onClick={resetAndClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8C8981',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          {result ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EFF8FA', border: '1px solid #C9DDE0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={32} color="#174A63" />
              </div>
              <h4 style={{ fontSize: '1.8rem', color: '#174A63', marginBottom: '8px' }}>
                Reservation Requested
              </h4>
              <p style={{ color: '#68765A', fontSize: '0.95rem', marginBottom: '20px' }}>
                {result.message || "Thank you. Your inquiry has been forwarded to our Head Concierge."}
              </p>
              <div style={{ background: '#FAF8F2', border: '1px dashed #C8B69B', padding: '14px', borderRadius: '8px', maxWidth: '320px', margin: '0 auto 24px' }}>
                <span style={{ fontSize: '11px', color: '#8C8981', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                  Confirmation Reference
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, color: '#174A63' }}>
                  {result.reference_code}
                </span>
              </div>
              <button onClick={resetAndClose} className="btn-primary">
                Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guest_name}
                    onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                    placeholder="e.g. Lord Alistair Vance"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@luxurymail.com"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+39 089 ..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Party Size *
                  </label>
                  <select
                    value={formData.party_size}
                    onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+ (Private Dining)'].map((p, i) => (
                      <option key={i} value={typeof p === 'number' ? p : 10}>
                        {p} {typeof p === 'number' ? (p === 1 ? 'Guest' : 'Guests') : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.reservation_date}
                    onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Seating Space
                  </label>
                  <select
                    value={formData.seating_preference}
                    onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="The Belvedere Sea Terrace">The Belvedere Sea Terrace</option>
                    <option value="The Olive Pergola Courtyard">The Olive Pergola Courtyard</option>
                    <option value="The Travertine Sala (Indoor)">The Travertine Sala (Indoor)</option>
                    <option value="Private Cliffside Alcove">Private Cliffside Alcove</option>
                    <option value="Raw Bar & Wine Vault Counter">Raw Bar & Wine Vault Counter</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Seating Time
                  </label>
                  <select
                    value={formData.reservation_time}
                    onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}
                  >
                    <option value="12:30">12:30 — Lunch</option>
                    <option value="13:30">13:30 — Lunch</option>
                    <option value="19:00">19:00 — Sunset Seating</option>
                    <option value="20:00">20:00 — Evening Seating</option>
                    <option value="21:15">21:15 — Night Seating</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#174A63', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Special Requests / Yacht Tender Assistance / Dietary Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="e.g. Arriving via tender from yacht; celebrating our anniversary..."
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #D8CCB8', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '0.9rem' }}
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
