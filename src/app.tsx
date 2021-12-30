import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import { Provider as PaperProvider } from "react-native-paper"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { getConfiguredStore } from "./redux/store"
import { RNPaperTheme } from "./constants"
import { SampleStackNavigator } from "./navigators"

const queryClient = new QueryClient()
export const { store, persistor } = getConfiguredStore()

export const App = () => (
  <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PaperProvider theme={RNPaperTheme}>
          <PersistGate loading={null} persistor={persistor}>
            <SampleStackNavigator />
          </PersistGate>
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  </NavigationContainer>
)
