import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { useAppDispatch } from '../../../hooks/appReduxHooks'
import { actionRemoveTransactionEntry } from '../../../redux/actions/actions'
import { RightTabProps } from './RightTabProps'

const RightTab: FC<RightTabProps> = ({
  jumpTo,
  selectedTransaction,
  setSelectedTransaction,
}) => {
  const dispatch = useAppDispatch()
  const onDeleteEntry = () => {
    dispatch(
      actionRemoveTransactionEntry({
        timeStringKey: selectedTransaction.time.toString(),
      }),
    )
    jumpTo('first')
    setSelectedTransaction(undefined)
  }
  return (
    <View style={sty.tabContainer}>
      {selectedTransaction && (
        <View>
          <Text>{JSON.stringify(selectedTransaction)}</Text>
          <Button onPress={onDeleteEntry}>Delete</Button>
        </View>
      )}
    </View>
  )
}

export default React.memo(RightTab)

const sty = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: '#673ab7',
  },
})
