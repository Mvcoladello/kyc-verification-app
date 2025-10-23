import styled from 'styled-components';
import { Button, Card, Input, Typography } from './ui';
import { useTheme } from '../hooks/useTheme';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
`;

const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns = 3 }) => $columns}, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const Flex = styled.div<{ $wrap?: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
`;

const Badge = styled.span<{ $variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.borderRadius.full || theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[50]};
  background-color: ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'secondary':
        return theme.colors.neutral[700];
      case 'success':
        return theme.colors.success[600];
      case 'warning':
        return theme.colors.warning[600];
      case 'error':
        return theme.colors.error[600];
      default:
        return theme.colors.primary[600];
    }
  }};
`;

export const ThemeDemo = () => {
  const theme = useTheme();

  return (
    <Container>
      <Typography variant="h2" align="center" weight="bold" gutterBottom>
        Sistema de Tema - Demonstração
      </Typography>

      <div style={{ marginTop: theme.spacing[8] }}>
        {/* Seção de Cores */}
        <Card variant="elevated" style={{ marginBottom: theme.spacing[8] }}>
          <Typography variant="h3" weight="semibold" gutterBottom>
            Paleta de Cores
          </Typography>

          <Grid $columns={5} style={{ marginBottom: theme.spacing[6] }}>
            {Object.entries(theme.colors.primary).map(([shade, color]) => (
              <div key={shade}>
                <div
                  style={{
                    backgroundColor: color as string,
                    height: '60px',
                    borderRadius: theme.borderRadius.lg,
                    marginBottom: theme.spacing[2],
                  }}
                />
                <Typography variant="caption">Primary {shade}</Typography>
              </div>
            ))}
          </Grid>

          <Flex $wrap>
            <Badge $variant="primary">Primary</Badge>
            <Badge $variant="secondary">Secondary</Badge>
            <Badge $variant="success">Success</Badge>
            <Badge $variant="warning">Warning</Badge>
            <Badge $variant="error">Error</Badge>
          </Flex>
        </Card>

        {/* Seção de Botões */}
        <Card variant="elevated" style={{ marginBottom: theme.spacing[8] }}>
          <Typography variant="h3" weight="semibold" gutterBottom>
            Variações de Botões
          </Typography>

          <Flex $wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </Flex>
        </Card>

        {/* Seção de Tipografia */}
        <Card variant="elevated" style={{ marginBottom: theme.spacing[8] }}>
          <Typography variant="h3" weight="semibold" gutterBottom>
            Escala Tipográfica
          </Typography>

          <div style={{ marginBottom: theme.spacing[4] }}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="body1">Body text</Typography>
            <Typography variant="body2">Small text</Typography>
            <Typography variant="caption">Caption</Typography>
          </div>
        </Card>

        {/* Seção de Inputs */}
        <Card variant="elevated" style={{ marginBottom: theme.spacing[8] }}>
          <Typography variant="h3" weight="semibold" gutterBottom>
            Componentes de Input
          </Typography>

          <Grid $columns={2}>
            <div>
              <Typography variant="label" gutterBottom>
                Nome completo
              </Typography>
              <Input placeholder="Digite seu nome completo" />
            </div>

            <div>
              <Typography variant="label" gutterBottom>
                Email
              </Typography>
              <Input type="email" placeholder="exemplo@email.com" />
            </div>
          </Grid>
        </Card>

        {/* Seção de Espaçamentos */}
        <Card variant="elevated" style={{ marginBottom: theme.spacing[8] }}>
          <Typography variant="h3" weight="semibold" gutterBottom>
            Sistema de Espaçamento
          </Typography>

          <div>
            {[2, 4, 6, 8, 12, 16, 20].map((space) => (
              <div key={space} style={{ marginBottom: theme.spacing[4] }}>
                <Typography variant="body2" style={{ marginBottom: theme.spacing[2] }}>
                  Spacing {space}: {theme.spacing[space as keyof typeof theme.spacing]}
                </Typography>
                <div
                  style={{
                    height: '20px',
                    width: theme.spacing[space as keyof typeof theme.spacing],
                    backgroundColor: theme.colors.primary[500],
                    borderRadius: theme.borderRadius.sm,
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Seção de Sombras */}
        <Card variant="elevated">
          <Typography variant="h3" weight="semibold" gutterBottom>
            Níveis de Elevação (Sombras)
          </Typography>

          <Grid $columns={3}>
            {(['sm', 'base', 'md', 'lg', 'xl', '2xl'] as const).map((shadow) => (
              <div key={shadow}>
                <div
                  style={{
                    padding: theme.spacing[6],
                    backgroundColor: theme.colors.neutral[50],
                    borderRadius: theme.borderRadius.lg,
                    boxShadow: theme.shadows[shadow],
                    marginBottom: theme.spacing[2],
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" weight="medium">
                    Shadow {shadow}
                  </Typography>
                </div>
              </div>
            ))}
          </Grid>
        </Card>
      </div>
    </Container>
  );
};

export default ThemeDemo;
