import ThemeProvider from './ThemeProvider'
import GlobalStyles from './GlobalStyles'
import KYCForm from './pages/KYCForm'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <KYCForm />
    </ThemeProvider>
  )
}

export default App
