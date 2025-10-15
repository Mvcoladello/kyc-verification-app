import React from 'react';
import { Button, Card, Input, Container, Grid, Flex, Text, Badge } from './ui';
import { useTheme } from '../hooks/useTheme';

export const ThemeDemo: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Text size="3xl" weight="bold" align="center" color={theme.colors.neutral[900]}>
        Sistema de Tema - Demonstração
      </Text>
      
      <div style={{ marginTop: theme.spacing[8] }}>
        
        {/* Seção de Cores */}
        <Card elevation="md" style={{ marginBottom: theme.spacing[8] }}>
          <Text size="2xl" weight="semibold" style={{ marginBottom: theme.spacing[6] }}>
            Paleta de Cores
          </Text>
          
          <Grid columns={5} style={{ marginBottom: theme.spacing[6] }}>
            {Object.entries(theme.colors.primary).map(([shade, color]) => (
              <div key={shade}>
                <div 
                  style={{ 
                    backgroundColor: color, 
                    height: '60px', 
                    borderRadius: theme.borderRadius.lg,
                    marginBottom: theme.spacing[2] 
                  }} 
                />
                <Text size="sm">Primary {shade}</Text>
              </div>
            ))}
          </Grid>
          
          <Flex wrap>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </Flex>
        </Card>

        {/* Seção de Botões */}
        <Card elevation="md" style={{ marginBottom: theme.spacing[8] }}>
          <Text size="2xl" weight="semibold" style={{ marginBottom: theme.spacing[6] }}>
            Variações de Botões
          </Text>
          
          <Flex wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
          </Flex>
        </Card>

        {/* Seção de Tipografia */}
        <Card elevation="md" style={{ marginBottom: theme.spacing[8] }}>
          <Text size="2xl" weight="semibold" style={{ marginBottom: theme.spacing[6] }}>
            Escala Tipográfica
          </Text>
          
          <div style={{ marginBottom: theme.spacing[4] }}>
            <Text size="5xl" weight="bold">Heading 1 (5xl)</Text>
            <Text size="4xl" weight="bold">Heading 2 (4xl)</Text>
            <Text size="3xl" weight="semibold">Heading 3 (3xl)</Text>
            <Text size="2xl" weight="semibold">Heading 4 (2xl)</Text>
            <Text size="xl" weight="medium">Heading 5 (xl)</Text>
            <Text size="lg" weight="medium">Heading 6 (lg)</Text>
            <Text size="base">Body text (base)</Text>
            <Text size="sm">Small text (sm)</Text>
            <Text size="xs">Extra small text (xs)</Text>
          </div>
        </Card>

        {/* Seção de Inputs */}
        <Card elevation="md" style={{ marginBottom: theme.spacing[8] }}>
          <Text size="2xl" weight="semibold" style={{ marginBottom: theme.spacing[6] }}>
            Componentes de Input
          </Text>
          
          <Grid columns={2}>
            <div>
              <Text size="sm" weight="medium" style={{ marginBottom: theme.spacing[2] }}>
                Nome completo
              </Text>
              <Input placeholder="Digite seu nome completo" />
            </div>
            
            <div>
              <Text size="sm" weight="medium" style={{ marginBottom: theme.spacing[2] }}>
                Email
              </Text>
              <Input type="email" placeholder="exemplo@email.com" />
            </div>
          </Grid>
        </Card>

        {/* Seção de Espaçamentos */}
        <Card elevation="md" style={{ marginBottom: theme.spacing[8] }}>
          <Text size="2xl" weight="semibold" style={{ marginBottom: theme.spacing[6] }}>
            Sistema de Espaçamento
          </Text>
          
          <div>
            {[2, 4, 6, 8, 12, 16, 20].map((space) => (
              <div key={space} style={{ marginBottom: theme.spacing[4] }}>
                <Text size="sm" style={{ marginBottom: theme.spacing[2] }}>
                  Spacing {space}: {theme.spacing[space as keyof typeof theme.spacing]}
                </Text>
                <div 
                  style={{ 
                    height: '20px', 
                    width: theme.spacing[space as keyof typeof theme.spacing],
                    backgroundColor: theme.colors.primary[500],
                    borderRadius: theme.borderRadius.sm
                  }} 
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Seção de Sombras */}
        <Card elevation="md">
          <Text size="2xl" weight="semibold" style={{ marginBottom: theme.spacing[6] }}>
            Níveis de Elevação (Sombras)
          </Text>
          
          <Grid columns={3}>
            {(['sm', 'base', 'md', 'lg', 'xl', '2xl'] as const).map((shadow) => (
              <div key={shadow}>
                <div 
                  style={{ 
                    padding: theme.spacing[6],
                    backgroundColor: theme.colors.neutral[50],
                    borderRadius: theme.borderRadius.lg,
                    boxShadow: theme.shadows[shadow],
                    marginBottom: theme.spacing[2],
                    textAlign: 'center'
                  }}
                >
                  <Text size="sm" weight="medium">Shadow {shadow}</Text>
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
