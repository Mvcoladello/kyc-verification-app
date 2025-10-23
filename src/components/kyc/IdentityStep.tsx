import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { FileUpload } from '../ui/FileUpload';
import { Button } from '../ui/Button';
import { useFormContext } from 'react-hook-form';
import type { DocumentInfo } from '../../hooks/useFormValidation';

const documentTypeOptions = [
  { value: 'rg', label: 'RG' },
  { value: 'cnh', label: 'CNH' },
  { value: 'passport', label: 'Passaporte' },
];

const issuingCountryOptions = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'pt', label: 'Portugal' },
];

export interface IdentityStepProps {
  onBack?: () => void;
  onNext?: () => void;
  fileFront?: File | null;
  fileBack?: File | null;
  setFileFront?: (f: File | null) => void;
  setFileBack?: (f: File | null) => void;
}

export const IdentityStep = ({ onBack, onNext, fileFront, fileBack, setFileFront, setFileBack }: IdentityStepProps) => {
  const { register, formState: { errors }, setValue, watch, trigger } = useFormContext();
  const values = watch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await trigger(['documentType', 'documentNumber', 'issuingCountry']);
    if (ok) onNext?.();
  };

  return (
    <Card variant="elevated" padding="large" as="form" onSubmit={onSubmit}>
      <Card.Header>
        <Card.Title>Documento de Identidade</Card.Title>
        <Card.Description>Informe os dados do documento e faça o upload</Card.Description>
      </Card.Header>
      <Card.Content>
        <Select
          label="Tipo de documento"
          options={documentTypeOptions}
          value={(values as any)?.documentType || ''}
          onChange={(e) => setValue('documentType', e.target.value as DocumentInfo['documentType'], { shouldValidate: true })}
          fullWidth
          error={(errors as any)?.documentType?.message}
        />
        <Input
          label="Número do documento"
          {...register('documentNumber')}
          error={(errors as any)?.documentNumber?.message}
          fullWidth
        />
        <Select
          label="País emissor"
          options={issuingCountryOptions}
          value={(values as any)?.issuingCountry || ''}
          onChange={(e) => setValue('issuingCountry', e.target.value, { shouldValidate: true })}
          fullWidth
          error={(errors as any)?.issuingCountry?.message}
        />
        <FileUpload
          label="Frente do documento"
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={5}
          onChange={setFileFront}
          fullWidth
          helperText={fileFront ? fileFront.name : undefined}
        />
        <FileUpload
          label="Verso do documento"
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={5}
          onChange={setFileBack}
          fullWidth
          helperText={fileBack ? fileBack.name : undefined}
        />
      </Card.Content>
      <Card.Footer>
        <Button type="button" variant="secondary" onClick={onBack}>Voltar</Button>
        <Button type="submit">Próximo</Button>
      </Card.Footer>
    </Card>
  );
};
