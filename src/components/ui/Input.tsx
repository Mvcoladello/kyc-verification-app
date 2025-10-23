import styled, { css } from 'styled-components';
import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
`;

const StyledInput = styled.input<{ $hasError: boolean; $isFocused: boolean }>`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  color: ${({ theme }) => theme.colors.neutral[900]};
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.all};
  min-height: 44px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
    opacity: 0.7;
  }

  ${({ $isFocused, theme }) =>
    $isFocused &&
    css`
      border-color: ${theme.colors.primary[500]};
      outline: none;
      box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
    `}

  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.error[500]};

      &:focus {
        box-shadow: 0 0 0 3px ${theme.colors.error[100]};
      }
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

const HelperText = styled.span<{ $isError: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $isError, theme }) =>
    $isError ? theme.colors.error[600] : theme.colors.neutral[600]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, fullWidth = false, id, onFocus, onBlur, ...props },
    ref
  ) => {
    const reactId = useId();
    const generatedId = `input-${reactId}`;
    const inputId = id || generatedId;

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <InputWrapper $fullWidth={fullWidth}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <StyledInput
          ref={ref}
          id={inputId}
          $hasError={!!error}
          $isFocused={isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <HelperText id={`${inputId}-error`} $isError role="alert">
            {error}
          </HelperText>
        )}
        {!error && helperText && (
          <HelperText $isError={false}>{helperText}</HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
