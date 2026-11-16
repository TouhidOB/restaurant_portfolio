import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchCustomPage } from '../services/api';
import { ArrowLeft, Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

export default function CustomPageView({ slug, onNavigate }) {
  const { customPages, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local fallback
    const local = (customPages || []).find((p) => p.slug === slug);
    if (local) {
      setPage(local);
      setLoading(false);
    }

    // 2. Fetch from backend API
    fetchCustomPage(slug)
      .then((data) => {
        if (data && (data.page || data.id)) {
          setPage(data.page || data);
        }
      })
      .catch((err) => console.warn('Could not fetch custom page:', err))
      .finally(() => setLoading(false));
  }, [slug, customPages]);

  if (loading && !page) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#8E8EA0', fontFamily: 'Space Grotesk, sans-serif' }}>Loading Custom Page...</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '140px', textAlign: 'center' }}>
        <h2>Page Not Found</h2>
        <p style={{ color: '#8E8EA0', marginTop: '10px' }}>The standalone page at /page/{slug} does not exist or has been unpublished.</p>
        <button onClick={() => onNavigate && onNavigate('/')} style={{ marginTop: '20px', padding: '10px 24px', background: '#FFDD00', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700 }}>
          Back to Studio Home
        </button>
      </div>
    );
  }

  const blocks = (page.layout_data && page.layout_data.blocks) || [];

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '90px' }}>
      
      {/* Top Breadcrumb Bar */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 24px', background: '#141418' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/'); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#FFDD00', textDecoration: 'none', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}
          >
            <ArrowLeft size={16} /> Home
          </a>
          <span style={{ fontSize: '12px', color: '#8E8EA0', fontFamily: 'JetBrains Mono, monospace' }}>
            STANDALONE ELEMENTOR ROUTE: /page/{page.slug}
          </span>
        </div>
      </div>

      {/* Render Visual Blocks */}
      <div>
        {blocks.map((block, idx) => {
          if (block.type === 'hero') {
            return (
              <section
                key={idx}
                style={{
                  padding: '120px 24px',
                  textAlign: 'center',
                  position: 'relative',
                  backgroundImage: block.background_image ? `linear-gradient(rgba(10, 10, 12, 0.75), rgba(10, 10, 12, 0.95)), url("${block.background_image}")` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 221, 0, 0.15)', border: '1px solid rgba(255, 221, 0, 0.3)', color: '#FFDD00', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>
                    <Sparkles size={13} /> {page.title}
                  </div>
                  <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '20px' }}>
                    {block.headline || page.title}
                  </h1>
                  <p style={{ color: '#8E8EA0', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px' }}>
                    {block.subheadline}
                  </p>
                  <button
                    onClick={() => triggerReservation()}
                    style={{ padding: '14px 36px', background: '#FFDD00', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 0 20px rgba(255, 221, 0, 0.4)' }}
                  >
                    {block.cta_text || 'Book Experience'} &rarr;
                  </button>
                </div>
              </section>
            );
          }

          if (block.type === 'split') {
            return (
              <section key={idx} style={{ padding: '90px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
                  <div style={{ order: block.image_position === 'left' ? 2 : 1 }}>
                    <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>
                      {block.headline}
                    </h2>
                    <p style={{ color: '#8E8EA0', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                      {block.content}
                    </p>
                  </div>
                  <div style={{ order: block.image_position === 'left' ? 1 : 2 }}>
                    <div style={{ height: '360px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <img src={block.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'} alt="Split Block" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          if (block.type === 'features') {
            return (
              <section key={idx} style={{ padding: '90px 24px', background: '#0F1014', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
                    <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
                      {block.headline || 'EXPERIENCE HIGHLIGHTS'}
                    </h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                    {(block.items || []).map((it, i) => (
                      <div key={i} style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '28px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255, 221, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFDD00', fontWeight: 800, marginBottom: '16px' }}>
                          ✓
                        </div>
                        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: 700, color: '#FFF', marginBottom: '8px' }}>
                          {it.title}
                        </h3>
                        <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.6 }}>
                          {it.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          if (block.type === 'cta') {
            return (
              <section key={idx} style={{ padding: '90px 24px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '56px 36px', background: 'rgba(255, 0, 127, 0.06)', border: '1px dashed #FF007F', borderRadius: '8px' }}>
                  <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
                    {block.headline || 'READY TO RESERVE?'}
                  </h2>
                  <p style={{ color: '#8E8EA0', fontSize: '15px', marginBottom: '28px' }}>
                    {block.subheadline}
                  </p>
                  <button
                    onClick={() => triggerReservation()}
                    style={{ padding: '14px 36px', background: '#FF007F', color: '#FFF', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    {block.button_text || 'Reserve Now'} &rarr;
                  </button>
                </div>
              </section>
            );
          }

          if (block.type === 'reservation') {
            return (
              <section key={idx} style={{ padding: '70px 24px', textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ maxWidth: '640px', margin: '0 auto', background: '#141418', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '8px', padding: '36px' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', marginBottom: '8px', color: '#00E5FF' }}>
                    Interactive Table Reservation
                  </h3>
                  <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>
                    Daylight Lunch & Twilight Dinner slots are open.
                  </p>
                  <button
                    onClick={() => triggerReservation()}
                    style={{ padding: '12px 30px', background: '#00E5FF', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    Launch Booking Desk &rarr;
                  </button>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>

    </div>
  );
}
