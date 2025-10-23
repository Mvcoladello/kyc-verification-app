import styled, { css } from 'styled-components';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $loading: boolean;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  position: relative;
  overflow: hidden;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $size, theme }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 36px;
        `;
      case 'large':
        return css`
          padding: ${theme.spacing[4]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 52px;
        `;
      default:
        return css`
          padding: ${theme.spacing[3]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.base};
          min-height: 44px;
        `;
    }
  }}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary[600]};
          border: 2px solid ${theme.colors.primary[600]};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[50]};
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.primary[100]};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary[600]};
          color: ${theme.colors.neutral[50]};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary[700]};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.sm};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      color: transparent;
      pointer-events: none;
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[600]};
    outline-offset: 2px;
  }
`;

const Spinner = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $loading={loading}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </StyledButton>
  );
};
