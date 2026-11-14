import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('verdant_preloader_seen');
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setFading(true);
      const dismissTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('verdant_preloader_seen', 'true');
      }, 350);
      return () => clearTimeout(dismissTimer);
    }, 450);

    // Absolute fallback
    const safetyTimer = setTimeout(() => {
      setVisible(false);
    }, 900);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#1A2F25',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.35s ease-out, visibility 0.35s ease-out',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            position: 'relative',
          }}
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="#BC7153"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: '100%',
              height: '100%',
              animation: 'spinPulse 1.8s infinite ease-in-out',
            }}
          >
            <path d="M12 40C12 40 14 24 28 14C34 9 40 8 40 8C40 8 39 14 34 20C24 34 8 36 8 36" />
            <path d="M16 28C22 28 28 22 28 16" />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.75rem',
            letterSpacing: '0.12em',
            color: '#F6F2E9',
            marginBottom: '0.5rem',
            fontWeight: 500,
          }}
        >
          VERDANT
        </h2>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#AAB9A0',
            textTransform: 'uppercase',
          }}
        >
          TROPICAL MODERN DINING
        </p>
      </div>

      <style>{`
        @keyframes spinPulse {
          0% { transform: scale(0.92) rotate(0deg); opacity: 0.7; }
          50% { transform: scale(1.08) rotate(10deg); opacity: 1; }
          100% { transform: scale(0.92) rotate(0deg); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
