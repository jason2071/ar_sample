import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import ARScreen from './src/ARScreen';
import ProductShowCase from './src/ProductShowCase';

const RootStack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: true,
          animationEnabled: false,
        }}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="ar" component={ARScreen} />
        <RootStack.Screen name="ProductShowCase" component={ProductShowCase} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
