/**
 * app.js
 * Main application script.
 * Loads portfolio data and renders page sections dynamically.
 */

import { portfolioData } from '../data/portfolioData.js';
import { getQueryParam, sanitizeHTML } from './utils.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const pageType = document.body.dataset.page;
  
  // Render general profile links in headers/footers if elements exist
  injectGlobalProfileInfo();

  // Route page-specific rendering
  switch (pageType) {
    case 'home':
      renderHomePage();
      break;
    case 'projects':
      renderProjectsPage();
      break;
    case 'project-detail':
      renderProjectDetailPage();
      break;
    case 'about':
      renderAboutPage();
      break;
    case 'contact':
      renderContactPage();
      break;
  }
});

/**
 * Injects basic profile info into elements with matching data attributes
 */
function injectGlobalProfileInfo() {
  const profile = portfolioData.profile;
  
  // Dynamic email links
  document.querySelectorAll('[data-profile="email"]').forEach(el => {
    el.textContent = profile.email;
    if (el.tagName === 'A') {
      el.href = `mailto:${profile.email}`;
    }
  });

  // Dynamic phone links
  document.querySelectorAll('[data-profile="phone"]').forEach(el => {
    el.textContent = profile.phone;
    if (el.tagName === 'A') {
      el.href = `tel:${profile.phone.replace(/\s+/g, '')}`;
    }
  });

  // Dynamic CV links
  document.querySelectorAll('[data-profile="cv"]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = profile.cvLink;
    }
  });
}

/**
 * 1. Home Page Rendering Logic
 */
function renderHomePage() {
  const profile = portfolioData.profile;
  
  // Hero section injection
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  if (heroTitle) heroTitle.innerHTML = `Soy <span class="text-accent-gradient">${sanitizeHTML(profile.fullName)}</span>`;
  if (heroDesc) heroDesc.textContent = profile.aboutShort;

  // Injects grouped skills into Home
  renderGroupedSkills('tech-grid');

  // Injects featured projects (max 3)
  const featuredGrid = document.getElementById('featured-projects-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = '';
    // Slice first 3 projects
    const featured = portfolioData.projects.slice(0, 3);
    
    featured.forEach(proj => {
      const card = document.createElement('project-card');
      card.setAttribute('project-id', proj.id);
      card.setAttribute('title', proj.title);
      card.setAttribute('description', proj.shortDescription);
      card.setAttribute('tech', proj.technologies.join(', '));
      card.setAttribute('image', proj.image);
      
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4 mb-4';
      col.appendChild(card);
      featuredGrid.appendChild(col);
    });
  }
}

/**
 * 2. Grouped Skills Injector (Home & About pages)
 */
function renderGroupedSkills(containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  
  grid.innerHTML = '';
  
  portfolioData.skills.categories.forEach(cat => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 mb-4';
    
    const itemsHtml = cat.items.map(item => `
      <div class="tech-item-row">
        <div class="tech-item-icon" aria-hidden="true">
          ${getTechSVG(item.icon)}
        </div>
        <div class="tech-item-info">
          <h4 class="tech-item-name">${sanitizeHTML(item.name)}</h4>
          <p class="tech-item-desc">${sanitizeHTML(item.description)}</p>
        </div>
      </div>
    `).join('');
    
    col.innerHTML = `
      <div class="tech-group-card">
        <h3 class="tech-group-title">
          <span>${sanitizeHTML(cat.title)}</span>
        </h3>
        <div class="tech-items-container">
          ${itemsHtml}
        </div>
      </div>
    `;
    
    grid.appendChild(col);
  });
}

/**
 * 3. Projects Page Rendering Logic with Live Filters and Search
 */
