import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Settings,
  X,
  Palette,
  Type,
  Image,
  Utensils,
  BookOpen,
  Camera,
  MapPin,
  Calendar,
  UserCheck,
  Star,
  Compass,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Sliders,
  Lock,
  LogOut,
  CloudUpload,
  Inbox,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function CMSPanel() {
  const {
    config,
    updateSection,
    updateRootField,
    updateTheme,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    isCMSOpen,
    setIsCMSOpen,
    isLoginModalOpen,
    setIsLoginModalOpen,
    activeCMSTab,
    setActiveCMSTab,
    saveStatus,
    adminUser,
    loginAdmin,
    logoutAdmin,
    saveToDjangoBackend,
    reservations,
    loadReservations,
    updateReservationStatus,
    isLoadingBackend,
  } = useCMS();

  // Login Form Local State
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('adminpassword123');
  const [loginError, setLoginError] = useState('');

  const [importText, setImportText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  // Load reservations when the reservations tab is opened
  useEffect(() => {
    if (activeCMSTab === 'inbox' && adminUser) {
      loadReservations();
    }
  }, [activeCMSTab, adminUser]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await loginAdmin(loginUsername, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials');
    }
  };

  // If CMS is closed, render the floating Admin toggle button
  if (!isCMSOpen && !isLoginModalOpen) {
    return (
      <button
        onClick={() => {
          if (adminUser) {
            setIsCMSOpen(true);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
        aria-label="Open Site Admin & CMS Portal"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99990,
          backgroundColor: '#123B35',
          border: '2px solid #D6B879',
          color: '#D6B879',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 15px rgba(214, 184, 121, 0.4)',
          borderRadius: '4px',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#D6B879';
          e.currentTarget.style.color = '#17191A';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#123B35';
          e.currentTarget.style.color = '#D6B879';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Lock size={16} />
        <span>{adminUser ? 'ADMIN CMS STUDIO' : 'ADMIN PORTAL'}</span>
      </button>
    );
  }

  // Admin Login Modal (When unauthenticated)
  if (isLoginModalOpen && !adminUser) {
    return (
      <dialog
        open
        aria-labelledby="admin-login-title"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsLoginModalOpen(false);
        }}
      >
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 22, 19, 0.94)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={() => setIsLoginModalOpen(false)}
        />

        <div
          className="deco-frame"
          style={{
            position: 'relative',
            zIndex: 1000000,
            maxWidth: '440px',
            width: '90%',
            backgroundColor: '#17191A',
            border: '1px solid #D6B879',
            padding: '36px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  border: '1px solid #D6B879',
                  transform: 'rotate(45deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#123B35',
                }}
              >
                <Lock size={14} color="#D6B879" style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <h3 id="admin-login-title" style={{ fontSize: '20px', color: '#F3EDE1', margin: 0, fontFamily: 'var(--font-display)' }}>
                Site Admin Sign-In
              </h3>
            </div>

            <button
              onClick={() => setIsLoginModalOpen(false)}
              aria-label="Close Admin Login"
              style={{ background: 'none', border: 'none', color: '#A3ABA6', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          <p style={{ fontSize: '13px', color: '#A3ABA6', lineHeight: 1.5, marginBottom: '20px' }}>
            Only site administrators can edit the live CMS, theme, and view customer reservations.
          </p>

          {loginError && (
            <div style={{ padding: '10px 14px', backgroundColor: 'rgba(255, 107, 107, 0.15)', border: '1px solid #FF6B6B', color: '#FF8787', fontSize: '12px', marginBottom: '16px' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#D6B879', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Admin Username
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#0D1110',
                    border: '1px solid rgba(214, 184, 121, 0.3)',
                    color: '#F3EDE1',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#D6B879', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#0D1110',
                    border: '1px solid rgba(214, 184, 121, 0.3)',
                    color: '#F3EDE1',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoadingBackend}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', opacity: isLoadingBackend ? 0.7 : 1 }}
            >
              <span>{isLoadingBackend ? 'AUTHENTICATING...' : 'SIGN IN TO CMS STUDIO'}</span>
            </button>
          </form>

          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(214, 184, 121, 0.15)', paddingTop: '14px', fontSize: '11px', color: '#718C7D' }}>
            Django Superuser Credentials: <code>admin</code> / <code>adminpassword123</code>
          </div>
        </div>
      </dialog>
    );
  }

  // When Authenticated as Admin: Full Studio Drawer
  const tabs = [
    { id: 'inbox', label: 'Reservations Inbox', icon: <Inbox size={16} /> },
    { id: 'theme', label: 'Theme & Colors', icon: <Palette size={16} /> },
    { id: 'typography', label: 'Typography', icon: <Type size={16} /> },
    { id: 'hero', label: 'Hero Section', icon: <Sparkles size={16} /> },
    { id: 'brandIntro', label: 'Our Story', icon: <BookOpen size={16} /> },
    { id: 'tour', label: '3D Virtual Tour', icon: <Compass size={16} /> },
    { id: 'experience', label: 'Dining Pillars', icon: <Star size={16} /> },
    { id: 'signature', label: 'Signature Dishes', icon: <Utensils size={16} /> },
    { id: 'menu', label: 'Full Menu', icon: <BookOpen size={16} /> },
    { id: 'interior', label: 'Interior & Architecture', icon: <Image size={16} /> },
    { id: 'chef', label: 'Meet the Chef', icon: <UserCheck size={16} /> },
    { id: 'experiences', label: 'Special Experiences', icon: <Sparkles size={16} /> },
    { id: 'gallery', label: 'Visual Gallery', icon: <Camera size={16} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star size={16} /> },
    { id: 'reservation', label: 'Reservation Settings', icon: <Calendar size={16} /> },
    { id: 'contact', label: 'Contact & Location', icon: <MapPin size={16} /> },
    { id: 'footer', label: 'Footer & Social', icon: <Settings size={16} /> },
  ];

  const handleColorChange = (key, val) => {
    updateTheme({
      colors: {
        ...(config.theme?.colors || {}),
        [key]: val,
      },
    });
  };

  const handleTypographyChange = (key, val) => {
    updateTheme({
      typography: {
        ...(config.theme?.typography || {}),
        [key]: val,
      },
    });
  };

  return (
    <aside
      aria-label="Admin CMS Management Studio"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'clamp(360px, 48vw, 720px)',
        backgroundColor: '#17191A',
        color: '#F3EDE1',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-12px 0 50px rgba(0,0,0,0.9)',
        borderLeft: '1px solid #D6B879',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          padding: '18px 24px',
          borderBottom: '1px solid rgba(214, 184, 121, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#0F2B26',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              border: '1px solid #D6B879',
              transform: 'rotate(45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#123B35',
            }}
          >
            <span style={{ transform: 'rotate(-45deg)', fontSize: '13px', color: '#D6B879', fontWeight: 700 }}>
              CMS
            </span>
          </div>
          <div>
            <h2 style={{ fontSize: '16px', margin: 0, color: '#F3EDE1', letterSpacing: '0.08em', fontWeight: 600 }}>
              ART DECO CMS STUDIO
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#D6B879', letterSpacing: '0.1em' }}>
                Admin: {adminUser?.username}
              </span>
              <span style={{ color: '#718C7D', fontSize: '10px' }}>•</span>
              <span style={{ fontSize: '10px', color: '#A3ABA6' }}>
                {saveStatus || 'Live Connected to Django'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Publish to Django Backend Button */}
          <button
            onClick={saveToDjangoBackend}
            title="Publish changes to Django Database"
            disabled={isLoadingBackend}
            style={{
              backgroundColor: '#D6B879',
              border: 'none',
              color: '#17191A',
              padding: '8px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              borderRadius: '2px',
            }}
          >
            <CloudUpload size={14} />
            <span>{isLoadingBackend ? 'SAVING...' : 'PUBLISH TO BACKEND'}</span>
          </button>

          <button
            onClick={logoutAdmin}
            title="Sign out of Admin Portal"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 107, 107, 0.4)',
              color: '#FF8787',
              padding: '7px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
            }}
          >
            <LogOut size={13} /> Logout
          </button>

          <button
            onClick={() => setIsCMSOpen(false)}
            aria-label="Close CMS Studio"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#F3EDE1',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={22} />
          </button>
        </div>
      </header>

      {/* Tabs Bar */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          backgroundColor: '#141718',
          borderBottom: '1px solid rgba(214, 184, 121, 0.2)',
          padding: '6px 12px',
          gap: '6px',
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeCMSTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCMSTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: isActive ? '#123B35' : 'transparent',
                color: isActive ? '#D6B879' : '#A3ABA6',
                border: `1px solid ${isActive ? '#D6B879' : 'transparent'}`,
                borderRadius: '2px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === 'inbox' && reservations.length > 0 && (
                <span style={{ backgroundColor: '#D6B879', color: '#17191A', borderRadius: '10px', padding: '1px 6px', fontSize: '9px', fontWeight: 700 }}>
                  {reservations.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main CMS Editor Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* TAB 0: RESERVATIONS INBOX */}
        {activeCMSTab === 'inbox' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              <div>
                <h3 style={{ fontSize: '18px', color: '#D6B879', margin: 0 }}>
                  Customer Reservation Requests ({reservations.length})
                </h3>
                <span style={{ fontSize: '11px', color: '#A3ABA6' }}>
                  Live inquiries stored in Django backend database
                </span>
              </div>
              <button
                onClick={() => loadReservations()}
                style={addBtnStyle}
              >
                Refresh List
              </button>
            </div>

            {reservations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#718C7D', backgroundColor: '#0F2521', border: '1px dashed rgba(214, 184, 121, 0.2)' }}>
                <Inbox size={40} style={{ opacity: 0.4, marginBottom: '12px' }} />
                <p style={{ fontSize: '14px', color: '#F3EDE1' }}>No reservations logged yet.</p>
                <p style={{ fontSize: '12px' }}>Customer submissions from the website will appear here in real time.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {reservations.map((res) => {
                  const isPending = res.status === 'pending';
                  const isConfirmed = res.status === 'confirmed';
                  return (
                    <div
                      key={res.id}
                      style={{
                        backgroundColor: '#0F2521',
                        border: `1px solid ${isConfirmed ? '#25D366' : isPending ? '#D6B879' : 'rgba(255, 107, 107, 0.4)'}`,
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        borderRadius: '2px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 600, color: '#F3EDE1' }}>
                              {res.full_name}
                            </span>
                            <span
                              style={{
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                padding: '2px 8px',
                                borderRadius: '2px',
                                fontWeight: 700,
                                backgroundColor: isConfirmed ? 'rgba(37, 211, 102, 0.2)' : isPending ? 'rgba(214, 184, 121, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                                color: isConfirmed ? '#25D366' : isPending ? '#D6B879' : '#FF6B6B',
                              }}
                            >
                              {res.status}
                            </span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#D6B879' }}>
                            {res.date} at {res.time} • {res.guests} ({res.occasion})
                          </span>
                        </div>

                        {/* Status Change Buttons */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {res.status !== 'confirmed' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'confirmed')}
                              title="Confirm Reservation"
                              style={{
                                background: '#123B35',
                                border: '1px solid #25D366',
                                color: '#25D366',
                                padding: '4px 8px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <CheckCircle size={12} /> Confirm
                            </button>
                          )}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => updateReservationStatus(res.id, 'cancelled')}
                              title="Cancel Reservation"
                              style={{
                                background: 'transparent',
                                border: '1px solid #FF6B6B',
                                color: '#FF6B6B',
                                padding: '4px 8px',
                                fontSize: '11px',
                                cursor: 'pointer',
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: '#A3ABA6', borderTop: '1px solid rgba(214, 184, 121, 0.15)', paddingTop: '10px' }}>
                        <a href={`tel:${res.phone}`} style={{ color: '#D6B879', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Phone size={12} /> {res.phone}
                        </a>
                        {res.email && (
                          <a href={`mailto:${res.email}`} style={{ color: '#A3ABA6', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={12} /> {res.email}
                          </a>
                        )}
                        {res.special_requests && (
                          <span style={{ color: '#F3EDE1' }}>
                            Note: "{res.special_requests}"
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 1. THEME & COLORS */}
        {activeCMSTab === 'theme' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Brand Identity &amp; Color Scheme
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <InputField
                label="Restaurant Name"
                value={config.name}
                onChange={(val) => updateRootField('name', val)}
              />
              <InputField
                label="Currency Symbol"
                value={config.currency}
                onChange={(val) => updateRootField('currency', val)}
              />
            </div>

            <InputField
              label="Tagline"
              value={config.tagline}
              onChange={(val) => updateRootField('tagline', val)}
            />

            <h4 style={{ fontSize: '14px', color: '#D6B879', marginTop: '12px' }}>Core Brand Palette</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
              <ColorPickerField
                label="Emerald Green"
                value={config.theme?.colors?.emerald || '#123B35'}
                onChange={(v) => handleColorChange('emerald', v)}
              />
              <ColorPickerField
                label="Champagne Gold"
                value={config.theme?.colors?.gold || '#D6B879'}
                onChange={(v) => handleColorChange('gold', v)}
              />
              <ColorPickerField
                label="Obsidian Dark"
                value={config.theme?.colors?.obsidian || '#17191A'}
                onChange={(v) => handleColorChange('obsidian', v)}
              />
              <ColorPickerField
                label="Pearl White"
                value={config.theme?.colors?.pearl || '#F3EDE1'}
                onChange={(v) => handleColorChange('pearl', v)}
              />
              <ColorPickerField
                label="Dusty Jade"
                value={config.theme?.colors?.jade || '#718C7D'}
                onChange={(v) => handleColorChange('jade', v)}
              />
              <ColorPickerField
                label="Bronze Accent"
                value={config.theme?.colors?.bronze || '#99764B'}
                onChange={(v) => handleColorChange('bronze', v)}
              />
            </div>

            <h4 style={{ fontSize: '14px', color: '#D6B879', marginTop: '12px' }}>Primary Buttons Styling</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
              <ColorPickerField
                label="Button Background"
                value={config.theme?.colors?.primaryButtonBg || '#123B35'}
                onChange={(v) => handleColorChange('primaryButtonBg', v)}
              />
              <ColorPickerField
                label="Button Text"
                value={config.theme?.colors?.primaryButtonText || '#E8D3A2'}
                onChange={(v) => handleColorChange('primaryButtonText', v)}
              />
              <ColorPickerField
                label="Button Border"
                value={config.theme?.colors?.primaryButtonBorder || '#D6B879'}
                onChange={(v) => handleColorChange('primaryButtonBorder', v)}
              />
            </div>
          </div>
        )}

        {/* 2. TYPOGRAPHY */}
        {activeCMSTab === 'typography' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Typography &amp; Hierarchy
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#D6B879', marginBottom: '6px' }}>
                Primary Display Font (Headings)
              </label>
              <select
                value={config.theme?.typography?.fontDisplay || 'Bodoni Moda'}
                onChange={(e) => handleTypographyChange('fontDisplay', e.target.value)}
                style={selectStyle}
              >
                <option value="Bodoni Moda">Bodoni Moda (Art Deco Editorial)</option>
                <option value="Playfair Display">Playfair Display (Classic Luxury)</option>
                <option value="Cinzel">Cinzel (Architectural Roman)</option>
                <option value="Prata">Prata (Refined High Contrast)</option>
                <option value="Georgia">Georgia (Serif Standard)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#D6B879', marginBottom: '6px' }}>
                Secondary Body Font (Reading &amp; UI)
              </label>
              <select
                value={config.theme?.typography?.fontBody || 'Montserrat'}
                onChange={(e) => handleTypographyChange('fontBody', e.target.value)}
                style={selectStyle}
              >
                <option value="Montserrat">Montserrat (Geometric Art Deco)</option>
                <option value="Inter">Inter (Ultra Clean Modern)</option>
                <option value="Open Sans">Open Sans (Balanced Neutral)</option>
                <option value="Lato">Lato (Warm Sans)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#D6B879', marginBottom: '6px' }}>
                Accent Font (Quotations &amp; Italics)
              </label>
              <select
                value={config.theme?.typography?.fontAccent || 'Cormorant Garamond'}
                onChange={(e) => handleTypographyChange('fontAccent', e.target.value)}
                style={selectStyle}
              >
                <option value="Cormorant Garamond">Cormorant Garamond (Graceful Elegance)</option>
                <option value="Italianno">Italianno (Flowing Script)</option>
                <option value="Garamond">Garamond Classic</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
              <SliderField
                label="Base Body Size"
                min={13}
                max={20}
                unit="px"
                value={config.theme?.typography?.bodySize || 16}
                onChange={(v) => handleTypographyChange('bodySize', v)}
              />
              <SliderField
                label="Hero Heading Scale"
                min={48}
                max={110}
                unit="px"
                value={config.theme?.typography?.heroHeadingSize || 84}
                onChange={(v) => handleTypographyChange('heroHeadingSize', v)}
              />
            </div>
          </div>
        )}

        {/* 3. HERO SECTION */}
        {activeCMSTab === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Hero: The Grand Arrival
            </h3>

            <InputField
              label="Eyebrow Label"
              value={config.hero.eyebrow}
              onChange={(v) => updateSection('hero', { eyebrow: v })}
            />
            <InputField
              label="Main Headline"
              value={config.hero.title}
              onChange={(v) => updateSection('hero', { title: v })}
            />
            <TextareaField
              label="Supporting Description"
              value={config.hero.description}
              onChange={(v) => updateSection('hero', { description: v })}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <InputField
                label="Primary Button Text"
                value={config.hero.primaryCta}
                onChange={(v) => updateSection('hero', { primaryCta: v })}
              />
              <InputField
                label="Secondary Button Text"
                value={config.hero.secondaryCta}
                onChange={(v) => updateSection('hero', { secondaryCta: v })}
              />
            </div>

            <InputField
              label="Location Badge"
              value={config.hero.locationBadge}
              onChange={(v) => updateSection('hero', { locationBadge: v })}
            />

            <ImageField
              label="Fallback Hero Image (when 3D is disabled)"
              value={config.hero.fallbackImage}
              onChange={(v) => updateSection('hero', { fallbackImage: v })}
            />
          </div>
        )}

        {/* 4. BRAND INTRO */}
        {activeCMSTab === 'brandIntro' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Brand Story &amp; Philosophy
            </h3>

            <InputField
              label="Eyebrow"
              value={config.brandIntro.eyebrow}
              onChange={(v) => updateSection('brandIntro', { eyebrow: v })}
            />
            <InputField
              label="Section Heading"
              value={config.brandIntro.title}
              onChange={(v) => updateSection('brandIntro', { title: v })}
            />
            <TextareaField
              label="Lead Statement (Italic Accent)"
              value={config.brandIntro.lead}
              onChange={(v) => updateSection('brandIntro', { lead: v })}
            />
            <TextareaField
              label="Full Story Description"
              value={config.brandIntro.description}
              onChange={(v) => updateSection('brandIntro', { description: v })}
            />
            <InputField
              label="Secondary Highlight Statement"
              value={config.brandIntro.secondaryStatement}
              onChange={(v) => updateSection('brandIntro', { secondaryStatement: v })}
            />
            <InputField
              label="Button Text"
              value={config.brandIntro.cta}
              onChange={(v) => updateSection('brandIntro', { cta: v })}
            />
            <ImageField
              label="Brand Story Image"
              value={config.brandIntro.image}
              onChange={(v) => updateSection('brandIntro', { image: v })}
            />
          </div>
        )}

        {/* 5. VIRTUAL TOUR */}
        {activeCMSTab === 'tour' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              3D Virtual Tour Viewpoints ({config.tourViewpoints.length})
            </h3>

            {config.tourViewpoints.map((vp, idx) => (
              <div
                key={vp.id}
                style={{
                  backgroundColor: '#0F2521',
                  border: '1px solid rgba(214, 184, 121, 0.25)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <span style={{ color: '#D6B879', fontWeight: 700, fontSize: '13px' }}>
                  Viewpoint {vp.number}: {vp.name}
                </span>

                <InputField
                  label="Location Name"
                  value={vp.name}
                  onChange={(v) => {
                    const next = [...config.tourViewpoints];
                    next[idx] = { ...next[idx], name: v };
                    updateRootField('tourViewpoints', next);
                  }}
                />

                <InputField
                  label="Caption Heading"
                  value={vp.caption}
                  onChange={(v) => {
                    const next = [...config.tourViewpoints];
                    next[idx] = { ...next[idx], caption: v };
                    updateRootField('tourViewpoints', next);
                  }}
                />

                <TextareaField
                  label="Description"
                  value={vp.description}
                  onChange={(v) => {
                    const next = [...config.tourViewpoints];
                    next[idx] = { ...next[idx], description: v };
                    updateRootField('tourViewpoints', next);
                  }}
                />

                <ImageField
                  label="360 Panoramic / Architectural Texture Image"
                  value={vp.image}
                  onChange={(v) => {
                    const next = [...config.tourViewpoints];
                    next[idx] = { ...next[idx], image: v };
                    updateRootField('tourViewpoints', next);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 6. DINING PILLARS */}
        {activeCMSTab === 'experience' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Signature Dining Experience Pillars
            </h3>

            {config.experiencePillars.map((p, idx) => (
              <div
                key={p.number}
                style={{
                  backgroundColor: '#0F2521',
                  border: '1px solid rgba(214, 184, 121, 0.2)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <span style={{ color: '#D6B879', fontWeight: 700, fontSize: '12px' }}>
                  Pillar {p.number}
                </span>
                <InputField
                  label="Title"
                  value={p.title}
                  onChange={(v) => {
                    const next = [...config.experiencePillars];
                    next[idx] = { ...next[idx], title: v };
                    updateRootField('experiencePillars', next);
                  }}
                />
                <TextareaField
                  label="Description"
                  value={p.description}
                  onChange={(v) => {
                    const next = [...config.experiencePillars];
                    next[idx] = { ...next[idx], description: v };
                    updateRootField('experiencePillars', next);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 7. SIGNATURE DISHES */}
        {activeCMSTab === 'signature' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '18px', color: '#D6B879', margin: 0 }}>
                Signature Dishes ({config.signatureDishes.length})
              </h3>
              <button
                onClick={() => {
                  const newDish = {
                    id: `sig-${Date.now()}`,
                    name: 'New Signature Dish',
                    price: 950,
                    category: 'Grills',
                    tag: 'Chef Choice',
                    dietary: 'Specialty',
                    description: 'Handcrafted signature dish seasoned with aromatic spices.',
                    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900',
                  };
                  updateRootField('signatureDishes', [...config.signatureDishes, newDish]);
                }}
                style={addBtnStyle}
              >
                <Plus size={14} /> Add Signature Dish
              </button>
            </div>

            {config.signatureDishes.map((dish, idx) => (
              <div
                key={dish.id}
                style={{
                  backgroundColor: '#0F2521',
                  border: '1px solid rgba(214, 184, 121, 0.25)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#D6B879', fontWeight: 600, fontSize: '14px' }}>
                    #{idx + 1} — {dish.name}
                  </span>
                  {config.signatureDishes.length > 1 && (
                    <button
                      onClick={() => {
                        const next = config.signatureDishes.filter((_, i) => i !== idx);
                        updateRootField('signatureDishes', next);
                      }}
                      style={{ background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                  <InputField
                    label="Dish Name"
                    value={dish.name}
                    onChange={(v) => {
                      const next = [...config.signatureDishes];
                      next[idx] = { ...next[idx], name: v };
                      updateRootField('signatureDishes', next);
                    }}
                  />
                  <InputField
                    label="Price"
                    type="number"
                    value={dish.price}
                    onChange={(v) => {
                      const next = [...config.signatureDishes];
                      next[idx] = { ...next[idx], price: Number(v) || 0 };
                      updateRootField('signatureDishes', next);
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <InputField
                    label="Badge / Tag"
                    value={dish.tag}
                    onChange={(v) => {
                      const next = [...config.signatureDishes];
                      next[idx] = { ...next[idx], tag: v };
                      updateRootField('signatureDishes', next);
                    }}
                  />
                  <InputField
                    label="Dietary Label"
                    value={dish.dietary}
                    onChange={(v) => {
                      const next = [...config.signatureDishes];
                      next[idx] = { ...next[idx], dietary: v };
                      updateRootField('signatureDishes', next);
                    }}
                  />
                </div>

                <TextareaField
                  label="Description"
                  value={dish.description}
                  onChange={(v) => {
                    const next = [...config.signatureDishes];
                    next[idx] = { ...next[idx], description: v };
                    updateRootField('signatureDishes', next);
                  }}
                />

                <ImageField
                  label="Dish Image URL"
                  value={dish.image}
                  onChange={(v) => {
                    const next = [...config.signatureDishes];
                    next[idx] = { ...next[idx], image: v };
                    updateRootField('signatureDishes', next);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 8. FULL MENU */}
        {activeCMSTab === 'menu' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '18px', color: '#D6B879', margin: 0 }}>
                Menu Repertoire ({config.menuItems.length} items)
              </h3>
              <button
                onClick={() => {
                  const newItem = {
                    id: `m-${Date.now()}`,
                    name: 'New Culinary Creation',
                    price: 650,
                    category: config.menuCategories[1] || 'Starters',
                    dietary: 'House Special',
                    description: 'A delectable culinary offering crafted by our chefs.',
                    available: true,
                  };
                  updateRootField('menuItems', [newItem, ...config.menuItems]);
                }}
                style={addBtnStyle}
              >
                <Plus size={14} /> Add Menu Item
              </button>
            </div>

            {config.menuItems.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#0F2521',
                  border: '1px solid rgba(214, 184, 121, 0.2)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#D6B879', fontWeight: 600, fontSize: '13px' }}>
                    {item.name} — {config.currency}{item.price}
                  </span>
                  <button
                    onClick={() => {
                      const next = config.menuItems.filter((_, i) => i !== idx);
                      updateRootField('menuItems', next);
                    }}
                    style={{ background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                  <InputField
                    label="Name"
                    value={item.name}
                    onChange={(v) => {
                      const next = [...config.menuItems];
                      next[idx] = { ...next[idx], name: v };
                      updateRootField('menuItems', next);
                    }}
                  />
                  <InputField
                    label="Price"
                    type="number"
                    value={item.price}
                    onChange={(v) => {
                      const next = [...config.menuItems];
                      next[idx] = { ...next[idx], price: Number(v) || 0 };
                      updateRootField('menuItems', next);
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#D6B879', marginBottom: '4px' }}>Category</label>
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const next = [...config.menuItems];
                        next[idx] = { ...next[idx], category: e.target.value };
                        updateRootField('menuItems', next);
                      }}
                      style={selectStyle}
                    >
                      {config.menuCategories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputField
                    label="Dietary Tag"
                    value={item.dietary}
                    onChange={(v) => {
                      const next = [...config.menuItems];
                      next[idx] = { ...next[idx], dietary: v };
                      updateRootField('menuItems', next);
                    }}
                  />
                </div>

                <TextareaField
                  label="Description"
                  value={item.description}
                  onChange={(v) => {
                    const next = [...config.menuItems];
                    next[idx] = { ...next[idx], description: v };
                    updateRootField('menuItems', next);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 9. INTERIOR & ARCHITECTURE */}
        {activeCMSTab === 'interior' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Interior &amp; Architecture
            </h3>

            <InputField
              label="Main Heading"
              value={config.interior.heading}
              onChange={(v) => updateSection('interior', { heading: v })}
            />
            <TextareaField
              label="Description"
              value={config.interior.description}
              onChange={(v) => updateSection('interior', { description: v })}
            />

            <ImageField
              label="Large Panoramic Image URL"
              value={config.interior.mainImage}
              onChange={(v) => updateSection('interior', { mainImage: v })}
            />
            <ImageField
              label="Supporting Image 1 URL"
              value={config.interior.subImage1}
              onChange={(v) => updateSection('interior', { subImage1: v })}
            />
            <ImageField
              label="Supporting Image 2 URL"
              value={config.interior.subImage2}
              onChange={(v) => updateSection('interior', { subImage2: v })}
            />
          </div>
        )}

        {/* 10. MEET THE CHEF */}
        {activeCMSTab === 'chef' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Meet the Chef
            </h3>

            <InputField
              label="Section Eyebrow"
              value={config.chef.eyebrow}
              onChange={(v) => updateSection('chef', { eyebrow: v })}
            />
            <InputField
              label="Section Heading"
              value={config.chef.heading}
              onChange={(v) => updateSection('chef', { heading: v })}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <InputField
                label="Chef Full Name"
                value={config.chef.name}
                onChange={(v) => updateSection('chef', { name: v })}
              />
              <InputField
                label="Chef Title / Role"
                value={config.chef.title}
                onChange={(v) => updateSection('chef', { title: v })}
              />
            </div>

            <TextareaField
              label="Culinary Direction Description"
              value={config.chef.description}
              onChange={(v) => updateSection('chef', { description: v })}
            />
            <TextareaField
              label="Chef Quotation"
              value={config.chef.quote}
              onChange={(v) => updateSection('chef', { quote: v })}
            />
            <InputField
              label="Experience Badge"
              value={config.chef.experienceYears}
              onChange={(v) => updateSection('chef', { experienceYears: v })}
            />
            <ImageField
              label="Chef Portrait Image URL"
              value={config.chef.image}
              onChange={(v) => updateSection('chef', { image: v })}
            />
          </div>
        )}

        {/* 11. SPECIAL EXPERIENCES */}
        {activeCMSTab === 'experiences' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Special Experiences (4 Occasions)
            </h3>

            {config.specialExperiences.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: '#0F2521',
                  border: '1px solid rgba(214, 184, 121, 0.25)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <span style={{ color: '#D6B879', fontWeight: 600, fontSize: '14px' }}>
                  #{idx + 1} — {exp.title}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <InputField
                    label="Title"
                    value={exp.title}
                    onChange={(v) => {
                      const next = [...config.specialExperiences];
                      next[idx] = { ...next[idx], title: v };
                      updateRootField('specialExperiences', next);
                    }}
                  />
                  <InputField
                    label="Subtitle"
                    value={exp.subtitle}
                    onChange={(v) => {
                      const next = [...config.specialExperiences];
                      next[idx] = { ...next[idx], subtitle: v };
                      updateRootField('specialExperiences', next);
                    }}
                  />
                </div>
                <TextareaField
                  label="Description"
                  value={exp.description}
                  onChange={(v) => {
                    const next = [...config.specialExperiences];
                    next[idx] = { ...next[idx], description: v };
                    updateRootField('specialExperiences', next);
                  }}
                />
                <InputField
                  label="Button CTA Text"
                  value={exp.cta}
                  onChange={(v) => {
                    const next = [...config.specialExperiences];
                    next[idx] = { ...next[idx], cta: v };
                    updateRootField('specialExperiences', next);
                  }}
                />
                <ImageField
                  label="Experience Image URL"
                  value={exp.image}
                  onChange={(v) => {
                    const next = [...config.specialExperiences];
                    next[idx] = { ...next[idx], image: v };
                    updateRootField('specialExperiences', next);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 12. GALLERY */}
        {activeCMSTab === 'gallery' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '18px', color: '#D6B879', margin: 0 }}>
                Visual Gallery ({config.galleryImages.length} photos)
              </h3>
              <button
                onClick={() => {
                  const newImg = {
                    id: `g-${Date.now()}`,
                    title: 'Grand Salon Atmosphere',
                    category: 'Restaurant Interior',
                    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
                    aspect: 'wide',
                  };
                  updateRootField('galleryImages', [newImg, ...config.galleryImages]);
                }}
                style={addBtnStyle}
              >
                <Plus size={14} /> Add Gallery Image
              </button>
            </div>

            {config.galleryImages.map((img, idx) => (
              <div
                key={img.id}
                style={{
                  backgroundColor: '#0F2521',
                  border: '1px solid rgba(214, 184, 121, 0.2)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#D6B879', fontSize: '13px', fontWeight: 600 }}>
                    #{idx + 1} {img.title}
                  </span>
                  <button
                    onClick={() => {
                      const next = config.galleryImages.filter((_, i) => i !== idx);
                      updateRootField('galleryImages', next);
                    }}
                    style={{ background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                  <InputField
                    label="Photo Title"
                    value={img.title}
                    onChange={(v) => {
                      const next = [...config.galleryImages];
                      next[idx] = { ...next[idx], title: v };
                      updateRootField('galleryImages', next);
                    }}
                  />
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#D6B879', marginBottom: '4px' }}>Category</label>
                    <select
                      value={img.category}
                      onChange={(e) => {
                        const next = [...config.galleryImages];
                        next[idx] = { ...next[idx], category: e.target.value };
                        updateRootField('galleryImages', next);
                      }}
                      style={selectStyle}
                    >
                      {config.galleryCategories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <ImageField
                  label="Image URL"
                  value={img.image}
                  onChange={(v) => {
                    const next = [...config.galleryImages];
                    next[idx] = { ...next[idx], image: v };
                    updateRootField('galleryImages', next);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 13. TESTIMONIALS */}
        {activeCMSTab === 'testimonials' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '18px', color: '#D6B879', margin: 0 }}>
                Guest Testimonials ({config.testimonials.length})
              </h3>
              <button
                onClick={() => {
                  const newT = {
                    id: `t-${Date.now()}`,
                    quote: 'An unforgettable evening of culinary perfection and splendid architecture.',
                    author: 'Guest Reviewer',
                    title: 'Private Dinner Guest',
                    rating: 5,
                    date: 'November 2026',
                  };
                  updateRootField('testimonials', [...config.testimonials, newT]);
                }}
                style={addBtnStyle}
              >
                <Plus size={14} /> Add Review
              </button>
            </div>

            {config.testimonials.map((t, idx) => (
              <div
                key={t.id}
                style={{
                  backgroundColor: '#0F2521',
                  border: '1px solid rgba(214, 184, 121, 0.25)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#D6B879', fontWeight: 600, fontSize: '13px' }}>
                    #{idx + 1} {t.author}
                  </span>
                  <button
                    onClick={() => {
                      const next = config.testimonials.filter((_, i) => i !== idx);
                      updateRootField('testimonials', next);
                    }}
                    style={{ background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <TextareaField
                  label="Review Quote"
                  value={t.quote}
                  onChange={(v) => {
                    const next = [...config.testimonials];
                    next[idx] = { ...next[idx], quote: v };
                    updateRootField('testimonials', next);
                  }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <InputField
                    label="Author Name"
                    value={t.author}
                    onChange={(v) => {
                      const next = [...config.testimonials];
                      next[idx] = { ...next[idx], author: v };
                      updateRootField('testimonials', next);
                    }}
                  />
                  <InputField
                    label="Role / Title"
                    value={t.title}
                    onChange={(v) => {
                      const next = [...config.testimonials];
                      next[idx] = { ...next[idx], title: v };
                      updateRootField('testimonials', next);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 14. CONTACT & LOCATION */}
        {activeCMSTab === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Contact, Hours &amp; Location
            </h3>

            <InputField
              label="Full Physical Address"
              value={config.contact.fullAddress}
              onChange={(v) => updateSection('contact', { fullAddress: v })}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <InputField
                label="Telephone"
                value={config.contact.phoneDisplay}
                onChange={(v) => updateSection('contact', { phoneDisplay: v, phone: v })}
              />
              <InputField
                label="Email Address"
                value={config.contact.email}
                onChange={(v) => updateSection('contact', { email: v })}
              />
            </div>

            <InputField
              label="WhatsApp Number (International format)"
              value={config.contact.whatsapp}
              onChange={(v) => updateSection('contact', { whatsapp: v, whatsappDisplay: v })}
            />

            <InputField
              label="Google Maps Embed URL"
              value={config.contact.googleMapsEmbedUrl}
              onChange={(v) => updateSection('contact', { googleMapsEmbedUrl: v })}
            />
          </div>
        )}

        {/* 15. FOOTER */}
        {activeCMSTab === 'footer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '18px', color: '#D6B879', borderBottom: '1px solid rgba(214, 184, 121, 0.3)', paddingBottom: '8px' }}>
              Footer &amp; Social Links
            </h3>

            <InputField
              label="Instagram URL"
              value={config.social.instagram}
              onChange={(v) => updateSection('social', { instagram: v })}
            />
            <InputField
              label="Facebook URL"
              value={config.social.facebook}
              onChange={(v) => updateSection('social', { facebook: v })}
            />
            <InputField
              label="YouTube URL"
              value={config.social.youtube}
              onChange={(v) => updateSection('social', { youtube: v })}
            />
          </div>
        )}
      </div>
    </aside>
  );
}

// Subcomponents for CMS fields
function InputField({ label, value, onChange, type = 'text' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D6B879', fontWeight: 600 }}>
        {label}
      </label>
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 12px',
          backgroundColor: '#0D1110',
          border: '1px solid rgba(214, 184, 121, 0.3)',
          color: '#F3EDE1',
          fontSize: '13px',
          outline: 'none',
          borderRadius: '2px',
        }}
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, rows = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D6B879', fontWeight: 600 }}>
        {label}
      </label>
      <textarea
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 12px',
          backgroundColor: '#0D1110',
          border: '1px solid rgba(214, 184, 121, 0.3)',
          color: '#F3EDE1',
          fontSize: '13px',
          outline: 'none',
          borderRadius: '2px',
          resize: 'vertical',
        }}
      />
    </div>
  );
}

function ColorPickerField({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '11px', color: '#D6B879', fontWeight: 600 }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '36px',
            height: '36px',
            border: '1px solid #D6B879',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        />
        <span style={{ fontSize: '12px', color: '#A3ABA6', fontFamily: 'monospace' }}>
          {value}
        </span>
      </div>
    </div>
  );
}

function SliderField({ label, value, onChange, min, max, unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#D6B879' }}>
        <span style={{ fontWeight: 600 }}>{label}</span>
        <span>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: '#D6B879', width: '100%' }}
      />
    </div>
  );
}

function ImageField({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D6B879', fontWeight: 600 }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {value && (
          <img
            src={value}
            alt="Preview"
            style={{ width: '48px', height: '48px', objectFit: 'cover', border: '1px solid #D6B879' }}
          />
        )}
        <input
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          style={{
            flex: 1,
            padding: '10px 12px',
            backgroundColor: '#0D1110',
            border: '1px solid rgba(214, 184, 121, 0.3)',
            color: '#F3EDE1',
            fontSize: '12px',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}

const selectStyle = {
  width: '100%',
  padding: '10px 12px',
  backgroundColor: '#0D1110',
  border: '1px solid rgba(214, 184, 121, 0.3)',
  color: '#F3EDE1',
  fontSize: '13px',
  outline: 'none',
  borderRadius: '2px',
};

const addBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  backgroundColor: '#123B35',
  border: '1px solid #D6B879',
  color: '#D6B879',
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 600,
  cursor: 'pointer',
  borderRadius: '2px',
};
