import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList, RouteNames} from './src/Navigators/RouteNames';
import HomeScreen from './src/Screens/Home/HomeScreen';
import ControlScreen from './src/Screens/Menu/ControlScreen';

import LoginScreen from './src/Screens/Login/LoginScreen';
import TeslaWebViewScreen from './src/Screens/Login/TeslaWebviewScreen';
import ClimateScreen from './src/Screens/Menu/ClimateScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={RouteNames.LoginScreen}
        screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name={RouteNames.LoginScreen}
          component={LoginScreen}
        />

        <RootStack.Screen
          name={RouteNames.TeslaWebViewScreen}
          component={TeslaWebViewScreen}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name={RouteNames.HomeScreen}
          component={HomeScreen}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name={RouteNames.ControlScreen}
          component={ControlScreen}
          options={{gestureEnabled: false}}
        />

        <RootStack.Screen
          name={RouteNames.ClimateScreen}
          component={ClimateScreen}
          options={{gestureEnabled: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
