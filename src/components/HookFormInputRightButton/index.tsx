import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Controller } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import { HookFormInputRightButtonProps } from './types'

const HookFormInputRightButton: FC<HookFormInputRightButtonProps> = ({
  name,
  form,
  onEditing,
}) => {
  const {
    register,
    control,
    clearErrors,
    formState: { errors, isValid },
    reset,
    setFocus,
    getValues,
  } = form

  console.log('renderInput')
  return (
    <View style={style.container}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, ref, value },
          fieldState: { invalid, isTouched, isDirty, error },
          formState: { isValid, isSubmitSuccessful },
        }) => {
          return (
            <TextInput
              {...register(name, {
                onChange: onEditing,
              })}
              ref={ref}
              onChangeText={onChange}
              theme={{ roundness: 0 }}
              mode={'outlined'}
              style={style.input}
              keyboardType={'numeric'}
            />
          )
        }}
      />
      <Button mode='contained' style={style.rightButton}>
        cunt
      </Button>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 20,
  },
  inputContainer: {
    overflow: 'hidden',
    borderRadius: 0,
  },
  input: {
    width: '80%',
    height: 50,
  },
  rightButton: {
    borderRadius: 0,
    width: '20%',
    height: '100%',
  },
})

export default React.memo(HookFormInputRightButton, () => {
  return true
})
