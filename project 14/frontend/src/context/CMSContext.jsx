import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchContent } from '../services/api';
import { fallbackData } from '../data/fallbackData';

const CMSContext = createContext(null);

export const CMSProvider = ({ children }) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);

  const loadData = async () => {
    try {
      const remote = await fetchContent();
      if (remote && remote.exists) {
        setData({
          restaurant_name: remote.restaurant_name || fallbackData.restaurant_name,
          content: { ...fallbackData.content, ...(remote.content || {}) },
          categories: remote.categories?.length ? remote.categories : fallbackData.categories,
          featured_steaks: remote.featured_steaks?.length ? remote.featured_steaks : fallbackData.featured_steaks,
          viewpoints: remote.viewpoints?.length ? remote.viewpoints : fallbackData.viewpoints,
          gallery: remote.gallery?.length ? remote.gallery : fallbackData.gallery,
          experiences: remote.experiences?.length ? remote.experiences : fallbackData.experiences,
          team: remote.team?.length ? remote.team : fallbackData.team,
          testimonials: remote.testimonials?.length ? remote.testimonials : fallbackData.testimonials,
        });
      }
    } catch (e) {
      console.warn("Using fallback state for CMS data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openReservation = (experienceTitle = '') => {
    setSelectedExperience(experienceTitle);
    setIsReservationOpen(true);
  };

  const closeReservation = () => {
    setIsReservationOpen(false);
    setSelectedExperience('');
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        loading,
        refetch: loadData,
        selectedDish,
        setSelectedDish,
        isReservationOpen,
        openReservation,
        closeReservation,
        selectedExperience,
        lightboxImage,
        setLightboxImage,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error("useCMS must be used within CMSProvider");
  return ctx;
};