function renderProjectsPage() {
  const projectsGrid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('project-search');
  const filterTagsContainer = document.getElementById('filter-tags-container');
  
  if (!projectsGrid) return;
  
  let activeFilter = 'All';
  let searchQuery = '';
  
  // Extract all unique technologies across all projects to create filter badges
  const allTech = ['All'];
  portfolioData.projects.forEach(p => {
    p.technologies.forEach(t => {
      if (!allTech.includes(t)) {
        allTech.push(t);
      }
    });
  });
  
  // Render filter badges
  if (filterTagsContainer) {
    filterTagsContainer.innerHTML = '';
    allTech.forEach(tech => {
      const chip = document.createElement('button');
      chip.className = `btn tech-chip ${tech === 'All' ? 'tech-chip-active' : ''}`;
      chip.textContent = tech;
      chip.dataset.tech = tech;
      chip.addEventListener('click', () => {
        // Toggle active status
        filterTagsContainer.querySelectorAll('.tech-chip').forEach(c => c.classList.remove('tech-chip-active'));
        chip.classList.add('tech-chip-active');
        
        activeFilter = tech;
        filterAndRender();
      });
      filterTagsContainer.appendChild(chip);
    });
  }
  
  // Search event handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterAndRender();
    });
  }
  
  // Initial render
  filterAndRender();
  
  function filterAndRender() {
    projectsGrid.innerHTML = '';
    
    const filtered = portfolioData.projects.filter(proj => {
      const matchesSearch = proj.title.toLowerCase().includes(searchQuery) || 
                            proj.shortDescription.toLowerCase().includes(searchQuery) ||
                            proj.technologies.some(t => t.toLowerCase().includes(searchQuery));
      const matchesTech = activeFilter === 'All' || proj.technologies.includes(activeFilter);
      
      return matchesSearch && matchesTech;
    });
    
    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div class="col-12">
          <div class="no-results">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mb-3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <h4 class="text-gradient">No se encontraron proyectos</h4>
            <p class="text-secondary mb-0">Prueba ajustando los filtros o tu término de búsqueda.</p>
          </div>
        </div>
      `;
      return;
    }
    
    filtered.forEach(proj => {
      const card = document.createElement('project-card');
      card.setAttribute('project-id', proj.id);
      card.setAttribute('title', proj.title);
      card.setAttribute('description', proj.shortDescription);
      card.setAttribute('tech', proj.technologies.join(', '));
      card.setAttribute('image', proj.image);
      
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4 mb-4';
      col.appendChild(card);
      projectsGrid.appendChild(col);
    });
  }
}

/**
 * 4. Project Detail Page Logic
 */
function renderProjectDetailPage() {
  const projectId = getQueryParam('id');
  if (!projectId) {
    window.location.href = '404.html';
    return;
  }
  
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) {
    window.location.href = '404.html';
    return;
  }
  
  // Inject details into DOM elements
  document.title = `${project.title} - Portfolio Profesional`;
  
  const titleEl = document.getElementById('project-detail-title');
  const summaryEl = document.getElementById('project-detail-summary');
  const imageEl = document.getElementById('project-detail-image');
  const codeLinkEl = document.getElementById('project-code-link');
  const demoLinkEl = document.getElementById('project-demo-link');
  
  const problemEl = document.getElementById('project-problem');
  const goalsEl = document.getElementById('project-goals');
  const techBadgeListEl = document.getElementById('project-tech-badges');
  const featuresEl = document.getElementById('project-features');
  
  const architectureEl = document.getElementById('project-architecture');
  const learningsEl = document.getElementById('project-learnings');
  const conclusionsEl = document.getElementById('project-conclusions');
  
  if (titleEl) titleEl.textContent = project.title;
  if (summaryEl) summaryEl.textContent = project.longDescription;
  
  if (imageEl) {
    imageEl.src = project.image;
    imageEl.alt = `Captura de pantalla de la aplicación ${project.title}`;
  }
  
  // Set link attributes
  if (codeLinkEl) {
    if (project.codeUrl && project.codeUrl !== '#') {
      codeLinkEl.href = project.codeUrl;
      codeLinkEl.classList.remove('disabled');
    } else {
      codeLinkEl.classList.add('disabled');
      codeLinkEl.style.opacity = '0.5';
      codeLinkEl.style.pointerEvents = 'none';
      codeLinkEl.textContent = 'Código Privado';
    }
  }
  
  if (demoLinkEl) {
    if (project.demoUrl && project.demoUrl !== '#') {
      demoLinkEl.href = project.demoUrl;
      demoLinkEl.classList.remove('disabled');
    } else {
      demoLinkEl.classList.add('disabled');
      demoLinkEl.style.opacity = '0.5';
      demoLinkEl.style.pointerEvents = 'none';
      demoLinkEl.textContent = 'Demo No Disponible';
    }
  }
  
  // Key specs / metadata
  if (problemEl) problemEl.textContent = project.problemSolved;
  
  if (goalsEl) {
    goalsEl.innerHTML = project.goals.map(g => `<li class="mb-2">${sanitizeHTML(g)}</li>`).join('');
  }
  
  if (techBadgeListEl) {
    techBadgeListEl.innerHTML = project.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('\n');
  }
  
  // Features list with green checks
  if (featuresEl) {
    featuresEl.innerHTML = project.features.map(f => `
      <li class="feature-list-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${sanitizeHTML(f)}</span>
      </li>
    `).join('');
  }
  
  if (architectureEl) architectureEl.textContent = project.architecture;
  
  if (learningsEl) {
    learningsEl.innerHTML = project.learnings.map(l => `<li class="mb-2">${sanitizeHTML(l)}</li>`).join('');
  }
  
  if (conclusionsEl) conclusionsEl.textContent = project.conclusions;
}

/**
 * 5. About Page Rendering Logic (Education Timeline & Profile)
 */
function renderAboutPage() {
  const profile = portfolioData.profile;
  
  // Dynamic texts
  const nameEl = document.getElementById('about-name');
  const bioEl = document.getElementById('about-bio');
  if (nameEl) nameEl.textContent = profile.fullName;
  if (bioEl) bioEl.textContent = profile.aboutLong;
  
  // Grouped skills
  renderGroupedSkills('about-tech-grid');
  
  // Education timeline
  const timeline = document.getElementById('education-timeline');
  if (timeline) {
    timeline.innerHTML = '';
    portfolioData.education.forEach(edu => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-period">${sanitizeHTML(edu.period)}</div>
        <h3 class="timeline-title">${sanitizeHTML(edu.title)}</h3>
        <div class="timeline-inst">${sanitizeHTML(edu.institution)}</div>
        <p class="timeline-desc">${sanitizeHTML(edu.description)}</p>
      `;
      timeline.appendChild(item);
    });
  }
  
  // Injects Soft Skills
  const softSkillsGrid = document.getElementById('soft-skills-grid');
  if (softSkillsGrid) {
    softSkillsGrid.innerHTML = portfolioData.skills.softSkills.map(skill => `
      <div class="col-md-6 col-lg-4 mb-3">
        <div class="d-flex align-items-center gap-2 p-3 border rounded bg-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span class="fw-medium">${sanitizeHTML(skill)}</span>
        </div>
      </div>
    `).join('');
  }
  
  // Injects Languages
  const languagesGrid = document.getElementById('languages-grid');
  if (languagesGrid) {
    languagesGrid.innerHTML = portfolioData.skills.languages.map(lang => `
      <div class="col-md-6 mb-3">
        <div class="d-flex justify-content-between align-items-center p-3 border rounded bg-secondary">
          <span class="fw-semibold text-primary">${sanitizeHTML(lang.name)}</span>
          <span class="tech-chip tech-chip-active">${sanitizeHTML(lang.level)}</span>
        </div>
      </div>
    `).join('');
  }
}

