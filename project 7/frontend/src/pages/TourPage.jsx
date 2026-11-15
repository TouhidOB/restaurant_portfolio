import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function TourPage() {
  const { content, openReservation } = useCMS();
  const tour = content?.tour || {};
  const viewpoints = tour.viewpoints || [];
  const [selectedVp, setSelectedVp] = useState(viewpoints[0]?.id || 'facade');

  const currentVp = viewpoints.find((v) => v.id === selectedVp) || viewpoints[0];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {tour.subtitle || 'Explorer les Salons Particuliers'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {tour.title || 'Visite Virtuelle Immersive'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            {tour.description || "Parcourez en trois dimensions l'architecture néoclassique et les ambiances tamisées de notre maison."}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Viewpoint Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {viewpoints.map((vp) => (
            <button
              key={vp.id}
              onClick={() => setSelectedVp(vp.id)}
              style={{
                backgroundColor: selectedVp === vp.id ? 'var(--color-burgundy)' : '#25262A',
                border: selectedVp === vp.id ? '1px solid var(--color-gold)' : '1px solid rgba(197, 164, 109, 0.25)',
                color: selectedVp === vp.id ? '#FFF' : 'var(--color-taupe)',
                padding: '0.75rem 1.4rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: selectedVp === vp.id ? 600 : 400,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ color: 'var(--color-gold)', marginRight: '0.5rem', fontWeight: 700 }}>{vp.number}</span>
              {vp.name}
            </button>
          ))}
        </div>

        {/* Selected Viewpoint Display */}
        {currentVp && (
          <div
            style={{
              backgroundColor: '#25262A',
              border: '1px solid rgba(197, 164, 109, 0.35)',
              borderRadius: '12px',
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
              marginBottom: '5rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--color-gold)', fontSize: '1.1rem', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
                PERSPECTIVE {currentVp.number}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginTop: '0.4rem', marginBottom: '1.25rem' }}>
                {currentVp.name}
              </h2>
              <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                {currentVp.description}
              </p>

              {currentVp.details && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--color-gold)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
                    Spécificités & Éléments Remarquables
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {currentVp.details.map((item, idx) => (
                      <li key={idx} style={{ color: 'var(--color-ivory)', fontSize: '0.92rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: 'var(--color-gold)', marginRight: '0.75rem' }}>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button onClick={() => openReservation(currentVp.name)} className="btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                Réserver dans cet Espace
              </button>
            </div>

            <div style={{ background: '#18191B', border: '1px solid rgba(197,164,109,0.3)', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>🏛️</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                Modélisation 3D WebGL
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Caméra positionnée à [{currentVp.cameraPos?.join(', ')}] orientée vers le point d'intérêt [{currentVp.target?.join(', ')}].
              </p>
              <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(197,164,109,0.1)', border: '1px solid rgba(197,164,109,0.3)', borderRadius: '4px', color: 'var(--color-gold-light)', fontSize: '0.82rem' }}>
                Visualiseur interactif actif sur la page d'accueil
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
