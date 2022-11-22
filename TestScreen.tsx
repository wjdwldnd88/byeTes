import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const appTitle = 'Tesla';

const TestScreen = (): JSX.Element => {
  const [count, setCount] = useState(0);
  //let count = 0;
  // const onPress = () => setCount(prevCount => prevCount + 1);
  const onPress = () => {
    setCount(count + 1);
    console.log('count', count);
  };
  const onPress_2 = () => {
    setCount(0);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.appTitle}>{appTitle}</Text>

        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="Add an item!" />

          <View style={styles.container}>
            <Text style={styles.text1}>Count: {count}</Text>

            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text>눌러</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onPress_2}>
              <Text>눌러2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    // backgroundColor: '#CC0000',
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
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
});

export default TestScreen;
