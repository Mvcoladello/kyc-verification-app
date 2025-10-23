import styled, { css } from 'styled-components';
import type { HTMLAttributes, ReactNode, ElementType } from 'react';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  variant?: CardVariant;
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: ReactNode;
}

const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: 'none' | 'small' | 'medium' | 'large';
}>`
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: ${({ theme }) => theme.transitions.all};

  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'none':
        return css`
          padding: 0;
        `;
      case 'small':
        return css`
          padding: ${theme.spacing[4]};
        `;
      case 'large':
        return css`
          padding: ${theme.spacing[8]} ${theme.spacing[12]};
        `;
      default:
        return css`
          padding: ${theme.spacing[6]} ${theme.spacing[8]};
        `;
    }
  }}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'outlined':
        return css`
          border: 1px solid ${theme.colors.neutral[300]};
          box-shadow: none;
        `;
      case 'elevated':
        return css`
          box-shadow: ${theme.shadows.lg};
          &:hover {
            box-shadow: ${theme.shadows.xl};
            transform: translateY(-2px);
          }
        `;
      default:
        return css`
          box-shadow: ${theme.shadows.sm};
        `;
    }
  }}
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const CardFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[300]};
`;

export const Card = ({
  as,
  variant = 'default',
  padding = 'medium',
  children,
  ...props
}: CardProps) => {
  return (
    <StyledCard as={as} $variant={variant} $padding={padding} {...props}>
      {children}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;