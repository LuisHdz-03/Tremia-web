import 'styled-components'
import { theme } from './theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof theme.colors
    radii: typeof theme.radii
    spacing: typeof theme.spacing
    shadow: typeof theme.shadow
  }
}
