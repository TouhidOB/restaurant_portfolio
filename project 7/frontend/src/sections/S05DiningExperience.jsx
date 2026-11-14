import React from 'react';

export default function S05DiningExperience() {
  const rituals = [
    {
      step: 'I',
      title: 'Service au Guéridon',
      desc: 'Découpe des pièces nobles et finitions exécutées en salle par le Maître d’Hôtel, ravivant la tradition des grands salons bourgeois.',
    },
    {
      step: 'II',
      title: 'Flambage & Parfums',
      desc: 'Cognac, marc de Bourgogne et chartreuse s’enflamment délicatement à quelques pas de votre table dans un éclat chaleureux.',
    },
    {
      step: 'III',
      title: 'Accords Millimétrés',
      desc: 'Notre Chef Sommelier vous oriente parmi les 3 200 références de la cave, privilégiant tant les premiers crus que les vignerons confidentiels.',
    },
    {
      step: 'IV',
      title: 'Discrétion Absolue',
      desc: 'Tables généreusement espacées, salon insonorisé et respect intransigeant de l’intimité de chacun de nos hôtes.',
    },
  ];

  return (
    <section className="py-section" style={{ backgroundColor: '#202124', borderTop: '1px solid rgba(197, 164, 109, 0.15)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="section-label">Le Cérémonial Français</span>
          <h2 className="section-title">L'Art de la Table en Quatre Temps</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Un ballet silencieux et attentionné où chaque geste de service répond aux codes immuables de l'hospitalité princière.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {rituals.map((r, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#28292D',
                border: '1px solid rgba(197, 164, 109, 0.25)',
                borderRadius: '8px',
                padding: '2.25rem 1.75rem',
                position: 'relative',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.25)';
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '2.5rem',
                  color: 'var(--color-gold)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  opacity: 0.85,
                }}
              >
                {r.step}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                {r.title}
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: '1.65' }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
