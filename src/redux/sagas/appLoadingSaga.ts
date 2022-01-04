import { all, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { GENERAL_TYPES as GT } from '../actions/action-types'

function* setAppLoadingSagaWorker({ payload }: Action<boolean>) {
  try {
    yield console.log(payload, 'something useful to run')
  } catch (e) {
    console.log(e, 'e')
  }
}

export function* settingsSagasWatcher() {
  yield takeEvery(GT.SET_APP_LOADING, setAppLoadingSagaWorker)
}
