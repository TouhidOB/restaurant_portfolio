import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 600);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#202124',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '1.5px solid #C5A46D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C5A46D',
          fontSize: '1.8rem',
          fontFamily: 'var(--font-display)',
          marginBottom: '1.25rem',
          boxShadow: '0 0 30px rgba(197, 164, 109, 0.25)',
        }}
      >
        ✦
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#F5F0E7',
          fontWeight: 600,
          marginBottom: '0.4rem',
        }}
      >
        L'Étoile Royale
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-editorial)',
          color: '#C5A46D',
          fontSize: '1rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1.75rem',
        }}
      >
        Salon Gastronomique • Paris Place Vendôme
      </p>

      {/* Elegant Shimmer Progress Line */}
      <div
        style={{
          width: '180px',
          height: '2px',
          background: 'rgba(197, 164, 109, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '2px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '50%',
            background: 'linear-gradient(90deg, transparent, #C5A46D, transparent)',
            animation: 'shimmer 1.4s infinite ease-in-out',
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
