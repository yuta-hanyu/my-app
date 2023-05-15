import theme from './theme'
import React from 'react'
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Typography } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { AxiosClientProvider } from 'hooks/AxiosClientProvider'
function App() {
  return (
    <MaterialThemeProvider theme={theme}>
      <BrowserRouter>
        <AxiosClientProvider>
          <>
            <AppRouter />
            <CssBaseline />
            <Typography />
          </>
        </AxiosClientProvider>
      </BrowserRouter>
    </MaterialThemeProvider>
  )
}

export default App
