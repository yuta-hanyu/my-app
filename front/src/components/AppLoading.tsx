import { CircularProgress, Grid, Typography } from '@mui/material'

import React, { memo } from 'react'

const AppLoading = memo(() => {
  // NOTE 親から変更する場合は以下を使用し制御する
  // const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false)

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{ height: '100vh' }}
      >
        <Grid item mb={4}>
          <Typography
            variant="h4"
            component={'div'}
            sx={{ fontWeight: 'bold' }}
          >
            Loading...
          </Typography>
        </Grid>
        <Grid item>
          <CircularProgress color="warning" size="4rem" />
        </Grid>
      </Grid>
    </>
  )
})

export default AppLoading
