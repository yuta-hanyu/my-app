import {
  Snackbar,
  SnackbarContent,
  SnackbarContentProps,
  styled,
} from '@mui/material'
import { Palette } from 'interface/Palette'
import { Snackbar as SnackbarType } from 'interface/Snackbar'
import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { snackbar } from 'store/snackbar'

interface MuiSnackbarContentProps extends SnackbarContentProps {
  type: Palette
}

const AppSnackbar = () => {
  const snackbarState = useRecoilValue<SnackbarType>(snackbar)
  const resetSnackbar = useResetRecoilState(snackbar)

  const StyledSnackbarContent = styled(
    SnackbarContent
  )<MuiSnackbarContentProps>(({ theme, type }) => ({
    backgroundColor: theme.palette[type].main,
    /* eslint-disable-next-line */
  })) as any
  // NOTE TSエラー https://github.com/mui/material-ui/issues/30569
  // })) as typeof SnackbarContent

  return (
    <>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={() => resetSnackbar()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <StyledSnackbarContent
          type={snackbarState.type}
          message={<span>{snackbarState.message}</span>}
        />
      </Snackbar>
    </>
  )
}

export default AppSnackbar
