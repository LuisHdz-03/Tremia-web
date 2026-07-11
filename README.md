# Tremia Web - Plataforma de Integración Tecnológica e Inteligencia Empresarial

Un cliente web responsivo y de alto rendimiento desarrollado con **React, TypeScript y Vite**, galardonado con el **3er Lugar General en el Innovation Fest 2025**. Esta plataforma fue diseñada como la solución definitiva a la problemática de fragmentación digital en el **Club Empresarial Tres Marías**, unificando la colaboración, visibilidad y escalabilidad de proyectos conjuntos mediante herramientas avanzadas de Inteligencia Artificial y persistencia en tiempo real.

---

## Reconocimiento Especial
* **Tercer Lugar General (Innovation Fest 2025):** Premiado en el área temática de *Administración y Finanzas* por resolver estratégicamente el aislamiento tecnológico entre socios comerciales, conectando talento local con inversionistas y promoviendo un networking digital efectivo.

---

## Módulos Core del Sistema

* **Asistente Virtual con IA Integrado:** Módulo inteligente (`ChatWidget`) interconectado con un agente de IA (`src/api/asistente.ts`) especializado en responder consultas sobre el ecosistema del Club, servicios disponibles y capacidades tecnológicas de los miembros.
* **Autenticación y Estado con Firebase:** Sistema de control de acceso seguro y persistencia de sesión global robusta administrada a través de los servicios de **Firebase Auth** y React Context API.
* **Foros de Innovación Abierta y Comunidades:** Espacios colaborativos centralizados (`src/pages/Foros.tsx`) para la publicación de retos tecnológicos compartidos, convocatorias institucionales y discusiones en comunidad.
* **Matchmaking de Socios y Proyectos:** Vistas estructuradas (`src/pages/Socios.tsx`, `src/pages/Proyectos.tsx`) para erradicar la dificultad de vinculación entre empresarios, desarrolladores e innovadores, acelerando la toma de decisiones conjuntas.
* **Panel Analítico y Estadísticas:** Dashboard de administración con tarjetas de métricas dinámicas (`StatCard`) para visualizar el crecimiento, interacciones de usuarios y tracción de los proyectos dentro del Club.

---

## Stack Tecnológico

* **Core Frontend:** React.js (Vite Core para recargas de componentes instantáneas HMR)
* **Lenguaje:** TypeScript (Tipado estricto para asegurar la consistencia en el manejo de datos y flujos asíncronos)
* **Arquitectura de Estilos:** Styled Components (Sistema de tokens centralizado para asegurar consistencia en colores, espaciados y sombras corporativas)
* **Ecosistema Cloud & Backend Integration:** Firebase (Autenticación y Sesiones) + Axios para consumo de servicios RESTful externos
* **Enrutamiento:** React Router Dom (`BrowserRouter` con protección de rutas por roles)

---

## Estructura de la Plataforma Web

El código fuente está diseñado bajo un patrón estricto de separación de responsabilidades para agilizar la maquetación bajo presión:

```text
src/
├── app/               # Manejo y definición de la malla de enrutamiento (App.tsx)
├── auth/              # Inicialización de Firebase y servicios de sesión asíncronos
├── api/               # Capa de servicios para consumo de endpoints (IA, foros, mensajes, retos)
├── components/        # Componentes atómicos de UI (ChatWidget, Sidebar, StatCards, formularios)
├── context/           # Control del estado global de autenticación del usuario
├── pages/             # Pantallas de negocio (Dashboard, Foros, Proyectos, Socios, Mensajes)
└── styles/            # Tokens de diseño centralizados (theme.ts) y estilos CSS globales
