import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {
  ViroARSceneNavigator,
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

      placeData.map((item, index) => {
        const ar = transformPointToAR(item.lat, item.lng, latitude, longitude);
        placeData[index] = {...item, ...ar};
      });

      this.setState({arData: placeData, isLoading: false});
    }
  };

  _renderCardView = ({item, index}) => {
    const {latitude, longitude} = this.state;
    const distance = getDistance(item.lat, item.lng, latitude, longitude, 'K');
    const scale = getScale(distance, 1, 10) * 20;

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

  _arScene = () => {
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
  };

  render() {
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
