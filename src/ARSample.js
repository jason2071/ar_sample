import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  ViroARScene,
  ViroConstants,
  ViroText,
  ViroFlexView,
  ViroCamera,
} from 'react-viro';

import {placeData} from './data/mocks';
import {
  transformPointToAR,
  getDistance,
  getScale,
} from './utils/distance.helper';

export class ARSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 13.9044504,
      longitude: 100.5299397,
      degree: -1,
      arData: null,
    };
  }

  watchID = null;

  componentDidMount() {
    // this.requestGeoLocation();
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  requestGeoLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log('Geolocation error:', JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );

    this.watchID = Geolocation.watchPosition((position) => {
      this.setState({lastPosition: position});
    });
  };

  _renderCardView = ({item, index}) => {
    const {latitude, longitude} = this.state;
    const distance = getDistance(item.lat, item.lng, latitude, longitude, 'K');
    const scale = getScale(distance, 1, 10);

    return (
      <ViroFlexView
        key={`place-ar-${index}-${item.distance}`}
        style={styles.titleContainer}
        scale={[scale, scale, scale]}
        position={[item.x, 0, item.z]}
        height={2}
        width={4}
        transformBehaviors={'billboard'}>
        <ViroFlexView style={styles.rowContainer}>
          <ViroText text={item.name} style={styles.prodTitleText} />
        </ViroFlexView>

        <ViroFlexView style={styles.divider} />

        <ViroFlexView style={styles.rowContainer}>
          <ViroText
            text={`${distance.toFixed(2)} KM`}
            style={styles.prodDescriptionText}
          />
        </ViroFlexView>
      </ViroFlexView>
    );
  };

  render() {
    const {degree, arData} = this.state;

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {degree > -1 && (
          <ViroCamera
            position={[0, 0, 0]}
            rotation={[0, degree, 0]}
            active={false}>
            {arData &&
              arData.map((item, index) => this._renderCardView({item, index}))}
          </ViroCamera>
        )}
      </ViroARScene>
    );
  }

  _onInitialized = (state) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      const {latitude, longitude} = this.state;

      placeData.map((item, index) => {
        const ar = transformPointToAR(item.lat, item.lng, latitude, longitude);
        placeData[index] = {...item, ...ar};
      });

      this.setState({arData: placeData});
    }
  };
}

export default ARSample;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: 'steelblue',
    padding: 0.2,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  prodTitleText: {
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  prodDescriptionText: {
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  divider: {
    width: 3.5,
    height: 0.02,
    backgroundColor: 'white',
  },
});
