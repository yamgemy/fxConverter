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
import { Action } from 'redux-actions'
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
import {
  fxDataEntry,
  IaCurrencyPicked,
  IrequestFxRatesPayload,
} from '../actions/payload-type'
import { INPUTSEND } from '../../screens/Converter/constants'
import { TIME_LAST_BASECURRENCY_EXPIRES } from '../../constants'

function* currenciesSelectionsWorker({ payload }: Action<IaCurrencyPicked>) {
  const { targetInput, targetCurrency } = payload
  //debounce didn't seem to work :(
  const { currenciesSelections } = yield select((state) => state.converterReducer)
  if (currenciesSelections[targetInput] !== targetCurrency) {
    yield put(actionSetCurrenciesPicked(payload))
  }
  if (targetInput === INPUTSEND) {
    yield call(
      requestFxRatesWorker,
      actionRequestFxRates({ baseCurrency: targetCurrency }),
    )
  }
}

function* requestFxRatesWorker({ payload }: Action<IrequestFxRatesPayload>) {
  const { baseCurrency } = payload
  const { fxRatesData } = yield select((state) => state.converterReducer)
  const existingFxDataOfBaseCurrency: fxDataEntry = fxRatesData[baseCurrency]
  if (existingFxDataOfBaseCurrency) {
    if (
      new Date().getTime() - existingFxDataOfBaseCurrency.time <
      TIME_LAST_BASECURRENCY_EXPIRES
    ) {
      return //prevents requesting API again if the same base currency was last requested in less than a minute
    }
  }
  try {
    yield put(actionLoadingFxRates(true))
    const response = yield call(getRequestFxRatesPromise(payload.baseCurrency))
    yield put(
      actionOnFxRatesRequested({
        fxData: { data: response.data.data, time: new Date().getTime() },
        baseCurrency: baseCurrency,
      }),
    )
    yield put(actionLoadingFxRates(false))
  } catch (e) {
    // console.log('error at requestFxRatesWorker', e)
  }
}

export function* currenciesSelectionWatcher() {
  yield takeLatest(FT.ON_CURRENCIES_PICKED, currenciesSelectionsWorker)
}

export function* requestFxRatesWatcher() {
  yield takeLatest(FT.REQUEST_FX_RATES, requestFxRatesWorker)
}
