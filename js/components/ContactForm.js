/**
 * ContactForm.js
 * Native Web Component for the interactive contact form.
 * Handles client-side validation, simulated sending state, Toast alerts, and LocalStorage logging.
 */

class ContactForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="contact-form-card">
        <h3 class="mb-4 text-gradient">Enviame un Mensaje</h3>
        <form id="portfolio-contact-form" novalidate>
          <div class="mb-3">
            <label for="form-name" class="form-label">Nombre Completo</label>
            <input 
              type="text" 
              class="form-control" 
              id="form-name" 
              name="name" 
              placeholder="Ej. Juan Pérez" 
              required
              autocomplete="name"
            >
            <div class="invalid-feedback">Por favor ingresa tu nombre completo.</div>
          </div>
          
          <div class="mb-3">
            <label for="form-email" class="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              class="form-control" 
              id="form-email" 
              name="email" 
              placeholder="nombre@correo.com" 
              required
              autocomplete="email"
            >
            <div class="invalid-feedback">Por favor ingresa un correo electrónico válido.</div>
          </div>
          
          <div class="mb-3">
            <label for="form-message" class="form-label">Mensaje o Propuesta</label>
            <textarea 
              class="form-control" 
              id="form-message" 
              name="message" 
              rows="5" 
              placeholder="Hola Daniel, me interesó tu portfolio y me gustaría conversar sobre..." 
              required
            ></textarea>
            <div class="invalid-feedback">Por favor escribe un mensaje detallando tu consulta.</div>
          </div>
          
          <button type="submit" class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" id="form-submit-btn">
            <span>Enviar Mensaje</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="d-none" id="btn-spinner"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
          </button>
        </form>
      </div>
      
      <!-- Toast Container for Notifications -->
      <div class="toast-container-custom" id="toast-container"></div>
    `;
    
    this.initFormLogic();
  }
  
  initFormLogic() {
    const form = this.querySelector('#portfolio-contact-form');
    const submitBtn = this.querySelector('#form-submit-btn');
    const spinner = this.querySelector('#btn-spinner');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform validation check
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        this.showToast('Error de Validación', 'Por favor, completa correctamente todos los campos obligatorios.', 'error');
        return;
      }
      
      // Valid form - start simulated submission
      form.classList.remove('was-validated');
      this.setSubmitting(true, submitBtn, spinner);
      
      const formData = {
        name: this.querySelector('#form-name').value.trim(),
        email: this.querySelector('#form-email').value.trim(),
        message: this.querySelector('#form-message').value.trim(),
        timestamp: new Date().toISOString()
      };
      
      // Simulate API call using setTimeout (1.5 seconds)
      setTimeout(() => {
        // Save to LocalStorage
        try {
          const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
          existingMessages.push(formData);
          localStorage.setItem('portfolio_messages', JSON.stringify(existingMessages));
          
          this.showToast(
            '¡Mensaje Registrado!', 
            'Tu mensaje fue guardado localmente (Simulado). ¡Daniel te responderá pronto!', 
            'success'
          );
          
          // Reset form
          form.reset();
        } catch (err) {
          console.error('Error saving message to localStorage:', err);
          this.showToast('Error del Sistema', 'No se pudo guardar el mensaje. Intenta de nuevo.', 'error');
        } finally {
          this.setSubmitting(false, submitBtn, spinner);
        }
      }, 1500);
    });
  }
  
  setSubmitting(isSubmitting, button, spinner) {
    const buttonText = button.querySelector('span');
    if (isSubmitting) {
      button.disabled = true;
      buttonText.textContent = 'Enviando...';
      spinner.classList.remove('d-none');
      spinner.style.animation = 'spin 1s linear infinite';
    } else {
      button.disabled = false;
      buttonText.textContent = 'Enviar Mensaje';
      spinner.classList.add('d-none');
      spinner.style.animation = 'none';
    }
  }
  
  showToast(title, description, type = 'success') {
    const container = this.querySelector('#toast-container');
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type === 'success' ? 'success' : ''}`;
    
    // SVG icons depending on notification type
    const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    
    toast.innerHTML = `
      <div class="toast-notification-icon">
        ${type === 'success' ? successIcon : errorIcon}
      </div>
      <div class="toast-notification-content">
        <div class="toast-notification-title">${title}</div>
        <div class="toast-notification-desc">${description}</div>
      </div>
      <button class="toast-notification-close" aria-label="Cerrar">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Trigger transition Reflow
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Close on click
    const closeBtn = toast.querySelector('.toast-notification-close');
    closeBtn.addEventListener('click', () => {
      this.closeToast(toast);
    });
    
    // Auto-close after 4 seconds
    setTimeout(() => {
      this.closeToast(toast);
    }, 4500);
  }
  
  closeToast(toast) {
    if (toast.classList.contains('show')) {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300); // Wait for transition to finish
    }
  }
}

// Add animation keyframe to document for spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

customElements.define('contact-form', ContactForm);
export default ContactForm;
