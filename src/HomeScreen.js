import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from '@react-native-community/geolocation';

import DefaultButton from './components/DefaultButton';
import Spacer from './components/Spacer';

const degree_update_rate = 3;
let watchID = null;

export default function HomeScreen({navigation}) {
  const [degree, setDegree] = useState(-1);
  const [myLocation, setMyLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
    disabled: true,
  });

  useEffect(() => {
    CompassHeading.start(degree_update_rate, (degree) => {
      setDegree(degree);
    });

    requestGeoLocation();

    return () => {
      CompassHeading.stop();
      watchID != null && Geolocation.clearWatch(watchID);
    };
  }, []);

  function requestGeoLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          disabled: false,
        });
      },
      (error) => console.log('Geolocation error:', error),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );

    watchID = Geolocation.watchPosition((position) => {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        disabled: false,
      });
    });
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <DefaultButton
        onPress={() => navigation.navigate('ProductShowCase')}
        title="ProductShowCase"
      />

      <Spacer />

      <DefaultButton
        disabled={myLocation.disabled}
        onPress={() => navigation.navigate('ar', {degree, myLocation})}
      />

      <View style={{height: 20}} />

      <Text>{`degree: ${degree}`}</Text>
      <Text>{`location: ${myLocation.latitude}, ${myLocation.longitude}`}</Text>
    </View>
  );
}
