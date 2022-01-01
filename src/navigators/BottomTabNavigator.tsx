import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ConverterScreen from '../screens/Converter/component'
import TransactionScreen from '../screens/Transaction'
const Tab = createBottomTabNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Converter"
          component={ConverterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
