import { ITransactionsState } from './stateTypeInterfaces'
import { handleActions } from 'redux-actions'
import { FX_TYPES as FT } from '../actions/action-types'

const initialState: ITransactionsState = {
  transactions: {},
}

export const transactionsReducer = handleActions<ITransactionsState, any>(
  {
    [FT.SUBMIT_TRANSACTION_ENTRY]: (state, { payload }) => {
      console.log('transactionsReducer', payload)
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [payload.time.getTime().toString()]: payload,
        },
      }
    },
  },
  initialState,
)
