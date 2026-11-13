import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Preloader({ onComplete, restaurantName = "AURELIA" }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(100);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete?.();
            }, 800);
          }, 300);
          return 100;
        }
        // Random incremental progress to feel natural and fast
        const increment = Math.floor(Math.random() * 18) + 8;
        return Math.min(100, prev + increment);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#17191A',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        pointerEvents: isFadingOut ? 'none' : 'auto',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Art Deco Symmetrical Geometric Sunburst & Frame */}
      <div
        className="preloader-frame"
        style={{
          position: 'relative',
          padding: '60px 70px',
          border: '1px solid rgba(214, 184, 121, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '90vw',
        }}
      >
        {/* Four Art Deco Corner Accents */}
        <div style={{ position: 'absolute', top: -6, left: -6, width: 14, height: 14, borderTop: '2px solid #D6B879', borderLeft: '2px solid #D6B879' }} />
        <div style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderTop: '2px solid #D6B879', borderRight: '2px solid #D6B879' }} />
        <div style={{ position: 'absolute', bottom: -6, left: -6, width: 14, height: 14, borderBottom: '2px solid #D6B879', borderLeft: '2px solid #D6B879' }} />
        <div style={{ position: 'absolute', bottom: -6, right: -6, width: 14, height: 14, borderBottom: '2px solid #D6B879', borderRight: '2px solid #D6B879' }} />

        {/* Top Sunburst Diamond */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #D6B879)' }} />
          <div style={{ width: 8, height: 8, backgroundColor: '#D6B879', transform: 'rotate(45deg)' }} />
          <span style={{ width: 40, height: 1, background: 'linear-gradient(90deg, #D6B879, transparent)' }} />
        </div>

        {/* Restaurant Logo */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#F3EDE1',
            margin: 0,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          {restaurantName}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#D6B879',
            marginTop: 14,
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          AN EXPERIENCE BEYOND DINING
        </p>

        {/* Progress Bar and Indicator */}
        <div style={{ width: '100%', maxWidth: '280px', marginTop: 10 }}>
          <div
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(214, 184, 121, 0.15)',
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
                width: `${progress}%`,
                backgroundColor: '#D6B879',
                boxShadow: '0 0 10px #D6B879',
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#718C7D',
            }}
          >
            <span>PREPARING YOUR EXPERIENCE</span>
            <span style={{ color: '#D6B879', fontWeight: 600 }}>{String(progress).padStart(2, '0')}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
