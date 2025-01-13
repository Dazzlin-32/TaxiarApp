import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomDivider = ({ color = "#ccc", marginVertical = 8, width = "100%" }) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color,
          marginVertical: marginVertical,
          width: width,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth, // Thin divider
  },
});

export default CustomDivider;
