import ThemeProvider from './ThemeProvider'
import GlobalStyles from './GlobalStyles'
import KYCForm from './pages/KYCForm'
import { ToastProvider } from './components/ui'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <ToastProvider>
        <KYCForm />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
