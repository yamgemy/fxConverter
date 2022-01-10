export const INPUTBANK = 'inputBank'
import Snackbar, { SnackBarOptions } from 'react-native-snackbar'

export const labels = {
  notDone: ['To send: ', 'To receive: '],
  done: ['Sent: ', 'Received: '],
  created: 'Date: ',
  bank: ['Recipient bank: ', 'Enter name of recipent bank: '],
}

export const SNACKBAROPTIONS_SENT: SnackBarOptions = {
  text: 'Money Sent',
  textColor: 'lime',
  duration: Snackbar.LENGTH_SHORT,
}

export const SNACKBAROPTIONS_DELETE: SnackBarOptions = {
  text: 'Transaction deleted',
  textColor: 'red',
  duration: Snackbar.LENGTH_SHORT,
}
