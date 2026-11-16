import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage() {
  const { content, lang, t, openReservation } = useCMS();
  const loc = content?.location || {};
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const hoursString = typeof loc.hours === 'object' ? t(loc.hours) : loc.hours;

  return (
    <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(166, 83, 59, 0.25) 0%, #1A2536 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#D4AF37',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {t(loc.subtitle) || (lang === 'bn' ? 'ঐতিহাসিক প্রান্ত ও অবস্থান' : 'Heritage Quarter & Coordinates')}
          </span>
          <h1
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
              fontSize: '3.5rem',
              letterSpacing: '0.04em',
              color: '#F4EBDD',
              margin: '0.8rem 0 1.25rem',
            }}
          >
            {t(loc.title) || (lang === 'bn' ? 'ঠিকানা, সময়সূচি ও পথনির্দেশ' : 'Location, Hours & Arrival')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {t(loc.arrival_notes) || (lang === 'bn' ? 'প্রবেশদ্বারে অতিথিদের জন্য সার্বক্ষণিক ফ্রি ভ্যালেট পার্কিং সুবিধা রয়েছে।' : 'Complimentary valet parking available at the entrance courtyard.')}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          {/* Coordinates & Logistics Cards */}
          <div>
            <h2
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                fontSize: '2.2rem',
                color: '#F4EBDD',
                marginBottom: '2rem',
              }}
            >
              {lang === 'bn' ? 'হেরিটেজ এস্টেটের বিবরণ' : 'Heritage Estate Details'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ backgroundColor: '#223046', padding: '1.75rem', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                <div style={{ color: '#D4AF37', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  {lang === 'bn' ? 'ঠিকানা ও অবস্থান' : 'Physical Address'}
                </div>
                <div style={{ color: '#F4EBDD', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {t(loc.address)}
                </div>
                {loc.coordinates && (
                  <div style={{ color: '#C8B18D', fontSize: '0.82rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>
                    {loc.coordinates}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: '#223046', padding: '1.75rem', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                <div style={{ color: '#D4AF37', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  {lang === 'bn' ? 'ভোজন সময়সূচি' : 'Service Hours'}
                </div>
                <div style={{ color: '#F4EBDD', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {hoursString || 'Daily: 12:00 PM – 11:30 PM'}
                </div>
                <div style={{ color: '#C8B18D', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {lang === 'bn' ? 'লাঞ্চ: দুপুর ১২:০০ - ৪:০০ • ডিনার: সন্ধ্যা ৬:৩০ - রাত ১১:৩০' : 'Lunch Shift: 12:00 PM – 4:00 PM • Dinner Shift: 6:30 PM – 11:30 PM'}
                </div>
              </div>

              <div style={{ backgroundColor: '#223046', padding: '1.75rem', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                <div style={{ color: '#D4AF37', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  {lang === 'bn' ? 'যোগাযোগ ও কনসিয়ার্জ' : 'Concierge & Inquiries'}
                </div>
                <div style={{ color: '#F4EBDD', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div><strong>Phone:</strong> {loc.phone || '+880 1711-234567'}</div>
                  <div><strong>WhatsApp:</strong> {loc.whatsapp || '+880 1711-234567'}</div>
                  <div><strong>Email:</strong> {loc.email || 'hospitality@bengalheritage.com'}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <button
                onClick={() => openReservation()}
                style={{
                  backgroundColor: '#A6533B',
                  color: '#F4EBDD',
                  border: 'none',
                  padding: '1rem 2.2rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#8c422e')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#A6533B')}
              >
                {lang === 'bn' ? 'টেবিল বুকিং করুন' : 'Book a Table Now'}
              </button>
            </div>
          </div>

          {/* Direct Message Inquiry Form */}
          <div
            style={{
              backgroundColor: '#223046',
              borderRadius: '4px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              padding: '3rem 2.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                fontSize: '2rem',
                color: '#F4EBDD',
                marginBottom: '1rem',
              }}
            >
              {lang === 'bn' ? 'বার্তা পাঠান' : 'Direct Concierge Dispatch'}
            </h3>
            <p style={{ color: '#C8B18D', fontSize: '0.92rem', marginBottom: '2rem' }}>
              {lang === 'bn' ? 'ব্যক্তিগত উৎসব বা কর্পোরেট আয়োজনের জন্য আমাদের জানান।' : 'For private buyouts, tailored multi-course banquets, or dietary consultations.'}
            </p>

            {formSubmitted ? (
              <div style={{ padding: '2rem', backgroundColor: 'rgba(83, 107, 80, 0.25)', border: '1px solid #536B50', borderRadius: '4px', textAlign: 'center' }}>
                <h4 style={{ color: '#F4EBDD', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  {lang === 'bn' ? 'বার্তাটি সফলভাবে পাঠানো হয়েছে!' : 'Inquiry Dispatched Successfully!'}
                </h4>
                <p style={{ color: '#C8B18D', fontSize: '0.9rem' }}>
                  {lang === 'bn' ? 'আমাদের হসপিটালিটি ম্যানেজার শীঘ্রই যোগাযোগ করবেন।' : 'Our maître d’ will respond to your transmission within 4 business hours.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#D4AF37', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {lang === 'bn' ? 'আপনার নাম' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#1A2536',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '2px',
                      color: '#F4EBDD',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#D4AF37', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#1A2536',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '2px',
                      color: '#F4EBDD',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#D4AF37', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {lang === 'bn' ? 'বিষয়' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#1A2536',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '2px',
                      color: '#F4EBDD',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#D4AF37', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {lang === 'bn' ? 'বার্তা' : 'Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      backgroundColor: '#1A2536',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '2px',
                      color: '#F4EBDD',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#A6533B',
                    color: '#F4EBDD',
                    border: 'none',
                    padding: '0.9rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#8c422e')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#A6533B')}
                >
                  {lang === 'bn' ? 'বার্তা প্রেরণ করুন' : 'Transmit Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
