import React, { useEffect } from 'react'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { useRecoilValue } from 'recoil'
import { signInUserState } from 'store/auth'
import { User } from 'interface/User'

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
