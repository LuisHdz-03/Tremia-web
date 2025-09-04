# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Uso de esta plantilla (Routing + styled-components)

1. Instalar dependencias

```bash
npm install
```

2. Ejecutar el entorno de desarrollo

```bash
npm run dev
```

3. Estructura relevante

- `src/main.tsx`: monta el `ThemeProvider`, `GlobalStyle` y `BrowserRouter`.
- `src/App.tsx`: define rutas; redirige `/` a `/login`.
- `src/pages/Login.tsx`: pantalla principal de Login con `styled-components`.
- `src/styles/theme.ts`: tema centralizado (colores, radios, spacing, sombras).
- `src/styles/global.ts`: estilos globales.
- `src/styles/styled.d.ts`: tipado de `DefaultTheme`.

4. Limpieza aplicada

- Eliminadas referencias al template de Vite (logos, CSS base) y favicon por defecto.
- Si aún existen archivos como `src/App.css`, `src/index.css`, `src/assets/react.svg` o `public/vite.svg`, puedes borrarlos.

5. Añadir nuevas pantallas/rutas

- Crea un archivo en `src/pages/Nombre.tsx` y añade una ruta en `src/App.tsx`:

```tsx
<Route path="/nombre" element={<Nombre />} />
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
