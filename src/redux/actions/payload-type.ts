//i was experimenting with payload types
export interface IrequestFxRatesPayload {
  baseCurrency: string
}

export type fxDataEntry = {
  data: object
  time: number //solely to enable checking of last request of the same basecurrency
}

export interface IresponseFxRatesPayload<fxDataEntry> {
  fxData: fxDataEntry
  baseCurrency: string
}

export interface IaCurrencyPicked {
  targetInput: string
  targetCurrency: string
}

export interface IaTransactionEntry {
  inputSend: object
  inputRecieve: object
  time: number //convert back to Date object with new Date(time)
}

export interface IresponseCurrenciesNamesPayload {
  currenciesNames: object
}

export interface IremoveTransactionPayload {
  timeStringKey: string
}
