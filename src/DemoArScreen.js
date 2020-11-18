import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ViroARScene, ViroCamera, ViroText, ViroFlexView} from 'react-viro';
import CompassHeading from 'react-native-compass-heading';

import {vehicleBearing} from './utils/compass.helper';

const myLocation = {lat: 13.9042591, lng: 100.5297379};
const kickArena = {lat: 13.9054527, lng: 100.5233223};
const summerGarden = {lat: 13.9057969, lng: 100.5287386};
const central = {lat: 13.9035076, lng: 100.5284241};
const health = {lat: 13.9040363, lng: 100.5313903};
const proudCondo = {lat: 13.90677, lng: 100.5306573};
const array = [summerGarden, summerGarden, kickArena, central];

export default function DemoArScreen() {
  const [compassHeading, setCompassHeading] = useState(0);
  const [direction, setDirection] = useState([]);

  useEffect(() => {
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, (degree) => {
      setCompassHeading(Math.round(degree));
      CompassHeading.stop();
    });

    const temp = [];
    array.map((item) => {
      const res = vehicleBearing(item, myLocation);
      temp.push(res);
    });
    setDirection(temp);

    return () => {
      CompassHeading.stop();
    };
  }, []);

  function CameraCard({rotation, position, text}) {
    return (
      <ViroCamera position={position} rotation={rotation} active={false}>
        <ViroFlexView
          position={[0, 0, -5]}
          style={styles.titleContainer}
          height={1}
          width={2}>
          <ViroText
            text={text}
            scale={[1, 1, 1]}
            style={styles.helloWorldTextStyle}
          />
        </ViroFlexView>
      </ViroCamera>
    );
  }

  function calRotation(item, index) {
    let result = item.compassReading;
    if (compassHeading > 0) {
      const newCompass =
        compassHeading > 180 ? compassHeading - 360 : compassHeading;

      result = item.compassReading - newCompass;

      if (result < -180) {
        result = 360 - Math.abs(result);
      }

      if (result > 0) {
        result = -result;
      } else {
        result = Math.abs(result);
      }
    }

    return (
      <CameraCard
        key={`test-${index}`}
        position={[0, index * 0.1, 0]}
        rotation={[0, result, 0]}
        text={`Hello ${index}`}
      />
    );
  }

  return (
    <ViroARScene>
      {direction.length > 0 &&
        direction.map((item, index) => calRotation(item, index))}
    </ViroARScene>
  );
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    backgroundColor: 'steelblue',
    borderWidth: 10,
  },
});
