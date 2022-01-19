import { StyleSheet } from 'react-native'

export const leftTabStyles = StyleSheet.create({
  tabContainer: { flex: 1, backgroundColor: 'beige' },
  transactionEntryContainer: {
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 5,
    elevation: 4,
  },
  valCurrency: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'beige',
  },
  emptyMessage: {
    fontWeight: '500',
    fontSize: 17,
  },
  valueText: {
    fontWeight: '500',
    fontSize: 15,
  },
})
