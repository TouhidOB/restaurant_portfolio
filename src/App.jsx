import React, { useState } from 'react';
import { restaurantConfig } from './data/restaurant';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import ReservationModal from './components/reservation/ReservationModal';

// 15 Sections
import HeroSection from './sections/HeroSection';
import BrandSection from './sections/BrandSection';
import TourSection from './sections/TourSection';
import ExperienceSection from './sections/ExperienceSection';
import SignatureDishes from './sections/SignatureDishes';
import MenuSection from './sections/MenuSection';
import InteriorSection from './sections/InteriorSection';
import ChefSection from './sections/ChefSection';
import SpecialExperience from './sections/SpecialExperience';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import ReservationSection from './sections/ReservationSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  const handleOpenReservation = (occasion = null) => {
    setSelectedOccasion(occasion);
    setReservationModalOpen(true);
  };

  const handleCloseReservation = () => {
    setReservationModalOpen(false);
  };

  const handleSelectExperience = (experienceTitle) => {
    // Scrolls to reservation section or opens modal with the experience prefilled
    setSelectedOccasion(experienceTitle);
    const resSection = document.getElementById('reservation');
    if (resSection) {
      resSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setReservationModalOpen(true);
    }
  };

  return (
    <div className="restaurant-app" style={{ minHeight: '100vh', backgroundColor: 'var(--color-obsidian)', overflowX: 'hidden' }}>
      {/* 01: Cinematic Preloader */}
      {!isPreloaded && (
        <Preloader
          restaurantName={restaurantConfig.name}
          onComplete={() => setIsPreloaded(true)}
        />
      )}

      {/* Main Navigation */}
      <Navigation
        restaurant={restaurantConfig}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 02: Hero — The Grand Arrival */}
      <HeroSection
        heroData={restaurantConfig.hero}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 03: Brand Introduction */}
      <BrandSection
        brandData={restaurantConfig.brandIntro}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 04: Restaurant Experience — Virtual Tour */}
      <TourSection
        viewpoints={restaurantConfig.tourViewpoints}
      />

      {/* 05: Signature Dining Experience */}
      <ExperienceSection
        pillars={restaurantConfig.experiencePillars}
      />

      {/* 06: Signature Dishes */}
      <SignatureDishes
        dishes={restaurantConfig.signatureDishes}
        currency={restaurantConfig.currency}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 07: Full Menu Preview */}
      <MenuSection
        categories={restaurantConfig.menuCategories}
        menuItems={restaurantConfig.menuItems}
        currency={restaurantConfig.currency}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 08: Interior & Architecture */}
      <InteriorSection
        interiorData={restaurantConfig.interior}
      />

      {/* 09: Meet the Chef */}
      <ChefSection
        chefData={restaurantConfig.chef}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 10: Special Experiences */}
      <SpecialExperience
        experiences={restaurantConfig.specialExperiences}
        onSelectExperience={handleSelectExperience}
      />

      {/* 11: Food & Atmosphere Gallery */}
      <GallerySection
        categories={restaurantConfig.galleryCategories}
        images={restaurantConfig.galleryImages}
      />

      {/* 12: Testimonials */}
      <TestimonialsSection
        testimonials={restaurantConfig.testimonials}
      />

      {/* 13: Reservation Section */}
      <ReservationSection
        restaurant={restaurantConfig}
        preselectedOccasion={selectedOccasion}
      />

      {/* 14: Location & Contact */}
      <ContactSection
        restaurant={restaurantConfig}
      />

      {/* 15: Footer */}
      <Footer
        restaurant={restaurantConfig}
      />

      {/* Global Accessible Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={handleCloseReservation}
        restaurant={restaurantConfig}
        preselectedOccasion={selectedOccasion}
      />
    </div>
  );
}
