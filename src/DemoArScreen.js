import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroCamera,
  ViroText,
  ViroConstants,
  ViroSpotLight,
  ViroARPlane,
  ViroBox,
  ViroFlexView,
} from 'react-viro';
import CompassHeading from 'react-native-compass-heading';
import proj4 from 'proj4';

const myLocation = {lat: 13.9042591, lng: 100.5297379};
const kickArena = {lat: 13.9054527, lng: 100.5233223};
const summerGarden = {lat: 13.9057969, lng: 100.5287386};
const central = {lat: 13.9035076, lng: 100.5284241};
const health = {lat: 13.9040363, lng: 100.5313903};
const proudCondo = {lat: 13.90677, lng: 100.5306573};

export default function DemoArScreen() {
  const [compassHeading, setCompassHeading] = useState(0);
  const [directionValue, setDirectionValue] = useState(0);

  useEffect(() => {
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, (degree) => {
      setCompassHeading(Math.round(degree));
      CompassHeading.stop();
    });

    const vehicle = vehicleBearing(kickArena, myLocation);
    const compassReading = Math.round(vehicle.compassReading);
    setDirectionValue(compassReading);

    return () => {
      CompassHeading.stop();
    };
  }, []);

  //
  //
  //
  //
  //

  let result = directionValue;
  if (compassHeading > 0) {
    const newCompass =
      compassHeading > 180 ? compassHeading - 360 : compassHeading;

    result = directionValue - newCompass;

    if (result < -180) {
      result = 360 - Math.abs(result);
    }

    if (result > 0) {
      result = -result;
    } else {
      result = Math.abs(result);
    }

    // console.log('result:', result);
  }

  //
  //
  //
  //
  //

  function vehicleBearing(end, start) {
    let x1 = end.lat;
    let y1 = end.lng;
    let x2 = start.lat;
    let y2 = start.lng;

    let radians = getAtan2(y1 - y2, x1 - x2);

    function getAtan2(y, x) {
      return Math.atan2(y, x);
    }

    let compassReading = radians * (180 / Math.PI);

    let coordNames = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    let coordIndex = Math.round(compassReading / 45);
    if (coordIndex < 0) {
      coordIndex = coordIndex + 8;
    }
    return {
      compassString: coordNames[coordIndex],
      compassReading,
    };
  }

  return (
    <ViroARScene>
      <ViroCamera position={[0, 0, 0]} rotation={[0, result, 0]} active={false}>
        <ViroFlexView
          position={[0, 0, -5]}
          style={styles.titleContainer}
          height={0.5}
          width={1}>
          <ViroText
            text={'Hello'}
            scale={[0.5, 0.5, 0.5]}
            style={styles.helloWorldTextStyle}
          />
        </ViroFlexView>
      </ViroCamera>
    </ViroARScene>
  );
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: 'steelblue',
    padding: 0.2,
  },
});
