import React, { FC, useCallback, useState } from 'react'
import { View, Modal } from 'react-native'
import { FieldName, useForm } from 'react-hook-form'
import { styles } from './styles'
import { InitialSampleScreenProps } from './types'
import { converterSchema } from '../../helpers/formValidator'
import CurrencyInputWithButton from '../../components/CurrencyInputWithButton'
import HookFormButton from '../../components/HookFormButton'
import { useQueryClient, useQuery } from 'react-query'
import { requestFxRates } from '../../services/endpoints/fxRates'
import FxCurrenciesModal from '../../components/FxCurrenciesModal'
import { isEmpty } from 'lodash'

export interface IFormInputsValues {
  inputSend: string
  inputRecieve: string
}

const INPUTSEND: FieldName<IFormInputsValues> = 'inputSend'
const INPUTRECIEVE: FieldName<IFormInputsValues> = 'inputRecieve'

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCurrencyButton, setSelectedCurrencyButton] = useState(null)
  const [currenciesPicked, setCurrenciesPicked] = useState({
    [INPUTSEND]: 'USD',
    [INPUTRECIEVE]: 'JPY',
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

  const { data, isLoading = false } = useQuery('queryFX', requestFxRates('USD'), {
    refetchInterval: 60 * 1000, //this rerenders the component
    initialData: {},
  })

  const onClosingModal = () => {
    setIsModalOpen(false)
  }

  const currencyBtnPressed = useCallback((inputName) => {
    return () => {
      setIsModalOpen(true)
      setSelectedCurrencyButton(inputName)
    }
  }, [])

  const onItemPicked = (item) => {
    return () => {
      setCurrenciesPicked((prevState) => {
        return {
          ...prevState,
          [selectedCurrencyButton]: item,
        }
      })
      setIsModalOpen(false)
    }
  }

  const onSubmitConvert = useCallback(() => {
    //TODO still rerenders excessively?
    const inputValues1: string[] = watch([INPUTSEND, INPUTRECIEVE])
    console.log('on crate transacton pressed ', inputValues1)
  }, [watch])

  const createOnEdit = (fieldName) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      //      const currentVal = getValues(fieldName)
      console.log('onEDit', fieldName + ' ' + e.target.value)
      changeTargetInputValue(fieldName, e.target.value)
    }
  }

  const changeTargetInputValue = useCallback(
    (fromField, fromValue) => {
      if (!fromField || isEmpty(data)) {
        return
      }
      const parsedValue = parseFloat(fromValue)
      const targetField = fromField === INPUTSEND ? INPUTRECIEVE : INPUTSEND
      //fromValue = fromValue === '' ? 0 : fromValue ///hard cast to avoid parse error
      const setValueOptions = { shouldValidate: true }
      if (fromField === INPUTSEND) {
        const targetRate = data[currenciesPicked[targetField]]
        const fxValue = isNaN(parsedValue) ? '' : (targetRate * parsedValue).toString()
        setValue(targetField, fxValue, setValueOptions)
      } else if (fromField === INPUTRECIEVE) {
        const targetRate = data[currenciesPicked[fromField]]
        const fxValue = isNaN(parsedValue) ? '' : (parsedValue / targetRate).toString()
        setValue(targetField, fxValue, setValueOptions)
      }
    },
    [data, currenciesPicked, errors, setValue],
  )

  console.log('render converter & errors: ', errors)

  return (
    <>
      <View style={styles.root}>
        <CurrencyInputWithButton
          name={INPUTSEND}
          partnerField={INPUTRECIEVE}
          form={form}
          onEditing={createOnEdit(INPUTSEND)}
          errors={errors}
          isLoading={isLoading}
          currency={currenciesPicked[INPUTSEND]}
          currencyBtnPressed={currencyBtnPressed(INPUTSEND)}
          editable={!isEmpty(data)}
        />
        <CurrencyInputWithButton
          name={INPUTRECIEVE}
          partnerField={INPUTSEND}
          form={form}
          onEditing={createOnEdit(INPUTRECIEVE)}
          errors={errors}
          isLoading={isLoading}
          currency={currenciesPicked[INPUTRECIEVE]}
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
