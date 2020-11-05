import React, {Component} from 'react';
import {ViroARSceneNavigator} from 'react-viro';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import DemoArScreen from './DemoArScreen';

const initSharedProps = {
  apiKey: '06232B7B-00EF-49D5-89F2-A254942824C6',
};

const degree_update_rate = 3;

export default class ARScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedProps: initSharedProps,
      latitude: 0,
      longitude: 0,
    };
  }

  componentDidMount() {
    this._currentLocation();
  }

  componentWillUnmount() {}

  _currentLocation() {
    // console.log('Current location');
    Geolocation.getCurrentPosition((info) => {
      const {latitude, longitude} = info.coords;
      this.setState({latitude, longitude});
    });
  }

  render() {
    const {latitude, longitude} = this.state;

    return (
      <>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: DemoArScreen}}
        />
        <View style={styles.container}>
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
