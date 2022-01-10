import React, { FC, useCallback } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, IconButton, Surface, Text } from 'react-native-paper'
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
      return (
        <TouchableOpacity onPress={onTransactionEntryPressed(item)}>
          <Surface style={s.transactionEntryContainer}>
            <View style={s.valCurrency}>
              <Text style={s.valueText}>{item.inputSend.val}</Text>
              <Text>{'  '}</Text>
              <Text style={s.valueText}>{item.inputSend.currency}</Text>
            </View>
            <IconButton icon={'arrow-right-bold-outline'} size={25} />
            <View style={s.valCurrency}>
              <Text style={s.valueText}>{item.inputRecieve.val}</Text>
              <Text>{'  '}</Text>
              <Text style={s.valueText}>{item.inputRecieve.currency}</Text>
            </View>
          </Surface>
        </TouchableOpacity>
      )
    },
    [setSelectedTransactionId, jumpTo],
  )

  return (
    <View style={s.tabContainer}>
      {transactionsList && transactionsList.length > 0 ? (
        <FlatList
          data={transactionsList}
          keyExtractor={(item: IaTransactionEntry) => item.time.toString()}
          renderItem={renderTransactionItem}
        />
      ) : (
        <View style={s.emptyListContainer}>
          <Text style={s.emptyMessage}>No transactions created yet</Text>
        </View>
      )}
    </View>
  )
}

export default React.memo(LeftTab)

const s = StyleSheet.create({
  tabContainer: { flex: 1, backgroundColor: 'beige' },
  transactionEntryContainer: {
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 5,
    elevation: 4,
  },
  valCurrency: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'beige',
  },
  emptyMessage: {
    fontWeight: '500',
    fontSize: 17,
  },
  valueText: {
    fontWeight: '500',
    fontSize: 15,
  },
})
