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
  },

  beteryStatus: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '200',
  },

  carStatus: {
    color: '#CCCCCC',
    fontSize: 10,
    fontWeight: '200',
  },

  card: {
    backgroundColor: 'black',
    // flex: 1,
    borderTopRadius: 10, // to provide rounded corners
    marginHorizontal: 10,
    overflow: 'hidden',
  },

  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },

  text1: {
    color: '#fff',
    fontSize: 20,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },

  button1: {
    elevation: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  image: {
    width: '100%',
    height: 220,
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
    width: '100%',
    height: 220,
  },
});
