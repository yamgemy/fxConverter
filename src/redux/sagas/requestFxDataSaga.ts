import {
  takeLatest,
  call,
  put,
  take,
  putResolve,
  select,
  fork,
  takeEvery,
} from 'redux-saga/effects'
import { Action, createAction } from 'redux-actions'
import { FX_TYPES as FT } from '../actions/action-types'
import {
  requestFxRates, //used by useQuery
  getRequestFxRatesPromise,
} from '../../services/endpoints/fxRates'
import {
  actionLoadingFxRates,
  actionOnFxRatesRequested,
  actionRequestFxRates,
  actionSetCurrenciesPicked,
} from '../actions/actions'
import { IaCurrencyPicked, IrequestFxRatesPayload } from '../actions/payload-type'
import { INPUTSEND } from '../../screens/Converter/constants'

function* currenciesSelectionsWorker({ payload }: Action<IaCurrencyPicked>) {
  const { targetInput, targetCurrency } = payload
  console.log(payload)
  yield put(actionSetCurrenciesPicked(payload))
  const { isLoadingFx } = yield select((state) => state.converterReducer) // noeffect .-.
  if (targetInput === INPUTSEND && !isLoadingFx) {
    yield call(
      requestFxRatesWorker,
      actionRequestFxRates({ baseCurrency: targetCurrency }),
    )
  }
}

function* requestFxRatesWorker({ payload }: Action<IrequestFxRatesPayload>) {
  const { baseCurrency } = payload
  try {
    yield put(actionLoadingFxRates(true))
    const response = yield call(getRequestFxRatesPromise(payload.baseCurrency))
    yield put(
      actionOnFxRatesRequested({
        fxData: response.data.data,
        baseCurrency: baseCurrency,
      }),
    )
    yield put(actionLoadingFxRates(false))
  } catch (e) {
    console.log('error at requestFxRatesWorker', e)
  }
}

export function* currenciesSelectionWatcher() {
  yield takeLatest(FT.ON_CURRENCIES_PICKED, currenciesSelectionsWorker)
}

export function* requestFxRatesWatcher() {
  yield takeLatest(FT.REQUEST_FX_RATES, requestFxRatesWorker)
}
