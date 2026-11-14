import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Preloader() {
  const { content } = useCMS();
  const [elevation, setElevation] = useState(0);
  const [complete, setComplete] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Elevate altitude from 0m to 220m
    const duration = 1200;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 220 / steps;

    const timer = setInterval(() => {
      setElevation((prev) => {
        if (prev + increment >= 220) {
          clearInterval(timer);
          setComplete(true);
          setTimeout(() => setHidden(true), 600);
          return 220;
        }
        return Math.round(prev + increment);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0A121D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
        opacity: complete ? 0 : 1,
        pointerEvents: complete ? 'none' : 'auto',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '420px', padding: '2rem' }}>
        <div style={{
          fontSize: '0.82rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--color-champagne)',
          fontFamily: 'var(--font-accent)',
          marginBottom: '0.5rem',
          fontWeight: 700
        }}>
          ASCENDING TO HORIZON TOWER
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.6rem',
          letterSpacing: '0.15em',
          color: 'var(--color-cloud-ivory)',
          marginBottom: '0.5rem'
        }}>
          {content?.hero?.restaurant_name || 'SKYLINE'}
        </h1>

        {/* Dynamic Elevation Counter */}
        <div style={{
          fontSize: '1.75rem',
          fontFamily: 'var(--font-accent)',
          color: 'var(--color-sunset-copper)',
          fontWeight: 700,
          margin: '1.25rem 0'
        }}>
          {elevation} <span style={{ fontSize: '1rem', color: 'var(--color-twilight-slate)' }}>METERS &bull; LEVEL 54</span>
        </div>

        {/* Linear Progress Indicator */}
        <div style={{
          width: '180px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${(elevation / 220) * 100}%`,
            background: 'linear-gradient(90deg, var(--color-sunset-copper), var(--color-champagne))',
            transition: 'width 0.05s linear'
          }} />
        </div>
      </div>
    </div>
  );
}
