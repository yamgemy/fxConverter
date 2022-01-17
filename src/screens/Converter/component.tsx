import React, { FC, useCallback, useState, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { styles } from './styles'
import { RootState } from '../../redux/reducers'
import { IFormInputsValues, InitialSampleScreenProps } from './types'
import { INPUTSEND, INPUTRECIEVE, SNACKBAROPTIONS } from './constants'
import { converterSchema } from '../../helpers/formValidator'
import CurrencyInputWithButton from '../../components/CurrencyInputWithButton'
import HookFormButton from '../../components/HookFormButton'
import FxCurrenciesModal from '../../components/FxCurrenciesModal'
import Snackbar from 'react-native-snackbar'
import { debounce, isEmpty } from 'lodash'
import {
  actionOnCurrenciesPicked,
  actionRequestCurrenciesNames,
  actionRequestFxRates,
  actionSubmitTransactionEntry,
} from '../../redux/actions/actions'
import { useAppSelector, useAppDispatch } from '../../hooks/appReduxHooks'
import { IaTransactionEntry } from '../../redux/actions/payload-type'

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const selectedCurrencyButton = useRef(INPUTSEND) //replaced from useState as it's not part of render

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
    clearErrors, //initially intended to use on kystrokes, but causes rerenders; currently use 'reValidateMode' and 'shouldValidate' instead
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
      setValue(targetField, targetValue, {
        shouldValidate: isDirty === true && !isEmpty(errors),
      }) //shouldValidate: set true will rerender on every keystroke;
      //set false will not remove error in other input even if new value is valid
    },
    [fxRatesData, currenciesSelections, isDirty, errors],
  )

  //usecallback because it's passed to children
  const toggleModal = useCallback((isOpen) => {
    return () => {
      setIsModalOpen(isOpen)
    }
  }, [])

  //usecallback because it's passed to children
  const currencyBtnPressed = useCallback((inputName) => {
    //selectedCurrencyButton.current = inputName //putting it here DOES NOT WORK;
    //children will only invoke what's inside the returning function
    return debounce((): void => {
      selectedCurrencyButton.current = inputName
      toggleModal(true)()
    }, 300)
  }, []) //putting selectedCurrencyButton as dependency wont't affect recreating the function since, as a ref, it remains the same throughout renders;
  //putting selectedCurrencyButton.current does not matter as we are not reading from it but will overwrite the current value anyway

  //usecallback because it's passed to children
  const onItemPicked = useCallback((item, fromInputName) => {
    return debounce((): void => {
      dispatch(
        //this dispatch leads to request fxRate if currency picked at inputSend
        actionOnCurrenciesPicked({
          targetInput: fromInputName,
          targetCurrency: item,
        }),
      )
    }, 350)
  }, [])

  //usecallback because it's passed to children
  const onSubmitConvert = useCallback(() => {
    const enteredValues = getValues()
    reset()
    const transactionEntry: IaTransactionEntry = Object.keys(currenciesSelections).reduce(
      (result, key) => ({
        ...result,
        [key]: { val: enteredValues[key], currency: currenciesSelections[key] },
      }),
      {
        // inputSend: {}, //.reduce is adding exactly this property. Made optional in IaTransactionEntry interface
        // inputRecieve: {}, //.reduce is adding exactly this property. Made optional in IaTransactionEntry interface
        time: new Date().getTime(),
        done: false,
        //recipientBank: '', //rightfully optional; it's not part of the payload here
      },
    )
    dispatch(actionSubmitTransactionEntry(transactionEntry))
    Snackbar.show(SNACKBAROPTIONS)
  }, [getValues, currenciesSelections])

  //usecallback because it's passed to children
  const onEditing = useCallback(
    (fieldName) => {
      return (e: React.ChangeEvent<HTMLInputElement>): void => {
        changeTargetInputValue(fieldName, e.target.value)
      }
    },
    [currenciesSelections, fxRatesData, errors],
  )
  //this useEffect invokes ONLY ONCE after component mounts
  useEffect(() => {
    dispatch(actionRequestFxRates({ baseCurrency: currenciesSelections[INPUTSEND] }))
    dispatch(actionRequestCurrenciesNames())
  }, [])

  //0. this useEffect invokes on 2 cases.
  //1. after the initial actionRequestFxRates dispatch and fxData updated,
  //2. after currenciesSelections changed AND ONLY if it's from inputSend, actionRequestFxRates is also invoked from saga
  useEffect(() => {
    if (!isEmpty(fxRatesData)) {
      changeTargetInputValue(
        selectedCurrencyButton.current,
        getValues(selectedCurrencyButton.current),
      )
    }
  }, [fxRatesData])

  //picking currency at inputRecieve DOES NOT request fxRatesData, change inputSend value immediately
  useEffect(() => {
    if (selectedCurrencyButton.current === INPUTRECIEVE) {
      changeTargetInputValue(
        selectedCurrencyButton.current,
        getValues(selectedCurrencyButton.current),
      )
    }
  }, [currenciesSelections])

  return (
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

      <FxCurrenciesModal
        visible={isModalOpen}
        isLoadingFx={isLoadingFx}
        closeModal={toggleModal(false)}
        selectedCurrencyButton={selectedCurrencyButton.current}
        currenciesList={!isEmpty(fxRatesData) && Object.keys(fxRatesData)}
        onItemPicked={onItemPicked}
      />
    </View>
  )
}
export default ConverterScreen
