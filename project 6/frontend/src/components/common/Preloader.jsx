import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('stardust_preloader_seen');
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setFading(true);
      const dismissTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('stardust_preloader_seen', 'true');
      }, 350);
      return () => clearTimeout(dismissTimer);
    }, 450);

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
        backgroundColor: '#090F1B',
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
            width: '68px',
            height: '68px',
            margin: '0 auto 1.5rem',
            position: 'relative',
          }}
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="#43D9E8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: '100%',
              height: '100%',
              animation: 'starPulse 1.6s infinite ease-in-out',
            }}
          >
            {/* 8-pointed Atomic Starburst */}
            <path d="M24 2L28 16L42 20L30 28L34 42L24 32L14 42L18 28L6 20L20 16Z" fill="#D83A45" stroke="#43D9E8" />
            <circle cx="24" cy="24" r="4" fill="#F2C94C" />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.85rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#FFFFFF',
            marginBottom: '0.4rem',
            textShadow: '0 0 16px rgba(67, 217, 232, 0.4)',
          }}
        >
          STARDUST DINER
        </h2>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            color: '#43D9E8',
            textTransform: 'uppercase',
          }}
        >
          RETRO-FUTURISTIC DINING // EST. 1955
        </p>
      </div>

      <style>{`
        @keyframes starPulse {
          0% { transform: scale(0.9) rotate(0deg); opacity: 0.7; }
          50% { transform: scale(1.1) rotate(15deg); opacity: 1; filter: drop-shadow(0 0 12px #43D9E8); }
          100% { transform: scale(0.9) rotate(0deg); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
