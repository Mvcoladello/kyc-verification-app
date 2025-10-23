import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useMultiStepForm } from '../src/hooks/useMultiStepForm';

describe('useMultiStepForm', () => {
  const steps = [
    { id: 'a', title: 'A' },
    { id: 'b', title: 'B' },
    { id: 'c', title: 'C' },
  ];

  it('starts at index 0 by default and computes progress', () => {
    const { result } = renderHook(() => useMultiStepForm(steps));
    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.progress).toBe(Math.round(((0 + 1) / steps.length) * 100));
  });

  it('navigates next and previous within bounds', () => {
    const { result } = renderHook(() => useMultiStepForm(steps));
    act(() => result.current.nextStep());
    expect(result.current.currentStepIndex).toBe(1);
    act(() => result.current.prevStep());
    expect(result.current.currentStepIndex).toBe(0);
  });

  it('goToStep clamps by default', () => {
    const { result } = renderHook(() => useMultiStepForm(steps));
    act(() => result.current.goToStep(99));
    expect(result.current.currentStepIndex).toBe(steps.length - 1);
    act(() => result.current.goToStep(-5));
    expect(result.current.currentStepIndex).toBe(0);
  });

  it('calls onStepChange when step changes', () => {
    const onStepChange = vi.fn();
    const { result } = renderHook(() => useMultiStepForm(steps, { onStepChange }));
    act(() => result.current.nextStep());
    expect(onStepChange).toHaveBeenCalledWith(1, 0);
  });
});
