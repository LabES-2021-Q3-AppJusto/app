import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native';

import { borders, colors, texts } from '../../styles';
import ShowIf from '../views/ShowIf';

export interface DefaultButtonProps extends TouchableOpacityProps, ViewProps {
  title: string;
  activityIndicator?: boolean;
  secondary?: boolean;
}

export default function ({
  title,
  disabled,
  style: externalStyle,
  secondary = false,
  activityIndicator = false,
  ...props
}: DefaultButtonProps) {
  const backgroundColor = secondary
    ? colors.white
    : disabled || activityIndicator
    ? colors.grey
    : colors.green;
  const borderColor =
    disabled || activityIndicator ? colors.grey : secondary ? colors.black : colors.green;
  const color = disabled ? (secondary ? colors.grey : colors.white) : colors.black;

  return (
    <TouchableOpacity disabled={disabled} {...props}>
      <View
        style={[
          {
            flexDirection: 'row',
            ...borders.default,
            paddingHorizontal: 24,
            paddingVertical: 14,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor,
            borderColor,
          },
          externalStyle,
        ]}
      >
        <ShowIf test={!activityIndicator}>
          {() => <Text style={{ ...texts.medium, color }}>{title}</Text>}
        </ShowIf>
        <ShowIf test={activityIndicator}>
          {() => <ActivityIndicator size="small" color={secondary ? colors.black : colors.white} />}
        </ShowIf>
      </View>
    </TouchableOpacity>
  );
}
