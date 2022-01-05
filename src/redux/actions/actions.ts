import { createAction } from 'redux-actions'

import { GENERAL_TYPES as GT, FX_TYPES as FT } from './action-types'
import {
  IaCurrencyPicked,
  IaTransactionEntry,
  IrequestFxRatesPayload,
  IresponseFxRatesPayload,
} from './payload-type'

//usage example: setAppLoading(true)
export const actionSetAppLoading = createAction<boolean>(GT.SET_APP_LOADING)

export const actionLoadingFxRates = createAction<boolean>(FT.LOADING_FX_RATES)

export const actionRequestFxRates = createAction<IrequestFxRatesPayload>(
  FT.REQUEST_FX_RATES,
)

export const actionOnFxRatesRequested = createAction<IresponseFxRatesPayload>(
  FT.ONSUCCESS_FX_RATES,
)

//this action leads to reuesting fxRates inside requestFxDataSaga.ts
export const actionOnCurrenciesPicked = createAction<IaCurrencyPicked>(
  FT.ON_CURRENCIES_PICKED,
)

//this action simple sets picked currencies state into store
export const actionSetCurrenciesPicked = createAction<IaCurrencyPicked>(
  FT.SET_CURRENCIES_PICKED,
)

export const actionSubmitTransactionEntry = createAction<IaTransactionEntry>(
  FT.SUBMIT_TRANSACTION_ENTRY,
)
