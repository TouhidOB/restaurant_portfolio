import React, { useState, useEffect, useRef } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    // Check if seen during this session
    return !sessionStorage.getItem('monolith_preloader_seen');
  });
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    // Fast 380ms load sequence with 750ms safety fallback
    timerRef.current = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('monolith_preloader_seen', 'true');
      }, 250);
    }, 380);

    const safetyDismiss = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('monolith_preloader_seen', 'true');
    }, 750);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(safetyDismiss);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#20211F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.25s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '-0.04em',
            color: '#F1F0EA',
            marginBottom: '0.75rem',
          }}
        >
          MONOLITH
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            color: '#F05A28',
            marginBottom: '1.5rem',
          }}
        >
          ARCHITECTURAL BRUTALISM // SECTOR 09
        </div>
        
        {/* Minimalist Brutalist Progress Bar */}
        <div
          style={{
            width: '180px',
            height: '2px',
            background: '#353632',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              background: '#F05A28',
              animation: 'loadProgress 0.4s ease-out forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loadProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
