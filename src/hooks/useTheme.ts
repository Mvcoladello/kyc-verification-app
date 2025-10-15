import { useTheme as useStyledTheme } from 'styled-components';
import type { Theme } from '../theme';

// Hook personalizado para acessar o tema
export const useTheme = (): Theme => {
  return useStyledTheme();
};

export default useTheme;
