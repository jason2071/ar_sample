import React, {Component} from 'react';
import {Text, View, Button, StyleSheet, Image, Platform} from 'react-native';
import _, {cloneWith} from 'lodash';
import MapboxGL from '@react-native-mapbox-gl/maps';
import proj4 from 'proj4';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const MAPBOX_KEY =
  'pk.eyJ1IjoiamFzb24yMDcxIiwiYSI6ImNrY3k2ejdkbTA3M20yeHF5dXdkOTkxY2UifQ.BiaEMoBauhyBgDqd129F1A';
let MAPBOX_URL = '';

let arrayTest = [1, 2, 3];
let textHomeToMap = 'Home to Map';

let pointsToDrawPolilyne = [];
let posCurrentLatLon = [];
let posDestinationLatLon = [];

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toLocation: [100.5306969, 13.9055295],
      myLocation: [100.5295661, 13.904184],
      buttonDisable: true,
      buttonLoading: true,
      initialPosition: {},
    };
  }

  componentDidMount() {
    this.onPress();
  }

  //
  //
  //
  createObject(x, y, z) {
    let createInitialPositionUTM = [];
    createInitialPositionUTM.push({x: x, y: y, z: z});
    return createInitialPositionUTM[0];
  }

  async calculatePointsToPolilyne(url) {
    let auxDirections = [];
    let auxPointsUtm = [];
    let aux1 = [];
    let aux2 = [];
    let auxCurrentUtm = [];

    // console.log('testAnything =  URL :', url);

    try {
      const res = await axios.get(url);
      const directions = res.data;

      if (directions.code === 'Ok') {
        //
        //
        //
        auxDirections = directions.routes[0]['geometry']['coordinates'];
        //
        //
        //
        for (let i = 0; i < auxDirections.length; i++) {
          aux1.push(
            proj4(
              'EPSG:4326',
              '+proj=utm +zone=19 +ellps=GRS80 +units=m +no_defs',
              [auxDirections[i][0], auxDirections[i][1]],
            ),
          );

          auxPointsUtm[i] = this.createObject(aux1[i][0], 0, aux1[i][1]);
        }

        aux2.push(
          proj4(
            'EPSG:4326',
            '+proj=utm +zone=19 +ellps=GRS80 +units=m +no_defs',
            [posCurrentLatLon[0], posCurrentLatLon[1]],
          ),
        );

        auxCurrentUtm.push(this.createObject(aux2[0][0], 0, aux2[0][1]));

        for (let m = 0; m < auxCurrentUtm.length; m++) {
          for (let n = 0; n < auxPointsUtm.length; n++) {
            //
            //
            //
            pointsToDrawPolilyne.push(
              new this.createObject(
                auxPointsUtm[n].x - auxCurrentUtm[m].x,
                auxPointsUtm[n].y - auxCurrentUtm[m].y,
                auxPointsUtm[n].z - auxCurrentUtm[m].z,
              ),
            );
          }
        }

        //
        //
        //
      } else {
      }
    } catch (error) {
      console.log('error:', error.message);
    }
  }

  //
  //
  //
  //

  onPress() {
    this.buttonUpdate();
  }

  buttonUpdate = () => {
    this.setState({buttonDisable: false, buttonLoading: false});

    posCurrentLatLon = this.state.myLocation;
    posDestinationLatLon = this.state.toLocation;

    MAPBOX_URL =
      'https://api.mapbox.com/directions/v5/mapbox/walking/' +
      posCurrentLatLon[0] +
      ',' +
      posCurrentLatLon[1] +
      ';' +
      posDestinationLatLon[0] +
      ',' +
      posDestinationLatLon[1] +
      '.json?access_token=' +
      MAPBOX_KEY +
      '&overview=simplified&geometries=geojson';

    // console.log(MAPBOX_URL);

    this.calculatePointsToPolilyne(MAPBOX_URL);
  };

  renderMap = () => {
    const {toLocation, myLocation} = this.state;

    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={(c) => (this._map = c)}
          styleURL={MapboxGL.StyleURL.Street}
          style={styles.container}
          compassEnabled={true}
          showUserLocation={true}
          userTrackingMode={3}>
          <MapboxGL.Camera zoomLevel={16} centerCoordinate={myLocation} />

          <MapboxGL.MarkerView coordinate={myLocation} />
          <MapboxGL.MarkerView coordinate={toLocation} />
        </MapboxGL.MapView>
      </View>
    );
  };

  arHandler() {
    this.props.navigation.navigate('MapAr', {
      toArScreen: pointsToDrawPolilyne,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMap()}
        <View style={styles.containerButton}>
          <View style={styles.buttonContainer}>
            <Button
              title="AR onPress"
              loading={this.state.buttonLoading}
              disabled={this.state.buttonDisable}
              onPress={() => this.arHandler()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButton: {
    height: Platform.OS === 'ios' ? 80 : 50,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{scale: 0.7}],
  },
  listItemsFormat: {
    backgroundColor: 'red',
  },
});
