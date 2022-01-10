import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ConverterScreen from '../screens/Converter/component'
import TransactionScreen from '../screens/Transaction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createBottomTabNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Converter'
          component={ConverterScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='calculator' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Transaction'
          component={TransactionScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='view-list' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
