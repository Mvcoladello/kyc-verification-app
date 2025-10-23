import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { FileUpload } from '../ui/FileUpload';
import { Button } from '../ui/Button';
import { Controller, useFormContext } from 'react-hook-form';

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
}

export const IdentityStep = ({ onBack, onNext }: IdentityStepProps) => {
  const { register, formState: { errors }, trigger, control } = useFormContext();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await trigger(['documentType', 'documentNumber', 'issuingCountry', 'documentFront', 'documentBack']);
    if (ok) onNext?.();
  };

  return (
    <Card variant="elevated" padding="large" as="form" onSubmit={onSubmit}>
      <Card.Header>
        <Card.Title>Documento de Identidade</Card.Title>
        <Card.Description>Informe os dados do documento e faça o upload</Card.Description>
      </Card.Header>
      <Card.Content>
        {/* Tipo de documento controlado por RHF */}
        <Controller
          name="documentType"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              label="Tipo de documento"
              options={documentTypeOptions}
              value={(field.value as string) ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              fullWidth
              error={fieldState.error?.message}
              placeholder="Selecione"
            />
          )}
        />
        
        <Input
          label="Número do documento"
          {...register('documentNumber')}
          error={(errors as any)?.documentNumber?.message}
          fullWidth
        />

        {/* País emissor controlado por RHF */}
        <Controller
          name="issuingCountry"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              label="País emissor"
              options={issuingCountryOptions}
              value={(field.value as string) ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              fullWidth
              error={fieldState.error?.message}
              placeholder="Selecione"
            />
          )}
        />

        <Controller
          name="documentFront"
          control={control}
          render={({ field, fieldState }) => (
            <FileUpload
              label="Frente do documento"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSizeMB={5}
              fullWidth
              file={field.value as File | null}
              onChange={(file) => field.onChange(file)}
              error={fieldState.error?.message}
              helperText={(field.value as File | null)?.name}
            />
          )}
        />
        <Controller
          name="documentBack"
          control={control}
          render={({ field, fieldState }) => (
            <FileUpload
              label="Verso do documento"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSizeMB={5}
              fullWidth
              file={field.value as File | null}
              onChange={(file) => field.onChange(file)}
              error={fieldState.error?.message}
              helperText={(field.value as File | null)?.name}
            />
          )}
        />
      </Card.Content>
      <Card.Footer>
        <Button type="button" variant="secondary" onClick={onBack}>Voltar</Button>
        <Button type="submit">Próximo</Button>
      </Card.Footer>
    </Card>
  );
};
