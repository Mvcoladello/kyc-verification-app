import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { AddressInfo } from '../../hooks/useFormValidation';
import { useFormValidation } from '../../hooks/useFormValidation';

const countryOptions = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'pt', label: 'Portugal' },
];

export interface AddressStepProps {
  initialValues?: Partial<AddressInfo>;
  onBack?: () => void;
  onNext?: (values: AddressInfo) => void;
}

export const AddressStep = ({ initialValues, onBack, onNext }: AddressStepProps) => {
  const { methods } = useFormValidation('address', { defaultValues: initialValues });
  const { handleSubmit, register, formState: { errors }, setValue, watch } = methods;

  const values = watch();

  const onSubmit = (vals: AddressInfo) => onNext?.(vals);

  return (
    <Card variant="elevated" padding="large" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Card.Title>Endereço</Card.Title>
        <Card.Description>Informe seu endereço de residência</Card.Description>
      </Card.Header>
      <Card.Content>
        <Select
          label="País"
          placeholder="Selecione um país"
          options={countryOptions}
          value={values.country}
          onChange={(e) => setValue('country', e.target.value, { shouldValidate: true })}
          fullWidth
          error={errors.country?.message}
        />
        <Input
          label="CEP"
          placeholder="00000-000"
          {...register('zipCode')}
          error={errors.zipCode?.message}
          fullWidth
        />
        <Input
          label="Estado"
          {...register('state')}
          error={errors.state?.message}
          fullWidth
        />
        <Input
          label="Cidade"
          {...register('city')}
          error={errors.city?.message}
          fullWidth
        />
        <Input
          label="Endereço"
          {...register('street')}
          error={errors.street?.message}
          fullWidth
        />
        <Input
          label="Número"
          {...register('number')}
          error={errors.number?.message}
          fullWidth
        />
        <Input
          label="Complemento"
          {...register('complement')}
          error={errors.complement?.message}
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
