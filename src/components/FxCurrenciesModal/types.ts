import { IaTransactionEntry } from '../../redux/actions/payload-type'

export interface IFxCurrenciesModalProps {
  visible: boolean
  closeModal: () => void
  onItemPicked: (item: IaTransactionEntry) => Function
  currenciesList: string[]
  isLoadingFx: boolean
}
