export enum RouteNames {
  LoginScreen = 'LoginScreen',
  TeslaWebViewScreen = 'TeslaWebViewScreen',
  HomeScreen = 'HomeScreen',
}

export type RootStackParamList = {
  [RouteNames.LoginScreen]: undefined;
  [RouteNames.TeslaWebViewScreen]: undefined;
  [RouteNames.HomeScreen]: undefined;
};