import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    background: {
      default: '#c4d2c8',
    },
    secondary: {
      main: '#887e7c',
      light: '#938987',
      dark: '#0c0b0b',
      // contrastText: '#f2e4e4',
    },
    text: { primary: '#5e5454' },
  },
  typography: {
    fontFamily: [
      // 'Roboto',
      // '"Noto Sans JP"',
      // '"Helvetica"',
      // 'Arial',
      'monospace',
      'cursive',
      'fantasy',
      'sans-serif',
    ].join(','),
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
})

export default theme
