import { createAction } from "redux-actions"

import { SET_APP_LOADING } from "./action-types"

export const setAppLoading = createAction<boolean>(SET_APP_LOADING)
