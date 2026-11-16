import React, { useState, useEffect, useCallback } from 'react';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';

// Modals
import DishDetailModal from './components/menu/DishDetailModal';
import ReservationModal from './components/reservation/ReservationModal';
import Lightbox from './components/gallery/Lightbox';

// Editorial Landing Sections
import S02_Hero from './sections/S02_Hero';
import S03_BrandStory from './sections/S03_BrandStory';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_CulinaryPhilosophy from './sections/S05_CulinaryPhilosophy';
import S06_SignatureSteaks from './sections/S06_SignatureSteaks';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_OpenFireKitchen from './sections/S08_OpenFireKitchen';
import S09_ChefTeam from './sections/S09_ChefTeam';
import S10_PrivateDining from './sections/S10_PrivateDining';
import S11_Gallery from './sections/S11_Gallery';
import S12_Testimonials from './sections/S12_Testimonials';
import S13_Reservation from './sections/S13_Reservation';
import S14_Location from './sections/S14_Location';

// Standalone Dedicated Pages
import StoryPage from './pages/StoryPage';
import SignaturesPage from './pages/SignaturesPage';
import MenuPage from './pages/MenuPage';
import TourPage from './pages/TourPage';
import PhilosophyPage from './pages/PhilosophyPage';
import ChefPage from './pages/ChefPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import CustomPageView from './pages/CustomPageView';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  const handleLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const navigate = (path) => {
    if (path.startsWith('#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/' + path);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.querySelector(path);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(path);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    const cleanPath = currentPath.replace(/\/+$/, '') || '/';

    // Dynamic blog route: /blog/:slug
    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      return <BlogPostDetailPage slug={slug} onNavigate={navigate} />;
    }

    // Dynamic custom page route: /page/:slug
    if (cleanPath.startsWith('/page/')) {
      const slug = cleanPath.replace('/page/', '');
      return <CustomPageView slug={slug} onNavigate={navigate} />;
    }

    switch (cleanPath) {
      case '/story':
        return <StoryPage onNavigate={navigate} />;
      case '/signatures':
        return <SignaturesPage onNavigate={navigate} />;
      case '/menu':
        return <MenuPage onNavigate={navigate} />;
      case '/tour':
        return <TourPage onNavigate={navigate} />;
      case '/philosophy':
      case '/space':
        return <PhilosophyPage onNavigate={navigate} />;
      case '/hearth':
      case '/chef':
      case '/kitchen':
        return <ChefPage onNavigate={navigate} />;
      case '/private-dining':
      case '/experiences':
        return <ExperiencePage onNavigate={navigate} />;
      case '/contact':
      case '/location':
        return <ContactPage onNavigate={navigate} />;
      case '/blog':
        return <BlogListPage onNavigate={navigate} />;
      case '/':
      default:
        return (
          <main>
            <S02_Hero />
            <S03_BrandStory />
            <S04_VirtualTour />
            <S05_CulinaryPhilosophy />
            <S06_SignatureSteaks />
            <S07_MenuExplorer />
            <S08_OpenFireKitchen />
            <S09_ChefTeam />
            <S10_PrivateDining />
            <S11_Gallery />
            <S12_Testimonials />
            <S13_Reservation />
            <S14_Location />
          </main>
        );
    }
  };

  return (
    <div className="dark-luxury-app">
      {/* S01: Preloader */}
      {!loaded && <Preloader onComplete={handleLoaded} />}

      {/* Global Navigation */}
      <Navigation currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Router */}
      {renderContent()}

      {/* S15: Dark Luxury Brand Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Interactive Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </div>
  );
}
