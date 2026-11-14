import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S06_SignatureDishes() {
  const { content, t, lang, setSelectedDish, openReservation } = useCMS();
  const sig = content?.signatureDishes || {};

  const subtitle = t(sig.subtitle) || 'Artisan Recipes of Bengal';
  const title = t(sig.title) || 'Signature Bengali Culinary Offerings';
  const dishes = sig.dishes || [];

  return (
    <section
      id="signature"
      aria-label="Signature Bengali Dishes"
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--color-bg-ivory, #F4EBDD)',
        color: 'var(--color-charcoal, #242321)',
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
              color: 'var(--color-terracotta, #A6533B)',
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
              color: 'var(--color-indigo, #26344A)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Signature Dishes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {dishes.map((dish, idx) => {
            const name = t(dish.name);
            const category = t(dish.category);
            const badge = t(dish.badge);
            const description = t(dish.description);
            const ingredients = dish.ingredients || [];

            return (
              <div
                key={dish.id || idx}
                onClick={() => setSelectedDish(dish)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '3px',
                  border: '1px solid rgba(177, 138, 84, 0.3)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Dish Image */}
                {dish.image && (
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img
                      src={dish.image}
                      alt={name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    {badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'var(--color-terracotta, #A6533B)',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          fontSize: '10.5px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          borderRadius: '2px',
                        }}
                      >
                        {badge}
                      </span>
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(36, 35, 33, 0.85)',
                        color: 'var(--color-brass, #B18A54)',
                        padding: '4px 10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        borderRadius: '2px',
                      }}
                    >
                      {dish.price}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {category && (
                    <span
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-brass, #B18A54)',
                        fontWeight: 600,
                        marginBottom: '6px',
                      }}
                    >
                      {category}
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 600,
                      color: 'var(--color-indigo, #26344A)',
                      lineHeight: 1.3,
                      marginBottom: '10px',
                    }}
                  >
                    {name}
                  </h3>
                  <p
                    style={{
                      fontSize: '13.5px',
                      lineHeight: 1.65,
                      color: 'rgba(36, 35, 33, 0.8)',
                      marginBottom: '18px',
                      flex: 1,
                    }}
                  >
                    {description}
                  </p>

                  {/* Key Ingredients Pill List */}
                  {ingredients.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '18px',
                      }}
                    >
                      {ingredients.map((ing, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11px',
                            padding: '3px 8px',
                            backgroundColor: 'rgba(196, 177, 141, 0.25)',
                            color: 'var(--color-charcoal)',
                            borderRadius: '2px',
                          }}
                        >
                          {t(ing)}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(177, 138, 84, 0.2)',
                      paddingTop: '14px',
                      fontSize: '12px',
                      color: 'var(--color-terracotta, #A6533B)',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Inspect Ingredients'}</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
