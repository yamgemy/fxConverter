import { FieldName } from 'react-hook-form'
import { IFormInputsValues } from './types'
import Snackbar, { SnackBarOptions } from 'react-native-snackbar'

export const INPUTSEND: FieldName<IFormInputsValues> = 'inputSend'
export const INPUTRECIEVE: FieldName<IFormInputsValues> = 'inputRecieve'
export const SNACKBAROPTIONS: SnackBarOptions = {
  text: 'Transaction created',
  textColor: 'lime',
  duration: Snackbar.LENGTH_SHORT,
}
