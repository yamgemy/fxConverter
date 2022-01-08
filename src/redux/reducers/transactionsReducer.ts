import { ITransactionsState } from './stateTypeInterfaces'
import { handleActions } from 'redux-actions'
import { TRANSACTION_TYPES as TT } from '../actions/action-types'

const initialState: ITransactionsState = {
  transactions: {},
}

export const transactionsReducer = handleActions<ITransactionsState, any>(
  {
    [TT.SUBMIT_TRANSACTION_ENTRY]: (state, { payload }) => {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [payload.time.toString()]: payload,
        },
      }
    },
    [TT.REMOVE_TRANSACTION_ENTRY]: (state, { payload }) => {
      const { timeStringKey } = payload
      const stateCopy = { ...state.transactions }
      delete stateCopy[timeStringKey]
      return {
        ...state,
        transactions: stateCopy,
      }
    },
  },
  initialState,
)
