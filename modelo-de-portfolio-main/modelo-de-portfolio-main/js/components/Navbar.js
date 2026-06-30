/**
 * Navbar.js
 * Native Web Component for the site navigation header.
 */

class PortfolioNavbar extends HTMLElement {
  connectedCallback() {
    const activePage = this.getAttribute('active') || 'home';
    
    this.innerHTML = `
      <header class="navbar-wrapper">
        <div class="navbar-container">
          <a href="index.html" class="navbar-logo" id="nav-logo">
            <span class="logo-dot"></span>
            <span>Daniel Gonzalez</span>
          </a>
          
          <nav class="navbar-links" aria-label="Navegación principal">
            <a href="index.html" class="${activePage === 'home' ? 'active' : ''}" id="nav-home">Inicio</a>
            <a href="projects.html" class="${activePage === 'projects' ? 'active' : ''}" id="nav-projects">Proyectos</a>
            <a href="about.html" class="${activePage === 'about' ? 'active' : ''}" id="nav-about">Sobre mí</a>
            <a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}" id="nav-contact">Contacto</a>
          </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('portfolio-navbar', PortfolioNavbar);
export default PortfolioNavbar;
