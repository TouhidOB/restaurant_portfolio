import React, { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    // Check if user already saw the preloader in this session
    const seen = sessionStorage.getItem('pop_preloader_seen');
    if (seen) {
      setVisible(false);
      if (onComplete && !hasCompleted.current) {
        hasCompleted.current = true;
        onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      setFading(true);
      const closeTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('pop_preloader_seen', 'true');
        if (onComplete && !hasCompleted.current) {
          hasCompleted.current = true;
          onComplete();
        }
      }, 300);
      return () => clearTimeout(closeTimer);
    }, 450);

    // Hard fallback safety dismiss
    const safetyTimer = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        setVisible(false);
        sessionStorage.setItem('pop_preloader_seen', 'true');
        if (onComplete) onComplete();
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#FFD928', // Electric Yellow
        backgroundImage: 'radial-gradient(#171717 15%, transparent 16%)',
        backgroundSize: '24px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      {/* Central Pop Comic Badge */}
      <div
        style={{
          backgroundColor: '#F04438',
          border: '4px solid #171717',
          borderRadius: '24px',
          padding: '36px 54px',
          boxShadow: '10px 10px 0px #171717',
          textAlign: 'center',
          transform: 'rotate(-3deg)',
          animation: 'popBounce 0.6s infinite alternate ease-in-out'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#FFFFFF',
            textShadow: '4px 4px 0 #171717',
            letterSpacing: '2px',
            lineHeight: 1
          }}
        >
          POP!
        </div>
        <div
          style={{
            fontFamily: 'var(--font-headline)',
            fontSize: '1.25rem',
            color: '#FFD928',
            marginTop: '8px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontWeight: 800
          }}
        >
          FOOD STUDIO
        </div>
        <div
          style={{
            marginTop: '16px',
            display: 'inline-block',
            backgroundColor: '#171717',
            color: '#FFF5E6',
            padding: '6px 16px',
            borderRadius: '999px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            fontWeight: 700
          }}
        >
          LOADING FLAVORS...
        </div>
      </div>

      <style>{`
        @keyframes popBounce {
          from { transform: rotate(-3deg) translateY(0px); }
          to { transform: rotate(-1deg) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
