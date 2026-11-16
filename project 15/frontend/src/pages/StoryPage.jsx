import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, Flame, Eye } from 'lucide-react';

export default function StoryPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const config = data.config || {};

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Navigation back */}
        <div style={{ marginBottom: '32px' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/'); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFDD00',
              textDecoration: 'none',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <ArrowLeft size={16} /> Back to Studio Home
          </a>
        </div>

        {/* Hero Tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 221, 0, 0.12)', border: '1px solid rgba(255, 221, 0, 0.3)', color: '#FFDD00', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>
          <Sparkles size={13} /> CHAPTER 01 // ORIGINS & MANIFESTO
        </div>

        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '24px' }}>
          WE SHATTER THE BEIGE BOREDOM OF MODERN DINING.
        </h1>

        <p style={{ fontSize: '18px', color: '#8E8EA0', lineHeight: 1.7, maxWidth: '820px', marginBottom: '48px' }}>
          POP! Food Studio was created at the intersection of 1960s pop-art rebellion and rigorous contemporary culinary craftsmanship. We believe food should release dopamine, surprise the senses, and celebrate bold primary colors.
        </p>

        {/* Split Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '60px' }}>
          <div style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '36px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'rgba(255, 221, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFDD00', marginBottom: '20px' }}>
              <Flame size={20} />
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
              The Food Laboratory
            </h3>
            <p style={{ color: '#8E8EA0', fontSize: '14px', lineHeight: 1.6 }}>
              Every sauce is concocted from scratch in small daily batches. Our signature comic-boom brioche buns are proofed and baked at 5:00 AM every morning. We dry-age our smash beef patties for 45 days, locking in unmatched Maillard crispness.
            </p>
          </div>

          <div style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '36px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'rgba(255, 0, 127, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF007F', marginBottom: '20px' }}>
              <Eye size={20} />
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
              Pop-Art Comic Strip Immersion
            </h3>
            <p style={{ color: '#8E8EA0', fontSize: '14px', lineHeight: 1.6 }}>
              From custom screen-printed dining booths to 45 sculptural neon fixtures, our Arts District space is designed like an exploded graphic novel. Dining is a theatrical spectacle where high flavor meets unapologetic artistic optimism.
            </p>
          </div>
        </div>

        {/* Visual Banner */}
        <div style={{ height: '380px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '60px' }} />

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '48px', background: 'rgba(255, 221, 0, 0.05)', border: '1px dashed #FFDD00', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', marginBottom: '12px' }}>Experience The Studio In Person</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '24px' }}>Reserve your booth or lab counter seat under the neon lights.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '14px 32px', background: '#FFDD00', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table Now &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
