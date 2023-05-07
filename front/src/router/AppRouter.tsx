import React, { useLayoutEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { PublicRouter } from './PublicRouter'
import { useRoutes } from 'react-router-dom'
import { ProtectedRouter } from './ProtectedRouter'
import { onAuthStateChanged } from 'firebase/auth'
import AppLoading from '../components/AppLoading'
import { signInUserState } from 'store/auth'
import { auth } from 'utils/firebase'

export const AppRouter = () => {
  const [authState] = useRecoilState(signInUserState)
  const setAuth = useSetRecoilState(signInUserState)
  const [isAuthCheck, setIsAuthCheck] = useState<boolean>(false)

  const commonRoutes = [{ path: '*', element: <AppLoading /> }]

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth((state) => ({
          ...state,
          displayName: user.displayName as string,
          isLogin: true,
        }))
      }
      setIsAuthCheck(true)
    })
  }, [])

  if (!isAuthCheck && !authState.isLogin) {
    return <>{useRoutes([...commonRoutes])}</>
  }

  const routes = authState.isLogin ? ProtectedRouter : PublicRouter

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
