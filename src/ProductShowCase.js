'use strict';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroScene,
  ViroImage,
  ViroText,
  Viro360Image,
  ViroFlexView,
  ViroVideo,
  Viro3DObject,
  ViroMaterials,
  ViroNode,
  ViroDirectionalLight,
  ViroAnimations,
  ViroARScene,
} from 'react-viro';

const products = [
  {
    productTitleText: 'Samsung UN50KU6300 Television',
    productDescriptionText:
      'Samsung UN50KU6300 Curved 50-Inch 4K Ultra HD Smart LED',
    productDetails1: 'Refresh Rate: 240CMR(Effective)',
    productDetails2: 'Backlight: LED',
    productDetails3:
      'Dimensions(W x H x D): TV without stand: 44.4 x 25.8 x 2.5',
    price: '$648.00',
    inStock: true,
    online: true,
    giftWrappable: true,
    productVideo: require('./res/tv_vid.mp4'),
    previewImage: require('./res/btn_tv.png'),
    // model information
    objects: [require('./res/tv.obj')],
    objectOffset: [0, 0, 0],
    objectScaleMultipler: [1, 1, 1],
    objectRotation: [0, 38, 0],
    materials: ['tv'],
  },
  {
    productTitleText: 'Sony a5100 Camera',
    productDescriptionText:
      '16-50mm Mirrorless Digital Camera with 3-Inch Flip Up LCD (Black)',
    productDetails1: 'Ultra-fast auto focus with 179 AF points and 6 FPS',
    productDetails2: 'Capture life in high resolution with 24MP APS-C sensor',
    productDetails3: 'Instant sharing via smartphone with Wi-Fi® and NFC1',
    price: '$498.00',
    inStock: true,
    online: false,
    giftWrappable: true,
    productVideo: require('./res/camera_vid.mp4'),
    previewImage: require('./res/btn_camera.png'),
    // model information
    objects: [
      require('./res/camera_body.obj'),
      require('./res/camera_lens.obj'),
    ],
    objectOffset: [-0.2, -0.7, 0],
    objectScaleMultipler: [0.8, 0.8, 0.8],
    objectRotation: [0, 38, 0],
    materials: ['camera_body', 'camera_lens'],
  },
];

