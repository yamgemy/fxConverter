import { handleActions } from "redux-actions"

import { RESET_STORE, SET_APP_LOADING } from "../actions"

export interface InitialState {
  appLoading: boolean
}

export const initialState: InitialState = {
  appLoading: false,
}

export const reducer = handleActions<InitialState, any>(
  {
    [SET_APP_LOADING]: (state, { payload }) => ({
      ...state,
      appLoading: payload,
    }),
    [RESET_STORE]: () => initialState,
  },
  initialState,
)
