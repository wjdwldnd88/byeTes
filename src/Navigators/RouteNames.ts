export enum RouteNames {
  LoginScreen = 'LoginScreen',
  TeslaWebViewScreen = 'TeslaWebViewScreen',
  HomeScreen = 'HomeScreen',
  ControlScreen = 'ControlScreen',
}

export type RootStackParamList = {
  [RouteNames.LoginScreen]: undefined;
  [RouteNames.TeslaWebViewScreen]: undefined;
  [RouteNames.HomeScreen]: undefined;
  [RouteNames.ControlScreen]: undefined;
};
