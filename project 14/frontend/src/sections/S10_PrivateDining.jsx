import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Users, DollarSign, ArrowRight } from 'lucide-react';

export default function S10_PrivateDining() {
  const { data, openReservation } = useCMS();
  const experiences = data?.experiences || [];

  return (
    <section id="private-dining" style={{ backgroundColor: 'var(--color-obsidian)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
          <div className="section-eyebrow">
            EXCLUSIVE CELEBRATIONS & EXECUTIVE SALONS
          </div>
          <h2 className="section-title">
            Private Dining & Experiences
          </h2>
          <p className="section-desc">
            Discreet architectural spaces tailored for milestone celebrations, board dinners, and intimate multi-course culinary tastings.
          </p>
        </div>

        {/* 3 Experience Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              style={{
                background: 'var(--color-charcoal)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={exp.image_url}
                  alt={exp.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(28,27,25,0.9) 0%, transparent 50%)'
                }} />
              </div>

              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    fontSize: '12px',
                    color: 'var(--color-champagne)',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} /> {exp.capacity}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '26px',
                    color: 'var(--color-ivory)',
                    marginBottom: '8px'
                  }}>
                    {exp.title}
                  </h3>

                  <div style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-bronze)',
                    letterSpacing: '0.8px',
                    marginBottom: '12px'
                  }}>
                    {exp.tagline}
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-taupe)',
                    lineHeight: '1.7',
                    marginBottom: '20px'
                  }}>
                    {exp.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '14px' }}>
                    Guide: <strong style={{ color: 'var(--color-ivory)' }}>{exp.price_guide}</strong>
                  </div>
                  <button
                    onClick={() => openReservation(exp.title)}
                    className="btn-prime"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Inquire For This Salon
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
