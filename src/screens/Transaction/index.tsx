import React, { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import LeftTab from './LeftTab'
import RightTab from './RightTab'

const TransactionScreen = () => {
  const layout = useWindowDimensions()
  const [selectedTransactionId, setSelectedTransactionId] = React.useState<string>('')
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
            <LeftTab
              jumpTo={jumpTo}
              setSelectedTransactionId={setSelectedTransactionId}
            />
          )
        case 'second':
          return (
            <RightTab
              jumpTo={jumpTo}
              selectedTransactionId={selectedTransactionId}
              setSelectedTransactionId={setSelectedTransactionId}
            />
          )
        default:
          return null
      }
    },
    [selectedTransactionId],
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
