import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const sendInput = yup.number().required('Please enter the amount to send')

export const converterSchema = yupResolver(
  yup.object().shape({
    sendInput,
  }),
)
