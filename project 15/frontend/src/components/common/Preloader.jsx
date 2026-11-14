import React, { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
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
      }, 350);
      return () => clearTimeout(closeTimer);
    }, 450);

    const safetyTimer = setTimeout(() => {
      if (!hasCompleted.current) {
        hasCompleted.current = true;
        setVisible(false);
        sessionStorage.setItem('pop_preloader_seen', 'true');
        if (onComplete) onComplete();
      }
    }, 850);

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
        inset: 0,
        backgroundColor: '#090A0E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s ease',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: fading ? 'none' : 'auto'
      }}
    >
      {/* Sleek Central Brand Badge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 51, 102, 0.1)',
            border: '1px solid rgba(255, 51, 102, 0.3)',
            borderRadius: '999px',
            padding: '8px 20px',
            boxShadow: '0 0 30px rgba(255, 51, 102, 0.25)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 800,
              color: '#FF3366',
              letterSpacing: '1px'
            }}
          >
            POP!
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#CCFF00',
              fontWeight: 700,
              letterSpacing: '1.5px'
            }}
          >
            CULINARY STUDIO
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.5px',
            lineHeight: 1.1
          }}
        >
          EAT OUTSIDE THE LINES.
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px'
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#CCFF00',
              boxShadow: '0 0 10px #CCFF00',
              animation: 'pulseDot 0.8s infinite alternate'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#8E94A5',
              letterSpacing: '1px'
            }}
          >
            INITIALIZING 3D WEBGL STUDIO...
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          from { opacity: 0.4; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
