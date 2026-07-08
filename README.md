# Modelo de Portfolio Web Profesional para Estudiantes de Programación

Este proyecto es una propuesta educativa y técnica para que alumnos de desarrollo de software maqueten y desplieguen su primer **portfolio profesional**. Está diseñado desde el rol de un *Senior Frontend Architect* y *Staff UX Designer*, pensando en las necesidades específicas de reclutadores IT y clientes freelance.

El resultado es un sitio web rápido, responsive, accesible y de diseño ultra-premium, que utiliza tecnologías **Vanilla (HTML, CSS, JS)** junto con **Bootstrap 5 personalizado** y **Web Components nativos**, sin depender de frameworks de SPA pesados (como React, Vue o Angular).

---

## 🚀 Características Principales

1. **Estética Premium ("Bootstrap no-Bootstrap")**: Se utilizó la grilla y utilidades de Bootstrap 5, pero se rediseñó por completo su estética a través de variables CSS customizadas. El resultado es un Dark Mode sobrio y limpio inspirado en GitHub, Vercel y Linear.
2. **Componentes Reutilizables Nativos**: Menú de navegación, pie de página y tarjetas maquetados con **Web Components nativos** (`customElements.define`). El código común no se duplica; se escribe una sola vez y se inserta como etiquetas personalizadas (`<portfolio-navbar>`, `<portfolio-footer>`).
3. **Desarrollo Guiado por Datos (Data-Driven)**: Toda la información de contacto, estudios, tecnologías y detalles de los proyectos está centralizada en un archivo de datos ([portfolioData.js](data/portfolioData.js)). Modificar o agregar un proyecto es tan simple como editar un objeto JSON.
4. **Ficha Técnica Dinámica**: La página `project.html` funciona de forma dinámica. Lee el ID del proyecto desde la URL (`?id=gestion-productos`), busca sus especificaciones en la base de datos local e inyecta la información en el DOM en tiempo real.
5. **Formulario Interactivo con Persistencia Local**: El formulario de contacto valida inputs semánticos, simula un retardo de red (estado "Enviando..."), guarda el mensaje en el `localStorage` del navegador y dispara alertas flotantes (*Toasts*) temporales.
6. **Activos Generados por IA**: Incorpora mockups de productos de software reales y un retrato profesional libre de placeholders genéricos.
7. **IA Agéntica e Ingeniería Asistida**: El portfolio incluye e integra el conocimiento de copilotos y sistemas de IA agéntica como Antigravity en el flujo de trabajo de desarrollo de software moderno.

---

## 📁 Estructura de Directorios

La organización del proyecto simula la estructura utilizada en proyectos comerciales de gran tamaño:

```
portfolio/
├── index.html                   # Página de Inicio (Hero, stack y destacados)
├── projects.html                # Galería de proyectos con buscador y filtros
├── project.html                 # Página dinámica de Ficha Técnica del proyecto
├── about.html                   # Información académica, perfil técnico y timeline
├── contact.html                 # Canales directos y formulario de contacto
├── 404.html                     # Manejo de error 404
├── data/
│   └── portfolioData.js         # Base de datos centralizada (JSON/ES Module)
├── css/
│   ├── design-system.css        # Variables CSS, reset y overrides de Bootstrap
│   ├── components.css           # Estilos de Web Components y alertas Toast
│   └── main.css                 # Layouts estructurales y vistas específicas
├── js/
│   ├── components/
│   │   ├── Navbar.js            # Web Component para cabecera de navegación
│   │   ├── Footer.js            # Web Component para pie de página
│   │   ├── ProjectCard.js       # Web Component para tarjetas de grillas
│   │   └── ContactForm.js       # Lógica del formulario de contacto
│   ├── utils.js                 # Helpers (lector de URLSearchParams, escape HTML)
│   └── app.js                   # Controlador general e inyector de datos
└── assets/
    ├── CV_Gonzalez_Agustin.pdf  # Currículum del alumno (ejemplo)
    └── images/                  # Mockups y fotografías
```

---

## 🛠️ Proceso de Construcción (Paso a Paso)

El portfolio fue desarrollado siguiendo un flujo de arquitectura ágil estructurado en 6 etapas:

