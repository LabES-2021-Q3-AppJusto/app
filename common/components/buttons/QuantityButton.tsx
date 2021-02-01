import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { borders, colors } from '../../styles';

interface Props {
  sign: 'plus' | 'minus';
  size?: 'small' | 'big';
  selected?: boolean;
}

export const QuantityButton = ({ sign, size = 'small', selected = false }: Props) => {
  const dimension = size === 'small' ? 24 : 48;
  const border = size === 'small' ? borders.squared : borders.default;
  return (
    <View
      style={{
        ...border,
        width: dimension,
        height: dimension,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? colors.green : colors.white,
        borderColor: colors.black,
      }}
    >
      <Feather name={sign} size={dimension / 2} />
    </View>
  );
};
