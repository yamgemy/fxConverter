import React from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import Modal from 'react-native-modal'

const FxCurrenciesModal = ({
  visible = false,
  onClosingModal,
  onItemPicked,
  currenciesList = [],
}) => {
  const { height, width } = useWindowDimensions()

  const renderCurrencyItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={onItemPicked(item)}>
        <View style={sty.currencyItem}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={sty.container}>
      <Modal
        isVisible={visible}
        onBackdropPress={onClosingModal}
        onBackButtonPress={onClosingModal}
        animationIn='slideInDown'
        animationOut='slideOutUp'
        hasBackdrop={true}
        deviceHeight={height}
        deviceWidth={width}
        useNativeDriver={true}
        backdropOpacity={0.6}
        children={
          <View style={sty.modal}>
            <FlatList
              data={currenciesList}
              keyExtractor={(i) => i}
              renderItem={renderCurrencyItem}
            />
          </View>
        }
      />
    </View>
  )
}

const sty = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: '100%',
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
  },
  currencyItem: {
    padding: 5,
    width: '100%',
  },
})

export default React.memo(FxCurrenciesModal)
