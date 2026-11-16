import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, Users } from 'lucide-react';

export default function TeamPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));
  const team = data.team || [];

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
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

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(255, 221, 0, 0.12)', border: '1px solid rgba(255, 221, 0, 0.3)', color: '#FFDD00', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <Users size={13} /> CHAPTER 07 // CULINARY BRIGADE
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            THE MINDS BEHIND THE POP.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            Meet our team of chefs, bread artisans, and molecular cocktail creators merging street comfort with Michelin-trained kitchen discipline.
          </p>
        </div>

        {/* Team Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          {team.map((member, idx) => (
            <div
              key={member.id || idx}
              style={{
                background: '#141418',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '260px', position: 'relative' }}>
                <img
                  src={member.image_url || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#FFDD00', fontWeight: 800, marginBottom: '4px' }}>
                  {member.role}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFF', marginBottom: '12px' }}>
                  {member.name}
                </h3>
                <p style={{ color: '#8E8EA0', fontSize: '13px', lineHeight: 1.6, flex: 1, marginBottom: '16px' }}>
                  {member.bio}
                </p>
                {member.quote && (
                  <div style={{ borderLeft: '2px solid #FF007F', paddingLeft: '12px', fontSize: '12px', color: '#FFF', fontStyle: 'italic' }}>
                    "{member.quote}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reserve CTA */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 221, 0, 0.05)', border: '1px dashed #FFDD00', borderRadius: '8px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', marginBottom: '8px' }}>Dine With Our Brigade Tonight</h2>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>Book your dining table or private event celebration.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '12px 28px', background: '#FFDD00', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table Now &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
