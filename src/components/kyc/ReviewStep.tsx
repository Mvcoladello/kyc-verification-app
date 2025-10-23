import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

export interface ReviewData {
  personal?: any;
  address?: any;
  document?: any;
  allValues?: any;
}

export interface ReviewStepProps {
  data?: ReviewData;
  onBack?: () => void;
  onSubmit?: () => void;
  submitting?: boolean;
  goToStep?: (index: number) => void;
}

export const ReviewStep = ({ data, onBack, onSubmit, submitting, goToStep }: ReviewStepProps) => {
  return (
    <Card variant="elevated" padding="large">
      <Card.Header>
        <Card.Title>Revisão</Card.Title>
        <Card.Description>Confira seus dados antes de enviar</Card.Description>
      </Card.Header>
      <Card.Content>
        {data ? (
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Typography variant="h4" gutterBottom>Dados Pessoais</Typography>
                <Button type="button" variant="secondary" onClick={() => goToStep?.(0)}>Editar</Button>
              </div>
              <Typography variant="body2" color="textSecondary">{JSON.stringify(data.personal, null, 2)}</Typography>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Typography variant="h4" gutterBottom>Endereço</Typography>
                <Button type="button" variant="secondary" onClick={() => goToStep?.(1)}>Editar</Button>
              </div>
              <Typography variant="body2" color="textSecondary">{JSON.stringify(data.address, null, 2)}</Typography>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Typography variant="h4" gutterBottom>Documento</Typography>
                <Button type="button" variant="secondary" onClick={() => goToStep?.(2)}>Editar</Button>
              </div>
              <Typography variant="body2" color="textSecondary">{JSON.stringify({ ...data.document, fileFront: !!data.document?.fileFront, fileBack: !!data.document?.fileBack }, null, 2)}</Typography>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Typography variant="h4" gutterBottom>Selfie</Typography>
                <Button type="button" variant="secondary" onClick={() => goToStep?.(3)}>Editar</Button>
              </div>
              <Typography variant="body2" color="textSecondary">{JSON.stringify({ hasSelfie: !!(data.allValues?.selfie) }, null, 2)}</Typography>
            </div>
          </div>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Aqui você verá um resumo dos dados preenchidos nos passos anteriores.
          </Typography>
        )}
      </Card.Content>
      <Card.Footer>
        <Button type="button" variant="secondary" onClick={onBack}>Voltar</Button>
        <Button type="button" onClick={onSubmit} loading={submitting} aria-busy={!!submitting} aria-live="polite">
          {submitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </Card.Footer>
    </Card>
  );
};
