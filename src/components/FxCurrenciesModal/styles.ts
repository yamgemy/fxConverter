import { StyleSheet } from 'react-native'

export const fxCurrenriesModalStyles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: '100%',
    width: '80%',
    padding: '3%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  currencyItem: {
    padding: 5,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  separator: { height: 1, backgroundColor: 'gray', width: '100%' },
  abbrev: {
    fontWeight: 'bold',
    marginRight: 10,
  },
})
