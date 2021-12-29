import React, { FC } from "react"
import { Text, View } from "react-native"

import { styles } from "./styles"
import { SampleComponentProps } from "./types"

export const SampleComponent: FC<SampleComponentProps> = ({ text, style }) => (
  <View style={[styles.root, style]}>
    <Text>{text}</Text>
  </View>
)
