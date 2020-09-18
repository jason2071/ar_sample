import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapboxGL from '@react-native-mapbox-gl/maps';

// import HomeScreen from './src/HomeScreen';
// import ARScreen from './src/ARScreen';
// import MapScreen from './src/MapScreen';
// import MapArScreen from './src/MapArScreen';
import ArDetectScreen from './src/ArDetectScreen';
import DetailScreen from './src/DetailScreen';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiamFzb24yMDcxIiwiYSI6ImNrY3k2ejdkbTA3M20yeHF5dXdkOTkxY2UifQ.BiaEMoBauhyBgDqd129F1A',
);

const RootStack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Detect"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <RootStack.Screen name="Detect" component={ArDetectScreen} />
        <RootStack.Screen name="Detail" component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
