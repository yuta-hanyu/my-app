import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('pages/Login'))

export const PublicRouter = [
  {
    path: '/',
    element: <Login />,
  },
  { path: '*', element: <Navigate to="/" /> },
]
