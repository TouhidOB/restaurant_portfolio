import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function S12Testimonials({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-moss)',
        color: '#FFFFFF',
      }}
    >
      <div className="zen-container">
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-rice-paper)' }}>
            <span className="zen-seal" style={{ backgroundColor: 'var(--color-charcoal)' }}>評</span>
            <span>GUEST REFLECTIONS</span>
          </div>

          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', color: '#FFFFFF', marginBottom: '8px' }}>
            Moments Worth Remembering.
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '20px 0 28px', color: 'var(--color-bamboo)' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          <blockquote
            style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: 'var(--color-rice-paper)',
              marginBottom: '32px',
            }}
          >
            "{current.quote}"
          </blockquote>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '17px', fontWeight: 600, color: '#FFFFFF' }}>
              {current.name}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(242, 239, 230, 0.75)', marginTop: '2px' }}>
              {current.role}
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <span style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(242, 239, 230, 0.8)' }}>
              {currentIndex + 1} / {testimonials.length}
            </span>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
