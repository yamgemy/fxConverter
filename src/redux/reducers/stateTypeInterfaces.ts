import { FieldName } from 'react-hook-form'
import { IFormInputsValues } from '../../screens/Converter/component'

export interface IApplicationState {
  appLoading: boolean
}

export interface ISomethingState {
  something: Object
}

export interface IFxState {
  isLoadingFx: boolean
  baseCurrency: string
  fxRatesData: object
  currenciesSelections: object
}
