import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function MenuPage() {
  const { content, categories, menuItems, lang, t, openReservation, setSelectedDish } = useCMS();
  const menu = content?.menuExplorer || {};
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback dishes from signatureDishes or default heritage list
  const allDishes = useMemo(() => {
    if (menuItems && menuItems.length > 0) return menuItems;
    const sigDishes = content?.signatureDishes?.dishes || [];
    if (sigDishes.length > 0) {
      return sigDishes.map((d, i) => ({
        id: d.id || `dish-${i}`,
        name_en: d.name?.en || d.name,
        name_bn: d.name?.bn || '',
        price: d.price ? String(d.price).replace(/[^0-9]/g, '') : '750',
        description_en: d.description?.en || d.description,
        description_bn: d.description?.bn || '',
        category_name: d.category?.en || 'Main Course',
        category: d.category?.en ? d.category.en.toLowerCase().replace(/\s+/g, '_') : 'main',
        image_url: d.image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      }));
    }
    return [
      {
        id: 'kacchi',
        name_en: 'Old Dhaka Heritage Kacchi Biryani',
        name_bn: 'পুরান ঢাকার ঐতিহ্যবাহী কাচ্চি বিরিয়ানি',
        price: '850',
        description_en: 'Tender young mutton slow-cooked in sealed clay handis with fragrant basmati, golden potatoes and saffron.',
        description_bn: 'কচি খাসির মাংস, জাফরান ও সুগন্ধি বাসমতী চালের সাথে আলুর নিখুঁত যুগলবন্দী—মাটির হাঁড়িতে কয়লার আঁচে দমে রান্না।',
        category: 'rice',
        category_name: 'Rice & Biryani',
        image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'ilish',
        name_en: 'Padma Shorshe Ilish',
        name_bn: 'পদ্মার সর্ষে ইলিশ',
        price: '980',
        description_en: 'Fresh Padma hilsa steaks gently simmered in stone-ground mustard paste and cold-pressed mustard oil.',
        description_bn: 'পদ্মার তাজা ইলিশের টুকরো শীল-নোড়ায় বাটা দেশি হলুদ সরিষা ও খাঁটি ঝাঁঝালো সরিষার তেলে রান্না।',
        category: 'fish',
        category_name: 'Fish & Seafood',
        image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'chingri',
        name_en: 'Sonargaon Chingri Malai Curry',
        name_bn: 'সোনারগাঁও চিংড়ি মালাইকারি',
        price: '920',
        description_en: 'Jumbo river king prawns in velvety fresh coconut milk gravy scented with green cardamom.',
        description_bn: 'নদীর বড় গলদা চিংড়ি তাজা নারকেলের দুধ, এলাচ ও দারুচিনি দিয়ে তৈরি ক্রিমি গ্রেভি।',
        category: 'fish',
        category_name: 'Fish & Seafood',
        image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'kala_bhuna',
        name_en: 'Chittagong Beef Kala Bhuna',
        name_bn: 'চট্টগ্রামের মেজবani কালা ভুনা',
        price: '780',
        description_en: 'Prime beef braised with 18 roasted spices, mustard oil, and caramelized shallots.',
        description_bn: '১৮ পদের বিশেষ ভাজা মশলা ও খাঁটি সরিষার তেলে ঘণ্টার পর ঘণ্টা কষিয়ে রান্না করা কালো রঙের নরম ও রসালো গরুর মাংস।',
        category: 'meat',
        category_name: 'Meat & Poultry',
        image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'mishti_doi',
        name_en: 'Nolen Gurer Baked Mishti Doi',
        name_bn: 'নলেন গুড়ের মাটির হাঁড়ির মিষ্টি দই',
        price: '280',
        description_en: 'Caramelized milk with winter date molasses fermented naturally inside porous clay pots.',
        description_bn: 'যশোরের খেজুরের নলেন গুড় ও খাঁটি দুধে তৈরি, মাটির পাত্রে পাতা সুস্বাদু মিষ্টি দই।',
        category: 'desserts',
        category_name: 'Desserts',
        image_url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=85',
        is_signature: true,
      },
      {
        id: 'roshogolla',
        name_en: 'Warm Zamindari Baked Roshogolla',
        name_bn: 'গরম জমিন্দারি বেকড রসগোল্লা',
        price: '320',
        description_en: 'Delicate cottage cheese spheres baked in thickened cardamom kheer with roasted pistachios.',
        description_bn: 'ঘন ক্ষীর ও পেস্তাবাদামের সাথে ওভেনে বেক করা গরম স্পঞ্জ রসগোল্লা।',
        category: 'desserts',
        category_name: 'Desserts',
        image_url: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=85',
        is_signature: false,
      }
    ];
  }, [menuItems, content]);

  const catList = useMemo(() => {
    if (categories && categories.length > 0) return [{ id: 'all', name_en: 'All Offerings', name_bn: 'সকল পদ' }, ...categories];
    return [
      { id: 'all', name_en: 'All Offerings', name_bn: 'সকল পদ' },
      { id: 'rice', name_en: 'Rice & Biryani', name_bn: 'ভাত ও বিরিয়ানি' },
      { id: 'fish', name_en: 'Fish & Seafood', name_bn: 'মাছ ও সামুদ্রিক' },
      { id: 'meat', name_en: 'Meat & Poultry', name_bn: 'মাংসের পদ' },
      { id: 'desserts', name_en: 'Desserts', name_bn: 'মিষ্টান্ন' },
    ];
  }, [categories]);

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      if (selectedCatId !== 'all') {
        const dishCat = String(dish.category || dish.category_id || '').toLowerCase();
        const dishCatName = String(dish.category_name || '').toLowerCase();
        const match = dishCat === String(selectedCatId).toLowerCase() || dishCatName.includes(String(selectedCatId).toLowerCase());
        if (!match) return false;
      }
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
            {t(menu.subtitle) || (lang === 'bn' ? 'দ্বিভাষিক মেনু এক্সপ্লোরার' : 'Complete Bilingual Menu Explorer')}
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
            {t(menu.title) || (lang === 'bn' ? 'বাংলার খাঁটি স্বাদ ও ঐতিহ্য' : 'Flavors of Bengal')}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {lang === 'bn'
              ? 'পদ্মার রুপালি ইলিশ, পুরান ঢাকার কাচ্চি, সোনারগাঁর চিংড়ি ও চট্টগ্রামের মেজবানি কালা ভুনার অপূর্ব রন্ধন সম্ভার।'
              : 'Ancestral clay handi feasts, freshwater delta fish, stone-ground mustard sauces, and fragrant winter date molasses.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '3.5rem auto', padding: '0 1.5rem' }}>
        {/* Search Bar */}
        <div style={{ maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? '🔍 পদ বা উপকরণ খুঁজুন...' : '🔍 Search dishes, ingredients, sauces...'}
            style={{
              width: '100%',
              padding: '0.9rem 1.25rem',
              backgroundColor: '#223046',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '3px',
              color: '#F4EBDD',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#D4AF37')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)')}
          />
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {catList.map((cat) => {
            const active = selectedCatId === cat.id;
            const label = lang === 'bn' ? (cat.name_bn || cat.name_en || cat.name) : (cat.name_en || cat.name);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                style={{
                  padding: '0.65rem 1.4rem',
                  backgroundColor: active ? '#A6533B' : '#223046',
                  color: active ? '#F4EBDD' : '#C8B18D',
                  border: active ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '2px',
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Dish Grid with Meal Photography */}
        {filteredDishes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#223046', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <p style={{ color: '#C8B18D', fontSize: '1.1rem' }}>
              {lang === 'bn' ? 'কোনো পদ খুঁজে পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করুন।' : 'No dishes matched your search criteria.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filteredDishes.map((dish, idx) => {
              const name = lang === 'bn' ? (dish.name_bn || dish.bengali_name || t(dish.name)) : (dish.name_en || t(dish.name));
              const desc = lang === 'bn' ? (dish.description_bn || t(dish.description)) : (dish.description_en || t(dish.description));
              const img = dish.image_url || dish.image || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85';
              const priceText = dish.price ? (String(dish.price).includes('BDT') ? dish.price : `BDT ৳${Number(String(dish.price).replace(/[^0-9]/g, '')).toLocaleString()}`) : '';

              return (
                <div
                  key={dish.id || idx}
                  onClick={() => setSelectedDish(dish)}
                  style={{
                    backgroundColor: '#223046',
                    borderRadius: '4px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                  }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
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
                          backgroundColor: '#A6533B',
                          color: '#F4EBDD',
                          padding: '3px 8px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          borderRadius: '2px',
                        }}
                      >
                        {lang === 'bn' ? 'স্বাক্ষর পদ' : 'Signature'}
                      </span>
                    )}
                    {priceText && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(26, 37, 54, 0.92)',
                          color: '#D4AF37',
                          padding: '3px 10px',
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          borderRadius: '2px',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                        }}
                      >
                        {priceText}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: '#F4EBDD',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {name}
                    </h3>
                    <p style={{ color: '#C8B18D', fontSize: '0.88rem', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                      {desc}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ fontSize: '0.78rem', color: '#D4AF37', fontWeight: 600 }}>
                        {lang === 'bn' ? 'বিস্তারিত দেখুন &rarr;' : 'View Details &rarr;'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openReservation();
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#A6533B',
                          border: '1px solid #A6533B',
                          padding: '3px 10px',
                          borderRadius: '2px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#A6533B';
                          e.target.style.color = '#F4EBDD';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#A6533B';
                        }}
                      >
                        {lang === 'bn' ? 'টেবিল সংরক্ষণ' : 'Reserve'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
