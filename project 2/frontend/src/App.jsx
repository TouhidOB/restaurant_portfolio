import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import ReservationModal from './components/reservation/ReservationModal';
import DishModal from './components/menu/DishModal';
import Lightbox from './components/gallery/Lightbox';

// Dedicated Standalone Pages
import BrandPage from './pages/BrandPage';
import SignaturesPage from './pages/SignaturesPage';
import MenuPage from './pages/MenuPage';
import StoryPage from './pages/StoryPage';
import InteriorPage from './pages/InteriorPage';
import TourPage from './pages/TourPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import CustomPageView from './pages/CustomPageView';

// 15 Complete Landing Page Sections
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

function getNormalizedPath() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  return p;
}

function ZenRestaurantExperience() {
  const { config, isReservationOpen, openReservation, closeReservation, selectedDish, openDish, closeDish } = useCMS();

  // Routing State
  const [currentPath, setCurrentPath] = useState(getNormalizedPath);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [preselectedExperience, setPreselectedExperience] = useState(null);

  // Lightbox State
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    const normalized = path.replace(/\/+$/, '') || '/';
    setCurrentPath(normalized);
    window.history.pushState({}, '', normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    navigateTo('/');
  };

  const navigateToPageKey = (key) => {
    navigateTo(`/${key}`);
  };

  const handleOpenReservation = (experienceName = null) => {
    setPreselectedExperience(experienceName);
    openReservation();
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

  // Match dynamic routes
  const customPageMatch = currentPath.match(/^\/page\/([a-zA-Z0-9_-]+)/);
  const activeCustomSlug = customPageMatch ? customPageMatch[1] : null;

  const blogPostMatch = currentPath.match(/^\/blog\/([a-zA-Z0-9_-]+)/);
  const activeBlogSlug = blogPostMatch ? blogPostMatch[1] : null;

  return (
    <div className="zen-app" style={{ minHeight: '100vh', backgroundColor: '#F2EFE6', overflowX: 'hidden' }}>
      {/* 01: Minimal Cinematic Preloader */}
      {!isPreloaded && (
        <Preloader onComplete={() => setIsPreloaded(true)} />
      )}

      {/* Main Navigation */}
      <Navigation
        restaurant={config}
        currentPath={currentPath}
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* ROUTING LOGIC */}
      {activeCustomSlug ? (
        <CustomPageView
          slug={activeCustomSlug}
          onNavigateHome={navigateToHome}
        />
      ) : activeBlogSlug ? (
        <BlogPostDetailPage
          slug={activeBlogSlug}
          onNavigateHome={navigateToHome}
          onNavigateBlog={() => navigateTo('/blog')}
          onNavigatePost={(slug) => navigateTo(`/blog/${slug}`)}
        />
      ) : currentPath === '/blog' ? (
        <BlogListPage
          onNavigateHome={navigateToHome}
          onNavigatePost={(slug) => navigateTo(`/blog/${slug}`)}
        />
      ) : currentPath === '/story' || currentPath === '/brand' || currentPath === '/philosophy' ? (
        <BrandPage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : currentPath === '/signatures' ? (
        <SignaturesPage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : currentPath === '/menu' ? (
        <MenuPage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : currentPath === '/interior' || currentPath === '/architecture' ? (
        <InteriorPage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : currentPath === '/tour' ? (
        <TourPage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : currentPath === '/experience' || currentPath === '/experiences' ? (
        <ExperiencePage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : currentPath === '/chef' ? (
        <StoryPage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : currentPath === '/contact' ? (
        <ContactPage
          onNavigateHome={navigateToHome}
          onNavigatePage={navigateToPageKey}
        />
      ) : (
        /* Default: 15 Complete Landing Page Sections */
        <>
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
            onSelectDish={(dish) => openDish(dish)}
            onOpenReservation={() => handleOpenReservation()}
          />

          {/* 07: Complete Menu Experience */}
          <S07FullMenu
            categories={config.menuCategories}
            onSelectDish={(dish) => openDish(dish)}
            onOpenReservation={() => handleOpenReservation()}
          />

          {/* 08: Architecture & Interior Design */}
          <S08InteriorArchitecture
            architectureData={config.architecture}
          />

          {/* 09: Meet the Chef — Craftsmanship & Precision */}
          <S09Chef
            chefData={config.chef}
            onOpenReservation={() => handleOpenReservation("The Chef's Omakase Counter")}
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
        </>
      )}

      {/* 15: Footer & Brand Closing Statement */}
      <Footer
        restaurant={config}
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={closeReservation}
        restaurant={config}
        preselectedExperience={preselectedExperience}
      />

      {/* Dish Detail Modal */}
      <DishModal
        dish={selectedDish}
        onClose={closeDish}
        onReserve={() => {
          closeDish();
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
