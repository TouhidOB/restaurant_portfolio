import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer() {
  const { content, openReservation } = useCMS();
  const loc = content?.location || {};
  const brandName = content?.hero?.restaurant_name || "L'ÉTOILE ROYALE";

  return (
    <footer
      style={{
        backgroundColor: '#18191B',
        borderTop: '1px solid rgba(197, 164, 109, 0.25)',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        position: 'relative',
        color: 'var(--color-taupe)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Column 1: Brand & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-burgundy) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontSize: '1rem',
                  border: '1px solid var(--color-gold)',
                }}
              >
                ✦
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ivory)',
                }}
              >
                {brandName}
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Salon Gastronomique et Bar à Champagne dans la pure tradition des hôtels particuliers de la Place Vendôme. Étoilé Michelin 2026.
            </p>
            <button
              onClick={() => openReservation()}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.65rem 1.4rem' }}
            >
              Réserver Votre Table
            </button>
          </div>

          {/* Column 2: Navigation Dédiée */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-editorial)',
                color: 'var(--color-gold)',
                fontSize: '1.15rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Pages du Salon
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <a href="/story" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/story'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--color-taupe)', textDecoration: 'none' }}>
                  Héritage & Histoire 1788
                </a>
              </li>
              <li>
                <a href="/signatures" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/signatures'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--color-taupe)', textDecoration: 'none' }}>
                  Créations Emblématiques
                </a>
              </li>
              <li>
                <a href="/menu" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/menu'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--color-taupe)', textDecoration: 'none' }}>
                  La Carte & Menus Dégustation
                </a>
              </li>
              <li>
                <a href="/tour" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/tour'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--color-taupe)', textDecoration: 'none' }}>
                  Visite Virtuelle Immersive
                </a>
              </li>
              <li>
                <a href="/chef" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/chef'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--color-taupe)', textDecoration: 'none' }}>
                  Chef Alexandre de Morbihan
                </a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/blog'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--color-gold-light)', textDecoration: 'none', fontWeight: 500 }}>
                  ✦ La Gazette Royale (Journal)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-editorial)',
                color: 'var(--color-gold)',
                fontSize: '1.15rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Conciergerie
            </h4>
            <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <p>{loc.address || '18 Place Vendôme, 75001 Paris'}</p>
              <p>Tél : <a href={`tel:${loc.phone}`} style={{ color: 'var(--color-ivory)', textDecoration: 'none' }}>{loc.phone || '+33 1 42 68 55 00'}</a></p>
              <p>Email : <a href={`mailto:${loc.email}`} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>{loc.email || 'reservations@letoileroyale-paris.fr'}</a></p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--color-ivory-dim)' }}>
                Service de Voiturier Privé sur la Place Vendôme.
              </p>
            </div>
          </div>

          {/* Column 4: CMS Admin & Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-editorial)',
                color: 'var(--color-gold)',
                fontSize: '1.15rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Administration
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li>
                <a
                  href="http://127.0.0.1:8001/cms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-gold)', textDecoration: 'none', fontWeight: 600 }}
                >
                  ⚙ Studio CMS Django (Port 8001) ↗
                </a>
              </li>
              <li>
                <a
                  href="http://127.0.0.1:8001/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-taupe)', textDecoration: 'none' }}
                >
                  Django SuperAdmin ↗
                </a>
              </li>
              <li>
                <a
                  href="http://127.0.0.1:8001/api/content/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-taupe)', textDecoration: 'none' }}
                >
                  API REST Publique (/api/content/) ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} {brandName}. Tous droits réservés. L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Architecture Découplée: React 18 + Three.js + Django 5 DRF</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
