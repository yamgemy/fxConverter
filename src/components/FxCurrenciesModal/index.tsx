import React, { FC, useCallback } from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import Modal from 'react-native-modal'
import { useAppSelector } from '../../hooks/appReduxHooks'
import { RootState } from '../../redux/reducers'
import { isEmpty } from 'lodash'
import { IFxCurrenciesModalProps } from './types'

const FxCurrenciesModal: FC<IFxCurrenciesModalProps> = ({
  visible = false,
  closeModal,
  onItemPicked,
  currenciesList = [],
  isLoadingFx = false,
}) => {
  const { height, width } = useWindowDimensions()
  const { currenciesNames } = useAppSelector(
    (state: RootState) => state.currenciesNamesReducer,
  )

  const onCurrencyPressed = useCallback((item) => {
    return () => {
      closeModal()
      onItemPicked(item)()
    }
  }, [])

  const renderCurrencyItem = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={isLoadingFx}
        onPress={onCurrencyPressed(item)}
        style={sty.currencyItem}>
        <Text style={sty.abbrev}>{item}</Text>
        {currenciesNames[item] && <Text>{currenciesNames[item]}</Text>}
      </TouchableOpacity>
    )
  }

  const renderSeparator = () => {
    return <View style={sty.separator}></View>
  }
  return (
    <View style={sty.container}>
      <Modal
        isVisible={visible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
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
              data={
                currenciesList.length > 0 &&
                currenciesList.sort((a, b) => a.localeCompare(b))
              }
              keyExtractor={(i) => i}
              renderItem={renderCurrencyItem}
              ItemSeparatorComponent={renderSeparator}
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
    width: '80%',
    padding: '3%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  currencyItem: {
    padding: 5,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  separator: { height: 1, backgroundColor: 'gray', width: '100%' },
  abbrev: {
    fontWeight: 'bold',
    marginRight: 10,
  },
})

export default React.memo(FxCurrenciesModal)
