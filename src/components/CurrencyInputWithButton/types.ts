import React from 'react'
import { FieldName, UseFormReturn } from 'react-hook-form'
import { IFormInputsValues } from '../../screens/Converter/component'

export interface CurrencyInputWithButtonProps {
  name: FieldName<IFormInputsValues>
  partnerField: FieldName<IFormInputsValues>
  form: UseFormReturn<IFormInputsValues>
  onEditing: (e: React.ChangeEvent<HTMLInputElement>) => void //void for now
  errors: object
  isLoading: boolean
  currency: string
  currencyBtnPressed: () => void
  editable: boolean
}
