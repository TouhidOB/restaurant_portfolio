import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFading(true);
            setTimeout(() => setVisible(false), 500);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#111314',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '2px',
          border: '2px solid #B87345',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#B87345',
          fontSize: '1.6rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          marginBottom: '1.25rem',
          boxShadow: '0 0 25px rgba(184, 115, 69, 0.3)',
        }}
      >
        UT
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.2rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#F1EEE7',
          fontWeight: 700,
          marginBottom: '0.2rem',
        }}
      >
        URBAN TABLE
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: '#B87345',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: '2rem',
        }}
      >
        Urban Kitchen • Craft Smokehouse • Open Fire
      </p>

      {/* Industrial Progress Bar & Number */}
      <div style={{ width: '220px', textAlign: 'center' }}>
        <div
          style={{
            height: '3px',
            background: 'rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '1px',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #914D37, #B87345)',
              transition: 'width 0.15s ease',
            }}
          />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: '#B7B4AC',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          {Math.min(progress, 100)}%
        </div>
      </div>
    </div>
  );
}
