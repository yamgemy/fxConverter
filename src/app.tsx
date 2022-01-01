import React from 'react'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { getConfiguredStore } from './redux/store'
import { RNPaperTheme } from './constants'
import BottomTabNavigator from './navigators/BottomTabNavigator'

const queryClient = new QueryClient()
export const { store, persistor } = getConfiguredStore()

export default () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PaperProvider theme={RNPaperTheme}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomTabNavigator />
        </PersistGate>
      </PaperProvider>
    </Provider>
  </QueryClientProvider>
)
