import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function FAQSection() {
  const { content } = useCMS();
  const s14 = content.sections?.faq || {};
  const faqs = content.faqs || [];

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-shell">
      <div className="container-brutal">
        <div className="section-header-block">
          <div className="section-tag">
            SECTION 14 // {s14.eyebrow || 'INFORMATION'}
          </div>
          <h2 className="section-heading">
            {s14.title || 'FREQUENT INQUIRIES.'}
          </h2>
          <p className="section-lead">
            {s14.subtitle || 'Essential answers regarding dress code, dietary accommodations, and our dining philosophy.'}
          </p>
        </div>

        {/* Brutalist Accordion Stack */}
        <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                style={{
                  border: '1px solid',
                  borderColor: isOpen ? 'var(--accent-orange)' : 'var(--border-steel)',
                  backgroundColor: isOpen ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                  transition: 'border-color 0.2s, background-color 0.2s',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)' }}>
                      0{idx + 1}.
                    </span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600 }}>
                      {faq.question}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      color: isOpen ? 'var(--accent-orange)' : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.5rem 3rem',
                      borderTop: '1px solid var(--border-steel)',
                      paddingTop: '1rem',
                    }}
                  >
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
