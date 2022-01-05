import { isEmpty } from 'lodash'
import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { IHookFormButtonProps } from './types'

const x = ['inputSend', 'inputRecieve']

const HookFormButton: FC<IHookFormButtonProps> = ({ form, onClick, label, disabled }) => {
  const { handleSubmit } = form

  console.log('renderhookformbutton disabled ', disabled)
  return (
    <Button disabled={disabled} onPress={handleSubmit(onClick)}>
      {label}
    </Button>
  )
}

export default React.memo(HookFormButton)
