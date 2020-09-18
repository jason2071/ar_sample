'use strict';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroVideo,
  ViroFlexView,
} from 'react-viro';

const imgSpider = require('./res/spider-man.jpg');
const vdoSpider = require('./res/spider-man.mp4');

export default class ARTrackingTarget extends Component {
  videoRef = React.createRef(null);

  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      loading: true,
      currentTime: 0,
      totalTime: 0,
    };
  }

  componentDidMount() {
    const imgRes = Image.resolveAssetSource(imgSpider);
    this.setState({
      imgWidth: imgRes.width,
      imgHeight: imgRes.height,
      loading: false,
    });
  }

  componentWillUnmount() {
    this.videoRef.seekToTime(this.state.totalTime);
  }

  _onUpdateTime(currentTime, totalTime) {
    this.setState({currentTime, totalTime});
  }

  render() {
    const {imgWidth, imgHeight, loading} = this.state;

    if (loading) {
      return null;
    }

    ViroARTrackingTargets.createTargets({
      spidy: {
        source: imgSpider,
        orientation: 'UP',
        physicalWidth: (imgWidth * 0.1) / imgHeight,
      },
    });

    return (
      <ViroARScene>
        <ViroARImageMarker target={'spidy'}>
          <ViroFlexView
            width={(imgWidth * 0.1) / imgHeight}
            height={0.1}
            rotation={[270, 0, 0]}>
            <ViroVideo
              ref={(ref) => (this.videoRef = ref)}
              source={vdoSpider}
              resizeMode={'ScaleToFit'}
              width={(imgWidth * 0.1) / imgHeight}
              height={0.1}
              onUpdateTime={(currentTime, totalTime) =>
                this._onUpdateTime(currentTime, totalTime)
              }
            />
          </ViroFlexView>
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}
