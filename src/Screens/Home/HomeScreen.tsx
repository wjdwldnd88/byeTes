import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import 'react-native-url-polyfill/auto';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {readAuthInfo} from '../../RealmDB/Schema';

type IProps = NativeStackScreenProps<RootStackParamList, RouteNames.HomeScreen>;

const HomeScreen = (props: IProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    readAuthInfo().then(authData => {
      setAccessToken(authData?.access_token || '');
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>임시 홈 스크린입니다</Text>

        <Text>Access code : </Text>

        <Text>{accessToken}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
