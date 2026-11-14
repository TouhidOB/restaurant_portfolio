import React, { useState, useEffect, useRef } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('med_preloader_seen');
  });
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const safetyRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    // Normal fast reveal (400ms)
    timerRef.current = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('med_preloader_seen', 'true');
      }, 300);
    }, 400);

    // Hard safety dismiss (750ms max)
    safetyRef.current = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('med_preloader_seen', 'true');
    }, 750);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyRef.current) clearTimeout(safetyRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#FAF9F5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease-out',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          border: '1px solid #C8B69B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          background: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(23, 74, 99, 0.08)',
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '26px',
            fontWeight: 700,
            color: '#174A63',
            letterSpacing: '0.05em',
          }}
        >
          AM
        </span>
      </div>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '28px',
          fontWeight: 600,
          color: '#174A63',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        Aura Marina
      </h1>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#367E94',
        }}
      >
        Positano • Mediterranean Riviera
      </p>

      {/* Elegant minimalist progress line */}
      <div
        style={{
          width: 140,
          height: 2,
          backgroundColor: '#E8D9C2',
          marginTop: 24,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#174A63',
            animation: 'loadProgress 0.4s ease-out forwards',
          }}
        />
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
