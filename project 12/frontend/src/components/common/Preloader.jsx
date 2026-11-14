import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Preloader() {
  const { content } = useCMS();
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const preloaderData = content?.editorial_sections?.s01_preloader || {
    monogram: "VR",
    title: "VILLA RIVIERA",
    subtitle: "Cap-Ferrat, Côte d'Azur",
    established: "1928"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHidden(true), 400);
          return 100;
        }
        return prev + 4;
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#263A48',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? 'none' : 'auto',
      }}
    >
      {/* Arch Crest Graphic */}
      <div style={{ position: 'relative', width: 90, height: 110, marginBottom: 24 }}>
        <svg viewBox="0 0 100 120" fill="none" style={{ width: '100%', height: '100%' }}>
          {/* Outer Limestone Arch Path */}
          <path
            d="M15 110 V50 A35 35 0 0 1 85 50 V110"
            stroke="#E9DFCF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Inner Terracotta Accents */}
          <path
            d="M26 110 V52 A24 24 0 0 1 74 52 V110"
            stroke="#B96F4F"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Monogram */}
          <text
            x="50"
            y="76"
            fill="#F7F3EA"
            fontSize="26"
            fontFamily="'Cormorant Garamond', serif"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="2"
          >
            {preloaderData.monogram}
          </text>
        </svg>
      </div>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2rem',
          letterSpacing: '0.24em',
          color: '#F7F3EA',
          marginBottom: '8px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        {preloaderData.title}
      </h1>

      <p
        style={{
          fontSize: '0.8rem',
          letterSpacing: '0.22em',
          color: '#A9BDB5',
          textTransform: 'uppercase',
          marginBottom: '36px',
        }}
      >
        {preloaderData.subtitle} — Est. {preloaderData.established}
      </p>

      {/* Progress Line */}
      <div
        style={{
          width: '200px',
          height: '2px',
          backgroundColor: 'rgba(233, 223, 207, 0.2)',
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
            backgroundColor: '#B96F4F',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <span
        style={{
          marginTop: '12px',
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: '#C9B99F',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {progress}%
      </span>
    </div>
  );
}
