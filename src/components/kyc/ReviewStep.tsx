import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

export interface ReviewData {
  personal?: any;
  address?: any;
  document?: any;
}

export interface ReviewStepProps {
  data?: ReviewData;
  onBack?: () => void;
  onSubmit?: () => void;
}

export const ReviewStep = ({ data, onBack, onSubmit }: ReviewStepProps) => {
  return (
    <Card variant="elevated" padding="large">
      <Card.Header>
        <Card.Title>Revisão</Card.Title>
        <Card.Description>Confira seus dados antes de enviar</Card.Description>
      </Card.Header>
      <Card.Content>
        {data ? (
          <div>
            <Typography variant="h4" gutterBottom>Dados Pessoais</Typography>
            <Typography variant="body2" color="textSecondary">{JSON.stringify(data.personal, null, 2)}</Typography>
            <Typography variant="h4" gutterBottom style={{ marginTop: 12 }}>Endereço</Typography>
            <Typography variant="body2" color="textSecondary">{JSON.stringify(data.address, null, 2)}</Typography>
            <Typography variant="h4" gutterBottom style={{ marginTop: 12 }}>Documento</Typography>
            <Typography variant="body2" color="textSecondary">{JSON.stringify({ ...data.document, fileFront: !!data.document?.fileFront, fileBack: !!data.document?.fileBack }, null, 2)}</Typography>
          </div>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Aqui você verá um resumo dos dados preenchidos nos passos anteriores.
          </Typography>
        )}
      </Card.Content>
      <Card.Footer>
        <Button type="button" variant="secondary" onClick={onBack}>Voltar</Button>
        <Button type="button" onClick={onSubmit}>Enviar</Button>
      </Card.Footer>
    </Card>
  );
};
