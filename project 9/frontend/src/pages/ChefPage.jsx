import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage() {
  const { content, openReservation } = useCMS();
  const chef = content?.chef || {};
  const accolades = chef.accolades || [
    '3 Michelin Star Mentorship (Paris & Tokyo)',
    'James Beard Award Nominee: Best Chef',
    'Order of Agricultural Merit Chevalier',
    'Culinary Director of Level 54 Haute Cuisine',
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">Culinary Leadership</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            {chef.name || 'Chef Julian Moreau'}
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {chef.title || 'Executive Chef & Culinary Director'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85'}
                alt={chef.name}
                style={{ width: '100%', height: '460px', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div>
            <span className="section-label" style={{ fontSize: '0.78rem', marginBottom: '0.4rem' }}>
              HAUTE CUISINE AT 220M
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-cloud-ivory)', marginBottom: '1.25rem' }}>
              Culinary Rigor &amp; Oceanic Horizon
            </h2>
            <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {chef.bio || 'Trained across three-Michelin-starred kitchens in Paris, Tokyo, and San Francisco, Chef Julian Moreau brings over two decades of uncompromising mastery to SKYLINE. His cuisine pairs classical French technical rigor with the vibrant, umami-rich philosophies of modern Pacific culinary cultures.'}
            </p>

            {chef.quote && (
              <blockquote
                style={{
                  borderLeft: '3px solid var(--color-champagne)',
                  paddingLeft: '1.5rem',
                  margin: '2rem 0',
                  color: 'var(--color-champagne)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{chef.quote}&rdquo;
              </blockquote>
            )}

            <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ marginTop: '1rem', padding: '0.85rem 2rem' }}>
              Experience The Chef&apos;s Tasting &rarr;
            </button>
          </div>
        </div>

        {/* Accolades & Philosophy Grid */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Distinctions</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-champagne)' }}>
              Honors &amp; Credentials
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {accolades.map((acc, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--color-midnight-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🏆</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-cloud-ivory)', margin: 0 }}>
                  {acc}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
