import React from 'react';
import { Sparkles, Wine, MapPin, Eye } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function SignatureDishesSection() {
  const { data, setSelectedDish } = useCMS();
  const section = data.sections?.signatures || {};

  // Aggregate signature dishes across categories
  const categories = data.menu_categories || [];
  const signatureDishes = [];
  categories.forEach((cat) => {
    (cat.items || []).forEach((item) => {
      if (item.is_signature && signatureDishes.length < 4) {
        signatureDishes.push(item);
      }
    });
  });

  return (
    <section id="signatures" className="section-wrapper" style={{ backgroundColor: '#F8F6F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || "CHEF'S HIGHLIGHTS"}
          </div>
          <h2 className="section-title">
            {section.title || 'SEASONAL COASTAL SIGNATURES'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Dishes born from morning fishing boats, cold-pressed olive oils, and sea salt harvested from nearby coastal pans.'}
          </p>
        </div>

        {/* 4 Signatures Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {signatureDishes.map((dish) => (
            <div
              key={dish.slug || dish.id}
              className="luxury-card"
              onClick={() => setSelectedDish(dish)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Dish Photo */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={dish.image_url || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#174A63',
                    color: '#FAF9F5',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Sparkles size={11} color="#D6A854" />
                  <span>SIGNATURE</span>
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    background: 'rgba(250, 249, 245, 0.95)',
                    color: '#174A63',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  {dish.currency_symbol || '€'}{dish.price}
                </span>
              </div>

              {/* Dish Content */}
              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.45rem', color: '#174A63', marginBottom: '6px', lineHeight: 1.2 }}>
                  {dish.name}
                </h3>
                <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: '#8C8981', marginBottom: '12px' }}>
                  {dish.english_name}
                </p>
                <p style={{ fontSize: '0.92rem', color: '#4A4E4D', lineHeight: 1.5, marginBottom: '16px' }}>
                  {dish.description}
                </p>

                {/* Provenance & Pairing */}
                <div style={{ marginTop: 'auto', borderTop: '1px solid #EFEAE0', paddingTop: '12px', fontSize: '12px', color: '#68765A' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <MapPin size={13} color="#367E94" />
                    <span style={{ color: '#174A63' }}>{dish.origin}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Wine size={13} color="#B86E50" />
                    <span>{dish.wine_pairing}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#367E94',
                    fontWeight: 600,
                  }}
                >
                  <Eye size={12} />
                  <span>View Tasting Notes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
