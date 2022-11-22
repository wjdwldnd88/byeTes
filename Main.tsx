import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const carName = 'carName';
const carStatus = 'carStatus';
const beteryStatus = 'beteryStatus';

const onPress = () => {};

const Main = (): JSX.Element => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{padding: 10, flex: 0.5}}>
        <Text style={styles.carName}>{carName}</Text>

        <Text style={styles.beteryStatus}>{beteryStatus}</Text>

        <Text style={styles.carStatus}>{carStatus}</Text>

        <View>
          <Image
            source={require('../byeTes/assets/image/myTesla.jpg')}
            style={styles.image}
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>컨트롤</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>내부온도</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>제로백</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>베터리통계</Text>
          </TouchableOpacity>
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
  carName: {
    color: '#CCCCCC',
    fontSize: 25,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
    // backgroundColor: '#CC0000',
  },
  beteryStatus: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
    // backgroundColor: '#CC0000',
  },
  carStatus: {
    color: '#CCCCCC',
    fontSize: 10,
    fontWeight: '200',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left',
    padding: 0,
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
  image: {
    width: '100%',
    height: 230,
  },
});

export default Main;
