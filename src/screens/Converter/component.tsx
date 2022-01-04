import React, { FC, useCallback, useState, useEffect } from 'react'
import { View, Modal } from 'react-native'
import { FieldName, useForm } from 'react-hook-form'
import { styles } from './styles'
import { RootState } from '../../redux/reducers'
import { InitialSampleScreenProps } from './types'
import { converterSchema } from '../../helpers/formValidator'
import CurrencyInputWithButton from '../../components/CurrencyInputWithButton'
import HookFormButton from '../../components/HookFormButton'
import FxCurrenciesModal from '../../components/FxCurrenciesModal'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import {
  actionRequestFxRates,
  actionSetCurrenciesPicked,
} from '../../redux/actions/actions'

export interface IFormInputsValues {
  inputSend: string
  inputRecieve: string
}

const INPUTSEND: FieldName<IFormInputsValues> = 'inputSend'
const INPUTRECIEVE: FieldName<IFormInputsValues> = 'inputRecieve'

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCurrencyButton, setSelectedCurrencyButton] = useState(null) //TODO: move to redux

  const {
    data,
    isLoading,
    currenciesSelections = {},
    initialBaseCurrency,
  } = useSelector((state: RootState) => {
    const source = state.converterReducer
    return {
      data: source.fxRatesData,
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

  const onClosingModal = () => {
    setIsModalOpen(false)
  }

  const currencyBtnPressed = useCallback((inputName) => {
    return () => {
      setIsModalOpen(true)
      setSelectedCurrencyButton(inputName)
    }
  }, [])

  //TODO set new fx value on THE OTHER input, maybe useCallback
  const onItemPicked = useCallback(
    (item) => {
      return () => {
        dispatch(
          //when the new state applies, useEffect triggers.
          actionSetCurrenciesPicked({
            targetInput: selectedCurrencyButton,
            targetCurrency: item,
          }),
        )
        setIsModalOpen(false)
        if (selectedCurrencyButton === INPUTSEND) {
          dispatch(actionRequestFxRates({ baseCurrency: item }))
        }
      }
    },
    [selectedCurrencyButton, data],
  )

  const onSubmitConvert = useCallback(() => {
    //TODO using watch still rerenders excessively?
    const inputValues1: string[] = watch([INPUTSEND, INPUTRECIEVE])
    console.log('on crate transacton pressed ', inputValues1)
  }, [watch])

  const createOnEdit = (fieldName) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('onEDit', fieldName + ' ' + e.target.value)
      changeTargetInputValue(fieldName, e.target.value, data)
    }
  }

  const changeTargetInputValue = useCallback(
    (fromField, fromValue, passedInData) => {
      console.log('C3')
      if (!fromField || isEmpty(passedInData)) {
        return
      }
      const parsedValue = parseFloat(fromValue)
      const targetField = fromField === INPUTSEND ? INPUTRECIEVE : INPUTSEND
      //fromValue = fromValue === '' ? 0 : fromValue ///hard cast to avoid parse error
      const setValueOptions = { shouldValidate: true }
      if (fromField === INPUTSEND) {
        const targetRate = passedInData[currenciesSelections[targetField]]
        console.log('A', passedInData) //data not listening to newest
        console.log('A', currenciesSelections[targetField]) //currenciesSelections didnt update
        console.log('A', targetRate + '  ' + parsedValue)
        const fxValue = isNaN(parsedValue) ? '' : (targetRate * parsedValue).toString()
        setValue(targetField, fxValue, setValueOptions)
      } else if (fromField === INPUTRECIEVE) {
        const targetCurrency = currenciesSelections[fromField]
        console.log(targetCurrency)
        const targetRate = passedInData[targetCurrency]
        console.log('B', targetRate)
        const fxValue = isNaN(parsedValue) ? '' : (parsedValue / targetRate).toString()
        console.log('B', fxValue)
        setValue(targetField, fxValue, setValueOptions)
      }
    },
    [data, currenciesSelections],
  )

  useEffect(() => {
    dispatch(actionRequestFxRates({ baseCurrency: initialBaseCurrency }))
  }, [])

  useEffect(() => {
    console.log('E1')
    if (selectedCurrencyButton !== null && !isEmpty(data)) {
      changeTargetInputValue(
        selectedCurrencyButton,
        getValues(selectedCurrencyButton),
        data,
      )
    }
  }, [data, currenciesSelections])

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
          editable={!isEmpty(data)}
        />
        <CurrencyInputWithButton
          name={INPUTRECIEVE}
          form={form}
          onEditing={createOnEdit(INPUTRECIEVE)}
          errors={errors}
          isLoading={isLoading}
          currency={currenciesSelections[INPUTRECIEVE]}
          currencyBtnPressed={currencyBtnPressed(INPUTRECIEVE)}
          editable={!isEmpty(data)}
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
        currenciesList={!isEmpty(data) && Object.keys(data)}
        onItemPicked={onItemPicked}
      />
    </>
  )
}
export default ConverterScreen
