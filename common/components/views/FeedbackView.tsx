import { isEmpty } from 'lodash';
import React from 'react';
import { Text, View } from 'react-native';
import { colors, screens, texts } from '../../styles';
import PaddedView from '../containers/PaddedView';
import ShowIf from './ShowIf';

type Props = {
  header: string;
  icon: React.ReactNode;
  description?: string;
  children?: React.ReactNode | React.ReactNode[];
  background?: string;
};

export default ({ header, description, icon, children, background }: Props) => {
  return (
    <PaddedView style={[screens.default, { backgroundColor: background }]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ ...texts.x2l, textAlign: 'center' }}>{header}</Text>
          <View style={{ height: 114, width: 114, marginTop: 22, marginBottom: 16 }}>{icon}</View>
          <ShowIf test={!isEmpty(description)}>
            {() => (
              <Text style={{ ...texts.sm, color: colors.grey700, textAlign: 'center' }}>
                {description}
              </Text>
            )}
          </ShowIf>
        </View>
      </View>
      {children}
    </PaddedView>
  );
};
