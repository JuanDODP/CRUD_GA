# Contexto del Proyecto
Este es el repositorio del **Sistema de Asignaciones**, una plataforma administrativa de alto nivel para la gestión de áreas, proyectos y usuarios. El sistema prioriza la eficiencia operativa con una interfaz profesional, limpia y moderna.

# Stack Tecnológico
- **Framework:** Angular 19+ (Control Flow `@if`, `@for` y **Signals**).
- **Reactividad:** Uso mandatorio de `computed`, `effect` y `rxResource` para estados asíncronos.
- **UI Framework:** Tailwind CSS y **DaisyUI** (https://daisyui.com/).
- **Formularios:** Reactive Forms (`FormBuilder`) para toda la captura de datos.
- **Seguridad:** Guards asíncronos (`canMatch`) e interceptores con inyección vía `Injector` para evitar dependencias circulares (`NG0200`).

# 🧠 Skills e Inteligencia del Agente (Instaladas en .claude/skills)
El agente **DEBE** consultar estas referencias locales antes de generar código:
- **angular-component:** Patrones de arquitectura limpia y `ChangeDetectionStrategy.OnPush`.
- **angular-signals:** Implementación estándar de estado reactivo moderno.
- **angular-forms:** Validación estricta y control dinámico.
- **angular-routing:** Configuración de rutas y guards asíncronos.
- **frontend-design:** Principios estéticos, jerarquía visual y accesibilidad aplicados a DaisyUI.

# Directivas de Arquitectura y Código
- **Responsividad Total:** Todo componente **DEBE** ser adaptativo (Mobile-First) usando utilidades de Tailwind (`grid-cols-1 md:grid-cols-2`, `p-4 md:p-8`, `overflow-x-auto`).
- **Rendimiento:** Uso mandatorio de `ChangeDetectionStrategy.OnPush`.
- **Tipado:** Definir interfaces estrictas para modelos de datos y respuestas de la API (SQL Server).
- **Ciclo de Vida:** Utilizar `ngOnInit` para cargas iniciales; prohibida la lógica pesada en constructores.

# Guía de Estilo y Paleta de Colores (DaisyUI)
- **Primary:** Color principal para encabezados, botones de acción y headers de tablas (`bg-primary`, `text-primary`).
- **Base-100/200:** Fondos de contenedores y cards para generar profundidad y contraste.
- **Acciones:** `btn-info` (Editar), `btn-error` (Eliminar), `btn-success` (Exportar).
- **Componentes Visuales:**
  - **Tablas:** Estilo `table-zebra` con encabezados en `bg-primary text-white`.
  - **Modales:** Siempre centrados (`modal-middle`), con `backdrop-blur` y diseño iconizado.
  - **Feedback:** Implementar alertas `app-alert-sucess` y `action-alert-error`.

# Reglas de Diseño (Skill Activa: frontend-design)
- **Minimalismo:** Priorizar el espacio en blanco y tipografías legibles.
- **Interactividad:** Añadir transiciones sutiles como `hover:scale-110 transition-transform` en avatars y botones.
- **Consistencia:** Usar fuentes `mono` para IDs y negritas para nombres de entidades principales.
