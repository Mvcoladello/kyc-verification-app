import styled from 'styled-components';
import { useState, type ChangeEvent } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { FileUpload } from './ui/FileUpload';
import { Card } from './ui/Card';
import { Typography } from './ui/Typography';

const DemoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const ComponentShowcase = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const UIComponentsDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const countryOptions = [
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'uk', label: 'Reino Unido' },
    { value: 'pt', label: 'Portugal' },
  ];

  return (
    <DemoContainer>
      <Typography variant="h1" gutterBottom>
        Sistema de Componentes UI
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Biblioteca de componentes reutilizáveis para o app de verificação KYC
      </Typography>

      {/* Typography Section */}
      <Section>
        <Card variant="elevated" padding="large">
          <Card.Header>
            <Card.Title>Typography</Card.Title>
            <Card.Description>
              Componente para renderizar diferentes estilos de texto
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="body1">
              Body 1 - Este é um parágrafo de texto principal com tamanho base e
              espaçamento adequado para leitura.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Body 2 - Texto secundário menor, ideal para descrições e conteúdo
              auxiliar.
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Caption - Texto muito pequeno para notas de rodapé e legendas
            </Typography>
            <Typography variant="label" color="primary">
              Label - Texto para rótulos de formulário
            </Typography>
          </Card.Content>
        </Card>
      </Section>

      {/* Buttons Section */}
      <Section>
        <Card variant="elevated" padding="large">
          <Card.Header>
            <Card.Title>Buttons</Card.Title>
            <Card.Description>
              Botões com diferentes variantes, tamanhos e estados
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <ComponentShowcase>
              <div>
                <Typography variant="label" gutterBottom>
                  Variantes
                </Typography>
                <Grid>
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                </Grid>
              </div>

              <div>
                <Typography variant="label" gutterBottom>
                  Tamanhos
                </Typography>
                <Grid>
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                  <Button size="large">Large</Button>
                </Grid>
              </div>

              <div>
                <Typography variant="label" gutterBottom>
                  Estados
                </Typography>
                <Grid>
                  <Button loading>Loading...</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </Grid>
              </div>
            </ComponentShowcase>
          </Card.Content>
        </Card>
      </Section>

      {/* Form Controls Section */}
      <Section>
        <Card variant="elevated" padding="large">
          <Card.Header>
            <Card.Title>Form Controls</Card.Title>
            <Card.Description>
              Componentes de formulário com validação e feedback visual
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <ComponentShowcase>
              <Input
                label="Nome completo"
                placeholder="Digite seu nome"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                helperText="Este campo é obrigatório"
                fullWidth
              />

              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                error="E-mail inválido"
                fullWidth
              />

              <Select
                label="País"
                placeholder="Selecione um país"
                options={countryOptions}
                value={selectValue}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectValue(e.target.value)}
                helperText="Selecione o país de residência"
                fullWidth
              />

              <FileUpload
                label="Upload de documento"
                accept=".pdf,.jpg,.jpeg,.png"
                maxSizeMB={5}
                onChange={setFile}
                helperText="Formatos aceitos: PDF, JPG, PNG (máx. 5MB)"
                fullWidth
              />
              {file && (
                <Typography variant="caption" color="success">
                  ✓ Arquivo selecionado: {file.name}
                </Typography>
              )}
            </ComponentShowcase>
          </Card.Content>
        </Card>
      </Section>

      {/* Cards Section */}
      <Section>
        <Typography variant="h2" gutterBottom>
          Card Variants
        </Typography>
        <Grid>
          <Card variant="default">
            <Card.Header>
              <Card.Title>Default Card</Card.Title>
              <Card.Description>
                Card com sombra padrão e estilo simples
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <Typography variant="body2">
                Conteúdo do card com padding padrão e estilo básico.
              </Typography>
            </Card.Content>
          </Card>

          <Card variant="outlined">
            <Card.Header>
              <Card.Title>Outlined Card</Card.Title>
              <Card.Description>
                Card com borda visível e sem sombra
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <Typography variant="body2">
                Ideal para separação visual sem tanto destaque.
              </Typography>
            </Card.Content>
          </Card>

          <Card variant="elevated">
            <Card.Header>
              <Card.Title>Elevated Card</Card.Title>
              <Card.Description>
                Card com sombra elevada e efeito hover
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <Typography variant="body2">
                Perfeito para destacar conteúdo importante.
              </Typography>
            </Card.Content>
          </Card>
        </Grid>
      </Section>

      {/* Example Form Card */}
      <Section>
        <Card variant="elevated" padding="large">
          <Card.Header>
            <Card.Title>Formulário de Verificação KYC</Card.Title>
            <Card.Description>
              Exemplo de uso combinado dos componentes
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <ComponentShowcase>
              <Input
                label="Nome completo"
                placeholder="Digite seu nome completo"
                fullWidth
              />
              <Input
                label="CPF"
                placeholder="000.000.000-00"
                fullWidth
              />
              <Select
                label="País de residência"
                placeholder="Selecione um país"
                options={countryOptions}
                fullWidth
              />
              <FileUpload
                label="Documento de identificação"
                accept=".pdf,.jpg,.jpeg,.png"
                helperText="Envie uma foto ou PDF do seu documento"
                fullWidth
              />
            </ComponentShowcase>
          </Card.Content>
          <Card.Footer>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Enviar Verificação</Button>
          </Card.Footer>
        </Card>
      </Section>
    </DemoContainer>
  );
};
