import { Alert, Stack } from '@mui/material'
import React from 'react'

type Props = {
  children: React.ReactNode
  severity: 'error' | 'warning' | 'info' | 'success'
}

const AppAlert = ({ children, severity }: Props) => {
  return (
    <>
      <Stack sx={{ width: '40%' }} spacing={2}>
        <Alert variant="outlined" severity={severity}>
          {children}
        </Alert>
      </Stack>
    </>
  )
}

export default AppAlert
