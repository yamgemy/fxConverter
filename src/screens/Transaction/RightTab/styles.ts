import { StyleSheet } from 'react-native'

export const rightTabStyles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: 'beige',
    padding: 15,
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: 5,
  },
  buttonsRow: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    width: '48%',
    justifyContent: 'center',
  },
  infoRow: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankRow: {
    marginVertical: 5,
    alignItems: 'flex-start',
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoText: {
    fontSize: 17,
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
  },
  errorContainer: {
    height: 30,
  },
  returnbutton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0,
    marginLeft: -4,
  },
})
