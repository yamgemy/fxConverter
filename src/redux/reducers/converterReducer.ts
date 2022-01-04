import { IFxState } from './stateTypeInterfaces'
import { handleActions } from 'redux-actions'
import { FX_TYPES as FT } from '../actions/action-types'

const initialState: IFxState = {
  isLoadingFx: false,
  fxRatesData: {},
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
        fxRatesData: payload,
      }
    },
    [FT.SET_CURRENCIES_PICKED]: (state, { payload }) => {
      console.log(FT.SET_CURRENCIES_PICKED, payload)
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
