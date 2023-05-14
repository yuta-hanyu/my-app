import { User } from 'interface/User'
import { atom } from 'recoil'

export const signInUserState = atom<User>({
  key: 'auth',
  default: {
    displayName: '',
    isLogin: false,
    avatarImageUrl: '/images/avatar_man_normal.png',
  },
})
