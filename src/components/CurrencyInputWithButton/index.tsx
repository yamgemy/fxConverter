import React, { FC } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Button, TextInput, Text } from 'react-native-paper'
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
    formState: { errors },
    // reset,
    // setFocus,
    getValues,
  } = form

  return (
    <View style={style.outterContainer}>
      <View style={style.inputBtnContainer}>
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, ref, value },
            fieldState: { invalid, isTouched, isDirty, error },
            formState: { isValid, isSubmitSuccessful },
          }) => {
            return (
              <>
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
              </>
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
      <View style={style.errorContainer}>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <Text style={style.errorText}>{message}</Text>}
        />
      </View>
    </View>
  )
}

export default React.memo(CurrencyInputWithButton)

const style = StyleSheet.create({
  outterContainer: { marginHorizontal: '10%' },
  inputBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
  },
  inputContainer: {
    overflow: 'hidden',
    borderRadius: 0,
  },
  input: {
    width: '78%',
    height: 50,
  },
  right: {
    borderRadius: 0,
    width: '22%',
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
  errorContainer: {
    paddingTop: 5,
    height: 20,
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
  },
})
