/**
 * ProjectCard.js
 * Native Web Component for displaying a project in grids.
 */

class ProjectCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('project-id') || '';
    const title = this.getAttribute('title') || 'Proyecto Sin Título';
    const description = this.getAttribute('description') || 'Sin descripción disponible.';
    const techString = this.getAttribute('tech') || '';
    const image = this.getAttribute('image') || 'assets/images/placeholder.png';
    
    // Parse technologies list into badges
    const techArray = techString.split(',').map(item => item.trim()).filter(Boolean);
    const badgesHtml = techArray.map(tech => `<span class="tech-chip">${tech}</span>`).join('\n            ');
    
    this.innerHTML = `
      <article class="project-card">
        <div class="card-image-wrapper">
          <img src="${image}" alt="Captura de pantalla de ${title}" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">${title}</h3>
          <p class="card-description">${description}</p>
          <div class="card-tech-list">
            ${badgesHtml}
          </div>
          <a href="project.html?id=${id}" class="card-link" id="project-link-${id}">
            <span>Ver detalles</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </article>
    `;
  }
}

customElements.define('project-card', ProjectCard);
export default ProjectCard;
