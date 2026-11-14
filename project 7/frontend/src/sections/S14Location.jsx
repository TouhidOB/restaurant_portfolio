import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S14Location() {
  const { content } = useCMS();
  const loc = content?.location || {};

  return (
    <section id="acces" className="py-section" style={{ backgroundColor: '#18191B', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{loc.subtitle || 'Au Cœur du Paris Historique'}</span>
          <h2 className="section-title">{loc.title || 'Situation & Accès'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Idéalement situé à quelques pas de la colonne Vendôme et des jardins des Tuileries.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'stretch' }}>
          {/* Practical Access Card */}
          <div
            style={{
              backgroundColor: '#202124',
              border: '1px solid rgba(197, 164, 109, 0.3)',
              borderRadius: '8px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', display: 'block', marginBottom: '0.35rem' }}>
                  Adresse
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-ivory)' }}>
                  {loc.address || '18 Place Vendôme, 75001 Paris, France'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', display: 'block', marginBottom: '0.35rem' }}>
                  Accès & Métro
                </span>
                <p style={{ color: 'var(--color-ivory-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {loc.metro || 'Station Tuileries (Ligne 1) ou Madeleine (Lignes 8, 12, 14)'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', display: 'block', marginBottom: '0.35rem' }}>
                  Service Voiturier
                </span>
                <p style={{ color: 'var(--color-ivory-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {loc.valet || 'Service Voiturier Privé disponible tous les soirs dès 18h30'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)', display: 'block', marginBottom: '0.35rem' }}>
                  Téléphone Conciergerie
                </span>
                <p style={{ color: 'var(--color-gold)', fontSize: '1.1rem', fontWeight: 600 }}>
                  {loc.phone || '+33 1 42 68 55 00'}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-taupe)', display: 'block', marginBottom: '0.5rem' }}>
                Horaires d'Ouverture
              </span>
              {(loc.hours || [
                { days: 'Mardi au Samedi', hours: '19h00 – 23h30 (Dîner uniquement)' },
                { days: 'Dimanche & Lundi', hours: 'Fermeture hebdomadaire' },
              ]).map((h, idx) => (
                <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--color-ivory-dim)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>{h.days} :</span>
                  <span style={{ color: 'var(--color-gold)' }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Preview Graphic */}
          <div
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(197, 164, 109, 0.3)',
              position: 'relative',
              minHeight: '400px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
              alt="Paris Place Vendôme"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20, 21, 23, 0.9) 0%, rgba(20, 21, 23, 0.3) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2.5rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  color: '#18120B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  boxShadow: '0 0 20px rgba(197, 164, 109, 0.6)',
                }}
              >
                ✦
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-ivory)', marginBottom: '0.25rem' }}>
                Place Vendôme, Paris Ier
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem' }}>
                Entre la rue Saint-Honoré et l'Opéra Garnier
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
