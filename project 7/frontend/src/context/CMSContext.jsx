import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPublicContent } from '../services/api';
import { FALLBACK_DATA } from '../data/fallbackData';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [content, setContent] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeReservationModal, setActiveReservationModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const liveData = await fetchPublicContent();
        if (liveData) {
          setContent(liveData);
        }
      } catch (err) {
        console.error('[CMS Context] Error loading content:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const refreshContent = async () => {
    try {
      const liveData = await fetchPublicContent();
      if (liveData) {
        setContent(liveData);
      }
    } catch (err) {
      console.error('[CMS Context] Refresh failed:', err);
    }
  };

  const openReservation = (initialExperience = null) => {
    setActiveReservationModal(true);
  };

  const closeReservation = () => {
    setActiveReservationModal(false);
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        loading,
        refreshContent,
        activeReservationModal,
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
