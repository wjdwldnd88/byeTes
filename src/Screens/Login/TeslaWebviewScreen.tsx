import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-url-polyfill/auto';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {makeAuthInfo, redirectUrl} from '../../Api/Login';
import {RootStackParamList, RouteNames} from '../../Navigators/RouteNames';
import {encryptSHA256, makeRandomString} from '../../Utils';

type IProps = NativeStackScreenProps<
  RootStackParamList,
  RouteNames.TeslaWebViewScreen
>;

const TeslaWebViewScreen = (props: IProps): JSX.Element => {
  const {navigation} = props;

  const authUri = 'https://auth.tesla.com/oauth2/v3/authorize';

  const codeVerifier = makeRandomString(86);

  const hashedCode = encryptSHA256(codeVerifier);

  const handleMessage = async (data: WebViewMessageEvent) => {
    const url = new URL(data.nativeEvent.url);

    if (!url.searchParams.has('code')) {
      return;
    }
    const code = url.searchParams.get('code')!;

    console.log(code);

    const isLogin = await makeAuthInfo(code, codeVerifier);

    if (!isLogin) {
      //TODO: 로그인 실패 시 추가적인 안내 스크린 필요
      return;
    }

    navigation.navigate(RouteNames.HomeScreen);
  };
  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: `${authUri}?client_id=ownerapi&code_challenge=${hashedCode}&code_challenge_method=S256&redirect_uri=${redirectUrl}&response_type=code&scope=openid+email+offline_access&state=NGU3OGVkMjY5Yzk0`,
        }}
        injectedJavaScript={runFirst}
        onMessage={handleMessage}
        incognito={true}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TeslaWebViewScreen;
