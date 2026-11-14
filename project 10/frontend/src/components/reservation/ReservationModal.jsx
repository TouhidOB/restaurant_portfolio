import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { submitReservation } from '../../services/api';

export default function ReservationModal() {
  const { content, lang, t, activeReservationModal, closeReservation } = useCMS();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    reservation_date: '',
    reservation_time: '7:30 PM',
    guests: 2,
    seating_preference: 'Terracotta Dining Hall',
    occasion: 'Family Heritage Dinner',
    special_requests: '',
    preferred_language: lang,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!activeReservationModal) return null;

  const resCfg = content?.reservation || {};
  const times = resCfg.times || ["12:30 PM", "1:30 PM", "2:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];
  const seatingOptions = resCfg.seating_options || [
    { value: 'courtyard', label: { en: 'Heritage Courtyard Table', bn: 'ঐতিহাসিক প্রাঙ্গণ টেবিল' } },
    { value: 'main_dining', label: { en: 'Terracotta Dining Hall', bn: 'টেরাকোটা কেন্দ্রীয় ভোজনশালা' } },
    { value: 'zamindar_suite', label: { en: 'Zamindar Private Salon', bn: 'জমিন্দারি ব্যক্তিগত স্যুইট' } },
    { value: 'any', label: { en: 'Best Available Seating', bn: 'উপলব্ধ যে কোনো সুন্দর টেবিল' } }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitReservation({
        ...formData,
        preferred_language: lang
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        closeReservation();
      }, 2500);
    } catch (err) {
      setError(err.message || (lang === 'bn' ? 'বুকিং জমা দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Unable to submit reservation inquiry. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(16, 24, 34, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={closeReservation}
    >
      <div
        style={{
          background: 'var(--color-indigo)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          maxWidth: '560px',
          width: '100%',
          padding: '2.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeReservation}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-ivory)',
            fontSize: '1.6rem',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="section-label">{lang === 'bn' ? 'টেবিল সংরক্ষণ' : 'TABLE RESERVATION'}</span>
          <h2 style={{ fontFamily: lang === 'bn' ? 'var(--font-display-bn)' : 'var(--font-display-en)', fontSize: '2rem', color: 'var(--color-ivory)', marginTop: '0.2rem' }}>
            {t(resCfg.title) || (lang === 'bn' ? 'টেবিল সংরক্ষণ ও অনুসন্ধান' : 'Table Reservation Inquiry')}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-jute)', marginTop: '0.4rem' }}>
            {t(resCfg.policy)}
          </p>
        </div>

        {success ? (
          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', background: 'rgba(38, 52, 74, 0.5)', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🙏</div>
            <h3 style={{ fontFamily: lang === 'bn' ? 'var(--font-display-bn)' : 'var(--font-display-en)', fontSize: '1.6rem', color: 'var(--color-brass)', marginBottom: '0.4rem' }}>
              {lang === 'bn' ? 'অনুসন্ধান গৃহীত হয়েছে' : 'Inquiry Received'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ivory)' }}>
              {lang === 'bn'
                ? `ধন্যবাদ, ${formData.full_name}। আমাদের অতিথি আপ্যায়ন দল শীঘ্রই আপনার সাথে যোগাযোগ করে টেবিল নিশ্চিত করবে।`
                : `Thank you, ${formData.full_name}. Our hospitality team will contact you shortly to confirm your table availability.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {error && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(166, 83, 59, 0.25)', borderLeft: '3px solid var(--color-terracotta)', color: '#FFB59E', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {lang === 'bn' ? 'অতিথির নাম *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder={lang === 'bn' ? 'উদা: ড. মাহমুদুর রহমান' : 'E.g., Dr. Mahmudur Rahman'}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  background: 'var(--color-indigo-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '3px',
                  color: 'var(--color-ivory)',
                  fontFamily: lang === 'bn' ? 'var(--font-body-bn)' : 'var(--font-body-en)',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 17XXXXXXXX"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-indigo-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-ivory)',
                    fontFamily: 'var(--font-body-en)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="guest@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-indigo-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-ivory)',
                    fontFamily: 'var(--font-body-en)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  {lang === 'bn' ? 'তারিখ *' : 'Date *'}
                </label>
                <input
                  type="date"
                  required
                  value={formData.reservation_date}
                  onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-indigo-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-ivory)',
                    fontFamily: 'var(--font-body-en)',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  {lang === 'bn' ? 'সময় *' : 'Time *'}
                </label>
                <select
                  value={formData.reservation_time}
                  onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-indigo-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-ivory)',
                    fontFamily: 'var(--font-body-en)',
                    outline: 'none',
                  }}
                >
                  {times.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                  {lang === 'bn' ? 'অতিথি সংখ্যা *' : 'Guests *'}
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--color-indigo-card)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: '3px',
                    color: 'var(--color-ivory)',
                    fontFamily: 'var(--font-body-en)',
                    outline: 'none',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                    <option key={num} value={num}>
                      {num} {lang === 'bn' ? 'জন' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {lang === 'bn' ? 'পছন্দের ভোজন এলাকা' : 'Seating Atmosphere Preference'}
              </label>
              <select
                value={formData.seating_preference}
                onChange={(e) => setFormData({ ...formData, seating_preference: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  background: 'var(--color-indigo-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '3px',
                  color: 'var(--color-ivory)',
                  fontFamily: lang === 'bn' ? 'var(--font-body-bn)' : 'var(--font-body-en)',
                  outline: 'none',
                }}
              >
                {seatingOptions.map((opt) => (
                  <option key={opt.value} value={t(opt.label)}>
                    {t(opt.label)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brass)', marginBottom: '0.35rem', fontWeight: 700 }}>
                {lang === 'bn' ? 'বিশেষ অনুরোধ বা খাদ্য সচেতনতা' : 'Special Requests or Dietary Preferences'}
              </label>
              <textarea
                rows="2"
                value={formData.special_requests}
                onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                placeholder={lang === 'bn' ? 'উদা: কাঁসার থালিতে পরিবেশন, কম ঝাল, জন্মদিন উদ্‌যাপন...' : 'E.g., Traditional kansa thali requested, low spice, celebration...'}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.9rem',
                  background: 'var(--color-indigo-card)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '3px',
                  color: 'var(--color-ivory)',
                  fontFamily: lang === 'bn' ? 'var(--font-body-bn)' : 'var(--font-body-en)',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-heritage-terracotta"
              style={{ marginTop: '0.5rem', width: '100%', padding: '0.95rem' }}
            >
              {submitting
                ? (lang === 'bn' ? 'অনুসন্ধান জমা হচ্ছে...' : 'Transmitting to Host Concierge...')
                : (lang === 'bn' ? 'টেবিল বুকিং অনুসন্ধান নিশ্চিত করুন' : 'Confirm Table Reservation Inquiry')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
