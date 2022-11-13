import {NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-url-polyfill/auto';
import {refreshAuthInfo} from '../../Api/Login';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {readAuthInfo} from '../../RealmDB/Schema';

type IProps = NativeStackScreenProps<
  RootStackParamList,
  RouteNames.LoginScreen
>;

const LoginScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;

  useEffect(() => {
    readAuthInfo()
      .then(async authData => {
        // db 에서 access token이 없으면 처음부터 로그인
        if (!authData) {
          navigation.navigate(RouteNames.TeslaWebViewScreen);

          return;
        }

        const {date, expires_in, refresh_token} = authData;

        // 만료된 경우 refresh token 을 사용
        const expireDate = dayjs(date).add(expires_in, 'seconds');

        if (dayjs().isAfter(expireDate)) {
          const isRefresh = await refreshAuthInfo(refresh_token);

          if (!isRefresh) {
            navigation.navigate(RouteNames.TeslaWebViewScreen);

            return;
          }
        }

        navigation.navigate(RouteNames.HomeScreen);
      })
      .catch(() => {
        // 에러 시 처음부터 로그인
        navigation.navigate(RouteNames.TeslaWebViewScreen);
      });
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />

        <Text>로그인중입니다.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
