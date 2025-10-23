import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

export interface SelfieStepProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const SelfieStep = ({ onBack, onNext }: SelfieStepProps) => {
  return (
    <Card variant="elevated" padding="large">
      <Card.Header>
        <Card.Title>Selfie (placeholder)</Card.Title>
        <Card.Description>
          Em breve aqui terá captura de selfie com validação em tempo real.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Typography variant="body2" color="textSecondary">
          Por agora, clique em Próximo para continuar para a revisão.
        </Typography>
      </Card.Content>
      <Card.Footer>
        <Button type="button" variant="secondary" onClick={onBack}>Voltar</Button>
        <Button type="button" onClick={onNext}>Próximo</Button>
      </Card.Footer>
    </Card>
  );
};
