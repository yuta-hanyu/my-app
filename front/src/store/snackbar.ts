import { RecoilAtomKeys } from 'interface/RecoilKeys'
import { Snackbar } from 'interface/Snackbar'
import { atom } from 'recoil'

export const snackbar = atom<Snackbar>({
  key: RecoilAtomKeys.SNACKBAR_STATE,
  default: {
    open: false,
    message: '',
    type: 'primary',
  },
})