/**
 * 6. Contact Page Rendering Logic
 */
function renderContactPage() {
  const profile = portfolioData.profile;
  const methodsContainer = document.getElementById('contact-methods');
  
  if (methodsContainer) {
    methodsContainer.innerHTML = `
      <a href="mailto:${profile.email}" class="contact-method-item" id="contact-email-link">
        <div class="contact-method-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
        </div>
        <div class="contact-method-details">
          <h4>Correo Electrónico</h4>
          <p>${sanitizeHTML(profile.email)}</p>
        </div>
      </a>
      
      <a href="tel:${profile.phone.replace(/\s+/g, '')}" class="contact-method-item" id="contact-phone-link">
        <div class="contact-method-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </div>
        <div class="contact-method-details">
          <h4>Celular Principal</h4>
          <p>${sanitizeHTML(profile.phone)}</p>
        </div>
      </a>

      <div class="contact-method-item">
        <div class="contact-method-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
        <div class="contact-method-details">
          <h4>Ubicación</h4>
          <p>${sanitizeHTML(profile.location)}</p>
        </div>
      </div>
      
      <a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-method-item" id="contact-linkedin-link">
        <div class="contact-method-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </div>
        <div class="contact-method-details">
          <h4>LinkedIn</h4>
          <p>in/daniel-gonzalez-65762534b</p>
        </div>
      </a>
      
      <a href="${profile.github}" target="_blank" rel="noopener noreferrer" class="contact-method-item" id="contact-github-link">
        <div class="contact-method-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </div>
        <div class="contact-method-details">
          <h4>GitHub</h4>
          <p>github.com/Danicoins</p>
        </div>
      </a>
    `;
  }
}

/**
 * Returns the SVG markup for a given technology icon key
 */
function getTechSVG(key) {
  switch (key) {
    case 'html5':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`;
    case 'css3':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>`;
    case 'javascript':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2"></path><path d="M12 22v-4"></path><path d="M8 22h8"></path></svg>`;
    case 'responsive':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
    case 'nodejs':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M12 22V12"></path><path d="M2 17l10 5 10-5V7L12 12v10z"></path></svg>`;
    case 'python':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 5-2h-3a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h3a7 7 0 0 0-5-2 8 8 0 0 0-8 8v4a8 8 0 0 0 8 8z"></path><circle cx="9" cy="9" r="1"></circle><circle cx="15" cy="15" r="1"></circle></svg>`;
    case 'supabase':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
    case 'database':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>`;
    case 'git':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="6" y1="9" x2="6" y2="15"></line><path d="M9 18h6a3 3 0 0 0 3-3V9"></path></svg>`;
    case 'bootstrap':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 16V8h3c.85 0 1.5.3 1.5 1s-.65 1-1.5 1h-3"></path><path d="M12 10h1c.85 0 1.5.3 1.5 1s-.65 1-1.5 1H9"></path></svg>`;
    case 'api':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`;
    case 'ai':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }
}
