import { createAction } from 'redux-actions'

import { GENERAL_TYPES as GT, FX_TYPES as FT } from './action-types'
import { IaCurrencyPicked, IrequestFxRatesPayload } from './payload-type'

//usage example: setAppLoading(true)
export const actionSetAppLoading = createAction<boolean>(GT.SET_APP_LOADING)

export const actionLoadingFxRates = createAction<boolean>(FT.LOADING_FX_RATES)

//not in use
export const actionRequestFxRates = createAction<IrequestFxRatesPayload>(
  FT.REQUEST_FX_RATES,
)

export const actionOnFxRatesRequested = createAction<object>(FT.ONSUCCESS_FX_RATES)

//this actions leads to reuesting fxRates inside requestFxDataSaga.ts
export const actionSetCurrenciesPicked = createAction<IaCurrencyPicked>(
  FT.SET_CURRENCIES_PICKED,
)
