import theme from './theme'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Typography } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
        <CssBaseline />
        <Typography />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
