//i was experimenting with payload types
export interface IrequestFxRatesPayload {
  baseCurrency: string
}

export interface IresponseFxRatesPayload {
  fxData: object
  baseCurrency: string
}

export interface IaCurrencyPicked {
  targetInput: string
  targetCurrency: string
}
