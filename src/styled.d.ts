import 'styled-components';
import { Theme } from './theme';

// Declaração de módulo para estender a tipagem do styled-components
declare module 'styled-components' {
  // Using a branded field avoids the empty-interface lint error while not affecting consumers
  interface __ThemeBrand { readonly __brand?: 'DefaultTheme'; }
  export interface DefaultTheme extends Theme, __ThemeBrand {}
}
