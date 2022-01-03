import { all, takeEvery } from 'redux-saga/effects'
import { Action } from 'redux-actions'

import { GENERAL_TYPES as GT } from '../actions/action-types'
function* setAppLoadingSaga({ payload }: Action<boolean>) {
  try {
    // eslint-disable-next-line no-console
    yield console.log(payload, 'something useful to run')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e, 'e')
  }
}

export function* settingsSagas() {
  yield all([takeEvery(GT.SET_APP_LOADING, setAppLoadingSaga)])
}
