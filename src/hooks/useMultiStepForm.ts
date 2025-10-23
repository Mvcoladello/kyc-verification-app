import { useCallback, useMemo, useState } from 'react';

export type StepId = string | number;

export interface StepConfig {
  id: StepId;
  title?: string;
  description?: string;
  optional?: boolean;
}

interface Options {
  initialIndex?: number;
  loop?: boolean;
  onStepChange?: (nextIndex: number, prevIndex: number) => void;
}

export const useMultiStepForm = <TStep extends StepConfig = StepConfig>(
  steps: TStep[],
  opts: Options = {}
) => {
  const { initialIndex = 0, loop = false, onStepChange } = opts;

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (!steps?.length) return 0;
    return Math.min(Math.max(initialIndex, 0), steps.length - 1);
  });

  const total = steps?.length ?? 0;

  const goToStep = useCallback(
    (index: number) => {
      if (!total) return;
      const prev = currentStepIndex;
      let next = index;
      if (loop) {
        const mod = ((index % total) + total) % total;
        next = mod;
      } else {
        next = Math.min(Math.max(index, 0), total - 1);
      }
      if (next !== prev) {
        setCurrentStepIndex(next);
        onStepChange?.(next, prev);
      }
    },
    [currentStepIndex, loop, onStepChange, total]
  );

  const nextStep = useCallback(() => {
    goToStep(currentStepIndex + 1);
  }, [currentStepIndex, goToStep]);

  const prevStep = useCallback(() => {
    goToStep(currentStepIndex - 1);
  }, [currentStepIndex, goToStep]);

  const reset = useCallback(() => goToStep(0), [goToStep]);

  const currentStep = steps[currentStepIndex];

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = total ? currentStepIndex === total - 1 : true;

  const progress = useMemo(() => {
    if (!total) return 0;
    return Math.round(((currentStepIndex + 1) / total) * 100);
  }, [currentStepIndex, total]);

  return {
    steps,
    total,
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    progress,
    nextStep,
    prevStep,
    goToStep,
    reset,
  } as const;
};
