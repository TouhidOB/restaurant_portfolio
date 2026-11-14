import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFade(true), 300);
          setTimeout(() => onComplete?.(), 900);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-obsidian)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: fade ? 'none' : 'auto'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '420px', padding: '20px' }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--color-champagne)',
          marginBottom: '16px'
        }}>
          NEW YORK CITY • DRY-AGED PRIME HEARTH
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '44px',
          letterSpacing: '4px',
          color: 'var(--color-ivory)',
          fontWeight: 600,
          marginBottom: '28px'
        }}>
          CHARRED <span style={{ color: 'var(--color-bronze)' }}>&</span> PRIME
        </h1>

        {/* Bronze Loading Bar */}
        <div style={{
          width: '100%',
          height: '2px',
          background: 'rgba(148, 115, 79, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '16px'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--color-bronze), var(--color-champagne))',
            transition: 'width 0.1s linear'
          }} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-heading)',
          fontSize: '11px',
          color: 'var(--color-taupe)',
          letterSpacing: '1px'
        }}>
          <span>PREPARING 3D HEARTH</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
}
