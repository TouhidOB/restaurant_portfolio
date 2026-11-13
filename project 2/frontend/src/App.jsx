import React, { useState } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import ReservationModal from './components/reservation/ReservationModal';
import DishModal from './components/menu/DishModal';
import Lightbox from './components/gallery/Lightbox';

// 15 Japanese Zen Sections
import S02Hero from './sections/S02Hero';
import S03Philosophy from './sections/S03Philosophy';
import S04VirtualTour from './sections/S04VirtualTour';
import S05DiningPhilosophy from './sections/S05DiningPhilosophy';
import S06SignatureDishes from './sections/S06SignatureDishes';
import S07FullMenu from './sections/S07FullMenu';
import S08InteriorArchitecture from './sections/S08InteriorArchitecture';
import S09Chef from './sections/S09Chef';
import S10DiningExperiences from './sections/S10DiningExperiences';
import S11Gallery from './sections/S11Gallery';
import S12Testimonials from './sections/S12Testimonials';
import S13Reservation from './sections/S13Reservation';
import S14Location from './sections/S14Location';

function ZenRestaurantExperience() {
  const { config } = useCMS();

  // State Management
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [preselectedExperience, setPreselectedExperience] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpenReservation = (experienceName = null) => {
    setPreselectedExperience(experienceName);
    setReservationModalOpen(true);
  };

  const handleOpenLightbox = (imagesList, index) => {
    setLightboxImages(imagesList);
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="zen-app" style={{ minHeight: '100vh', backgroundColor: 'var(--color-rice-paper)', overflowX: 'hidden' }}>
      {/* 01: Minimal Cinematic Preloader */}
      {!isPreloaded && (
        <Preloader onComplete={() => setIsPreloaded(true)} />
      )}

      {/* Main Navigation */}
      <Navigation
        restaurant={config}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 02: Hero — The Art of Japanese Dining */}
      <S02Hero
        heroData={config.hero}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 03: Our Philosophy — The Meaning of Simplicity */}
      <S03Philosophy
        philosophyData={config.philosophy}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 04: Japanese Restaurant Virtual Tour */}
      <S04VirtualTour
        tourViewpoints={config.tourViewpoints}
      />

      {/* 05: The Art of Dining — Three Core Principles */}
      <S05DiningPhilosophy
        pillars={config.diningPillars}
      />

      {/* 06: Signature Japanese Creations */}
      <S06SignatureDishes
        dishes={config.signatureDishes}
        onSelectDish={(dish) => setSelectedDish(dish)}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 07: Complete Menu Experience */}
      <S07FullMenu
        categories={config.menuCategories}
        onSelectDish={(dish) => setSelectedDish(dish)}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 08: Architecture & Interior Design */}
      <S08InteriorArchitecture
        architectureData={config.architecture}
      />

      {/* 09: Meet the Chef — Craftsmanship & Precision */}
      <S09Chef
        chefData={config.chef}
        onOpenReservation={() => handleOpenReservation('The Chef\'s Omakase Counter')}
      />

      {/* 10: Private Dining & Special Experiences */}
      <S10DiningExperiences
        experiences={config.specialExperiences}
        onSelectExperience={(expTitle) => handleOpenReservation(expTitle)}
      />

      {/* 11: Restaurant & Culinary Gallery */}
      <S11Gallery
        gallery={config.gallery}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 12: Guest Stories & Testimonials */}
      <S12Testimonials
        testimonials={config.testimonials}
      />

      {/* 13: Table Reservation */}
      <S13Reservation
        restaurant={config}
        sectionData={config.reservationSection}
      />

      {/* 14: Location, Opening Hours & Interactive Map */}
      <S14Location
        restaurant={config}
      />

      {/* 15: Footer & Brand Closing Statement */}
      <Footer
        restaurant={config}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        restaurant={config}
        preselectedExperience={preselectedExperience}
      />

      {/* Dish Detail Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onReserve={() => {
          setSelectedDish(null);
          handleOpenReservation();
        }}
      />

      {/* Gallery Photo Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <ZenRestaurantExperience />
    </CMSProvider>
  );
}
