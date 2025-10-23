import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { PersonalInfo } from '../../hooks/useFormValidation';
import { useFormValidation } from '../../hooks/useFormValidation';

export interface PersonalInfoStepProps {
  initialValues?: Partial<PersonalInfo>;
  onNext?: (values: PersonalInfo) => void;
}

export const PersonalInfoStep = ({ initialValues, onNext }: PersonalInfoStepProps) => {
  const { methods } = useFormValidation('personal', { defaultValues: initialValues });
  const { handleSubmit, register, formState: { errors } } = methods;

  const onSubmit = (values: PersonalInfo) => onNext?.(values);

  return (
    <Card variant="elevated" padding="large" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Card.Title>Dados Pessoais</Card.Title>
        <Card.Description>Preencha seus dados básicos</Card.Description>
      </Card.Header>
      <Card.Content>
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          {...register('fullName')}
          error={errors.fullName?.message}
          fullWidth
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          {...register('email')}
          error={errors.email?.message}
          fullWidth
        />
        <Input
          label="Telefone"
          placeholder="(00) 00000-0000"
          {...register('phone')}
          error={errors.phone?.message}
          fullWidth
        />
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          {...register('cpf')}
          error={errors.cpf?.message}
          fullWidth
        />
        <Input
          label="Data de nascimento"
          type="date"
          {...register('birthDate')}
          error={errors.birthDate?.message}
          fullWidth
        />
      </Card.Content>
      <Card.Footer>
        <Button type="submit">Próximo</Button>
      </Card.Footer>
    </Card>
  );
};
