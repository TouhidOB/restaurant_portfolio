import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { submitReservation } from '../services/api';

export default function S13Reservation() {
  const { content } = useCMS();
  const resConfig = content?.reservation || {};

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

  const timeSlots = resConfig.time_slots || ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  const experiences = resConfig.experiences_list || [
    "Grand Salon d'Honneur",
    'Table Privée du Chef',
    'Salon Particulier Mansart',
    'Bar à Champagne & Caviar',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitReservation(formData);
      setSuccess(true);
    } catch (err) {
      setError('Impossible de soumettre la demande. Veuillez vérifier vos coordonnées ou nous joindre directement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-section" style={{ backgroundColor: '#202124', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
          {/* Left: Reservation Policy & Prestige Advice */}
          <div>
            <span className="section-label">{resConfig.subtitle || 'Réserver Votre Table Gastronomique'}</span>
            <h2 className="section-title">{resConfig.title || 'Réservations & Conciergerie'}</h2>

            <p style={{ color: 'var(--color-ivory-dim)', fontSize: '1.02rem', lineHeight: '1.75', marginBottom: '2rem' }}>
              {resConfig.description ||
                "En raison du nombre délibérément limité de tables (18 couverts par service), nous vous invitons à réserver au moins deux semaines à l'avance."}
            </p>

            <div
              style={{
                backgroundColor: 'rgba(84, 37, 47, 0.25)',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                borderRadius: '8px',
                padding: '1.75rem',
                marginBottom: '2rem',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                ✦ Code Vestimentaire & Règles de Maison
              </h4>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', lineHeight: '1.65' }}>
                {resConfig.policy || 'Tenue correcte exigée (veste souhaitée pour les messieurs). Les réservations sont garanties jusqu’à 20 minutes après l’heure convenue.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--color-ivory-dim)' }}>
              <div>
                <strong style={{ color: 'var(--color-gold)' }}>Contact Conciergerie :</strong> +33 1 42 68 55 00
              </div>
              <div>
                <strong style={{ color: 'var(--color-gold)' }}>Assistance Privatisations :</strong> concierge@letoileroyale-paris.fr
              </div>
            </div>
          </div>

          {/* Right: Reservation Form */}
          <div
            style={{
              backgroundColor: '#28292D',
              border: '1px solid rgba(197, 164, 109, 0.35)',
              borderRadius: '10px',
              padding: '2.5rem',
              boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
            }}
          >
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>✦</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                  Demande Transmise
                </h3>
                <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  Nous avons bien reçu votre demande pour le <strong>{formData.date} à {formData.time}</strong> ({formData.guests}). Notre Maître d’Hôtel prendra contact avec vous dans les plus brefs délais.
                </p>
                <button onClick={() => setSuccess(false)} className="btn-primary">
                  Nouvelle Réservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '0.5rem' }}>
                  Formulaire de Réservation
                </h3>

                {error && (
                  <div style={{ background: 'rgba(84, 37, 47, 0.4)', border: '1px solid #d45d6f', color: '#f7aab5', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Jean Dupont"
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        background: '#18191B',
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
                      placeholder="+33 6 ..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        background: '#18191B',
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@exemple.fr"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: '#18191B',
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
                        padding: '0.75rem 0.5rem',
                        background: '#18191B',
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
                        padding: '0.75rem 0.5rem',
                        background: '#18191B',
                        border: '1px solid var(--color-charcoal-border)',
                        borderRadius: '4px',
                        color: 'var(--color-ivory)',
                        outline: 'none',
                      }}
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                      Couverts
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.5rem',
                        background: '#18191B',
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
                      <option value="Privatisation">Privatisation</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
                      Expérience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.5rem',
                        background: '#18191B',
                        border: '1px solid var(--color-charcoal-border)',
                        borderRadius: '4px',
                        color: 'var(--color-ivory)',
                        outline: 'none',
                      }}
                    >
                      {experiences.map((exp, idx) => (
                        <option key={idx} value={exp}>{exp}</option>
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
                      placeholder="Dîner d'Affaires, Anniversaire..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.9rem',
                        background: '#18191B',
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
                    Remarques Spéciales
                  </label>
                  <textarea
                    rows="2"
                    value={formData.special_requests}
                    onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                    placeholder="Allergies, préférences de table, millésimes rares..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: '#18191B',
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
                  {loading ? 'Traitement en cours...' : 'Envoyer la Demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
