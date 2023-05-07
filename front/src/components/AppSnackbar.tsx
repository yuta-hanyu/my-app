import { Snackbar, SnackbarContent } from '@mui/material'
import { Snackbar as SnackbarType } from 'interface/Snackbar'
import React from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { snackbar } from 'store/snackbar'
import styled from 'styled-components'

const AppSnackbar = () => {
  const [snackbarState] = useRecoilState<SnackbarType>(snackbar)
  const resetSnackbar = useResetRecoilState(snackbar)

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
          background={`${snackbarState.type}`}
          message={<span>{snackbarState.message}</span>}
        />
      </Snackbar>
    </>
  )
}

const StyledSnackbarContent = styled(SnackbarContent)<{ background: string }>`
  ${(props) => `background: ${props.background}`};
`

export default AppSnackbar
