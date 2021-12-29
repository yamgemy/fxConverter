import React, { FC, useCallback } from "react"
import { Alert, Text, View } from "react-native"
import { Button } from "react-native-paper"

import { styles } from "./styles"

import { InitialSampleScreenProps } from "./types"

export const InitialSampleScreen: FC<InitialSampleScreenProps> = () => {
  const handlePress = useCallback(() => {
    Alert.alert("Thanks")
  }, [])

  const something = (): void => {
    return
  }

  return (
    <View style={styles.root}>
      <Text>Initial</Text>
      <Button onPress={handlePress}>Press me</Button>
    </View>
  )
}
