import { applyMiddleware, Middleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "../../sagas"

import { configureLogger } from "./logger"

export const sagaMiddleware = createSagaMiddleware()

const middlewareList: Middleware[] = [sagaMiddleware]

if (__DEV__) {
  // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  const loggerMiddleware = configureLogger()
  middlewareList.push(loggerMiddleware)
}

export const middleware = applyMiddleware(...middlewareList)

sagaMiddleware.run(rootSaga)
