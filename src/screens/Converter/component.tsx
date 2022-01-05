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
import { debounce, DebouncedFunc, isEmpty } from 'lodash'
import {
  actionOnCurrenciesPicked,
  actionRequestFxRates,
} from '../../redux/actions/actions'

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCurrencyButton, setSelectedCurrencyButton] = useState(INPUTSEND) //doesnt seem to be required in other components so put locally

  const { fxRatesData, isLoadingFx, currenciesSelections } = useSelector(
    (state: RootState) => state.converterReducer,
  )

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

  const inputsFilled: boolean =
    !Object.values(watch([INPUTSEND, INPUTRECIEVE])).includes('') && isEmpty(errors) //form.getValues wont work

  //not passed to children but wrapped in useCallback to prevent recompute function due to componet rerender
  const changeTargetInputValue = useCallback(
    (fromField: string, fromValue: string) => {
      if (!fromField || isEmpty(fxRatesData)) {
        return
      }
      const parsedValue = parseFloat(fromValue)
      const targetField = fromField === INPUTSEND ? INPUTRECIEVE : INPUTSEND
      let targetRate: number, targetValue: string
      if (fromField === INPUTSEND) {
        targetRate = fxRatesData[currenciesSelections[targetField]]
        targetValue = isNaN(parsedValue) ? '' : (targetRate * parsedValue).toString()
      } else if (fromField === INPUTRECIEVE) {
        targetRate = fxRatesData[currenciesSelections[fromField]]
        targetValue = isNaN(parsedValue) ? '' : (parsedValue / targetRate).toString()
      }
      setValue(targetField, targetValue, { shouldValidate: false })
    },
    [fxRatesData, currenciesSelections],
  )

  //usecallback because it's passed to children
  const onClosingModal = useCallback(() => {
    setIsModalOpen((state) => !state)
  }, [])

  //usecallback because it's passed to children
  const currencyBtnPressed = useCallback(
    (inputName) =>
      debounce((): void => {
        setIsModalOpen((state) => !state)
        setSelectedCurrencyButton(inputName)
      }, 500),
    [],
  )

  //usecallback because it's passed to children
  const onItemPicked = useCallback(
    (item) =>
      debounce(() => {
        setIsModalOpen(false)
        dispatch(
          //this dispatch leads to request fxRate if currency picked at inputSend
          actionOnCurrenciesPicked({
            targetInput: selectedCurrencyButton,
            targetCurrency: item,
          }),
        )
      }, 500),
    [selectedCurrencyButton],
  )

  //usecallback because it's passed to children
  const onSubmitConvert = useCallback(() => {
    const enteredValues = getValues()
    const result = Object.keys(currenciesSelections).reduce(
      (result, key) => {
        return {
          ...result,
          [key]: { val: enteredValues[key], currency: currenciesSelections[key] },
        }
      },
      { time: new Date() },
    )
    console.log(result)
  }, [getValues, currenciesSelections])

  //usecallback because it's passed to children
  // const onEditing = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>, fieldName: string): void => {
  //     changeTargetInputValue(fieldName, e.target.value)
  //   },
  //   [currenciesSelections, fxRatesData],
  // )

  const onEditing = useCallback(
    (fieldName) => {
      return (e: React.ChangeEvent<HTMLInputElement>): void => {
        changeTargetInputValue(fieldName, e.target.value)
      }
    },
    [currenciesSelections, fxRatesData],
  )
  //this useEffect invokes ONLY ONCE after component mounts
  useEffect(() => {
    dispatch(actionRequestFxRates({ baseCurrency: currenciesSelections[INPUTSEND] }))
  }, [])

  //0. this useEffect invokes on 2 cases.
  //1. after the initial actionRequestFxRates dispatch and fxData updated,
  //2. after currenciesSelections changed AND ONLY if it's from inputSend, actionRequestFxRates is also invoked
  useEffect(() => {
    if (!isEmpty(fxRatesData)) {
      changeTargetInputValue(selectedCurrencyButton, getValues(selectedCurrencyButton))
    }
  }, [fxRatesData])

  //picking currency at inputRecieve DOES NOT request fxRatesData, change inputSend value immediately
  useEffect(() => {
    if (selectedCurrencyButton === INPUTRECIEVE) {
      changeTargetInputValue(selectedCurrencyButton, getValues(selectedCurrencyButton))
    }
  }, [currenciesSelections])

  console.log('render converter & errors: ', errors)

  return (
    <>
      <View style={styles.root}>
        <CurrencyInputWithButton
          name={INPUTSEND}
          form={form}
          onEditing={onEditing(INPUTSEND)}
          errors={errors}
          isLoading={isLoadingFx}
          currency={currenciesSelections[INPUTSEND]}
          currencyBtnPressed={currencyBtnPressed(INPUTSEND)}
          editable={!isEmpty(fxRatesData)}
        />
        <CurrencyInputWithButton
          name={INPUTRECIEVE}
          form={form}
          onEditing={onEditing(INPUTRECIEVE)}
          errors={errors}
          isLoading={isLoadingFx}
          currency={currenciesSelections[INPUTRECIEVE]}
          currencyBtnPressed={currencyBtnPressed(INPUTRECIEVE)}
          editable={!isEmpty(fxRatesData)}
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
        currenciesList={!isEmpty(fxRatesData) && Object.keys(fxRatesData)}
        onItemPicked={onItemPicked}
      />
    </>
  )
}
export default ConverterScreen
