import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09ExecutiveChef() {
  const { content } = useCMS();
  const chef = content?.chef || {};

  return (
    <section id="chef" className="py-section" style={{ backgroundColor: '#202124', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4.5rem', alignItems: 'center' }}>
          {/* Left: Chef Portrait with Gilded Trim */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(197, 164, 109, 0.4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={chef.name || 'Chef Alexandre de Morbihan'}
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Signature Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                background: 'rgba(84, 37, 47, 0.92)',
                border: '1px solid var(--color-gold)',
                padding: '0.6rem 1.25rem',
                borderRadius: '4px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-editorial)', color: 'var(--color-gold-light)', fontSize: '0.95rem' }}>
                Maître Cuisinier de France
              </div>
            </div>
          </div>

          {/* Right: Biography & Culinary Philosophy */}
          <div>
            <span className="section-label">Haute Cuisine d'Auteur</span>
            <h2 className="section-title">{chef.name || 'Chef Alexandre de Morbihan'}</h2>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.2rem',
                color: 'var(--color-gold)',
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}
            >
              {chef.title || 'Chef Exécutif & Deux Étoiles Michelin'}
            </div>

            <p style={{ color: 'var(--color-ivory-dim)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {chef.bio}
            </p>

            {chef.quote && (
              <blockquote
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: '1.25rem',
                  color: 'var(--color-ivory)',
                  borderLeft: '2px solid var(--color-gold)',
                  paddingLeft: '1.5rem',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                }}
              >
                « {chef.quote} »
              </blockquote>
            )}

            {/* Philosophy Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {(chef.philosophy_tags || ['Cuisine d’Auteur', 'Terroirs Préservés', 'Saisonnalité Stricte', 'Sauces Nobles']).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(197, 164, 109, 0.12)',
                    border: '1px solid rgba(197, 164, 109, 0.3)',
                    color: 'var(--color-gold-light)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
