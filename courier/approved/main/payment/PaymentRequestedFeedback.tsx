import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import FeedbackView from '../../../../common/components/views/FeedbackView';
import { IconMotocycle } from '../../../../common/icons/icon-motocycle';
import { colors, padding } from '../../../../common/styles';
import { t } from '../../../../strings';
import { ApprovedParamList } from '../../types';
import { PaymentNavigatorParamList } from './types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PaymentNavigatorParamList, 'PaymentRequestedFeedback'>,
  StackNavigationProp<ApprovedParamList>
>;

type Props = {
  navigation: ScreenNavigationProp;
};

export const PaymentRequestedFeedback = ({ navigation }: Props) => {
  return (
    <FeedbackView
      header={t('Solicitação realizada')}
      icon={<IconMotocycle />}
      background={colors.grey90}
      description={t('Em até 4 dias o valor solicitado estará\n na sua conta')}
    >
      <DefaultButton
        title={t('Voltar para o início')}
        style={{ paddingBottom: padding }}
        onPress={() => navigation.navigate('MainNavigator', { screen: 'Home' })}
      />
    </FeedbackView>
  );
};
