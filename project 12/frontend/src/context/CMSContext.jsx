import React, { createContext, useContext, useState, useEffect } from 'react';
import { fallbackContent } from '../data/fallbackContent';
import { fetchPublicContent } from '../services/api';

const CMSContext = createContext(null);

export const CMSProvider = ({ children }) => {
  const [content, setContent] = useState(fallbackContent);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeTourIndex, setActiveTourIndex] = useState(0);

  // Entities
  const [customPages, setCustomPages] = useState(fallbackContent.custom_pages || []);
  const [blogPosts, setBlogPosts] = useState(fallbackContent.blog_posts || []);
  const [blogCategories, setBlogCategories] = useState(fallbackContent.blog_categories || []);

  const refreshContent = async () => {
    setIsLoading(true);
    const data = await fetchPublicContent();
    if (data) {
      setContent(data);
      if (data.custom_pages) setCustomPages(data.custom_pages);
      if (data.blog_posts) setBlogPosts(data.blog_posts);
      if (data.blog_categories) setBlogCategories(data.blog_categories);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refreshContent();
  }, []);

  const openReservationModal = () => setIsReservationModalOpen(true);
  const closeReservationModal = () => setIsReservationModalOpen(false);

  const openDishModal = (dish) => setSelectedDish(dish);
  const closeDishModal = () => setSelectedDish(null);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  const t = (val, fallback = '') => {
    if (!val) return fallback;
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.en || Object.values(val)[0] || fallback;
    return String(val);
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        isLoading,
        refreshContent,
        isReservationModalOpen,
        openReservationModal,
        closeReservationModal,
        openReservation: openReservationModal,
        closeReservation: closeReservationModal,
        isReservationOpen: isReservationModalOpen,
        selectedDish,
        openDishModal,
        closeDishModal,
        setSelectedDish: openDishModal,
        lightboxImage,
        openLightbox,
        closeLightbox,
        activeTourIndex,
        setActiveTourIndex,
        customPages,
        blogPosts,
        blogCategories,
        t,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
