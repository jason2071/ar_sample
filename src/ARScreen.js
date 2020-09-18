import React, {Component} from 'react';
import {ViroARSceneNavigator, ViroUtils} from 'react-viro';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import CompassHeading from 'react-native-compass-heading';

import ARTrackingTarget from './ARTrackingTarget';
import ARTrackingText from './ARTrackingText';

const initSharedProps = {
  apiKey: '06232B7B-00EF-49D5-89F2-A254942824C6',
};

const isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;
const degree_update_rate = 3;

export default class ARScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedProps: initSharedProps,
      latitude: 0,
      longitude: 0,
      compassHeading: 0,
    };
  }

  componentDidMount() {
    isARSupportedOnDevice(this._handleARNotSupported, this._handleARSupported);

    this._currentLocation();
    this._compassHeading();
  }

  componentWillUnmount() {
    CompassHeading.stop();
  }

  _compassHeading() {
    CompassHeading.start(degree_update_rate, (degree) => {
      this.setState({compassHeading: degree});
    });
  }

  _currentLocation() {
    // console.log('Current location');
    Geolocation.getCurrentPosition((info) => {
      const {latitude, longitude} = info.coords;
      this.setState({latitude, longitude});
    });
  }

  _handleARSupported() {
    // console.log('AR supported');
  }
  _handleARNotSupported(reason) {
    // console.log('AR not supported, with reason: ' + reason);
  }

  render() {
    const {latitude, longitude, compassHeading} = this.state;

    return (
      <>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: ARTrackingText}}
        />
        <View style={styles.container}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('./res/compass.png')}
              style={[
                {width: 70, height: 70},
                {transform: [{rotate: `${360 - compassHeading}deg`}]},
              ]}
            />
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{latitude}</Text>
            <Text>{longitude}</Text>
          </View>

          <TouchableOpacity
            onPress={() => this._currentLocation()}
            style={{
              width: 70,
              height: 40,
              backgroundColor: '#318fb5',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}>
            <Text style={{fontSize: 12, color: '#fff', paddingHorizontal: 4}}>
              Calibrate
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 16,
    paddingHorizontal: 12,
  },
});
