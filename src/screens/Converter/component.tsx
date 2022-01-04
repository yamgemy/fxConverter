import React, { FC, useCallback, useState, useEffect } from 'react'
import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { styles } from './styles'
import { RootState } from '../../redux/reducers'
import { IFormInputsValues, InitialSampleScreenProps } from './types'
import { INPUTSEND, INPUTRECIEVE } from './constants'
import { converterSchema } from '../../helpers/formValidator'
import CurrencyInputWithButton from '../../components/CurrencyInputWithButton'
import HookFormButton from '../../components/HookFormButton'
import FxCurrenciesModal from '../../components/FxCurrenciesModal'
import { useDispatch, useSelector } from 'react-redux'
import { debounce, isEmpty } from 'lodash'
import { actionSetCurrenciesPicked } from '../../redux/actions/actions'

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCurrencyButton, setSelectedCurrencyButton] = useState(INPUTSEND) //TODO: move to redux

  const {
    fxData,
    isLoading,
    currenciesSelections = {},
    initialBaseCurrency,
  } = useSelector((state: RootState) => {
    const source = state.converterReducer
    return {
      fxData: source.fxRatesData,
      isLoading: source.isLoadingFx,
      currenciesSelections: source.currenciesSelections,
      initialBaseCurrency: source.currenciesSelections[INPUTSEND],
    }
  })

  const form = useForm<IFormInputsValues>({
    resolver: converterSchema,
    shouldFocusError: true,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      [INPUTSEND]: '',
      [INPUTRECIEVE]: '',
    },
  })

  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = form

  const inputsFilled =
    !Object.values(watch([INPUTSEND, INPUTRECIEVE])).includes('') && isEmpty(errors) //form.getValues wont work

  //usecallback because it's passed to children
  const onClosingModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  //usecallback because it's passed to children
  const currencyBtnPressed = useCallback((inputName) => {
    return () => {
      setIsModalOpen(true)
      setSelectedCurrencyButton(inputName)
    }
  }, [])

  //usecallback because it's passed to children
  const onItemPicked = useCallback(
    (item) => {
      return debounce(() => {
        setIsModalOpen(false)
        dispatch(
          //this dispatch leads to fxRates being requested inside requestFxfxDataSaga
          actionSetCurrenciesPicked({
            targetInput: selectedCurrencyButton,
            targetCurrency: item,
          }),
        )
      }, 500)
    },
    [selectedCurrencyButton],
  )

  //usecallback because it's passed to children
  const onSubmitConvert = useCallback(() => {
    //TODO using watch still rerenders excessively?
    const inputValues1: string[] = watch([INPUTSEND, INPUTRECIEVE])
    console.log('on crate transacton pressed ', inputValues1)
  }, [watch])

  //usecallback because it's passed to children
  const createOnEdit = useCallback((fieldName) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('onEDit', fieldName + ' ' + e.target.value)
      changeTargetInputValue(fieldName, e.target.value)
    }
  }, [])

  const changeTargetInputValue = useCallback(
    (fromField, fromValue) => {
      console.log('C3')
      if (!fromField || isEmpty(fxData)) {
        return
      }
      const parsedValue = parseFloat(fromValue)
      const targetField = fromField === INPUTSEND ? INPUTRECIEVE : INPUTSEND
      //fromValue = fromValue === '' ? 0 : fromValue ///hard cast to avoid parse error
      const setValueOptions = { shouldValidate: false } //we already know for sure it will be a number
      if (fromField === INPUTSEND) {
        const targetRate = fxData[currenciesSelections[targetField]]
        console.log('A', fxData) //fxData not listening to newest
        console.log('A', currenciesSelections[targetField]) //currenciesSelections didnt update
        console.log('A', targetRate + '  ' + parsedValue)
        const fxValue = isNaN(parsedValue) ? '' : (targetRate * parsedValue).toString()
        setValue(targetField, fxValue, setValueOptions)
      } else if (fromField === INPUTRECIEVE) {
        const targetCurrency = currenciesSelections[fromField]
        console.log(targetCurrency)
        const targetRate = fxData[targetCurrency]
        console.log('B', targetRate)
        const fxValue = isNaN(parsedValue) ? '' : (parsedValue / targetRate).toString()
        console.log('B', fxValue)
        setValue(targetField, fxValue, setValueOptions)
      }
    },
    [fxData, currenciesSelections],
  )

  //this useEffect invokes ONLY ONCE after component mounts
  //This is the entry point for requesting fxrates
  useEffect(() => {
    dispatch(
      actionSetCurrenciesPicked({
        targetInput: selectedCurrencyButton,
        targetCurrency: initialBaseCurrency,
      }),
    )
  }, [])

  //1. selectedCurrencyButton state set, modal opens
  //2 pick a currency -> dispatch currenciesSelections
  //3 inside saga wait for currenciesSelections set then if it's from inputsend, requesFxRates
  //4 on fxData changed, then changeTargetInputValue
  useEffect(() => {
    console.log('E1')
    if (!isEmpty(fxData)) {
      changeTargetInputValue(selectedCurrencyButton, getValues(selectedCurrencyButton))
    }
  }, [fxData])

  console.log('render converter & errors: ', errors)

  return (
    <>
      <View style={styles.root}>
        <CurrencyInputWithButton
          name={INPUTSEND}
          form={form}
          onEditing={createOnEdit(INPUTSEND)}
          errors={errors}
          isLoading={isLoading}
          currency={currenciesSelections[INPUTSEND]}
          currencyBtnPressed={currencyBtnPressed(INPUTSEND)}
          editable={!isEmpty(fxData)}
        />
        <CurrencyInputWithButton
          name={INPUTRECIEVE}
          form={form}
          onEditing={createOnEdit(INPUTRECIEVE)}
          errors={errors}
          isLoading={isLoading}
          currency={currenciesSelections[INPUTRECIEVE]}
          currencyBtnPressed={currencyBtnPressed(INPUTRECIEVE)}
          editable={!isEmpty(fxData)}
        />
        <HookFormButton
          form={form}
          onClick={onSubmitConvert}
          label={'Create Transaction'}
          inputsFilled={inputsFilled}
        />
      </View>
      <FxCurrenciesModal
        visible={isModalOpen}
        onClosingModal={onClosingModal}
        currenciesList={!isEmpty(fxData) && Object.keys(fxData)}
        onItemPicked={onItemPicked}
      />
    </>
  )
}
export default ConverterScreen
