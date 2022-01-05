import React, { FC } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Controller } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import { CurrencyInputWithButtonProps } from './types'
import { isEmpty } from 'lodash'
//this component is resuable solely as part of a dual on converter screen
const CurrencyInputWithButton: FC<CurrencyInputWithButtonProps> = ({
  name,
  form,
  onEditing,
  isLoading,
  currency = 'USD', //as a fallback
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
              error={!isEmpty(error)}
              editable={editable}
            />
          )
        }}
      />

      <View style={style.right}>
        {isLoading ? (
          <ActivityIndicator animating={isLoading} size={'large'} color='#FFFFFF' />
        ) : (
          <Button mode='contained' style={style.button} onPress={currencyBtnPressed}>
            {currency}
          </Button>
        )}
      </View>
    </View>
  )
}

export default React.memo(CurrencyInputWithButton)

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
  right: {
    borderRadius: 0,
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    height: '100%',
    borderRadius: 0,
    justifyContent: 'center',
    marginBottom: -5,
  },
})
