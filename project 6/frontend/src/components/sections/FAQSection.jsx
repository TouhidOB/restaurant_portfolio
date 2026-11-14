import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function FAQSection() {
  const { content } = useCMS();
  const faqSection = content?.sections?.faq || {};
  const faqs = content?.faqs || [];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="section-shell cream-theme">
      <div className="container-diner">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '820px' }}>
          <span className="section-tag">
            {faqSection.eyebrow || 'INFORMATION & POLICIES'}
          </span>
          <h2 className="section-heading">
            {faqSection.title || 'FREQUENTLY ASKED QUESTIONS.'}
          </h2>
          <p className="section-lead">
            {faqSection.subtitle ||
              'Everything you need to know about seating, takeout, group events, and diner policies.'}
          </p>
        </div>

        {/* Accordion List */}
        <div
          style={{
            maxWidth: '960px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || faq.question}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xs)',
                  border: isOpen ? '1px solid var(--cherry-red)' : '1px solid var(--border-cream)',
                  boxShadow: isOpen ? '0 8px 24px rgba(32, 36, 43, 0.12)' : 'none',
                  overflow: 'hidden',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--cherry-red)' : 'var(--deep-charcoal)',
                      lineHeight: 1.3,
                    }}
                  >
                    {faq.question}
                  </span>

                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--cherry-red)' : 'rgba(216, 58, 69, 0.1)',
                      color: isOpen ? '#FFFFFF' : 'var(--cherry-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                      transition: 'transform var(--transition-fast)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.75rem 1.75rem 1.75rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      color: '#484E59',
                      lineHeight: 1.65,
                      borderTop: '1px solid #F0E6D5',
                      paddingTop: '1.25rem',
                    }}
                  >
                    {faq.answer}
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
