import React, { FC, useCallback } from "react"
import { Alert, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { useForm } from "react-hook-form"
import { styles } from "./styles"

import { InitialSampleScreenProps } from "./types"
import HookFormInputRightButton from "../../components/HookFormInputRightButton"

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const handlePress = useCallback(() => {
    if (navigation) {
      console.log("yes")
    }
    if (route) {
      console.log(route)
    }
  }, [navigation, route])

  const form = useForm({})

  console.log("render")

  return (
    <View style={styles.root}>
      <HookFormInputRightButton name={"inputSend"} form={form} />
      <Button mode='contained' onPress={handlePress}>
        Press me
      </Button>
    </View>
  )
}

export default ConverterScreen
