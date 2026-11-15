import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage() {
  const { content, openReservation } = useCMS();
  const chef = content?.chef || {};
  const tags = chef.philosophy_tags || [];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {chef.title || 'Chef Exécutif & Maître Cuisinier de France'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {chef.name || 'Alexandre de Morbihan'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            {chef.experience || 'Deux Étoiles Michelin • Ancien Second de Joël Robuchon & Alain Ducasse'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(197, 164, 109, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={chef.name}
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', fontWeight: 600 }}>
              Philosophie & Trajectoire
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginTop: '0.4rem', marginBottom: '1.5rem' }}>
              La Quête de la Pureté Culinaire
            </h2>
            <p style={{ color: 'var(--color-taupe)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {chef.bio || "Formé auprès des plus éminentes légendes de la cuisine française avant de prendre les rênes de L'Étoile Royale, le Chef Alexandre défend une gastronomie d'émotion pure, où la précision des découpes et la rigueur des réductions célèbrent la richesse inaltérable de nos terroirs."}
            </p>

            {chef.quote && (
              <blockquote style={{ borderLeft: '3px solid var(--color-gold)', paddingLeft: '1.5rem', margin: '2rem 0', fontStyle: 'italic', color: 'var(--color-gold-light)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                « {chef.quote} »
              </blockquote>
            )}

            {tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(84, 37, 47, 0.4)',
                      border: '1px solid rgba(197, 164, 109, 0.3)',
                      color: 'var(--color-gold-light)',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                    }}
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            )}

            <button onClick={() => openReservation('Table Privée du Chef')} className="btn-primary" style={{ padding: '0.9rem 2rem' }}>
              Réserver la Table Privée du Chef
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
