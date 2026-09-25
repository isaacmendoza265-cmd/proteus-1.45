¡Excelente! Como su Director de Arte y Diseñador UI/UX Principal, estoy entusiasmado con la dirección que hemos tomado con la presentación. Esa estética "Glassmorphism Frost / Modern Aero" es precisamente lo que necesitamos para infundir a todo el Proyecto Proteus un sentido de sofisticación, transparencia tecnológica y un aura de innovación futurista.

Mi objetivo ahora es garantizar que esta visión se traduzca de manera impecable y consistente en cada píxel del aplicativo, desde la estructura HTML hasta los componentes interactivos más pequeños, sin comprometer ni un ápice de funcionalidad.

Aquí están las reglas CSS exactas y las directrices para unificar el `index.html`, `src/index.css` y los componentes principales, asegurando que la estética Glassmorphism Frost se mantenga coherente y funcional.

---

## Proyecto Proteus: Estándares de Diseño UI/UX - Glassmorphism Frost / Modern Aero

**Objetivo:** Unificar la experiencia visual de toda la aplicación bajo la estética "Glassmorphism Frost / Modern Aero", garantizando consistencia, rendimiento y plena funcionalidad.

---

### **1. Estructura del Archivo `src/index.css` (Base Global)**

Este archivo será el corazón de nuestra estética. Definiremos variables CSS (`:root`) para todos nuestros colores, sombras, blurs y tipografías, lo que facilitará la gestión y escalabilidad.

