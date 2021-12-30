import { createAction } from "redux-actions"

import { GENERAL_TYPES as TYPE } from "./action-types"

export const setAppLoading = createAction<boolean>(TYPE.SET_APP_LOADING)
