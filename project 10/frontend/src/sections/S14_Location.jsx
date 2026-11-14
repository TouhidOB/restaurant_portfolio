import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S14_Location() {
  const { content, t, lang } = useCMS();
  const loc = content?.location || {};

  const subtitle = t(loc.subtitle) || 'Heritage Quarter & Coordinates';
  const title = t(loc.title) || 'Location, Hours & Directions';
  const address = t(loc.address) || 'House 14, Road 71, Gulshan Heritage Enclave, Dhaka 1212, Bangladesh';
  const hours = t(loc.hours) || 'Daily: 12:00 PM – 11:30 PM';
  const arrival = t(loc.arrival_notes) || 'Complimentary valet parking available.';
  const coordinates = loc.coordinates || '23.7925° N, 90.4078° E • Gulshan Lakefront';
  const phone = loc.phone || '+880 1711-234567';
  const whatsapp = loc.whatsapp || '+880 1711-234567';
  const email = loc.email || 'hospitality@bengalheritage.com';

  return (
    <section
      id="location"
      aria-label="Location and Hours"
      style={{
        padding: '120px 0',
        backgroundColor: '#1E2838',
        color: '#F4EBDD',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-brass, #B18A54)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>

        {/* 2-Column Info & Enclave Map Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'stretch',
          }}
        >
          {/* Contact Details Card */}
          <div
            style={{
              backgroundColor: '#161F2C',
              padding: '40px 36px',
              borderRadius: '3px',
              border: '1px solid rgba(177, 138, 84, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Address */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass, #B18A54)',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {lang === 'bn' ? 'ঠিকানা ও অবস্থান' : 'Address & Sanctuary'}
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#F4EBDD', margin: 0 }}>
                {address}
              </p>
              <div style={{ fontSize: '12px', color: 'rgba(244, 235, 221, 0.65)', marginTop: '4px' }}>
                {coordinates}
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass, #B18A54)',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {lang === 'bn' ? 'পরিবেশনের সময়সূচি' : 'Dining Hours'}
              </div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#F4EBDD', margin: 0 }}>
                {hours}
              </p>
            </div>

            {/* Valet & Arrival */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass, #B18A54)',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {lang === 'bn' ? 'ভ্যালেট পার্কিং ও আগমন' : 'Valet Concierge'}
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(244, 235, 221, 0.85)', margin: 0 }}>
                {arrival}
              </p>
            </div>

            {/* Direct Connect Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(177, 138, 84, 0.2)' }}>
              <a
                href={`tel:${phone}`}
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '12px 18px',
                  backgroundColor: 'var(--color-terracotta, #A6533B)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                📞 {lang === 'bn' ? 'কল করুন' : 'Call Desk'}
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '12px 18px',
                  backgroundColor: 'rgba(83, 107, 80, 0.3)',
                  border: '1px solid var(--color-leaf, #536B50)',
                  color: '#F4EBDD',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Architectural Map & Enclave Visual */}
          <div
            style={{
              backgroundColor: '#161F2C',
              borderRadius: '3px',
              border: '1px solid rgba(177, 138, 84, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              minHeight: '380px',
            }}
          >
            {/* Styled Map Representation */}
            <div
              style={{
                flex: 1,
                background: 'radial-gradient(circle at 50% 50%, #2b394e 0%, #17202d 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Center Beacon Pin */}
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(166, 83, 59, 0.25)',
                  border: '2px solid var(--color-terracotta, #A6533B)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-brass, #B18A54)',
                  fontSize: '28px',
                  marginBottom: '16px',
                  boxShadow: '0 0 35px rgba(166, 83, 59, 0.4)',
                }}
              >
                ঐ
              </div>

              <div
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                  fontSize: '22px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {lang === 'bn' ? 'গুলশান হেরিটেজ এনক্লেভ' : 'Gulshan Heritage Enclave'}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--color-brass, #B18A54)',
                  letterSpacing: '0.08em',
                  marginBottom: '24px',
                }}
              >
                {coordinates}
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  backgroundColor: 'rgba(177, 138, 84, 0.2)',
                  border: '1px solid rgba(177, 138, 84, 0.5)',
                  borderRadius: '2px',
                  color: '#F4EBDD',
                  textDecoration: 'none',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(177, 138, 84, 0.35)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(177, 138, 84, 0.2)')}
              >
                🗺️ {lang === 'bn' ? 'গুগল ম্যাপে দেখুন' : 'Open in Google Maps'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
