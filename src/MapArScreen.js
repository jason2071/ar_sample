import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroPolyline,
  ViroMaterials,
  ViroFlexView,
  ViroText,
} from 'react-viro';

export default class MapArScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: [],
    };
  }

  componentDidMount() {
    const toArScreen = this.props.route.params.toArScreen;
    const arrayData = this.objectToArray(toArScreen);
    this.setState({arrayData});

    ViroMaterials.createMaterials({
      redColor: {
        diffuseColor: '#FF0000',
      },
    });
  }

  objectToArray = (object) => {
    let aux = [];
    for (let i = 0; i < object.length; i++) {
      aux[i] = [object[i].x, object[i].y, object[i].z];
    }
    return aux;
  };

  arScene = () => {
    const {arrayData} = this.state;

    const last = arrayData[arrayData.length - 1];

    return (
      <ViroARScene>
        <ViroPolyline
          position={[0, 0, -2]}
          points={arrayData}
          thickness={0.2}
          materials={'redColor'}
        />

        <ViroFlexView
          style={styles.titleContainer}
          position={last}
          rotation={[0, -40, 0]}
          height={1}
          width={2}>
          <ViroText style={styles.prodDescriptionText} text={'Place'} />

          <ViroText style={styles.prodDescriptionText} text={'1000'} />
        </ViroFlexView>
      </ViroARScene>
    );
  };

  render() {
    const {arrayData} = this.state;
    if (arrayData.length <= 0) return null;

    return (
      <ViroARSceneNavigator
        apiKey="06232B7B-00EF-49D5-89F2-A254942824C6"
        initialScene={{scene: this.arScene}}
      />
    );

    // return (
    //   <View>
    //     <Text>{JSON.stringify(arrayData)}</Text>
    //   </View>
    // );
  }
}

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
