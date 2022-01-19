import React, { FC, useCallback } from 'react'
import { View, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Modal from 'react-native-modal'
import { useAppSelector } from '../../hooks/appReduxHooks'
import { RootState } from '../../redux/reducers'
import { IFxCurrenciesModalProps } from './types'
import { fxCurrenriesModalStyles as sty } from './styles'

const FxCurrenciesModal: FC<IFxCurrenciesModalProps> = ({
  visible = false,
  closeModal,
  onItemPicked,
  selectedCurrencyButton,
  currenciesList = [],
  isLoadingFx = false,
}) => {
  const { height, width } = useWindowDimensions()
  const { currenciesNames } = useAppSelector(
    (state: RootState) => state.currenciesNamesReducer,
  )

  const onCurrencyPressed = useCallback(
    (item) => {
      return () => {
        closeModal()
        onItemPicked(item, selectedCurrencyButton)()
      }
    },
    [selectedCurrencyButton, onItemPicked],
  )

  //TODO: memorize?
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

  //TODO: memorize?
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

export default React.memo(FxCurrenciesModal)
