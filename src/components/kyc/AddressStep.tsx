import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useFormContext } from 'react-hook-form';

const countryOptions = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'pt', label: 'Portugal' },
];

export interface AddressStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const AddressStep = ({ onBack, onNext }: AddressStepProps) => {
  const { register, formState: { errors }, setValue, watch, trigger } = useFormContext();
  const values = watch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await trigger(['country', 'zipCode', 'state', 'city', 'street', 'number', 'complement']);
    if (ok) onNext?.();
  };

  return (
    <Card variant="elevated" padding="large" as="form" onSubmit={onSubmit}>
      <Card.Header>
        <Card.Title>Endereço</Card.Title>
        <Card.Description>Informe seu endereço de residência</Card.Description>
      </Card.Header>
      <Card.Content>
        <Select
          label="País"
          placeholder="Selecione um país"
          options={countryOptions}
          value={(values as any)?.country || ''}
          onChange={(e) => setValue('country', e.target.value, { shouldValidate: true })}
          fullWidth
          error={(errors as any)?.country?.message}
        />
        <Input
          label="CEP"
          placeholder="00000-000"
          {...register('zipCode')}
          error={(errors as any)?.zipCode?.message}
          fullWidth
        />
        <Input
          label="Estado"
          {...register('state')}
          error={(errors as any)?.state?.message}
          fullWidth
        />
        <Input
          label="Cidade"
          {...register('city')}
          error={(errors as any)?.city?.message}
          fullWidth
        />
        <Input
          label="Endereço"
          {...register('street')}
          error={(errors as any)?.street?.message}
          fullWidth
        />
        <Input
          label="Número"
          {...register('number')}
          error={(errors as any)?.number?.message}
          fullWidth
        />
        <Input
          label="Complemento"
          {...register('complement')}
          error={(errors as any)?.complement?.message}
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