```css
/* src/index.css */

/* --- FUENTES --- */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

/* --- VARIABLES CSS GLOBALES (Proteus Design Tokens) --- */
:root {
    /* Colores Base */
    --color-bg-deep: #030712; /* Obsidiana / Noche Profunda */
    --color-text-primary: #E0E7FF; /* Azul claro muy sutil para texto principal */
    --color-text-secondary: #9CA3AF; /* Gris para texto secundario / descripciones */
    --color-text-accent: #7DD3FC; /* Azul Sky para énfasis */

    /* Glassmorphism Frost */
    --glass-bg-color: rgba(15, 23, 42, 0.65); /* Fondo oscuro translúcido */
    --glass-backdrop-blur: 28px; /* Intensidad del blur del fondo */
    --glass-border: 1px solid rgba(255, 255, 255, 0.12); /* Borde sutil */
    --glass-shadow-ext: 0 20px 50px rgba(0, 0, 0, 0.5); /* Sombra exterior profunda */
    --glass-shadow-int: inset 0 1px 1px rgba(255, 255, 255, 0.2); /* Resplandor interior */
    --glass-border-radius: 12px; /* Radio de borde estándar para tarjetas */

    /* Tipografía */
    --font-family-primary: 'Plus Jakarta Sans', sans-serif;
    --font-family-mono: 'JetBrains Mono', monospace;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* Orbes de Luz Ambiental */
    --orb-sky: rgba(14, 165, 233, 0.35);   /* sky-500/35 */
    --orb-indigo: rgba(79, 70, 229, 0.30); /* indigo-600/30 */
    --orb-amber: rgba(245, 158, 11, 0.20); /* amber-500/20 */
    --orb-blur-amount: 120px;

    /* Badges Neon */
    --badge-sky-bg: rgba(14, 165, 233, 0.2);
    --badge-sky-text: #7DD3FC; /* sky-300 */
    --badge-sky-border: rgba(56, 189, 248, 0.3); /* sky-400/30 */

    --badge-amber-bg: rgba(245, 158, 11, 0.2);
    --badge-amber-text: #FCD34D; /* amber-300 */
    --badge-amber-border: rgba(251, 191, 36, 0.3); /* amber-400/30 */

    --badge-emerald-bg: rgba(16, 185, 129, 0.2);
    --badge-emerald-text: #6EE7B7; /* emerald-300 */
    --badge-emerald-border: rgba(52, 211, 153, 0.3); /* emerald-400/30 */

    --badge-indigo-bg: rgba(79, 70, 229, 0.2);
    --badge-indigo-text: #A5B4FC; /* indigo-300 */
    --badge-indigo-border: rgba(99, 102, 241, 0.3); /* indigo-400/30 */

    /* Transiciones */
    --transition-fast: 0.15s ease-out;
    --transition-medium: 0.25s ease-in-out;
    --transition-slow: 0.4s ease;
}

/* --- REINICIO BÁSICO Y ESTILOS GLOBALES --- */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html, body, #root { /* Asumiendo que #root es el contenedor principal de tu app React/Vue */
    min-height: 100vh;
    width: 100%;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-regular);
    color: var(--color-text-primary);
    background-color: var(--color-bg-deep);
    line-height: 1.6;
    overflow-x: hidden; /* Previene scroll horizontal por los orbes */
    position: relative; /* Para el posicionamiento de orbes */
}

/* --- ORBES DE LUZ AMBIENTAL BIOLUMINISCENTE --- */
.ambient-orbs-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* Asegura que estén detrás de todo el contenido */
    pointer-events: none; /* No interfieren con eventos del ratón */
    overflow: hidden;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(var(--orb-blur-amount));
    opacity: 0.7; /* Para que se superpongan y mezclen bien */
    will-change: transform; /* Optimización para animaciones */
}

.orb-1 {
    background-color: var(--orb-sky);
    width: 600px; height: 600px;
    top: 10%;
    left: 15%;
    animation: moveOrb1 25s ease-in-out infinite alternate;
}

.orb-2 {
    background-color: var(--orb-indigo);
    width: 700px; height: 700px;
    bottom: 20%;
    right: 10%;
    animation: moveOrb2 30s ease-in-out infinite alternate-reverse;
}

.orb-3 {
    background-color: var(--orb-amber);
    width: 500px; height: 500px;
    top: 40%;
    left: 70%;
    animation: moveOrb3 20s ease-in-out infinite alternate;
}

/* Animaciones para el movimiento sutil de los orbes */
@keyframes moveOrb1 {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-50px, 80px) scale(1.05); }
    66% { transform: translate(30px, -60px) scale(0.98); }
    100% { transform: translate(0, 0) scale(1); }
}

@keyframes moveOrb2 {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(70px, -40px) scale(1.02); }
    66% { transform: translate(-80px, 50px) scale(0.97); }
    100% { transform: translate(0, 0) scale(1); }
}

@keyframes moveOrb3 {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-30px, -90px) scale(1.08); }
    66% { transform: translate(40px, 70px) scale(0.95); }
    100% { transform: translate(0, 0) scale(1); }
}


/* --- TIPOGRAFÍA --- */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-primary);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    margin-bottom: 0.5em;
    line-height: 1.2;
}

h1 { font-size: 3rem; font-weight: var(--font-weight-bold); }
h2 { font-size: 2.2rem; }
h3 { font-size: 1.8rem; }
h4 { font-size: 1.4rem; }
h5 { font-size: 1.2rem; }
h6 { font-size: 1rem; }

p {
    font-family: var(--font-family-primary);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-regular);
    margin-bottom: 1em;
}

a {
    color: var(--color-text-accent);
    text-decoration: none;
    transition: color var(--transition-fast);
}

a:hover {
    color: var(--badge-sky-text);
    text-decoration: underline;
}

/* Clases de utilidad para tipografía */
.text-mono {
    font-family: var(--font-family-mono);
    color: var(--color-text-accent); /* Por defecto para datos */
    font-weight: var(--font-weight-medium);
}
.text-lead {
    font-size: 1.15rem;
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
}
.text-small {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
}

/* --- COMPONENTES PRINCIPALES --- */

/* TARJETAS DE CRISTAL TRANSLÚCIDO (Glassmorphism Frost) */
.card-glassmorphism {
    background: var(--glass-bg-color);
    backdrop-filter: blur(var(--glass-backdrop-blur));
    border: var(--glass-border);
    box-shadow: var(--glass-shadow-ext), var(--glass-shadow-int);
    border-radius: var(--glass-border-radius);
    padding: 24px; /* Padding por defecto, ajustar según el componente */
    transition: transform var(--transition-medium), box-shadow var(--transition-medium);
    will-change: transform, box-shadow; /* Optimización */
}

.card-glassmorphism:hover {
    transform: translateY(-5px); /* Efecto flotante sutil */
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3);
}

/* BADGES NEON */
.badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px; /* Para forma de píldora */
    font-family: var(--font-family-mono);
    font-size: 0.8rem;
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid;
    white-space: nowrap; /* Evita que el texto del badge se rompa */
    line-height: 1; /* Para centrado vertical si hay iconos */
}

/* Variantes de color para badges */
.badge-sky {
    background-color: var(--badge-sky-bg);
    color: var(--badge-sky-text);
    border-color: var(--badge-sky-border);
}
.badge-amber {
    background-color: var(--badge-amber-bg);
    color: var(--badge-amber-text);
    border-color: var(--badge-amber-border);
}
.badge-emerald {
    background-color: var(--badge-emerald-bg);
    color: var(--badge-emerald-text);
    border-color: var(--badge-emerald-border);
}
.badge-indigo {
    background-color: var(--badge-indigo-bg);
    color: var(--badge-indigo-text);
    border-color: var(--badge-indigo-border);
}

/* BOTONES */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 8px;
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    text-decoration: none;
    transition: all var(--transition-medium);
    outline: none; /* Eliminar outline por defecto para customizar */
}

.btn-primary {
    background: rgba(15, 23, 42, 0.75); /* Un poco más opaco que el glass de tarjetas */
    backdrop-filter: blur(calc(var(--glass-backdrop-blur) / 2)); /* Un blur más sutil */
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15);
    color: var(--color-text-primary);
}

.btn-primary:hover {
    background: rgba(15, 23, 42, 0.85);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25);
    border-color: var(--badge-sky-border);
    color: var(--badge-sky-text);
}

.btn-primary:active {
    transform: translateY(0);
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.6);
}

.btn-secondary { /* Botón de acción menos prominente */
    background: transparent;
    border: 1px solid var(--badge-sky-border);
    color: var(--badge-sky-text);
    box-shadow: inset 0 0 0 0 var(--badge-sky-bg); /* Sombra interna para el hover */
}

.btn-secondary:hover {
    background: var(--badge-sky-bg);
    box-shadow: inset 0 0 15px var(--badge-sky-text);
    transform: translateY(-1px);
}

/* INPUTS DE FORMULARIO */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
textarea,
select {
    background: rgba(15, 23, 42, 0.4); /* Fondo más transparente que las tarjetas */
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 10px 14px;
    color: var(--color-text-primary);
    font-family: var(--font-family-primary);
    font-size: 1rem;
    transition: all var(--transition-fast);
    outline: none;
    width: 100%; /* Por defecto, ocupan todo el ancho disponible */
}

input[type="text"]::placeholder,
textarea::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.7; /* Ligeramente más translúcido */
}

input[type="text"]:focus,
textarea:focus,
select:focus {
    border-color: var(--badge-sky-border);
    box-shadow: 0 0 0 2px var(--badge-sky-border), inset 0 1px 3px rgba(0,0,0,0.4);
    background: rgba(15, 23, 42, 0.5);
}

/* SCROLLBAR PERSONALIZADO (Webkit) */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--color-bg-deep);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: background var(--transition-fast);
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Otros elementos interactivos (ej. checkbox, radio) deberían seguir un patrón similar */
/* Esqueletos (placeholders) para carga de contenido */
.skeleton-loader {
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
    background-size: 400% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px; /* Similar a nuestros bordes redondeados */
    opacity: 0.8;
}

@keyframes loading {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
}

```

