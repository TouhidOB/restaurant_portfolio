import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicContent, fetchMenuCategories, fetchMenuItems } from '../services/api';
import { FALLBACK_CONTENT } from '../data/fallbackContent';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [lang, setLang] = useState('en'); // 'en' or 'bn'
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Global modals
  const [activeReservationModal, setActiveReservationModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [liveContent, liveCategories, liveDishes] = await Promise.all([
          fetchPublicContent(),
          fetchMenuCategories(),
          fetchMenuItems(),
        ]);

        if (liveContent) {
          setContent(liveContent);
          if (liveContent.default_language) {
            setLang(liveContent.default_language);
          }
        }
        if (liveCategories && liveCategories.length > 0) {
          setCategories(liveCategories);
        }
        if (liveDishes && liveDishes.length > 0) {
          setMenuItems(liveDishes);
        }
      } catch (err) {
        console.error('[CMS Context] Error loading Bengali Heritage content:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Helper function to resolve bilingual fields: { en: "...", bn: "..." }
  const t = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      return field[lang] || field['en'] || field['bn'] || '';
    }
    return String(field);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    document.documentElement.lang = nextLang;
  };

  const openReservation = (initialOccasion = null) => {
    setActiveReservationModal(true);
  };

  const closeReservation = () => {
    setActiveReservationModal(false);
  };

  const customPages = content?.custom_pages || FALLBACK_CONTENT.custom_pages || [];
  const blogPosts = content?.blog_posts || FALLBACK_CONTENT.blog_posts || [];
  const blogCategories = content?.blog_categories || FALLBACK_CONTENT.blog_categories || [];

  return (
    <CMSContext.Provider
      value={{
        content,
        lang,
        setLang,
        toggleLanguage,
        t,
        categories,
        menuItems,
        customPages,
        blogPosts,
        blogCategories,
        loading,
        activeReservationModal,
        isReservationOpen: activeReservationModal,
        openReservation,
        closeReservation,
        selectedDish,
        setSelectedDish,
        lightboxImage,
        setLightboxImage,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
