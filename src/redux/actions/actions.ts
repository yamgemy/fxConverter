import { createAction } from 'redux-actions'

import { GENERAL_TYPES as GT, FX_TYPES as FT } from './action-types'
import { IrequestFxRatesPayload } from './payload-type'

export const actionSetAppLoading = createAction<boolean>(GT.SET_APP_LOADING) //boolean indicates you pass in a boolean type arg

//usage: setAppLoading(true)

export const actionLoadingFxRates = createAction<boolean>(FT.LOADING_FX_RATES)

export const actionRequestFxRates = createAction<IrequestFxRatesPayload>(
  FT.REQUEST_FX_RATES,
)

export const actionOnFxRatesRequested = createAction<object>(FT.ONSUCCESS_FX_RATES)

export const actionSetBaseCurrency = createAction<string>(FT.SET_BASE_CURRENCY)

export const actionSetCurrenciesPicked = createAction<object>(FT.SET_CURRENCIES_PICKED)
