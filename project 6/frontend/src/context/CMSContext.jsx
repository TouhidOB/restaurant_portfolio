import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFullContent } from '../services/api';
import { FALLBACK_CONTENT } from '../data/fallbackData';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [loading, setLoading] = useState(true);

  // 3D Virtual Tour State
  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const [tourMode, setTourMode] = useState('3d'); // '3d' | 'photo'

  // Modals & Lightbox
  const [selectedDish, setSelectedDish] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchFullContent().then((data) => {
      if (mounted) {
        setContent(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const openReservation = () => setIsReservationOpen(true);
  const closeReservation = () => setIsReservationOpen(false);

  const openDish = (dish) => setSelectedDish(dish);
  const closeDish = () => setSelectedDish(null);

  const openLightbox = (img) => setLightboxImage(img);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <CMSContext.Provider
      value={{
        content,
        loading,
        activeTourIndex,
        setActiveTourIndex,
        tourMode,
        setTourMode,
        selectedDish,
        openDish,
        closeDish,
        isReservationOpen,
        openReservation,
        closeReservation,
        lightboxImage,
        openLightbox,
        closeLightbox,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return ctx;
}
