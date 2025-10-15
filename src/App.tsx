import { useState } from 'react'
import styled from 'styled-components'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ThemeProvider from './ThemeProvider'
import GlobalStyles from './GlobalStyles'
import ThemeDemo from './components/ThemeDemo'

// Styled Components usando o tema
const AppContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LogoContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`

const Logo = styled.img`
  height: 6em;
  padding: ${({ theme }) => theme.spacing[6]};
  will-change: filter;
  transition: ${({ theme }) => theme.transitions.all};
  
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  
  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  background: linear-gradient(
    45deg, 
    ${({ theme }) => theme.colors.primary[600]}, 
    ${({ theme }) => theme.colors.secondary[600]}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Card = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.all};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary[700]};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  
  code {
    background: ${({ theme }) => theme.colors.neutral[100]};
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono.join(', ')};
    color: ${({ theme }) => theme.colors.primary[700]};
  }
`

const ReadTheDocs = styled.p`
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

function AppContent() {
  const [showDemo, setShowDemo] = useState(false)

  if (showDemo) {
    return <ThemeDemo />
  }

  return (
    <AppContainer>
      <LogoContainer>
        <a href="https://vite.dev" target="_blank">
          <Logo src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <Logo src={reactLogo} className="react" alt="React logo" />
        </a>
      </LogoContainer>
      
      <Title>KYC Verification App</Title>
      
      <Card>
        <Button onClick={() => setShowDemo(true)}>
          Ver Demonstração do Tema
        </Button>
        <Description>
          Clique no botão acima para ver todos os design tokens implementados
        </Description>
      </Card>
      
      <ReadTheDocs>
        Sistema de tema implementado com styled-components
      </ReadTheDocs>
    </AppContainer>
  )
}

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AppContent />
    </ThemeProvider>
  )
}

export default App
