import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { IFormInputsValues } from '../../screens/Converter/component'

export interface IHookFormButtonProps {
  form: UseFormReturn<IFormInputsValues>
  onClick: () => void
  label: string
  inputsFilled: boolean
}
