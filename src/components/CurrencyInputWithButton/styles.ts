import { StyleSheet } from 'react-native'

export const currencyInputWithButtonStyles = StyleSheet.create({
  outterContainer: { marginHorizontal: '10%' },
  inputBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
  },
  inputContainer: {
    overflow: 'hidden',
    borderRadius: 0,
  },
  input: {
    width: '78%',
    height: 50,
  },
  right: {
    borderRadius: 0,
    width: '22%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    height: '100%',
    borderRadius: 0,
    justifyContent: 'center',
    marginBottom: -5,
  },
  errorContainer: {
    paddingTop: 5,
    height: 20,
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
  },
})
