import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useFormContext } from 'react-hook-form';

export interface PersonalInfoStepProps {
  onNext?: () => void;
}

export const PersonalInfoStep = ({ onNext }: PersonalInfoStepProps) => {
  const { register, formState: { errors }, trigger } = useFormContext();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await trigger(['fullName', 'email', 'phone', 'cpf', 'birthDate']);
    if (ok) onNext?.();
  };

  return (
    <Card variant="elevated" padding="large" as="form" onSubmit={onSubmit}>
      <Card.Header>
        <Card.Title>Dados Pessoais</Card.Title>
        <Card.Description>Preencha seus dados básicos</Card.Description>
      </Card.Header>
      <Card.Content>
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          {...register('fullName')}
          error={(errors as any)?.fullName?.message}
          fullWidth
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          {...register('email')}
          error={(errors as any)?.email?.message}
          fullWidth
        />
        <Input
          label="Telefone"
          placeholder="(00) 00000-0000"
          {...register('phone')}
          error={(errors as any)?.phone?.message}
          fullWidth
        />
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          {...register('cpf')}
          error={(errors as any)?.cpf?.message}
          fullWidth
        />
        <Input
          label="Data de nascimento"
          type="date"
          {...register('birthDate')}
          error={(errors as any)?.birthDate?.message}
          fullWidth
        />
      </Card.Content>
      <Card.Footer>
        <Button type="submit">Próximo</Button>
      </Card.Footer>
    </Card>
  );
};
