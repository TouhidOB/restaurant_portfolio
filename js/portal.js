/**
 * CULINARY ARCHITECT // 15 LUXURY RESTAURANT EXPERIENCES
 * Master Interactive Controller: Viewport Simulator, Filter Engine & Matrix
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentProjectId = 1;
  let currentDevice = 'desktop'; // 'desktop' | 'tablet' | 'mobile'
  let isLandscape = false;
  let currentFilter = 'all';
  let searchQuery = '';

  // DOM Elements
  const previewIframe = document.getElementById('previewIframe');
  const viewportMockup = document.getElementById('viewportMockup');
  const projectSelectDropdown = document.getElementById('projectSelectDropdown');
  const deviceButtons = document.querySelectorAll('.device-btn');
  const orientationBtn = document.getElementById('orientationBtn');
  const dimensionPill = document.getElementById('dimensionPill');
  const openStandaloneBtn = document.getElementById('openStandaloneBtn');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const browserUrlText = document.getElementById('browserUrlText');
  const projectsGrid = document.getElementById('projectsGrid');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const matrixTableBody = document.getElementById('matrixTableBody');

  // Dimension Specs
  const DIMENSIONS = {
    desktop: {
      portrait: '100% × 780px (Fluid Web)',
      landscape: '100% × 780px (Fluid Web)'
    },
    tablet: {
      portrait: '768 × 960px (iPad Pro)',
      landscape: '960 × 720px (iPad Landscape)'
    },
    mobile: {
      portrait: '390 × 800px (iPhone 15)',
      landscape: '780 × 390px (iPhone Landscape)'
    }
  };

  // 1. Populate Dropdown with 15 Projects
  function initDropdown() {
    projectSelectDropdown.innerHTML = PROJECTS_DATA.map(p => `
      <option value="${p.id}">[PRD ${p.num}] ${p.name} — ${p.concept}</option>
    `).join('');

    projectSelectDropdown.addEventListener('change', (e) => {
      const id = parseInt(e.target.value, 10);
      loadProjectIntoPreview(id, false);
    });
  }

  // 2. Load Project into Viewport Simulator
  function loadProjectIntoPreview(id, shouldScroll = false) {
    const project = PROJECTS_DATA.find(p => p.id === id);
    if (!project) return;

    currentProjectId = id;
    projectSelectDropdown.value = id;

    // Show loading overlay
    loadingOverlay.classList.add('active');

    // Update simulated browser address bar
    const cleanSlug = project.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (browserUrlText) {
      browserUrlText.textContent = `https://gastronomy-collective.dev/demos/${cleanSlug}/`;
    }

    // Update standalone link
    if (openStandaloneBtn) {
      openStandaloneBtn.href = project.demoUrl;
    }

    // Update iframe source
    previewIframe.src = project.demoUrl;

    previewIframe.onload = () => {
      setTimeout(() => {
        loadingOverlay.classList.remove('active');
      }, 150);
    };

    if (shouldScroll) {
      const studioSection = document.getElementById('preview-studio');
      if (studioSection) {
        studioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // 3. Set Device Mode (Web / Tablet / Mobile)
  function setDevice(device) {
    currentDevice = device;
    isLandscape = false; // Reset orientation on device switch

    // Update button states
    deviceButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-device') === device);
    });

    // Reset mockup classes
    viewportMockup.className = `viewport-mockup mode-${device}`;

    // Manage orientation button state
    if (device === 'desktop') {
      orientationBtn.classList.add('disabled');
      orientationBtn.style.pointerEvents = 'none';
      orientationBtn.style.opacity = '0.4';
    } else {
      orientationBtn.classList.remove('disabled');
      orientationBtn.style.pointerEvents = 'auto';
      orientationBtn.style.opacity = '1';
    }

    updateDimensionPill();
  }

  // 4. Toggle Orientation (Portrait <-> Landscape)
  function toggleOrientation() {
    if (currentDevice === 'desktop') return;
    isLandscape = !isLandscape;
    viewportMockup.classList.toggle('landscape', isLandscape);
    updateDimensionPill();
  }

  function updateDimensionPill() {
    const orientKey = isLandscape ? 'landscape' : 'portrait';
    dimensionPill.textContent = DIMENSIONS[currentDevice][orientKey];
  }

  // Setup Simulator Event Listeners
  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const device = btn.getAttribute('data-device');
      setDevice(device);
    });
  });

  if (orientationBtn) {
    orientationBtn.addEventListener('click', toggleOrientation);
  }

  // 5. Render Projects Showcase Cards
  function renderProjectsCatalog() {
    const filtered = PROJECTS_DATA.filter(p => {
      const matchCat = currentFilter === 'all' || p.category === currentFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.concept.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-dim);">
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No matching restaurant concepts found.</p>
          <p style="font-size: 0.85rem;">Try adjusting your search terms or category filter.</p>
        </div>
      `;
      return;
    }

    projectsGrid.innerHTML = filtered.map(p => `
      <article class="project-card" data-id="${p.id}">
        <div class="card-media">
          <img src="${p.coverImage}" alt="${p.name} preview" loading="lazy">
          <span class="card-num-badge">PRD ${p.num}</span>
          <span class="card-concept-pill">${p.concept}</span>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${p.name}</h3>
          </div>
          <p class="card-tagline">“${p.tagline}”</p>
          <p class="card-summary">${p.summary}</p>
          
          <div class="palette-row">
            <span class="palette-label">Palette:</span>
            ${p.palette.map(c => `<span class="palette-dot" style="background-color: ${c};" title="${c}"></span>`).join('')}
          </div>

          <ul class="card-features">
            ${p.features.map(f => `<li>${f}</li>`).join('')}
          </ul>

          <div class="card-actions">
            <button class="btn-card-preview" onclick="window.previewProject(${p.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>Live Preview</span>
            </button>
            <a href="${p.demoUrl}" target="_blank" rel="noopener" class="btn-card-open" title="Open demo in new tab">
              <span>Demo</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Global window hook for card buttons
  window.previewProject = function(id) {
    loadProjectIntoPreview(id, true);
  };

  // 6. Setup Category Filter Tabs
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderProjectsCatalog();
    });
  });

  // 7. Setup Live Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProjectsCatalog();
    });
  }

  // 8. Render Comparison Matrix Table
  function renderMatrixTable() {
    if (!matrixTableBody) return;
    matrixTableBody.innerHTML = PROJECTS_DATA.map(p => `
      <tr>
        <td class="matrix-num">#${p.num}</td>
        <td style="font-weight: 700; color: #FFFFFF;">${p.name}</td>
        <td><span class="badge-gold" style="font-size: 0.68rem; padding: 0.2rem 0.5rem;">${p.concept}</span></td>
        <td>
          <div style="display: flex; gap: 4px; align-items: center;">
            ${p.palette.slice(0, 4).map(c => `<span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${c};" title="${c}"></span>`).join('')}
          </div>
        </td>
        <td style="font-size: 0.8rem;">${p.features[0]}</td>
        <td style="font-size: 0.8rem;">${p.menuHighlights[0].name} (${p.menuHighlights[0].price})</td>
        <td>
          <a href="${p.demoUrl}" target="_blank" rel="noopener" style="color: var(--primary-accent); text-decoration: underline; font-weight: 600; font-size: 0.78rem;">
            Open Page ↗
          </a>
        </td>
      </tr>
    `).join('');
  }

  // Initialization
  initDropdown();
  setDevice('desktop');
  loadProjectIntoPreview(1, false);
  renderProjectsCatalog();
  renderMatrixTable();
});