### 1. Definición del Perfil de Usuario y Objetivos
Se definió que el portfolio debe convencer a un reclutador IT en menos de **30 segundos**. Se jerarquizó la información técnica y los problemas que resuelven los proyectos sobre la biografía personal.

### 2. Diseño del Sistema de Diseño (Design Tokens)
Se configuró un archivo de variables CSS customizadas (`design-system.css`). Se definieron colores de fondo ultra oscuros, colores de texto con diferentes niveles de contraste (primary, secondary, muted), espaciados en escala relativa (`rem`), tipografía (`Inter` y `JetBrains Mono`) y radios de curvatura limpios.

### 3. Personalización del Framework
Para evitar la apariencia por defecto de Bootstrap, se enlazó el CDN oficial y se mapearon sus propiedades de control de componentes (`--bs-card-bg`, `--bs-body-bg`, etc.) directamente a nuestros Design Tokens. Esto permite utilizar componentes de Bootstrap pero con la estética estilizada del sistema.

### 4. Implementación de los Componentes Comunes
Se construyeron Web Components nativos en JS. Cada clase extiende `HTMLElement` e inserta código HTML estructurado en el elemento al cargarse en el DOM. Esto evita tener que repetir menús o footers en las 6 páginas HTML del portfolio.

### 5. Control de Datos Dinámicos y Buscador
Se desarrolló `app.js` como el orquestador principal. Este script detecta en qué página se encuentra el usuario a través del atributo `data-page` en la etiqueta `<body>` y ejecuta la lógica correspondiente:
* En **Proyectos**, escucha eventos en el cuadro de búsqueda y calcula la intersección con los filtros de tecnología seleccionados para redibujar la grilla instantáneamente.
* En **Detalle**, utiliza `URLSearchParams` para consultar el ID de la URL y mapea de forma segura los arrays de datos a elementos del DOM.

### 6. Simulación de Backend en Cliente
Se integró persistencia con `localStorage` en el componente del formulario de contacto. Al presionar enviar, el botón cambia su estado e inhabilita clics repetidos mientras ejecuta una animación asíncrona simulada. Posteriormente, guarda la carga útil en memoria local y emite un Toast flotante animado con CSS Transitions.

### 7. Integración de IA Agéntica (Antigravity)
Este proyecto fue planificado, estructurado y optimizado utilizando el asistente de codificación agéntica **Antigravity** (desarrollado por el equipo de Advanced Agentic Coding de Google DeepMind). Antigravity intervino en:
* **Diseño del Plan de Arquitectura**: Validación de la estructura multipágina basada en Web Components nativos y diseño del flujo de datos en el cliente.
* **Diseño de Interfaz y Estilos**: Generación y refinamiento de las reglas personalizadas sobre Bootstrap 5 para garantizar una estética premium.
* **Generación de Recursos Visuales**: Generación directa mediante IA de los activos de imágenes (mockups de interfaces y retrato profesional) para garantizar un producto libre de placeholders y listo para ser evaluado por reclutadores.
* **Escalabilidad y Limpieza de Código**: Validación de sintaxis, accesibilidad y semántica HTML5 conforme a las directrices y estándares de la industria.

---

## 🏫 Guía Pedagógica para Docentes

Este proyecto está diseñado para funcionar como un **trabajo práctico integrador** en cursos de programación frontend. Los alumnos pueden aprender:

* **Estructuración Web Semántica**: El uso correcto de etiquetas de marcado estructural HTML5 para accesibilidad (SEO y lectores de pantalla).
* **Fundamentos del DOM**: Selección, inserción, eliminación y modificación de nodos en tiempo real sin librerías.
* **Manejo de Estado Local**: Uso de `localStorage` para entender persistencia en el cliente y serialización JSON.
* **Componentización de UI**: Entender la diferencia entre maquetar de forma imperativa versus encapsular lógica en componentes reutilizables.
* **Parámetros de Consulta (Querystrings)**: Comprensión del envío de datos a través de peticiones GET de URL y su lectura en cliente.

---

## 💻 Ejecución Local

Para ejecutar el servidor local y evitar problemas de políticas de CORS del navegador al importar los módulos de JavaScript:

1. Clona este repositorio o entra al directorio.
2. Levanta un servidor web local:
   ```bash
   npx http-server -p 8080
   ```
3. Accede en tu navegador a: [http://localhost:8080](http://localhost:8080)
