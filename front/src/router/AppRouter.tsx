import React, { useLayoutEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { PublicRouter } from './PublicRouter'
import { useRoutes } from 'react-router-dom'
import { ProtectedRouter } from './ProtectedRouter'
import { onAuthStateChanged } from 'firebase/auth'
import AppLoading from '../components/AppLoading'
import { signInUserState } from 'store/auth'
import { auth } from 'lib/firebase'

export const AppRouter = () => {
  const [authState, setAuth] = useRecoilState(signInUserState)
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
