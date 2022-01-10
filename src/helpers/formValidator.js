import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const inputSend = yup
  .number()
  .typeError('Amount must be a valid number')
  .positive('Amount must be a positive number')
  .required('Please enter the amount to send')
const inputRecieve = yup
  .number('Amount must be a valid number')
  .typeError('Amount must be a valid number')
  .positive('Amount must be a positive number')
  .required('Please enter the amount to receive')

export const converterSchema = yupResolver(
  yup.object().shape({
    inputSend,
    inputRecieve,
  }),
)

const inputBank = yup
  .string()
  .required("The recipent bank's name is required to send money.")
  .matches(/^[a-zA-Z0-9]+$/, {
    message: 'Bank name should only consist of A-Z, a-z and numbers',
    excludeEmptyString: true,
  })

export const bankNameSchema = yupResolver(
  yup.object().shape({
    inputBank,
  }),
)
