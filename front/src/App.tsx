import theme from 'theme'
import React from 'react'
import { SampleComponent } from 'components/SamppleComponent'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Typography } from '@mui/material'
import { Login } from 'pages/Login'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography />
      <SampleComponent />
      <Login />
    </ThemeProvider>
  )
}

export default App
