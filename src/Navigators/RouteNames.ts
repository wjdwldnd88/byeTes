import { IClimateScreenProps } from '../Screens/Menu/ClimateScreen';
import { IControlScreenProps } from '../Screens/Menu/ControlScreen';
import { ICStatisticsScreenProps } from "../Screens/Menu/StatisticsScreen";

export enum RouteNames {
  LoginScreen = 'LoginScreen',
  TeslaWebViewScreen = 'TeslaWebViewScreen',
  HomeScreen = 'HomeScreen',
  ControlScreen = 'ControlScreen',
  ClimateScreen = 'ClimateScreen',
  StatisticsScreen = 'StatisticsScreen'
}

export type RootStackParamList = {
  [RouteNames.LoginScreen]: undefined;
  [RouteNames.TeslaWebViewScreen]: undefined;
  [RouteNames.HomeScreen]: undefined;
  [RouteNames.ControlScreen]: IControlScreenProps;
  [RouteNames.ClimateScreen]: IClimateScreenProps;
  [RouteNames.StatisticsScreen]: ICStatisticsScreenProps;
};
