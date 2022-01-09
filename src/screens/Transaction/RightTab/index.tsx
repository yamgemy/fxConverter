import React, { FC, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../../hooks/appReduxHooks'
import {
  actionRemoveTransactionEntry,
  actionSetBankTransactionEntry,
} from '../../../redux/actions/actions'
import { RightTabProps } from './RightTabProps'
import { INPUTBANK } from './contants'
import { bankNameSchema } from '../../../helpers/formValidator'
import { isEmpty } from 'lodash'
import { RootState } from '../../../redux/reducers'

const RightTab: FC<RightTabProps> = ({
  jumpTo,
  selectedTransactionId = '',
  setSelectedTransactionId,
}) => {
  const dispatch = useAppDispatch()
  const { transactionEntry } = useAppSelector((state: RootState) => {
    return {
      transactionEntry: state.transactionsReducer.transactions[selectedTransactionId],
    }
  })
  const form = useForm({
    resolver: bankNameSchema,
    shouldFocusError: true,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      [INPUTBANK]: '',
    },
  })

  const {
    register,
    control,
    getValues,
    formState: { errors, isDirty },
    reset,
  } = form

  const onDeleteEntry = useCallback(() => {
    dispatch(
      actionRemoveTransactionEntry({
        timeStringKey: selectedTransactionId, //or transactionEntry.time.toString()
      }),
    )
    jumpTo('first')
    setSelectedTransactionId('') //clear local state at TransactionScreen
    reset()
  }, [])

  const sendMoneyPressed = () => {
    dispatch(
      actionSetBankTransactionEntry({
        timeStringKey: selectedTransactionId,
        recipientBank: getValues(INPUTBANK),
      }),
    )
  }

  console.log('render rightTab', errors)
  return (
    <View style={sty.tabContainer}>
      {transactionEntry && (
        <View>
          <Text>{JSON.stringify(transactionEntry)}</Text>
          {!transactionEntry.done && (
            <Controller
              name={INPUTBANK}
              control={control}
              render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
                return (
                  <TextInput
                    {...register(INPUTBANK)}
                    ref={ref}
                    onChangeText={onChange}
                    theme={{ roundness: 0 }}
                    mode={'outlined'}
                    style={sty.input}
                    keyboardType={'default'}
                    error={!isEmpty(error)}
                  />
                )
              }}
            />
          )}
          {!transactionEntry.done && (
            <View style={sty.buttonsRow}>
              <Button
                disabled={!isEmpty(errors) || !isDirty || getValues(INPUTBANK) === ''}
                onPress={sendMoneyPressed}>
                Send Money
              </Button>
              <Button onPress={onDeleteEntry}>Delete</Button>
            </View>
          )}
          {transactionEntry.done && transactionEntry.recipientBank !== '' && (
            <Text>{transactionEntry.recipientBank}</Text>
          )}
        </View>
      )}
    </View>
  )
}

export default React.memo(RightTab)

const sty = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: '#673ab7',
  },
  input: {
    width: '78%',
    height: 50,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
})
