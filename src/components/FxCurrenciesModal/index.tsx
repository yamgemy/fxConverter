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
  toggleModal,
  onItemPicked,
  currenciesList = [],
  isLoadingFx = false,
}) => {
  const { height, width } = useWindowDimensions()

  const renderCurrencyItem = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={isLoadingFx}
        onPress={onItemPicked(item)}
        style={sty.currencyItem}>
        <Text>{item}</Text>
      </TouchableOpacity>
    )
  }

  const renderSeperator = () => {
    return <View style={{ height: 1, backgroundColor: 'gray' }}></View>
  }
  return (
    <View style={sty.container}>
      <Modal
        isVisible={visible}
        onBackdropPress={toggleModal(false)}
        onBackButtonPress={toggleModal(false)}
        animationIn='fadeIn'
        animationOut='fadeOut'
        animationInTiming={700}
        animationOutTiming={300}
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
              ItemSeparatorComponent={renderSeperator}
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
    padding: '3%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  currencyItem: {
    padding: 5,
    width: '100%',
    height: 50,
    backgroundColor: 'green',
  },
})

export default React.memo(FxCurrenciesModal)
