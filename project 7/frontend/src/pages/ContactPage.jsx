import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage() {
  const { content, openReservation } = useCMS();
  const loc = content?.location || {};
  const hours = loc.hours || [];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {loc.subtitle || 'Au Cœur du Paris Historique'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {loc.title || 'Situation & Accès'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            {loc.address || '18 Place Vendôme, 75001 Paris, France'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          {/* Coordinates & Logistics */}
          <div style={{ backgroundColor: '#25262A', border: '1px solid rgba(197, 164, 109, 0.3)', borderRadius: '10px', padding: '2.5rem' }}>
            <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
              Conciergerie Privée
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-ivory)', marginTop: '0.4rem', marginBottom: '1.5rem' }}>
              Coordonnées Directes
            </h3>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--color-taupe)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                Adresse Postale
              </span>
              <p style={{ color: 'var(--color-ivory)', fontSize: '1rem', margin: 0 }}>
                {loc.address || '18 Place Vendôme, 75001 Paris, France'}
              </p>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--color-taupe)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                Ligne Directe Conciergerie
              </span>
              <a href={`tel:${loc.phone}`} style={{ color: 'var(--color-gold-light)', fontSize: '1.1rem', textDecoration: 'none', fontWeight: 600 }}>
                {loc.phone || '+33 1 42 68 55 00'}
              </a>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--color-taupe)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                Courriel Officiel
              </span>
              <a href={`mailto:${loc.email}`} style={{ color: 'var(--color-gold-light)', fontSize: '1rem', textDecoration: 'none' }}>
                {loc.email || 'concierge@letoileroyale-paris.fr'}
              </a>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--color-taupe)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                Accès Métro & Transports
              </span>
              <p style={{ color: 'var(--color-ivory)', fontSize: '0.92rem', margin: 0 }}>
                {loc.metro || 'Station Tuileries (Ligne 1) ou Madeleine (Lignes 8, 12, 14)'}
              </p>
            </div>

            <div>
              <span style={{ color: 'var(--color-taupe)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.25rem' }}>
                Service Voiturier
              </span>
              <p style={{ color: 'var(--color-ivory)', fontSize: '0.92rem', margin: 0 }}>
                {loc.valet || 'Service Voiturier Privé disponible tous les soirs dès 18h30'}
              </p>
            </div>
          </div>

          {/* Service Hours & Booking CTA */}
          <div style={{ backgroundColor: '#25262A', border: '1px solid rgba(197, 164, 109, 0.3)', borderRadius: '10px', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
              Horaires de Service
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-ivory)', marginTop: '0.4rem', marginBottom: '1.5rem' }}>
              Les Services du Salon
            </h3>

            <div style={{ marginBottom: '2rem' }}>
              {Array.isArray(hours) ? (
                hours.map((h, idx) => (
                  <div key={idx} style={{ padding: '0.85rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ color: 'var(--color-gold)', fontWeight: 600, fontSize: '0.92rem' }}>{h.days || h.day}</div>
                    <div style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', marginTop: '0.2rem' }}>{h.hours || h.time}</div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '0.85rem 0', color: 'var(--color-gold)' }}>
                  {typeof hours === 'string' ? hours : 'Mardi au Samedi : 19h00 – 23h30 (Dîner uniquement)'}
                </div>
              )}
            </div>

            <div style={{ marginTop: 'auto' }}>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Pour toute demande relative aux privatisations ou allergies sévères, notre Maître d’Hôtel se tient à votre entière écoute.
              </p>
              <button onClick={() => openReservation()} className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Réserver en Conciergerie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
