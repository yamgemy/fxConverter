import React, { FC } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Controller } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import { CurrencyInputWithButtonProps } from './types'
//import { isEmpty } from 'lodash'
//this component is resuable solely as part of a dual on converter screen
const CurrencyInputWithButton: FC<CurrencyInputWithButtonProps> = ({
  name,
  form,
  onEditing,
  errors,
  isLoading,
  currency = 'USD',
  currencyBtnPressed,
  editable,
}) => {
  const {
    register,
    control,
    // clearErrors,
    // formState: { errors, isValid },
    // reset,
    // setFocus,
    getValues,
  } = form

  //  console.log('renderInput', errors[name] ? true : false)
  console.log('renderInput', isLoading)

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
              value={getValues(name)} //TODO: remove extra dots and symbols
              theme={{ roundness: 0 }}
              mode={'outlined'}
              style={style.input}
              keyboardType={'numeric'}
              error={errors[name]}
              editable={editable}
            />
          )
        }}
      />
      <Button mode='contained' style={style.rightButton} onPress={currencyBtnPressed}>
        {isLoading ? (
          <ActivityIndicator animating={isLoading} size={'small'} color={'#FFF'} />
        ) : (
          currency
        )}
      </Button>
    </View>
  )
}

export default React.memo(CurrencyInputWithButton, (prev, next) => {
  if (
    prev.errors !== next.errors ||
    prev.isLoading !== next.isLoading ||
    prev.currency !== next.currency ||
    prev.editable !== next.editable
  ) {
    return false
  }
  return true
})

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
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
