import React from 'react'
import { FieldName, UseFormReturn } from 'react-hook-form'
import { IFormInputsValues } from '../../screens/Converter/component'

export interface HookFormInputRightButtonProps {
  name: FieldName<IFormInputsValues>
  form: UseFormReturn<IFormInputsValues>
  onEditing: (e: React.ChangeEvent<HTMLInputElement>) => void //void for now
}
