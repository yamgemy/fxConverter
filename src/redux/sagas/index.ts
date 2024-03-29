import { fork, all } from 'redux-saga/effects'

import { settingsSagasWatcher } from './appLoadingSaga'
import { requestCurrenciesNamesWatcher } from './currenciesNamesSaga'
import { requestFxRatesWatcher, currenciesSelectionWatcher } from './requestFxDataSaga'

// export const rootSagasWatcher = function* root() {
//   yield fork(settingsSagasWatcher)
// }

export function* rootSagasWatcher() {
  yield all([
    settingsSagasWatcher(),
    requestFxRatesWatcher(),
    currenciesSelectionWatcher(),
    requestCurrenciesNamesWatcher(),
  ])
}
