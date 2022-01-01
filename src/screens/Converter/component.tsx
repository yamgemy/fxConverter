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
    reValidateMode: 'onBlur',
    defaultValues: {
      [INPUTSEND]: '',
      [INPUTRECIEVE]: '',
    },
  })

  const onSubmitConvert = useCallback(() => {
    console.log('on crate transacton pressed')
  }, [])

  const createOnEdit = React.useCallback((fieldName) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('onEDit', fieldName + ' ' + e.target.value)
    }
  }, [])

  const inputValues: string[] = form.watch([INPUTSEND, INPUTRECIEVE]) //this rerender the component always

  console.log('render converter')

  return (
    <View style={styles.root}>
      <HookFormInputRightButton
        name={INPUTSEND}
        form={form}
        onEditing={createOnEdit(INPUTSEND)}
      />
      <HookFormInputRightButton
        name={INPUTRECIEVE}
        form={form}
        onEditing={createOnEdit(INPUTRECIEVE)}
      />
      <HookFormButton
        form={form}
        onClick={onSubmitConvert}
        label={'Create Transaction'}
        inputsFilled={Object.values(inputValues).join('').length > 0}
      />
    </View>
  )
}
export default ConverterScreen
