import { ICurrenciesNamesState } from './stateTypeInterfaces'
import { handleActions } from 'redux-actions'
import { CURRENCYNAMES_TYPES as CT } from '../actions/action-types'

const initialState: ICurrenciesNamesState = {
  currenciesNames: {},
}

export const currenciesNamesReducer = handleActions<ICurrenciesNamesState, any>(
  {
    [CT.SET_CURRENCIES_NAMES]: (state, { payload }) => {
      return {
        ...state,
        currenciesNames: payload.currenciesNames,
      }
    },
  },
  initialState,
)
