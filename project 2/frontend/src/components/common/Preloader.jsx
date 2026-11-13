import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'var(--color-rice-paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Enso Brushstroke Circle */}
      <div
        style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          border: '3px solid var(--color-charcoal)',
          borderTopColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(25deg)',
          marginBottom: '20px',
        }}
      >
        <span
          className="font-jp"
          style={{
            transform: 'rotate(-25deg)',
            fontSize: '24px',
            color: 'var(--color-vermilion)',
            fontWeight: 600,
          }}
        >
          相
        </span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          letterSpacing: '0.18em',
          color: 'var(--color-charcoal)',
          marginBottom: '6px',
        }}
      >
        ENSO 圓相
      </h1>

      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--color-moss)',
          marginBottom: '28px',
        }}
      >
        AN EXPERIENCE OF MINDFUL DINING
      </p>

      {/* Minimal Loading Bar */}
      <div
        style={{
          width: '160px',
          height: '2px',
          backgroundColor: 'rgba(32, 35, 33, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress}%`,
            backgroundColor: 'var(--color-bamboo)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--color-stone)' }}>
        {progress}%
      </div>

      <button
        onClick={() => {
          setFadeOut(true);
          setTimeout(() => onComplete(), 300);
        }}
        style={{
          marginTop: '28px',
          background: 'none',
          border: 'none',
          color: 'var(--color-stone)',
          fontSize: '10px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        SKIP INTRODUCTION &rarr;
      </button>
    </div>
  );
}
