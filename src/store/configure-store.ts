import { createStore, Reducer } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { rootSaga } from "../sagas"
import { middleware, sagaMiddleware } from "./middleware"
import { rootReducer, initialState } from "../reducers"

const persistConfig = {
  key: "test-task",
  storage: AsyncStorage,
}

export const configureStore = () => {
  const composeEnhancers = composeWithDevTools({})
  const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, initialState, composeEnhancers(middleware))
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