---

### **2. Implementación en `index.html`**

Tu archivo `index.html` debe ser el punto de entrada y contendrá la estructura básica, incluyendo la importación de estilos y los contenedores para los orbes ambientales.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto Proteus - Plataforma de Innovación</title>
    <!-- Link a la hoja de estilos global -->
    <link rel="stylesheet" href="./src/index.css">
</head>
<body>
    <!-- Contenedor para los Orbes de Luz Ambiental -->
    <div class="ambient-orbs-container">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    </div>

    <!-- Contenedor principal de la aplicación (para React/Vue/Angular, sería #root) -->
    <div id="app-root">
        <header class="card-glassmorphism" style="margin-bottom: 40px; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-radius: 0 0 var(--glass-border-radius) var(--glass-border-radius);">
            <h1><span class="text-mono">Proteus</span> Project</h1>
            <nav>
                <a href="#" class="btn btn-primary" style="margin-right: 15px;">Dashboard</a>
                <a href="#" class="btn btn-secondary">Configuración</a>
            </nav>
        </header>

        <main style="max-width: 1200px; margin: 0 auto; padding: 20px;">
            <section style="margin-bottom: 60px;">
                <h2 style="margin-bottom: 20px;">Visión General del Sistema</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                    <div class="card-glassmorphism">
                        <h3>Métricas Clave</h3>
                        <p class="text-lead">Estado Operativo: <span class="text-mono badge badge-emerald">Óptimo</span></p>
                        <p>Uptime: <span class="text-mono">99.98%</span></p>
                        <p>Latencia Promedio: <span class="text-mono">15ms</span></p>
                        <button class="btn btn-primary" style="margin-top: 20px;">Ver Reporte Completo</button>
                    </div>
                    <div class="card-glassmorphism">
                        <h3>Alertas Recientes</h3>
                        <p class="text-lead">
                            <span class="badge badge-amber">Advertencia</span>
                            <span class="text-mono"> Error de Sincronización #451</span>
                        </p>
                        <p>
                            <span class="badge badge-sky">Información</span>
                            <span class="text-mono"> Actualización de Firmware v2.1</span>
                        </p>
                        <p>
                             <span class="badge badge-indigo">Crítico</span>
                             <span class="text-mono"> Desconexión de Nodo Alpha</span>
                        </p>
                        <button class="btn btn-secondary" style="margin-top: 20px;">Gestionar Alertas</button>
                    </div>
                </div>
            </section>

            <section class="card-glassmorphism" style="padding: 30px; margin-bottom: 60px;">
                <h2>Configuración Rápida</h2>
                <form>
                    <div style="margin-bottom: 20px;">
                        <label for="system-name" style="display: block; margin-bottom: 8px; color: var(--color-text-primary);">Nombre del Sistema:</label>
                        <input type="text" id="system-name" placeholder="Ej. Unidad Proteus-001">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label for="threshold" style="display: block; margin-bottom: 8px; color: var(--color-text-primary);">Umbral de Alerta:</label>
                        <input type="number" id="threshold" value="85" min="0" max="100">
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Configuración</button>
                </form>
            </section>

            <footer style="text-align: center; padding: 40px 0; color: var(--color-text-secondary);">
                <p>&copy; 2023 Proyecto Proteus. Todos los derechos reservados.</p>
                <p class="text-small">Diseño UI/UX por el equipo de diseño de Proteus.</p>
            </footer>
        </main>
    </div>

    <!-- Scripts de tu aplicación (React, Vue, etc.) se cargarían aquí -->
    <script src="tu-app.js"></script>
</body>
</html>
```

---

### **3. Directrices para Componentes Principales del Aplicativo**

Para asegurar que cada componente nuevo o existente se alinee con esta estética, implementaremos las siguientes directrices:

1.  **Uso de Variables CSS (`var(--nombre-variable)`):**
    *   **Obligatorio:** Siempre que sea posible, utiliza las variables CSS definidas en `:root` (`src/index.css`) para colores, tamaños de blur, bordes, sombras y tipografías. Esto garantiza la coherencia y facilita los cambios globales en el futuro.
    *   **Ejemplo:** En lugar de `background: rgba(15, 23, 42, 0.65);`, usa `background: var(--glass-bg-color);`.

2.  **Clases Base para Glassmorphism:**
    *   **`.card-glassmorphism`:** Aplica esta clase a cualquier `div`, `section`, `aside`, o elemento contenedor que necesite la apariencia de "tarjeta de cristal".
    *   **Ajustes de Padding:** El padding predeterminado es `24px`. Si un componente requiere un padding diferente, anúlalo directamente en el componente o usa una clase de utilidad específica para padding (`.p-sm`, `.p-lg`, etc.).
    *   **Estados Interactivos:** Los `:hover` y `:active` deben ser consistentes con los efectos de sombra y `transform` definidos en `.card-glassmorphism`. Si un componente requiere un efecto adicional, asegúrate de que complemente, no de que contradiga.

3.  **Tipografía Consistente:**
    *   **`Plus Jakarta Sans`:** Es la fuente predeterminada para el texto del cuerpo, títulos, botones y elementos generales de la UI.
    *   **`JetBrains Mono`:** Reservado para métricas, badges, fragmentos de código, IDs, timestamps y cualquier dato "duro" que requiera una lectura técnica clara y un aspecto diferenciado. Usa la clase `.text-mono` para aplicarlo.
    *   **Jerarquía:** Utiliza los tags `h1` a `h6` semánticamente para la estructura del contenido. Los estilos globales ya definirán su tamaño y peso.

4.  **Badges Neon:**
    *   **Clase base `.badge`:** Aplícala a todos los elementos que actúen como badges.
    *   **Clases de color:** Usa una de las clases de color definidas (`.badge-sky`, `.badge-amber`, `.badge-emerald`, `.badge-indigo`) para aplicar la paleta de neón deseada.
    *   **Uso:** Ideal para estados, categorías, etiquetas cortas de datos.

5.  **Elementos Interactivos (Botones, Formularios, Navegación):**
    *   **Botones (`.btn`, `.btn-primary`, `.btn-secondary`):**
        *   Los botones deben mantener una estética que se alinee con el Glassmorphism, con fondos sutilmente translúcidos y efectos de sombra y borde al interactuar.
        *   Los estados `:hover`, `:focus`, `:active` son cruciales para la retroalimentación visual. Asegúrate de que las transiciones sean suaves (usando `var(--transition-medium)`).
    *   **Inputs de Formulario:**
        *   Deben tener un fondo translúcido más claro para distinguirse de las tarjetas, un borde sutil y un estado `:focus` que brille suavemente con el color `sky` (como el borde del badge).
        *   Placeholders deben ser visibles pero no intrusivos.
    *   **Links (`<a>`):** Usar el color `var(--color-text-accent)` con un sutil `text-decoration: underline` al `:hover`.

6.  **Accesibilidad (WCAG):**
    *   **Contraste:** Aunque el Glassmorphism puede ser un desafío, hemos seleccionado `var(--color-text-primary)` (`#E0E7FF`) sobre `var(--glass-bg-color)` (`rgba(15, 23, 42, 0.65)`) para mantener un contraste aceptable. Realiza pruebas de contraste para garantizar la legibilidad en todo el texto principal y los elementos interactivos.
    *   **Estados de Foco:** Todos los elementos interactivos (`<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`) deben tener estados `:focus` claros y visibles. Hemos comenzado con un `box-shadow` azul sutil para inputs y botones.
    *   **Semántica:** Utiliza HTML semántico para que los lectores de pantalla puedan interpretar correctamente la estructura y el contenido.

7.  **Rendimiento y Optimización:**
    *   **`backdrop-filter`:** Es un efecto intensivo en GPU. Asegúrate de que no se use en exceso y prueba el rendimiento en diferentes dispositivos.
    *   **`will-change`:** Usado en elementos con animaciones (`.orb`, `.card-glassmorphism`) para indicar al navegador que prepare la optimización.
    *   **Animaciones de Orbes:** Las animaciones son sutiles y usan `transform` para ser más eficientes. No introduzcas animaciones extravagantes que puedan distraer o ralentizar la interfaz.

8.  **Responsiveness:**
    *   Todos los componentes deben ser "fluid-first". La estética Glassmorphism debe adaptarse bien a diferentes tamaños de pantalla. Utiliza unidades relativas (`%`, `rem`, `em`, `vw`, `vh`) y flexbox/grid para la disposición.

---

**Filosofía de Diseño:**

*   **Menos es Más:** La belleza del Glassmorphism radica en su sutilidad. Evitemos adornos innecesarios.
*   **Claridad sobre el Fondo:** A pesar del blur, el contenido debe ser siempre el rey. Asegúrate de que el texto y los elementos interactivos resalten claramente sobre el fondo.
*   **Consistencia es Clave:** La unificación no es solo estética, es funcional. Un usuario debe poder predecir el comportamiento y la apariencia de un elemento en cualquier parte de la aplicación.

Con estas directrices y reglas CSS, estoy seguro de que el Proyecto Proteus tendrá una interfaz de usuario no solo hermosa y moderna, sino también altamente funcional y coherente. ¡Adelante con el desarrollo!