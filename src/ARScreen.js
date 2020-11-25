import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroConstants,
  ViroText,
  ViroFlexView,
  ViroCamera,
  ViroMaterials,
  ViroSound,
} from 'react-viro';

import projector from 'ecef-projector';

import {placeData, objectData} from './data/mocks';
import {
  transformPointToAR,
  getDistance,
  getScale,
} from './utils/distance.helper';

const initSharedProps = {
  apiKey: '06232B7B-00EF-49D5-89F2-A254942824C6',
};

export default class ARScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedProps: initSharedProps,
      latitude: 0.0,
      longitude: 0.0,
      degree: -1,
      arData: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const degree = this.props.route.params.degree;
    const myLocation = this.props.route.params.myLocation;
    this.setState({
      degree,
      latitude: myLocation.latitude,
      longitude: myLocation.longitude,
    });
  }

  _onInitialized = (state) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      const {latitude, longitude} = this.state;

      objectData.map((item, index) => {
        const ar = transformPointToAR(item.lat, item.lng, latitude, longitude);
        objectData[index] = {...item, ...ar};
      });

      this.setState({arData: objectData, isLoading: false});
    }
  };

  _renderCardView = ({item, index}) => {
    const {latitude, longitude, degree} = this.state;
    const distance = getDistance(item.lat, item.lng, latitude, longitude);

    const distanceText =
      distance > 1000
        ? `${Math.round(distance / 1000)} กิโลเมตร`
        : `${Math.round(distance)} เมตร`;

    const disKm = distance / 1000;
    let scale = getScale(distance, 1, 2);

    if (disKm > 700) {
      scale = getScale(distance, 1, disKm * 30);
    } else if (disKm > 600) {
      scale = getScale(distance, 1, disKm * 25);
    } else if (disKm > 100) {
      scale = getScale(distance, 1, disKm * 20);
    } else if (disKm > 60) {
      scale = getScale(distance, 1, disKm * 10);
    }

    console.log('distance', distance / 1000);
    console.log('scale', scale);

    return (
      <ViroCamera
        key={`place-ar-${index}`}
        position={[0, 0, 0]}
        rotation={[0, degree, 0]}
        active={false}>
        <ViroFlexView
          style={styles.titleContainer}
          scale={[scale, scale, scale]}
          position={[item.x, 0, item.z]}
          height={2.5}
          width={4}
          materials="marker"
          transformBehaviors={'billboard'}>
          <ViroFlexView style={styles.rowContainer}>
            <ViroText
              text={'สวัสดีครับ Welcome'}
              style={styles.prodTitleText}
            />
          </ViroFlexView>

          <ViroFlexView style={styles.divider} />

          <ViroFlexView style={styles.rowContainer}>
            <ViroText text={distanceText} style={styles.prodDescriptionText} />
          </ViroFlexView>
        </ViroFlexView>
      </ViroCamera>
    );
  };

  _arScene = () => {
    const {degree, arData} = this.state;

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {degree > -1 &&
          arData &&
          arData.map((item, index) => this._renderCardView({item, index}))}
      </ViroARScene>
    );
  };

  render() {
    ViroMaterials.createMaterials({
      marker: {
        diffuseTexture: require('./assets/images/tag.png'),
      },
    });

    const {isLoading} = this.state;
    return (
      <>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: this._arScene}}
        />

        {isLoading && <Loading />}
      </>
    );
  }
}

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    padding: 0.2,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  prodTitleText: {
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'top',
    textAlign: 'left',
    flex: 1,
    fontFamily: 'sans-serif-light',
  },
  prodDescriptionText: {
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'top',
    textAlign: 'left',
    flex: 1,
    fontFamily: 'sans-serif-light',
  },
  divider: {
    width: 3.5,
    height: 0.02,
    backgroundColor: 'white',
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
