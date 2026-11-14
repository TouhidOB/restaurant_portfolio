import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Preloader() {
  const { content } = useCMS();
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const preloaderData = content?.editorial_sections?.s01_preloader || {
    badge: "SEOUL STREET FOOD",
    title: "SEOUL STREET",
    korean_text: "서울포차",
    subtitle: "Hongdae Night Market — Seoul, Korea",
    established: "2020"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHidden(true), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#111316',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? 'none' : 'auto',
      }}
    >
      {/* Neon Sign Inspired Frame */}
      <div
        style={{
          padding: '24px 36px',
          border: '2px solid #FF2E88',
          borderRadius: '12px',
          boxShadow: '0 0 25px rgba(255, 46, 136, 0.4), inset 0 0 15px rgba(255, 46, 136, 0.2)',
          textAlign: 'center',
          marginBottom: '28px',
          backgroundColor: '#1B1D22',
        }}
      >
        <div
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: '1.4rem',
            color: '#21D4E8',
            letterSpacing: '0.15em',
            fontWeight: 800,
            textShadow: '0 0 10px rgba(33, 212, 232, 0.8)',
            marginBottom: '4px',
          }}
        >
          {preloaderData.korean_text}
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '2.2rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: '#F6F4F0',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {preloaderData.title}
        </h1>
      </div>

      <p
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '0.9rem',
          letterSpacing: '0.2em',
          color: '#B6BAC2',
          textTransform: 'uppercase',
          marginBottom: '32px',
        }}
      >
        {preloaderData.subtitle}
      </p>

      {/* Progress Bar with Cyan & Magenta Glow */}
      <div
        style={{
          width: '220px',
          height: '3px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '2px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #21D4E8, #FF2E88)',
            boxShadow: '0 0 12px #FF2E88',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <span
        style={{
          marginTop: '12px',
          fontSize: '12px',
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: '0.12em',
          color: '#FF2E88',
          fontWeight: 700,
        }}
      >
        {progress}%
      </span>
    </div>
  );
}
