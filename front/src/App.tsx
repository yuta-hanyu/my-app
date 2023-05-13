import theme from './theme'
import React from 'react'
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Typography } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
function App() {
  return (
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
          <CssBaseline />
          <Typography />
        </BrowserRouter>
      </StyledThemeProvider>
    </MaterialThemeProvider>
  )
}

export default App
