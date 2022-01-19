import { takeLatest, call, put } from 'redux-saga/effects'
import { CURRENCYNAMES_TYPES as CT } from '../actions/action-types'
import { getRequestCurrenciesNamesPromise } from '../../services/endpoints/fxRates'
import { actionSetCurrenciesNames } from '../actions/actions'

export function* requestCurrenciesNamesWorker() {
  const response = yield call(getRequestCurrenciesNamesPromise())
  yield put(actionSetCurrenciesNames({ currenciesNames: response.data }))
}

export function* requestCurrenciesNamesWatcher() {
  yield takeLatest(CT.REQUEST_CURRENCIES_NAMES, requestCurrenciesNamesWorker)
}
