import styled, { css } from 'styled-components';
import type { InputHTMLAttributes } from 'react';
import { forwardRef, useEffect } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange?: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  preview?: boolean;
  file?: File | null; // controlled value for integration with RHF Controller
}

const FileUploadWrapper = styled.div<{ $fullWidth: boolean }>`
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

const UploadArea = styled.div<{
  $hasError: boolean;
  $isDragging: boolean;
  $hasFile: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[8]};
  border: 2px dashed ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  min-height: 160px;

  ${({ $isDragging, theme }) =>
    $isDragging &&
    css`
      border-color: ${theme.colors.primary[500]};
      background-color: ${theme.colors.primary[50]};
      transform: scale(1.01);
    `}

  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.error[500]};
      background-color: ${theme.colors.error[50]};
    `}

  ${({ $hasFile, theme }) =>
    $hasFile &&
    css`
      border-color: ${theme.colors.success[500]};
      background-color: ${theme.colors.success[50]};
    `}

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    background-color: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadIcon = styled.svg`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const UploadText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  text-align: center;
  margin: 0;

  strong {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

const UploadHint = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  text-align: center;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.neutral[900]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.error[100]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error[200]};
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.error[600]};
  }
`;

const HelperText = styled.span<{ $isError: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ $isError, theme }) =>
    $isError ? theme.colors.error[600] : theme.colors.neutral[600]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans.join(', ')};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      onChange,
      accept,
      maxSizeMB = 10,
      preview = true,
      id,
      file,
      ...props
    },
    ref
  ) => {
    const {
      file: currentFile,
      error: hookError,
      isDragging,
      inputRef,
      inputProps,
      setFile,
      removeFile,
      onDrop,
      onDragOver,
      onDragLeave,
    } = useFileUpload({ accept, maxSizeMB, preview });

    // Sync controlled file from parent (e.g., RHF Controller)
    useEffect(() => {
      if (file !== undefined) {
        setFile(file);
      }
    }, [file, setFile]);

    // Propagate changes to parent
    useEffect(() => {
      if (onChange) onChange(currentFile ?? null);
    }, [currentFile, onChange]);

    const uploadId = id || `file-upload-${Math.random().toString(36).slice(2, 9)}`;
    const displayError = hookError || error;

    return (
      <FileUploadWrapper $fullWidth={fullWidth}>
        {label && <Label htmlFor={uploadId}>{label}</Label>}
        <UploadArea
          $hasError={!!displayError}
          $isDragging={isDragging}
          $hasFile={!!currentFile}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload de arquivo"
        >
          <HiddenInput
            ref={(node) => {
              // forward ref for RHF if needed
              if (typeof ref === 'function') ref(node as HTMLInputElement);
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node as HTMLInputElement;
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node as HTMLInputElement;
            }}
            id={uploadId}
            type="file"
            {...inputProps}
            aria-invalid={!!displayError}
            aria-describedby={displayError ? `${uploadId}-error` : undefined}
            {...props}
          />
          <UploadIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </UploadIcon>
          <UploadText>
            <strong>Clique para enviar</strong> ou arraste e solte
          </UploadText>
          <UploadHint>
            {accept ? `Formatos aceitos: ${accept}` : 'Todos os formatos são aceitos'} (máx. {maxSizeMB}MB)
          </UploadHint>
        </UploadArea>
        {preview && currentFile && (
          <FilePreview>
            <FileInfo>
              <FileName>{currentFile.name}</FileName>
              <FileSize>{formatFileSize(currentFile.size)}</FileSize>
            </FileInfo>
            <RemoveButton onClick={(e) => { e.stopPropagation(); removeFile(); }} type="button" aria-label="Remover arquivo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </RemoveButton>
          </FilePreview>
        )}
        {displayError && (
          <HelperText id={`${uploadId}-error`} $isError role="alert">
            {displayError}
          </HelperText>
        )}
        {!displayError && helperText && (
          <HelperText $isError={false}>{helperText}</HelperText>
        )}
      </FileUploadWrapper>
    );
  }
);

FileUpload.displayName = 'FileUpload';