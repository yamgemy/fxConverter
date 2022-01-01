import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import { FieldName, useForm } from 'react-hook-form'
import { styles } from './styles'
import { InitialSampleScreenProps } from './types'
import { converterSchema } from '../../helpers/formValidator'
import HookFormInputRightButton from '../../components/HookFormInputRightButton'
import HookFormButton from '../../components/HookFormButton'

export interface IFormInputsValues {
  inputSend: string
  inputRecieve: string
}

const INPUTSEND: FieldName<IFormInputsValues> = 'inputSend'
const INPUTRECIEVE: FieldName<IFormInputsValues> = 'inputRecieve'

const ConverterScreen: FC<InitialSampleScreenProps> = ({ navigation, route }) => {
  const form = useForm<IFormInputsValues>({
    resolver: converterSchema,
    shouldFocusError: true,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      [INPUTSEND]: '',
      [INPUTRECIEVE]: '',
    },
  })

  const {
    watch,
    formState: { errors },
  } = form

  const inputsFilled = watch([INPUTSEND, INPUTRECIEVE]).join('').length > 0 //form.getValues wont work

  const onSubmitConvert = useCallback(() => {
    //TODO still rerenders excessively?
    const inputValues1: string[] = watch([INPUTSEND, INPUTRECIEVE])
    console.log('on crate transacton pressed ', inputValues1)
  }, [watch])

  const createOnEdit = React.useCallback((fieldName) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('onEDit', fieldName + ' ' + e.target.value)
    }
  }, [])

  console.log('render converter', errors)

  return (
    <View style={styles.root}>
      <HookFormInputRightButton
        name={INPUTSEND}
        form={form}
        onEditing={createOnEdit(INPUTSEND)}
        errors={errors}
      />
      <HookFormInputRightButton
        name={INPUTRECIEVE}
        form={form}
        onEditing={createOnEdit(INPUTRECIEVE)}
        errors={errors}
      />
      <HookFormButton
        form={form}
        onClick={onSubmitConvert}
        label={'Create Transaction'}
        inputsFilled={inputsFilled}
      />
    </View>
  )
}
export default ConverterScreen
