import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Preloader({ onComplete }) {
  const { content } = useCMS();
  const preloader = content?.preloader || {};
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  const symbol = preloader.symbol || '🌿';
  const title = preloader.title || 'VERDANT ATRIUM';
  const subtitle = preloader.subtitle || 'Botanical Glasshouse Sanctuary • Est. 2024';

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setFading(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 15;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#1A2B24',
        color: '#F4F0E6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease-out',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Botanical Crest */}
      <div
        style={{
          width: '74px',
          height: '74px',
          borderRadius: '50%',
          border: '1px solid rgba(166, 181, 160, 0.4)',
          backgroundColor: 'rgba(38, 63, 53, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          marginBottom: '20px',
          boxShadow: '0 0 35px rgba(166, 181, 160, 0.25)',
          animation: 'botanicalBreeze 3s infinite ease-in-out',
        }}
      >
        {symbol}
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: '#FAF7F0',
          margin: '0 0 6px 0',
        }}
      >
        {title}
      </h1>

      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#A6B5A0',
          marginBottom: '32px',
        }}
      >
        {subtitle}
      </p>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '180px',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '1px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress}%`,
            backgroundColor: '#A87958',
            transition: 'width 0.1s ease-out',
          }}
        />
      </div>

      <div
        style={{
          marginTop: '12px',
          fontSize: '11px',
          fontFamily: 'monospace',
          color: 'rgba(244, 240, 230, 0.5)',
          letterSpacing: '0.1em',
        }}
      >
        {progress}%
      </div>
    </div>
  );
}
