import { IaTransactionEntry } from '../../../redux/actions/payload-type'

export interface RightTabProps {
  jumpTo: Function
  // selectedTransaction: IaTransactionEntry
  // setSelectedTransaction: Function
  selectedTransactionId: string
  setSelectedTransactionId: Function
}
