import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {ViroText, ViroFlexView, ViroARScene} from 'react-viro';
import merc from 'mercator-projection';

import {
  createARObjectPosition,
  getDistanceFromLatLonInKm,
} from './utils/helper';

export class ARTrackingText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRegion: {
        latitude: 13.9036406,
        longitude: 100.5257554,
      },
      central: {
        latitude: 13.9039975,
        longitude: 100.5272524,
      },
      summer: {
        latitude: 13.9057794,
        longitude: 100.5285636,
      },
      jasmine: {
        latitude: 13.9064254,
        longitude: 100.5299659,
      },
      centralObject: null,
      centralDistance: 0,
      summerObject: null,
      summerDistance: 0,
      jasmineObject: null,
      jasmineDistance: 0,
    };
  }

  componentDidMount() {
    this._convert();
    this._distance();
  }

  _convert() {
    const {myRegion, central, summer, jasmine} = this.state;

    const jasmineObject = this.transformGpsToAR(
      myRegion.latitude,
      myRegion.longitude,
      jasmine.latitude,
      jasmine.longitude,
    );

    this.setState({jasmineObject});

    console.log(jasmineObject);
  }

  _distance() {
    const {myRegion, central, summer, jasmine} = this.state;

    const centralDistance = getDistanceFromLatLonInKm(
      myRegion.latitude,
      myRegion.longitude,
      central.latitude,
      central.longitude,
    ).toFixed(2);

    const summerDistance = getDistanceFromLatLonInKm(
      myRegion.latitude,
      myRegion.longitude,
      summer.latitude,
      summer.longitude,
    ).toFixed(2);
    const jasmineDistance = getDistanceFromLatLonInKm(
      myRegion.latitude,
      myRegion.longitude,
      jasmine.latitude,
      jasmine.longitude,
    ).toFixed(2);

    this.setState({
      centralDistance,
      summerDistance,
      jasmineDistance,
    });
  }

  transformGpsToAR(fromLat, formLong, toLat, toLong) {
    const deviceObjPoint = merc.fromLatLngToPoint({lat: toLat, lng: toLong}); // see previous post for code.
    const mobilePoint = merc.fromLatLngToPoint({
      lat: fromLat,
      lng: formLong,
    });

    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    if (Platform.OS === 'android') {
      let degree = 90; // not using real compass yet.
      let angleRadian = (degree * Math.PI) / 180;

      let newObjX =
        objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
      let newObjY =
        objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);

      return {x: newObjX, z: -newObjY};
    }

    return {x: objDeltaX, z: -objDeltaY};
  }

  render() {
    const {
      centralDistance,
      summerDistance,
      jasmineDistance,
      jasmineObject,
    } = this.state;

    const newCentralDistance = `${centralDistance * 1000} m`;
    const newSummerDistance = `${summerDistance * 1000} m`;
    const newJasmineDistance = `${jasmineDistance * 1000} m`;

    if (!jasmineObject) return null;

    return (
      <ViroARScene>
        {/* Central */}
        {/* <ViroFlexView
          style={styles.titleContainer}
          position={[-3.8, 1.1, -7]}
          rotation={[0, 40, 0]}
          height={2}
          width={4}>
          <ViroText style={styles.prodDescriptionText} text={'Central Plaza'} />

          <ViroText
            style={styles.prodDescriptionText}
            text={newCentralDistance}
          />
        </ViroFlexView> */}

        {/* Summer */}
        {/* <ViroFlexView
          style={styles.titleContainer}
          position={[-3.8, -1.1, -7]}
          rotation={[0, 40, 0]}
          height={2}
          width={4}>
          <ViroText style={styles.prodDescriptionText} text={'Summer Garden'} />

          <ViroText
            style={styles.prodDescriptionText}
            text={newSummerDistance}
          />
        </ViroFlexView> */}

        {/* Other */}
        <ViroFlexView
          style={styles.titleContainer}
          position={[jasmineObject.x, 0, jasmineObject.z]}
          rotation={[0, -40, 0]}
          height={1}
          width={2}>
          <ViroText style={styles.prodDescriptionText} text={'Jasmine'} />

          <ViroText
            style={styles.prodDescriptionText}
            text={newJasmineDistance}
          />
        </ViroFlexView>
      </ViroARScene>
    );
  }
}

export default ARTrackingText;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  priceText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#aa3c3c',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 4,
  },
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: 'steelblue',
    padding: 0.2,
  },
  navButtonText: {
    fontFamily: 'sans-serif-light',
    fontSize: 15,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
});
