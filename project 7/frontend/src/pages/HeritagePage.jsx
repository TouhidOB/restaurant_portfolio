import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function HeritagePage() {
  const { content, openReservation } = useCMS();
  const heritage = content?.heritage || {};
  const pillars = heritage.pillars || [];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Page Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {heritage.subtitle || 'Notre Héritage'} • {heritage.badge || 'Depuis 1788'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {heritage.title || "L'Art de Vivre Parisien"}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            Une odyssée gastronomique ancrée dans les fastes des Lumières et renouvelée par l'exigence contemporaine.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Narrative & Dual Imagery */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
              Chroniques d'un Siècle d'Or
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-ivory)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Plus de Deux Siècles de Fastes & de Délices
            </h2>
            <p style={{ color: 'var(--color-taupe)', lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '1rem' }}>
              {heritage.body_paragraph_1 || "Né dans le faste architectural des salons du Siècle des Lumières, L'Étoile Royale perpétue avec vénération l'héritage de la grande table bourgeoise et aristocratique de Paris."}
            </p>
            <p style={{ color: 'var(--color-taupe)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1rem' }}>
              {heritage.body_paragraph_2 || "Aujourd'hui réinventé sous la direction du Chef Alexandre de Morbihan, notre salon concilie le respect scrupuleux des fonds de sauce classiques et la légèreté vivifiante des récoltes maraîchères."}
            </p>

            {heritage.quote && (
              <blockquote style={{ borderLeft: '3px solid var(--color-gold)', paddingLeft: '1.5rem', margin: '1.5rem 0', fontStyle: 'italic', color: 'var(--color-gold-light)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                « {heritage.quote} »
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-taupe)', fontStyle: 'normal', marginTop: '0.5rem' }}>
                  — {heritage.quote_author || 'Chef Alexandre de Morbihan'}
                </span>
              </blockquote>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(197, 164, 109, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <img
                src={heritage.image_main || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'}
                alt="Salons Historiques L'Étoile Royale"
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>
            {heritage.image_detail && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-30px',
                  right: '-20px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '2px solid var(--color-gold)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  display: 'none',
                }}
                className="desktop-only-badge"
              >
                <img
                  src={heritage.image_detail}
                  alt="Détail Gastronomie"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Pillars */}
        {pillars.length > 0 && (
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
                Fondements de la Maison
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-ivory)', marginTop: '0.5rem' }}>
                Les Trois Piliers d'Excellence
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#25262A',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    borderRadius: '8px',
                    padding: '2.2rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ color: 'var(--color-gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>✦</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(84,37,47,0.4) 0%, rgba(32,33,36,0.9) 100%)', borderRadius: '12px', border: '1px solid rgba(197, 164, 109, 0.4)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
            Faites Partie de l'Histoire Royale
          </h3>
          <p style={{ color: 'var(--color-taupe)', maxWidth: '520px', margin: '0 auto 2rem', fontSize: '1rem' }}>
            Prenez place au Grand Salon d'Honneur pour un voyage sensoriel hors du temps.
          </p>
          <button onClick={() => openReservation()} className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}>
            Réserver Votre Table Gastronomique
          </button>
        </div>
      </div>
    </div>
  );
}
