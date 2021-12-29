import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { InitialSampleScreen } from "../screens"

const Stack = createNativeStackNavigator()

export const SampleStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Initial' component={InitialSampleScreen} />
  </Stack.Navigator>
)
