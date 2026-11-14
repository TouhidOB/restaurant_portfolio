import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Preloader() {
  const { content, t } = useCMS();
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 1200;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          setComplete(true);
          setTimeout(() => setHidden(true), 600);
          return 100;
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
        backgroundColor: '#192433',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
        opacity: complete ? 0 : 1,
        pointerEvents: complete ? 'none' : 'auto',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '440px', padding: '2rem' }}>
        {/* Heritage Crest */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, var(--color-terracotta) 0%, var(--color-indigo-card) 100%)',
            border: '2px solid var(--color-brass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-ivory)',
            fontFamily: 'var(--font-display-bn)',
            fontSize: '2.2rem',
            fontWeight: 700,
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
          }}
        >
          ঐ
        </div>

        <div style={{
          fontSize: '0.8rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-brass)',
          fontFamily: 'var(--font-body-en)',
          marginBottom: '0.5rem',
          fontWeight: 700
        }}>
          {t(content?.hero?.eyebrow) || 'A TASTE OF BENGAL'}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display-en)',
          fontSize: '2.6rem',
          letterSpacing: '0.08em',
          color: 'var(--color-ivory)',
          marginBottom: '0.4rem',
          textTransform: 'uppercase'
        }}>
          {t(content?.hero?.restaurant_name) || 'BENGAL HERITAGE'}
        </h1>

        <div style={{
          fontFamily: 'var(--font-display-bn)',
          fontSize: '1.25rem',
          color: 'var(--color-jute)',
          marginBottom: '1.5rem',
        }}>
          বাংলার ঐতিহ্যবাহী রন্ধনকলা ও আতিথেয়তা
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '180px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.12)',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--color-terracotta), var(--color-brass))',
            transition: 'width 0.05s linear'
          }} />
        </div>
      </div>
    </div>
  );
}
