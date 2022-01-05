import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { IHookFormButtonProps } from './types'

const x = ['inputSend', 'inputRecieve']

const HookFormButton: FC<IHookFormButtonProps> = ({
  form,
  onClick,
  label,
  inputsFilled = false,
}) => {
  const {
    formState: { errors, isValid, isSubmitting }, //isSUbmitting doest work
    handleSubmit,
  } = form

  console.log('renderhookformbutton')

  return (
    <Button disabled={!inputsFilled} onPress={handleSubmit(onClick)}>
      {label}
    </Button>
  )
}

export default React.memo(HookFormButton)
