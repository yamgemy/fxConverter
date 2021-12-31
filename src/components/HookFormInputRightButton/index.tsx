import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { Controller } from "react-hook-form"
import { Button, TextInput } from "react-native-paper"

const HookFormInputRightButton: FC<any> = ({ name, form, onEdit }) => {
  const {
    register,
    control,
    clearErrors,
    formState: { errors, isValid },
    reset,
    setFocus,
    getValues,
  } = form
  const onTyping = () => {}
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
                onChange: onTyping,
              })}
              theme={{ roundness: 0 }}
              mode={"outlined"}
              style={style.input}
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
    flexDirection: "row",
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginVertical: 20,
  },
  inputContainer: {
    overflow: "hidden",
    borderRadius: 0,
  },
  input: {
    width: "80%",
    height: 50,
  },
  rightButton: {
    borderRadius: 0,
    width: "20%",
    height: "100%",
  },
})

export default HookFormInputRightButton
