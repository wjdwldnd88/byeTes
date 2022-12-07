import {IControlScreenProps} from '../Screens/Menu/ControlScreen';
import {IClimateScreenProps} from '../Screens/Menu/ClimateScreen';

export enum RouteNames {
  LoginScreen = 'LoginScreen',
  TeslaWebViewScreen = 'TeslaWebViewScreen',
  HomeScreen = 'HomeScreen',
  ControlScreen = 'ControlScreen',
  ClimateScreen = 'ClimateScreen',
}

export type RootStackParamList = {
  [RouteNames.LoginScreen]: undefined;
  [RouteNames.TeslaWebViewScreen]: undefined;
  [RouteNames.HomeScreen]: undefined;
  [RouteNames.ControlScreen]: IControlScreenProps;
  [RouteNames.ClimateScreen]: IClimateScreenProps;
};
