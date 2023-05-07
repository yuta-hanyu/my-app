import { Button, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, { Suspense } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { signInUserState } from 'store/auth'
import { auth } from 'utils/firebase'

const MainLayout = () => {
  const resetAuth = useResetRecoilState(signInUserState)

  const logout = () => {
    signOut(auth).then(() => {
      resetAuth()
    })
  }

  return (
    <div>
      <Typography variant="h2">サンプルアプリ</Typography>
      <Button variant="contained" color="primary" onClick={logout}>
        Googleでアウト
      </Button>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/home/setting">setting</Link>
        </li>
        <li>
          <Link to="/home/userManagement">setting</Link>
        </li>
      </ul>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default MainLayout
