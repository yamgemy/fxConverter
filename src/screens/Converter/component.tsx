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
import { debounce, isEmpty } from 'lodash'
import {
  actionOnCurrenciesPicked,
  actionRequestFxRates,
  actionSubmitTransactionEntry,
} from '../../redux/actions/actions'
import { useAppSelector, useAppDispatch } from '../../hooks/appReduxHooks'

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  //selectedCurrencyButton doesnt seem to be required in other components so put locally
  // also lessen reducer complexity
  const [selectedCurrencyButton, setSelectedCurrencyButton] = useState(INPUTSEND)

  const { isLoadingFx, currenciesSelections } = useAppSelector(
    (state: RootState) => state.converterReducer,
  )

  const { fxRatesData } = useAppSelector((state: RootState) => {
    const { fxRatesData } = state.converterReducer
    return {
      fxRatesData: fxRatesData[currenciesSelections[INPUTSEND]]?.data,
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
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = form

  //not passed to children but it's actually implicitly done so as it's encapsulated inside 'onEditing'
  //wrapped in useCallback as well to prevent function being reassigned when converter component rerenders
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
      setValue(targetField, targetValue, { shouldValidate: true }) //set true will rerender on every keystroke , set false will not remove error in other input even if new value is valid
    },
    [fxRatesData, currenciesSelections],
  )

  //usecallback because it's passed to children
  const toggleModal = useCallback((isOpen) => {
    return () => {
      setIsModalOpen(isOpen)
    }
  }, [])

  //usecallback because it's passed to children
  const currencyBtnPressed = useCallback(
    (inputName) =>
      debounce((): void => {
        toggleModal(true)()
        setSelectedCurrencyButton(inputName)
      }, 300),
    [],
  )

  //usecallback because it's passed to children
  const onItemPicked = useCallback(
    (item) => {
      return debounce(
        () => {
          toggleModal(false)()
          dispatch(
            //this dispatch leads to request fxRate if currency picked at inputSend
            actionOnCurrenciesPicked({
              targetInput: selectedCurrencyButton,
              targetCurrency: item,
            }),
          )
        },
        selectedCurrencyButton === INPUTSEND ? 300 : 0,
      )
    },
    [selectedCurrencyButton],
  )

  //usecallback because it's passed to children
  const onSubmitConvert = useCallback(() => {
    const enteredValues = getValues()
    reset()
    const transactionEntry: any = Object.keys(currenciesSelections).reduce(
      //any: lazy typing
      (result, key) => {
        return {
          ...result,
          [key]: { val: enteredValues[key], currency: currenciesSelections[key] },
        }
      },
      { time: new Date() },
    )
    dispatch(actionSubmitTransactionEntry(transactionEntry))
  }, [getValues, currenciesSelections])

  //usecallback because it's passed to children
  const onEditing = useCallback(
    (fieldName) => {
      return (e: React.ChangeEvent<HTMLInputElement>): void => {
        changeTargetInputValue(fieldName, e.target.value)
        //TODO: clear errors on the other input
      }
    },
    [currenciesSelections, fxRatesData, errors],
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
          isLoading={isLoadingFx}
          currency={currenciesSelections[INPUTSEND]}
          currencyBtnPressed={currencyBtnPressed(INPUTSEND)}
          editable={!isEmpty(fxRatesData)}
        />
        <CurrencyInputWithButton
          name={INPUTRECIEVE}
          form={form}
          onEditing={onEditing(INPUTRECIEVE)}
          isLoading={isLoadingFx}
          currency={currenciesSelections[INPUTRECIEVE]}
          currencyBtnPressed={currencyBtnPressed(INPUTRECIEVE)}
          editable={!isEmpty(fxRatesData)}
        />
        <HookFormButton
          form={form}
          onClick={onSubmitConvert}
          label={'Create Transaction'}
          disabled={!isEmpty(errors) || !isDirty}
        />
      </View>
      <FxCurrenciesModal
        visible={isModalOpen}
        isLoadingFx={isLoadingFx}
        toggleModal={toggleModal}
        currenciesList={!isEmpty(fxRatesData) && Object.keys(fxRatesData)}
        onItemPicked={onItemPicked}
      />
    </>
  )
}
export default ConverterScreen
