import React, { useEffect } from 'react'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { signInUserState } from 'store/auth'
import { User } from 'interface/User'
import { snackbar } from 'store/snackbar'
import { Snackbar } from 'interface/Snackbar'

const BaseUrl = process.env.REACT_APP_API_URL as string

type Props = {
  children: React.ReactElement
}
// デフォルト config の設定
export const axiosClient = axios.create({
  baseURL: BaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// NOTE https://zenn.dev/longbridge/articles/761d980297a62c
export const AxiosClientProvider = ({ children }: Props) => {
  const { idToken } = useRecoilValue<User>(signInUserState)
  const setSnackbar = useSetRecoilState(snackbar)

  useEffect(() => {
    // リクエスト インターセプター
    const requestInterceptors = axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.headers !== undefined) {
          config.headers.Authorization = `Bearer ${idToken}`
        }
        return config
      }
    )

    // レスポンス インターセプター
    const responseInterceptor = axiosClient.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        setSnackbar((state: Snackbar) => ({
          ...state,
          open: true,
          message: 'エラーが発生しました',
          type: 'error',
        }))
        // switch (error.response?.status) {
        //   case 401:
        //     // なにかする
        //     break
        //   default:
        //     break
        // }
        return Promise.reject(error)
      }
    )

    // クリーンアップ
    return () => {
      axiosClient.interceptors.request.eject(requestInterceptors)
      axiosClient.interceptors.response.eject(responseInterceptor)
    }
  }, [idToken])

  return <>{children}</>
}
