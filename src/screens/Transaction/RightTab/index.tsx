import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import { Text, Button, TextInput, IconButton } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import Snackbar from 'react-native-snackbar'
import { useAppDispatch, useAppSelector } from '../../../hooks/appReduxHooks'
import {
  actionRemoveTransactionEntry,
  actionSetBankTransactionEntry,
} from '../../../redux/actions/actions'
import { RightTabProps } from './RightTabProps'
import { INPUTBANK, SNACKBAROPTIONS_DELETE, SNACKBAROPTIONS_SENT } from './contants'
import { bankNameSchema } from '../../../helpers/formValidator'
import { isEmpty } from 'lodash'
import { RootState } from '../../../redux/reducers'
import { INPUTRECIEVE, INPUTSEND } from '../../Converter/constants'
import { getTimeZone } from 'react-native-localize'
import { rightTabStyles as sty } from './styles'

import { labels } from './contants'
const RightTab: FC<RightTabProps> = ({
  jumpTo,
  selectedTransactionId = '',
  setSelectedTransactionId,
}) => {
  const dispatch = useAppDispatch()
  const timeZoneCode = getTimeZone()
  const [continent, country] = timeZoneCode.split('/')
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
    Snackbar.show(SNACKBAROPTIONS_DELETE)
  }, [selectedTransactionId])

  const sendMoneyPressed = useCallback(() => {
    dispatch(
      actionSetBankTransactionEntry({
        timeStringKey: selectedTransactionId,
        recipientBank: getValues(INPUTBANK),
      }),
    )
    reset()
    Snackbar.show(SNACKBAROPTIONS_SENT)
  }, [selectedTransactionId])

  const returnToRightTab = useCallback(() => {
    jumpTo('first')
  }, [])

  return (
    <View style={sty.tabContainer}>
      <IconButton
        icon={'arrow-left-bold-outline'}
        style={sty.returnbutton}
        size={25}
        onPress={returnToRightTab}>
        Back to transactions
      </IconButton>
      {transactionEntry && (
        <View>
          <View style={sty.infoRow}>
            <Text style={sty.labelText}>
              {transactionEntry.done ? labels.done[0] : labels.notDone[0]}
            </Text>
            <Text style={sty.infoText}>
              {transactionEntry[INPUTSEND].val} {transactionEntry[INPUTSEND].currency}
            </Text>
          </View>

          <View style={sty.infoRow}>
            <Text style={sty.labelText}>
              {transactionEntry.done ? labels.done[1] : labels.notDone[1]}
            </Text>
            <Text style={sty.infoText}>
              {transactionEntry[INPUTRECIEVE].val}{' '}
              {transactionEntry[INPUTRECIEVE].currency}
            </Text>
          </View>

          <View style={sty.infoRow}>
            <Text style={sty.labelText}>{labels.created}</Text>
            <Text style={sty.infoText}>
              {new Date(transactionEntry.time).toLocaleString('uk-UA', {
                timeZone: timeZoneCode,
              })}{' '}
              {country} time
            </Text>
          </View>

          {!transactionEntry.done && (
            <View style={sty.bankRow}>
              <Text style={sty.labelText}>{labels.bank[1]}</Text>
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
              <View style={sty.errorContainer}>
                <ErrorMessage
                  errors={errors}
                  name={INPUTBANK}
                  render={({ message }) => <Text style={sty.errorText}>{message}</Text>}
                />
              </View>
            </View>
          )}
          {!transactionEntry.done && (
            <View style={sty.buttonsRow}>
              <Button
                disabled={!isEmpty(errors) || !isDirty || getValues(INPUTBANK) === ''}
                onPress={sendMoneyPressed}
                style={sty.button}
                mode={'contained'}>
                Send Money
              </Button>
              <Button mode={'contained'} onPress={onDeleteEntry} style={sty.button}>
                Delete
              </Button>
            </View>
          )}
          {transactionEntry.done && transactionEntry.recipientBank !== '' && (
            <View style={sty.infoRow}>
              <Text style={sty.labelText}>{labels.bank[0]}</Text>
              <Text style={sty.infoText}>{transactionEntry.recipientBank}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default React.memo(RightTab)