export class ProductShowCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Initializing AR...',
      hideInfoCards: false,
      runAnimation: false,
      mainAnimation: 'fadeOut',
      videoPaused: false,
      productToShow: 0,
      objectAnimation: 'scaleAndRotate',
      runObjectAnimation: false,
      globalAnimation: 'fadeOut',
      runGlobalAnimation: false,
      onFinishGlobal: this._switchProduct,
    };
  }

  _getProductModel() {
    var product = products[this.state.productToShow];
    var objects = [];

    for (var i = 0; i < product.objects.length; i++) {
      objects.push(
        <Viro3DObject
          key={'model' + i}
          source={product.objects[i]}
          materials={product.materials[i]}
          type="OBJ"
        />,
      );
    }

    var position = [
      0 + product.objectOffset[0],
      0 + product.objectOffset[1],
      -5 + product.objectOffset[2],
    ];
    var scale = [
      0.3 * product.objectScaleMultipler[0],
      0.3 * product.objectScaleMultipler[1],
      0.3 * product.objectScaleMultipler[2],
    ];

    ViroAnimations.registerAnimations({
      resetModel: {
        properties: {
          positionX: position[0],
          positionY: position[1],
          positionZ: position[2],
          rotateY: product.objectRotation[1],
        },
        duration: 1000,
      },
    });

    return (
      <ViroNode
        key="obj"
        rotation={product.objectRotation}
        scale={scale}
        position={position}
        onClick={this._onClickModel}
        animation={{
          name: this.state.objectAnimation,
          run: this.state.runObjectAnimation,
          loop: true,
        }}>
        {objects}
      </ViroNode>
    );
  }

  _getVideoIfAvailable() {
    var product = products[this.state.productToShow];

    // if video not available, then return nothing.
    if (!product.productVideo) {
      return;
    }

    return (
      <ViroVideo
        position={[3.8, -1.1, -7]}
        rotation={[0, -40, 0]}
        paused={this.state.videoPaused}
        loop={true}
        height={2}
        width={4}
        onClick={this._onClickVideo}
        source={product.productVideo}
        animation={{
          name: this.state.mainAnimation,
          run: this.state.runAnimation,
          loop: false,
        }}
      />
    );
  }

  _getNavButtons() {
    var toReturn = [];
    var hasPreviousItem = this.state.productToShow > 0;
    var hasNextItem = this.state.productToShow + 1 < products.length;
    if (hasPreviousItem) {
      toReturn.push(
        this._getSingleNavButton(
          false,
          this.state.productToShow - 1,
          !hasNextItem,
        ),
      );
    }
    if (hasNextItem) {
      toReturn.push(
        this._getSingleNavButton(
          true,
          this.state.productToShow + 1,
          !hasPreviousItem,
        ),
      );
    }
    return toReturn;
  }

  _getSingleNavButton(forward, index, centered) {
    var position = [centered ? 0 : forward ? 2 : -2, -3, -7];
    return (
      <ViroNode
        key={forward ? 'forwardBtn' : 'backBtn'}
        position={position}
        onClick={this._prepareSwitchProduct(index)}
        transformBehaviors="billboard"
        animation={{
          name: this.state.mainAnimation,
          run: this.state.runAnimation,
          loop: false,
        }}>
        <ViroImage
          source={products[index].previewImage}
          width={2.8}
          height={0.7}
        />
        <ViroText
          text={products[index].productTitleText}
          width={2}
          height={0.7}
          style={styles.navButtonText}
          textClipMode="ClipToBounds"
          position={[forward ? 0.1 : -0.1, 0, 0.05]}
        />
      </ViroNode>
    );
  }

  _prepareSwitchProduct(productIndex) {
    return () => {
      this.setState({
        globalAnimation: 'fadeOut',
        runGlobalAnimation: true,
        onFinishGlobal: this._switchProduct(productIndex),
      });
    };
  }

  _switchProduct(productIndex) {
    return () => {
      this.setState({
        productToShow: productIndex,
        globalAnimation: 'fadeIn',
        runGlobalAnimation: true,
        onFinishGlobal: null,
      });
    };
  }

  _onClickModel() {
    this.setState({
      hideInfoCards: !this.state.hideInfoCards,
      // if current state is to hide cards, then we want to show them
      mainAnimation: this.state.hideInfoCards ? 'fadeIn' : 'fadeOut',
      runAnimation: true,
      videoPaused: !this.state.videoPaused,
      // if current state is to hide cards, then we want to scale down/stop rotating the model
      objectAnimation: this.state.hideInfoCards
        ? 'resetModel'
        : 'scaleAndRotate',
      runObjectAnimation: true,
    });
  }

  _onClickVideo() {
    this.setState({
      videoPaused: !this.state.videoPaused,
    });
  }

  render() {
    const product = products[this.state.productToShow];

    return (
      <ViroARScene>
        <Viro360Image source={require('./res/interior_viro.jpg')} />

        <ViroDirectionalLight color="#aaaaaa" direction={[0, 0, -1.0]} />

        <ViroNode
          animation={{
            name: this.state.globalAnimation,
            run: this.state.runGlobalAnimation,
            loop: false,
            onFinish: this.state.onFinishGlobal,
          }}>
          <ViroFlexView
            style={styles.titleContainer}
            position={[-3.8, 1, -7]}
            rotation={[0, 40, 0]}
            height={2}
            width={4}
            animation={{
              name: this.state.mainAnimation,
              run: this.state.runAnimation,
              loop: false,
            }}>
            <ViroText
              style={styles.prodTitleText}
              text={product.productTitleText}
              width={4}
              height={0.5}
            />
            <ViroText
              style={styles.prodDescriptionText}
              text={product.productDescriptionText}
            />
          </ViroFlexView>

          <ViroFlexView
            style={styles.titleContainer}
            position={[-3.8, -1.1, -7]}
            rotation={[0, 40, 0]}
            height={2}
            width={4}
            animation={{
              name: this.state.mainAnimation,
              run: this.state.runAnimation,
              loop: false,
            }}>
            <ViroFlexView style={styles.rowContainer}>
              <ViroText
                style={styles.prodDescriptionText}
                text={product.productDetails1}
              />
            </ViroFlexView>
            <ViroFlexView style={styles.rowContainer}>
              <ViroText
                style={styles.prodDescriptionText}
                text={product.productDetails2}
              />
            </ViroFlexView>
            <ViroFlexView style={styles.rowContainer}>
              <ViroText
                style={styles.prodDescriptionText}
                text={product.productDetails3}
              />
            </ViroFlexView>
          </ViroFlexView>

          <ViroFlexView
            style={styles.titleContainer}
            position={[3.8, 1, -7]}
            rotation={[0, -40, 0]}
            height={2}
            width={4}
            animation={{
              name: this.state.mainAnimation,
              run: this.state.runAnimation,
              loop: false,
            }}>
            <ViroFlexView style={styles.rowContainer}>
              <ViroText style={styles.prodDescriptionText} text="Price:" />
              <ViroText style={styles.priceText} text={product.price} />
            </ViroFlexView>
            <ViroText
              style={styles.prodDescriptionText}
              text={getInStockText(product.inStock)}
            />
            <ViroText
              style={styles.prodDescriptionText}
              text={getProductSourceText(product.online, product.giftWrappable)}
            />
          </ViroFlexView>

          {this._getProductModel()}

          {this._getVideoIfAvailable()}

          {this._getNavButtons()}
        </ViroNode>
      </ViroARScene>
    );
  }
}

function getInStockText(inStock) {
  return inStock ? 'In stock.' : 'Out of stock.';
}

function getProductSourceText(online, giftWrappable) {
  var toReturn = '';
  if (online) {
    toReturn += 'Ships from and sold online.';
    if (giftWrappable) {
      toReturn += ' Gift-wrap available.';
    }
  } else {
    toReturn += 'Pick-up in store only.';
  }
  return toReturn;
}

ViroMaterials.createMaterials({
  tv: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/tv_diffuse.png'),
    specularTexture: require('./res/tv_specular.png'),
  },
  camera_body: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    cullMode: 'None',
    diffuseTexture: require('./res/camera_body_diffuse.png'),
    specularTexture: require('./res/camera_body_specular.png'),
  },
  camera_lens: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    cullMode: 'None',
    diffuseTexture: require('./res/camera_lens_diffuse.png'),
    specularTexture: require('./res/camera_lens_specular.png'),
  },
  opaque: {
    diffuseColor: '#ffffff80',
  },
});

ViroAnimations.registerAnimations({
  fadeOut: {properties: {opacity: 0}, duration: 2000},
  fadeIn: {properties: {opacity: 1}, duration: 2000},
  scaleAndRotate: {
    properties: {rotateY: '+=90', positionZ: '-3'},
    duration: 1000,
  },
});

export default ProductShowCase;

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: '#222222',
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
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: '#ffffffdd',
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
