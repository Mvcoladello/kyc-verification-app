import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import baseTheme, { type Theme } from './theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggle: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

// Create a dark theme by reversing the neutral scale so existing usages work seamlessly
function createTheme(mode: ThemeMode): Theme {
  if (mode === 'light') return baseTheme as Theme;

  type NeutralScale = typeof baseTheme.colors.neutral;
  type NeutralKey = keyof NeutralScale;

  const reverseNeutral: Record<NeutralKey, string> = {
    50: baseTheme.colors.neutral[900],
    100: baseTheme.colors.neutral[800],
    200: baseTheme.colors.neutral[700],
    300: baseTheme.colors.neutral[600],
    400: baseTheme.colors.neutral[500],
    500: baseTheme.colors.neutral[400],
    600: baseTheme.colors.neutral[300],
    700: baseTheme.colors.neutral[200],
    800: baseTheme.colors.neutral[100],
    900: baseTheme.colors.neutral[50],
  } as const as Record<NeutralKey, string>;

  const colors: Theme['colors'] = {
    ...baseTheme.colors,
    neutral: reverseNeutral as unknown as NeutralScale,
  };

  return {
    ...baseTheme,
    colors,
  } as Theme;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const preferred = useMemo<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme-mode') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const [mode, setMode] = useState<ThemeMode>(preferred);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', mode);
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme-mode', mode);
    }
  }, [mode]);

  const value = useMemo<ThemeModeContextValue>(() => ({
    mode,
    toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    setMode,
  }), [mode]);

  const themed = useMemo(() => createTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <StyledThemeProvider theme={themed}>{children}</StyledThemeProvider>
    </ThemeModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider');
  return ctx;
};

export default ThemeProvider;
