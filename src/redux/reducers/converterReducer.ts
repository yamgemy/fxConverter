import { IFxState } from './stateTypeInterfaces'
import { handleActions } from 'redux-actions'
import { FX_TYPES as FT } from '../actions/action-types'

const initialState: IFxState = {
  isLoadingFx: false,
  fxRatesData: {},
  baseCurrency: 'USD', //for referrence in debugging only
  currenciesSelections: {
    inputSend: 'USD', //this is also the baseCurreny with which to request fxRates
    inputRecieve: 'JPY',
  },
}

export const converterReducer = handleActions<IFxState, any>(
  {
    [FT.LOADING_FX_RATES]: (state, { payload }) => {
      return {
        ...state,
        isLoadingFx: payload,
      }
    },
    [FT.ONSUCCESS_FX_RATES]: (state, { payload }) => {
      console.log('converterReducer1', payload)
      return {
        ...state,
        fxRatesData: payload.fxData,
        baseCurrency: payload.baseCurrency, //TODO: remove it as it duplicates state
      }
    },
    [FT.SET_CURRENCIES_PICKED]: (state, { payload }) => {
      console.log('converterReducer1' + FT.SET_CURRENCIES_PICKED, payload)
      return {
        ...state,
        currenciesSelections: {
          ...state.currenciesSelections,
          [payload.targetInput]: payload.targetCurrency,
        },
      }
    },
  },
  initialState,
)
