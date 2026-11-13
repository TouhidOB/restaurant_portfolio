import React, { useState } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import ReservationModal from './components/reservation/ReservationModal';
import CMSPanel from './components/cms/CMSPanel';

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

function RestaurantContent() {
  const { config } = useCMS();

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
          restaurantName={config.name}
          onComplete={() => setIsPreloaded(true)}
        />
      )}

      {/* Main Navigation */}
      <Navigation
        restaurant={config}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 02: Hero — The Grand Arrival */}
      <HeroSection
        heroData={config.hero}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 03: Brand Introduction */}
      <BrandSection
        brandData={config.brandIntro}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 04: Restaurant Experience — Virtual Tour */}
      <TourSection
        viewpoints={config.tourViewpoints}
        sectionData={config.tourSection || {}}
      />

      {/* 05: Signature Dining Experience */}
      <ExperienceSection
        pillars={config.experiencePillars}
        sectionData={config.experienceSection || {}}
      />

      {/* 06: Signature Dishes */}
      <SignatureDishes
        dishes={config.signatureDishes}
        currency={config.currency}
        onOpenReservation={() => handleOpenReservation()}
        sectionData={config.signatureSection || {}}
      />

      {/* 07: Full Menu Preview */}
      <MenuSection
        categories={config.menuCategories}
        menuItems={config.menuItems}
        currency={config.currency}
        onOpenReservation={() => handleOpenReservation()}
        sectionData={config.menuSection || {}}
      />

      {/* 08: Interior & Architecture */}
      <InteriorSection
        interiorData={config.interior}
      />

      {/* 09: Meet the Chef */}
      <ChefSection
        chefData={config.chef}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* 10: Special Experiences */}
      <SpecialExperience
        experiences={config.specialExperiences}
        onSelectExperience={handleSelectExperience}
        sectionData={config.specialExperiencesSection || {}}
      />

      {/* 11: Food & Atmosphere Gallery */}
      <GallerySection
        categories={config.galleryCategories}
        images={config.galleryImages}
        sectionData={config.gallerySection || {}}
      />

      {/* 12: Testimonials */}
      <TestimonialsSection
        testimonials={config.testimonials}
        sectionData={config.testimonialsSection || {}}
      />

      {/* 13: Reservation Section */}
      <ReservationSection
        restaurant={config}
        preselectedOccasion={selectedOccasion}
        sectionData={config.reservationSection || {}}
      />

      {/* 14: Location & Contact */}
      <ContactSection
        restaurant={config}
        sectionData={config.contactSection || {}}
      />

      {/* 15: Footer */}
      <Footer
        restaurant={config}
      />

      {/* Global Accessible Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={handleCloseReservation}
        restaurant={config}
        preselectedOccasion={selectedOccasion}
      />

      {/* Live Art Deco CMS Management Studio */}
      <CMSPanel />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <RestaurantContent />
    </CMSProvider>
  );
}
