import { Palette } from './Palette'

export interface Snackbar {
  open: boolean
  message: string
  type: Palette
}
