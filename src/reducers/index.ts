import { combineReducers, Reducer } from "redux"
import * as applicationReducer from "./application.reducer"

export const initialState = {
  applicationReducer: applicationReducer.initialState,
}

export interface InitialState {
  applicationReducer: applicationReducer.InitialState
  _persist?: {
    version: number
    rehydrated: boolean
  }
}

export const rootReducer: Reducer<InitialState, any> = combineReducers({
  applicationReducer: applicationReducer.reducer,
})
