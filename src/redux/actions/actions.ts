import { createAction } from 'redux-actions'

import {
  GENERAL_TYPES as GT,
  FX_TYPES as FT,
  CURRENCYNAMES_TYPES as CT,
  TRANSACTION_TYPES as TT,
} from './action-types'
import {
  fxDataEntry,
  IaCurrencyPicked,
  IaTransactionEntry,
  IdontTransactionPayload,
  IremoveTransactionPayload,
  IrequestFxRatesPayload,
  IresponseCurrenciesNamesPayload,
  IresponseFxRatesPayload,
} from './payload-type'

//usage example: setAppLoading(true)
export const actionSetAppLoading = createAction<boolean>(GT.SET_APP_LOADING)

export const actionLoadingFxRates = createAction<boolean>(FT.LOADING_FX_RATES)

export const actionRequestFxRates = createAction<IrequestFxRatesPayload>(
  FT.REQUEST_FX_RATES,
)

export const actionOnFxRatesRequested = createAction<
  IresponseFxRatesPayload<fxDataEntry>
>(FT.ONSUCCESS_FX_RATES)

//this action leads to reuesting fxRates inside requestFxDataSaga.ts
export const actionOnCurrenciesPicked = createAction<IaCurrencyPicked>(
  FT.ON_CURRENCIES_PICKED,
)

//this action simple sets picked currencies state into store
export const actionSetCurrenciesPicked = createAction<IaCurrencyPicked>(
  FT.SET_CURRENCIES_PICKED,
)

export const actionSubmitTransactionEntry = createAction<IaTransactionEntry>(
  TT.SUBMIT_TRANSACTION_ENTRY,
)

export const actionRequestCurrenciesNames = createAction(CT.REQUEST_CURRENCIES_NAMES)

export const actionSetCurrenciesNames = createAction<IresponseCurrenciesNamesPayload>(
  CT.SET_CURRENCIES_NAMES,
)

//not currently through saga
export const actionRemoveTransactionEntry = createAction<IremoveTransactionPayload>(
  TT.REMOVE_TRANSACTION_ENTRY,
)

//not currently through saga
export const actionSetBankTransactionEntry = createAction<IdontTransactionPayload>(
  TT.DONE_TRANSACTION_ENTRY,
)
