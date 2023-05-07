import { memo, FC } from 'react'

import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from 'utils/firebase'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { signInUserState } from 'store/auth'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { User } from 'interface/User'

const Login: FC = memo(() => {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(signInUserState)
  const [authState] = useRecoilState(signInUserState)

  const loginInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setAuth((state: User) => ({
          ...state,
          displayName: result.user.displayName as string,
          isLogin: true,
        }))
        navigate('/home')
      })
      .catch(() => alert('サインイン認証に失敗しました。'))
  }

  return (
    <div className="loginPage">
      <Button variant="contained" color="primary" onClick={loginInWithGoogle}>
        Googleでログイン
      </Button>
      {authState.displayName}
      {authState.isLogin || 'Logut中'}
    </div>
  )
})

export default Login
