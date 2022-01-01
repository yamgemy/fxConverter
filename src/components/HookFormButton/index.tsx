import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const x = ['inputSend', 'inputRecieve']

const HookFormButton = ({ form, onClick, label, inputsFilled = false }) => {
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

export default React.memo(HookFormButton, (prev, next) => {
  return prev.inputsFilled === next.inputsFilled
})
