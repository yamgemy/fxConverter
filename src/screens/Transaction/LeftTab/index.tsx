import React, { FC, useCallback } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, IconButton, Surface, Text } from 'react-native-paper'
import { useAppSelector } from '../../../hooks/appReduxHooks'
import { IaTransactionEntry } from '../../../redux/actions/payload-type'
import { RootState } from '../../../redux/reducers'
import { LeftTabProps } from './LeftTabProps'
import { leftTabStyles as sty } from './styles'

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
          <Surface style={sty.transactionEntryContainer}>
            <View style={sty.valCurrency}>
              <Text style={sty.valueText}>{item.inputSend.val}</Text>
              <Text>{'  '}</Text>
              <Text style={sty.valueText}>{item.inputSend.currency}</Text>
            </View>
            <IconButton icon={'arrow-right-bold-outline'} size={25} />
            <View style={sty.valCurrency}>
              <Text style={sty.valueText}>{item.inputRecieve.val}</Text>
              <Text>{'  '}</Text>
              <Text style={sty.valueText}>{item.inputRecieve.currency}</Text>
            </View>
          </Surface>
        </TouchableOpacity>
      )
    },
    [setSelectedTransactionId, jumpTo],
  )

  return (
    <View style={sty.tabContainer}>
      {transactionsList && transactionsList.length > 0 ? (
        <FlatList
          data={transactionsList}
          keyExtractor={(item: IaTransactionEntry) => item.time.toString()}
          renderItem={renderTransactionItem}
        />
      ) : (
        <View style={sty.emptyListContainer}>
          <Text style={sty.emptyMessage}>No transactions created yet</Text>
        </View>
      )}
    </View>
  )
}

export default React.memo(LeftTab)
