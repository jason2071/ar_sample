import React, {Component} from 'react';
import {Image, Dimensions} from 'react-native';
import {
  ViroARSceneNavigator,
  ViroARScene,
  ViroARImageMarker,
  ViroFlexView,
  ViroARTrackingTargets,
  ViroConstants,
  ViroImage,
} from 'react-viro';
import {data} from './data/mocks';

const initSharedProps = {
  apiKey: '06232B7B-00EF-49D5-89F2-A254942824C6',
};

const screen = Dimensions.get('window');

export class ArDetectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedProps: initSharedProps,
      imgWidth: 0,
      imgHeight: 0,
      loading: true,
      currentTime: 0,
      totalTime: 0,
      imgWidth: 0,
      imgHeight: 0,
    };
  }

  componentDidMount() {
    // const demoSourceImage = Image.resolveAssetSource(data[0].image);
    // const imgWidth = demoSourceImage.width;
    // const imgHeight = demoSourceImage.height;
    // this.setState({imgWidth, imgHeight});
  }

  componentWillUnmount() {}

  _onUpdateTime(currentTime, totalTime) {
    this.setState({currentTime, totalTime});
  }

  _onInitialized(state) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log('TRACKING_NORMAL');
    } else if (state == ViroConstants.TRACKING_NONE) {
      console.log('TRACKING_NONE');
    }
  }

  onAnchorUpdated = (source) => {
    const {navigation} = this.props;

    if (source) {
      navigation.navigate('Detail', {
        source,
      });
    }
  };

  renderTargets = (data) => {
    const obj = {};

    data.map((item) => {
      const key = `product-${item.id}`;
      const result = Image.resolveAssetSource(item.image);

      obj[key] = {
        source: item.image,
        orientation: 'UP',
        physicalWidth: (result.width * 0.1) / result.height,
      };
    });

    return obj;
  };

  renderDetectPage = () => {
    const height = 0.1;
    const newTargets = this.renderTargets(data);
    ViroARTrackingTargets.createTargets(newTargets);

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {data.map((item) => (
          <ViroARImageMarker
            key={`target-${item.id}`}
            target={`product-${item.id}`}
            onAnchorUpdated={() => this.onAnchorUpdated(item)}>
            <ViroFlexView
              width={newTargets.physicalWidth}
              height={height}
              rotation={[270, 0, 0]}>
              <ViroImage width={0} height={0} source={item.image} />
            </ViroFlexView>
          </ViroARImageMarker>
        ))}
      </ViroARScene>
    );
  };

  render() {
    const {imgWidth, imgHeight} = this.state;

    return (
      <>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{scene: this.renderDetectPage}}
        />

        {/* {data && (
          <Image
            source={data[0].image}
            style={{
              width: imgWidth / 5,
              height: imgHeight / 5,
              position: 'absolute',
              top: screen.height / 2 - imgHeight / 5 / 2,
              left: screen.width / 2 - imgWidth / 5 / 2,
              opacity: 0.3,
            }}
          />
        )} */}
      </>
    );
  }
}

export default ArDetectScreen;
