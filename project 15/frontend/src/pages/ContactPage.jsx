import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Sparkles, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage({ onNavigate }) {
  const { data } = useCMS();
  const config = data.config || {};
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(0, 229, 255, 0.12)', border: '1px solid rgba(0, 229, 255, 0.3)', color: '#00E5FF', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
            <MapPin size={13} /> CHAPTER 09 // ARRIVAL & CONCIERGE
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
            STUDIO LOCATION & ARRIVAL.
          </h1>
          <p style={{ color: '#8E8EA0', fontSize: '16px', lineHeight: 1.6 }}>
            Located in the heart of the Arts District, steps from street murals, galleries, and parking structures.
          </p>
        </div>

        {/* 2-Column Details & Contact Form */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', marginBottom: '60px' }}>
          
          {/* Logistics Card */}
          <div style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '36px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFDD00', marginBottom: '24px' }}>
              Studio Logistics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <MapPin size={20} color="#FFDD00" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8E8EA0', letterSpacing: '1px', fontWeight: 700 }}>Studio Address</div>
                  <div style={{ fontSize: '14px', color: '#FFF', marginTop: '2px' }}>
                    {config.address || '742 Evergreen Pop Boulevard, Arts District, Studio City, CA 90210'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Phone size={20} color="#FF007F" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8E8EA0', letterSpacing: '1px', fontWeight: 700 }}>Concierge Line</div>
                  <div style={{ fontSize: '14px', color: '#FFF', marginTop: '2px' }}>
                    {config.phone || '+1 (555) 767-3663'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Mail size={20} color="#00E5FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8E8EA0', letterSpacing: '1px', fontWeight: 700 }}>Inquiries</div>
                  <div style={{ fontSize: '14px', color: '#FFF', marginTop: '2px' }}>
                    {config.email || 'hello@popfoodstudio.com'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <Clock size={20} color="#48bb78" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#8E8EA0', letterSpacing: '1px', fontWeight: 700 }}>Service Hours</div>
                  <div style={{ fontSize: '13px', color: '#FFF', marginTop: '2px', lineHeight: 1.5 }}>
                    MON-THU: 11:30 AM – 10:30 PM<br />
                    FRI: 11:30 AM – 12:00 Midnight<br />
                    SAT: 10:30 AM – 12:00 Midnight<br />
                    SUN: 10:30 AM – 10:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div style={{ background: '#141418', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '36px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFF', marginBottom: '16px' }}>
              Send Direct Message
            </h3>

            {sent ? (
              <div style={{ padding: '30px 20px', textAlign: 'center', background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #48bb78', borderRadius: '6px' }}>
                <Sparkles size={32} color="#48bb78" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', color: '#FFF' }}>Message Delivered!</h4>
                <p style={{ color: '#8E8EA0', fontSize: '13px', marginTop: '6px' }}>Our studio concierge will respond within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Your Name *</label>
                  <input type="text" required placeholder="Andy Warhol" style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Your Email *</label>
                  <input type="email" required placeholder="andy@domain.com" style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#8E8EA0', marginBottom: '6px', fontWeight: 700 }}>Message</label>
                  <textarea rows="4" required placeholder="How can we assist your visit or event?" style={{ width: '100%', padding: '10px 12px', background: '#1E1E24', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', color: '#FFF', outline: 'none' }}></textarea>
                </div>
                <button type="submit" style={{ padding: '12px', background: '#00E5FF', color: '#000', border: 'none', borderRadius: '4px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Send Message &rarr;
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
