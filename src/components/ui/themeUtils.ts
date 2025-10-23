// Utilitários para trabalhar com o tema
import type { Theme } from '../../theme';

// Mapa de cores semânticas para cores do tema
export const getSemanticColor = (
  theme: Theme,
  semantic: 'text' | 'textSecondary' | 'background' | 'surface' | 'border' | 'primary' | 'primaryDark' | 'error' | 'success'
): string => {
  const colorMap: Record<typeof semantic, string> = {
    text: theme.colors.neutral[900],
    textSecondary: theme.colors.neutral[600],
    background: theme.colors.neutral[50],
    surface: theme.colors.neutral[100],
    border: theme.colors.neutral[300],
    primary: theme.colors.primary[600],
    primaryDark: theme.colors.primary[700],
    error: theme.colors.error[600],
    success: theme.colors.success[600],
  };

  return colorMap[semantic];
};

// Mapa de tamanhos de fontes semânticos
export const getFontSize = (
  theme: Theme,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
): string => {
  const sizeMap = {
    xs: theme.typography.fontSize.xs,
    sm: theme.typography.fontSize.sm,
    md: theme.typography.fontSize.base,
    lg: theme.typography.fontSize.lg,
    xl: theme.typography.fontSize.xl,
    xxl: theme.typography.fontSize['2xl'],
  };

  return sizeMap[size];
};

// Mapa de espaçamentos semânticos
export const getSpacing = (
  theme: Theme,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
): string => {
  const spacingMap = {
    xs: theme.spacing[2],
    sm: theme.spacing[3],
    md: theme.spacing[4],
    lg: theme.spacing[6],
    xl: theme.spacing[8],
    xxl: theme.spacing[12],
  };

  return spacingMap[size];
};

// Mapa de fontes
export const getFontFamily = (
  theme: Theme,
  type: 'body' | 'heading'
): string => {
  return type === 'body' 
    ? theme.typography.fontFamily.sans.join(', ')
    : theme.typography.fontFamily.sans.join(', ');
};

// Mapa de transições
export const getTransition = (
  theme: Theme,
  type: 'fast' | 'normal' | 'slow'
): string => {
  const transitionMap = {
    fast: theme.transitions.all.replace('150ms', '100ms'),
    normal: theme.transitions.all,
    slow: theme.transitions.all.replace('150ms', '300ms'),
  };

  return transitionMap[type];
};
