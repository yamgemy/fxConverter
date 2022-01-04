import { takeLatest, call, put, take, putResolve, select, fork } from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { FX_TYPES as FT } from '../actions/action-types'
import {
  requestFxRates, //used by useQuery
  getRequestFxRatesPromise,
} from '../../services/endpoints/fxRates'
import { actionLoadingFxRates, actionOnFxRatesRequested } from '../actions/actions'
import { IaCurrencyPicked } from '../actions/payload-type'
import { INPUTSEND } from '../../screens/Converter/constants'

function* currenciesSelectionsWorker({ payload }: Action<IaCurrencyPicked>) {
  const { targetInput, targetCurrency } = payload
  // yield take(FT.SET_CURRENCIES_PICKED) //this breaks the flow. nothing calls afterwards
  if (targetInput === INPUTSEND) {
    yield call(requestFxRatesWorker, targetCurrency)
  }
}

//function* requestFxRatesWorker({ payload }: Action<IrequestFxRatesPayload>) {
function* requestFxRatesWorker(baseCurrency: string) {
  //instead of reading state, use the fresh arg instead
  // const { currenciesSelections } = yield select((state) => state.converterReducer)
  try {
    yield put(actionLoadingFxRates(true))
    const response = yield call(getRequestFxRatesPromise(baseCurrency))
    yield putResolve(actionOnFxRatesRequested(response.data.data))
    yield put(actionLoadingFxRates(false))
  } catch (e) {
    console.log('error at requestFxRatesWorker', e)
  }
}

export function* requestFxRatesWatcher() {
  yield takeLatest(FT.SET_CURRENCIES_PICKED, currenciesSelectionsWorker)
}
