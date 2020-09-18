import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

export class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
    };
  }

  componentDidMount() {
    const source = this.props.route.params.source;
    this.setState({source});
  }

  render() {
    const {navigation} = this.props;
    const {source} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ImageBackground
          style={styles.body}
          imageStyle={styles.body_imageStyle}
          source={require('./assets/images/bg.png')}>
          <View style={styles.header}>
            <Image
              source={require('./assets/images/logo.png')}
              resizeMode="contain"
              style={styles.image}></Image>
          </View>

          {source && (
            <View style={styles.content}>
              <View style={styles.shop}>
                <Text style={styles.store}>
                  ร้าน : {source.store} ::: {source.id}
                </Text>
                <Text style={styles.branch}>สาขา : {source.branch}</Text>
              </View>

              <View style={styles.table}>
                <View style={styles.rowTB}>
                  <View style={styles.colL}>
                    <Text style={styles.textL1}>Brand</Text>
                  </View>
                  <View style={styles.colR}>
                    <Text style={styles.textR1}>{source.band}</Text>
                  </View>
                </View>
                <View style={styles.rowTb1}>
                  <View style={styles.colL1}>
                    <Text style={styles.textL2}>ขนาดบรรจุ</Text>
                  </View>
                  <View style={styles.colR1}>
                    <Text style={styles.textR2}>{source.size}</Text>
                  </View>
                </View>
                <View style={styles.rowTb2}>
                  <View style={styles.colL2}>
                    <Text style={styles.textL3}>รสชาด</Text>
                  </View>
                  <View style={styles.colR2}>
                    <Text style={styles.textR3}>{source.taste}</Text>
                  </View>
                </View>
                <View style={styles.rowTb3}>
                  <View style={styles.colL3}>
                    <Text style={styles.textL4}>ราคาเดิม/วันที่</Text>
                  </View>
                  <View style={styles.colR3}>
                    <Text style={styles.textR4}>
                      {source.price} / {source.date}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.productShow}>
                <Image
                  source={source.image}
                  resizeMode="contain"
                  style={styles.image2}></Image>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.ปิด}>ปิด</Text>
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  body_imageStyle: {},
  header: {
    height: 100,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    width: 138,
    height: 40,
  },
  content: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    marginLeft: 8,
  },
  shop: {
    borderWidth: 0,
    borderColor: 'rgba(201,201,201,1)',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  store: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 30,
  },
  branch: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  table: {
    alignSelf: 'stretch',
    marginTop: 15,
    marginBottom: 15,
    marginRight: 5,
    marginLeft: 5,
  },
  rowTB: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244,244,244,1)',
    alignSelf: 'stretch',
    marginBottom: 4,
  },
  colL: {
    width: 95,
    backgroundColor: 'rgba(196,196,196,1)',
    padding: 5,
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
  },
  textL1: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  colR: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textR1: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  rowTb1: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244,244,244,1)',
    alignSelf: 'stretch',
    marginBottom: 4,
  },
  colL1: {
    width: 95,
    backgroundColor: 'rgba(196,196,196,1)',
    padding: 5,
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
  },
  textL2: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  colR1: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textR2: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  rowTb2: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244,244,244,1)',
    alignSelf: 'stretch',
    marginBottom: 4,
  },
  colL2: {
    width: 95,
    backgroundColor: 'rgba(196,196,196,1)',
    padding: 5,
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
  },
  textL3: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  colR2: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textR3: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  rowTb3: {
    flexDirection: 'row',
    backgroundColor: 'rgba(244,244,244,1)',
    alignSelf: 'stretch',
    marginBottom: 4,
  },
  colL3: {
    width: 95,
    backgroundColor: 'rgba(196,196,196,1)',
    padding: 5,
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingBottom: 0,
  },
  textL4: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  colR3: {
    flex: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textR4: {
    fontFamily: 'DBHeavent',
    color: '#121212',
    fontSize: 22,
  },
  productShow: {
    width: 300,
    height: 300,
  },
  image2: {
    width: 300,
    height: 300,
  },
  button: {
    width: 120,
    height: 35,
    backgroundColor: 'rgba(26,109,226,1)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  ปิด: {
    fontFamily: 'DBHeavent',
    color: 'rgba(255,255,255,1)',
    fontSize: 25,
  },
});
