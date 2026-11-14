import React, { useState, useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const finishedRef = useRef(false);

  const handleFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFade(true);
    try {
      sessionStorage.setItem('visited_charred_prime', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete?.();
    }, 250);
  };

  useEffect(() => {
    // If already visited this session, complete immediately
    try {
      if (sessionStorage.getItem('visited_charred_prime')) {
        handleFinish();
        return;
      }
    } catch (e) {}

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 30) + 25;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(handleFinish, 80);
      } else {
        setProgress(current);
      }
    }, 20);

    // Guaranteed fallback dismiss after 600ms
    const safety = setTimeout(() => {
      setProgress(100);
      handleFinish();
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      id="preloader-container"
      onClick={handleFinish}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#101010',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fade ? 0 : 1,
        transition: 'opacity 0.25s ease-out',
        pointerEvents: fade ? 'none' : 'auto',
        cursor: 'pointer'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '420px', padding: '24px' }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#C4A878',
          marginBottom: '14px'
        }}>
          NEW YORK CITY • DRY-AGED PRIME HEARTH
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '44px',
          letterSpacing: '3px',
          color: '#EDE5D8',
          fontWeight: 600,
          marginBottom: '20px'
        }}>
          CHARRED <span style={{ color: '#94734F' }}>&</span> PRIME
        </h1>

        {/* Bronze Loading Bar */}
        <div style={{
          width: '100%',
          height: '2px',
          background: 'rgba(148, 115, 79, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '14px'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #94734F, #C4A878)',
            transition: 'width 0.08s ease-out'
          }} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          color: '#A59A8C',
          letterSpacing: '1px',
          marginBottom: '16px'
        }}>
          <span>PREPARING 3D HEARTH</span>
          <span>{progress}%</span>
        </div>

        <div style={{ fontSize: '11px', color: '#94734F', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Click anywhere to enter &rarr;
        </div>
      </div>
    </div>
  );
}
