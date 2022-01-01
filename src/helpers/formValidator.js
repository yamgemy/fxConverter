import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const inputSend = yup.number().required('Please enter the amount to send')
const inputRecieve = yup.number().required('Please enter the amount to receive')

export const converterSchema = yupResolver(
  yup.object().shape({
    inputSend,
    inputRecieve,
  }),
)
