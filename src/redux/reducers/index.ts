import { combineReducers, Reducer } from 'redux'
import { applicationReducer } from './applicationReducer'
import { converterReducer } from './converterReducer'
import { currenciesNamesReducer } from './currenciesNamesReducer'
import {
  IApplicationState,
  ICurrenciesNamesState,
  IFxState,
  ITransactionsState,
} from './stateTypeInterfaces'
import { transactionsReducer } from './transactionsReducer'
// export const initialState = {
//   //this property shouldn't be named as applicationReducer,
//   //because it specifically refers to the state inside of it, which is appLoading
//   //also i don't really want to duplicate declaration to the same value
//   applicationReducer: applicationReducer.initialState,
// }

// export interface InitialState {
//   applicationReducer: applicationReducer.InitialState
//   //i config everything about redux persist in the persistConfig inside store.ts
//   _persist?: {
//     version: number
//     rehydrated: boolean
//   }
// }

export interface IAllReducersStates {
  applicationReducer: IApplicationState //renamed from 'InitialState'
  converterReducer: IFxState
  transactionsReducer: ITransactionsState
  currenciesNamesReducer: ICurrenciesNamesState
}

export const rootReducer: Reducer<IAllReducersStates, any> = combineReducers({
  applicationReducer: applicationReducer,
  converterReducer: converterReducer,
  transactionsReducer: transactionsReducer,
  currenciesNamesReducer: currenciesNamesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
