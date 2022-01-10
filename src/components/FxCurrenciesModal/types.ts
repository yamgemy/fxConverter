import { IaTransactionEntry } from '../../redux/actions/payload-type'

export interface IFxCurrenciesModalProps {
  visible: boolean
  closeModal: () => void
  selectedCurrencyButton: string
  onItemPicked: (item: IaTransactionEntry, fromInputName: string) => Function
  currenciesList: string[]
  isLoadingFx: boolean
}
