import React, { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { IaTransactionEntry } from '../../redux/actions/payload-type'
import LeftTab from './LeftTab'
import RightTab from './RightTab'

const TransactionScreen = () => {
  const layout = useWindowDimensions()
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<IaTransactionEntry>()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ])

  const customeRenderScene = useCallback(
    ({ route, jumpTo, position }) => {
      switch (route.key) {
        case 'first':
          return (
            <LeftTab jumpTo={jumpTo} setSelectedTransaction={setSelectedTransaction} />
          )
        case 'second':
          return (
            <RightTab
              jumpTo={jumpTo}
              selectedTransaction={selectedTransaction}
              setSelectedTransaction={setSelectedTransaction}
            />
          )
        default:
          return null
      }
    },
    [selectedTransaction],
  )

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={customeRenderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      swipeEnabled={false}
    />
  )
}

export default TransactionScreen
