import { fork } from 'redux-saga/effects'

import { settingsSagas } from './app.saga'

export const rootSaga = function* root() {
  yield fork(settingsSagas)
}
