import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={onPress}>
      <View>
        <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = size =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: colors.white,
      borderWidth: 2,
      justifyContent: 'center',
    },
    text: {
      color: colors.white,
    },
  });
