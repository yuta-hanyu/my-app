import { AxiosResponse } from 'axios'
import { getAuth, getIdToken } from 'firebase/auth'
import { axiosClient } from 'hooks/AxiosClientProvider'
import { RecoilAtomKeys } from 'interface/RecoilKeys'
import { User } from 'interface/User'
import { atom, useRecoilCallback, useSetRecoilState } from 'recoil'
import { snackbar } from './snackbar'
import { Snackbar } from 'interface/Snackbar'
import { recoilPersist } from 'recoil-persist'
import constant from 'const'

// NOTE https://qiita.com/dende-h/items/16d8d65d52361000cef7
const { persistAtom } = recoilPersist({
  key: constant.APP_TITLE_TEXT,
  storage: localStorage,
})

export const signInUserState = atom<User>({
  key: RecoilAtomKeys.AUTH_STATE,
  default: {
    displayName: '',
    isLogin: false,
    avatarImageUrl: '/images/avatar_man_normal.png',
    idToken: '',
  },
  effects_UNSTABLE: [persistAtom],
})

type AuthToken = Pick<User, 'idToken'>

export const useFetchAuthLogin = () => {
  const setAuth = useSetRecoilState<User>(signInUserState)
  const setSnackbar = useSetRecoilState<Snackbar>(snackbar)

  // NOTE ソーシャルログイン
  // https://qiita.com/maguro_tuna/items/4b3ecd7502e218f103ca
  const fetchAuthToken = useRecoilCallback(
    () => async () => {
      const user = getAuth().currentUser

      if (!user) throw new Error('fetchAuthToken failed')

      const idToken = await getIdToken(user, true)

      axiosClient
        .post(`login`, {
          idToken,
        })
        .then(({ data: { idToken } }: AxiosResponse<AuthToken>) => {
          setAuth((prevState) => ({ ...prevState, idToken }))
        })
        .catch(() => {
          setSnackbar((state: Snackbar) => ({
            ...state,
            open: true,
            message: '認証に失敗しました',
            type: 'error',
          }))
        })
    },
    []
  )

  return { fetchAuthToken }
}
