import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },

  container: {
    padding: 10,
    flex: 1,
  },

  carName: {
    color: '#CCCCCC',
    fontSize: 25,
    fontWeight: '200',
    marginVertical: 3,
  },

  beteryStatus: {
    color: '#CCCCCC',
    fontSize: 18,
    fontWeight: '200',
    marginVertical: 1,
  },

  carStatus: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '200',
    marginVertical: 1,
  },

  menuList: {
    backgroundColor: 'black',
    // flex: 1,
    borderTopRadius: 10, // to provide rounded corners
    marginHorizontal: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },

  button: {
    elevation: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 5,
  },

  serverStatusButton: {
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
  },

  backgroundGreen: {
    backgroundColor: 'green',
  },

  backgroundRed: {
    backgroundColor: 'red',
  },

  carOutLook: {
    marginVertical: 20,
    width: '100%',
    height: 220,
  },
});
