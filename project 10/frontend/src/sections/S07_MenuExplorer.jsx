import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S07_MenuExplorer() {
  const { content, categories, menuItems, t, lang, setSelectedDish, openReservation } = useCMS();
  const explorer = content?.menuExplorer || {};

  const subtitle = t(explorer.subtitle) || 'Complete Bilingual Menu Explorer';
  const title = t(explorer.title) || 'Flavors of Bengal';

  const [selectedCatId, setSelectedCatId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback dishes if API hasn't loaded menuItems
  const allDishes = useMemo(() => {
    if (menuItems && menuItems.length > 0) return menuItems;
    // Map from signatureDishes fallback
    return (content?.signatureDishes?.dishes || []).map(d => ({
      ...d,
      name_en: d.name?.en || d.name,
      name_bn: d.name?.bn || '',
      price: d.price ? String(d.price).replace(/[^0-9]/g, '') : '750',
      description_en: d.description?.en || d.description,
      description_bn: d.description?.bn || '',
      category_name: d.category?.en || 'Main',
      category: '1',
      image_url: d.image,
    }));
  }, [menuItems, content]);

  // Unique categories list
  const catList = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    return [
      { id: 'all', name_en: 'All Offerings', name_bn: 'সকল পদ' },
      { id: 'rice', name_en: 'Rice & Biryani', name_bn: 'ভাত ও বিরিয়ানি' },
      { id: 'fish', name_en: 'Fish & Seafood', name_bn: 'মাছ ও সামুদ্রিক' },
      { id: 'meat', name_en: 'Meat & Poultry', name_bn: 'মাংসের পদ' },
      { id: 'desserts', name_en: 'Desserts', name_bn: 'মিষ্টান্ন' },
    ];
  }, [categories]);

  // Filter dishes
  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      // Category filter
      if (selectedCatId !== 'all') {
        const dishCat = String(dish.category || dish.category_id || '').toLowerCase();
        const dishCatName = String(dish.category_name || '').toLowerCase();
        const match = dishCat === String(selectedCatId).toLowerCase() ||
          dishCatName.includes(String(selectedCatId).toLowerCase());
        if (!match) return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nEn = String(dish.name_en || dish.name || '').toLowerCase();
        const nBn = String(dish.name_bn || dish.bengali_name || '').toLowerCase();
        const dEn = String(dish.description_en || dish.description || '').toLowerCase();
        const dBn = String(dish.description_bn || '').toLowerCase();
        return nEn.includes(q) || nBn.includes(q) || dEn.includes(q) || dBn.includes(q);
      }
      return true;
    });
  }, [allDishes, selectedCatId, searchQuery]);

  return (
    <section
      id="menu"
      aria-label="Bengali Heritage Menu Explorer"
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
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
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
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Search Bar & Category Navigation Controls */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
            <input
              type="text"
              placeholder={lang === 'bn' ? 'পদ বা মশলা দিয়ে অনুসন্ধান করুন...' : 'Search dishes, hilsa, biryani, or spices...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 42px',
                backgroundColor: 'rgba(24, 33, 46, 0.9)',
                border: '1px solid rgba(177, 138, 84, 0.4)',
                borderRadius: '2px',
                color: '#F4EBDD',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-brass, #B18A54)',
                fontSize: '16px',
              }}
            >
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(244, 235, 221, 0.6)',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setSelectedCatId('all')}
              style={{
                padding: '8px 18px',
                backgroundColor: selectedCatId === 'all' ? 'var(--color-terracotta, #A6533B)' : 'rgba(24, 33, 46, 0.6)',
                color: selectedCatId === 'all' ? '#FFFFFF' : 'rgba(244, 235, 221, 0.75)',
                border: '1px solid rgba(177, 138, 84, 0.35)',
                borderRadius: '2px',
                fontSize: '12px',
                letterSpacing: '0.08em',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {lang === 'bn' ? 'সকল পদ' : 'All Offerings'}
            </button>

            {catList.filter(c => c.id !== 'all').map((cat) => {
              const catName = lang === 'bn' ? (cat.name_bn || cat.name) : (cat.name_en || cat.name);
              const isActive = String(selectedCatId) === String(cat.id || cat.slug);
              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCatId(cat.id || cat.slug)}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: isActive ? 'var(--color-terracotta, #A6533B)' : 'rgba(24, 33, 46, 0.6)',
                    color: isActive ? '#FFFFFF' : 'rgba(244, 235, 221, 0.75)',
                    border: '1px solid rgba(177, 138, 84, 0.35)',
                    borderRadius: '2px',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: 'rgba(24, 33, 46, 0.5)',
              borderRadius: '3px',
              border: '1px solid rgba(177, 138, 84, 0.2)',
            }}
          >
            <p style={{ fontSize: '16px', color: 'rgba(244, 235, 221, 0.7)' }}>
              {lang === 'bn' ? 'কোনো পদ খুঁজে পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।' : 'No dishes match your search criteria. Please adjust your query.'}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredDishes.map((dish, idx) => {
              const name = lang === 'bn' ? (dish.name_bn || dish.bengali_name || t(dish.name)) : (dish.name_en || t(dish.name));
              const desc = lang === 'bn' ? (dish.description_bn || t(dish.description)) : (dish.description_en || t(dish.description));
              const img = dish.image_url || dish.image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80';
              const priceText = dish.price ? `BDT ৳${Number(dish.price).toLocaleString()}` : '';

              return (
                <div
                  key={dish.id || idx}
                  onClick={() => setSelectedDish(dish)}
                  style={{
                    backgroundColor: 'rgba(24, 33, 46, 0.85)',
                    borderRadius: '2px',
                    border: '1px solid rgba(177, 138, 84, 0.25)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-terracotta, #A6533B)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(177, 138, 84, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={img}
                      alt={name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {dish.is_signature && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: 'var(--color-terracotta, #A6533B)',
                          color: '#fff',
                          padding: '3px 8px',
                          fontSize: '10px',
                          fontWeight: 600,
                          borderRadius: '2px',
                        }}
                      >
                        {lang === 'bn' ? 'স্বাক্ষর পদ' : 'Signature'}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                      <h3
                        style={{
                          fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#F4EBDD',
                          margin: 0,
                        }}
                      >
                        {name}
                      </h3>
                      {priceText && (
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '15px',
                            fontWeight: 700,
                            color: 'var(--color-brass, #B18A54)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {priceText}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: '12.5px',
                        lineHeight: 1.6,
                        color: 'rgba(244, 235, 221, 0.75)',
                        margin: '0 0 16px 0',
                        flex: 1,
                      }}
                    >
                      {desc}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(177, 138, 84, 0.2)',
                        paddingTop: '10px',
                        fontSize: '11px',
                        color: 'var(--color-brass, #B18A54)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        fontWeight: 600,
                      }}
                    >
                      <span>{lang === 'bn' ? 'উপাদান ও বিশদ' : 'Ingredients & Specs'}</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reservation CTA Bottom */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button
            onClick={() => openReservation()}
            style={{
              padding: '14px 32px',
              backgroundColor: 'var(--color-terracotta, #A6533B)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8c422d')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-terracotta, #A6533B)')}
          >
            {lang === 'bn' ? 'টেবিল সংরক্ষণ করে খাবার উপভোগ করুন' : 'Reserve a Table to Taste Our Menu'}
          </button>
        </div>
      </div>
    </section>
  );
}
