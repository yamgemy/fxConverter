import { createStore, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { rootSagasWatcher } from '../sagas'
import { middleware, sagaMiddleware } from './middleware'
import { rootReducer } from '../reducers'

const persistConfig = {
  key: 'fxConverterPersistConfig',
  storage: AsyncStorage,
  blacklist: ['converterReducer', 'transactionsReducer'], //blaklist while in development
}

//renamed from configureStore
export const getConfiguredStore = () => {
  //const composeEnhancers = composeWithDevTools({}) //redundant
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  //instead of preloadedState, use persist rehydrates from previously persisted state, that's like a preloadedState
  const store = createStore(persistedReducer, composeWithDevTools(middleware))
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSagasWatcher)
  return { store, persistor }
}
