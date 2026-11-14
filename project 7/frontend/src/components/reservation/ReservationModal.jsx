import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { activeReservationModal, closeReservation, content } = useCMS();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: '2 Personnes',
    occasion: 'Dîner Romantique',
    experience: "Grand Salon d'Honneur",
    special_requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!activeReservationModal) return null;

  const resConfig = content?.reservation || {};
  const experiences = resConfig.experiences_list || [
    "Grand Salon d'Honneur",
    'Table Privée du Chef',
    'Salon Particulier Mansart',
    'Bar à Champagne & Caviar',
  ];
  const timeSlots = resConfig.time_slots || ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitReservation(formData);
      setSuccess(true);
    } catch (err) {
      setError('Erreur lors de la réservation. Veuillez vérifier vos informations ou contacter la conciergerie.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    closeReservation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(15, 15, 17, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeReservation();
      }}
    >
      <div
        style={{
          backgroundColor: '#242529',
          border: '1px solid rgba(197, 164, 109, 0.4)',
          borderRadius: '12px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
        }}
      >
        <button
          onClick={closeReservation}
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

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(197, 164, 109, 0.2)',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 1.5rem',
              }}
            >
              ✦
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                color: 'var(--color-ivory)',
                marginBottom: '0.75rem',
              }}
            >
              Demande Transmise avec Succès
            </h3>
            <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Merci infiniment, cher(e) <strong>{formData.full_name}</strong>. Notre Maître d'Hôtel vous recontactera sous 2 heures pour confirmer votre table au {formData.experience} pour le <strong>{formData.date} à {formData.time}</strong>.
            </p>
            <button onClick={handleReset} className="btn-primary">
              Terminer
            </button>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-label">Conciergerie Privée</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', color: 'var(--color-ivory)' }}>
                Réserver Votre Table
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem' }}>
                Service exclusif de 18 tables • Dîner gastronomique d'auteur
              </p>
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(84, 37, 47, 0.4)',
                  border: '1px solid #d45d6f',
                  color: '#f7aab5',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Comte de Saint-Germain"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      background: '#1A1B1D',
                      border: '1px solid var(--color-charcoal-border)',
                      borderRadius: '4px',
                      color: 'var(--color-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+33 6 12 34 56 78"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      background: '#1A1B1D',
                      border: '1px solid var(--color-charcoal-border)',
                      borderRadius: '4px',
                      color: 'var(--color-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                  Adresse Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="invitation@domaine.fr"
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    background: '#1A1B1D',
                    border: '1px solid var(--color-charcoal-border)',
                    borderRadius: '4px',
                    color: 'var(--color-ivory)',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.5rem',
                      background: '#1A1B1D',
                      border: '1px solid var(--color-charcoal-border)',
                      borderRadius: '4px',
                      color: 'var(--color-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Heure
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.5rem',
                      background: '#1A1B1D',
                      border: '1px solid var(--color-charcoal-border)',
                      borderRadius: '4px',
                      color: 'var(--color-ivory)',
                      outline: 'none',
                    }}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Convives
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.5rem',
                      background: '#1A1B1D',
                      border: '1px solid var(--color-charcoal-border)',
                      borderRadius: '4px',
                      color: 'var(--color-ivory)',
                      outline: 'none',
                    }}
                  >
                    <option value="1 Personne">1 Personne</option>
                    <option value="2 Personnes">2 Personnes</option>
                    <option value="3 Personnes">3 Personnes</option>
                    <option value="4 Personnes">4 Personnes</option>
                    <option value="5-8 Personnes">5-8 Personnes</option>
                    <option value="Privatisation">Privatisation Complète</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Salon Souhaité
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.5rem',
                      background: '#1A1B1D',
                      border: '1px solid var(--color-charcoal-border)',
                      borderRadius: '4px',
                      color: 'var(--color-ivory)',
                      outline: 'none',
                    }}
                  >
                    {experiences.map((exp, idx) => (
                      <option key={idx} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                    Occasion
                  </label>
                  <input
                    type="text"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    placeholder="Anniversaire, Affaires, Romantique..."
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      background: '#1A1B1D',
                      border: '1px solid var(--color-charcoal-border)',
                      borderRadius: '4px',
                      color: 'var(--color-ivory)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                  Demandes Particulières & Régimes
                </label>
                <textarea
                  rows="2"
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  placeholder="Allergies, table proche de la fenêtre, sélection de millésime particulier..."
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    background: '#1A1B1D',
                    border: '1px solid var(--color-charcoal-border)',
                    borderRadius: '4px',
                    color: 'var(--color-ivory)',
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.95rem', fontSize: '0.9rem', marginTop: '0.5rem' }}
              >
                {loading ? 'Transmission en cours...' : 'Confirmer la Demande de Réservation'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
