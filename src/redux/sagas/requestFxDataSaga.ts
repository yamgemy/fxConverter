import {
  all,
  takeEvery,
  takeLatest,
  call,
  put,
  take,
  putResolve,
} from 'redux-saga/effects'
import { Action } from 'redux-actions'
import { FX_TYPES as FT } from '../actions/action-types'
import {
  requestFxRates, //used by useQuery
  getRequestFxRatesPromise,
} from '../../services/endpoints/fxRates'
import { actionLoadingFxRates, actionOnFxRatesRequested } from '../actions/actions'
import { IrequestFxRatesPayload } from '../actions/payload-type'

function* requestFxRatesWorker({ payload }: Action<IrequestFxRatesPayload>) {
  //TODO add type
  console.log('at requestFxworker', payload)
  const { baseCurrency } = payload
  try {
    yield put(actionLoadingFxRates(true))
    const response = yield call(getRequestFxRatesPromise(baseCurrency))
    console.log('at requestFxRatesWorker ', response)
    yield putResolve(actionOnFxRatesRequested(response.data.data))
    yield put(actionLoadingFxRates(false))
  } catch (e) {
    console.log(e, 'e')
  }
}

export function* requestFxRatesWatcher() {
  yield takeLatest(FT.REQUEST_FX_RATES, requestFxRatesWorker)
}
