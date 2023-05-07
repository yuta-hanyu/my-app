import { Snackbar } from 'interface/Snackbar'
import { atom } from 'recoil'

export const snackbar = atom<Snackbar>({
  key: 'snackbar',
  default: {
    open: false,
    message: '',
    type: undefined,
  },
})
