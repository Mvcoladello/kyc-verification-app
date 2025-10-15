import 'styled-components';
import { Theme } from './theme';

// Declaração de módulo para estender a tipagem do styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
