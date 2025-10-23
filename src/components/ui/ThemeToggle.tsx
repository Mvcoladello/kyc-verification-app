import styled from 'styled-components';
import { useThemeMode } from '../../ThemeProvider';

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.neutral[900]};
  background: ${({ theme }) => theme.colors.neutral[100]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[50]};
  }
`;

export const ThemeToggle = () => {
  const { mode, toggle } = useThemeMode();
  return (
    <Toggle onClick={toggle} aria-label="Alternar tema">
      {mode === 'light' ? '🌞 Claro' : '🌜 Escuro'}
    </Toggle>
  );
};
