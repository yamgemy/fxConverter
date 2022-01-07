export interface IApplicationState {
  appLoading: boolean
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

export interface ICurrenciesNamesState {
  currenciesNames: object
}
