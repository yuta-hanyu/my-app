import { memo } from 'react'

import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from 'lib/firebase'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { signInUserState, useFetchAuthLogin } from 'store/auth'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Typography,
  styled,
  TypographyProps,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useNavigate } from 'react-router-dom'
import { User } from 'interface/User'
import { snackbar } from 'store/snackbar'
import { Snackbar } from 'interface/Snackbar'
import constant from 'const'
import { blueGrey } from '@mui/material/colors'
import AppSnackbar from 'components/AppSnackbar'

interface MuiTypographyProps extends TypographyProps {
  top: string
  left: string
  transform?: string
}

const Login = memo(() => {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState<User>(signInUserState)
  const { fetchAuthToken } = useFetchAuthLogin()
  const resetAuth = useResetRecoilState(signInUserState)
  const setSnackbar = useSetRecoilState(snackbar)

  const loginInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async (res) => {
        setAuth((state: User) => ({
          ...state,
          displayName: res.user.displayName as string,
          isLogin: true,
        }))

        await fetchAuthToken()

        setSnackbar((state: Snackbar) => ({
          ...state,
          open: true,
          message: 'ログインしました',
          type: 'success',
        }))

        navigate('/home')
      })
      .catch(() => {
        setSnackbar((state: Snackbar) => ({
          ...state,
          open: true,
          message: '認証に失敗しました',
          type: 'error',
        }))
        signOut(auth).then(() => resetAuth())
      })
  }

  const StyledMainTypography = styled(Typography)<MuiTypographyProps>(
    ({ top, left, transform }) => ({
      color: blueGrey[50],
      position: 'absolute',
      top,
      left,
      transform,
      width: '100%',
    })
    // NOTE TSエラー https://github.com/mui/material-ui/issues/30569
    // })) as typeof Typography
    /* eslint-disable-next-line */
  ) as any

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ height: '100vh' }}
    >
      <Card sx={{ width: '357px', height: '300px' }}>
        <Box
          component={'div'}
          sx={{
            position: 'relative',
          }}
        >
          <CardMedia
            sx={{ height: 200, width: '100%' }}
            component="video"
            image="video/login.mp4"
            muted
            autoPlay
            loop
          />
          <StyledMainTypography
            component="div"
            textAlign="center"
            variant="h4"
            top="40%"
            left="50%"
            transform="translateX(-50%) translateY(-40%)"
          >
            {constant.APP_TITLE_TEXT}
          </StyledMainTypography>
          <StyledMainTypography
            component="div"
            textAlign="center"
            variant="h6"
            top="63%"
            left="10%"
            transform="translateX(-10%) translateY(-50%)"
          >
            ようこそ
          </StyledMainTypography>
          <StyledMainTypography
            variant="body2"
            component="div"
            textAlign="center"
            top="100%"
            left="10%"
            transform="translateX(-10%) translateY(-100%)"
            p={2}
          >
            {constant.APP_TITLE_TEXT} を使用するには
            {constant.APP_TITLE_TEXT} にログインしてください
          </StyledMainTypography>
        </Box>
        <CardActions>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            mt={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={loginInWithGoogle}
            >
              <GoogleIcon />
              <Typography variant="subtitle2" textAlign="center" ml={1}>
                Googleでログイン
              </Typography>
            </Button>
            {/* TODO 使い方は追って作成（チュートリアル機能があれば直良 */}
            <Button size="small">Learn More</Button>
          </Grid>
        </CardActions>
      </Card>
      <AppSnackbar />
    </Grid>
  )
})

export default Login
