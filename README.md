# KYC Verification App

Formulário multi-etapas (KYC) com React, TypeScript e styled-components. Inclui validação com Zod, upload de arquivos, toasts de feedback, Stepper e Dark Mode.

- Demo: https://your-demo-url.example.com

## Decisões técnicas
- Vite + React: desenvolvimento rápido, HMR e build eficiente.
- React Hook Form + Zod: validação robusta e tipada end-to-end (schema-first).
- styled-components: isolamento de estilos e design tokens centralizados (tema).
- Arquitetura por features: componentes de UI reutilizáveis e passos do KYC desacoplados.
- Vitest (opcional): preparado para testes unitários com RTL.

## Bibliotecas
- react, react-dom: base do app.
- react-hook-form, @hookform/resolvers: formulários performáticos integrados ao Zod.
- zod: schema e validação tipada.
- styled-components: sistema de temas e componentes estilizados.
- vite: bundler e servidor de dev.
- storybook (opcional): documentação visual de UI e testes visuais.

## Como rodar
1. Instale dependências
   - npm: npm install
   - pnpm: pnpm install
   - yarn: yarn
2. Ambiente de desenvolvimento
   - npm run dev
3. Build de produção
   - npm run build
4. Preview do build
   - npm run preview
5. Storybook (opcional)
   - npm run storybook

## Dark Mode
- Toggle no topo da página (ThemeToggle) alterna entre temas claro/escuro.
- O tema escuro reaproveita os tokens invertendo a escala neutral, preservando contrastes.
- Preferência é persistida em localStorage e respeita prefers-color-scheme.

## Estrutura
- src/components/ui: Biblioteca de UI (Button, Card, Input, Select, Stepper, Toast, Typography, ThemeToggle).
- src/components/kyc: Passos do formulário (dados pessoais, endereço, documento, selfie, revisão).
- src/hooks: Hooks (useMultiStepForm, validação, upload, tema).
- src/theme.ts: design tokens.
- src/ThemeProvider.tsx: provider de tema com modo claro/escuro.

## Testes (Nice to have)
- Setup com Vitest + @testing-library/react (exemplo incluído em tests/).
- Alvo sugerido: useMultiStepForm e validações do formulário.
- Rodar: npm run test (se adicionado ao package.json).

## Tempo gasto
- Implementação principal: ~6-8h
- Polimento e dark mode: ~1h
- Documentação e ajustes: ~30min

## Desafios
- Tipagens do zod/resolvers com react-hook-form em versões recentes (resolvido com casting controlado em pontos específicos).
- Upload de arquivos com validação de tamanho e tipo mantido simples e confiável.
- Acessibilidade básica (aria- atributos) nos componentes.

## Melhorias futuras
- Testes unitários e e2e mais completos.
- Máscaras e autoformatação (CEP/CPF/telefone) com libs de mask.
- Persistência de progresso (localStorage) e retomada.
- Integração real com API e telas de status.
- Internacionalização (i18n).
