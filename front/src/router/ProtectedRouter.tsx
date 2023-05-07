import React, { lazy } from 'react'
import MainLayout from 'layout/MainLayout'

const Home = lazy(() => import('pages/Home'))
const Setting = lazy(() => import('pages/Setting'))
const NotFound = lazy(() => import('pages/NotFound'))
const UserManagement = lazy(() => import('pages/UserManagement'))

const App = () => {
  return <MainLayout />
}

export const ProtectedRouter = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/home', index: true, element: <Home /> },
      { path: '/home/setting', element: <Setting /> },
      { path: '/home/userManagement', element: <UserManagement /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
