import styled, { css } from 'styled-components';

export interface StepperStep {
  id: string | number;
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  activeIndex: number;
}

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  ${({ $completed, theme }) =>
    $completed &&
    css`
      background: ${theme.colors.success[100]};
      color: ${theme.colors.success[700]};
    `}

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.primary[100]};
      color: ${theme.colors.primary[700]};
      box-shadow: 0 0 0 2px ${theme.colors.primary[200]} inset;
    `}
`;

const Dot = styled.span<{ $active: boolean; $completed: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $completed, $active, theme }) =>
    $completed ? theme.colors.success[500] : $active ? theme.colors.primary[500] : theme.colors.neutral[300]};
`;

export const Stepper = ({ steps, activeIndex }: StepperProps) => (
  <Wrapper aria-label="Progresso do formulário de etapas">
    {steps.map((s, idx) => (
      <Step key={s.id} $active={idx === activeIndex} $completed={idx < activeIndex} aria-current={idx === activeIndex ? 'step' : undefined}>
        <Dot $active={idx === activeIndex} $completed={idx < activeIndex} aria-hidden />
        <span>{s.label}</span>
      </Step>
    ))}
  </Wrapper>
);
