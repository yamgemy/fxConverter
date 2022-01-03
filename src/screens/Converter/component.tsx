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
  const [selectedCurrencyButton, setSelectedCurrencyButton] = useState(null) //TODO: move to redux
  const [currenciesPicked, setCurrenciesPicked] = useState({
    //TODO: move to redux
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
  const queryClient = useQueryClient()
  const { data, isLoading = false } = useQuery('queryFX', requestFxRates('USD'), {
    refetchInterval: 60 * 5 * 1000, //this rerenders the component
    initialData: {},
    onSuccess: (res) => {
      console.log('res', res)
      queryClient.setQueryData('queryFx', Object.assign({}, res)) //TODO DOES NOT WORK
    },
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

  //TODO set new fx value on THE OTHER input, maybe useCallback
  const onItemPicked = (item) => {
    return async () => {
      setCurrenciesPicked((prevState) => {
        //TODO move to saga
        return {
          ...prevState,
          [selectedCurrencyButton]: item,
        }
      })
      setIsModalOpen(false)
      //fetch if button is send
      const fromValue = getValues(INPUTRECIEVE)
      if (selectedCurrencyButton === INPUTSEND) {
        console.log('hey')

        await queryClient.fetchQuery('queryFX', requestFxRates(item)) //TODO remove after imp saga
        console.log('after refetch', data)

        changeTargetInputValue(INPUTSEND, getValues(INPUTSEND))
      } else {
        changeTargetInputValue(INPUTRECIEVE, getValues(INPUTRECIEVE))
      }
    }
  }

  const onSubmitConvert = useCallback(() => {
    //TODO using watch still rerenders excessively?
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

  const changeTargetInputValue = (fromField, fromValue) => {
    if (!fromField || isEmpty(data)) {
      return
    }
    const parsedValue = parseFloat(fromValue)
    const targetField = fromField === INPUTSEND ? INPUTRECIEVE : INPUTSEND
    //fromValue = fromValue === '' ? 0 : fromValue ///hard cast to avoid parse error
    const setValueOptions = { shouldValidate: true }
    if (fromField === INPUTSEND) {
      const targetRate = data[currenciesPicked[targetField]]
      console.log('A', data)
      console.log('A', currenciesPicked[targetField])
      console.log('A', targetRate + '  ' + parsedValue)
      const fxValue = isNaN(parsedValue) ? '' : (targetRate * parsedValue).toString()
      setValue(targetField, fxValue, setValueOptions)
    } else if (fromField === INPUTRECIEVE) {
      const targetRate = data[currenciesPicked[fromField]]
      const fxValue = isNaN(parsedValue) ? '' : (parsedValue / targetRate).toString()
      setValue(targetField, fxValue, setValueOptions)
    }
  }

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
          currency={currenciesPicked[INPUTSEND]}
          currencyBtnPressed={currencyBtnPressed(INPUTSEND)}
          editable={!isEmpty(data)}
        />
        <CurrencyInputWithButton
          name={INPUTRECIEVE}
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
