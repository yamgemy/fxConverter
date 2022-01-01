//i don't really like to have a dot in the file name aside from its file extension
//because a dot usually denotes file extension

import { handleActions } from "redux-actions"
import { GENERAL_TYPES as GT } from "../actions/action-types"
import { IApplicationState } from "./stateTypeInterfaces"

export const initialState: IApplicationState = {
  appLoading: false,
}

export const applicationReducer = handleActions<IApplicationState, any>(
  {
    [GT.SET_APP_LOADING]: (state, { payload }) => ({
      ...state,
      appLoading: payload,
    }),
    [GT.RESET_STORE]: () => initialState,
  },
  initialState,
)
