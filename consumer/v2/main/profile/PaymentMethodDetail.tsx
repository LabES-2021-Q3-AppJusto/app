import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApiContext, AppDispatch } from '../../../../common/app/context';
import DefaultButton from '../../../../common/components/buttons/DefaultButton';
import PaddedView from '../../../../common/components/containers/PaddedView';
import LabeledText from '../../../../common/components/texts/LabeledText';
import { track, useSegmentScreen } from '../../../../common/store/api/track';
import { getOrders } from '../../../../common/store/order/selectors';
import { showToast } from '../../../../common/store/ui/actions';
import { padding, screens } from '../../../../common/styles';
import { t } from '../../../../strings';
import { ProfileParamList } from './types';

type ScreenNavigationProp = StackNavigationProp<ProfileParamList, 'PaymentMethodDetail'>;
type ScreenRouteProp = RouteProp<ProfileParamList, 'PaymentMethodDetail'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

export default function ({ route, navigation }: Props) {
  // params
  const { paymentData } = route.params;
  // context
  const api = React.useContext(ApiContext);
  const dispatch = useDispatch<AppDispatch>();
  // redux store
  const ongoingOrders = useSelector(getOrders);
  // state
  const [isLoading, setLoading] = React.useState(false);
  // tracking
  useSegmentScreen('PayementMethodDetail');
  // UI handlers
  const deletePaymentMethodHandler = async () => {
    Keyboard.dismiss();
    if (ongoingOrders.length > 0) {
      try {
        setLoading(true);
        await api.consumer().deletePaymentMethod(paymentData.id);
        track('consumer deleted a payment method');
        setLoading(false);
      } catch (error) {
        dispatch(showToast(error.toString(), 'error'));
      }
      navigation.goBack();
    } else
      dispatch(
        showToast(
          'Não é possível remover uma forma de pagamento com um pedido em andamento.',
          'error'
        )
      );
  };
  return (
    <PaddedView style={{ ...screens.config, flex: 1 }}>
      <LabeledText title={t('Número do cartão')} disabled>
        {paymentData.data.display_number}
      </LabeledText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: padding }}>
        <LabeledText title={t('Validade/Mês')} disabled style={{ flex: 1 }}>
          {paymentData.data.month}
        </LabeledText>
        <LabeledText title={t('Validade/Ano')} disabled style={{ flex: 1, marginLeft: padding }}>
          {paymentData.data.year}
        </LabeledText>
      </View>
      <LabeledText title={t('Nome do titular')} style={{ marginTop: padding }} disabled>
        {paymentData.data.holder_name}
      </LabeledText>
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{
          marginTop: padding,
        }}
        title={t('Excluir cartão')}
        onPress={deletePaymentMethodHandler}
        activityIndicator={isLoading}
        grey
      />
    </PaddedView>
  );
}
