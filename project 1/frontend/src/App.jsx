import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/reservation/ReservationModal';
import CMSPanel from './components/cms/CMSPanel';

// Dedicated Navbar Pages
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

function getNormalizedPath() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  return p;
}

function RestaurantContent() {
  const { config, isReservationOpen, openReservation, closeReservation } = useCMS();
  const [currentPath, setCurrentPath] = useState(getNormalizedPath);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);

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

  const handleOpenReservation = (occasion = null) => {
    setSelectedOccasion(occasion);
    openReservation();
  };

  // Determine active dynamic slugs
  const customPageMatch = currentPath.match(/^\/page\/([a-zA-Z0-9_-]+)/);
  const activeCustomSlug = customPageMatch ? customPageMatch[1] : null;

  const blogPostMatch = currentPath.match(/^\/blog\/([a-zA-Z0-9_-]+)/);
  const activeBlogSlug = blogPostMatch ? blogPostMatch[1] : null;

  return (
    <div className="restaurant-app" style={{ minHeight: '100vh', backgroundColor: 'var(--color-obsidian, #0D0F10)', overflowX: 'hidden' }}>
      {/* 01: Cinematic Preloader */}
      {!isPreloaded && (
        <Preloader
          restaurantName={config?.name || 'AURELIA'}
          onComplete={() => setIsPreloaded(true)}
        />
      )}

      {/* Main Navigation */}
      <Navigation
        restaurant={config}
        currentPath={currentPath}
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* DEDICATED ROUTES */}

      {/* Route 01: Dedicated Brand Story Page */}
      {(currentPath === '/story' || currentPath === '/brand' || currentPath === '/philosophy') && (
        <BrandPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 02: Dedicated Signatures Page */}
      {currentPath === '/signatures' && (
        <SignaturesPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 03: Dedicated Full Menu Repertoire Page */}
      {currentPath === '/menu' && (
        <MenuPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 04: Dedicated Architecture & Interior Page */}
      {(currentPath === '/interior' || currentPath === '/architecture') && (
        <InteriorPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 05: Dedicated 3D Spatial Tour Page */}
      {currentPath === '/tour' && (
        <TourPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 06: Dedicated Experiences Page */}
      {(currentPath === '/experience' || currentPath === '/experiences') && (
        <ExperiencePage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 07: Dedicated Meet the Chef Page */}
      {currentPath === '/chef' && (
        <StoryPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 08: Dedicated Contact & Location Page */}
      {(currentPath === '/contact' || currentPath === '/location') && (
        <ContactPage onNavigateHome={navigateToHome} onNavigatePage={navigateToPageKey} />
      )}

      {/* Route 09: Dedicated Editorial Blog List Page */}
      {currentPath === '/blog' && (
        <BlogListPage
          onNavigateHome={navigateToHome}
          onNavigatePost={(slug) => navigateTo(`/blog/${slug}`)}
        />
      )}

      {/* Route 10: Dedicated Editorial Blog Post Detail Page */}
      {activeBlogSlug && (
        <BlogPostDetailPage
          slug={activeBlogSlug}
          onNavigateHome={navigateToHome}
          onNavigateBlog={() => navigateTo('/blog')}
          onNavigatePost={(slug) => navigateTo(`/blog/${slug}`)}
        />
      )}

      {/* Route 11: Dynamic Elementor-Style Custom CMS Page */}
      {activeCustomSlug && (
        <CustomPageView
          slug={activeCustomSlug}
          onNavigateHome={navigateToHome}
        />
      )}

      {/* Route 12: Complete 15-Section Landing Page (When on '/') */}
      {currentPath === '/' && (
        <>
          {/* 01: Hero — The Grand Arrival */}
          <HeroSection
            heroData={config.hero}
            onOpenReservation={() => handleOpenReservation()}
          />

          {/* 02: Brand Introduction */}
          <BrandSection
            brandData={config.brandIntro}
            onOpenReservation={() => handleOpenReservation()}
          />

          {/* 03: Virtual Tour */}
          <TourSection
            viewpoints={config.tourViewpoints}
            sectionData={config.tourSection || {}}
          />

          {/* 04: Signature Dining Experience */}
          <ExperienceSection
            pillars={config.experiencePillars}
            sectionData={config.experienceSection || {}}
          />

          {/* 05: Signature Dishes */}
          <SignatureDishes
            dishes={config.signatureDishes}
            currency={config.currency}
            onOpenReservation={() => handleOpenReservation()}
            sectionData={config.signatureSection || {}}
          />

          {/* 06: Full Menu Preview */}
          <MenuSection
            categories={config.menuCategories}
            menuItems={config.menuItems}
            currency={config.currency}
            onOpenReservation={() => handleOpenReservation()}
            sectionData={config.menuSection || {}}
          />

          {/* 07: Interior & Architecture */}
          <InteriorSection
            interiorData={config.interior}
          />

          {/* 08: Meet the Chef */}
          <ChefSection
            chefData={config.chef}
            onOpenReservation={() => handleOpenReservation()}
          />

          {/* 09: Special Experiences */}
          <SpecialExperience
            experiences={config.specialExperiences}
            onSelectExperience={(expTitle) => handleOpenReservation(expTitle)}
            sectionData={config.specialExperiencesSection || {}}
          />

          {/* 10: Food & Atmosphere Gallery */}
          <GallerySection
            categories={config.galleryCategories}
            images={config.galleryImages}
            sectionData={config.gallerySection || {}}
          />

          {/* 11: Testimonials */}
          <TestimonialsSection
            testimonials={config.testimonials}
            sectionData={config.testimonialsSection || {}}
          />

          {/* 12: Reservation Section */}
          <ReservationSection
            restaurant={config}
            preselectedOccasion={selectedOccasion}
            sectionData={config.reservationSection || {}}
          />

          {/* 13: Location & Contact */}
          <ContactSection
            restaurant={config}
            sectionData={config.contactSection || {}}
          />
        </>
      )}

      {/* Global Footer */}
      <Footer
        restaurant={config}
        onNavigate={navigateTo}
        onNavigateHome={navigateToHome}
      />

      {/* Global Accessible Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={closeReservation}
        restaurant={config}
        preselectedOccasion={selectedOccasion}
      />

      {/* Global Dish Detail Modal */}
      <DishDetailModal />

      {/* Live Art Deco CMS Management Studio Bar */}
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
