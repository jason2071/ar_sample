import React from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';

const screen = Dimensions.get('window');

export default function DefaultButton({
  style = {},
  title = 'Press',
  titleStyle = {},
  disabled = false,
  uppercase = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        {
          width: screen.width * 0.5,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: disabled ? '#cacaca' : 'tomato',
          borderRadius: 8,
        },
        style,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={[
          {
            fontSize: 16,
            color: 'white',
          },
          titleStyle,
        ]}>
        {uppercase ? title.toUpperCase() : title}
      </Text>
    </TouchableOpacity>
  );
}
