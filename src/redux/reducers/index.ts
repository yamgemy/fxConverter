import { combineReducers, Reducer } from "redux"
import { Action } from "redux-actions"
import { applicationReducer } from "./applicationReducer"
import { IApplicationState } from "./stateTypeInterfaces"
// export const initialState = {
//   //this property shouldn't be named as applicationReducer,
//   //because you are specifically referring to the state inside of it, which is appLoading
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
  //renamed from InitialState
  applicationReducer: IApplicationState
  //TODO: add more reducers and their return types
}

export const rootReducer: Reducer<IAllReducersStates, any> = combineReducers({
  applicationReducer: applicationReducer,
})
