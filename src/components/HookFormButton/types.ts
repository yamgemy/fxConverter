import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { IFormInputsValues } from '../../screens/Converter/types'

export interface IHookFormButtonProps {
  form: UseFormReturn<IFormInputsValues>
  onClick: () => void
  label: string
  disabled: boolean
}
