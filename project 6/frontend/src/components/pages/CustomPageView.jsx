import React, { useState, useEffect } from 'react';
import { fetchCustomPage, createReservation } from '../../services/api';
import { useCMS } from '../../context/CMSContext';

export default function CustomPageView({ slug, onNavigateHome }) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { openReservationModal } = useCMS();

  // Accordion active index state
  const [activeFaq, setActiveFaq] = useState(null);

  // Form submission state for contact block
  const [formSuccess, setFormSuccess] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCustomPage(slug)
      .then((data) => {
        if (!mounted) return;
        if (data) {
          setPageData(data);
          setError(null);
        } else {
          setError(`Page '/page/${slug}' not found or is currently unpublished.`);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Failed to load page content.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(67, 217, 232, 0.2)', borderTopColor: '#43D9E8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontFamily: 'Space Mono, monospace', color: 'var(--neon-cyan)', fontSize: '0.85rem' }}>
          Hydrating Custom Standalone Page [/{slug}]...
        </p>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: '#111A2B', border: '1px solid #D83A45', padding: '3rem 2rem', borderRadius: '8px', maxWidth: '550px', textAlign: 'center' }}>
          <h2 style={{ color: '#D83A45', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '1rem' }}>Page Not Found</h2>
          <p style={{ color: '#F6E9D5', opacity: 0.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{error}</p>
          <button onClick={onNavigateHome} className="btn-cherry" style={{ padding: '0.75rem 1.75rem', fontWeight: 700 }}>
            ← Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const isCreamTheme = pageData.theme_style === 'cream-editorial';
  const blocks = pageData.blocks || [];

  return (
    <div className={`custom-page-container ${isCreamTheme ? 'cream-theme' : ''}`} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ background: 'rgba(17, 26, 43, 0.95)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.85rem 1.5rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontFamily: 'Space Mono, monospace' }}>
            <button
              onClick={onNavigateHome}
              style={{ background: 'none', border: 'none', color: '#43D9E8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
            >
              ← Back to Stardust Homepage
            </button>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: '#F6E9D5', opacity: 0.8 }}>{pageData.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.72rem', background: 'rgba(67, 217, 232, 0.15)', color: '#43D9E8', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(67, 217, 232, 0.3)' }}>
              DYNAMIC PAGE BUILDER
            </span>
            <a
              href={`http://127.0.0.1:8001/cms/pages/${pageData.id}/builder/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.75rem', color: '#F2C94C', textDecoration: 'underline' }}
            >
              Edit in CMS Studio ↗
            </a>
          </div>
        </div>
      </div>

      {/* Render Blocks Sequentially */}
      <div className="custom-page-blocks">
        {blocks.map((block, idx) => {
          switch (block.type) {
            case 'hero_banner':
              return (
                <section
                  key={block.id || idx}
                  style={{
                    position: 'relative',
                    minHeight: '65vh',
                    display: 'flex',
                    alignItems: 'center',
                    background: `linear-gradient(to right, rgba(9, 15, 27, 0.95) 0%, rgba(9, 15, 27, 0.75) 50%, rgba(9, 15, 27, 0.45) 100%), url('${block.data?.bg_image || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"}') center/cover no-repeat`,
                    padding: '5rem 1.5rem',
                    borderBottom: '1px solid rgba(67, 217, 232, 0.2)'
                  }}
                >
                  <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
                    <div style={{ maxWidth: '720px' }}>
                      {block.data?.eyebrow && (
                        <span style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: 'rgba(67, 217, 232, 0.15)', border: '1px solid #43D9E8', color: '#43D9E8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '4px', marginBottom: '1.25rem' }}>
                          {block.data.eyebrow}
                        </span>
                      )}
                      <h1 style={{ fontFamily: 'Righteous, cursive', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                        {block.data?.headline || pageData.title}
                      </h1>
                      <p style={{ color: '#F6E9D5', fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.6, opacity: 0.9, marginBottom: '2.5rem' }}>
                        {block.data?.lead}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {block.data?.cta_text && (
                          <button
                            onClick={openReservationModal}
                            className="btn-cherry"
                            style={{ padding: '0.9rem 2.2rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                          >
                            {block.data.cta_text}
                          </button>
                        )}
                        {block.data?.secondary_text && (
                          <a
                            href={block.data.secondary_link || '#details'}
                            className="btn-neon"
                            style={{ padding: '0.9rem 2rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}
                          >
                            {block.data.secondary_text}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );

            case 'split_content':
              const isImgRight = block.data?.image_position !== 'left';
              return (
                <section key={block.id || idx} style={{ padding: '6rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
                    {!isImgRight && (
                      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.6)', border: '1px solid rgba(67, 217, 232, 0.3)' }}>
                        <img src={block.data?.image_url} alt={block.data?.headline} style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
                        {block.data?.badge && (
                          <span style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem', background: '#D83A45', color: '#FFF', padding: '0.4rem 1rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                            {block.data.badge}
                          </span>
                        )}
                      </div>
                    )}

                    <div>
                      {block.data?.eyebrow && (
                        <span style={{ color: '#43D9E8', fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.75rem' }}>
                          {block.data.eyebrow}
                        </span>
                      )}
                      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#FFFFFF', marginBottom: '1.25rem' }}>
                        {block.data?.headline}
                      </h2>
                      <p style={{ color: '#F6E9D5', opacity: 0.85, fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        {block.data?.content}
                      </p>
                      <button onClick={openReservationModal} className="btn-neon" style={{ padding: '0.8rem 1.8rem', fontWeight: 700 }}>
                        Reserve Experience
                      </button>
                    </div>

                    {isImgRight && (
                      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.6)', border: '1px solid rgba(67, 217, 232, 0.3)' }}>
                        <img src={block.data?.image_url} alt={block.data?.headline} style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
                        {block.data?.badge && (
                          <span style={{ position: 'absolute', bottom: '1.25rem', right: '1.25rem', background: '#D83A45', color: '#FFF', padding: '0.4rem 1rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                            {block.data.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              );

            case 'features_grid':
              const items = block.data?.items || [];
              return (
                <section key={block.id || idx} id="features-block" style={{ padding: '6rem 1.5rem', background: '#090F1B', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 4rem auto' }}>
                      {block.data?.eyebrow && (
                        <span style={{ color: '#F2C94C', fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.5rem' }}>
                          {block.data.eyebrow}
                        </span>
                      )}
                      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.4rem', color: '#FFFFFF' }}>
                        {block.data?.headline}
                      </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                      {items.map((it, itemIdx) => (
                        <div
                          key={itemIdx}
                          style={{ background: '#111A2B', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '2.5rem 2rem', transition: 'transform 0.3s', cursor: 'default' }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#43D9E8')}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                        >
                          <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{it.icon || '✦'}</div>
                          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                            {it.title}
                          </h3>
                          <p style={{ color: '#F6E9D5', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6 }}>
                            {it.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'image_gallery':
              const galleryImages = block.data?.images || [];
              return (
                <section key={block.id || idx} style={{ padding: '6rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                    {block.data?.headline && (
                      <h2 style={{ textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '3rem' }}>
                        {block.data.headline}
                      </h2>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                      {galleryImages.map((imgUrl, imgIdx) => (
                        <div key={imgIdx} style={{ borderRadius: '8px', overflow: 'hidden', height: '260px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <img src={imgUrl} alt="Gallery item" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case 'faq_accordion':
              const faqs = block.data?.items || [];
              return (
                <section key={block.id || idx} style={{ padding: '6rem 1.5rem', background: '#0B111D', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '3rem' }}>
                      {block.data?.headline || 'Frequently Asked Questions'}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {faqs.map((faq, fIdx) => {
                        const isOpen = activeFaq === fIdx;
                        return (
                          <div key={fIdx} style={{ background: '#111A2B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                            <button
                              onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                              style={{ width: '100%', padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 600 }}
                            >
                              <span>{faq.q}</span>
                              <span style={{ color: '#43D9E8', fontSize: '1.2rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                            </button>
                            {isOpen && (
                              <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: '#F6E9D5', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );

            case 'call_to_action':
              return (
                <section key={block.id || idx} style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                  <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #111A2B 0%, #1A253C 100%)', border: '1px solid #43D9E8', borderRadius: '16px', padding: '4rem 2rem', boxShadow: '0 0 40px rgba(67, 217, 232, 0.15)' }}>
                    {block.data?.eyebrow && (
                      <span style={{ color: '#F2C94C', fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.75rem' }}>
                        {block.data.eyebrow}
                      </span>
                    )}
                    <h2 style={{ fontFamily: 'Righteous, cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '1.25rem' }}>
                      {block.data?.headline}
                    </h2>
                    <p style={{ color: '#F6E9D5', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
                      {block.data?.lead}
                    </p>
                    <button onClick={openReservationModal} className="btn-cherry" style={{ padding: '0.95rem 2.4rem', fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase' }}>
                      {block.data?.button_text || 'Reserve Now'}
                    </button>
                  </div>
                </section>
              );

            case 'contact_form':
              return (
                <section key={block.id || idx} id="contact-block" style={{ padding: '6rem 1.5rem', background: '#090F1B', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ maxWidth: '650px', margin: '0 auto', background: '#111A2B', border: '1px solid rgba(67, 217, 232, 0.25)', borderRadius: '12px', padding: '3rem 2.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                        {block.data?.headline || 'Event Date Inquiry'}
                      </h2>
                      <p style={{ color: '#F6E9D5', opacity: 0.8, fontSize: '0.9rem' }}>
                        {block.data?.subtitle || 'Complete your booking inquiry and our dining concierge will confirm.'}
                      </p>
                    </div>

                    {formSuccess ? (
                      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <div style={{ fontSize: '3rem', color: '#43D9E8', marginBottom: '0.5rem' }}>✓</div>
                        <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Inquiry Submitted Successfully!</h3>
                        <p style={{ color: '#F6E9D5', opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                          Thank you for choosing Stardust. Our event team will review your date and contact you shortly.
                        </p>
                        <button onClick={() => setFormSuccess(false)} className="btn-neon" style={{ padding: '0.6rem 1.4rem' }}>
                          Submit Another Request
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setFormLoading(true);
                          setTimeout(() => {
                            setFormLoading(false);
                            setFormSuccess(true);
                          }, 600);
                        }}
                      >
                        <div style={{ marginBottom: '1.25rem' }}>
                          <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8EA0BE', marginBottom: '0.4rem' }}>Full Name *</label>
                          <input type="text" required placeholder="Captain Vance" style={{ width: '100%', padding: '0.8rem 1rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8EA0BE', marginBottom: '0.4rem' }}>Email Address *</label>
                            <input type="email" required placeholder="vance@cosmos.net" style={{ width: '100%', padding: '0.8rem 1rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF' }} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8EA0BE', marginBottom: '0.4rem' }}>Phone *</label>
                            <input type="tel" required placeholder="+1 (555) 019-2831" style={{ width: '100%', padding: '0.8rem 1rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF' }} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8EA0BE', marginBottom: '0.4rem' }}>Preferred Date</label>
                            <input type="date" defaultValue="2026-11-25" style={{ width: '100%', padding: '0.8rem 1rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF' }} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8EA0BE', marginBottom: '0.4rem' }}>Expected Guests</label>
                            <select style={{ width: '100%', padding: '0.8rem 1rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF' }}>
                              <option>10 - 20 Guests</option>
                              <option>20 - 35 Guests</option>
                              <option>35 - 50 Guests (Full Salon)</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                          <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8EA0BE', marginBottom: '0.4rem' }}>Special Occasion Notes</label>
                          <textarea rows="3" placeholder="Tell us about your event, dietary requests, or custom audio needs..." style={{ width: '100%', padding: '0.8rem 1rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF' }}></textarea>
                        </div>

                        <button type="submit" disabled={formLoading} className="btn-cherry" style={{ width: '100%', padding: '0.9rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                          {formLoading ? 'Submitting Inquiry...' : (block.data?.submit_text || 'Submit Event Inquiry')}
                        </button>
                      </form>
                    )}
                  </div>
                </section>
              );

            case 'table_reservation':
              return (
                <section key={block.id || idx} id="table-reservation-block" style={{ padding: '5rem 1.5rem', backgroundColor: '#090F1B', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ maxWidth: '780px', margin: '0 auto', background: '#111A2B', border: '1px solid rgba(67, 217, 232, 0.3)', borderRadius: '8px', padding: 'clamp(2rem, 4vw, 3rem)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.12em', color: '#43D9E8', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                        {block.data?.eyebrow || 'TABLE RESERVATION TERMINAL'}
                      </span>
                      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                        {block.data?.headline || 'Reserve Your Table'}
                      </h2>
                      <p style={{ color: '#F6E9D5', opacity: 0.8, fontSize: '0.95rem' }}>
                        {block.data?.subtitle || 'Select your arrival shift, party size, and dining zone with instant confirmation.'}
                      </p>
                    </div>

                    <InlineTableReservationForm defaultZone={block.data?.default_zone} submitText={block.data?.submit_text} />
                  </div>
                </section>
              );

            case 'rich_text':
              return (
                <section key={block.id || idx} style={{ padding: '5rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {block.data?.headline && (
                      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '1.5rem' }}>
                        {block.data.headline}
                      </h2>
                    )}
                    <div style={{ color: '#F6E9D5', opacity: 0.85, fontSize: '1.05rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                      {block.data?.content}
                    </div>
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

function InlineTableReservationForm({ defaultZone, submitText }) {
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    reservation_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    reservation_time: '19:15',
    party_size: 2,
    preferred_zone: defaultZone || 'Retro Leather Booth',
    occasion: 'casual',
    dietary_notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await createReservation({
      ...formData,
      party_size: parseInt(formData.party_size, 10),
    });
    setLoading(false);
    if (res.success) {
      setSuccess(res.data);
    } else {
      setError(res.error || 'Failed to submit reservation.');
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem', background: '#090F1B', border: '1px dashed #43D9E8', borderRadius: '8px' }}>
        <div style={{ color: '#43D9E8', fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
        <h3 style={{ color: '#FFF', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Table Reserved Successfully!
        </h3>
        <p style={{ color: '#43D9E8', fontFamily: 'Space Mono, monospace', fontSize: '1rem', marginBottom: '0.75rem' }}>
          BOOKING REF #{success.reference_code}
        </p>
        <p style={{ color: '#F6E9D5', opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          Thank you, {success.guest_name}. Your table for {success.party_size} guests on {success.reservation_date} at {success.reservation_time} is logged with our Maitre D'.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="btn-cyan"
          style={{ padding: '0.55rem 1.25rem', fontSize: '0.8rem' }}
        >
          Book Another Table
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{ padding: '0.75rem', background: 'rgba(216, 58, 69, 0.2)', border: '1px solid #D83A45', color: '#FFA5AC', borderRadius: '4px', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#43D9E8', marginBottom: '0.35rem' }}>
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.guest_name}
            onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
            placeholder="e.g. Donna Hayward"
            style={{ width: '100%', padding: '0.75rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF', fontSize: '0.85rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#43D9E8', marginBottom: '0.35rem' }}>
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="donna@cosmos.net"
            style={{ width: '100%', padding: '0.75rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#43D9E8', marginBottom: '0.35rem' }}>
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 789-2026"
            style={{ width: '100%', padding: '0.75rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF', fontSize: '0.85rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#43D9E8', marginBottom: '0.35rem' }}>
            Party Size *
          </label>
          <select
            value={formData.party_size}
            onChange={(e) => setFormData({ ...formData, party_size: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF', fontSize: '0.85rem' }}
          >
            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
              <option key={n} value={n}>{n} Guests</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#43D9E8', marginBottom: '0.35rem' }}>
            Arrival Date *
          </label>
          <input
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.reservation_date}
            onChange={(e) => setFormData({ ...formData, reservation_date: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF', fontSize: '0.85rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#43D9E8', marginBottom: '0.35rem' }}>
            Service Time *
          </label>
          <select
            value={formData.reservation_time}
            onChange={(e) => setFormData({ ...formData, reservation_time: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF', fontSize: '0.85rem' }}
          >
            <option value="12:00">12:00 PM (Lunch Shift)</option>
            <option value="13:00">1:00 PM (Lunch Shift)</option>
            <option value="17:30">5:30 PM (Dinner Shift)</option>
            <option value="19:15">7:15 PM (Dinner Shift)</option>
            <option value="20:30">8:30 PM (Dinner Shift)</option>
            <option value="21:45">9:45 PM (Late Night Shift)</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#43D9E8', marginBottom: '0.35rem' }}>
          Dietary Requirements / Allergies Alert
        </label>
        <input
          type="text"
          value={formData.dietary_notes}
          onChange={(e) => setFormData({ ...formData, dietary_notes: e.target.value })}
          placeholder="e.g. Gluten-free, nut allergy, vegetarian"
          style={{ width: '100%', padding: '0.75rem', background: '#090F1B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', color: '#FFF', fontSize: '0.85rem' }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-cherry"
        style={{ width: '100%', padding: '0.9rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', marginTop: '0.5rem' }}
      >
        {loading ? 'Securing Table...' : (submitText || 'Confirm Table Reservation')}
      </button>
    </form>
  );
}
