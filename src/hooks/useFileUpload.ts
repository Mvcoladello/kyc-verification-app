import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

export interface FileUploadOptions {
  accept?: string; // Ex: '.png,.jpg,.jpeg' ou 'image/*'
  maxSizeMB?: number; // Tamanho máximo em MB
  multiple?: false; // preparado para expansão futura
  preview?: boolean;
}

export interface UseFileUploadResult {
  file: File | null;
  error: string | null;
  previewUrl: string | null;
  isDragging: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setFile: (file: File | null) => void;
  removeFile: () => void;
  clearError: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: DragEvent<HTMLElement>) => void;
  onDragOver: (e: DragEvent<HTMLElement>) => void;
  onDragLeave: (e: DragEvent<HTMLElement>) => void;
  inputProps: {
    accept?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
}

const bytesToMB = (bytes: number) => bytes / (1024 * 1024);

const matchAccept = (file: File, accept?: string): boolean => {
  if (!accept) return true;
  const parts = accept.split(',').map((t) => t.trim().toLowerCase());
  const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
  const mime = file.type.toLowerCase();

  return parts.some((p) => {
    if (p.startsWith('.')) return p === ext;
    if (p.endsWith('/*')) return mime.startsWith(p.replace('/*', ''));
    return mime === p;
  });
};

export const useFileUpload = (opts: FileUploadOptions = {}): UseFileUploadResult => {
  const { accept, maxSizeMB = 10, preview = true } = opts;
  const [file, setFileState] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = useCallback(
    (f: File | null): string | null => {
      if (!f) return null;
      if (!matchAccept(f, accept)) return 'Tipo de arquivo não permitido';
      if (bytesToMB(f.size) > maxSizeMB) return `O arquivo deve ter no máximo ${maxSizeMB}MB`;
      return null;
    },
    [accept, maxSizeMB]
  );

  const setFile = useCallback(
    (f: File | null) => {
      const v = validate(f);
      if (v) {
        setError(v);
        setFileState(null);
        return;
      }
      setError(null);
      setFileState(f);
    },
    [validate]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] || null;
      setFile(f);
    },
    [setFile]
  );

  const removeFile = useCallback(() => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [setFile]);

  const clearError = useCallback(() => setError(null), []);

  const onDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files?.[0] ?? null;
      setFile(f);
    },
    [setFile]
  );

  useEffect(() => {
    if (!preview) return;
    if (!file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, preview, previewUrl]);

  const inputProps = useMemo(
    () => ({ accept, onChange: onInputChange }),
    [accept, onInputChange]
  );

  return {
    file,
    error,
    previewUrl,
    isDragging,
    inputRef: inputRef as React.RefObject<HTMLInputElement>,
    setFile,
    removeFile,
    clearError,
    onInputChange,
    onDrop,
    onDragOver,
    onDragLeave,
    inputProps,
  } as const;
};
