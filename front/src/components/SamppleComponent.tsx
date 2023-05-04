import { Stack, Button } from '@mui/material'
import React from 'react'

export function SampleComponent() {
  return (
    <Stack direction="row" spacing={2} sx={{ m: 2, p: 2 }}>
      <h1>secondary</h1>
      <Button variant="contained" color="primary">
        プライマリー
      </Button>
      <Button variant="contained" color="secondary">
        secondary
      </Button>
      <Button variant="contained" color="warning">
        warning
      </Button>
      <Button variant="contained" color="info">
        info
      </Button>
      <Button variant="contained" color="success">
        success
      </Button>
      ああああ
    </Stack>
  )
}
