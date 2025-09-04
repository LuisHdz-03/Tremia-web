export const theme = {
  colors: {
    // Colores principales
    primary: '#2957CD',        // Azul principal
    background: '#FFFFFF',     // Fondo blanco
    surface: '#2957CD',        // Superficie de cards (azul)
    
    // Textos
    textPrimary: '#FFFFFF',    // Texto principal (blanco sobre azul)
    textSecondary: '#1a1a1a',  // Texto secundario (negro sobre blanco)
    textMuted: '#6b7280',      // Texto suave (gris medio)
    
    // Grises para elementos
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    
    // Estados
    danger: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    pill: '9999px',
  },
  spacing: (n: number) => `${n * 4}px`,
  shadow: {
    sm: '0 2px 8px rgba(41, 87, 205, 0.08)',
    md: '0 8px 32px rgba(41, 87, 205, 0.12)',
    lg: '0 16px 48px rgba(41, 87, 205, 0.15)',
    xl: '0 24px 64px rgba(41, 87, 205, 0.2)',
  },
} as const
