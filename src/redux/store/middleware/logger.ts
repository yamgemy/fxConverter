import R from "ramda"
import { Action } from "redux"
import { createLogger } from "redux-logger"

const getActionType = (action: Action) => {
  const { type } = action
  const activity = R.path(["meta", "activity"], action)
  const path = R.path(["meta", "path"], action)
  const mediaType = R.path(["payload", "mediaType"], action)
  R.path(["meta", "mediaType"], action)
  const title = R.path(["payload", "title"], action) || R.path(["meta", "title"], action)
  const displayType = [type, activity, path, mediaType, title].filter((item) => item).join(" | ")

  return {
    ...action,
    type: displayType,
  }
}

// @ts-ignore
export const configureLogger = () =>
  createLogger({
    collapsed: true,
    actionTransformer: getActionType,
    logger: console,
    // stateTransformer: immutableToJS,
    colors: {
      title: ({ type }: Action) => {
        if (type.includes("SUCCESS")) {
          return "green"
        }
        if (type.includes("FAIL")) {
          return "red"
        }
        if (type.includes("REQUEST")) {
          return "blue"
        }

        return ""
      },
    },
    predicate: (_getState: any, { type }: Action) => {
      const isVisible = type !== "COLLECT_ACTIONS"

      return isVisible
    },
  })
