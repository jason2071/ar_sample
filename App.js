import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ArDetectScreen from './src/ArDetectScreen';
import DetailScreen from './src/DetailScreen';

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
