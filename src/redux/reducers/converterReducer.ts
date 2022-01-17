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
      //this is a structure with the aim to 'normalize' data, in terms of Redux's principles
      //so that objects can be accessed by key directly instead of using array find /findIndex
      return {
        ...state,
        fxRatesData: {
          ...state.fxRatesData,
          [payload.baseCurrency]: payload.fxData,
        },
        baseCurrency: payload.baseCurrency,
      }
    },
    [FT.SET_CURRENCIES_PICKED]: (state, { payload }) => {
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
