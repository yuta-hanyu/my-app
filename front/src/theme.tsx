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
    fontFamily: ['monospace', 'cursive', 'fantasy', 'M PLUS Rounded 1c'].join(','),
    fontSize: 12,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    // NOTE https://github.com/mui/material-ui/issues/25759
    MuiCssBaseline: {
      styleOverrides: {
        '.MuiBox-root': {
          marginBottom: '0px !important',
        },
      },
    },
  },
})

export default theme
