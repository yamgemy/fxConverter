import React from 'react'
import { FieldName, UseFormReturn } from 'react-hook-form'
import { IFormInputsValues } from '../../screens/Converter/types'

export interface CurrencyInputWithButtonProps {
  name: FieldName<IFormInputsValues>
  form: UseFormReturn<IFormInputsValues>
  onEditing: (e: React.ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  currency: string
  currencyBtnPressed: () => void
  editable: boolean
}
