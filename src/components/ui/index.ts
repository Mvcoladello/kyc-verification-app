import styled from 'styled-components';

// Exemplo de como usar os design tokens do tema

// Botões com variações
export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' }>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  
  ${({ theme, variant = 'primary' }) => {
    const colors = {
      primary: {
        background: theme.colors.primary[600],
        hover: theme.colors.primary[700],
        text: 'white',
      },
      secondary: {
        background: theme.colors.secondary[600],
        hover: theme.colors.secondary[700],
        text: 'white',
      },
      success: {
        background: theme.colors.success[600],
        hover: theme.colors.success[700],
        text: 'white',
      },
      warning: {
        background: theme.colors.warning[600],
        hover: theme.colors.warning[700],
        text: 'white',
      },
      error: {
        background: theme.colors.error[600],
        hover: theme.colors.error[700],
        text: 'white',
      },
    };
    
    return `
      background-color: ${colors[variant].background};
      color: ${colors[variant].text};
      
      &:hover {
        background-color: ${colors[variant].hover};
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.md};
      }
      
      &:active {
        transform: translateY(0);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    `;
  }}
`;

// Card com sombra e bordas arredondadas
export const Card = styled.div<{ elevation?: 'sm' | 'base' | 'md' | 'lg' | 'xl' }>`
  background: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme, elevation = 'base' }) => theme.shadows[elevation]};
  transition: ${({ theme }) => theme.transitions.shadow};
  
  &:hover {
    box-shadow: ${({ theme, elevation = 'base' }) => {
      const elevations = { sm: 'base', base: 'md', md: 'lg', lg: 'xl', xl: '2xl' };
      return theme.shadows[elevations[elevation] as keyof typeof theme.shadows];
    }};
  }
`;

// Input estilizado
export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: ${({ theme }) => theme.colors.neutral[50]};
  color: ${({ theme }) => theme.colors.neutral[900]};
  transition: ${({ theme }) => theme.transitions.colors};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[400]};
    cursor: not-allowed;
  }
`;

// Container responsivo
export const Container = styled.div<{ maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' }>`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  
  ${({ maxWidth = 'lg' }) => {
    const maxWidths = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      full: '100%',
    };
    
    return maxWidth !== 'full' ? `max-width: ${maxWidths[maxWidth]};` : '';
  }}
`;

// Grid responsivo
export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

// Flex container
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align }) => align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align || 'stretch'};
  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'between': return 'space-between';
      case 'around': return 'space-around';
      default: return justify || 'flex-start';
    }
  }};
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'nowrap'};
`;

// Text components
export const Text = styled.p<{
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
}>`
  margin: 0;
  font-size: ${({ theme, size = 'base' }) => theme.typography.fontSize[size]};
  font-weight: ${({ theme, weight = 'normal' }) => theme.typography.fontWeight[weight]};
  color: ${({ theme, color }) => color || theme.colors.neutral[700]};
  text-align: ${({ align = 'left' }) => align};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

// Badge/Tag component
export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  ${({ theme, variant = 'primary' }) => {
    const colors = {
      primary: {
        background: theme.colors.primary[100],
        text: theme.colors.primary[800],
      },
      secondary: {
        background: theme.colors.secondary[100],
        text: theme.colors.secondary[800],
      },
      success: {
        background: theme.colors.success[100],
        text: theme.colors.success[800],
      },
      warning: {
        background: theme.colors.warning[100],
        text: theme.colors.warning[800],
      },
      error: {
        background: theme.colors.error[100],
        text: theme.colors.error[800],
      },
    };
    
    return `
      background-color: ${colors[variant].background};
      color: ${colors[variant].text};
    `;
  }}
`;
