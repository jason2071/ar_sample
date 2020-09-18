import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Button} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="AR Press" onPress={() => navigation.navigate('Detect')} />
    </View>
  );
}
