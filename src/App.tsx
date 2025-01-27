import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyled } from './styles/global'
import { DocumentsPage } from './pages/Documents'
import { DocumentsContextProvider } from './contexts/DocumentsContext'

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyled />
      <DocumentsContextProvider>
        <DocumentsPage />
      </DocumentsContextProvider>
    </ThemeProvider>
  )
}

export default App
