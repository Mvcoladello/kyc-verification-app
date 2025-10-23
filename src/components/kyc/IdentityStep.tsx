import { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { FileUpload } from '../ui/FileUpload';
import { Button } from '../ui/Button';
import type { DocumentInfo } from '../../hooks/useFormValidation';
import { useFormValidation } from '../../hooks/useFormValidation';

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
  initialValues?: Partial<DocumentInfo>;
  onBack?: () => void;
  onNext?: (values: DocumentInfo & { fileFront?: File | null; fileBack?: File | null }) => void;
}

export const IdentityStep = ({ initialValues, onBack, onNext }: IdentityStepProps) => {
  const { methods } = useFormValidation('document', { defaultValues: initialValues });
  const { handleSubmit, register, formState: { errors }, setValue, watch } = methods;

  const values = watch();

  const [fileFront, setFileFront] = useState<File | null>(null);
  const [fileBack, setFileBack] = useState<File | null>(null);

  const onSubmit = (vals: DocumentInfo) => onNext?.({ ...vals, fileFront, fileBack });

  return (
    <Card variant="elevated" padding="large" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Card.Title>Documento de Identidade</Card.Title>
        <Card.Description>Informe os dados do documento e faça o upload</Card.Description>
      </Card.Header>
      <Card.Content>
        <Select
          label="Tipo de documento"
          options={documentTypeOptions}
          value={values.documentType}
          onChange={(e) => setValue('documentType', e.target.value as DocumentInfo['documentType'], { shouldValidate: true })}
          fullWidth
          error={errors.documentType?.message}
        />
        <Input
          label="Número do documento"
          {...register('documentNumber')}
          error={errors.documentNumber?.message}
          fullWidth
        />
        <Select
          label="País emissor"
          options={issuingCountryOptions}
          value={values.issuingCountry}
          onChange={(e) => setValue('issuingCountry', e.target.value, { shouldValidate: true })}
          fullWidth
          error={errors.issuingCountry?.message}
        />
        <FileUpload
          label="Frente do documento"
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={5}
          onChange={setFileFront}
          fullWidth
        />
        <FileUpload
          label="Verso do documento"
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={5}
          onChange={setFileBack}
          fullWidth
        />
      </Card.Content>
      <Card.Footer>
        <Button type="button" variant="secondary" onClick={onBack}>Voltar</Button>
        <Button type="submit">Próximo</Button>
      </Card.Footer>
    </Card>
  );
};
