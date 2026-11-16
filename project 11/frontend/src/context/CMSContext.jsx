import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchPublicContent, fetchMenuCategories, fetchMenuItems } from '../services/api';
import { FALLBACK_CONTENT } from '../data/fallbackContent';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [customPages, setCustomPages] = useState(FALLBACK_CONTENT.custom_pages || []);
  const [blogPosts, setBlogPosts] = useState(FALLBACK_CONTENT.blog_posts || []);
  const [blogCategories, setBlogCategories] = useState(FALLBACK_CONTENT.blog_categories || []);
  const [loading, setLoading] = useState(true);

  // Modals
  const [activeReservationModal, setActiveReservationModal] = useState(false);
  const [initialOccasion, setInitialOccasion] = useState(null);
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
          if (liveContent.custom_pages) setCustomPages(liveContent.custom_pages);
          if (liveContent.blog_posts) setBlogPosts(liveContent.blog_posts);
          if (liveContent.blog_categories) setBlogCategories(liveContent.blog_categories);
        }
        if (liveCategories && liveCategories.length > 0) setCategories(liveCategories);
        if (liveDishes && liveDishes.length > 0) setMenuItems(liveDishes);
      } catch (err) {
        console.error('[CMS Context] Error hydrating Botanical Glasshouse content:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openReservation = (occasionOrZone = null) => {
    setInitialOccasion(occasionOrZone);
    setActiveReservationModal(true);
  };

  const closeReservation = () => {
    setActiveReservationModal(false);
    setInitialOccasion(null);
  };

  const t = useCallback((obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'object') {
      return obj['en'] || Object.values(obj)[0] || '';
    }
    return String(obj);
  }, []);

  return (
    <CMSContext.Provider
      value={{
        content,
        categories,
        menuItems,
        customPages,
        blogPosts,
        blogCategories,
        loading,
        t,
        activeReservationModal,
        isReservationOpen: activeReservationModal,
        initialOccasion,
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
