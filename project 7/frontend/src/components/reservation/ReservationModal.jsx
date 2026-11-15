import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation, lookupReservation } from '../../services/api';

export default function ReservationModal() {
  const { activeReservationModal, isReservationOpen, closeReservation, content } = useCMS();
  const isOpen = activeReservationModal || isReservationOpen;

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'lookup'

  // Booking Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '20:00',
    shift: 'dinner', // 'lunch' | 'dinner'
    guests: '2 Personnes',
    occasion: 'Dîner Gastronomique',
    seating_area: "Grand Salon d'Honneur",
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
      time: shift === 'lunch' ? '12:30' : '20:00',
    }));
  };

  const lunchTimeSlots = ['12:00', '12:30', '13:00', '13:30', '14:00'];
  const dinnerTimeSlots = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  const currentTimeSlots = formData.shift === 'lunch' ? lunchTimeSlots : dinnerTimeSlots;

  const seatingAreas = [
    "Grand Salon d'Honneur",
    'Table Privée du Chef (8 convives max)',
    'Salon Particulier Mansart',
    'Bar à Champagne & Verrière',
  ];

  const occasions = [
    'Dîner Gastronomique',
    'Dîner Romantique & Célébration',
    'Repas d’Affaires & Privé',
    'Anniversaire ou Événement d’Exception',
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
        preferred_zone: formData.seating_area,
      };

      const res = await submitReservation(payload);
      if (res && res.success && res.data) {
        setBookingResult(res.data);
      } else if (res && res.data) {
        setBookingResult(res.data);
      } else if (res && res.reference_code) {
        setBookingResult(res);
      } else {
        throw new Error('Erreur lors de l’enregistrement de votre réservation.');
      }
    } catch (err) {
      setBookingError(err.message || 'Erreur lors de la réservation. Veuillez vérifier vos coordonnées ou contacter la conciergerie.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    if (!lookupCode.trim()) {
      setLookupError('Veuillez renseigner votre code de référence royal (ex. ROYAL-261116-DIN01).');
      return;
    }

    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await lookupReservation(lookupCode.trim());
      setLookupLoading(false);
      if (res.success && res.reservation) {
        setLookupResult(res.reservation);
      } else {
        setLookupError(res.message || `Aucun dossier trouvé sous le code ${lookupCode.trim().toUpperCase()}`);
      }
    } catch (err) {
      setLookupLoading(false);
      setLookupError('Erreur de connexion au serveur de conciergerie.');
    }
  };

  const handleClose = () => {
    setBookingResult(null);
    setLookupResult(null);
    setLookupError('');
    setBookingError('');
    closeReservation();
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid #22c55e', padding: '0.35rem 0.85rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ✓ Confirmée par la Maison
          </span>
        );
      case 'seated':
        return (
          <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '0.35rem 0.85rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ✦ Installé en Salon
          </span>
        );
      case 'cancelled':
        return (
          <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid #ef4444', padding: '0.35rem 0.85rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ✕ Annulée
          </span>
        );
      case 'pending':
      default:
        return (
          <span style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#facc15', border: '1px solid #eab308', padding: '0.35rem 0.85rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ⏳ En attente de confirmation
          </span>
        );
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(15, 15, 17, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
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
          backgroundColor: '#202124',
          border: '1px solid rgba(197, 164, 109, 0.45)',
          borderRadius: '12px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-taupe)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.2rem',
          }}
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span
            style={{
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.82rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            Place Vendôme • Paris
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '0.5rem' }}>
            Conciergerie & Réservations
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
            18 couverts exclusifs par service. Une expérience orchestrée au millimètre près.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#18191B',
            borderRadius: '8px',
            padding: '4px',
            marginBottom: '2rem',
            border: '1px solid rgba(197, 164, 109, 0.25)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('book')}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'book' ? 'var(--color-burgundy)' : 'transparent',
              color: activeTab === 'book' ? 'var(--color-gold-light)' : 'var(--color-taupe)',
              fontWeight: activeTab === 'book' ? 600 : 400,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            ✦ Nouvelle Réservation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'lookup' ? 'var(--color-burgundy)' : 'transparent',
              color: activeTab === 'lookup' ? 'var(--color-gold-light)' : 'var(--color-taupe)',
              fontWeight: activeTab === 'lookup' ? 600 : 400,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            🔍 Rechercher Mon Dossier (ROYAL-)
          </button>
        </div>

        {/* TAB 1: BOOKING FORM */}
        {activeTab === 'book' && !bookingResult && (
          <form onSubmit={handleBookingSubmit}>
            {bookingError && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem',
                }}
              >
                {bookingError}
              </div>
            )}

            {/* Shift Filter: Lunch vs Dinner */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>
                Service Souhaité
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => handleShiftSelect('lunch')}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    border: formData.shift === 'lunch' ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: formData.shift === 'lunch' ? 'rgba(84, 37, 47, 0.8)' : '#18191B',
                    color: formData.shift === 'lunch' ? 'var(--color-gold-light)' : 'var(--color-taupe)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: formData.shift === 'lunch' ? '#FFF' : 'inherit' }}>
                    ☀️ Service Déjeuner
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>12h00 – 15h00</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleShiftSelect('dinner')}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    border: formData.shift === 'dinner' ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: formData.shift === 'dinner' ? 'rgba(84, 37, 47, 0.8)' : '#18191B',
                    color: formData.shift === 'dinner' ? 'var(--color-gold-light)' : 'var(--color-taupe)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: formData.shift === 'dinner' ? '#FFF' : 'inherit' }}>
                    🌙 Service Dîner
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>19h00 – 23h30</div>
                </button>
              </div>
            </div>

            {/* Guest Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                  Nom & Prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Baron Henri de Montmirail"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                  Téléphone Portable *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                Adresse Courriel *
              </label>
              <input
                type="email"
                required
                placeholder="convive@etoileroyale.fr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#18191B',
                  border: '1px solid rgba(197, 164, 109, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--color-ivory)',
                  fontSize: '0.88rem',
                }}
              />
            </div>

            {/* Date, Time & Guests */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                  Date Souhaitée
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                  Heure ({formData.shift === 'lunch' ? 'Midi' : 'Soir'})
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                  }}
                >
                  {currentTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                  Couverts
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                  }}
                >
                  <option value="1 Personne">1 Personne</option>
                  <option value="2 Personnes">2 Personnes</option>
                  <option value="3 Personnes">3 Personnes</option>
                  <option value="4 Personnes">4 Personnes</option>
                  <option value="5 Personnes">5 Personnes</option>
                  <option value="6 Personnes">6 Personnes</option>
                  <option value="8 Personnes (Table Chef)">8 Personnes (Table Chef)</option>
                  <option value="Privatisation Salon">Privatisation Salon</option>
                </select>
              </div>
            </div>

            {/* Seating Area & Occasion */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                  Salon & Emplacement
                </label>
                <select
                  value={formData.seating_area}
                  onChange={(e) => setFormData({ ...formData, seating_area: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                  }}
                >
                  {seatingAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontSize: '0.88rem',
                  }}
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dietary Notes & Special Requests */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.35rem' }}>
                Allergies, Régimes Spécifiques & Souhaits Particuliers
              </label>
              <textarea
                rows={3}
                placeholder="Ex. Intolérance aux crustacés, placement près de la cheminée historique..."
                value={formData.dietary_notes}
                onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#18191B',
                  border: '1px solid rgba(197, 164, 109, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--color-ivory)',
                  fontSize: '0.88rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '0.92rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'Transmission au Maître d’Hôtel...' : 'Confirmer la Demande de Réservation'}
            </button>
          </form>
        )}

        {/* BOOKING SUCCESS SCREEN */}
        {activeTab === 'book' && bookingResult && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 164, 109, 0.15)',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
              }}
            >
              ✦
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-ivory)', marginBottom: '0.5rem' }}>
              Demande Reçue avec Honneur
            </h3>
            <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
              Votre demande a été inscrite au registre de la conciergerie. Notre Maître d’Hôtel l’examinera dans les plus brefs délais.
            </p>

            {/* Reference Code Display */}
            <div
              style={{
                backgroundColor: 'rgba(84, 37, 47, 0.3)',
                border: '1px solid var(--color-gold)',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>
                Code de Référence Unique
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: 'var(--color-gold-light)',
                  letterSpacing: '0.15em',
                }}
              >
                {bookingResult.reference_code || 'ROYAL-CONFIRMED'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-ivory-dim)', marginTop: '0.5rem' }}>
                Conservez précieusement ce code pour suivre votre statut en direct.
              </div>
            </div>

            <div style={{ textAlign: 'left', backgroundColor: '#18191B', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-taupe)' }}>Convive :</span>
                <span style={{ color: 'var(--color-ivory)', fontWeight: 500 }}>{bookingResult.full_name || formData.full_name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-taupe)' }}>Service :</span>
                <span style={{ color: 'var(--color-gold)' }}>{bookingResult.shift === 'lunch' ? '☀️ Déjeuner (12h-15h)' : '🌙 Dîner (19h-23h30)'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-taupe)' }}>Date & Heure :</span>
                <span style={{ color: 'var(--color-ivory)' }}>{bookingResult.date} à {bookingResult.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-taupe)' }}>Couverts :</span>
                <span style={{ color: 'var(--color-ivory)' }}>{bookingResult.guests}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-taupe)' }}>Statut :</span>
                <span>{renderStatusBadge(bookingResult.status || 'pending')}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Fermer la Conciergerie
            </button>
          </div>
        )}

        {/* TAB 2: LOOKUP SYSTEM */}
        {activeTab === 'lookup' && (
          <div>
            <form onSubmit={handleLookupSubmit} style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem', fontWeight: 600 }}>
                Votre Code Royal de Référence
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  required
                  placeholder="ex. ROYAL-261116-DIN01"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    backgroundColor: '#18191B',
                    border: '1px solid rgba(197, 164, 109, 0.4)',
                    borderRadius: '6px',
                    color: 'var(--color-ivory)',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '1rem',
                    letterSpacing: '0.08em',
                  }}
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="btn-primary"
                  style={{ padding: '0.8rem 1.4rem', whiteSpace: 'nowrap' }}
                >
                  {lookupLoading ? 'Recherche...' : 'Consulter'}
                </button>
              </div>
            </form>

            {lookupError && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem',
                }}
              >
                {lookupError}
              </div>
            )}

            {lookupResult && (
              <div
                style={{
                  backgroundColor: '#18191B',
                  border: '1px solid rgba(197, 164, 109, 0.4)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      Code Dossier
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '1.25rem', color: 'var(--color-gold-light)', margin: 0 }}>
                      {lookupResult.reference_code}
                    </h4>
                  </div>
                  <div>{renderStatusBadge(lookupResult.status)}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', display: 'block', fontSize: '0.75rem' }}>Convive</span>
                    <strong style={{ color: 'var(--color-ivory)' }}>{lookupResult.full_name || lookupResult.guest_name}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', display: 'block', fontSize: '0.75rem' }}>Service</span>
                    <strong style={{ color: 'var(--color-gold)' }}>
                      {lookupResult.shift === 'lunch' ? '☀️ Déjeuner (12h-15h)' : '🌙 Dîner (19h-23h30)'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', display: 'block', fontSize: '0.75rem' }}>Date & Heure</span>
                    <strong style={{ color: 'var(--color-ivory)' }}>{lookupResult.date} à {lookupResult.time}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', display: 'block', fontSize: '0.75rem' }}>Couverts</span>
                    <strong style={{ color: 'var(--color-ivory)' }}>{lookupResult.guests || lookupResult.party_size}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', display: 'block', fontSize: '0.75rem' }}>Salon & Emplacement</span>
                    <strong style={{ color: 'var(--color-ivory)' }}>{lookupResult.seating_area || lookupResult.experience || 'Salon d’Honneur'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-taupe)', display: 'block', fontSize: '0.75rem' }}>Table Attribuée</span>
                    <strong style={{ color: lookupResult.table_number ? 'var(--color-gold)' : 'var(--color-taupe)' }}>
                      {lookupResult.table_number ? `Table N° ${lookupResult.table_number}` : 'Attribution à l’arrivée'}
                    </strong>
                  </div>
                </div>

                {lookupResult.dietary_notes && (
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.82rem', color: 'var(--color-ivory-dim)', marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--color-gold)', display: 'block', marginBottom: '0.2rem' }}>Notes & Régimes :</strong>
                    {lookupResult.dietary_notes}
                  </div>
                )}

                <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe)', fontStyle: 'italic', textAlign: 'center' }}>
                  Une question sur votre venue ? Contactez le Maître d’Hôtel au +33 1 42 68 55 00.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
