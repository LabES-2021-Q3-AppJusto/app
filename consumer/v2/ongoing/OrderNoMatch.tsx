import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import * as Sentry from 'sentry-expo';
import { ApiContext } from '../../../common/app/context';
import DefaultButton from '../../../common/components/buttons/DefaultButton';
import FeedbackView from '../../../common/components/views/FeedbackView';
import { IconConeYellow } from '../../../common/icons/icon-cone-yellow';
import { padding } from '../../../common/styles';
import { t } from '../../../strings';
import { LoggedNavigatorParamList } from '../types';
import { OngoingOrderNavigatorParamList } from './types';

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OngoingOrderNavigatorParamList, 'OngoingOrderNoMatch'>,
  StackNavigationProp<LoggedNavigatorParamList>
>;
type ScreenRouteProp = RouteProp<OngoingOrderNavigatorParamList, 'OngoingOrderNoMatch'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export const OrderNoMatch = ({ navigation, route }: Props) => {
  // context
  const api = React.useContext(ApiContext);
  // params
  const { orderId } = route.params ?? {};
  // state
  const [isLoading, setLoading] = React.useState(false);
  // handlers
  const tryAgainHandler = async () => {
    try {
      setLoading(true);
      await api.order().updateOrder(orderId, { dispatchingStatus: 'matching' });
      navigation.replace('OngoingOrder', { orderId });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(
        'Error while trying to update order.dispatchingStatus from no-match to matching again'
      );
      Sentry.Native.captureException(error);
    }
  };
  // UI
  return (
    <FeedbackView
      header={t('Sem entregadores na região :(')}
      description={t(
        'Infelizmente não encontramos nenhum entregador disponível. Tente novamente mais tarde.'
      )}
      icon={<IconConeYellow />}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: padding,
        }}
      >
        <DefaultButton
          title={t('Tentar novamente')}
          onPress={tryAgainHandler}
          activityIndicator={isLoading}
          disabled={isLoading}
          secondary
        />

        <DefaultButton
          title={t('Cancelar pedido')}
          onPress={() => navigation.navigate('OngoingOrderConfirmCancel', { orderId })}
          activityIndicator={isLoading}
          disabled={isLoading}
          secondary
        />
      </View>
      <DefaultButton
        title={t('Voltar para o início')}
        onPress={() => navigation.replace('MainNavigator', { screen: 'Home' })}
      />
    </FeedbackView>
  );
};
