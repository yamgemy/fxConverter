import { all, takeEvery } from "redux-saga/effects"
import { Action } from "redux-actions"

import * as types from "../actions"

function* setAppLoadingSaga({ payload }: Action<boolean>) {
  try {
    // eslint-disable-next-line no-console
    yield console.log(payload, "something useful to run")
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e, "e")
  }
}

export function* settingsSagas() {
  yield all([takeEvery(types.SET_APP_LOADING, setAppLoadingSaga)])
}
