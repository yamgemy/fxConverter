import React, { FC, useCallback } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { useAppSelector } from '../../../hooks/appReduxHooks'
import { IaTransactionEntry } from '../../../redux/actions/payload-type'
import { RootState } from '../../../redux/reducers'
import { LeftTabProps } from './LeftTabProps'

const LeftTab: FC<LeftTabProps> = ({ jumpTo, setSelectedTransactionId }) => {
  const { transactionsList } = useAppSelector((state: RootState) => {
    return {
      transactionsList: Object.values(
        state.transactionsReducer.transactions,
      ) as IaTransactionEntry[],
    }
  })

  const onTransactionEntryPressed = (item) => {
    return () => {
      setSelectedTransactionId(item.time.toString())
      jumpTo('second')
    }
  }

  const renderTransactionItem = useCallback(
    ({ item }) => {
      console.log(item)
      return (
        <TouchableOpacity onPress={onTransactionEntryPressed(item)}>
          <Surface style={s.transactionEntryContainer}>
            <View style={s.valCurrency}>
              <Text>{item.inputSend.val}</Text>
              <Text>{item.inputSend.currency}</Text>
            </View>
            <View style={s.valCurrency}>
              <Text>{item.inputRecieve.val}</Text>
              <Text>{item.inputRecieve.currency}</Text>
            </View>
          </Surface>
        </TouchableOpacity>
      )
    },
    [setSelectedTransactionId, jumpTo],
  )

  return (
    <View style={s.tabContainer}>
      <FlatList
        data={transactionsList}
        keyExtractor={(item: IaTransactionEntry) => item.time.toString()}
        renderItem={renderTransactionItem}
      />
    </View>
  )
}

export default React.memo(LeftTab)

const s = StyleSheet.create({
  tabContainer: { flex: 1, backgroundColor: '#ff4081' },
  transactionEntryContainer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'green',
    alignItems: 'center',
    margin: 5,
    elevation: 4,
  },
  valCurrency: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
})
