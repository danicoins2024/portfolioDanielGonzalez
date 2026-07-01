/**
 * portfolioData.js
 * Centralized data source for the developer portfolio.
 * Modify this file to update profile info, skills, or projects.
 */

export const portfolioData = {
  profile: {
    firstName: "Agustín Daniel",
    lastName: "González",
    fullName: "Agustín Daniel González",
    title: "Frontend Developer Junior",
    location: "Buenos Aires, Argentina",
    email: "Danicoins2024@gmail.com",
    phone: "+54 9 11 7034 3466",
    phoneSecondary: "+54 9 11 3090 0652",
    linkedin: "https://www.linkedin.com/in/daniel-gonzalez-65762534b",
    github: "https://github.com/Danicoins",
    cvLink: "./assets/CV_Gonzalez_Agustin.pdf",
    aboutShort: "Graduado en Programación con sólidos conocimientos en el ecosistema Web Vanilla (HTML5, CSS3, JavaScript ES6+), enfocado en interfaces responsivas, accesibles y optimizadas para la experiencia de usuario.",
    aboutLong: "Soy un desarrollador frontend junior apasionado por construir interfaces de usuario que no solo se vean excepcionales, sino que también resuelvan necesidades de negocio reales. Me especializo en el desarrollo con tecnologías nativas (Vanilla HTML/CSS/JS), lo que me da un entendimiento profundo del DOM, rendimiento del navegador y APIs web. Con formación en Tecnicatura Superior en Programación, combino fundamentos sólidos de ingeniería de software con agilidad práctica para entregar código limpio, escalable y mantenible."
  },
  
  skills: {
    categories: [
      {
        id: "frontend",
        title: "Frontend Development",
        items: [
          { name: "HTML5", icon: "html5", description: "Marcado semántico, SEO técnico y accesibilidad básica (ARIA)." },
          { name: "CSS3", icon: "css3", description: "Maquetación moderna mediante CSS Grid, Flexbox y animaciones fluidas." },
          { name: "JavaScript ES6+", icon: "javascript", description: "Programación asíncrona (Promises, async/await), manipulación del DOM y Fetch API." },
          { name: "Responsive Web Design", icon: "responsive", description: "Estrategia Mobile-First adaptable a cualquier resolución de pantalla." }
        ]
      },
      {
        id: "backend-db",
        title: "Backend & Bases de Datos",
        items: [
          { name: "Node.js", icon: "nodejs", description: "Desarrollo de scripts, automatización y servidores backend ligeros." },
          { name: "Python", icon: "python", description: "Estructuras de datos, lógica de negocio y programación orientada a objetos (POO)." },
          { name: "Supabase", icon: "supabase", description: "Backend-as-a-Service para autenticación de usuarios, almacenamiento y base de datos." },
          { name: "Bases de Datos", icon: "database", description: "Diseño y modelado de datos relacionales, consultas SQL y operaciones CRUD." }
        ]
      },
      {
        id: "tools",
        title: "Herramientas y Frameworks",
        items: [
          { name: "Git & GitHub", icon: "git", description: "Control de versiones, flujos de trabajo ramificados (git flow) y despliegue continuo." },
          { name: "Bootstrap", icon: "bootstrap", description: "Uso estratégico de grillas y componentes utilitarios integrados con CSS custom." },
          { name: "REST APIs", icon: "api", description: "Integración, consumo y estructuración de servicios web e intercambio de datos JSON." },
          { name: "IA Agéntica (Antigravity)", icon: "ai", description: "Copilotos agénticos para diseño de arquitectura, generación de recursos y aceleración de código." }
        ]
      }
    ],
    softSkills: [
      "Organización y planificación de tareas",
      "Comunicación clara y asertiva",
      "Trabajo en equipo y colaboración remota",
      "Resolución efectiva de problemas lógicos",
      "Aprendizaje autónomo y adaptabilidad técnica"
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Básico (en formación activa)" }
    ]
  },
  
  education: [
    {
      title: "Tecnicatura Superior en Programación",
      institution: "Teclab",
      period: "2023 - 2025 (Graduado)",
      description: "Formación de nivel superior enfocada en análisis de sistemas, metodologías ágiles, base de datos relacionales, estructuras de datos y desarrollo de software."
    },
    {
      title: "Programación Orientada a Objetos",
      institution: "CFP N°27 (CABA)",
      period: "Finalizado en 08/2024",
      description: "Curso intensivo de especialización en diseño de clases, patrones de diseño de software, polimorfismo, herencia y modularidad aplicados a lenguajes estructurados."
    },
    {
      title: "Auxiliar en Programación",
      institution: "Teclab",
      period: "Finalizado en 12/2023",
      description: "Introducción formal a algoritmos, lógica de control, resolución de problemas y fundamentos de desarrollo web."
    },
    {
      title: "Cursos y Capacitaciones Complementarias",
      institution: "ITschool / CFP N°410",
      period: "2024 - 2025",
      description: "Especializaciones en JavaScript Avanzado (ITschool), Creación de Contenido con IA (ITschool) y Programación Python (CFP N°410)."
    }
  ],
  
  projects: [
    {
      id: "gestion-productos",
      title: "Aplicación Web de Gestión de Productos",
      shortDescription: "Sistema CRUD de control de inventario en tiempo real con persistencia en Supabase, autenticación segura y diseño Mobile-First.",
      longDescription: "Una plataforma de gestión comercial completa creada en JavaScript Vanilla que permite el control dinámico de stock de productos. La aplicación resuelve la necesidad de los pequeños comercios de administrar de forma ágil y segura su catálogo sin recurrir a costosas licencias de software.",
      problemSolved: "Los pequeños comercios dependen a menudo de plantillas de Excel compartidas o registros manuales propensos a errores e inconsistencias. Este sistema provee un panel intuitivo y multiusuario que centraliza el catálogo de productos y lo actualiza en tiempo real en la nube.",
      goals: [
        "Desarrollar una SPA (Single Page Application) ligera utilizando JavaScript modular e inyección dinámica del DOM.",
        "Integrar una base de datos segura y persistente en la nube mediante Supabase BaaS.",
        "Implementar un control estricto de roles y seguridad a través de Supabase Auth.",
        "Lograr un rendimiento óptimo del renderizado de listas con paginación y búsqueda asíncrona."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Supabase", "Bootstrap Utilities", "Fetch API"],
      image: "assets/images/project-gestion-productos.png",
      demoUrl: "https://daniel-gonzalez-gestion-productos.netlify.app",
      codeUrl: "https://github.com/Danicoins/gestion-productos",
      features: [
        "Autenticación segura: Registro, inicio de sesión y persistencia de sesión de usuarios.",
        "Operaciones CRUD completas: Altas, bajas, modificaciones y consultas de productos con validación activa en el cliente.",
        "Filtros de Búsqueda Predictiva: Búsqueda instantánea por nombre, categoría y ordenamiento dinámico por precio o cantidad.",
        "Dashboard de Estadísticas Rápidas: Visualización de productos de bajo stock (alertas críticas), valor total del inventario y total de artículos.",
        "Diseño adaptativo: Interfaz fluida optimizada para el uso en dispositivos móviles de repositores de mercadería."
      ],
      architecture: "Arquitectura desacoplada basada en el cliente (Frontend-First). El cliente Vanilla JS maneja el estado de la UI y se comunica de manera directa con los servicios HTTP de Supabase (Auth y PostgreSQL) a través de peticiones HTTP REST seguras.",
      learnings: [
        "Implementación avanzada de manipulación de DOM minimizando reflows mediante fragmentos de documento.",
        "Gestión de sesiones de usuario persistentes con JSON Web Tokens (JWT) y cookies locales de forma segura.",
        "Control de flujos asíncronos concurrentes y captura/resolución estructurada de errores de conexión."
      ],
      conclusions: "Este proyecto demuestra que las arquitecturas modernas sin frameworks (como React o Vue) son altamente viables, logrando velocidades de carga superiores y una menor huella en la red al tiempo que se mantiene una estructura de código sumamente limpia."
    },
    {
      id: "dashboard-metricas-saas",
      title: "Dashboard de Métricas de Negocio y Ventas",
      shortDescription: "Panel administrativo interactivo para visualización de KPIs comerciales con gráficos analíticos y diseño premium personalizado.",
      longDescription: "Un completo tablero de control corporativo diseñado para directores de ventas. Procesa y resume datos transaccionales, mostrando tendencias de ingresos, tasas de conversión e información demográfica de clientes de manera visual y atractiva.",
      problemSolved: "Los gerentes de ventas carecen con frecuencia de una herramienta consolidada para examinar sus datos operacionales a diario de forma interactiva. Esta aplicación consolida diferentes fuentes de datos y las representa en métricas claras para agilizar la toma de decisiones.",
      goals: [
        "Diseñar un panel de control corporativo con alta densidad de datos que se mantenga legible en pantallas de tabletas y laptops.",
        "Implementar renderizado de gráficos vectoriales interactivos sin sobrecargar la memoria de la aplicación.",
        "Proveer de un modo oscuro/claro automático basado en las preferencias del sistema del usuario."
      ],
      technologies: ["HTML5", "CSS3 (Custom Variables)", "JavaScript ES6+", "Bootstrap Grid", "Chart.js Library"],
      image: "assets/images/project-dashboard.png",
      demoUrl: "#", // Se puede completar con demo real o dejar numeral
      codeUrl: "https://github.com/Danicoins/dashboard-saas",
      features: [
        "Visualización interactiva: Gráficos de líneas de ingresos mensuales, gráfico de dona para distribución de canales y de barra para ventas regionales.",
        "Grid Modular Dinámico: Secciones de tarjetas informativas arrastrables o colapsables.",
        "Filtros temporales instantáneos: Cambio del rango de datos entre 7 días, 30 días o 12 meses sin recargar la página.",
        "Modo Noche Avanzado: Transición de esquema de color suave utilizando variables CSS nativas."
      ],
      architecture: "Desarrollo basado en módulos JavaScript (ES Modules) que controlan la inicialización de los componentes gráficos y el ciclo de vida de los datos, usando persistencia en memoria local y simulando respuestas asíncronas de servidores.",
      learnings: [
        "Integración de librerías de gráficos de terceros con el ciclo de vida del DOM del navegador.",
        "Uso de CSS Custom Properties (variables) para la tematización (temas oscuro y claro) con soporte de `prefers-color-scheme`.",
        "Diseño de layouts de rejilla compleja con CSS Grid combinado con el sistema de grillas de Bootstrap."
      ],
      conclusions: "La optimización del rendimiento en páginas con alta densidad visual y animaciones en tiempo real es crítica. Este dashboard demostró que mediante una carga diferida y destrucción adecuada de instancias de gráficos se puede lograr una experiencia de usuario extremadamente fluida."
    },
    {
      id: "caja-registradora",
      title: "Sistema de Punto de Venta y Caja Registradora",
      shortDescription: "Aplicación interactiva para facturación rápida, cálculo automático de impuestos y vueltos, y registro local de transacciones diarias.",
      longDescription: "Una caja registradora virtual optimizada para su uso en terminales de cobro de pequeños mercados y cafeterías. Facilita la carga de compras de clientes, calcula automáticamente descuentos y totalizaciones de impuestos, y genera un comprobante de pago imprimible.",
      problemSolved: "Los sistemas de facturación clásicos suelen ser pesados de instalar y requieren configuraciones complejas. Esta aplicación web corre directamente en cualquier navegador de forma ligera y rápida, ideal para dispositivos de bajos recursos.",
      goals: [
        "Desarrollar una calculadora comercial robusta libre de errores de redondeo de punto flotante en JavaScript.",
        "Garantizar que toda la operación sea ejecutable únicamente mediante el uso del teclado para maximizar la velocidad del cajero.",
        "Generar un ticket/recibo térmico optimizado para impresión física (print stylesheet)."
      ],
      technologies: ["HTML5", "CSS3 (Media Queries)", "JavaScript ES6+", "LocalStorage API", "CSS Print Stylesheets"],
      image: "assets/images/project-caja.png",
      demoUrl: "#",
      codeUrl: "https://github.com/Danicoins/pos-cashier",
      features: [
        "Operación ágil por teclado: Atajos configurados para buscar artículos, totalizar y procesar cobro rápido.",
        "Cálculo matemático exacto: Tratamiento interno en centavos para evitar los clásicos errores de punto flotante de JS (0.1 + 0.2 = 0.30000000000000004).",
        "Impresión de Comprobante: Estilo CSS específico para soportes de impresión térmica de 80mm que oculta la barra de navegación y los botones innecesarios.",
        "Historial diario: Panel colapsable de ventas totales del día persistido localmente."
      ],
      architecture: "Lógica modular basada en el patrón Modelo-Vista-Controlador (MVC) en Vanilla JS, donde el modelo de carrito de compras dispara notificaciones automáticas de actualización a la vista al modificarse su estado.",
      learnings: [
        "Manejo avanzado de eventos de teclado del navegador (`keydown`, `keyup`) y anulación de atajos del sistema por defecto de forma controlada.",
        "Creación de hojas de estilo CSS para soportes impresos (`@media print`).",
        "Estrategias de precisión aritmética en JavaScript utilizando tipos numéricos enteros y formateadores de moneda internacionales (`Intl.NumberFormat`)."
      ],
      conclusions: "La precisión y la velocidad son pilares en el desarrollo de software financiero o comercial. Este proyecto validó cómo el diseño centrado en el usuario y las optimizaciones de teclado pueden duplicar la productividad en un puesto de trabajo físico."
    }
  ]
};
