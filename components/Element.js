import React from 'react';
import {Text} from 'react-native';

export const NormalText = ({
  content,
  size = 16,
  color = 'black',
  fontWeight,
}) => {
  return (
    <Text style={{fontSize: size, color: color, fontWeight: fontWeight}}>
      {content}
    </Text>
  );
};
