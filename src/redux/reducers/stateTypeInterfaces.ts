export interface IApplicationState {
  appLoading: boolean
}

export interface ISomethingState {
  something: Object
}

export interface IFxState {
  isLoadingFx: boolean
  fxRatesData: object
  baseCurrency: string
  currenciesSelections: object
}

export interface ITransactionsState {
  transactions: {}
}
