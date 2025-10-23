import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number; // ms
}

interface ToastContextValue {
  show: (toast: Omit<ToastItem, 'id'>) => string;
  success: (message: string, opts?: Omit<ToastItem, 'id' | 'type' | 'message'>) => string;
  error: (message: string, opts?: Omit<ToastItem, 'id' | 'type' | 'message'>) => string;
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const Container = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing[6]};
  right: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  z-index: ${({ theme }) => theme.zIndex.toast};
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    left: ${({ theme }) => theme.spacing[3]};
    right: ${({ theme }) => theme.spacing[3]};
  }
`;

const ToastCard = styled.div<{ $type: ToastType }>`
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: start;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  background: ${({ theme }) => theme.colors.neutral[50]};
  border-left: 4px solid;
  pointer-events: auto;

  ${({ $type, theme }) =>
    $type === 'success' &&
    css`
      border-color: ${theme.colors.success[500]};
    `}
  ${({ $type, theme }) =>
    $type === 'error' &&
    css`
      border-color: ${theme.colors.error[500]};
    `}
  ${({ $type, theme }) =>
    $type === 'info' &&
    css`
      border-color: ${theme.colors.info[500]};
    `}
  ${({ $type, theme }) =>
    $type === 'warning' &&
    css`
      border-color: ${theme.colors.warning[500]};
    `}
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const Message = styled.div`
  color: ${({ theme }) => theme.colors.neutral[700]};
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.neutral[500]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral[700]};
    background: ${({ theme }) => theme.colors.neutral[100]};
  }
`;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, any>>({});

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const show = useCallback<ToastContextValue['show']>((toast) => {
    const id = Math.random().toString(36).slice(2, 9);
    const duration = toast.duration ?? 3000;
    setToasts((prev) => [...prev, { id, ...toast }]);
    timers.current[id] = setTimeout(() => remove(id), duration);
    return id;
  }, [remove]);

  const api = useMemo<ToastContextValue>(() => ({
    show,
    success: (message, opts) => show({ type: 'success', message, ...opts }),
    error: (message, opts) => show({ type: 'error', message, ...opts }),
    remove,
  }), [show, remove]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Container aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <ToastCard key={t.id} $type={t.type} role={t.type === 'error' ? 'alert' : 'status'}>
            <div aria-hidden>•</div>
            <div>
              {t.title && <Title>{t.title}</Title>}
              <Message>{t.message}</Message>
            </div>
            <CloseBtn onClick={() => remove(t.id)} aria-label="Fechar notificação">✕</CloseBtn>
          </ToastCard>
        ))}
      </Container>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider');
  return ctx;
};
