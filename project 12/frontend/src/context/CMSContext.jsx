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

  const refreshContent = async () => {
    setIsLoading(true);
    const data = await fetchPublicContent();
    if (data && data.status === 'success') {
      setContent(prev => ({
        site_config: data.site_config && Object.keys(data.site_config).length > 0 ? data.site_config : prev.site_config,
        editorial_sections: data.editorial_sections && Object.keys(data.editorial_sections).length > 0 ? data.editorial_sections : prev.editorial_sections,
        tour_viewpoints: data.tour_viewpoints && data.tour_viewpoints.length > 0 ? data.tour_viewpoints : prev.tour_viewpoints,
        menu_categories: data.menu_categories && data.menu_categories.length > 0 ? data.menu_categories : prev.menu_categories,
        signature_dishes: data.signature_dishes && data.signature_dishes.length > 0 ? data.signature_dishes : prev.signature_dishes,
        dining_experiences: data.dining_experiences && data.dining_experiences.length > 0 ? data.dining_experiences : prev.dining_experiences,
        team_members: data.team_members && data.team_members.length > 0 ? data.team_members : prev.team_members,
        testimonials: data.testimonials && data.testimonials.length > 0 ? data.testimonials : prev.testimonials,
        gallery_images: data.gallery_images && data.gallery_images.length > 0 ? data.gallery_images : prev.gallery_images,
      }));
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

  return (
    <CMSContext.Provider
      value={{
        content,
        isLoading,
        refreshContent,
        isReservationModalOpen,
        openReservationModal,
        closeReservationModal,
        selectedDish,
        openDishModal,
        closeDishModal,
        lightboxImage,
        openLightbox,
        closeLightbox,
        activeTourIndex,
        setActiveTourIndex,
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
